document.addEventListener("DOMContentLoaded", function () {
    loadProfile();

    const name = localStorage.getItem("userName");
    if (name) {
        document.getElementById("welcomeText").innerText =
            "Welcome, " + name + " !";
    }
});

async function loadProfile() {
    const email = localStorage.getItem("userEmail");

    const response = await fetch(
        "http://localhost:5000/api/recruiter/profile/" + email
    );

    const data = await response.json();

    document.getElementById("name").value = data.name || "";
    document.getElementById("email").value = data.email || "";
    document.getElementById("company").value = data.company || "";
    document.getElementById("phone").value = data.phone || "";
    document.getElementById("experience").value = data.experience || "";
    document.getElementById("city").value = data.city || "";
    document.getElementById("project").value = data.project || "";
    document.getElementById("aboutProject").value = data.aboutProject || "";
}

document.getElementById("profileForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const profileData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        company: document.getElementById("company").value,
        phone: document.getElementById("phone").value,
        experience:document.getElementById("experience").value,
        city: document.getElementById("city").value,
        project: document.getElementById("project").value,
        aboutProject: document.getElementById("aboutProject").value
    };

    const response = await fetch(
        "http://localhost:5000/api/recruiter/update-profile",
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profileData)
        }
    );

    const result = await response.json();
    document.getElementById("profileMessage").innerText = result.message;
});

function logout() {
    window.location.href = "recruiter-dashboard.html";
}
