const mongo = require("./utils/mongo");

const Job = mongo.model("Job");

const getJobs = async (ctx, params) => {
  const query = {};
  if (ctx && ctx.user && ctx.user.skillIds) {
    // update query based on user skillIds
  }
  const jobs = await Job.find();
  return { jobs };
};

module.exports = {
  func: getJobs
};
