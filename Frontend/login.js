document.getElementById("loginForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    try {

        const response = await fetch("http://localhost:5000/api/students/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        console.log("Login response:", result);

        if (!response.ok) {
            alert(result.message);
            return;
        }

        // Store user info
        localStorage.setItem("userId", result.user._id);
        localStorage.setItem("userRole", result.user.role);
        localStorage.setItem("userName", result.user.name);
        localStorage.setItem("userEmail", result.user.email);
        localStorage.setItem("userCompany", result.user.company);

        alert("Login Successful!");

        // Redirect inside same block (IMPORTANT)
        setTimeout(() => {

    const role = result.user.role.toLowerCase();

    if (role === "student") {
        window.location.href = "student-dashboard.html";
    } else if (role === "recruiter") {
        window.location.href = "recruiter-dashboard.html";
    }

}, 500);

    } catch (error) {
        console.error("Login Error:", error);
        alert("Server error. Please try again.");
    }

});