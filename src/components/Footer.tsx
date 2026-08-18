'use client';

import React from 'react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container" style={{ textAlign: 'center', padding: '30px 0' }}>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
          Designed &amp; Built with React (Next.js) &amp; Neon Postgres DB by <strong>Aditya Beckham</strong> © 2026
        </p>
      </div>

      <button id="back-to-top" onClick={scrollToTop} aria-label="Back to Top">
        ↑
      </button>
    </footer>
  );
}
