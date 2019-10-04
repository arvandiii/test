const mongo = require("./utils/mongo");
const _ = require("underscore");
const requireAuth = require("./utils/requireAuth");
const getLabelsByName = require("./utils/getLabelsByName");

const User = mongo.model("User");

const editUserInfo = async (ctx, params) => {
  const { password, employeeInfo, employerInfo } = params;
  const {
    user: { _id: userId }
  } = ctx;
  const query = password ? { password } : {};
  if (employerInfo) {
    Object.assign(query, {
      employerInfo: {
        companyName: employerInfo.companyName,
        companyEstablishedDate: employerInfo.companyEstablishedDate,
        address: employerInfo.address,
        phoneNumber: employerInfo.phoneNumber
      }
    });
  } else if (employeeInfo) {
    const { skills: skillNames } = employeeInfo;
    const skills = await getLabelsByName(skillNames);
    Object.assign(query, {
      employeeInfo: {
        firstName: employeeInfo.firstName,
        lastName: employeeInfo.lastName,
        birthday: employeeInfo.birthday,
        gender: employeeInfo.gender,
        skillIds: _.map(skills, s => s._id)
      }
    });
  }
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { $set: query },
    { new: true }
  );
  return { user };
};

module.exports = {
  func: requireAuth(editUserInfo),
  validateParams: () => true
};
