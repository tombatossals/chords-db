export const openStringMidi = [50, 55, 59, 62];

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

export const chordDefinitions = {
  major: { intervals: [0, 4, 7], essential: [0, 4], sourceRequired: [4] },
  minor: { intervals: [0, 3, 7], essential: [0, 3], sourceRequired: [3] },
  6: { intervals: [0, 4, 7, 9], essential: [0, 4, 9], sourceRequired: [4, 9] },
  m6: { intervals: [0, 3, 7, 9], essential: [0, 3, 9] },
  7: {
    intervals: [0, 4, 7, 10],
    essential: [0, 4, 10],
    sourceRequired: [4, 10],
  },
  maj7: {
    intervals: [0, 4, 7, 11],
    essential: [0, 4, 11],
    sourceRequired: [4, 11],
  },
  m7: {
    intervals: [0, 3, 7, 10],
    essential: [0, 3, 10],
    sourceRequired: [3, 10],
  },
  m7b5: { intervals: [0, 3, 6, 10], essential: [0, 3, 6, 10] },
  dim: {
    intervals: [0, 3, 6],
    essential: [0, 3, 6],
    sourceIntervals: [0, 3, 6, 9],
    sourceRequired: [3, 6],
  },
  dim7: {
    intervals: [0, 3, 6, 9],
    essential: [0, 3, 6, 9],
    sourceRequired: [3, 6, 9],
  },
  sus2: { intervals: [0, 2, 7], essential: [0, 2], sourceRequired: [2] },
  sus4: { intervals: [0, 5, 7], essential: [0, 5], sourceRequired: [5] },
  '7sus4': { intervals: [0, 5, 7, 10], essential: [0, 5, 10] },
  9: {
    intervals: [0, 2, 4, 7, 10],
    essential: [2, 4, 10],
    sourceRequired: [2, 4, 10],
  },
  add9: { intervals: [0, 2, 4, 7], essential: [0, 2, 4] },
  aug: { intervals: [0, 4, 8], essential: [0, 4, 8] },
  69: { intervals: [0, 2, 4, 7, 9], essential: [0, 4, 9] },
  m9: { intervals: [0, 2, 3, 7, 10], essential: [2, 3, 10] },
  maj9: { intervals: [0, 2, 4, 7, 11], essential: [2, 4, 11] },
  madd9: { intervals: [0, 2, 3, 7], essential: [0, 2, 3] },
  mmaj7: { intervals: [0, 3, 7, 11], essential: [0, 3, 11] },
};

export function fretValues(position) {
  return Array.isArray(position.frets)
    ? position.frets
    : position.frets
        .split('')
        .map((value) => (value === 'x' ? -1 : parseInt(value, 16)));
}

export function getPlayedMidi(position) {
  return fretValues(position)
    .map((fret, stringIndex) =>
      fret < 0 ? null : openStringMidi[stringIndex] + fret
    )
    .filter((note) => note !== null);
}

export function getPitchClasses(position) {
  return [...new Set(getPlayedMidi(position).map((note) => note % 12))];
}

export function getChordPitchClasses(key, intervals) {
  return intervals.map((interval) => (noteNumbers[key] + interval) % 12);
}

export function classifyVoicing(position, key, suffix) {
  const definition = chordDefinitions[suffix];
  if (!definition || noteNumbers[key] === undefined) return null;

  const played = getPitchClasses(position);
  const expected = getChordPitchClasses(key, definition.intervals);
  const essential = getChordPitchClasses(key, definition.essential);
  const omissions = expected.filter((note) => !played.includes(note));
  const additions = played.filter((note) => !expected.includes(note));
  const missingEssential = essential.filter((note) => !played.includes(note));
  const root = noteNumbers[key];

  const missingOnlyRoot =
    missingEssential.length === 1 && missingEssential[0] === root;
  const acceptedDim7Omission =
    suffix === 'dim7' &&
    additions.length === 0 &&
    missingEssential.length === 1;

  let classification = 'complete';
  if (additions.length > 0) classification = 'additional';
  else if (acceptedDim7Omission) classification = 'incomplete';
  else if (missingOnlyRoot) classification = 'rootless';
  else if (
    omissions.length > 0 &&
    missingEssential.length === 0
  ) {
    classification = 'incomplete';
  } else if (missingEssential.length > 0) classification = 'invalid';

  return {
    classification,
    played,
    expected,
    omissions,
    additions,
    missingEssential,
    essential,
    rootMissing: !played.includes(root),
  };
}

export function isReusableVoicing(position, key, suffix) {
  const analysis = classifyVoicing(position, key, suffix);
  return Boolean(
    analysis &&
      (analysis.classification === 'complete' ||
        analysis.classification === 'incomplete')
  );
}
