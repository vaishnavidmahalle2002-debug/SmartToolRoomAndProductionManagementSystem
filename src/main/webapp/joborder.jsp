<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

    <meta name="viewport"
        content="width=device-width, initial-scale=1.0">

    <title>Job Orders | Smart Tool Room</title>

    <!-- Bootstrap CSS -->
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet">

    <!-- Bootstrap Icons -->
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

    <!-- YOUR EXISTING CSS -->
    <link rel="stylesheet" href="css/joborder.css?v=10">

</head>

<body>

<div class="job-page">

    <!-- =====================================================
         HEADER
         ===================================================== -->

    <div class="job-header">

        <div class="job-header-left">

            <span class="section-label">
                PRODUCTION MANAGEMENT
            </span>

            <h1>
                Job Orders
            </h1>

            <p>
                View, assign and monitor all production jobs.
            </p>

        </div>

        <div class="job-header-actions">

            <button
                type="button"
                class="btn btn-outline-secondary"
                onclick="loadJobs()">

                <i class="bi bi-arrow-clockwise"></i>

                Refresh

            </button>

            <button
                type="button"
                class="btn btn-primary"
                onclick="goToCreateJob()">

                <i class="bi bi-plus-circle"></i>

                Create Job

            </button>

        </div>

    </div>


    <!-- =====================================================
         ALERT
         ===================================================== -->

    <div
        id="jobAlert"
        class="alert d-none"
        role="alert">
    </div>


    <!-- =====================================================
         STATISTICS
         ===================================================== -->

    <div class="row g-3 mb-4">

        <!-- TOTAL JOBS -->

        <div class="col-md-3">

            <div class="job-stat-card">

                <div class="job-stat-icon">
                    <i class="bi bi-briefcase"></i>
                </div>

                <div>

                    <span>
                        Total Jobs
                    </span>

                    <h3 id="totalJobs">
                        0
                    </h3>

                </div>

            </div>

        </div>


        <!-- PENDING -->

        <div class="col-md-3">

            <div class="job-stat-card">

                <div class="job-stat-icon">
                    <i class="bi bi-hourglass-split"></i>
                </div>

                <div>

                    <span>
                        Pending
                    </span>

                    <h3 id="pendingJobs">
                        0
                    </h3>

                </div>

            </div>

        </div>


        <!-- IN PROGRESS -->

        <div class="col-md-3">

            <div class="job-stat-card">

                <div class="job-stat-icon">
                    <i class="bi bi-gear-wide-connected"></i>
                </div>

                <div>

                    <span>
                        In Progress
                    </span>

                    <h3 id="progressJobs">
                        0
                    </h3>

                </div>

            </div>

        </div>


        <!-- COMPLETED -->

        <div class="col-md-3">

            <div class="job-stat-card">

                <div class="job-stat-icon">
                    <i class="bi bi-check-circle"></i>
                </div>

                <div>

                    <span>
                        Completed
                    </span>

                    <h3 id="completedJobs">
                        0
                    </h3>

                </div>

            </div>

        </div>

    </div>


    <!-- =====================================================
         FILTER SECTION
         ===================================================== -->

    <div class="job-filter-card">

        <div class="row g-3 align-items-end">

            <!-- SEARCH -->

            <div class="col-lg-7">

                <label
                    for="jobSearch"
                    class="form-label">

                    Search Jobs

                </label>

                <div class="input-group">

                    <span class="input-group-text">
                        <i class="bi bi-search"></i>
                    </span>

                    <input
                        type="text"
                        id="jobSearch"
                        class="form-control"
                        placeholder="Search by Job ID, Customer, Part, Material, Worker or Machine..."
                        onkeyup="filterJobs()">

                </div>

            </div>


            <!-- STATUS -->

            <div class="col-lg-3">

                <label
                    for="statusFilter"
                    class="form-label">

                    Status

                </label>

                <select
                    id="statusFilter"
                    class="form-select"
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

                </select>

            </div>


            <!-- CLEAR -->

            <div class="col-lg-2">

                <button
                    type="button"
                    class="btn btn-outline-secondary w-100"
                    onclick="clearFilters()">

                    <i class="bi bi-x-circle"></i>

                    Clear

                </button>

            </div>

        </div>

    </div>


    <!-- =====================================================
         JOB TABLE
         ===================================================== -->

    <div class="job-table-card">

        <div class="job-table-header">

            <div>

                <h4>
                    All Job Orders
                </h4>

                <p>
                    Manage production jobs and assignments.
                </p>

            </div>

            <div>

                <span
                    id="jobCount"
                    class="badge bg-secondary">

                    0 Jobs

                </span>

            </div>

        </div>


        <div class="table-responsive">

            <table
                class="table table-hover align-middle">

                <thead>

                    <tr>

                        <th>
                            Job
                        </th>

                        <th>
                            Customer
                        </th>

                        <th>
                            Part
                        </th>

                        <th>
                            Qty
                        </th>

                        <th>
                            Material
                        </th>

                        <th>
                            Worker
                        </th>

                        <th>
                            Machine
                        </th>

                        <th>
                            Status
                        </th>

                        <th class="text-center">
                            Actions
                        </th>

                    </tr>

                </thead>


                <tbody id="jobTableBody">

                    <tr>

                        <td
                            colspan="9"
                            class="text-center py-5">

                            <div class="spinner-border"
                                role="status">

                                <span class="visually-hidden">
                                    Loading...
                                </span>

                            </div>

                            <div class="mt-2">
                                Loading job orders...
                            </div>

                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    </div>

