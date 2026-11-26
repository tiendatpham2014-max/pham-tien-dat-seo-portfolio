"use client";

import { useEffect, useRef, useState } from "react";
import { copy } from "@/content/portfolio";
import { useSitePreferences } from "@/components/site-preferences";
import { getLenis } from "@/components/portfolio/smooth-scroll";
import { WorkflowTool } from "./WorkflowTool";
import { SkillDiagram } from "./SkillDiagram";

const skills = [
  { id: "technical", label: "skillTechnical", headline: "technicalHeadline", problem: "technicalProblem", approach: "technicalApproach", output: "technicalOutput", tools: "Screaming Frog · Core Web Vitals · GSC · GTM · URL patterns" },
  { id: "content", label: "skillContent", headline: "contentHeadline", problem: "contentProblem", approach: "contentApproach", output: "contentOutput", tools: "Ahrefs · Semrush · Keyword mapping · WordPress · On-page" },
  { id: "analytics", label: "skillAnalytics", headline: "analyticsHeadline", problem: "analyticsProblem", approach: "analyticsApproach", output: "analyticsOutput", tools: "Google Search Console · GA4 · Semrush · Looker Studio" },
  { id: "workflow", label: "skillWorkflow", headline: "workflowHeadline", problem: "workflowProblem", approach: "workflowApproach", output: "workflowOutput", tools: "Google Sheets · Apps Script · Claude · GPT" },
] as const;

export function Skills() {
  const { language } = useSitePreferences();
  const words = copy[language];
  const sectionRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [reverse, setReverse] = useState(false);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMode = () => {
      setLeaving(null);
      setEnhanced(!motion.matches);
    };
    updateMode();
    motion.addEventListener("change", updateMode);
    return () => {
      motion.removeEventListener("change", updateMode);
    };
  }, []);

  useEffect(() => {
    if (!enhanced) return;
    let frame = 0;
    let leaveTimeout = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;
      const offset = 78;
      const stageHeight = section.querySelector<HTMLElement>(".skill-sequence")?.offsetHeight ?? window.innerHeight - offset;
      const travel = Math.max(1, section.offsetHeight - stageHeight);
      const progress = Math.max(0, Math.min(1, (offset - section.getBoundingClientRect().top) / travel));
      section.style.setProperty("--skill-progress", String(progress));
      const next = Math.min(skills.length - 1, Math.floor(progress * skills.length));
      if (next === activeRef.current) return;
      window.clearTimeout(leaveTimeout);
      setReverse(next < activeRef.current);
      setLeaving(activeRef.current);
      activeRef.current = next;
      setActive(next);
      leaveTimeout = window.setTimeout(() => setLeaving(null), 450);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(leaveTimeout);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      sectionRef.current?.style.removeProperty("--skill-progress");
    };
  }, [enhanced]);

  const goToSkill = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    if (!enhanced) {
      section.querySelectorAll<HTMLElement>(".skill-sequence-item")[index]?.scrollIntoView({ behavior: "instant", block: "start" });
      return;
    }
    const stageHeight = section.querySelector<HTMLElement>(".skill-sequence")?.offsetHeight ?? 0;
    const travel = Math.max(0, section.offsetHeight - stageHeight);
    // Aim inside the selected quarter, away from the transition boundary.
    const target = scrollY + section.getBoundingClientRect().top - 78 + travel * (index + .35) / skills.length;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { duration: .65 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section className={`skills section-space${enhanced ? " is-scroll-enhanced" : ""}${reverse ? " is-reverse" : ""}`} id="skills" aria-labelledby="skills-title" ref={sectionRef}>
      <div className="shell skill-sequence">
        <div className="skill-sequence-intro">
          <h2 className="display-heading" id="skills-title">{words.skillsTitle}</h2>
          <p>{words.skillsIntro}</p>
          <nav className="skill-shortcuts" aria-label={language === "vi" ? "Chọn nhóm chuyên môn" : "Choose a skill area"}>
            {skills.map((skill, index) => <button type="button" key={skill.id} aria-current={active === index ? "step" : undefined} onClick={() => goToSkill(index)}>
              <span aria-hidden="true">0{index + 1}</span>{words[skill.label]}
            </button>)}
          </nav>
        </div>
        <div className="skill-sequence-list">
          {skills.map((skill, index) => (
            <article className={`skill-sequence-item${active === index ? " is-current" : ""}${leaving === index && active !== index ? " is-leaving" : ""}`} aria-hidden={enhanced && active !== index} inert={enhanced && active !== index} key={skill.id}>
              <div className="skill-sequence-heading">
                <span className="skill-sequence-index">0{index + 1} / 04</span>
                <span className="skill-sequence-label">{words[skill.label]}</span>
                <h3>{words[skill.headline]}</h3>
              </div>
              <div className="skill-sequence-visual"><SkillDiagram kind={skill.id} language={language} /></div>
              <dl>
                <div><dt>{words.problem}</dt><dd>{words[skill.problem]}</dd></div>
                <div><dt>{words.approach}</dt><dd>{words[skill.approach]}</dd></div>
                <div><dt>{words.output}</dt><dd>{words[skill.output]}</dd></div>
              </dl>
              <p className="skill-sequence-tools">{skill.tools}</p>
              {skill.id === "workflow" && <WorkflowTool language={language} />}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
