const express = require("express");
const router = express.Router();
const Job = require("../models/Job");


// ================= CREATE JOB =================
router.post("/create", async (req, res) => {
     console.log("Create Job API called");
    try {
        console.log("Request Body:", req.body);

        const {
            recruiterId,
            role,
            company,
            skills,
            vacancies,
            location,
            salary,
            description
        } = req.body;
 
        // Validation
        if (!recruiterId || !role || !skills || !description) {
            return res.status(400).json({ message: "Required fields missing" });
        }


        // Handle skills (string or array)
        let skillsArray;
        if (Array.isArray(skills)) {
            skillsArray = skills;
        } else {
            skillsArray = skills.split(",").map(skill => skill.trim());
        }

       
        const newJob = new Job({
            recruiterId,
            role,
            company,
            skills : skillsArray,
            vacancies,
            location,
            salary,
            description
        });

        await newJob.save();

        res.status(201).json({ message: "Job posted successfully" });

    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).json({ message: error.message });
    }
});


// ================= GET ALL JOBS =================
router.get("/all", async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ message: "Server error while fetching jobs" });
    }
});


// ================= GET JOBS BY RECRUITER =================
router.get("/recruiter/:recruiterId", async (req, res) => {
    try {
        const jobs = await Job.find({
            recruiterId: req.params.recruiterId
        }).sort({ createdAt: -1 });

        res.status(200).json(jobs);

    } catch (error) {
        console.error("Error fetching recruiter jobs:", error);
        res.status(500).json({ message: "Error fetching recruiter jobs" });
    }
});


// ================= GET SINGLE JOB =================
router.get("/:id", async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json(job);

    } catch (error) {
        console.error("Error fetching job:", error);
        res.status(500).json({ message: "Server error" });
    }
});


// ================= SEARCH JOBS =================
router.post("/search", async (req, res) => {
    try {
        const { role, company, skills } = req.body;

        let query = {};

        if (role) {
            query.role = { $regex: role, $options: "i" };
        }

        if (company) {
            query.company = { $regex: company, $options: "i" };
        }

        if (skills) {
            query.skills = { $regex: skills, $options: "i" };
        }

        const jobs = await Job.find(query).sort({ createdAt: -1 });

        res.status(200).json(jobs);

    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ message: "Error searching jobs" });
    }
});

module.exports = router;