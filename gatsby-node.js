const path = require("path");
const moment = require("moment");
const { makePostUrl } = require("./src/utils/urls");

const markdownQuery = (regex) => `
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { fileAbsolutePath:{ regex: "${regex}" } }
    ) {
      edges {
        node {
          frontmatter {
            slug
            date
          }
        }
      }
    }
  }
`;

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pageRegex = (s => s.raw)`/(\/content\/pages)/.*\\.md$/`;
  const pageResult = await graphql(markdownQuery(pageRegex));

  for (let edge of pageResult.data.allMarkdownRemark.edges) {
    createPage({
      path: edge.node.frontmatter.slug,
      component: path.resolve("./src/templates/page.js"),
      context: {
        slug: edge.node.frontmatter.slug
      }
    });
  }

  const postRegex = (s => s.raw)`/(\/content\/posts)/.*\\.md$/`;
  const postResult = await graphql(markdownQuery(postRegex));

  for (let edge of postResult.data.allMarkdownRemark.edges) {
    const date = moment(edge.node.frontmatter.date);
    const slug = edge.node.frontmatter.slug;
    const postPath = makePostUrl(date, slug);
    createPage({
      path: postPath,
      component: path.resolve("./src/templates/page.js"),
      context: {
        // This should query on both date and slug.
        slug: edge.node.frontmatter.slug
      }
    });
  }

  return Promise.resolve();
};
