import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md text-center">
        <span className="text-xs font-mono uppercase tracking-widest text-muted block mb-4">
          404 / NOT FOUND
        </span>
        <h1 className="text-4xl sm:text-5xl font-light text-foreground tracking-tight mb-4">
          Route Does Not <span className="font-serif italic font-normal text-white">Exist</span>
        </h1>
        <p className="text-sm text-muted font-light leading-relaxed mb-8">
          The requested resource or page could not be located on this portfolio domain.
        </p>
        <Link
          href="/"
          className="inline-flex items-center space-x-2 bg-foreground text-background font-mono text-xs uppercase tracking-widest px-6 py-3.5 rounded-full font-semibold hover:bg-white transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}

