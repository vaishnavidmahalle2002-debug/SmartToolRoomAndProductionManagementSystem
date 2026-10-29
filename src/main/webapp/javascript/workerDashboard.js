/* =========================================================
   WORKER DASHBOARD
   Smart Tool Room & Production Management System
   ========================================================= */

/* =========================================================
   API CONFIGURATION
   ========================================================= */

 const API_BASE_URL = API_CONFIG.BASE_URL;

let currentWorker = null;
let workerJobs = [];
let selectedJob = null;
let workerHistory = [];


/* =========================================================
   PAGE INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeNavigation();
    initializeMobileMenu();
    setTodayDate();

    loadWorkerData();

});


/* =========================================================
   LOAD COMPLETE WORKER DATA
   ========================================================= */

async function loadWorkerData() {

    try {

        showLoadingState();

        await loadCurrentWorker();
        await loadWorkerJobs();
        await loadWorkerStatusHistory();

        updateWorkerInformation();
        updateDashboardStatistics();
        renderRecentJobs();
        renderJobs();
        renderMachines();
        renderMaterials();
        renderHistory();
        renderProfile();

    } catch (error) {

        console.error("Worker dashboard loading error:", error);

        showToast(
            "Error",
            "Unable to load worker dashboard data.",
            "error"
        );

    }

}


/* =========================================================
   LOAD CURRENT LOGGED-IN WORKER
   ========================================================= */

async function loadCurrentWorker() {

    const response = await fetch(
        `${API_BASE_URL}/currentWorker`,
        {
            method: "GET",
            credentials: "include"
        }
    );

    if (!response.ok) {

        throw new Error(
            "Unable to load current worker."
        );

    }

    currentWorker = await response.json();

    if (!currentWorker) {

        throw new Error(
            "Worker session not found."
        );

    }

}


/* =========================================================
   LOAD WORKER ASSIGNED JOBS
   ========================================================= */

async function loadWorkerJobs() {

    const response = await fetch(
        `${API_BASE_URL}/workerJobs`,
        {
            method: "GET",
            credentials: "include"
        }
    );

    if (!response.ok) {

        throw new Error(
            "Unable to load assigned jobs."
        );

    }

    const data = await response.json();

    workerJobs = Array.isArray(data)
        ? data
        : [];

}


/* =========================================================
   LOAD STATUS HISTORY
   ========================================================= */

async function loadWorkerStatusHistory() {

    try {

        const response = await fetch(
            `${API_BASE_URL}/workerStatusHistory`,
            {
                method: "GET",
                credentials: "include"
            }
        );

        if (!response.ok) {

            throw new Error(
                "Unable to load status history."
            );

        }

        const data = await response.json();

        workerHistory = Array.isArray(data)
            ? data
            : [];

    } catch (error) {

        console.error(
            "Status history error:",
            error
        );

        workerHistory = [];

    }

}


/* =========================================================
   WORKER INFORMATION
   ========================================================= */

function updateWorkerInformation() {

    if (!currentWorker) {
        return;
    }

    const name =
        safeValue(
            currentWorker.fullName,
            "Worker"
        );

    const skill =
        safeValue(
            currentWorker.skill,
            "Production Worker"
        );

    setText(
        "sidebarWorkerName",
        name
    );

    setText(
        "sidebarWorkerSkill",
        skill
    );

    setText(
        "topWorkerName",
        name
    );

    setText(
        "welcomeWorkerName",
        name
    );

    setText(
        "profileFullName",
        name
    );

    setText(
        "profileSkill",
        skill
    );

}


/* =========================================================
   DASHBOARD STATISTICS
   ========================================================= */

function updateDashboardStatistics() {

    const total =
        workerJobs.length;

    const pending =
        countStatus("Pending");

    const inProgress =
        countStatus("In Progress");

    const completed =
        countStatus("Completed");

    setText(
        "assignedCount",
        total
    );

    setText(
        "pendingCount",
        pending
    );

    setText(
        "progressCount",
        inProgress
    );

    setText(
        "completedCount",
        completed
    );

    setText(
        "sidebarJobCount",
        total
    );

    setText(
        "profileAssignedCount",
        total
    );

    setText(
        "profileProgressCount",
        inProgress
    );

    setText(
        "profileCompletedCount",
        completed
    );

    updateProgress();

}


