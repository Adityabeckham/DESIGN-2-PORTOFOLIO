'use client';

import { useEffect, useRef } from 'react';

const ALL_SECTION_CLASSES = [
  'section-active-home',
  'section-active-about',
  'section-active-skills',
  'section-active-experience',
  'section-active-projects',
  'section-active-certificates',
  'section-active-guestbook',
  'section-active-contact',
] as const;

export default function ScrollObserver() {
  const lastActiveRef = useRef<string | null>(null);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    if (sections.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0.2,
    };

    const bodyClassList = document.body.classList;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id && id !== lastActiveRef.current) {
            const toRemove = ALL_SECTION_CLASSES.filter((c) => c !== `section-active-${id}`);
            bodyClassList.remove(...toRemove);
            bodyClassList.add(`section-active-${id}`);
            lastActiveRef.current = id;
          }
        }
      });
    }, observerOptions);

    sections.forEach((s) => observer.observe(s));

    return () => {
      sections.forEach((s) => observer.unobserve(s));
      observer.disconnect();
      lastActiveRef.current = null;
    };
  }, []);

  return null;
}
