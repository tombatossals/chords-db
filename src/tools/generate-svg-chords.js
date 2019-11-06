import React from "react"
import fs from "fs"
import path from "path"
import mkdirp from "mkdirp"
import Chord from "@tombatossals/react-chords/lib/Chord"
import { convertFile } from "convert-svg-to-png"
import { renderToStaticMarkup } from "react-dom/server"

const basedir = path.join(__dirname, "..", "..", "public", "media")
const instruments = ["guitar", "ukulele"]

const writeSVGFile = async (f, svg) => await fs.writeFileSync(f, svg)

const writePNGFile = async f =>
  convertFile(f, { background: "white", widht: 400, height: 400 })

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const createSVGChordAndWriteFile = async (chord, version, instrument) =>
  new Promise(async resolve => {
    const key = chord.key.replace("#", "sharp")
    const suffix = chord.suffix.replace("#", "sharp").replace("/", "_")
    const dirname = path.join(
      basedir,
      instrument.main.name.toLowerCase(),
      "chords",
      key,
      suffix
    )

    await mkdirp.sync(dirname)

    const promises = Object.keys(chord.positions).map(
      async v =>
        new Promise(async (resolve, index) => {
          await sleep(500 * index)
          const f = path.join(dirname, `${parseInt(v, 10) + 1}.svg`)
          const svg = renderToStaticMarkup(
            React.createElement(Chord, {
              chord: chord.positions[v],
              instrument: {
                strings: instrument.main.strings,
                fretsOnChord: instrument.main.fretsOnChord,
                name: instrument.main.name,
                tunings: instrument.tunings,
              },
              v,
            })
          )

          if (!svg) {
            return resolve()
          }

          await writeSVGFile(f, svg)
          await writePNGFile(f)
          resolve()
        })
    )

    await Promise.all(promises)
    console.log("done", instrument.main.name, key, suffix)
    return resolve()
  })

const run = async () => {
  const chords = []

  instruments.map(async i => {
    const instrument = require(`@tombatossals/chords-db/lib/${i}.json`)
    Object.keys(instrument.chords).map(key =>
      instrument.chords[key].map(c => chords.push({ c, instrument }))
    )
  })

  chords.reduce(async (p, chord) => {
    return p.then(
      async () =>
        await createSVGChordAndWriteFile(
          chord.c,
          parseInt(chord.v, 10) + 1,
          chord.instrument
        )
    )
  }, Promise.resolve())
}
run()
