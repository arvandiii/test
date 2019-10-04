const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  createdAt: { type: Date, default: new Date() },
  employee: { type: ObjectId, required: true },
  job: { type: ObjectId, required: true },
  state: {
    type: String,
    enum: ["PENDING", "REJECTED", "ACCEPTED"],
    default: "PENDING"
  },
  interviewInfo: {
    date: { type: Date },
    interviewerName: { type: String }
  }
});

module.exports = schema;
