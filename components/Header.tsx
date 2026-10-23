'use client';

import { useEffect, useRef, useState } from 'react';
import { MorphIcon } from 'morphicons/react';
import { Menu, X } from 'lucide';
import { content, type Locale } from '@/lib/content';

export default function Header({ locale }: { locale: Locale }) {
  const c = content[locale];
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const chapter = [...document.querySelectorAll<HTMLElement>('[data-tone]')]
          .find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= 52 && rect.bottom > 52;
          });
        setDark(chapter?.dataset.tone === 'dark');
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        header.current?.querySelector<HTMLButtonElement>('.menuButton')?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (header.current && !header.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  const links = [
    ['#approach', c.nav.approach],
    ['#case', c.nav.case],
    ['#writing', c.nav.writing],
    ['#experience', c.nav.experience],
    ['#contact', c.nav.contact]
  ] as const;

  return (
    <header ref={header} className={`siteHeader ${dark ? 'onDark' : ''} ${open ? 'menuOpen' : ''}`}>
      <div className="headerInner frame">
        <a className="wordmark" href="#top" onClick={() => setOpen(false)}>Phạm Tiến Đạt<span className="wordmarkDot">.</span></a>
        <nav className={`mainNav ${open ? 'isOpen' : ''}`} id="main-navigation" aria-label={locale === 'vi' ? 'Điều hướng chính' : 'Main navigation'}>
          {links.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        </nav>
        <div className="languageSwitch" role="group" aria-label={locale === 'vi' ? 'Ngôn ngữ' : 'Language'}>
          <a href="/" lang="vi" aria-current={locale === 'vi' ? 'page' : undefined}>VI</a>
          <span aria-hidden="true">/</span>
          <a href="/en/" lang="en" aria-current={locale === 'en' ? 'page' : undefined}>EN</a>
        </div>
        <button className="menuButton" type="button" aria-label={open ? c.menuClose : c.menuOpen} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(value => !value)}>
          <MorphIcon icon={open ? X : Menu} size={25} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
