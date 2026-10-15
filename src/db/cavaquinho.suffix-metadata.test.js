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

  it('uses Brazilian display symbols without changing canonical suffix IDs', () => {
    expect(suffixMetadata.aug.symbol).toEqual('+');
    expect(suffixMetadata['7sus4'].symbol).toEqual('7(4)');
    expect(suffixMetadata['69'].symbol).toEqual('6/9');
    expect(suffixMetadata['9']).toEqual({
      label: 'Sétima dominante com nona',
      symbol: '7(9)',
      aliases: ['9', '7(9)', 'dominante9', 'nona dominante'],
    });
    expect(suffixMetadata.maj9.symbol).toEqual('7M(9)');
    expect(suffixMetadata.madd9.symbol).toEqual('m(add9)');
    expect(suffixMetadata.mmaj7).toMatchObject({
      symbol: 'm(7M)',
      aliases: expect.arrayContaining(['m(maj7)', 'mM7', 'mmaj7']),
    });
  });
});
