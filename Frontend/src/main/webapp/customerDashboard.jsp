<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0">
<title>Customer Dashboard | Smart Tool Room</title>
<!-- Bootstrap 5 -->
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
	rel="stylesheet">
<!-- Bootstrap Icons -->
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
	rel="stylesheet">
  <link rel="stylesheet" href="css/customerDashboard1.css">
</head>
<body>
<!-- =========================================================
     SIDEBAR
========================================================= -->
<aside class="sidebar" id="sidebar">

    <!-- LOGO -->
    <div class="logo-area">

        <div class="logo-top">

            <div class="logo-icon">
                <i class="bi bi-tools"></i>
            </div>

            <h4>YantraX</h4>

        </div>

        <small>Customer Portal</small>

    </div>


    <!-- =====================================================
         SIDEBAR MENU
    ====================================================== -->

    <ul class="sidebar-menu">

        <!-- DASHBOARD -->
        <li>
            <a href="#"
               class="sidebar-link active"
               data-section="dashboard"
               onclick="showSection('dashboard', this); return false;">

                <i class="bi bi-grid-1x2"></i>

                <span>Dashboard</span>

            </a>
        </li>


        <!-- MY PROFILE -->
        <li>
            <a href="#"
               class="sidebar-link"
               data-section="profile"
               onclick="showSection('profile', this); return false;">

                <i class="bi bi-person"></i>

                <span>My Profile</span>

            </a>
        </li>


        <!-- NEW JOB ORDER -->
        <li>
            <a href="#"
               class="sidebar-link"
               data-section="newOrder"
               onclick="showSection('newOrder', this); return false;">

                <i class="bi bi-plus-circle"></i>

                <span>New Job Order</span>

            </a>
        </li>


        <!-- MY ORDERS -->
        <li>
            <a href="#"
               class="sidebar-link"
               data-section="orders"
               onclick="showSection('orders', this); return false;">

                <i class="bi bi-clipboard-check"></i>

                <span>My Orders</span>

            </a>
        </li>


        <!-- ORDER STATUS -->
        <li>
            <a href="#"
               class="sidebar-link"
               data-section="status"
               onclick="showSection('status', this); return false;">

                <i class="bi bi-graph-up-arrow"></i>

                <span>Order Status</span>

            </a>
        </li>


        <!-- JOB DETAILS -->
        <li>
            <a href="#"
               class="sidebar-link"
               data-section="jobDetails"
               onclick="showSection('jobDetails', this); return false;">

                <i class="bi bi-file-text"></i>

                <span>Job Details</span>

            </a>
        </li>


        <!-- INVOICES -->
        <li>
            <a href="#"
               class="sidebar-link"
               data-section="invoices"
               onclick="showSection('invoices', this); return false;">

                <i class="bi bi-receipt"></i>

                <span>Invoice</span>

            </a>
        </li>


        <!-- PAYMENTS -->
        <li>
            <a href="#"
               class="sidebar-link"
               data-section="payments"
               onclick="showSection('payments', this); return false;">

                <i class="bi bi-credit-card"></i>

                <span>Payment</span>

            </a>
        </li>


        <!-- NOTIFICATIONS -->
        <li>
            <a href="#"
               class="sidebar-link"
               data-section="notifications"
               onclick="showSection('notifications', this); return false;">

                <i class="bi bi-bell"></i>

                <span>Notifications</span>

            </a>
        </li>

    </ul>


    <!-- =====================================================
         LOGOUT
    ====================================================== -->

    <div class="logout-area">

        <button
            type="button"
            class="logout-btn"
            onclick="logout();">

            <i class="bi bi-box-arrow-right me-2"></i>

            Logout

        </button>

    </div>

</aside>
<!-- =========================================================
     MAIN CONTENT
