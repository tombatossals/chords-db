/* global it, describe, expect */

import {
  chordTones,
  expectCavaquinhoPositionInvariants,
  expectClosedBarreSemantics,
  expectOnlyChordTones,
  expectedSnapshot,
  getChord,
  positionSnapshot,
} from './cavaquinho.test-helpers';

const sourcePositions = {
  C: [
    {
      frets: "aa8a",
      fingers: "2314"
    },
    {
      frets: "3013",
      fingers: "2013"
    },
    {
      frets: "5565",
      fingers: "1121",
      barres: 5,
      capo: true
    },
    {
      frets: "acdf",
      fingers: "1234"
    },
    {
      frets: "5a8a",
      fingers: "1324"
    },
    {
      frets: "3565",
      fingers: "1243"
    }
  ],
  Db: [
    {
      frets: "bb9b",
      fingers: "2314"
    },
    {
      frets: "4124",
      fingers: "3124"
    },
    {
      frets: "6676",
      fingers: "1121",
      barres: 6,
      capo: true
    },
    {
      frets: [
        11,
        13,
        14,
        16
      ],
      fingers: "1234"
    },
    {
      frets: "6b9b",
      fingers: "1324"
    },
    {
      frets: "4676",
      fingers: "1243"
    }
  ],
  D: [
    {
      frets: "ccac",
      fingers: "2314"
    },
    {
      frets: "5235",
      fingers: "3124"
    },
    {
      frets: "7787",
      fingers: "1121",
      barres: 7,
      capo: true
    },
    {
      frets: "0235",
      fingers: "0124"
    },
    {
      frets: "7cac",
      fingers: "1324"
    },
    {
      frets: "5787",
      fingers: "1243"
    }
  ],
  Eb: [
    {
      frets: "ddbd",
      fingers: "2314"
    },
    {
      frets: "6346",
      fingers: "3124"
    },
    {
      frets: "8898",
      fingers: "1121",
      barres: 8,
      capo: true
    },
    {
      frets: "1346",
      fingers: "1234"
    },
    {
      frets: "8dbd",
      fingers: "1324"
    },
    {
      frets: "6898",
      fingers: "1243"
    }
  ],
  E: [
    {
      frets: "2202",
      fingers: "1203"
    },
    {
      frets: "7457",
      fingers: "3124"
    },
    {
      frets: "99a9",
      fingers: "1121",
      barres: 9,
      capo: true
    },
    {
      frets: "2457",
      fingers: "1234"
    },
    {
      frets: "9ece",
      fingers: "1324"
    },
    {
      frets: "79a9",
      fingers: "1243"
    }
  ],
  F: [
    {
      frets: "3313",
      fingers: "2314"
    },
    {
      frets: "8568",
      fingers: "3124"
    },
    {
      frets: "aaba",
      fingers: "1121",
      barres: 10,
      capo: true
    },
    {
      frets: "3568",
      fingers: "1234"
    },
    {
      frets: [
        10,
        15,
        13,
        15
      ],
      fingers: "1324"
    },
    {
      frets: "8aba",
      fingers: "1243"
    }
  ],
  Gb: [
    {
      frets: "4424",
      fingers: "2314"
    },
    {
      frets: "9679",
      fingers: "3124"
    },
    {
      frets: "bbcb",
      fingers: "1121",
      barres: 11,
      capo: true
    },
    {
      frets: "4679",
      fingers: "1234"
    },
    {
      frets: [
        11,
        16,
        14,
        16
      ],
      fingers: "1324"
    },
    {
      frets: "9bcb",
      fingers: "1243"
    }
  ],
  G: [
    {
      frets: "5535",
      fingers: "2314"
    },
    {
      frets: "a78a",
      fingers: "3124"
    },
    {
      frets: "0010",
      fingers: "0010"
    },
    {
      frets: "578a",
      fingers: "1234"
    },
    {
      frets: "0535",
      fingers: "0213"
    },
    {
      frets: "acdc",
      fingers: "1243"
    }
  ],
  Ab: [
    {
      frets: "6646",
      fingers: "2314"
    },
    {
      frets: "b89b",
      fingers: "3124"
    },
    {
      frets: "dded",
      fingers: "1121",
      barres: 13,
      capo: true
    },
    {
      frets: "689b",
      fingers: "1234"
    },
    {
      frets: "1646",
      fingers: "1324"
    },
    {
      frets: "bded",
      fingers: "1243"
    }
  ],
  A: [
    {
      frets: "7757",
      fingers: "2314"
    },
    {
      frets: "c9ac",
      fingers: "3124"
    },
    {
      frets: "2232",
      fingers: "1121",
      barres: 2,
      capo: true
    },
    {
      frets: "79ac",
      fingers: "1234"
    },
    {
      frets: "2757",
      fingers: "1324"
    },
    {
      frets: "0232",
      fingers: "0132"
    }
  ],
  Bb: [
    {
      frets: "8868",
      fingers: "2314"
    },
    {
      frets: "dabd",
      fingers: "3124"
    },
    {
      frets: "3343",
      fingers: "1121",
      barres: 3,
      capo: true
    },
    {
      frets: "8abd",
      fingers: "1234"
    },
    {
      frets: "3868",
      fingers: "1324"
    },
    {
      frets: "1343",
      fingers: "1243"
    }
  ],
  B: [
    {
      frets: "9979",
      fingers: "2314"
    },
    {
      frets: "ebce",
      fingers: "3124"
    },
    {
      frets: "4454",
      fingers: "1121",
      barres: 4,
      capo: true
    },
    {
      frets: "9bce",
      fingers: "1234"
    },
    {
      frets: "4979",
      fingers: "1324"
    },
    {
      frets: "2454",
      fingers: "1243"
    }
  ]
};

const keys = Object.keys(sourcePositions);

describe('cavaquinho sus4 source positions', () => {
  it('matches the source page count for every chromatic key', () => {
    keys.map((key) => {
      expect(getChord(key, 'sus4').positions).toHaveLength(6);
    });
  });

  it('matches source-golden frets, fingers, barres, and capo marks', () => {
    keys.map((key) => {
      expect(getChord(key, 'sus4').positions.map(positionSnapshot)).toEqual(
        sourcePositions[key].map(expectedSnapshot)
      );
    });
  });

  it('contains only suspended-fourth chord tones', () => {
    keys.map((key) => {
      const tones = chordTones(key, [0, 5, 7]);
      getChord(key, 'sus4').positions.map((position) => {
        expectOnlyChordTones(position, tones);
        expectCavaquinhoPositionInvariants(position);
      });
    });
  });

  it('preserves closed barre semantics for source barre shapes', () => {
    ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'Ab'].map((key) => {
      expectClosedBarreSemantics(getChord(key, 'sus4').positions[2]);
    });
  });
});
