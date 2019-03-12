import React from "react";
import { graphql, Link, StaticQuery } from "gatsby";

import { makePostUrl } from "../utils/urls";
import { formatNiceDate } from "../utils/dates";

const RecentPosts = () => (
  <StaticQuery
    query={query}
    render={data => {
      const recentPosts = data.allMarkdownRemark.edges;

      return (
        <section>
          <h1>Recent Posts</h1>
          <ul className="recent-posts__list">
          {recentPosts.map(({ node: { frontmatter, excerpt } }, i) => {
            const niceDate = formatNiceDate(frontmatter.date);

            return (
              <li key={i}>
                <Link to={makePostUrl(frontmatter.date, frontmatter.slug)}>
                  {frontmatter.title}
                </Link>
                <time className="recent-posts__meta" dateTime={frontmatter.date}> — {niceDate}</time>
              </li>
            );
          })}
          </ul>
          <Link to="/blog">More posts</Link>
        </section>
      );
    }}
  />
);

const query = graphql`
  query {
    allMarkdownRemark(
      limit: 5
      filter: { fileAbsolutePath: { regex: "//content/posts/.*[.]md$/" } }
      sort: { order: DESC, fields: [frontmatter___date] }
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
  }
`;

export default RecentPosts;
