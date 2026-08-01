/**
 * sounds.js
 * ---------
 * Tiny Web Audio sound effects for hunnids.cc — no audio files, just
 * short synthesized tones so this stays lightweight and instant.
 *
 * Usage: window.HunnidsSFX.play('click' | 'toggle' | 'success' | 'bookmark' | 'whoosh')
 *
 * Browsers require a user gesture before audio can play, which is fine
 * here since every sound is triggered by an actual click.
 */
(function () {
  let ctx = null;
  function getCtx() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      ctx = new AudioCtx();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function tone(freq, startTime, duration, { type = 'sine', gain = 0.06, glideTo = null } = {}) {
    const audio = getCtx();
    if (!audio) return;
    const osc = audio.createOscillator();
    const g = audio.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);
    if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, startTime + duration);
    g.gain.setValueAtTime(0, startTime);
    g.gain.linearRampToValueAtTime(gain, startTime + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
    osc.connect(g);
    g.connect(audio.destination);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }

  const sounds = {
    click() {
      const audio = getCtx();
      if (!audio) return;
      tone(720, audio.currentTime, 0.05, { type: 'square', gain: 0.035 });
    },
    toggle() {
      const audio = getCtx();
      if (!audio) return;
      tone(480, audio.currentTime, 0.07, { type: 'sine', gain: 0.05 });
      tone(640, audio.currentTime + 0.05, 0.09, { type: 'sine', gain: 0.05 });
    },
    success() {
      const audio = getCtx();
      if (!audio) return;
      tone(523.25, audio.currentTime, 0.1, { type: 'sine', gain: 0.05 });
      tone(659.25, audio.currentTime + 0.08, 0.1, { type: 'sine', gain: 0.05 });
      tone(783.99, audio.currentTime + 0.16, 0.16, { type: 'sine', gain: 0.055 });
    },
    bookmark() {
      const audio = getCtx();
      if (!audio) return;
      tone(880, audio.currentTime, 0.09, { type: 'sine', gain: 0.05, glideTo: 1046.5 });
    },
    whoosh() {
      const audio = getCtx();
      if (!audio) return;
      tone(300, audio.currentTime, 0.12, { type: 'sine', gain: 0.03, glideTo: 180 });
    },
  };

  window.HunnidsSFX = {
    play(name) {
      if (sounds[name]) sounds[name]();
    },
  };
})();