/* =========================================================
   STATUS COUNT
   ========================================================= */

function countStatus(status) {

    return workerJobs.filter(
        job =>
            normalizeStatus(job.status) ===
            normalizeStatus(status)
    ).length;

}

/* =========================================================
   WORK PROGRESS
   ========================================================= */

function updateProgress() {

    const total = workerJobs.length;

    const pending = countStatus("Pending");

    const progress = countStatus("In Progress");

    const completed = countStatus("Completed");
    
    /* =========================================================
   UPDATE PROGRESS CIRCLE
   ========================================================= */

function updateProgressCircle(percentage) {

    const circle =
        document.getElementById("progressCircle");

    if (!circle) {
        return;
    }

    const value =
        Math.max(
            0,
            Math.min(
                100,
                Number(percentage) || 0
            )
        );

    circle.style.setProperty(
        "--progress",
        value + "%"
    );

    circle.style.setProperty(
        "--progress-angle",
        (value * 3.6) + "deg"
    );
}


    /* -----------------------------------------------------
       NO JOBS
       ----------------------------------------------------- */

    if (total === 0) {

        setText(
            "progressPercentage",
            "0%"
        );

        setText(
            "pendingPercent",
            "0%"
        );

        setText(
            "progressPercent",
            "0%"
        );

        setText(
            "completedPercent",
            "0%"
        );

        setText(
            "progressMessage",
            "No assigned jobs available."
        );

        setWidth(
            "pendingBar",
            0
        );

        setWidth(
            "progressBar",
            0
        );

        setWidth(
            "completedBar",
            0
        );

        updateProgressCircle(0);

        return;
    }


    /* -----------------------------------------------------
       CALCULATE PERCENTAGES
       ----------------------------------------------------- */

    const pendingPercentage =
        Math.round(
            (pending / total) * 100
        );

    const progressPercentage =
        Math.round(
            (progress / total) * 100
        );

    const completedPercentage =
        Math.round(
            (completed / total) * 100
        );


    /* -----------------------------------------------------
       UPDATE TEXT
       ----------------------------------------------------- */

    setText(
        "progressPercentage",
        completedPercentage + "%"
    );

    setText(
        "pendingPercent",
        pendingPercentage + "%"
    );

    setText(
        "progressPercent",
        progressPercentage + "%"
    );

    setText(
        "completedPercent",
        completedPercentage + "%"
    );


    /* -----------------------------------------------------
       UPDATE BARS
       ----------------------------------------------------- */

    setWidth(
        "pendingBar",
        pendingPercentage
    );

    setWidth(
        "progressBar",
        progressPercentage
    );

    setWidth(
        "completedBar",
        completedPercentage
    );


    /* -----------------------------------------------------
       UPDATE CIRCLE
       ----------------------------------------------------- */

    updateProgressCircle(
        completedPercentage
    );


    /* -----------------------------------------------------
       DYNAMIC MESSAGE
       ----------------------------------------------------- */

    if (completed === total) {

        setText(
            "progressMessage",
            "Excellent! All your assigned jobs are completed."
        );

    } else if (progress > 0) {

        setText(
            "progressMessage",
            `You currently have ${progress} job${
                progress === 1 ? "" : "s"
            } in progress. Keep up the good work!`
        );

    } else if (pending > 0) {

        setText(
            "progressMessage",
            `You have ${pending} pending job${
                pending === 1 ? "" : "s"
            }. Start working to update your progress.`
        );

    } else {

        setText(
            "progressMessage",
            "Keep your assigned production jobs moving."
        );
    }
}


/* =========================================================
   RECENT JOBS
   ========================================================= */

