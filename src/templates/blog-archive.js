import React from "react";
import { graphql, Link } from "gatsby";
import Helmet from "react-helmet";

import BaseLayout from "../components/base-layout";
import { makeBlogArchiveUrl, makePostUrl } from "../utils/urls";
import { formatNiceDate } from "../utils/dates";

const BlogArchive = ({ data, pageContext }) => {
  const edges = data.allMarkdownRemark.edges;

  const showPreviousPage = pageContext.pageNumber !== 1;
  const showNextPage = pageContext.pageNumber !== pageContext.numPages;
  const previousPage = pageContext.pageNumber - 1;
  const nextPage = pageContext.pageNumber + 1;

  return (
    <BaseLayout>
      <Helmet
        title={`Blog Archive (Page ${pageContext.pageNumber}) — ${
          data.site.siteMetadata.title
        }`}
      />
      <main>
        <section>
          <h1>Blog Archive — Page {pageContext.pageNumber}</h1>
          {edges.map((edge, i) => {
            const {
              frontmatter: { title, date, slug, description },
              excerpt
            } = edge.node;
            return (
              <article>
                <h1 key={i}>
                  <Link to={makePostUrl(date, slug)}>{title}</Link>
                </h1>
                <p>
                  Posted on <time dateTime={date}>{formatNiceDate(date)}</time>
                </p>
                <p>{description || excerpt}</p>
              </article>
            );
          })}
        </section>
        <section>
          {showPreviousPage ? (
            <Link to={makeBlogArchiveUrl(previousPage)}>Previous Page</Link>
          ) : null}
          {showNextPage ? (
            <Link to={makeBlogArchiveUrl(nextPage)}>Next Page</Link>
          ) : null}
        </section>
      </main>
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