========================================================= -->
<main class="main-content">
<!-- TOP BAR -->
	<div class="topbar">
       <div class="d-flex align-items-center gap-3">
          <button class="mobile-menu" onclick="toggleSidebar()"><i class="bi bi-list"></i></button>
             <div class="page-title"><h2 id="pageTitle">Customer Dashboard</h2>
               <p>Welcome back! Manage your orders and track production.</p>
            </div>
          </div>
		<div class="customer-area">
			<button class="notification-btn"
				onclick="showSection('notifications')">
				<i class="bi bi-bell"></i>
				<span class="notification-badge"></span>
			</button>
			<div class="profile-mini">
				<div class="profile-avatar">
					<i class="bi bi-person"></i>
				</div>
				<div>
					<strong id="topCustomerName">
						Customer
					</strong>
					<small>Customer</small>
				</div>
			</div>
		</div>
	</div>
	<!-- =====================================================
	     DASHBOARD
	===================================================== -->
	<section id="dashboard" class="dashboard-section active">

    <!-- ================= CUSTOMER WELCOME BANNER ================= -->

    <div class="welcome-banner">

        <div class="welcome-content">

            <span class="welcome-kicker">
                <i class="bi bi-stars"></i>
                Customer workspace
            </span>

            <h1>
                Good day,
                <span id="welcomeCustomerName">Customer</span>
                👋
            </h1>

            <p>
                Manage your job orders, track production progress,
                and stay updated with your work.
            </p>
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
		<!-- STATISTICS -->
		<div class="row g-4 mb-4">
			<div class="col-xl-3 col-md-6">
                 <div class="stat-card">
                     <div class="stat-icon icon-blue"> <i class="bi bi-clipboard"></i></div>
					<p>Total Orders</p><h3 id="totalOrders">0</h3>
               </div>
            </div>
			<div class="col-xl-3 col-md-6">
                <div class="stat-card">
                    <div class="stat-icon icon-orange"><i class="bi bi-hourglass-split"></i></div>
                      <p>Pending Orders</p><h3 id="pendingOrders">0</h3>
                  </div>
              </div>
			<div class="col-xl-3 col-md-6">
                <div class="stat-card">
                    <div class="stat-icon icon-blue"><i class="bi bi-gear-wide-connected"></i></div>
                    <p>Orders In Progress</p><h3 id="activeOrders">0</h3>
               </div>
            </div>
			<div class="col-xl-3 col-md-6">
                 <div class="stat-card">
                    <div class="stat-icon icon-green"><i class="bi bi-check-circle"></i></div>
                         <p>Completed Orders</p><h3 id="completedOrders">0</h3>
                      </div>
                   </div>
               </div>
		<!-- QUICK ACTION -->
		<div class="content-card mb-4">
			<div class="card-heading">
				<h5>
					Quick Actions
				</h5>
			</div>
			<div class="d-flex flex-wrap gap-2">
				<button class="btn-primary-custom"
					onclick="showSection('newOrder')">
					<i class="bi bi-plus-lg me-1"></i>
					Create New Job Order
				</button>
				<button class="btn-outline-custom"
					onclick="showSection('orders')">
					<i class="bi bi-clipboard-check me-1"></i>
					View My Orders
				</button>
				<button class="btn-outline-custom"
					onclick="showSection('invoices')">
					<i class="bi bi-receipt me-1"></i>
					View Invoices
				</button>
			</div>
		</div>
		<!-- RECENT ORDERS -->
		<div class="content-card">
			<div class="card-heading">
				<h5>
					Recent Orders
				</h5>
				<a href="#orders"
					onclick="showSection('orders')">
					View All
				</a>
			</div>
			<div class="table-responsive">
				<table class="table">
					<thead>
						<tr>
							<th>Order ID</th>
							<th>Job</th>
							<th>Order Date</th>
							<th>Machine</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody id="recentOrdersTable">
						<tr>
							<td colspan="6"
								class="text-center text-muted py-4">
								No orders found.
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</section>
	<!-- =====================================================
     PROFILE
===================================================== -->

