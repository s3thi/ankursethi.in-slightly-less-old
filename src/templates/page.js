import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";

import BaseLayout from "../components/base-layout";

const PageTemplate = ({ data }) => {
  const post = data.markdownRemark;
  return (
    <BaseLayout>
      <Helmet title={`${post.frontmatter.title} — ${data.site.siteMetadata.title}`} />
      <main>
        <header className="page__header">
          <h1 className="page__title">{post.frontmatter.title}</h1>
        </header>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </main>
    </BaseLayout>
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

    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default PageTemplate;
