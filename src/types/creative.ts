export type StageStatus = 'Not started' | 'In progress' | 'Completed' | 'Needs attention';
export type QAStatus = 'READY TO TEST' | 'NEEDS REPAIR' | 'REJECTED';
export type CheckState = 'pass' | 'warning' | 'fail';
export type ConceptEmotion = 'Tension' | 'Challenge' | 'Satisfaction' | 'Frustration' | 'Rescue';

export interface GameProject {
  id: string;
  name: string;
  fileName: string;
  duration: number;
  market: string;
  audience: string;
  usp: string;
  description: string;
  icon?: string;
  screenshots?: string[];
}

export interface GameDNA {
  genre: string;
  coreMechanic: string;
  emotionalDrivers: string[];
  visualDrivers: string[];
  uaAngles: string[];
}

export interface GameplayMoment {
  id: string;
  start: string;
  end: string;
  title: string;
  tag: string;
  description: string;
  confidence: number;
  thumbnail: string;
  selected?: boolean;
}

export interface CreativeConcept {
  id: string;
  name: string;
  emotion: ConceptEmotion;
  hook: string;
  angle: string;
  requiredScene: string;
  confidence: number;
  selected?: boolean;
}

export interface FootageMatch {
  id: string;
  conceptId: string;
  recommendedId: string;
  timestamp: string;
  confidence: number;
  explanation: string[];
  thumbnail: string;
}

export interface CreativeComponents {
  id: string;
  conceptId: string;
  title: string;
  hook: string;
  copy: string;
  cta: string;
  voice: string;
  subtitle: string;
  sfx: string;
  music: string;
  duration: string;
  qaScore: number;
  status: QAStatus;
}

export interface TimelineSegment {
  id: string;
  label: string;
  start: number;
  end: number;
  description: string;
  widthPercent: number;
}

export interface QAResult {
  id: string;
  creativeId: string;
  status: QAStatus;
  overall: number;
  checks: {
    label: string;
    state: CheckState;
    detail: string;
  }[];
  reasons: string[];
  suggestions: string[];
}

export interface CreativeVariant {
  id: string;
  concept: string;
  hook: string;
  voiceStyle: string;
  cta: string;
  qaScore: number;
  status: QAStatus;
  thumbnail: string;
  duration: string;
}

export interface VariationConfig {
  concepts: number;
  hooks: number;
  voiceStyles: number;
  ctas: number;
  targetOutput: number;
}

export interface RecordingBrief {
  level: string;
  remainingSlots: string;
  waitingBuses: string;
  recommendedDuration: string;
}

export interface PipelineState {
  stage: string;
  status: StageStatus;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
}

export interface DemoContextValue {
  project: GameProject;
  currentStage: string;
  gameInput: GameProject;
  mockGameplay: GameProject;
  analysisStatus: StageStatus;
  gameDNA: GameDNA;
  concepts: CreativeConcept[];
  selectedConcepts: string[];
  gameplayMoments: GameplayMoment[];
  selectedFootage: string[];
  creativeComponents: CreativeComponents[];
  timeline: TimelineSegment[];
  variants: CreativeVariant[];
  qaResults: QAResult[];
  selectedOutputIds: string[];
  exportStatus: string;
  notifications: NotificationItem[];
  setCurrentStage: (stage: string) => void;
  setProject: (project: GameProject) => void;
  setGameInput: (input: GameProject) => void;
  setMockGameplay: (input: GameProject) => void;
  setAnalysisStatus: (status: StageStatus) => void;
  setGameDNA: (dna: GameDNA) => void;
  setConcepts: (concepts: CreativeConcept[]) => void;
  setSelectedConcepts: (selected: string[]) => void;
  setGameplayMoments: (moments: GameplayMoment[]) => void;
  setSelectedFootage: (selected: string[]) => void;
  setCreativeComponents: (components: CreativeComponents[]) => void;
  setTimeline: (segments: TimelineSegment[]) => void;
  setVariants: (variants: CreativeVariant[]) => void;
  setQAResults: (results: QAResult[]) => void;
  setSelectedOutputIds: (selection: string[]) => void;
  setExportStatus: (status: string) => void;
  addNotification: (notification: NotificationItem) => void;
  clearNotifications: () => void;
  resetDemo: () => void;
}
