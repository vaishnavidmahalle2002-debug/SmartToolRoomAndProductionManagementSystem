<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Register - Smart Tool Room</title>
<!-- Bootstrap 5 CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">


 <link rel="stylesheet" href="css/registerr.css">
</head>
<body>
	<jsp:include page="navbar.jsp"></jsp:include>
	
	<div class="d-flex justify-content-center align-items-center custom-margin-top">
		<div class="d-flex flex-column p-5 w-50 border">
			<!-- Left Side Image -->
			<div class="left-panel"></div>
			

			<!-- Right Side Form -->
			<div class="right-panel">
				<h1 class="text-center mb-2">Registration</h1>
				<div>
					<p class="text-center mb-4">
						Already have an account? <a href="${pageContext.request.contextPath}/login.jsp">Login</a>
					</p> <!-- Fixed unclosed tag here -->
				</div>
				<div class="mb-3">
					<input type="text" class="form-control" id="full_name" name="full_name" placeholder="Enter Full Name">
				</div>
				<div class="mb-3">
					<input type="email" class="form-control" id="email" name="email" placeholder="Enter email">
				</div>
				<div class="mb-3">
					<input type="text" class="form-control" id="mobileNo" name="mobileNo" placeholder="Enter Mobile No">
				</div>
				<div class="mb-3">
					<input type="text" class="form-control" id="username" name="username" placeholder="Enter Username">
				</div>
				<div class="mb-3">
					<input type="password" class="form-control" id="password" name="password" placeholder="Enter password">
				</div>
				<div class="mb-3">
					<label for="role" class="form-label">Register As</label> 
					<select class="form-select" id="role" name="role" required>
						<option value="">-- Select Role --</option>
						<option value="Customer">Customer</option>
						<option value="Worker">Worker</option>
					</select>
				</div>
				<button type="button" class="btn btn-primary w-100" onclick="register()">Register</button>
			</div>
		</div>
	</div>
	<script src="${pageContext.request.contextPath}/javascript/apiconfig.js"></script>
	<script src="${pageContext.request.contextPath}/javascript/main.js"></script>
</body>
</html>