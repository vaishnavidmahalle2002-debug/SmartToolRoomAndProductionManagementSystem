<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Payments | Smart Tool Room</title>

    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/css/payment1.css">

</head>

<body>

<div class="page-container">

    <div class="page-header">

        <div>
            <h1>My Payments</h1>
            <p>View payment history and outstanding balance</p>
        </div>

        <a href="${pageContext.request.contextPath}/customerDashboard.jsp"
           class="back-btn">
            ← Dashboard
        </a>

    </div>


    <div id="paymentContainer">

        <div class="loading">
            Loading payment information...
        </div>

    </div>

</div>

<script src="${pageContext.request.contextPath}/javascript/apiconfig.js"></script>
<script src="${pageContext.request.contextPath}/javascript/payment1.js"></script>

</body>

</html>