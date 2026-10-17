import React from 'react';
import Link from 'next/link';
import { statsStripData, impactSummary } from '@/content/stats';
import { SectionHeader } from '@/components/common/SectionHeader';
import { MotionReveal } from '@/components/common/MotionReveal';
import { ArrowRight } from 'lucide-react';

export const ImpactNumbers: React.FC = () => {
  return (
    <section id="impact" tabIndex={-1} className="py-24 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal>
          <SectionHeader
            eyebrow="05 / IMPACT & VALIDATION"
            title={impactSummary.heading}
            accentWord={impactSummary.accentWord}
            description={impactSummary.blurb}
          />
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {statsStripData.map((stat, idx) => (
            <MotionReveal
              key={stat.id}
              delay={idx * 0.1}
              className="p-8 rounded-2xl border border-border bg-surface flex flex-col justify-between"
            >
              <div>
                <div className="text-5xl sm:text-6xl font-light font-sans text-foreground tracking-tight">
                  <span aria-hidden="true">{stat.value}</span>
                  <span className="sr-only">{stat.value} {stat.label}</span>
                </div>
                <h4 className="mt-4 text-base font-medium text-foreground tracking-tight">
                  {stat.label}
                </h4>
                <p className="mt-2 text-sm text-muted font-light leading-relaxed">
                  {stat.sourceOrContext}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-border">
                <p className="text-xs text-zinc-500 italic">
                  * {stat.qualifier}
                </p>
              </div>
            </MotionReveal>
          ))}
        </div>

        {/* Common Thread & CTA */}
        <div className="mt-12 p-8 rounded-2xl border border-border bg-surface-elevated/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase text-muted tracking-widest block mb-2">
              Common Thread
            </span>
            <p className="text-base text-foreground font-light leading-relaxed">
              Every metric originates from foundational computer science principles practiced across coursework at SGRR University and applied directly in fast-paced software environments.
            </p>
          </div>

          <Link
            href={impactSummary.ctaHref}
            data-testid="impact-education-btn"
            className="inline-flex items-center space-x-2 bg-foreground text-background font-mono text-xs uppercase tracking-widest px-6 py-3.5 rounded-full font-semibold hover:bg-white transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            <span>{impactSummary.ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

