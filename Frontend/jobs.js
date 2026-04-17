document.addEventListener("DOMContentLoaded", async function () {

    const recruiterId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    if (!recruiterId) {
        alert("Please login again");
        return;
    }
   if (userName) {
    document.getElementById("welcomeText").innerText =
        "Welcome, " + userName + " !";
}

    try {
        const response = await fetch(`http://localhost:5000/api/jobs/recruiter/${recruiterId}`);
        const jobs = await response.json();

        const container = document.getElementById("jobsContainer");
        container.innerHTML = "";

        if (jobs.length === 0) {
            container.innerHTML = "<p>No jobs posted yet.</p>";
            return;
        }

        jobs.forEach(job => {
            const jobCard = document.createElement("div");
            jobCard.classList.add("job-card");

            jobCard.innerHTML = `
                <h3>${job.role}</h3>
                <p><b>Company:</b> ${job.company}</p>
                <p><b>Location:</b> ${job.location}</p>
                <p><b>Salary:</b> ${job.salary}</p>
                <p><b>Vacancies:</b> ${job.vacancies}</p>
                <p><b>Skills:</b> ${job.skills.join(", ")}</p>
                <p><b>Description:</b> ${job.description}</p>
                <hr>
            `;

            container.appendChild(jobCard);
        });

    } catch (error) {
        console.error("Error loading jobs:", error);
    }

});

function goBack() {
    window.location.href = "recruiter-dashboard.html";
}

function logout() {
    window.location.href = "loginPage.html";
}