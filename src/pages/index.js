import React from "react";
import { graphql } from "gatsby";

import BaseLayout from "../components/base-layout";
import RecentPosts from "../components/recent-posts";

const Index = ({ data }) => {
  const html = data.markdownRemark.html;

  return (
    <BaseLayout>
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
  }
`;

export default Index;
