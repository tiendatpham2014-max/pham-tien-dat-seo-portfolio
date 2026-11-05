"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { searchAtlasCopy } from "@/content/search-atlas";
import { SearchAtlasCanvas } from "@/components/visuals/SearchAtlasCanvas";
import { useSitePreferences } from "@/components/site-preferences";
import { getLenis } from "@/components/portfolio/smooth-scroll";

export function SearchAtlas() {
  const { language, theme } = useSitePreferences();
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);
  const words = searchAtlasCopy[language];
  const sceneProgress = progress;
  const stageProgress = sceneProgress * 4;
  const active = Math.min(4, Math.max(0, Math.round(stageProgress)));

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMedia = () => setReduced(motion.matches);
    updateMedia();
    motion.addEventListener("change", updateMedia);
    return () => {
      motion.removeEventListener("change", updateMedia);
    };
  }, []);

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const section = sectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const stageHeight = section.querySelector<HTMLElement>(".atlas-sticky")?.offsetHeight ?? window.innerHeight;
        const distance = Math.max(1, section.offsetHeight - stageHeight);
        setProgress(Math.max(0, Math.min(1, -rect.top / distance)));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [reduced]);

  const goTo = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    if (reduced) {
      section.querySelectorAll<HTMLElement>(".atlas-mobile article")[index]?.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "center" });
      return;
    }
    const stageHeight = section.querySelector<HTMLElement>(".atlas-sticky")?.offsetHeight ?? window.innerHeight;
    const distance = Math.max(0, section.offsetHeight - stageHeight);
    const target = window.scrollY + section.getBoundingClientRect().top + distance * index / 4;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { duration: 1 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  const moveWithScene = (yaw: number, pitch: number) => {
    const section = sectionRef.current;
    if (!section) return;
    section.style.setProperty("--atlas-orbit-x", `${yaw * 62}px`);
    section.style.setProperty("--atlas-orbit-y", `${pitch * 52}px`);
    section.style.setProperty("--atlas-orbit-rot", `${yaw * 8}deg`);
  };

  return (
    <section className="search-atlas" id="atlas" ref={sectionRef} data-stage={active} aria-labelledby="atlas-title">
      <div className="atlas-sticky">
        <div className="atlas-visual" aria-hidden="true">
          <div className="atlas-fallback">
            {words.steps.map((step, index) => <span key={index} className={index === active ? "is-active" : ""}>{String(index + 1).padStart(2, "0")}</span>)}
          </div>
          {!reduced && <SearchAtlasCanvas progress={sceneProgress} theme={theme} language={language} onStageSelect={goTo} onOrbit={moveWithScene} />}
        </div>
        <div className="shell atlas-scene-header">
          <span className="rebuild-index">{words.eyebrow}</span>
          <h2 id="atlas-title">{words.title}</h2>
        </div>
        <div className="atlas-stations" aria-live="off">
          {words.steps.map((step, index) => {
            const delta = index - stageProgress;
            const visible = Math.max(0, 1 - Math.abs(delta) * 1.5);
            const style = {
              "--atlas-depth": `${-Math.abs(delta) * 540}px`,
              "--atlas-rise": `${delta * 22}vh`,
              "--atlas-opacity": visible.toFixed(3),
              "--atlas-scale": (1 - Math.min(0.28, Math.abs(delta) * .2)).toFixed(3),
            } as CSSProperties;
            return (
              <article className={`atlas-station ${index % 2 === 0 ? "is-left" : "is-right"}${index === 3 ? " is-measurement" : ""}`} style={style} key={index} aria-hidden={index !== active}>
                <span className="atlas-station-index">0{index + 1}<em>/05</em></span>
                <span className="atlas-station-rule" aria-hidden="true" />
                <div>
                  <span className="atlas-station-kicker">{words.stage} {index + 1} · {step.short}</span>
                  <h3>{step.name}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            );
          })}
        </div>
        <div className="shell atlas-controls">
          <p>{words.instruction}</p>
          <nav className="atlas-waypoints" aria-label={language === "vi" ? "Các lớp phân tích SEO" : "SEO analysis layers"}>
            {words.steps.map((step, index) => (
              <button type="button" key={index} className={index === active ? "is-active" : ""} onClick={() => goTo(index)} aria-current={index === active ? "step" : undefined} aria-label={`${String(index + 1).padStart(2, "0")} ${step.name}`}>
                <span>0{index + 1}</span><span>{step.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className="atlas-mobile shell">
        <p className="atlas-mobile-intro">{words.intro}</p>
        {words.steps.map((step, index) => <article key={index}><span>0{index + 1} / 05</span><h3>{step.name}</h3><p>{step.description}</p></article>)}
      </div>
    </section>
  );
}
