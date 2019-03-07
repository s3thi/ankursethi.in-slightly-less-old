import React from "react";
import { graphql } from "gatsby";
import Helmet from "react-helmet";

import BaseLayout from "../components/base-layout";
import RecentPosts from "../components/recent-posts";

const Index = ({ data }) => {
  const html = data.markdownRemark.html;

  return (
    <BaseLayout>
      <Helmet title={data.site.siteMetadata.title} />
      <main>
        <section dangerouslySetInnerHTML={{ __html: html }} />
        <RecentPosts />
      </main>
    </BaseLayout>
  );
};

export const query = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "//content/index[.]md$/" }) {
      html
    }
    
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default Index;
