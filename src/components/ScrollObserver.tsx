'use client';

import { useEffect } from 'react';

export default function ScrollObserver() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    if (sections.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          document.body.classList.remove(
            'section-active-home',
            'section-active-about',
            'section-active-skills',
            'section-active-experience',
            'section-active-projects',
            'section-active-certificates',
            'section-active-guestbook',
            'section-active-contact'
          );
          if (id) {
            document.body.classList.add(`section-active-${id}`);
          }
        }
      });
    }, observerOptions);

    sections.forEach((s) => observer.observe(s));

    return () => {
      sections.forEach((s) => observer.unobserve(s));
      observer.disconnect();
    };
  }, []);

  return null;
}
