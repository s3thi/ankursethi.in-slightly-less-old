const path = require("path");
const moment = require("moment");
const { makePostUrl, makeBlogArchiveUrl } = require("./src/utils/urls");

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
  const posts = postResult.data.allMarkdownRemark.edges;

  for (let edge of posts) {
    const date = moment(edge.node.frontmatter.date);
    const slug = edge.node.frontmatter.slug;
    const postPath = makePostUrl(date, slug);
    createPage({
      path: postPath,
      component: path.resolve("./src/templates/post.js"),
      context: {
        // TODO: this should query on both date and slug
        slug: edge.node.frontmatter.slug
      }
    });
  }

  const postsPerPage = 25;
  const numPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: makeBlogArchiveUrl(i + 1),
      component: path.resolve("./src/templates/blog-archive.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        pageNumber: i + 1,
        numPages
      }
    });
  });

  return Promise.resolve();
};
