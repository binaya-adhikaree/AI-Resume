const express = require("express");
const { reviewResume } = require("../controllers/resumeReviewController");

const upload = require("../middlewares/upload");
const extractTextFromPDF = require("../middlewares/extractText");

const router = express.Router();

// Main route: upload → extract text → review resume
router.post("/", upload.single("file"), extractTextFromPDF, reviewResume);

router.post("/", (req, res, next) => {
    console.log("✅ Review resume route hit");
    next();
  }, upload.single("file"), reviewResume);
  

module.exports = router;
