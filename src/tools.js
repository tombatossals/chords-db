export const strChord2array = str =>
  str
    .split('')
    .map(char => (char.toLowerCase() === 'x' ? -1 : parseInt(char, 16)));

export const processString = strings =>
  Array.isArray(strings) ? strings : strChord2array(strings);

const processbaseFret = frets =>
  Math.max(...frets) > 4 ? Math.min(...frets.filter(f => f > 0)) : 1;

const processBarres = (barres, baseFret) =>
  barres
    ? (Array.isArray(barres) ? barres : [barres]).map(barre =>
        baseFret > 1 ? barre - baseFret + 1 : barre
      )
    : [];

const processFrets = (frets, baseFret) =>
  frets.map(fret =>
    baseFret > 1 ? (fret > 0 ? fret - baseFret + 1 : fret) : fret
  );

const processFingers = fingers => (fingers ? processString(fingers) : []);

const processPosition = (position, tuning) => {
  const frets = processString(position.frets);
  const baseFret = processbaseFret(frets);

  Object.assign(position, {
    baseFret: processbaseFret(frets),
    barres: processBarres(position.barres, baseFret),
    fingers: processFingers(position.fingers),
    frets: processFrets(frets, baseFret),
    midi: chord2midi(frets, tuning)
  });
};

export const unique = arr =>
  arr.filter((elem, pos, a) => a.indexOf(elem) === pos);

export const numberOfBarres = str =>
  unique(str.split(''))
    .map(chr =>
      str.match(new RegExp(chr, 'gi')) &&
      parseInt(chr, 10) > 0 &&
      str.match(new RegExp(chr, 'gi')).length > 1
        ? 1
        : 0
    )
    .reduce((last, actual) => actual + last, 0);

const processPositions = (positions, tuning) =>
  positions.map(position => processPosition(position, tuning));

const processChord = (suffixes, tuning) =>
  suffixes.map(suffix =>
    Object.assign(suffix, processPositions(suffix.positions, tuning))
  );

const processChords = (chords, tuning) =>
  Object.assign(
    ...Object.keys(chords).map(chord =>
      Object.assign({}, { [chord]: processChord(chords[chord], tuning) })
    )
  );

export const generate = (instrument, tuning = 'standard') =>
  Object.assign(instrument, {
    chords: processChords(instrument.chords, instrument.tunings[tuning])
  });

const midiNumbers = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B'
];

const midiNote = note =>
  (parseInt(note[1], 10) + 1) * 12 + midiNumbers.indexOf(note[0]);

const string2midi = (fret, string, tuning) =>
  fret >= 0 ? midiNote(tuning[string]) + fret : -1;

export const chord2midi = (frets, tuning) =>
  frets
    .map((fret, string) => string2midi(fret, string, tuning))
    .filter(note => note > 0);

export const getNoteFromMidiNumber = number => midiNumbers[number % 12];
