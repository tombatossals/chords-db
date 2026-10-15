import { classifyVoicing, fretValues, getPlayedMidi } from './chordTheory';

const acceptedClassifications = new Set(['complete', 'incomplete', 'rootless']);
const identity = (position) => fretValues(position).join(':');

function cloneChord(chord) {
  return { ...chord, positions: [...chord.positions] };
}

function reviewPosition(key, suffix, position, index) {
  const analysis = classifyVoicing(position, key, suffix);
  const frets = fretValues(position);
  const midi = getPlayedMidi(position);
  let disposition = 'kept';
  if (suffix === '9') {
    const add9Analysis = classifyVoicing(position, key, 'add9');
    if (
      add9Analysis.classification === 'complete' ||
      add9Analysis.classification === 'incomplete'
    ) {
      disposition = 'moved-to-add9';
    } else if (!acceptedClassifications.has(analysis.classification)) {
      disposition = 'blocked-missing-characteristic-tone';
    }
  } else if (suffix === 'dim' && analysis.classification === 'additional') {
    const dim7Analysis = classifyVoicing(position, key, 'dim7');
    if (acceptedClassifications.has(dim7Analysis.classification)) {
      disposition = 'moved-to-dim7';
    } else {
      disposition = 'blocked-additional-note';
    }
  } else if (!acceptedClassifications.has(analysis.classification)) {
    disposition = 'blocked-missing-characteristic-tone';
  }

  return {
    key,
    suffix,
    sourceIndex: index + 1,
    identity: frets.join(':'),
    frets,
    midi,
    playedPitchClasses: analysis.played,
    classification: analysis.classification,
    omissions: analysis.omissions,
    additions: analysis.additions,
    missingEssential: analysis.missingEssential,
    rootMissing: analysis.rootMissing,
    previousClassification: analysis.classification,
    decisionApplied: disposition,
    origin: 'manual-source',
    disposition,
  };
}

export function normalizeSourceVoicings(chordsByKey) {
  const decisions = [];
  const chords = Object.fromEntries(
    Object.entries(chordsByKey).map(([key, sourceChords]) => {
      const normalized = sourceChords.map(cloneChord);
      const dim7 = normalized.find((chord) => chord.suffix === 'dim7');
      let add9 = normalized.find((chord) => chord.suffix === 'add9');
      if (!add9) {
        add9 = { key, suffix: 'add9', positions: [] };
        normalized.push(add9);
      }
      const movedDim7 = [];
      const movedAdd9 = [];

      sourceChords.forEach((sourceChord) => {
        const chord = normalized.find(
          (candidate) => candidate.suffix === sourceChord.suffix
        );
        chord.positions = sourceChord.positions.filter((position, index) => {
          const review = reviewPosition(
            key,
            sourceChord.suffix,
            position,
            index
          );
          decisions.push(review);
          if (review.disposition === 'moved-to-dim7') {
            movedDim7.push(position);
            return false;
          }
          if (review.disposition === 'moved-to-add9') {
            movedAdd9.push(position);
            return false;
          }
          return review.disposition === 'kept';
        });
      });
      dim7.positions.push(...movedDim7);
      add9.positions.push(...movedAdd9);

      normalized.forEach((chord) => {
        chord.positions = [
          ...new Map(
            chord.positions.map((position) => [identity(position), position])
          ).values(),
        ];
      });
      return [key, normalized];
    })
  );
  return { chords, decisions };
}

export function buildSourceReview(chordsByKey) {
  return normalizeSourceVoicings(chordsByKey).decisions;
}
