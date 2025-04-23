// models/Applicant.js
const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  resumeUrl: { type: String, required: true },
  skills: { type: [String], required: true },
  experience: { type: String, required: true },
  tags: { type: [String], required: true },
});

const Applicant = mongoose.model("Applicant", applicantSchema);

module.exports = Applicant;
