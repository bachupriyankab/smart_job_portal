const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    company: {
        type: String,
        default: "Not Specified"
    },
    skills: [{
        type: String
    }],
    vacancies: {
        type: Number,
        default: 1
    },
    location: {
        type: String,
        default: "Not Specified"
    },
    salary: {
        type: String,
        default: "Not Specified"
    },
    description: {
        type: String,
        required: true
    },
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);