console.log("Dashboard JS Loaded");
// =============================
// CHECK LOGIN
// =============================

const userId = localStorage.getItem("userId");
const userName = localStorage.getItem("userName");
const userEmail = localStorage.getItem("userEmail");

if (!userId) {
    alert("Please login first!");
    window.location.href = "loginPage.html";
}

// =============================
// DISPLAY WELCOME MESSAGE
// =============================

if (userName) {
    document.getElementById("welcomeText").innerText =
        "Welcome, " + userName + " !";
}

document.addEventListener("DOMContentLoaded", loadJobs);


// =============================
// LOAD JOBS
// =============================

async function loadJobs() {
    try {
        const response = await fetch("http://localhost:5000/api/jobs/all");
        const jobs = await response.json();
        console.log("Jobs Data:", jobs);
        const container = document.getElementById("jobsContainer");

        if (!container) return;

        container.innerHTML = "";

        if (jobs.length === 0) {
            container.innerHTML = "<p>No jobs available right now.</p>";
            return;
        }

        jobs.forEach(job => {
            const jobCard = `
                <div class="job-card">
                    <h3>${job.role}</h3>
                    <p><strong>Company:</strong> ${job.company}</p>
                    <p><strong>Location:</strong> ${job.location}</p>
                    <p><strong>Salary:</strong> ${job.salary}</p>
                     <div class="job-description">
                        <strong>Description:</strong>
                        <p>${job.description}</p>
                    </div>
                    <button onclick="applyJob('${job._id}', this)">
                        Apply
                    </button>
                </div>
            `;
            container.innerHTML += jobCard;
        });

    } catch (error) {
        console.error("Error loading jobs:", error);
    }
}


// =============================
// SELECT2 INITIALIZATION
// =============================

$(document).ready(function () {
    $('#skills').select2({
        placeholder: "Select your skills",
        width: '100%',
        closeOnSelect: false
    });
});


// =============================
// ROLE → SKILLS FILTER
// =============================

const roleSkills = {

"Software Engineer": ["Java","Python","C++","SQL","Git","GitHub"],

"Software Developer": 
["Java","Python","JavaScript","C++","SQL","Git"],

"Full Stack Development": [
"HTML","CSS","JavaScript","React","Node.js","MongoDB","SQL"
],

"Backend Developer": [
"Java","Python","Node.js","Spring Boot","Django","SQL","NoSQL"
],

"Frontend Developer": [
"HTML","CSS","JavaScript","React","Angular"
],

"Web Developer": [
"HTML","CSS","JavaScript","React","Node.js","MongoDB"
],

"Java Developer": [
"Core Java","Spring Boot","SQL","Git","REST API"
],

"Python Developer": [
"Core Python","Django","MongoDB","SQL","NumPy","Pandas"
],

"Data Analyst": [
"Python","SQL","Data Analysis","Machine Learning","Seaborn","Power BI","Tableau","Excel"
],

"Machine Learning Engineer": [
"Python","Machine Learning","Data Analysis","SQL","R","Java","Deep Learning"
],

"DevOps Engineer": [
"AWS","Azure","Docker","Git","GitHub","Bash","Go","Shell Scripting","Kubernetes"
],

"Cloud Engineer": [
"AWS","Azure","Docker","Operating Systems","Networking","Go","Git","SQL"
],

"UI / UX Designer": [
"Designing","Wireframing","Prototyping","Design Tools","Frondend",
],

"QA Engineer": [
"Java","Python","SQL","Testing","API's","Bug Tracking Tools","Git"
],

"Software Tester": [
"Java","Python","SQL","Testing Principles","API's"
],

"Cyber Security Analyst": [
"Python","AWS","Azure","Networking","Operating System","Bash"
],

"Business Analyst": [
"SQL","Data Analysis","Problem Solving"
],

"Ethical Hacking" :[
  "Networking","Operating Systems","C","Java","Python","C++","Security Tools"  
]
};

document.getElementById("role").addEventListener("change", function () {

    const selectedRole = this.value;

    $('#skills').empty(); // clear previous skills

    if(roleSkills[selectedRole]){

        roleSkills[selectedRole].forEach(skill => {

            const option = new Option(skill, skill, false, false);
            $('#skills').append(option);

        });

    }

    $('#skills').trigger('change');

});


// =============================
// SEARCH JOBS
// =============================

function searchJobs() {

    const role = document.getElementById("role").value;
    const company = document.getElementById("company").value;

    const skillsSelect = document.getElementById("skills");
    const skills = Array.from(skillsSelect.selectedOptions)
                        .map(option => option.value);

    localStorage.setItem("searchFilters", JSON.stringify({
        role,
        skills,
        company
    }));

    window.location.href = "job-results.html";
}


// =============================
// APPLY JOB
// =============================

async function applyJob(jobId, button) {

    const response = await fetch("http://localhost:5000/api/jobs/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            studentEmail: userEmail,
            jobId
        })
    });

    const result = await response.json();

    if (response.ok) {
        button.innerText = "Applied ✅";
        button.disabled = true;
        button.style.background = "gray";
    } else {
        alert(result.message);
    }
}


// =============================
// LOGOUT
// =============================

function logout() {
    localStorage.clear();
    window.location.href = "loginPage.html";
}


// =============================
// NAVIGATION
// =============================

function goToApplications() {
    window.location.href = "my-applications.html";
}