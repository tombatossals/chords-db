export const strChord2array = str =>
  str.split('').map(char => char.toLowerCase() === 'x' ? -1 : parseInt(char, 16))

const processString = strings =>
  Array.isArray(strings) ? strings : strChord2array(strings)

const processPosition = position =>
  Object.assign(position, { fingers: processString(position.fingers), frets: processString(position.frets) })

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
