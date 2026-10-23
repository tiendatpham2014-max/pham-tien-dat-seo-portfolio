'use client';

import { useEffect, useRef, useState } from 'react';
import { content, type Locale } from '@/lib/content';

export default function ProcessStage({ locale }: { locale: Locale }) {
  const c = content[locale];
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(Number((visible.target as HTMLElement).dataset.step));
    }, { rootMargin: '-24% 0px -34% 0px', threshold: [0, .2, .5, .8] });
    steps.current.forEach(step => { if (step) observer.observe(step); });
    return () => observer.disconnect();
  }, []);

  const visualLabels = locale === 'vi'
    ? ['Một câu hỏi thật', 'Một trang hữu ích', 'Một kết quả cần đọc kỹ']
    : ['A real question', 'A useful page', 'A result worth examining'];

  return (
    <div className="processLayout">
      <div className="processSteps">
        {c.approachItems.map((item, index) => (
          <div className={`processStep ${active === index ? 'isActive' : ''}`} data-step={index} ref={node => { steps.current[index] = node; }} key={item.title}>
            <span className="processStepMark" aria-hidden="true">{index === 0 ? '⌕' : index === 1 ? '↗' : '◌'}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
      <div className="processVisual" aria-label={visualLabels[active]} data-ui>
        <div className="processVisualHead"><span>{locale === 'vi' ? 'Minh họa quy trình SEO' : 'An illustrated SEO process'}</span><span className="processVisualIndex">{active + 1} / 3</span></div>
        <div className="processScene" data-active={active} aria-hidden="true">
          <div className="processSearch">
            <span className="searchGlyph">⌕</span>
            <span>{locale === 'vi' ? 'Người đọc đang cần gì?' : 'What does the reader need?'}</span>
            <i />
          </div>
          <div className="processPage">
            <span className="pageOverline">{locale === 'vi' ? 'Cấu trúc nội dung' : 'Content structure'}</span>
            <div className="pageHeadline" />
            <div className="pageHeadline short" />
            <div className="pageBody" /><div className="pageBody" /><div className="pageBody short" />
            <div className="pageTopic"><span>{locale === 'vi' ? 'Trả lời đúng câu hỏi' : 'Answer the actual question'}</span><span>↗</span></div>
          </div>
          <div className="processResult">
            <span>{locale === 'vi' ? 'Lượt nhấp organic · Quý III' : 'Organic clicks · Q3'}</span>
            <div className="resultBar previous"><b>2025</b><i /><strong>{locale === 'vi' ? '13.795' : '13,795'}</strong></div>
            <div className="resultBar current"><b>2026</b><i /><strong>{locale === 'vi' ? '17.540' : '17,540'}</strong></div>
            <em>{locale === 'vi' ? '+27,1%' : '+27.1%'}</em>
          </div>
        </div>
        <p className="processVisualCaption">{visualLabels[active]}</p>
      </div>
    </div>
  );
}
