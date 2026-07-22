/* global it, describe, expect */

import {
  chordTones,
  expectCavaquinhoPositionInvariants,
  expectClosedBarreSemantics,
  expectOnlyChordTones,
  expectedSnapshot,
  frets,
  getChord,
  positionSnapshot,
} from './cavaquinho.test-helpers';

const sourcePositions = {
  C: [
    { frets: 'a877', fingers: '4211', barres: 7, capo: true },
    { frets: 'abaa', fingers: '1211', barres: 10, capo: true },
    { frets: 'abad', fingers: '1214', barres: 10, capo: true },
    { frets: 'dbaa', fingers: '4211', barres: 10, capo: true },
    { frets: 'dedd', fingers: '1211', barres: 13, capo: true },
    { frets: [13, 14, 13, 16], fingers: '1214', barres: 13, capo: true },
    { frets: [16, 14, 13, 13], fingers: '4211', barres: 13, capo: true },
    { frets: '4544', fingers: '1211', barres: 4, capo: true },
    { frets: '4547', fingers: '1214', barres: 4, capo: true },
    { frets: '7544', fingers: '4211', barres: 4, capo: true },
    { frets: '7877', fingers: '1211', barres: 7, capo: true },
    { frets: '787a', fingers: '1214', barres: 7, capo: true },
  ],
  G: [
    { frets: '5322', fingers: '4211', barres: 2, capo: true },
    { frets: '5655', fingers: '1211', barres: 5, capo: true },
    { frets: '5658', fingers: '1214', barres: 5, capo: true },
    { frets: '8655', fingers: '4211', barres: 5, capo: true },
    { frets: '8988', fingers: '1211', barres: 8, capo: true },
    { frets: '898b', fingers: '1214', barres: 8, capo: true },
    { frets: 'b988', fingers: '4211', barres: 8, capo: true },
    { frets: 'bcbb', fingers: '1211', barres: 11, capo: true },
    { frets: 'bcbe', fingers: '1214', barres: 11, capo: true },
    { frets: 'ecbb', fingers: '4211', barres: 11, capo: true },
    { frets: '2322', fingers: '1211', barres: 2, capo: true },
    { frets: '2325', fingers: '1214', barres: 2, capo: true },
  ],
  D: [
    { frets: 'ca99', fingers: '4211', barres: 9, capo: true },
    { frets: '0100', fingers: '0100' },
    { frets: '0103', fingers: '0103' },
    { frets: '3100', fingers: '3100' },
    { frets: '3433', fingers: '1211', barres: 3, capo: true },
    { frets: '3436', fingers: '1214', barres: 3, capo: true },
    { frets: '6433', fingers: '4211', barres: 3, capo: true },
    { frets: '6766', fingers: '1211', barres: 6, capo: true },
    { frets: '6769', fingers: '1214', barres: 6, capo: true },
    { frets: '9766', fingers: '4211', barres: 6, capo: true },
    { frets: '9a99', fingers: '1211', barres: 9, capo: true },
    { frets: '9a9c', fingers: '1214', barres: 9, capo: true },
  ],
  A: [
    { frets: 'a877', fingers: '4211', barres: 7, capo: true },
    { frets: '7877', fingers: '1211', barres: 7, capo: true },
    { frets: '787a', fingers: '1214', barres: 7, capo: true },
    { frets: 'a877', fingers: '4211', barres: 7, capo: true },
    { frets: 'abaa', fingers: '1211', barres: 10, capo: true },
    { frets: 'abad', fingers: '1214', barres: 10, capo: true },
    { frets: 'dbaa', fingers: '4211', barres: 10, capo: true },
    { frets: 'dedd', fingers: '1211', barres: 13, capo: true },
    { frets: [13, 14, 13, 16], fingers: '1214', barres: 13, capo: true },
    { frets: [16, 14, 13, 13], fingers: '4211', barres: 13, capo: true },
    { frets: '4544', fingers: '1211', barres: 4, capo: true },
    { frets: '4547', fingers: '1214', barres: 4, capo: true },
  ],
  E: [
    { frets: 'ecbb', fingers: '4211', barres: 11, capo: true },
    { frets: '2322', fingers: '1211', barres: 2, capo: true },
    { frets: '2325', fingers: '1214', barres: 2, capo: true },
    { frets: '5322', fingers: '4211', barres: 2, capo: true },
    { frets: '5655', fingers: '1211', barres: 5, capo: true },
    { frets: '5658', fingers: '1214', barres: 5, capo: true },
    { frets: '8655', fingers: '4211', barres: 5, capo: true },
    { frets: '8988', fingers: '1211', barres: 8, capo: true },
    { frets: '898b', fingers: '1214', barres: 8, capo: true },
    { frets: 'b988', fingers: '4211', barres: 8, capo: true },
    { frets: 'bcbb', fingers: '1211', barres: 11, capo: true },
    { frets: 'bcbe', fingers: '1214', barres: 11, capo: true },
  ],
  B: [
    { frets: 'ca99', fingers: '4211', barres: 9, capo: true },
    { frets: '9a99', fingers: '1211', barres: 9, capo: true },
    { frets: '9a9c', fingers: '1214', barres: 9, capo: true },
    { frets: 'ca99', fingers: '4211', barres: 9, capo: true },
    { frets: '0100', fingers: '0100' },
    { frets: '0103', fingers: '0103' },
    { frets: '3100', fingers: '3100' },
    { frets: '3433', fingers: '1211', barres: 3, capo: true },
    { frets: '3436', fingers: '1214', barres: 3, capo: true },
    { frets: '6433', fingers: '4211', barres: 3, capo: true },
    { frets: '6766', fingers: '1211', barres: 6, capo: true },
    { frets: '6769', fingers: '1214', barres: 6, capo: true },
  ],
  Gb: [
    { frets: '7544', fingers: '4211', barres: 4, capo: true },
    { frets: '4544', fingers: '1211', barres: 4, capo: true },
    { frets: '4547', fingers: '1214', barres: 4, capo: true },
    { frets: '7544', fingers: '4211', barres: 4, capo: true },
    { frets: '7877', fingers: '1211', barres: 7, capo: true },
    { frets: '787a', fingers: '1214', barres: 7, capo: true },
    { frets: 'a877', fingers: '4211', barres: 7, capo: true },
    { frets: 'abaa', fingers: '1211', barres: 10, capo: true },
    { frets: 'abad', fingers: '1214', barres: 10, capo: true },
    { frets: 'dbaa', fingers: '4211', barres: 10, capo: true },
    { frets: 'dedd', fingers: '1211', barres: 13, capo: true },
    { frets: [13, 14, 13, 16], fingers: '1214', barres: 13, capo: true },
  ],
  Db: [
    { frets: 'ecbb', fingers: '4211', barres: 11, capo: true },
    { frets: 'bcbb', fingers: '1211', barres: 11, capo: true },
    { frets: 'bcbe', fingers: '1214', barres: 11, capo: true },
    { frets: 'ecbb', fingers: '4211', barres: 11, capo: true },
    { frets: '2322', fingers: '1211', barres: 2, capo: true },
    { frets: '2325', fingers: '1214', barres: 2, capo: true },
    { frets: '5322', fingers: '4211', barres: 2, capo: true },
    { frets: '5655', fingers: '1211', barres: 5, capo: true },
    { frets: '5658', fingers: '1214', barres: 5, capo: true },
    { frets: '8655', fingers: '4211', barres: 5, capo: true },
    { frets: '8988', fingers: '1211', barres: 8, capo: true },
    { frets: '898b', fingers: '1214', barres: 8, capo: true },
  ],
  F: [
    { frets: '3100', fingers: '3100' },
    { frets: '3433', fingers: '1211', barres: 3, capo: true },
    { frets: '3436', fingers: '1214', barres: 3, capo: true },
    { frets: '6433', fingers: '4211', barres: 3, capo: true },
    { frets: '6766', fingers: '1211', barres: 6, capo: true },
    { frets: '6769', fingers: '1214', barres: 6, capo: true },
    { frets: '9766', fingers: '4211', barres: 6, capo: true },
    { frets: '9a99', fingers: '1211', barres: 9, capo: true },
    { frets: '9a9c', fingers: '1214', barres: 9, capo: true },
    { frets: 'ca99', fingers: '4211', barres: 9, capo: true },
    { frets: '0100', fingers: '0100' },
    { frets: '0103', fingers: '0103' },
  ],
  Bb: [
    { frets: 'b988', fingers: '4211', barres: 8, capo: true },
    { frets: '8988', fingers: '1211', barres: 8, capo: true },
    { frets: '898b', fingers: '1214', barres: 8, capo: true },
    { frets: 'b988', fingers: '4211', barres: 8, capo: true },
    { frets: 'bcbb', fingers: '1211', barres: 11, capo: true },
    { frets: 'bcbe', fingers: '1214', barres: 11, capo: true },
    { frets: 'ecbb', fingers: '4211', barres: 11, capo: true },
    { frets: '2322', fingers: '1211', barres: 2, capo: true },
    { frets: '2325', fingers: '1214', barres: 2, capo: true },
    { frets: '5322', fingers: '4211', barres: 2, capo: true },
    { frets: '5655', fingers: '1211', barres: 5, capo: true },
    { frets: '5658', fingers: '1214', barres: 5, capo: true },
  ],
  Eb: [
    { frets: 'dbaa', fingers: '4211', barres: 10, capo: true },
    { frets: '1211', fingers: '1211', barres: 1, capo: true },
    { frets: '1214', fingers: '1214', barres: 1, capo: true },
    { frets: '4211', fingers: '4211', barres: 1, capo: true },
    { frets: '4544', fingers: '1211', barres: 4, capo: true },
    { frets: '4547', fingers: '1214', barres: 4, capo: true },
    { frets: '7544', fingers: '4211', barres: 4, capo: true },
    { frets: '7877', fingers: '1211', barres: 7, capo: true },
    { frets: '787a', fingers: '1214', barres: 7, capo: true },
    { frets: 'a877', fingers: '4211', barres: 7, capo: true },
    { frets: 'abaa', fingers: '1211', barres: 10, capo: true },
    { frets: 'abad', fingers: '1214', barres: 10, capo: true },
  ],
  Ab: [
    { frets: '9766', fingers: '4211', barres: 6, capo: true },
    { frets: '6766', fingers: '1211', barres: 6, capo: true },
    { frets: '6769', fingers: '1214', barres: 6, capo: true },
    { frets: '9766', fingers: '4211', barres: 6, capo: true },
    { frets: '9a99', fingers: '1211', barres: 9, capo: true },
    { frets: '9a9c', fingers: '1214', barres: 9, capo: true },
    { frets: 'ca99', fingers: '4211', barres: 9, capo: true },
    { frets: '0100', fingers: '0100' },
    { frets: '0103', fingers: '0103' },
    { frets: '3100', fingers: '3100' },
    { frets: '3433', fingers: '1211', barres: 3, capo: true },
    { frets: '3436', fingers: '1214', barres: 3, capo: true },
  ],
};

