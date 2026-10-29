<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Home - Smart Tool Room</title>

<!-- Bootstrap 5 CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"/>
<!-- Icons -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"/>

<!-- Custom CSS (Using Context Path to ensure correct routing) -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/inde.css">
<script src="javascript/apiconfig.js"></script>
<script src="javascript/contact.js"></script>
</head>
<body>
    <jsp:include page="navbar.jsp"></jsp:include>
    
    <!-- Hero Section Carousel -->
    <section class="container-fluid px-0">
        <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">    
                <div class="carousel-item active c-item" data-bs-interval="10000">
                    <img src="${pageContext.request.contextPath}/images/first.png" class="d-block w-100 c-img" alt="Slider Image 1"/>
                    <div class="carousel-caption top-0 d-flex flex-column justify-content-center align-items-center">
                        <h1 class="mt-5 display-3 fw-medium">Smart Tool Room & Production Management System</h1>
                        <p class="fs-4 mt-3">Manage tool inventory, production schedules, machine operations, and workforce efficiently through one integrated platform designed to improve productivity and operational excellence.</p>
                        <a href="#" class="explore-btn-hover mt-4">Explore Jobs <i class="fa-solid fa-arrow-right-long ms-1"></i></a>
                    </div> 
                </div>
                <div class="carousel-item c-item" data-bs-interval="2000">
                    <img src="${pageContext.request.contextPath}/images/first.png" class="d-block w-100 c-img" alt="Slider Image 2"/>
                    <div class="carousel-caption top-0 d-flex flex-column justify-content-center align-items-center">
                        <h1 class="mt-5 display-3 fw-medium">Optimize Production with Smart Automation</h1>
                        <p class="fs-4 mt-3">Plan production, monitor work orders, track machine performance, and ensure timely delivery with real-time insights that enhance manufacturing efficiency.</p>
                        <a href="#" class="explore-btn-hover mt-4">Explore Jobs <i class="fa-solid fa-arrow-right-long ms-1"></i></a>
                    </div> 
                </div>
                <div class="carousel-item c-item">
                    <img src="${pageContext.request.contextPath}/images/first.png" class="d-block w-100 c-img" alt="Slider Image 3" />
                    <div class="carousel-caption top-0 d-flex flex-column justify-content-center align-items-center">
                        <h1 class="mt-5 display-3 fw-medium">Transform Your Manufacturing Operations</h1>
                        <p class="fs-4 mt-3">Empower your organization with intelligent tool tracking, preventive maintenance, inventory management, and comprehensive analytics for smarter decision-making.</p>
                        <a href="#" class="explore-btn-hover mt-4">Explore Jobs <i class="fa-solid fa-arrow-right-long ms-1"></i></a>
                    </div> 
                </div>
            </div> 

            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </section>
    
   <!-- About Us Section -->

<section class="container py-5" id="about">
    <div class="text-center mb-5">
        <h1 class="fw-bold section-title">About Us</h1>
        <p class="text-muted mt-2 fs-5">Intelligent Digital Solution for Modern Tool Room & Manufacturing Operations</p>
    </div>
    <div class="row g-4 align-items-center">
        <!-- REPLACE THE IMAGE HERE -->
        <div class="col-lg-6">
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80" 
                 alt="Smart Tool Room Operations" 
                 class="img-fluid rounded-4 shadow-sm w-100 object-fit-cover" 
                 style="max-height: 420px;"/>
        </div>
        
        <div class="col-lg-6">
            <div class="ps-lg-4">
                <h3 class="mb-3 fw-semibold color-primary">Streamlining Tool Rooms & Manufacturing</h3>
                <p class="justify-text text-secondary mb-3">YantraX is an integrated software solution engineered to digitize, automate, and monitor tool room operations, work orders, machine utilization, and inventory lifecycle. We eliminate production bottlenecks caused by missing tools, untracked maintenance, or unscheduled downtime.</p>
                <p class="justify-text text-secondary mb-4">By connecting shop-floor machinery with real-time digital tracking, YantraX provides complete visibility into tool life cycles, job allocations, and operator performance—empowering decision-makers with actionable manufacturing insights.</p>
                <a href="#services" class="btn btn-primary"><i class="fa-solid fa-gears me-2"></i>Explore Solutions</a>
            </div>
        </div>
    </div>
