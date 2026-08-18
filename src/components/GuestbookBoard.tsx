'use client';

import React, { useState, useEffect } from 'react';
import { StickyNote } from '@/lib/db';
import JelloTitle from '@/components/JelloTitle';
import DraggableStickyNote from '@/components/DraggableStickyNote';

export default function GuestbookBoard() {
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [selectedColor, setSelectedColor] = useState<'yellow' | 'blue' | 'green' | 'pink' | 'cream'>('yellow');
  const [activeDraft, setActiveDraft] = useState<{ id: string; color: string } | null>(null);
  const [draftAuthor, setDraftAuthor] = useState('');
  const [draftMessage, setDraftMessage] = useState('');
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

  const spawnNewDraft = (colorChoice?: 'yellow' | 'blue' | 'green' | 'pink' | 'cream') => {
    const chosenColor = colorChoice || selectedColor;
    setSelectedColor(chosenColor);
    setActiveDraft({
      id: `draft-${Date.now()}`,
      color: chosenColor,
    });
    setDraftAuthor('');
    setDraftMessage('');
  };

  const handleSaveDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeDraft || !draftAuthor.trim() || !draftMessage.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: draftAuthor,
          message: draftMessage,
          color: activeDraft.color,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setActiveDraft(null);
        setDraftAuthor('');
        setDraftMessage('');
        fetchNotes();
      }
    } catch (err) {
      console.error('Failed to save note:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (id: string) => {
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
          <p className="section-subtitle">before you go</p>
          <h2 className="section-title">
            <JelloTitle text="Leave your mark 📌" />
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', marginTop: '6px' }}>
            pin a sticky note — everyone here sees it live!
          </p>
        </div>

        {/* Color Spawn Picker Controls */}
        <div className="corkboard-controls reveal">
          <div className="color-spawn-picker">
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
              Pilih warna &amp; tempel:
            </span>
            {(['yellow', 'blue', 'green', 'pink', 'cream'] as const).map((c) => (
              <button
                key={c}
                type="button"
                className={`color-dot-btn ${selectedColor === c ? 'active' : ''}`}
                style={{ background: `var(--note-${c})` }}
                title={c.charAt(0).toUpperCase() + c.slice(1)}
                onClick={() => spawnNewDraft(c)}
                suppressHydrationWarning
              />
            ))}
          </div>
          <button
            className="btn btn-accent"
            id="spawn-note-btn"
            onClick={() => spawnNewDraft(selectedColor)}
            suppressHydrationWarning
          >
            ➕ Spawn Sticky Note On Board
          </button>
        </div>

        {/* Corkboard Wooden Frame */}
        <div className="corkboard-frame reveal">
          <div className="corkboard-surface">
            {isLoading && notes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-text-muted)' }}>
                <span>Loading notes from Neon Database... ⌛</span>
              </div>
            ) : (
              <div className="corkboard-notes-grid" id="corkboard-notes-grid">
                {/* Active Draft Spawn Note Input Card */}
                {activeDraft && (
                  <form
                    onSubmit={handleSaveDraft}
                    className={`sticky-note-card note-theme-${activeDraft.color}`}
                    style={{ transform: 'rotate(-2deg)', border: '2px dashed var(--color-text-accent)' }}
                  >
                    <div>
                      <textarea
                        className="form-textarea"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          outline: 'none',
                          width: '100%',
                          fontSize: '0.95rem',
                          fontFamily: 'var(--font-handwriting)',
                          fontWeight: 700,
                          resize: 'none',
                          padding: '0'
                        }}
                        rows={3}
                        placeholder="Write your note message..."
                        value={draftMessage}
                        onChange={(e) => setDraftMessage(e.target.value)}
                        required
                        autoFocus
                        maxLength={300}
                        suppressHydrationWarning
                      />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <input
                        type="text"
                        className="form-input"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          borderBottom: '1px stroke rgba(0,0,0,0.2)',
                          outline: 'none',
                          width: '100%',
                          fontSize: '0.85rem',
                          fontFamily: 'var(--font-handwriting)',
                          fontWeight: 700,
                          padding: '2px 0'
                        }}
                        placeholder="— Your Name / Alias"
                        value={draftAuthor}
                        onChange={(e) => setDraftAuthor(e.target.value)}
                        required
                        maxLength={80}
                        suppressHydrationWarning
                      />
                      <div style={{ display: 'flex', gap: '8px', marginTop: '10px', justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => setActiveDraft(null)}
                          suppressHydrationWarning
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-accent btn-sm"
                          disabled={isSubmitting}
                          suppressHydrationWarning
                        >
                          {isSubmitting ? 'Saving...' : 'Pin Note 📌'}
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {/* Existing Saved Notes from Neon DB */}
                {notes.map((note, idx) => (
                  <DraggableStickyNote
                    key={note.id}
                    note={note}
                    index={idx}
                    onLike={handleLike}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              🖐️ <strong>Tip:</strong> Drag &amp; reposition any sticky note around the corkboard!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