function renderRecentJobs() {

    const tbody =
        document.getElementById(
            "recentJobsBody"
        );

    if (!tbody) {
        return;
    }

    if (workerJobs.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-state">
                    No jobs assigned to you.
                </td>
            </tr>
        `;

        return;

    }

    const recentJobs =
        [...workerJobs]
            .sort(
                (a, b) =>
                    Number(
                        b.job_id || 0
                    ) -
                    Number(
                        a.job_id || 0
                    )
            )
            .slice(0, 5);

    tbody.innerHTML =
        recentJobs.map(
            job => `

            <tr>

                <td>
                    #${safeValue(job.job_id, "-")}
                </td>

                <td>
                    ${escapeHtml(
                        safeValue(
                            job.part_name,
                            "-"
                        )
                    )}
                </td>

                <td>
                    ${safeValue(
                        job.quantity,
                        "-"
                    )}
                </td>

                <td>
                    ${escapeHtml(
                        safeValue(
                            job.material,
                            "-"
                        )
                    )}
                </td>

                <td>
                    ${createStatusBadge(
                        job.status
                    )}
                </td>

                <td>
                    <button
                        class="btn btn-sm btn-outline-primary"
                        onclick="openJobDetails(${Number(job.job_id)})">

                        <i class="bi bi-eye"></i>

                    </button>
                </td>

            </tr>

        `
        ).join("");

}


/* =========================================================
   MY JOBS
   ========================================================= */

function renderJobs() {

    const grid =
        document.getElementById(
            "jobGrid"
        );

    if (!grid) {
        return;
    }

    const searchInput =
        document.getElementById(
            "jobSearch"
        );

    const statusSelect =
        document.getElementById(
            "statusFilter"
        );

    const search =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";

    const selectedStatus =
        statusSelect
            ? statusSelect.value
            : "ALL";

    const filteredJobs =
        workerJobs.filter(
            job => {

                const jobId =
                    String(
                        job.job_id || ""
                    ).toLowerCase();

                const partName =
                    String(
                        job.part_name || ""
                    ).toLowerCase();

                const material =
                    String(
                        job.material || ""
                    ).toLowerCase();

                const matchesSearch =
                    !search ||
                    jobId.includes(search) ||
                    partName.includes(search) ||
                    material.includes(search);

                const matchesStatus =
                    selectedStatus === "ALL" ||
                    normalizeStatus(
                        job.status
                    ) === normalizeStatus(
                        selectedStatus
                    );

                return (
                    matchesSearch &&
                    matchesStatus
                );

            }
        );

    if (filteredJobs.length === 0) {

        grid.innerHTML = `
            <div class="loading-card">
                <i class="bi bi-inbox me-2"></i>
                No matching jobs found.
            </div>
        `;

        return;

    }

    grid.innerHTML =
        filteredJobs.map(
            job =>
                createJobCard(job)
        ).join("");

}


/* =========================================================
   JOB CARD
   ========================================================= */

function createJobCard(job) {

    const status =
        safeValue(
            job.status,
            "Pending"
        );

    const jobId =
        Number(job.job_id);

    return `

        <div class="content-card job-card">

            <div class="card-heading">

                <div>

                    <span class="card-kicker">
                        JOB #${jobId}
                    </span>

                    <h5>
                        ${escapeHtml(
                            safeValue(
                                job.part_name,
                                "Unnamed Part"
                            )
                        )}
                    </h5>

                </div>

                ${createStatusBadge(status)}

            </div>

            <div class="job-card-details">

                <div>
                    <span>Quantity</span>
                    <strong>
                        ${safeValue(
                            job.quantity,
                            "-"
                        )}
                    </strong>
                </div>

                <div>
                    <span>Material</span>
                    <strong>
                        ${escapeHtml(
                            safeValue(
                                job.material,
                                "-"
                            )
                        )}
                    </strong>
                </div>

                <div>
                    <span>Machine</span>
                    <strong>
                        ${safeValue(
                            job.machine_id,
                            "Not Assigned"
                        )}
                    </strong>
                </div>

                <div>
                    <span>Customer</span>
                    <strong>
                        ${safeValue(
                            job.customer_id,
                            "-"
                        )}
                    </strong>
                </div>

            </div>

            <div class="job-card-actions">

                <button
                    class="btn btn-outline-primary"
                    onclick="openJobDetails(${jobId})">

                    <i class="bi bi-eye me-1"></i>
                    View Details

                </button>

            </div>

        </div>

    `;

}


/* =========================================================
   OPEN JOB DETAILS
   ========================================================= */

function openJobDetails(jobId) {

    const job =
        workerJobs.find(
            item =>
                Number(item.job_id) ===
                Number(jobId)
        );

    if (!job) {

        showToast(
            "Error",
            "Job details not found.",
            "error"
        );

        return;

    }

    selectedJob = job;

    setText(
        "modalJobTitle",
        `Job #${job.job_id}`
    );

    setText(
        "modalJobId",
        job.job_id
    );

    setText(
        "modalPartName",
        safeValue(
            job.part_name,
            "-"
        )
    );

    setText(
        "modalQuantity",
        safeValue(
            job.quantity,
            "-"
        )
    );

    setText(
        "modalMaterial",
        safeValue(
            job.material,
            "-"
        )
    );

    setText(
        "modalMachine",
        safeValue(
            job.machine_id,
            "Not Assigned"
        )
    );

    setText(
        "modalCustomer",
        safeValue(
            job.customer_id,
            "-"
        )
    );

    setText(
        "modalDesignFile",
        safeValue(
            job.design_file,
            "No design file"
        )
    );

    const status =
        safeValue(
            job.status,
            "Pending"
        );

    setStatusBadge(
        "modalStatusBadge",
        status
    );

    const select =
        document.getElementById(
            "modalStatusSelect"
        );

    if (select) {

        const optionExists =
            Array.from(
                select.options
            ).some(
                option =>
                    normalizeStatus(
                        option.value
                    ) ===
                    normalizeStatus(status)
            );

        if (optionExists) {

            select.value =
                status;

        } else {

            select.value =
                "Pending";

        }

    }

    const modalElement =
        document.getElementById(
            "jobDetailsModal"
        );

    if (
        modalElement &&
        typeof bootstrap !== "undefined"
    ) {

        const modal =
            bootstrap.Modal.getOrCreateInstance(
                modalElement
            );

        modal.show();

    }

}


