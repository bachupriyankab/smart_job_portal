function goBack() {
    window.location.href = "student-dashboard.html";
}

function logout() {
    localStorage.removeItem("userEmail");
    window.location.href = "loginPage.html";
}

// ================= APPLY JOB =================
async function applyJob(jobId) {

    const studentEmail = localStorage.getItem("userEmail");

    if (!studentEmail) {
        alert("Please login first!");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/applications/apply", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                studentEmail,
                jobId
            })
        });

        const result = await response.json();

        if (response.ok) {
            alert("Applied successfully ✅");
        } else {
            alert(result.message);
        }

    } catch (error) {
        console.error("Apply error:", error);
    }
}

// ================= LOAD RESULTS =================
async function loadResults() {

    const filters = JSON.parse(localStorage.getItem("searchFilters"));

    if (!filters) {
        return;
    }

    try {

        const response = await fetch("http://localhost:5000/api/jobs/all");
        const jobs = await response.json();

        const container = document.getElementById("jobContainer");
        container.innerHTML = "";

        // 🔎 Correct Filtering Logic (MATCHES YOUR DB STRUCTURE)
        const filteredJobs = jobs.filter(job => {

            const roleMatch =
                !filters.role ||
                job.role.toLowerCase() === filters.role.toLowerCase();

            const companyMatch =
                !filters.company ||
                job.company.toLowerCase() === filters.company.toLowerCase();

            const skillsMatch =
                !filters.skills || filters.skills.length === 0 ||
                 filters.skills.every(skill =>
                  job.skills.map(s => s.toLowerCase())
                .includes(skill.toLowerCase())
                    );

            return roleMatch && companyMatch && skillsMatch;
        });

        if (filteredJobs.length === 0) {
            container.innerHTML = "<p style='color:white;'>No matching jobs found.</p>";
            return;
        }

        filteredJobs.forEach(job => {

            const div = document.createElement("div");
            div.className = "job-card";

            div.innerHTML = `
                <h3>${job.role}</h3>
                <p><strong>Company:</strong> ${job.company}</p>
                <p><strong>Location:</strong> ${job.location || "Not specified"}</p>
                <p><strong>Salary:</strong> ${job.salary || "Not specified"}</p>
                <p><strong>Skills:</strong> ${job.skills.join(", ")}</p>
                <p><strong>Description:</strong> ${job.description}</p>
                <button class="apply-btn" onclick="applyJob('${job._id}')">Apply</button>
            `;

            container.appendChild(div);
        });

    } catch (error) {
        console.error("Error loading results:", error);
    }
}

loadResults();