<section id="profile" class="dashboard-section">

    <div class="content-card profile-card">

        <!-- =================================================
             PROFILE CARD HEADING
        ================================================== -->

        <div class="card-heading">

            <div>
                <h5 class="mb-1">
                    My Profile
                </h5>

                <p class="text-muted mb-0">
                    View and manage your customer information.
                </p>
            </div>

            <button
                type="button"
                id="editProfileBtn"
                class="btn-outline-custom"
                onclick="enableProfileEdit()">

                <i class="bi bi-pencil me-1"></i>
                Edit Profile

            </button>

        </div>


        <!-- =================================================
             PROFILE MAIN AREA
             LEFT  = PHOTO
             RIGHT = CUSTOMER INFORMATION
        ================================================== -->

        <div class="customer-profile-layout">


            <!-- =================================================
                 LEFT SIDE - PROFILE PHOTO
            ================================================== -->

            <div class="customer-profile-photo-section">

                <div class="profile-photo-wrapper">

                    <img
                        id="profilePhoto"
                        src="images/avatar.webp"
                        alt="Customer Profile"
                        class="customer-profile-photo">

                </div>


                <!-- Hidden until Edit Profile -->

                <div
                    id="profilePhotoUploadBox"
                    class="profile-photo-upload-box">

                    <label
                        for="profilePhotoInput"
                        class="profile-photo-label">

                        <i class="bi bi-camera me-1"></i>
                        Change Photo

                    </label>

                    <input
                        type="file"
                        id="profilePhotoInput"
                        accept="image/*"
                        style="display:none;">

                </div>


                <h4
                    id="profileName"
                    class="profile-display-name">

                    Customer Name

                </h4>

                <p class="text-muted mb-0">
                    Customer
                </p>

            </div>


            <!-- =================================================
                 RIGHT SIDE - CUSTOMER INFORMATION
            ================================================== -->

            <div class="customer-profile-info-section">


                <form id="customerProfileForm">


                    <!-- Hidden IDs -->

                    <input
                        type="hidden"
                        id="customer_id"
                        name="customer_id">

                    <input
                        type="hidden"
                        id="user_id"
                        name="user_id">


                    <!-- =================================================
                         ROW 1
                    ================================================== -->

                    <div class="row g-3">


                        <!-- FULL NAME -->

                        <div class="col-md-6">

                            <label
                                class="form-label">

                                Full Name

                            </label>

                            <input
                                type="text"
                                class="form-control profile-edit-field"
                                id="fullName"
                                name="fullName"
                                readonly>

                        </div>


                        <!-- MOBILE -->

                        <div class="col-md-6">

                            <label
                                class="form-label">

                                Mobile Number

                            </label>

                            <input
                                type="text"
                                class="form-control profile-edit-field"
                                id="mobileNo"
                                name="mobileNo"
                                readonly>

                        </div>


                        <!-- =================================================
                             ROW 2
                        ================================================== -->


                        <!-- EMAIL -->

                        <div class="col-md-6">

                            <label
                                class="form-label">

                                Email

                            </label>

                            <input
                                type="email"
                                class="form-control profile-edit-field"
                                id="email"
                                name="email"
                                readonly>

                        </div>


                        <!-- COMPANY -->

                        <div class="col-md-6">

                            <label
                                class="form-label">

                                Company Name

                            </label>

                            <input
                                type="text"
                                class="form-control profile-edit-field"
                                id="companyName"
                                name="companyName"
                                readonly>

                        </div>


                        <!-- =================================================
                             ROW 3
                        ================================================== -->


                        <!-- GST -->

                        <div class="col-md-6">

                            <label
                                class="form-label">

                                GST Number

                            </label>

                            <input
                                type="text"
                                class="form-control profile-edit-field"
                                id="gstNo"
                                name="gstNo"
                                readonly>

                        </div>


                        <!-- CITY -->

                        <div class="col-md-6">

                            <label
                                class="form-label">

                                City

                            </label>

                            <input
                                type="text"
                                class="form-control profile-edit-field"
                                id="city"
                                name="city"
                                readonly>

                        </div>


                        <!-- =================================================
                             ROW 4
                        ================================================== -->


                        <!-- STATE -->

                        <div class="col-md-6">

                            <label
                                class="form-label">

                                State

                            </label>

                            <input
                                type="text"
                                class="form-control profile-edit-field"
                                id="state"
                                name="state"
                                readonly>

                        </div>


                        <!-- ADDRESS -->

                        <div class="col-md-6">

                            <label
                                class="form-label">

                                Address

                            </label>

                            <textarea
                                class="form-control profile-edit-field"
                                id="address"
                                name="address"
                                rows="1"
                                readonly></textarea>

                        </div>

                    </div>


                    <!-- =================================================
                         SAVE / CANCEL BUTTONS
                         HIDDEN INITIALLY
                    ================================================== -->

                    <div
                        id="profileEditActions"
                        class="profile-edit-actions">

                        <button
                            type="submit"
                            id="saveProfileBtn"
                            class="btn btn-success">

                            <i class="bi bi-check-circle me-1"></i>
                            Save Changes

                        </button>


                        <button
                            type="button"
                            id="cancelProfileBtn"
                            class="btn btn-secondary"
                            onclick="cancelProfileEdit()">

                            <i class="bi bi-x-circle me-1"></i>
                            Cancel

                        </button>

                    </div>


                </form>

            </div>

        </div>

    </div>

