/* global it, describe, expect */

import cavaquinho from './cavaquinho';
import { chord2midi, processString } from '../tools';

const noteNumbers = {
  C: 0,
  Db: 1,
  D: 2,
  Eb: 3,
  E: 4,
  F: 5,
  Gb: 6,
  G: 7,
  Ab: 8,
  A: 9,
  Bb: 10,
  B: 11,
};

const getChord = (key, suffix) =>
  cavaquinho.chords[key].find((chord) => chord.suffix === suffix);

const frets = (position) => processString(position.frets);
const fingers = (position) => processString(position.fingers);

const shiftFrets = (values, shift, shiftOpenStrings = false) =>
  values.map((fret) => (fret > 0 || shiftOpenStrings ? fret + shift : fret));

const relativeBarres = (position) => {
  if (!position.barres) return [];
  const values = Array.isArray(position.barres) ? position.barres : [position.barres];
  const fretted = frets(position).filter((fret) => fret > 0);
  const min = Math.min(...fretted);
  return values.map((barre) => barre - min);
};

describe('cavaquinho Chords', () => {
  describe('Strings', () => {
    it('Should have 4 strings', () => expect(cavaquinho.main.strings).toEqual(4));
  });

  describe('D minor fingering', () => {
    const position = getChord('D', 'minor').positions[1];

    it('position 2 should use four independent fingers', () => {
      expect(frets(position)).toEqual(processString('3233'));
      expect(fingers(position)).toEqual(processString('2134'));
      expect(position.barres).toBeUndefined();
      expect(position.capo).toBeUndefined();
    });
  });

  describe('Dominant 7 positions', () => {
    const expandedPositionCounts = {
      A: 12,
      B: 12,
      C: 12,
      D: 12,
      E: 12,
      F: 12,
      G: 12,
    };

    Object.keys(cavaquinho.chords).map((key) => {
      const seventh = getChord(key, '7');
      const chordTones = [
        noteNumbers[key],
        (noteNumbers[key] + 4) % 12,
        (noteNumbers[key] + 7) % 12,
        (noteNumbers[key] + 10) % 12,
      ];

      it(`${key} 7 should exist`, () => expect(seventh).toBeDefined());

      if (expandedPositionCounts[key]) {
        it(`${key} 7 should have every page position`, () =>
          expect(seventh.positions).toHaveLength(expandedPositionCounts[key]));
      }

      seventh.positions.map((position, index) => {
        it(`${key} 7 position ${index + 1} should contain only dominant-7 chord tones`, () => {
          const notes = chord2midi(frets(position), cavaquinho.tunings.standard);
          expect(notes.every((note) => chordTones.includes(note % 12))).toEqual(true);
        });
      });
    });
  });

  describe('Minor 7 positions', () => {
    const expandedPositionCounts = {
      A: 11,
      B: 11,
      C: 11,
      D: 11,
      E: 11,
      F: 11,
      G: 11,
    };

    Object.keys(cavaquinho.chords).map((key) => {
      const minorSeventh = getChord(key, 'm7');
      const chordTones = [
        noteNumbers[key],
        (noteNumbers[key] + 3) % 12,
        (noteNumbers[key] + 7) % 12,
        (noteNumbers[key] + 10) % 12,
      ];

      it(`${key} m7 should exist`, () => expect(minorSeventh).toBeDefined());

      if (expandedPositionCounts[key]) {
        it(`${key} m7 should have every page position`, () =>
          expect(minorSeventh.positions).toHaveLength(expandedPositionCounts[key]));
      }

      minorSeventh.positions.map((position, index) => {
        it(`${key} m7 position ${index + 1} should contain only minor-7 chord tones`, () => {
          const notes = chord2midi(frets(position), cavaquinho.tunings.standard);
          expect(notes.every((note) => chordTones.includes(note % 12))).toEqual(true);
        });
      });
    });
  });

  describe('Major 7 positions', () => {
    const expandedPositionCounts = {
      A: 11,
      Ab: 11,
      B: 11,
      Bb: 11,
      C: 11,
      Db: 11,
      D: 11,
      Eb: 11,
      E: 11,
      F: 11,
      Gb: 11,
      G: 11,
    };

    Object.keys(cavaquinho.chords).map((key) => {
      const majorSeventh = getChord(key, 'maj7');
      const chordTones = [
        noteNumbers[key],
        (noteNumbers[key] + 4) % 12,
        (noteNumbers[key] + 7) % 12,
        (noteNumbers[key] + 11) % 12,
      ];

      it(`${key} maj7 should exist`, () => expect(majorSeventh).toBeDefined());

      if (expandedPositionCounts[key]) {
        it(`${key} maj7 should have every page position`, () =>
          expect(majorSeventh.positions).toHaveLength(expandedPositionCounts[key]));
      }

      majorSeventh.positions.map((position, index) => {
        it(`${key} maj7 position ${index + 1} should contain only major-7 chord tones`, () => {
          const notes = chord2midi(frets(position), cavaquinho.tunings.standard);
          expect(notes.every((note) => chordTones.includes(note % 12))).toEqual(true);
        });
      });
    });
  });

  describe('Dominant 9 positions', () => {
    const expandedPositionCounts = {
      A: 10,
      Ab: 10,
      B: 10,
      Bb: 10,
      C: 10,
      Db: 10,
      D: 10,
      Eb: 10,
      E: 10,
      F: 10,
      Gb: 8,
      G: 10,
    };

    Object.keys(cavaquinho.chords).map((key) => {
      const ninth = getChord(key, '9');
      const chordTones = [
        noteNumbers[key],
        (noteNumbers[key] + 2) % 12,
        (noteNumbers[key] + 4) % 12,
        (noteNumbers[key] + 7) % 12,
        (noteNumbers[key] + 10) % 12,
      ];

      it(`${key} 9 should exist`, () => expect(ninth).toBeDefined());

      if (expandedPositionCounts[key]) {
        it(`${key} 9 should have every page position`, () =>
          expect(ninth.positions).toHaveLength(expandedPositionCounts[key]));
      }

      ninth.positions.map((position, index) => {
        it(`${key} 9 position ${index + 1} should contain only dominant-9 chord tones`, () => {
          const notes = chord2midi(frets(position), cavaquinho.tunings.standard);
          expect(notes.every((note) => chordTones.includes(note % 12))).toEqual(true);
        });
      });
    });
  });

  describe('Diminished positions', () => {
    const expandedPositionCounts = {
      A: 12,
      Ab: 12,
      B: 12,
      Bb: 12,
      C: 12,
      Db: 12,
      D: 12,
      Eb: 12,
      E: 12,
      F: 12,
      Gb: 12,
      G: 12,
    };

    Object.keys(cavaquinho.chords).map((key) => {
      const diminished = getChord(key, 'dim');
      const chordTones = [
        noteNumbers[key],
        (noteNumbers[key] + 3) % 12,
        (noteNumbers[key] + 6) % 12,
        (noteNumbers[key] + 9) % 12,
      ];

      it(`${key} dim should exist`, () => expect(diminished).toBeDefined());

      if (expandedPositionCounts[key]) {
        it(`${key} dim should have every page position`, () =>
          expect(diminished.positions).toHaveLength(expandedPositionCounts[key]));
      }

      diminished.positions.map((position, index) => {
        it(`${key} dim position ${index + 1} should contain only diminished-seventh chord tones`, () => {
          const notes = chord2midi(frets(position), cavaquinho.tunings.standard);
          expect(notes.every((note) => chordTones.includes(note % 12))).toEqual(true);
        });
      });
    });
  });

  describe('Natural-key major 7 correspondent shapes', () => {
    const compareShift = (fromKey, toKey, shift, positionNumber, shiftOpenStrings = false) => {
      const from = getChord(fromKey, 'maj7').positions;
      const to = getChord(toKey, 'maj7').positions;
      const index = positionNumber - 1;

      it(`${toKey}maj7 position ${positionNumber} should match ${fromKey}maj7 frets shifted by ${shift}`, () =>
        expect(frets(to[index])).toEqual(
          shiftFrets(frets(from[index]), shift, shiftOpenStrings)
        ));
    };

    const comparePair = (fromKey, toKey, shifts, openShiftPositions = []) => {
      shifts.map((shift, index) =>
        compareShift(fromKey, toKey, shift, index + 1, openShiftPositions.includes(index + 1))
      );
    };

    comparePair('C', 'G', [-5, -5, -5, 7, 7, 7, 7, -5, -5, -5, -5], [4]);
    comparePair('G', 'D', [7, -5, -5, -5, -5, -5, -5, 7, 7, 7, 7], [8, 9]);
    comparePair('D', 'A', [-5, 7, 7, 7, 7, 7, 7, -5, -5, -5, -5], [2, 3]);
    comparePair('A', 'E', [-5, -5, -5, -5, -5, -5, -5, 7, 7, -5, -5]);
    comparePair('E', 'B', [7, 7, 7, 7, -5, -5, -5, -5, -5, 7, 7], [1, 10, 11]);
    comparePair('B', 'F', [-6, -6, -6, -6, 6, 6, 6, 6, 6, 6, 6], [5, 6]);

    ['C', 'D', 'A', 'E', 'B', 'F'].map((key) => {
      const positions = getChord(key, 'maj7').positions;

      [8, 9].map((positionNumber) => {
        const index = positionNumber - 1;

        it(`${key}maj7 position ${positionNumber} should preserve source barre/capo semantics`, () => {
          expect(relativeBarres(positions[index])).toEqual([0]);
          expect(positions[index].capo).toEqual(true);
        });
      });
    });
  });

  describe('Accidental-key major 7 correspondent shapes', () => {
    const compareShift = (fromKey, toKey, shift, positionNumber, options = {}) => {
      const from = getChord(fromKey, 'maj7').positions;
      const to = getChord(toKey, 'maj7').positions;
      const index = positionNumber - 1;

      it(`${toKey}maj7 position ${positionNumber} should match ${fromKey}maj7 frets shifted by ${shift}`, () =>
        expect(frets(to[index])).toEqual(
          shiftFrets(frets(from[index]), shift, options.shiftOpenStrings)
        ));

      it(`${toKey}maj7 position ${positionNumber} should match ${fromKey}maj7 fingering`, () =>
        expect(fingers(to[index])).toEqual(
          processString(options.expectedFingers || from[index].fingers)
        ));
    };

    const comparePair = (fromKey, toKey, shifts, optionsByPosition = {}) => {
      shifts.map((shift, index) =>
        compareShift(fromKey, toKey, shift, index + 1, optionsByPosition[index + 1])
      );
    };

    comparePair('B', 'Gb', [-5, -5, -5, -5, 7, 7, 7, 7, 7, -5, -5], {
      5: { shiftOpenStrings: true, expectedFingers: '2134' },
      6: { shiftOpenStrings: true, expectedFingers: '4312' },
    });
    comparePair('Gb', 'Db', [7, 7, 7, 7, -5, -5, -5, -5, -5, 7, 7]);

    [1, 2, 3, 4, 7].map((positionNumber) => {
      compareShift('F', 'Bb', 5, positionNumber);
    });
    [8, 9, 10, 11].map((positionNumber) => {
      compareShift('F', 'Bb', -7, positionNumber);
    });

    [1].map((positionNumber) => {
      compareShift('Bb', 'Eb', 5, positionNumber);
    });
    [2, 3, 4, 7].map((positionNumber) => {
      compareShift('Bb', 'Eb', -7, positionNumber);
    });
    [8, 9, 10, 11].map((positionNumber) => {
      compareShift('Bb', 'Eb', 5, positionNumber);
    });

    comparePair('Eb', 'Ab', [-7, 5, 5, 5, 5, 5, -7, -7, -7, -7, -7], {
      7: { expectedFingers: '1023' },
    });

    const sourceExceptions = {
      Bb: {
        5: { frets: 'febc', fingers: '4312' },
        6: { frets: 'cebf', fingers: '2134' },
      },
      Eb: {
        5: { frets: '5748', fingers: '2314' },
        6: { frets: '8745', fingers: '4312' },
      },
    };

    Object.keys(sourceExceptions).map((key) => {
      const positions = getChord(key, 'maj7').positions;

      Object.keys(sourceExceptions[key]).map((positionNumber) => {
        const index = Number(positionNumber) - 1;
        const expected = sourceExceptions[key][positionNumber];

        it(`${key}maj7 position ${positionNumber} should preserve image-confirmed exception frets`, () =>
          expect(frets(positions[index])).toEqual(processString(expected.frets)));

        it(`${key}maj7 position ${positionNumber} should preserve image-confirmed exception fingering`, () =>
          expect(fingers(positions[index])).toEqual(processString(expected.fingers)));
      });
    });

    ['Gb', 'Db', 'Bb', 'Eb', 'Ab'].map((key) => {
      const positions = getChord(key, 'maj7').positions;

      [8, 9].map((positionNumber) => {
        const index = positionNumber - 1;

        it(`${key}maj7 position ${positionNumber} should preserve source barre/capo semantics`, () => {
          expect(relativeBarres(positions[index])).toEqual([0]);
          expect(positions[index].capo).toEqual(true);
        });
      });
    });
  });

  describe('Natural-key dominant 9 correspondent shapes', () => {
    const compareShift = (fromKey, toKey, shifts, optionsByPosition = {}) => {
      const from = getChord(fromKey, '9').positions;
      const to = getChord(toKey, '9').positions;

      shifts.map((shift, index) => {
        const positionNumber = index + 1;
        const options = optionsByPosition[positionNumber] || {};

        it(`${toKey}9 position ${positionNumber} should match ${fromKey}9 frets shifted by ${shift}`, () =>
          expect(frets(to[index])).toEqual(
            shiftFrets(frets(from[index]), shift, options.shiftOpenStrings)
          ));
      });
    };

    compareShift('C', 'G', [-5, -5, 7, -5, 7, -5, -5, -5, 7, -5], {
      3: { shiftOpenStrings: true },
      9: { shiftOpenStrings: true },
    });
    compareShift('G', 'D', [7, -5, -5, -5, -5, 7, 7, 7, -5, 7], {
      6: { shiftOpenStrings: true },
      7: { shiftOpenStrings: true },
      8: { shiftOpenStrings: true },
    });
    compareShift('D', 'A', [-5, 7, 7, 7, 7, -5, -5, -5, 7, -5], {
      2: { shiftOpenStrings: true },
      4: { shiftOpenStrings: true },
    });
    compareShift('A', 'E', [-5, -5, -5, -5, -5, 7, 7, 7, -5, -5]);
    compareShift('E', 'B', [7, 7, 7, 7, -5, -5, -5, -5, 7, 7], {
      1: { shiftOpenStrings: true },
      10: { shiftOpenStrings: true },
    });
    compareShift('B', 'F', [-6, -6, -6, -6, 6, 6, 6, 6, -6, -6]);

    ['C', 'G', 'D', 'A', 'E', 'B', 'F'].map((key) => {
      const positions = getChord(key, '9').positions;

      [6, 7, 8, 9].map((positionNumber) => {
        const index = positionNumber - 1;

        it(`${key}9 position ${positionNumber} should preserve source barre/capo semantics when barred`, () => {
          if (positions[index].barres) {
            expect(relativeBarres(positions[index])).toEqual([0]);
            expect(positions[index].capo).toEqual(true);
          }
        });
      });
    });
  });

  describe('Accidental-key dominant 9 correspondent shapes', () => {
    const compareShift = (fromKey, toKey, fromPositionNumber, toPositionNumber, shift, options = {}) => {
      const from = getChord(fromKey, '9').positions;
      const to = getChord(toKey, '9').positions;
      const fromIndex = fromPositionNumber - 1;
      const toIndex = toPositionNumber - 1;

      it(`${toKey}9 position ${toPositionNumber} should match ${fromKey}9 position ${fromPositionNumber} frets shifted by ${shift}`, () =>
        expect(frets(to[toIndex])).toEqual(
          shiftFrets(frets(from[fromIndex]), shift, options.shiftOpenStrings)
        ));

      it(`${toKey}9 position ${toPositionNumber} should match ${fromKey}9 position ${fromPositionNumber} fingering`, () =>
        expect(fingers(to[toIndex])).toEqual(
          processString(options.expectedFingers || from[fromIndex].fingers)
        ));
    };

    const compareMapped = (fromKey, toKey, mappings) => {
      mappings.map((mapping) =>
        compareShift(fromKey, toKey, mapping.from, mapping.to, mapping.shift, mapping.options)
      );
    };

    compareMapped('B', 'Gb', [
      { from: 1, to: 1, shift: -5 },
      { from: 2, to: 2, shift: -5 },
      { from: 3, to: 3, shift: -5 },
      { from: 4, to: 4, shift: -5 },
      { from: 5, to: 5, shift: 7 },
      { from: 6, to: 6, shift: 7 },
      { from: 9, to: 7, shift: -5 },
      { from: 10, to: 8, shift: -5 },
    ]);

    compareMapped('Gb', 'Db', [
      { from: 1, to: 1, shift: 7 },
      { from: 2, to: 2, shift: 7 },
      { from: 3, to: 3, shift: 7 },
      { from: 4, to: 4, shift: 7 },
      { from: 5, to: 5, shift: -5 },
      { from: 6, to: 6, shift: -5 },
    ]);

    compareMapped('B', 'Db', [
      { from: 7, to: 7, shift: 2 },
      { from: 8, to: 8, shift: 2 },
      { from: 9, to: 9, shift: 2 },
      { from: 10, to: 10, shift: 2 },
    ]);

    compareMapped('F', 'Bb', [
      { from: 1, to: 1, shift: 5 },
      { from: 2, to: 2, shift: 5 },
      { from: 3, to: 3, shift: 5 },
      { from: 4, to: 4, shift: 5 },
      { from: 5, to: 5, shift: -7, options: { expectedFingers: '0213' } },
      { from: 6, to: 6, shift: -7 },
      { from: 7, to: 7, shift: -7 },
      { from: 8, to: 8, shift: -7 },
      { from: 9, to: 9, shift: 5 },
      { from: 10, to: 10, shift: 5 },
    ]);

    compareMapped('Bb', 'Eb', [
      { from: 1, to: 1, shift: 5 },
      { from: 2, to: 2, shift: 5 },
      { from: 3, to: 3, shift: -7 },
      { from: 4, to: 4, shift: -7 },
      { from: 5, to: 5, shift: 5, options: { shiftOpenStrings: true, expectedFingers: '1324' } },
      { from: 6, to: 6, shift: 5 },
      { from: 7, to: 7, shift: 5 },
      { from: 8, to: 8, shift: 5 },
      { from: 9, to: 9, shift: -7 },
      { from: 10, to: 10, shift: 5 },
    ]);

    compareMapped('Eb', 'Ab', [
      { from: 1, to: 1, shift: -7 },
      { from: 2, to: 2, shift: -7 },
      { from: 3, to: 3, shift: 5 },
      { from: 4, to: 4, shift: 5 },
      { from: 5, to: 5, shift: 5 },
      { from: 6, to: 6, shift: -7 },
      { from: 7, to: 7, shift: -7 },
      { from: 8, to: 8, shift: -7 },
      { from: 9, to: 9, shift: 5 },
      { from: 10, to: 10, shift: -7 },
    ]);

    ['Gb', 'Db', 'Bb', 'Eb', 'Ab'].map((key) => {
      const positions = getChord(key, '9').positions;

      [3, 6, 7, 8, 9].map((positionNumber) => {
        const index = positionNumber - 1;

        if (!positions[index]) return;

        it(`${key}9 position ${positionNumber} should preserve source barre/capo semantics when barred`, () => {
          if (positions[index].barres) {
            expect(relativeBarres(positions[index])).toEqual([0]);
            expect(positions[index].capo).toEqual(true);
          }
        });
      });
    });
  });

  describe('Diminished source-register semantics', () => {
    const openPositionsByKey = {
      Ab: [8, 9, 10],
      B: [5, 6, 7],
      D: [2, 3, 4],
      F: [1, 11, 12],
    };

    Object.keys(openPositionsByKey).map((key) => {
      const positions = getChord(key, 'dim').positions;

      openPositionsByKey[key].map((positionNumber) => {
        const index = positionNumber - 1;

        it(`${key}dim position ${positionNumber} should preserve image-confirmed open-register frets`, () =>
          expect(frets(positions[index]).some((fret) => fret === 0)).toEqual(true));

        it(`${key}dim position ${positionNumber} should not add barre/capo to an open-register source shape`, () => {
          expect(positions[index].barres).toBeUndefined();
          expect(positions[index].capo).toBeUndefined();
        });
      });
    });

    Object.keys(noteNumbers).map((key) => {
      const openPositions = openPositionsByKey[key] || [];
      const positions = getChord(key, 'dim').positions;

      positions.map((position, index) => {
        const positionNumber = index + 1;

        if (openPositions.includes(positionNumber)) return;

        it(`${key}dim position ${positionNumber} should preserve closed-position barre/capo semantics`, () => {
          expect(relativeBarres(position)).toEqual([0]);
          expect(position.capo).toEqual(true);
        });
      });
    });
  });

  describe('C/D dominant 7 correspondent shapes', () => {
    const c7 = getChord('C', '7').positions;
    const d7 = getChord('D', '7').positions;
    const cFromDShifts = [-2, -2, 10, 10, 10, -2, -2, -2, -2, -2, -2, -2];
    const closedRegisterPositions = [3, 4];
    const expectedFingerExceptions = {
      3: '1324',
      4: '4312',
    };

    cFromDShifts.map((shift, index) => {
      it(`C7 position ${index + 1} should match D7 correspondent frets`, () =>
        expect(frets(c7[index])).toEqual(
          shiftFrets(frets(d7[index]), shift, closedRegisterPositions.includes(index + 1))
        ));

      it(`C7 position ${index + 1} should match D7 correspondent fingering`, () => {
        const expected = expectedFingerExceptions[index + 1] || d7[index].fingers;
        expect(fingers(c7[index])).toEqual(processString(expected));
      });
    });

    [1, 10, 11].map((positionNumber) => {
      const index = positionNumber - 1;

      it(`C7 position ${positionNumber} should match D7 relative barre semantics`, () => {
        expect(relativeBarres(c7[index])).toEqual(relativeBarres(d7[index]));
        expect(c7[index].capo).toEqual(d7[index].capo);
      });
    });
  });

  describe('A/B dominant 7 correspondent shapes', () => {
    const a7 = getChord('A', '7').positions;
    const b7 = getChord('B', '7').positions;
    const bFromAShifts = [2, 2, 2, 2, 2, -10, -10, -10, 2, 2, 2, 2];
    const lowRegisterPositions = [6, 7, 8, 9];
    const expectedFingerExceptions = {
      6: '1203',
      7: '1204',
      8: '4201',
      9: '1234',
    };

    bFromAShifts.map((shift, index) => {
      it(`B7 position ${index + 1} should match A7 correspondent frets`, () =>
        expect(frets(b7[index])).toEqual(
          shiftFrets(frets(a7[index]), shift, lowRegisterPositions.includes(index + 1))
        ));

      it(`B7 position ${index + 1} should match A7 correspondent fingering`, () =>
        expect(fingers(b7[index])).toEqual(
          processString(expectedFingerExceptions[index + 1] || a7[index].fingers)
        ));
    });

    [1, 10, 11].map((positionNumber) => {
      const index = positionNumber - 1;

      it(`B7 position ${positionNumber} should match A7 relative barre semantics`, () => {
        expect(relativeBarres(b7[index])).toEqual(relativeBarres(a7[index]));
        expect(b7[index].capo).toEqual(a7[index].capo);
      });
    });
  });

  describe('A/B minor 7 correspondent shapes', () => {
    const am7 = getChord('A', 'm7').positions;
    const bm7 = getChord('B', 'm7').positions;
    const bFromAShifts = [2, 2, 2, 2, -10, -10, -10, 2, 2, 2, 2];
    const lowRegisterPositions = [5, 6, 7, 8];
    const expectedFingerExceptions = {
      5: '0100',
      6: '0103',
      7: '3100',
      8: '3124',
    };

    bFromAShifts.map((shift, index) => {
      it(`Bm7 position ${index + 1} should match Am7 correspondent frets`, () =>
        expect(frets(bm7[index])).toEqual(
          shiftFrets(frets(am7[index]), shift, lowRegisterPositions.includes(index + 1))
        ));

      it(`Bm7 position ${index + 1} should match Am7 correspondent fingering`, () =>
        expect(fingers(bm7[index])).toEqual(
          processString(expectedFingerExceptions[index + 1] || am7[index].fingers)
        ));
    });

    [1, 5, 6, 7, 11].map((positionNumber) => {
      const index = positionNumber - 1;

      it(`Bm7 position ${positionNumber} should match Am7 relative barre semantics when both are fretted`, () => {
        if (am7[index].barres && bm7[index].barres) {
          expect(relativeBarres(bm7[index])).toEqual(relativeBarres(am7[index]));
          expect(bm7[index].capo).toEqual(am7[index].capo);
        }
      });
    });
  });

  describe('C/D minor 7 correspondent shapes', () => {
    const cm7 = getChord('C', 'm7').positions;
    const dm7 = getChord('D', 'm7').positions;
    const dFromCShifts = [2, 2, -10, 2, -10, 2, 2, 2, 2, 2, 2];
    const expectedFingerExceptions = {
      3: '0213',
    };

    dFromCShifts.map((shift, index) => {
      it(`Dm7 position ${index + 1} should match Cm7 correspondent frets`, () =>
        expect(frets(dm7[index])).toEqual(shiftFrets(frets(cm7[index]), shift)));

      it(`Dm7 position ${index + 1} should match Cm7 correspondent fingering`, () =>
        expect(fingers(dm7[index])).toEqual(
          processString(expectedFingerExceptions[index + 1] || cm7[index].fingers)
        ));
    });

    [1, 5, 6, 7, 11].map((positionNumber) => {
      const index = positionNumber - 1;

      it(`Dm7 position ${positionNumber} should match Cm7 relative barre semantics when both are fretted`, () => {
        if (cm7[index].barres && dm7[index].barres) {
          expect(relativeBarres(dm7[index])).toEqual(relativeBarres(cm7[index]));
          expect(dm7[index].capo).toEqual(cm7[index].capo);
        }
      });
    });
  });

  describe('E/F/G minor 7 correspondent shapes', () => {
    const em7 = getChord('E', 'm7').positions;
    const fm7 = getChord('F', 'm7').positions;
    const gm7 = getChord('G', 'm7').positions;

    const compareShift = (from, to, shift, positionNumber, options = {}) => {
      const index = positionNumber - 1;

      it(`position ${positionNumber} should match correspondent frets shifted by ${shift}`, () =>
        expect(frets(to[index])).toEqual(
          shiftFrets(frets(from[index]), shift, options.shiftOpenStrings)
        ));

      it(`position ${positionNumber} should match correspondent fingering`, () =>
        expect(fingers(to[index])).toEqual(
          processString(options.expectedFingers || from[index].fingers)
        ));
    };

    compareShift(em7, fm7, 1, 2, {
      shiftOpenStrings: true,
      expectedFingers: '2143',
    });
    compareShift(fm7, gm7, 2, 2);

    [3, 4, 5, 6, 7, 8, 9, 10].map((positionNumber) => {
      compareShift(em7, fm7, 1, positionNumber);
      compareShift(fm7, gm7, 2, positionNumber);
    });

    compareShift(fm7, gm7, 2, 1);

    compareShift(fm7, gm7, 2, 11, { shiftOpenStrings: true });

    [1, 5, 6, 7, 11].map((positionNumber) => {
      const index = positionNumber - 1;

      it(`Fm7 position ${positionNumber} should match Em7 relative barre semantics when both are fretted`, () => {
        if (em7[index].barres && fm7[index].barres) {
          expect(relativeBarres(fm7[index])).toEqual(relativeBarres(em7[index]));
          expect(fm7[index].capo).toEqual(em7[index].capo);
        }
      });

      it(`Gm7 position ${positionNumber} should match Fm7 relative barre semantics when both are fretted`, () => {
        if (fm7[index].barres && gm7[index].barres) {
          expect(relativeBarres(gm7[index])).toEqual(relativeBarres(fm7[index]));
          expect(gm7[index].capo).toEqual(fm7[index].capo);
        }
      });
    });
  });

  describe('E/F/G dominant 7 correspondent shapes', () => {
    const e7 = getChord('E', '7').positions;
    const f7 = getChord('F', '7').positions;
    const g7 = getChord('G', '7').positions;

    const compareShift = (from, to, shift, positionNumber, options = {}) => {
      const index = positionNumber - 1;

      it(`position ${positionNumber} should match correspondent frets shifted by ${shift}`, () =>
        expect(frets(to[index])).toEqual(
          shiftFrets(frets(from[index]), shift, options.shiftOpenStrings)
        ));

      it(`position ${positionNumber} should match correspondent fingering`, () =>
        expect(fingers(to[index])).toEqual(
          processString(options.expectedFingers || from[index].fingers)
        ));
    };

    [2, 3, 4, 5, 6, 7, 8, 9].map((positionNumber) => {
      compareShift(e7, f7, 1, positionNumber);
      compareShift(f7, g7, 2, positionNumber);
    });

    [10, 11].map((positionNumber) => {
      compareShift(e7, f7, 1, positionNumber);
    });

    [1, 12].map((positionNumber) => {
      compareShift(f7, g7, 2, positionNumber);
    });

    [1, 10, 11].map((positionNumber) => {
      const index = positionNumber - 1;

      it(`F7 position ${positionNumber} should match E7 relative barre semantics when both are fretted`, () => {
        if (e7[index].barres && f7[index].barres) {
          expect(relativeBarres(f7[index])).toEqual(relativeBarres(e7[index]));
          expect(f7[index].capo).toEqual(e7[index].capo);
        }
      });

      it(`G7 position ${positionNumber} should match F7 relative barre semantics when both are fretted`, () => {
        if (f7[index].barres && g7[index].barres) {
          expect(relativeBarres(g7[index])).toEqual(relativeBarres(f7[index]));
          expect(g7[index].capo).toEqual(f7[index].capo);
        }
      });
    });
  });
});
