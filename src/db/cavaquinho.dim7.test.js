/* global describe, expect, it */

import cavaquinho from './cavaquinho';
import { classifyVoicing } from './cavaquinho/chordTheory';
import { getChord } from './cavaquinho.test-helpers';

describe('cavaquinho diminished-seventh voicings', () => {
  Object.keys(cavaquinho.chords).forEach((key) => {
    it(`${key}dim7 accepts complete or one-tone-omitted voicings`, () => {
      const chord = getChord(key, 'dim7');
      expect(chord.positions.length).toBeGreaterThan(0);
      chord.positions.forEach((position) => {
        const analysis = classifyVoicing(position, key, 'dim7');
        expect(analysis.additions).toEqual([]);
        expect(analysis.missingEssential.length).toBeLessThanOrEqual(1);
        expect(['complete', 'incomplete', 'rootless']).toContain(
          analysis.classification
        );
      });
    });
  });
});
