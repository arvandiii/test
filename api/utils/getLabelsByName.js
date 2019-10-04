const mongo = require("./mongo");
const Promise = require("bluebird");
const Label = mongo.model("Label");

const getLabelsByName = async names => {
  return Promise.map(names, async name => {
    let label = await Label.findOne({ name });
    if (!label) {
      label = await Label.create({ name });
    }
    return label;
  });
};

module.exports = getLabelsByName;
