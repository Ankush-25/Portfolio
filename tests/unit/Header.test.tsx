import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '@/components/layout/Header';
import { MotionProvider } from '@/context/MotionContext';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Header Component (C0)', () => {
  const renderHeader = () => {
    return render(
      <MotionProvider>
        <Header />
      </MotionProvider>
    );
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('renders all primary navigation links and brand name', () => {
    renderHeader();
    expect(screen.getByTestId('nav-logo')).toHaveTextContent(/Ankit Bhandari/i);
    expect(screen.getByTestId('nav-link-work')).toHaveTextContent('Work');
    expect(screen.getByTestId('nav-link-about')).toHaveTextContent('About');
    expect(screen.getByTestId('nav-link-content')).toHaveTextContent('Content');
    expect(screen.getByTestId('nav-link-speaking')).toHaveTextContent('Speaking');
    expect(screen.getByTestId('nav-cta-contact')).toHaveTextContent("Let's talk");
  });

  it('toggles mobile menu drawer and updates aria-expanded', () => {
    renderHeader();
    const menuBtn = screen.getByTestId('mobile-menu-btn');
    expect(menuBtn).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(menuBtn);
    expect(menuBtn).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog', { name: /mobile navigation/i })).toBeInTheDocument();

    fireEvent.click(menuBtn);
    expect(menuBtn).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles motion state and persists preference to localStorage', () => {
    renderHeader();
    const motionBtn = screen.getByTestId('motion-toggle-btn');
    expect(motionBtn).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(motionBtn);
    expect(localStorage.getItem('motion_preference')).toBe('off');

    fireEvent.click(motionBtn);
    expect(localStorage.getItem('motion_preference')).toBe('on');
  });
});

