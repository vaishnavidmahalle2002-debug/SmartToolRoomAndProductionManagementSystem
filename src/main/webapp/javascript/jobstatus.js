const JOB_STATUS_API = API_CONFIG.BASE_URL;

let allJobs = [];
let allHistory = [];

// =====================================================
// PAGE LOAD
// =====================================================

document.addEventListener("DOMContentLoaded", function () {


loadJobStatus();


});

// =====================================================
// LOAD ALL JOBS
// =====================================================

async function loadJobStatus() {


showLoading();

try {

    const response = await fetch(
        JOB_STATUS_API + "/adminJobStatuses"
    );

    if (!response.ok) {
        throw new Error("Unable to load jobs");
    }

    allJobs = await response.json();

    updateSummary();

    displayJobs(allJobs);

} catch (error) {

    console.error("Job Status Error:", error);

    showError(
        "Unable to load job status. Please check the backend server."
    );

}


}

// =====================================================
// UPDATE SUMMARY
// =====================================================

function updateSummary() {


const total = allJobs.length;

const pending = countStatus("Pending");

const assigned = countStatus("Assigned");

const progress = countStatus("In Progress");

const completed = countStatus("Completed");

document.getElementById("totalJobs").textContent = total;

document.getElementById("pendingJobs").textContent = pending;

document.getElementById("assignedJobs").textContent = assigned;

document.getElementById("progressJobs").textContent = progress;

document.getElementById("completedJobs").textContent = completed;


}

// =====================================================
// COUNT STATUS
// =====================================================

function countStatus(status) {

return allJobs.filter(function (job) {

    return normalizeStatus(job.status) === normalizeStatus(status);

}).length;


}

// =====================================================
// DISPLAY JOBS
// =====================================================

function displayJobs(jobs) {

const tbody = document.getElementById("jobTableBody");

if (!jobs || jobs.length === 0) {

    tbody.innerHTML = `
        <tr>
            <td colspan="8">
                <div class="table-message">
                    <i class="bi bi-inbox"
                       style="font-size:35px;">
                    </i>

                    <div style="margin-top:10px;">
                        No jobs found.
                    </div>
                </div>
            </td>
        </tr>
    `;

    return;
}


tbody.innerHTML = jobs.map(function (job) {

    const statusClass =
        getStatusClass(job.status);

    const isCompleted =
        normalizeStatus(job.status) === "completed";

    const isCancelled =
        normalizeStatus(job.status) === "cancelled";


    return `
        <tr>

            <td>
                <span class="id-label">JOB ID</span>

                <span class="job-id">
                    #${job.job_id ?? "-"}
                </span>
            </td>


            <td>

                <span class="job-detail">
                    Customer #${job.customer_id ?? "-"}
                </span>

            </td>


            <td>

                <span class="job-detail">
                    ${job.worker_id
                        ? "Worker #" + job.worker_id
                        : "Not Assigned"}
                </span>

            </td>


            <td>

                <span class="job-detail">
                    ${job.machine_id
                        ? "Machine #" + job.machine_id
                        : "Not Assigned"}
                </span>

            </td>


            <td>

                <span class="job-detail">
                    ${escapeHtml(job.part_name || "—")}
                </span>

                <span class="sub-text">
                    Quantity:
                    ${job.quantity ?? 0}
                </span>

            </td>


            <td>

                <span class="job-detail">
                    ${escapeHtml(job.material || "—")}
                </span>

            </td>


            <td>

                <span class="status-badge ${statusClass}">
                    ${escapeHtml(job.status || "Pending")}
                </span>

            </td>


            <td>

                <div class="action-buttons">

                    <button
                        class="action-btn view-btn"
                        title="View Job"
                        onclick="viewJob(${job.job_id})">

                        <i class="bi bi-eye"></i>

                    </button>


                    <button
                        class="action-btn edit-btn"
                        title="Update Status"
                        onclick="openUpdateStatus(${job.job_id})">

                        <i class="bi bi-pencil"></i>

                    </button>


                    <button
                        class="action-btn complete-btn"
                        title="Mark Completed"
                        onclick="markJobComplete(${job.job_id})"
                        ${isCompleted || isCancelled ? "disabled" : ""}>

                        <i class="bi bi-check2-circle"></i>

                    </button>

                </div>

            </td>

        </tr>
    `;

}).join("");


}

