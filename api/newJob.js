const mongo = require("./utils/mongo");
const requireAuth = require("./utils/requireAuth");

const Job = mongo.model("Job");

const newJob = async (ctx, params) => {
  const {
    user: { _id: userId }
  } = ctx;
  const job = await Job.create({ ...params, employerId: userId });
  return { job };
};

module.exports = {
  func: requireAuth(newJob),
  validateParams: params =>
    params.title != undefined &&
    params.validUntil != undefined &&
    params.category != undefined &&
    params.photoUrl != undefined &&
    params.budget != undefined &&
    params.workTime != undefined,
  permissionCheck: async (ctx, body) => ctx.user.type == "EMPLOYER"
};