</section>

<!-- =====================================================
     NEW JOB ORDER
===================================================== -->

<section id="newOrder" class="dashboard-section">

<div class="content-card">

    <div class="card-heading">
        <h5>
            Create New Job Order
        </h5>
    </div>

    <form id="jobOrderForm">

        <div class="row g-4">

            <!-- JOB / PRODUCT NAME -->
            <div class="col-md-6">

                <label class="form-label">
                    Job / Product Name
                </label>

                <input type="text"
                       class="form-control"
                       id="jobName"
                       placeholder="Enter job name"
                       required>

            </div>


            <!-- JOB TYPE -->
            <div class="col-md-6">

                <label class="form-label">
                    Job Type
                </label>

                <select class="form-select"
                        id="jobType"
                        required>

                    <option value="">
                        Select Job Type
                    </option>

                    <option value="CNC Machining">
                        CNC Machining
                    </option>

                    <option value="Tool Manufacturing">
                        Tool Manufacturing
                    </option>

                    <option value="Die Manufacturing">
                        Die Manufacturing
                    </option>

                    <option value="Mould Manufacturing">
                        Mould Manufacturing
                    </option>

                    <option value="Fabrication">
                        Fabrication
                    </option>

                    <option value="Other">
                        Other
                    </option>

                </select>

            </div>


            <!-- QUANTITY -->
            <div class="col-md-6">

                <label class="form-label">
                    Required Quantity
                </label>

                <input type="number"
                       class="form-control"
                       id="quantity"
                       min="1"
                       placeholder="Enter quantity"
                       required>

            </div>


            <!-- REQUIRED DATE -->
            <div class="col-md-6">

                <label class="form-label">
                    Required Date
                </label>

                <input type="date"
                       class="form-control"
                       id="requiredDate"
                       required>

            </div>
            
            <!-- =====================================================
     MATERIAL
===================================================== -->
<div class="col-md-6">
    <label class="form-label">
        Material
    </label>

    <select
        class="form-select"
        id="material"
        required>

        <option value="">
            Select Material
        </option>

    </select>
</div>


            <!-- JOB DESCRIPTION -->
            <div class="col-md-12">

                <label class="form-label">
                    Job Description
                </label>

                <textarea
                    class="form-control"
                    id="jobDescription"
                    rows="4"
                    placeholder="Describe the job requirements, dimensions, specifications, etc."
                    required></textarea>

            </div>


            <!-- ADDITIONAL REQUIREMENTS -->
            <div class="col-md-12">

                <label class="form-label">
                    Additional Requirements
                </label>

                <textarea
                    class="form-control"
                    id="additionalRequirements"
                    rows="3"
                    placeholder="Enter any additional requirements"></textarea>

            </div>


            <!-- FILE -->
            <div class="col-md-12">

                <label class="form-label">
                    Upload Drawing / Reference File
                </label>

                <input type="file"
                       class="form-control"
                       id="jobFile"
                       accept=".pdf,.jpg,.jpeg,.png,.dwg,.doc,.docx">

                <small class="text-muted">
                    Upload drawing, PDF or reference document.
                </small>

            </div>


            <!-- BUTTONS -->
            <div class="col-md-12">

                <button type="submit"
                        class="btn-primary-custom"
                        id="submitJobBtn">

                    <i class="bi bi-send me-1"></i>

                    Submit Job Order

                </button>


                <button type="reset"
                        class="btn-outline-custom ms-2">

                    Clear

                </button>

            </div>

        </div>

    </form>

