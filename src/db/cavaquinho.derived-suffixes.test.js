/* global describe, expect, it */

import cavaquinho from './cavaquinho';
import suffixes from './cavaquinho/suffixes';
import { classifyVoicing } from './cavaquinho/chordTheory';
import {
  compareVoicingCandidates,
  transposeFullyFrettedPosition,
} from './cavaquinho/deriveSuffixVoicings';

const getChord = (key, suffix) =>
  cavaquinho.chords[key].find((chord) => chord.suffix === suffix);

describe('cavaquinho derived suffixes', () => {
  it('publishes every reviewed suffix definition', () => {
    expect(suffixes).toEqual(
      expect.arrayContaining([
        'm6',
        'add9',
        '7sus4',
        'aug',
        '69',
        'm9',
        'maj9',
        'madd9',
        'mmaj7',
      ])
    );
  });

  it.each(['m6', 'add9'])('provides %s shapes for every key', (suffix) => {
    Object.keys(cavaquinho.chords).forEach((key) => {
      expect(getChord(key, suffix).positions.length).toBeGreaterThan(0);
    });
  });

  it('reuses valid sixth voicings for 6/9 without external notes', () => {
    Object.keys(cavaquinho.chords).forEach((key) => {
      expect(getChord(key, '69').positions.length).toBeGreaterThan(0);
    });
  });

  it('does not publish duplicate physical positions for a chord', () => {
    Object.values(cavaquinho.chords).forEach((chords) => {
      chords.forEach((chord) => {
        const identities = chord.positions.map((position) =>
          [position.baseFret || 1, ...position.frets].join(':')
        );
        expect(new Set(identities).size).toEqual(identities.length);
      });
    });
  });

  it('expands every suspended-second chord from equivalent source shapes', () => {
    Object.keys(cavaquinho.chords).forEach((key) => {
      expect(getChord(key, 'sus2').positions.length).toBeGreaterThanOrEqual(6);
    });
  });

  it('raises every minor-seventh chord above the shallow-coverage threshold', () => {
    Object.keys(cavaquinho.chords).forEach((key) => {
      expect(getChord(key, 'm7').positions.length).toBeGreaterThanOrEqual(9);
    });
  });

  it('raises every dominant-seventh chord above the shallow-coverage threshold', () => {
    Object.keys(cavaquinho.chords).forEach((key) => {
      const positions = getChord(key, '7').positions;
      const validatedPositions = positions.filter((position) => {
        const analysis = classifyVoicing(position, key, '7');
        return (
          analysis.additions.length === 0 &&
          analysis.missingEssential.length === 0
        );
      });
      expect(validatedPositions.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('transposes only fully fretted positions and preserves their fingering', () => {
    expect(
      transposeFullyFrettedPosition({
        frets: '2312',
        fingers: '2413',
      })
    ).toMatchObject({ frets: [3, 4, 2, 3], fingers: '2413' });
    expect(
      transposeFullyFrettedPosition({ frets: '0214', fingers: '0123' })
    ).toBeNull();
  });

  it.each([
    ['9', 8, 8],
    ['m9', 8, 8],
    ['maj9', 10, 11],
  ])(
    'publishes rootless %s voicings in every key',
    (suffix, minimum, maximum) => {
      Object.keys(cavaquinho.chords).forEach((key) => {
        const positions = getChord(key, suffix).positions;
        expect(positions.length).toBeGreaterThanOrEqual(minimum);
        expect(positions.length).toBeLessThanOrEqual(maximum);
        positions.forEach((position) => {
          const analysis = classifyVoicing(position, key, suffix);
          expect(analysis.classification).toEqual('incomplete');
          expect(analysis.rootMissing).toEqual(true);
          expect(analysis.additions).toEqual([]);
          expect(analysis.missingEssential).toEqual([]);
        });
      });
    }
  );

  it('separates dominant ninth voicings from added-ninth voicings', () => {
    Object.keys(cavaquinho.chords).forEach((key) => {
      getChord(key, '9').positions.forEach((position) => {
        const analysis = classifyVoicing(position, key, '9');
        expect(analysis.rootMissing).toEqual(true);
        expect(analysis.additions).toEqual([]);
        expect(analysis.missingEssential).toEqual([]);
      });
      expect(getChord(key, 'add9').positions.length).toBeGreaterThan(0);
    });
  });

  it('orders rooted shapes before fewer omissions and preserves source order', () => {
    const candidates = [
      {
        id: 'later',
        analysis: { rootMissing: true, omissions: ['C'] },
        sourceIndex: 2,
      },
      {
        id: 'fewer',
        analysis: { rootMissing: true, omissions: [] },
        sourceIndex: 1,
      },
      {
        id: 'rooted',
        analysis: { rootMissing: false, omissions: ['G', 'C'] },
        sourceIndex: 3,
      },
      {
        id: 'earlier',
        analysis: { rootMissing: true, omissions: ['C'] },
        sourceIndex: 0,
      },
    ];

    expect(
      candidates.sort(compareVoicingCandidates).map(({ id }) => id)
    ).toEqual(['rooted', 'fewer', 'earlier', 'later']);
  });

  it.each(['aug', 'madd9', 'mmaj7'])(
    'publishes four to six reviewed %s shapes in every key',
    (suffix) => {
      Object.keys(cavaquinho.chords).forEach((key) => {
        const positions = getChord(key, suffix).positions;
        expect(positions.length).toBeGreaterThanOrEqual(4);
        expect(positions.length).toBeLessThanOrEqual(6);
        positions.forEach((position) => {
          const analysis = classifyVoicing(position, key, suffix);
          const fretted = position.frets.filter((fret) => fret > 0);
          expect(analysis.additions).toEqual([]);
          expect(analysis.missingEssential).toEqual([]);
          expect(
            position.frets.filter((fret) => fret >= 0).length
          ).toBeGreaterThanOrEqual(3);
          expect(
            Math.max(...fretted) - Math.min(...fretted)
          ).toBeLessThanOrEqual(4);
        });
      });
    }
  );
});
