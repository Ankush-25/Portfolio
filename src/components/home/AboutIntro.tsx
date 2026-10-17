import React from 'react';
import Link from 'next/link';
import { SectionHeader } from '@/components/common/SectionHeader';
import { MotionReveal } from '@/components/common/MotionReveal';
import { ArrowRight } from 'lucide-react';

export const AboutIntro: React.FC = () => {
  return (
    <section id="about" tabIndex={-1} className="py-24 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal>
          <SectionHeader
            eyebrow="01 / PERSPECTIVE"
            title="Bridging System Architecture with Measurable Performance"
            accentWord="Performance"
            description="Software engineering isn't just about syntax—it's about constructing resilient digital systems that solve real operational bottlenecks with speed and clarity."
          />
        </MotionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
          <MotionReveal delay={0.1} className="lg:col-span-8 flex flex-col space-y-6">
            <p className="text-lg sm:text-xl text-foreground font-light leading-relaxed">
              With 7+ months of software industry immersion across frontend latency optimization and dynamic scheduling platforms, I specialize in bridging fullstack React and Node.js ecosystems with predictive machine learning pipelines.
            </p>
            <p className="text-base text-muted font-light leading-relaxed">
              Whether debugging complex state transitions in multi-client collaboration tools or tuning multi-layer LSTM cells for time-series forecasting, my approach balances theoretical rigor from my MCA with lean, agile delivery.
            </p>

            <div className="pt-4 flex items-center space-x-6">
              <Link
                href="/about"
                data-testid="about-read-story-btn"
                className="inline-flex items-center space-x-2 bg-surface hover:bg-surface-elevated text-foreground border border-border hover:border-muted font-mono text-xs uppercase tracking-widest px-6 py-3.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
              >
                <span>Read my story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <span className="text-xs font-mono text-muted tracking-wider hidden sm:inline-block">
                 MCA · Fullstack · ISRO Certified
              </span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.2} className="lg:col-span-4 p-8 rounded-2xl border border-border bg-surface flex flex-col justify-between h-full">
            <div>
              <span className="text-xs font-mono uppercase text-muted tracking-widest block mb-4">
                Core Philosophy
              </span>
              <p className="text-2xl font-light text-foreground tracking-tight leading-snug">
                "Measure the baseline. Eliminate the bloat. Prove every outcome."
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex items-center justify-between text-xs font-mono text-muted">
              <span>01 / 03 PERSPECTIVES</span>
              <span className="text-foreground">DISCIPLINED EXECUTION</span>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
};

