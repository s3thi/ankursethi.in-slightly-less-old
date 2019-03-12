module.exports = {
  siteMetadata: {
    title: "Ankur Sethi is Alive and Well",
    url: "https://ankursethi.in",
    socialLinks: [
      {
        service: "Twitter",
        url: "https://twitter.com/ankurs3thi"
      },
      {
        service: "Medium",
        url: "https://medium.com/@ankurs3thi"
      },
      {
        service: "GitHub",
        url: "https://github.com/s3thi"
      }
    ]
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: `${__dirname}/content/`
      }
    },
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 600
            }
          }
        ]
      }
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass"
  ]
};
