<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!-- ================= TOP HEADER / NAVBAR ================= -->

<nav class="navbar navbar-expand px-4 py-3">


<!-- Page Title -->
<div class="navbar-title">

    <h5 class="fw-bold mb-0 text-dark">
        Administration
    </h5>

    <small class="text-muted">
        Smart Tool Room Operations Management
    </small>

</div>


<!-- Right Side Navbar -->
<div class="navbar-collapse collapse">

    <ul class="navbar-nav ms-auto align-items-center gap-3">

        <!-- Notification -->
        <li class="nav-item">

            <button class="btn-icon" type="button">
                <i class="bi bi-bell-fill"></i>
            </button>

        </li>


        <!-- Admin Profile -->
        <li class="nav-item dropdown">

            <a href="#"
               data-bs-toggle="dropdown"
               class="nav-icon pe-md-0 d-flex align-items-center gap-2">

                <img src="images/avatar.webp"
                     alt="User Avatar"
                     class="avatar img-fluid"
                     onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'">

                <span class="fw-semibold text-dark d-none d-md-inline">
                    Admin
                </span>

            </a>


            <!-- Profile Dropdown -->
            <div class="dropdown-menu dropdown-menu-end border-0 shadow-lg mt-3 p-2">

                <a href="setting.jsp"
                   target="frame"
                   class="dropdown-item rounded-2 py-2">

                    <i class="bi bi-person-circle me-2 text-primary"></i>

                    <span>
                        Profile
                    </span>

                </a>


                <hr class="dropdown-divider my-1">


                <!-- Logout -->
                <a href="${pageContext.request.contextPath}/login.jsp"
                   class="dropdown-item rounded-2 py-2 text-danger"
                   onclick="logout()">

                    <i class="bi bi-box-arrow-right me-2"></i>

                    <span>
                        Logout
                    </span>

                </a>

            </div>

        </li>

    </ul>

</div>


</nav>
