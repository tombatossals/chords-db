import { chordDefinitions, noteNumbers, openStringMidi } from './chordTheory';

const generatedSuffixes = ['aug', 'madd9', 'mmaj7'];
const maximumFret = 12;
const maximumSpan = 4;
const positionsPerChord = 6;

const identity = (frets) => frets.join(':');
const pitchClasses = (frets) => [
  ...new Set(
    frets
      .map((fret, stringIndex) =>
        fret < 0 ? null : (openStringMidi[stringIndex] + fret) % 12
      )
      .filter((note) => note !== null)
  ),
];

function getFrettedSpan(frets) {
  const fretted = frets.filter((fret) => fret > 0);
  return fretted.length ? Math.max(...fretted) - Math.min(...fretted) : 0;
}

function canShareFinger(frets, fret) {
  const indexes = frets
    .map((value, index) => (value === fret ? index : -1))
    .filter((index) => index >= 0);
  if (indexes.length < 2) return true;
  return frets
    .slice(indexes[0], indexes[indexes.length - 1] + 1)
    .every((value) => value >= fret);
}

function fingeringFor(frets) {
  const positiveFrets = [...new Set(frets.filter((fret) => fret > 0))].sort(
    (left, right) => left - right
  );
  if (
    positiveFrets.length > 4 ||
    positiveFrets.some((fret) => !canShareFinger(frets, fret))
  ) {
    return null;
  }
  const fingers = frets.map((fret) =>
    fret > 0 ? positiveFrets.indexOf(fret) + 1 : 0
  );
  const barres = positiveFrets.filter(
    (fret) => frets.filter((value) => value === fret).length > 1
  );
  return {
    fingers,
    ...(barres.length ? { barres, capo: true } : {}),
  };
}

function enumerateFrets(callback, frets = []) {
  if (frets.length === openStringMidi.length) {
    callback(frets);
    return;
  }
  for (let fret = -1; fret <= maximumFret; fret += 1) {
    enumerateFrets(callback, frets.concat(fret));
  }
}

function regionFor(frets) {
  const fretted = frets.filter((fret) => fret > 0);
  const minimum = fretted.length ? Math.min(...fretted) : 0;
  if (minimum <= 4) return 0;
  if (minimum <= 8) return 1;
  return 2;
}

function compareCandidates(left, right) {
  return (
    right.hasOptionalFifth - left.hasOptionalFifth ||
    left.span - right.span ||
    left.minimumFret - right.minimumFret ||
    left.identity.localeCompare(right.identity)
  );
}

function selectRegionalCandidates(candidates) {
  const selected = [];
  for (const region of [0, 1, 2]) {
    selected.push(
      ...candidates.filter((item) => item.region === region).slice(0, 2)
    );
  }
  const regional = new Map(selected.map((item) => [item.identity, item]));
  candidates.forEach((item) => {
    if (regional.size < positionsPerChord && !regional.has(item.identity)) {
      regional.set(item.identity, item);
    }
  });
  return [...regional.values()]
    .slice(0, positionsPerChord)
    .map(({ position }) => position);
}

export function generateReviewedVoicings(key, suffix) {
  if (!generatedSuffixes.includes(suffix)) return [];
  const root = noteNumbers[key];
  const definition = chordDefinitions[suffix];
  const allowed = definition.intervals.map(
    (interval) => (root + interval) % 12
  );
  const required = definition.essential.map(
    (interval) => (root + interval) % 12
  );
  const fifth = (root + 7) % 12;
  const candidates = [];

  enumerateFrets((frets) => {
    const soundedStrings = frets.filter((fret) => fret >= 0).length;
    if (soundedStrings < 3 || getFrettedSpan(frets) > maximumSpan) return;
    const played = pitchClasses(frets);
    if (
      played.some((note) => !allowed.includes(note)) ||
      required.some((note) => !played.includes(note))
    ) {
      return;
    }
    const fingering = fingeringFor(frets);
    if (!fingering) return;
    const fretted = frets.filter((fret) => fret > 0);
    candidates.push({
      identity: identity(frets),
      region: regionFor(frets),
      span: getFrettedSpan(frets),
      minimumFret: fretted.length ? Math.min(...fretted) : 0,
      hasOptionalFifth: Number(played.includes(fifth)),
      position: { frets, ...fingering, generated: true },
    });
  });

  return selectRegionalCandidates(candidates.sort(compareCandidates));
}

export { generatedSuffixes, maximumFret, maximumSpan, positionsPerChord };
