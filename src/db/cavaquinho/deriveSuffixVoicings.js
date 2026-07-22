const openStringMidi = [50, 55, 59, 62];

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

const derivedSuffixes = {
  m6: { allowed: [0, 3, 7, 9], required: [0, 3, 9] },
  add9: { allowed: [0, 2, 4, 7], required: [0, 2, 4] },
  '7sus4': { allowed: [0, 5, 7, 10], required: [0, 5, 10] },
};

const fretValues = (position) =>
  Array.isArray(position.frets)
    ? position.frets
    : position.frets
        .split('')
        .map((value) => (value === 'x' ? -1 : parseInt(value, 16)));

const pitchClasses = (position) => [
  ...new Set(
    fretValues(position)
      .map((fret, stringIndex) =>
        fret < 0 ? null : (openStringMidi[stringIndex] + fret) % 12
      )
      .filter((note) => note !== null)
  ),
];

const chordTones = (key, intervals) =>
  intervals.map((interval) => (noteNumbers[key] + interval) % 12);

const matchesFormula = (position, key, formula) => {
  const actual = pitchClasses(position);
  const allowed = chordTones(key, formula.allowed);
  const required = chordTones(key, formula.required);
  return (
    actual.every((note) => allowed.includes(note)) &&
    required.every((note) => actual.includes(note))
  );
};

const positionIdentity = (position) => fretValues(position).join(':');

const clonePosition = (position) => ({
  ...position,
  frets: [...fretValues(position)],
  fingers: Array.isArray(position.fingers)
    ? [...position.fingers]
    : position.fingers,
  barres: Array.isArray(position.barres)
    ? [...position.barres]
    : position.barres,
});

const matchingPositions = (positions, key, formula) => [
  ...new Map(
    positions
      .filter((position) => matchesFormula(position, key, formula))
      .map((position) => [positionIdentity(position), clonePosition(position)])
  ).values(),
];

export function deriveSuffixVoicings(chordsByKey) {
  const sourcePositions = Object.values(chordsByKey).flatMap((chords) =>
    chords.flatMap((chord) => chord.positions)
  );

  return Object.fromEntries(
    Object.entries(chordsByKey).map(([key, chords]) => [
      key,
      chords.concat(
        Object.entries(derivedSuffixes).map(([suffix, formula]) => ({
          key,
          suffix,
          positions: matchingPositions(sourcePositions, key, formula),
        }))
      ),
    ])
  );
}
