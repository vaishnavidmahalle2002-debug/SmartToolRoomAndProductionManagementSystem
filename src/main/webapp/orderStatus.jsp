<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Order Status | Smart Tool Room</title>

    <link rel="stylesheet" href="css/orderStatus.css">

</head>
<body>


<div class="page-container">

    <div class="page-header">

        <div>
            <h1>Order Status</h1>
            <p>Track the progress of your job orders</p>
        </div>

        <a href="${pageContext.request.contextPath}/customerDashboard.jsp"
           class="back-btn">
            ← Dashboard
        </a>

    </div>


    <div class="orders-container"
         id="ordersContainer">

        <div class="loading">
            Loading order status...
        </div>

    </div>

</div>

<script src="${pageContext.request.contextPath}/javascript/apiconfig.js"></script>
<script src="${pageContext.request.contextPath}/javascript/orderStatus.js"></script>

</body>
</html>