document.addEventListener("DOMContentLoaded", loadProfile);

async function loadProfile() {

    const email = localStorage.getItem("userEmail");
    const name = localStorage.getItem("userName");
    document.getElementById("welcomeText").innerText = "Welcome, " + name + " !";

    const response = await fetch(`http://localhost:5000/api/students/profile/${email}`);
    const user = await response.json();

    document.getElementById("name").value = user.name || "";
    document.getElementById("phone").value = user.phone || "";
    document.getElementById("education").value = user.education || "";
    document.getElementById("skills").value = user.skills ? user.skills.join(", ") : "";
    document.getElementById("location").value = user.location || "";
    document.getElementById("about").value = user.about || "";
}


document.getElementById("profileForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = localStorage.getItem("userEmail");

    const updatedData = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        education: document.getElementById("education").value,
        skills: document.getElementById("skills").value.split(","),
        location: document.getElementById("location").value,
        about: document.getElementById("about").value
    };

    const response = await fetch(
        `http://localhost:5000/api/students/profile/update/${email}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        }
    );

    if (response.ok) {
            alert("Profile updated successfully!");
            window.location.href = "view-profile.html";
        } else {
            alert("Error updating profile");
        }
    });