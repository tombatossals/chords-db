import { Link } from "gatsby"
import React from "react"

const LeftMenu = ({ instrument, selectedKey, suffixes, selectedSuffix }) =>
  selectedKey && (
    <ul className="pl-3">
      <li className="p-1 text-xl">Suffixes:</li>
      {suffixes.map(suffix => (
        <li key={suffix} className="mr-3 block">
          <Link
            className={
              (suffix === selectedSuffix.replace("sharp", "#").replace("_", "/")
                ? `text-blue-500 font-bold hover:text-grey-800 `
                : `text-grey-800 hover:text-blue-500 `) + `py-1 px-3`
            }
            to={`/${instrument}/${selectedKey.replace(
              "#",
              "sharp"
            )}/${suffix.replace("#", "sharp").replace("/", "_")}`}
          >
            {selectedKey.replace("sharp", "#")}
            <span className="text-sm">{suffix}</span>
          </Link>
        </li>
      ))}
    </ul>
  )

export default LeftMenu
