import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { speakingHero, speakingTopics, speakingTalks } from '@/content/speaking';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ArrowLeft, ArrowUpRight, Mic, Calendar, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Speaking & Technical Sessions',
  description: 'Technical seminars, workshops, and speaking engagements by Ankit Bhandari.',
};

export default function SpeakingPage() {
  return (
    <div className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Return Navigation */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-muted hover:text-foreground transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>
      </div>

      <SectionHeader
        eyebrow="SPEAKING PROFILE"
        title="Technical Sessions, Keynotes & Seminars"
        accentWord="Seminars"
        description="Available for university workshops, developer meetups, and technical deep-dives on MERN systems, WebSockets, and Machine Learning."
      />

      {/* Talks */}
      <div className="space-y-8 mt-12">
        {speakingTalks.map((talk) => (
          <div
            key={talk.title}
            className="p-8 sm:p-10 rounded-2xl border border-border bg-surface"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 text-xs font-mono text-muted">
              <span className="flex items-center space-x-2 text-foreground font-medium">
                <Mic className="w-4 h-4" />
                <span>{talk.type}</span>
              </span>
              <span>{talk.year}</span>
            </div>

            <h2 className="text-2xl font-light text-foreground tracking-tight mb-2">
              {talk.title}
            </h2>

            <div className="flex items-center space-x-2 text-xs font-mono text-muted mb-4">
              <MapPin className="w-3.5 h-3.5 text-zinc-500" />
              <span>{talk.eventOrVenue}</span>
            </div>

            <p className="text-base text-muted font-light leading-relaxed mb-6">
              {talk.abstract}
            </p>

            <div className="flex flex-wrap gap-2">
              {talk.chips.map((chip) => (
                <span
                  key={chip}
                  className="px-3 py-1 rounded-full border border-border bg-surface-elevated text-xs font-mono text-zinc-300"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Booking Card */}
      <div className="mt-16 p-8 rounded-2xl border border-border bg-surface text-center">
        <h3 className="text-2xl font-light text-foreground tracking-tight mb-3">
          Interested in a Technical Workshop or Talk?
        </h3>
        <p className="text-sm text-muted font-light max-w-xl mx-auto mb-6">
          Reach out directly via LinkedIn with event details, proposed topics, and expected dates.
        </p>
        <a
          href={speakingHero.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 bg-foreground text-background font-mono text-xs uppercase tracking-widest px-8 py-4 rounded-full font-semibold hover:bg-white transition-all shadow-md"
        >
          <span>Send Speaking Inquiry</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

