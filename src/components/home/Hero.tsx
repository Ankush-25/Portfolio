'use client';

import React, { useState, useEffect } from 'react';
import { useMotion } from '@/context/MotionContext';
import { siteMeta } from '@/content/meta';
import { SignalText } from '@/components/common/SignalText';
import { HeroPortraitParticle } from '@/components/home/HeroPortraitParticle';
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
      className="relative min-h-[96vh] flex flex-col justify-between pt-28 sm:pt-32 pb-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      {/* Top Editorial Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase tracking-widest text-muted border-b border-border/80 pb-5">
        <div className="flex items-center space-x-3">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>FULLSTACK ENGINEER · SYSTEM ARCHITECT · ML RESEARCH</span>
        </div>
        <div className="flex items-center space-x-6 text-zinc-400">
          <span>BASED IN {siteMeta.location.toUpperCase()}</span>
          <span>SINCE 2023</span>
        </div>
      </div>

      {/* Hero Core Content: Clean vertical hierarchy — Portrait with 3D Particles on top, Name cleanly situated BELOW */}
      <div className="my-auto py-6 max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
        {/* Scramble Kicker */}
        <div className="mb-4">
          <SignalText
            text="ENGINEERING WITH DISCIPLINE & SCALE"
            scrambleOnMount
            className="text-xs uppercase tracking-widest text-zinc-400 font-mono"
          />
        </div>

        {/* Centered Portrait with 3D Overlapping Particles in feathery mode */}
        <div className="mb-5 flex justify-center">
          <HeroPortraitParticle />
        </div>

        {/* Editorial Heading 1: Cleanly situated BELOW the portrait with zero text-on-face clutter */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-foreground tracking-tight leading-[0.95] mb-4">
          {siteMeta.firstName}{' '}
          <span className="font-serif italic font-normal text-white">
            {siteMeta.lastName}
          </span>
        </h1>

        {/* Dynamic Focus Tagline */}
        <div className="text-xs sm:text-sm font-mono text-zinc-400 mb-4 flex items-center justify-center space-x-2" aria-live="polite">
          <span className="text-zinc-600">[FOCUS]</span>
          <span>{isMotionEnabled ? taglines[taglineIndex] : taglines[0]}</span>
        </div>

        {/* Pitch Statement */}
        <p className="text-sm sm:text-base lg:text-lg text-muted font-light leading-relaxed max-w-xl mx-auto mb-7">
          I build resilient web platforms, train predictive models, and eliminate digital latency with clean code.
        </p>

        {/* Primary Actions with Shimmer & Signal Hover */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#work"
            data-testid="hero-cta-work"
            onClick={(e) => handleScroll(e, '#work')}
            className="group relative inline-flex items-center space-x-3 bg-foreground text-background font-mono text-xs uppercase tracking-widest px-8 py-3.5 rounded-full font-semibold hover:bg-white transition-all shadow-[0_0_35px_rgba(255,255,255,0.2)] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
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
            className="group inline-flex items-center space-x-2 border border-border/90 bg-surface/60 backdrop-blur-sm hover:border-muted text-foreground font-mono text-xs uppercase tracking-widest px-7 py-3.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            <SignalText text="Start a conversation" />
            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Hero Bottom Bar */}
      <div className="pt-5 border-t border-border/80 flex flex-wrap items-center justify-between text-xs font-mono text-muted gap-4">
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
