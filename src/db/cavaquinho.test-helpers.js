import cavaquinho from './cavaquinho';
import { chord2midi, processString } from '../tools';
import { chordDefinitions } from './cavaquinho/chordTheory';

export const noteNumbers = {
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

export const suffixFormulaMap = Object.fromEntries(
  Object.entries(chordDefinitions).map(([suffix, definition]) => [
    suffix,
    {
      allowed: definition.sourceIntervals || definition.intervals,
      required: definition.sourceRequired || definition.essential,
    },
  ])
);

export const getChord = (key, suffix) =>
  cavaquinho.chords[key].find((chord) => chord.suffix === suffix);

export const frets = (position) => processString(position.frets);

export const fingers = (position) => processString(position.fingers);

export const relativeBarres = (position) => {
  if (!position.barres) return [];
  const values = Array.isArray(position.barres)
    ? position.barres
    : [position.barres];
  const fretted = frets(position).filter((fret) => fret > 0);
  const min = Math.min(...fretted);
  return values.map((barre) => barre - min);
};

export const positionSnapshot = (position) => ({
  frets: frets(position),
  fingers: fingers(position),
  ...(position.barres ? { barres: position.barres } : {}),
  ...(position.capo ? { capo: position.capo } : {}),
});

export const expectedSnapshot = (position) => ({
  frets: frets(position),
  fingers: fingers(position),
  ...(position.barres ? { barres: position.barres } : {}),
  ...(position.capo ? { capo: position.capo } : {}),
});

export const chordTones = (key, intervals) =>
  intervals.map((interval) => (noteNumbers[key] + interval) % 12);

export const positionNotes = (position) =>
  position.midi || chord2midi(frets(position), cavaquinho.tunings.standard);

export const positionPitchClasses = (position) =>
  Array.from(new Set(positionNotes(position).map((note) => note % 12)));

export const expectOnlyChordTones = (position, tones) => {
  const notes = positionNotes(position);
  expect(notes.every((note) => tones.includes(note % 12))).toEqual(true);
};

export const expectCavaquinhoPositionInvariants = (position) => {
  const fretValues = frets(position);
  const fingerValues = fingers(position);
  const midiValues = positionNotes(position);

  expect(fretValues).toHaveLength(4);
  expect(fingerValues).toHaveLength(4);
  expect(midiValues).toHaveLength(4);
  expect(
    midiValues.every(
      (note) => Number.isInteger(note) && note >= 0 && note <= 127
    )
  ).toEqual(true);

  fretValues.map((fret, index) => {
    expect(Number.isInteger(fret)).toEqual(true);
    expect(fret).toBeGreaterThanOrEqual(-1);

    if (fret <= 0) {
      expect(fingerValues[index]).toEqual(0);
    }
  });
};

export const expectClosedBarreSemantics = (position) => {
  expect(relativeBarres(position)).toEqual([0]);
  expect(position.capo).toEqual(true);
};
