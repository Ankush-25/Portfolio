'use client';

import React from 'react';
import Link from 'next/link';
import { siteMeta } from '@/content/meta';
import { ArrowUp, Github, Linkedin, Twitter, Code2, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const topElement = document.getElementById('top');
    if (topElement) {
      topElement.focus();
    }
  };

  const socials = [
    {
      name: 'GitHub',
      href: siteMeta.socials.github,
      icon: <Github className="w-4 h-4" />,
    },
    {
      name: 'LinkedIn',
      href: siteMeta.socials.linkedin,
      icon: <Linkedin className="w-4 h-4" />,
    },
    {
      name: 'X',
      href: siteMeta.socials.x,
      icon: <Twitter className="w-4 h-4" />,
    },
    {
      name: 'LeetCode',
      href: siteMeta.socials.leetcode,
      icon: <Code2 className="w-4 h-4" />,
    },
    {
      name: 'Email',
      href: `mailto:${siteMeta.email}`,
      icon: <Mail className="w-4 h-4" />,
    },
  ];

  return (
    <footer
      role="contentinfo"
      className="border-t border-border bg-surface text-muted pt-16 pb-12 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-border">
          {/* Brand & Editorial Statement */}
          <div className="max-w-md">
            <span className="text-xl font-light text-foreground tracking-tight block">
              {siteMeta.name}
            </span>
            <p className="mt-2 text-sm text-muted font-light leading-relaxed">
              Fullstack Software Engineer specializing in MERN architectures, distributed performance, and machine learning models.
            </p>
          </div>

          {/* Social Links Row */}
          <div className="flex flex-wrap items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="flex items-center space-x-2 px-3 py-2 rounded-full border border-border hover:border-muted text-muted hover:text-foreground text-xs font-mono uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
              >
                {social.icon}
                <span>{social.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted">
          <p>© {new Date().getFullYear()} {siteMeta.name}. Built with Next.js & TypeScript.</p>

          <a
            href="#top"
            data-testid="footer-back-to-top"
            onClick={scrollToTop}
            className="group flex items-center space-x-2 text-muted hover:text-foreground transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </footer>
  );
};

