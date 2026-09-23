'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

export default function Navbar() {
  // Render awal HARUS 'light' agar identik dengan SSR (layout: data-theme="light").
  // Nilai tema tersimpan disinkronkan setelah hydration via useEffect di bawah —
  // membaca localStorage/matchMedia saat render menyebabkan hydration mismatch.
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleTheme = useCallback(() => {
    const current = (document.documentElement.getAttribute('data-theme') as 'light' | 'dark') || theme;
    const nextTheme = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', nextTheme);
    try {
      localStorage.setItem('portfolio-theme', nextTheme);
    } catch (err) {
      console.warn('[Navbar] Failed to persist theme to localStorage:', err);
    }
    setTheme(nextTheme);
  }, [theme]);

  const toggleAudio = useCallback(async () => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio('/assets/audio/music.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;
      }
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.warn('[Navbar] Audio playback failed (browser autoplay policy or missing audio file):', err);
      setIsPlaying(false);
    }
  }, [isPlaying]);

  useEffect(() => {
    // Sinkron ke tema aktual (sudah dipasang inline script di <head> sebelum paint).
    const applied = document.documentElement.getAttribute('data-theme');
    if (applied === 'light' || applied === 'dark') {
      setTheme(applied);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const closeDrawer = () => setIsDrawerOpen(false);

  const navLinks = [
    { name: '</Home>', href: '#home' },
    { name: '</AboutMe>', href: '#about' },
    { name: '</Skills>', href: '#skills' },
    { name: '</Experience>', href: '#experience' },
    { name: '</Projects>', href: '#projects' },
    { name: '</Certificates>', href: '#certificates' },
    { name: '</Guestbook>', href: '#guestbook' },
    { name: '</Contact>', href: '#contact' },
  ];

  return (
    <>
      <header className="site-header">
        <div className="container header-container">
          <a href="#home" className="logo" aria-label="Aditya Beckham Portfolio Home">
            <Image
              src="/assets/images/profile/foto-me.png"
              alt="Aditya Beckham Logo"
              width={40}
              height={40}
              className="nav-avatar-img"
              priority
            />
          </a>

          <nav className="main-nav" aria-label="Main Navigation">
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <button
              className={`btn-icon ${isPlaying ? 'playing' : ''}`}
              onClick={toggleAudio}
              title={isPlaying ? 'Pause background music' : 'Play background music'}
              aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
              type="button"
            >
              <span aria-hidden="true">{isPlaying ? '🔊' : '🎵'}</span>
            </button>
            <button
              className="btn-icon"
              onClick={toggleTheme}
              title="Toggle Light/Dark Theme"
              aria-label={theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
              type="button"
            >
              <span aria-hidden="true">{theme === 'light' ? '🌙' : '☀️'}</span>
            </button>
            <button
              className="mobile-menu-btn"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open Navigation Menu"
              type="button"
            >
              <span aria-hidden="true">☰</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`drawer-backdrop ${isDrawerOpen ? 'active' : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />
      <aside className={`mobile-nav-drawer ${isDrawerOpen ? 'open' : ''}`} id="mobile-drawer" aria-label="Mobile Navigation">
        <div className="mobile-nav-header">
          <a href="#home" className="logo" onClick={closeDrawer}>
            <Image
              src="/assets/images/profile/foto.png"
              alt="Aditya Beckham Logo"
              width={40}
              height={40}
              className="nav-avatar-img"
            />
          </a>
          <button
            className="close-drawer-btn"
            onClick={closeDrawer}
            aria-label="Close Menu"
            type="button"
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.4rem',
              cursor: 'pointer',
              padding: '6px 10px',
              minWidth: '40px',
              minHeight: '40px',
              borderRadius: '8px',
              touchAction: 'manipulation',
            }}
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>
        <ul className="mobile-nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={closeDrawer}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="drawer-actions" style={{ display: 'flex', gap: '10px', justifyContent: 'center', padding: '16px 0', borderTop: '1px solid var(--color-border)' }}>
          <button
            className={`btn-icon ${isPlaying ? 'playing' : ''}`}
            onClick={() => { toggleAudio(); }}
            title={isPlaying ? 'Pause music' : 'Play music'}
            aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
            type="button"
          >
            <span aria-hidden="true">{isPlaying ? '🔊' : '🎵'}</span>
          </button>
          <button
            className="btn-icon"
            onClick={() => { toggleTheme(); }}
            title="Toggle theme"
            aria-label={theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
            type="button"
          >
            <span aria-hidden="true">{theme === 'light' ? '🌙' : '☀️'}</span>
          </button>
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textAlign: 'center', paddingTop: '12px' }}>
          Aditya Beckham © 2026
        </div>
      </aside>
    </>
  );
}
