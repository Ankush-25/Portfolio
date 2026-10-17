import { ContentMediaItem } from './types';

export const contentCategories = [
  { id: 'all', label: 'All Artifacts' },
  { id: 'systems', label: 'Fullstack & Systems' },
  { id: 'ml', label: 'Machine Learning' },
  { id: 'web', label: 'Web Performance' }
];

export const contentMediaItems: ContentMediaItem[] = [
  {
    id: 'persogit-deepdive',
    category: 'systems',
    type: 'deep-dive',
    title: 'Building a Full-Stack Git Clone with WebSockets and AWS S3',
    subtitle: 'An architectural breakdown of real-time multi-client commit synchronization and efficient blob storage.',
    url: 'https://github.com/Ankush-25/PersonalGit',
    badge: 'Architecture Guide',
    durationOrReadTime: '8 min read',
    external: true
  },
  {
    id: 'lstm-stock-forecasting',
    category: 'ml',
    type: 'article',
    title: 'Predicting Financial Time Series with Recurrent Neural Networks',
    subtitle: 'Implementing 2-tier LSTM cells, 60-day rolling lookbacks, and backtesting models with Yahoo Finance data.',
    url: 'https://github.com/Ankush-25/Stock-Market-prediction-Model-',
    badge: 'ML Research',
    durationOrReadTime: '10 min read',
    external: true
  },
  {
    id: 'hiringstore-portal',
    category: 'web',
    type: 'github',
    title: 'Designing Role-Segregated Dashboards in MERN Applications',
    subtitle: 'Structuring compound queries, state management, and JWT session handling for candidate pipelines.',
    url: 'https://github.com/Ankush-25/Hiringstore',
    badge: 'Code Walkthrough',
    durationOrReadTime: '6 min read',
    external: true
  },
  {
    id: 'web-performance-vitals',
    category: 'web',
    type: 'deep-dive',
    title: 'Reducing Page Load Times by 40%: Real-World Asset Tuning',
    subtitle: 'Actionable techniques for eliminating render-blocking waterfalls and optimizing Core Web Vitals.',
    url: 'https://www.linkedin.com/in/ankit-bhandari25/',
    badge: 'Performance Notes',
    durationOrReadTime: '5 min read',
    external: true
  },
  {
    id: 'isro-geodata-analysis',
    category: 'systems',
    type: 'article',
    title: 'Geospatial Data Processing & Satellite Telemetry Essentials',
    subtitle: 'Key takeaways from the Indian Space Research Organisation (ISRO) Geo Data Analysis program.',
    url: 'https://www.linkedin.com/in/ankit-bhandari25/',
    badge: 'ISRO Telemetry',
    durationOrReadTime: '7 min read',
    external: true
  },
  {
    id: 'voice-ai-agent',
    category: 'ml',
    type: 'github',
    title: 'Voice-Controlled Desktop Automation with Gemini API',
    subtitle: 'Integrating low-latency acoustic models with generative LLM inference for desktop operating workflows.',
    url: 'https://github.com/Ankush-25',
    badge: 'AI Automation',
    durationOrReadTime: '5 min read',
    external: true
  }
];

export const socialProfiles = [
  {
    platform: 'LinkedIn',
    handle: 'in/ankit-bhandari25',
    url: 'https://www.linkedin.com/in/ankit-bhandari25/',
    role: 'Professional updates, engineering essays, and team collaboration'
  },
  {
    platform: 'GitHub',
    handle: '@Ankush-25',
    url: 'https://github.com/Ankush-25',
    role: 'Production repositories, systems experiments, and active commit records'
  },
  {
    platform: 'LeetCode',
    handle: '@Ankush-25',
    url: 'https://leetcode.com/u/Ankush-25/',
    role: 'Continuous algorithmic problem solving and data structure practice'
  },
  {
    platform: 'X (Twitter)',
    handle: '@bhandariji1298',
    url: 'https://x.com/bhandariji1298/',
    role: 'Short-form engineering observations and software developments'
  }
];

