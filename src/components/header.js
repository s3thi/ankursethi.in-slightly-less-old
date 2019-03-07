import React from "react";
import { graphql, StaticQuery, Link } from "gatsby";

const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

const Header = ({ data }) => (
  <StaticQuery
    query={query}
    render={data => (
        <header>
          <h1 className="logo">{data.site.siteMetadata.title}</h1>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/work">Work</Link></li>
              <li><Link to="/talks">Talks</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/about-contact">About + Contact</Link></li>
            </ul>
          </nav>
        </header>
    )}
  />
);

export default Header;
