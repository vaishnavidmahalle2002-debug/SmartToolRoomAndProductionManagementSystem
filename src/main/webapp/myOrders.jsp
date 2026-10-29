<%@ page language="java"
    contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
        content="width=device-width, initial-scale=1.0">

    <title>My Orders - Customer</title>

    <!-- Bootstrap -->
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet">

    <!-- Bootstrap Icons -->
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

    <!-- Google Font -->
    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
        rel="stylesheet">

    <!-- YOUR EXISTING CSS -->
   <link rel="stylesheet"
      href="${pageContext.request.contextPath}/css/myOrders.css">
</head>

<body>

<div class="page-container">

    <!-- HEADER -->
    <div class="page-header">

        <div>
            <h1>My Orders</h1>
            <p>View all your job orders</p>
        </div>

        <a href="${pageContext.request.contextPath}/customerDashboard.jsp"
           class="back-btn">
            ← Dashboard
        </a>

    </div>


    <!-- CUSTOMER INFO -->
    <div class="customer-info">

        <div>
            <span>Customer ID</span>
            <strong id="customerId">Loading...</strong>
        </div>

        <div>
            <span>Customer Name</span>
            <strong id="customerName">Loading...</strong>
        </div>

        <div>
            <span>Total Orders</span>
            <strong id="totalOrders">0</strong>
        </div>

    </div>


    <!-- MESSAGE -->
    <div id="message"
         class="message"
         style="display:none;">
    </div>


    <!-- ORDERS TABLE -->
    <div class="orders-card">

        <div class="card-header">
            <h2>Order History</h2>

            <button onclick="loadOrders()"
                    class="refresh-btn">
                ↻ Refresh
            </button>
        </div>


        <div class="table-container">

            <table>

                <thead>

                    <tr>
                        <th>Job ID</th>
                        <th>Part Name</th>
                        <th>Quantity</th>
                        <th>Material</th>
                        <th>Design File</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody id="ordersTableBody">

                    <tr>
                        <td colspan="6"
                            class="loading">
                            Loading orders...
                        </td>
                    </tr>

                </tbody>

            </table>

        </div>

    </div>

</div>

<script src="${pageContext.request.contextPath}/javascript/apiconfig.js"></script>
<script src="${pageContext.request.contextPath}/javascript/myOrders.js"></script>

</body>
</html>