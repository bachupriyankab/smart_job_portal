const express = require("express");
const router = express.Router();
const Application = require("../models/Application");


// ================= APPLY JOB =================
router.post("/apply", async (req, res) => {
    try {
        const { studentEmail, jobId } = req.body;

        const existing = await Application.findOne({ studentEmail, jobId });

        if (existing) {
            return res.status(400).json({ message: "Already applied" });
        }

        const newApplication = new Application({
            studentEmail,
            jobId,
            status: "Pending"
        });

        await newApplication.save();

        res.status(201).json({ message: "Application submitted successfully" });

    } catch (error) {
        console.error("Apply error:", error);
        res.status(500).json({ message: "Server error" });
    }
});


// ================= GET APPLICATIONS FOR STUDENT =================
router.get("/students/:email", async (req, res) => {
    try {
        const applications = await Application.find({
            studentEmail: req.params.email
        }).populate("jobId");

        res.json(applications);

    } catch (error) {
        console.error("Student fetch error:", error);
        res.status(500).json({ message: "Error loading applications" });
    }
});


// ================= GET ALL APPLICATIONS (Optional Admin Use) =================
router.get("/all", async (req, res) => {
    try {
        const applications = await Application.find().populate("jobId");
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: "Error fetching applications" });
    }
});


// ================= GET APPLICATIONS FOR RECRUITER (BY JOB) =================
router.get("/job/:jobId", async (req, res) => {
    try {
        const applications = await Application.find({
            jobId: req.params.jobId
        }).populate("jobId");

        res.json(applications);

    } catch (error) {
        console.error("Recruiter fetch error:", error);
        res.status(500).json({ message: "Error fetching applications" });
    }
});


// ================= UPDATE APPLICATION STATUS =================
router.put("/update-status/:id", async (req, res) => {
    try {
        const { status } = req.body;

        const updated = await Application.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        res.json(updated);

    } catch (error) {
        console.error("Update status error:", error);
        res.status(500).json({ message: "Error updating status" });
    }
});

module.exports = router;