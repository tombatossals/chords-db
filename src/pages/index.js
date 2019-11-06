import React from "react"
import Chord from "@tombatossals/react-chords/lib/Chord"
import { Link } from "gatsby"

const IndexPage = ({ chords, instrument, lite, svg }) => (
  <>
    {chords &&
      chords.map((chord, px) => {
        return chord.positions.map((position, version) =>
          svg ? (
            <div>
              <p className="text-lg text-center mb-0">
                {chord.key}
                <span className="text-xs">{chord.suffix}</span>{" "}
                {chord.positions.length > 1 && (
                  <span className="font-bold text-sm">(v{version + 1})</span>
                )}
              </p>

              <Chord chord={position} instrument={instrument} lite={lite} />
              <p className="text-center">
                Download:{" "}
                <a
                  className="text-xs"
                  href={`/react-chords/media/${
                    instrument.name
                  }/chords/${chord.key.replace(
                    "#",
                    "sharp"
                  )}/${chord.suffix
                    .replace("#", "sharp")
                    .replace("/", "_")}/${version + 1}.svg`}
                >
                  SVG
                </a>
                {"/"}
                <a
                  className="text-xs"
                  href={`/react-chords/media/${
                    instrument.name
                  }/chords/${chord.key.replace(
                    "#",
                    "sharp"
                  )}/${chord.suffix
                    .replace("#", "sharp")
                    .replace("/", "_")}/${version + 1}.png`}
                >
                  PNG
                </a>
              </p>
            </div>
          ) : (
            <Link
              key={px + "_" + version}
              to={`/${instrument.name}/${chord.key.replace(
                "#",
                "sharp"
              )}/${chord.suffix.replace("#", "sharp").replace("/", "_")}`}
            >
              <p className="text-lg text-center">
                {chord.key}
                <span className="text-xs">{chord.suffix}</span>{" "}
                {chord.positions.length > 1 && (
                  <span className="font-bold text-sm">(v{version + 1})</span>
                )}
              </p>
              <Chord chord={position} instrument={instrument} lite={lite} />
            </Link>
          )
        )
      })}
  </>
)

export default IndexPage
