<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Admin Dashboard | Smart Tool Room</title>

    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet">

    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
        rel="stylesheet">

    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        rel="stylesheet">

    <link rel="stylesheet" href="css/adminDashboard.css">

</head>
<body>


<!-- =========================================================
     SIDEBAR
========================================================= -->

<aside class="sidebar" id="sidebar">
    <!-- LOGO -->
    <div class="logo-area">
        <div class="logo-icon"><i class="bi bi-tools"></i></div>
           <div class="logo-content"><h5>YantraX</h5><span>Production Management</span></div>
       </div>


    <!-- ADMIN PROFILE -->
      <div class="sidebar-profile">
          <div class="profile-image">
             <img src="${pageContext.request.contextPath}/images/Passport photo.png" alt="Admin">
         </div>

        <div class="profile-info">
            <strong>Administrator</strong>
               <small><i class="bi bi-circle-fill"></i>Online</small>
           </div>
        </div>


    <!-- MAIN MENU -->
     <div class="menu-title">MAIN MENU</div>
         <ul class="sidebar-menu">
           <li><a href="#dashboard" class="sidebar-link active" data-section="dashboard"><i class="bi bi-grid-1x2-fill"></i><span>Dashboard</span>
           </a>
        </li>


        <li><a href="#customers" class="sidebar-link" data-section="customers"><i class="bi bi-people-fill"></i><span>Customers</span>
               <span class="menu-count"></span>
             </a>
         </li>


        <li>
           <a href="#workers" class="sidebar-link" data-section="workers"><i class="bi bi-person-workspace"></i><span>Workers</span>
               <span class="menu-count"></span>
             </a>
          </li>

        <li>
            <a href="#machines" class="sidebar-link" data-section="machines"><i class="bi bi-gear-wide-connected"></i><span>Machines</span></a>
         </li> 
         
        <li>
           <a href="#materials"  class="sidebar-link" data-section="materials"><i class="bi bi-box-seam-fill"></i><span>Materials</span></a>
         </li>  
      </ul> 
      
      
      <!-- PRODUCTION -->
    
    <div class="menu-title">PRODUCTION</div>
      <ul class="sidebar-menu">
          <li><a href="#jobs" class="sidebar-link" data-section="jobs">
            <i class="bi bi-clipboard-check-fill"></i>
              <span>Job Orders</span>
            <span class="menu-count warning"></span>
        </a>
    </li>
        
        
        <li><a href="#jobStatus" class="sidebar-link" data-section="jobStatus"><i class="bi bi-hourglass-split"></i>
             <span>Job Status</span>
           </a>
         </li>
      </ul>
                

     <!-- FINANCE -->
      <div class="menu-title">FINANCE</div>
         <ul class="sidebar-menu">
           <li><a href="#invoices" class="sidebar-link" data-section="invoiceManagement"><i class="bi bi-receipt-cutoff"></i>
                <span>Invoices</span>
              </a>
          </li>

          <li><a href="#payments" class="sidebar-link" data-section="payments"><i class="bi bi-cash-coin"></i>
                <span>Payments</span>
                    <span class="menu-count danger"></span>
                 </a>
             </li>
         </ul>



    <!-- ADMINISTRATION -->
      <div class="menu-title">ADMINISTRATION</div>
          <ul class="sidebar-menu">
             <li><a href="#users" class="sidebar-link" data-section="users"><i class="bi bi-person-gear"></i>
                 <span>User Management</span>
               </a>
          </li>


         <li><a href="#reports" class="sidebar-link" data-section="reports"><i class="bi bi-bar-chart-line-fill"></i>
               <span>Reports</span>
             </a>
          </li>

         <li><a href="#settings" class="sidebar-link" data-section="settings"><i class="bi bi-sliders"></i>
               <span>Settings</span>
             </a>
         </li>
     </ul>


  <!-- SIDEBAR BOTTOM -->

       <div class="sidebar-bottom">
           <div class="help-card">
              <div class="help-icon"><i class="bi bi-headset"></i></div>
          <strong>Need Help?</strong>
          <small> Contact system support</small>
          <button type="button" class="contact-support-btn" id="contactSupportBtn"><i class="bi bi-chat-dots"></i>Contact Support</button>
    </div>

    <!-- LOGOUT - KEEP YOUR EXISTING LOGOUT -->
       <button class="logout-btn" id="logoutBtn"><i class="bi bi-box-arrow-right"></i> Logout</button>
   </div>
</aside>

<!-- =========================================================
     MOBILE OVERLAY
========================================================= -->

<!-- SIDEBAR OVERLAY -->
<div class="sidebar-overlay" id="sidebarOverlay"></div>


<!-- MAIN CONTENT -->
<main class="main-content">


    <!-- TOP NAVBAR -->
    <header class="topbar">


        <!-- TOPBAR LEFT -->
        <div class="topbar-left">

            <button
                class="mobile-menu-btn"
                id="mobileMenuBtn">

                <i class="bi bi-list"></i>

            </button>


            <div class="page-heading">

                <h2>
                    Admin Dashboard
                </h2>

                <p>
                    YantraX
                </p>

            </div>

        </div>



        <!-- TOPBAR RIGHT -->
        <div class="topbar-right">


            <!-- =========================================
                 GLOBAL SEARCH
            ========================================== -->

            <div class="global-search">

                <i class="bi bi-search"></i>

                <input
                    type="text"
                    id="globalSearch"
                    placeholder="Search customers, jobs, machines...">

            </div>



            <!-- =========================================
                 NOTIFICATION
            ========================================== -->

<button
    class="top-icon-btn"
    id="notificationBtn"
    title="Notifications">

    <i class="bi bi-bell"></i>

    <!-- Dynamic Notification Count -->

    <span
        class="notification-badge"
        id="notificationBadge"
        style="display: none;">

        0

    </span>

</button>


<!-- =====================================================
     NOTIFICATION PANEL
====================================================== -->

<div
    class="notification-panel"
    id="notificationPanel"
    style="display: none;">

    <div class="notification-header">

        <div>

            <strong>
                Notifications
            </strong>

            <small id="notificationSummary">
                Loading...
            </small>

        </div>

        <button
            type="button"
            id="markNotificationsRead">

            Mark all read

        </button>

    </div>


    <div
        class="notification-list"
        id="notificationList">

        <div class="notification-loading">

            <div class="notification-spinner"></div>

            <span>
                Loading notifications...
            </span>

        </div>

    </div>


    <div class="notification-footer">

        <button
            type="button"
            id="viewAllNotifications">

            View all notifications

            <i class="bi bi-arrow-right"></i>

        </button>

    </div>

</div>





            <!-- =========================================
                 MESSAGE
            ========================================== -->

            <button
                class="top-icon-btn"
                id="topMessageBtn"
                title="Messages">

                <i class="bi bi-envelope"></i>

                <!-- Dynamic Message Count -->
                <span
                    class="message-badge"
                    id="messageBadge"
                    style="display: none;">

                    0

                </span>

            </button>



            <!-- =========================================
                 DYNAMIC ADMIN PROFILE
            ========================================== -->

            <div
                class="top-profile"
                id="adminTopProfile">


                <!-- Dynamic Admin Photo -->

                <img
                    id="adminTopProfilePhoto"
                    src="${pageContext.request.contextPath}/images/Passport photo.png"
                    alt="Admin">


                <div>


                    <!-- Dynamic Admin Name -->

                    <strong id="adminTopProfileName">

                        Loading...

                    </strong>


                    <!-- Dynamic Admin Role -->

                    <small id="adminTopProfileRole">

                        System Admin

                    </small>


                </div>


                <i class="bi bi-chevron-down"></i>


            </div>


        </div>


    </header>



    <!-- =====================================================
         DASHBOARD SECTION
    ====================================================== -->

    <section class="dashboard-section active-section" id="dashboard">

     <!-- WELCOME BANNER -->
          <div class="welcome-banner">
              <div class="welcome-content">
                  <span class="welcome-label">ADMINISTRATOR PANEL</span>
                    <h1>Welcome back, Administrator<span>👋</span></h1>
                      <p>Monitor your complete tool room, production operations, resources, customers and financial activities from one place.</p>


                <div class="welcome-actions">
                  <button class="primary-btn" onclick="openCreateJob()"><i class="bi bi-plus-lg"></i>Create New Job</button>
                 <button class="secondary-btn" onclick="showSection('reports')"> <i class="bi bi-bar-chart"></i> View Reports </button>
               </div>
             </div>


            <div class="welcome-image">
              <img src="${pageContext.request.contextPath}/images/admin-dashboard.png" alt="Production Management" 
                   onerror="this.style.display='none';">
               <div class="welcome-illustration"><i class="bi bi-speedometer2"></i></div>
           </div>
         </div>


<!-- =================================================
             SUMMARY CARDS
 ================================================== -->

        <div class="section-heading">
        <div><h3>Business Overview</h3>
             <p>Quick summary of your system</p></div>
            <span class="updated-time"><i class="bi bi-arrow-clockwise"></i>Updated just now</span>
         </div>


        <div class="stats-grid">

            <!-- CUSTOMERS -->
            <div class="stat-card purple-card">
               <div class="stat-card-top"><div>
                  <span class="stat-label">TOTAL CUSTOMERS</span><h2 id="totalCustomers">0</h2>
                </div>
                    <div class="stat-icon"><i class="bi bi-people-fill"></i>
                </div>
            </div>
             <div class="stat-footer"><span class="positive"><i class="bi bi-arrow-up"></i>8.2%</span>
               <span>from last month</span>
            </div>
          </div>


        <!-- WORKERS -->
         <div class="stat-card blue-card">
           <div class="stat-card-top">
             <div><span class="stat-label">TOTAL WORKERS</span>
                 <h2 id="totalWorkers">0</h2></div>
                <div class="stat-icon"><i class="bi bi-person-workspace"></i>
            </div>
          </div>
         <div class="stat-footer">
            <span class="positive"><i class="bi bi-check-circle"></i>
               <span id="activeWorkers">0</span> Active</span>
                 <span>workers</span>
             </div>
           </div>


            <!-- MACHINES -->

        <div class="stat-card pink-card">
           <div class="stat-card-top">
              <div><span class="stat-label">TOTAL MACHINES</span>
                 <h2 id="totalMachines">0</h2></div>
                    <div class="stat-icon"><i class="bi bi-gear-wide-connected"></i>
                 </div>
             </div>
                <div class="stat-footer"><span class="positive">
                   <span id="availableMachines">0</span> Available</span>
                    <span>machines</span>
               </div>
           </div>


            <!-- MATERIALS -->

            <div class="stat-card green-card">
                <div class="stat-card-top"><div>
                   <span class="stat-label">TOTAL MATERIALS</span>
                      <h2 id="totalMaterials">0</h2></div>
                        <div class="stat-icon"><i class="bi bi-box-seam-fill"></i>
                    </div>
                 </div>
                <div class="stat-footer">
                    <span class="warning-text"><i class="bi bi-exclamation-circle"></i>
                       <span id="lowStockMaterials">0</span> Low Stock</span>
                      <span>items</span>
                </div>
            </div>


            <!-- TOTAL JOBS -->
            <div class="stat-card yellow-card">
                <div class="stat-card-top"><div>
                     <span class="stat-label">TOTAL JOB ORDERS</span>
                        <h2 id="totalJobs">0</h2></div>
                          <div class="stat-icon"><i class="bi bi-clipboard-check-fill"></i>
                    </div>
                </div>
                   <div class="stat-footer"><span>This month</span>
                </div>
            </div>


            <!-- PENDING -->
            <div class="stat-card orange-card">
                <div class="stat-card-top"><div>
                    <span class="stat-label">PENDING JOBS</span>
                        <h2 id="pendingJobs">0</h2></div>
                          <div class="stat-icon"><i class="bi bi-hourglass-split"></i>
                    </div>
                </div>
                <div class="stat-footer">
                    <span class="warning-text">Needs attention</span>
                </div>
            </div>



            <!-- IN PROGRESS -->
            <div class="stat-card cyan-card">
                <div class="stat-card-top"><div>
                     <span class="stat-label">IN PROGRESS</span>
                        <h2 id="progressJobs">0</h2></div>
                    <div class="stat-icon"><i class="bi bi-arrow-repeat"></i>
                 </div>
             </div>
                <div class="stat-footer"><span>Currently processing</span>
             </div>
          </div>


            <!-- COMPLETED -->

            <div class="stat-card teal-card">
                <div class="stat-card-top"><div>
                      <span class="stat-label">COMPLETED JOBS</span>
                        <h2 id="completedJobs">0</h2></div>
                          <div class="stat-icon"><i class="bi bi-check-circle-fill"></i>
                    </div>
                </div>
                <div class="stat-footer"><span class="positive"><i class="bi bi-check2"></i>Successfully completed</span>
             </div>
            </div>
        </div>


