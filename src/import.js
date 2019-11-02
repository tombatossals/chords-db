const newchords = require("../chords.json")
const guitar = require(`../lib/guitar.json`)
import fs from "fs"
import path from "path"

const get_suffixes = keys =>
  keys.map(key => (key.substr(1) ? key.substr(1) : "major"))

const keys = Object.keys(newchords)

const suffixes = get_suffixes(keys)

const createDirIfNeeded = key =>
  fs.existsSync(path.join(__dirname, "db", "guitar", "chords", key)) ||
  fs.mkdirSync(path.join(__dirname, "db", "guitar", "chords", key))

const exists_chord = (key, suffix) => {
  const exists =
    guitar.chords[key.replace("#", "sharp")] &&
    guitar.chords[key.replace("#", "sharp")].find(
      chord => chord.suffix === suffix
    )
  return exists !== undefined
}

const generate_chord_file = chord => `export default ${JSON.stringify(chord)}`

const check_chord = chord => {
  if (!chord) return

  if (chord.positions.length !== 6) {
    console.log("Bad number of strings detected")
    return false
  }

  if (chord.fingerings[0].length !== 6) {
    console.log("Bad number of fingers detected")
    return false
  }

  return true
}

const to_file = (key, suffix, data) => {
  createDirIfNeeded(key)
  fs.writeFileSync(
    path.join(
      __dirname,
      "db",
      "guitar",
      "chords",
      key,
      suffix.replace("/", "_") + ".js"
    ),
    data
  )
}

keys.map(k => {
  const kk = newchords[k][0]

  if (!check_chord(kk)) return

  const to_hex = str => (str === "x" ? "x" : parseInt(str, 10).toString(16))

  const chord = {
    frets: kk.positions.map(string => to_hex(string)).join(""),
    fingers: kk.fingerings[0].join(""),
  }
  const key = k[1] === "b" || k[1] === "#" ? k.substr(0, 2) : k.substr(0, 1)
  const suffix = k.replace(key, "") ? k.replace(key, "") : "major"

  if (!exists_chord(key, suffix)) {
    const c = {
      key,
      suffix,
      positions: [chord],
    }
    to_file(key, suffix, generate_chord_file(c))
  }
})
