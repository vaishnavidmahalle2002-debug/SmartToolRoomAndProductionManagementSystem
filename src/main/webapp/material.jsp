<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Material Management</title>

<!-- Bootstrap CSS & Icons -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">

<!-- External Pastel Theme CSS -->
<link rel="stylesheet" href="css/material.css">

</head>
<body>

<div class="container my-4">
    <div class="card">
        
        <!-- Header with Logo and Soft Pastel Aesthetic -->
        <div class="card-header">
            <img src="https://cdn-icons-png.flaticon.com/512/2897/2897785.png" alt="Material Logo" class="brand-logo">
            <span>Material Management</span>
        </div>

        <div class="card-body p-4">
            <form id="materialForm">
                <input type="hidden" id="material_id">

                <div class="row g-3">
                    <div class="col-md-3 mb-2">
                        <label>Material Name</label>
                        <input type="text" class="form-control" id="material_name" placeholder="e.g. Steel Rods">
                    </div>

                    <div class="col-md-3 mb-2">
                        <label>Material Type</label>
                        <input type="text" class="form-control" id="material_type" placeholder="e.g. Metal">
                    </div>

                    <div class="col-md-2 mb-2">
                        <label>Quantity</label>
                        <input type="number" class="form-control" id="quantity" placeholder="0">
                    </div>

                    <div class="col-md-2 mb-2">
                        <label>Unit</label>
                        <input type="text" class="form-control" id="unit" placeholder="kg, pcs, m">
                    </div>

                    <div class="col-md-2 mb-2">
                        <label>Unit Price</label>
                        <input type="number" class="form-control" id="unit_price" placeholder="0.00">
                    </div>
                </div>

                <div class="row g-3 mt-1">
                    <div class="col-md-6 mb-2">
                        <label>Supplier Name</label>
                        <input type="text" class="form-control" id="supplier_name" placeholder="Supplier Company">
                    </div>

                    <div class="col-md-3 mb-2">
                        <label>Minimum Stock</label>
                        <input type="number" class="form-control" id="minimum_stock" placeholder="0">
                    </div>

                    <div class="col-md-3 mb-2 d-flex align-items-end">
                        <button type="button" class="btn btn-success w-100" onclick="saveMaterial()">
                            <i class="bi bi-plus-circle"></i> Save Material
                        </button>
                    </div>
                </div>

                <div class="text-center mt-4 d-flex justify-content-center gap-2">
                    <button type="button" class="btn btn-primary" onclick="updateMaterial()">
                        <i class="bi bi-pencil-square"></i> Update
                    </button>
                    <button type="reset" class="btn btn-secondary">
                        <i class="bi bi-arrow-counterclockwise"></i> Reset
                    </button>
                </div>
            </form>

            <hr class="my-4" style="opacity: 0.12;">

            <h4 class="d-flex align-items-center gap-2 fw-bold text-secondary mb-3">
                <i class="bi bi-table text-primary"></i> Material List
            </h4>

            <div class="table-responsive">
                <table class="table table-bordered table-hover text-center align-middle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Qty</th>
                            <th>Unit</th>
                            <th>Price</th>
                            <th>Supplier</th>
                            <th>Min Stock</th>
                            <th style="min-width: 200px;">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="materialTable">
                        <!-- Dynamic rows populated by material.js -->
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</div>
 <script src="javascript/apiconfig.js"></script>
<script src="javascript/material.js"></script>
</body>
</html>