<!-- =================================================
             QUICK ACTIONS
================================================== -->

        <div class="content-card quick-action-card">
            <div class="card-header-custom"><div>
                <div class="card-title-icon purple-bg"><i class="bi bi-lightning-charge-fill"></i></div>
                    <div><h3>Quick Actions</h3>
                        <p>Frequently used operations</p>
                    </div>
                </div>
            </div>


            <div class="quick-actions-grid">
                <button class="quick-action" onclick="openAddCustomer()">
                    <span class="quick-icon purple-bg"><i class="bi bi-person-plus-fill"></i></span>
                    <strong>Add Customer</strong>
                    <small>Register new customer</small>
                </button>


                <button class="quick-action" onclick="openAddWorker()">
                    <span class="quick-icon blue-bg"><i class="bi bi-person-plus"></i></span>
                    <strong>Add Worker</strong>
                    <small>Register production worker</small>
                </button>
                
                            
<!-- =========================================================
     ADD WORKER MODAL
========================================================= -->

           <div class="modal fade" id="addWorkerModal" tabindex="-1" aria-hidden="true"> 
              <div class="modal-dialog modal-lg"> 
                <div class="modal-content custom-modal"> 
                  <div class="modal-header"> 
                    <div><h5><i class="bi bi-person-plus me-2"></i> Add New Worker</h5> 
                    <small>Register a new production worker</small> 
                </div> 
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button> 
            </div> 


            <div class="modal-body"> 
                <form id="addWorkerForm"> 
                    <div class="row g-3"> 
                        <div class="col-md-6"> 
                            <label class="form-label">Full Name</label> 
                            <input type="text" class="form-control" id="workerFullName"  placeholder="Enter full name" required> 
                        </div> 


            <div class="col-md-6"> 
              <label class="form-label">Email</label> 
                   <input type="email" class="form-control" id="workerEmail" placeholder="Enter email" required> 
                </div> 


              <div class="col-md-6"> 
                  <label class="form-label">Mobile Number</label> 
                       <input type="tel" class="form-control"  id="workerMobileNo"  placeholder="Enter mobile number" required> 
                      </div> 


                        <div class="col-md-6"> 
                            <label class="form-label"> Username</label> 
                            <input type="text" class="form-control"  id="workerUsername" placeholder="Enter username"  required> 
                        </div> 


                        <div class="col-md-6"> 
                            <label class="form-label">Password</label> 
                            <input type="password" class="form-control" id="workerPassword" placeholder="Enter password" required> 
                        </div> 


                        <div class="col-md-6"> 
                            <label class="form-label">Skill</label> 
                            <input type="text" class="form-control" id="workerSkill" placeholder="Example: CNC Operator" required> 
                        </div> 


                        <div class="col-md-6"> 
                            <label class="form-label">Salary</label> 
                            <input type="number" class="form-control" id="workerSalary" placeholder="Enter salary" min="0" step="0.01" required> 
                        </div> 


                        <div class="col-md-6"> 
                            <label class="form-label">Role </label> 
                            <input type="text" class="form-control" id="workerRole" value="Worker" readonly> 
                        </div> 


                        <div class="col-md-6"> 
                            <label class="form-label">Status</label> 
                            <select class="form-select" id="workerStatus"> 
                                <option value="Active">Active</option> 
                                <option value="Inactive">Inactive</option> 
                            </select> 
                        </div> 
                    </div> 
                </form> 
            </div> 


            <div class="modal-footer"> 
                <button type="button" class="secondary-btn" data-bs-dismiss="modal">Cancel</button> 
                   <button type="button" class="primary-btn" id="saveWorkerBtn" onclick="saveWorker()"> 
                       <i class="bi bi-check-lg"></i> 
                        Save Worker 
                </button> 
            </div> 
        </div> 
    </div> 
</div>


                <button
                    class="quick-action"
                    onclick="openAddMachine()">

                    <span class="quick-icon pink-bg">

                        <i class="bi bi-gear-wide-connected"></i>

                    </span>

                    <strong>
                        Add Machine
                    </strong>

                    <small>
                        Register new machine
                    </small>

                </button>


                <button
                    class="quick-action"
                    onclick="openAddMaterial()">

                    <span class="quick-icon green-bg">

                        <i class="bi bi-box-seam"></i>

                    </span>

                    <strong>
                        Add Material
                    </strong>

                    <small>
                        Update inventory
                    </small>

                </button>


               <button
    class="quick-action"
    onclick="openCreateJob()">

    <span class="quick-icon orange-bg">
        <i class="bi bi-clipboard-plus"></i>
    </span>

    <strong>
        Create Job
    </strong>

    <small>
        Create new job order
    </small>

</button>


                <button
                    class="quick-action"
                    onclick="openCreateInvoice()">

                    <span class="quick-icon yellow-bg">

                        <i class="bi bi-receipt"></i>

                    </span>

                    <strong>
                        Create Invoice
                    </strong>

                    <small>
                        Generate customer invoice
                    </small>

                </button>


            </div>

        </div>



<!-- =================================================
     REVENUE + JOB STATUS
================================================== -->

<div class="two-column-grid">

    <!-- REVENUE OVERVIEW -->

    <div class="content-card revenue-card">

        <div class="card-header-custom">

            <div>

                <div class="card-title-icon green-bg">

                    <i class="bi bi-graph-up-arrow"></i>

                </div>

                <div>

                    <h3>
                        Revenue Overview
                    </h3>

                    <p>
                        Monthly financial performance
                    </p>

                </div>

            </div>


            <select
                class="period-select"
                id="revenuePeriod">

                <option value="year">
                    This Year
                </option>

                <option value="month">
                    This Month
                </option>

                <option value="sixMonths">
                    Last 6 Months
                </option>

            </select>

        </div>


        <div class="revenue-summary">

            <div>

                <span>
                    TOTAL REVENUE
                </span>

                <h2 id="totalRevenue">
                    ₹0
                </h2>

                <small
                    class="positive"
                    id="revenueComparison">

                    <i class="bi bi-arrow-up"></i>

                    0% compared to last month

                </small>

            </div>


            <div class="revenue-mini-stats">

                <div>

                    <span>
                        Paid
                    </span>

                    <strong id="paidRevenue">
                        ₹0
                    </strong>

                </div>


                <div>

                    <span>
                        Pending
                    </span>

                    <strong id="pendingRevenue">
                        ₹0
                    </strong>

                </div>

            </div>

        </div>


        <!-- CHART -->

        <div class="revenue-chart">

            <div class="chart-y-axis">

                <span id="chartMax">
                    ₹0
                </span>

                <span id="chart75">
                    ₹0
                </span>

                <span id="chart50">
                    ₹0
                </span>

                <span id="chart0">
                    ₹0
                </span>

            </div>


            <div class="chart-area">

                <div class="chart-grid-line line-1"></div>

                <div class="chart-grid-line line-2"></div>

                <div class="chart-grid-line line-3"></div>

                <div class="chart-grid-line line-4"></div>


                <div
                    class="revenue-bars"
                    id="revenueBars">

                    <!-- JavaScript will create the bars here -->

                </div>

            </div>

        </div>

    </div>




            <!-- JOB STATUS -->

            <div class="content-card">


                <div class="card-header-custom">

                    <div>

                        <div class="card-title-icon purple-bg">

                            <i class="bi bi-pie-chart-fill"></i>

                        </div>

                        <div>

                            <h3>
                                Job Status
                            </h3>

                            <p>
                                Current production status
                            </p>

                        </div>

                    </div>

                </div>


                <div class="job-status-content">


                    <div class="status-circle">

                        <div>

                            <strong id="dashboardTotalJobs">0</strong>

                            <span>
                                Total Jobs
                            </span>

                        </div>

                    </div>


                    <div class="status-list">


                        <div class="status-row">

                            <span>
                                <i class="status-dot pending-dot"></i>
                                Pending
                            </span>

                            <strong id="dashboardPendingCount">0</strong>

                        </div>


                        <div class="status-row">

                            <span>
                                <i class="status-dot assigned-dot"></i>
                                Assigned
                            </span>

                           <strong id="dashboardAssignedCount">0</strong>
                        </div>


                        <div class="status-row">

                            <span>
                                <i class="status-dot progress-dot"></i>
                                In Progress
                            </span>

                            <strong id="dashboardProgressCount">0</strong>

                        </div>


                        <div class="status-row">

                            <span>
                                <i class="status-dot completed-dot"></i>
                                Completed
                            </span>

                           <strong id="dashboardCompletedCount">0</strong>

                        </div>


                        <div class="status-row">

                            <span>
                                <i class="status-dot cancelled-dot"></i>
                                Cancelled
                            </span>

                           <strong id="dashboardCancelledCount">0</strong>

                        </div>


                    </div>

                </div>

            </div>


        </div>



        <!-- =================================================
     RECENT JOB ORDERS
================================================== -->

<div class="content-card">

    <div class="card-header-custom">

        <div>

            <div class="card-title-icon orange-bg">
                <i class="bi bi-clipboard-data-fill"></i>
            </div>

            <div>
                <h3>Recent Job Orders</h3>

                <p>
                    Latest production orders
                </p>
            </div>

        </div>


        <!-- VIEW ALL JOBS -->

        <button
            class="outline-btn"
            onclick="openJobOrders()">

            View All Jobs

            <i class="bi bi-arrow-right"></i>

        </button>

    </div>


    <!-- =================================================
         RECENT JOB ORDERS TABLE
    ================================================== -->

    <div class="table-responsive">

        <table class="dashboard-table">

            <thead>

                <tr>

                    <th>Job ID</th>

                    <th>Customer</th>

                    <th>Job Description</th>

                    <th>Worker</th>

                    <th>Machine</th>

                    <th>Due Date</th>

                    <th>Status</th>

                    <th>Action</th>

                </tr>

            </thead>


            <!-- =================================================
                 DYNAMIC DATA WILL BE INSERTED HERE BY JS
            ================================================== -->

            <tbody id="recentJobsTableBody">

                <tr>

                    <td colspan="8">

                        <div class="table-message">

                            <div class="loading-spinner"></div>

                            Loading recent job orders...

                        </div>

                    </td>

                </tr>

            </tbody>

        </table>

    </div>

</div>



        <!-- =================================================
             MACHINE + MATERIAL
        ================================================== -->

        <div class="three-column-grid">


            <!-- MACHINE STATUS -->

           <!-- =================================================
     MACHINE STATUS
================================================== -->

<div class="content-card">

    <div class="card-header-custom">

        <div>

            <div class="card-title-icon pink-bg">

                <i class="bi bi-cpu-fill"></i>

            </div>

            <div>

                <h3>
                    Machine Status
                </h3>

                <p>
                    Production machines
                </p>

            </div>

        </div>


        <button
            class="small-link"
            onclick="openMachines()">

            Manage

        </button>

    </div>


    <!-- =================================================
         DYNAMIC MACHINE LIST
    ================================================== -->

    <div
        class="machine-list"
        id="dashboardMachineList">

        <div class="machine-item">

            <div class="machine-item-left">

                <div class="machine-icon pink-bg">

                    <i class="bi bi-gear-wide-connected"></i>

                </div>

                <div>

                    <strong>
                        Loading machines...
                    </strong>

                    <small>
                        Please wait
                    </small>

                </div>

            </div>

        </div>

    </div>

</div>
            <!-- MATERIAL STOCK -->

  <!-- =========================================================
     MATERIAL INVENTORY
========================================================= -->

<div class="content-card">

    <div class="card-header-custom">

        <div>

            <div class="card-title-icon green-bg">

                <i class="bi bi-boxes"></i>

            </div>

            <div>

                <h3>
                    Material Inventory
                </h3>

                <p>
                    Stock availability
                </p>

            </div>

        </div>


        <!-- MANAGE MATERIALS -->

        <button
            class="small-link"
            onclick="openMaterials()">

            Manage

        </button>

    </div>


    <!-- =====================================================
         DYNAMIC MATERIAL LIST
    ====================================================== -->

    <div
        class="stock-list"
        id="materialStockList">

        <div class="text-center py-3">

            <small>
                Loading materials...
            </small>

        </div>

    </div>

