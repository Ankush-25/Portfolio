export type DisciplineId = 'build' | 'engineer' | 'scale';

export interface HonestStat {
  id: string;
  value: string;
  numericTarget: number;
  suffix?: string;
  label: string;
  qualifier: string; // Mandatory honesty qualifier
  sourceOrContext: string;
}

export interface ProjectEngineeringNote {
  stack: string[];
  honestStatus: string;
  architecturalDecisions: string[];
  keyChallengesSolved: string[];
}

export interface Project {
  slug: string;
  index: string;
  category: 'Fullstack & Systems' | 'Machine Learning & AI' | 'Web Engineering';
  title: string;
  accentWord: string;
  blurb: string;
  liveUrl?: string;
  githubUrl: string;
  featured: boolean;
  problem: string;
  role: string;
  outcome: {
    metric: string;
    description: string;
    disclaimer: string;
  };
  notes: ProjectEngineeringNote;
  tags: string[];
}

export interface Discipline {
  id: DisciplineId;
  label: string;
  heading: string;
  accentWord: string;
  blurb: string;
  ctaText: string;
  ctaHref: string;
  process: Array<{
    step: string;
    title: string;
    description: string;
  }>;
  skills: string[];
}

export interface StoryMilestone {
  year: string;
  title: string;
  organization: string;
  narrative: string;
  proofUrl?: string;
  proofLabel?: string;
}

export interface JourneyMilestone {
  period: string;
  label: string;
  heading: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface ContentMediaItem {
  id: string;
  category: 'all' | 'systems' | 'ml' | 'web';
  type: 'article' | 'deep-dive' | 'github' | 'talk';
  title: string;
  subtitle: string;
  url: string;
  badge: string;
  durationOrReadTime: string;
  external: boolean;
}

export interface SpeakingTalk {
  title: string;
  eventOrVenue: string;
  year: string;
  type: 'Technical Workshop' | 'Community Talk' | 'Academic Presentation';
  abstract: string;
  chips: string[];
  recordingUrl?: string;
}

export interface CtaEntry {
  id: string;
  label: string;
  selector: string;
  target: string;
  type: 'anchor' | 'internal-route' | 'external-newtab' | 'action';
  expectedUrlOrHash: string;
  description: string;
}

