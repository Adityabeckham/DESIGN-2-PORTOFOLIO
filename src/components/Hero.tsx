'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';

export default function Hero() {
  const card1Ref = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const makeElementDraggable = (element: HTMLElement) => {
      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

      const prepareDrag = () => {
        const rect = element.getBoundingClientRect();
        const parentRect = element.offsetParent
          ? (element.offsetParent as HTMLElement).getBoundingClientRect()
          : { left: 0, top: 0 };
        const currentWidth = rect.width;

        element.style.left = `${rect.left - parentRect.left}px`;
        element.style.top = `${rect.top - parentRect.top}px`;
        element.style.right = 'auto';
        element.style.bottom = 'auto';
        element.style.width = `${currentWidth}px`;
        element.style.maxWidth = `${currentWidth}px`;
      };

      const dragMouseDown = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'BUTTON' || target.tagName === 'INPUT' || target.tagName === 'A') return;
        e.preventDefault();
        prepareDrag();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      };

      const elementDrag = (e: MouseEvent) => {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = `${element.offsetTop - pos2}px`;
        element.style.left = `${element.offsetLeft - pos1}px`;
      };

      const closeDragElement = () => {
        document.onmouseup = null;
        document.onmousemove = null;
      };

      const dragTouchStart = (e: TouchEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'BUTTON' || target.tagName === 'INPUT' || target.tagName === 'A') return;
        prepareDrag();
        const touch = e.touches[0];
        pos3 = touch.clientX;
        pos4 = touch.clientY;
        document.ontouchend = closeTouchElement;
        document.ontouchmove = elementTouchDrag;
      };

      const elementTouchDrag = (e: TouchEvent) => {
        const touch = e.touches[0];
        pos1 = pos3 - touch.clientX;
        pos2 = pos4 - touch.clientY;
        pos3 = touch.clientX;
        pos4 = touch.clientY;
        element.style.top = `${element.offsetTop - pos2}px`;
        element.style.left = `${element.offsetLeft - pos1}px`;
      };

      const closeTouchElement = () => {
        document.ontouchend = null;
        document.ontouchmove = null;
      };

      element.onmousedown = dragMouseDown;
      element.ontouchstart = dragTouchStart;
    };

    if (card1Ref.current) makeElementDraggable(card1Ref.current);
    if (card2Ref.current) makeElementDraggable(card2Ref.current);
  }, []);

  return (
    <section id="home" className="hero-section">
      <div className="container hero-container reveal">
        {/* Floating Draggable Card 1 */}
        <div ref={card1Ref} className="floating-card card-1">
          <p>Hey! Hai! Hello! Welcome to my portfolio 👋</p>
        </div>

        <div className="badge hero-badge">
          <span className="status-dot" />
          <span>Junior Web Developer · Universitas Teknologi Bandung</span>
        </div>

        <h1 className="hero-title">
          Hello Everyone <span className="wave">👋</span>, I'm <br />
          <span className="highlight glitch-text jello-title" data-text="Aditya Beckham!">
            Aditya Beckham!
          </span>
        </h1>

        <p className="hero-description">
          I'm Aditya Beckham Junior, a Web Developer with experience in frontend web design. I enjoy fun and engaging
          web interfaces, team collaboration, and creating meaningful products. I value simple content structure, clean
          design patterns, and well-thought-out interactions.
        </p>

        <div className="hero-actions">
          <a href="mailto:abfirmansyah01@gmail.com" className="btn btn-primary">
            Let's Talk! 💬
          </a>
          <a href="#guestbook" className="btn btn-accent">
            Pin a Sticky Note 📌
          </a>
          <a href="#projects" className="btn btn-secondary">
            Explore Projects 🚀
          </a>
        </div>

        {/* Floating Draggable Card 2 */}
        <div ref={card2Ref} className="floating-card card-2">
          <Image
            src="/assets/images/profile/foto_ngoding.jpeg"
            alt="Aditya Beckham Coding"
            width={220}
            height={140}
            priority
            style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
          />
          <p>late-night coding sessions 💻</p>
        </div>

        <div className="hero-footer-tip">
          <span>🖐️ Drag the scrapbook photos around — it's interactive!</span>
        </div>
      </div>
    </section>
  );
}
