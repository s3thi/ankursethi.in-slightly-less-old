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
        <h1>{data.site.siteMetadata.title}</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/work/">Work</Link>
          <Link to="/talks/">Talks</Link>
          <Link to="/blog/">Blog</Link>
          <Link to="/about-contact/">About + Contact</Link>
        </nav>
      </header>
    )}
  />
);

export default Header;
