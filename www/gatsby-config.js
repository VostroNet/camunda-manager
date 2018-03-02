const autoprefixer = require("autoprefixer");

module.exports = {
  siteMetadata: {
    title: "Camunda Manager - Because there is no price on open source",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-postcss-sass",
      options: {
        postCssPlugins: [
          autoprefixer(),
        ],
        precision: 8, // SASS default: 5
      }
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-react-next",
  ],
};
