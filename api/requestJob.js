const mongo = require("./utils/mongo");
const requireAuth = require("./utils/requireAuth");

const Job = mongo.model("Job");
const Request = mongo.model("Request");

const getJobRequests = async (ctx, params) => {
  const { jobId } = params;
  const job = await Job.findOne({
    _id: body.jobId
  });
  if (!job) {
    throw new Error("invalid job");
  }
  const request = await Request.create({ jobId, employeeId: ctx.user._id });
  return { request };
};

module.exports = {
  func: requireAuth(getJobRequests),
  validateParams: () => True,
  permissionCheck: async (ctx, body) => ctx.user.type === "EMPLOYEE"
};
