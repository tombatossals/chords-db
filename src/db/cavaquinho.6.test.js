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
      frets: 'a987',
      fingers: '4321'
    },
    {
      frets: 'acae',
      fingers: '1213',
      barres: 10,
      capo: true
    },
    {
      frets: 'ecaa',
      fingers: '3211',
      barres: 10,
      capo: true
    },
    {
      frets: 'ecae',
      fingers: '3214'
    },
    {
      frets: '2215',
      fingers: '2314'
    },
    {
      frets: '5255',
      fingers: '2134'
    },
    {
      frets: '5212',
      fingers: '4213'
    },
    {
      frets: '5557',
      fingers: '1113',
      barres: 5,
      capo: true
    },
    {
      frets: '7555',
      fingers: '4111',
      barres: 5,
      capo: true
    },
    {
      frets: '798a',
      fingers: '1324'
    }
  ],
  Db: [
    {
      frets: 'ba98',
      fingers: '4321'
    },
    {
      frets: 'bdbf',
      fingers: '1213',
      barres: 11,
      capo: true
    },
    {
      frets: 'fdbb',
      fingers: '3211',
      barres: 11,
      capo: true
    },
    {
      frets: 'fdbf',
      fingers: '3214'
    },
    {
      frets: '3326',
      fingers: '2314'
    },
    {
      frets: '6366',
      fingers: '2134'
    },
    {
      frets: '6323',
      fingers: '4213'
    },
    {
      frets: '6668',
      fingers: '1113',
      barres: 6,
      capo: true
    },
    {
      frets: '8666',
      fingers: '4111',
      barres: 6,
      capo: true
    },
    {
      frets: '8a9b',
      fingers: '1324'
    }
  ],
  D: [
    {
      frets: 'cba9',
      fingers: '4321'
    },
    {
      frets: '0204',
      fingers: '0103'
    },
    {
      frets: '4200',
      fingers: '3100'
    },
    {
      frets: '4204',
      fingers: '2103'
    },
    {
      frets: '4437',
      fingers: '2314'
    },
    {
      frets: '7477',
      fingers: '2134'
    },
    {
      frets: '7434',
      fingers: '4213'
    },
    {
      frets: '7779',
      fingers: '1113',
      barres: 7,
      capo: true
    },
    {
      frets: '9777',
      fingers: '4111',
      barres: 7,
      capo: true
    },
    {
      frets: '9bac',
      fingers: '1324'
    }
  ],
  Eb: [
    {
      frets: 'dcba',
      fingers: '4321'
    },
    {
      frets: '1315',
      fingers: '1213',
      barres: 1,
      capo: true
    },
    {
      frets: '5311',
      fingers: '3211',
      barres: 1,
      capo: true
    },
    {
      frets: '5315',
      fingers: '3214'
    },
    {
      frets: '5548',
      fingers: '2314'
    },
    {
      frets: '8588',
      fingers: '2134'
    },
    {
      frets: '8545',
      fingers: '4213'
    },
    {
      frets: '888a',
      fingers: '1113',
      barres: 8,
      capo: true
    },
    {
      frets: 'a888',
      fingers: '4111',
      barres: 8,
      capo: true
    },
    {
      frets: 'acbd',
      fingers: '1324'
    }
  ],
  E: [
    {
      frets: 'edcb',
      fingers: '4321'
    },
    {
      frets: '2426',
      fingers: '1213',
      barres: 2,
      capo: true
    },
    {
      frets: '6422',
      fingers: '3211',
      barres: 2,
      capo: true
    },
    {
      frets: '6426',
      fingers: '3214'
    },
    {
      frets: '6659',
      fingers: '2314'
    },
    {
      frets: '9699',
      fingers: '2134'
    },
    {
      frets: '9656',
      fingers: '4213'
    },
    {
      frets: '999b',
      fingers: '1113',
      barres: 9,
      capo: true
    },
    {
      frets: 'b999',
      fingers: '4111',
      barres: 9,
      capo: true
    },
    {
      frets: 'bdce',
      fingers: '1324'
    }
  ],
  F: [
    {
      frets: '3210',
      fingers: '3210'
    },
    {
      frets: '3537',
      fingers: '1213',
      barres: 3,
      capo: true
    },
    {
      frets: '7533',
      fingers: '3211',
      barres: 3,
      capo: true
    },
    {
      frets: '7537',
      fingers: '3214'
    },
    {
      frets: '776a',
      fingers: '2314'
    },
    {
      frets: 'a7aa',
      fingers: '2134'
    },
    {
      frets: 'a767',
      fingers: '4213'
    },
    {
      frets: 'aaac',
      fingers: '1113',
      barres: 10,
      capo: true
    },
    {
      frets: 'caaa',
      fingers: '4111',
      barres: 10,
      capo: true
    },
    {
      frets: '0213',
      fingers: '0213'
    }
  ],
  Gb: [
    {
      frets: '4321',
      fingers: '4321'
    },
    {
      frets: '4648',
      fingers: '1213',
      barres: 4,
      capo: true
    },
    {
      frets: '8644',
      fingers: '3211',
      barres: 4,
      capo: true
    },
    {
      frets: '8648',
      fingers: '3214'
    },
    {
      frets: '887b',
      fingers: '2314'
    },
    {
      frets: 'b8bb',
      fingers: '2134'
    },
    {
      frets: 'b878',
      fingers: '4213'
    },
    {
      frets: 'bbbd',
      fingers: '1113',
      barres: 11,
      capo: true
    },
    {
      frets: 'dbbb',
      fingers: '4111',
      barres: 11,
      capo: true
    },
    {
      frets: '1324',
      fingers: '1324'
    }
  ],
  G: [
    {
      frets: '5432',
      fingers: '4321'
    },
    {
      frets: '5759',
      fingers: '1213',
      barres: 5,
      capo: true
    },
    {
      frets: '9755',
      fingers: '3211',
      barres: 5,
      capo: true
    },
    {
      frets: '9759',
      fingers: '3214'
    },
    {
      frets: '998c',
      fingers: '2314'
    },
    {
      frets: 'c9cc',
      fingers: '2134'
    },
    {
      frets: 'c989',
      fingers: '4213'
    },
    {
      frets: '0002',
      fingers: '0002'
    },
    {
      frets: '2000',
      fingers: '1000'
    },
    {
      frets: '2435',
      fingers: '1324'
    }
  ],
  Ab: [
    {
      frets: '6543',
      fingers: '4321'
    },
    {
      frets: '686a',
      fingers: '1213',
      barres: 6,
      capo: true
    },
    {
      frets: 'a866',
      fingers: '3211',
      barres: 6,
      capo: true
    },
    {
      frets: 'a86a',
      fingers: '3214'
    },
    {
      frets: 'aa9d',
      fingers: '2314'
    },
    {
      frets: 'dadd',
      fingers: '2134'
    },
    {
      frets: 'da9a',
      fingers: '4213'
    },
    {
      frets: '1113',
      fingers: '1113',
      barres: 1,
      capo: true
    },
    {
      frets: '3111',
      fingers: '4111',
      barres: 1,
      capo: true
    },
    {
      frets: '3546',
      fingers: '1324'
    }
  ],
  A: [
    {
      frets: '7654',
      fingers: '4321'
    },
    {
      frets: '797b',
      fingers: '1213',
      barres: 7,
      capo: true
    },
    {
      frets: 'b977',
      fingers: '3211',
      barres: 7,
      capo: true
    },
    {
      frets: 'b97b',
      fingers: '3214'
    },
    {
      frets: 'bbae',
      fingers: '2314'
    },
    {
      frets: 'ebee',
      fingers: '2134'
    },
    {
      frets: 'ebab',
      fingers: '4213'
    },
    {
      frets: '2224',
      fingers: '1113',
      barres: 2,
      capo: true
    },
    {
      frets: '4222',
      fingers: '4111',
      barres: 2,
      capo: true
    },
    {
      frets: '4657',
      fingers: '1324'
    }
  ],
  Bb: [
    {
      frets: '8765',
      fingers: '4321'
    },
    {
      frets: '8a8c',
      fingers: '1213',
      barres: 8,
      capo: true
    },
    {
      frets: 'ca88',
      fingers: '3211',
      barres: 8,
      capo: true
    },
    {
      frets: 'ca8c',
      fingers: '3214'
    },
    {
      frets: 'ccbf',
      fingers: '2314'
    },
    {
      frets: 'fcff',
      fingers: '2134'
    },
    {
      frets: 'fcbc',
      fingers: '4213'
    },
    {
      frets: '3335',
      fingers: '1113',
      barres: 3,
      capo: true
    },
    {
      frets: '5333',
      fingers: '4111',
      barres: 3,
      capo: true
    },
    {
      frets: '5768',
      fingers: '1324'
    }
  ],
  B: [
    {
      frets: '9876',
      fingers: '4321'
    },
    {
      frets: '9b9d',
      fingers: '1213',
      barres: 9,
      capo: true
    },
    {
      frets: 'db99',
      fingers: '3211',
      barres: 9,
      capo: true
    },
    {
      frets: 'db9d',
      fingers: '3214'
    },
    {
      frets: '1104',
      fingers: '1204'
    },
    {
      frets: '4144',
      fingers: '2134'
    },
    {
      frets: '4101',
      fingers: '4203'
    },
    {
      frets: '4446',
      fingers: '1113',
      barres: 4,
      capo: true
    },
    {
      frets: '6444',
      fingers: '4111',
      barres: 4,
      capo: true
    },
    {
      frets: '6879',
      fingers: '1324'
    }
  ]
};

