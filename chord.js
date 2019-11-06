import React from 'react'
import Chord from '@tombatossals/react-chords/lib/Chord'

const guitar = require(`@tombatossals/chords-db/lib/guitar.json`)
const chord = guitar.chords.C.find(chord => chord.suffix === 'major')
const instrument = Object.assign(guitar.main, { tunings: guitar.tunings })

const App = () => (
  <div>
    <h1>Guitar Cmajor chord</h1>
    <Chord chord={chord.positions[0]} instrument={instrument} lite={false} />
  </div>
)

export default App
