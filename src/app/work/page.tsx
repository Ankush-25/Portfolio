import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { projects } from '@/content/projects';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ArrowLeft, ArrowUpRight, ArrowRight, Github } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Projects & Architecture Work',
  description: 'Complete project archive, systems architecture, and machine learning models.',
};

export default function WorkPage() {
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
        eyebrow="INDEX / ALL WORK"
        title="Engineering Archive & Systems Catalog"
        accentWord="Catalog"
        description="A full record of web applications, systems tools, time-series forecasting models, and open-source packages."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="p-8 rounded-2xl border border-border bg-surface hover:border-muted/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-muted mb-4">
                <span>{project.index}</span>
                <span className="px-2.5 py-0.5 rounded bg-surface-elevated border border-border text-zinc-300">
                  {project.category}
                </span>
              </div>

              <h2 className="text-2xl font-light text-foreground group-hover:text-white transition-colors">
                <Link href={`/work/${project.slug}`} className="hover:underline">
                  {project.title}
                </Link>
              </h2>

              <p className="mt-3 text-sm text-muted font-light leading-relaxed">
                {project.blurb}
              </p>

              {/* Outcome Metric Badge */}
              <div className="mt-4 p-3 rounded-xl border border-border bg-surface-elevated text-xs font-mono">
                <div className="text-foreground font-medium">{project.outcome.metric}</div>
                <div className="text-muted text-[11px] mt-0.5">{project.outcome.description}</div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-border flex items-center justify-between text-xs font-mono">
              <Link
                href={`/work/${project.slug}`}
                className="text-foreground hover:text-white inline-flex items-center space-x-1"
              >
                <span>Read notes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-foreground inline-flex items-center space-x-1"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

