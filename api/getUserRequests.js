const mongo = require("./utils/mongo");
const requireAuth = require("./utils/requireAuth");

const Request = mongo.model("Request");

const getJobRequests = async (ctx, params) => {
  const requests = await Request.find({ employeeId: ctx.user._id });
  return { requests };
};

module.exports = {
  func: requireAuth(getJobRequests),
};
