/* global describe, expect, it */

import cavaquinho from './cavaquinho';
import { historicalVoicingCount } from './cavaquinho/historicalVoicings';

const getChord = (key, suffix) =>
  cavaquinho.chords[key].find((chord) => chord.suffix === suffix);

describe('cavaquinho historical voicing coverage', () => {
  it('keeps the complete validated pre-rebuild corpus', () => {
    expect(historicalVoicingCount).toEqual(111);
  });

  it('restores practical B minor coverage', () => {
    expect(getChord('B', 'minor').positions).toHaveLength(8);
  });

  it('keeps at least six positions for every major and minor chord', () => {
    Object.keys(cavaquinho.chords).forEach((key) => {
      ['major', 'minor'].forEach((suffix) => {
        expect(getChord(key, suffix).positions.length).toBeGreaterThanOrEqual(
          6
        );
      });
    });
  });
});
