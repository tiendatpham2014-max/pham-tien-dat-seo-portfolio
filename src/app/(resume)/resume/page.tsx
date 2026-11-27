import type { Metadata } from "next";
import { resume } from "@/content/resume";
import { ResumeActions } from "@/components/portfolio/ResumeActions";
export const metadata:Metadata = {
  metadataBase:new URL("https://datpham.io.vn"), title:"Dat Pham — English Resume | SEO Executive",
  description:"English resume of Dat Pham: SEO experience at Primas, selected projects, technical SEO, content and analytics skills.",
  alternates:{canonical:"/resume/"},
  robots:{index:true,follow:true,googleBot:{index:true,follow:true,"max-image-preview":"none"}},
  openGraph:{type:"profile",title:"Dat Pham — English Resume",description:"English resume of Dat Pham: SEO experience at Primas, selected projects, technical SEO, content and analytics skills.",url:"/resume/",locale:"en_US"},
  icons:{
    icon:[{url:"/favicon.svg",type:"image/svg+xml"},{url:"/favicon-32x32.png",sizes:"32x32",type:"image/png"},{url:"/favicon-48x48.png",sizes:"48x48",type:"image/png"},{url:"/favicon.ico"}],
    apple:[{url:"/apple-touch-icon.png",sizes:"180x180",type:"image/png"}],
    shortcut:"/favicon.ico"
  }
};
export default function ResumePage(){
  return <div className="resume-page">
    <a className="resume-skip" href="#resume-content">Skip to resume</a>
    <nav className="resume-nav" aria-label="Resume navigation"><a href="/en/">← Portfolio</a><a href="#experience">Experience</a><a href="#projects">Projects</a><a href="#resume-skills">Skills</a></nav>
    <main className="resume-sheet" id="resume-content">
      <header className="resume-header"><div><h1>{resume.name}</h1><p className="resume-title">{resume.title}</p><p>{resume.location}</p><div className="resume-contact"><a href={`mailto:${resume.email}`}>{resume.email}</a><a href={resume.linkedin} rel="noopener noreferrer" target="_blank">LinkedIn ↗</a></div></div><ResumeActions /></header>
      <p className="resume-profile">{resume.profile}</p>
      <div className="resume-columns">
        <div>
          <section id="experience" aria-labelledby="experience-title"><h2 id="experience-title">Professional experience</h2><p className="resume-company">{resume.company}</p>
            {resume.experience.map(job=><article className="resume-entry" key={job.role}><div className="resume-entry-heading"><h3>{job.role}</h3><span>{job.period}</span></div><ul>{job.points.map(point=><li key={point}>{point}</li>)}</ul></article>)}
          </section>
          <section id="projects" aria-labelledby="projects-title"><h2 id="projects-title">Selected projects</h2>
            {resume.projects.map(project=><article className="resume-entry" key={project.name}><div className="resume-entry-heading"><h3>{project.name}</h3><span>{project.period}</span></div><p className="resume-project-field">{project.field}</p><ul>{project.points.map(point=><li key={point}>{point}</li>)}</ul></article>)}
          </section>
        </div>
        <aside>
          <section id="resume-skills" aria-labelledby="resume-skills-title"><h2 id="resume-skills-title">Skills</h2><dl>{resume.skills.map(skill=><div key={skill.label}><dt>{skill.label}</dt><dd>{skill.text}</dd></div>)}</dl></section>
          <section aria-labelledby="education-title"><h2 id="education-title">Education</h2><h3>{resume.education.school}</h3><p>{resume.education.period}</p><p>{resume.education.qualification}</p></section>
        </aside>
      </div>
      <footer className="resume-footer"><a href="/en/">View portfolio and project evidence ↗</a><span>English resume · November 2026</span></footer>
    </main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"ProfilePage",url:"https://datpham.io.vn/resume/",inLanguage:"en",mainEntity:{"@type":"Person","@id":"https://datpham.io.vn/#person",name:"Phạm Tiến Đạt",alternateName:"Dat Pham",url:"https://datpham.io.vn/",email:resume.email,sameAs:[resume.linkedin]}})}} />
  </div>;
}
