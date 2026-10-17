import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { contentMediaItems, contentCategories } from '@/content/content-hub';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Content & Technical Walkthroughs',
  description: 'Deep dives into fullstack systems, websocket synchronization, machine learning models, and rendering optimization.',
};

export default function ContentPage() {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        eyebrow="INDEX / KNOWLEDGE BASE"
        title="Engineering Publications & Repository Deep Dives"
        accentWord="Publications"
        description="Comprehensive guides detailing production lessons, algorithm evaluations, and fullstack architectural decisions."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {contentMediaItems.map((item) => (
          <div
            key={item.id}
            className="p-8 rounded-2xl border border-border bg-surface hover:border-muted/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-muted mb-4">
                <span className="px-2.5 py-0.5 rounded bg-surface-elevated border border-border text-zinc-300">
                  {item.badge}
                </span>
                <span>{item.durationOrReadTime}</span>
              </div>

              <h2 className="text-xl font-light text-foreground group-hover:text-white transition-colors leading-snug">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded"
                >
                  {item.title}
                </a>
              </h2>

              <p className="mt-3 text-sm text-muted font-light leading-relaxed">
                {item.subtitle}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-border flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-500 uppercase">{item.type}</span>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-foreground hover:text-white"
              >
                <span>Read Full Guide</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