</div>


<!-- =========================================================
     VIEW JOB MODAL
     ========================================================= -->

<div
    class="modal fade"
    id="viewJobModal"
    tabindex="-1"
    aria-hidden="true">

    <div
        class="modal-dialog modal-lg modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">

                <div>

                    <h5 class="modal-title">
                        <i class="bi bi-eye me-2"></i>
                        Job Details
                    </h5>

                    <small class="text-muted">
                        Complete information about this job
                    </small>

                </div>

                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal">
                </button>

            </div>


            <div
                class="modal-body"
                id="jobDetails">

                <div class="text-center py-4">

                    <div class="spinner-border">
                    </div>

                </div>

            </div>


            <div class="modal-footer">

                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal">

                    Close

                </button>

            </div>

        </div>

    </div>

</div>


<!-- =========================================================
     EDIT JOB MODAL
     ========================================================= -->

<div
    class="modal fade"
    id="editJobModal"
    tabindex="-1"
    aria-hidden="true">

    <div
        class="modal-dialog modal-lg modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">

                    <i class="bi bi-pencil-square me-2"></i>

                    Edit Job Order

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
                    id="editJobId">


                <div class="row g-3">

                    <!-- CUSTOMER -->

                    <div class="col-md-6">

                        <label
                            for="editCustomerId"
                            class="form-label">

                            Customer ID

                        </label>

                        <input
                            type="number"
                            id="editCustomerId"
                            class="form-control">

                    </div>


                    <!-- PART -->

                    <div class="col-md-6">

                        <label
                            for="editPartName"
                            class="form-label">

                            Part Name

                        </label>

                        <input
                            type="text"
                            id="editPartName"
                            class="form-control">

                    </div>


                    <!-- QUANTITY -->

                    <div class="col-md-6">

                        <label
                            for="editQuantity"
                            class="form-label">

                            Quantity

                        </label>

                        <input
                            type="number"
                            id="editQuantity"
                            class="form-control"
                            min="1">

                    </div>


                    <!-- MATERIAL -->

                    <div class="col-md-6">

                        <label
                            for="editMaterial"
                            class="form-label">

                            Material

                        </label>

                        <input
                            type="text"
                            id="editMaterial"
                            class="form-control">

                    </div>


                    <!-- DESIGN -->

                    <div class="col-md-6">

                        <label
                            for="editDesign"
                            class="form-label">

                            Design File

                        </label>

                        <input
                            type="text"
                            id="editDesign"
                            class="form-control">

                    </div>


                    <!-- STATUS -->

                    <div class="col-md-6">

                        <label
                            for="editStatus"
                            class="form-label">

                            Status

                        </label>

                        <select
                            id="editStatus"
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

                        </select>

                    </div>

                </div>

            </div>


            <div class="modal-footer">

                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal">

                    Cancel

                </button>

                <button
                    type="button"
                    class="btn btn-primary"
                    onclick="updateJob()">

                    <i class="bi bi-save me-1"></i>

                    Save Changes

                </button>

            </div>

        </div>

    </div>

</div>


<!-- =========================================================
     ASSIGN WORKER MODAL
     ========================================================= -->

<div
    class="modal fade"
    id="workerModal"
    tabindex="-1"
    aria-hidden="true">

    <div
        class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">

                    <i class="bi bi-person-check me-2"></i>

                    Assign Worker

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
                    id="workerJobId">


                <div class="alert alert-light border">

                    <i class="bi bi-info-circle me-1"></i>

                    Select a worker to assign to this job.

                </div>


                <div class="mb-3">

                    <label
                        for="workerId"
                        class="form-label">

                        Select Worker

                    </label>

                    <select
                        id="workerId"
                        class="form-select">

                        <option value="">
                            Loading workers...
                        </option>

                    </select>

                </div>

            </div>


            <div class="modal-footer">

                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal">

                    Cancel

                </button>

                <button
                    type="button"
                    class="btn btn-primary"
                    onclick="assignWorker()">

                    <i class="bi bi-person-check me-1"></i>

                    Assign Worker

                </button>

            </div>

        </div>

    </div>

</div>


<!-- =========================================================
     ASSIGN MACHINE MODAL
     ========================================================= -->

