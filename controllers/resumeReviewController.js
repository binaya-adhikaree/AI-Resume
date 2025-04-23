const pdfParse = require("pdf-parse");
const fs = require("fs");
const path = require("path");

const extractTextFromPDF = async (filePath) => {
  const pdfParser = new PDFParser();
  pdfParser.loadPDF(filePath);

  return new Promise((resolve, reject) => {
    pdfParser.on("pdfParser_dataError", (errData) =>
      reject(errData.parserError)
    );
    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      const text = pdfData.formImage.Pages.map((page) =>
        page.Texts.map((text) => decodeURIComponent(text.R[0].T)).join("")
      ).join("");
      resolve(text);
    });
  });
};

const reviewResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const resumeFilePath = path.join(__dirname, "../uploads", req.file.filename);

  try {
    // Extract text from PDF
    const extractedText = await extractTextFromPDF(resumeFilePath);

    console.log("Extracted Text:", extractedText); // Log the extracted text

    if (!extractedText) {
      return res.status(400).json({ message: "No text extracted from resume" });
    }

    const prompt = `Review the following resume and provide feedback:\n\n${extractedText}`;

    // Make sure you're correctly calling OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an AI that provides feedback on resumes.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    res.json({
      message: "Resume reviewed successfully",
      review: response.choices[0].message.content,
    });
  } catch (err) {
    console.error("Failed to review resume", err);
    res.status(500).json({ error: "Failed to review resume" });
  }
};

module.exports = { reviewResume };
