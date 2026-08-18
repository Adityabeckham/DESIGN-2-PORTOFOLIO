'use client';

import React, { useState, useEffect } from 'react';
import { StickyNote } from '@/lib/db';
import JelloTitle from '@/components/JelloTitle';

export default function GuestbookBoard() {
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [color, setColor] = useState<'yellow' | 'blue' | 'green' | 'pink'>('yellow');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/guestbook');
      const data = await res.json();
      if (data.success) {
        setNotes(data.notes);
      }
    } catch (err) {
      console.error('Failed to load notes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, message, color }),
      });
      const data = await res.json();
      if (data.success) {
        setAuthor('');
        setMessage('');
        fetchNotes();
      }
    } catch (err) {
      console.error('Failed to save note:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (id: string) => {
    // Optimistic UI update
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, likes: n.likes + 1 } : n))
    );

    try {
      await fetch('/api/guestbook', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
    } catch (err) {
      console.error('Failed to update likes:', err);
    }
  };

  const handleDelete = async (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    try {
      await fetch(`/api/guestbook?id=${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  };

  return (
    <section id="guestbook" className="guestbook-section">
      <div className="container">
        <div className="section-header reveal">
          <p className="section-subtitle">visitor corkboard</p>
          <h2 className="section-title">
            <JelloTitle text="</Guestbook> 📌" />
          </h2>
        </div>

        <div className="corkboard-frame reveal">
          <div className="corkboard-surface">
            {/* Note Creator Form */}
            <div className="note-creator-card">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px' }}>
                ✍️ Pin a Sticky Note on the Wall
              </h3>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '12px' }}>
                  <label htmlFor="note-author" style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px', fontWeight: 600 }}>
                    Your Name / Alias:
                  </label>
                  <input
                    id="note-author"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Alex, Tech Recruiter, Visitor..."
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    maxLength={80}
                  />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label htmlFor="note-message" style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px', fontWeight: 600 }}>
                    Your Message / Feedback:
                  </label>
                  <textarea
                    id="note-message"
                    className="form-textarea"
                    rows={3}
                    placeholder="Leave your thoughts, feedback, or say hi! 👋"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    maxLength={300}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Color:</span>
                    {(['yellow', 'blue', 'green', 'pink'] as const).map((c) => (
                      <button
                        key={c}
                        type="button"
                        className={`color-dot-btn ${color === c ? 'active' : ''}`}
                        onClick={() => setColor(c)}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          border: color === c ? '2px solid var(--color-text-primary)' : 'none',
                          backgroundColor: `var(--note-${c})`,
                          cursor: 'pointer'
                        }}
                        aria-label={`Select ${c} color`}
                      />
                    ))}
                  </div>

                  <button type="submit" className="btn btn-accent" disabled={isSubmitting}>
                    {isSubmitting ? 'Posting...' : '📌 Pin Note to Wall'}
                  </button>
                </div>
              </form>
            </div>

            {/* Notes Corkboard Wall */}
            {isLoading ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-text-muted)' }}>
                <span>Loading notes from Neon Database... ⌛</span>
              </div>
            ) : notes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-text-muted)' }}>
                <span>No sticky notes pinned yet. Be the first to leave a message! 👋</span>
              </div>
            ) : (
              <div className="corkboard-notes-grid">
                {notes.map((note, idx) => {
                  const rotationDeg = (idx % 2 === 0 ? 1 : -1) * ((idx * 3) % 7 + 2);
                  return (
                    <div
                      key={note.id}
                      className={`sticky-note-card note-theme-${note.color}`}
                      style={{ transform: `rotate(${rotationDeg}deg)` }}
                    >
                      <div>
                        <p className="note-text-display">{note.message}</p>
                      </div>
                      <div>
                        <div className="note-author-display">— {note.author}</div>
                        <div className="note-footer-actions">
                          <button
                            className="like-note-btn"
                            onClick={() => handleLike(note.id)}
                            title="Sukai note ini"
                          >
                            ❤️ <span>{note.likes}</span>
                          </button>
                          <button
                            className="delete-note-btn"
                            onClick={() => handleDelete(note.id)}
                            title="Hapus note"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
