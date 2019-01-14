const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);

  for (let edge of result.data.allMarkdownRemark.edges) {
    createPage({
      path: edge.node.frontmatter.slug,
      component: path.resolve("./src/templates/page.js"),
      context: {
        slug: edge.node.frontmatter.slug
      }
    });
  }

  return Promise.resolve();
};
