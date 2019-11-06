const path = require("path")
exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  // Create pages for each markdown file.
  const instrumentTpl = path.resolve(`src/pages/index.js`)
  const svgTpl = path.resolve(`src/pages/svg.js`)
  const guitar = require(`@tombatossals/chords-db/lib/guitar.json`)
  const ukulele = require(`@tombatossals/chords-db/lib/ukulele.json`)

  const instruments = { guitar: guitar, ukulele: ukulele }

  Object.keys(instruments).forEach(instrument => {
    if (instrument === "guitar") {
      createPage({
        path: `/`,
        component: instrumentTpl,
        context: {
          instrument,
        },
      })
    }
    createPage({
      path: `/${instrument}`,
      component: instrumentTpl,
      context: {
        instrument,
      },
    })

    instruments[instrument].keys
      .map(k => k.replace("#", "sharp"))
      .forEach(key => {
        createPage({
          path: `/${instrument}/${key}`,
          component: instrumentTpl,
          context: {
            instrument,
            key,
          },
        })

        instruments[instrument].suffixes.forEach(suffix =>
          createPage({
            path: `/${instrument}/${key}/${suffix
              .replace("#", "sharp")
              .replace("/", "_")}`,
            component: instrumentTpl,
            context: {
              instrument,
              key,
              suffix,
            },
          })
        )
      })
  })
}
