"use client";

import { useEffect, useRef, useState } from "react";
import type { BufferGeometry, Material, Mesh, Texture, Vector3 } from "three";
import type { Language } from "@/content/portfolio";

type AtlasProps = {
  progress: number;
  theme: "dark" | "light";
  language: Language;
  onStageSelect: (index: number) => void;
  onOrbit: (yaw: number, pitch: number) => void;
};

/** One diagram changes shape as the visitor moves through five SEO decisions. */
export function SearchAtlasCanvas({ progress, theme, language, onStageSelect, onOrbit }: AtlasProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(progress);
  const selectRef = useRef(onStageSelect);
  const orbitRef = useRef(onOrbit);
  const requestFrameRef = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false);
  progressRef.current = progress;
  selectRef.current = onStageSelect;
  orbitRef.current = onOrbit;

  useEffect(() => { requestFrameRef.current(); }, [progress]);

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
        const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 40);
        const hardware = navigator as Navigator & { deviceMemory?: number };
        const constrained = (navigator.hardwareConcurrency || 8) <= 4 || (hardware.deviceMemory || 8) <= 4;
        let lowEnd = constrained || host.clientWidth <= 520;
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !lowEnd, powerPreference: "low-power" });
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        host.appendChild(renderer.domElement);

        const light = theme === "light";
        const model = new THREE.Group();
        scene.add(model);
        const disposables: Array<BufferGeometry | Material | Texture> = [];
        const nodeCount = 36;
        const stagePositions: Vector3[][] = [[], [], [], [], []];
        const clusterCenters = [[-1.55, .86], [1.55, .86], [-1.55, -.86], [1.55, -.86]];
        const measurementRows = [1.1, .36, -.38, -1.12];
        const fraction = (value: number) => value - Math.floor(value);

        for (let i = 0; i < nodeCount; i++) {
          // Query signals start scattered; the deterministic layout is illustrative, not GSC data.
          stagePositions[0].push(new THREE.Vector3(
            (fraction(Math.sin(i * 127.1) * 43758.5) - .5) * 5.5,
            (fraction(Math.sin(i * 311.7) * 24634.6) - .5) * 3.35,
            (fraction(Math.sin(i * 74.3) * 12418.2) - .5) * 1.3,
          ));

          const cluster = i % 4;
          const within = Math.floor(i / 4);
          const angle = within * Math.PI * 2 / 9 + cluster * .22;
          const radius = within === 0 ? 0 : .2 + (within % 3) * .095;
          stagePositions[1].push(new THREE.Vector3(
            clusterCenters[cluster][0] + Math.cos(angle) * radius,
            clusterCenters[cluster][1] + Math.sin(angle) * radius * .75,
            (within % 3 - 1) * .15,
          ));

          if (i === 0) stagePositions[2].push(new THREE.Vector3(-2.35, 0, .3));
          else if (i < 7) stagePositions[2].push(new THREE.Vector3(-.65, (i - 3.5) * .54, .1));
          else {
            const category = (i - 7) % 6;
            const row = Math.floor((i - 7) / 6);
            stagePositions[2].push(new THREE.Vector3(1.25 + row * .25, (category - 2.5) * .54 + (row - 2) * .075, -.12));
          }

          const metric = Math.floor(i / 9);
          const point = i % 9;
          stagePositions[3].push(new THREE.Vector3(
            -.35 + point * .34,
            measurementRows[metric],
            .14,
          ));

          const lane = i % 3;
          const distance = Math.floor(i / 3) / 11;
          stagePositions[4].push(new THREE.Vector3(
            -2.45 + distance * 4.9,
            (lane - 1) * .72 + (lane === 1 ? Math.sin(distance * Math.PI) * .3 : 0),
            lane === 1 ? .35 : -.22,
          ));
        }

        const palettes = light
          ? [0x285d69, 0x46778f, 0x9b674a, 0x407d75]
          : [0xb7eee0, 0x9cb6f0, 0xf0c4a2, 0xc3e8c1];
        const signal = new THREE.Color(light ? 0x315d69 : 0xaedbdc);
        const muted = new THREE.Color(light ? 0x90aaa9 : 0x527079);
        const stageColors = stagePositions.map((_, stage) => Array.from({ length: nodeCount }, (_, i) => {
          if (stage === 1) return new THREE.Color(palettes[i % 4]);
          if (stage === 3) return new THREE.Color(palettes[Math.floor(i / 9)]);
          if (stage === 4) return new THREE.Color(i % 3 === 1 ? palettes[0] : muted);
          return signal.clone();
        }));

        const nodeGeometry = new THREE.SphereGeometry(.072, 12, 8);
        const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const nodes = new THREE.InstancedMesh(nodeGeometry, nodeMaterial, nodeCount);
        nodes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        model.add(nodes);
        disposables.push(nodeGeometry, nodeMaterial);
        const dummy = new THREE.Object3D();
        const blendedPosition = new THREE.Vector3();
        const blendedColor = new THREE.Color();
        const currentPositions = Array.from({ length: nodeCount }, () => new THREE.Vector3());

        const links: Array<Array<[number, number]>> = [
          Array.from({ length: 15 }, (_, i) => [i * 2, i * 2 + 1] as [number, number]),
          Array.from({ length: 32 }, (_, i) => [i + 4, (i + 4) % 4] as [number, number]),
          [
            ...Array.from({ length: 6 }, (_, i) => [0, i + 1] as [number, number]),
            ...Array.from({ length: 29 }, (_, i) => [7 + i, 1 + i % 6] as [number, number]),
          ],
          Array.from({ length: 36 }, (_, i) => i % 9 < 8 ? [[i, i + 1] as [number, number]] : []).flat(),
          Array.from({ length: 33 }, (_, i) => [i, i + 3] as [number, number]),
        ];
        const edgeOpacity = [.32, .58, .66, .72, .32];
        const edgeGeometry = new THREE.CylinderGeometry(.012, .012, 1, 6);
        disposables.push(edgeGeometry);
        const vertical = new THREE.Vector3(0, 1, 0);
        const direction = new THREE.Vector3();
        const edgeMeshes = links.map((stageLinks, stage) => {
          const material = new THREE.MeshBasicMaterial({ color: stage === 3 ? 0xffffff : light ? 0x397581 : palettes[stage % palettes.length], transparent: true, opacity: 0, depthWrite: false });
          const mesh = new THREE.InstancedMesh(edgeGeometry, material, stageLinks.length);
          mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
          if (stage === 3) stageLinks.forEach(([a], index) => mesh.setColorAt(index, new THREE.Color(palettes[Math.floor(a / 9)])));
          mesh.frustumCulled = false;
          model.add(mesh);
          disposables.push(material);
          return { mesh, material };
        });

        const intentMaterials = clusterCenters.map(([x, y], index) => {
          const points = Array.from({ length: 48 }, (_, i) => {
            const angle = i / 48 * Math.PI * 2;
            return new THREE.Vector3(x + Math.cos(angle) * .62, y + Math.sin(angle) * .43, -.22);
          });
          const geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points, true), 48, .013, 5, true);
          const material = new THREE.MeshBasicMaterial({ color: palettes[index], transparent: true, opacity: 0, depthWrite: false });
          model.add(new THREE.Mesh(geometry, material));
          disposables.push(geometry, material);
          return material;
        });

        const pageGeometry = new THREE.PlaneGeometry(.58, .34);
        const pageMaterial = new THREE.MeshBasicMaterial({ color: light ? 0x377786 : 0xa4d9db, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide });
        const pageCards = new THREE.InstancedMesh(pageGeometry, pageMaterial, 6);
        pageCards.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        pageCards.frustumCulled = false;
        model.add(pageCards);
        disposables.push(pageGeometry, pageMaterial);

        // One evidence surface keeps the same moving nodes in view across the transition.
        const panelGeometry = new THREE.PlaneGeometry(5.4, 3.35);
        const panelMaterial = new THREE.MeshBasicMaterial({ color: light ? 0xffffff : 0x2c5663, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide });
        const panel = new THREE.Mesh(panelGeometry, panelMaterial);
        panel.position.z = -.22;
        model.add(panel);
        disposables.push(panelGeometry, panelMaterial);

        const railGeometry = new THREE.BoxGeometry(.035, 2.85, .035);
        const railMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false });
        const rail = new THREE.Mesh(railGeometry, railMaterial);
        rail.position.set(-2.52, 0, .16);
        model.add(rail);
        disposables.push(railGeometry, railMaterial);

        const metricNames = language === "vi" ? ["NHẤP", "HIỂN THỊ", "CTR", "VỊ TRÍ"] : ["CLICKS", "IMPRESSIONS", "CTR", "POSITION"];
        const metricLabels = measurementRows.map((y, index) => {
          const canvas = document.createElement("canvas");
          canvas.width = 512;
          canvas.height = 128;
          const context = canvas.getContext("2d");
          if (!context) throw new Error("2D canvas unavailable for measurement labels");
          context.fillStyle = light ? "#164a55" : "#e5f6f2";
          context.font = '600 55px "Be Vietnam Pro", sans-serif';
          context.textAlign = "center";
          context.textBaseline = "middle";
          context.fillText(metricNames[index], 256, 64, 480);
          const texture = new THREE.CanvasTexture(canvas);
          texture.colorSpace = THREE.SRGBColorSpace;
          const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0, depthWrite: false, depthTest: false });
          const sprite = new THREE.Sprite(material);
          sprite.position.set(-1.55, y, .46);
          sprite.scale.set(1.5, .34, 1);
          sprite.renderOrder = 2;
          model.add(sprite);
          disposables.push(texture, material);
          return { sprite, material };
        });

        const routeGeometry = new THREE.CylinderGeometry(.025, .025, 1, 6);
        const routeMaterial = new THREE.MeshBasicMaterial({ color: light ? 0x137b8a : 0xc7fff0, transparent: true, opacity: 0, depthWrite: false });
        const routeSegments = new THREE.InstancedMesh(routeGeometry, routeMaterial, 11);
        routeSegments.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        routeSegments.frustumCulled = false;
        model.add(routeSegments);
        disposables.push(routeGeometry, routeMaterial);
        const markerGeometry = new THREE.SphereGeometry(.085, 14, 10);
        const pickGeometry = new THREE.SphereGeometry(.33, 8, 6);
        const pickMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });
        const markers: Array<{ mesh: Mesh; pick: Mesh; material: Material }> = [];
        for (let index = 0; index < 5; index++) {
          const material = new THREE.MeshBasicMaterial({ color: light ? 0x286c77 : 0xb6dfd8, transparent: true, opacity: .5 });
          const mesh = new THREE.Mesh(markerGeometry, material);
          const pick = new THREE.Mesh(pickGeometry, pickMaterial);
          mesh.position.set((index - 2) * 1.02, -2.15, .3);
          pick.position.copy(mesh.position);
          pick.userData.stageIndex = index;
          pick.layers.set(1);
          model.add(mesh, pick);
          markers.push({ mesh, pick, material });
          disposables.push(material);
        }
        disposables.push(markerGeometry, pickGeometry, pickMaterial);

        let frame = 0;
        let current = progressRef.current;
        let currentYaw = 0;
        let currentPitch = 0;
        let targetYaw = 0;
        let targetPitch = 0;
        let visible = true;
        let previousRender = 0;
        let slowFrames = 0;
        let qualityReduced = false;
        let restoreTimer = 0;
        let viewportWidth = host.clientWidth;
        let rendered = false;
        let contextLost = false;
        let pointer: { id: number; x: number; y: number; startX: number; startY: number; travel: number; scrolling: boolean } | null = null;
        const raycaster = new THREE.Raycaster();
        raycaster.layers.set(1);
        const pointerPoint = new THREE.Vector2();

        function scheduleDraw() {
          if (restoreTimer) { clearTimeout(restoreTimer); restoreTimer = 0; }
          if (visible && !contextLost && !frame) frame = requestAnimationFrame(draw);
        }
        requestFrameRef.current = scheduleDraw;

        const resize = () => {
          const width = host.clientWidth;
          const height = host.clientHeight;
          if (!width || !height) return;
          viewportWidth = width;
          const phone = width <= 520;
          lowEnd = constrained || phone;
          camera.aspect = width / height;
          camera.position.z = phone ? 10.5 : width <= 1050 ? 9.5 : 8.5;
          camera.updateProjectionMatrix();
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, qualityReduced ? .9 : constrained ? 1 : phone ? 1.3 : 1.6));
          renderer.setSize(width, height, false);
          scheduleDraw();
        };
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(host);
        resize();

        const onVisibility = () => {
          visible = !document.hidden;
          if (visible) scheduleDraw();
          else { cancelAnimationFrame(frame); frame = 0; previousRender = 0; }
        };
        const onIntersect = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting && !document.hidden;
          if (visible) scheduleDraw();
          else { cancelAnimationFrame(frame); frame = 0; previousRender = 0; }
        }, { threshold: 0 });
        onIntersect.observe(host);

        const onPointerDown = (event: PointerEvent) => {
          if (event.button !== 0 || pointer) return;
          pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, startX: event.clientX, startY: event.clientY, travel: 0, scrolling: false };
          host.setPointerCapture(event.pointerId);
          host.classList.add("is-dragging");
        };
        const onPointerMove = (event: PointerEvent) => {
          if (pointer?.id !== event.pointerId) return;
          const dx = event.clientX - pointer.x;
          const dy = event.clientY - pointer.y;
          const totalX = event.clientX - pointer.startX;
          const totalY = event.clientY - pointer.startY;
          pointer.travel += Math.abs(dx) + Math.abs(dy);
          pointer.x = event.clientX;
          pointer.y = event.clientY;
          if (event.pointerType === "touch" && Math.abs(totalY) > Math.abs(totalX) && Math.abs(totalY) > 5) pointer.scrolling = true;
          if (pointer.scrolling) return;
          targetYaw = Math.max(-.7, Math.min(.7, targetYaw + dx * .006));
          targetPitch = Math.max(-.38, Math.min(.38, targetPitch + dy * .004));
          orbitRef.current(targetYaw, targetPitch);
          scheduleDraw();
        };
        const onPointerUp = (event: PointerEvent) => {
          if (pointer?.id !== event.pointerId) return;
          const wasClick = pointer.travel <= 5 && !pointer.scrolling;
          pointer = null;
          host.classList.remove("is-dragging");
          if (host.hasPointerCapture(event.pointerId)) host.releasePointerCapture(event.pointerId);
          if (!wasClick) return;
          const rect = host.getBoundingClientRect();
          pointerPoint.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
          raycaster.setFromCamera(pointerPoint, camera);
          const hits = raycaster.intersectObjects(markers.map(({ pick }) => pick));
          if (hits.length) selectRef.current(hits[0].object.userData.stageIndex as number);
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

        const onContextLost = (event: Event) => {
          event.preventDefault();
          contextLost = true;
          cancelAnimationFrame(frame);
          frame = 0;
          rendered = false;
          setReady(false);
        };
        const onContextRestored = () => { contextLost = false; scheduleDraw(); };
        renderer.domElement.addEventListener("webglcontextlost", onContextLost);
        renderer.domElement.addEventListener("webglcontextrestored", onContextRestored);

        function draw(time: number) {
          frame = 0;
          if (!visible || contextLost) return;
          if (lowEnd && !qualityReduced && previousRender) {
            slowFrames = time - previousRender > 26 ? slowFrames + 1 : Math.max(0, slowFrames - 1);
            if (slowFrames >= 8) {
              qualityReduced = true;
              renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, .9));
              renderer.setSize(host?.clientWidth || 1, host?.clientHeight || 1, false);
            }
          }
          previousRender = time;
          current += (progressRef.current - current) * .16;
          currentYaw += (targetYaw - currentYaw) * .16;
          currentPitch += (targetPitch - currentPitch) * .16;
          const stage = Math.max(0, Math.min(4, current * 4));
          const measurementStrength = Math.max(0, 1 - Math.abs(stage - 3));
          const from = Math.min(3, Math.floor(stage));
          const to = Math.min(4, from + 1);
          const portion = Math.max(0, Math.min(1, stage - from));
          const blend = portion * portion * (3 - 2 * portion);
          const baseX = viewportWidth <= 520 ? 0 : viewportWidth <= 1050 ? .5 : .85;
          const baseY = viewportWidth <= 520 ? .35 : 0;
          const targetX = viewportWidth <= 800 ? 0 : viewportWidth <= 850 ? -1.15 : viewportWidth <= 1050 ? -1.4 : -1.8;
          const targetY = viewportWidth <= 520 ? 1.4 : viewportWidth <= 800 ? .9 : 0;
          const baseScale = viewportWidth <= 520 ? .9 : 1;
          const targetScale = viewportWidth <= 800 ? baseScale : viewportWidth <= 850 ? .72 : viewportWidth <= 1050 ? .8 : 1;
          model.position.set(
            THREE.MathUtils.lerp(baseX, targetX, measurementStrength),
            THREE.MathUtils.lerp(baseY, targetY, measurementStrength),
            0,
          );
          model.scale.setScalar(THREE.MathUtils.lerp(baseScale, targetScale, measurementStrength));
          model.rotation.set(.12 + currentPitch, currentYaw, 0);

          for (let i = 0; i < nodeCount; i++) {
            blendedPosition.copy(stagePositions[from][i]).lerp(stagePositions[to][i], blend);
            currentPositions[i].copy(blendedPosition);
            dummy.position.copy(blendedPosition);
            dummy.scale.setScalar(stage > 3 && i % 3 === 1 ? 1.3 : 1);
            dummy.updateMatrix();
            nodes.setMatrixAt(i, dummy.matrix);
            blendedColor.copy(stageColors[from][i]).lerp(stageColors[to][i], blend);
            nodes.setColorAt(i, blendedColor);
          }
          nodes.instanceMatrix.needsUpdate = true;
          if (nodes.instanceColor) nodes.instanceColor.needsUpdate = true;
          edgeMeshes.forEach(({ mesh, material }, index) => {
            material.opacity = edgeOpacity[index] * Math.max(0, 1 - Math.abs(stage - index) * 1.5);
            mesh.visible = material.opacity > .001;
            if (!mesh.visible) return;
            links[index].forEach(([a, b], linkIndex) => {
              const start = currentPositions[a];
              const end = currentPositions[b];
              direction.subVectors(end, start);
              const length = direction.length();
              dummy.position.copy(start).add(end).multiplyScalar(.5);
              dummy.quaternion.setFromUnitVectors(vertical, direction.normalize());
              dummy.scale.set(1, length, 1);
              dummy.updateMatrix();
              mesh.setMatrixAt(linkIndex, dummy.matrix);
            });
            mesh.instanceMatrix.needsUpdate = true;
          });
          const intentStrength = Math.max(0, 1 - Math.abs(stage - 1));
          intentMaterials.forEach((material) => { material.opacity = .64 * intentStrength; });
          pageMaterial.opacity = .2 * Math.max(0, 1 - Math.abs(stage - 2));
          for (let i = 0; i < 6; i++) {
            dummy.position.copy(currentPositions[i + 1]);
            dummy.quaternion.identity();
            dummy.scale.setScalar(1);
            dummy.updateMatrix();
            pageCards.setMatrixAt(i, dummy.matrix);
          }
          pageCards.instanceMatrix.needsUpdate = true;
          const measurementVisible = measurementStrength > .001;
          panel.visible = measurementVisible;
          rail.visible = measurementVisible;
          panelMaterial.opacity = (light ? .7 : .52) * measurementStrength;
          railMaterial.opacity = .9 * measurementStrength;
          metricLabels.forEach(({ sprite, material }) => {
            sprite.visible = measurementVisible;
            material.opacity = .95 * measurementStrength;
          });
          routeMaterial.opacity = .82 * Math.max(0, stage - 3);
          if (routeMaterial.opacity > 0) {
            for (let i = 0; i < 11; i++) {
              const start = currentPositions[i * 3 + 1];
              const end = currentPositions[(i + 1) * 3 + 1];
              direction.subVectors(end, start);
              const length = direction.length();
              dummy.position.copy(start).add(end).multiplyScalar(.5);
              dummy.quaternion.setFromUnitVectors(vertical, direction.normalize());
              dummy.scale.set(1, length, 1);
              dummy.updateMatrix();
              routeSegments.setMatrixAt(i, dummy.matrix);
            }
            routeSegments.instanceMatrix.needsUpdate = true;
          }
          markers.forEach(({ mesh, material }, index) => {
            const focus = Math.max(0, 1 - Math.abs(stage - index));
            mesh.scale.setScalar(1 + focus * .6);
            material.opacity = .4 + focus * .6;
          });
          renderer.render(scene, camera);
          if (!rendered && renderer.domElement.clientWidth && renderer.domElement.clientHeight) {
            rendered = true;
            setReady(true);
          }
          if (Math.abs(progressRef.current - current) > .0007 || Math.abs(targetYaw - currentYaw) > .001 || Math.abs(targetPitch - currentPitch) > .001) scheduleDraw();
          else {
            previousRender = 0;
            if (qualityReduced && !restoreTimer) restoreTimer = window.setTimeout(() => {
              restoreTimer = 0;
              qualityReduced = false;
              slowFrames = 0;
              resize();
            }, 650);
          }
        }

        document.addEventListener("visibilitychange", onVisibility);
        scheduleDraw();
        cleanup = () => {
          cancelAnimationFrame(frame);
          clearTimeout(restoreTimer);
          requestFrameRef.current = () => {};
          renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
          renderer.domElement.removeEventListener("webglcontextrestored", onContextRestored);
          document.removeEventListener("visibilitychange", onVisibility);
          host.removeEventListener("pointerdown", onPointerDown);
          host.removeEventListener("pointermove", onPointerMove);
          host.removeEventListener("pointerup", onPointerUp);
          host.removeEventListener("pointercancel", onPointerCancel);
          host.removeEventListener("lostpointercapture", onPointerCancel);
          resizeObserver.disconnect();
          onIntersect.disconnect();
          disposables.forEach((item) => item.dispose());
          nodes.dispose();
          edgeMeshes.forEach(({ mesh }) => mesh.dispose());
          pageCards.dispose();
          routeSegments.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch (error) {
        console.warn("Search atlas WebGL unavailable; using the CSS diagram.", error);
      }
    }, { rootMargin: "300px" });
    visibility.observe(host);
    return () => { cancelled = true; visibility.disconnect(); cleanup?.(); };
  }, [theme, language]);

  return <div ref={hostRef} className={`atlas-canvas${ready ? " is-ready" : ""}`} />;
}
