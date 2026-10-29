<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Settings | YantraX</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<link rel="stylesheet"
href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

<link rel="stylesheet" href="css/setting.css">
</head>
<body>


<body onload="loadProfile()">

<div class="container-fluid mt-4">

<div class="card shadow-lg border-0">

<div class="card-header setting-header d-flex align-items-center">

<span class="badge bg-light text-dark me-2">11</span>

<h5 class="text-white mb-0">Settings</h5>

</div>

<div class="card-body">

<div class="row">

<div class="col-lg-8">

<h5 class="mb-4">Profile Settings</h5>

<form id="settingForm">

<div class="row mb-3">

<label class="col-sm-3 col-form-label">Full Name</label>

<div class="col-sm-6">

<input type="text" id="fullName"
class="form-control">

</div>

</div>

<div class="row mb-3">

<label class="col-sm-3 col-form-label">Email</label>

<div class="col-sm-6">

<input type="email" id="email"
class="form-control">

</div>

</div>

<div class="row mb-3">

<label class="col-sm-3 col-form-label">Mobile</label>

<div class="col-sm-6">

<input type="text" id="mobile"
class="form-control">

</div>

</div>

<div class="row mb-3">

<label class="col-sm-3 col-form-label">Username</label>

<div class="col-sm-6">

<input type="text" id="username"
class="form-control" readonly>

</div>

</div>

<div class="row mb-3">

<label class="col-sm-3 col-form-label">Old Password</label>

<div class="col-sm-6">

<input type="password"
id="oldPassword"
class="form-control">

</div>

</div>

<div class="row mb-3">

<label class="col-sm-3 col-form-label">New Password</label>

<div class="col-sm-6">

<input type="password"
id="newPassword"
class="form-control">

</div>

</div>

<div class="row mb-4">

<label class="col-sm-3 col-form-label">Confirm Password</label>

<div class="col-sm-6">

<input type="password"
id="confirmPassword"
class="form-control">

</div>

</div>

<button type="button"
class="btn btn-success"
onclick="updateProfile()">

Update Profile

</button>

<button type="reset"
class="btn btn-secondary ms-2">

Cancel

</button>

</form>

</div>

<div class="col-lg-4 text-center">

<img src="images/settings.png"
class="img-fluid"
style="max-height:250px;"
onerror="this.src='https://cdn-icons-png.flaticon.com/512/2099/2099058.png'">

<h4 class="mt-3 text-secondary">
User Settings
</h4>

<p class="text-muted">
Manage your profile information securely.
</p>

</div>

</div>

</div>

</div>

</div>

<script src="js/setting.js"></script>

</body>
</html>





