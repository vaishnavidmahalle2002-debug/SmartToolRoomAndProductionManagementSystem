<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Customer - YantraX</title>

    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">

    <!-- External Custom Pastel Stylesheet -->
    <link rel="stylesheet" href="css/customerDashboard.css">
    <script src="javascript/editProfile.js"></script>
</head>

<body>

<div class="wrapper">

    <!-- Sidebar -->
    <aside class="sidebar">
        <div class="logo">
            <i class="fa-solid fa-screwdriver-wrench"></i>
            <span>YantraX</span>
        </div>

        <div class="profile">
            <img src="images/avatar.webp" alt="Avatar" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'">
            <div>
                <h6>Administrator</h6>
                <small>System Admin</small>
            </div>
        </div>

        <ul>
            <li>
                <a href="adminDashboard.jsp">
                    <i class="bi bi-speedometer2"></i>
                    <span>Dashboard</span>
                </a>
            </li>

            <li class="active">
                <a href="customerDashboard.jsp">
                    <i class="bi bi-people-fill"></i>
                    <span>Customer Management</span>
                </a>
            </li>

            <li>
                <a href="#">
                    <i class="bi bi-person-workspace"></i>
                    <span>Worker Management</span>
                </a>
            </li>

            <li>
                <a href="${pageContext.request.contextPath}/login.jsp">
                    <i class="bi bi-box-arrow-right"></i>
                    <span>Logout</span>
                </a>
            </li>
        </ul>
    </aside>

    <!-- Main Content Area -->
    <div class="main">

        <!-- Top Header Navigation -->
        <nav class="topbar">
            <div class="d-flex align-items-center gap-2">
                <a href="customerProfile.jsp?id=${param.id}" class="btn btn-sm btn-outline-secondary rounded-circle">
                    <i class="bi bi-arrow-left"></i>
                </a>
                <h4 class="mb-0">Edit Customer Information</h4>
            </div>
            <div class="top-profile">
                <i class="bi bi-bell-fill"></i>
                <img src="images/avatar.webp" alt="Profile Avatar" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'">
                <span>Administrator</span>
            </div>
        </nav>

        <!-- Form Card Container -->
        <div class="card border-0 shadow-sm rounded-3 bg-white p-4">
            <div class="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom">
                <h5 class="fw-bold mb-0 text-dark">
                    <i class="bi bi-pencil-square text-primary me-2"></i>Update Details for Record #${param.id != null ? param.id : '5'}
                </h5>
                <a href="customerDashboard.jsp" class="btn btn-outline-secondary btn-sm">
                    <i class="bi bi-x-circle me-1"></i> Cancel
                </a>
            </div>

            <form id="editCustomerForm" >

                <!-- Hidden Customer ID Field -->
                <input type="hidden" id="customerId" name="customerId" value="${param.id != null ? param.id : '5'}">

                <div class="row g-3">

                    <div class="col-md-6 mb-2">
                        <label class="form-label fw-medium">User ID</label>
                        <input type="number" id="userId" name="userId" class="form-control" required>
                    </div>

                    <div class="col-md-6 mb-2">
                        <label class="form-label fw-medium">Full Name</label>
                       <input type="text" id="fullName" name="fullName" class="form-control" required>
                    </div>

                    <div class="col-md-6 mb-2">
                        <label class="form-label fw-medium">Mobile Number</label>
                       <input type="text" id="mobileNo" name="mobileNo" class="form-control" required>
                    </div>

                    <div class="col-md-6 mb-2">
                        <label class="form-label fw-medium">Email Address</label>
                       <input type="email" id="email" name="email" class="form-control" required>
                    </div>

                    <div class="col-md-6 mb-2">
                        <label class="form-label fw-medium">Address</label>
                        <input type="text" id="address" name="address" class="form-control">
                    </div>

                    <div class="col-md-6 mb-2">
                        <label class="form-label fw-medium">City</label>
                       <input type="text" id="city" name="city" class="form-control">
                    </div>

                    <div class="col-md-6 mb-2">
                        <label class="form-label fw-medium">State</label>
                        <input type="text" id="state" name="state" class="form-control">
                    </div>

                    <div class="col-md-6 mb-2">
                        <label class="form-label fw-medium">Company Name</label>
                        <input type="text" id="companyName" name="companyName" class="form-control">
                    </div>

                    <div class="col-md-6 mb-2">
                        <label class="form-label fw-medium">GST Number</label>
                        <input type="text" id="gstNo" name="gstNo" class="form-control">
                    </div>

                    <div class="col-md-6 mb-2">
                        <label class="form-label fw-medium">Profile Photo</label>
                        <input type="file" id="profilePhoto" name="profilePhoto" class="form-control" accept="image/*">
                    </div>

                </div>

                <div class="d-flex gap-3 mt-4 pt-3 border-top">
                    <button class="btn-mint px-4" type="submit">
                        <i class="bi bi-save me-1"></i> Save Changes
                    </button>
                    <a href="customerProfile.jsp?id=${param.id}" class="btn btn-outline-secondary px-4">
                        Cancel
                    </a>
                </div>

            </form>
        </div>

    </div>
</div>

<!-- Bootstrap JS -->
<script src="javascript/apiconfig.js"></script> 
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>