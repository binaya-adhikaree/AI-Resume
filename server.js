require("dotenv").config();
// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use('/uploads', express.static("uploads"))

// MongoDB connection
connectDB();
// Routes
const applicantRoutes = require("./routes/applicantRoutes");
const reviewRoutes = require("./routes/reviewRoute");

app.use("/api/applicants", applicantRoutes);
app.use("/api/review-resume", reviewRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
