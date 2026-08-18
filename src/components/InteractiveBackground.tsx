'use client';

import React, { useEffect, useRef } from 'react';

export default function InteractiveBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let animFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animatePhysics = () => {
      nodeElements.forEach((node) => {
        const rect = node.element.getBoundingClientRect();
        const nodeCenterX = rect.left + rect.width / 2;
        const nodeCenterY = rect.top + rect.height / 2;

        const distX = mouseX - nodeCenterX;
        const distY = mouseY - nodeCenterY;
        const distance = Math.hypot(distX, distY);

        let targetX = 0;
        let targetY = 0;

        if (distance < 220) {
          const force = (220 - distance) / 220;
          targetX = -(distX / distance) * force * 35;
          targetY = -(distY / distance) * force * 35;
        }

        node.currentX += (targetX - node.currentX) * 0.1;
        node.currentY += (targetY - node.currentY) * 0.1;

        node.element.style.transform = `translate3d(${node.currentX}px, ${node.currentY}px, 0)`;
      });

      animFrameId = requestAnimationFrame(animatePhysics);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animatePhysics();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return <div ref={containerRef} id="scrapbook-interactive-bg" aria-hidden="true" />;
}