</section>

<!-- Services Section -->
<section class="bg-section py-5" id="services">
    <div class="container py-4">
        <div class="text-center mb-5">
            <h1 class="fw-bold section-title">Our Key Services</h1>
            <p class="text-muted mt-2 fs-5">End-to-End Features Tailored for Precision Manufacturing</p>
        </div>
        <div class="row g-4">
            <!-- Service 1 -->
            <div class="col-lg-4 col-md-6">
                <div class="card h-100 service-card">
                    <div class="card-body p-4 text-center">
                        <div class="service-icon mb-3">
                            <i class="fa-solid fa-boxes-stacked fa-2x"></i>
                        </div>
                        <h4 class="card-title fw-semibold mb-3">Smart Tool Inventory</h4>
                        <p class="card-text text-secondary">Automate tool check-ins/check-outs with RFID and barcode tracking. Monitor location, quantity, and re-order thresholds instantly.</p>
                    </div>
                </div>
            </div>
            <!-- Service 2 -->
            <div class="col-lg-4 col-md-6">
                <div class="card h-100 service-card">
                    <div class="card-body p-4 text-center">
                        <div class="service-icon mb-3">
                            <i class="fa-solid fa-screwdriver-wrench fa-2x"></i>
                        </div>
                        <h4 class="card-title fw-semibold mb-3">Preventive Maintenance</h4>
                        <p class="card-text text-secondary">Schedule proactive maintenance for machines and tooling assets. Reduce unexpected breakdowns and extend equipment life.</p>
                    </div>
                </div>
            </div>
            <!-- Service 3 -->
            <div class="col-lg-4 col-md-6">
                <div class="card h-100 service-card">
                    <div class="card-body p-4 text-center">
                        <div class="service-icon mb-3">
                            <i class="fa-solid fa-chart-line fa-2x"></i>
                        </div>
                        <h4 class="card-title fw-semibold mb-3">Production Analytics</h4>
                        <p class="card-text text-secondary">Real-time KPI dashboards for OEE (Overall Equipment Effectiveness), job progress, machine downtime, and operator efficiency.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Contact Us Section -->
