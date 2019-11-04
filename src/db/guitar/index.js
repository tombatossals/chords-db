import main from "./main"
import tunings from "./tunings"
import keys from "./keys"
import ch from "./chords"

const chords = keys.reduce((arr, key) => {
  arr[key] = []
  return arr
}, {})

Object.keys(ch).map(key =>
  Object.values(ch[key]).map(chord => chords[chord.key].push(chord))
)

const suffixes = [
  ...new Set(
    Object.keys(chords).map(key =>
      Object.values(chords[key]).map(c => c.suffix)
    )
  ),
][0]

export default {
  main,
  tunings,
  keys,
  suffixes,
  chords,
}
