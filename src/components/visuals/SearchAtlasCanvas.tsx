"use client";

import { useEffect, useRef, useState } from "react";
import type { BufferGeometry, Group, InstancedMesh, Material, Mesh, Object3D, Vector3 } from "three";

/** Five connected planes form a spatial map controlled by scroll, direct selection, and drag. */
export function SearchAtlasCanvas({ progress, theme, onStageSelect, onOrbit }: { progress: number; theme: "dark" | "light"; onStageSelect: (index: number) => void; onOrbit: (yaw: number, pitch: number) => void }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(progress);
  const selectRef = useRef(onStageSelect);
  const orbitRef = useRef(onOrbit);
  const [ready, setReady] = useState(false);
  progressRef.current = progress;
  selectRef.current = onStageSelect;
  orbitRef.current = onOrbit;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    setReady(false);
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    const visibility = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting || cleanup || cancelled) return;
      visibility.disconnect();
      try {
        const THREE = await import("three");
        if (cancelled) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 90);
        const hardware = navigator as Navigator & { deviceMemory?: number };
        const constrained = (navigator.hardwareConcurrency || 8) <= 4 || (hardware.deviceMemory || 8) <= 4;
        const lowEnd = constrained || host.clientWidth <= 520;
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !lowEnd, powerPreference: "low-power" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowEnd ? 1 : 1.5));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        host.appendChild(renderer.domElement);
        const roots: Object3D[] = [];
        const disposables: Array<BufferGeometry | Material> = [];
        const pointPositions: Vector3[][] = [];
        const dotMeshes: Array<{ mesh: InstancedMesh; z: number }> = [];
        const layerGroups: Group[] = [];
        const markers: Array<{ mesh: Mesh; pick: Mesh; z: number; index: number }> = [];
        const ringCount = [9, 7, 8, 9, 5];
        const colors = [0x9be3d6, 0x87a4e8, 0xf2b990, 0xb5d3ed, 0xbce8b4];
        const light = theme === "light";
        for (let layer = 0; layer < 5; layer++) {
          const group = new THREE.Group();
          group.position.z = -layer * 6;
          scene.add(group);
          layerGroups.push(group);
          const positions: Vector3[] = [];
          const count = ringCount[layer];
          for (let i = 0; i < count; i++) {
            const angle = i / count * Math.PI * 2 + layer * 0.23;
            const radius = 2.2 + Math.sin(i * 6.4 + layer) * 0.35;
            positions.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius * .68, 0));
          }
          positions.push(new THREE.Vector3(0, 0, 0));
          pointPositions.push(positions.map((point) => point.clone().add(group.position)));
          const ring = new THREE.BufferGeometry().setFromPoints([...positions.slice(0, count), positions[0]]);
          const ringMaterial = new THREE.LineBasicMaterial({ color: light ? 0x366473 : colors[layer], transparent: true, opacity: light ? .32 : .48 });
          const ringLine = new THREE.Line(ring, ringMaterial);
          group.add(ringLine); disposables.push(ring, ringMaterial);
          for (let i = 0; i < count; i++) {
            const spoke = new THREE.BufferGeometry().setFromPoints([positions[i], positions[count]]);
            const spokeMaterial = new THREE.LineBasicMaterial({ color: light ? 0x527789 : colors[layer], transparent: true, opacity: .2 });
            const line = new THREE.Line(spoke, spokeMaterial);
            group.add(line); disposables.push(spoke, spokeMaterial);
          }
          const dotGeometry = new THREE.SphereGeometry(.025, 8, 8);
          const dotMaterial = new THREE.MeshBasicMaterial({ color: light ? 0x173c51 : 0xe5f5f2 });
          const dots = new THREE.InstancedMesh(dotGeometry, dotMaterial, count);
          const dummy = new THREE.Object3D();
          positions.slice(0, count).forEach((point, index) => { dummy.position.copy(point); dummy.updateMatrix(); dots.setMatrixAt(index, dummy.matrix); });
          dots.instanceMatrix.needsUpdate = true;
          group.add(dots); disposables.push(dotGeometry, dotMaterial);
          dotMeshes.push({ mesh: dots, z: -layer * 6 });
          const markerGeometry = new THREE.SphereGeometry(.095, 16, 16);
          const markerMaterial = new THREE.MeshBasicMaterial({ color: light ? 0x137b8a : 0xc7fff0 });
          const marker = new THREE.Mesh(markerGeometry, markerMaterial);
          group.add(marker);
          const pickGeometry = new THREE.SphereGeometry(.48, 12, 12);
          const pickMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });
          const pick = new THREE.Mesh(pickGeometry, pickMaterial);
          pick.userData.stageIndex = layer;
          group.add(pick);
          markers.push({ mesh: marker, pick, z: -layer * 6, index: layer });
          disposables.push(markerGeometry, markerMaterial, pickGeometry, pickMaterial);
        }
        for (let layer = 0; layer < 4; layer++) {
          const current = pointPositions[layer];
          const next = pointPositions[layer + 1];
          for (let i = 0; i < Math.min(current.length - 1, next.length - 1); i += 2) {
            const geometry = new THREE.BufferGeometry().setFromPoints([current[i], next[(i + layer) % (next.length - 1)]]);
            const material = new THREE.LineBasicMaterial({ color: light ? 0x578e9d : 0x9be3d6, transparent: true, opacity: light ? .24 : .31 });
            const line = new THREE.Line(geometry, material);
            scene.add(line); roots.push(line); disposables.push(geometry, material);
          }
          const path = new THREE.BufferGeometry().setFromPoints([current[current.length - 1], next[next.length - 1]]);
          const pathMaterial = new THREE.LineBasicMaterial({ color: light ? 0x137b8a : 0xd6fff2, transparent: true, opacity: .8 });
          const pathLine = new THREE.Line(path, pathMaterial);
          scene.add(pathLine); roots.push(pathLine); disposables.push(path, pathMaterial);
        }
        let frame = 0;
        let current = progressRef.current;
        let visible = true;
        let targetYaw = 0;
        let targetPitch = 0;
        let phone = false;
        let frameBudget = lowEnd ? 1000 / 30 : 0;
        let lastDraw = 0;
        let previousRender = 0;
        let slowFrames = 0;
        let qualityReduced = false;
        let pointer: { id: number; x: number; y: number; travel: number } | null = null;
        const raycaster = new THREE.Raycaster();
        const pointerPoint = new THREE.Vector2();
        const resize = () => {
          const width = host.clientWidth;
          const height = host.clientHeight;
          if (!width || !height) return;
          phone = width <= 520;
          frameBudget = constrained || phone ? 1000 / 30 : 0;
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, qualityReduced ? .75 : constrained || phone ? 1 : 1.5));
          camera.aspect = width / height;
          camera.zoom = width > 800 ? 1 : width > 520 ? Math.min(.82, camera.aspect / 1.15) : Math.min(.65, camera.aspect / 1.05);
          camera.updateProjectionMatrix();
          renderer.setSize(width, height, false);
        };
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(host);
        resize();
        const onVisibility = () => { visible = !document.hidden; if (visible && !frame) frame = requestAnimationFrame(draw); };
        const onIntersect = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting && !document.hidden; if (visible && !frame) frame = requestAnimationFrame(draw); }, { threshold: 0 });
        onIntersect.observe(host);
        const onPointerDown = (event: PointerEvent) => {
          if (event.button !== 0 || pointer) return;
          pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, travel: 0 };
          host.setPointerCapture(event.pointerId);
          host.classList.add("is-dragging");
        };
        const onPointerMove = (event: PointerEvent) => {
          if (pointer?.id !== event.pointerId) return;
          const dx = event.clientX - pointer.x;
          const dy = event.clientY - pointer.y;
          pointer.travel += Math.abs(dx) + Math.abs(dy);
          targetYaw = Math.max(-.75, Math.min(.75, targetYaw + dx * .006));
          targetPitch = Math.max(-.42, Math.min(.42, targetPitch + dy * .004));
          orbitRef.current(targetYaw, targetPitch);
          pointer.x = event.clientX;
          pointer.y = event.clientY;
        };
        const onPointerUp = (event: PointerEvent) => {
          if (pointer?.id !== event.pointerId) return;
          const wasClick = pointer.travel <= 3;
          pointer = null;
          host.classList.remove("is-dragging");
          if (host.hasPointerCapture(event.pointerId)) host.releasePointerCapture(event.pointerId);
          if (!wasClick) return;
          const rect = host.getBoundingClientRect();
          pointerPoint.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
          raycaster.setFromCamera(pointerPoint, camera);
          const hits = raycaster.intersectObjects(markers.filter(({ pick }) => pick.visible).map(({ pick }) => pick));
          if (hits.length) {
            const index = hits[0].object.userData.stageIndex as number;
            selectRef.current(index === Math.round(progressRef.current * 4) ? Math.min(4, index + 1) : index);
          }
        };
        const onPointerCancel = (event: PointerEvent) => {
          if (pointer?.id !== event.pointerId) return;
          pointer = null;
          host.classList.remove("is-dragging");
          if (host.hasPointerCapture(event.pointerId)) host.releasePointerCapture(event.pointerId);
        };
        host.addEventListener("pointerdown", onPointerDown);
        host.addEventListener("pointermove", onPointerMove);
        host.addEventListener("pointerup", onPointerUp);
        host.addEventListener("pointercancel", onPointerCancel);
        host.addEventListener("lostpointercapture", onPointerCancel);
        let rendered = false;
        let contextLost = false;
        const onContextLost = (event: Event) => {
          event.preventDefault();
          contextLost = true;
          rendered = false;
          setReady(false);
        };
        const onContextRestored = () => {
          contextLost = false;
          if (!frame && visible) frame = requestAnimationFrame(draw);
        };
        renderer.domElement.addEventListener("webglcontextlost", onContextLost);
        renderer.domElement.addEventListener("webglcontextrestored", onContextRestored);
        function draw(time = 0) {
          frame = 0;
          if (!visible || contextLost) return;
          if (frameBudget && lastDraw && time - lastDraw < frameBudget) {
            frame = requestAnimationFrame(draw);
            return;
          }
          if (lowEnd && !qualityReduced && previousRender) {
            slowFrames = time - previousRender > 48 ? slowFrames + 1 : Math.max(0, slowFrames - 1);
            if (slowFrames >= 12) {
              qualityReduced = true;
              frameBudget = 1000 / 24;
              renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, .75));
              renderer.setSize(host?.clientWidth || 1, host?.clientHeight || 1, false);
            }
          }
          previousRender = time;
          lastDraw = time;
          current += (progressRef.current - current) * .12;
          const stage = current * 4;
          camera.position.set(0, .15 + Math.sin(stage * .55) * .18, 8 - current * 24);
          camera.lookAt(0, 0, camera.position.z - 7);
          layerGroups.forEach((group, index) => {
            const distance = camera.position.z - group.position.z;
            group.visible = !phone || (distance > 5.5 && distance < 20);
            group.rotation.y += (targetYaw * (1 + index * .04) - group.rotation.y) * .12;
            group.rotation.x += (targetPitch * (1 + index * .03) - group.rotation.x) * .12;
          });
          markers.forEach(({ mesh, pick, z, index }) => {
            const distance = camera.position.z - z;
            const shown = index >= Math.round(stage) && (!phone ? Math.abs(distance) > 4 : distance > 5.5 && distance < 20);
            mesh.visible = shown;
            pick.visible = shown;
          });
          dotMeshes.forEach(({ mesh, z }) => {
            const distance = camera.position.z - z;
            mesh.visible = !phone ? Math.abs(distance) > 4 : distance > 5.5 && distance < 20;
          });
          renderer.render(scene, camera);
          if (!rendered && renderer.domElement.clientWidth && renderer.domElement.clientHeight) {
            rendered = true;
            setReady(true);
          }
          frame = requestAnimationFrame(draw);
        }
        document.addEventListener("visibilitychange", onVisibility);
        frame = requestAnimationFrame(draw);
        cleanup = () => {
          cancelAnimationFrame(frame);
          renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
          renderer.domElement.removeEventListener("webglcontextrestored", onContextRestored);
          document.removeEventListener("visibilitychange", onVisibility);
          host.removeEventListener("pointerdown", onPointerDown);
          host.removeEventListener("pointermove", onPointerMove);
          host.removeEventListener("pointerup", onPointerUp);
          host.removeEventListener("pointercancel", onPointerCancel);
          host.removeEventListener("lostpointercapture", onPointerCancel);
          resizeObserver.disconnect(); onIntersect.disconnect();
          roots.forEach((root) => scene.remove(root));
          layerGroups.forEach((group) => scene.remove(group));
          disposables.forEach((item) => item.dispose());
          renderer.dispose(); renderer.domElement.remove();
        };
      } catch (error) {
        console.warn("Search atlas WebGL unavailable; using the CSS diagram.", error);
      }
    }, { rootMargin: "300px" });
    visibility.observe(host);
    return () => { cancelled = true; visibility.disconnect(); cleanup?.(); };
  }, [theme]);

  return <div ref={hostRef} className={`atlas-canvas${ready ? " is-ready" : ""}`} />;
}