</div>

            <!-- ALERTS -->

            <div class="content-card">


                <div class="card-header-custom">

                    <div>

                        <div class="card-title-icon orange-bg">

                            <i class="bi bi-exclamation-triangle-fill"></i>

                        </div>

                        <div>

                            <h3>
                                Alerts
                            </h3>

                            <p>
                                Important notifications
                            </p>

                        </div>

                    </div>

                    <span class="alert-count">
                        4
                    </span>

                </div>


                <div class="alerts-list">


                    <div class="alert-item warning-alert">

                        <div class="alert-item-icon">

                            <i class="bi bi-box-seam"></i>

                        </div>

                        <div>

                            <strong>
                                Low Material Stock
                            </strong>

                            <small>
                                Steel Rod below minimum level
                            </small>

                        </div>

                    </div>


                    <div class="alert-item danger-alert">

                        <div class="alert-item-icon">

                            <i class="bi bi-gear"></i>

                        </div>

                        <div>

                            <strong>
                                Machine Maintenance
                            </strong>

                            <small>
                                Lathe Machine 03 needs service
                            </small>

                        </div>

                    </div>


                    <div class="alert-item info-alert">

                        <div class="alert-item-icon">

                            <i class="bi bi-cash-coin"></i>

                        </div>

                        <div>

                            <strong>
                                Pending Payments
                            </strong>

                            <small>
                                4 payments awaiting
                            </small>

                        </div>

                    </div>


                    <div class="alert-item warning-alert">

                        <div class="alert-item-icon">

                            <i class="bi bi-clock"></i>

                        </div>

                        <div>

                            <strong>
                                Pending Jobs
                            </strong>

                            <small>
                                8 jobs need assignment
                            </small>

                        </div>

                    </div>


                </div>

            </div>


        </div>



        <!-- =================================================
             PAYMENT + RECENT ACTIVITIES
        ================================================== -->

        <div class="two-column-grid">

<!-- PAYMENT -->

<div class="content-card">

    <div class="card-header-custom">

        <div>

            <div class="card-title-icon blue-bg">

                <i class="bi bi-wallet2"></i>

            </div>

            <div>

                <h3>
                    Payment Summary
                </h3>

                <p>
                    Invoice and payment overview
                </p>

            </div>

        </div>


        <button
            class="small-link"
            onclick="openPayments()">

            View All

        </button>

    </div>


    <div class="payment-summary-grid">


        <div class="payment-box paid-box">

            <span>
                PAID
            </span>

            <strong id="dashboardPaidAmount">
                ₹0
            </strong>

            <small>
                Successfully received
            </small>

        </div>


        <div class="payment-box pending-box">

            <span>
                PENDING
            </span>

            <strong id="dashboardPendingAmount">
                ₹0
            </strong>

            <small>
                Awaiting payment
            </small>

        </div>


        <div class="payment-box total-box">

            <span>
                TOTAL INVOICED
            </span>

            <strong id="dashboardTotalInvoiced">
                ₹0
            </strong>

            <small>
                Current invoice value
            </small>

        </div>

    </div>


    <div class="payment-progress">

        <div class="payment-progress-header">

            <span>
                Collection Progress
            </span>

            <strong id="dashboardCollectionProgress">
                0%
            </strong>

        </div>


        <div class="payment-progress-bar">

            <div
                id="dashboardCollectionProgressBar"
                style="width:0%">

            </div>

        </div>

    </div>

</div>





            <!-- RECENT ACTIVITIES -->

            <div class="content-card">


                <div class="card-header-custom">

                    <div>

                        <div class="card-title-icon purple-bg">

                            <i class="bi bi-activity"></i>

                        </div>

                        <div>

                            <h3>
                                Recent Activities
                            </h3>

                            <p>
                                Latest system activity
                            </p>

                        </div>

                    </div>

                </div>


                <div class="activity-list">


                    <div class="activity-item">

                        <div class="activity-icon purple-bg">

                            <i class="bi bi-plus-lg"></i>

                        </div>

                        <div>

                            <strong>
                                New job JOB-1025 created
                            </strong>

                            <small>
                                ABC Industries • 10 min ago
                            </small>

                        </div>

                    </div>


                    <div class="activity-item">

                        <div class="activity-icon blue-bg">

                            <i class="bi bi-person-check"></i>

                        </div>

                        <div>

                            <strong>
                                Rahul assigned to JOB-1025
                            </strong>

                            <small>
                                Worker assignment • 25 min ago
                            </small>

                        </div>

                    </div>


                    <div class="activity-item">

                        <div class="activity-icon green-bg">

                            <i class="bi bi-receipt"></i>

                        </div>

                        <div>

                            <strong>
                                Invoice INV-1005 generated
                            </strong>

                            <small>
                                ₹29,500 • 1 hour ago
                            </small>

                        </div>

                    </div>


                    <div class="activity-item">

                        <div class="activity-icon yellow-bg">

                            <i class="bi bi-cash"></i>

                        </div>

                        <div>

                            <strong>
                                Payment received
                            </strong>

                            <small>
                                ABC Industries • 2 hours ago
                            </small>

                        </div>

                    </div>


                </div>

            </div>


        </div>


    </section>



    <!-- =====================================================
         CUSTOMER MANAGEMENT
    ====================================================== -->

    <section
        class="management-section"
        id="customers">


        <div class="management-header">

            <div>

                <span class="section-label">
                    MANAGEMENT
                </span>

                <h2>
                    Customer Management
                </h2>

                <p>
                    Add, view, update, search and manage all customers.
                </p>

            </div>


            <button
                class="primary-btn"
                onclick="openAddCustomer()">

                <i class="bi bi-person-plus"></i>

                Add Customer

            </button>

        </div>


        <div class="management-cards">


            <div class="management-stat">

                <i class="bi bi-people-fill purple-text"></i>

                <div>

                    <small>
                        Total Customers
                    </small>

                    <strong>
                        25
                    </strong>

                </div>

            </div>


            <div class="management-stat">

                <i class="bi bi-person-check-fill green-text"></i>

                <div>

                    <small>
                        Active Customers
                    </small>

                    <strong>
                        22
                    </strong>

                </div>

            </div>


            <div class="management-stat">

                <i class="bi bi-building blue-text"></i>

                <div>

                    <small>
                        Companies
                    </small>

                    <strong>
                        18
                    </strong>

                </div>

            </div>

        </div>


        <div class="content-card customer-management-content">

    <!-- CUSTOMER TABLE HEADER -->

    <div class="card-header-custom">

        <div>

            <div class="card-title-icon purple-bg">
                <i class="bi bi-people-fill"></i>
            </div>

            <div>
                <h3>
                    All Customers
                </h3>

                <p>
                    View and manage registered customers
                </p>
            </div>

        </div>

        <button
            class="primary-btn"
            onclick="openAddCustomer()">

            <i class="bi bi-person-plus"></i>

            Add Customer

        </button>

    </div>


    <!-- SEARCH -->

    <div class="customer-table-toolbar">

        <div class="search-box">

            <i class="bi bi-search"></i>

            <input
                type="text"
                id="customerTableSearch"
                placeholder="Search customer...">

        </div>

        <button
            class="secondary-btn"
            onclick="loadAndDisplayCustomers()">

            <i class="bi bi-arrow-clockwise"></i>

            Refresh

        </button>

    </div>


    <!-- TABLE -->

    <div class="table-responsive">

        <table class="dashboard-table customer-table">

            <thead>

                <tr>

                    <th>ID</th>

                    <th>Customer</th>

                    <th>Mobile</th>

                    <th>Email</th>

                    <th>Company</th>

                    <th>City</th>

                    <th>GST No</th>

                    <th>Action</th>

                </tr>

            </thead>


            <tbody id="customerTableBody">

                <tr>

                    <td
                        colspan="8"
                        class="text-center">

                        Loading customers...

                    </td>

                </tr>

            </tbody>

        </table>

    </div>

</div>

    </section>



    <!-- =====================================================
         WORKER MANAGEMENT
    ====================================================== -->

    <section
        class="management-section"
        id="workers">


        <div class="management-header">

            <div>

                <span class="section-label">
                    MANAGEMENT
                </span>

                <h2>
                    Worker Management
                </h2>

                <p>
                    Manage workers, availability and job assignments.
                </p>

            </div>


            <button
                class="primary-btn"
                onclick="openAddWorker()">

                <i class="bi bi-person-plus"></i>

                Add Worker

            </button>

        </div>


        <div class="management-cards">


            <div class="management-stat">

                <i class="bi bi-person-workspace blue-text"></i>

                <div>

                    <small>
                        Total Workers
                    </small>

                    <strong>
                        12
                    </strong>

                </div>

            </div>


            <div class="management-stat">

                <i class="bi bi-person-check green-text"></i>

                <div>

                    <small>
                        Available
                    </small>

                    <strong>
                        6
                    </strong>

                </div>

            </div>


            <div class="management-stat">

                <i class="bi bi-person-fill-gear orange-text"></i>

                <div>

                    <small>
                        Working
                    </small>

                    <strong>
                        6
                    </strong>

                </div>

            </div>

        </div>

 <!-- =====================================================
     WORKER TABLE
====================================================== -->

<div class="content-card">

    <!-- TABLE HEADER -->

    <div class="card-heading">

        <div>

            <h5>
                <i class="bi bi-people me-2"></i>
                All Workers
            </h5>

            <small>
                View and manage all registered workers
            </small>

        </div>

        <button
            type="button"
            class="secondary-btn"
            onclick="loadWorkers()">

            <i class="bi bi-arrow-clockwise me-1"></i>
            Refresh

        </button>

    </div>


    <!-- SEARCH -->

    <div class="row mb-3">

        <div class="col-md-6">

            <div class="input-group">

                <span class="input-group-text">

                    <i class="bi bi-search"></i>

                </span>

                <input
                    type="text"
                    id="workerTableSearch"
                    class="form-control"
                    placeholder="Search worker...">

            </div>

        </div>

    </div>


    <!-- WORKER TABLE -->

    <div class="table-responsive">

        <table class="table custom-table">

            <thead>

                <tr>

                    <th>
                        Worker ID
                    </th>

                    <th>
                        Worker
                    </th>

                    <th>
                        Email
                    </th>

                    <th>
                        Mobile
                    </th>

                    <th>
                        Skill
                    </th>

                    <th>
                        Salary
                    </th>

                    <th>
                        Status
                    </th>

                    <th>
                        Action
                    </th>

                </tr>

            </thead>


            <tbody id="workerTableBody">

                <tr>

                    <td
                        colspan="8"
                        class="text-center">

                        Loading workers...

                    </td>

                </tr>

            </tbody>

        </table>

    </div>

</div>
    </section>



    <!-- =====================================================
         MACHINE MANAGEMENT
    ====================================================== -->

    <section
        class="management-section"
        id="machines">


        <div class="management-header">

            <div>

                <span class="section-label">
                    PRODUCTION
                </span>

                <h2>
                    Machine Management
                </h2>

                <p>
                    Manage machines and monitor production equipment.
                </p>

            </div>


            <button
                class="primary-btn"
                onclick="openAddMachine()">

                <i class="bi bi-plus-lg"></i>

                Add Machine

            </button>

        </div>


        <div class="management-cards">


            <div class="management-stat">

                <i class="bi bi-gear-wide-connected purple-text"></i>

                <div>

                    <small>
                        Total Machines
                    </small>

                    <strong>
                        0
                    </strong>

                </div>

            </div>


            <div class="management-stat">

                <i class="bi bi-check-circle green-text"></i>

                <div>

                    <small>
                        Available
                    </small>

                    <strong>
                        0
                    </strong>

                </div>

            </div>


            <div class="management-stat">

                <i class="bi bi-tools orange-text"></i>

                <div>

                    <small>
                        Maintenance
                    </small>

                    <strong>
                        0
                    </strong>

                </div>

            </div>

        </div>


 <!-- =====================================================
     MACHINE LIST
====================================================== -->

<div class="content-card">

    <div class="content-card-header">

        <div>
            <h3>
                All Machines
            </h3>

            <p>
                View and manage all registered machines.
            </p>
        </div>

        <div class="search-box">

            <i class="bi bi-search"></i>

            <input
                type="text"
                id="machineTableSearch"
                placeholder="Search machines..."
            >

        </div>

    </div>


    <div class="table-responsive">

        <table class="management-table">

            <thead>

                <tr>

                    <th>
                        ID
                    </th>

                    <th>
                        Machine Name
                    </th>

                    <th>
                        Machine Type
                    </th>

                    <th>
                        Status
                    </th>

                    <th>
                        Action
                    </th>

                </tr>

            </thead>


            <tbody id="machineTableBody">

                <tr>

                    <td
                        colspan="5"
                        class="text-center"
                    >

                        Loading machines...

                    </td>

                </tr>

            </tbody>

        </table>

    </div>

