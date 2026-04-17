document.addEventListener("DOMContentLoaded", function () {
    loadProfile();

    const name = localStorage.getItem("userName");
    if (name) {
        document.getElementById("welcomeText").innerText =
            "Welcome, " + name + "!";
    }
});

async function loadProfile() {
    const email = localStorage.getItem("userEmail");

    const response = await fetch(
        "http://localhost:5000/api/recruiter/profile/" + email
    );

    const data = await response.json();

    document.getElementById("name").innerText = data.name || "";
    document.getElementById("email").innerText = data.email || "";
    document.getElementById("company").innerText = data.company || "";
    document.getElementById("phone").innerText = data.phone || "";
    document.getElementById("city").innerText = data.city || "";
    document.getElementById("experience").innerText = data.experience || "";
    document.getElementById("project").innerText = data.project || "";
    document.getElementById("aboutProject").innerText = data.aboutProject || "";
}

function logout() {
    window.location.href = "recruiter-dashboard.html";
}

function goToUpdateProfile() {
    window.location.href = "recruiter-profile.html";
}