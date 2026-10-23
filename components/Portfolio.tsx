import Header from './Header';
import MetricBoard from './MetricBoard';
import ProcessStage from './ProcessStage';
import ArticleExplorer from './ArticleExplorer';
import HeroName from './HeroName';
import AnimatedContent from './react-bits/AnimatedContent';
import { content, type Locale } from '@/lib/content';

const reveal = { distance: 26, duration: 0.72, initialOpacity: 0.35, threshold: 0.13 } as const;

export default function Portfolio({ locale }: { locale: Locale }) {
  const c = content[locale];

  return (
    <>
      <a className="skipLink" href="#main">{c.skip}</a>
      <Header locale={locale} />
      <main id="main">
        <section className="hero" id="top" data-tone="dark" aria-labelledby="hero-title">
          <div className="heroField" aria-hidden="true"><span className="fieldLine" /><span className="fieldLine" /><span className="fieldLine" /></div>
          <div className="heroFrame frame">
            <div className="heroKicker"><span>SEO Executive</span><span>Search · Content · Growth</span></div>
            <div className="heroStatement">
              <p>{c.heroTop} {c.heroBottom}</p>
              <a href="#case" aria-label={c.heroAction} className="heroRoundAction"><span aria-hidden="true">↘</span></a>
            </div>
            <HeroName locale={locale} />
            <div className="heroFoot"><p>{c.heroIntro}</p><span>{locale === 'vi' ? 'Cuộn để khám phá ↓' : 'Scroll to explore ↓'}</span></div>
          </div>
        </section>

        <section className="approach sectionLight" id="approach" data-tone="light" aria-labelledby="approach-title">
          <div className="frame">
            <AnimatedContent {...reveal}><h2 id="approach-title" className="sectionTitle">{c.approachTitle}</h2></AnimatedContent>
            <AnimatedContent {...reveal} delay={0.06}><p className="approachLead">{c.approachLead}</p></AnimatedContent>
            <ProcessStage locale={locale} />
          </div>
        </section>

        <section className="caseSection sectionDark" id="case" data-tone="dark" aria-labelledby="case-title">
          <div className="frame">
            <div className="caseHeading">
              <AnimatedContent {...reveal}><h2 id="case-title" className="sectionTitle">{c.caseTitle}</h2></AnimatedContent>
              <AnimatedContent {...reveal} delay={0.08}><p>{c.caseIntro}</p></AnimatedContent>
            </div>
            <div className="caseFigure">
              <AnimatedContent {...reveal} delay={0.08}><strong>{locale === 'vi' ? '+27,1' : '+27.1'}<span>%</span></strong></AnimatedContent>
              <AnimatedContent {...reveal} delay={0.15}><p>{c.caseFigureCaption}</p></AnimatedContent>
            </div>
            <p className="caseSource">{c.caseSource}</p>
            <div className="metricsSection" aria-labelledby="metrics-title">
              <div className="metricsText">
                <AnimatedContent {...reveal}><h3 id="metrics-title">{c.metricsTitle}</h3></AnimatedContent>
                <AnimatedContent {...reveal} delay={0.07}><p>{c.metricsIntro}</p></AnimatedContent>
              </div>
              <MetricBoard locale={locale} />
            </div>
          </div>
        </section>

        <section className="workSection sectionLight" id="work" data-tone="light" aria-labelledby="work-title">
          <div className="frame workGrid">
            <div className="workIntro">
              <AnimatedContent {...reveal}><h2 id="work-title" className="sectionTitle">{c.workTitle}</h2></AnimatedContent>
              <AnimatedContent {...reveal} delay={0.07}><p>{c.workIntro}</p></AnimatedContent>
            </div>
            <div className="workLedger">
              {c.workItems.map(([title, detail], index) => (
                <AnimatedContent {...reveal} delay={index * 0.06} key={title} className="workRow">
                  <div><h3>{title}</h3><p>{detail}</p></div>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        <section className="writingSection sectionSage" id="writing" data-tone="light" aria-labelledby="writing-title">
          <div className="frame">
            <div className="writingHeader">
              <AnimatedContent {...reveal}><h2 id="writing-title" className="sectionTitle">{c.writingTitle}</h2></AnimatedContent>
              <AnimatedContent {...reveal} delay={0.07}><p>{c.writingIntro}</p></AnimatedContent>
            </div>
            <ArticleExplorer locale={locale} />
            <a className="authorLink" href="https://primas.net/author/datpt/" target="_blank" rel="noopener noreferrer">{c.authorLink} <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <section className="experienceSection sectionLight" id="experience" data-tone="light" aria-labelledby="experience-title">
          <div className="frame experienceGrid">
            <div className="experienceHeading">
              <AnimatedContent {...reveal}><h2 id="experience-title" className="sectionTitle">{c.experienceTitle}</h2></AnimatedContent>
              <AnimatedContent {...reveal} delay={0.07}><p>{c.experienceIntro}</p></AnimatedContent>
            </div>
            <div className="timeline">
              {c.roles.map((role, index) => (
                <AnimatedContent {...reveal} delay={index * 0.07} key={role.period} className="timelineItem">
                  <div className="timelineLayout"><p className="timelinePeriod">{role.period}</p>
                    <div><h3>{role.title}</h3><p className="timelineOrg">Primas Group</p><p>{role.text}</p></div></div>
                </AnimatedContent>
              ))}
            </div>
          </div>
          <div className="frame skillsBlock">
            <h3>{c.skillsTitle}</h3>
            <p>{c.skills.join('  ·  ')}</p>
          </div>
        </section>

        <footer className="contactSection sectionDark" id="contact" data-tone="dark" aria-labelledby="contact-title">
          <div className="frame contactFrame">
            <div className="contactTop"><h2 id="contact-title" className="sectionTitle">{c.contactTitle}</h2><p>{c.contactText}</p></div>
            <a className="contactEmail" href={`mailto:tiendatpham2014@gmail.com?subject=${encodeURIComponent(locale === 'vi' ? 'Trao đổi về SEO' : 'Let’s discuss SEO')}`}>tiendatpham2014@<wbr />gmail.com <span aria-hidden="true">↗</span></a>
            <div className="contactMeta">
              <span>{c.city}</span>
              <a href="https://www.linkedin.com/in/ph%E1%BA%A1m-ti%E1%BA%BFn-%C4%91%E1%BA%A1t-b9a157444/" target="_blank" rel="noopener noreferrer">{c.linkedIn} ↗</a>
              <a href="tel:+84912995691">+84 912 995 691</a>
              <a href="#top">{c.backTop} ↑</a>
            </div>
            <div className="contactSignature" aria-hidden="true">Phạm Tiến Đạt</div>
            <small>{c.footerNote}</small>
          </div>
        </footer>
      </main>
    </>
  );
}
