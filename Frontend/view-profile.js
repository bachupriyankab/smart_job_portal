document.addEventListener("DOMContentLoaded", loadProfile);

async function loadProfile() {
    const email = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");

    if (userName) {
    document.getElementById("welcomeText").innerText =
        "Welcome, " + userName + " !";
}


    const response = await fetch(`http://localhost:5000/api/students/profile/${email}`);
    const user = await response.json();

    document.getElementById("name").innerText = user.name;
    document.getElementById("email").innerText = user.email;
    document.getElementById("phone").innerText = user.phone;
    document.getElementById("education").innerText = user.education;
    document.getElementById("skills").innerText = user.skills;
    document.getElementById("location").innerText = user.location;
    document.getElementById("about").innerText = user.about;
}

function logout() {
    window.location.href = "loginPage.html";
}

function goBack() {
    window.location.href = "student-dashboard.html";
}