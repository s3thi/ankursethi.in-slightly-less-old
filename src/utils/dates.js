const moment = require("moment");

module.exports.formatNiceDate = isoString =>
  moment(isoString).format("MMMM D, YYYY");