/* =========================================================
   UPDATE SELECTED JOB STATUS
   ========================================================= */

async function updateSelectedJobStatus() {

    if (!selectedJob) {

        showToast(
            "Error",
            "Please select a job first.",
            "error"
        );

        return;

    }

    const select =
        document.getElementById(
            "modalStatusSelect"
        );

    if (!select) {
        return;
    }

    const newStatus =
        select.value;

    const oldStatus =
        safeValue(
            selectedJob.status,
            ""
        );

    if (
        normalizeStatus(oldStatus) ===
        normalizeStatus(newStatus)
    ) {

        showToast(
            "Info",
            "Job already has this status.",
            "info"
        );

        return;

    }

    const button =
        document.querySelector(
            ".update-status-btn"
        );

    try {

        if (button) {

            button.disabled = true;

            button.innerHTML = `
                <span
                    class="spinner-border spinner-border-sm me-1">
                </span>
                Updating...
            `;

        }


        const url =
            `${API_BASE_URL}/workerJobStatus/` +
            `${encodeURIComponent(selectedJob.job_id)}` +
            `?status=${encodeURIComponent(newStatus)}`;

        const response =
            await fetch(
                url,
                {
                    method: "PUT",
                    credentials: "include"
                }
            );

        const message =
            await response.text();

        if (!response.ok) {

            throw new Error(
                message ||
                "Status update failed."
            );

        }

        if (
            message.toLowerCase()
                .includes("not updated") ||
            message.toLowerCase()
                .includes("not logged")
        ) {

            throw new Error(message);

        }

        /*
         * Update local job object
         */
        selectedJob.status =
            newStatus;

        const index =
            workerJobs.findIndex(
                job =>
                    Number(job.job_id) ===
                    Number(selectedJob.job_id)
            );

        if (index !== -1) {

            workerJobs[index].status =
                newStatus;

        }

        showToast(
            "Success",
            "Job status updated successfully.",
            "success"
        );


        await loadWorkerJobs();
        await loadWorkerStatusHistory();

        updateDashboardStatistics();
        renderRecentJobs();
        renderJobs();
        renderMachines();
        renderMaterials();
        renderHistory();

        /*
         * Refresh selected job from latest data.
         */

        selectedJob =
            workerJobs.find(
                job =>
                    Number(job.job_id) ===
                    Number(
                        selectedJob.job_id
                    )
            ) || null;

        /*
         * Close modal after successful update.
         */

        const modalElement =
            document.getElementById(
                "jobDetailsModal"
            );

        if (
            modalElement &&
            typeof bootstrap !== "undefined"
        ) {

            const modal =
                bootstrap.Modal.getInstance(
                    modalElement
                );

            if (modal) {
                modal.hide();
            }

        }

    } catch (error) {

        console.error(
            "Status update error:",
            error
        );

        showToast(
            "Error",
            error.message ||
            "Unable to update job status.",
            "error"
        );

    } finally {

        if (button) {

            button.disabled = false;

            button.innerHTML = `
                <i class="bi bi-check2-circle"></i>
                Update Status
            `;

        }

    }

}