</div>


</section>

	<!-- =====================================================
	     MY ORDERS
	===================================================== -->
	<section id="orders" class="dashboard-section">
		<div class="content-card">
			<div class="card-heading">
				<h5>
					My Orders
				</h5>
				<button class="btn-primary-custom"
					onclick="showSection('newOrder')">
					<i class="bi bi-plus-lg"></i>
					New Order
				</button>
			</div>
			<div class="table-responsive">
				<table class="table">
					<thead>
						<tr>
							<th>Order ID</th>
							<th>Job Name</th>
							<th>Type</th>
							<th>Quantity</th>
							<th>Date</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody id="ordersTable">
						<tr>
							<td colspan="7"
								class="text-center text-muted py-4">
								No orders found.
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</section>
	<!-- =====================================================
	     ORDER STATUS
	===================================================== -->
	<section id="status" class="dashboard-section">
		<div class="content-card">
			<div class="card-heading">
				<h5>
					Order Status
				</h5>
			</div>
			<div class="mb-4">
				<label class="form-label">
					Select Order
				</label>
				<select class="form-select"
					id="statusOrderSelect">
					<option>
						Select an order
					</option>
				</select>
			</div>
			<div class="timeline">
				<div class="timeline-step completed">
					<div class="timeline-circle">
						<i class="bi bi-check"></i>
					</div>
					<span>
						Order Placed
					</span>
				</div>
				<div class="timeline-step completed">
					<div class="timeline-circle">
						<i class="bi bi-check"></i>
					</div>
					<span>
						Assigned
					</span>
				</div>
				<div class="timeline-step current">
					<div class="timeline-circle">
						<i class="bi bi-gear"></i>
					</div>
					<span>
						In Progress
					</span>
				</div>
				<div class="timeline-step">
					<div class="timeline-circle">
						<i class="bi bi-check-circle"></i>
					</div>
					<span>
						Completed
					</span>
				</div>
				<div class="timeline-step">
					<div class="timeline-circle">
						<i class="bi bi-truck"></i>
					</div>
					<span>
						Delivered
					</span>
				</div>
			</div>
		</div>
	</section>

<!-- =====================================================
     JOB DETAILS
===================================================== -->

