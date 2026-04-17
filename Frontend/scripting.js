document.addEventListener("DOMContentLoaded", function () {

    const jobForm = document.getElementById("jobForm");

    jobForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const recruiterId = localStorage.getItem("userId");

        if (!recruiterId) {
            alert("Please login again.");
            return;
        }

        const role = document.getElementById("role").value;
        const description = document.getElementById("description").value;
        const company = localStorage.getItem("userCompany");
        const skillsInput = document.getElementById("skills").value;
        const salary = document.getElementById("salary").value;
        const location = document.getElementById("location").value;
        const vacancies = document.getElementById("vacancies").value;
        const skills = skillsInput
            .split(",")
            .map(skill => skill.trim())
            .filter(skill => skill !== "");

        try {
            const response = await fetch("http://localhost:5000/api/jobs/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    recruiterId,
                    role,
                    company,
                    skills,
                    description,
                    salary,
                    location,
                    vacancies

                })
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.message);
                return;
            }

           const messageEl = document.getElementById("message");
             if (messageEl) {
                 messageEl.innerText = result.message;
             }
            jobForm.reset();

        } catch (error) {
            console.error("Error posting job:", error);
            alert("Something went wrong!");
        }
    });

});

const userName = localStorage.getItem("userName");

if (userName) {
    document.getElementById("welcomeText").innerText =
        "Welcome, " + userName + " !";
} else {
    document.getElementById("welcomeText").innerText =
        "Welcome !";
}

function goToApplications() {
    window.location.href = "view-applicants.html";
}

function goToPostedJobs() {
    window.location.href = "jobs.html";
}


function logout() {
    localStorage.clear();
    window.location.href = "loginPage.html";
}