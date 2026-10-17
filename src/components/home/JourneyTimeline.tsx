import React from 'react';
import { journeyMilestones } from '@/content/timeline';
import { SectionHeader } from '@/components/common/SectionHeader';
import { MotionReveal } from '@/components/common/MotionReveal';
import { CheckCircle2, Clock, Sparkles } from 'lucide-react';

export const JourneyTimeline: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'current':
        return <Clock className="w-4 h-4 text-amber-400 animate-pulse" />;
      default:
        return <Sparkles className="w-4 h-4 text-zinc-500" />;
    }
  };

  return (
    <section aria-label="Engineering Horizon & Journey" className="py-24 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal>
          <SectionHeader
            eyebrow="09 / HORIZON & TRAJECTORY"
            title="The Four Milestones of Growth"
            accentWord="Growth"
            description="From scientific foundations and industry internships to advanced fullstack and machine learning specialization."
          />
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {journeyMilestones.map((m, idx) => (
            <MotionReveal
              key={m.period}
              delay={idx * 0.1}
              className={`p-6 rounded-2xl border bg-surface flex flex-col justify-between transition-all ${
                m.status === 'current'
                  ? 'border-foreground/40 ring-1 ring-foreground/20'
                  : 'border-border'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-muted mb-4">
                  <span className="font-semibold text-foreground">{m.period}</span>
                  <div className="flex items-center space-x-1.5">
                    {getStatusIcon(m.status)}
                    <span className="uppercase text-[10px] tracking-wider">{m.status}</span>
                  </div>
                </div>

                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block mb-1">
                  {m.label}
                </span>

                <h4 className="text-lg font-light text-foreground tracking-tight mb-3">
                  {m.heading}
                </h4>

                <p className="text-xs text-muted font-light leading-relaxed">
                  {m.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-border flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>Phase 0{idx + 1}</span>
                <span>{idx === 3 ? 'Target Goal' : 'Verified'}</span>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

