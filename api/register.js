const mongo = require("./utils/mongo");
const hash = require("./utils/hash");
const _ = require("underscore");

const User = mongo.model("User");

const register = async (ctx, params) => {
  const { type, username, password, employeeInfo, employerInfo } = params;
  const passwordHash = hash(password);
  const userWithUsername = await User.findOne({ username });
  if (userWithUsername) {
    throw new Error("username exist");
  }
  const user = await User.create({
    type,
    username,
    passwordHash,
    ...(type === "EMPLOYEE" && { employeeInfo }),
    ...(type === "EMPLOYER" && { employerInfo })
  });
  return { user };
};

module.exports = {
  func: register,
  validateParams: params =>
    params.type &&
    params.username &&
    params.password &&
    ((params.employeeInfo &&
      params.employeeInfo.firstName &&
      params.employeeInfo.lastName &&
      params.employeeInfo.birthday &&
      params.employeeInfo.gender) ||
      (params.employerInfo &&
        params.employerInfo.companyName &&
        params.employerInfo.companyEstablishedDate &&
        params.employerInfo.address &&
        params.employerInfo.phoneNumber))
};
