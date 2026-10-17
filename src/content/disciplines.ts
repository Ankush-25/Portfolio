import { Discipline } from './types';

export const disciplines: Discipline[] = [
  {
    id: 'build',
    label: 'Fullstack Systems',
    heading: 'Engineering Resilient Fullstack Applications',
    accentWord: 'Architecture',
    blurb: 'Architecting end-to-end web platforms with modern React, Next.js, and Node.js. Translating intricate business requirements into accessible, type-safe, and high-throughput web applications.',
    ctaText: 'Explore the products',
    ctaHref: '/work',
    process: [
      {
        step: '01',
        title: 'System Decomposition & Domain Modeling',
        description: 'Mapping entities, state transitions, relational schemas (MongoDB/PostgreSQL), and REST/GraphQL interface boundaries before writing application code.'
      },
      {
        step: '02',
        title: 'Reactive UI & Type-Safe Contracts',
        description: 'Constructing component hierarchies in React and TypeScript with zero unnecessary re-renders, strict accessibility landmarks, and fluid responsive design.'
      },
      {
        step: '03',
        title: 'Security, Auth & State Integrity',
        description: 'Implementing JWT/OAuth security, session validation, role-based route guards, and real-time synchronization pipelines with Socket.IO.'
      }
    ],
    skills: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'TypeScript', 'MongoDB', 'PostgreSQL', 'Tailwind CSS']
  },
  {
    id: 'engineer',
    label: 'Data & Intelligence',
    heading: 'Modeling Time-Series and Algorithmic Logic',
    accentWord: 'Intelligence',
    blurb: 'Designing predictive neural models and computational algorithms with Python, TensorFlow, and C. Bridging the gap between raw data distributions and actionable programmatic decision engines.',
    ctaText: 'Explore the engineering',
    ctaHref: '/work',
    process: [
      {
        step: '01',
        title: 'Feature Extraction & Rolling Windows',
        description: 'Normalizing volatile financial and operational series with Pandas, filtering anomalies, and shaping sequential lookback matrices for LSTM input layers.'
      },
      {
        step: '02',
        title: 'Model Training & Regularization',
        description: 'Tuning recurrent neural network layers, implementing dropout barriers to avoid overfitting, and benchmarking against baseline statistical regressions.'
      },
      {
        step: '03',
        title: 'Inference APIs & Visual Analytics',
        description: 'Serving model weights through lean endpoints and rendering interactive visual confidence intervals for rapid stakeholder interpretation.'
      }
    ],
    skills: ['Python 3', 'TensorFlow / Keras', 'LSTM Networks', 'Pandas & NumPy', 'Matplotlib', 'C Language', 'ISRO Geo-Data Analysis']
  },
  {
    id: 'scale',
    label: 'Performance & Scale',
    heading: 'Optimizing Web Vitals and Deployment Delivery',
    accentWord: 'Performance',
    blurb: 'Eliminating digital friction through rigorous performance budgets, asset bundling, cloud object streaming, and automated continuous delivery workflows.',
    ctaText: 'Background & capabilities',
    ctaHref: '/about#capabilities',
    process: [
      {
        step: '01',
        title: 'Critical Rendering Path Profiling',
        description: 'Auditing First Contentful Paint and Largest Contentful Paint to eliminate render-blocking CSS, script waterfalls, and excessive DOM node counts.'
      },
      {
        step: '02',
        title: 'Asset Strategy & Storage Decoupling',
        description: 'Offloading large file uploads directly to AWS S3 buckets with signed URLs, utilizing modern next-gen image compression and lazy evaluation.'
      },
      {
        step: '03',
        title: 'CI/CD Pipelines & Containerization',
        description: 'Structuring automated linting, test suites, and Dockerized environments to ensure defect-free deployments to Vercel and cloud platforms.'
      }
    ],
    skills: ['AWS S3', 'Docker', 'Nginx', 'Git & GitHub Actions', 'Agile / JIRA', 'Lighthouse Optimization', 'CI/CD']
  }
];

