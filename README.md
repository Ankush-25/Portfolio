# Ankit Bhandari — Fullstack Software Engineer Portfolio

An editorial, high-performance personal portfolio built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, engineered to strict accessibility, performance, and testing standards.

---

## 1. Architectural Highlights

- **Decoupled Content Architecture:** All copy, project notes, metrics, and timeline events live in strictly typed modules under `src/content/*.ts`. Zero hardcoded copy in visual components.
- **Motion Persistence & Reduced-Motion:** Global `MotionContext` with user toggle button in the header. Automatically falls back to `prefers-reduced-motion: reduce`. When motion is OFF:
  - Scroll reveals render statically without layout shifts.
  - Animated counters instantly show final computed values.
  - Auto-rotating tab carousels halt interval timers.
- **Accessibility (WCAG 2.1 AA):**
  - Skip-to-content link as the very first focusable DOM element focusing `#main`.
  - Semantic landmarks (`<header role="banner">`, `<main id="main">`, `<footer role="contentinfo">`).
  - Mobile drawer with keyboard focus trap, `aria-expanded`, and `Escape` key listeners.
  - High-visibility focus rings on all interactive elements.
- **Honesty Pattern:** Every performance stat and outcome claim features an explicit qualifier or source context (e.g. *validation partition backtests*, *measured internal scheduling throughput delta*).
- **Automated Parameterized CTA Runner:** Playwright dynamically iterates through `src/content/cta-manifest.ts` to test all interactive anchors, route transitions, and external links automatically.

---

## 2. Technical Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router, React 19) |
| **Language** | TypeScript (Strict mode enabled) |
| **Styling** | Tailwind CSS + Editorial Typography + Lucide Icons |
| **Motion** | Framer Motion (with zero-delay fallback when disabled) |
| **Unit Testing** | Vitest + React Testing Library + jsdom |
| **End-to-End** | Playwright (Mobile 375px & Desktop 1280px) |
| **Accessibility Audit** | `@axe-core/playwright` (0 critical/serious violations) |
| **Performance Budgets** | Lighthouse CI (`lighthouserc.json`) |
| **Continuous Integration** | GitHub Actions (`.github/workflows/ci.yml`) |
| **Deployment Target** | Vercel |

---

## 3. Directory Structure

```
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI quality pipeline
├── public/                    # Profile images and icons
├── src/
│   ├── app/
│   │   ├── about/page.tsx     # Dedicated /about route with #capabilities
│   │   ├── content/page.tsx   # Engineering guides & publications
│   │   ├── education/page.tsx # MCA coursework, BSc degrees, ISRO certificate
│   │   ├── speaking/page.tsx  # Speaking talks & booking CTA
│   │   ├── work/
│   │   │   ├── page.tsx       # Complete project archive
│   │   │   └── [slug]/page.tsx# Dynamic project case study routes
│   │   ├── globals.css        # Dark theme (#030303) & accessibility tokens
│   │   ├── layout.tsx         # Root layout, Header, Footer, Person schema
│   │   ├── not-found.tsx      # Accessible 404 page
│   │   ├── opengraph-image.tsx# Dynamic 1200x630 OG image generation
│   │   ├── page.tsx           # Single-page home with smooth anchor navigation
│   │   ├── robots.ts          # Robots.txt generator
│   │   └── sitemap.ts         # Sitemap.xml generator
│   ├── components/
│   │   ├── common/            # SkipLink, SectionHeader, MotionReveal
│   │   ├── home/              # Hero, StatsStrip, DisciplineSelector, etc.
│   │   └── layout/            # Header (C0), Footer (C13)
│   ├── content/
│   │   ├── cta-manifest.ts    # Single source of truth for CTAs & tests
│   │   ├── disciplines.ts     # Build / Engineer / Scale pillars
│   │   ├── meta.ts            # Site metadata, JSON-LD Person schema
│   │   ├── projects.ts        # Featured & secondary project case studies
│   │   ├── speaking.ts        # Talks, venues, and topic chips
│   │   ├── stats.ts           # Verified metrics & honest qualifiers
│   │   ├── timeline.ts        # Story narrative & 4-milestone trajectory
│   │   └── types.ts           # Strict TypeScript contracts
│   ├── context/
│   │   └── MotionContext.tsx  # Motion preference provider & hook
│   └── lib/
│       └── utils.ts           # Class merger utility (clsx + twMerge)
├── tests/
│   ├── e2e/
│   │   ├── a11y.spec.ts       # Axe accessibility automated scan
│   │   └── cta-manifest.spec.ts# Parameterized CTA test matrix
│   ├── unit/                  # Vitest unit test suite
│   └── setup.ts               # Testing Library setup & DOM mocks
├── lighthouserc.json          # Lighthouse CI budgets
├── playwright.config.ts       # Playwright configuration
├── tailwind.config.ts         # Tailwind configuration
└── vitest.config.ts           # Vitest configuration
```

---

## 4. Getting Started

### Prerequisites
- Node.js LTS (v20+)
- npm or pnpm

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 5. Verification & Testing

### 1. TypeScript Compilation
```bash
npm run typecheck
```

### 2. Unit Tests
```bash
npm run test:unit
```

### 3. Production Build
```bash
npm run build
```

### 4. End-to-End & Accessibility Tests
```bash
npm run test:e2e
```

### 5. Lighthouse CI Audit
```bash
npx @lhci/cli autorun
```

---

## 6. Vercel Deployment

1. Push this repository to GitHub.
2. Import the repository into your [Vercel Dashboard](https://vercel.com).
3. The framework preset will automatically detect **Next.js**.
4. Set the Root Directory to `./` and click **Deploy**.
