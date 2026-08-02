/**
 * page-transition.js
 * -------------------
 * Sticker-bomb reveal transition for "major" navigations (home <-> art
 * wall <-> tutorials) - NOT for every link on the page. Only plays when
 * the browser is actually taking a moment to load the next page, so
 * fast connections skip it entirely rather than being forced to sit
 * through a 2.4s animation every time.
 *
 * How the "only on slow navigation" part works:
 * On click, we fire off a fetch() for the destination page in the
 * background (which also warms the browser's cache for the real
 * navigation right after). If that fetch resolves fast, we just
 * navigate immediately with zero transition. If it's still pending
 * after SLOW_THRESHOLD_MS, THEN we show the animation - so it only
 * appears when there'd otherwise be a noticeable wait anyway.
 */
(function () {
  const MAJOR_PAGES = ['index.html', 'art-wall.html', 'tutorials.html'];
  const SLOW_THRESHOLD_MS = 280;
  const MUTE_KEY = 'hunnids-music-muted'; // reuse the site's existing mute preference

  function isMajorNavLink(a) {
    if (!a.href || a.target === '_blank') return false;
    let url;
    try { url = new URL(a.href, location.href); } catch (e) { return false; }
    if (url.origin !== location.origin) return false;
    const file = url.pathname.split('/').pop() || 'index.html';
    const currentFile = location.pathname.split('/').pop() || 'index.html';
    return MAJOR_PAGES.includes(file) && file !== currentFile;
  }

  const overlay = document.createElement('div');
  overlay.id = 'hunnids-page-transition';
  overlay.innerHTML = `
    <video id="hunnids-transition-video" playsinline muted="false">
      <source src="sticker-bomb-transition.webm" type="video/webm">
      <source src="sticker-bomb-transition-safari.mov" type="video/quicktime">
    </video>
  `;
  document.documentElement.appendChild(overlay);

  const style = document.createElement('style');
  style.textContent = `
    #hunnids-page-transition {
      position: fixed;
      inset: 0;
      z-index: 999999;
      display: none;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      background: transparent;
    }
    #hunnids-page-transition.active { display: flex; }
    #hunnids-transition-video {
      width: min(90vw, 720px);
      height: auto;
    }
  `;
  document.head.appendChild(style);

  const videoEl = document.getElementById('hunnids-transition-video');

  function playTransitionThenGo(destination) {
    overlay.classList.add('active');
    videoEl.muted = localStorage.getItem(MUTE_KEY) === '1';
    videoEl.currentTime = 0;
    videoEl.play().catch(() => {});

    const go = () => { window.location.href = destination; };
    videoEl.addEventListener('ended', go, { once: true });
    // Safety net in case the video fails to fire 'ended' for any reason
    // (codec hiccup, tab backgrounded, etc.) - never trap someone on
    // the page indefinitely.
    setTimeout(go, 3200);
  }

  // Debug override: adding ?forcetransition=1 to any URL always plays
  // the animation regardless of load speed, so it can actually be
  // tested/tuned without needing to throttle your connection.
  const FORCE_TRANSITION = new URLSearchParams(location.search).has('forcetransition');

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a || !isMajorNavLink(a)) return;

    e.preventDefault();
    const destination = a.href;

    if (FORCE_TRANSITION) {
      playTransitionThenGo(destination);
      return;
    }

    let navigated = false;

    fetch(destination).catch(() => {}).finally(() => {
      // Fast connection: fetch already resolved, so just go - no
      // animation needed since there's nothing to visually cover for.
      if (!navigated) {
        navigated = true;
        clearTimeout(slowTimer);
        window.location.href = destination;
      }
    });

    const slowTimer = setTimeout(() => {
      if (navigated) return;
      navigated = true;
      playTransitionThenGo(destination);
    }, SLOW_THRESHOLD_MS);
  });
})();
