<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Navigation Bar</title>
<!-- Bootstrap 5 CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"/>
<!-- Icons -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"/>

<!-- Navbar CSS -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/navbarr.css"/>
</head>
<body>
   <nav class="navbar navbar-expand-lg custom-navbar">
        <div class="container-fluid px-lg-4">
            <!-- Two-Tone Brand Logo -->
            <a class="navbar-brand d-flex align-items-center" href="${pageContext.request.contextPath}/">
                <i class="fa-solid fa-screwdriver-wrench me-2 fs-4"></i>
                <span class="brand-text">Yantra</span><span class="brand-accent">X</span>
            </a>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mx-auto mb-lg-0 mb-2 gap-lg-4 mt-lg-0 mt-3">
                    <li class="nav-item">
                        <a class="nav-link" href="${pageContext.request.contextPath}/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#about">About Us</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#services">Services</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#contact">Contact Us</a>
                    </li>
                </ul>
                
                <!-- Action Buttons -->
                <div class="d-flex align-items-center gap-2 mt-lg-0 mt-2">
                    <button class="btn btn-nav-register" type="button" onclick="window.location.href='register.jsp'">Register</button>
                    <button class="btn btn-nav-login" type="button" onclick="window.location.href='login.jsp'">Login</button>
                </div>
            </div>
        </div>
    </nav>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>