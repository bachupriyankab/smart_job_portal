const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    studentEmail: {
        type: String,
        required: true
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    }
}, { timestamps: true });

module.exports = mongoose.model("Application", applicationSchema);