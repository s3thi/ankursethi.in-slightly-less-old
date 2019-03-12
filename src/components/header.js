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
      <header className="main-header">
        <nav>
          <ul>
            <li><Link to="/" className="logo">AS</Link></li>
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
