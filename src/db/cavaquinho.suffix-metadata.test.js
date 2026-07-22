/* global describe, expect, it */

import cavaquinho from './cavaquinho';
import suffixes from './cavaquinho/suffixes';
import suffixMetadata from './cavaquinho/suffixMetadata';

describe('cavaquinho Portuguese suffix metadata', () => {
  it('describes every published suffix in Portuguese', () => {
    suffixes.forEach((suffix) => {
      expect(suffixMetadata[suffix]).toMatchObject({
        label: expect.any(String),
        symbol: expect.any(String),
        aliases: expect.any(Array),
      });
    });
  });

  it('publishes seventh suspended fourth shapes for every key', () => {
    Object.values(cavaquinho.chords).forEach((chords) => {
      const chord = chords.find(({ suffix }) => suffix === '7sus4');
      expect(chord.positions.length).toBeGreaterThanOrEqual(6);
    });
  });
});
