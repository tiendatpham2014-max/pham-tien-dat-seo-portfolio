'use client';

import { useState, type KeyboardEvent } from 'react';
import { articles, type Locale } from '@/lib/content';

export default function ArticleExplorer({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const article = articles[active];
  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? (index + 1) % articles.length
      : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? (index - 1 + articles.length) % articles.length
      : event.key === 'Home' ? 0 : event.key === 'End' ? articles.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`article-tab-${next}`)?.focus();
  };

  return (
    <div className="articleExplorer" data-ui>
      <div className="articleSelector" role="tablist" aria-label={locale === 'vi' ? 'Chọn bài viết' : 'Choose an article'}>
        {articles.map((item, index) => (
          <button key={item.href} type="button" role="tab" id={`article-tab-${index}`} aria-selected={index === active} aria-controls="article-preview" tabIndex={index === active ? 0 : -1} onKeyDown={event => onTabKeyDown(event, index)} onClick={() => setActive(index)}>
            <span>{item.topic}</span><span>{item.title}</span><span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <div className="articlePreview" id="article-preview" role="tabpanel" aria-labelledby={`article-tab-${active}`} key={article.href}>
        <div className="articlePreviewTop"><span>PRIMAS / DAT PHAM</span><span>{article.topic}</span></div>
        <div className="articlePreviewGlyph" aria-hidden="true">{article.topic}</div>
        <div className="articlePreviewCopy"><h3>{article.topic}</h3><p>{article.title}</p></div>
        <a href={article.href} target="_blank" rel="noopener noreferrer">{locale === 'vi' ? 'Đọc bài viết' : 'Read article'} <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  );
}
