'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useMotion } from '@/context/MotionContext';
import { statsStripData } from '@/content/stats';
import { ArrowRight } from 'lucide-react';

export const StatsStrip: React.FC = () => {
  const { isMotionEnabled } = useMotion();
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    throughput: 0,
    speed: 0,
    accuracy: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMotionEnabled) {
      setCounts({
        throughput: statsStripData[0].numericTarget,
        speed: statsStripData[1].numericTarget,
        accuracy: statsStripData[2].numericTarget,
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1600; // ms
          const startTime = performance.now();

          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounts({
              throughput: Math.floor(easeOut * statsStripData[0].numericTarget),
              speed: Math.floor(easeOut * statsStripData[1].numericTarget),
              accuracy: Math.floor(easeOut * statsStripData[2].numericTarget),
            });

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCounts({
                throughput: statsStripData[0].numericTarget,
                speed: statsStripData[1].numericTarget,
                accuracy: statsStripData[2].numericTarget,
              });
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isMotionEnabled, hasAnimated]);

  const handleScrollToImpact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const impactEl = document.getElementById('impact');
    if (impactEl) {
      impactEl.scrollIntoView({ behavior: 'smooth' });
      impactEl.focus();
      window.history.pushState(null, '', '#impact');
    }
  };

  return (
    <section
      ref={containerRef}
      aria-label="Verified Performance Metrics"
      className="py-16 border-b border-border bg-surface/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {statsStripData.map((stat) => {
            const currentVal = !isMotionEnabled || hasAnimated
              ? counts[stat.id]
              : 0;

            return (
              <div
                key={stat.id}
                className="flex flex-col justify-between p-6 rounded-2xl border border-border bg-surface"
              >
                <div>
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-light font-sans tracking-tight text-foreground flex items-baseline">
                    <span aria-hidden="true">
                      {currentVal}
                      {stat.suffix}
                    </span>
                    <span className="sr-only">
                      {stat.value} {stat.label}
                    </span>
                  </div>
                  <h3 className="mt-3 text-sm font-mono uppercase tracking-wider text-foreground">
                    {stat.label}
                  </h3>
                  <p className="mt-2 text-xs text-muted leading-relaxed font-light">
                    {stat.sourceOrContext}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60">
                  <span className="text-[11px] text-zinc-500 italic block">
                    * {stat.qualifier}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Link to #impact */}
        <div className="mt-8 flex justify-end">
          <a
            href="#impact"
            data-testid="stats-impact-link"
            onClick={handleScrollToImpact}
            className="group inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-muted hover:text-foreground transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            <span>The work. The real-world impact.</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

