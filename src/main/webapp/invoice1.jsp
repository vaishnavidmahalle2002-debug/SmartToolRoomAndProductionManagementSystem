<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Invoice | Smart Tool Room</title>

    <link rel="stylesheet"
          href="${pageContext.request.contextPath}/css/invoice1.css">
          <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

</head>

<body>

<div class="page-container">

    <div class="page-header">

        <div>
            <h1>My Invoices</h1>
            <p>View your job invoices and payment amounts</p>
        </div>

        <a href="${pageContext.request.contextPath}/customerDashboard.jsp"
           class="back-btn">
            ← Dashboard
        </a>

    </div>


    <div id="invoiceContainer">

        <div class="loading">
            Loading invoices...
        </div>

    </div>

</div>

<script src="${pageContext.request.contextPath}/javascript/apiconfig.js"></script>
<script src="${pageContext.request.contextPath}/javascript/invoice1.js"></script>

</body>

</html>