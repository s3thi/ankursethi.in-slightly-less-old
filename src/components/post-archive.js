import React from "react";
import { Link } from "gatsby";
import Helmet from "react-helmet";

import BaseLayout from "../components/base-layout";
import { formatNiceDate } from "../utils/dates";
import { makePostUrl } from "../utils/urls";

const PostArchive = ({ data, context, headingFn, titleFn, archivePageUrlFn }) => {
  const edges = data.allMarkdownRemark.edges;

  const showPreviousPage = context.pageNumber !== 1;
  const showNextPage = context.pageNumber !== context.numPages;
  const previousPage = context.pageNumber - 1;
  const nextPage = context.pageNumber + 1;

  return (
    <BaseLayout>
      <Helmet title={titleFn(context)} />
      <main>
        <section>
          <header className="page__header">
            <h1 className="page__title">{headingFn(context)}</h1>
          </header>
          {edges.map((edge, i) => {
            const {
              frontmatter: { title, date, slug, description },
              excerpt
            } = edge.node;
            return (
              <article>
                <header>
                  <h1 key={i}>
                    <Link to={makePostUrl(date, slug)}>{title}</Link>
                  </h1>
                  <p className="page__meta">
                    Posted on <time dateTime={date}>{formatNiceDate(date)}</time>
                  </p>
                </header>
                <p>{description || excerpt}</p>
              </article>
            );
          })}
        </section>
        <section>
          {showPreviousPage ? (
            <Link to={archivePageUrlFn(previousPage, context)}>Previous Page</Link>
          ) : null}
          {showNextPage ? (
            <Link to={archivePageUrlFn(nextPage, context)}>Next Page</Link>
          ) : null}
        </section>
      </main>
    </BaseLayout>
  );
};

export default PostArchive;
