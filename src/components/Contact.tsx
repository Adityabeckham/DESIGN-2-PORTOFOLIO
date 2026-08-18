'use client';

import React from 'react';
import JelloTitle from '@/components/JelloTitle';

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-subtitle">let's build something together</p>
          <h2 className="section-title">
            <JelloTitle text="</Contact> 💬" />
          </h2>
        </div>

        <div className="contact-grid reveal">
          <div className="contact-info-card">
            <h3>Get In Touch 🚀</h3>
            <p>
              I am currently open to full-time web developer roles, freelance projects, or tech collaborations.
              Feel free to reach out via email or connect with me on social media!
            </p>

            <div className="contact-links">
              <a href="mailto:abfirmansyah01@gmail.com" className="contact-item">
                <span className="icon">📧</span>
                <div>
                  <strong>Email</strong>
                  <p>abfirmansyah01@gmail.com</p>
                </div>
              </a>
              <a href="https://github.com/Adityabeckham" target="_blank" rel="noreferrer" className="contact-item">
                <span className="icon">💻</span>
                <div>
                  <strong>GitHub</strong>
                  <p>github.com/Adityabeckham</p>
                </div>
              </a>
              <a href="https://linkedin.com/in/adityabeckham" target="_blank" rel="noreferrer" className="contact-item">
                <span className="icon">💼</span>
                <div>
                  <strong>LinkedIn</strong>
                  <p>linkedin.com/in/adityabeckham</p>
                </div>
              </a>
            </div>
          </div>

          <div className="contact-form-card">
            <h3>Send a Message 📬</h3>
            <form action="mailto:abfirmansyah01@gmail.com" method="post" encType="text/plain">
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px', fontWeight: 600 }}>Your Name:</label>
                <input type="text" name="name" className="form-input" placeholder="e.g. John Doe" required />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px', fontWeight: 600 }}>Your Email:</label>
                <input type="email" name="email" className="form-input" placeholder="john@example.com" required />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px', fontWeight: 600 }}>Message:</label>
                <textarea name="message" className="form-textarea" rows={4} placeholder="Hi Aditya, I'd like to discuss a project..." required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Send Direct Email 🚀
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