// =====================================================
// SEARCH + FILTER
// =====================================================

function filterJobs() {

const search =
    document
        .getElementById("jobSearch")
        .value
        .toLowerCase()
        .trim();

const selectedStatus =
    document
        .getElementById("statusFilter")
        .value;


const filteredJobs = allJobs.filter(function (job) {

    const searchableText = [

        job.job_id,

        job.customer_id,

        job.worker_id,

        job.machine_id,

        job.part_name,

        job.material,

        job.status

    ].join(" ").toLowerCase();


    const matchesSearch =
        searchableText.includes(search);


    const matchesStatus =
        selectedStatus === "ALL" ||
        normalizeStatus(job.status) ===
        normalizeStatus(selectedStatus);


    return matchesSearch && matchesStatus;

});


displayJobs(filteredJobs);


}

// =====================================================
// VIEW JOB
// =====================================================

function viewJob(jobId) {


const job = allJobs.find(function (item) {

    return Number(item.job_id) === Number(jobId);

});


if (!job) {

    alert("Job not found.");

    return;

}


document.getElementById("jobDetailsContent").innerHTML = `

    <div class="detail-box">

        <label>Job ID</label>

        <strong>
            #${job.job_id}
        </strong>

    </div>


    <div class="detail-box">

        <label>Customer ID</label>

        <strong>
            ${job.customer_id ?? "Not available"}
        </strong>

    </div>


    <div class="detail-box">

        <label>Worker ID</label>

        <strong>
            ${job.worker_id ?? "Not Assigned"}
        </strong>

    </div>


    <div class="detail-box">

        <label>Machine ID</label>

        <strong>
            ${job.machine_id ?? "Not Assigned"}
        </strong>

    </div>


    <div class="detail-box">

        <label>Part Name</label>

        <strong>
            ${escapeHtml(job.part_name || "Not available")}
        </strong>

    </div>


    <div class="detail-box">

        <label>Quantity</label>

        <strong>
            ${job.quantity ?? 0}
        </strong>

    </div>


    <div class="detail-box">

        <label>Material</label>

        <strong>
            ${escapeHtml(job.material || "Not available")}
        </strong>

    </div>


    <div class="detail-box">

        <label>Current Status</label>

        <strong>
            ${escapeHtml(job.status || "Pending")}
        </strong>

    </div>


    <div class="detail-box"
         style="grid-column:1/-1;">

        <label>Design File</label>

        <strong>
            ${escapeHtml(job.design_file || "No design file")}
        </strong>

    </div>

`;


const modal =
    new bootstrap.Modal(
        document.getElementById("jobDetailsModal")
    );

modal.show();


}

// =====================================================
// OPEN UPDATE STATUS
// =====================================================

function openUpdateStatus(jobId) {


const job = allJobs.find(function (item) {

    return Number(item.job_id) === Number(jobId);

});


if (!job) {

    alert("Job not found.");

    return;

}


document.getElementById("updateJobId").value =
    job.job_id;

document.getElementById("updateJobIdDisplay").value =
    "JOB-" + job.job_id;

document.getElementById("updateStatusValue").value =
    job.status || "Pending";


const modal =
    new bootstrap.Modal(
        document.getElementById("updateStatusModal")
    );

modal.show();


}

// =====================================================
// SAVE STATUS
// =====================================================

async function saveJobStatus() {


const jobId =
    Number(
        document.getElementById("updateJobId").value
    );


const status =
    document.getElementById("updateStatusValue").value;


if (!jobId || !status) {

    alert("Please select a valid status.");

    return;

}


const confirmed =
    confirm(
        "Update Job #" +
        jobId +
        " status to '" +
        status +
        "'?"
    );


if (!confirmed) {
    return;
}


try {

    const response = await fetch(
        JOB_STATUS_API + "/updJobStatus",
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                job_id: jobId,

                status: status

            })
        }
    );


    const message =
        await response.text();


    if (!response.ok) {

        throw new Error(message);

    }


    alert(
        message ||
        "Job status updated successfully."
    );


    const modalElement =
        document.getElementById(
            "updateStatusModal"
        );

    const modal =
        bootstrap.Modal.getInstance(
            modalElement
        );

    if (modal) {
        modal.hide();
    }


    await loadJobStatus();


} catch (error) {

    console.error(
        "Update Status Error:",
        error
    );

    alert(
        "Unable to update job status."
    );

}


}