</div>

    </section>

<!-- =====================================================
     ADD MACHINE MODAL
====================================================== -->

<div
    class="modal fade"
    id="addMachineModal"
    tabindex="-1"
    aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">

                    <i class="bi bi-gear-wide-connected me-2"></i>

                    Add Machine

                </h5>

                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close">
                </button>

            </div>


            <form id="addMachineForm">

                <div class="modal-body">


                    <!-- Machine Name -->

                    <div class="mb-3">

                        <label class="form-label">
                            Machine Name
                        </label>

                        <input
                            type="text"
                            class="form-control"
                            id="machineName"
                            name="machineName"
                            required
                        >

                    </div>


                    <!-- Machine Type -->

                    <div class="mb-3">

                        <label class="form-label">
                            Machine Type
                        </label>

                        <input
                            type="text"
                            class="form-control"
                            id="machineType"
                            name="machineType"
                            required
                        >

                    </div>


                    <!-- Status -->

                    <div class="mb-3">

                        <label class="form-label">
                            Status
                        </label>

                        <select
                            class="form-select"
                            id="machineStatus"
                            name="status"
                            required>

                            <option value="Available">
                                Available
                            </option>

                            <option value="Working">
                                Working
                            </option>

                            <option value="Maintenance">
                                Maintenance
                            </option>

                            <option value="Unavailable">
                                Unavailable
                            </option>

                        </select>

                    </div>


                </div>


                <div class="modal-footer">

                    <button
                        type="button"
                        class="btn btn-secondary"
                        onclick="closeModal('addMachineModal')">

                        Cancel

                    </button>


                    <button
                        type="button"
                        class="primary-btn"
                        id="saveMachineBtn"
                        onclick="saveMachine()">

                        <i class="bi bi-check-lg"></i>

                        Save Machine

                    </button>

                </div>

            </form>

        </div>

    </div>

</div>


    <!-- =========================================================
     MATERIAL MANAGEMENT
========================================================= -->

<section id="materials" class="dashboard-section">

    <!-- HEADER -->
    <div class="section-header-custom">

        <div>
            <h2>
                <i class="bi bi-box-seam me-2"></i>
                Material Management
            </h2>

            <p>
                Manage production materials and stock availability
            </p>
        </div>

        <button
            class="primary-btn"
            data-bs-toggle="modal"
            data-bs-target="#addMaterialModal">

            <i class="bi bi-plus-lg me-1"></i>
            Add Material

        </button>

    </div>


    <!-- =====================================================
         MATERIAL SUMMARY CARDS
    ====================================================== -->

    <div class="row g-3 mb-4">

        <!-- TOTAL MATERIALS -->
        <div class="col-md-4">

            <div class="content-card">

                <div class="d-flex justify-content-between align-items-center">

                    <div>

                        <small>
                            Total Materials
                        </small>

                        <h3 id="totalMaterialCount">
                            0
                        </h3>

                    </div>

                    <div class="card-title-icon green-bg">

                        <i class="bi bi-boxes"></i>

                    </div>

                </div>

            </div>

        </div>


        <!-- LOW STOCK -->
        <div class="col-md-4">

            <div class="content-card">

                <div class="d-flex justify-content-between align-items-center">

                    <div>

                        <small>
                            Low Stock
                        </small>

                        <h3 id="lowStockMaterialCount">
                            0
                        </h3>

                    </div>

                    <div class="card-title-icon yellow-bg">

                        <i class="bi bi-exclamation-triangle"></i>

                    </div>

                </div>

            </div>

        </div>


        <!-- TOTAL STOCK -->
        <div class="col-md-4">

            <div class="content-card">

                <div class="d-flex justify-content-between align-items-center">

                    <div>

                        <small>
                            Total Stock
                        </small>

                        <h3 id="totalMaterialStock">
                            0
                        </h3>

                    </div>

                    <div class="card-title-icon blue-bg">

                        <i class="bi bi-stack"></i>

                    </div>

                </div>

            </div>

        </div>

    </div>


    <!-- =====================================================
         SEARCH
    ====================================================== -->

    <div class="content-card mb-4">

        <div class="row g-3 align-items-center">

            <div class="col-md-8">

                <div class="input-group">

                    <span class="input-group-text">

                        <i class="bi bi-search"></i>

                    </span>

                    <input
                        type="text"
                        id="materialSearch"
                        class="form-control"
                        placeholder="Search material by name, type or supplier..."
                        onkeyup="searchMaterial()">

                </div>

            </div>

            <div class="col-md-4 text-md-end">

                <button
                    class="secondary-btn"
                    onclick="loadMaterials()">

                    <i class="bi bi-arrow-clockwise me-1"></i>
                    Refresh

                </button>

            </div>

        </div>

    </div>


    <!-- =====================================================
         MATERIAL TABLE
    ====================================================== -->

    <div class="content-card">

        <div class="card-header-custom">

            <div>

                <div class="card-title-icon green-bg">

                    <i class="bi bi-boxes"></i>

                </div>

                <div>

                    <h3>
                        Material Inventory
                    </h3>

                    <p>
                        Stock availability
                    </p>

                </div>

            </div>

        </div>


        <div class="table-responsive">

            <table class="table custom-table">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Material</th>

                        <th>Type</th>

                        <th>Quantity</th>

                        <th>Unit</th>

                        <th>Unit Price</th>

                        <th>Supplier</th>

                        <th>Min Stock</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                </thead>


                <tbody id="materialTableBody">

                    <tr>

                        <td colspan="10" class="text-center">

                            Loading materials...

                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    </div>

</section>



    <!-- =====================================================
         JOB ORDER MANAGEMENT
    ====================================================== -->

   <section class="management-section" id="jobs">

    <div class="management-header">

        <div>

            <span class="section-label">
                PRODUCTION
            </span>

            <h2>
                Job Order Management
            </h2>

            <p>
                Create, assign and monitor production jobs.
            </p>

        </div>

        <button
            class="primary-btn"
            onclick="openCreateJob()">

            <i class="bi bi-plus-lg"></i>

            Create Job Order

        </button>

    </div>


    <div class="content-card management-placeholder">

        <i class="bi bi-clipboard-check-fill"></i>

        <h3>
            Job Order Management
        </h3>

        <p>
            Create job orders, assign customers, workers,
            machines and materials, and track due dates.
        </p>

        <button
            class="primary-btn"
            onclick="openJobOrders()">

            Open Job Orders

        </button>

    </div>

</section>



    <!-- =====================================================
     JOB STATUS
====================================================== -->

<section
    class="management-section"
    id="jobStatus">

    <div class="management-header">

        <div>

            <span class="section-label">
                PRODUCTION TRACKING
            </span>

            <h2>
                Job Status Tracking
            </h2>

            <p>
                Monitor the complete lifecycle of every job.
            </p>

        </div>

    </div>


    <div class="status-flow">


        <!-- PENDING -->

        <div class="flow-step pending-flow">

            <i class="bi bi-hourglass-split"></i>

            <strong>
                Pending
            </strong>

            <span id="dashboardPendingJobs">
                0 Jobs
            </span>

        </div>


        <div class="flow-arrow">

            <i class="bi bi-arrow-right"></i>

        </div>


        <!-- ASSIGNED -->

        <div class="flow-step assigned-flow">

            <i class="bi bi-person-check"></i>

            <strong>
                Assigned
            </strong>

            <span id="dashboardAssignedJobs">
                0 Jobs
            </span>

        </div>


        <div class="flow-arrow">

            <i class="bi bi-arrow-right"></i>

        </div>


        <!-- IN PROGRESS -->

        <div class="flow-step progress-flow">

            <i class="bi bi-arrow-repeat"></i>

            <strong>
                In Progress
            </strong>

            <span id="dashboardProgressJobs">
                0 Jobs
            </span>

        </div>


        <div class="flow-arrow">

            <i class="bi bi-arrow-right"></i>

        </div>


        <!-- COMPLETED -->

        <div class="flow-step completed-flow">

            <i class="bi bi-check-circle"></i>

            <strong>
                Completed
            </strong>

            <span id="dashboardCompletedJobs">
                0 Jobs
            </span>

        </div>

    </div>

</section>


    <!-- =====================================================
     INVOICE MANAGEMENT
====================================================== -->

<section
    class="management-section"
    id="invoiceManagement">

    <!-- HEADER -->

    <div class="management-header">

        <div>

            <span class="section-label">
                BILLING & INVOICING
            </span>

            <h2>
                Invoice Management
            </h2>

            <p>
                Create, view and manage customer invoices.
            </p>

        </div>

        <div>

            <button
                class="primary-btn"
                type="button"
                onclick="openCreateInvoice()">

                <i class="bi bi-plus-circle"></i>

                Create Invoice

            </button>

        </div>

    </div>


    <!-- INVOICE CONTENT -->

    <div class="content-card">

        <!-- CARD HEADER -->

        <div class="card-header-custom">

            <div>

                <div class="card-title-icon green-bg">

                    <i class="bi bi-receipt-cutoff"></i>

                </div>

                <div>

                    <h3>
                        All Invoices
                    </h3>

                    <p>
                        Generated invoice records
                    </p>

                </div>

            </div>


            <!-- SEARCH -->

            <div>

                <input
                    type="text"
                    id="invoiceSearch"
                    class="table-search"
                    placeholder="Search Invoice...">

            </div>

        </div>


        <!-- TABLE -->

        <div class="table-responsive">

            <table class="dashboard-table">

                <thead>

                    <tr>

                        <th>
                            Invoice ID
                        </th>

                        <th>
                            Job ID
                        </th>

                        <th>
                            Amount
                        </th>

                        <th>
                            Actions
                        </th>

                    </tr>

                </thead>


                <tbody id="invoiceTableBody">

                    <tr>

                        <td colspan="4"
                            class="text-center">

                            Loading invoices...

                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    </div>

</section>

<!-- =====================================================
     CREATE INVOICE MODAL
====================================================== -->

<div
    class="modal fade"
    id="createInvoiceModal"
    tabindex="-1"
    aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <!-- HEADER -->

            <div class="modal-header">

                <h5 class="modal-title">

                    <i class="bi bi-receipt-cutoff"></i>

                    Create Invoice

                </h5>

                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal">
                </button>

            </div>


            <!-- BODY -->

            <div class="modal-body">

                <!-- JOB ID -->

                <div class="mb-3">

                    <label
                        for="invoiceJobId"
                        class="form-label">

                        Job ID

                    </label>

                    <input
                        type="number"
                        id="invoiceJobId"
                        class="form-control"
                        placeholder="Enter Job ID">

                </div>


                <!-- MATERIAL COST -->

                <div class="mb-3">

                    <label
                        for="invoiceMaterialCost"
                        class="form-label">

                        Material Cost

                    </label>

                    <input
                        type="number"
                        id="invoiceMaterialCost"
                        class="form-control"
                        placeholder="Enter material cost"
                        min="0"
                        step="0.01">

                </div>


                <!-- MACHINE COST -->

                <div class="mb-3">

                    <label
                        for="invoiceMachineCost"
                        class="form-label">

                        Machine Cost

                    </label>

                    <input
                        type="number"
                        id="invoiceMachineCost"
                        class="form-control"
                        placeholder="Enter machine cost"
                        min="0"
                        step="0.01">

                </div>


                <!-- LABOUR COST -->

                <div class="mb-3">

                    <label
                        for="invoiceLabourCost"
                        class="form-label">

                        Labour Cost

                    </label>

                    <input
                        type="number"
                        id="invoiceLabourCost"
                        class="form-control"
                        placeholder="Enter labour cost"
                        min="0"
                        step="0.01">

                </div>


                <!-- CALCULATE BUTTON -->

                <div class="mb-3">

                    <button
                        type="button"
                        class="outline-btn"
                        onclick="calculateInvoiceAmount()">

                        <i class="bi bi-calculator"></i>

                        Calculate Total

                    </button>

                </div>


                <!-- TOTAL -->

                <div class="mb-3">

                    <label
                        for="invoiceAmount"
                        class="form-label">

                        Total Amount

                    </label>

                    <input
                        type="number"
                        id="invoiceAmount"
                        class="form-control"
                        readonly>

                </div>

            </div>


            <!-- FOOTER -->

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
                    onclick="generateInvoice()">

                    <i class="bi bi-check-circle"></i>

                    Generate Invoice

                </button>

            </div>

        </div>

    </div>

