import main from "./main"
import tunings from "./tunings"
import keys from "./keys"
import ch from "./chords"

const chords = keys.reduce((arr, k) => {
  const key = k.replace("#", "sharp")
  arr[key] = []
  Object.values(ch[key]).map(chord => arr[key].push(chord))
  return arr
}, {})

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
