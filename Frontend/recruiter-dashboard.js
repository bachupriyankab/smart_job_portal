// Welcome Message
document.addEventListener("DOMContentLoaded", function () {
    const userName = localStorage.getItem("userName");

    if (userName) {
        document.getElementById("welcomeText").innerText =
            "Welcome, " + userName + " !";
    }
});

// Navigation Functions
function openPostJob() {
    window.location.href = "post-job.html";
}

function goToPostedJobs() {
    window.location.href = "jobs.html";
}

function goToApplications() {
    window.location.href = "view-applicants.html";
}

function openProfile() {
    window.location.href = "recruiter-view-profile.html";
}

function logout() {
    localStorage.clear();
    window.location.href = "loginPage.html";
}