import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Menu = ({ instrument, keys, selectedKey }) => (
  <ul className="pl-3 flex flex-wrap">
    <li className="font-bold p-1">Keys:</li>
    {keys.map(key => (
      <li key={key} className="mr-3">
        <Link
          className={
            (key === selectedKey.replace("sharp", "#") ||
            (key === "All" && selectedKey === "")
              ? `bg-blue-500 text-white hover:bg-blue-500 hover:border-blue-200 `
              : `border-white text-blue-500 hover:border-gray-200 hover:bg-gray-200 `) +
            `inline-block border font-bold rounded py-1 px-3`
          }
          to={
            key === "All" ? `/${instrument}` : `/${instrument}/${key.replace("#", "sharp")}`
          }
        >
          {key}
        </Link>
      </li>
    ))}
  </ul>
)

Menu.propTypes = {
  keys: PropTypes.arrayOf(PropTypes.string),
  selectedKey: PropTypes.string,
}

export default Menu
