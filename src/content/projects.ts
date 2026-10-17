import { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'persogithub',
    index: '01',
    category: 'Fullstack & Systems',
    title: 'PersoGitHub',
    accentWord: 'Architecture',
    blurb: 'Full-stack version control and team collaboration hub implementing real-time websocket synchronization, S3 object storage, and a custom CLI workflow.',
    liveUrl: 'https://github.com/Ankush-25/PersonalGit',
    githubUrl: 'https://github.com/Ankush-25/PersonalGit',
    featured: true,
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'AWS S3', 'TypeScript'],
    problem: 'Standard web repositories often struggle with responsive, multi-client real-time synchronization and secure, low-latency artifact storage on self-hosted architectures.',
    role: 'Lead Architect & Fullstack Engineer. Designed the end-to-end data pipelines, real-time socket events, and simulated version control tree serialization.',
    outcome: {
      metric: 'Sub-150ms',
      description: 'Event distribution latency across synchronized client sessions.',
      disclaimer: 'Measured in local and staging network testing, not a high-load distributed multi-region benchmark.'
    },
    notes: {
      stack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'AWS S3', 'Socket.IO', 'JWT Auth'],
      honestStatus: 'Fully functional open-source codebase with tested core Git simulation workflows.',
      architecturalDecisions: [
        'Separated large blob storage directly to AWS S3 using presigned URLs to prevent server memory bloat.',
        'Employed Socket.IO rooms for team-level push notifications and instant collaborative commit logs.',
        'Structured modular JWT verification middleware with granular role-based permissions.'
      ],
      keyChallengesSolved: [
        'Preventing race conditions when multiple simulated commit histories are pushed concurrently.',
        'Efficiently indexing file blobs in MongoDB metadata collections while streaming payload assets to S3.'
      ]
    }
  },
  {
    slug: 'stock-prediction',
    index: '02',
    category: 'Machine Learning & AI',
    title: 'Stock Market Forecasting Engine',
    accentWord: 'Intelligence',
    blurb: 'Deep learning time-series predictive modeling using LSTM recurrent neural networks, real-time financial API ingestion, and interactive performance visualizers.',
    liveUrl: 'https://github.com/Ankush-25/Stock-Market-prediction-Model-',
    githubUrl: 'https://github.com/Ankush-25/Stock-Market-prediction-Model-',
    featured: true,
    tags: ['Python', 'TensorFlow', 'LSTM', 'Pandas', 'Matplotlib', 'Yahoo Finance API'],
    problem: 'Financial price series suffer from non-linear volatility, noisy short-term patterns, and sudden regime changes that simple moving averages fail to model accurately.',
    role: 'ML Engineer. Cleaned and normalized historical time series, engineered sequential feature windows, and tuned multi-layer LSTM cell parameters.',
    outcome: {
      metric: '92% R² Score',
      description: 'Model directional fit on historical test partitions across selected equity indices.',
      disclaimer: 'Validation set backtest metric; past market behavior does not guarantee live forward financial performance.'
    },
    notes: {
      stack: ['Python 3.10', 'TensorFlow / Keras', 'Pandas', 'NumPy', 'Matplotlib', 'yfinance'],
      honestStatus: 'Completed empirical research model with documented notebooks and exportable weight checkpoints.',
      architecturalDecisions: [
        'Standardized 60-day rolling lookback windows to capture quarterly financial cycles without vanishing gradients.',
        'Integrated Dropout regularization layers (0.2) between LSTM units to prevent overfitting on training partitions.',
        'Comparative benchmarking comparing pure Linear Regression against 2-tier LSTM architectures.'
      ],
      keyChallengesSolved: [
        'Mitigating data leakage across rolling train/test temporal boundaries.',
        'Normalizing fluctuating high-low price spans while preserving structural return variances.'
      ]
    }
  },
  {
    slug: 'hiringstore',
    index: '03',
    category: 'Web Engineering',
    title: 'Hiringstore Enterprise Portal',
    accentWord: 'Ecosystem',
    blurb: 'Full-cycle candidate tracking system and hiring platform featuring role-segregated company dashboards, structured pipelines, and dynamic job listing indexing.',
    liveUrl: 'https://github.com/Ankush-25/Hiringstore',
    githubUrl: 'https://github.com/Ankush-25/Hiringstore',
    featured: true,
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'Tailwind CSS'],
    problem: 'SME recruiters need lightweight, transparent applicant tracking without the clunky overhead and high licensing costs of enterprise ATS software.',
    role: 'Fullstack Developer. Built the REST API backend, state management logic, applicant submission flows, and dashboard interfaces.',
    outcome: {
      metric: 'Zero-friction',
      description: 'Multi-role authentication flow with candidate application tracking from draft to interview stages.',
      disclaimer: 'Prototype deployment benchmarked on synthetic recruiting test batches.'
    },
    notes: {
      stack: ['React', 'Node.js', 'Express', 'MongoDB Atlas', 'JWT', 'Tailwind CSS'],
      honestStatus: 'Active open-source repository featuring fully implemented employer and candidate dashboards.',
      architecturalDecisions: [
        'Implemented strict schema validation with Mongoose to enforce consistent candidate resume metadata.',
        'Designed decoupled REST endpoints allowing future plug-and-play integrations with external calendar providers.',
        'Client-side optimistic UI updates for instant status toggling during candidate pipeline transitions.'
      ],
      keyChallengesSolved: [
        'Strict role-based authorization isolating sensitive candidate evaluation notes from public applicant views.',
        'Efficient compound queries for multi-parameter vacancy filtering (location, tech stack, salary brackets).'
      ]
    }
  },
  {
    slug: 'ai-voice-assistant',
    index: '04',
    category: 'Machine Learning & AI',
    title: 'Voice Automation & Intelligence Hub',
    accentWord: 'Automation',
    blurb: 'Hands-free voice assistant combining speech recognition pipelines with the Gemini API to execute system commands, answer queries, and automate repetitive tasks.',
    githubUrl: 'https://github.com/Ankush-25',
    featured: false,
    tags: ['Python', 'Gemini API', 'SpeechRecognition', 'Node.js'],
    problem: 'Desktop task management and fast query execution often force manual context switching away from active programming windows.',
    role: 'Sole Developer. Connected speech-to-text recognition with generative LLM inference and local OS task automation hooks.',
    outcome: {
      metric: '<1.2s',
      description: 'Average acoustic transcription to generative response trigger cycle.',
      disclaimer: 'Dependent on stable network bandwidth and Gemini API endpoint response latency.'
    },
    notes: {
      stack: ['Python', 'Gemini API', 'SpeechRecognition', 'gTTS', 'PyAudio'],
      honestStatus: 'Functional desktop utility configured for developer desktop automation.',
      architecturalDecisions: [
        'Local keyword detection prior to dispatching cloud inference calls to conserve API token allocations.',
        'Fallback text mode for noisy environments or offline command execution.'
      ],
      keyChallengesSolved: [
        'Ambient noise suppression and handling ambiguous verbal instructions gracefully.'
      ]
    }
  },
  {
    slug: 'terminal-systems-games',
    index: '05',
    category: 'Fullstack & Systems',
    title: 'Algorithmic Terminal Engines',
    accentWord: 'Foundations',
    blurb: 'CLI-based interactive logic applications built in Python to explore state machine patterns, probability modeling, and deterministic game theory.',
    githubUrl: 'https://github.com/Ankush-25/Snake-Water-Game-using-Python-',
    featured: false,
    tags: ['Python', 'CLI', 'State Machines', 'Algorithms'],
    problem: 'Core algorithmic concepts like state transitions and input validation are best mastered through resilient, standalone terminal implementations.',
    role: 'Developer. Built turn-based loop architectures, randomized seed controls, and formatted terminal outputs.',
    outcome: {
      metric: '100% Deterministic',
      description: 'Zero external runtime dependencies; purely native standard library execution.',
      disclaimer: 'Educational systems project demonstrating clean algorithmic logic.'
    },
    notes: {
      stack: ['Python 3 Native', 'CLI APIs'],
      honestStatus: 'Open-source on GitHub, completed educational codebase.',
      architecturalDecisions: [
        'Strict separation between game loop state controllers and terminal presentation formatters.'
      ],
      keyChallengesSolved: [
        'Robust edge-case sanitation for erroneous keyboard inputs.'
      ]
    }
  }
];

