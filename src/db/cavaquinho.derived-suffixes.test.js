/* global describe, expect, it */

import cavaquinho from './cavaquinho';
import suffixes from './cavaquinho/suffixes';

const getChord = (key, suffix) =>
  cavaquinho.chords[key].find((chord) => chord.suffix === suffix);

describe('cavaquinho derived suffixes', () => {
  it('publishes minor sixth and added ninth suffixes', () => {
    expect(suffixes).toEqual(expect.arrayContaining(['m6', 'add9']));
  });

  it.each(['m6', 'add9'])('provides %s shapes for every key', (suffix) => {
    Object.keys(cavaquinho.chords).forEach((key) => {
      expect(getChord(key, suffix).positions.length).toBeGreaterThan(0);
    });
  });
});
