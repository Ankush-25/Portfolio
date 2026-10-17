'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useMotion } from '@/context/MotionContext';
import { disciplines } from '@/content/disciplines';
import { DisciplineCanvas3D } from '@/components/3d/DisciplineCanvas3D';
import { SignalText } from '@/components/common/SignalText';
import { ArrowRight, Layers, Cpu, Zap } from 'lucide-react';

const icons = {
  build: <Layers className="w-4 h-4" />,
  engineer: <Cpu className="w-4 h-4" />,
  scale: <Zap className="w-4 h-4" />,
};

export const DisciplineSelector: React.FC = () => {
  const { isMotionEnabled } = useMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Auto-rotation every 6s until user interacts
  useEffect(() => {
    if (!isMotionEnabled || hasInteracted) return;

    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % disciplines.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isMotionEnabled, hasInteracted]);

  const handleTabClick = (index: number) => {
    setHasInteracted(true);
    setSelectedIndex(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    setHasInteracted(true);
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % disciplines.length;
      setSelectedIndex(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + disciplines.length) % disciplines.length;
      setSelectedIndex(prevIndex);
      tabRefs.current[prevIndex]?.focus();
    }
  };

  const activeDiscipline = disciplines[selectedIndex];

  return (
    <section aria-label="Core Engineering Disciplines" className="py-24 border-b border-border bg-surface/40 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with rotation indicator */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-muted block mb-2">
              <SignalText text="02 / THREE DISCIPLINES. ONE PERSPECTIVE." />
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-foreground tracking-tight">
              Three Lenses of <span className="font-serif italic font-normal text-white">Engineering</span>
            </h2>
          </div>

          <div className="text-xs font-mono text-muted tracking-widest flex items-center space-x-2">
            <span>0{selectedIndex + 1} / 0{disciplines.length}</span>
            <span className="text-zinc-600">|</span>
            <span>{hasInteracted ? 'MANUAL SELECTION' : 'AUTO-ROTATING'}</span>
          </div>
        </div>

        {/* Tab List */}
        <div
          role="tablist"
          aria-label="Engineering Disciplines"
          className="flex border-b border-border gap-2 sm:gap-6 overflow-x-auto pb-px"
        >
          {disciplines.map((item, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <button
                key={item.id}
                ref={(el) => { tabRefs.current[idx] = el; }}
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${item.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => handleTabClick(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                data-testid={`discipline-tab-${item.id}`}
                className={`flex items-center space-x-3 py-4 px-3 border-b-2 text-sm font-mono tracking-wider transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${
                  isSelected
                    ? 'border-foreground text-foreground font-medium bg-surface/60 rounded-t-lg'
                    : 'border-transparent text-muted hover:text-foreground'
                }`}
              >
                <span className={isSelected ? 'text-foreground' : 'text-zinc-500'}>
                  {icons[item.id as keyof typeof icons]}
                </span>
                <SignalText text={item.label} />
              </button>
            );
          })}
        </div>

        {/* Tab Panel */}
        <div
          role="tabpanel"
          id={`panel-${activeDiscipline.id}`}
          aria-labelledby={`tab-${activeDiscipline.id}`}
          className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Column: Core Narrative & Skills */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <h3 className="text-2xl sm:text-4xl font-light text-foreground tracking-tight leading-snug">
              {activeDiscipline.heading}
            </h3>
            <p className="text-base sm:text-lg text-muted font-light leading-relaxed max-w-2xl">
              {activeDiscipline.blurb}
            </p>

            {/* Skills Tag Row */}
            <div className="pt-2">
              <span className="text-xs font-mono uppercase text-zinc-500 tracking-wider block mb-3">
                Key Stack & Competencies
              </span>
              <div className="flex flex-wrap gap-2">
                {activeDiscipline.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs font-mono rounded-full border border-border bg-surface text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Link
                href={activeDiscipline.ctaHref}
                data-testid="discipline-panel-cta"
                className="group inline-flex items-center space-x-2 bg-foreground text-background font-mono text-xs uppercase tracking-widest px-7 py-3.5 rounded-full font-semibold hover:bg-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
              >
                <SignalText text={activeDiscipline.ctaText} />
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive 3D Canvas Object */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <DisciplineCanvas3D activeId={activeDiscipline.id} />

            <div className="p-6 rounded-2xl border border-border bg-surface text-xs font-mono text-muted space-y-3">
              <span className="text-zinc-500 uppercase tracking-widest block text-[10px]">
                Execution Steps
              </span>
              {activeDiscipline.process.map((step) => (
                <div key={step.step} className="flex items-start space-x-2">
                  <span className="text-foreground">{step.step}</span>
                  <span className="text-zinc-400">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
