"use client";

import { useSyncExternalStore, useState } from "react";
import {
  Tabs, TabsContent, TabsContents, TabsHighlight, TabsHighlightItem,
  TabsList, TabsTrigger,
} from "@animate-ui/react/primitives/tabs";
import { copy, type Language } from "@/content/portfolio";
import { SkillSignalMap } from "@/components/visuals/SkillSignalMap";

const skills = [
  { id: "technical", label: "skillTechnical", headline: "technicalHeadline", problem: "technicalProblem", approach: "technicalApproach", output: "technicalOutput", kicker: "Technical SEO", tools: "Screaming Frog · Core Web Vitals · GSC · GTM · URL patterns" },
  { id: "content", label: "skillContent", headline: "contentHeadline", problem: "contentProblem", approach: "contentApproach", output: "contentOutput", kicker: "Content Strategy", tools: "Ahrefs · Semrush · Keyword mapping · WordPress · On-page" },
  { id: "analytics", label: "skillAnalytics", headline: "analyticsHeadline", problem: "analyticsProblem", approach: "analyticsApproach", output: "analyticsOutput", kicker: "Analytics", tools: "Google Search Console · GA4 · Semrush · Looker Studio" },
  { id: "workflow", label: "skillWorkflow", headline: "workflowHeadline", problem: "workflowProblem", approach: "workflowApproach", output: "workflowOutput", kicker: "AI & Workflow", tools: "Google Sheets · Apps Script · Claude · GPT" },
] as const;

function subscribeLanguage(callback: () => void) {
  window.addEventListener("portfolio:language", callback);
  return () => window.removeEventListener("portfolio:language", callback);
}

function currentLanguage(): Language {
  return document.documentElement.lang === "en" ? "en" : "vi";
}

export function Skills() {
  const language = useSyncExternalStore<Language>(subscribeLanguage, currentLanguage, () => "vi");
  const [active, setActive] = useState("technical");
  const words = copy[language];

  return (
    <section className="skills section-space" id="skills" aria-labelledby="skills-title">
      <div className="shell">
        <div className="section-head">
          <div><h2 className="display-heading" id="skills-title">{words.skillsTitle}</h2></div>
          <p>{words.skillsIntro}</p>
        </div>
        <Tabs className="skill-layout" value={active} onValueChange={setActive} orientation="vertical">
          <TabsHighlight className="skill-tab-highlight">
            <TabsList className="skill-tabs" aria-label={words.skillsTablist}>
              {skills.map((skill) => (
                <TabsHighlightItem key={skill.id} value={skill.id} className="skill-tab-item">
                  <TabsTrigger value={skill.id}>{words[skill.label]}</TabsTrigger>
                </TabsHighlightItem>
              ))}
            </TabsList>
          </TabsHighlight>
          <div className="skill-panels">
            <SkillSignalMap active={active} language={language} />
            <TabsContents className="skill-contents">
              {skills.map((skill) => (
                <TabsContent key={skill.id} value={skill.id} className="skill-panel-content">
                  <span className="panel-kicker">{skill.kicker}</span>
                  <h3>{words[skill.headline]}</h3>
                  <dl>
                    <div><dt>{words.problem}</dt><dd>{words[skill.problem]}</dd></div>
                    <div><dt>{words.approach}</dt><dd>{words[skill.approach]}</dd></div>
                    <div><dt>{words.output}</dt><dd>{words[skill.output]}</dd></div>
                  </dl>
                  <p className="tool-line">{skill.tools}</p>
                </TabsContent>
              ))}
            </TabsContents>
          </div>
        </Tabs>
      </div>
    </section>
  );
}

