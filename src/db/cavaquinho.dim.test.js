/* global describe, expect, it */

import cavaquinho from './cavaquinho';
import { classifyVoicing } from './cavaquinho/chordTheory';
import { getChord } from './cavaquinho.test-helpers';

describe('cavaquinho diminished triads', () => {
  Object.keys(cavaquinho.chords).forEach((key) => {
    it(`${key}dim publishes only exact diminished-triad voicings`, () => {
      const chord = getChord(key, 'dim');
      expect(chord.positions.length).toBeGreaterThan(0);
      chord.positions.forEach((position) => {
        const analysis = classifyVoicing(position, key, 'dim');
        expect(analysis.additions).toEqual([]);
        expect(analysis.missingEssential).toEqual([]);
      });
    });
  });
});
