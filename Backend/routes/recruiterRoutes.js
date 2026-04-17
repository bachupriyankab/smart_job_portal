const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get Recruiter Profile
router.get("/profile/:email", async (req, res) => {
    try {
        const recruiter = await User.findOne({
            email: req.params.email,
            role: "recruiter"
        });

        if (!recruiter) {
            return res.status(404).json({ message: "Recruiter not found" });
        }

        res.json(recruiter);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});


// Update Recruiter Profile
router.put("/update-profile", async (req, res) => {
    try {
        const {
            email,
            company,
            phone,
            city,
            experience,
            project,
            aboutProject
        } = req.body;

        const recruiter = await User.findOne({
            email: email,
            role: "recruiter"
        });

        if (!recruiter) {
            return res.status(404).json({ message: "Recruiter not found" });
        }

        recruiter.company = company;
        recruiter.phone = phone;
        recruiter.city = city;
        recruiter.experience = experience;
        recruiter.project = project;
        recruiter.aboutProject = aboutProject;

        await recruiter.save();

        res.json({ message: "Profile updated successfully" });

    } catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;