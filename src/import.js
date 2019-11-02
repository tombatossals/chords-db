const newchords = require("../chords.json")
const guitar = require(`../lib/guitar.json`)

const get_suffixes = keys => keys.map(key => (key ? key.substr(1) : "major"))
const keys = Object.keys(newchords)

const suffixes = get_suffixes(keys)

const exists_chord = (key, suffix) => {
  const exists = guitar.chords[key].find(chord => chord.suffix === suffix)
  return exists !== undefined
}

const generate_chord_file = chord => `export default ${JSON.stringify(chord)}`

keys.map(k => {
  const kk = newchords[k][0]
  const chord = {
    frets: kk.positions.join(""),
    fingers: kk.fingerings[0].join(""),
  }
  const key = k.substr(0, 1)
  const suffix = k.substr(1)

  if (!exists_chord(key, suffix)) {
    const c = {
      key,
      suffix,
      positions: chord,
    }
    console.log(generate_chord_file(c))
  }
})
