const mongo = require("./utils/mongo");

const Job = mongo.model("Job");

const getJobs = async (ctx, params) => {
  const jobs = await Job.find();
  return { jobs };
};

module.exports = {
  func: getJobs,
};
