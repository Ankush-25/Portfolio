import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DisciplineSelector } from '@/components/home/DisciplineSelector';
import { MotionProvider } from '@/context/MotionContext';

describe('DisciplineSelector Component (C4)', () => {
  const renderSelector = () => {
    return render(
      <MotionProvider>
        <DisciplineSelector />
      </MotionProvider>
    );
  };

  it('renders tablist with 3 discipline tabs and proper ARIA roles', () => {
    renderSelector();
    const tablist = screen.getByRole('tablist', { name: /engineering disciplines/i });
    expect(tablist).toBeInTheDocument();

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
  });

  it('switches active panel when a tab is clicked and stops auto-rotation', () => {
    renderSelector();
    const engineerTab = screen.getByTestId('discipline-tab-engineer');

    fireEvent.click(engineerTab);
    expect(engineerTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText(/Modeling Time-Series and Algorithmic Logic/i)).toBeInTheDocument();
    expect(screen.getByText(/MANUAL SELECTION/i)).toBeInTheDocument();
  });

  it('navigates between tabs using arrow keys', () => {
    renderSelector();
    const buildTab = screen.getByTestId('discipline-tab-build');

    fireEvent.keyDown(buildTab, { key: 'ArrowRight' });
    const engineerTab = screen.getByTestId('discipline-tab-engineer');
    expect(engineerTab).toHaveAttribute('aria-selected', 'true');
  });
});

