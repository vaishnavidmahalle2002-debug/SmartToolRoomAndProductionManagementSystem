<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Login - Smart Tool Room</title>
<!-- Bootstrap 5 CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
<!-- FontAwesome Icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"/>

<!-- Custom Stylesheet -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/loginn.css"/>
</head>
<body>
    <!-- Navigation Header -->
    <jsp:include page="navbar.jsp"></jsp:include>
    
    <!-- Main Login Wrapper -->
    <div class="login-wrapper">
        <div class="login-card">
            
            <!-- Left Panel: Industrial Visual & Branding -->
            <div class="left-panel">
                <div class="brand-badge">
                    <i class="fa-solid fa-screwdriver-wrench me-2"></i> YantraX
                </div>
                <div class="panel-footer-text">
                    <h4 class="fw-bold text-white mb-2">Welcome Back!</h4>
                    <p class="text-white-50 mb-0">Access real-time inventory monitoring, machinery analytics, and job dispatching.</p>
                </div>
            </div>

            <!-- Right Panel: Login Form -->
            <div class="right-panel">
                <div class="form-header mb-4">
                    <h1 class="text-start mb-2">Login</h1>
                    <p class="text-start mb-0">
                        Don't have an account? 
                        <a href="${pageContext.request.contextPath}/register.jsp">Register here</a>
                    </p>
                </div>

                <form id="loginForm" onsubmit="return false;">
                    <!-- Username Input -->
                    <div class="mb-3">
                        <label for="username" class="form-label">Username</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                            <input type="text" class="form-control" id="username" name="username" placeholder="Enter your username" required>
                        </div>
                    </div>

                    <!-- Password Input -->
                    <div class="mb-4">
                        <div class="d-flex justify-content-between align-items-center">
                            <label for="password" class="form-label">Password</label>
                           <a href="${pageContext.request.contextPath}/changePassword.jsp"class="forgot-password-link">Forgot Password?</a>
                        </div>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
                            <input type="password" class="form-control" id="password" name="password" placeholder="Enter your password" required>
                        </div>
                    </div>

                    <!-- Login Button -->
                    <button type="button" class="btn btn-primary w-100" onclick="login()">
                        <i class="fa-solid fa-right-to-bracket me-2"></i>Login to Dashboard
                    </button>
                </form>
            </div>
            
        </div>
    </div>

    <!-- Bootstrap & Custom JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
   <!-- <script type="text/javascript" src="javascript/main.js"></script>-->
   
   <script src="${pageContext.request.contextPath}/javascript/main.js"></script>
   
   <script src="${pageContext.request.contextPath}/javascript/api-config.js"></script>

</body>
</html>