</div>


  <!-- =====================================================
     PAYMENT MANAGEMENT
====================================================== -->

<section
    class="management-section"
    id="payments">

    <!-- =================================================
         SECTION HEADER
    ================================================== -->

    <div class="management-header">

        <div>

            <span class="section-label">
                FINANCE
            </span>

            <h2>
                Payment Management
            </h2>

            <p>
                Track customer payments, received amounts
                and outstanding balances.
            </p>

        </div>

    </div>


    <!-- =================================================
         PAYMENT SUMMARY CARDS
    ================================================== -->

    <div class="finance-cards">

        <!-- TOTAL RECEIVED -->

        <div class="finance-card green-finance">

            <i class="bi bi-cash-stack"></i>

            <span>
                Total Received
            </span>

            <strong id="totalReceivedAmount">
                ₹0.00
            </strong>

            <small>
                Payments received
            </small>

        </div>


        <!-- PENDING -->

        <div class="finance-card yellow-finance">

            <i class="bi bi-clock-history"></i>

            <span>
                Pending Amount
            </span>

            <strong id="pendingPaymentAmount">
                ₹0.00
            </strong>

            <small>
                Outstanding balance
            </small>

        </div>


        <!-- TOTAL REVENUE -->

        <div class="finance-card purple-finance">

            <i class="bi bi-wallet2"></i>

            <span>
                Total Revenue
            </span>

            <strong id="totalRevenueAmount">
                ₹0.00
            </strong>

            <small>
                Invoice value
            </small>

        </div>

    </div>


    <!-- =================================================
         PAYMENT HISTORY HEADER
    ================================================== -->

    <div
        class="management-header"
        style="margin-top:25px;">

        <div>

            <span class="section-label">
                TRANSACTIONS
            </span>

            <h3>
                Payment History
            </h3>

            <p>
                View and manage all customer payment transactions.
            </p>

        </div>


        <button
            class="outline-btn"
            onclick="openReceivePayment()">

            <i class="bi bi-plus-circle"></i>

            Receive Payment

        </button>

    </div>


    <!-- =================================================
         PAYMENT TABLE
    ================================================== -->

    <div class="content-card">

        <div class="table-responsive">

            <table class="dashboard-table">

                <thead>

                    <tr>

                        <th>
                            Payment ID
                        </th>

                        <th>
                            Invoice ID
                        </th>

                        <th>
                            Amount
                        </th>

                        <th>
                            Payment Status
                        </th>

                        <th>
                            Action
                        </th>

                    </tr>

                </thead>


                <tbody id="paymentTableBody">

                    <tr>

                        <td
                            colspan="5"
                            style="text-align:center;">

                            <i class="bi bi-hourglass-split"></i>

                            Loading payments...

                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    </div>

</section>


<!-- =====================================================
     RECEIVE PAYMENT MODAL
====================================================== -->

<div
    class="modal-overlay"
    id="receivePaymentModal">

    <div class="modal-container">


        <!-- =================================================
             MODAL HEADER
        ================================================== -->

        <div class="modal-header">

            <div>

                <span class="section-label">
                    TRANSACTION
                </span>

                <h3>
                    Receive Payment
                </h3>

            </div>


            <button
                type="button"
                onclick="closeReceivePayment()"
                aria-label="Close">

                <i class="bi bi-x-lg"></i>

            </button>

        </div>


        <!-- =================================================
             MODAL BODY
        ================================================== -->

        <div class="modal-body">


            <!-- INVOICE ID -->

            <div class="form-group">

                <label>
                    <i class="bi bi-receipt"></i>
                    Invoice ID
                </label>

                <input
                    type="number"
                    id="paymentInvoiceId"
                    placeholder="Enter Invoice ID"
                    min="1"
                    oninput="checkPaymentDue()">

                <small>
                    Enter the invoice against which payment is received.
                </small>

            </div>


            <!-- DUE AMOUNT -->

            <div
                id="paymentDueMessage"
                style="
                    margin-top:10px;
                    margin-bottom:10px;
                ">

            </div>


            <!-- PAYMENT AMOUNT -->

            <div class="form-group">

                <label>
                    <i class="bi bi-currency-rupee"></i>
                    Payment Amount
                </label>

                <input
                    type="number"
                    id="paymentAmount"
                    placeholder="Enter payment amount"
                    step="0.01"
                    min="0.01">

                <small>
                    Enter the amount received from the customer.
                </small>

            </div>


            <!-- PAYMENT INFORMATION -->

            <div
                style="
                    margin-top:15px;
                    padding:12px;
                    border-radius:8px;
                    background:#f8f7fc;
                ">

                <div
                    style="
                        display:flex;
                        align-items:center;
                        gap:8px;
                    ">

                    <i class="bi bi-info-circle"></i>

                    <strong>
                        Payment Information
                    </strong>

                </div>

                <small>
                    The payment will be linked to the selected
                    invoice and recorded in payment history.
                </small>

            </div>

        </div>


        <!-- =================================================
             MODAL FOOTER
        ================================================== -->

        <div class="modal-footer">

            <button
                type="button"
                class="outline-btn"
                onclick="closeReceivePayment()">

                <i class="bi bi-x-circle"></i>

                Cancel

            </button>


            <button
                type="button"
                class="primary-btn"
                onclick="receivePayment()">

                <i class="bi bi-check-circle"></i>

                Receive Payment

            </button>

        </div>

    </div>

</div>


    <!-- =====================================================
     USER MANAGEMENT
====================================================== -->

<section
    class="management-section"
    id="users">

    <div class="management-header">

        <div>

            <span class="section-label">
                ADMINISTRATION
            </span>

            <h2>
                User Management
            </h2>

            <p>
                Manage system accounts and user roles.
            </p>

        </div>

    </div>


    <!-- =================================================
         ROLE CARDS
    ================================================== -->

    <div class="role-cards">


        <!-- ADMIN -->

        <div class="role-card">

            <div class="role-icon purple-bg">

                <i class="bi bi-shield-lock-fill"></i>

            </div>

            <div>

                <strong>
                    Admin
                </strong>

                <span>
                    System administrators
                </span>

            </div>

            <b id="adminUserCount">
                0
            </b>

        </div>


        <!-- WORKERS -->

        <div class="role-card">

            <div class="role-icon blue-bg">

                <i class="bi bi-person-workspace"></i>

            </div>

            <div>

                <strong>
                    Workers
                </strong>

                <span>
                    Production workers
                </span>

            </div>

            <b id="workerUserCount">
                0
            </b>

        </div>


        <!-- CUSTOMERS -->

        <div class="role-card">

            <div class="role-icon green-bg">

                <i class="bi bi-people-fill"></i>

            </div>

            <div>

                <strong>
                    Customers
                </strong>

                <span>
                    Registered customers
                </span>

            </div>

            <b id="customerUserCount">
                0
            </b>

        </div>


    </div>

</section>


<!-- =====================================================
     USER MANAGEMENT
====================================================== -->

<section class="management-section" id="users">

    <!-- USER MANAGEMENT HEADER -->
    <div class="management-header">

        <div>

            <span class="section-label">
                ADMINISTRATION
            </span>

            <h2>User Management</h2>

            <p>
                Manage system accounts and user roles.
            </p>

        </div>

    </div>


    <!-- =================================================
         ROLE CARDS
    ================================================== -->

    <div class="role-cards">

        <!-- ADMIN -->
        <div class="role-card">

            <div class="role-icon purple-bg">
                <i class="bi bi-shield-lock-fill"></i>
            </div>

            <div>
                <strong>Admin</strong>

                <span>
                    System administrators
                </span>
            </div>

            <b id="adminUserCount">
                0
            </b>

        </div>


        <!-- WORKERS -->
        <div class="role-card">

            <div class="role-icon blue-bg">
                <i class="bi bi-person-workspace"></i>
            </div>

            <div>
                <strong>Workers</strong>

                <span>
                    Production workers
                </span>
            </div>

            <b id="workerUserCount">
                0
            </b>

        </div>


        <!-- CUSTOMERS -->
        <div class="role-card">

            <div class="role-icon green-bg">
                <i class="bi bi-people-fill"></i>
            </div>

            <div>
                <strong>Customers</strong>

                <span>
                    Registered customers
                </span>
            </div>

            <b id="customerUserCount">
                0
            </b>

        </div>

    </div>


    <!-- =================================================
         USER MANAGEMENT TABLE
    ================================================== -->

    <div class="user-management-panel">

        <div class="user-table-header">

            <div>

                <h3>System Users</h3>

                <p>
                    View and manage registered system accounts.
                </p>

            </div>


            <div class="user-table-controls">

                <div class="user-search-box">

                    <i class="bi bi-search"></i>

                    <input
                        type="text"
                        id="userTableSearch"
                        placeholder="Search users..."
                    >

                </div>


                <select id="userRoleFilter">

                    <option value="All">
                        All Roles
                    </option>

                    <option value="Admin">
                        Admin
                    </option>

                    <option value="Worker">
                        Worker
                    </option>

                    <option value="Customer">
                        Customer
                    </option>

                </select>


                <select id="userStatusFilter">

                    <option value="All">
                        All Status
                    </option>

                    <option value="Active">
                        Active
                    </option>

                    <option value="Inactive">
                        Inactive
                    </option>

                </select>

            </div>

        </div>


        <!-- =================================================
             USER TABLE
        ================================================== -->

        <div class="user-table-wrapper">

            <table class="user-management-table">

                <thead>

                    <tr>

                        <th>User ID</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>

                </thead>


                <tbody id="userManagementTableBody">

                    <tr>

                        <td
                            colspan="7"
                            class="user-loading"
                        >
                            Loading users...
                        </td>

                    </tr>

                </tbody>

            </table>

        </div>


        <!-- NO USERS MESSAGE -->

        <div
            id="noUsersMessage"
            class="no-users-message"
            style="display: none;"
        >

            <i class="bi bi-people"></i>

            <span>
                No users found.
            </span>

        </div>

    </div>

</section>


   <!-- =====================================================
     PRODUCTION INTELLIGENCE / REPORTS
====================================================== -->

