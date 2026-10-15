import chords from './chords';
import suffixMetadata from './suffixMetadata';
import {
  chordDefinitions,
  classifyVoicing,
  fretValues,
  getPlayedMidi,
} from './chordTheory';
import { buildSourceReview } from './normalizeSourceVoicings';
import sourceChords from './chords/source';

const pitchClassNames = [
  'C',
  'Db',
  'D',
  'Eb',
  'E',
  'F',
  'Gb',
  'G',
  'Ab',
  'A',
  'Bb',
  'B',
];

function countDuplicates(midi) {
  const counts = midi.reduce((result, note) => {
    const pitchClass = note % 12;
    return { ...result, [pitchClass]: (result[pitchClass] || 0) + 1 };
  }, {});

  return Object.entries(counts)
    .filter(([, count]) => count > 1)
    .map(([pitchClass, count]) => ({
      note: pitchClassNames[Number(pitchClass)],
      count,
    }));
}

function findEquivalences(position) {
  return Object.keys(chords).flatMap((key) =>
    Object.keys(chordDefinitions)
      .map((suffix) => ({
        key,
        suffix,
        analysis: classifyVoicing(position, key, suffix),
      }))
      .filter(({ analysis }) =>
        ['complete', 'incomplete'].includes(analysis.classification)
      )
      .map(({ key: equivalentKey, suffix }) => `${equivalentKey}:${suffix}`)
  );
}

function auditPosition(key, suffix, position, index) {
  const analysis = classifyVoicing(position, key, suffix);
  const midi = getPlayedMidi(position);

  return {
    index: index + 1,
    origin: position.generated ? 'generated-approved' : 'manual-source',
    frets: fretValues(position),
    midi,
    notes: midi.map((note) => pitchClassNames[note % 12]),
    classification: analysis && analysis.classification,
    omissions: analysis
      ? analysis.omissions.map((note) => pitchClassNames[note])
      : [],
    additions: analysis
      ? analysis.additions.map((note) => pitchClassNames[note])
      : [],
    essentialTones: analysis
      ? analysis.essential.map((note) => pitchClassNames[note])
      : [],
    missingEssential: analysis
      ? analysis.missingEssential.map((note) => pitchClassNames[note])
      : [],
    rootMissing: analysis ? analysis.rootMissing : false,
    duplications: countDuplicates(midi),
    possibleEquivalences: findEquivalences(position).filter(
      (equivalence) => equivalence !== `${key}:${suffix}`
    ),
  };
}

export function buildCavaquinhoVoicingAudit() {
  const entries = Object.entries(chords).flatMap(([key, chordEntries]) =>
    chordEntries.map((chord) => ({
      key,
      suffix: chord.suffix,
      symbol: suffixMetadata[chord.suffix]
        ? suffixMetadata[chord.suffix].symbol
        : chord.suffix,
      positions: chord.positions.map((position, index) =>
        auditPosition(key, chord.suffix, position, index)
      ),
    }))
  );

  const summary = entries.reduce(
    (result, entry) => {
      const counts = entry.positions.reduce(
        (positionCounts, position) => ({
          ...positionCounts,
          [position.classification]:
            (positionCounts[position.classification] || 0) + 1,
        }),
        {}
      );
      return {
        ...result,
        chordEntries: result.chordEntries + 1,
        shapes: result.shapes + entry.positions.length,
        complete: result.complete + (counts.complete || 0),
        incomplete: result.incomplete + (counts.incomplete || 0),
        rootless: result.rootless + (counts.rootless || 0),
        additional: result.additional + (counts.additional || 0),
        invalid: result.invalid + (counts.invalid || 0),
      };
    },
    {
      chordEntries: 0,
      shapes: 0,
      complete: 0,
      incomplete: 0,
      rootless: 0,
      additional: 0,
      invalid: 0,
    }
  );

  return {
    summary,
    entries,
    sourceReview: buildSourceReview(sourceChords),
  };
}
