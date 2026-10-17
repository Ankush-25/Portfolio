'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMotion } from '@/context/MotionContext';
import { siteMeta } from '@/content/meta';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

const taglines = [
  'Architecting resilient MERN web platforms.',
  'Engineering time-series machine learning models.',
  'Optimizing critical rendering paths & Web Vitals.',
];

export const Hero: React.FC = () => {
  const { isMotionEnabled } = useMotion();
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isMotionEnabled || isPaused) return;

    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isMotionEnabled, isPaused]);

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
      className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-border"
    >
      {/* Top Eyebrow & Status Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase tracking-widest text-muted border-b border-border pb-6">
        <div className="flex items-center space-x-3">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Available for Full-time Roles & High-Impact Engineering</span>
        </div>
        <div className="flex items-center space-x-6">
          <span>Based in {siteMeta.location}</span>
          <span>EST. 2023</span>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto py-12">
        <div className="lg:col-span-8 flex flex-col space-y-8">
          {/* Rotating Tagline */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            tabIndex={0}
            className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded"
            aria-live="polite"
          >
            <div className="text-sm sm:text-base font-mono text-muted tracking-tight transition-all duration-300">
              <span className="text-zinc-500 mr-2">[Focus]</span>
              {isMotionEnabled ? taglines[taglineIndex] : taglines[0]}
            </div>
          </div>

          {/* Heading 1 with Italic Surname Accent */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light text-foreground tracking-tight leading-[0.95]">
            {siteMeta.firstName}{' '}
            <span className="font-serif italic font-normal text-white">
              {siteMeta.lastName}
            </span>
          </h1>

          {/* One-Line Pitch */}
          <p className="text-lg sm:text-2xl text-muted font-light max-w-3xl leading-relaxed">
            {siteMeta.pitch}
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#work"
              data-testid="hero-cta-work"
              onClick={(e) => handleScroll(e, '#work')}
              className="inline-flex items-center space-x-2 bg-foreground text-background font-mono text-xs uppercase tracking-widest px-6 py-4 rounded-full font-semibold hover:bg-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            >
              <span>Explore my work</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              data-testid="hero-cta-contact"
              onClick={(e) => handleScroll(e, '#contact')}
              className="inline-flex items-center space-x-2 border border-border hover:border-muted text-foreground font-mono text-xs uppercase tracking-widest px-6 py-4 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            >
              <span>Start a conversation</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Profile Card / Portrait */}
        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <div className="relative w-64 sm:w-72 aspect-[3/4] rounded-2xl overflow-hidden border border-border bg-surface-elevated shadow-2xl group">
            <Image
              src="/photo.jpg"
              alt={`${siteMeta.name} - Portrait`}
              fill
              priority
              sizes="(max-width: 768px) 256px, 288px"
              className="object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-foreground flex justify-between items-center">
              <span>{siteMeta.name}</span>
              <span className="text-muted">MCA, Fullstack</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Hint to #about */}
      <div className="pt-6 border-t border-border flex items-center justify-between text-xs font-mono text-muted">
        <a
          href="#about"
          data-testid="hero-scroll-hint"
          onClick={(e) => handleScroll(e, '#about')}
          className="flex items-center space-x-2 hover:text-foreground transition-colors group p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
        >
          <span>Scroll to discover</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </a>

        <div className="hidden sm:block">
          <span>01 / ARCHITECTURE & MODELS</span>
        </div>
      </div>
    </section>
  );
};

