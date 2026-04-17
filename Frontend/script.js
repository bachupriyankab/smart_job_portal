document.getElementById("registerForm").addEventListener("submit", async function(e) {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const role = document.getElementById("role").value;
    const company = document.getElementById("company").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {

        // ✅ Create object properly
        let userData = {
            name,
            email,
            password,
            role
        };

        // ✅ Add company ONLY if recruiter
        if (role === "recruiter") {
            userData.company = company;
        }

        const response = await fetch("http://localhost:5000/api/students/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Registration Successful!");

            setTimeout(() => {
                window.location.href = "loginPage.html";
            }, 1000);

        } else {
            alert(result.message);
        }

    } catch (error) {
        alert("Error connecting to server");
        console.error(error);
    }

});


function toggleCompanyField() {
    const role = document.getElementById("role").value;
    const companyField = document.getElementById("company");

    if (role === "recruiter") {
        companyField.disabled = false;
        companyField.required = true;
    } else {
        companyField.disabled = true;
        companyField.required = false;
        companyField.value = "";
    }
}