<section class="container py-5" id="contact">
    <div class="text-center mb-5">
        <h1 class="fw-bold section-title">Contact Us</h1>
        <p class="text-muted mt-2 fs-5">Get in Touch with Our Manufacturing Solutions Team</p>
    </div>
    <div class="row g-4 align-items-stretch">
        <div class="col-lg-5">
            <div class="card h-100 border-0 bg-dark-slate text-white p-4 rounded-4">
                <h3 class="fw-semibold mb-4 color-secondary">Contact Information</h3>
                <p class="mb-4">Have questions about integrating YantraX into your shop floor? Reach out to our technical support team.</p>
                <div class="d-flex align-items-center mb-3">
                    <i class="fa-solid fa-location-dot me-3 fs-5 color-secondary"></i>
                    <span>101 Industrial Estate, Tech Park, Suite 400</span>
                </div>
                <div class="d-flex align-items-center mb-3">
                    <i class="fa-solid fa-envelope me-3 fs-5 color-secondary"></i>
                    <span>support@YantraX.com</span>
                </div>
                <div class="d-flex align-items-center mb-3">
                    <i class="fa-solid fa-phone me-3 fs-5 color-secondary"></i>
                    <span>+1 (800) 555-TOOL</span>
                </div>
            </div>
        </div>
        <div class="col-lg-7">
            <div class="card h-100 p-4 border-0 shadow-sm rounded-4">
                <form>
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Full Name</label>
                            <input type="text" id="fullName" class="form-control" placeholder="Enter Full Name" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Email Address</label>
                            <input type="email" id="email" class="form-control" placeholder="Enter Email" required>
                        </div>
                        <div class="col-12">
                            <label class="form-label">Subject</label>
                            <input type="text"  id="subject" class="form-control" placeholder="Add Subject" required>
                        </div>
                        <div class="col-12">
                            <label class="form-label">Message</label>
                            <textarea class="form-control"  id="message" rows="4" placeholder="How can we help your tool room operations?" required></textarea>
                        </div>
                        <div class="col-12 mt-4">
                           <button type="button"  class="btn btn-primary w-100 py-2" onclick="sendMessage()"><i class="fa-solid fa-paper-plane me-2"></i>Send Message</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>

            <footer class="str-footer">
    <div class="container">
        <div class="row g-4">
            
            <!-- Column 1: Brand & Identity -->
            <div class="col-lg-4 col-md-6 footer-col">
                <div class="footer-brand">
                    <div class="footer-brand-icon">
                        <i class="bi bi-tools"></i>
                    </div>
                    <div>
                        <h4>YantraX</h4>
                        <span>Production Platform</span>
                    </div>
                </div>
                <p class="pe-lg-3" style="font-size: 0.88rem; line-height: 1.6;">
                    Enterprise-grade tool room automation, real-time machine tracking, component lifecycle monitoring, and high-precision job order scheduling.
                </p>
                <div class="live-status-badge">
                    <span class="status-dot"></span>
                    System Operational | ISO 9001 Ready
                </div>
            </div>

            <!-- Column 2: Quick Links -->
            <div class="col-lg-2 col-md-6 footer-col">
                <h5 class="footer-title">Navigation</h5>
                <ul class="footer-links">
                    <li><a href="${pageContext.request.contextPath}/index.jsp"><i class="bi bi-chevron-right"></i> Home</a></li>
                    <li><a href="#about"><i class="bi bi-chevron-right"></i> Production Line</a></li>
                    <li><a href="#services"><i class="bi bi-chevron-right"></i> Machine Fleet</a></li>
                    <li><a href="#materials"><i class="bi bi-chevron-right"></i> Materials Stock</a></li>
                    <li><a href="#contact"><i class="bi bi-chevron-right"></i> Support Portal</a></li>
                </ul>
            </div>

            <!-- Column 3: Modules -->
            <div class="col-lg-3 col-md-6 footer-col">
                <h5 class="footer-title">Core Operations</h5>
                <ul class="footer-links">
                    <li><a href="#"><i class="bi bi-chevron-right"></i> CNC Component Milling</a></li>
                    <li><a href="#"><i class="bi bi-chevron-right"></i> Precision Die Machining</a></li>
                    <li><a href="#"><i class="bi bi-chevron-right"></i> Lathe Turning & Grinding</a></li>
                    <li><a href="#"><i class="bi bi-chevron-right"></i> Material Inventory Control</a></li>
                    <li><a href="#"><i class="bi bi-chevron-right"></i> Real-Time Invoice Logs</a></li>
                </ul>
            </div>

            <!-- Column 4: Support & Connect -->
            <div class="col-lg-3 col-md-6 footer-col">
                <h5 class="footer-title">Contact Support</h5>
                <p style="font-size: 0.88rem; margin-bottom: 0.8rem;">
                    <i class="bi bi-geo-alt-fill me-2 text-info"></i> Industrial Zone, Phase II, City
                </p>
                <p style="font-size: 0.88rem; margin-bottom: 0.8rem;">
                    <i class="bi bi-envelope-fill me-2 text-info"></i> support@smarttoolroom.com
                </p>
                <p style="font-size: 0.88rem; margin-bottom: 1.2rem;">
                    <i class="bi bi-telephone-fill me-2 text-info"></i> +91 (020) 2456-7890
                </p>
                
                <div class="d-flex gap-2">
                    <a href="#" class="social-btn" title="LinkedIn"><i class="bi bi-linkedin"></i></a>
                    <a href="#" class="social-btn" title="Twitter"><i class="bi bi-twitter-x"></i></a>
                    <a href="#" class="social-btn" title="GitHub"><i class="bi bi-github"></i></a>
                    <a href="#" class="social-btn" title="YouTube"><i class="bi bi-youtube"></i></a>
                </div>
            </div>

        </div>

        <!-- Footer Bottom Bar -->
        <div class="row footer-bottom align-items-center">
            <div class="col-md-6 text-center text-md-start mb-2 mb-md-0">
                &copy; 2026 <strong>YantraX</strong>. All rights reserved.
            </div>
            <div class="col-md-6 text-center text-md-end footer-bottom-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Security Logs</a>
            </div>
        </div>
    </div>
</footer>
    <!-- Bootstrap 5 JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>