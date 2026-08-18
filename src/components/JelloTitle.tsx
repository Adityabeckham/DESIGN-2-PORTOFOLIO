'use client';

import React from 'react';

interface JelloTitleProps {
  text: string;
  className?: string;
  dataText?: string;
}

export default function JelloTitle({ text, className = '', dataText }: JelloTitleProps) {
  return (
    <span className={`jello-title ${className}`} data-text={dataText || text}>
      {Array.from(text).map((char, index) => (
        <span key={index} className={char === ' ' ? 'jello-space' : 'jello'}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
