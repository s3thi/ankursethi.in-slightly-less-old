import React from "react";
import { graphql, Link } from "gatsby";

import BaseLayout from "../components/base-layout";
import { makeBlogArchiveUrl } from "../utils/urls";

const BlogArchive = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges;

  const showPreviousPage = pageContext.pageNumber !== 1;
  const showNextPage = pageContext.pageNumber !== pageContext.numPages;
  const previousPage = pageContext.pageNumber - 1;
  const nextPage = pageContext.pageNumber + 1;

  return (
    <BaseLayout>
      <main>
        {posts.map((post, i) => (
          <h1 key={i}>{post.node.frontmatter.title}</h1>
        ))}
      </main>
      <section>
        {showPreviousPage ? (
          <Link to={makeBlogArchiveUrl(previousPage)}>Previous Page</Link>
        ) : null}
        {showNextPage ? (
          <Link to={makeBlogArchiveUrl(nextPage)}>Next Page</Link>
        ) : null}
      </section>
    </BaseLayout>
  );
};

export const query = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//content/posts/.*[.]md$/" } }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          frontmatter {
            title
          }
        }
      }
    }
  }
`;

export default BlogArchive;
