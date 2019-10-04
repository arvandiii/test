const mongo = require("./utils/mongo");
const requireAuth = require("./utils/requireAuth");

const Job = mongo.model("Job");

const editJobInfo = async (ctx, params) => {
  const { jobId } = params;
  const {
    user: { _id: userId }
  } = ctx;
  const job = await Job.findOneAndUpdate(
    { _id: jobId },
    { $set: { ...params, employerId: userId } },
    { new: true }
  );
  return { job };
};

module.exports = {
  func: requireAuth(editJobInfo),
  validateParams: params =>
    params.jobId !== undefined &&
    params.title !== undefined &&
    params.validUntil !== undefined &&
    params.category !== undefined &&
    params.photoUrl !== undefined &&
    params.budget !== undefined &&
    params.workTime !== undefined,
  permissionCheck: async (ctx, body) => {
    console.log(ctx.user.type);
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
