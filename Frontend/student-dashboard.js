document.addEventListener("DOMContentLoaded", function () {
    const name = localStorage.getItem("userName");
    document.getElementById("welcomeText").innerText = "Welcome, " + name +" !";
});

function logout() {
    localStorage.clear();
    window.location.href = "loginPage.html";
}

function goToJobs() {
    window.location.href = "apply-jobs.html";
}

function goToApplications() {
    window.location.href = "my-applications.html";
}

function goToProfile() {
    window.location.href = "view-profile.html";
}