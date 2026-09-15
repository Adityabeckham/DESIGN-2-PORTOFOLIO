'use client';

import React from 'react';
import Image from 'next/image';
import JelloTitle from '@/components/JelloTitle';

export default function About() {
  const stats = [
    { value: '1+', label: 'Learning Path' },
    { value: '24', label: 'Projects Build' },
    { value: '4+', label: 'Internships & Programs Completed' },
  ];

  const badges = [
    '🎯 Aspiring Software Engineer',
    '🧱 Frontend → Backend',
    '📈 On the Journey to SWE',
    '🤝 Collaborative Team',
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-subtitle">get to know me</p>
          <h2 className="section-title">
            <JelloTitle text="</AboutMe> 👨‍💻" />
          </h2>
        </div>

        <div className="about-content">
          <div className="about-image-card reveal">
            <Image
              src="/assets/images/profile/foto-about.png"
              alt="Aditya Beckham"
              width={360}
              height={360}
              className="profile-img"
              style={{ width: '100%', height: '360px', objectFit: 'cover', borderRadius: '12px', marginBottom: '12px' }}
            />
            <p className="image-caption">that&apos;s me! 👆</p>
            <div className="about-badges">
              {badges.map((b) => (
                <span key={b} className="sticker-badge" style={{ cursor: 'default' }}>
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="about-text reveal">
            <p className="lead-text">
              Hi! Aku <strong>Aditya Beckham</strong> — sedang dalam perjalanan fokus menjadi{' '}
              <strong style={{ color: 'var(--color-text-accent)' }}>Software Engineer (Full-Stack Web)</strong>.
              Aku percaya bahwa menjadi engineer yang solid bukan cuma bisa ngoding — tapi paham cara merancang
              sistem yang scalable, dan memecahkan masalah nyata di industry.
            </p>
            <p className="lead-text" style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>
              <strong>Progress perjalananku sejauh ini:</strong> mulai dari belajar dasar HTML/CSS/JS (Dicoding & KOMDIGI),
              lanjut ke AI & Backend Fundamentals (IDCamp IOH), lalu ke jalur Full-Stack intensive di{' '}
              <strong>DBS Foundation Coding Camp</strong> (Node.js, Express, PostgreSQL, Supabase, Agile Scrum),
              dan yang terbaru internship Web Developer di <strong>Mahreen Indonesia</strong> bikin company profile,
              studio portal, sampai admin UI pakai React + Tailwind + Figma handoff.
            </p>
            <p className="lead-text" style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>
              <strong>Fokusku saat ini:</strong> dalemin ekosistem <strong>React / Next.js</strong> di sisi frontend,
              arsitektur <strong>RESTful API & Database design</strong> di backend, <strong>cloud deployment</strong>
              (Railway, Vercel, Supabase), dan integrasi AI untuk mempercepat development workflow. Target jangka pendek:
              makin sering ikut program & internship profesional, target jangka panjang: jadi Full-Stack Software Engineer
              yang bikin produk benar-benar dipakai orang. 🚀
            </p>

            <div className="stats-grid">
              {stats.map((s) => (
                <div key={s.label} className="stat-item">
                  <h3>{s.value}</h3>
                  <p>{s.label}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="mailto:abfirmansyah01@gmail.com" className="btn btn-primary">
                🤝 Let&apos;s Collaborate & Oppourtunity
              </a>
              <a href="#experience" className="btn btn-secondary">
                📋 See My Journey
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
