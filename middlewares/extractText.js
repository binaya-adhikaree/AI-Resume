const pdfParse = require("pdf-parse");
const fs = require("fs");
const path = require("path");

const extractTextFromPDF = (req, res, next) => {
  const file = req.file; // The file uploaded in the previous step
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const filePath = path.join(__dirname, "..", "uploads", file.filename);

  // Extract text from the uploaded PDF
  pdfParse(fs.readFileSync(filePath))
    .then((data) => {
      req.extractedText = data.text; // Save the extracted text for later use
      next(); // Continue to the next middleware (AI review)
    })
    .catch((error) => {
      console.error("Error extracting text from PDF:", error);
      return res
        .status(500)
        .json({ message: "Failed to extract text from PDF" });
    });
};

module.exports = extractTextFromPDF;
