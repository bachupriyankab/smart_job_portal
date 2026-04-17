const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get student profile
router.get("/profile/:email", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update student profile
router.put("/profile/update/:email", async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { email: req.params.email },
            {
                phone: req.body.phone,
                education: req.body.education,
                skills: req.body.skills,
                location: req.body.location,
                about: req.body.about
            },
            { new: true }
        );

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;