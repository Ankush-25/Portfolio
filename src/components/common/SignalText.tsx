'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useMotion } from '@/context/MotionContext';

interface SignalTextProps {
  text: string;
  className?: string;
  scrambleOnMount?: boolean;
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#+/>~';

export const SignalText: React.FC<SignalTextProps> = ({
  text,
  className = '',
  scrambleOnMount = false,
}) => {
  const { isMotionEnabled } = useMotion();
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const frameRef = useRef<number | null>(null);

  const triggerScramble = () => {
    if (!isMotionEnabled || isScrambling) return;
    setIsScrambling(true);

    const length = text.length;
    let iteration = 0;
    const maxIterations = length * 3;

    const tick = () => {
      iteration++;
      const revealedCount = Math.floor((iteration / maxIterations) * length);

      const next = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < revealedCount) return text[index];
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');

      setDisplayText(next);

      if (iteration < maxIterations) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayText(text);
        setIsScrambling(false);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (scrambleOnMount && isMotionEnabled) {
      triggerScramble();
    }
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [scrambleOnMount, isMotionEnabled]);

  return (
    <span
      onMouseEnter={triggerScramble}
      className={`inline-block font-mono tracking-tight cursor-default select-none transition-colors duration-150 ${className}`}
    >
      {/* Invisible anchor for zero layout shift */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{displayText}</span>
    </span>
  );
};
