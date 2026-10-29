<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>My Profile | Smart Tool Room</title>

    <link rel="stylesheet" href="css/customerProfile.css">

</head>

<body>

<div class="profile-container">

    <div class="profile-header">

        <div>
            <h1>My Profile</h1>
            <p>View your customer information</p>
        </div>

        <a href="${pageContext.request.contextPath}/customerDashboard.jsp"
           class="back-btn">
            ← Dashboard
        </a>

    </div>


    <div id="loadingMessage" class="message">
        Loading profile...
    </div>


    <div id="errorMessage" class="message error"
         style="display:none;">
    </div>


    <div id="profileContent" style="display:none;">

        <div class="profile-card">

            <div class="photo-section">

                <img id="profilePhoto"
                     src="${pageContext.request.contextPath}/images/avatar.webp"
                     alt="Profile Photo"
                     class="profile-photo">

                <h2 id="fullName">Customer</h2>

                <p id="companyName">Company</p>

            </div>


            <div class="details-section">

                <h2>Personal Information</h2>

                <div class="details-grid">

                    <div class="detail-item">
                        <label>Customer ID</label>
                        <span id="customerId">-</span>
                    </div>

                    <div class="detail-item">
                        <label>User ID</label>
                        <span id="userId">-</span>
                    </div>

                    <div class="detail-item">
                        <label>Full Name</label>
                        <span id="fullNameValue">-</span>
                    </div>

                    <div class="detail-item">
                        <label>Mobile Number</label>
                        <span id="mobileNo">-</span>
                    </div>

                    <div class="detail-item">
                        <label>Email</label>
                        <span id="email">-</span>
                    </div>

                    <div class="detail-item">
                        <label>Company Name</label>
                        <span id="companyNameValue">-</span>
                    </div>

                    <div class="detail-item">
                        <label>GST Number</label>
                        <span id="gstNo">-</span>
                    </div>

                    <div class="detail-item">
                        <label>City</label>
                        <span id="city">-</span>
                    </div>

                    <div class="detail-item">
                        <label>State</label>
                        <span id="state">-</span>
                    </div>

                    <div class="detail-item full-width">
                        <label>Address</label>
                        <span id="address">-</span>
                    </div>

                    <div class="detail-item">
                        <label>Created Date</label>
                        <span id="createdDate">-</span>
                    </div>

                </div>

            </div>

        </div>

    </div>

</div>
 <script src="javascript/apiconfig.js"></script>
<script src="javascript/customerProfile.js"></script>

</body>

</html>