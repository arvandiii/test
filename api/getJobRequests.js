const mongo = require("./utils/mongo");
const requireAuth = require("./utils/requireAuth");

const Job = mongo.model("Job");
const Request = mongo.model("Request");

const getJobRequests = async (ctx, params) => {
  const { jobId } = params;
  const requests = await Request.find({ jobId });
  return { requests };
};

module.exports = {
  func: requireAuth(getJobRequests),
  validateParams: () => true,
  permissionCheck: async (ctx, body) => {
    if (ctx.user.type !== "EMPLOYER") {
      return false;
    }
    const job = await Job.findOne({
      _id: body.jobId,
      employerId: ctx.user._id
    });
    return !!job;
  }
};
