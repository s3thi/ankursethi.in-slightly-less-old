import React from "react";
import { graphql } from "gatsby";

const PageTemplate = ({ data }) => {
  const post = data.markdownRemark;
  return (
    <div>
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  )
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug }}) {
      html
      frontmatter {
        title
      }
    }
  }
`;

export default PageTemplate;