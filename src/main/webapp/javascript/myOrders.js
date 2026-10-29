/**
 * 
 */
 
 let customerId = null;


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    loadCustomerAndOrders();

});


// ==========================================
// LOAD CUSTOMER + ORDERS
// ==========================================

async function loadCustomerAndOrders() {

    try {

        // --------------------------------------
        // GET LOGGED-IN USER
        // --------------------------------------

        const sessionResponse = await fetch(
             `${API_CONFIG.BASE_URL}/sessionUser`,
            {
                method: "GET",
                credentials: "include"
            }
        );


        if (!sessionResponse.ok) {

            throw new Error(
                "Unable to get session information."
            );

        }


        const user =
            await sessionResponse.json();


        console.log(
            "Session User:",
            user
        );


        if (!user || !user.user_id) {

            throw new Error(
                "Session expired. Please login again."
            );

        }


        // --------------------------------------
        // GET CUSTOMER
        // --------------------------------------

        const customerResponse = await fetch(

             `${API_CONFIG.BASE_URL}/customer/user/`
            + user.user_id,

            {
                method: "GET",
                credentials: "include"
            }

        );


        if (!customerResponse.ok) {

            throw new Error(
                "Customer information not found."
            );

        }


        const customer =
            await customerResponse.json();


        console.log(
            "Customer:",
            customer
        );


        if (!customer) {

            throw new Error(
                "Customer record not found."
            );

        }


        // --------------------------------------
        // SAVE CUSTOMER ID
        // --------------------------------------

        customerId =
            customer.customer_id;


        // --------------------------------------
        // DISPLAY CUSTOMER
        // --------------------------------------

        document.getElementById(
            "customerId"
        ).textContent =
            customer.customer_id;


        document.getElementById(
            "customerName"
        ).textContent =
            customer.fullName || "-";


        // --------------------------------------
        // LOAD ORDERS
        // --------------------------------------

        await loadOrders();

    }
    catch (error) {

        console.error(
            "Loading Error:",
            error
        );


        showError(
            error.message
        );

    }

}


// ==========================================
// LOAD CUSTOMER ORDERS
// ==========================================

async function loadOrders() {

    if (!customerId) {

        return;

    }


    const tableBody =
        document.getElementById(
            "ordersTableBody"
        );


    tableBody.innerHTML = `
        <tr>
            <td colspan="6" class="loading">
                Loading orders...
            </td>
        </tr>
    `;


    try {

        const response = await fetch(

           `${API_CONFIG.BASE_URL}/viewJobByCustomer/`
            + customerId,

            {
                method: "GET",
                credentials: "include"
            }

        );


        if (!response.ok) {

            throw new Error(
                "Unable to load orders."
            );

        }


        const orders =
            await response.json();


        console.log(
            "Customer Orders:",
            orders
        );


        // --------------------------------------
        // TOTAL ORDERS
        // --------------------------------------

        document.getElementById(
            "totalOrders"
        ).textContent =
            orders.length;


        // --------------------------------------
        // NO ORDERS
        // --------------------------------------

        if (
            !orders ||
            orders.length === 0
        ) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="6"
                        class="empty">
                        No job orders found.
                    </td>
                </tr>
            `;

            return;

        }


        // --------------------------------------
        // DISPLAY ORDERS
        // --------------------------------------

        tableBody.innerHTML = "";


        orders.forEach(function (order) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    #${order.job_id}
                </td>

                <td>
                    ${escapeHtml(
                        order.part_name || "-"
                    )}
                </td>

                <td>
                    ${order.quantity ?? "-"}
                </td>

                <td>
                    ${escapeHtml(
                        order.material || "-"
                    )}
                </td>

                <td>
                    ${escapeHtml(
                        order.design_file || "-"
                    )}
                </td>

                <td>
                    ${getStatusHtml(
                        order.status
                    )}
                </td>

            `;


            tableBody.appendChild(row);

        });

    }
    catch (error) {

        console.error(
            "Order Loading Error:",
            error
        );


        tableBody.innerHTML = `
            <tr>
                <td colspan="6"
                    class="empty">
                    Unable to load orders.
                </td>
            </tr>
        `;


        showError(
            error.message
        );

    }

}


// ==========================================
// STATUS
// ==========================================

function getStatusHtml(status) {

    if (!status) {

        return `
            <span class="status status-default">
                Unknown
            </span>
        `;

    }


    const normalized =
        status.toLowerCase();


    let className =
        "status-default";


    if (
        normalized === "pending"
    ) {

        className =
            "status-pending";

    }
    else if (
        normalized.includes("progress")
    ) {

        className =
            "status-progress";

    }
    else if (
        normalized === "completed"
    ) {

        className =
            "status-completed";

    }


    return `
        <span class="status ${className}">
            ${escapeHtml(status)}
        </span>
    `;

}


// ==========================================
// ERROR MESSAGE
// ==========================================

function showError(message) {

    const messageBox =
        document.getElementById(
            "message"
        );


    messageBox.textContent =
        message;


    messageBox.className =
        "message error";


    messageBox.style.display =
        "block";

}


// ==========================================
// HTML SAFETY
// ==========================================

function escapeHtml(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value;

    return div.innerHTML;

}