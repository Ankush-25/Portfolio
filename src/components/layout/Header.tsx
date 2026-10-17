'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMotion } from '@/context/MotionContext';
import { siteMeta } from '@/content/meta';
import { SignalText } from '@/components/common/SignalText';
import { Menu, X, Sparkles, Activity, ArrowUpRight } from 'lucide-react';

export const Header: React.FC = () => {
  const { isMotionEnabled, toggleMotion } = useMotion();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(targetId.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        element.focus();
        window.history.pushState(null, '', targetId);
      }
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }

      if (e.key === 'Tab' && isMobileMenuOpen && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Work', href: '/#work', targetId: '#work', testId: 'nav-link-work' },
    { label: 'About', href: '/#about', targetId: '#about', testId: 'nav-link-about' },
    { label: 'Content', href: '/#content', targetId: '#content', testId: 'nav-link-content' },
    { label: 'Speaking', href: '/#speaking', targetId: '#speaking', testId: 'nav-link-speaking' },
  ];

  return (
    <header
      role="banner"
      className="fixed top-4 left-4 right-4 sm:top-6 sm:left-8 sm:right-8 z-40 max-w-6xl mx-auto rounded-full backdrop-blur-2xl bg-[#0e0e0e]/80 border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.4),inset_0_1px_rgba(255,255,255,0.15)] transition-all duration-300"
    >
      <div className="px-5 sm:px-8 h-16 sm:h-18 flex items-center justify-between">
        {/* Name / Wordmark */}
        <Link
          href="/#top"
          data-testid="nav-logo"
          onClick={(e) => handleAnchorClick(e, '#top')}
          className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded px-1"
        >
          <span className="font-light tracking-tight text-base sm:text-lg text-foreground group-hover:text-white transition-colors">
            {siteMeta.name}
          </span>
          <span className="text-[9px] tracking-widest text-zinc-500 font-mono uppercase">
            Systems & Intelligence
          </span>
        </Link>

        {/* Desktop Navigation with SignalText */}
        <nav role="navigation" aria-label="Main Navigation" className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              data-testid={link.testId}
              onClick={(e) => handleAnchorClick(e, link.targetId)}
              className="text-xs font-mono uppercase tracking-wider text-muted hover:text-foreground transition-all px-3 py-2 rounded-lg hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            >
              <SignalText text={link.label} />
            </Link>
          ))}

          {/* Motion Toggle Button */}
          <button
            type="button"
            data-testid="motion-toggle-btn"
            onClick={toggleMotion}
            aria-pressed={isMotionEnabled}
            aria-label={`Toggle animation motion. Currently ${isMotionEnabled ? 'enabled' : 'reduced'}`}
            className="flex items-center space-x-1.5 text-[11px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-full border border-border hover:border-muted text-muted hover:text-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground ml-2"
          >
            {isMotionEnabled ? (
              <Activity className="w-3 h-3 text-emerald-400" />
            ) : (
              <Sparkles className="w-3 h-3 text-zinc-500" />
            )}
            <span>MOTION {isMotionEnabled ? 'ON' : 'OFF'}</span>
          </button>

          {/* Primary CTA with subtle arrow hover */}
          <Link
            href="/#contact"
            data-testid="nav-cta-contact"
            onClick={(e) => handleAnchorClick(e, '#contact')}
            className="group relative inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest font-mono bg-gradient-to-r from-zinc-200 to-white text-background font-semibold px-5 py-2.5 rounded-full hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all ml-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            <SignalText text="Let's talk" />
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center space-x-3 md:hidden">
          <button
            type="button"
            data-testid="motion-toggle-mobile"
            onClick={toggleMotion}
            aria-pressed={isMotionEnabled}
            aria-label={`Toggle motion. Currently ${isMotionEnabled ? 'on' : 'off'}`}
            className="p-1.5 text-[10px] font-mono border border-border rounded-full text-muted hover:text-foreground"
          >
            {isMotionEnabled ? 'M:ON' : 'M:OFF'}
          </button>

          <button
            ref={menuButtonRef}
            type="button"
            data-testid="mobile-menu-btn"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-drawer"
            aria-label="Toggle Navigation Menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-lg"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-x-0 top-20 bg-background/95 backdrop-blur-2xl z-50 flex flex-col px-6 py-8 md:hidden border-t border-border rounded-b-3xl shadow-2xl"
        >
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.targetId)}
                className="text-2xl font-light text-foreground hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-6 border-t border-border flex flex-col space-y-4">
              <Link
                href="/#contact"
                onClick={(e) => handleAnchorClick(e, '#contact')}
                className="text-center text-sm uppercase tracking-widest font-mono bg-foreground text-background font-semibold py-3 rounded-full"
              >
                Let's talk
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
