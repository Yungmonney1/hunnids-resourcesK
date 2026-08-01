/**
 * music.js
 * --------
 * Background music playlist for hunnids.cc - shuffled per visit,
 * crossfades between tracks, remembers position/mute across pages.
 *
 * HOW TO ADD TRACKS:
 * Drop audio files (mp3/ogg) anywhere in your repo (e.g. an /audio
 * folder) and list them below. That's the only edit needed - shuffle,
 * crossfade, persistence, muting, and ducking are all handled already.
 */
const PLAYLIST = [
  // { src: 'audio/track-1.mp3', title: 'Track 1' },
  // { src: 'audio/track-2.mp3', title: 'Track 2' },
];

(function () {
  if (PLAYLIST.length === 0) return;

  const CROSSFADE_MS = 1800;
  const NORMAL_VOLUME = 0.35;
  const DUCK_VOLUME = 0.08;
  const SAVE_INTERVAL_MS = 2000;

  const ORDER_KEY = 'hunnids-music-order';
  const STATE_KEY = 'hunnids-music-state';
  const MUTE_KEY = 'hunnids-music-muted';

  function getOrder() {
    const savedOrder = sessionStorage.getItem(ORDER_KEY);
    if (savedOrder) {
      try {
        const parsed = JSON.parse(savedOrder);
        if (Array.isArray(parsed) && parsed.length === PLAYLIST.length) return parsed;
      } catch (e) {}
    }
    const order = PLAYLIST.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    sessionStorage.setItem(ORDER_KEY, JSON.stringify(order));
    return order;
  }

  function getSavedState() {
    try {
      return JSON.parse(localStorage.getItem(STATE_KEY)) || null;
    } catch (e) {
      return null;
    }
  }

  function isMuted() {
    return localStorage.getItem(MUTE_KEY) === '1';
  }

  const order = getOrder();
  const saved = getSavedState();

  let orderPos = saved && Number.isInteger(saved.orderPos) ? saved.orderPos : 0;
  let resumeTime = saved && typeof saved.time === 'number' ? saved.time : 0;
  let muted = isMuted();
  let ducked = false;
  let userGestureReceived = false;

  const players = [new Audio(), new Audio()];
  players.forEach(p => { p.preload = 'auto'; });
  let activeIndex = 0;

  function currentTrack() {
    return PLAYLIST[order[orderPos % order.length]];
  }

  function targetVolume() {
    if (muted) return 0;
    return ducked ? DUCK_VOLUME : NORMAL_VOLUME;
  }

  function fadeTo(audioEl, target, ms) {
    const startVol = audioEl.volume;
    const startTime = performance.now();
    function step(now) {
      const t = Math.min((now - startTime) / ms, 1);
      audioEl.volume = startVol + (target - startVol) * t;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function loadTrack(audioEl, track, startAt) {
    audioEl.src = track.src;
    audioEl.currentTime = startAt || 0;
    audioEl.volume = 0;
  }

  function playCurrent(startAt) {
    const active = players[activeIndex];
    loadTrack(active, currentTrack(), startAt);
    active.play().catch(() => {});
    fadeTo(active, targetVolume(), 400);
  }

  function advance() {
    orderPos = (orderPos + 1) % order.length;
    const outgoing = players[activeIndex];
    activeIndex = 1 - activeIndex;
    const incoming = players[activeIndex];

    loadTrack(incoming, currentTrack(), 0);
    incoming.play().catch(() => {});
    fadeTo(incoming, targetVolume(), CROSSFADE_MS);
    fadeTo(outgoing, 0, CROSSFADE_MS);
    setTimeout(() => outgoing.pause(), CROSSFADE_MS + 100);
  }

  players.forEach(p => {
    p.addEventListener('timeupdate', () => {
      if (p !== players[activeIndex]) return;
      const remaining = p.duration - p.currentTime;
      if (remaining > 0 && remaining <= CROSSFADE_MS / 1000 + 0.2 && !p._advancing) {
        p._advancing = true;
        advance();
      }
    });
    p.addEventListener('ended', () => {
      if (p === players[activeIndex] && !p._advancing) advance();
    });
  });

  setInterval(() => {
    const active = players[activeIndex];
    localStorage.setItem(STATE_KEY, JSON.stringify({
      orderPos,
      time: active.currentTime || 0,
    }));
  }, SAVE_INTERVAL_MS);

  function start() {
    if (userGestureReceived) return;
    userGestureReceived = true;
    playCurrent(resumeTime);
  }

  document.addEventListener('click', function firstClick() {
    if (!muted) start();
    document.removeEventListener('click', firstClick);
  }, { once: true });

  window.HunnidsMusic = {
    toggleMute() {
      muted = !muted;
      localStorage.setItem(MUTE_KEY, muted ? '1' : '0');
      if (muted) {
        fadeTo(players[activeIndex], 0, 300);
      } else if (!userGestureReceived) {
        start();
      } else {
        fadeTo(players[activeIndex], targetVolume(), 300);
      }
      return muted;
    },
    isMuted() {
      return muted;
    },
    duck() {
      ducked = true;
      fadeTo(players[activeIndex], targetVolume(), 250);
    },
    unduck() {
      ducked = false;
      fadeTo(players[activeIndex], targetVolume(), 250);
    },
  };
})();
