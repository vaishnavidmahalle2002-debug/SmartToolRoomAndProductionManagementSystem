<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Job Details | Smart Tool Room</title>

    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/css/jobDetails.css">

</head>

<body>

<div class="page-container">

    <div class="page-header">

        <div>
            <h1>Job Details</h1>
            <p>View details of your job orders</p>
        </div>

        <a href="${pageContext.request.contextPath}/customerDashboard.jsp"
           class="back-btn">
            ← Dashboard
        </a>

    </div>


    <div id="jobsContainer">

        <div class="loading">
            Loading job details...
        </div>

    </div>

</div>

<script src="${pageContext.request.contextPath}/javascript/apiconfig.js"></script>
<script src="${pageContext.request.contextPath}/javascript/jobDetails.js"></script>

</body>

</html>