// Exact voicings present before the modular database rebuild (commit 5440089).
// Encoding: baseFret|frets|fingers|barres|capo.
const historicalVoicings = {
  'C:minor': [
    '10|1.3.4.4|1.2.3.4||',
    '5|1.4.4.6|1.2.3.4||',
    '1|1.5.4.5|1.3.2.4||',
    '8|3.5.1.6|2.3.1.4||',
  ],
  'Db:major': [
    '11|1.3.4.5|1.2.3.4||',
    '6|1.5.4.6|1.3.2.4||',
    '3|1.4.4.4|1.4.4.4|4|',
    '9|3.5.1.7|2.1.3.4||',
  ],
  'Db:minor': [
    '9|3.1.1.3|3.1.2.4||',
    '11|1.3.4.4|1.2.3.4||',
    '6|1.4.4.6|1.2.3.4||',
    '2|1.5.4.5|1.3.2.4||',
    '9|3.5.1.6|2.3.1.4||',
  ],
  'D:major': [
    '10|3.2.1.3|3.2.1.4||',
    '7|1.5.4.6|1.3.2.4||',
    '4|1.4.4.4|1.4.4.4|4|',
    '10|3.5.1.7|2.1.3.4||',
  ],
  'D:minor': [
    '10|3.1.1.3|3.1.2.4||',
    '7|1.4.4.6|1.2.3.4||',
    '3|1.5.4.5|1.3.2.4||',
    '10|3.5.1.6|2.3.1.4||',
  ],
  'Eb:major': [
    '11|3.2.1.3|3.2.1.4||',
    '8|1.5.4.6|1.3.2.4||',
    '5|1.4.4.4|1.4.4.4|4|',
    '11|3.5.1.7|2.1.3.4||',
  ],
  'Eb:minor': [
    '11|3.1.1.3|3.1.2.4||',
    '7|2.2.1.2|2.3.1.4||',
    '8|1.4.4.6|1.2.3.4||',
    '4|1.5.4.5|1.3.2.4||',
    '11|3.5.1.6|2.3.1.4||',
  ],
  'E:major': [
    '9|1.1.1.1|1.1.1.1|1|1',
    '2|1.3.4.5|1.2.3.4||',
    '9|1.5.4.6|1.3.2.4||',
    '6|1.4.4.4|1.4.4.4|4|',
    '2|1.3.0.5|1.2.0.4||',
  ],
  'E:minor': [
    '2|1.3.4.4|1.2.3.4||',
    '9|1.4.4.6|1.2.3.4||',
    '5|1.5.4.5|1.3.2.4||',
    '2|1.3.0.4|2.3.0.4||',
  ],
  'F:major': [
    '10|1.1.1.1|1.1.1.1|1|1',
    '3|1.3.4.5|1.2.3.4||',
    '1|10.2.1.3|1.3.2.4||',
    '7|1.4.4.4|1.4.4.4|4|',
    '1|3.5.1.7|2.1.3.4||',
  ],
  'F:minor': [
    '3|1.3.4.4|1.2.3.4||',
    '10|1.4.4.6|1.2.3.4||',
    '6|1.5.4.5|1.3.2.4||',
    '1|3.5.1.6|2.3.1.4||',
  ],
  'Gb:major': [
    '11|1.1.1.1|1.1.1.1|1|1',
    '4|1.3.4.5|1.2.3.4||',
    '11|1.5.4.6|1.3.2.4||',
    '8|1.4.4.4|1.4.4.4|4|',
    '2|3.5.1.7|2.1.3.4||',
  ],
  'Gb:minor': [
    '10|2.2.1.2|2.3.1.4||',
    '4|1.3.4.4|1.2.3.4||',
    '11|1.4.4.6|1.2.3.4||',
    '7|1.5.4.5|1.3.2.4||',
    '2|3.5.1.6|2.3.1.4||',
  ],
  'G:major': [
    '3|3.2.1.3|3.2.1.4||',
    '5|1.3.4.5|1.2.3.4||',
    '3|0.2.1.3|0.2.1.3||',
    '9|1.4.4.4|1.4.4.4|4|',
    '3|3.5.1.7|2.1.3.4||',
    '12|1.1.1.1|1.1.1.1|1|1',
  ],
  'G:minor': [
    '11|2.2.1.2|2.3.1.4||',
    '5|1.3.4.4|1.2.3.4||',
    '3|0.1.1.3|0.1.2.4||',
    '8|1.5.4.5|1.3.2.4||',
    '3|3.5.1.6|2.3.1.4||',
  ],
  'Ab:major': [
    '6|1.3.4.5|1.2.3.4||',
    '1|1.5.4.6|1.3.2.4||',
    '10|1.4.4.4|1.4.4.4|4|',
    '4|3.5.1.7|2.1.3.4||',
  ],
  'Ab:minor': [
    '8|2.1.2.2|2.1.3.4||',
    '1|1.1.0.1|2.3.1.4||',
    '6|1.3.4.4|1.2.3.4||',
    '1|1.4.4.6|1.2.3.4||',
    '9|1.5.4.5|1.3.2.4||',
    '4|3.5.1.6|2.3.1.4||',
  ],
  'A:major': [
    '9|3.1.2.3|3.1.2.4||',
    '7|1.3.4.5|1.2.3.4||',
    '2|1.5.4.6|1.3.2.4||',
    '11|1.4.4.4|1.4.4.4|4|',
    '5|3.5.1.7|2.1.3.4||',
  ],
  'A:minor': [
    '9|2.1.2.2|2.1.3.4||',
    '7|1.3.4.4|1.2.3.4||',
    '2|1.4.4.6|1.2.3.4||',
    '10|1.5.4.5|1.3.2.4||',
    '5|3.5.1.6|2.3.1.4||',
  ],
  'Bb:major': [
    '10|3.1.2.3|3.1.2.4||',
    '8|1.3.4.5|1.2.3.4||',
    '3|1.5.4.6|1.3.2.4||',
    '1|0.3.3.3|0.1.1.1|3|',
    '6|3.5.1.7|2.1.3.4||',
  ],
  'Bb:minor': [
    '10|2.1.2.2|2.1.3.4||',
    '1|3.3.2.3|2.3.1.4||',
    '8|1.3.4.4|1.2.3.4||',
    '3|1.4.4.6|1.2.3.4||',
    '11|1.5.4.5|1.3.2.4||',
    '6|3.5.1.6|2.3.1.4||',
  ],
  'B:major': [
    '11|3.1.2.3|3.1.2.4||',
    '9|1.3.4.5|1.2.3.4||',
    '4|1.5.4.6|1.3.2.4||',
    '13|1.4.4.4|1.4.4.4|4|',
    '7|3.5.1.7|2.1.3.4||',
  ],
  'B:minor': [
    '11|2.1.2.2|2.1.3.4||',
    '1|4.4.3.4|2.3.1.4||',
    '9|1.3.4.4|1.2.3.4||',
    '4|1.4.4.6|1.2.3.4||',
    '12|1.5.4.5|1.3.2.4||',
    '7|3.5.1.6|2.3.1.4||',
  ],
};

