'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import JelloTitle from '@/components/JelloTitle';

const skills = [
  { name: 'HTML', icon: '/assets/images/skills/html-5.png' },
  { name: 'CSS', icon: '/assets/images/skills/css-3.png' },
  { name: 'JavaScript', icon: '/assets/images/skills/js.png' },
  { name: 'TAILWIND', icon: '/assets/images/skills/tailwild-css.png' },
  { name: 'REACT', icon: '/assets/images/skills/reactjs.png' },
  { name: 'NODE.JS', icon: '/assets/images/skills/nodejs.webp' },
  { name: 'EXPRESS', icon: '/assets/images/skills/express-js.webp' },
  { name: 'BOOTSTRAP', icon: '/assets/images/skills/bootstrap.png' },
  { name: 'XAMPP', icon: '/assets/images/skills/xampp.png' },
  { name: 'GIT', icon: '/assets/images/skills/git.png' },
  { name: 'GITHUB', icon: '/assets/images/skills/github (1).png' },
  { name: 'VsCode', icon: '/assets/images/skills/visualcode.png' },
  { name: 'Canva', icon: '/assets/images/skills/canva.png' },
  { name: 'Java', icon: '/assets/images/skills/java.png' },
  { name: 'MySQL', icon: '/assets/images/skills/mysql-logo.png' },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const badges = containerRef.current.querySelectorAll<HTMLElement>('.sticker-badge');

    badges.forEach((badge) => {
      let isDragging = false;
      let startX = 0, startY = 0, currentX = 0, currentY = 0;

      const onMouseDown = (e: MouseEvent) => {
        isDragging = true;
        startX = e.clientX - currentX;
        startY = e.clientY - currentY;
        badge.style.zIndex = '100';
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      };

      const onMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        currentX = e.clientX - startX;
        currentY = e.clientY - startY;
        badge.style.transform = `translate(${currentX}px, ${currentY}px) scale(1.1) rotate(5deg)`;
      };

      const onMouseUp = () => {
        isDragging = false;
        badge.style.zIndex = '1';
        badge.style.transform = `translate(${currentX}px, ${currentY}px) scale(1) rotate(0deg)`;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      badge.addEventListener('mousedown', onMouseDown);
    });
  }, []);

  const resetBoard = () => {
    if (!containerRef.current) return;
    const badges = containerRef.current.querySelectorAll<HTMLElement>('.sticker-badge');
    badges.forEach((b) => {
      b.style.transform = 'none';
    });
  };

  return (
    <section id="skills" className="stack-section">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-subtitle">my skills &amp; toolbox</p>
          <h2 className="section-title">
            <JelloTitle text="</Skills> 🛠️" />
          </h2>
        </div>

        <div className="sticker-board-wrapper reveal">
          <div className="sticker-board-header">
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
              🖐️ Peel or drag any skill sticker around the board
            </span>
            <button className="btn btn-secondary btn-sm" onClick={resetBoard}>
              🔄 Tidy Up Board
            </button>
          </div>

          <div ref={containerRef} className="stickers-container">
            {skills.map((skill) => (
              <div key={skill.name} className="sticker-badge">
                <Image src={skill.icon} alt={skill.name} width={24} height={24} style={{ objectFit: 'contain' }} />
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
