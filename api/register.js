const mongo = require("./utils/mongo");
const hash = require("./utils/hash");
const _ = require("underscore");

const User = mongo.model("User");

const register = async (ctx, params) => {
  const { type, username, password, emoloyeeInfo, employerInfo } = params;
  const passwordHash = hash(password);
  const userWithUsername = await User.findOne({ username });
  if (userWithUsername) {
    throw new Error("username exist");
  }
  await User.create({
    type,
    username,
    passwordHash,
    ...(type === 'EMPLOYEE' && { emoloyeeInfo }),
    ...(type === 'EMPLOYER' && { employerInfo })
  });
  return {};
};

module.exports = register;
