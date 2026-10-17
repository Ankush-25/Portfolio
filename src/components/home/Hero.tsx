'use client';

import React, { useState, useEffect } from 'react';
import { useMotion } from '@/context/MotionContext';
import { siteMeta } from '@/content/meta';
import { SignalText } from '@/components/common/SignalText';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

const taglines = [
  'Architecting resilient MERN web platforms.',
  'Engineering time-series machine learning models.',
  'Optimizing critical rendering paths & Web Vitals.',
];

export const Hero: React.FC = () => {
  const { isMotionEnabled } = useMotion();
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    if (!isMotionEnabled) return;

    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3800);

    return () => clearInterval(interval);
  }, [isMotionEnabled]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      element.focus();
      window.history.pushState(null, '', targetId);
    }
  };

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative min-h-[96vh] flex flex-col justify-between pt-36 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Top Editorial Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase tracking-widest text-muted border-b border-border/80 pb-6">
        <div className="flex items-center space-x-3">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>FULLSTACK ENGINEER · SYSTEM ARCHITECT · ML RESEARCH</span>
        </div>
        <div className="flex items-center space-x-6 text-zinc-400">
          <span>BASED IN {siteMeta.location.toUpperCase()}</span>
          <span>SINCE 2023</span>
        </div>
      </div>

      {/* Hero Core Content: Centered editorial alignment in front of the 3D particle portrait */}
      <div className="my-auto py-12 max-w-4xl mx-auto text-center relative z-10">
        {/* Scramble Kicker */}
        <div className="mb-4">
          <SignalText
            text="ENGINEERING WITH DISCIPLINE & SCALE"
            scrambleOnMount
            className="text-xs uppercase tracking-widest text-zinc-400"
          />
        </div>

        {/* Dynamic Focus Tagline */}
        <div className="text-sm sm:text-base font-mono text-zinc-400 mb-6 flex items-center justify-center space-x-2" aria-live="polite">
          <span className="text-zinc-600">[FOCUS]</span>
          <span>{isMotionEnabled ? taglines[taglineIndex] : taglines[0]}</span>
        </div>

        {/* Editorial Heading 1 with Signature Italic Accent */}
        <h1 className="text-6xl sm:text-8xl lg:text-9xl font-light text-foreground tracking-tight leading-[0.9] mb-8 drop-shadow-2xl">
          {siteMeta.firstName}{' '}
          <span className="font-serif italic font-normal text-white">
            {siteMeta.lastName}
          </span>
        </h1>

        {/* Pitch Statement */}
        <p className="text-lg sm:text-2xl text-muted font-light leading-relaxed max-w-2xl mx-auto mb-10 drop-shadow-md">
          I build resilient web platforms, train predictive models, and eliminate digital latency with clean code.
        </p>

        {/* Primary Actions with Shimmer & Signal Hover */}
        <div className="flex flex-wrap items-center justify-center gap-5">
          <a
            href="#work"
            data-testid="hero-cta-work"
            onClick={(e) => handleScroll(e, '#work')}
            className="group relative inline-flex items-center space-x-3 bg-foreground text-background font-mono text-xs uppercase tracking-widest px-8 py-4 rounded-full font-semibold hover:bg-white transition-all shadow-[0_0_40px_rgba(255,255,255,0.25)] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            <span className="relative z-10 flex items-center space-x-2">
              <SignalText text="Explore my work" />
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform pointer-events-none" />
          </a>

          <a
            href="#contact"
            data-testid="hero-cta-contact"
            onClick={(e) => handleScroll(e, '#contact')}
            className="group inline-flex items-center space-x-2 border border-border/90 bg-surface/60 backdrop-blur-sm hover:border-muted text-foreground font-mono text-xs uppercase tracking-widest px-7 py-4 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            <SignalText text="Start a conversation" />
            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Hero Bottom Bar */}
      <div className="pt-6 border-t border-border/80 flex flex-wrap items-center justify-between text-xs font-mono text-muted gap-4">
        <a
          href="#about"
          data-testid="hero-scroll-hint"
          onClick={(e) => handleScroll(e, '#about')}
          className="flex items-center space-x-2 text-foreground hover:text-white transition-colors group p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
        >
          <span className="w-6 h-px bg-zinc-600 group-hover:w-10 transition-all" />
          <SignalText text="SCROLL TO DISCOVER" />
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </a>

        <div className="flex items-center space-x-6 text-zinc-400">
          <span>MCA · ISRO CERTIFIED · DEHRADUN</span>
          <span className="text-zinc-600 hidden sm:inline">|</span>
          <span className="hidden sm:inline">AN ONGOING EXPLORATION ↗</span>
        </div>
      </div>
    </section>
  );
};
