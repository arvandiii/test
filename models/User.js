const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({
  createdAt: { type: Date, default: new Date() },
  type: { type: String, enum: ["EMPLOYEE", "EMPLOYER"] },
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  emoloyeeInfo: {
    firstName: { type: String },
    lastName: { type: String },
    birthYear: { type: Number },
    gender: { type: String, enum: ["MALE", "FEMALE", "OTHER"] }
  },
  employerInfo: {
    companyName: { type: String },
    companyEstablishedYear: { type: Number },
    address: { type: String },
    phoneNumber: { type: String }
  },
  skillIds: [{ type: ObjectId }]
});

module.exports = schema;
