/**
 * 
 */
 
 let customerId = null;


document.addEventListener("DOMContentLoaded", function () {

    loadCustomer();

});


async function loadCustomer() {

    try {

        const sessionResponse = await fetch(
             `${API_CONFIG.BASE_URL}/sessionUser`,
            {
                method: "GET",
                credentials: "include"
            }
        );


        if (!sessionResponse.ok) {
            throw new Error("Unable to get session.");
        }


        const user =
            await sessionResponse.json();


        if (!user || !user.user_id) {
            throw new Error("Please login again.");
        }


        const customerResponse = await fetch(
            `${API_CONFIG.BASE_URL}/customer/user/`
            + user.user_id,
            {
                method: "GET",
                credentials: "include"
            }
        );


        if (!customerResponse.ok) {
            throw new Error("Customer not found.");
        }


        const customer =
            await customerResponse.json();


        if (!customer) {
            throw new Error("Customer record not found.");
        }


        customerId =
            customer.customer_id;


        loadOrderStatus();

    }
    catch (error) {

        console.error(error);

        document.getElementById(
            "ordersContainer"
        ).innerHTML = `
            <div class="empty">
                ${error.message}
            </div>
        `;

    }

}


async function loadOrderStatus() {

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
            throw new Error("Unable to load order status.");
        }


        const orders =
            await response.json();


        displayOrders(orders);

    }
    catch (error) {

        console.error(error);

        document.getElementById(
            "ordersContainer"
        ).innerHTML = `
            <div class="empty">
                ${error.message}
            </div>
        `;

    }

}


function displayOrders(orders) {

    const container =
        document.getElementById(
            "ordersContainer"
        );


    if (!orders || orders.length === 0) {

        container.innerHTML = `
            <div class="empty">
                You don't have any orders yet.
            </div>
        `;

        return;
    }


    container.innerHTML = "";


    orders.forEach(function (order) {

        const status =
            order.status || "Pending";


        const progress =
            getProgress(status);


        const card =
            document.createElement("div");


        card.className =
            "order-card";


        card.innerHTML = `

            <div class="order-top">

                <div class="job-id">
                    Job #${order.job_id}
                </div>

                <span class="status-badge ${progress.statusClass}">
                    ${status}
                </span>

            </div>


            <div class="order-details">

                <div class="detail">
                    <span>Part Name</span>
                    <strong>
                        ${escapeHtml(order.part_name || "-")}
                    </strong>
                </div>

                <div class="detail">
                    <span>Quantity</span>
                    <strong>
                        ${order.quantity ?? "-"}
                    </strong>
                </div>

                <div class="detail">
                    <span>Material</span>
                    <strong>
                        ${escapeHtml(order.material || "-")}
                    </strong>
                </div>

            </div>


            <div class="progress-container">

                <div class="progress-line">

                    <div class="step ${progress.pending}">
                        1
                    </div>

                    <div class="line ${progress.progressLine}">
                    </div>

                    <div class="step ${progress.inProgress}">
                        2
                    </div>

                    <div class="line ${progress.completedLine}">
                    </div>

                    <div class="step ${progress.completed}">
                        3
                    </div>

                </div>


                <div class="step-labels">

                    <span>Pending</span>

                    <span>In Progress</span>

                    <span>Completed</span>

                </div>

            </div>

        `;


        container.appendChild(card);

    });

}


function getProgress(status) {

    const value =
        status.toLowerCase();


    if (value === "completed") {

        return {
            statusClass: "completed",

            pending: "active",
            inProgress: "active",
            completed: "active",

            progressLine: "active",
            completedLine: "active"
        };

    }


    if (value.includes("progress")) {

        return {
            statusClass: "progress",

            pending: "active",
            inProgress: "active",
            completed: "",

            progressLine: "active",
            completedLine: ""
        };

    }


    return {

        statusClass: "pending",

        pending: "active",
        inProgress: "",
        completed: "",

        progressLine: "",
        completedLine: ""

    };

}


function escapeHtml(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value;

    return div.innerHTML;

}