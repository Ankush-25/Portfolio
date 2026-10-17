'use client';

import React, { useState } from 'react';
import { siteMeta } from '@/content/meta';
import { SectionHeader } from '@/components/common/SectionHeader';
import { MotionReveal } from '@/components/common/MotionReveal';
import { ArrowUpRight, Mail, Linkedin, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', _gotcha: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData._gotcha) {
      // Honeypot triggered
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setFormStatus('submitting');
    // Simulated smooth submission
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '', _gotcha: '' });
    }, 800);
  };

  return (
    <section id="contact" tabIndex={-1} className="py-24 border-b border-border bg-surface/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionReveal>
          <SectionHeader
            eyebrow="10 / CONTACT & CONNECT"
            title="Start a Direct Conversation"
            accentWord="Conversation"
            description="Whether discussing a full-time software engineering role, a technical architecture collaboration, or exploring a new project, my inbox is open."
          />
        </MotionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
          {/* Direct Channels */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="p-8 rounded-2xl border border-border bg-surface flex flex-col space-y-4">
              <span className="text-xs font-mono uppercase text-muted tracking-widest">
                Primary Pathway
              </span>
              <h3 className="text-2xl font-light text-foreground tracking-tight">
                Direct Email or LinkedIn
              </h3>
              <p className="text-sm text-muted font-light leading-relaxed">
                Preferred communication for opportunities, interviews, and engineering discussions.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <a
                  href={`mailto:${siteMeta.email}`}
                  data-testid="contact-primary-btn"
                  className="inline-flex items-center justify-center space-x-2 bg-foreground text-background font-mono text-xs uppercase tracking-widest px-6 py-3.5 rounded-full font-semibold hover:bg-white transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                >
                  <Mail className="w-4 h-4" />
                  <span>Let's connect</span>
                </a>

                <a
                  href={siteMeta.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 border border-border hover:border-muted text-foreground font-mono text-xs uppercase tracking-widest px-6 py-3.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-surface text-xs font-mono text-muted space-y-2">
              <div className="flex justify-between">
                <span>Location:</span>
                <span className="text-foreground">{siteMeta.location}</span>
              </div>
              <div className="flex justify-between">
                <span>Timezone:</span>
                <span className="text-foreground">IST (UTC +5:30)</span>
              </div>
              <div className="flex justify-between">
                <span>Response Time:</span>
                <span className="text-emerald-400">&lt; 24 Hours</span>
              </div>
            </div>
          </div>

          {/* Minimal Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl border border-border bg-surface">
            <h3 className="text-xl font-light text-foreground tracking-tight mb-2">
              Send a Quick Message
            </h3>
            <p className="text-xs text-muted font-light mb-6">
              Alternatively, send a note directly through this form.
            </p>

            {formStatus === 'success' ? (
              <div
                role="status"
                aria-live="polite"
                className="p-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 flex items-start space-x-3 text-sm font-mono"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Message dispatched successfully!</h4>
                  <p className="text-xs text-emerald-400/80 mt-1">
                    Thank you. I will review your message and reply promptly.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Honeypot field for bot prevention */}
                <input
                  type="text"
                  name="_gotcha"
                  value={formData._gotcha}
                  onChange={(e) => setFormData({ ...formData, _gotcha: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {formStatus === 'error' && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 flex items-center space-x-2 text-xs font-mono"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono text-muted mb-2">
                      Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-surface-elevated text-foreground text-sm focus:border-foreground focus:ring-1 focus:ring-foreground focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono text-muted mb-2">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-surface-elevated text-foreground text-sm focus:border-foreground focus:ring-1 focus:ring-foreground focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono text-muted mb-2">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hello Ankit, let's discuss an engineering opportunity..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-surface-elevated text-foreground text-sm focus:border-foreground focus:ring-1 focus:ring-foreground focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="inline-flex items-center space-x-2 bg-foreground text-background font-mono text-xs uppercase tracking-widest px-6 py-3.5 rounded-full font-semibold hover:bg-white transition-all disabled:opacity-50"
                  >
                    <span>{formStatus === 'submitting' ? 'Sending...' : 'Send Message'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

