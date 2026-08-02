/**
 * music.js
 * --------
 * Background music engine for hunnids.cc.
 * UI (the mini-player) lives in miniplayer.js and talks to this file
 * through window.HunnidsMusic - same API regardless of mode below.
 *
 * TWO MODES - pick one:
 *
 * 1. LIVE_STREAM_URL: point this at a continuous internet radio stream
 *    (e.g. Nonstop Casiopea's stream link) and leave PLAYLIST empty.
 *    No crossfade/shuffle needed - it's one continuous broadcast.
 *    Heads up: this depends on a third party's stream staying online
 *    and allowing embeds from other domains. If it goes down or blocks
 *    hotlinking, music silently stops until you swap the URL.
 *
 * 2. PLAYLIST: leave LIVE_STREAM_URL empty and list local audio files
 *    below instead - shuffled per visit, crossfaded between tracks.
 */
const LIVE_STREAM_URL = 'https://nonstopcasiopea.radioca.st/';

const PLAYLIST = [
  { src: 'audio/htb-music-casino-shop-475362.mp3', title: 'Casino Shop' },
  { src: 'audio/alex-morgan-jazz-coffee-shop-music-563580.mp3', title: 'Jazz Coffee Shop' },
];

(function () {
  const NORMAL_VOLUME = 0.16;
  const DUCK_VOLUME = 0;
  const MUTE_KEY = 'hunnids-music-muted';

  function isMuted() {
    return localStorage.getItem(MUTE_KEY) === '1';
  }

  let muted = isMuted();
  let ducked = false;
  let userGestureReceived = false;
  let playing = false;

  const trackChangeListeners = [];
  function notifyTrackChange(track) {
    trackChangeListeners.forEach(fn => fn(track));
  }

  function targetVolume() {
    if (muted) return 0;
    return ducked ? DUCK_VOLUME : NORMAL_VOLUME;
  }

  function fadeTo(audioEl, target, ms) {
    audioEl._fadeToken = (audioEl._fadeToken || 0) + 1;
    const myToken = audioEl._fadeToken;
    const startVol = audioEl.volume;
    const startTime = performance.now();
    function step(now) {
      if (audioEl._fadeToken !== myToken) return;
      const t = Math.min((now - startTime) / ms, 1);
      audioEl.volume = startVol + (target - startVol) * t;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ── LIVE RADIO MODE ──────────────────────────────────────────────
  if (LIVE_STREAM_URL) {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = LIVE_STREAM_URL;
    audio.volume = targetVolume();
    audio.addEventListener('error', () => {
      console.error('[hunnids music] live stream failed to load:', audio.error && audio.error.message);
    });

    const trackInfo = { title: 'Nonstop Casiopea (live)', src: LIVE_STREAM_URL };

    function attemptPlay() {
      if (userGestureReceived) return;
      audio.play().then(() => {
        playing = true;
        userGestureReceived = true;
        notifyTrackChange(trackInfo);
        ['click', 'keydown', 'touchstart'].forEach(evt => document.removeEventListener(evt, attemptPlay));
      }).catch(() => {});
    }
    attemptPlay();
    ['click', 'keydown', 'touchstart'].forEach(evt => document.addEventListener(evt, attemptPlay));

    window.HunnidsMusic = {
      toggleMute() {
        muted = !muted;
        localStorage.setItem(MUTE_KEY, muted ? '1' : '0');
        if (!userGestureReceived) attemptPlay();
        fadeTo(audio, targetVolume(), 300);
        return muted;
      },
      isMuted() { return muted; },
      duck() { ducked = true; fadeTo(audio, targetVolume(), 250); },
      unduck() { ducked = false; fadeTo(audio, targetVolume(), 250); },
      togglePlayPause() {
        if (!userGestureReceived) { attemptPlay(); return true; }
        if (playing) { audio.pause(); playing = false; }
        else { audio.play().then(() => { playing = true; }).catch(() => {}); }
        return playing;
      },
      isPlaying() { return playing; },
      // A live broadcast has no "next song" to skip to - both are
      // no-ops so the mini-player buttons don't error if clicked.
      next() {},
      previous() {},
      getCurrentTrack() { return trackInfo; },
      onTrackChange(fn) { trackChangeListeners.push(fn); },
    };
    return;
  }

  // ── LOCAL PLAYLIST MODE ─────────────────────────────────────────
  if (PLAYLIST.length === 0) return;

  const CROSSFADE_MS = 1800;
  const SAVE_INTERVAL_MS = 2000;
  const ORDER_KEY = 'hunnids-music-order';
  const STATE_KEY = 'hunnids-music-state';

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
    try { return JSON.parse(localStorage.getItem(STATE_KEY)) || null; } catch (e) { return null; }
  }

  const order = getOrder();
  const saved = getSavedState();
  let orderPos = saved && Number.isInteger(saved.orderPos) ? saved.orderPos : 0;
  let resumeTime = saved && typeof saved.time === 'number' ? saved.time : 0;

  const players = [new Audio(), new Audio()];
  players.forEach(p => {
    p.preload = 'auto';
    p.addEventListener('error', () => {
      console.error('[hunnids music] failed to load audio:', p.src, p.error && p.error.message);
    });
  });
  let activeIndex = 0;

  function currentTrack() {
    return PLAYLIST[order[orderPos % order.length]];
  }

  function loadTrack(audioEl, track, startAt) {
    audioEl.src = track.src;
    audioEl.volume = 0;
    audioEl._advancing = false;
    if (startAt) {
      const seekWhenReady = () => {
        try { audioEl.currentTime = startAt; } catch (e) {}
        audioEl.removeEventListener('loadedmetadata', seekWhenReady);
      };
      audioEl.addEventListener('loadedmetadata', seekWhenReady);
    }
  }

  function changeTrack(direction) {
    orderPos = (orderPos + order.length + direction) % order.length;
    const outgoing = players[activeIndex];
    activeIndex = 1 - activeIndex;
    const incoming = players[activeIndex];
    loadTrack(incoming, currentTrack(), 0);
    incoming.play().then(() => { playing = true; }).catch(err => console.error('[hunnids music] play() failed:', err));
    fadeTo(incoming, targetVolume(), CROSSFADE_MS);
    fadeTo(outgoing, 0, CROSSFADE_MS);
    setTimeout(() => outgoing.pause(), CROSSFADE_MS + 100);
    notifyTrackChange(currentTrack());
  }

  players.forEach(p => {
    p.addEventListener('timeupdate', () => {
      if (p !== players[activeIndex]) return;
      const remaining = p.duration - p.currentTime;
      if (remaining > 0 && remaining <= CROSSFADE_MS / 1000 + 0.2 && !p._advancing) {
        p._advancing = true;
        changeTrack(1);
      }
    });
    p.addEventListener('ended', () => {
      if (p === players[activeIndex] && !p._advancing) changeTrack(1);
    });
  });

  setInterval(() => {
    const active = players[activeIndex];
    localStorage.setItem(STATE_KEY, JSON.stringify({ orderPos, time: active.currentTime || 0 }));
  }, SAVE_INTERVAL_MS);

  function attemptPlay() {
    if (userGestureReceived) return;
    const active = players[activeIndex];
    if (!active.src) {
      loadTrack(active, currentTrack(), resumeTime);
      active.volume = targetVolume();
      notifyTrackChange(currentTrack());
    }
    active.play().then(() => {
      playing = true;
      userGestureReceived = true;
      ['click', 'keydown', 'touchstart'].forEach(evt => document.removeEventListener(evt, attemptPlay));
    }).catch(() => {});
  }

  attemptPlay();
  ['click', 'keydown', 'touchstart'].forEach(evt => document.addEventListener(evt, attemptPlay));

  window.HunnidsMusic = {
    toggleMute() {
      muted = !muted;
      localStorage.setItem(MUTE_KEY, muted ? '1' : '0');
      if (!userGestureReceived) attemptPlay();
      else fadeTo(players[activeIndex], targetVolume(), 300);
      return muted;
    },
    isMuted() { return muted; },
    duck() { ducked = true; fadeTo(players[activeIndex], targetVolume(), 250); },
    unduck() { ducked = false; fadeTo(players[activeIndex], targetVolume(), 250); },
    togglePlayPause() {
      if (!userGestureReceived) { attemptPlay(); return true; }
      const active = players[activeIndex];
      if (playing) { active.pause(); playing = false; }
      else { active.play().then(() => { playing = true; }).catch(err => console.error('[hunnids music] play() failed:', err)); }
      return playing;
    },
    isPlaying() { return playing; },
    next() { changeTrack(1); },
    previous() { changeTrack(-1); },
    getCurrentTrack() { return currentTrack(); },
    onTrackChange(fn) { trackChangeListeners.push(fn); },
  };
})();
