import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#030303',
        surface: '#0a0a0a',
        'surface-elevated': '#121212',
        border: '#1f1f1f',
        'border-subtle': '#2a2a2a',
        muted: '#8e8e93',
        foreground: '#f5f5f3',
        accent: {
          DEFAULT: '#e5e5e0',
          muted: '#a1a1aa'
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        wide: '0.08em',
        widest: '0.16em',
      }
    },
  },
  plugins: [],
};

export default config;

