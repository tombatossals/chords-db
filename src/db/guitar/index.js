import main from "./main"
import tunings from "./tunings"
import keys from "./keys"
import ch from "./chords"

const suffixes = [
  ...new Set(Object.keys(ch).map(c => Object.values(ch[c]).map(c => c.suffix))),
][0]

const chords = keys.reduce((arr, key) => {
  arr[key] = []
  return arr
}, {})

Object.keys(ch).map(key =>
  Object.values(ch[key]).map(chord => chords[key].push(chord))
)

export default {
  main,
  tunings,
  keys,
  suffixes,
  chords,
}
