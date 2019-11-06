import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Img from "gatsby-image"
import { StaticQuery, graphql } from "gatsby"

const Header = ({ siteTitle, instrument }) => (
  <StaticQuery
    query={graphql`
      query {
        file(relativePath: { eq: "github-logo.png" }) {
          childImageSharp {
            fixed(width: 100, height: 41) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={data => (
      <header className="text-gray-800">
        <div className="flex items-center justify-between mx-auto px-4">
          <h1 className="flex-grow hidden sm:block sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            <Link
              to="/"
              style={{
                textDecoration: `none`,
              }}
            >
              {siteTitle}
            </Link>
          </h1>
          <ul className="p-4 flex">
            <li className="mr-3">
              <Link
                className={
                  (instrument === "guitar"
                    ? `bg-blue-500 text-white hover:bg-blue-500 hover:border-blue-200 `
                    : `border-white text-blue-500 hover:border-gray-200 hover:bg-gray-200 `) +
                  `inline-block border font-bold rounded py-1 px-3`
                }
                to="/guitar"
              >
                Guitar
              </Link>
            </li>
            <li className="mr-3">
              <Link
                className={
                  (instrument === "ukulele"
                    ? `bg-blue-500 text-white hover:bg-blue-500 hover:border-blue-200 `
                    : `border-white text-blue-500 hover:border-gray-200 hover:bg-gray-200 `) +
                  `inline-block border font-bold rounded py-1 px-3`
                }
                to={`/ukulele`}
              >
                Ukulele
              </Link>
            </li>
          </ul>
          <div className="max-w-sm mx-auto flex p-1 pb-0  hover:bg-gray-100 rounded-lg border shadow-xs">
            <a href="http://github.com/tombatossals/react-chords">
              <Img
                style={{ margin: 0 }}
                fixed={data.file.childImageSharp.fixed}
              />{" "}
            </a>{" "}
          </div>{" "}
        </div>{" "}
      </header>
    )}
  />
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
