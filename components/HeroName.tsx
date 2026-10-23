'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Locale } from '@/lib/content';

gsap.registerPlugin(ScrollTrigger);

export default function HeroName({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const tween = gsap.to(ref.current, {
        scale: .94,
        y: -28,
        ease: 'none',
        scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: true }
      });
      return () => tween.kill();
    });
    return () => media.revert();
  }, []);

  return <h1 ref={ref} id="hero-title" className="heroName"><span>{locale === 'vi' ? 'Phạm' : 'Pham'}</span><span>{locale === 'vi' ? 'Tiến Đạt' : 'Tien Dat'}</span></h1>;
}
