import React from "react";
import { graphql } from "gatsby";

import PostArchive from "../components/post-archive";
import { makeBlogArchiveUrl } from "../utils/urls";

const BlogArchive = ({ data, pageContext }) => {
  const titleFn = context =>
    `Blog Archive (Page ${context.pageNumber}) — ${
      data.site.siteMetadata.title
    }`;
  const headingFn = context => `Blog Archive - Page ${context.pageNumber}`;
  const archivePageUrlFn = pageNumber => makeBlogArchiveUrl(pageNumber);

  return (
    <PostArchive
      data={data}
      context={pageContext}
      titleFn={titleFn}
      headingFn={headingFn}
      archivePageUrlFn={archivePageUrlFn}
    />
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
          excerpt
          frontmatter {
            title
            date
            description
            slug
          }
        }
      }
    }

    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default BlogArchive;
