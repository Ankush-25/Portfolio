import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ArrowLeft, ArrowUpRight, GraduationCap, Award, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Education & Academic Curriculum',
  description: 'Formal computer science coursework, degree programs, and technical certifications.',
};

export default function EducationPage() {
  const mcaCoursework = [
    { title: 'Data Structures & Algorithms', focus: 'Tree traversals, graph algorithms, asymptotic space/time complexity analysis' },
    { title: 'Operating Systems & Concurrency', focus: 'Process scheduling, virtual memory paging, thread synchronization, deadlocks' },
    { title: 'Relational Database Management Systems', focus: 'Normalization forms (1NF-BCNF), ACID properties, query execution plans, indexing' },
    { title: 'Computer Architecture & Systems', focus: 'Instruction set architectures, CPU pipelining, cache memory hierarchies' },
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

      <SectionHeader
        eyebrow="ACADEMIC FOUNDATION"
        title="Theoretical Rigor & Computational Curriculum"
        accentWord="Curriculum"
        description="Formal computer science education bridging foundational algorithmics with distributed web systems and artificial intelligence."
      />

      {/* MCA Deep Dive */}
      <div className="p-8 sm:p-12 rounded-3xl border border-border bg-surface mt-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-border pb-6">
          <div>
            <span className="text-xs font-mono uppercase text-muted tracking-widest block mb-1">
              Graduate Degree (2023 – 2025)
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-foreground">
              Master of Computer Applications (MCA)
            </h2>
            <p className="text-sm text-muted font-light mt-1">
              Shri Guru Ram Rai University, Dehradun, Uttarakhand
            </p>
          </div>
          <div className="px-4 py-2 rounded-full border border-border bg-surface-elevated text-xs font-mono text-emerald-400 self-start sm:self-auto">
            Graduation: 2025
          </div>
        </div>

        <div className="mt-8">
          <span className="text-xs font-mono uppercase text-muted tracking-widest block mb-4">
            Core Curriculum & Technical Competencies
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mcaCoursework.map((course) => (
              <div key={course.title} className="p-5 rounded-xl border border-border bg-surface-elevated">
                <h3 className="text-sm font-medium text-foreground">{course.title}</h3>
                <p className="text-xs text-muted mt-2 font-light leading-relaxed">{course.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BSc Foundation */}
      <div className="p-8 rounded-2xl border border-border bg-surface mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase text-muted tracking-widest block mb-1">
            Undergraduate Degree (2020 – 2023)
          </span>
          <h3 className="text-xl font-light text-foreground">
            Bachelor of Science (B.Sc.) in Applied Sciences
          </h3>
          <p className="text-sm text-muted font-light mt-1">
            Hemavati Nandan Bahuguna Garhwal University (HNBGU)
          </p>
          <p className="text-xs text-zinc-500 mt-2 font-mono">
            Emphasis on Mathematics, Physics, and Statistical Methods
          </p>
        </div>
      </div>

      {/* ISRO Certification Feature */}
      <div className="p-8 rounded-2xl border border-border bg-surface mt-8">
        <div className="flex items-center space-x-3 text-foreground mb-4">
          <Award className="w-5 h-5 text-amber-400" />
          <h3 className="text-xl font-light">
            ISRO Satellite Telemetry & Geo-Data Analysis
          </h3>
        </div>
        <p className="text-sm text-muted font-light leading-relaxed max-w-3xl">
          Completed specialized program conducted by the Indian Space Research Organisation (ISRO), exploring satellite telemetry processing, multispectral spatial data normalization, and spatial analytics.
        </p>
      </div>
    </div>
  );
}

