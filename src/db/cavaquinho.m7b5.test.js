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
    {
      frets: 'a878',
      fingers: '4213',
    },
    {
      frets: 'abbd',
      fingers: '1234',
    },
    {
      frets: 'dbba',
      fingers: '4231',
    },
    {
      frets: '1314',
      fingers: '1314',
      barres: 1,
      capo: true,
    },
    {
      frets: '4311',
      fingers: '4311',
      barres: 1,
      capo: true,
    },
    {
      frets: '4548',
      fingers: '1214',
      barres: 4,
      capo: true,
    },
    {
      frets: '8544',
      fingers: '4211',
      barres: 4,
      capo: true,
    },
    {
      frets: '887a',
      fingers: '2314',
    }
  ],
  Db: [
    {
      frets: 'b989',
      fingers: '4213',
    },
    {
      frets: 'bcce',
      fingers: '1234',
    },
    {
      frets: 'eccb',
      fingers: '4231',
    },
    {
      frets: '2425',
      fingers: '1314',
      barres: 2,
      capo: true,
    },
    {
      frets: '5422',
      fingers: '4311',
      barres: 2,
      capo: true,
    },
    {
      frets: '5659',
      fingers: '1214',
      barres: 5,
      capo: true,
    },
    {
      frets: '9655',
      fingers: '4211',
      barres: 5,
      capo: true,
    },
    {
      frets: '998b',
      fingers: '2314',
    }
  ],
  D: [
    {
      frets: 'ca9a',
      fingers: '4213',
    },
    {
      frets: '0113',
      fingers: '0124',
    },
    {
      frets: '3110',
      fingers: '3120',
    },
    {
      frets: '3536',
      fingers: '1314',
      barres: 3,
      capo: true,
    },
    {
      frets: '6533',
      fingers: '4311',
      barres: 3,
      capo: true,
    },
    {
      frets: '676a',
      fingers: '1214',
      barres: 6,
      capo: true,
    },
    {
      frets: 'a766',
      fingers: '4211',
      barres: 6,
      capo: true,
    },
    {
      frets: 'aa9c',
      fingers: '2314',
    }
  ],
  Eb: [
    {
      frets: 'dbab',
      fingers: '4213',
    },
    {
      frets: '1224',
      fingers: '1234',
    },
    {
      frets: '4221',
      fingers: '4231',
    },
    {
      frets: '4647',
      fingers: '1314',
      barres: 4,
      capo: true,
    },
    {
      frets: '7644',
      fingers: '4311',
      barres: 4,
      capo: true,
    },
    {
      frets: '787b',
      fingers: '1214',
      barres: 7,
      capo: true,
    },
    {
      frets: 'b877',
      fingers: '4211',
      barres: 7,
      capo: true,
    },
    {
      frets: 'bbad',
      fingers: '2314',
    }
  ],
  E: [
    {
      frets: 'ecbc',
      fingers: '4213',
    },
    {
      frets: '2335',
      fingers: '1234',
    },
    {
      frets: '5332',
      fingers: '4231',
    },
    {
      frets: '5758',
      fingers: '1314',
      barres: 5,
      capo: true,
    },
    {
      frets: '8755',
      fingers: '4311',
      barres: 5,
      capo: true,
    },
    {
      frets: '898c',
      fingers: '1214',
      barres: 8,
      capo: true,
    },
    {
      frets: 'c988',
      fingers: '4211',
      barres: 8,
      capo: true,
    },
    {
      frets: 'ccbe',
      fingers: '2314',
    }
  ],
  F: [
    {
      frets: '3101',
      fingers: '3102',
    },
    {
      frets: '3446',
      fingers: '1234',
    },
    {
      frets: '6443',
      fingers: '4231',
    },
    {
      frets: '6869',
      fingers: '1314',
      barres: 6,
      capo: true,
    },
    {
      frets: '9866',
      fingers: '4311',
      barres: 6,
      capo: true,
    },
    {
      frets: '9a9d',
      fingers: '1214',
      barres: 9,
      capo: true,
    },
    {
      frets: 'da99',
      fingers: '4211',
      barres: 9,
      capo: true,
    },
    {
      frets: '1103',
      fingers: '1204',
    }
  ],
  Gb: [
    {
      frets: '4212',
      fingers: '4213',
    },
    {
      frets: '4557',
      fingers: '1234',
    },
    {
      frets: '7554',
      fingers: '4231',
    },
    {
      frets: '797a',
      fingers: '1314',
      barres: 7,
      capo: true,
    },
    {
      frets: 'a977',
      fingers: '4311',
      barres: 7,
      capo: true,
    },
    {
      frets: 'abae',
      fingers: '1214',
      barres: 10,
      capo: true,
    },
    {
      frets: 'ebaa',
      fingers: '4211',
      barres: 10,
      capo: true,
    },
    {
      frets: '2214',
      fingers: '2314',
    }
  ],
  G: [
    {
      frets: '5323',
      fingers: '4213',
    },
    {
      frets: '5668',
      fingers: '1234',
    },
    {
      frets: '8665',
      fingers: '4231',
    },
    {
      frets: '8a8b',
      fingers: '1314',
      barres: 8,
      capo: true,
    },
    {
      frets: 'ba88',
      fingers: '4311',
      barres: 8,
      capo: true,
    },
    {
      frets: 'bcbf',
      fingers: '1214',
      barres: 11,
      capo: true,
    },
    {
      frets: 'fcbb',
      fingers: '4211',
      barres: 11,
      capo: true,
    },
    {
      frets: '3325',
      fingers: '2314',
    }
  ],
  Ab: [
    {
      frets: '6434',
      fingers: '4213',
    },
    {
      frets: '6779',
      fingers: '1234',
    },
    {
      frets: '9776',
      fingers: '4231',
    },
    {
      frets: '9b9c',
      fingers: '1314',
      barres: 9,
      capo: true,
    },
    {
      frets: 'cb99',
      fingers: '4311',
      barres: 9,
      capo: true,
    },
    {
      frets: '0104',
      fingers: '0104',
    },
    {
      frets: '4100',
      fingers: '4100',
    },
    {
      frets: '4436',
      fingers: '2314',
    }
  ],
  A: [
    {
      frets: '7545',
      fingers: '4213',
    },
    {
      frets: '788a',
      fingers: '1234',
    },
    {
      frets: 'a887',
      fingers: '4231',
    },
    {
      frets: 'acad',
      fingers: '1314',
      barres: 10,
      capo: true,
    },
    {
      frets: 'dcaa',
      fingers: '4311',
      barres: 10,
      capo: true,
    },
    {
      frets: '1215',
      fingers: '1214',
      barres: 1,
      capo: true,
    },
    {
      frets: '5211',
      fingers: '4211',
      barres: 1,
      capo: true,
    },
    {
      frets: '5547',
      fingers: '2314',
    }
  ],
  Bb: [
    {
      frets: '8656',
      fingers: '4213',
    },
    {
      frets: '899b',
      fingers: '1234',
    },
    {
      frets: 'b998',
      fingers: '4231',
    },
    {
      frets: 'bdbe',
      fingers: '1314',
      barres: 11,
      capo: true,
    },
    {
      frets: 'edbb',
      fingers: '4311',
      barres: 11,
      capo: true,
    },
    {
      frets: '2326',
      fingers: '1214',
      barres: 2,
      capo: true,
    },
    {
      frets: '6322',
      fingers: '4211',
      barres: 2,
      capo: true,
    },
    {
      frets: '6658',
      fingers: '2314',
    }
  ],
  B: [
    {
      frets: '9767',
      fingers: '4213',
    },
    {
      frets: '9aac',
      fingers: '1234',
    },
    {
      frets: 'caa9',
      fingers: '4231',
    },
    {
      frets: '0203',
      fingers: '0103',
    },
    {
      frets: '3200',
      fingers: '2100',
    },
    {
      frets: '3437',
      fingers: '1214',
      barres: 3,
      capo: true,
    },
    {
      frets: '7433',
      fingers: '4211',
      barres: 3,
      capo: true,
    },
    {
      frets: '7769',
      fingers: '2314',
    }
  ],
};

