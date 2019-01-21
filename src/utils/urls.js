const moment = require("moment");
const slugify = require("slugify");

module.exports.makePostUrl = (date, slug) => {
  const d = moment(date);
  return `/${d.year()}/${d.month() + 1}/${d.date()}/${slug}`;
};

module.exports.makeCategoryUrl = (category, pageNumber) => {
  const slug = slugify(category, { lower: true });

  if (!pageNumber || pageNumber === 1) {
    return `/category/${slug}`;
  }

  return `/category/${slug}/page/${pageNumber}`;
};

module.exports.makeBlogArchiveUrl = pageNumber =>
  pageNumber === 1 ? "/blog/" : `/blog/page/${pageNumber}`;
