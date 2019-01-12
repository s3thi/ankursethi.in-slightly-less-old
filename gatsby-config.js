module.exports = {
  siteMetadata: {
    title: "Ankur Sethi is Alive and Well",
    siteUrl: "https://ankursethi.in"
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: `${__dirname}/content/`
      }
    }
  ]
};
