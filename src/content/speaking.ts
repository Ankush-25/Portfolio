import { SpeakingTalk } from './types';

export const speakingHero = {
  heading: 'Technical Sessions & Engineering Knowledge Exchange',
  accentWord: 'Speaking',
  blurb: 'Sharing pragmatic lessons on fullstack performance, asynchronous event architecture, and time-series machine learning with academic and developer communities.',
  ctaText: 'Invite for a Technical Session',
  ctaHref: 'https://www.linkedin.com/in/ankit-bhandari25/'
};

export const speakingTopics = [
  'Fullstack MERN Architecture',
  'Next.js 15 & React Server Components',
  'Real-Time WebSockets with Socket.IO',
  'Time-Series Forecasting with LSTM',
  'Web Performance & Core Web Vitals',
  'Git Internals & Object Storage on AWS'
];

export const speakingTalks: SpeakingTalk[] = [
  {
    title: 'Architecting Real-Time Collaboration with WebSockets & S3',
    eventOrVenue: 'Department Technical Forum, SGRR University',
    year: '2024',
    type: 'Technical Workshop',
    abstract: 'A deep-dive walkthrough covering how to build real-time event streaming systems with Socket.IO rooms, avoid state desynchronization, and securely stream large payloads to cloud object storage.',
    chips: ['WebSockets', 'AWS S3', 'MERN Stack', 'Architecture'],
    recordingUrl: 'https://github.com/Ankush-25/PersonalGit'
  },
  {
    title: 'Demystifying LSTM Networks for Financial Time-Series Forecasting',
    eventOrVenue: 'Faculty of Computer Applications Technical Seminar',
    year: '2024',
    type: 'Academic Presentation',
    abstract: 'Exploring recurrent neural networks, gradient behavior in temporal sequences, windowing data streams with Pandas, and practical evaluation metrics beyond standard regression.',
    chips: ['Deep Learning', 'TensorFlow', 'LSTM', 'Python'],
    recordingUrl: 'https://github.com/Ankush-25/Stock-Market-prediction-Model-'
  }
];

