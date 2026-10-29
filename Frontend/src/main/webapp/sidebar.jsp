<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!-- ================= SIDEBAR ================= -->

<aside id="sidebar" class="expand">

```
<!-- Sidebar Header -->
<div class="sidebar-header d-flex justify-content-between align-items-center p-3">

    <div class="sidebar-logo">

        <a href="${pageContext.request.contextPath}/">

            <i class="fa-solid fa-screwdriver-wrench logo-icon me-2"></i>

            <span>
                YantraX
            </span>

        </a>

    </div>


    <!-- Sidebar Toggle -->
    <button class="toggle-btn border-0"
            type="button"
            id="sidebarToggle">

        <i id="icon" class="bi bi-chevron-right"></i>

    </button>

</div>


<!-- ================= PROFILE ================= -->

<div class="sidebar-profile px-3 py-2 my-2">

    <div class="d-flex align-items-center gap-3">

        <img src="images/avatar.webp"
             alt="Admin Avatar"
             class="profile-avatar"
             onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'">

        <div class="profile-details">

            <h6 class="mb-0 text-white fw-semibold">
                Administrator
            </h6>

            <small class="text-sky">
                System Admin
            </small>

        </div>

    </div>

</div>


<!-- ================= NAVIGATION ================= -->

<ul class="sidebar-nav">

    <!-- HOME -->
    <li class="sidebar-item active">

        <a href="admin_home.jsp"
           class="sidebar-link"
           target="frame">

            <i class="bi bi-house-door-fill"></i>

            <span>
                Home
            </span>

        </a>

    </li>


    <!-- ================= CUSTOMER MANAGEMENT ================= -->

    <li class="sidebar-item">

        <a href="#"
           class="sidebar-link collapsed has-dropdown"
           data-bs-toggle="collapse"
           data-bs-target="#customer-master"
           aria-expanded="false"
           aria-controls="customer-master">

            <i class="bi bi-people-fill"></i>

            <span>
                Customer Management
            </span>

        </a>


        <ul id="customer-master"
            class="sidebar-dropdown list-unstyled collapse"
            data-bs-parent="#sidebar">

            <li class="sidebar-item">

                <a href="customerDashboard.jsp"
                   class="sidebar-link"
                   target="frame">

                    Add Customer

                </a>

            </li>


            <li class="sidebar-item">

                <a href="customerDashboard.jsp"
                   class="sidebar-link"
                   target="frame">

                    View Customers

                </a>

            </li>

        </ul>

    </li>


    <!-- ================= WORKER MANAGEMENT ================= -->

    <li class="sidebar-item">

        <a href="#"
           class="sidebar-link collapsed has-dropdown"
           data-bs-toggle="collapse"
           data-bs-target="#worker-master"
           aria-expanded="false"
           aria-controls="worker-master">

            <i class="bi bi-person-workspace"></i>

            <span>
                Worker Management
            </span>

        </a>


        <ul id="worker-master"
            class="sidebar-dropdown list-unstyled collapse"
            data-bs-parent="#sidebar">

            <li class="sidebar-item">

                <a href="workerDashboard.jsp"
                   class="sidebar-link"
                   target="frame">

                    Add Worker

                </a>

            </li>


            <li class="sidebar-item">

                <a href="workerDashboard.jsp"
                   class="sidebar-link"
                   target="frame">

                    View Workers

                </a>

            </li>

        </ul>

    </li>


    <!-- ================= MACHINE MANAGEMENT ================= -->

    <li class="sidebar-item">

        <a href="#"
           class="sidebar-link collapsed has-dropdown"
           data-bs-toggle="collapse"
           data-bs-target="#machine-master"
           aria-expanded="false"
           aria-controls="machine-master">

            <i class="bi bi-cpu-fill"></i>

            <span>
                Machine Management
            </span>

        </a>


        <ul id="machine-master"
            class="sidebar-dropdown list-unstyled collapse"
            data-bs-parent="#sidebar">

            <li class="sidebar-item">

                <a href="machine.jsp"
                   class="sidebar-link"
                   target="frame">

                    Add Machine

                </a>

            </li>


            <li class="sidebar-item">

                <a href="machine.jsp"
                   class="sidebar-link"
                   target="frame">

                    View Machines

                </a>

            </li>

        </ul>

    </li>


    <!-- ================= MATERIAL MANAGEMENT ================= -->

    <li class="sidebar-item">

        <a href="#"
           class="sidebar-link collapsed has-dropdown"
           data-bs-toggle="collapse"
           data-bs-target="#material-master"
           aria-expanded="false"
           aria-controls="material-master">

            <i class="bi bi-box-seam-fill"></i>

            <span>
                Material Management
            </span>

        </a>


        <ul id="material-master"
            class="sidebar-dropdown list-unstyled collapse"
            data-bs-parent="#sidebar">

            <li class="sidebar-item">

                <a href="material.jsp"
                   class="sidebar-link"
                   target="frame">

                    Add Material

                </a>

            </li>


            <li class="sidebar-item">

                <a href="material.jsp"
                   class="sidebar-link"
                   target="frame">

                    View Materials

                </a>

            </li>

        </ul>

    </li>


    <!-- ================= JOB ORDER MANAGEMENT ================= -->

    <li class="sidebar-item">

        <a href="#"
           class="sidebar-link collapsed has-dropdown"
           data-bs-toggle="collapse"
           data-bs-target="#job-master"
           aria-expanded="false"
           aria-controls="job-master">

            <i class="bi bi-briefcase-fill"></i>

            <span>
                Job Order Management
            </span>

        </a>


        <ul id="job-master"
            class="sidebar-dropdown list-unstyled collapse"
            data-bs-parent="#sidebar">

            <li class="sidebar-item">

                <a href="joborder.jsp"
                   class="sidebar-link"
                   target="frame">

                    Create Job

                </a>

            </li>


            <li class="sidebar-item">

                <a href="joborder.jsp"
                   class="sidebar-link"
                   target="frame">

                    View Job

                </a>

            </li>

        </ul>

    </li>


    <!-- ================= JOB STATUS ================= -->

    <li class="sidebar-item">

        <a href="#"
           class="sidebar-link collapsed has-dropdown"
           data-bs-toggle="collapse"
           data-bs-target="#job-status"
           aria-expanded="false"
           aria-controls="job-status">

            <i class="bi bi-activity"></i>

            <span>
                Job Status Tracking
            </span>

        </a>


        <ul id="job-status"
            class="sidebar-dropdown list-unstyled collapse"
            data-bs-parent="#sidebar">

            <li class="sidebar-item">

                <a href="jobstatus.jsp"
                   class="sidebar-link"
                   target="frame">

                    Track Progress

                </a>

            </li>


            <li class="sidebar-item">

                <a href="jobstatus.jsp"
                   class="sidebar-link"
                   target="frame">

                    Status Overview

                </a>

            </li>

        </ul>

    </li>


    <!-- ================= INVOICE ================= -->

    <li class="sidebar-item">

        <a href="#"
           class="sidebar-link collapsed has-dropdown"
           data-bs-toggle="collapse"
           data-bs-target="#invoice-mgmt"
           aria-expanded="false"
           aria-controls="invoice-mgmt">

            <i class="bi bi-file-earmark-text-fill"></i>

            <span>
                Invoice Management
            </span>

        </a>


        <ul id="invoice-mgmt"
            class="sidebar-dropdown list-unstyled collapse"
            data-bs-parent="#sidebar">

            <li class="sidebar-item">

                <a href="invoice.jsp"
                   class="sidebar-link"
                   target="frame">

                    Generate Invoice

                </a>

            </li>


            <li class="sidebar-item">

                <a href="invoice.jsp"
                   class="sidebar-link"
                   target="frame">

                    View Invoices

                </a>

            </li>

        </ul>

    </li>


    <!-- ================= PAYMENT ================= -->

    <li class="sidebar-item">

        <a href="#"
           class="sidebar-link collapsed has-dropdown"
           data-bs-toggle="collapse"
           data-bs-target="#payment-mgmt"
           aria-expanded="false"
           aria-controls="payment-mgmt">

            <i class="bi bi-credit-card-fill"></i>

            <span>
                Payment Management
            </span>

        </a>


        <ul id="payment-mgmt"
            class="sidebar-dropdown list-unstyled collapse"
            data-bs-parent="#sidebar">

            <li class="sidebar-item">

                <a href="payment.jsp"
                   class="sidebar-link"
                   target="frame">

                    Record Payment

                </a>

            </li>


            <li class="sidebar-item">

                <a href="payment.jsp"
                   class="sidebar-link"
                   target="frame">

                    Payment History

                </a>

            </li>

        </ul>

    </li>


    <!-- ================= REPORTS ================= -->

    <li class="sidebar-item">

        <a href="#"
           class="sidebar-link collapsed has-dropdown"
           data-bs-toggle="collapse"
           data-bs-target="#reports-mgmt"
           aria-expanded="false"
           aria-controls="reports-mgmt">

            <i class="bi bi-bar-chart-line-fill"></i>

            <span>
                Reports
            </span>

        </a>


        <ul id="reports-mgmt"
            class="sidebar-dropdown list-unstyled collapse"
            data-bs-parent="#sidebar">

            <li class="sidebar-item">

                <a href="report.jsp"
                   class="sidebar-link"
                   target="frame">

                    Daily Summary

                </a>

            </li>


            <li class="sidebar-item">

                <a href="report.jsp"
                   class="sidebar-link"
                   target="frame">

                    Monthly Revenue

                </a>

            </li>

        </ul>

    </li>


    <!-- ================= SETTINGS ================= -->

    <li class="sidebar-item">

        <a href="#"
           class="sidebar-link collapsed has-dropdown"
           data-bs-toggle="collapse"
           data-bs-target="#settings-mgmt"
           aria-expanded="false"
           aria-controls="settings-mgmt">

            <i class="bi bi-gear-fill"></i>

            <span>
                Setting / Profile
            </span>

        </a>


        <ul id="settings-mgmt"
            class="sidebar-dropdown list-unstyled collapse"
            data-bs-parent="#sidebar">

            <li class="sidebar-item">

                <a href="setting.jsp"
                   class="sidebar-link"
                   target="frame">

                    My Profile

                </a>

            </li>


            <li class="sidebar-item">

                <a href="setting.jsp"
                   class="sidebar-link"
                   target="frame">

                    System Settings

                </a>

            </li>

        </ul>

    </li>


    <!-- ================= LOGOUT ================= -->

    <li class="sidebar-item">

        <a href="${pageContext.request.contextPath}/login.jsp"
           class="sidebar-link text-danger-hover"
           onclick="logout()">

            <i class="bi bi-box-arrow-right"></i>

            <span>
                Logout
            </span>

        </a>

    </li>

</ul>
```

</aside>
