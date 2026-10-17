import { HonestStat } from './types';

export const statsStripData: HonestStat[] = [
  {
    id: 'throughput',
    value: '30%',
    numericTarget: 30,
    suffix: '%',
    label: 'Scheduling Throughput Boost',
    qualifier: 'Measured internal task completion delta during production workflow rollout.',
    sourceOrContext: 'Engineering metrics during scheduling engine deployment at Vigyapanam Pvt. Ltd.'
  },
  {
    id: 'speed',
    value: '40%',
    numericTarget: 40,
    suffix: '%',
    label: 'Page Load Speed Optimization',
    qualifier: 'Measured Lighthouse performance improvement across 5+ client product campaigns.',
    sourceOrContext: 'Audited across production campaign landing pages via asset compression and script deferrals.'
  },
  {
    id: 'accuracy',
    value: '92%',
    numericTarget: 92,
    suffix: '%',
    label: 'LSTM Model Prediction Score',
    qualifier: 'Validation set directional accuracy on historical time-series backtests; not financial advice.',
    sourceOrContext: 'TensorFlow test partition benchmarks across historical market closing price sequences.'
  }
];

export const impactSummary = {
  heading: 'Measurable Outcomes, Grounded in Real Data',
  accentWord: 'Impact',
  blurb: 'Every metric on this portfolio stems from measured engineering iterations—whether optimizing browser rendering budgets, tuning neural network weights, or refactoring operational state machines.',
  ctaText: 'View academic & training foundation',
  ctaHref: '/education'
};

