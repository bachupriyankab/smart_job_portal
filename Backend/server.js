// 1️⃣ Load dotenv FIRST
require("dotenv").config();

// 2️⃣ Import packages
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const recruiterRoutes = require("./routes/recruiterRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const studentRoutes = require("./routes/studentRoutes");
const jobRoutes = require("./routes/jobRoutes");


// 3️⃣ Connect Database
connectDB();

// 4️⃣ Initialize app
const app = express();

// 5️⃣ Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 6️⃣ Routes
app.use("/api/students", require("./routes/userRoutes"));
app.use("/api/jobs", jobRoutes);
app.use("/api/applications",applicationRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/recruiter", recruiterRoutes);
// 7️⃣ Start Server
app.get("/", (req, res) => {
    res.send("Server is working");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});