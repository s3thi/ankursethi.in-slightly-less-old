const moment = require("moment");

module.exports.makePostUrl = (date, slug) => {
  const d = moment(date);
  return `/${d.year()}/${d.month() + 1}/${d.date()}/${slug}`;
};