const openPositionsByKey = {
  Ab: [6, 7],
  B: [4, 5],
  D: [2, 3],
  F: [1, 8],
};

describe('cavaquinho m7b5 source golden', () => {
  Object.keys(sourcePositions).map((key) => {
    const chord = getChord(key, 'm7b5');
    const tones = chordTones(key, [0, 3, 6, 10]);

    it(`${key}m7b5 should have the source page count`, () =>
      expect(chord.positions).toHaveLength(sourcePositions[key].length));

    chord.positions.map((position, index) => {
      const positionNumber = index + 1;
      const expected = sourcePositions[key][index];

      it(`${key}m7b5 position ${positionNumber} should match the source transcription`, () =>
        expect(positionSnapshot(position)).toEqual(expectedSnapshot(expected)));

      it(`${key}m7b5 position ${positionNumber} should contain only half-diminished tones`, () =>
        expectOnlyChordTones(position, tones));

      it(`${key}m7b5 position ${positionNumber} should satisfy cavaquinho data invariants`, () =>
        expectCavaquinhoPositionInvariants(position));
    });

    chord.positions.map((position, index) => {
      const positionNumber = index + 1;
      const openPositions = openPositionsByKey[key] || [];

      if (openPositions.includes(positionNumber)) {
        it(`${key}m7b5 position ${positionNumber} should preserve source open-register semantics`, () => {
          expect(frets(position).some((fret) => fret === 0)).toEqual(true);
          expect(position.barres).toBeUndefined();
          expect(position.capo).toBeUndefined();
        });

        return;
      }

      if (sourcePositions[key][index].barres) {
        it(`${key}m7b5 position ${positionNumber} should preserve source closed-barre semantics`, () =>
          expectClosedBarreSemantics(position));
      }
    });
  });
});
