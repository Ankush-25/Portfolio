import React from 'react';
import Link from 'next/link';
import { storyNarrative, storyMilestones } from '@/content/timeline';
import { SectionHeader } from '@/components/common/SectionHeader';
import { MotionReveal } from '@/components/common/MotionReveal';
import { ArrowUpRight, ArrowRight, Calendar } from 'lucide-react';

export const StoryTimeline: React.FC = () => {
  return (
    <section aria-label="Professional Experience & Story" className="py-24 border-b border-border bg-surface/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal>
          <SectionHeader
            eyebrow="06 / CAREER & FORMATION"
            title={storyNarrative.heading}
            accentWord={storyNarrative.accentWord}
            description={storyNarrative.summary}
          />
        </MotionReveal>

        {/* Ordered Timeline List */}
        <ol className="relative border-l border-border mt-12 ml-4 space-y-12">
          {storyMilestones.map((milestone, idx) => (
            <li key={milestone.title} className="ml-8 relative">
              {/* Bullet node */}
              <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-foreground" />

              <MotionReveal delay={idx * 0.1}>
                <div className="p-8 rounded-2xl border border-border bg-surface hover:border-muted/40 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                    <span className="flex items-center space-x-2 text-xs font-mono text-muted uppercase tracking-wider">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{milestone.year}</span>
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {milestone.organization}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-light text-foreground tracking-tight">
                    {milestone.title}
                  </h3>

                  <p className="mt-3 text-base text-muted font-light leading-relaxed">
                    {milestone.narrative}
                  </p>

                  {milestone.proofUrl && (
                    <div className="mt-4 pt-3 border-t border-border flex items-center justify-end">
                      <a
                        href={milestone.proofUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 text-xs font-mono text-muted hover:text-foreground transition-colors"
                      >
                        <span>{milestone.proofLabel || 'Verification Record'}</span>
                        <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                      </a>
                    </div>
                  )}
                </div>
              </MotionReveal>
            </li>
          ))}
        </ol>

        {/* CTAs Row */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href={storyNarrative.ctaHref}
            className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-foreground hover:text-white transition-colors"
          >
            <span>{storyNarrative.ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {storyNarrative.externalProofUrl && (
            <a
              href={storyNarrative.externalProofUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="story-proof-link"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-border bg-surface hover:border-muted text-xs font-mono text-muted hover:text-foreground transition-colors"
            >
              <span>{storyNarrative.externalProofText}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

