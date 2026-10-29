<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Worker Dashboard | Smart Tool Room</title>

    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">

    <!-- Worker Dashboard CSS -->
   <link rel="stylesheet" href="css/workerDashboard.css">
</head>

<body>

<div class="app-shell">

    <!-- ================= SIDEBAR ================= -->
    <aside class="worker-sidebar" id="workerSidebar">

        <div class="brand-area">
            <div class="brand-mark">
                <i class="bi bi-gear-wide-connected"></i>
            </div>
            <div>
                <h4>YantraX</h4>
                <span>Worker Portal</span>
            </div>
        </div>

        <div class="worker-mini-profile">
            <div class="mini-avatar" id="sidebarAvatar">
                <i class="bi bi-person-fill"></i>
            </div>
            <div class="mini-profile-info">
                <strong id="sidebarWorkerName">Worker</strong>
                <small id="sidebarWorkerSkill">Production Worker</small>
            </div>
            <span class="online-dot"></span>
        </div>

        <nav class="sidebar-nav">

            <p class="nav-label">WORKSPACE</p>

            <a href="#" class="nav-link active" data-section="dashboardSection">
                <span class="nav-icon"><i class="bi bi-grid-1x2-fill"></i></span>
                <span>Dashboard</span>
            </a>

            <a href="#" class="nav-link" data-section="jobsSection">
                <span class="nav-icon"><i class="bi bi-clipboard2-check-fill"></i></span>
                <span>My Jobs</span>
                <span class="nav-count" id="sidebarJobCount">0</span>
            </a>

            <a href="#" class="nav-link" data-section="machinesSection">
                <span class="nav-icon"><i class="bi bi-cpu-fill"></i></span>
                <span>Machines</span>
            </a>

            <a href="#" class="nav-link" data-section="materialsSection">
                <span class="nav-icon"><i class="bi bi-box-seam-fill"></i></span>
                <span>Materials</span>
            </a>

            <a href="#" class="nav-link" data-section="historySection">
                <span class="nav-icon"><i class="bi bi-clock-history"></i></span>
                <span>Status History</span>
            </a>

            <p class="nav-label nav-label-bottom">ACCOUNT</p>

            <a href="#" class="nav-link" data-section="profileSection">
                <span class="nav-icon"><i class="bi bi-person-vcard-fill"></i></span>
                <span>My Profile</span>
            </a>

        </nav>

        <div class="sidebar-footer">
            <div class="help-box">
                <div class="help-icon">
                    <i class="bi bi-shield-check"></i>
                </div>
                <div>
                    <strong>Production Mode</strong>
                    <small>Work updates are tracked</small>
                </div>
            </div>

            <div class="${pageContext.request.contextPath}/login.jsp">
        <button class="logout-btn" onclick="logout()"><i class="bi bi-box-arrow-right me-2"></i> Logout</button>
    </div>
        </div>
    </aside>

    <!-- ================= MAIN ================= -->
    <main class="main-content">

        <!-- Topbar -->
        <header class="topbar">

            <button class="mobile-menu-btn" id="mobileMenuBtn">
                <i class="bi bi-list"></i>
            </button>

            <div class="topbar-title">
                <span class="eyebrow">PRODUCTION WORKSPACE</span>
                <h5 id="pageTitle">Worker Dashboard</h5>
            </div>

            <div class="topbar-actions">

                <div class="date-chip">
                    <i class="bi bi-calendar3"></i>
                    <span id="todayDate">--</span>
                </div>

                <button class="icon-action notification-btn" title="Notifications">
                    <i class="bi bi-bell"></i>
                    <span class="notification-dot"></span>
                </button>

                <div class="top-profile">
                    <div class="top-avatar" id="topAvatar">
                        <i class="bi bi-person-fill"></i>
                    </div>
                    <div class="top-profile-text">
                        <strong id="topWorkerName">Worker</strong>
                        <small>Worker</small>
                    </div>
                </div>

            </div>
        </header>

        <div class="content-wrapper">

            <!-- ================= DASHBOARD ================= -->
            <section class="page-section active-section" id="dashboardSection">

                <div class="welcome-banner">
                    <div class="welcome-content">
                        <span class="welcome-kicker">
                            <i class="bi bi-stars"></i> Production workspace
                        </span>

                        <h1>Good day, <span id="welcomeWorkerName">Worker</span> 👋</h1>

                        <p>
                            Keep your assigned production jobs moving and update
                            their status as you work.
                        </p>

                        <button class="primary-soft-btn" onclick="openSection('jobsSection')">
                            <i class="bi bi-clipboard2-check"></i>
                            View My Jobs
                        </button>
                    </div>

                    <div class="welcome-illustration">
                        <div class="orbit orbit-one"></div>
                        <div class="orbit orbit-two"></div>
                        <div class="machine-illustration">
                            <i class="bi bi-gear-wide-connected"></i>
                        </div>
                        <div class="floating-part part-one">
                            <i class="bi bi-nut"></i>
                        </div>
                        <div class="floating-part part-two">
                            <i class="bi bi-tools"></i>
                        </div>
                    </div>
                </div>

                <!-- Stats -->
                <div class="stats-grid">

                    <div class="stat-card stat-lavender">
                        <div class="stat-icon">
                            <i class="bi bi-clipboard2-check-fill"></i>
                        </div>
                        <div class="stat-info">
                            <span>Total Assigned</span>
                            <strong id="assignedCount">0</strong>
                            <small>Jobs assigned to you</small>
                        </div>
                    </div>

                    <div class="stat-card stat-peach">
                        <div class="stat-icon">
                            <i class="bi bi-hourglass-split"></i>
                        </div>
                        <div class="stat-info">
                            <span>Pending</span>
                            <strong id="pendingCount">0</strong>
                            <small>Waiting to start</small>
                        </div>
                    </div>

                    <div class="stat-card stat-mint">
                        <div class="stat-icon">
                            <i class="bi bi-arrow-repeat"></i>
                        </div>
                        <div class="stat-info">
                            <span>In Progress</span>
                            <strong id="progressCount">0</strong>
                            <small>Currently working</small>
                        </div>
                    </div>

                    <div class="stat-card stat-blue">
                        <div class="stat-icon">
                            <i class="bi bi-check2-circle"></i>
                        </div>
                        <div class="stat-info">
                            <span>Completed</span>
                            <strong id="completedCount">0</strong>
                            <small>Finished jobs</small>
                        </div>
                    </div>

                </div>

                <!-- Dashboard lower area -->
                <div class="dashboard-grid">

                    <div class="content-card recent-card">

                        <div class="card-heading">
                            <div>
                                <span class="card-kicker">WORK QUEUE</span>
                                <h5>Recent Assigned Jobs</h5>
                            </div>

                            <button class="view-all-btn" onclick="openSection('jobsSection')">
                                View All <i class="bi bi-arrow-right"></i>
                            </button>
                        </div>

                        <div class="table-responsive">
                            <table class="custom-table">
                                <thead>
                                    <tr>
                                        <th>Job</th>
                                        <th>Part</th>
                                        <th>Quantity</th>
                                        <th>Material</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="recentJobsBody">
                                    <tr>
                                        <td colspan="6" class="empty-state">Loading jobs...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>

                    <div class="content-card progress-card">

                        <div class="card-heading">
                            <div>
                                <span class="card-kicker">PRODUCTION</span>
                                <h5>Work Progress</h5>
                            </div>
                        </div>

                        <div class="progress-summary">
                            <div class="progress-circle" id="progressCircle">
                                <div>
                                    <strong id="progressPercentage">0%</strong>
                                    <span>complete</span>
                                </div>
                            </div>

                            <p id="progressMessage">
                                Start working on your assigned jobs to see progress.
                            </p>
                        </div>

                        <div class="mini-progress-list">
                            <div class="mini-progress-row">
                                <div>
                                    <span>Pending</span>
                                    <strong id="pendingPercent">0%</strong>
                                </div>
                                <div class="progress-track">
                                    <div class="progress-fill pending-fill" id="pendingBar"></div>
                                </div>
                            </div>

                            <div class="mini-progress-row">
                                <div>
                                    <span>In Progress</span>
                                    <strong id="progressPercent">0%</strong>
                                </div>
                                <div class="progress-track">
                                    <div class="progress-fill progress-fill-main" id="progressBar"></div>
                                </div>
                            </div>

                            <div class="mini-progress-row">
                                <div>
                                    <span>Completed</span>
                                    <strong id="completedPercent">0%</strong>
                                </div>
                                <div class="progress-track">
                                    <div class="progress-fill completed-fill" id="completedBar"></div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </section>

            <!-- ================= MY JOBS ================= -->
            <section class="page-section" id="jobsSection">

                <div class="section-header">
                    <div>
                        <span class="card-kicker">WORK QUEUE</span>
                        <h2>My Jobs</h2>
                        <p>Jobs currently assigned to you.</p>
                    </div>
                    <div class="section-header-icon">
                        <i class="bi bi-clipboard2-check-fill"></i>
                    </div>
                </div>

                <div class="content-card filter-card">

                    <div class="job-toolbar">
                        <div class="search-box">
                            <i class="bi bi-search"></i>
                            <input type="text" id="jobSearch"
                                   placeholder="Search job, part or material..."
                                   oninput="renderJobs()">
                        </div>

                        <select id="statusFilter" class="custom-select"
                                onchange="renderJobs()">
                            <option value="ALL">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="On Hold">On Hold</option>
                            <option value="Completed">Completed</option>
                        </select>

                        <button class="refresh-btn" onclick="loadWorkerData()">
                            <i class="bi bi-arrow-clockwise"></i>
                            Refresh
                        </button>
                    </div>

                </div>

                <div class="job-card-grid" id="jobGrid">
                    <div class="loading-card">
                        <div class="spinner-border spinner-border-sm"></div>
                        Loading assigned jobs...
                    </div>
                </div>

            </section>

            <!-- ================= MACHINES ================= -->
            <section class="page-section" id="machinesSection">

                <div class="section-header">
                    <div>
                        <span class="card-kicker">PRODUCTION EQUIPMENT</span>
                        <h2>Machines</h2>
                        <p>Machine information from your assigned jobs.</p>
                    </div>
                    <div class="section-header-icon mint-icon">
                        <i class="bi bi-cpu-fill"></i>
                    </div>
                </div>

                <div class="machine-grid" id="machineGrid">
                    <div class="loading-card">
                        Loading machine information...
                    </div>
                </div>

            </section>

            <!-- ================= MATERIALS ================= -->
            <section class="page-section" id="materialsSection">

                <div class="section-header">
                    <div>
                        <span class="card-kicker">PRODUCTION INPUT</span>
                        <h2>Materials</h2>
                        <p>Materials listed against your assigned jobs.</p>
                    </div>
                    <div class="section-header-icon peach-icon">
                        <i class="bi bi-box-seam-fill"></i>
                    </div>
                </div>

                <div class="material-grid" id="materialGrid">
                    <div class="loading-card">
                        Loading material information...
                    </div>
                </div>

            </section>

            <!-- ================= HISTORY ================= -->
            <section class="page-section" id="historySection">

                <div class="section-header">
                    <div>
                        <span class="card-kicker">AUDIT TRAIL</span>
                        <h2>Status History</h2>
                        <p>Status changes made to your assigned jobs during this session.</p>
                    </div>
                    <div class="section-header-icon lavender-icon">
                        <i class="bi bi-clock-history"></i>
                    </div>
                </div>

                <div class="content-card">
                    <div class="history-note">
                        <i class="bi bi-info-circle"></i>
                        Every successful status update is stored by the backend in
                        <strong>job_status_history</strong>.
                    </div>

                    <div class="timeline" id="historyTimeline">
                        <div class="empty-history">
                            <i class="bi bi-clock-history"></i>
                            <p>No status updates recorded in this page yet.</p>
                            <small>Update a job status to create a history entry.</small>
                        </div>
                    </div>
                </div>

            </section>

            <!-- ================= PROFILE ================= -->
            <section class="page-section" id="profileSection">

                <div class="section-header">
                    <div>
                        <span class="card-kicker">ACCOUNT</span>
                        <h2>My Profile</h2>
                        <p>Your worker account information.</p>
                    </div>
                    <div class="section-header-icon blue-icon">
                        <i class="bi bi-person-vcard-fill"></i>
                    </div>
                </div>

                <div class="profile-layout">

                    <div class="content-card profile-main-card">

                        <div class="profile-cover"></div>

                        <div class="profile-avatar-large" id="profileAvatar">
                            <i class="bi bi-person-fill"></i>
                        </div>

                        <div class="profile-main-info">
                            <h3 id="profileFullName">Worker</h3>
                            <span class="role-badge">
                                <i class="bi bi-person-badge"></i> Worker
                            </span>
                            <p id="profileSkill">Production Worker</p>
                        </div>

                        <div class="profile-details-grid">

                            <div class="profile-detail">
                                <span><i class="bi bi-hash"></i> Worker ID</span>
                                <strong id="profileWorkerId">-</strong>
                            </div>

                            <div class="profile-detail">
                                <span><i class="bi bi-person-vcard"></i> User ID</span>
                                <strong id="profileUserId">-</strong>
                            </div>

                            <div class="profile-detail">
                                <span><i class="bi bi-envelope"></i> Email</span>
                                <strong id="profileEmail">-</strong>
                            </div>

                            <div class="profile-detail">
                                <span><i class="bi bi-phone"></i> Mobile</span>
                                <strong id="profileMobile">-</strong>
                            </div>

                            <div class="profile-detail">
                                <span><i class="bi bi-person"></i> Username</span>
                                <strong id="profileUsername">-</strong>
                            </div>

                            <div class="profile-detail">
                                <span><i class="bi bi-activity"></i> Account Status</span>
                                <strong id="profileStatus">-</strong>
                            </div>

                        </div>

                    </div>

                    <div class="content-card profile-summary-card">

                        <div class="card-heading">
                            <div>
                                <span class="card-kicker">WORKER SUMMARY</span>
                                <h5>My Work</h5>
                            </div>
                            <i class="bi bi-person-workspace heading-symbol"></i>
                        </div>

                        <div class="profile-stat">
                            <div class="profile-stat-icon lavender-bg">
                                <i class="bi bi-clipboard-check"></i>
                            </div>
                            <div>
                                <span>Assigned Jobs</span>
                                <strong id="profileAssignedCount">0</strong>
                            </div>
                        </div>

                        <div class="profile-stat">
                            <div class="profile-stat-icon mint-bg">
                                <i class="bi bi-arrow-repeat"></i>
                            </div>
                            <div>
                                <span>In Progress</span>
                                <strong id="profileProgressCount">0</strong>
                            </div>
                        </div>

                        <div class="profile-stat">
                            <div class="profile-stat-icon blue-bg">
                                <i class="bi bi-check2-circle"></i>
                            </div>
                            <div>
                                <span>Completed</span>
                                <strong id="profileCompletedCount">0</strong>
                            </div>
                        </div>

                    </div>

                </div>

            </section>

        </div>
    </main>
