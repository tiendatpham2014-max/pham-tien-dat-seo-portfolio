"use client";

import { useEffect, useRef, useState } from "react";
import type { BufferGeometry, Material, Mesh, Vector3 } from "three";

type AtlasProps = {
  progress: number;
  theme: "dark" | "light";
  onStageSelect: (index: number) => void;
  onOrbit: (yaw: number, pitch: number) => void;
};

/** One diagram changes shape as the visitor moves through five SEO decisions. */
export function SearchAtlasCanvas({ progress, theme, onStageSelect, onOrbit }: AtlasProps) {
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
        const lowEnd = constrained || host.clientWidth <= 520;
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !lowEnd, powerPreference: "low-power" });
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        host.appendChild(renderer.domElement);

        const light = theme === "light";
        const model = new THREE.Group();
        scene.add(model);
        const disposables: Array<BufferGeometry | Material> = [];
        const nodeCount = 36;
        const stagePositions: Vector3[][] = [[], [], [], [], []];
        const clusterCenters = [[-1.55, .86], [1.55, .86], [-1.55, -.86], [1.55, -.86]];
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

          const ring = Math.floor(i / 9);
          const ringAngle = i % 9 / 9 * Math.PI * 2 + ring * .14;
          const ringRadius = .65 + ring * .54;
          stagePositions[3].push(new THREE.Vector3(
            Math.cos(ringAngle) * ringRadius,
            Math.sin(ringAngle) * ringRadius * .75,
            (ring - 1.5) * .13,
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
          if (stage === 4) return new THREE.Color(i % 3 === 1 ? palettes[0] : muted);
          return signal.clone();
        }));

        const nodeGeometry = new THREE.SphereGeometry(.06, 8, 6);
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
          [
            ...Array.from({ length: 36 }, (_, i) => [i, Math.floor(i / 9) * 9 + (i + 1) % 9] as [number, number]),
            ...Array.from({ length: 9 }, (_, i) => [i, i + 9] as [number, number]),
            ...Array.from({ length: 9 }, (_, i) => [i + 18, i + 27] as [number, number]),
          ],
          Array.from({ length: 33 }, (_, i) => [i, i + 3] as [number, number]),
        ];
        const edgeOpacity = [.2, .42, .53, .4, .23];
        const edgeGeometries = links.map((stageLinks, stage) => {
          const geometry = new THREE.BufferGeometry();
          geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(stageLinks.length * 6), 3).setUsage(THREE.DynamicDrawUsage));
          const material = new THREE.LineBasicMaterial({ color: light ? 0x457b83 : palettes[stage % palettes.length], transparent: true, opacity: 0, depthWrite: false });
          const edges = new THREE.LineSegments(geometry, material);
          edges.frustumCulled = false;
          model.add(edges);
          disposables.push(geometry, material);
          return { geometry, material };
        });

        const priorityGeometry = new THREE.BufferGeometry();
        priorityGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(12 * 3), 3).setUsage(THREE.DynamicDrawUsage));
        const priorityMaterial = new THREE.LineBasicMaterial({ color: light ? 0x137b8a : 0xc7fff0, transparent: true, opacity: 0, depthWrite: false });
        const priorityLine = new THREE.Line(priorityGeometry, priorityMaterial);
        priorityLine.frustumCulled = false;
        model.add(priorityLine);
        disposables.push(priorityGeometry, priorityMaterial);

        const intentMaterials = clusterCenters.map(([x, y], index) => {
          const points = Array.from({ length: 48 }, (_, i) => {
            const angle = i / 48 * Math.PI * 2;
            return new THREE.Vector3(x + Math.cos(angle) * .62, y + Math.sin(angle) * .43, -.22);
          });
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({ color: palettes[index], transparent: true, opacity: 0, depthWrite: false });
          model.add(new THREE.LineLoop(geometry, material));
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

        const scanGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, .42), new THREE.Vector3(2.4, 0, .42)]);
        const scanMaterial = new THREE.LineBasicMaterial({ color: light ? 0x146c7a : 0xd1fff1, transparent: true, opacity: 0, depthWrite: false });
        const scanLine = new THREE.Line(scanGeometry, scanMaterial);
        model.add(scanLine);
        disposables.push(scanGeometry, scanMaterial);

        const routeGeometry = new THREE.CylinderGeometry(.025, .025, 1, 6);
        const routeMaterial = new THREE.MeshBasicMaterial({ color: light ? 0x137b8a : 0xc7fff0, transparent: true, opacity: 0, depthWrite: false });
        const routeSegments = new THREE.InstancedMesh(routeGeometry, routeMaterial, 11);
        routeSegments.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        routeSegments.frustumCulled = false;
        model.add(routeSegments);
        disposables.push(routeGeometry, routeMaterial);
        const vertical = new THREE.Vector3(0, 1, 0);
        const direction = new THREE.Vector3();

        const markerGeometry = new THREE.SphereGeometry(.07, 10, 8);
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
        let rendered = false;
        let contextLost = false;
        let pointer: { id: number; x: number; y: number; startX: number; startY: number; travel: number; scrolling: boolean } | null = null;
        const raycaster = new THREE.Raycaster();
        raycaster.layers.set(1);
        const pointerPoint = new THREE.Vector2();

        function scheduleDraw() {
          if (visible && !contextLost && !frame) frame = requestAnimationFrame(draw);
        }
        requestFrameRef.current = scheduleDraw;

        const resize = () => {
          const width = host.clientWidth;
          const height = host.clientHeight;
          if (!width || !height) return;
          const phone = width <= 520;
          camera.aspect = width / height;
          camera.position.z = phone ? 10.5 : width <= 1050 ? 9.5 : 8.5;
          camera.updateProjectionMatrix();
          model.position.set(phone ? 0 : width <= 1050 ? .5 : .85, phone ? .35 : 0, 0);
          model.scale.setScalar(phone ? .9 : 1);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, qualityReduced ? .75 : constrained || phone ? 1 : 1.5));
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
              renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, .75));
              renderer.setSize(host?.clientWidth || 1, host?.clientHeight || 1, false);
            }
          }
          previousRender = time;
          current += (progressRef.current - current) * .16;
          currentYaw += (targetYaw - currentYaw) * .16;
          currentPitch += (targetPitch - currentPitch) * .16;
          const stage = Math.max(0, Math.min(4, current * 4));
          const from = Math.min(3, Math.floor(stage));
          const to = Math.min(4, from + 1);
          const portion = Math.max(0, Math.min(1, stage - from));
          const blend = portion * portion * (3 - 2 * portion);
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
          edgeGeometries.forEach(({ geometry, material }, index) => {
            material.opacity = edgeOpacity[index] * Math.max(0, 1 - Math.abs(stage - index));
            if (material.opacity <= 0) return;
            const attribute = geometry.getAttribute("position") as import("three").BufferAttribute;
            links[index].forEach(([a, b], linkIndex) => {
              const start = currentPositions[a];
              const end = currentPositions[b];
              attribute.setXYZ(linkIndex * 2, start.x, start.y, start.z);
              attribute.setXYZ(linkIndex * 2 + 1, end.x, end.y, end.z);
            });
            attribute.needsUpdate = true;
          });
          priorityMaterial.opacity = .88 * Math.max(0, stage - 3);
          if (priorityMaterial.opacity > 0) {
            const attribute = priorityGeometry.getAttribute("position") as import("three").BufferAttribute;
            for (let i = 0; i < 12; i++) {
              const point = currentPositions[i * 3 + 1];
              attribute.setXYZ(i, point.x, point.y, point.z);
            }
            attribute.needsUpdate = true;
          }
          const intentStrength = Math.max(0, 1 - Math.abs(stage - 1));
          intentMaterials.forEach((material) => { material.opacity = .55 * intentStrength; });
          pageMaterial.opacity = .2 * Math.max(0, 1 - Math.abs(stage - 2));
          for (let i = 0; i < 6; i++) {
            dummy.position.copy(currentPositions[i + 1]);
            dummy.quaternion.identity();
            dummy.scale.setScalar(1);
            dummy.updateMatrix();
            pageCards.setMatrixAt(i, dummy.matrix);
          }
          pageCards.instanceMatrix.needsUpdate = true;
          scanMaterial.opacity = .55 * Math.max(0, 1 - Math.abs(stage - 3));
          scanLine.rotation.z = current * Math.PI * 2;
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
          else previousRender = 0;
        }

        document.addEventListener("visibilitychange", onVisibility);
        scheduleDraw();
        cleanup = () => {
          cancelAnimationFrame(frame);
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
  }, [theme]);

  return <div ref={hostRef} className={`atlas-canvas${ready ? " is-ready" : ""}`} />;
}
