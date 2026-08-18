'use client';

import React, { useRef, useState } from 'react';
import { StickyNote } from '@/lib/db';

interface DraggableStickyNoteProps {
  note: StickyNote;
  index: number;
  onLike: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function DraggableStickyNote({
  note,
  index,
  onLike,
  onDelete,
}: DraggableStickyNoteProps) {
  const noteRef = useRef<HTMLDivElement | null>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const initialRotation = (index % 2 === 0 ? 1 : -1) * ((index * 3) % 7 + 2);

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.like-note-btn') || target.closest('.delete-note-btn') || target.tagName === 'BUTTON') {
      return;
    }

    const noteElem = noteRef.current;
    if (!noteElem) return;

    setIsDragging(true);
    noteElem.style.zIndex = '100';
    noteElem.style.transition = 'none';

    const startX = e.clientX - posRef.current.x;
    const startY = e.clientY - posRef.current.y;
    let animFrameId: number;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newX = moveEvent.clientX - startX;
      const newY = moveEvent.clientY - startY;
      posRef.current = { x: newX, y: newY };

      cancelAnimationFrame(animFrameId);
      animFrameId = requestAnimationFrame(() => {
        if (noteElem) {
          noteElem.style.transform = `translate(${newX}px, ${newY}px) rotate(${initialRotation}deg) scale(1.03)`;
        }
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      cancelAnimationFrame(animFrameId);
      if (noteElem) {
        noteElem.style.zIndex = '1';
        noteElem.style.transition = 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.2s ease';
        noteElem.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) rotate(${initialRotation}deg) scale(1)`;
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.like-note-btn') || target.closest('.delete-note-btn') || target.tagName === 'BUTTON') {
      return;
    }

    const noteElem = noteRef.current;
    if (!noteElem) return;

    const touch = e.touches[0];
    setIsDragging(true);
    noteElem.style.zIndex = '100';
    noteElem.style.transition = 'none';

    const startX = touch.clientX - posRef.current.x;
    const startY = touch.clientY - posRef.current.y;
    let animFrameId: number;

    const handleTouchMove = (moveEvent: TouchEvent) => {
      const currentTouch = moveEvent.touches[0];
      const newX = currentTouch.clientX - startX;
      const newY = currentTouch.clientY - startY;
      posRef.current = { x: newX, y: newY };

      cancelAnimationFrame(animFrameId);
      animFrameId = requestAnimationFrame(() => {
        if (noteElem) {
          noteElem.style.transform = `translate(${newX}px, ${newY}px) rotate(${initialRotation}deg) scale(1.03)`;
        }
      });
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      cancelAnimationFrame(animFrameId);
      if (noteElem) {
        noteElem.style.zIndex = '1';
        noteElem.style.transition = 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.2s ease';
        noteElem.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) rotate(${initialRotation}deg) scale(1)`;
      }
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <div
      ref={noteRef}
      className={`sticky-note-card note-theme-${note.color} ${isDragging ? 'dragging' : ''}`}
      style={{
        transform: `translate(${posRef.current.x}px, ${posRef.current.y}px) rotate(${initialRotation}deg)`,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: 1,
        transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.2s ease',
        boxShadow: isDragging ? '0 15px 30px rgba(0,0,0,0.25)' : undefined,
        userSelect: 'none',
        touchAction: 'none',
        willChange: 'transform'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div>
        <p className="note-text-display">{note.message}</p>
      </div>
      <div>
        <div className="note-author-display">— {note.author}</div>
        <div className="note-footer-actions">
          <button
            type="button"
            className="like-note-btn"
            onClick={(e) => {
              e.stopPropagation();
              onLike(note.id);
            }}
            title="Sukai note ini"
            suppressHydrationWarning
          >
            ❤️ <span>{note.likes}</span>
          </button>
          <button
            type="button"
            className="delete-note-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
            title="Hapus note"
            suppressHydrationWarning
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
