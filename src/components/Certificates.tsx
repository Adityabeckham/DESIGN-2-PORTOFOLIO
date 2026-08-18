'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  image: string;
}

const certs: Certificate[] = [
  { id: 'c1', title: 'Ethical Hacker Certificate', issuer: 'IDCamp 2025', image: '/assets/images/certificates/sertifikatethicalhacker.png' },
  { id: 'c2', title: 'Fundamental Web Certificate', issuer: 'KOMDIGI 2025', image: '/assets/images/certificates/fundementaljuniorweb.png' },
  { id: 'c3', title: 'Intermediate Web Certificate', issuer: 'KOMDIGI 2025', image: '/assets/images/certificates/intermediateWeb.png' },
  { id: 'c4', title: 'Konsep Pemrograman', issuer: 'Dicoding Indonesia', image: '/assets/images/certificates/Konsep Pemrograman.png' },
  { id: 'c5', title: 'Dasar Pemrograman Software', issuer: 'Dicoding Indonesia', image: '/assets/images/certificates/sertifkatdasarpemorgramansoftware.png' },
  { id: 'c6', title: 'Programming Logic 101', issuer: 'Dicoding Indonesia', image: '/assets/images/certificates/programminglogic.png' },
  { id: 'c7', title: 'Dasar Pemrograman Web', issuer: 'Dicoding Indonesia', image: '/assets/images/certificates/sertfikatweb.jpg' },
  { id: 'c8', title: 'Dasar JavaScript', issuer: 'Dicoding Indonesia', image: '/assets/images/certificates/sertifikat javascript.png' },
  { id: 'c9', title: 'Frontend Pemula', issuer: 'Dicoding Indonesia', image: '/assets/images/certificates/frontendpemula.png' },
  { id: 'c10', title: 'React Certificate', issuer: 'Dicoding Indonesia', image: '/assets/images/certificates/sertifikatreact.png' },
  { id: 'c11', title: 'Backend Pemula', issuer: 'Dicoding Indonesia', image: '/assets/images/certificates/sertifikatbackendpemula.png' },
  { id: 'c12', title: 'Cloud & Gen AI AWS', issuer: 'AWS Training', image: '/assets/images/certificates/sertifikat-cloud.png' }
];

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="certificates-section">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-subtitle">credentials &amp; licenses</p>
          <h2 className="section-title jello-title">&lt;/Certificates&gt; 📜</h2>
        </div>

        <div className="certificates-grid reveal">
          {certs.map((cert) => (
            <div
              key={cert.id}
              className="certificate-card"
              onClick={() => setSelectedCert(cert)}
              style={{ cursor: 'pointer' }}
            >
              <div className="cert-img-wrapper">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  width={320}
                  height={200}
                  style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px' }}
                />
              </div>
              <div className="cert-info" style={{ padding: '12px 4px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{cert.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{cert.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Lightbox Modal */}
      {selectedCert && (
        <div
          className="modal-backdrop active"
          onClick={() => setSelectedCert(null)}
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '850px',
              width: '100%',
              backgroundColor: 'var(--color-bg-card)',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
            }}
          >
            <button
              onClick={() => setSelectedCert(null)}
              aria-label="Close Lightbox"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: 'var(--color-text-primary)'
              }}
            >
              ✕
            </button>
            <h3 style={{ marginBottom: '16px', fontSize: '1.25rem', fontWeight: 700 }}>{selectedCert.title}</h3>
            <div style={{ position: 'relative', width: '100%', height: 'auto', maxHeight: '70vh' }}>
              <Image
                src={selectedCert.image}
                alt={selectedCert.title}
                width={800}
                height={550}
                style={{ width: '100%', height: 'auto', maxHeight: '65vh', objectFit: 'contain', borderRadius: '12px' }}
              />
            </div>
            <p style={{ marginTop: '12px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              Issued by: {selectedCert.issuer}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
