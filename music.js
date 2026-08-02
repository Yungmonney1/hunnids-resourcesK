/**
 * music.js
 * --------
 * Background music engine for hunnids.cc - shuffled per visit,
 * crossfades between tracks, remembers position/mute across pages.
 * UI (the mini-player) lives in miniplayer.js and talks to this file
 * through window.HunnidsMusic.
 *
 * HOW TO ADD TRACKS:
 * Drop audio files (mp3/ogg) anywhere in your repo (e.g. an /audio
 * folder) and list them below.
 */
const PLAYLIST = [
  { src: 'audio/htb-music-casino-shop-475362.mp3', title: 'Casino Shop' },
  { src: 'audio/alex-morgan-jazz-coffee-shop-music-563580.mp3', title: 'Jazz Coffee Shop' },
];

(function () {
  if (PLAYLIST.length === 0) return;

  const CROSSFADE_MS = 1800;
  const NORMAL_VOLUME = 0.16;
  const DUCK_VOLUME = 0;
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
  let playing = false;

  const players = [new Audio(), new Audio()];
  players.forEach(p => {
    p.preload = 'auto';
    p.addEventListener('error', () => {
      const err = p.error;
      console.error('[hunnids music] failed to load audio:', p.src, err && err.message, err && err.code);
    });
  });
  let activeIndex = 0;

  const trackChangeListeners = [];
  function notifyTrackChange() {
    const track = currentTrack();
    trackChangeListeners.forEach(fn => fn(track));
  }

  function currentTrack() {
    return PLAYLIST[order[orderPos % order.length]];
  }

  function targetVolume() {
    if (muted) return 0;
    return ducked ? DUCK_VOLUME : NORMAL_VOLUME;
  }

  function fadeTo(audioEl, target, ms) {
    // Cancel any fade already in progress on this element - without this,
    // rapid toggling (e.g. clicking mute/unmute quickly) stacks multiple
    // competing animation loops that fight over the volume value.
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
    notifyTrackChange();
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
    localStorage.setItem(STATE_KEY, JSON.stringify({
      orderPos,
      time: active.currentTime || 0,
    }));
  }, SAVE_INTERVAL_MS);

  // Browsers block autoplay with sound, but DO allow autoplay when the
  // element starts muted. So we start playback the instant the page
  // loads (muted, inaudible), and unmute automatically on the visitor's
  // very first interaction - meaning music is already running and
  // caught up the moment it becomes audible, rather than starting fresh
  // from a click.
  function attemptSilentAutoplay() {
    const active = players[activeIndex];
    loadTrack(active, currentTrack(), resumeTime);
    active.muted = true;
    active.play().then(() => { playing = true; }).catch(() => {});
    notifyTrackChange();
  }

  function unlockAudio() {
    if (userGestureReceived) return;
    userGestureReceived = true;
    const active = players[activeIndex];
    active.muted = false;
    if (active.paused) {
      active.play().then(() => { playing = true; }).catch(err => console.error('[hunnids music] play() failed:', err));
    }
    fadeTo(active, targetVolume(), 500);
  }

  attemptSilentAutoplay();
  ['click', 'keydown', 'touchstart'].forEach(evt => {
    document.addEventListener(evt, unlockAudio, { once: true });
  });

  window.HunnidsMusic = {
    toggleMute() {
      muted = !muted;
      localStorage.setItem(MUTE_KEY, muted ? '1' : '0');
      if (muted) {
        fadeTo(players[activeIndex], 0, 300);
      } else if (!userGestureReceived) {
        unlockAudio();
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
    // Real play/pause - actually stops playback, distinct from mute
    // (which keeps playing silently). Used by the mini-player.
    togglePlayPause() {
      const active = players[activeIndex];
      if (!userGestureReceived) {
        unlockAudio();
        return true;
      }
      if (playing) {
        active.pause();
        playing = false;
      } else {
        active.play().then(() => { playing = true; }).catch(err => console.error('[hunnids music] play() failed:', err));
      }
      return playing;
    },
    isPlaying() {
      return playing;
    },
    next() {
      changeTrack(1);
    },
    previous() {
      changeTrack(-1);
    },
    getCurrentTrack() {
      return currentTrack();
    },
    onTrackChange(fn) {
      trackChangeListeners.push(fn);
    },
  };
})();
