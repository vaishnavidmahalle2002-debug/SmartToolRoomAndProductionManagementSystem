<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>

    <link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
	rel="stylesheet">

<link
	href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
	rel="stylesheet">

<link rel="stylesheet" href="css/jobstatus.css">
</head>
<body>

    <div class="job-page">

<!-- ==============================
     HEADER
============================== -->

<div class="job-header">

    <div class="job-title-area">

        <div class="job-logo">
            <i class="bi bi-hourglass-split"></i>
        </div>

        <div>

            <h1>Job Status</h1>

            <p>
                Monitor and manage production job progress
            </p>

        </div>

    </div>

    <div class="header-actions">

        <button
            class="header-btn history-btn"
            onclick="openHistoryModal()">

            <i class="bi bi-clock-history"></i>
            History

        </button>

        <button
            class="header-btn refresh-btn"
            onclick="loadJobStatus()">

            <i class="bi bi-arrow-clockwise"></i>
            Refresh

        </button>

    </div>

</div>


<!-- ==============================
     SUMMARY
============================== -->

<div class="summary-grid">

    <div class="summary-card total-card">

        <div class="summary-top">

            <span class="summary-label">
                TOTAL JOBS
            </span>

            <div class="summary-icon">
                <i class="bi bi-clipboard-data"></i>
            </div>

        </div>

        <div
            class="summary-number"
            id="totalJobs">
            0
        </div>

        <div class="summary-label">
            All production jobs
        </div>

    </div>


    <div class="summary-card pending-card">

        <div class="summary-top">

            <span class="summary-label">
                PENDING
            </span>

            <div class="summary-icon">
                <i class="bi bi-hourglass"></i>
            </div>

        </div>

        <div
            class="summary-number"
            id="pendingJobs">
            0
        </div>

        <div class="summary-label">
            Waiting for assignment
        </div>

    </div>


    <div class="summary-card assigned-card">

        <div class="summary-top">

            <span class="summary-label">
                ASSIGNED
            </span>

            <div class="summary-icon">
                <i class="bi bi-person-check"></i>
            </div>

        </div>

        <div
            class="summary-number"
            id="assignedJobs">
            0
        </div>

        <div class="summary-label">
            Assigned to workers
        </div>

    </div>


    <div class="summary-card progress-card">

        <div class="summary-top">

            <span class="summary-label">
                IN PROGRESS
            </span>

            <div class="summary-icon">
                <i class="bi bi-gear-wide-connected"></i>
            </div>

        </div>

        <div
            class="summary-number"
            id="progressJobs">
            0
        </div>

        <div class="summary-label">
            Currently processing
        </div>

    </div>


    <div class="summary-card completed-card">

        <div class="summary-top">

            <span class="summary-label">
                COMPLETED
            </span>

            <div class="summary-icon">
                <i class="bi bi-check2-circle"></i>
            </div>

        </div>

        <div
            class="summary-number"
            id="completedJobs">
            0
        </div>

        <div class="summary-label">
            Successfully completed
        </div>

    </div>

</div>


<!-- ==============================
     JOB TABLE
============================== -->