</div>

<!-- ================= JOB DETAILS MODAL ================= -->
<div class="modal fade" id="jobDetailsModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content worker-modal">

            <div class="modal-header">
                <div>
                    <span class="modal-kicker">JOB DETAILS</span>
                    <h5 class="modal-title" id="modalJobTitle">Job Details</h5>
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">

                <div class="modal-status-row">
                    <div>
                        <span>Job ID</span>
                        <strong id="modalJobId">-</strong>
                    </div>
                    <div id="modalStatusBadge" class="status-badge">-</div>
                </div>

                <div class="detail-box-grid">

                    <div class="detail-box">
                        <i class="bi bi-box"></i>
                        <div>
                            <span>Part Name</span>
                            <strong id="modalPartName">-</strong>
                        </div>
                    </div>

                    <div class="detail-box">
                        <i class="bi bi-123"></i>
                        <div>
                            <span>Quantity</span>
                            <strong id="modalQuantity">-</strong>
                        </div>
                    </div>

                    <div class="detail-box">
                        <i class="bi bi-box-seam"></i>
                        <div>
                            <span>Material</span>
                            <strong id="modalMaterial">-</strong>
                        </div>
                    </div>

                    <div class="detail-box">
                        <i class="bi bi-cpu"></i>
                        <div>
                            <span>Machine ID</span>
                            <strong id="modalMachine">-</strong>
                        </div>
                    </div>

                    <div class="detail-box">
                        <i class="bi bi-person"></i>
                        <div>
                            <span>Customer ID</span>
                            <strong id="modalCustomer">-</strong>
                        </div>
                    </div>

                    <div class="detail-box">
                        <i class="bi bi-file-earmark"></i>
                        <div>
                            <span>Design File</span>
                            <strong id="modalDesignFile">-</strong>
                        </div>
                    </div>

                </div>

                <div class="status-update-panel">
                    <div>
                        <span class="panel-label">UPDATE PRODUCTION STATUS</span>
                        <p>Change the status when the work progresses.</p>
                    </div>

                    <select id="modalStatusSelect" class="status-select">
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Completed">Completed</option>
                    </select>

                    <button class="update-status-btn" onclick="updateSelectedJobStatus()">
                        <i class="bi bi-check2-circle"></i>
                        Update Status
                    </button>
                </div>

            </div>
        </div>
    </div>
</div>

<!-- Toast -->
<div class="worker-toast" id="workerToast">
    <div class="toast-icon" id="toastIcon">
        <i class="bi bi-check-lg"></i>
    </div>
    <div>
        <strong id="toastTitle">Success</strong>
        <span id="toastMessage">Operation completed.</span>
    </div>
</div>
<script src="${pageContext.request.contextPath}/javascript/api-config.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="${pageContext.request.contextPath}/javascript/workerDashboard.js"></script>

</body>
</html>
