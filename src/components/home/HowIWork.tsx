'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { disciplines } from '@/content/disciplines';
import { SectionHeader } from '@/components/common/SectionHeader';
import { MotionReveal } from '@/components/common/MotionReveal';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const HowIWork: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const current = disciplines[activeTab];

  return (
    <section aria-label="Engineering Workflow" className="py-24 border-b border-border bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal>
          <SectionHeader
            eyebrow="04 / HOW I WORK"
            title="Rigorous Methodology & Architectural Precision"
            accentWord="Precision"
            description="From initial domain boundaries to continuous delivery, each project adheres to disciplined software engineering standards."
          />
        </MotionReveal>

        {/* Tab Selection */}
        <div className="flex border-b border-border gap-4 overflow-x-auto pb-px mt-8">
          {disciplines.map((d, index) => (
            <button
              key={d.id}
              role="tab"
              aria-selected={activeTab === index}
              onClick={() => setActiveTab(index)}
              className={`py-3 px-2 text-xs sm:text-sm font-mono tracking-wider border-b-2 transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${
                activeTab === index
                  ? 'border-foreground text-foreground font-medium'
                  : 'border-transparent text-muted hover:text-foreground'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* 3-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {current.process.map((step, idx) => (
            <MotionReveal
              key={step.step}
              delay={idx * 0.1}
              className="p-8 rounded-2xl border border-border bg-surface flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-4">
                  Step {step.step}
                </span>
                <h4 className="text-xl font-light text-foreground tracking-tight mb-3">
                  {step.title}
                </h4>
                <p className="text-sm text-muted font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-border flex items-center space-x-2 text-xs font-mono text-zinc-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Deliverable</span>
              </div>
            </MotionReveal>
          ))}
        </div>

        {/* Bottom Capabilities Line & CTA */}
        <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 rounded-2xl border border-border bg-surface">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase text-muted tracking-widest mr-2">
              Capabilities:
            </span>
            {current.skills.map((skill) => (
              <span
                key={skill}
                className="text-xs font-mono px-2.5 py-1 rounded bg-surface-elevated text-zinc-300 border border-border"
              >
                {skill}
              </span>
            ))}
          </div>

          <Link
            href="/about#capabilities"
            data-testid="how-i-work-capabilities-btn"
            className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-foreground hover:text-white transition-colors shrink-0 p-1"
          >
            <span>Background & capabilities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

