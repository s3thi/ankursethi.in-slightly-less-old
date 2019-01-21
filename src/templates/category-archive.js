import React from "react";
import { graphql } from "gatsby";

import PostArchive from "../components/post-archive";
import { makeCategoryUrl } from "../utils/urls";

const CategoryArchive = ({ data, pageContext }) => {
  const titleFn = context =>
    `Archive for ${context.category} (Page ${context.pageNumber}) — ${
      data.site.siteMetadata.title
    }`;
  const headingFn = context =>
    `Archive for ${context.category} - Page ${context.pageNumber}`;
  const archivePageUrlFn = (pageNumber, context) =>
    makeCategoryUrl(context.category, pageNumber);

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
  query categoryListQuery($skip: Int!, $limit: Int!, $category: String!) {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "//content/posts/.*[.]md$/" }
        frontmatter: { category: { eq: $category } }
      }
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

export default CategoryArchive;
