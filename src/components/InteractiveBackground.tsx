'use client';

import React, { useEffect, useRef } from 'react';

export default function InteractiveBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const items = [
      { type: 'futsal', html: '⚽', x: 88, y: 18, size: 2.3 },
      { type: 'jogging', html: '🏃‍♂️', x: 10, y: 62, size: 2.4 },
      { type: 'code', html: '&lt;/&gt;', x: 92, y: 55, size: 1.4 },
      { type: 'code', html: '{ }', x: 7, y: 82, size: 1.5 },
      { type: 'sparkle', html: '✨', x: 84, y: 40, size: 1.6 },
      { type: 'sparkle', html: '✦', x: 14, y: 35, size: 1.8 },
    ];

    container.innerHTML = '';
    const nodeElements: { element: HTMLDivElement; currentX: number; currentY: number }[] = [];

    items.forEach((item) => {
      const el = document.createElement('div');
      el.className = `bg-floating-item bg-${item.type}`;
      el.style.left = `${item.x}vw`;
      el.style.top = `${item.y}vh`;
      el.innerHTML = item.html;

      container.appendChild(el);
      nodeElements.push({ element: el, currentX: 0, currentY: 0 });
    });

    if (reduceMotion) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let animFrameId = 0;
    let isRunning = true;
    let lastFrame = 0;
    const frameInterval = isTouchDevice ? 1000 / 20 : 1000 / 60;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleVisibility = () => {
      isRunning = !document.hidden;
      if (isRunning && !animFrameId) {
        lastFrame = performance.now();
        animFrameId = requestAnimationFrame(animatePhysics);
      }
    };

    const animatePhysics = (time = 0) => {
      animFrameId = 0;
      if (!isRunning) return;
      if (time - lastFrame >= frameInterval) {
        lastFrame = time;
        nodeElements.forEach((node) => {
          const rect = node.element.getBoundingClientRect();
          const nodeCenterX = rect.left + rect.width / 2;
          const nodeCenterY = rect.top + rect.height / 2;

          const distX = mouseX - nodeCenterX;
          const distY = mouseY - nodeCenterY;
          const distance = Math.hypot(distX, distY) || 1;

          let targetX = 0;
          let targetY = 0;

          if (distance < 220) {
            const force = (220 - distance) / 220;
            targetX = -(distX / distance) * force * 35;
            targetY = -(distY / distance) * force * 35;
          }

          node.currentX += (targetX - node.currentX) * 0.1;
          node.currentY += (targetY - node.currentY) * 0.1;

          if (Math.abs(targetX - node.currentX) > 0.05 || Math.abs(targetY - node.currentY) > 0.05) {
            node.element.style.transform = `translate3d(${node.currentX}px, ${node.currentY}px, 0)`;
          }
        });
      }
      animFrameId = requestAnimationFrame(animatePhysics);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    animFrameId = requestAnimationFrame(animatePhysics);

    return () => {
      isRunning = false;
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, []);

  return <div ref={containerRef} id="scrapbook-interactive-bg" aria-hidden="true" />;
}
