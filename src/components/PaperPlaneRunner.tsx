'use client';

import React, { useEffect, useRef } from 'react';

export default function PaperPlaneRunner() {
  const planeRef = useRef<HTMLDivElement | null>(null);
  const threadPathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const plane = planeRef.current;
    const threadPath = threadPathRef.current;
    if (!plane) return;

    let currentX = window.innerWidth * 0.04;
    let currentY = window.innerHeight * 0.18;
    let targetX = currentX;
    let targetY = currentY;
    let currentRotation = 25;
    let targetRotation = 25;
    let lastScrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout | null = null;
    let animationFrameId: number;

    const updatePlane = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;
      const scrollDelta = scrollTop - lastScrollY;
      lastScrollY = scrollTop;

      // Fixed on left side (3vw to 7vw wave path)
      const waveX = Math.sin(scrollPercent * Math.PI * 4) * 2.5;
      targetX = (window.innerWidth * 0.035) + (waveX * (window.innerWidth / 100));

      // Glides down with scroll in viewport (14vh to 78vh)
      const waveY = (window.innerHeight * 0.14) + (scrollPercent * window.innerHeight * 0.64);
      targetY = waveY;

      // Rotation pitch based on scroll speed & flight direction
      const scrollPitch = Math.min(Math.max(scrollDelta * 1.5, -25), 35);
      targetRotation = 22 + scrollPitch + Math.cos(scrollPercent * Math.PI * 4) * 8;

      plane.classList.add('is-flying');
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        plane.classList.remove('is-flying');
        targetRotation = 22;
      }, 150);
    };

    const loopAnimation = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      currentRotation += (targetRotation - currentRotation) * 0.12;

      if (plane) {
        plane.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotate(${currentRotation}deg)`;
      }

      // Draw long dynamic trailing thread SVG string behind the plane
      if (threadPath) {
        const planeTailX = currentX + 8;
        const planeTailY = currentY + 24;
        const startX = currentX - 15;
        const startY = Math.max(0, currentY - 180); // Long string trailing 180px behind up the left margin
        const controlX = currentX - 35 + Math.sin(Date.now() * 0.003) * 10;
        const controlY = (startY + planeTailY) / 2;

        threadPath.setAttribute('d', `M ${startX} ${startY} Q ${controlX} ${controlY}, ${planeTailX} ${planeTailY}`);
      }

      animationFrameId = requestAnimationFrame(loopAnimation);
    };

    window.addEventListener('scroll', updatePlane, { passive: true });
    updatePlane();
    loopAnimation();

    return () => {
      window.removeEventListener('scroll', updatePlane);
      cancelAnimationFrame(animationFrameId);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <>
      {/* Dynamic Long Thread SVG Layer */}
      <svg id="paper-plane-thread-svg" aria-hidden="true">
        <path
          ref={threadPathRef}
          id="paper-plane-thread-path"
          d=""
          fill="none"
          stroke="#df513b"
          strokeWidth="2"
          strokeDasharray="5 5"
          strokeOpacity="0.75"
        />
      </svg>

      {/* Left-side Paper Plane Runner */}
      <div
        ref={planeRef}
        id="paper-plane-runner"
        aria-hidden="true"
        className="paper-plane-container"
        title="Paper plane gliding down with scroll"
      >
        <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M45 5L3 22l17 5 4 16z" fill="#df513b" stroke="#2a241d" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M45 5L20 27" stroke="#2a241d" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M20 27l4 16" stroke="#2a241d" strokeWidth="2" strokeLinejoin="round" />
          <path d="M45 5L24 43" stroke="#2a241d" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />
        </svg>
        <div className="paper-plane-long-thread" />
      </div>
    </>
  );
}
