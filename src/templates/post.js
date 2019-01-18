import React from "react";
import { graphql, Link } from "gatsby";
import Helmet from "react-helmet";

import BaseLayout from "../components/base-layout";
import { formatNiceDate } from "../utils/dates";
import { makeCategoryUrl } from "../utils/urls";

const PageTemplate = ({ data }) => {
  const post = data.markdownRemark;
  const {
    html,
    frontmatter: { title, category, date }
  } = post;
  const niceDate = formatNiceDate(post.frontmatter.date);

  return (
    <BaseLayout>
      <Helmet title={`${title} — ${data.site.siteMetadata.title}`} />
      <main>
        <article>
          <h1>{title}</h1>
          <p>
            Posted on <time dateTime={date}>{niceDate}</time> in{" "}
            <Link to={makeCategoryUrl(category)}>{category}</Link>
          </p>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </main>
    </BaseLayout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        category
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
