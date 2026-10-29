<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Admin Profile</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">
    <style>
        .profile-img-preview {
            width: 130px;
            height: 130px;
            object-fit: cover;
            border-radius: 50%;
            border: 4px solid #fff;
            box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }
    </style>
</head>
<body>

<body class="bg-light">

<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-lg-8">
            <div class="card border-0 shadow-lg rounded-4 overflow-hidden">
                <div class="card-header bg-primary text-white text-center py-4">
                    <h4 class="mb-0 fw-bold">Admin Profile Settings</h4>
                </div>
                
                <div class="card-body p-4 p-md-5">
                    <form id="profileForm" action="${pageContext.request.contextPath}/UpdateProfileServlet" method="POST" enctype="multipart/form-data">
                        
                        <!-- Profile Image Section -->
                        <div class="text-center mb-4">
                            <div class="position-relative d-inline-block">
                                <img src="images/Passport photo.png" 
                                     id="avatarPreview"
                                     alt="Admin Photo" 
                                     class="profile-img-preview mb-3"
                                     onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'">
                            </div>
                            <div class="mt-2">
                                <label for="photoUpload" class="btn btn-sm btn-outline-primary rounded-pill px-3 edit-field d-none">
                                    <i class="bi bi-camera me-1"></i> Change Photo
                                </label>
                                <input type="file" id="photoUpload" name="profilePhoto" class="d-none" accept="image/*" onchange="previewImage(event)">
                            </div>
                        </div>

                        <!-- Info Fields -->
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label fw-semibold text-secondary">Full Name</label>
                                <input type="text" class="form-control" name="fullName" value="Vaishnavi Mahalle" readonly required>
                            </div>
                            
                            <div class="col-md-6">
                                <label class="form-label fw-semibold text-secondary">Role</label>
                                <input type="text" class="form-control" name="role" value="System Administrator" readonly>
                            </div>

                            <div class="col-md-6">
                                <label class="form-label fw-semibold text-secondary">Email Address</label>
                                <input type="email" class="form-control" name="email" value="vaishnavi@admin.com" readonly required>
                            </div>

                            <div class="col-md-6">
                                <label class="form-label fw-semibold text-secondary">Phone Number</label>
                                <input type="tel" class="form-control" name="phone" value="+91 9876543210" readonly>
                            </div>
                        </div>

                        <hr class="my-4">

                        <!-- Action Buttons -->
                        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                            <!-- Delete Button -->
                            <button type="button" class="btn btn-outline-danger rounded-3" onclick="confirmDelete()">
                                <i class="bi bi-trash me-1"></i> Delete Account
                            </button>

                            <div class="d-flex gap-2">
                                <!-- Edit Button -->
                                <button type="button" id="editBtn" class="btn btn-primary rounded-3 px-4" onclick="enableEdit()">
                                    <i class="bi bi-pencil-square me-1"></i> Edit Profile
                                </button>
                                
                                <!-- Cancel Button (Hidden by default) -->
                                <button type="button" id="cancelBtn" class="btn btn-secondary rounded-3 px-3 d-none" onclick="disableEdit()">
                                    Cancel
                                </button>

                                <!-- Save Button (Hidden by default) -->
                                <button type="submit" id="saveBtn" class="btn btn-success rounded-3 px-4 d-none">
                                    <i class="bi bi-check-lg me-1"></i> Save Changes
                                </button>
                            </div>
                        </div>
                    </form>

                    <!-- Hidden Form for Delete Operation -->
                    <form id="deleteForm" action="${pageContext.request.contextPath}/DeleteProfileServlet" method="POST" class="d-none"></form>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- JS Logic for Dynamic Actions -->
<script>
    // Enable Editing Mode
    function enableEdit() {
        const inputs = document.querySelectorAll('#profileForm input:not([name="role"])');
        inputs.forEach(input => input.removeAttribute('readonly'));

        document.querySelectorAll('.edit-field').forEach(el => el.classList.remove('d-none'));
        document.getElementById('editBtn').classList.add('d-none');
        document.getElementById('saveBtn').classList.remove('d-none');
        document.getElementById('cancelBtn').classList.remove('d-none');
    }

    // Disable Editing Mode
    function disableEdit() {
        const inputs = document.querySelectorAll('#profileForm input');
        inputs.forEach(input => input.setAttribute('readonly', 'true'));

        document.querySelectorAll('.edit-field').forEach(el => el.classList.add('d-none'));
        document.getElementById('editBtn').classList.remove('d-none');
        document.getElementById('saveBtn').classList.add('d-none');
        document.getElementById('cancelBtn').classList.add('d-none');
    }

    // Image Preview Feature
    function previewImage(event) {
        const reader = new FileReader();
        reader.onload = function() {
            const output = document.getElementById('avatarPreview');
            output.src = reader.result;
        };
        if (event.target.files[0]) {
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    // Confirm and Delete Account
    function confirmDelete() {
        if (confirm("Are you sure you want to delete this profile? This action cannot be undone.")) {
            document.getElementById('deleteForm').submit();
        }
    }
</script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>


</body>
</html>



