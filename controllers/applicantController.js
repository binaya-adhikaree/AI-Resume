// controllers/applicantController.js
const Applicant = require("../models/Applicant");
const Joi = require("joi");


const applicantSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  resumeUrl: Joi.string().uri().required(), // Assuming you're passing a URL instead of file upload
  skills: Joi.array().items(Joi.string()).required(),
  experience: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
});

// Get all applicants
const getAllApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.find();
    res.json(applicants);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Add a new applicant
const addApplicant = async (req, res) => {
  const { error } = applicantSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { name, email, resumeUrl, skills, experience, tags } = req.body;

  try {
    const newApplicant = new Applicant({
      name,
      email,
      resumeUrl,
      skills,
      experience,
      tags,
    });

    const savedApplicant = await newApplicant.save();
    res.json(savedApplicant);
  } catch (err) {
    res.status(500).json({ error: "Failed to add applicant" });
  }
};

module.exports = {
  getAllApplicants,
  addApplicant,
};
