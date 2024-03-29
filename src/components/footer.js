import React from "react";
import { graphql, StaticQuery } from "gatsby";

const query = graphql`
  query {
    site {
      siteMetadata {
        socialLinks {
          service
          url
        }
      }
    }
  }
`;

const Footer = ({ data }) => (
  <StaticQuery
    query={query}
    render={data => (
      <footer>
        <nav>
          <h1>Social</h1>
          <ul>
            {data.site.siteMetadata.socialLinks.map((l, i) => (
              <li key={i}>
                <a href={l.url}>{l.service}</a>
              </li>
            ))}
          </ul>
        </nav>
      </footer>
    )}
  />
);

export default Footer;