<section class="management-section" id="reports">

    <!-- =================================================
         REPORT HEADER
    ================================================== -->

    <div class="report-intelligence-header">

        <div>

            <span class="report-eyebrow">
                ADMINISTRATION • INTELLIGENCE CENTER
            </span>

            <h2>
                Production Intelligence
            </h2>

            <p>
                Real-time overview of production, workforce,
                inventory and financial performance.
            </p>

        </div>

        <div class="report-live-status">

            <span class="report-live-dot"></span>

            <span>LIVE SYSTEM</span>

        </div>

    </div>


    <!-- =================================================
         SYSTEM HEALTH
    ================================================== -->

    <div class="report-health-panel">

        <div class="report-health-title">

            <div>

                <span class="report-mini-label">
                    SYSTEM PERFORMANCE
                </span>

                <h3>
                    Operational Pulse
                </h3>

            </div>

            <span id="reportSystemScore">
                0%
            </span>

        </div>


        <div class="report-health-grid">


            <!-- PRODUCTION -->

            <div class="report-health-item">

                <div class="report-health-icon purple">
                    <i class="bi bi-activity"></i>
                </div>

                <div class="report-health-content">

                    <span>
                        Production
                    </span>

                    <strong id="reportProductionScore">
                        0%
                    </strong>

                    <div class="report-progress">
                        <span
                            id="reportProductionBar">
                        </span>
                    </div>

                </div>

            </div>


            <!-- WORKFORCE -->

            <div class="report-health-item">

                <div class="report-health-icon blue">
                    <i class="bi bi-people-fill"></i>
                </div>

                <div class="report-health-content">

                    <span>
                        Workforce
                    </span>

                    <strong id="reportWorkerScore">
                        0%
                    </strong>

                    <div class="report-progress">
                        <span
                            id="reportWorkerBar">
                        </span>
                    </div>

                </div>

            </div>


            <!-- MACHINES -->

            <div class="report-health-item">

                <div class="report-health-icon orange">
                    <i class="bi bi-cpu-fill"></i>
                </div>

                <div class="report-health-content">

                    <span>
                        Machines
                    </span>

                    <strong id="reportMachineScore">
                        0%
                    </strong>

                    <div class="report-progress">
                        <span
                            id="reportMachineBar">
                        </span>

                    </div>

                </div>

            </div>


            <!-- INVENTORY -->

            <div class="report-health-item">

                <div class="report-health-icon green">
                    <i class="bi bi-box-seam-fill"></i>
                </div>

                <div class="report-health-content">

                    <span>
                        Inventory
                    </span>

                    <strong id="reportInventoryScore">
                        0%
                    </strong>

                    <div class="report-progress">
                        <span
                            id="reportInventoryBar">
                        </span>
                    </div>

                </div>

            </div>

        </div>

    </div>


    <!-- =================================================
         INTELLIGENCE CARDS
    ================================================== -->

    <div class="report-intelligence-grid">


        <!-- JOB INTELLIGENCE -->

        <div
            class="report-intelligence-card purple-card"
            data-report="jobs"
        >

            <div class="report-card-top">

                <div class="report-card-icon">
                    <i class="bi bi-kanban-fill"></i>
                </div>

                <span class="report-card-arrow">
                    <i class="bi bi-arrow-up-right"></i>
                </span>

            </div>

            <span class="report-card-label">
                PRODUCTION
            </span>

            <h3>
                Job Intelligence
            </h3>

            <div class="report-big-number"
                 id="reportTotalJobs">
                0
            </div>

            <p>
                Total production jobs
            </p>

            <div class="report-mini-stats">

                <span>
                    <b id="reportCompletedJobs">0</b>
                    Completed
                </span>

                <span>
                    <b id="reportPendingJobs">0</b>
                    Pending
                </span>

            </div>

        </div>


        <!-- WORKFORCE -->

        <div
            class="report-intelligence-card blue-card"
            data-report="workers"
        >

            <div class="report-card-top">

                <div class="report-card-icon">
                    <i class="bi bi-person-workspace"></i>
                </div>

                <span class="report-card-arrow">
                    <i class="bi bi-arrow-up-right"></i>
                </span>

            </div>

            <span class="report-card-label">
                WORKFORCE
            </span>

            <h3>
                Workforce Intelligence
            </h3>

            <div class="report-big-number"
                 id="reportTotalWorkers">
                0
            </div>

            <p>
                Registered workers
            </p>

            <div class="report-mini-stats">

                <span>
                    <b id="reportActiveWorkers">0</b>
                    Active
                </span>

                <span>
                    <b id="reportWorkerJobs">0</b>
                    Assigned Jobs
                </span>

            </div>

        </div>


        <!-- CUSTOMER -->

        <div
            class="report-intelligence-card green-card"
            data-report="customers"
        >

            <div class="report-card-top">

                <div class="report-card-icon">
                    <i class="bi bi-buildings-fill"></i>
                </div>

                <span class="report-card-arrow">
                    <i class="bi bi-arrow-up-right"></i>
                </span>

            </div>

            <span class="report-card-label">
                CUSTOMERS
            </span>

            <h3>
                Customer Intelligence
            </h3>

            <div class="report-big-number"
                 id="reportTotalCustomers">
                0
            </div>

            <p>
                Registered customers
            </p>

            <div class="report-mini-stats">

                <span>
                    <b id="reportCustomerJobs">0</b>
                    Total Jobs
                </span>

                <span>
                    <b id="reportCustomerCompleted">0</b>
                    Completed
                </span>

            </div>

        </div>


        <!-- MACHINE -->

        <div
            class="report-intelligence-card orange-card"
            data-report="machines"
        >

            <div class="report-card-top">

                <div class="report-card-icon">
                    <i class="bi bi-gear-wide-connected"></i>
                </div>

                <span class="report-card-arrow">
                    <i class="bi bi-arrow-up-right"></i>
                </span>

            </div>

            <span class="report-card-label">
                MACHINERY
            </span>

            <h3>
                Machine Intelligence
            </h3>

            <div class="report-big-number"
                 id="reportTotalMachines">
                0
            </div>

            <p>
                Registered machines
            </p>

            <div class="report-mini-stats">

                <span>
                    <b id="reportAvailableMachines">0</b>
                    Available
                </span>

                <span>
                    <b id="reportUsedMachines">0</b>
                    In Use
                </span>

            </div>

        </div>


        <!-- MATERIAL -->

        <div
            class="report-intelligence-card teal-card"
            data-report="materials"
        >

            <div class="report-card-top">

                <div class="report-card-icon">
                    <i class="bi bi-boxes"></i>
                </div>

                <span class="report-card-arrow">
                    <i class="bi bi-arrow-up-right"></i>
                </span>

            </div>

            <span class="report-card-label">
                INVENTORY
            </span>

            <h3>
                Material Intelligence
            </h3>

            <div class="report-big-number"
                 id="reportTotalMaterials">
                0
            </div>

            <p>
                Materials in inventory
            </p>

            <div class="report-mini-stats">

                <span>
                    <b id="reportLowStock">0</b>
                    Low Stock
                </span>

                <span>
                    <b id="reportHealthyStock">0</b>
                    Healthy
                </span>

            </div>

        </div>


        <!-- FINANCE -->

        <div
            class="report-intelligence-card gold-card"
            data-report="finance"
        >

            <div class="report-card-top">

                <div class="report-card-icon">
                    <i class="bi bi-currency-rupee"></i>
                </div>

                <span class="report-card-arrow">
                    <i class="bi bi-arrow-up-right"></i>
                </span>

            </div>

            <span class="report-card-label">
                FINANCE
            </span>

            <h3>
                Financial Intelligence
            </h3>

            <div class="report-big-number"
                 id="reportRevenue">
                ₹0
            </div>

            <p>
                Total collected payments
            </p>

            <div class="report-mini-stats">

                <span>
                    <b id="reportInvoiceCount">0</b>
                    Invoices
                </span>

                <span>
                    <b id="reportPendingAmount">₹0</b>
                    Outstanding
                </span>

            </div>

        </div>

    </div>


    <!-- =================================================
         PRODUCTION JOURNEY
    ================================================== -->

    <div class="production-journey-panel">

        <div class="report-section-heading">

            <div>

                <span>
                    WORKFLOW ANALYTICS
                </span>

                <h3>
                    Production Journey
                </h3>

            </div>

            <span id="reportCompletionRate">
                0% Complete
            </span>

        </div>


        <div class="production-flow">

            <div class="flow-step">

                <div class="flow-circle">
                    <i class="bi bi-file-earmark-plus"></i>
                </div>

                <strong>
                    Orders
                </strong>

                <span id="flowTotal">
                    0
                </span>

            </div>


            <div class="flow-line">
                <span></span>
            </div>


            <div class="flow-step">

                <div class="flow-circle">
                    <i class="bi bi-person-check"></i>
                </div>

                <strong>
                    Assigned
                </strong>

                <span id="flowAssigned">
                    0
                </span>

            </div>


            <div class="flow-line">
                <span></span>
            </div>


            <div class="flow-step">

                <div class="flow-circle">
                    <i class="bi bi-gear-fill"></i>
                </div>

                <strong>
                    Production
                </strong>

                <span id="flowProgress">
                    0
                </span>

            </div>


            <div class="flow-line">
                <span></span>
            </div>


            <div class="flow-step completed-flow">

                <div class="flow-circle">
                    <i class="bi bi-check-lg"></i>
                </div>

                <strong>
                    Completed
                </strong>

                <span id="flowCompleted">
                    0
                </span>

            </div>

        </div>

    </div>


    <!-- =================================================
         EXECUTIVE INSIGHT
    ================================================== -->

    <div class="executive-insight-panel">

        <div class="insight-icon">

            <i class="bi bi-stars"></i>

        </div>

        <div class="insight-content">

            <span>
                EXECUTIVE INSIGHT
            </span>

            <h3 id="executiveInsightTitle">
                Analyzing your production system...
            </h3>

            <p id="executiveInsightText">
                Collecting live information from jobs,
                workers, machines and inventory.
            </p>

        </div>

        <div class="insight-status"
             id="executiveInsightStatus">

            ANALYZING

        </div>

    </div>


    <!-- =================================================
         REPORT DETAIL AREA
    ================================================== -->

    <div
        class="report-detail-panel"
        id="reportDetailPanel"
    >

        <div class="report-detail-header">

            <div>

                <span>
                    DETAILED ANALYSIS
                </span>

                <h3 id="reportDetailTitle">
                    Select an intelligence card
                </h3>

            </div>

            <button
                type="button"
                id="closeReportDetail"
            >
                <i class="bi bi-x-lg"></i>
            </button>

        </div>


        <div
            class="report-detail-content"
            id="reportDetailContent"
        >

            <div class="report-detail-empty">

                <i class="bi bi-cursor"></i>

                <h4>
                    Explore your system
                </h4>

                <p>
                    Click any intelligence card above
                    to see detailed analytics.
                </p>

            </div>

        </div>

    </div>


    <!-- =================================================
         REPORT REFRESH
    ================================================== -->

    <div class="report-footer-bar">

        <div>

            <i class="bi bi-database-check"></i>

            <span>
                Data synchronized with production database
            </span>

        </div>

        <button
            type="button"
            id="refreshReportsBtn"
        >

            <i class="bi bi-arrow-clockwise"></i>

            Refresh Intelligence

        </button>

    </div>

</section>


<!-- =====================================================
     SETTINGS
====================================================== -->