<div class="main-card">

    <div class="main-card-header">

        <div class="section-heading">

            <div class="section-icon">
                <i class="bi bi-list-check"></i>
            </div>

            <div>

                <h3>Production Jobs</h3>

                <p>
                    Live job status from the production database
                </p>

            </div>

        </div>

    </div>


    <!-- FILTERS -->

    <div class="filter-bar">

        <div class="search-box">

            <i class="bi bi-search"></i>

            <input
                type="text"
                id="jobSearch"
                placeholder="Search by Job ID, customer, worker or part..."
                onkeyup="filterJobs()">

        </div>


        <select
            class="status-filter"
            id="statusFilter"
            onchange="filterJobs()">

            <option value="ALL">
                All Status
            </option>

            <option value="Pending">
                Pending
            </option>

            <option value="Assigned">
                Assigned
            </option>

            <option value="In Progress">
                In Progress
            </option>

            <option value="Completed">
                Completed
            </option>

            <option value="Cancelled">
                Cancelled
            </option>

        </select>

    </div>


    <!-- TABLE -->

    <div class="table-container">

        <table class="job-table">

            <thead>

            <tr>

                <th>Job</th>

                <th>Customer</th>

                <th>Worker</th>

                <th>Machine</th>

                <th>Part / Quantity</th>

                <th>Material</th>

                <th>Status</th>

                <th>Action</th>

            </tr>

            </thead>

            <tbody id="jobTableBody">

            <tr>

                <td colspan="8">

                    <div class="table-message">

                        <div class="loading-spinner"></div>

                        Loading production jobs...

                    </div>

                </td>

            </tr>

            </tbody>

        </table>

    </div>

</div>

</div>

<!-- ============================== JOB DETAILS MODAL ============================== -->

<div class="modal fade" id="jobDetailsModal" tabindex="-1">

<div class="modal-dialog modal-lg modal-dialog-centered">

    <div class="modal-content">

        <div class="modal-header">

            <div>

                <h5 class="modal-title">
                    <i class="bi bi-clipboard2-check"></i>
                    Job Details
                </h5>

            </div>

            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal">
            </button>

        </div>

        <div class="modal-body">

            <div
                class="detail-grid"
                id="jobDetailsContent">
            </div>

        </div>

        <div class="modal-footer">

            <button
                class="modal-action close-modal-btn"
                data-bs-dismiss="modal">

                Close

            </button>

        </div>

    </div>

</div>

</div>

<!-- ============================== UPDATE STATUS MODAL ============================== -->

<div class="modal fade" id="updateStatusModal" tabindex="-1">

<div class="modal-dialog modal-dialog-centered">

    <div class="modal-content">

        <div class="modal-header">

            <h5 class="modal-title">

                <i class="bi bi-pencil-square"></i>

                Update Job Status

            </h5>

            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal">
            </button>

        </div>

        <div class="modal-body">

            <input
                type="hidden"
                id="updateJobId">

            <div class="mb-3">

                <label class="form-label">
                    Job ID
                </label>

                <input
                    type="text"
                    id="updateJobIdDisplay"
                    class="form-control"
                    readonly>

            </div>

            <div>

                <label class="form-label">
                    New Status
                </label>

                <select
                    id="updateStatusValue"
                    class="form-select">

                    <option value="Pending">
                        Pending
                    </option>

                    <option value="Assigned">
                        Assigned
                    </option>

                    <option value="In Progress">
                        In Progress
                    </option>

                    <option value="Completed">
                        Completed
                    </option>

                    <option value="Cancelled">
                        Cancelled
                    </option>

                </select>

            </div>

        </div>

        <div class="modal-footer">

            <button
                class="modal-action close-modal-btn"
                data-bs-dismiss="modal">

                Cancel

            </button>

            <button
                class="modal-action save-status-btn"
                onclick="saveJobStatus()">

                <i class="bi bi-check2"></i>
                Save Status

            </button>

        </div>

    </div>

</div>

</div>

<!-- ============================== HISTORY MODAL ============================== -->

<div class="modal fade" id="historyModal" tabindex="-1">

<div class="modal-dialog modal-lg modal-dialog-centered">

    <div class="modal-content">

        <div class="modal-header">

            <h5 class="modal-title">

                <i class="bi bi-clock-history"></i>

                Job Status History

            </h5>

            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal">
            </button>

        </div>

        <div class="modal-body">

            <div id="historyContent">

                <div class="table-message">
                    Loading history...
                </div>

            </div>

        </div>

    </div>

</div>

</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"> </script>
<script src="javascript/apiconfig.js"></script>
<script src="javascript/jobstatus.js"></script>

</body>
</html>