// =====================================================
// MARK COMPLETE
// =====================================================

async function markJobComplete(jobId) {

const confirmed =
    confirm(
        "Are you sure you want to mark Job #" +
        jobId +
        " as Completed?"
    );


if (!confirmed) {
    return;
}


try {

    const response =
        await fetch(
            JOB_STATUS_API +
            "/markComplete/" +
            jobId,
            {
                method: "PUT"
            }
        );


    const message =
        await response.text();


    if (!response.ok) {

        throw new Error(message);

    }


    alert(
        message ||
        "Job marked as completed."
    );


    await loadJobStatus();


} catch (error) {

    console.error(
        "Complete Job Error:",
        error
    );

    alert(
        "Unable to mark job as completed."
    );

}


}

// =====================================================
// HISTORY
// =====================================================

async function openHistoryModal() {


const historyContent =
    document.getElementById(
        "historyContent"
    );


historyContent.innerHTML = `

    <div class="table-message">

        <div class="loading-spinner"></div>

        Loading history...

    </div>

`;


const modal =
    new bootstrap.Modal(
        document.getElementById(
            "historyModal"
        )
    );

modal.show();


try {

    const response =
        await fetch(
            JOB_STATUS_API +
            "/jobStatusHistory"
        );


    if (!response.ok) {

        throw new Error(
            "History loading failed"
        );

    }


    allHistory =
        await response.json();


    if (!allHistory.length) {

        historyContent.innerHTML = `

            <div class="table-message">

                <i class="bi bi-clock-history"
                   style="font-size:35px;">
                </i>

                <div>
                    No status history available.
                </div>

            </div>

        `;

        return;

    }


    historyContent.innerHTML =
        allHistory
            .slice()
            .reverse()
            .map(function (item) {

                return `

                    <div class="history-item">

                        <div class="history-dot"></div>

                        <div>

                            <strong>
                                Job #${item.job_id}
                            </strong>

                            <small>
                                Status changed to
                                <b>
                                    ${escapeHtml(item.status)}
                                </b>
                            </small>

                        </div>

                    </div>

                `;

            })
            .join("");


} catch (error) {

    console.error(
        "History Error:",
        error
    );


    historyContent.innerHTML = `

        <div class="table-message">

            Unable to load status history.

        </div>

    `;

}


}

// =====================================================
// STATUS CLASS
// =====================================================

function getStatusClass(status) {


const normalized =
    normalizeStatus(status);


switch (normalized) {

    case "pending":
        return "status-pending";

    case "assigned":
        return "status-assigned";

    case "in progress":
        return "status-in-progress";

    case "completed":
        return "status-completed";

    case "cancelled":
        return "status-cancelled";

    default:
        return "status-pending";

}


}

// =====================================================
// NORMALIZE STATUS
// =====================================================

function normalizeStatus(status) {

return String(status || "")
    .trim()
    .toLowerCase();


}

// =====================================================
// LOADING
// =====================================================

function showLoading() {


document.getElementById(
    "jobTableBody"
).innerHTML = `

    <tr>

        <td colspan="8">

            <div class="table-message">

                <div class="loading-spinner"></div>

                Loading production jobs...

            </div>

        </td>

    </tr>

`;


}

// =====================================================
// ERROR
// =====================================================

function showError(message) {


document.getElementById(
    "jobTableBody"
).innerHTML = `

    <tr>

        <td colspan="8">

            <div class="table-message">

                <i class="bi bi-exclamation-circle"
                   style="font-size:35px;">
                </i>

                <div style="margin-top:10px;">
                    ${message}
                </div>

            </div>

        </td>

    </tr>

`;


}

// =====================================================
// HTML SAFETY
// =====================================================

function escapeHtml(value) {


return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");


}