<section id="jobDetails" class="dashboard-section">

    <div class="content-card">

        <div class="card-heading">
            <h5>
                Job Details
            </h5>
        </div>

        <div class="row g-4">

            <!-- ORDER ID -->
            <div class="col-md-6">

                <label class="form-label">
                    Order ID
                </label>

                <input
                    type="text"
                    class="form-control"
                    id="detailOrderId"
                    readonly>

            </div>


            <!-- JOB NAME -->
            <div class="col-md-6">

                <label class="form-label">
                    Job Name
                </label>

                <input
                    type="text"
                    class="form-control"
                    id="detailJobName"
                    readonly>

            </div>


            <!-- JOB TYPE -->
            <div class="col-md-6">

                <label class="form-label">
                    Job Type
                </label>

                <input
                    type="text"
                    class="form-control"
                    id="detailJobType"
                    readonly>

            </div>


            <!-- QUANTITY -->
            <div class="col-md-6">

                <label class="form-label">
                    Quantity
                </label>

                <input
                    type="text"
                    class="form-control"
                    id="detailQuantity"
                    readonly>

            </div>


            <!-- MATERIAL -->
            <div class="col-md-6">

                <label class="form-label">
                    Material
                </label>

                <input
                    type="text"
                    class="form-control"
                    id="detailMaterial"
                    readonly>

            </div>


            <!-- WORKER -->
            <div class="col-md-6">

                <label class="form-label">
                    Worker
                </label>

                <input
                    type="text"
                    class="form-control"
                    id="detailWorker"
                    readonly>

            </div>


            <!-- MACHINE -->
            <div class="col-md-6">

                <label class="form-label">
                    Machine
                </label>

                <input
                    type="text"
                    class="form-control"
                    id="detailMachine"
                    readonly>

            </div>


            <!-- REQUIRED DATE -->
            <div class="col-md-6">

                <label class="form-label">
                    Required Date
                </label>

                <input
                    type="text"
                    class="form-control"
                    id="detailRequiredDate"
                    readonly>

            </div>


            <!-- ORDER DATE -->
            <div class="col-md-6">

                <label class="form-label">
                    Order Date
                </label>

                <input
                    type="text"
                    class="form-control"
                    id="detailOrderDate"
                    readonly>

            </div>


            <!-- CURRENT STATUS -->
            <div class="col-md-6">

                <label class="form-label">
                    Current Status
                </label>

                <input
                    type="text"
                    class="form-control"
                    id="detailStatus"
                    readonly>

            </div>
            
            


            <!-- JOB DESCRIPTION -->
            <div class="col-md-12">

                <label class="form-label">
                    Job Description
                </label>

                <textarea
                    class="form-control"
                    id="detailDescription"
                    rows="4"
                    readonly></textarea>

            </div>


            <!-- ADDITIONAL REQUIREMENTS -->
            <div class="col-md-12">

                <label class="form-label">
                    Additional Requirements
                </label>

                <textarea
                    class="form-control"
                    id="detailAdditionalRequirements"
                    rows="3"
                    readonly></textarea>

            </div>


            <!-- DESIGN FILE -->
            <div class="col-md-12">

                <label class="form-label">
                    Design File
                </label>

                <input
                    type="text"
                    class="form-control"
                    id="detailDesignFile"
                    readonly>

            </div>

        </div>

    </div>

</section>


	<!-- =====================================================
	     INVOICES
	===================================================== -->
	<section id="invoices" class="dashboard-section">
		<div class="content-card">
			<div class="card-heading">
				<h5>
					My Invoices
				</h5>
			</div>
			<div class="table-responsive">
			<div class="row g-3 mb-4">

    <div class="col-md-3">
        <div class="invoice-summary-card">
            <div class="invoice-summary-icon">
                <i class="bi bi-receipt"></i>
            </div>

            <div>
                <small>Total Invoices</small>
                <h4 id="totalInvoiceCount">0</h4>
            </div>
        </div>
    </div>


    <div class="col-md-3">
        <div class="invoice-summary-card">
            <div class="invoice-summary-icon">
                <i class="bi bi-currency-rupee"></i>
            </div>

            <div>
                <small>Total Amount</small>
                <h4 id="totalInvoiceAmount">₹0.00</h4>
            </div>
        </div>
    </div>


    <div class="col-md-3">
        <div class="invoice-summary-card">
            <div class="invoice-summary-icon">
                <i class="bi bi-check-circle"></i>
            </div>

            <div>
                <small>Paid Amount</small>
                <h4 id="paidInvoiceAmount">₹0.00</h4>
            </div>
        </div>
    </div>


    <div class="col-md-3">
        <div class="invoice-summary-card">
            <div class="invoice-summary-icon">
                <i class="bi bi-clock"></i>
            </div>

            <div>
                <small>Pending Amount</small>
                <h4 id="pendingInvoiceAmount">₹0.00</h4>
            </div>
        </div>
    </div>

