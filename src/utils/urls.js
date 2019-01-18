const moment = require("moment");
const slugify = require("slugify");

module.exports.makePostUrl = (date, slug) => {
  const d = moment(date);
  return `/${d.year()}/${d.month() + 1}/${d.date()}/${slug}`;
};

module.exports.makeCategoryUrl = category =>
  `/category/${slugify(category, { lower: true })}/`;