<div
    class="modal fade"
    id="machineModal"
    tabindex="-1"
    aria-hidden="true">

    <div
        class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">

                    <i class="bi bi-cpu me-2"></i>

                    Assign Machine

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
                    id="machineJobId">


                <div class="alert alert-light border">

                    <i class="bi bi-info-circle me-1"></i>

                    Enter the machine ID that should process this job.

                </div>


                <div class="mb-3">

                    <label
                        for="machineId"
                        class="form-label">

                        Machine ID

                    </label>

                    <input
                        type="number"
                        id="machineId"
                        class="form-control"
                        min="1"
                        placeholder="Enter Machine ID">

                </div>

            </div>


            <div class="modal-footer">

                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal">

                    Cancel

                </button>

                <button
                    type="button"
                    class="btn btn-primary"
                    onclick="assignMachine()">

                    <i class="bi bi-cpu me-1"></i>

                    Assign Machine

                </button>

            </div>

        </div>

    </div>

</div>


<!-- =========================================================
     UPLOAD DESIGN MODAL
     ========================================================= -->

<div
    class="modal fade"
    id="designModal"
    tabindex="-1"
    aria-hidden="true">

    <div
        class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">

                    <i class="bi bi-file-earmark-arrow-up me-2"></i>

                    Upload Design

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
                    id="designJobId">


                <div class="mb-3">

                    <label
                        for="designFile"
                        class="form-label">

                        Design File

                    </label>

                    <input
                        type="text"
                        id="designFile"
                        class="form-control"
                        placeholder="Enter design file name/path">

                    <div class="form-text">

                        Example:
                        drawing-001.pdf

                    </div>

                </div>

            </div>


            <div class="modal-footer">

                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal">

                    Cancel

                </button>

                <button
                    type="button"
                    class="btn btn-primary"
                    onclick="uploadDesign()">

                    <i class="bi bi-upload me-1"></i>

                    Upload Design

                </button>

            </div>

        </div>

    </div>

</div>


<!-- =========================================================
     CONFIRM DELETE MODAL
     ========================================================= -->

<div
    class="modal fade"
    id="deleteJobModal"
    tabindex="-1"
    aria-hidden="true">

    <div
        class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">

                    <i class="bi bi-trash me-2"></i>

                    Delete Job

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
                    id="deleteJobId">


                <div class="text-center py-3">

                    <i
                        class="bi bi-exclamation-triangle"
                        style="font-size: 48px;">
                    </i>

                    <h5 class="mt-3">
                        Are you sure?
                    </h5>

                    <p class="text-muted">

                        This job order will be permanently deleted.

                        This action cannot be undone.

                    </p>

                </div>

            </div>


            <div class="modal-footer">

                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal">

                    Cancel

                </button>

                <button
                    type="button"
                    class="btn btn-danger"
                    onclick="deleteJob()">

                    <i class="bi bi-trash me-1"></i>

                    Delete Job

                </button>

            </div>

        </div>

    </div>

</div>


<!-- =========================================================
     START JOB CONFIRMATION MODAL
     ========================================================= -->

<div
    class="modal fade"
    id="startJobModal"
    tabindex="-1"
    aria-hidden="true">

    <div
        class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">

                    <i class="bi bi-play-circle me-2"></i>

                    Start Job

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
                    id="startJobId">

                <p class="mb-0">

                    Are you sure you want to start this job?

                    The status will change to

                    <strong>
                        In Progress
                    </strong>.

                </p>

            </div>


            <div class="modal-footer">

                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal">

                    Cancel

                </button>

                <button
                    type="button"
                    class="btn btn-primary"
                    onclick="startJob()">

                    <i class="bi bi-play-fill me-1"></i>

                    Start Job

                </button>

            </div>

        </div>

    </div>

</div>


<!-- =========================================================
     COMPLETE JOB CONFIRMATION MODAL
     ========================================================= -->

<div
    class="modal fade"
    id="completeJobModal"
    tabindex="-1"
    aria-hidden="true">

    <div
        class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">

                    <i class="bi bi-check-circle me-2"></i>

                    Complete Job

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
                    id="completeJobId">

                <p class="mb-0">

                    Are you sure you want to mark this job as

                    <strong>
                        Completed
                    </strong>?

                </p>

            </div>


            <div class="modal-footer">

                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal">

                    Cancel

                </button>

                <button
                    type="button"
                    class="btn btn-success"
                    onclick="completeJob()">

                    <i class="bi bi-check-lg me-1"></i>

                    Complete Job

                </button>

            </div>

        </div>

    </div>

</div>


<!-- ====================s=====================================
     BOOTSTRAP JS
     ========================================================= -->

<script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">
</script>


<!-- =========================================================
     YOUR EXISTING JAVASCRIPT
     IMPORTANT: KEEP THIS LINK
     ========================================================= -->
<script src="javascript/apiconfig.js"></script> 
<script src="javascript/joborder.js?v=10"></script>

</body>

</html>