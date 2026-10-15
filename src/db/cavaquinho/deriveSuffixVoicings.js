import {
  chordDefinitions,
  classifyVoicing,
  fretValues,
  isReusableVoicing,
} from './chordTheory';
import {
  generateReviewedVoicings,
  generatedSuffixes,
} from './generatedVoicings';

const derivedSuffixes = [
  'm6',
  'add9',
  '7sus4',
  'aug',
  '69',
  'm9',
  'maj9',
  'madd9',
  'mmaj7',
];

const expandedSuffixes = [...derivedSuffixes, '9', 'm7', 'sus2'];

const dominantTransposeSources = {
  Db: 'C',
  Eb: 'D',
  Gb: 'F',
  Ab: 'G',
  Bb: 'A',
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

export function transposeFullyFrettedPosition(position, semitones = 1) {
  const frets = fretValues(position);
  if (frets.some((fret) => fret === 0)) return null;
  return {
    ...clonePosition(position),
    frets: frets.map((fret) => (fret < 0 ? fret : fret + semitones)),
  };
}

function getTransposedDominantPositions(chordsByKey, targetKey) {
  const sourceKey = dominantTransposeSources[targetKey];
  if (!sourceKey) return [];
  const sourceChord = chordsByKey[sourceKey].find(
    (chord) => chord.suffix === '7'
  );
  return sourceChord.positions
    .map((position) => transposeFullyFrettedPosition(position))
    .filter(Boolean)
    .filter((position) => isReusableVoicing(position, targetKey, '7'));
}

export function compareVoicingCandidates(left, right) {
  const leftRegion = left.position
    ? Math.min(...fretValues(left.position).filter((fret) => fret >= 0))
    : 0;
  const rightRegion = right.position
    ? Math.min(...fretValues(right.position).filter((fret) => fret >= 0))
    : 0;

  return (
    Number(left.analysis.rootMissing) - Number(right.analysis.rootMissing) ||
    left.analysis.omissions.length - right.analysis.omissions.length ||
    leftRegion - rightRegion ||
    left.sourceIndex - right.sourceIndex
  );
}

const matchingPositions = (positions, key, suffix) =>
  [
    ...positions
      .map((position, sourceIndex) => ({ position, sourceIndex }))
      .filter(({ position }) => isReusableVoicing(position, key, suffix))
      .reduce((result, entry) => {
        const identity = positionIdentity(entry.position);
        if (!result.has(identity)) result.set(identity, entry);
        return result;
      }, new Map())
      .values(),
  ]
    .map((entry) => ({
      ...entry,
      analysis: classifyVoicing(entry.position, key, suffix),
    }))
    .sort(compareVoicingCandidates)
    .map(({ position }) => clonePosition(position));

const uniquePositions = (positions) => [
  ...positions
    .reduce((result, position) => {
      const identity = positionIdentity(position);
      if (!result.has(identity)) result.set(identity, clonePosition(position));
      return result;
    }, new Map())
    .values(),
];

export function deriveSuffixVoicings(chordsByKey) {
  const sourcePositions = Object.values(chordsByKey).flatMap((chords) =>
    chords.flatMap((chord) => chord.positions)
  );

  return Object.fromEntries(
    Object.entries(chordsByKey).map(([key, chords]) => {
      const existingSuffixes = new Set(chords.map((chord) => chord.suffix));
      const expandedChords = chords.map((chord) => ({
        ...chord,
        positions:
          chord.suffix === '9'
            ? matchingPositions(sourcePositions, key, chord.suffix)
            : uniquePositions(
                chord.positions.concat(
                  generatedSuffixes.includes(chord.suffix)
                    ? generateReviewedVoicings(key, chord.suffix)
                    : [],
                  expandedSuffixes.includes(chord.suffix)
                    ? matchingPositions(sourcePositions, key, chord.suffix)
                    : [],
                  chord.suffix === '7'
                    ? getTransposedDominantPositions(chordsByKey, key)
                    : []
                )
              ),
      }));
      const newChords = derivedSuffixes
        .filter((suffix) => !existingSuffixes.has(suffix))
        .map((suffix) => ({
          key,
          suffix,
          positions: generatedSuffixes.includes(suffix)
            ? generateReviewedVoicings(key, suffix)
            : matchingPositions(sourcePositions, key, suffix),
        }));

      return [key, expandedChords.concat(newChords)];
    })
  );
}

export { chordDefinitions };
