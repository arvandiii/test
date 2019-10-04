const mongo = require("./utils/mongo");
const requireAuth = require("./utils/requireAuth");

const Job = mongo.model("Job");
const Request = mongo.model("Request");

const editJobInfo = async (ctx, params) => {
  const { requestId, state, interviewInfo } = params;
  const request = await Request.findOneAndUpdate(
    { _id: requestId },
    { $set: { state, interviewInfo } },
    { new: true }
  );
  return { request };
};

module.exports = {
  func: requireAuth(editJobInfo),
  validateParams: params => true,
  permissionCheck: async (ctx, body) => {
    if (ctx.user.type !== "EMPLOYER") {
      return false;
    }
    const request = await Request.findOne({ _id: body.requestId });
    if (!request) {
      return false;
    }
    const job = await Job.findOne({
      _id: request.jobId,
      employerId: ctx.user._id
    });
    return !!job;
  }
};
