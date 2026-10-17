import React from 'react';

interface SectionHeaderProps {
  eyebrow: string; // e.g. "01 / ABOUT"
  title: string;   // e.g. "From Algorithmic Foundations"
  accentWord?: string; // e.g. "Foundations"
  description?: string;
  className?: string;
  align?: 'left' | 'center';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  accentWord,
  description,
  className = '',
  align = 'left',
}) => {
  const renderTitle = () => {
    if (!accentWord || !title.includes(accentWord)) {
      return title;
    }
    const parts = title.split(accentWord);
    return (
      <>
        {parts[0]}
        <span className="font-serif italic font-normal text-white">
          {accentWord}
        </span>
        {parts.slice(1).join(accentWord)}
      </>
    );
  };

  return (
    <div
      className={`mb-12 ${
        align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-4xl'
      } ${className}`}
    >
      <div className="text-xs uppercase tracking-widest text-muted font-mono font-medium mb-3">
        {eyebrow}
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-foreground tracking-tight leading-tight">
        {renderTitle()}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-muted font-light leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
};

