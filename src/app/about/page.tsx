import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteMeta } from '@/content/meta';
import { storyMilestones } from '@/content/timeline';
import { disciplines } from '@/content/disciplines';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ArrowLeft, ArrowUpRight, Award, GraduationCap, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About & Capabilities',
  description: `Background, education, engineering capabilities, and certifications of ${siteMeta.name}.`,
};

export default function AboutPage() {
  const certifications = [
    { title: 'Geo Data Analysis & Remote Sensing', issuer: 'Indian Space Research Organisation (ISRO)', year: '2023' },
    { title: 'C Systems & Computational Programming', issuer: 'Great Learning', year: '2023' },
    { title: 'National Cadet Corps (NCC) "C" Certificate', issuer: 'Ministry of Defence', year: '2022' },
    { title: 'National Level Science Competition', issuer: 'Participant & Finalist', year: '2021' },
  ];

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

      {/* Main Heading */}
      <h1 className="text-4xl sm:text-6xl font-light text-foreground tracking-tight mb-8">
        About <span className="font-serif italic font-normal text-white">{siteMeta.name}</span>
      </h1>

      {/* Narrative Section */}
      <div className="prose prose-invert max-w-none text-muted font-light space-y-6 text-lg leading-relaxed border-b border-border pb-16">
        <p className="text-xl sm:text-2xl text-foreground font-light leading-snug">
          I am a Software Engineer based in Dehradun, India, specializing in building resilient fullstack web systems and exploring machine learning applications.
        </p>
        <p>
          My engineering journey bridges formal computer science training (Master of Computer Applications at Shri Guru Ram Rai University) with hands-on production engineering in fast-paced teams. During my front-end internship at Vigyapanam, I developed dynamic task scheduling modules that improved team throughput by 30% and cut landing page load latency by 40% across client campaigns.
        </p>
        <p>
          I am driven by clean code principles, measurable runtime performance, and genuine transparency. Every system I build—from real-time Git simulators with Socket.IO to multi-layer LSTM neural networks—is constructed with disciplined architecture and verified benchmarks.
        </p>
      </div>

      {/* Capabilities Section with id="capabilities" */}
      <section id="capabilities" tabIndex={-1} className="py-16 border-b border-border">
        <SectionHeader
          eyebrow="CAPABILITIES & STACK"
          title="Technical Competencies & Systems Tooling"
          accentWord="Competencies"
          description="Granular domain proficiency across frontend, backend, data intelligence, and infrastructure."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {disciplines.map((d) => (
            <div key={d.id} className="p-8 rounded-2xl border border-border bg-surface flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-muted tracking-widest block mb-2">
                  {d.label}
                </span>
                <h3 className="text-xl font-light text-foreground mb-4">{d.heading}</h3>
                <p className="text-xs text-muted leading-relaxed mb-6">{d.blurb}</p>
              </div>

              <div>
                <span className="text-xs font-mono text-zinc-500 block mb-2 uppercase">Verified Skills</span>
                <div className="flex flex-wrap gap-1.5">
                  {d.skills.map((s) => (
                    <span key={s} className="text-xs font-mono px-2 py-1 rounded bg-surface-elevated text-zinc-300 border border-border">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-16 border-b border-border">
        <SectionHeader
          eyebrow="EDUCATION & CREDENTIALS"
          title="Academic Degrees & Official Certifications"
          accentWord="Degrees"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Degrees */}
          <div className="p-8 rounded-2xl border border-border bg-surface">
            <div className="flex items-center space-x-3 text-foreground mb-6">
              <GraduationCap className="w-5 h-5" />
              <h3 className="text-lg font-medium">Academic Degrees</h3>
            </div>
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-muted">2023 – 2025</span>
                <h4 className="text-base text-foreground font-light">Master of Computer Applications (MCA)</h4>
                <p className="text-xs text-muted mt-1">Shri Guru Ram Rai University, Dehradun</p>
                <p className="text-xs text-zinc-500 mt-1">Data Structures, Operating Systems, Relational DBs, Computer Architecture</p>
              </div>
              <div className="pt-4 border-t border-border">
                <span className="text-xs font-mono text-muted">2020 – 2023</span>
                <h4 className="text-base text-foreground font-light">Bachelor of Science (B.Sc.) in Applied Sciences</h4>
                <p className="text-xs text-muted mt-1">Hemavati Nandan Bahuguna Garhwal University</p>
                <p className="text-xs text-zinc-500 mt-1">Mathematics, Physics, Chemistry, Biology</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="p-8 rounded-2xl border border-border bg-surface">
            <div className="flex items-center space-x-3 text-foreground mb-6">
              <Award className="w-5 h-5" />
              <h3 className="text-lg font-medium">Specialized Certifications</h3>
            </div>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div key={cert.title} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm text-foreground font-light">{cert.title}</h4>
                    <span className="text-xs font-mono text-muted">{cert.issuer} ({cert.year})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="mt-16 text-center">
        <Link
          href="/#contact"
          className="inline-flex items-center space-x-2 bg-foreground text-background font-mono text-xs uppercase tracking-widest px-8 py-4 rounded-full font-semibold hover:bg-white transition-all shadow-md"
        >
          <span>Start a conversation</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

