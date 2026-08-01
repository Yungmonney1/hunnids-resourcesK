document.addEventListener('DOMContentLoaded', () => {
  // On touch devices there's no real cursor to follow, and previously
  // this script still created the blob and ran its animation loop every
  // frame regardless - continuous backdrop-filter blur is expensive, and
  // was running invisibly (just hidden via CSS) on every mobile visit.
  // Bail out completely instead.
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const blob = document.createElement('div');
  blob.id = 'glass-blob';
  document.documentElement.appendChild(blob);

  const style = document.createElement('style');
  style.textContent = `
    *, *::before, *::after { cursor: none !important; }
    #glass-blob {
      position: fixed;
      top: 0;
      left: 0;
      width: 36px;
      height: 36px;
      margin-left: -18px;
      margin-top: -18px;
      border-radius: 50%;
      background: rgba(120, 170, 235, 0.4);
      backdrop-filter: blur(6px) saturate(160%);
      -webkit-backdrop-filter: blur(6px) saturate(160%);
      border: 1.5px solid rgba(90, 140, 220, 0.65);
      box-shadow:
        inset 0 0 8px rgba(255, 255, 255, 0.6),
        0 2px 10px rgba(40, 70, 120, 0.25);
      pointer-events: none;
      z-index: 9999;
      transform-origin: center center;
      will-change: transform;
    }
  `;
  document.head.appendChild(style);

  let mx = 0, my = 0, bx = 0, by = 0;

  window.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  function loop() {
    const px = bx, py = by;
    bx += (mx - bx) * 0.14;
    by += (my - by) * 0.14;

    const vx = bx - px, vy = by - py;
    const speed = Math.min(Math.hypot(vx, vy) * 2.5, 14);
    const angle = Math.atan2(vy, vx) * 180 / Math.PI;

    blob.style.transform =
      `translate(${bx}px, ${by}px) rotate(${angle}deg) scale(${1 + speed * 0.03}, ${1 - speed * 0.015})`;

    requestAnimationFrame(loop);
  }
  loop();
});
