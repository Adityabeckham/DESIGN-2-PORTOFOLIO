'use client';

import React from 'react';
import JelloTitle from '@/components/JelloTitle';

const experiences = [
  {
    num: '01',
    role: 'Web Development Intern',
    company: 'Mahreen Indonesia | Internship',
    date: 'Jun 2026 - Present • 3 mos | Remote',
    desc: [
      'Designed UI/UX deliverables including Sitemap, User Flow, Wireframe, Design System.',
      'Contributed to the design of Mahreen Indonesia’s company profile and digital ecosystem websites.',
      'Contributed to frontend implementation and UI development for Mahreen Studio.',
      'Designed Admin Portal, Client Portal, Login, Pricing, Consultation, and Payment flows.',
      'Collaborated with founders and the frontend team on design handoff, implementation, and UI improvements.'
    ],
    tags: ['React.js', 'Tailwind CSS', 'Figma', 'Git', 'Github']
  },
  {
    num: '02',
    role: 'Cohort Full-Stack Web Developer',
    company: 'Coding Camp powered by DBS Foundation | Apprenticeship',
    date: 'Feb 2026 - Jun 2026 • 5 mos | Remote',
    summary: 'Completed full-stack web developer program building scalable web apps with Node.js, Express, PostgreSQL, Supabase, and Agile Scrum teamwork.',
    desc: [
      'Backend Development: Designed relational DB schemas using PostgreSQL & Supabase, developed RESTful APIs with Node.js & Express.',
      'Frontend Integration & Git Workflow: Defined API contracts and streamlined integration using GitHub branch workflows.',
      'Agile Collaboration: Worked closely with AI Engineers & Data Scientists in Agile Scrum sprints.'
    ],
    tags: ['Node.js', 'Express.js', 'PostgreSQL', 'Supabase', 'Git', 'Github', 'Postman', 'Railway', 'Agile Scrum']
  },
  {
    num: '03',
    role: 'AI Back-end Developer',
    company: 'IDCamp Indosat Ooredoo Hutchison | Internship',
    date: 'Sep 2025 - Jan 2026 • 5 mos | Remote',
    summary: 'IDCamp 2025 Scholarship recipient in Artificial Intelligence and Backend Development path.',
    desc: [
      'Built foundational backend development skills using JavaScript, server programming, and RESTful API fundamentals.',
      'Gained practical knowledge of AWS Cloud services through the AWS Cloud Practitioner learning path.',
      'Applied AI concepts and AI-assisted dev tools to accelerate productivity.'
    ],
    tags: ['JavaScript', 'AWS Cloud', 'RESTful API', 'AI Tools']
  },
  {
    num: '04',
    role: 'Junior Web Developer Program',
    company: 'Digital Talent Scholarship KOMDIGI | Internship',
    date: 'Jul 2025 - Sep 2025 • 3 mos | Remote',
    summary: 'Participated in Junior Web Developer program by KOMDIGI, completing curriculum through Intermediate level.',
    desc: [
      'Built responsive web interfaces using HTML, CSS, and JavaScript following modern web practices.',
      'Applied clean coding principles, structured programming, and client-side web architecture.'
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript',]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="journey-section">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-subtitle">career &amp; learning path</p>
          <h2 className="section-title">
            <JelloTitle text="</Experience> 💼" />
          </h2>
        </div>

        <div className="timeline">
          <div className="timeline-line" />

          {experiences.map((exp, index) => (
            <div key={exp.num} className={`timeline-item ${index % 2 !== 0 ? 'right' : ''} reveal`}>
              <div className="timeline-marker">{exp.num}</div>
              <div className="timeline-content">
                <div className="timeline-card">
                  <div className="card-header">
                    <h3>{exp.role}</h3>
                    <p className="company">{exp.company}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-accent)', marginBottom: '10px' }}>
                      {exp.date}
                    </p>
                  </div>
                  {exp.summary && (
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                      {exp.summary}
                    </p>
                  )}
                  <ul className="card-list">
                    {exp.desc.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                  <div className="card-tags">
                    {exp.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
