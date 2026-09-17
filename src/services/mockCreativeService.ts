import type { CreativeConcept, CreativeVariant, FootageMatch, GameDNA, GameProject, GameplayMoment, QAResult, CreativeComponents } from '../types/creative';
import { defaultConcepts, defaultGameDNA, defaultProject, defaultMoments, defaultQAResults, defaultVariants } from '../data/mockData';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockCreativeService = {
  async analyzeGame(input: GameProject): Promise<{ project: GameProject; dna: GameDNA; concepts: CreativeConcept[] }> {
    await wait(1200);
    return {
      project: { ...defaultProject, ...input },
      dna: defaultGameDNA,
      concepts: defaultConcepts
    };
  },

  async generateConcepts(gameId: string): Promise<CreativeConcept[]> {
    await wait(900);
    return defaultConcepts.map((concept) => ({ ...concept, id: `${gameId}-${concept.id}` }));
  },

  async analyzeGameplay(recordingId: string): Promise<GameplayMoment[]> {
    await wait(1000);
    return defaultMoments.map((moment, index) => ({ ...moment, id: `${recordingId}-${index + 1}` }));
  },

  async matchFootage(conceptId: string): Promise<FootageMatch> {
    await wait(700);
    return {
      id: `match-${conceptId}`,
      conceptId,
      recommendedId: 'm4',
      timestamp: '00:29–00:36',
      confidence: 97,
      explanation: ['Only one parking slot remains', 'Bus is waiting', 'Visual tension is high'],
      thumbnail: '/demo/thumb-4.jpg'
    };
  },

  async generateCreativeComponents(conceptId: string, footageId: string): Promise<CreativeComponents> {
    await wait(1000);
    const concept = defaultConcepts.find((item) => item.id === conceptId) ?? defaultConcepts[0];
    return {
      id: `creative-${conceptId}-${footageId}`,
      conceptId,
      title: concept.name,
      hook: concept.hook,
      copy: 'One wrong move and the level is over.',
      cta: 'Play Now',
      voice: 'Energetic female',
      subtitle: 'Can you save the last bus?',
      sfx: 'Slam, burst, low tension pulse',
      music: 'High-energy puzzle rise',
      duration: '00:15',
      qaScore: 88,
      status: 'READY TO TEST'
    };
  },

  async generateVariants(config: { concepts: number; hooks: number; voiceStyles: number; ctas: number; targetOutput: number }): Promise<CreativeVariant[]> {
    await wait(1000);
    return defaultVariants.slice(0, Math.min(config.targetOutput, 4));
  },

  async runCreativeQA(creativeId: string): Promise<QAResult> {
    await wait(900);
    return defaultQAResults[0];
  },

  async exportCreativePack(creativeIds: string[]): Promise<{ success: boolean; message: string }> {
    await wait(1400);
    return {
      success: true,
      message: `Exported ${creativeIds.length} creative${creativeIds.length > 1 ? 's' : ''} to the demo pack.`
    };
  },

  async resetDemo(): Promise<{ project: GameProject; dna: GameDNA; concepts: CreativeConcept[]; moments: GameplayMoment[] }> {
    await wait(400);
    return {
      project: defaultProject,
      dna: defaultGameDNA,
      concepts: defaultConcepts,
      moments: defaultMoments
    };
  }
};
