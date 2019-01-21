const path = require("path");
const moment = require("moment");
const { makePostUrl, makeBlogArchiveUrl, makeCategoryUrl } = require("./src/utils/urls");

const UNCATEGORIZED_KEY = "Uncategorized";
const POSTS_PER_PAGE = 25;

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
            category
          }
        }
      }
    }
  }
`;

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Create pages from Markdown.
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

  // We'll collect all the post categories in this.
  const categories = new Map([[UNCATEGORIZED_KEY, 0]]);

  // Create posts from Markdown.
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

    if (edge.node.frontmatter.category) {
      const count = categories.get(edge.node.frontmatter.category);
      if (count) {
        categories.set(edge.node.frontmatter.category, count + 1);
      } else {
        categories.set(edge.node.frontmatter.category, 1);
      }
    } else {
      categories.set(UNCATEGORIZED_KEY, categories.get(UNCATEGORIZED_KEY) + 1);
    }
  }

  // Posts per page for archive and category pages.

  // Create an archive page.
  // TODO: use a for loop instead of forEach.
  const numArchivePages = Math.ceil(posts.length / POSTS_PER_PAGE);
  Array.from({ length: numArchivePages }).forEach((_, i) => {
    createPage({
      path: makeBlogArchiveUrl(i + 1),
      component: path.resolve("./src/templates/blog-archive.js"),
      context: {
        limit: POSTS_PER_PAGE,
        skip: i * POSTS_PER_PAGE,
        pageNumber: i + 1,
        numPages: numArchivePages
      }
    });
  });

  // Create category pages.
  // TODO: use a for loop instead of forEach.
  categories.forEach((numPosts, category) => {
    const numCategoryPages = Math.ceil(numPosts / POSTS_PER_PAGE);
    Array.from({ length: numCategoryPages }).forEach((_, i) => {
      createPage({
        path: makeCategoryUrl(category, i + 1),
        component: path.resolve("./src/templates/category-archive.js"),
        context : {
          limit: POSTS_PER_PAGE,
          skip: i * POSTS_PER_PAGE,
          pageNumber: i + 1,
          category,
          numPages: numCategoryPages
        }
      });
    });
  });

  return Promise.resolve();
};
