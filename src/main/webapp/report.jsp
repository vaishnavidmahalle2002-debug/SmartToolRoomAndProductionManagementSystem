<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Reports | YantraX</title>

<!-- Bootstrap CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Bootstrap Icons -->
<link rel="stylesheet"
href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

<!-- Custom CSS -->
<link rel="stylesheet" href="css/report.css">
</head>
<body>


<body onload="loadReportSummary()">

<div class="container-fluid mt-4">

    <div class="card shadow-lg border-0">

        <!-- Header -->

        <div class="card-header report-header d-flex align-items-center">

            <span class="badge bg-light text-dark me-2">10</span>

            <h5 class="mb-0 text-white">
                Reports Dashboard
            </h5>

        </div>

        <!-- Body -->

        <div class="card-body">

            <div class="row">

                <!-- Left Section -->

                <div class="col-lg-8">

                    <h5 class="mb-4 fw-bold">
                        Generate Reports
                    </h5>

                    <div class="row g-4">

                        <!-- Customer -->

                        <div class="col-md-6">

                            <div class="report-box">

                                <i class="bi bi-people-fill report-icon"></i>

                                <h6>Customer Report</h6>

                                <p>
                                    View all registered customers.
                                </p>

                                <button class="btn btn-primary"
                                onclick="customerReport()">

                                    View Report

                                </button>

                            </div>

                        </div>

                        <!-- Worker -->

                        <div class="col-md-6">

                            <div class="report-box">

                                <i class="bi bi-person-workspace report-icon"></i>

                                <h6>Worker Report</h6>

                                <p>
                                    View all workers.
                                </p>

                                <button class="btn btn-primary"
                                onclick="workerReport()">

                                    View Report

                                </button>

                            </div>

                        </div>

                        <!-- Machine -->

                        <div class="col-md-6">

                            <div class="report-box">

                                <i class="bi bi-cpu-fill report-icon"></i>

                                <h6>Machine Report</h6>

                                <p>
                                    Machine details and availability.
                                </p>

                                <button class="btn btn-primary"
                                onclick="machineReport()">

                                    View Report

                                </button>

                            </div>

                        </div>

                        <!-- Material -->

                        <div class="col-md-6">

                            <div class="report-box">

                                <i class="bi bi-box-seam-fill report-icon"></i>

                                <h6>Material Report</h6>

                                <p>
                                    Material inventory report.
                                </p>

                                <button class="btn btn-primary"
                                onclick="materialReport()">

                                    View Report

                                </button>

                            </div>

                        </div>

                        <!-- Job Orders -->

                        <div class="col-md-6">

                            <div class="report-box">

                                <i class="bi bi-clipboard2-data-fill report-icon"></i>

                                <h6>Job Order Report</h6>

                                <p>
                                    View all production jobs.
                                </p>

                                <button class="btn btn-primary"
                                onclick="jobOrderReport()">

                                    View Report

                                </button>

                            </div>

                        </div>

                        <!-- Payments -->

                        <div class="col-md-6">

                            <div class="report-box">

                                <i class="bi bi-cash-stack report-icon"></i>

                                <h6>Payment Report</h6>

                                <p>
                                    Payment history and invoices.
                                </p>

                                <button class="btn btn-primary"
                                onclick="paymentReport()">

                                    View Report

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

                <!-- Right Section -->

                <div class="col-lg-4 d-flex align-items-center justify-content-center">

                    <div class="text-center report-image">

                        <img src="images/report.png"
                        class="img-fluid"
                        style="max-height:260px;"
                        onerror="this.src='https://cdn-icons-png.flaticon.com/512/2920/2920349.png'">

                        <h4 class="mt-3 text-secondary">

                            Reports & Analytics

                        </h4>

                        <p class="text-muted">

                            Generate system reports instantly.

                        </p>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>
 <script src="javascript/apiconfig.js"></script>
<script src="javascript/report.js"></script>

</body>
</html>













