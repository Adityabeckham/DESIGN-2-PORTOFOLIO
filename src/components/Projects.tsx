'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Project {
  id: string;
  category: 'fullstack' | 'web' | 'java';
  title: string;
  meta: string;
  desc: string;
  image: string;
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    id: '1',
    category: 'fullstack',
    title: 'OpenJob RESTful API V1',
    meta: 'Backend Project · Node.js & PostgreSQL',
    desc: 'Project backend untuk sistem rekrutmen pekerjaan yang dibangun menggunakan Node.js, Express, dan PostgreSQL.',
    image: '/assets/images/projects/openjob-v1.webp',
    github: 'https://github.com/Adityabeckham/OpenJob-RESTful-API-V1-Test'
  },
  {
    id: '2',
    category: 'fullstack',
    title: 'MyFinance - AI Powered Money Manager',
    meta: 'Capstone Project · DBS Foundation Coding Camp',
    desc: 'Platform web pengelola keuangan pribadi yang membantu pengguna mencatat, memantau, dan mengevaluasi kondisi finansial.',
    image: '/assets/images/projects/myfinance-preview.webp',
    link: 'https://myfinance-eight-psi.vercel.app/'
  },
  {
    id: '3',
    category: 'web',
    title: 'Tuku Coffee - Landing Page ☕',
    meta: 'Next.js 15 & Tailwind CSS',
    desc: 'Landing page scrollytelling yang imersif dan berperforma tinggi untuk Tuku Coffee.',
    image: '/assets/images/projects/tuku-coffe.webp',
    link: 'https://tuku-coffe.vercel.app/'
  },
  {
    id: '4',
    category: 'web',
    title: 'Web Article Bandung City',
    meta: 'Dicoding Start Project',
    desc: 'Proyek artikel tentang kota Bandung, menyoroti kebudayaan unik, kelezatan kuliner, serta destinasi wisata.',
    image: '/assets/images/projects/artikel-bandung.webp',
    link: 'https://halaman-artikel-kotabandung.netlify.app/'
  },
  {
    id: '5',
    category: 'web',
    title: 'Web TiketKeun',
    meta: 'HTML, JavaScript & Tailwind CDN',
    desc: 'Aplikasi web sederhana untuk melihat jadwal penerbangan, harga tiket, dan pembelian tiket pesawat.',
    image: '/assets/images/projects/TiketKeun-Desktop.png',
    github: 'https://github.com/Adityabeckham/Tiket-Keun'
  },
  {
    id: '6',
    category: 'web',
    title: 'Web Social-links-profile',
    meta: 'Frontend Mentor Challenge',
    desc: 'Kartu profil sosial responsif dengan efek hover dan desain bertema gelap.',
    image: '/assets/images/projects/social-link-profil-Mobile.png',
    link: 'https://social-links-profilleee.netlify.app/'
  },
  {
    id: '7',
    category: 'web',
    title: 'QR Code Component',
    meta: 'Frontend Mentor Challenge',
    desc: 'Komponen QR Code sederhana dan responsif dengan HTML dan CSS Flexbox.',
    image: '/assets/images/projects/qr-code.jpg',
    link: 'https://qr-code-componentmainn.netlify.app/'
  },
  {
    id: '8',
    category: 'web',
    title: 'Landing Page - Dicoding Indonesia',
    meta: 'Bootcamp Project',
    desc: 'Proyek landing page sederhana yang menyajikan informasi tentang kursus-kursus di Dicoding.',
    image: '/assets/images/projects/landingpage.png',
    link: 'https://landingpage-dicoding-indonesia.netlify.app/'
  },
  {
    id: '9',
    category: 'web',
    title: 'Ruang Belajar',
    meta: 'Web Platform',
    desc: 'Website kursus online personal yang menampilkan tata letak rapi dengan bagian Program & Testimonial.',
    image: '/assets/images/projects/ruang-belajar.webp',
    link: 'https://ruangbelajar02.netlify.app/'
  },
  {
    id: '10',
    category: 'web',
    title: 'Todoapps — Dicoding Project',
    meta: 'JavaScript DOM & LocalStorage',
    desc: 'Aplikasi ToDo sederhana dengan fungsi CRUD lengkap dan penyimpanan LocalStorage.',
    image: '/assets/images/projects/todoapps.png',
    link: 'https://webapp-todoo-list.netlify.app/'
  },
  {
    id: '11',
    category: 'web',
    title: 'Bookshelf App — Dicoding Project',
    meta: 'JavaScript DOM & LocalStorage',
    desc: 'Aplikasi Rak Buku sederhana yang memungkinkan pengguna mengelola daftar bacaan pribadi.',
    image: '/assets/images/projects/bookshelfapp.png',
    link: 'https://book-shelf-webapp.netlify.app/'
  },
  {
    id: '12',
    category: 'java',
    title: 'Sinaran Damkar - Desktop Application',
    meta: 'Java Swing GUI & NetBeans',
    desc: 'Aplikasi desktop GUI manajemen pemadam kebakaran untuk mengelola laporan darurat.',
    image: '/assets/images/projects/damkar-preview.png',
    github: 'https://github.com/Adityabeckham'
  }
];

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'fullstack' | 'web' | 'java'>('all');

  const filteredProjects = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="work-section">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-subtitle">my recent work</p>
          <h2 className="section-title jello-title">&lt;/Projects&gt; 🚀</h2>
        </div>

        <div className="filter-tabs reveal">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Projects
          </button>
          <button
            className={`filter-btn ${filter === 'fullstack' ? 'active' : ''}`}
            onClick={() => setFilter('fullstack')}
          >
            Full-Stack &amp; APIs
          </button>
          <button
            className={`filter-btn ${filter === 'web' ? 'active' : ''}`}
            onClick={() => setFilter('web')}
          >
            Web &amp; Landing Pages
          </button>
          <button
            className={`filter-btn ${filter === 'java' ? 'active' : ''}`}
            onClick={() => setFilter('java')}
          >
            Java &amp; Tools
          </button>
        </div>

        <div className="work-grid reveal">
          {filteredProjects.map((proj) => (
            <div key={proj.id} className="project-card" data-category={proj.category}>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