<section class="management-section" id="settings">

    <!-- SETTINGS HEADER -->
    <div class="management-header">

        <div>

            <span class="section-label">
                SYSTEM
            </span>

            <h2>
                System Settings
            </h2>

            <p>
                Manage administrator account, security and system preferences.
            </p>

        </div>

    </div>


    <!-- =================================================
         SETTINGS GRID
    ================================================== -->

    <div class="settings-grid">


        <!-- =============================================
             ADMIN PROFILE
        ============================================== -->

        <div class="settings-card settings-profile-card">

            <div class="settings-card-header">

                <div class="settings-icon pastel-purple">
                    <i class="bi bi-person-circle"></i>
                </div>

                <div>
                    <h3>Admin Profile</h3>

                    <p>
                        Manage administrator information
                    </p>
                </div>

            </div>


            <div class="profile-preview">

                <div class="profile-avatar" id="settingsProfileAvatar">

                    <i class="bi bi-person"></i>

                </div>

                <div>

                    <strong id="settingsProfileName">
                        Administrator
                    </strong>

                    <span id="settingsProfileUsername">
                        Username
                    </span>

                </div>

            </div>


            <button
                type="button"
                class="settings-action-btn pastel-purple-btn"
                onclick="openAdminProfileModal()"
            >
                <i class="bi bi-pencil-square"></i>
                Manage Profile
            </button>

        </div>



        <!-- =============================================
             SECURITY
        ============================================== -->

        <div class="settings-card">

            <div class="settings-card-header">

                <div class="settings-icon pastel-blue">
                    <i class="bi bi-shield-lock"></i>
                </div>

                <div>
                    <h3>Account Security</h3>

                    <p>
                        Protect your administrator account
                    </p>
                </div>

            </div>


            <div class="security-status">

                <div class="security-check">

                    <i class="bi bi-check-circle-fill"></i>

                    <span>
                        Account security active
                    </span>

                </div>

                <small>
                    Change your password regularly for better security.
                </small>

            </div>


            <button
                type="button"
                class="settings-action-btn pastel-blue-btn"
                onclick="openChangePasswordModal()"
            >
                <i class="bi bi-key"></i>
                Change Password
            </button>

        </div>



        <!-- =============================================
             NOTIFICATIONS
        ============================================== -->

        <div class="settings-card">

            <div class="settings-card-header">

                <div class="settings-icon pastel-yellow">
                    <i class="bi bi-bell"></i>
                </div>

                <div>
                    <h3>Notifications</h3>

                    <p>
                        Manage dashboard notifications
                    </p>
                </div>

            </div>


            <div class="notification-options">

                <div class="notification-row">

                    <div>

                        <strong>
                            Low Stock Alert
                        </strong>

                        <small>
                            Notify when material stock is low
                        </small>

                    </div>

                    <label class="settings-switch">

                        <input
                            type="checkbox"
                            id="lowStockNotification"
                            checked
                        >

                        <span></span>

                    </label>

                </div>


                <div class="notification-row">

                    <div>

                        <strong>
                            New Job Alert
                        </strong>

                        <small>
                            Notify when a new job is created
                        </small>

                    </div>

                    <label class="settings-switch">

                        <input
                            type="checkbox"
                            id="newJobNotification"
                            checked
                        >

                        <span></span>

                    </label>

                </div>


                <div class="notification-row">

                    <div>

                        <strong>
                            Payment Alert
                        </strong>

                        <small>
                            Notify about payment activity
                        </small>

                    </div>

                    <label class="settings-switch">

                        <input
                            type="checkbox"
                            id="paymentNotification"
                            checked
                        >

                        <span></span>

                    </label>

                </div>

            </div>

        </div>



        <!-- =============================================
             SYSTEM PREFERENCES
        ============================================== -->

        <div class="settings-card">

            <div class="settings-card-header">

                <div class="settings-icon pastel-green">
                    <i class="bi bi-building"></i>
                </div>

                <div>
                    <h3>System Preferences</h3>

                    <p>
                        Configure basic company information
                    </p>
                </div>

            </div>


            <div class="system-info">

                <div class="system-info-item">

                    <span>
                        Company Name
                    </span>

                    <strong>
                        YantraX
                    </strong>

                </div>


                <div class="system-info-item">

                    <span>
                        System
                    </span>

                    <strong>
                        Production Management
                    </strong>

                </div>


                <div class="system-info-item">

                    <span>
                        Environment
                    </span>

                    <strong>
                        Development
                    </strong>

                </div>

            </div>


            <button
                type="button"
                class="settings-action-btn pastel-green-btn"
                onclick="showSystemPreferences()"
            >
                <i class="bi bi-gear"></i>
                Configure
            </button>

        </div>



        <!-- =============================================
             JOB SETTINGS
        ============================================== -->

        <div class="settings-card">

            <div class="settings-card-header">

                <div class="settings-icon pastel-orange">
                    <i class="bi bi-clipboard-check"></i>
                </div>

                <div>
                    <h3>Job Settings</h3>

                    <p>
                        Configure job workflow preferences
                    </p>
                </div>

            </div>


            <div class="setting-info-box">

                <div>
                    <span>Default Job Status</span>
                    <strong>Pending</strong>
                </div>

                <div>
                    <span>Workflow</span>
                    <strong>Pending → In Progress → Completed</strong>
                </div>

            </div>


            <button
                type="button"
                class="settings-action-btn pastel-orange-btn"
                onclick="showJobSettings()"
            >
                <i class="bi bi-sliders"></i>
                Configure
            </button>

        </div>



        <!-- =============================================
             INVENTORY SETTINGS
        ============================================== -->

        <div class="settings-card">

            <div class="settings-card-header">

                <div class="settings-icon pastel-pink">
                    <i class="bi bi-box-seam"></i>
                </div>

                <div>
                    <h3>Inventory Settings</h3>

                    <p>
                        Configure material stock alerts
                    </p>
                </div>

            </div>


            <div class="stock-setting">

                <label for="lowStockThreshold">
                    Low Stock Threshold
                </label>

                <div class="threshold-input">

                    <input
                        type="number"
                        id="lowStockThreshold"
                        value="10"
                        min="0"
                    >

                    <span>
                        units
                    </span>

                </div>

            </div>


            <button
                type="button"
                class="settings-action-btn pastel-pink-btn"
                onclick="saveInventorySetting()"
            >
                <i class="bi bi-save"></i>
                Save Setting
            </button>

        </div>



        <!-- =============================================
             APPEARANCE
        ============================================== -->

        <div class="settings-card">

            <div class="settings-card-header">

                <div class="settings-icon pastel-indigo">
                    <i class="bi bi-palette"></i>
                </div>

                <div>
                    <h3>Appearance</h3>

                    <p>
                        Customize dashboard appearance
                    </p>
                </div>

            </div>


            <div class="appearance-option">

                <div>

                    <strong>
                        Dark Mode
                    </strong>

                    <small>
                        Use dark appearance for dashboard
                    </small>

                </div>


                <label class="settings-switch">

                    <input
                        type="checkbox"
                        id="dashboardDarkMode"
                        onchange="toggleDashboardTheme()"
                    >

                    <span></span>

                </label>

            </div>


            <div class="appearance-preview">

                <div class="preview-dot"></div>
                <div class="preview-dot"></div>
                <div class="preview-dot"></div>

                <span>
                    Dashboard Theme
                </span>

            </div>

        </div>



        <!-- =============================================
             BACKUP
        ============================================== -->

        <div class="settings-card">

            <div class="settings-card-header">

                <div class="settings-icon pastel-teal">
                    <i class="bi bi-database-check"></i>
                </div>

                <div>
                    <h3>Backup & Database</h3>

                    <p>
                        Database maintenance options
                    </p>
                </div>

            </div>


            <div class="backup-info">

                <i class="bi bi-info-circle"></i>

                <span>
                    Database backup functionality can be connected
                    when a backup API is implemented.
                </span>

            </div>


            <button
                type="button"
                class="settings-action-btn pastel-teal-btn"
                onclick="showBackupMessage()"
            >
                <i class="bi bi-database"></i>
                Database Status
            </button>

        </div>

    </div>

</section>



<!-- =====================================================
     ADMIN PROFILE MODAL
====================================================== -->

<div
    class="settings-modal"
    id="adminProfileModal"
>

    <div class="settings-modal-content">

        <div class="settings-modal-header">

            <div>

                <span class="section-label">
                    ADMINISTRATION
                </span>

                <h3>
                    Admin Profile
                </h3>

            </div>

            <button
                type="button"
                class="settings-modal-close"
                onclick="closeAdminProfileModal()"
            >
                <i class="bi bi-x-lg"></i>
            </button>

        </div>


        <div class="profile-modal-avatar">

            <i class="bi bi-person-circle"></i>

        </div>


        <div class="settings-form">

            <div class="form-group">

                <label>
                    Username
                </label>

                <input
                    type="text"
                    id="settingsUsername"
                    placeholder="Enter username"
                >

            </div>


            <div class="form-group">

                <label>
                    Email
                </label>

                <input
                    type="email"
                    id="settingsEmail"
                    placeholder="Enter email"
                >

            </div>


            <div class="form-group">

                <label>
                    Mobile Number
                </label>

                <input
                    type="text"
                    id="settingsMobileNo"
                    placeholder="Enter mobile number"
                >

            </div>

        </div>


        <div class="settings-modal-footer">

            <button
                type="button"
                class="modal-cancel-btn"
                onclick="closeAdminProfileModal()"
            >
                Cancel
            </button>

            <button
                type="button"
                class="modal-save-btn"
                onclick="saveAdminProfile()"
            >
                <i class="bi bi-check-lg"></i>
                Save Changes
            </button>

        </div>

    </div>

</div>



<!-- =====================================================
     CHANGE PASSWORD MODAL
====================================================== -->

<div
    class="settings-modal"
    id="changePasswordModal"
>

    <div class="settings-modal-content">

        <div class="settings-modal-header">

            <div>

                <span class="section-label">
                    SECURITY
                </span>

                <h3>
                    Change Password
                </h3>

            </div>

            <button
                type="button"
                class="settings-modal-close"
                onclick="closeChangePasswordModal()"
            >
                <i class="bi bi-x-lg"></i>
            </button>

        </div>


        <div class="password-security-icon">

            <i class="bi bi-shield-lock-fill"></i>

        </div>


        <div class="settings-form">

            <div class="form-group">

                <label>
                    Current Password
                </label>

                <input
                    type="password"
                    id="settingsOldPassword"
                    placeholder="Enter current password"
                >

            </div>


            <div class="form-group">

                <label>
                    New Password
                </label>

                <input
                    type="password"
                    id="settingsNewPassword"
                    placeholder="Enter new password"
                >

            </div>


            <div class="form-group">

                <label>
                    Confirm New Password
                </label>

                <input
                    type="password"
                    id="settingsConfirmPassword"
                    placeholder="Confirm new password"
                >

            </div>

        </div>


        <div class="settings-modal-footer">

            <button
                type="button"
                class="modal-cancel-btn"
                onclick="closeChangePasswordModal()"
            >
                Cancel
            </button>

            <button
                type="button"
                class="modal-save-btn"
                onclick="saveSettingsPassword()"
            >
                <i class="bi bi-key-fill"></i>
                Change Password
            </button>

        </div>

    </div>

</div>



<!-- =====================================================
     SETTINGS TOAST
====================================================== -->

<div
    id="settingsToast"
    class="settings-toast"
>

    <i class="bi bi-check-circle-fill"></i>

    <span id="settingsToastMessage">
        Settings updated successfully.
    </span>

</div>


    <!-- =====================================================
         FOOTER
    ====================================================== -->

    <footer class="dashboard-footer">

        <div>

            <strong>
                YantraX
            </strong>

            <span>
                Production Management System
            </span>

        </div>


        <span>
            © YantraX. All Rights Reserved.
        </span>

    </footer>


</main>


<!-- =========================================================
     ADD CUSTOMER MODAL
========================================================= -->

<div
    class="modal fade"
    id="addCustomerModal"
    tabindex="-1"
    aria-hidden="true">

    <div class="modal-dialog modal-lg">

        <div class="modal-content custom-modal">

            <!-- HEADER -->

            <div class="modal-header">

                <div>

                    <h5>
                        <i class="bi bi-person-plus-fill me-2"></i>
                        Add New Customer
                    </h5>

                    <small>
                        Register a new customer in the system
                    </small>

                </div>

                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal">
                </button>

            </div>


            <!-- BODY -->

            <div class="modal-body">

                <form
                    id="addCustomerForm"
                    enctype="multipart/form-data">

                    <div class="row g-3">

                        <!-- FULL NAME -->

                        <div class="col-md-6">

                            <label class="form-label">
                                Full Name
                            </label>

                            <input
                                type="text"
                                class="form-control"
                                id="customerFullName"
                                name="fullName"
                                placeholder="Enter full name"
                                required>

                        </div>


                        <!-- MOBILE -->

                        <div class="col-md-6">

                            <label class="form-label">
                                Mobile Number
                            </label>

                            <input
                                type="tel"
                                class="form-control"
                                id="customerMobileNo"
                                name="mobileNo"
                                placeholder="Enter mobile number"
                                required>

                        </div>


                        <!-- EMAIL -->

                        <div class="col-md-6">

                            <label class="form-label">
                                Email
                            </label>

                            <input
                                type="email"
                                class="form-control"
                                id="customerEmail"
                                name="email"
                                placeholder="Enter email address"
                                required>

                        </div>


                        <!-- USER ID -->

                        <div class="col-md-6">

                            <label class="form-label">
                                User ID
                            </label>

                            <input
                                type="number"
                                class="form-control"
                                id="customerUserId"
                                name="user_id"
                                placeholder="Enter user ID">

                        </div>


                        <!-- COMPANY -->

                        <div class="col-md-6">

                            <label class="form-label">
                                Company Name
                            </label>

                            <input
                                type="text"
                                class="form-control"
                                id="customerCompanyName"
                                name="companyName"
                                placeholder="Enter company name">

                        </div>


                        <!-- GST -->

                        <div class="col-md-6">

                            <label class="form-label">
                                GST Number
                            </label>

                            <input
                                type="text"
                                class="form-control"
                                id="customerGstNo"
                                name="gstNo"
                                placeholder="Enter GST number">

                        </div>


                        <!-- ADDRESS -->

                        <div class="col-md-12">

                            <label class="form-label">
                                Address
                            </label>

                            <textarea
                                class="form-control"
                                id="customerAddress"
                                name="address"
                                rows="2"
                                placeholder="Enter address"></textarea>

                        </div>


                        <!-- CITY -->

                        <div class="col-md-6">

                            <label class="form-label">
                                City
                            </label>

                            <input
                                type="text"
                                class="form-control"
                                id="customerCity"
                                name="city"
                                placeholder="Enter city">

                        </div>


                        <!-- STATE -->

                        <div class="col-md-6">

                            <label class="form-label">
                                State
                            </label>

                            <input
                                type="text"
                                class="form-control"
                                id="customerState"
                                name="state"
                                placeholder="Enter state">

                        </div>


                        <!-- PROFILE PHOTO -->

                        <div class="col-md-12">

                            <label class="form-label">
                                Profile Photo
                            </label>

                            <input
                                type="file"
                                class="form-control"
                                id="customerProfilePhoto"
                                name="profilePhoto"
                                accept="image/*">

                            <small class="text-muted">
                                Select customer profile image
                            </small>

                        </div>

                    </div>

                </form>

            </div>



            <!-- FOOTER -->

            <div class="modal-footer">

                <button
                    type="button"
                    class="secondary-btn"
                    data-bs-dismiss="modal">

                    Cancel

                </button>


                <button
                    type="button"
                    class="primary-btn"
                    id="saveCustomerBtn"
                    onclick="saveCustomer()">

                    <i class="bi bi-check-lg"></i>

                    Save Customer

                </button>

            </div>

        </div>

    </div>