/* =========================================================
   MACHINES
   ========================================================= */

function renderMachines() {

    const grid =
        document.getElementById(
            "machineGrid"
        );

    if (!grid) {
        return;
    }

    const machines = [];

    workerJobs.forEach(
        job => {

            if (
                job.machine_id !== null &&
                job.machine_id !== undefined &&
                job.machine_id !== ""
            ) {

                const machineId =
                    String(
                        job.machine_id
                    );

                if (
                    !machines.some(
                        machine =>
                            machine.id ===
                            machineId
                    )
                ) {

                    machines.push({
                        id: machineId,
                        jobs: []
                    });

                }

                const machine =
                    machines.find(
                        item =>
                            item.id ===
                            machineId
                    );

                machine.jobs.push(job);

            }

        }
    );

    if (machines.length === 0) {

        grid.innerHTML = `
            <div class="loading-card">
                <i class="bi bi-cpu me-2"></i>
                No machine has been assigned to your jobs yet.
            </div>
        `;

        return;

    }

    grid.innerHTML =
        machines.map(
            machine => `

            <div class="content-card machine-card">

                <div class="card-heading">

                    <div>

                        <span class="card-kicker">
                            PRODUCTION EQUIPMENT
                        </span>

                        <h5>
                            Machine #${escapeHtml(
                                machine.id
                            )}
                        </h5>

                    </div>

                    <div class="section-header-icon mint-icon">

                        <i class="bi bi-cpu-fill"></i>

                    </div>

                </div>

                <div class="machine-card-details">

                    <div>
                        <span>Assigned Jobs</span>
                        <strong>
                            ${machine.jobs.length}
                        </strong>
                    </div>

                </div>

                <div class="mt-3">

                    ${machine.jobs
                        .map(
                            job => `

                            <div class="mb-2">

                                <small>
                                    Job #${safeValue(
                                        job.job_id,
                                        "-"
                                    )}
                                </small>

                                <div>
                                    ${createStatusBadge(
                                        job.status
                                    )}
                                </div>

                            </div>

                        `
                        )
                        .join("")}

                </div>

            </div>

        `
        ).join("");

}


/* =========================================================
   MATERIALS
   ========================================================= */

