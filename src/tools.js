export const strChord2array = str =>
  str.split('').map(char => char.toLowerCase() === 'x' ? -1 : parseInt(char, 16))

export const processString = strings =>
  Array.isArray(strings) ? strings : strChord2array(strings)

const processbaseFret = frets =>
  Math.max(...frets) > 4 ? Math.min(...frets.filter(f => f > 0)) : 1

const processBarres = (barres, baseFret) =>
  barres
  ? (Array.isArray(barres) ? barres : [ barres ]).map(barre =>
    baseFret > 1 ? barre - baseFret + 1 : barre)
  : []

const processFrets = (frets, baseFret) =>
  frets.map(fret => baseFret > 1 ? (fret > 0 ? fret - baseFret + 1 : fret) : fret)

const processFingers = fingers =>
  fingers ? processString(fingers) : []

const processPosition = (position, tunning) => {
  const frets = processString(position.frets)
  const baseFret = processbaseFret(frets)

  Object.assign(position, {
    baseFret: processbaseFret(frets),
    barres: processBarres(position.barres, baseFret),
    fingers: processFingers(position.fingers),
    frets: processFrets(frets, baseFret),
    midi: chord2midi(frets, tunning)
  })
}

export const unique = arr => Array.from(new Set(arr))

export const numberOfBarres = str =>
  unique(str.split('')).map(
    chr => str.match(new RegExp(chr, 'gi')) && parseInt(chr, 10) > 0 && str.match(new RegExp(chr, 'gi')).length > 1 ? 1 : 0
  ).reduce((last, actual) => actual + last, 0)

const processPositions = (positions, tunning) =>
  positions.map(position => processPosition(position, tunning))

const processChord = (suffixes, tunning) =>
  suffixes.map(suffix => Object.assign(suffix, processPositions(suffix.positions, tunning)))

const processChords = (chords, tunning) =>
  Object.assign(...Object.keys(chords).map(chord =>
    Object.assign({}, { [chord]: processChord(chords[chord], tunning) }))
  )

export const generate = (instrument, tunning = 'standard') =>
  Object.assign(instrument, { chords: processChords(instrument.chords, instrument.main.tunnings[tunning]) })

const midiKeysOffsets = {
  C: 0,
  Csharp: 1,
  Db: 1,
  D: 2,
  Dsharp: 3,
  Eb: 3,
  E: 4,
  F: 5,
  Fsharp: 6,
  Gb: 6,
  G: 7,
  Gsharp: 8,
  Ab: 8,
  A: 9,
  Asharp: 10,
  Bb: 10,
  B: 11
}

const midiNote = note =>
  (parseInt(note[1], 10) + 1) * 12 + midiKeysOffsets[note[0]]

const string2midi = (fret, string, tunning) =>
  fret >= 0
    ? midiNote(tunning[string]) + fret
    : -1

export const chord2midi = (frets, tunning) =>
  frets.map((fret, string) => string2midi(fret, string, tunning)).filter(note => note > 0)

export const getNoteFromMidiNumber = number =>
  Object.keys(midiKeysOffsets).filter(key => midiKeysOffsets[key] === (number % 12))[0]

export const onlyDuplicates = fingers => {
  const arr = fingers.split('').filter(x => parseInt(x, 0) > 0)
  const unique = new Set(arr)

  const duplicates = []
  for (let x of unique) {
    arr.filter(i => i === x).length > 1 && duplicates.push(x)
  }
  return duplicates
}
