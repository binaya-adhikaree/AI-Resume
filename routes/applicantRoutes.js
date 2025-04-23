// routes/applicantRoutes.js
const express = require('express');
const { getAllApplicants, addApplicant } = require('../controllers/applicantController');

const router = express.Router();

// Get all applicants
router.get('/', getAllApplicants);

// Add a new applicant
router.post('/', addApplicant);

module.exports = router;
