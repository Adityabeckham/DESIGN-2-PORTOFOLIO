'use client';

import React from 'react';
import Image from 'next/image';
import JelloTitle from '@/components/JelloTitle';
import TiltCard from '@/components/TiltCard';

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-subtitle">get to know me</p>
          <h2 className="section-title">
            <JelloTitle text="</AboutMe> ✨" />
          </h2>
        </div>

        <div className="about-content">
          <div className="about-image-wrapper reveal">
            <TiltCard className="about-image-card">
              <Image
                src="/assets/images/profile/foto-about.png"
                alt="Aditya Beckham Profile"
                width={200}
                height={200}
                className="profile-img"
                style={{ width: '100%', height: '100', borderRadius: '16px' }}
              />
              <div className="image-caption">Still Learning & Improving</div>
            </TiltCard>
            <div className="about-badges">
              <span className="badge">🎓 Universitas Teknologi Bandung</span>
              <span className="badge" style={{ color: '#3d6b2e' }}>
                <span className="status-dot" /> Open for Opportunities
              </span>
            </div>
          </div>

          <div className="about-text reveal">
            <p className="lead-text">
              Hi! My name is Aditya Beckham. I'm a Web Developer &amp; Informatics Engineering Student at Universitas Teknologi Bandung.
            </p>
            <p>
              Since starting my journey in web development, I’ve been focused on building responsive user interfaces and robust full-stack applications. 
              I enjoy learning through hands-on practice — from building personal &amp; academic projects to participating in intensive bootcamps and industry internships.
            </p>
            <p>
              My goal is to craft meaningful digital products with clean code architecture, smooth interactions, and great user experience. I am always open to new learning opportunities and professional collaborations.
            </p>

            <div className="stats-grid">
              <div className="stat-item">
                <h3>18+</h3>
                <p>Projects Developed</p>
              </div>
              <div className="stat-item">
                <h3>12+</h3>
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