function renderMaterials() {

    const grid =
        document.getElementById(
            "materialGrid"
        );

    if (!grid) {
        return;
    }

    const materialMap =
        new Map();

    workerJobs.forEach(
        job => {

            const material =
                safeValue(
                    job.material,
                    ""
                ).trim();

            if (!material) {
                return;
            }

            if (
                !materialMap.has(material)
            ) {

                materialMap.set(
                    material,
                    []
                );

            }

            materialMap
                .get(material)
                .push(job);

        }
    );

    if (materialMap.size === 0) {

        grid.innerHTML = `
            <div class="loading-card">
                <i class="bi bi-box-seam me-2"></i>
                No material information available.
            </div>
        `;

        return;

    }

    grid.innerHTML =
        Array.from(
            materialMap.entries()
        )
        .map(
            ([material, jobs]) => `

                <div class="content-card material-card">

                    <div class="card-heading">

                        <div>

                            <span class="card-kicker">
                                PRODUCTION INPUT
                            </span>

                            <h5>
                                ${escapeHtml(material)}
                            </h5>

                        </div>

                        <div class="section-header-icon peach-icon">

                            <i class="bi bi-box-seam-fill"></i>

                        </div>

                    </div>

                    <div class="material-card-details">

                        <div>
                            <span>Used In Jobs</span>

                            <strong>
                                ${jobs.length}
                            </strong>
                        </div>

                    </div>

                    <div class="mt-3">

                        ${jobs
                            .map(
                                job => `

                                <div class="mb-2">

                                    <small>
                                        Job #${safeValue(
                                            job.job_id,
                                            "-"
                                        )}
                                    </small>

                                    <div>
                                        ${createStatusBadge(
                                            job.status
                                        )}
                                    </div>

                                </div>

                            `
                            )
                            .join("")}

                    </div>

                </div>

            `
        )
        .join("");

}


/* =========================================================
   STATUS HISTORY
   ========================================================= */

function renderHistory() {

    const timeline =
        document.getElementById(
            "historyTimeline"
        );

    if (!timeline) {
        return;
    }

    if (workerHistory.length === 0) {

        timeline.innerHTML = `
            <div class="empty-history">

                <i class="bi bi-clock-history"></i>

                <p>
                    No status updates recorded yet.
                </p>

                <small>
                    Update a job status to create a history entry.
                </small>

            </div>
        `;

        return;

    }

    timeline.innerHTML =
        workerHistory
            .map(
                history => `

                <div class="history-item">

                    <div class="history-icon">

                        <i class="bi bi-arrow-repeat"></i>

                    </div>

                    <div class="history-content">

                        <div class="history-top">

                            <strong>
                                Job #${safeValue(
                                    history.job_id,
                                    "-"
                                )}
                            </strong>

                            ${createStatusBadge(
                                history.status
                            )}

                        </div>

                        <div class="history-details">

                            <span>
                                Part:
                                ${escapeHtml(
                                    safeValue(
                                        history.part_name,
                                        "-"
                                    )
                                )}
                            </span>

                            <span>
                                Quantity:
                                ${safeValue(
                                    history.quantity,
                                    "-"
                                )}
                            </span>

                            <span>
                                Material:
                                ${escapeHtml(
                                    safeValue(
                                        history.material,
                                        "-"
                                    )
                                )}
                            </span>

                            <span>
                                Machine:
                                ${safeValue(
                                    history.machine_id,
                                    "-"
                                )}
                            </span>

                        </div>

                    </div>

                </div>

            `
            )
            .join("");

}


/* =========================================================
   PROFILE
   ========================================================= */

function renderProfile() {

    if (!currentWorker) {
        return;
    }

    setText(
        "profileWorkerId",
        safeValue(
            currentWorker.workerId,
            "-"
        )
    );

    setText(
        "profileUserId",
        safeValue(
            currentWorker.userId,
            "-"
        )
    );

    setText(
        "profileEmail",
        safeValue(
            currentWorker.email,
            "-"
        )
    );

    setText(
        "profileMobile",
        safeValue(
            currentWorker.mobileNo,
            "-"
        )
    );

    setText(
        "profileUsername",
        safeValue(
            currentWorker.username,
            "-"
        )
    );

    setText(
        "profileStatus",
        safeValue(
            currentWorker.status,
            "-"
        )
    );

    renderProfilePhoto();

}


/* =========================================================
   PROFILE PHOTO
   ========================================================= */

