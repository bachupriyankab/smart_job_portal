const Job = require("../models/Job");
const Application = require("../models/Application");

// POST JOB
exports.postJob = async (req, res) => {
    try {
        const { role, skills, vacancies, location, salary, description, company, recruiterId } = req.body;

        const job = await Job.create({
            role,
            skills: skills.split(",").map(skill => skill.trim()),
            vacancies,
            location,
            salary,
            description,
            company,
            recruiterId
        });

        res.status(201).json({ message: "Job posted successfully", job });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// GET ALL JOBS
exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// APPLY JOB
exports.applyJob = async (req, res) => {
    try {
        const { studentEmail, jobId } = req.body;

        const alreadyApplied = await Application.findOne({ studentEmail, jobId });
        if (alreadyApplied) {
            return res.status(400).json({ message: "Already applied to this job" });
        }

        const application = await Application.create({
            studentEmail,
            jobId
        });

        res.status(201).json(application);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// GET APPLICATIONS BY EMAIL
exports.getApplications = async (req, res) => {
    try {
        const { email } = req.params;

        const applications = await Application.find({ studentEmail: email })
            .populate("jobId");

        res.json(applications);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};