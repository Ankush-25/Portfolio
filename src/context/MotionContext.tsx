'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface MotionContextType {
  isMotionEnabled: boolean;
  toggleMotion: () => void;
  isInitialized: boolean;
}

const MotionContext = createContext<MotionContextType>({
  isMotionEnabled: true,
  toggleMotion: () => {},
  isInitialized: false,
});

export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMotionEnabled, setIsMotionEnabled] = useState<boolean>(true);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('motion_preference');
      if (stored !== null) {
        setIsMotionEnabled(stored === 'on');
      } else {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        setIsMotionEnabled(!prefersReduced);
      }
    } catch {
      setIsMotionEnabled(true);
    }
    setIsInitialized(true);
  }, []);

  const toggleMotion = () => {
    setIsMotionEnabled((prev) => {
      const nextState = !prev;
      try {
        localStorage.setItem('motion_preference', nextState ? 'on' : 'off');
      } catch (e) {
        console.error('Failed to persist motion preference', e);
      }
      return nextState;
    });
  };

  return (
    <MotionContext.Provider value={{ isMotionEnabled, toggleMotion, isInitialized }}>
      {children}
    </MotionContext.Provider>
  );
};

export const useMotion = () => useContext(MotionContext);

