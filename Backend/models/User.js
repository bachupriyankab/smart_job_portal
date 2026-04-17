const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "recruiter"],
        required: true
    },


    // Recruiter Fields
    company: {
        type: String,
        default: ""
    },

    phone: {
        type: String,
        default: ""
    },

    city: {
        type: String,
        default: ""
    },

    experience: {
        type: String,
        default: ""
    },

    project: {
        type: String,
        default: ""
    },

    aboutProject: {
        type: String,
        default: ""
    },

    

    // Student Profile Fields

    education: {
        type: String
    },
    skills: {
        type: [String]
    },
    location: {
        type: String
    },
    about: {
        type: String
    }

    

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);