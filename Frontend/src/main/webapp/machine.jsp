<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="ISO-8859-1">
    <title>Machine Management</title>
    
    <!-- Bootstrap CSS & Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
    
    <!-- External Pastel Theme CSS -->
    <link rel="stylesheet" href="css/machine.css">
</head>
<body>

<div class="container mt-4 mb-5">
    <div class="card">
        <!-- Header with Soft Pastel Gradient & Logo -->
        <div class="card-header d-flex align-items-center gap-3">
            <img src="https://cdn-icons-png.flaticon.com/512/2092/2092063.png" alt="Logo" class="brand-logo">
            <span>Machine Management</span>
        </div>

        <div class="card-body p-4">
            <form id="machineForm">
                <input type="hidden" id="machine_id">

                <div class="row g-3">
                    <div class="col-md-4 mb-3">
                        <label class="form-label">Machine Name</label>
                        <input type="text" class="form-control" id="machine_name" placeholder="Enter Machine Name">
                    </div>

                    <div class="col-md-4 mb-3">
                        <label class="form-label">Machine Type</label>
                        <input type="text" class="form-control" id="machine_type" placeholder="Enter Machine Type">
                    </div>

                    <div class="col-md-4 mb-3">
                        <label class="form-label">Status</label>
                        <select id="status" class="form-select">
                            <option value="Available">Available</option>
                            <option value="Working">Working</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                <div class="text-center mt-3 d-flex justify-content-center gap-2">
                    <button type="button" class="btn btn-success" onclick="saveMachine()">
                        <i class="bi bi-plus-circle me-1"></i> Save Machine
                    </button>
                    <button type="button" class="btn btn-primary" onclick="updateMachine()">
                        <i class="bi bi-pencil-square me-1"></i> Update
                    </button>
                    <button type="reset" class="btn btn-secondary">
                        <i class="bi bi-arrow-counterclockwise me-1"></i> Reset
                    </button>
                </div>
            </form>

            <hr class="my-4" style="opacity: 0.15;">

            <h4 class="mb-3 d-flex align-items-center gap-2 fw-bold text-secondary">
                <i class="bi bi-list-check text-primary"></i> Machine List
            </h4>

            <!-- FIND THIS SECTION IN machine.jsp: -->
<div class="table-responsive">
    <table class="table table-bordered table-hover text-center align-middle">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <!-- UPDATE THIS LINE BELOW (Added min-width) -->
                <th style="min-width: 380px;">Action</th>
            </tr>
        </thead>
        <tbody id="machineTable">
            <!-- Dynamic content from machine.js -->
        </tbody>
    </table>
</div>
        </div>
    </div>
</div>
 <script src="javascript/apiconfig.js"></script>
<script src="javascript/machine.js"></script>
</body>
</html>