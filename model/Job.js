const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({
  createdAt: { type: Date, default: new Date() },
  title: { type: String, required: true },
  validUntil: { type: Date },
  categoryId: { type: ObjectId },
  photoUrl: { type: String },
  budget: { type: Number },
  employerId: { type: ObjectId, required: true },
  workTime: { type: String }
});

module.exports = schema;
