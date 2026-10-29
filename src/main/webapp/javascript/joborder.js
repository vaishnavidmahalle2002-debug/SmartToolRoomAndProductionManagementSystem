/* =========================================================
   JOB ORDER MANAGEMENT - joborder.js
   Smart Tool Room & Production Management System
   ========================================================= */

/* =========================================================
   API CONFIGURATION
   ========================================================= */

const BASE_URL = API_CONFIG.BASE_URL;

const CUSTOMER_JOB_API = BASE_URL + "/customer/addJob";


/* =========================================================
   GLOBAL VARIABLES
   ========================================================= */

let allJobs = [];
let editingJob = null;


/* =========================================================
   PAGE INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Job Order JS Loaded Successfully");

    loadJobs();

    const searchInput = document.getElementById("jobSearch");

    if (searchInput) {
        searchInput.addEventListener("input", filterJobs);
    }

    const statusFilter = document.getElementById("statusFilter");

    if (statusFilter) {
        statusFilter.addEventListener("change", filterJobs);
    }

});


/* =========================================================
   LOAD ALL JOBS
   ========================================================= */

async function loadJobs() {

    try {

        showTableLoading();

        const response = await fetch(
            BASE_URL + "/viewallJob",
            {
                method: "GET",
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error("Failed to load jobs");
        }

        const jobs = await response.json();

        allJobs = Array.isArray(jobs) ? jobs : [];

        console.log("Jobs Loaded:", allJobs);

        updateStatistics(allJobs);

        displayJobs(allJobs);

    } catch (error) {

        console.error("loadJobs Error:", error);

        const tbody = document.getElementById("jobTableBody");

        if (tbody) {

            tbody.innerHTML = `
                <tr>
                    <td colspan="9" class="text-center text-danger py-4">
                        <i class="bi bi-exclamation-triangle"></i>
                        Failed to load job orders.
                    </td>
                </tr>
            `;

        }

        showAlert("Failed to load job orders.", false);
    }

}


/* =========================================================
   DISPLAY LOADING
   ========================================================= */

function showTableLoading() {

    const tbody = document.getElementById("jobTableBody");

    if (!tbody) {
        return;
    }

    tbody.innerHTML = `
        <tr>
            <td colspan="9" class="text-center py-5">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>

                <div class="mt-2">
                    Loading job orders...
                </div>
            </td>
        </tr>
    `;

}


/* =========================================================
   DISPLAY JOBS
   ========================================================= */

function displayJobs(jobs) {

    const tbody = document.getElementById("jobTableBody");

    if (!tbody) {
        console.error("jobTableBody not found");
        return;
    }

    tbody.innerHTML = "";

    if (!jobs || jobs.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="9" class="text-center py-5">
                    <i class="bi bi-inbox fs-2"></i>

                    <div class="mt-2">
                        No job orders found.
                    </div>
                </td>
            </tr>
        `;

        updateJobCount(0);

        return;
    }


    jobs.forEach(function (job) {

        const row = document.createElement("tr");

        const status = normalizeStatus(job.status);

        row.innerHTML = `

            <td>
                <strong>
                    #${escapeHtml(job.job_id)}
                </strong>
            </td>

            <td>
                ${escapeHtml(
                    job.customer_name ||
                    job.customerName ||
                    job.company_name ||
                    job.companyName ||
                    job.customer_id ||
                    "-"
                )}
            </td>

            <td>
                ${escapeHtml(
                    job.part_name ||
                    job.partName ||
                    "-"
                )}
            </td>

            <td>
                ${escapeHtml(
                    job.quantity ||
                    0
                )}
            </td>

            <td>
                ${escapeHtml(
                    job.material ||
                    "-"
                )}
            </td>

            <td>
                ${escapeHtml(
                    job.worker_name ||
                    job.workerName ||
                    job.worker_id ||
                    "-"
                )}
            </td>

            <td>
                ${escapeHtml(
                    job.machine_name ||
                    job.machineName ||
                    job.machine_id ||
                    "-"
                )}
            </td>

            <td>
                ${getStatusBadge(status)}
            </td>

            <td>

                <div class="job-actions">

                    <button
                        type="button"
                        class="btn btn-sm btn-outline-primary"
                        title="View Job"
                        onclick="viewJob(${job.job_id})">

                        <i class="bi bi-eye"></i>

                    </button>


                    <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                        title="Edit Job"
                        onclick="openEditJob(${job.job_id})">

                        <i class="bi bi-pencil"></i>

                    </button>


                    <button
                        type="button"
                        class="btn btn-sm btn-outline-success"
                        title="Assign Worker"
                        onclick="openWorkerModal(${job.job_id})">

                        <i class="bi bi-person-plus"></i>

                    </button>


                    <button
                        type="button"
                        class="btn btn-sm btn-outline-warning"
                        title="Assign Machine"
                        onclick="openMachineModal(${job.job_id})">

                        <i class="bi bi-cpu"></i>

                    </button>


                    <button
                        type="button"
                        class="btn btn-sm btn-outline-info"
                        title="Upload Design"
                        onclick="openDesignModal(${job.job_id})">

                        <i class="bi bi-file-earmark-arrow-up"></i>

                    </button>


                    ${
                        status === "Pending" || status === "Assigned"
                        ?

                        `
                        <button
                            type="button"
                            class="btn btn-sm btn-outline-primary"
                            title="Start Job"
                            onclick="startJob(${job.job_id})">

                            <i class="bi bi-play-fill"></i>

                        </button>
                        `

                        :

                        ""
                    }


                    ${
                        status === "In Progress"

                        ?

                        `
                        <button
                            type="button"
                            class="btn btn-sm btn-outline-success"
                            title="Complete Job"
                            onclick="completeJob(${job.job_id})">

                            <i class="bi bi-check-circle"></i>

                        </button>
                        `

                        :

                        ""
                    }


                    <button
                        type="button"
                        class="btn btn-sm btn-outline-danger"
                        title="Delete Job"
                        onclick="deleteJob(${job.job_id})">

                        <i class="bi bi-trash"></i>

                    </button>

                </div>

            </td>
        `;

        tbody.appendChild(row);

    });


    updateJobCount(jobs.length);

}


/* =========================================================
   STATUS BADGE
   ========================================================= */

function getStatusBadge(status) {

    const normalized = normalizeStatus(status);

    let cssClass = "status-pending";

    let icon = "bi-hourglass-split";

    if (normalized === "Completed") {

        cssClass = "status-completed";
        icon = "bi-check-circle-fill";

    } else if (normalized === "In Progress") {

        cssClass = "status-progress";
        icon = "bi-arrow-repeat";

    } else if (normalized === "Assigned") {

        cssClass = "status-assigned";
        icon = "bi-person-check-fill";

    } else if (normalized === "Cancelled") {

        cssClass = "status-cancelled";
        icon = "bi-x-circle-fill";

    } else if (normalized === "Pending") {

        cssClass = "status-pending";
        icon = "bi-hourglass-split";
    }


    return `
        <span class="status-badge ${cssClass}">
            <i class="bi ${icon}"></i>
            ${escapeHtml(normalized)}
        </span>
    `;

}


/* =========================================================
   NORMALIZE STATUS
   ========================================================= */

function normalizeStatus(status) {

    if (!status) {
        return "Pending";
    }

    const value = String(status)
        .trim()
        .toLowerCase();


    if (value === "pending") {
        return "Pending";
    }

    if (
        value === "assigned" ||
        value === "assign"
    ) {
        return "Assigned";
    }

    if (
        value === "in progress" ||
        value === "in_progress" ||
        value === "inprogress"
    ) {
        return "In Progress";
    }

    if (
        value === "completed" ||
        value === "complete"
    ) {
        return "Completed";
    }

    if (
        value === "cancelled" ||
        value === "canceled"
    ) {
        return "Cancelled";
    }

    return status;

}


/* =========================================================
   UPDATE STATISTICS
   ========================================================= */

function updateStatistics(jobs) {

    const total = jobs.length;

    const pending = jobs.filter(function (job) {

        return normalizeStatus(job.status) === "Pending";

    }).length;


    const progress = jobs.filter(function (job) {

        return normalizeStatus(job.status) === "In Progress";

    }).length;


    const completed = jobs.filter(function (job) {

        return normalizeStatus(job.status) === "Completed";

    }).length;


    const totalElement =
        document.getElementById("totalJobs");

    const pendingElement =
        document.getElementById("pendingJobs");

    const progressElement =
        document.getElementById("progressJobs");

    const completedElement =
        document.getElementById("completedJobs");


    if (totalElement) {
        totalElement.textContent = total;
    }

    if (pendingElement) {
        pendingElement.textContent = pending;
    }

    if (progressElement) {
        progressElement.textContent = progress;
    }

    if (completedElement) {
        completedElement.textContent = completed;
    }

}


/* =========================================================
   SEARCH + FILTER
   ========================================================= */

function filterJobs() {

    const searchInput =
        document.getElementById("jobSearch");

    const statusFilter =
        document.getElementById("statusFilter");


    const searchValue =
        searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";


    const statusValue =
        statusFilter
            ? statusFilter.value
            : "All";


    const filteredJobs = allJobs.filter(function (job) {

        const jobId =
            String(job.job_id || "").toLowerCase();

        const customer =
            String(
                job.customer_name ||
                job.customerName ||
                job.company_name ||
                job.companyName ||
                job.customer_id ||
                ""
            ).toLowerCase();

        const part =
            String(
                job.part_name ||
                job.partName ||
                ""
            ).toLowerCase();

        const material =
            String(
                job.material ||
                ""
            ).toLowerCase();

        const status =
            normalizeStatus(job.status);


        const matchesSearch =
            !searchValue ||

            jobId.includes(searchValue) ||

            customer.includes(searchValue) ||

            part.includes(searchValue) ||

            material.includes(searchValue) ||

            status.toLowerCase().includes(searchValue);


        const matchesStatus =
            statusValue === "All" ||
            normalizeStatus(statusValue) === status;


        return matchesSearch && matchesStatus;

    });


    displayJobs(filteredJobs);

}


/* =========================================================
   CLEAR FILTERS
   ========================================================= */

function clearFilters() {

    const searchInput =
        document.getElementById("jobSearch");

    const statusFilter =
        document.getElementById("statusFilter");


    if (searchInput) {
        searchInput.value = "";
    }

    if (statusFilter) {
        statusFilter.value = "All";
    }


    displayJobs(allJobs);

}


/* =========================================================
   VIEW JOB
   ========================================================= */

async function viewJob(jobId) {

    try {

        const response = await fetch(
            BASE_URL + "/viewJob/" + jobId,
            {
                method: "GET",
                credentials: "include"
            }
        );


        if (!response.ok) {
            throw new Error("Failed to load job details");
        }


        const job = await response.json();

        console.log("Selected Job:", job);


        const details =
            document.getElementById("jobDetails");


        if (!details) {
            return;
        }


        details.innerHTML = `

            <div class="job-detail-grid">

                <div>
                    <strong>Job ID</strong>
                    <span>#${escapeHtml(job.job_id)}</span>
                </div>

                <div>
                    <strong>Customer ID</strong>
                    <span>${escapeHtml(job.customer_id || "-")}</span>
                </div>

                <div>
                    <strong>Part Name</strong>
                    <span>${escapeHtml(job.part_name || "-")}</span>
                </div>

                <div>
                    <strong>Job Type</strong>
                    <span>${escapeHtml(job.job_type || "-")}</span>
                </div>

                <div>
                    <strong>Quantity</strong>
                    <span>${escapeHtml(job.quantity || "-")}</span>
                </div>

                <div>
                    <strong>Required Date</strong>
                    <span>${escapeHtml(job.required_date || "-")}</span>
                </div>

                <div>
                    <strong>Material</strong>
                    <span>${escapeHtml(job.material || "-")}</span>
                </div>

                <div>
                    <strong>Worker</strong>
                    <span>${escapeHtml(job.worker_id || "-")}</span>
                </div>

                <div>
                    <strong>Machine</strong>
                    <span>${escapeHtml(job.machine_id || "-")}</span>
                </div>

                <div>
                    <strong>Status</strong>
                    <span>
                        ${getStatusBadge(job.status)}
                    </span>
                </div>

                <div class="full-width">
                    <strong>Description</strong>
                    <span>
                        ${escapeHtml(job.description || "-")}
                    </span>
                </div>

                <div class="full-width">
                    <strong>Additional Requirements</strong>
                    <span>
                        ${escapeHtml(
                            job.additional_requirements || "-"
                        )}
                    </span>
                </div>

                <div class="full-width">
                    <strong>Design File</strong>
                    <span>
                        ${escapeHtml(job.design_file || "-")}
                    </span>
                </div>

            </div>

        `;


        const modalElement =
            document.getElementById("viewJobModal");


        if (modalElement) {

            const modal =
                bootstrap.Modal.getOrCreateInstance(
                    modalElement
                );

            modal.show();
        }


    } catch (error) {

        console.error("viewJob Error:", error);

        showAlert(
            "Failed to load job details.",
            false
        );

    }

}


/* =========================================================
   OPEN EDIT JOB
   ========================================================= */

async function openEditJob(jobId) {

    try {

        const response = await fetch(
            BASE_URL + "/viewJob/" + jobId,
            {
                method: "GET",
                credentials: "include"
            }
        );


        if (!response.ok) {
            throw new Error("Failed to load job");
        }


        const job = await response.json();

        editingJob = job;


        const jobIdElement =
            document.getElementById("editJobId");

        const customerElement =
            document.getElementById("editCustomerId");

        const partElement =
            document.getElementById("editPartName");

        const quantityElement =
            document.getElementById("editQuantity");

        const materialElement =
            document.getElementById("editMaterial");

        const designElement =
            document.getElementById("editDesign");

        const statusElement =
            document.getElementById("editStatus");


        if (jobIdElement) {
            jobIdElement.value =
                job.job_id || "";
        }

        if (customerElement) {
            customerElement.value =
                job.customer_id || "";
        }

        if (partElement) {
            partElement.value =
                job.part_name || "";
        }

        if (quantityElement) {
            quantityElement.value =
                job.quantity || "";
        }

        if (materialElement) {
            materialElement.value =
                job.material || "";
        }

        if (designElement) {
            designElement.value =
                job.design_file || "";
        }

        if (statusElement) {
            statusElement.value =
                normalizeStatus(job.status);
        }


        const modalElement =
            document.getElementById("editJobModal");


        if (modalElement) {

            const modal =
                bootstrap.Modal.getOrCreateInstance(
                    modalElement
                );

            modal.show();
        }


    } catch (error) {

        console.error(
            "openEditJob Error:",
            error
        );

        showAlert(
            "Unable to load job for editing.",
            false
        );

    }

}


/* =========================================================
   UPDATE JOB
   ========================================================= */

async function updateJob() {

    try {

        const jobId =
            document.getElementById("editJobId").value;


        const customerId =
            document.getElementById("editCustomerId").value;


        const partName =
            document.getElementById("editPartName").value.trim();


        const quantity =
            document.getElementById("editQuantity").value;


        const material =
            document.getElementById("editMaterial").value.trim();


        const designFile =
            document.getElementById("editDesign").value.trim();


        const status =
            document.getElementById("editStatus").value;


        if (!jobId) {

            showAlert(
                "Job ID is required.",
                false
            );

            return;
        }


        if (!partName) {

            showAlert(
                "Part name is required.",
                false
            );

            return;
        }


        const jobData = {

            job_id: Number(jobId),

            customer_id:
                customerId
                    ? Number(customerId)
                    : null,

            worker_id:
                editingJob
                    ? editingJob.worker_id
                    : null,

            machine_id:
                editingJob
                    ? editingJob.machine_id
                    : null,

            part_name: partName,

            quantity:
                quantity
                    ? Number(quantity)
                    : 0,

            material: material,

            design_file: designFile,

            status: status

        };


        console.log(
            "Updating Job:",
            jobData
        );


        const response = await fetch(
            BASE_URL + "/updJob",
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                credentials: "include",

                body: JSON.stringify(jobData)
            }
        );


        if (!response.ok) {

            const errorText =
                await response.text();

            throw new Error(
                errorText ||
                "Failed to update job"
            );
        }


        showAlert(
            "Job updated successfully.",
            true
        );


        const modalElement =
            document.getElementById("editJobModal");


        if (modalElement) {

            const modal =
                bootstrap.Modal.getInstance(
                    modalElement
                );

            if (modal) {
                modal.hide();
            }
        }


        editingJob = null;

        await loadJobs();


    } catch (error) {

        console.error(
            "updateJob Error:",
            error
        );

        showAlert(
            "Failed to update job.",
            false
        );

    }

}


/* =========================================================
   OPEN WORKER MODAL
   ========================================================= */

async function openWorkerModal(jobId) {

    const jobIdElement =
        document.getElementById("workerJobId");


    if (jobIdElement) {
        jobIdElement.value = jobId;
    }


    const modalElement =
        document.getElementById("workerModal");


    if (modalElement) {

        const modal =
            bootstrap.Modal.getOrCreateInstance(
                modalElement
            );

        modal.show();
    }


    await loadWorkers();

}


/* =========================================================
   LOAD WORKERS
   ========================================================= */

async function loadWorkers() {

    const workerSelect =
        document.getElementById("workerId");


    if (!workerSelect) {
        console.error("workerId select not found");
        return;
    }


    workerSelect.innerHTML = `
        <option value="">
            Loading workers...
        </option>
    `;


    try {

        const response = await fetch(
            BASE_URL + "/viewallWorkers",
            {
                method: "GET",
                credentials: "include"
            }
        );


        if (!response.ok) {
            throw new Error(
                "Failed to load workers"
            );
        }


        const workers =
            await response.json();


        console.log(
            "Workers:",
            workers
        );


        workerSelect.innerHTML = `
            <option value="">
                Select Worker
            </option>
        `;


        if (
            !Array.isArray(workers) ||
            workers.length === 0
        ) {

            workerSelect.innerHTML += `
                <option value="">
                    No workers available
                </option>
            `;

            return;
        }


        workers.forEach(function (worker) {

            const workerId =
                worker.workerId ||
                worker.worker_id ||
                worker.id;


            const workerName =
                worker.fullName ||
                worker.name ||
                worker.workerName ||
                "Worker";


            const skill =
                worker.skill
                    ? " - " + worker.skill
                    : "";


            if (workerId) {

                workerSelect.innerHTML += `
                    <option value="${escapeHtml(workerId)}">
                        ${escapeHtml(workerName)}
                        ${escapeHtml(skill)}
                    </option>
                `;

            }

        });


    } catch (error) {

        console.error(
            "loadWorkers Error:",
            error
        );


        workerSelect.innerHTML = `
            <option value="">
                Failed to load workers
            </option>
        `;


        showAlert(
            "Failed to load workers.",
            false
        );

    }

}


/* =========================================================
   ASSIGN WORKER
   ========================================================= */

async function assignWorker() {

    const jobIdElement =
        document.getElementById("workerJobId");


    const workerElement =
        document.getElementById("workerId");


    if (!jobIdElement || !workerElement) {

        showAlert(
            "Worker assignment form not found.",
            false
        );

        return;
    }


    const jobId =
        jobIdElement.value;


    const workerId =
        workerElement.value;


    if (!jobId) {

        showAlert(
            "Job ID is missing.",
            false
        );

        return;
    }


    if (!workerId) {

        showAlert(
            "Please select a worker.",
            false
        );

        return;
    }


    try {

        const response = await fetch(

            BASE_URL +
            "/job/assignWorker/" +
            jobId +
            "?workerId=" +
            encodeURIComponent(workerId),

            {
                method: "PUT",

                credentials: "include"
            }

        );


        if (!response.ok) {

            const errorText =
                await response.text();

            throw new Error(
                errorText ||
                "Failed to assign worker"
            );
        }


        showAlert(
            "Worker assigned successfully.",
            true
        );


        const modalElement =
            document.getElementById("workerModal");


        if (modalElement) {

            const modal =
                bootstrap.Modal.getInstance(
                    modalElement
                );

            if (modal) {
                modal.hide();
            }

        }


        await loadJobs();


    } catch (error) {

        console.error(
            "assignWorker Error:",
            error
        );

        showAlert(
            "Failed to assign worker.",
            false
        );

    }

}


/* =========================================================
   OPEN MACHINE MODAL
   ========================================================= */

function openMachineModal(jobId) {

    const jobIdElement =
        document.getElementById("machineJobId");


    const machineIdElement =
        document.getElementById("machineId");


    if (jobIdElement) {
        jobIdElement.value = jobId;
    }


    if (machineIdElement) {
        machineIdElement.value = "";
    }


    const modalElement =
        document.getElementById("machineModal");


    if (modalElement) {

        const modal =
            bootstrap.Modal.getOrCreateInstance(
                modalElement
            );

        modal.show();

    }

}


/* =========================================================
   ASSIGN MACHINE
   ========================================================= */

async function assignMachine() {

    const jobIdElement =
        document.getElementById("machineJobId");


    const machineIdElement =
        document.getElementById("machineId");


    if (!jobIdElement || !machineIdElement) {

        showAlert(
            "Machine assignment form not found.",
            false
        );

        return;
    }


    const jobId =
        jobIdElement.value;


    const machineId =
        machineIdElement.value;


    if (!jobId) {

        showAlert(
            "Job ID is missing.",
            false
        );

        return;
    }


    if (!machineId) {

        showAlert(
            "Please enter a machine ID.",
            false
        );

        return;
    }


    try {

        const response = await fetch(

            BASE_URL +
            "/job/assignMachine/" +
            jobId +
            "?machineId=" +
            encodeURIComponent(machineId),

            {
                method: "PUT",

                credentials: "include"
            }

        );


        if (!response.ok) {

            const errorText =
                await response.text();

            throw new Error(
                errorText ||
                "Failed to assign machine"
            );
        }


        showAlert(
            "Machine assigned successfully.",
            true
        );


        const modalElement =
            document.getElementById("machineModal");


        if (modalElement) {

            const modal =
                bootstrap.Modal.getInstance(
                    modalElement
                );

            if (modal) {
                modal.hide();
            }
        }


        await loadJobs();


    } catch (error) {

        console.error(
            "assignMachine Error:",
            error
        );


        showAlert(
            "Failed to assign machine.",
            false
        );

    }

}


/* =========================================================
   OPEN DESIGN MODAL
   ========================================================= */

function openDesignModal(jobId) {

    const jobIdElement =
        document.getElementById("designJobId");


    const designElement =
        document.getElementById("designFile");


    if (jobIdElement) {
        jobIdElement.value = jobId;
    }


    if (designElement) {
        designElement.value = "";
    }


    const modalElement =
        document.getElementById("designModal");


    if (modalElement) {

        const modal =
            bootstrap.Modal.getOrCreateInstance(
                modalElement
            );

        modal.show();

    }

}


/* =========================================================
   UPLOAD DESIGN
   ========================================================= */

async function uploadDesign() {

    const jobIdElement =
        document.getElementById("designJobId");


    const designElement =
        document.getElementById("designFile");


    if (!jobIdElement || !designElement) {

        showAlert(
            "Design form not found.",
            false
        );

        return;
    }


    const jobId =
        jobIdElement.value;


    const designFile =
        designElement.value.trim();


    if (!jobId) {

        showAlert(
            "Job ID is missing.",
            false
        );

        return;
    }


    if (!designFile) {

        showAlert(
            "Please enter design file name.",
            false
        );

        return;
    }


    try {

        const response = await fetch(

            BASE_URL +
            "/job/uploadDesign/" +
            jobId +
            "?designFile=" +
            encodeURIComponent(designFile),

            {
                method: "PUT",

                credentials: "include"
            }

        );


        if (!response.ok) {

            const errorText =
                await response.text();

            throw new Error(
                errorText ||
                "Failed to upload design"
            );
        }


        showAlert(
            "Design file updated successfully.",
            true
        );


        const modalElement =
            document.getElementById("designModal");


        if (modalElement) {

            const modal =
                bootstrap.Modal.getInstance(
                    modalElement
                );

            if (modal) {
                modal.hide();
            }
        }


        await loadJobs();


    } catch (error) {

        console.error(
            "uploadDesign Error:",
            error
        );


        showAlert(
            "Failed to update design file.",
            false
        );

    }

}


/* =========================================================
   START JOB
   ========================================================= */

async function startJob(jobId) {

    const confirmed =
        confirm(
            "Are you sure you want to start this job?"
        );


    if (!confirmed) {
        return;
    }


    try {

        const response = await fetch(

            BASE_URL +
            "/job/start/" +
            jobId,

            {
                method: "PUT",

                credentials: "include"
            }

        );


        if (!response.ok) {

            const errorText =
                await response.text();

            throw new Error(
                errorText ||
                "Failed to start job"
            );
        }


        showAlert(
            "Job started successfully.",
            true
        );


        await loadJobs();


    } catch (error) {

        console.error(
            "startJob Error:",
            error
        );


        showAlert(
            "Failed to start job.",
            false
        );

    }

}


/* =========================================================
   COMPLETE JOB
   ========================================================= */

async function completeJob(jobId) {

    const confirmed =
        confirm(
            "Are you sure you want to mark this job as completed?"
        );


    if (!confirmed) {
        return;
    }


    try {

        const response = await fetch(

            BASE_URL +
            "/job/complete/" +
            jobId,

            {
                method: "PUT",

                credentials: "include"
            }

        );


        if (!response.ok) {

            const errorText =
                await response.text();

            throw new Error(
                errorText ||
                "Failed to complete job"
            );
        }


        showAlert(
            "Job completed successfully.",
            true
        );


        await loadJobs();


    } catch (error) {

        console.error(
            "completeJob Error:",
            error
        );


        showAlert(
            "Failed to complete job.",
            false
        );

    }

}


/* =========================================================
   DELETE JOB
   ========================================================= */

async function deleteJob(jobId) {

    const confirmed =
        confirm(
            "Are you sure you want to delete Job #" +
            jobId +
            "?"
        );


    if (!confirmed) {
        return;
    }


    try {

        const response = await fetch(

            BASE_URL +
            "/delJob/" +
            jobId,

            {
                method: "DELETE",

                credentials: "include"
            }

        );


        if (!response.ok) {

            const errorText =
                await response.text();

            throw new Error(
                errorText ||
                "Failed to delete job"
            );
        }


        showAlert(
            "Job deleted successfully.",
            true
        );


        await loadJobs();


    } catch (error) {

        console.error(
            "deleteJob Error:",
            error
        );


        showAlert(
            "Failed to delete job.",
            false
        );

    }

}


/* =========================================================
   GENERIC ACTION REQUEST
   ========================================================= */

async function actionRequest(
    url,
    method = "PUT",
    body = null
) {

    try {

        const options = {

            method: method,

            credentials: "include",

            headers: {}

        };


        if (body !== null) {

            options.headers[
                "Content-Type"
            ] = "application/json";


            options.body =
                JSON.stringify(body);

        }


        const response =
            await fetch(
                BASE_URL + url,
                options
            );


        if (!response.ok) {

            const errorText =
                await response.text();

            throw new Error(
                errorText ||
                "Request failed"
            );
        }


        return await parseResponse(
            response
        );


    } catch (error) {

        console.error(
            "actionRequest Error:",
            error
        );

        throw error;

    }

}


/* =========================================================
   SAFE RESPONSE PARSER
   ========================================================= */

async function parseResponse(response) {

    const contentType =
        response.headers.get(
            "content-type"
        ) || "";


    if (
        contentType.includes(
            "application/json"
        )
    ) {

        return await response.json();

    }


    return await response.text();

}


/* =========================================================
   GO TO CREATE JOB
   ========================================================= */

function goToCreateJob() {

    window.location.href =
        "createJob.jsp";

}


/* =========================================================
   UPDATE JOB COUNT
   ========================================================= */

function updateJobCount(count) {

    const element =
        document.getElementById("jobCount");


    if (!element) {
        return;
    }


    element.textContent =
        count +
        (count === 1
            ? " Job"
            : " Jobs");

}


/* =========================================================
   SHOW ALERT
   ========================================================= */

function showAlert(
    message,
    success = true
) {

    const alertElement =
        document.getElementById(
            "jobAlert"
        );


    if (!alertElement) {

        console.log(
            success
                ? "SUCCESS:"
                : "ERROR:",
            message
        );

        return;
    }


    alertElement.className =
        "alert";


    if (success) {

        alertElement.classList.add(
            "alert-success"
        );

    } else {

        alertElement.classList.add(
            "alert-danger"
        );

    }


    alertElement.innerHTML = `

        <i class="bi ${
            success
                ? "bi-check-circle"
                : "bi-exclamation-triangle"
        }"></i>

        ${escapeHtml(message)}

    `;


    alertElement.style.display =
        "block";


    setTimeout(function () {

        alertElement.style.display =
            "none";

    }, 4000);

}


/* =========================================================
   HTML ESCAPE
   ========================================================= */

function escapeHtml(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   CUSTOMER JOB ORDER SUPPORT
   ========================================================= */

/*
   This section is kept because your previous joborder.js
   contained customer job-order functionality.
*/


function getCustomerId() {

    const customerId =
        sessionStorage.getItem(
            "customerId"
        );


    if (customerId) {
        return customerId;
    }


    const storedUserId =
        sessionStorage.getItem(
            "userId"
        );


    if (storedUserId) {
        return storedUserId;
    }


    return null;

}


/* =========================================================
   CUSTOMER JOB ORDER FORM
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const jobOrderForm =
            document.getElementById(
                "jobOrderForm"
            );


        if (!jobOrderForm) {
            return;
        }


        jobOrderForm.addEventListener(
            "submit",
            submitCustomerJob
        );

    }
);


/* =========================================================
   SUBMIT CUSTOMER JOB
   ========================================================= */

async function submitCustomerJob(event) {

    event.preventDefault();


    const customerId =
        getCustomerId();


    if (!customerId) {

        showAlert(
            "Customer session not found.",
            false
        );

        return;
    }


    const form =
        event.target;


    try {

        const formData =
            new FormData(form);


        /*
         * Add customer ID if the form does
         * not already contain it.
         */

        if (
            !formData.get(
                "customer_id"
            )
        ) {

            formData.append(
                "customer_id",
                customerId
            );

        }


        const response =
            await fetch(
                CUSTOMER_JOB_API,
                {
                    method: "POST",

                    credentials: "include",

                    body: formData
                }
            );


        if (!response.ok) {

            const errorText =
                await response.text();

            throw new Error(
                errorText ||
                "Failed to submit job"
            );
        }


        showAlert(
            "Job order submitted successfully.",
            true
        );


        form.reset();


    } catch (error) {

        console.error(
            "submitCustomerJob Error:",
            error
        );


        showAlert(
            "Failed to submit job order.",
            false
        );

    }

}


/* =========================================================
   OPTIONAL CUSTOMER JOB FUNCTION
   ========================================================= */

async function submitJobOrder() {

    const form =
        document.getElementById(
            "jobOrderForm"
        );


    if (!form) {

        showAlert(
            "Job order form not found.",
            false
        );

        return;
    }


    /*
     * Trigger the same submit flow
     * without duplicating API logic.
     */

    if (
        typeof form.requestSubmit ===
        "function"
    ) {

        form.requestSubmit();

    } else {

        const event =
            new Event(
                "submit",
                {
                    bubbles: true,
                    cancelable: true
                }
            );

        form.dispatchEvent(event);

    }

}


/* =========================================================
   INITIALIZE CUSTOMER JOB ORDER FORM
   ========================================================= */

function initializeJobOrderForm() {

    const form =
        document.getElementById(
            "jobOrderForm"
        );


    if (!form) {
        return;
    }


    console.log(
        "Customer Job Order Form initialized"
    );

}


/* =========================================================
   GLOBAL FUNCTION EXPORTS
   ========================================================= */

/*
   These make functions available to
   onclick="" handlers inside JSP.
*/

window.loadJobs =
    loadJobs;

window.viewJob =
    viewJob;

window.openEditJob =
    openEditJob;

window.updateJob =
    updateJob;

window.openWorkerModal =
    openWorkerModal;

window.assignWorker =
    assignWorker;

window.openMachineModal =
    openMachineModal;

window.assignMachine =
    assignMachine;

window.openDesignModal =
    openDesignModal;

window.uploadDesign =
    uploadDesign;

window.startJob =
    startJob;

window.completeJob =
    completeJob;

window.deleteJob =
    deleteJob;

window.filterJobs =
    filterJobs;

window.clearFilters =
    clearFilters;

window.goToCreateJob =
    goToCreateJob;

window.submitJobOrder =
    submitJobOrder;

window.initializeJobOrderForm =
    initializeJobOrderForm;


/* =========================================================
   END OF JOB ORDER JS
   ========================================================= */