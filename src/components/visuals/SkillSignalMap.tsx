"use client";

import { useEffect, useRef } from "react";
import type { Language } from "@/content/portfolio";

const labels = {
  technical: { vi: ["Thu thập", "Hiển thị", "Lập chỉ mục"], en: ["Crawl", "Render", "Index"] },
  content: { vi: ["Truy vấn", "Ý định", "Trang đích"], en: ["Query", "Intent", "Page"] },
  analytics: { vi: ["Tín hiệu", "Đối chiếu", "Giả thuyết"], en: ["Signal", "Compare", "Hypothesis"] },
  workflow: { vi: ["Đầu vào", "Rà soát", "Đầu ra"], en: ["Input", "Review", "Output"] },
} as const;

type Skill = keyof typeof labels;

export function SkillSignalMap({ active, language }: { active: string; language: Language }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;
  const skill: Skill = active in labels ? active as Skill : "technical";

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !window.WebGLRenderingContext) return;
    let disposed = false;
    let started = false;
    let visible = false;
    let frame = 0;
    let resumeScene = () => {};
    let teardown = () => {};
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const start = async () => {
      if (started || disposed) return;
      started = true;
      try {
        const THREE = await import("three");
        if (disposed || !hostRef.current) return;
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-5, 5, 1.25, -1.25, 0.1, 10);
        camera.position.z = 5;
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setClearAlpha(0);
        renderer.domElement.setAttribute("aria-hidden", "true");
        host.appendChild(renderer.domElement);
        host.classList.add("is-rendered");

        const paths = Array.from({ length: 7 }, (_, pathIndex) => {
          const positions = new Float32Array(65 * 3);
          const geometry = new THREE.BufferGeometry();
          geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
          const material = new THREE.LineBasicMaterial({ transparent: true, opacity: pathIndex === 3 ? 0.66 : 0.14 });
          const line = new THREE.Line(geometry, material);
          scene.add(line);
          return { positions, geometry, material, pathIndex };
        });
        const dotGeometry = new THREE.CircleGeometry(0.055, 16);
        const dotMaterial = new THREE.MeshBasicMaterial();
        const dot = new THREE.Mesh(dotGeometry, dotMaterial);
        scene.add(dot);
        const nodeGeometry = new THREE.CircleGeometry(0.035, 12);
        const nodeMaterial = new THREE.MeshBasicMaterial();
        const nodes = [-4, 0, 4].map((x) => {
          const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
          node.position.set(x, 0, 0);
          scene.add(node);
          return node;
        });
        let lastFrame = 0;
        let phase = 0;
        const recolor = () => {
          const light = document.documentElement.dataset.theme === "light";
          const color = new THREE.Color(light ? "#0369a1" : "#9bd8e9");
          paths.forEach(({ material }) => material.color.copy(color));
          dotMaterial.color.copy(color);
          nodeMaterial.color.copy(color);
        };
        const resize = () => {
          const bounds = host.getBoundingClientRect();
          renderer.setSize(Math.max(1, bounds.width), Math.max(1, bounds.height), false);
          camera.left = -5;
          camera.right = 5;
          camera.top = 1.25;
          camera.bottom = -1.25;
          camera.updateProjectionMatrix();
        };
        const render = (time = 0) => {
          if (disposed) return;
          const motion = !reduced.matches;
          if (time && time - lastFrame < 30 && motion) {
            frame = requestAnimationFrame(render);
            return;
          }
          const delta = lastFrame ? Math.min((time - lastFrame) / 1000, 0.05) : 0;
          lastFrame = time;
          if (motion) phase += delta;
          const skillIndex = Math.max(0, Object.keys(labels).indexOf(activeRef.current));
          paths.forEach(({ positions, geometry, pathIndex }) => {
            for (let i = 0; i <= 64; i++) {
              const t = i / 64;
              const x = -4 + t * 8;
              const envelope = Math.sin(Math.PI * t);
              const lane = pathIndex - 3;
              positions[i * 3] = x;
              positions[i * 3 + 1] = envelope * (lane * 0.14 + Math.sin(t * 11 + phase * 0.65 + lane * 0.85 + skillIndex * 0.5) * 0.085);
              positions[i * 3 + 2] = 0;
            }
            geometry.attributes.position.needsUpdate = true;
          });
          const t = motion ? (phase * 0.16) % 1 : 0.5;
          dot.position.set(-4 + t * 8, Math.sin(Math.PI * t) * Math.sin(t * 11 + phase * 0.65 + skillIndex * 0.5) * 0.085, 0.02);
          renderer.render(scene, camera);
          if (motion && visible && !document.hidden) frame = requestAnimationFrame(render);
        };
        const pause = () => { cancelAnimationFrame(frame); frame = 0; lastFrame = 0; };
        const resume = () => { pause(); if (visible && !document.hidden) render(); };
        resumeScene = resume;
        const themeObserver = new MutationObserver(() => { recolor(); if (reduced.matches) render(); });
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        const resizeObserver = new ResizeObserver(() => { resize(); if (reduced.matches) render(); });
        resizeObserver.observe(host);
        const onVisibility = () => { if (document.hidden) pause(); else resume(); };
        const onMotion = () => resume();
        document.addEventListener("visibilitychange", onVisibility);
        reduced.addEventListener("change", onMotion);
        recolor(); resize(); resume();
        teardown = () => {
          pause();
          themeObserver.disconnect(); resizeObserver.disconnect();
          document.removeEventListener("visibilitychange", onVisibility);
          reduced.removeEventListener("change", onMotion);
          paths.forEach(({ geometry, material }) => { geometry.dispose(); material.dispose(); });
          dotGeometry.dispose(); dotMaterial.dispose(); nodeGeometry.dispose(); nodeMaterial.dispose();
          nodes.forEach((node) => scene.remove(node));
          renderer.dispose(); renderer.domElement.remove();
          host.classList.remove("is-rendered");
        };
      } catch { /* The static diagram remains visible when WebGL is unavailable. */ }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) void start();
      if (visible) resumeScene();
      else { cancelAnimationFrame(frame); frame = 0; }
    }, { rootMargin: "120px" });
    observer.observe(host);
    return () => { disposed = true; observer.disconnect(); teardown(); };
  }, []);

  return (
    <div className="skill-signal" role="img" aria-label={language === "vi" ? `Sơ đồ minh họa: ${labels[skill].vi.join(" → ")}` : `Illustrative diagram: ${labels[skill].en.join(" → ")}`}>
      <div className="skill-signal-canvas" ref={hostRef}>
        <svg className="skill-signal-fallback" viewBox="0 0 800 120" preserveAspectRatio="none" aria-hidden="true"><path d="M48 60 C240 16 560 104 752 60" /><path d="M48 60 C240 104 560 16 752 60" /><path d="M48 60 H752" /></svg>
      </div>
      <div className="skill-signal-labels" aria-hidden="true">
        {labels[skill][language].map((label) => <span key={label}>{label}</span>)}
      </div>
    </div>
  );
}
