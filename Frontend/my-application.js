async function loadMyApplications() {

    const userEmail = localStorage.getItem("userEmail");
    const name = localStorage.getItem("userName");
    document.getElementById("welcomeText").innerText = "Welcome, " + name +" !";
    if (!userEmail) {
        alert("Please login first!");
        window.location.href = "loginPage.html";
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:5000/api/applications/students/${userEmail}`
        );

        const applications = await response.json();

        const container = document.getElementById("applicationContainer");
        container.innerHTML = "";

        if (!applications || applications.length === 0) {
            container.innerHTML = "<p style='color:white'>No applications found.</p>";
            return;
        }

        applications.forEach(app => {

            const job = app.jobId;

            const div = document.createElement("div");
            div.className = "job-card";

            div.innerHTML = `
                <h3>${job.role}</h3>
                <p><strong>Company:</strong> ${job.company}</p>
                <p><strong>Skills:</strong> ${job.skills.join(", ")}</p>
                <p><strong>Status:</strong> ${app.status}</p>
                <p><strong>Applied On:</strong> 
                    ${new Date(app.createdAt).toLocaleDateString()}
                </p>
            `;

            container.appendChild(div);
        });

    } catch (error) {
        console.error(error);
        alert("Error loading applications");
    }
}
function logout() {
    window.location.href = "student-dashboard.html";
}

loadMyApplications();