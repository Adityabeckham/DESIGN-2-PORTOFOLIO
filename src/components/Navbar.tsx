'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      document.documentElement.setAttribute('data-theme', initialTheme);
    }

    audioRef.current = new Audio('/assets/audio/music.mp3');
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

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
              aria-label="Toggle Audio"
            >
              {isPlaying ? '🔊' : '🎵'}
            </button>
            <button
              className="btn-icon"
              onClick={toggleTheme}
              title="Toggle Light/Dark Theme"
              aria-label="Toggle Theme"
            >
              <span id="theme-icon">{theme === 'light' ? '🌙' : '☀️'}</span>
            </button>
            <button
              className="mobile-menu-btn"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open Navigation Menu"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`drawer-backdrop ${isDrawerOpen ? 'active' : ''}`}
        onClick={() => setIsDrawerOpen(false)}
        aria-hidden="true"
      />
      <aside className={`mobile-nav-drawer ${isDrawerOpen ? 'open' : ''}`} id="mobile-drawer">
        <div className="mobile-nav-header">
          <a href="#home" className="logo" onClick={() => setIsDrawerOpen(false)}>
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
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close Menu"
          >
            ✕
          </button>
        </div>
        <ul className="mobile-nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setIsDrawerOpen(false)}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
          Aditya Beckham © 2026
        </div>
      </aside>
    </>
  );
}
