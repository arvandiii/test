const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({
  createdAt: { type: Date, default: new Date() },
  employeeId: { type: ObjectId, required: true },
  jobId: { type: ObjectId, required: true },
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
