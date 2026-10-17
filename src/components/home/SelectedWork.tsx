'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { projects } from '@/content/projects';
import { SectionHeader } from '@/components/common/SectionHeader';
import { MotionReveal } from '@/components/common/MotionReveal';
import { TiltCard3D } from '@/components/common/TiltCard3D';
import { SignalText } from '@/components/common/SignalText';
import { ArrowUpRight, ArrowRight, ChevronDown, Github } from 'lucide-react';

export const SelectedWork: React.FC = () => {
  const [expandedNotesSlug, setExpandedNotesSlug] = useState<string | null>(null);

  const toggleAccordion = (slug: string) => {
    setExpandedNotesSlug((prev) => (prev === slug ? null : slug));
  };

  const featuredProjects = projects.filter((p) => p.featured);
  const secondaryProjects = projects.filter((p) => !p.featured);

  return (
    <section id="work" tabIndex={-1} className="py-24 border-b border-border relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal>
          <SectionHeader
            eyebrow="03 / SELECTED WORK"
            title="Featured Projects & Systems Architecture"
            accentWord="Architecture"
            description="Production implementations, open-source repositories, and predictive machine learning models built for measurable utility."
          />
        </MotionReveal>

        {/* Featured Projects Grid (3 cards wrapped with 3D Tilt & Glare) */}
        <div className="grid grid-cols-1 gap-12 mt-12">
          {featuredProjects.map((project, idx) => {
            const isAccordionOpen = expandedNotesSlug === project.slug;

            return (
              <MotionReveal key={project.slug} delay={idx * 0.1}>
                <TiltCard3D
                  maxTilt={5}
                  glareOpacity={0.12}
                  className="rounded-3xl border border-border bg-surface/90 backdrop-blur-md p-8 sm:p-12 hover:border-muted/60 transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                    {/* Left Column: Metadata & Core Copy */}
                    <div className="max-w-2xl flex flex-col space-y-4">
                      <div className="flex items-center space-x-4 text-xs font-mono text-muted uppercase tracking-widest">
                        <span>{project.index}</span>
                        <span>·</span>
                        <span className="text-zinc-400">
                          <SignalText text={project.category} />
                        </span>
                      </div>

                      <h3 className="text-3xl sm:text-4xl font-light text-foreground tracking-tight group-hover:text-white transition-colors">
                        <Link
                          href={`/work/${project.slug}`}
                          data-testid={`project-card-${project.slug}`}
                          className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded"
                        >
                          {project.title}
                        </Link>
                      </h3>

                      <p className="text-base sm:text-lg text-muted font-light leading-relaxed">
                        {project.blurb}
                      </p>

                      {/* Measured Outcome Box with Honest Qualifier */}
                      <div className="pt-2 pb-4">
                        <div className="inline-block p-4 rounded-xl border border-border bg-surface-elevated/70">
                          <div className="flex items-baseline space-x-2">
                            <span className="text-lg font-mono font-medium text-foreground">
                              {project.outcome.metric}
                            </span>
                            <span className="text-xs text-muted font-light">
                              — {project.outcome.description}
                            </span>
                          </div>
                          <p className="mt-1 text-[11px] text-zinc-500 italic">
                            * {project.outcome.disclaimer}
                          </p>
                        </div>
                      </div>

                      {/* Action Links & Chips */}
                      <div className="flex flex-wrap items-center gap-4 pt-2">
                        <Link
                          href={`/work/${project.slug}`}
                          className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-foreground hover:text-white transition-colors p-1"
                        >
                          <SignalText text="Explore the story" />
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid={`live-chip-${project.slug}`}
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-border bg-surface-elevated hover:border-muted text-xs font-mono text-muted hover:text-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>Code & Notes</span>
                            <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right Column: Stack Pills & Accordion Trigger */}
                    <div className="lg:w-80 flex flex-col justify-between pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-border lg:pl-8">
                      <div>
                        <span className="text-xs font-mono uppercase text-muted tracking-widest block mb-3">
                          Tech Stack
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {project.notes.stack.map((tech) => (
                            <span
                              key={tech}
                              className="text-[11px] font-mono px-2.5 py-1 rounded-md border border-border bg-surface-elevated text-zinc-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* C5b Accordion Button */}
                      <div className="mt-6 pt-4 border-t border-border">
                        <button
                          type="button"
                          aria-expanded={isAccordionOpen}
                          aria-controls={`accordion-notes-${project.slug}`}
                          onClick={() => toggleAccordion(project.slug)}
                          data-testid={`accordion-btn-${project.slug}`}
                          className="w-full flex items-center justify-between text-xs font-mono text-muted hover:text-foreground transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                        >
                          <SignalText text="Inside the project" />
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isAccordionOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {/* Accordion Content */}
                        {isAccordionOpen && (
                          <div
                            id={`accordion-notes-${project.slug}`}
                            className="mt-4 p-4 rounded-xl border border-border bg-surface-elevated text-xs font-mono text-muted space-y-3"
                          >
                            <div>
                              <span className="text-zinc-500 uppercase tracking-widest block text-[10px]">
                                Honest Status
                              </span>
                              <p className="text-foreground mt-0.5">{project.notes.honestStatus}</p>
                            </div>
                            <div>
                              <span className="text-zinc-500 uppercase tracking-widest block text-[10px]">
                                Key Architecture
                              </span>
                              <ul className="list-disc list-inside mt-1 space-y-1 text-zinc-400">
                                {project.notes.architecturalDecisions.map((decision, dIdx) => (
                                  <li key={dIdx}>{decision}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="pt-2 border-t border-border/60">
                              <Link
                                href={`/work/${project.slug}`}
                                className="text-white hover:underline flex items-center space-x-1"
                              >
                                <span>Read engineering notes</span>
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TiltCard3D>
              </MotionReveal>
            );
          })}
        </div>

        {/* Secondary Projects Section */}
        <div className="mt-16 pt-12 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8">
            <h4 className="text-xl font-light text-foreground tracking-tight">
              More Ways I <span className="font-serif italic font-normal text-white">Build</span>
            </h4>
            <span className="text-xs font-mono text-muted">Additional systems and prototypes</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {secondaryProjects.map((item) => (
              <TiltCard3D
                key={item.slug}
                maxTilt={4}
                className="p-6 rounded-2xl border border-border bg-surface/90 hover:border-muted/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-muted mb-2">
                    <span>{item.index}</span>
                    <span className="text-zinc-500">{item.category}</span>
                  </div>
                  <h5 className="text-lg font-light text-foreground">
                    <Link href={`/work/${item.slug}`} className="hover:underline">
                      {item.title}
                    </Link>
                  </h5>
                  <p className="text-xs text-muted font-light mt-2 leading-relaxed">
                    {item.blurb}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">{item.notes.stack.slice(0, 3).join(' · ')}</span>
                  <Link href={`/work/${item.slug}`} className="text-foreground hover:text-white flex items-center space-x-1">
                    <span>Notes</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </TiltCard3D>
            ))}
          </div>
        </div>

        {/* Explore All Work CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/work"
            data-testid="work-explore-all-btn"
            className="group inline-flex items-center space-x-2 bg-surface hover:bg-surface-elevated text-foreground border border-border hover:border-muted font-mono text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            <SignalText text="Explore all work" />
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* C5c Quick Links Row */}
        <div className="mt-16 pt-8 border-t border-border flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/work"
            className="px-4 py-2 rounded-full border border-border bg-surface text-xs font-mono text-muted hover:text-foreground hover:border-muted transition-colors"
          >
            All Work
          </Link>
          <Link
            href="/education"
            className="px-4 py-2 rounded-full border border-border bg-surface text-xs font-mono text-muted hover:text-foreground hover:border-muted transition-colors"
          >
            Academic Foundation & MCA
          </Link>
          <Link
            href="/content"
            className="px-4 py-2 rounded-full border border-border bg-surface text-xs font-mono text-muted hover:text-foreground hover:border-muted transition-colors"
          >
            Technical Articles & Repo Guides
          </Link>
          <Link
            href="/speaking"
            className="px-4 py-2 rounded-full border border-border bg-surface text-xs font-mono text-muted hover:text-foreground hover:border-muted transition-colors"
          >
            Technical Sessions & Seminars
          </Link>
        </div>
      </div>
    </section>
  );
};
