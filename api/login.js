const uuid = require("uuid/v4");
const mongo = require("./utils/mongo");
const hash = require("./utils/hash");

const User = mongo.model("User");
const UserToken = mongo.model("UserToken");

const login = async (ctx, params) => {
  const { username, password } = params;
  const passwordHash = hash(password);
  const userWithUsername = await User.findOne({ username });
  if (!userWithUsername) {
    throw new Error("username incorrect");
  }
  if (userWithUsername.passwordHash !== passwordHash) {
    throw new Error("password incorrect");
  }
  const token = uuid();
  await UserToken.deleteMany({ userId: userWithUsername._id });
  await UserToken.create({ userId: userWithUsername._id, token });
  return { token };
};

module.exports = { func: login, validate: (params) => params.username && params.password };
