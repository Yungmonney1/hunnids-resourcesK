document.addEventListener('DOMContentLoaded', () => {
  const blob = document.createElement('div');
  blob.id = 'glass-blob';
  document.body.appendChild(blob);

  const style = document.createElement('style');
  style.textContent = `
    body { cursor: none; }
    #glass-blob {
      position: fixed;
      top: 0; left: 0;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(180, 220, 255, 0.25);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      border: 1px solid rgba(255, 255, 255, 0.4);
      box-shadow:
        inset 0 0 8px rgba(255, 255, 255, 0.5),
        0 0 12px rgba(120, 190, 255, 0.25);
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
    }
    @media (pointer: coarse) {
      #glass-blob { display: none; }
      body { cursor: auto; }
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

    blob.style.left = bx + 'px';
    blob.style.top = by + 'px';
    blob.style.transform =
      `translate(-50%, -50%) rotate(${angle}deg) scale(${1 + speed * 0.03}, ${1 - speed * 0.015})`;

    requestAnimationFrame(loop);
  }
  loop();
});
