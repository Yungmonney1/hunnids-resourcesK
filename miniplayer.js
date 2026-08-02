/**
 * miniplayer.js
 * -------------
 * Floating "now playing" mini-player for hunnids.cc. Talks to the
 * playback engine in music.js via window.HunnidsMusic - this file is
 * purely the UI: the card, its buttons, the gradient album-art blob,
 * and the show/auto-hide behavior.
 *
 * Opens: when a track changes (new song starts, so it always
 * "announces" what's playing), or when the music button in the nav
 * is clicked.
 * Auto-hides after a few seconds - unless the mouse is over it, in
 * which case the countdown pauses so it's safe to reach the buttons.
 */
(function () {
  if (!document.body) return;

  const AUTO_HIDE_MS = 4000;

  const card = document.createElement('div');
  card.id = 'hunnids-miniplayer';
  card.innerHTML = `
    <div class="mp-art" id="mp-art"></div>
    <div class="mp-info">
      <div class="mp-title" id="mp-title">-</div>
      <div class="mp-sub">now playing</div>
    </div>
    <button class="mp-btn" id="mp-prev" title="Previous" aria-label="Previous track">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
    </button>
    <button class="mp-btn mp-btn--main" id="mp-playpause" title="Play/Pause" aria-label="Play or pause">
      <svg id="mp-icon-pause" viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>
      <svg id="mp-icon-play" viewBox="0 0 24 24" width="15" height="15" fill="currentColor" style="display:none"><path d="M7 5l12 7-12 7z"/></svg>
    </button>
    <button class="mp-btn" id="mp-next" title="Next" aria-label="Next track">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M16 6h2v12h-2zM6 6l8.5 6L6 18z"/></svg>
    </button>
    <button class="mp-btn" id="mp-mute" title="Mute" aria-label="Mute or unmute">
      <svg id="mp-icon-unmuted" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l10-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/></svg>
      <svg id="mp-icon-muted" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="display:none"><path d="M9 18V5l10-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/><line x1="3" y1="3" x2="21" y2="21"/></svg>
    </button>
  `;
  document.body.appendChild(card);

  const style = document.createElement('style');
  style.textContent = `
    #hunnids-miniplayer {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9998;
      display: flex;
      align-items: center;
      gap: 14px;
      background: var(--bg-card, #fff);
      backdrop-filter: blur(18px) saturate(160%);
      border: 1px solid var(--border, rgba(0,0,0,0.08));
      border-radius: 20px;
      padding: 14px 18px;
      box-shadow: 0 10px 36px rgba(40,45,60,0.2);
      max-width: 340px;
      opacity: 0;
      transform: translateY(12px);
      pointer-events: none;
      transition: opacity 0.25s ease, transform 0.25s ease;
    }
    #hunnids-miniplayer.mp-visible {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
    .mp-art {
      width: 46px;
      height: 46px;
      border-radius: 12px;
      flex-shrink: 0;
    }
    .mp-info { flex: 1; min-width: 0; }
    .mp-title {
      font-family: 'Nunito', sans-serif;
      font-size: 14px;
      font-weight: 700;
      color: var(--text-primary, #222);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .mp-sub {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10.5px;
      color: var(--text-muted, #999);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 2px;
    }
    .mp-btn {
      flex-shrink: 0;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: none;
      background: transparent;
      color: var(--text-secondary, #666);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s;
    }
    .mp-btn:hover { background: var(--bg-hover, rgba(0,0,0,0.06)); }
    .mp-btn--main {
      width: 36px;
      height: 36px;
      background: var(--brown-dim, #333);
      color: #fff;
    }
    .mp-btn--main:hover { opacity: 0.85; background: var(--brown-dim, #333); }
    @media (prefers-reduced-motion: reduce) {
      #hunnids-miniplayer { transition: none; }
    }

    /* Glowing pulse ring on the nav button, so it reads as "the music
       control" at a glance rather than just another icon button. */
    #music-toggle {
      position: relative;
      overflow: visible;
    }
    #music-toggle::before {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(120,170,235,0.45), transparent 70%);
      animation: musicGlow 2.4s ease-in-out infinite;
      z-index: -1;
    }
    @keyframes musicGlow {
      0%, 100% { opacity: 0.5; transform: scale(0.92); }
      50% { opacity: 1; transform: scale(1.15); }
    }
    @media (prefers-reduced-motion: reduce) {
      #music-toggle::before { animation: none; opacity: 0.7; }
    }
  `;
  document.head.appendChild(style);

  const artEl = document.getElementById('mp-art');
  const titleEl = document.getElementById('mp-title');
  const iconPause = document.getElementById('mp-icon-pause');
  const iconPlay = document.getElementById('mp-icon-play');
  const iconMuted = document.getElementById('mp-icon-muted');
  const iconUnmuted = document.getElementById('mp-icon-unmuted');

  // Deterministic gradient per track, so the same song always gets the
  // same "album art" blob rather than a random color each time.
  function gradientFor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
    const hue1 = hash % 360;
    const hue2 = (hue1 + 55) % 360;
    return `linear-gradient(135deg, hsl(${hue1},70%,70%), hsl(${hue2},70%,55%))`;
  }

  let hideTimer = null;
  function scheduleHide() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => card.classList.remove('mp-visible'), AUTO_HIDE_MS);
  }
  function show() {
    card.classList.add('mp-visible');
    scheduleHide();
  }
  card.addEventListener('mouseenter', () => clearTimeout(hideTimer));
  card.addEventListener('mouseleave', scheduleHide);

  function updateDisplay(track) {
    if (!track) return;
    titleEl.textContent = track.title || 'Untitled';
    artEl.style.background = gradientFor(track.src);
  }

  function updatePlayIcon() {
    const playing = window.HunnidsMusic.isPlaying();
    iconPause.style.display = playing ? 'block' : 'none';
    iconPlay.style.display = playing ? 'none' : 'block';
  }
  function updateMuteIcon() {
    const muted = window.HunnidsMusic.isMuted();
    iconUnmuted.style.display = muted ? 'none' : 'block';
    iconMuted.style.display = muted ? 'block' : 'none';
  }

  document.getElementById('mp-prev').addEventListener('click', () => {
    window.HunnidsMusic.previous();
    show();
  });
  document.getElementById('mp-next').addEventListener('click', () => {
    window.HunnidsMusic.next();
    show();
  });
  document.getElementById('mp-playpause').addEventListener('click', () => {
    window.HunnidsMusic.togglePlayPause();
    updatePlayIcon();
    show();
  });
  document.getElementById('mp-mute').addEventListener('click', () => {
    window.HunnidsMusic.toggleMute();
    updateMuteIcon();
    show();
  });

  window.HunnidsMusic.onTrackChange((track) => {
    updateDisplay(track);
    updatePlayIcon();
    updateMuteIcon();
    show();
  });

  // Nav music button re-opens the player instead of directly muting.
  window.HunnidsMiniplayer = {
    toggle() {
      if (card.classList.contains('mp-visible')) {
        clearTimeout(hideTimer);
        card.classList.remove('mp-visible');
      } else {
        updateDisplay(window.HunnidsMusic.getCurrentTrack());
        updatePlayIcon();
        updateMuteIcon();
        show();
      }
    },
  };
})();
