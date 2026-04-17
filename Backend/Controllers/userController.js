const User = require("../models/User");
const bcrypt = require("bcryptjs");

// REGISTER
exports.register = async (req, res) => {
    try {
        const { name, email, password, role,company } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            company : role =="Recruiter" ? company :null 

        });

        res.status(201).json({ message: "Registration successful" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.json({
            message: "Login successful",
            user
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};