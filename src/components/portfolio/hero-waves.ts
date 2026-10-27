import { get } from "./dom";
import { reducedMotion } from "./state";

export function initHeroWaves(signal: AbortSignal) {
  const canvas = get<HTMLCanvasElement>("#hero-waves-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

  const onResize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
  };
  window.addEventListener("resize", onResize, { signal });

  let mouseX = width / 2;
  let mouseY = height / 2;
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { signal });

  let lastTime = performance.now();
  let t = 0;
  let animId = 0;
  let isVisible = true;

  // Dải sóng nước lụa siêu mịn với độ phân giải vi mô và màu sắc đa tầng
  const waveLayers = [
    { color1: "rgba(56, 189, 248, 0.40)", color2: "rgba(99, 102, 241, 0.22)", speed: 1.0, freq: 0.0016, amp: 115, y: 0.35 },
    { color1: "rgba(168, 85, 247, 0.34)", color2: "rgba(56, 189, 248, 0.18)", speed: 0.8, freq: 0.0019, amp: 135, y: 0.43 },
    { color1: "rgba(45, 212, 191, 0.28)", color2: "rgba(129, 140, 248, 0.20)", speed: 1.2, freq: 0.0013, amp: 100, y: 0.51 },
    { color1: "rgba(129, 140, 248, 0.24)", color2: "rgba(192, 132, 252, 0.14)", speed: 0.9, freq: 0.0021, amp: 90, y: 0.59 }
  ];

  function start() {
    if (animId || !isVisible || document.hidden || reducedMotion() || signal.aborted) return;
    lastTime = performance.now();
    animId = requestAnimationFrame(render);
  }

  function stop() {
    if (animId) {
      cancelAnimationFrame(animId);
      animId = 0;
    }
  }

  function render(now: number) {
    if (signal.aborted || !isVisible || document.hidden) {
      animId = 0;
      return;
    }

    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;
    t += dt * 0.48 * 1.7; // Tốc độ nhịp điệu chuẩn 1.7x uyển chuyển

    ctx!.clearRect(0, 0, width, height);

    waveLayers.forEach((layer) => {
      ctx!.beginPath();
      ctx!.moveTo(0, height);

      const targetY = height * layer.y + (mouseY - height / 2) * 0.07;

      for (let x = 0; x <= width; x += 6) {
        const dx = (mouseX - x) * 0.0006;
        const y =
          targetY +
          Math.sin(x * layer.freq + t * layer.speed + dx) * layer.amp +
          Math.cos(x * layer.freq * 0.65 - t * layer.speed * 0.5) * (layer.amp * 0.55);
        ctx!.lineTo(x, y);
      }

      ctx!.lineTo(width, height);
      ctx!.closePath();

      const grad = ctx!.createLinearGradient(0, targetY - layer.amp, 0, height);
      grad.addColorStop(0, layer.color1);
      grad.addColorStop(0.48, layer.color2);
      grad.addColorStop(1, "rgba(5, 8, 20, 0)");

      ctx!.fillStyle = grad;
      ctx!.fill();
    });

    animId = requestAnimationFrame(render);
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0]?.isIntersecting ?? true;
      if (isVisible) {
        start();
      } else {
        stop();
      }
    }, { threshold: 0.05 });
    observer.observe(canvas);
    signal.addEventListener("abort", () => observer.disconnect());
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  }, { signal });

  const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
  const onMotionChange = () => {
    if (reducedMotion()) stop();
    else start();
  };
  motionMedia.addEventListener("change", onMotionChange, { signal });

  start();

  signal.addEventListener("abort", () => {
    stop();
  });
}
