'use client';

import React, { useState } from 'react';
import { contentCategories, contentMediaItems, socialProfiles } from '@/content/content-hub';
import { SectionHeader } from '@/components/common/SectionHeader';
import { MotionReveal } from '@/components/common/MotionReveal';
import { ArrowUpRight, BookOpen, ExternalLink } from 'lucide-react';

export const ContentHub: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredItems = activeCategory === 'all'
    ? contentMediaItems
    : contentMediaItems.filter((item) => item.category === activeCategory);

  return (
    <section id="content" tabIndex={-1} className="py-24 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal>
          <SectionHeader
            eyebrow="07 / KNOWLEDGE & ARTIFACTS"
            title="Technical Guides, Walkthroughs & Research"
            accentWord="Research"
            description="Deep dives into websocket architectures, recurrent neural network implementations, and critical rendering optimizations."
          />
        </MotionReveal>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mt-8 mb-12">
          {contentCategories.map((cat) => {
            const isPressed = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={isPressed}
                onClick={() => setActiveCategory(cat.id)}
                data-testid={`content-filter-${cat.id}`}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${
                  isPressed
                    ? 'bg-foreground text-background font-semibold shadow-md'
                    : 'border border-border bg-surface text-muted hover:text-foreground hover:border-muted'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <MotionReveal
              key={item.id}
              delay={idx * 0.05}
              className="p-6 rounded-2xl border border-border bg-surface hover:border-muted/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-muted mb-3">
                  <span className="px-2.5 py-1 rounded bg-surface-elevated border border-border text-zinc-300">
                    {item.badge}
                  </span>
                  <span>{item.durationOrReadTime}</span>
                </div>

                <h4 className="text-lg font-light text-foreground group-hover:text-white transition-colors leading-snug">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded"
                  >
                    {item.title}
                  </a>
                </h4>

                <p className="mt-2 text-xs text-muted font-light leading-relaxed">
                  {item.subtitle}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500 uppercase">{item.type}</span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-foreground hover:text-white"
                >
                  <span>Explore</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </MotionReveal>
          ))}
        </div>

        {/* Social Ecosystem Cards */}
        <div className="mt-16 pt-12 border-t border-border">
          <span className="text-xs font-mono uppercase text-muted tracking-widest block mb-6">
            Ecosystem Channels & Repositories
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {socialProfiles.map((channel) => (
              <a
                key={channel.platform}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-xl border border-border bg-surface hover:border-muted/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-muted mb-2">
                    <span className="text-foreground font-medium">{channel.platform}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <span className="text-xs font-mono text-zinc-400 block mb-2">{channel.handle}</span>
                  <p className="text-[11px] text-muted font-light leading-relaxed">{channel.role}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

