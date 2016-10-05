export default {
  strings: 6,
  keys: [ 'C', 'D', 'E', 'F', 'G', 'A', 'B' ],
  tunnings: {
    standard: [ 'E', 'B', 'G', 'D', 'A', 'E' ]
  },
  types: [ {
    suffix: 'major',
    alternate: ['maj', 'M'],
    name: 'major'
  },
  {
    suffix: '5',
    name: 'fifth'
  },
  {
    suffix: 'sus4',
    name: 'suspended fourth'
  },
  {
    suffix: 'sus2',
    name: 'suspended second'
  },
  {
    suffix: 'add9',
    name: 'added ninth'
  },
  {
    suffix: '6',
    alternate: ['maj6', 'major6', 'M6'],
    name: 'sixth'
  },
  {
    suffix: '6/9',
    name: 'sixth, added ninth'
  },
  {
    suffix: 'maj7',
    name: 'major seventh'
  },
  {
    suffix: 'maj9',
    name: 'major ninth'
  },
  {
    suffix: 'maj7#11',
    name: 'major seventh, sharp eleventh'
  },
  {
    suffix: 'maj13',
    name: 'major thirteenth'
  },
  {
    suffix: 'm',
    name: 'minor'
  },
  {
    suffix: 'm(add9)',
    name: 'minor, added ninth'
  },
  {
    suffix: 'm6',
    name: 'minor sixth'
  },
  {
    suffix: 'mb6',
    name: 'minor, flat sixth'
  },
  {
    suffix: 'm6/9',
    name: 'minor sixth, added ninth'
  },
  {
    suffix: 'm7',
    name: 'minor seventh'
  },
  {
    suffix: 'm7b5',
    name: 'minor seventh, flat fifth'
  },
  {
    suffix: 'm(maj7)',
    name: 'minor, major seventh'
  },
  {
    suffix: 'm9',
    name: 'minor ninth'
  },
  {
    suffix: 'm9b5',
    name: 'minor ninth, flat fifth'
  },
  {
    suffix: 'm9(maj7)',
    name: 'minor ninth, major seventh'
  },
  {
    suffix: 'm11',
    name: 'minor eleventh'
  },
  {
    suffix: 'm13',
    name: 'minor thirteenth'
  },
  {
    suffix: '7',
    name: 'dominant seventh'
  },
  {
    suffix: '7sus4',
    name: 'seventh, suspended fourth'
  },
  {
    suffix: '7b5',
    name: 'seventh, flat fifth'
  },
  {
    suffix: '9',
    name: 'ninth'
  },
  {
    suffix: '9sus4',
    name: 'ninth, suspended fourth'
  },
  {
    suffix: '9b5',
    name: 'ninth, flat fifth'
  },
  {
    suffix: '7b9',
    name: 'seventh, flat ninth'
  },
  {
    suffix: '7#9',
    name: 'seventh, sharp ninth'
  },
  {
    suffix: '7b5(#9)',
    name: 'seventh, flat fifth, sharp ninth'
  },
  {
    suffix: '11',
    name: 'eleventh'
  },
  {
    suffix: '7#11',
    name: 'seventh, sharp eleventh'
  },
  {
    suffix: '13',
    name: 'thirteenth'
  },
  {
    suffix: '13sus4',
    name: 'thirteenth, suspended fourth'
  },
  {
    suffix: 'aug',
    name: 'augmented'
  },
  {
    suffix: 'aug7',
    name: 'seventh, sharp fifth'
  },
  {
    suffix: 'aug9',
    name: 'ninth, sharp fifth'
  },
  {
    suffix: 'aug7b9',
    name: 'seventh, sharp fifth, flat ninth'
  },
  {
    suffix: 'aug7#9',
    name: 'seventh, sharp fifth, sharp ninth'
  },
  {
    suffix: 'dim',
    name: 'diminished'
  },
  {
    suffix: 'dim7',
    name: 'diminished seventh'
  }],
  chords: {
    'E': [{
      key: 'E',
      suffix: 'major',
      positions: [{
        frets: [ 0, 0, 1, 2, 2, 0 ],
        fingers: [ 0, 0, 1, 3, 2, 0 ],
        barres: []
      }]
    },
    {
      key: 'E',
      suffix: '5',
      positions: [{
        frets: [ 0, 3, 2, -1, -1, -1 ],
        fingers: [ 0, 2, 1, 0, 0, 0 ],
        barres: []
      }]
    },
    {
      key: 'E',
      suffix: '6',
      positions: [{
        frets: [ 0, 2, 1, 2, 2, 0 ],
        fingers: [ 0, 4, 1, 3, 2, 0 ],
        barres: []
      }]
    },
    {
      key: 'E',
      suffix: '7',
      positions: [{
        frets: [ 0, 0, 1, 0, 2, 0 ],
        fingers: [ 0, 0, 1, 0, 2, 0 ],
        barres: []
      }]
    },
    {
      key: 'E',
      suffix: 'maj7',
      positions: [{
        frets: [ 0, 0, 1, 1, 2, 0 ],
        fingers: [ 0, 0, 2, 1, 3, 0 ],
        barres: []
      }]
    },
    {
      key: 'E',
      suffix: '9',
      positions: [{
        frets: [ 2, 0, 1, 0, 2, 0 ],
        fingers: [ 3, 0, 1, 0, 2, 0 ],
        barres: []
      }]
    },
    {
      key: 'E',
      suffix: 'maj9',
      positions: [{
        frets: [ 4, 4, 4, 4, 2, 0 ],
        fingers: [ 3, 3, 3, 3, 1, 0 ],
        barres: [{ fret: 4, strings: [ 1, 4 ] }]
      }]
    },
    {
      key: 'E',
      suffix: '11',
      positions: [{
        frets: [ 2, 3, 1, 2, 0, 0 ],
        fingers: [ 3, 4, 1, 2, 0, 0 ],
        barres: []
      }]
    },
    {
      key: 'E',
      suffix: '13',
      positions: [{
        frets: [ 2, 2, 1, 0, 2, 0 ],
        fingers: [ 4, 3, 1, 0, 2, 0 ],
        barres: []
      }]
    },
    {
      key: 'E',
      suffix: 'maj13',
      positions: [{
        frets: [ 2, 2, 1, 1, 2, 0 ],
        fingers: [ 3, 3, 1, 1, 2, 0 ],
        barres: [{ fret: 2, strings: [ 1, 2 ] }, { fret: 1, strings: [ 3, 4 ] }]
      }]
    },
    {
      key: 'E',
      suffix: 'minor',
      positions: [{
        frets: [ 0, 0, 0, 2, 2, 0 ],
        fingers: [ 0, 0, 0, 3, 2, 0 ],
        barres: []
      }]
    },
    {
      key: 'E',
      suffix: 'm6',
      positions: [{
        frets: [ 0, 2, 0, 2, 2, 0 ],
        fingers: [ 0, 4, 0, 3, 2, 0 ],
        barres: []
      }]
    },
    {
      key: 'E',
      suffix: 'm7',
      positions: [{
        frets: [ 0, 0, 0, 0, 2, 0 ],
        fingers: [ 0, 0, 0, 0, 2, 0 ],
        barres: []
      }]
    },
    {
      key: 'E',
      suffix: 'm9',
      positions: [{
        frets: [ 2, 0, 0, 0, 2, 0 ],
        fingers: [ 3, 0, 0, 0, 2, 0 ],
        barres: []
      }]
    },
    {
      key: 'E',
      suffix: 'm11',
      positions: [{
        frets: [ 0, 0, 0, 0, 0, 0 ],
        fingers: [ 0, 0, 0, 0, 0, 0 ],
        barres: []
      }]
    },
    {
      key: 'E',
      suffix: 'm13',
      positions: [{
        frets: [ 2, 2, 0, 0, 2, 0 ],
        fingers: [ 4, 3, 0, 0, 2, 0 ],
        barres: []
      }]
    },
    {
      key: 'E',
      suffix: 'm(maj7)',
      positions: [{
        frets: [ 0, 0, 0, 1, 2, 0 ],
        fingers: [ 0, 0, 0, 1, 2, 0 ],
        barres: []
      }]
    },
    {
      key: 'E',
      suffix: 'sus2',
      positions: [{
        frets: [ 2, 5, 4, 2, -1, -1 ],
        fingers: [ 1, 4, 3, 1, 0, 0 ],
        barres: [{ fret: 2, strings: [ 1, 4 ] }]
      }]
    },
    {
      key: 'E',
      suffix: 'sus4',
      positions: [{
        frets: [ 0, 0, 2, 2, 2, 0 ],
        fingers: [ 0, 0, 4, 3, 2, 0 ],
        barres: []
      }]
    },
    {
      key: 'E',
      suffix: 'dim',
      positions: [{
        frets: [ 3, 2, 3, 2, -1, -1 ],
        fingers: [ 4, 2, 3, 1, 0, 0 ],
        barres: []
      }]
    },
    {
      key: 'E',
      suffix: 'aug',
      positions: [{
        frets: [ 0, 1, 1, 2, -1, -1 ],
        fingers: [ 0, 2, 1, 3, 0, 0 ],
        barres: []
      }]
    },
    {
      key: 'E',
      suffix: '6/9',
      positions: [{
        frets: [ 2, 2, 1, -1, 2, 0 ],
        fingers: [ 4, 3, 1, 0, 2, 0 ],
        barres: []
      }]
    },
    {
      key: 'E',
      suffix: '7sus4',
      positions: [{
        frets: [ -1, 3, 2, 2, 2, -1 ],
        fingers: [ 0, 3, 1, 1, 1, 0 ],
        barres: [{ fret: 2, strings: [3, 5] }]
      }]
    },
    {
      key: 'E',
      suffix: '7b5',
      positions: [{
        frets: [ 4, 3, 3, 2, -1, -1 ],
        fingers: [ 4, 2, 2, 1, 0, 0 ],
        barres: []
      }]
    },
    {
      key: 'E',
      suffix: '7b9',
      positions: [{
        frets: [ -1, 3, 1, 3, 2, 0 ],
        fingers: [ 0, 4, 1, 3, 2, 0 ],
        barres: []
      }]
    },
    {
      key: 'E',
      suffix: '9sus4',
      positions: [{
        frets: [ 2, 3, 2, 2, 2, -1 ],
        fingers: [ 1, 2, 1, 1, 1, 0 ],
        barres: [{ fret: 2, strings: [ 1, 5 ] }]
      }]
    },
    {
      key: 'E',
      suffix: 'add9',
      positions: [{
        frets: [ 2, 0, 1, 2, 2, 0 ],
        fingers: [ 4, 0, 1, 3, 2, 0 ],
        barres: []
      }]
    },
    {
      key: 'E',
      suffix: 'aug9',
      positions: [{
        frets: [ 2, 1, 1, 0, 3, 0 ],
        fingers: [ 2, 1, 1, 0, 3, 0 ],
        barres: [{ fret: 1, strings: [ 2, 3 ] }]
      }]
    }],
    'F': [{
      key: 'F',
      suffix: 'major',
      positions: [{
        frets: [ 1, 1, 2, 3, 3, 1 ],
        fingers: [ 1, 1, 2, 4, 3, 1 ],
        barres: [{ fret: 1, strings: [ 1, 6 ] }]
      }]
    }],
    'G': [{
      key: 'G',
      suffix: 'major',
      positions: [{
        frets: [ 3, 0, 0, 0, 2, 3 ],
        fingers: [ 4, 0, 0, 0, 2, 3 ],
        barres: []
      }]
    },
    {
      key: 'G',
      suffix: '7',
      positions: [{
        frets: [ 1, 0, 0, 0, 2, 3 ],
        fingers: [ 1, 0, 0, 0, 2, 3 ],
        barres: []
      }]
    }],
    'A': [{
      key: 'A',
      suffix: 'major',
      positions: [{
        frets: [ 0, 2, 2, 2, 0, -1 ],
        fingers: [ 0, 4, 3, 2, 0, 0 ],
        barres: []
      }]
    },
    {
      key: 'A',
      suffix: 'minor',
      positions: [{
        frets: [ 0, 1, 2, 2, 0, -1 ],
        fingers: [ 0, 1, 3, 2, 0, 0 ],
        barres: []
      }]
    },
    {
      key: 'A',
      suffix: '7',
      positions: [{
        frets: [ 0, 2, 0, 2, 0, -1 ],
        fingers: [ 0, 3, 0, 2, 0, 0 ],
        barres: []
      }]
    },
    {
      key: 'A',
      suffix: 'm7',
      positions: [{
        frets: [ 0, 1, 0, 2, 0, -1 ],
        fingers: [ 0, 1, 0, 2, 0, 0 ],
        barres: []
      }]
    }],
    'B': [{
      key: 'B',
      suffix: 'major',
      positions: [{
        frets: [ 2, 4, 4, 4, 2, -1 ],
        fingers: [ 1, 4, 3, 2, 1, 0 ],
        barres: [{ fret: 2, strings: [ 1, 5 ] }]
      }]
    }],
    'C': [{
      key: 'C',
      suffix: 'major',
      positions: [{
        frets: [ 0, 1, 0, 2, 3, -1 ],
        fingers: [ 0, 1, 0, 2, 3, 0 ],
        barres: []
      },
      {
        frets: [ -1, 5, 5, 5, 3, -1 ],
        fingers: [ 0, 3, 3, 3, 1, 0 ],
        barres: [{ fret: 5, strings: [ 2, 4 ] }]
      },
      {
        frets: [ -1, 5, 5, 5, 7, -1 ],
        fingers: [ 0, 1, 1, 1, 3, 0 ],
        barres: [{ fret: 5, strings: [ 2, 4 ] }]
      },
      {
        frets: [ 8, 8, 9, 10, 10, 8 ],
        fingers: [ 1, 1, 2, 4, 3, 1 ],
        barres: [{ fret: 8, strings: [ 1, 6 ] }]
      },
      {
        frets: [ 12, 13, 12, 10, -1, -1 ],
        fingers: [ 3, 4, 2, 1, 0, 0 ],
        barres: []
      }]
    },
    {
      key: 'C',
      suffix: '6',
      positions: [{
        frets: [ -1, 1, 2, 2, 3, -1 ],
        fingers: [ 0, 1, 3, 2, 4, 0 ],
        barres: []
      },
      {
        frets: [ 5, 5, 5, 5, 3, -1 ],
        fingers: [ 3, 3, 3, 3, 1, 0 ],
        barres: [{ fret: 5, strings: [ 1, 4 ] }]
      },
      {
        frets: [ 8, 5, 5, 7, -1, -1 ],
        fingers: [ 4, 1, 1, 3, 0, 0 ],
        barres: [{ fret: 5, strings: [ 2, 3 ] }]
      },
      {
        frets: [ 8, 10, 9, 10, -1, -1 ],
        fingers: [ 1, 4, 2, 3, 0, 0 ],
        barres: []
      },
      {
        frets: [ 12, 10, 12, 10, -1, -1 ],
        fingers: [ 4, 1, 3, 1, 0, 0 ],
        barres: [{ fret: 10, strings: [ 2, 4 ] }]
      }]
    },
    {
      key: 'C',
      suffix: '5',
      positions: [{
        frets: [ -1, -1, 5, 5, 3, -1 ],
        fingers: [ 0, 0, 3, 2, 1, 0 ],
        barres: []
      }]
    },
    {
      key: 'C',
      suffix: '7',
      positions: [{
        frets: [ 0, 1, 3, 2, 3, -1 ],
        fingers: [ 0, 1, 4, 2, 3, 0 ],
        barres: []
      }]
    },
    {
      key: 'C',
      suffix: 'maj7',
      positions: [{
        frets: [ 0, 0, 0, 2, 3, -1 ],
        fingers: [ 0, 0, 0, 2, 3, 0 ],
        barres: []
      },
      {
        frets: [ 3, 5, 4, 5, 3, -1 ],
        fingers: [ 1, 4, 2, 3, 1, 0 ],
        barres: [{ fret: 3, strings: [ 1, 5 ] }]
      },
      {
        frets: [ 7, 5, 5, 5, -1, -1 ],
        fingers: [ 3, 1, 1, 1, 0, 0 ],
        barres: [{ fret: 5, strings: [ 2, 4 ] }]
      },
      {
        frets: [ -1, 8, 9, 9, -1, 8 ],
        fingers: [ 0, 2, 4, 3, 0, 1 ],
        barres: []
      },
      {
        frets: [ 12, 12, 12, 10, -1, -1 ],
        fingers: [ 3, 3, 3, 1, 0, 0 ],
        barres: [{ fret: 12, strings: [ 1, 3 ] }]
      }]
    }],
    'D': [{
      key: 'D',
      suffix: 'major',
      positions: [{
        frets: [ 2, 3, 2, 0, -1, -1 ],
        fingers: [ 2, 3, 1, 0, 0, 0 ],
        barres: []
      }]
    },
    {
      key: 'D',
      suffix: 'minor',
      positions: [{
        frets: [ 1, 3, 2, 0, -1, -1 ],
        fingers: [ 1, 3, 2, 0, 0, 0 ],
        barres: []
      }]
    },
    {
      key: 'D',
      suffix: '7',
      positions: [{
        frets: [ 2, 1, 2, 0, -1, -1 ],
        fingers: [ 3, 1, 2, 0, 0, 0 ],
        barres: []
      }]
    },
    {
      key: 'D',
      suffix: 'm7',
      positions: [{
        frets: [ 1, 1, 2, 0, -1, -1 ],
        fingers: [ 1, 1, 2, 0, 0, 0 ],
        barres: [{ fret: 1, strings: [ 1, 2 ] }]
      }]
    }]
  }
}