const openPositionsByKey = {
  Ab: [8, 9, 10],
  B: [5, 6, 7],
  D: [2, 3, 4],
  F: [1, 11, 12],
};

describe('cavaquinho dim7 source golden', () => {
  Object.keys(sourcePositions).map((key) => {
    const chord = getChord(key, 'dim7');
    const tones = chordTones(key, [0, 3, 6, 9]);

    it(`${key}dim7 should have the source page count`, () =>
      expect(chord.positions).toHaveLength(sourcePositions[key].length));

    chord.positions.map((position, index) => {
      const positionNumber = index + 1;
      const expected = sourcePositions[key][index];

      it(`${key}dim7 position ${positionNumber} should match the source transcription`, () =>
        expect(positionSnapshot(position)).toEqual(expectedSnapshot(expected)));

      it(`${key}dim7 position ${positionNumber} should contain only diminished-seventh tones`, () =>
        expectOnlyChordTones(position, tones));

      it(`${key}dim7 position ${positionNumber} should satisfy cavaquinho data invariants`, () =>
        expectCavaquinhoPositionInvariants(position));
    });

    chord.positions.map((position, index) => {
      const positionNumber = index + 1;
      const openPositions = openPositionsByKey[key] || [];

      if (openPositions.includes(positionNumber)) {
        it(`${key}dim7 position ${positionNumber} should preserve source open-register semantics`, () => {
          expect(frets(position).some((fret) => fret === 0)).toEqual(true);
          expect(position.barres).toBeUndefined();
          expect(position.capo).toBeUndefined();
        });

        return;
      }

      it(`${key}dim7 position ${positionNumber} should preserve source closed-barre semantics`, () =>
        expectClosedBarreSemantics(position));
    });
  });
});
