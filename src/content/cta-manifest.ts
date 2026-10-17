import { CtaEntry } from './types';

export const ctaManifest: CtaEntry[] = [
  {
    id: 'skip-to-content',
    label: 'Skip to content',
    selector: '[data-testid="skip-link"]',
    target: '#main',
    type: 'anchor',
    expectedUrlOrHash: '#main',
    description: 'First focusable element; skips navigation landmarks and moves focus to #main'
  },
  {
    id: 'nav-logo',
    label: 'Ankit Bhandari (Logo)',
    selector: '[data-testid="nav-logo"]',
    target: '#top',
    type: 'anchor',
    expectedUrlOrHash: '#top',
    description: 'Header logo link scrolling smoothly back to #top'
  },
  {
    id: 'nav-work',
    label: 'Work',
    selector: '[data-testid="nav-link-work"]',
    target: '#work',
    type: 'anchor',
    expectedUrlOrHash: '#work',
    description: 'Header navigation link scrolling smoothly to Selected Work section'
  },
  {
    id: 'nav-about',
    label: 'About',
    selector: '[data-testid="nav-link-about"]',
    target: '#about',
    type: 'anchor',
    expectedUrlOrHash: '#about',
    description: 'Header navigation link scrolling smoothly to About section'
  },
  {
    id: 'nav-content',
    label: 'Content',
    selector: '[data-testid="nav-link-content"]',
    target: '#content',
    type: 'anchor',
    expectedUrlOrHash: '#content',
    description: 'Header navigation link scrolling smoothly to Content Hub section'
  },
  {
    id: 'nav-speaking',
    label: 'Speaking',
    selector: '[data-testid="nav-link-speaking"]',
    target: '#speaking',
    type: 'anchor',
    expectedUrlOrHash: '#speaking',
    description: 'Header navigation link scrolling smoothly to Speaking section'
  },
  {
    id: 'nav-lets-talk',
    label: "Let's talk",
    selector: '[data-testid="nav-cta-contact"]',
    target: '#contact',
    type: 'anchor',
    expectedUrlOrHash: '#contact',
    description: 'Primary header call-to-action button scrolling to contact section'
  },
  {
    id: 'hero-explore-work',
    label: 'Explore my work',
    selector: '[data-testid="hero-cta-work"]',
    target: '#work',
    type: 'anchor',
    expectedUrlOrHash: '#work',
    description: 'Hero primary CTA button linking directly to #work anchor'
  },
  {
    id: 'hero-start-conversation',
    label: 'Start a conversation',
    selector: '[data-testid="hero-cta-contact"]',
    target: '#contact',
    type: 'anchor',
    expectedUrlOrHash: '#contact',
    description: 'Hero secondary CTA linking directly to #contact anchor'
  },
  {
    id: 'hero-scroll-hint',
    label: 'Scroll to discover',
    selector: '[data-testid="hero-scroll-hint"]',
    target: '#about',
    type: 'anchor',
    expectedUrlOrHash: '#about',
    description: 'Hero bottom scroll hint anchor navigating to #about'
  },
  {
    id: 'stats-strip-cta',
    label: 'The work. The real-world impact.',
    selector: '[data-testid="stats-impact-link"]',
    target: '#impact',
    type: 'anchor',
    expectedUrlOrHash: '#impact',
    description: 'Stats strip footer anchor scrolling down to #impact section'
  },
  {
    id: 'about-read-story',
    label: 'Read my story',
    selector: '[data-testid="about-read-story-btn"]',
    target: '/about',
    type: 'internal-route',
    expectedUrlOrHash: '/about',
    description: 'About intro button navigating to the full /about dedicated page'
  },
  {
    id: 'selected-work-explore-all',
    label: 'Explore all work',
    selector: '[data-testid="work-explore-all-btn"]',
    target: '/work',
    type: 'internal-route',
    expectedUrlOrHash: '/work',
    description: 'Selected work section footer CTA navigating to the /work archive catalog'
  },
  {
    id: 'how-i-work-capabilities',
    label: 'Background & capabilities',
    selector: '[data-testid="how-i-work-capabilities-btn"]',
    target: '/about#capabilities',
    type: 'internal-route',
    expectedUrlOrHash: '/about#capabilities',
    description: 'How I Work section CTA navigating directly to capabilities on the about page'
  },
  {
    id: 'impact-education-cta',
    label: 'View academic & training foundation',
    selector: '[data-testid="impact-education-btn"]',
    target: '/education',
    type: 'internal-route',
    expectedUrlOrHash: '/education',
    description: 'Impact section CTA navigating to the dedicated /education route'
  },
  {
    id: 'story-proof-link',
    label: 'Verified GitHub Organization & Commits',
    selector: '[data-testid="story-proof-link"]',
    target: 'https://github.com/Ankush-25',
    type: 'external-newtab',
    expectedUrlOrHash: 'https://github.com/Ankush-25',
    description: 'External verification link opening in a new tab with rel="noopener noreferrer"'
  },
  {
    id: 'speaking-invite-cta',
    label: 'Invite for a Technical Session',
    selector: '[data-testid="speaking-invite-btn"]',
    target: 'https://www.linkedin.com/in/ankit-bhandari25/',
    type: 'external-newtab',
    expectedUrlOrHash: 'https://www.linkedin.com/in/ankit-bhandari25/',
    description: 'Speaking CTA opening LinkedIn inquiry in new tab'
  },
  {
    id: 'contact-lets-connect',
    label: "Let's connect",
    selector: '[data-testid="contact-primary-btn"]',
    target: 'mailto:ankitbhandari1298@gmail.com',
    type: 'external-newtab',
    expectedUrlOrHash: 'mailto:ankitbhandari1298@gmail.com',
    description: 'Contact section primary email button triggering email client'
  },
  {
    id: 'footer-back-to-top',
    label: 'Back to top',
    selector: '[data-testid="footer-back-to-top"]',
    target: '#top',
    type: 'anchor',
    expectedUrlOrHash: '#top',
    description: 'Footer back-to-top button scrolling the document to the very top'
  }
];

