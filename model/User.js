const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({
  createdAt: { type: Date, default: new Date() },
  type: { type: String, enum: ["EMPLOYEE", "EMPLOYER"] },
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  employeeInfo: {
    firstName: { type: String },
    lastName: { type: String },
    birthday: { type: Number },
    gender: { type: String, enum: ["MALE", "FEMALE", "OTHER"] },
    skillIds: [{ type: ObjectId }]
  },
  employerInfo: {
    companyName: { type: String },
    companyEstablishedDate: { type: Date },
    address: { type: String },
    phoneNumber: { type: String }
  }
});

module.exports = schema;
