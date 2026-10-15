/* global describe, expect, it */

import cavaquinho from './cavaquinho';
import sourceChords from './cavaquinho/chords/source';
import { classifyVoicing } from './cavaquinho/chordTheory';
import { buildSourceReview } from './cavaquinho/normalizeSourceVoicings';

describe('cavaquinho source normalization', () => {
  const review = buildSourceReview(sourceChords);

  it('records a deterministic disposition for every original source shape', () => {
    const sourceCount = Object.values(sourceChords).reduce(
      (total, chords) =>
        total + chords.reduce((sum, chord) => sum + chord.positions.length, 0),
      0
    );
    expect(review).toHaveLength(sourceCount);
    expect(review.every((item) => item.disposition)).toEqual(true);
  });

  it('moves diminished-seventh source shapes out of diminished triads', () => {
    expect(
      review.filter((item) => item.disposition === 'moved-to-dim7').length
    ).toEqual(132);
    Object.keys(cavaquinho.chords).forEach((key) => {
      const dim = cavaquinho.chords[key].find(
        (chord) => chord.suffix === 'dim'
      );
      dim.positions.forEach((position) => {
        expect(classifyVoicing(position, key, 'dim').additions).toEqual([]);
      });
    });
  });

  it('moves legacy ninth shapes without a dominant seventh to add9', () => {
    expect(
      review.filter((item) => item.disposition === 'moved-to-add9').length
    ).toEqual(106);
  });

  it('blocks voicings that omit a characteristic tone', () => {
    const blocked = review.filter(
      (item) => item.disposition === 'blocked-missing-characteristic-tone'
    );
    expect(blocked.length).toBeGreaterThan(0);
    expect(blocked.every((item) => item.missingEssential.length > 0)).toEqual(
      true
    );
  });
});
