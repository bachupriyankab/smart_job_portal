
document.addEventListener("DOMContentLoaded", loadApplications);
    const names = localStorage.getItem("userName");
    document.getElementById("welcomeText").innerText = "Welcome, " + names +" !";
async function loadApplications() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/applications/all"
        );

        const applications = await response.json();

        console.log("Applications:", applications); // 🔍 DEBUG

        const container = document.getElementById("applicationsContainer");

        if (!container) return;

        container.innerHTML = "";

        if (!applications || applications.length === 0) {
            container.innerHTML = "<p>No applications found.</p>";
            return;
        }
       applications.forEach(app => {

    const job = app.jobId;

    const div = document.createElement("div");
    div.className = "application-card";

    const statusClass = app.status.toLowerCase();

    div.innerHTML = `
        <h3>${job.role}</h3>
        <p><strong>Company:</strong> ${job.company}</p>
        <p><strong>Skills:</strong> ${job.skills.join(", ")}</p>

        <p><strong>Student:</strong> ${app.studentEmail}</p>
        <p class="status ${statusClass}">
            Status: ${app.status}
        </p>

        <div class="btn-group">
            <button class="approve-btn"
                onclick="updateStatus('${app._id}', 'Approved')">
                Approve
            </button>

            <button class="reject-btn"
                onclick="updateStatus('${app._id}', 'Rejected')">
                Reject
            </button>
        </div>
    `;

    container.appendChild(div);
});
       

    } catch (error) {
        console.error("Error loading applications:", error);
    }
}

async function updateStatus(applicationId, newStatus) {

    await fetch(
        `http://localhost:5000/api/applications/update-status/${applicationId}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus })
        }
    );

    alert("Status updated successfully!");
    loadApplications();
}


function logout() {
    window.location.href = "loginPage.html";
}

function goBack(){
    window.history.back();
   window.location.href = "recruiter-dashboard.html";
}