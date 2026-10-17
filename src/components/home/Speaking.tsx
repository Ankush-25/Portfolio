import React from 'react';
import { speakingHero, speakingTopics, speakingTalks } from '@/content/speaking';
import { SectionHeader } from '@/components/common/SectionHeader';
import { MotionReveal } from '@/components/common/MotionReveal';
import { ArrowUpRight, Mic, Calendar, MapPin } from 'lucide-react';

export const Speaking: React.FC = () => {
  return (
    <section id="speaking" tabIndex={-1} className="py-24 border-b border-border bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal>
          <SectionHeader
            eyebrow="08 / SESSIONS & WORKSHOPS"
            title={speakingHero.heading}
            accentWord={speakingHero.accentWord}
            description={speakingHero.blurb}
          />
        </MotionReveal>

        {/* Topic Chips */}
        <div className="mt-8 mb-12">
          <span className="text-xs font-mono uppercase text-muted tracking-widest block mb-3">
            Core Discussion & Workshop Topics
          </span>
          <div className="flex flex-wrap gap-2">
            {speakingTopics.map((topic) => (
              <span
                key={topic}
                className="px-3 py-1.5 rounded-full border border-border bg-surface text-xs font-mono text-foreground"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Featured Talks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {speakingTalks.map((talk, idx) => (
            <MotionReveal
              key={talk.title}
              delay={idx * 0.1}
              className="p-8 rounded-2xl border border-border bg-surface flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-muted mb-4">
                  <span className="flex items-center space-x-1.5 text-zinc-300">
                    <Mic className="w-3.5 h-3.5" />
                    <span>{talk.type}</span>
                  </span>
                  <span>{talk.year}</span>
                </div>

                <h4 className="text-xl font-light text-foreground tracking-tight mb-2">
                  {talk.title}
                </h4>

                <div className="flex items-center space-x-2 text-xs font-mono text-muted mb-4">
                  <MapPin className="w-3 h-3 text-zinc-500" />
                  <span>{talk.eventOrVenue}</span>
                </div>

                <p className="text-sm text-muted font-light leading-relaxed mb-6">
                  {talk.abstract}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {talk.chips.map((chip) => (
                    <span
                      key={chip}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-elevated text-zinc-400 border border-border"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                {talk.recordingUrl && (
                  <div className="pt-4 border-t border-border flex justify-end">
                    <a
                      href={talk.recordingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs font-mono text-foreground hover:text-white transition-colors"
                    >
                      <span>Repository & Slides</span>
                      <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                    </a>
                  </div>
                )}
              </div>
            </MotionReveal>
          ))}
        </div>

        {/* Booking CTA */}
        <div className="mt-16 text-center">
          <a
            href={speakingHero.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="speaking-invite-btn"
            className="inline-flex items-center space-x-2 bg-foreground text-background font-mono text-xs uppercase tracking-widest px-8 py-4 rounded-full font-semibold hover:bg-white transition-all shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            <span>{speakingHero.ctaText}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

