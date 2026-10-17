'use client';

import React from 'react';

export const SkipLink: React.FC = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainElement = document.getElementById('main');
    if (mainElement) {
      mainElement.tabIndex = -1;
      mainElement.focus();
      mainElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href="#main"
      data-testid="skip-link"
      onClick={handleClick}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:font-semibold focus:rounded-md focus:shadow-xl focus:ring-2 focus:ring-offset-2 focus:ring-foreground focus:outline-none transition-all"
    >
      Skip to content
    </a>
  );
};

