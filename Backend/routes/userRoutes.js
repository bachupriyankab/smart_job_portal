const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Make sure path is correct
const bcrypt = require("bcryptjs");


// ================= REGISTER =================
router.post("/register", async (req, res) => {
    try {

        const { name, email, password, role, company } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user object
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            company: role === "recruiter" ? company : null
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({
            message: "Login successful",
            user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/update-profile", async (req, res) => {
    try {
        const {
            email,
            phone,
            city,
            experience,
            Project,
            aboutProject,
            company,
            education,
            skills,
            location,
            about
        } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.phone = phone;
        user.city = city;
        user.experience = experience;
        user.Project = Project;
        user.aboutProject = aboutProject;
        user.company = company;

        user.education = education;
        user.skills = skills;
        user.location = location;
        user.about = about;

        await user.save();

        res.json({ message: "Profile updated successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});
module.exports = router;