const parseValues = (value) => (value ? value.split('.').map(Number) : []);
const absoluteFret = (fret, baseFret) =>
  fret > 0 ? baseFret + fret - 1 : fret;
const positionValues = (position) =>
  Array.isArray(position.frets)
    ? position.frets
    : position.frets
        .split('')
        .map((value) => (value === 'x' ? -1 : parseInt(value, 16)));
const positionIdentity = (position) => positionValues(position).join(':');

function decodePosition(code) {
  const [base, fretsValue, fingersValue, barresValue, capoValue] =
    code.split('|');
  const baseFret = Number(base);
  const frets = parseValues(fretsValue).map((fret) =>
    absoluteFret(fret, baseFret)
  );
  const relativeBarres = parseValues(barresValue);
  const barres = relativeBarres.map((barre) => absoluteFret(barre, baseFret));
  return {
    frets,
    fingers: parseValues(fingersValue),
    ...(barres.length === 1 ? { barres: barres[0] } : {}),
    ...(barres.length > 1 ? { barres } : {}),
    ...(capoValue ? { capo: true } : {}),
  };
}

export function applyHistoricalVoicings(chordsByKey) {
  return Object.fromEntries(
    Object.entries(chordsByKey).map(([key, chords]) => [
      key,
      chords.map((chord) => {
        const encoded = historicalVoicings[`${key}:${chord.suffix}`] || [];
        if (!encoded.length) return chord;
        const existing = new Set(chord.positions.map(positionIdentity));
        const restored = encoded
          .map(decodePosition)
          .filter((position) => !existing.has(positionIdentity(position)));
        return { ...chord, positions: chord.positions.concat(restored) };
      }),
    ])
  );
}

export const historicalVoicingCount =
  Object.values(historicalVoicings).flat().length;