function renderProfilePhoto() {

    if (!currentWorker) {
        return;
    }

    const photo =
        currentWorker.profilePhoto;

    if (!photo) {
        return;
    }

    const avatars = [
        "sidebarAvatar",
        "topAvatar",
        "profileAvatar"
    ];

    avatars.forEach(
        id => {

            const element =
                document.getElementById(id);

            if (!element) {
                return;
            }

            let src =
                String(photo);

            /*
             * If backend returns a data URL,
             * use it directly.
             */

            if (
                !src.startsWith("data:image") &&
                !src.startsWith("http://") &&
                !src.startsWith("https://") &&
                !src.startsWith("/")
            ) {

                src =
                    `${API_BASE_URL}/${src}`;

            }

            element.innerHTML = `
                <img
                    src="${escapeAttribute(src)}"
                    alt="Worker"
                    class="worker-profile-image"
                    onerror="this.style.display='none';"
                >
            `;

        }
    );

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function initializeNavigation() {

    const navLinks =
        document.querySelectorAll(
            ".sidebar-nav .nav-link"
        );

    navLinks.forEach(
        link => {

            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    const sectionId =
                        this.dataset.section;

                    if (sectionId) {

                        openSection(
                            sectionId
                        );

                    }

                }
            );

        }
    );

}


/* =========================================================
   OPEN SECTION
   ========================================================= */

function openSection(sectionId) {

    const sections =
        document.querySelectorAll(
            ".page-section"
        );

    sections.forEach(
        section => {

            section.classList.remove(
                "active-section"
            );

        }
    );

    const target =
        document.getElementById(
            sectionId
        );

    if (target) {

        target.classList.add(
            "active-section"
        );

    }

    const navLinks =
        document.querySelectorAll(
            ".sidebar-nav .nav-link"
        );

    navLinks.forEach(
        link => {

            link.classList.remove(
                "active"
            );

            if (
                link.dataset.section ===
                sectionId
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );

    updatePageTitle(
        sectionId
    );

    /*
     * Refresh relevant section data.
     */

    if (
        sectionId ===
        "jobsSection"
    ) {

        renderJobs();

    }

    if (
        sectionId ===
        "machinesSection"
    ) {

        renderMachines();

    }

    if (
        sectionId ===
        "materialsSection"
    ) {

        renderMaterials();

    }

    if (
        sectionId ===
        "historySection"
    ) {

        loadWorkerStatusHistory()
            .then(
                () => renderHistory()
            )
            .catch(
                error =>
                    console.error(
                        error
                    )
            );

    }

    if (
        sectionId ===
        "profileSection"
    ) {

        renderProfile();

    }

}


/* =========================================================
   PAGE TITLE
   ========================================================= */

function updatePageTitle(sectionId) {

    const titles = {

        dashboardSection:
            "Worker Dashboard",

        jobsSection:
            "My Jobs",

        machinesSection:
            "Machines",

        materialsSection:
            "Materials",

        historySection:
            "Status History",

        profileSection:
            "My Profile"

    };

    setText(
        "pageTitle",
        titles[sectionId] ||
        "Worker Dashboard"
    );

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function initializeMobileMenu() {

    const button =
        document.getElementById(
            "mobileMenuBtn"
        );

    const sidebar =
        document.getElementById(
            "workerSidebar"
        );

    if (!button || !sidebar) {
        return;
    }

    button.addEventListener(
        "click",
        function () {

            sidebar.classList.toggle(
                "sidebar-open"
            );

        }
    );

}


/* =========================================================
   DATE
   ========================================================= */

function setTodayDate() {

    const element =
        document.getElementById(
            "todayDate"
        );

    if (!element) {
        return;
    }

    const today =
        new Date();

    element.textContent =
        today.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

}


/* =========================================================
   LOGOUT
   ========================================================= */

async function logout() {

    window.location.href =
        `${window.location.origin}` +
        `${getContextPath()}/login.jsp`;

}


/* =========================================================
   LOADING STATE
   ========================================================= */

function showLoadingState() {

    const ids = [
        "assignedCount",
        "pendingCount",
        "progressCount",
        "completedCount"
    ];

    ids.forEach(
        id => setText(id, "...")
    );

}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(
    title,
    message,
    type = "success"
) {

    const toast =
        document.getElementById(
            "workerToast"
        );

    const titleElement =
        document.getElementById(
            "toastTitle"
        );

    const messageElement =
        document.getElementById(
            "toastMessage"
        );

    const iconElement =
        document.getElementById(
            "toastIcon"
        );

    if (
        !toast ||
        !titleElement ||
        !messageElement
    ) {
        return;
    }

    titleElement.textContent =
        title;

    messageElement.textContent =
        message;

    if (iconElement) {

        let icon =
            "bi-check-lg";

        if (type === "error") {

            icon =
                "bi-exclamation-lg";

        } else if (type === "info") {

            icon =
                "bi-info-lg";

        }

        iconElement.innerHTML = `
            <i class="bi ${icon}"></i>
        `;

    }

    toast.classList.add(
        "show"
    );

    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        3500
    );

}


/* =========================================================
   STATUS BADGE
   ========================================================= */

function createStatusBadge(status) {

    const normalized =
        normalizeStatus(status);

    const statusClass =
        getStatusClass(
            normalized
        );

    return `
        <span class="status-badge ${statusClass}">
            ${escapeHtml(
                safeValue(
                    status,
                    "Unknown"
                )
            )}
        </span>
    `;

}


function setStatusBadge(
    elementId,
    status
) {

    const element =
        document.getElementById(
            elementId
        );

    if (!element) {
        return;
    }

    element.className =
        `status-badge ${getStatusClass(
            normalizeStatus(status)
        )}`;

    element.textContent =
        safeValue(
            status,
            "Unknown"
        );

}


function getStatusClass(status) {

    switch (
        normalizeStatus(status)
    ) {

        case "pending":
            return "status-pending";

        case "in progress":
            return "status-progress";

        case "on hold":
            return "status-hold";

        case "completed":
            return "status-completed";

        case "cancelled":
            return "status-cancelled";

        case "assigned":
            return "status-assigned";

        default:
            return "status-default";

    }

}


/* =========================================================
   NORMALIZE STATUS
   ========================================================= */

function normalizeStatus(status) {

    return String(status || "")
        .trim()
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\s+/g, " ");
}

/* =========================================================
   SAFE VALUE
   ========================================================= */

function safeValue(
    value,
    fallback = "-"
) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return fallback;

    }

    return value;

}