</div>


<!-- =========================================================
     CREATE JOB MODAL
========================================================= -->

<div
    class="modal fade"
    id="createJobModal"
    tabindex="-1">

    <div class="modal-dialog modal-lg">

        <div class="modal-content custom-modal">


            <div class="modal-header">

                <div>

                    <h5>
                        <i class="bi bi-clipboard-plus me-2"></i>
                        Create New Job Order
                    </h5>

                    <small>
                        Create and assign a production job
                    </small>

                </div>

                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal">
                </button>

            </div>


            <div class="modal-body">


                <div class="row g-3">


                    <div class="col-md-6">

                        <label>
                            Customer
                        </label>

                        <select
                            class="form-select">

                            <option>
                                Select Customer
                            </option>

                            <option>
                                ABC Industries
                            </option>

                            <option>
                                XYZ Pvt Ltd
                            </option>

                        </select>

                    </div>


                    <div class="col-md-6">

                        <label>
                            Job Priority
                        </label>

                        <select
                            class="form-select">

                            <option>
                                Normal
                            </option>

                            <option>
                                High
                            </option>

                            <option>
                                Urgent
                            </option>

                        </select>

                    </div>


                    <div class="col-md-12">

                        <label>
                            Job Description
                        </label>

                        <textarea
                            class="form-control"
                            rows="3"
                            placeholder="Enter job description">
                        </textarea>

                    </div>


                    <div class="col-md-6">

                        <label>
                            Assign Worker
                        </label>

                        <select
                            class="form-select">

                            <option>
                                Select Worker
                            </option>

                            <option>
                                Rahul
                            </option>

                            <option>
                                Amit
                            </option>

                            <option>
                                Sneha
                            </option>

                        </select>

                    </div>


                    <div class="col-md-6">

                        <label>
                            Assign Machine
                        </label>

                        <select
                            class="form-select">

                            <option>
                                Select Machine
                            </option>

                            <option>
                                CNC Machine 01
                            </option>

                            <option>
                                Milling Machine 02
                            </option>

                        </select>

                    </div>


                    <div class="col-md-6">

                        <label>
                            Start Date
                        </label>

                        <input
                            type="date"
                            class="form-control">

                    </div>


                    <div class="col-md-6">
                      <label>Due Date</label>
                        <input type="date" class="form-control">
                    </div>
                </div>
            </div>


            <div class="modal-footer">
                 <button type="button" class="secondary-btn" data-bs-dismiss="modal">Cancel</button>

                <button type="button" class="primary-btn" id="saveJobBtn"><i class="bi bi-check-lg"></i>Create Job</button>
            </div>
        </div>
    </div>
</div>


<!-- =========================================================
     ADD MATERIAL MODAL
========================================================= -->

<div
    class="modal fade"
    id="addMaterialModal"
    tabindex="-1"
    aria-hidden="true">

    <div class="modal-dialog modal-lg">

        <div class="modal-content custom-modal">


            <!-- HEADER -->

            <div class="modal-header">

                <div>

                    <h5>

                        <i class="bi bi-box-seam me-2"></i>

                        Add New Material

                    </h5>

                    <small>

                        Register material for production inventory

                    </small>

                </div>


                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal">
                </button>

            </div>


            <!-- BODY -->

            <div class="modal-body">

                <form id="addMaterialForm">

                    <div class="row g-3">


                        <!-- MATERIAL NAME -->

                        <div class="col-md-6">

                            <label class="form-label">
                                Material Name
                            </label>

                            <input
                                type="text"
                                class="form-control"
                                id="materialName"
                                placeholder="Example: Aluminium Sheet"
                                required>

                        </div>


                        <!-- MATERIAL TYPE -->

                        <div class="col-md-6">

                            <label class="form-label">
                                Material Type
                            </label>

                            <input
                                type="text"
                                class="form-control"
                                id="materialType"
                                placeholder="Example: Raw Material"
                                required>

                        </div>


                        <!-- QUANTITY -->

                        <div class="col-md-6">

                            <label class="form-label">
                                Quantity
                            </label>

                            <input
                                type="number"
                                class="form-control"
                                id="materialQuantity"
                                placeholder="Enter quantity"
                                min="0"
                                required>

                        </div>


                        <!-- UNIT -->

                        <div class="col-md-6">

                            <label class="form-label">
                                Unit
                            </label>

                            <input
                                type="text"
                                class="form-control"
                                id="materialUnit"
                                placeholder="Example: kg, Piece, Liter"
                                required>

                        </div>


                        <!-- UNIT PRICE -->

                        <div class="col-md-6">

                            <label class="form-label">
                                Unit Price
                            </label>

                            <input
                                type="number"
                                class="form-control"
                                id="materialUnitPrice"
                                placeholder="Enter unit price"
                                min="0"
                                step="0.01"
                                required>

                        </div>


                        <!-- SUPPLIER -->

                        <div class="col-md-6">

                            <label class="form-label">
                                Supplier Name
                            </label>

                            <input
                                type="text"
                                class="form-control"
                                id="materialSupplierName"
                                placeholder="Enter supplier name"
                                required>

                        </div>


                        <!-- MINIMUM STOCK -->

                        <div class="col-md-6">

                            <label class="form-label">
                                Minimum Stock
                            </label>

                            <input
                                type="number"
                                class="form-control"
                                id="materialMinimumStock"
                                placeholder="Enter minimum stock"
                                min="0"
                                required>

                        </div>

                    </div>

                </form>

            </div>


            <!-- FOOTER -->

            <div class="modal-footer">

                <button
                    type="button"
                    class="secondary-btn"
                    data-bs-dismiss="modal">

                    Cancel

                </button>


                <button
                    type="button"
                    class="primary-btn"
                    id="saveMaterialBtn"
                    onclick="saveMaterial()">

                    <i class="bi bi-check-lg"></i>

                    Save Material

                </button>

            </div>

        </div>

    </div>

</div>

<!-- =========================================================
     EDIT MATERIAL MODAL
========================================================= -->

<div
    class="modal fade"
    id="editMaterialModal"
    tabindex="-1"
    aria-hidden="true">

    <div class="modal-dialog modal-lg">

        <div class="modal-content custom-modal">


            <div class="modal-header">

                <div>

                    <h5>

                        <i class="bi bi-pencil-square me-2"></i>

                        Update Material

                    </h5>

                    <small>
                        Update material inventory details
                    </small>

                </div>


                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal">
                </button>

            </div>


            <div class="modal-body">

                <form id="editMaterialForm">

                    <input
                        type="hidden"
                        id="editMaterialId">


                    <div class="row g-3">


                        <div class="col-md-6">

                            <label class="form-label">
                                Material Name
                            </label>

                            <input
                                type="text"
                                class="form-control"
                                id="editMaterialName"
                                required>

                        </div>


                        <div class="col-md-6">

                            <label class="form-label">
                                Material Type
                            </label>

                            <input
                                type="text"
                                class="form-control"
                                id="editMaterialType"
                                required>

                        </div>


                        <div class="col-md-6">

                            <label class="form-label">
                                Quantity
                            </label>

                            <input
                                type="number"
                                class="form-control"
                                id="editMaterialQuantity"
                                min="0"
                                required>

                        </div>


                        <div class="col-md-6">

                            <label class="form-label">
                                Unit
                            </label>

                            <input
                                type="text"
                                class="form-control"
                                id="editMaterialUnit"
                                required>

                        </div>


                        <div class="col-md-6">

                            <label class="form-label">
                                Unit Price
                            </label>

                            <input
                                type="number"
                                class="form-control"
                                id="editMaterialUnitPrice"
                                min="0"
                                step="0.01"
                                required>

                        </div>


                        <div class="col-md-6">

                            <label class="form-label">
                                Supplier Name
                            </label>

                            <input
                                type="text"
                                class="form-control"
                                id="editMaterialSupplierName"
                                required>

                        </div>


                        <div class="col-md-6">

                            <label class="form-label">
                                Minimum Stock
                            </label>

                            <input
                                type="number"
                                class="form-control"
                                id="editMaterialMinimumStock"
                                min="0"
                                required>

                        </div>


                    </div>

                </form>

            </div>


            <div class="modal-footer">

                <button
                    type="button"
                    class="secondary-btn"
                    data-bs-dismiss="modal">

                    Cancel

                </button>


                <button
                    type="button"
                    class="primary-btn"
                    onclick="updateMaterial()">

                    <i class="bi bi-check-lg"></i>

                    Update Material

                </button>

            </div>

        </div>

    </div>

</div>

<!-- =========================================================
     CONSUME MATERIAL MODAL
========================================================= -->

<div
    class="modal fade"
    id="consumeMaterialModal"
    tabindex="-1"
    aria-hidden="true">

    <div class="modal-dialog">

        <div class="modal-content custom-modal">


            <div class="modal-header">

                <div>

                    <h5>

                        <i class="bi bi-box-arrow-down me-2"></i>

                        Consume Material

                    </h5>

                    <small>
                        Reduce material quantity from inventory
                    </small>

                </div>


                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal">
                </button>

            </div>


            <div class="modal-body">

                <input
                    type="hidden"
                    id="consumeMaterialId">


                <div class="mb-3">

                    <label class="form-label">
                        Material
                    </label>

                    <input
                        type="text"
                        class="form-control"
                        id="consumeMaterialName"
                        readonly>

                </div>


                <div class="mb-3">

                    <label class="form-label">
                        Available Quantity
                    </label>

                    <input
                        type="number"
                        class="form-control"
                        id="consumeAvailableQuantity"
                        readonly>

                </div>


                <div class="mb-3">

                    <label class="form-label">
                        Quantity to Consume
                    </label>

                    <input
                        type="number"
                        class="form-control"
                        id="consumeQuantity"
                        min="1"
                        required>

                </div>

            </div>


            <div class="modal-footer">

                <button
                    type="button"
                    class="secondary-btn"
                    data-bs-dismiss="modal">

                    Cancel

                </button>


                <button
                    type="button"
                    class="primary-btn"
                    onclick="consumeMaterial()">

                    <i class="bi bi-check-lg"></i>

                    Consume

                </button>

            </div>

        </div>

    </div>

</div>

<!-- =====================================================
     CONTACT SUPPORT MODAL
====================================================== -->

<div
    class="support-modal"
    id="supportModal"
    style="display: none;">

    <div class="support-modal-overlay"
         id="supportModalOverlay">
    </div>


    <div class="support-modal-content">

        <!-- HEADER -->

        <div class="support-modal-header">

            <div>

                <span class="section-label">
                    SYSTEM SUPPORT
                </span>

                <h2>

                    Contact Support

                </h2>

                <p>

                    Messages received from the Contact Us section.

                </p>

            </div>


            <button
                type="button"
                class="support-close-btn"
                id="supportCloseBtn">

                <i class="bi bi-x-lg"></i>

            </button>

        </div>


        <!-- SUMMARY -->

        <div class="support-summary">

            <div class="support-summary-card">

                <div class="support-summary-icon">
                    <i class="bi bi-envelope"></i>
                </div>

                <div>

                    <small>
                        Total Messages
                    </small>

                    <strong id="totalSupportMessages">
                        0
                    </strong>

                </div>

            </div>


            <div class="support-summary-card">

                <div class="support-summary-icon">
                    <i class="bi bi-clock-history"></i>
                </div>

                <div>

                    <small>
                        Latest Messages
                    </small>

                    <strong id="latestSupportMessages">
                        0
                    </strong>

                </div>

            </div>

        </div>


        <!-- SEARCH -->

        <div class="support-search">

            <i class="bi bi-search"></i>

            <input
                type="text"
                id="supportMessageSearch"
                placeholder="Search messages...">

        </div>


        <!-- MESSAGES -->

        <div
            class="support-messages"
            id="supportMessagesContainer">

            <div class="support-loading">

                <div class="support-spinner"></div>

                <span>
                    Loading support messages...
                </span>

            </div>

        </div>


        <!-- EMPTY -->

        <div
            class="support-empty"
            id="supportEmptyMessage"
            style="display: none;">

            <i class="bi bi-envelope-open"></i>

            <h3>
                No Support Messages
            </h3>

            <p>
                There are currently no messages from users.
            </p>

        </div>

    </div>

</div>

      <script src="${pageContext.request.contextPath}/javascript/api-config.js"></script>
     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <script src="javascript/adminDashboard.js"></script>
     </body>
</html>