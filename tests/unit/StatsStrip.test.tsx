import React from 'react';
import { render, screen } from '@testing-library/react';
import { StatsStrip } from '@/components/home/StatsStrip';
import { MotionProvider } from '@/context/MotionContext';

describe('StatsStrip Component (C2)', () => {
  it('renders all honest stats with qualifiers', () => {
    localStorage.setItem('motion_preference', 'off');

    render(
      <MotionProvider>
        <StatsStrip />
      </MotionProvider>
    );

    expect(screen.getByText(/30% Scheduling Throughput Boost/i)).toBeInTheDocument();
    expect(screen.getByText(/40% Page Load Speed Optimization/i)).toBeInTheDocument();
    expect(screen.getByText(/92% LSTM Model Prediction Score/i)).toBeInTheDocument();

    const impactLink = screen.getByTestId('stats-impact-link');
    expect(impactLink).toHaveAttribute('href', '#impact');
  });
});

