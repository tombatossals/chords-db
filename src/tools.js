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

const processPosition = position => {
  const frets = processString(position.frets)
  const baseFret = processbaseFret(frets)

  Object.assign(position, {
    baseFret: processbaseFret(frets),
    barres: processBarres(position.barres, baseFret),
    fingers: processFingers(position.fingers),
    frets: processFrets(frets, baseFret),
    midi: chord2midi(frets)
  })
}

const processPositions = positions =>
  positions.map(position => processPosition(position))

const processChord = (suffixes) =>
  suffixes.map(suffix => Object.assign(suffix, processPositions(suffix.positions)))

const processChords = chords =>
  Object.assign(...Object.keys(chords).map(chord =>
    Object.assign({}, { [chord]: processChord(chords[chord]) }))
  )

export const generate = instrument =>
  Object.assign(instrument, { chords: processChords(instrument.chords) })

const MIDIstrings = [ 40, 45, 50, 55, 59, 64 ]

const string2midi = (fret, string) =>
  fret >= 0 && MIDIstrings[string] + fret

export const chord2midi = frets =>
  frets.map((fret, string) => string2midi(fret, string)).filter(note => note > 0)
