'use client';

import React from 'react';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-subtitle">get to know me</p>
          <h2 className="section-title jello-title">&lt;/AboutMe&gt; ✨</h2>
        </div>

        <div className="about-content">
          <div className="about-image-wrapper reveal">
            <div className="about-image-card">
              <Image
                src="/assets/images/profile/foto-about.png"
                alt="Aditya Beckham Profile"
                width={300}
                height={350}
                className="profile-img"
                style={{ width: '100%', height: 'auto', borderRadius: '16px' }}
              />
              <div className="image-caption">Hi! My name is Aditya Beckham</div>
            </div>
            <div className="about-badges">
              <span className="badge">🎓 Universitas Teknologi Bandung</span>
              <span className="badge" style={{ color: '#3d6b2e' }}>
                <span className="status-dot" /> Open for Opportunities
              </span>
            </div>
          </div>

          <div className="about-text reveal">
            <p className="lead-text">
              Hi! My name is Aditya Beckham. I'm a junior web developer.
            </p>
            <p>
              I am currently a student at Universitas Teknologi Bandung. Since the beginning of college, I’ve been
              interested in learning web development and made my first website in the first semester.
            </p>
            <p>
              Although I don’t have extensive professional work experience yet, I’ve been building various personal &amp;
              bootcamp projects since I started learning. My interest in web development keeps me motivated to continue
              learning and exploring new technologies in the field.
            </p>

            <div className="stats-grid">
              <div className="stat-item">
                <h3>19+</h3>
                <p>Projects Developed</p>
              </div>
              <div className="stat-item">
                <h3>13+</h3>
                <p>Certificates Earned</p>
              </div>
              <div className="stat-item">
                <h3>15+</h3>
                <p>Tech Stack Skills</p>
              </div>
            </div>

            <div className="values-section">
              <a
                href="/assets/image/Aditya_Beckham_-_Front-end_Web_Developer.pdf"
                target="_blank"
                download
                className="btn btn-primary"
              >
                📄 Download Official Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
