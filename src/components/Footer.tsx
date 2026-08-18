'use client';

import React from 'react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <p className="copyright">Aditya Beckham © 2026 · Junior Web Developer</p>
        <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', color: 'var(--color-text-secondary)', alignItems: 'center' }}>
          <a href="#home" onClick={scrollToTop}>
            Back to Top ↑
          </a>
          <span>•</span>
          <a href="#guestbook">Pin a Sticky Note 📌</a>
        </div>
      </div>
    </footer>
  );
}