</div>
				<table class="table">
					<thead>
						<tr>
							<th>Invoice No.</th>
							<th>Order ID</th>
							<th>Invoice Date</th>
							<th>Total Amount</th>
							<th>Payment Status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody id="invoiceTable">
						<tr>
							<td colspan="6"
								class="text-center text-muted py-4">
								No invoices available.
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</section>
	<!-- =====================================================
	     PAYMENTS
	===================================================== -->
	<section id="payments" class="dashboard-section">
		<div class="row g-4 mb-4">
			<div class="col-md-4">
				<div class="stat-card">
					<div class="stat-icon icon-green">
						<i class="bi bi-cash-stack"></i>
					</div>
					<h3 id="totalPaid">
						₹0
					</h3>
					<p>Total Paid</p>
				</div>
			</div>
			<div class="col-md-4">
				<div class="stat-card">
					<div class="stat-icon icon-orange">
						<i class="bi bi-wallet2"></i>
					</div>
					<h3 id="totalDue">
						₹0
					</h3>
					<p>Total Due</p>
				</div>
			</div>
			<div class="col-md-4">
				<div class="stat-card">
					<div class="stat-icon icon-blue">
						<i class="bi bi-receipt"></i>
					</div>
					<h3 id="paymentCount">
						0
					</h3>
					<p>Total Transactions</p>
				</div>
			</div>
		</div>
		<div class="content-card">
			<div class="card-heading">
				<h5>
					Payment History
				</h5>
			</div>
			<div class="table-responsive">
				<table class="table">
					<thead>
						<tr>
							<th>Payment ID</th>
							<th>Invoice No.</th>
							<th>Date</th>
							<th>Amount</th>
							<th>Payment Method</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody id="paymentTable">
						<tr>
							<td colspan="7"
								class="text-center text-muted py-4">
								No payment records found.
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</section>
	<!-- =====================================================
	     NOTIFICATIONS
	===================================================== -->
	<section id="notifications" class="dashboard-section">

    <div class="content-card">

        <div class="card-heading">

            <h5>
                Notifications
            </h5>

            <button
                type="button"
                class="btn-outline-custom"
                onclick="markAllNotificationsAsRead()">

                Mark all as read

            </button>

        </div>


        <div id="notificationList">

            <div class="text-center text-muted py-4">
                Loading notifications...
            </div>

        </div>

    </div>

</section>
</main>

<div class="modal fade"
     id="invoiceDetailsModal"
     tabindex="-1"
     aria-hidden="true">

    <div class="modal-dialog modal-lg modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">
                    <i class="bi bi-receipt me-2"></i>
                    Invoice Details
                </h5>

                <button type="button"
                        class="btn-close"
                        data-bs-dismiss="modal">
                </button>

            </div>


            <div class="modal-body"
                 id="invoiceDetailsContent">

            </div>


            <div class="modal-footer">

                <button type="button"
                        class="btn btn-outline-primary"
                        onclick="printCustomerInvoice()">

                    <i class="bi bi-printer me-1"></i>
                    Print

                </button>


                <button type="button"
                        class="btn btn-primary"
                        onclick="downloadCustomerInvoice()">

                    <i class="bi bi-download me-1"></i>
                    Download

                </button>


                <button type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal">

                    Close

                </button>

            </div>

        </div>

    </div>

</div>

<!-- =====================================================
     PAYMENT DETAILS MODAL
===================================================== -->

<div class="modal fade"
     id="paymentDetailsModal"
     tabindex="-1"
     aria-hidden="true">

    <div class="modal-dialog modal-lg modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">
                    <i class="bi bi-credit-card me-2"></i>
                    Payment Details
                </h5>

                <button type="button"
                        class="btn-close"
                        data-bs-dismiss="modal">
                </button>

            </div>

            <div class="modal-body"
                 id="paymentDetailsContent">

                <div class="text-center py-4">
                    Loading payment details...
                </div>

            </div>

            <div class="modal-footer">

                <button type="button"
                        class="btn btn-outline-primary"
                        onclick="printPaymentDetails()">

                    <i class="bi bi-printer me-1"></i>
                    Print

                </button>

                <button type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal">

                    Close

                </button>

            </div>

        </div>

    </div>

</div>
<script src="${pageContext.request.contextPath}/javascript/api-config.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script src="javascript/customerDashboard.js"></script>
</body>
</html>