const closedBarrePositionsByKey = {
  C: [2, 3, 8, 9],
  Db: [2, 3, 8, 9],
  D: [8, 9],
  Eb: [2, 3, 8, 9],
  E: [2, 3, 8, 9],
  F: [2, 3, 8, 9],
  Gb: [2, 3, 8, 9],
  G: [2, 3],
  Ab: [2, 3, 8, 9],
  A: [2, 3, 8, 9],
  Bb: [2, 3, 8, 9],
  B: [2, 3, 8, 9],
};

const openPositionsByKey = {
  D: [2, 3, 4],
  F: [1, 10],
  G: [8, 9],
  B: [5, 7],
};

const families = [
  ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'],
];

const normalizeClosedShape = (position) => {
  const fretValues = frets(position);
  const positiveFrets = fretValues.filter((fret) => fret > 0);
  const minFret = Math.min(...positiveFrets);

  return {
    frets: fretValues.map((fret) => fret - minFret),
    fingers: expectedSnapshot(position).fingers,
    barres: position.barres ? (Array.isArray(position.barres) ? position.barres : [position.barres]).map((barre) => barre - minFret) : [],
    capo: position.capo || false,
  };
};

const isFullyClosed = (position) => frets(position).every((fret) => fret > 0);

describe('cavaquinho 6 source-golden data', () => {
  Object.entries(sourcePositions).map(([key, positions]) => {
    it('matches the image-transcribed ' + key + '6 positions', () => {
      const chord = getChord(key, '6');
      expect(chord.positions).toHaveLength(10);
      expect(chord.positions.map(positionSnapshot)).toEqual(positions.map(expectedSnapshot));
    });

    it('validates ' + key + '6 chord tones and generic invariants', () => {
      const tones = chordTones(key, [0, 4, 7, 9]);
      getChord(key, '6').positions.map((position) => {
        expectCavaquinhoPositionInvariants(position);
        expectOnlyChordTones(position, tones);
      });
    });

    it('preserves ' + key + '6 image-confirmed barre and open-string semantics', () => {
      const chord = getChord(key, '6');
      const closedBarrePositions = closedBarrePositionsByKey[key] || [];
      const openPositions = openPositionsByKey[key] || [];

      closedBarrePositions.map((positionNumber) => {
        expectClosedBarreSemantics(chord.positions[positionNumber - 1]);
      });

      openPositions.map((positionNumber) => {
        expect(frets(chord.positions[positionNumber - 1]).some((fret) => fret === 0)).toEqual(true);
      });
    });
  });
});

describe('cavaquinho 6 correspondent closed shapes', () => {
  families.map((family) => {
    it('keeps closed-position shapes consistent for ' + family.join(' -> ') + '6', () => {
      const byKey = Object.fromEntries(family.map((key) => [key, getChord(key, '6').positions]));
      const positionCount = byKey[family[0]].length;

      Array.from({ length: positionCount }).map((_, index) => {
        const closed = family.filter((key) => isFullyClosed(byKey[key][index]));
        if (closed.length < 2) return;

        const expected = normalizeClosedShape(byKey[closed[0]][index]);
        closed.slice(1).map((key) => {
          expect(normalizeClosedShape(byKey[key][index])).toEqual(expected);
        });
      });
    });
  });
});
