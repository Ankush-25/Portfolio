import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SelectedWork } from '@/components/home/SelectedWork';
import { MotionProvider } from '@/context/MotionContext';

describe('SelectedWork Component (C5)', () => {
  const renderWork = () => {
    return render(
      <MotionProvider>
        <SelectedWork />
      </MotionProvider>
    );
  };

  it('renders featured projects with titles, metrics, and honest qualifiers', () => {
    renderWork();
    expect(screen.getByText('PersoGitHub')).toBeInTheDocument();
    expect(screen.getByText('Stock Market Forecasting Engine')).toBeInTheDocument();
    expect(screen.getByText('Hiringstore Enterprise Portal')).toBeInTheDocument();

    expect(screen.getByText(/Sub-150ms/i)).toBeInTheDocument();
    expect(screen.getByText(/92% R² Score/i)).toBeInTheDocument();
  });

  it('verifies live/source chips contain target="_blank" and rel with noopener', () => {
    renderWork();
    const liveChip = screen.getByTestId('live-chip-persogithub');
    expect(liveChip).toHaveAttribute('target', '_blank');
    expect(liveChip.getAttribute('rel')).toContain('noopener');
  });

  it('toggles engineering notes accordion and updates aria-expanded attribute', () => {
    renderWork();
    const accordionBtn = screen.getByTestId('accordion-btn-persogithub');
    expect(accordionBtn).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(accordionBtn);
    expect(accordionBtn).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/Honest Status/i)).toBeInTheDocument();
    expect(screen.getByText(/Fully functional open-source codebase/i)).toBeInTheDocument();

    fireEvent.click(accordionBtn);
    expect(accordionBtn).toHaveAttribute('aria-expanded', 'false');
  });

  it('has Explore All Work CTA linking to /work', () => {
    renderWork();
    const exploreAllBtn = screen.getByTestId('work-explore-all-btn');
    expect(exploreAllBtn).toHaveAttribute('href', '/work');
  });
});

