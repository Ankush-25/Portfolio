import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/content/projects';
import { siteMeta } from '@/content/meta';
import { ArrowLeft, ArrowUpRight, ArrowRight, Github, CheckCircle2 } from 'lucide-react';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} — Engineering Case Study`,
    description: project.blurb,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <article className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Return Links */}
      <div className="mb-8 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-muted">
        <Link
          href="/work"
          className="inline-flex items-center space-x-2 hover:text-foreground transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Work</span>
        </Link>
        <span>{project.index} / 0{projects.length}</span>
      </div>

      {/* Header */}
      <div className="border-b border-border pb-12">
        <div className="flex items-center space-x-3 text-xs font-mono text-muted uppercase tracking-wider mb-4">
          <span className="px-3 py-1 rounded-full border border-border bg-surface text-zinc-300">
            {project.category}
          </span>
          <span>Status: {project.notes.honestStatus}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-light text-foreground tracking-tight leading-tight">
          {project.title}{' '}
          <span className="font-serif italic font-normal text-white">
            {project.accentWord}
          </span>
        </h1>

        <p className="mt-6 text-xl text-muted font-light leading-relaxed max-w-3xl">
          {project.blurb}
        </p>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-4 mt-8">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-foreground text-background font-mono text-xs uppercase tracking-widest px-6 py-3.5 rounded-full font-semibold hover:bg-white transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            >
              <Github className="w-4 h-4" />
              <span>Inspect Source Repository</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Key Meta Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-b border-border">
        <div>
          <span className="text-xs font-mono uppercase text-muted tracking-widest block mb-2">My Role</span>
          <p className="text-sm text-foreground font-light leading-relaxed">{project.role}</p>
        </div>

        <div>
          <span className="text-xs font-mono uppercase text-muted tracking-widest block mb-2">Technology Stack</span>
          <div className="flex flex-wrap gap-1.5">
            {project.notes.stack.map((t) => (
              <span key={t} className="text-xs font-mono px-2.5 py-1 rounded bg-surface border border-border text-zinc-300">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs font-mono uppercase text-muted tracking-widest block mb-2">Measured Outcome</span>
          <div className="p-4 rounded-xl border border-border bg-surface">
            <span className="text-lg font-mono font-medium text-foreground block">{project.outcome.metric}</span>
            <span className="text-xs text-muted block mt-1">{project.outcome.description}</span>
            <span className="text-[10px] text-zinc-500 italic block mt-2">* {project.outcome.disclaimer}</span>
          </div>
        </div>
      </div>

      {/* Problem & Approach */}
      <div className="py-12 border-b border-border space-y-12">
        <div>
          <h2 className="text-xs font-mono uppercase text-muted tracking-widest mb-3">01 / The Problem</h2>
          <p className="text-lg text-foreground font-light leading-relaxed max-w-3xl">
            {project.problem}
          </p>
        </div>

        <div>
          <h2 className="text-xs font-mono uppercase text-muted tracking-widest mb-4">02 / Architectural Decisions</h2>
          <ul className="space-y-4 max-w-3xl">
            {project.notes.architecturalDecisions.map((dec, i) => (
              <li key={i} className="flex items-start space-x-3 text-sm sm:text-base text-muted font-light leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <span>{dec}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-mono uppercase text-muted tracking-widest mb-4">03 / Challenges & Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.notes.keyChallengesSolved.map((chal, cIdx) => (
              <div key={cIdx} className="p-6 rounded-xl border border-border bg-surface">
                <span className="text-xs font-mono text-zinc-500 block mb-2">Challenge 0{cIdx + 1}</span>
                <p className="text-sm text-foreground font-light leading-relaxed">{chal}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Previous / Next Project Navigation */}
      <div className="pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono">
        {prevProject ? (
          <Link
            href={`/work/${prevProject.slug}`}
            className="flex items-center space-x-2 text-muted hover:text-foreground transition-colors p-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: {prevProject.title}</span>
          </Link>
        ) : (
          <span className="text-zinc-700">Beginning of catalog</span>
        )}

        {nextProject ? (
          <Link
            href={`/work/${nextProject.slug}`}
            className="flex items-center space-x-2 text-muted hover:text-foreground transition-colors p-2"
          >
            <span>Next: {nextProject.title}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <span className="text-zinc-700">End of catalog</span>
        )}
      </div>
    </article>
  );
}

