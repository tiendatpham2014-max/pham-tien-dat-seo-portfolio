"use client";

import { copy } from "@/content/portfolio";
import { useSitePreferences } from "@/components/site-preferences";

const skills = [
  { id: "technical", label: "skillTechnical", headline: "technicalHeadline", problem: "technicalProblem", approach: "technicalApproach", output: "technicalOutput", tools: "Screaming Frog · Core Web Vitals · GSC · GTM · URL patterns" },
  { id: "content", label: "skillContent", headline: "contentHeadline", problem: "contentProblem", approach: "contentApproach", output: "contentOutput", tools: "Ahrefs · Semrush · Keyword mapping · WordPress · On-page" },
  { id: "analytics", label: "skillAnalytics", headline: "analyticsHeadline", problem: "analyticsProblem", approach: "analyticsApproach", output: "analyticsOutput", tools: "Google Search Console · GA4 · Semrush · Looker Studio" },
  { id: "workflow", label: "skillWorkflow", headline: "workflowHeadline", problem: "workflowProblem", approach: "workflowApproach", output: "workflowOutput", tools: "Google Sheets · Apps Script · Claude · GPT" },
] as const;

export function Skills() {
  const { language } = useSitePreferences();
  const words = copy[language];

  return (
    <section className="skills section-space" id="skills" aria-labelledby="skills-title">
      <div className="shell skill-sequence">
        <div className="skill-sequence-intro">
          <h2 className="display-heading" id="skills-title">{words.skillsTitle}</h2>
          <p>{words.skillsIntro}</p>
        </div>
        <div className="skill-sequence-list">
          {skills.map((skill, index) => (
            <article className="skill-sequence-item" key={skill.id}>
              <div className="skill-sequence-heading">
                <span className="skill-sequence-index">0{index + 1} / 04</span>
                <span className="skill-sequence-label">{words[skill.label]}</span>
                <h3>{words[skill.headline]}</h3>
              </div>
              <dl>
                <div><dt>{words.problem}</dt><dd>{words[skill.problem]}</dd></div>
                <div><dt>{words.approach}</dt><dd>{words[skill.approach]}</dd></div>
                <div><dt>{words.output}</dt><dd>{words[skill.output]}</dd></div>
              </dl>
              <p className="skill-sequence-tools">{skill.tools}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
