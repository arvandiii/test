const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  createdAt: { type: Date, default: new Date() },
  title: { type: String, required: true },
  validUntil: { type: Date },
  category: { type: ObjectId },
  photoUrl: { type: String },
  budget: { type: Number },
  employer: { type: ObjectId, required: true },
  workTime: { type: String }
});

module.exports = schema;
