import type { CreativeConcept, GameDNA, GameProject, GameplayMoment, QAResult, TimelineSegment, CreativeVariant, VariationConfig, RecordingBrief, QAStatus, CheckState } from '../types/creative';

export const defaultProject: GameProject = {
  id: 'bus-sort-puzzle',
  name: 'Bus Sort Puzzle',
  fileName: 'gameplay_01.mp4',
  duration: 60,
  market: 'United States',
  audience: 'Female, 18–35',
  usp: 'Satisfying sorting puzzle with high-tension final-slot moments',
  description: 'A puzzle game where players manage increasingly crowded bus routes and solve each level by sorting passengers into the right slots.',
};

export const defaultGameDNA: GameDNA = {
  genre: 'Puzzle',
  coreMechanic: 'Sorting',
  emotionalDrivers: ['Tension', 'Satisfaction', 'Challenge', 'Rescue'],
  visualDrivers: ['Color matching', 'Crowded parking', 'Bus movement'],
  uaAngles: ['Last-slot panic', 'Impossible puzzle', 'Satisfying sorting', 'Failure', 'Rescue']
};

export const defaultConcepts: CreativeConcept[] = [
  { id: 'last-slot-panic', name: 'Last Slot Panic', emotion: 'Tension', hook: 'Can you save the last bus?', angle: 'Last-slot panic', requiredScene: 'Parking almost full', confidence: 94 },
  { id: 'impossible-puzzle', name: 'Impossible Puzzle', emotion: 'Challenge', hook: 'Only 1% can solve this.', angle: 'Impossible puzzle', requiredScene: 'Nearly impossible board', confidence: 91 },
  { id: 'satisfying-sort', name: 'Satisfying Sort', emotion: 'Satisfaction', hook: 'Watch everything disappear.', angle: 'Satisfying sorting', requiredScene: 'Large passenger combo', confidence: 96 },
  { id: 'failure', name: 'Failure', emotion: 'Frustration', hook: 'I had ONE slot left...', angle: 'Failure', requiredScene: 'Wrong move/near loss', confidence: 83 },
  { id: 'rescue', name: 'Rescue', emotion: 'Rescue', hook: 'Can you save them before it is too late?', angle: 'Rescue', requiredScene: 'Critical rescue moment', confidence: 89 }
];

export const defaultMoments: GameplayMoment[] = [
  { id: 'm1', start: '00:08', end: '00:13', title: 'Parking almost full', tag: 'High Tension', description: 'The board is nearly packed and the final slot is under threat.', confidence: 95, thumbnail: '/demo/thumb-1.jpg' },
  { id: 'm2', start: '00:14', end: '00:18', title: 'Wrong bus selected', tag: 'Failure', description: 'A poor move creates a chaotic board state.', confidence: 88, thumbnail: '/demo/thumb-2.jpg' },
  { id: 'm3', start: '00:21', end: '00:27', title: 'Large passenger combo', tag: 'Satisfying', description: 'Passenger sorting creates a satisfying visual cascade.', confidence: 96, thumbnail: '/demo/thumb-3.jpg' },
  { id: 'm4', start: '00:29', end: '00:36', title: 'Last parking slot', tag: 'High Tension', description: 'Only one slot remains while the bus waits impatiently.', confidence: 97, thumbnail: '/demo/thumb-4.jpg' },
  { id: 'm5', start: '00:37', end: '00:44', title: 'Level completed', tag: 'Success', description: 'The final rescue leads to a clear victory moment.', confidence: 93, thumbnail: '/demo/thumb-5.jpg' }
];

export const defaultTimeline: TimelineSegment[] = [
  { id: 't1', label: 'HOOK', start: 0, end: 2, description: 'Introduce the urgent bus puzzle moment.', widthPercent: 13.3 },
  { id: 't2', label: 'GAMEPLAY', start: 2, end: 10, description: 'Visualize the frantic sorting pressure.', widthPercent: 53.3 },
  { id: 't3', label: 'PAYOFF', start: 10, end: 13, description: 'Reveal the successful rescue and payoff.', widthPercent: 20 },
  { id: 't4', label: 'CTA', start: 13, end: 15, description: 'Prompt the player to try the level.', widthPercent: 13.3 }
];

export const defaultVariationConfig: VariationConfig = {
  concepts: 3,
  hooks: 3,
  voiceStyles: 2,
  ctas: 2,
  targetOutput: 8
};

export const defaultRecordingBrief: RecordingBrief = {
  level: 'Level 23',
  remainingSlots: '1 parking slot remaining',
  waitingBuses: '3 buses waiting',
  recommendedDuration: '8–12 seconds'
};

export const defaultVariants: CreativeVariant[] = [
  { id: 'v1', concept: 'Last Slot Panic', hook: 'Can you save the last bus?', voiceStyle: 'Energetic female', cta: 'Play Now', qaScore: 88, status: 'READY TO TEST', thumbnail: '/demo/thumb-1.jpg', duration: '00:09' },
  { id: 'v2', concept: 'Satisfying Sort', hook: 'Watch everything disappear.', voiceStyle: 'Calm male', cta: 'Try it', qaScore: 86, status: 'READY TO TEST', thumbnail: '/demo/thumb-3.jpg', duration: '00:11' },
  { id: 'v3', concept: 'Rescue', hook: 'Can you save them before it is too late?', voiceStyle: 'Cinematic female', cta: 'Play Free', qaScore: 79, status: 'NEEDS REPAIR', thumbnail: '/demo/thumb-5.jpg', duration: '00:12' },
  { id: 'v4', concept: 'Failure', hook: 'I had ONE slot left...', voiceStyle: 'Energetic female', cta: 'Play Now', qaScore: 68, status: 'REJECTED', thumbnail: '/demo/thumb-2.jpg', duration: '00:08' }
];

export const defaultQAResults: QAResult[] = [
  {
    id: 'qa-1',
    creativeId: 'v1',
    status: 'READY TO TEST',
    overall: 88,
    checks: [
      { label: 'Hook appears early', state: 'pass' as CheckState, detail: 'The hook lands within the first 2 seconds.' },
      { label: 'Gameplay visible', state: 'pass' as CheckState, detail: 'The gameplay occupies the majority of the frame.' },
      { label: 'Text readable', state: 'warning' as CheckState, detail: 'The subtitle sits slightly low for smaller screens.' },
      { label: 'CTA present', state: 'pass' as CheckState, detail: 'CTA is readable and placed at the end.' }
    ],
    reasons: ['Strong tension hook', 'Clear bus puzzle context'],
    suggestions: ['Tighten subtitle placement in 9:16 preview']
  }
];

export const stageLabels = ['Overview', 'Game Input', 'Creative Strategy', 'Gameplay Library', 'Footage Matching', 'Generate Creatives', 'Timeline Preview', 'QA Center', 'Creative Output'];
