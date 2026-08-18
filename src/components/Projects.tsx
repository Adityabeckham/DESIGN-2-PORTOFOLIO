'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import JelloTitle from '@/components/JelloTitle';
import TiltCard from '@/components/TiltCard';
import { projectsData } from '@/data/projects';

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'fullstack' | 'web' | 'java'>('all');

  const filteredProjects = filter === 'all' ? projectsData : projectsData.filter((p) => p.category === filter);

  return (
    <section id="projects" className="work-section">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-subtitle">my recent work</p>
          <h2 className="section-title">
            <JelloTitle text="</Projects> 🚀" />
          </h2>
        </div>

        <div className="filter-tabs reveal">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
            suppressHydrationWarning
          >
            All Projects
          </button>
          <button
            className={`filter-btn ${filter === 'fullstack' ? 'active' : ''}`}
            onClick={() => setFilter('fullstack')}
            suppressHydrationWarning
          >
            Full-Stack &amp; APIs
          </button>
          <button
            className={`filter-btn ${filter === 'web' ? 'active' : ''}`}
            onClick={() => setFilter('web')}
            suppressHydrationWarning
          >
            Web &amp; Landing Pages
          </button>
          <button
            className={`filter-btn ${filter === 'java' ? 'active' : ''}`}
            onClick={() => setFilter('java')}
            suppressHydrationWarning
          >
            Java &amp; Tools
          </button>
        </div>

        <div className="work-grid reveal">
          {filteredProjects.map((proj) => (
            <TiltCard key={proj.id} className="project-card" data-category={proj.category}>
              <div className="project-image">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  width={400}
                  height={220}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              </div>
              <div className="project-info">
                <h3 className="project-title">{proj.title}</h3>
                <p className="project-meta">{proj.meta}</p>
                <p className="project-desc">{proj.desc}</p>
                <div className="project-links">
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                      Live View
                    </a>
                  )}
                  {proj.github && (
                    <a href={proj.github} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
                      View GitHub
                    </a>
                  )}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
