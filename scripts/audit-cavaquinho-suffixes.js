const cavaquinho = require('../lib/cavaquinho.json');

const roots = {
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

const candidates = {
  aug: { intervals: [0, 4, 8], required: [0, 4, 8], example: 'G+' },
  5: { intervals: [0, 7], required: [0, 7], example: 'G5' },
  maj9: {
    intervals: [0, 2, 4, 7, 11],
    required: [0, 2, 4, 11],
    example: 'Gmaj9',
  },
  m9: { intervals: [0, 2, 3, 7, 10], required: [0, 2, 3, 10], example: 'Gm9' },
  '7b5': { intervals: [0, 4, 6, 10], required: [0, 4, 6, 10], example: 'G7♭5' },
  '7#5': { intervals: [0, 4, 8, 10], required: [0, 4, 8, 10], example: 'G7♯5' },
  '6/9': {
    intervals: [0, 2, 4, 7, 9],
    required: [0, 2, 4, 9],
    example: 'G6/9',
  },
  madd9: { intervals: [0, 2, 3, 7], required: [0, 2, 3], example: 'Gmadd9' },
};

const positions = Object.values(cavaquinho.chords).flatMap((chords) =>
  chords.flatMap((chord) => chord.positions)
);

const tones = (root, intervals) =>
  intervals.map((interval) => (root + interval) % 12);
const pitchClasses = (position) => [
  ...new Set(position.midi.map((note) => note % 12)),
];
const identity = (position) => [position.baseFret, ...position.frets].join(':');

const compatibleCount = (root, formula) => {
  const allowed = tones(root, formula.intervals);
  const required = tones(root, formula.required);
  return new Set(
    positions
      .filter((position) => {
        const actual = pitchClasses(position);
        return (
          actual.every((note) => allowed.includes(note)) &&
          required.every((note) => actual.includes(note))
        );
      })
      .map(identity)
  ).size;
};

console.log('Sufixo\tExemplo\tRaízes cobertas\tFormas compatíveis');
Object.entries(candidates).forEach(([suffix, formula]) => {
  const counts = Object.values(roots).map((root) =>
    compatibleCount(root, formula)
  );
  console.log(
    `${suffix}\t${formula.example}\t${
      counts.filter(Boolean).length
    }/12\t${counts.reduce((sum, count) => sum + count, 0)}`
  );
});
