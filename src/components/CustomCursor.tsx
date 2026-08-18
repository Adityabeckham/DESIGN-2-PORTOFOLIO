'use client';

import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const outerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const inner = innerRef.current;
    const outer = outerRef.current;
    if (!inner || !outer) return;

    let mouseX = 0, mouseY = 0;
    let outerX = 0, outerY = 0;
    let animFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      inner.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const loop = () => {
      outerX += (mouseX - outerX) * 0.18;
      outerY += (mouseY - outerY) * 0.18;
      outer.style.transform = `translate(${outerX}px, ${outerY}px) translate(-50%, -50%)`;
      animFrameId = requestAnimationFrame(loop);
    };

    const handleMouseEnter = () => {
      inner.classList.add('hover');
      outer.classList.add('hover');
    };

    const handleMouseLeave = () => {
      inner.classList.remove('hover');
      outer.classList.remove('hover');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    loop();

    const interactiveElems = document.querySelectorAll('a, button, input, textarea, .project-card, .certificate-card, .sticker-badge');
    interactiveElems.forEach((elem) => {
      elem.addEventListener('mouseenter', handleMouseEnter);
      elem.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrameId);
      interactiveElems.forEach((elem) => {
        elem.removeEventListener('mouseenter', handleMouseEnter);
        elem.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={innerRef} className="cursor-inner" />
      <div ref={outerRef} className="cursor-outer" />
    </>
  );
}