/* =========================================================
   SET TEXT
   ========================================================= */

function setText(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );

    if (!element) {
        return;
    }

    element.textContent =
        safeValue(
            value,
            ""
        );

}


/* =========================================================
   SET WIDTH
   ========================================================= */

function setWidth(
    elementId,
    percentage
) {

    const element =
        document.getElementById(
            elementId
        );

    if (!element) {
        return;
    }

    const safePercentage =
        Math.max(
            0,
            Math.min(
                100,
                Number(
                    percentage
                ) || 0
            )
        );

    element.style.width =
        `${safePercentage}%`;

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHtml(value) {

    return String(
        value ?? ""
    )
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
   ESCAPE ATTRIBUTE
   ========================================================= */

function escapeAttribute(value) {

    return escapeHtml(value);

}


/* =========================================================
   CONTEXT PATH
   ========================================================= */

function getContextPath() {

    const path =
        window.location.pathname;

    const segments =
        path.split("/");

   
    if (
        segments.length > 1 &&
        segments[1] &&
        !segments[1].includes(".")
    ) {

        return "/" + segments[1];

    }

    return "";

}


/* =========================================================
   GLOBAL FUNCTIONS
   ========================================================= */

window.loadWorkerData =
    loadWorkerData;

window.openSection =
    openSection;

window.renderJobs =
    renderJobs;

window.openJobDetails =
    openJobDetails;

window.updateSelectedJobStatus =
    updateSelectedJobStatus;

window.logout =
    logout;