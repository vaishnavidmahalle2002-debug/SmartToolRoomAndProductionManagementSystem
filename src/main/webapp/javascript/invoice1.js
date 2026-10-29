/**
 * 
 */
 
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

            throw new Error(
                "Session expired. Please login again."
            );

        }


        const user =
            await sessionResponse.json();


        if (!user || !user.user_id) {

            throw new Error(
                "User session not found."
            );

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

            throw new Error(
                "Customer details not found."
            );

        }


        const customer =
            await customerResponse.json();


        if (!customer ||
            !customer.customer_id) {

            throw new Error(
                "Customer record not found."
            );

        }


        loadCustomerInvoices(
            customer.customer_id
        );

    }
    catch (error) {

        console.error(error);

        document.getElementById(
            "invoiceContainer"
        ).innerHTML =

            `<div class="error">
                ${error.message}
             </div>`;
    }

}


async function loadCustomerInvoices(customerId) {

    try {

        /*
         * STEP 1:
         * Get customer's jobs
         */

        const jobResponse = await fetch(
            `${API_CONFIG.BASE_URL}/viewJobByCustomer/`
            + customerId,
            {
                method: "GET",
                credentials: "include"
            }
        );


        if (!jobResponse.ok) {

            throw new Error(
                "Unable to load customer jobs."
            );

        }


        const jobs =
            await jobResponse.json();


        /*
         * STEP 2:
         * Get all invoices
         */

        const invoiceResponse = await fetch(
            `${API_CONFIG.BASE_URL}/viewallInvoice`,
            {
                method: "GET",
                credentials: "include"
            }
        );


        if (!invoiceResponse.ok) {

            throw new Error(
                "Unable to load invoices."
            );

        }


        const invoices =
            await invoiceResponse.json();


        /*
         * STEP 3:
         * Match invoice job_id
         * with customer's job_id
         */

        const customerJobIds =
            jobs.map(function (job) {

                return Number(job.job_id);

            });


        const customerInvoices =
            invoices.filter(function (invoice) {

                return customerJobIds.includes(
                    Number(invoice.job_id)
                );

            });


        displayInvoices(customerInvoices);

    }
    catch (error) {

        console.error(error);

        document.getElementById(
            "invoiceContainer"
        ).innerHTML =

            `<div class="error">
                ${error.message}
             </div>`;
    }

}


function displayInvoices(invoices) {

    var container = document.getElementById("invoiceContainer");

    if (!invoices || invoices.length === 0) {

        container.innerHTML =
            '<div class="empty">' +
            'No invoices available for your orders.' +
            '</div>';

        return;
    }

    container.innerHTML = "";

    invoices.forEach(function(invoice) {

        var card = document.createElement("div");

        card.className = "invoice-card";

        var html = "";

        html += '<div class="invoice-header">';

        html += '<div>';

        html += '<div class="invoice-title">';
        html += 'Invoice';
        html += '</div>';

        html += '<div class="invoice-id">';
        html += 'Invoice #' + invoice.invoice_id;
        html += '</div>';

        html += '</div>';

        html += '</div>';


        html += '<div class="invoice-details">';


        html += '<div class="detail">';

        html += '<label>Invoice ID</label>';

        html += '<strong>';
        html += '#' + invoice.invoice_id;
        html += '</strong>';

        html += '</div>';


        html += '<div class="detail">';

        html += '<label>Job ID</label>';

        html += '<strong>';
        html += '#' + invoice.job_id;
        html += '</strong>';

        html += '</div>';


        html += '</div>';


        html += '<div class="amount-section">';

        html += '<div class="amount-label">';
        html += 'Total Amount';
        html += '</div>';

        html += '<div class="amount">';
        html += '₹ ' + Number(invoice.amount).toFixed(2);
        html += '</div>';

        html += '</div>';

        if (
    invoice.payment_status === "PENDING" ||
    invoice.payment_status === "PARTIAL"
) {
    html += '<button class="pay-btn" ';
    html += 'onclick="payInvoice(' +
            invoice.invoice_id +
            ')">';
    html += 'Pay Now';
    html += '</button>';
}

        html += '<button class="print-btn" ';
        html += 'onclick="printInvoice(' + invoice.invoice_id + ')">';
        html += 'Print Invoice';
        html += '</button>';


        card.innerHTML = html;

        container.appendChild(card);

    });

}

async function printInvoice(invoiceId) {

    try {

        const response = await fetch(
           `${API_CONFIG.BASE_URL}/printInvoice/` + invoiceId,
            {
                method: "GET",
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error("Unable to get invoice");
        }

        const invoice = await response.json();

        const printWindow = window.open(
            "",
            "_blank",
            "width=800,height=600"
        );

        if (!printWindow) {
            alert("Please allow pop-ups for this website.");
            return;
        }

        printWindow.document.open();

        printWindow.document.write(
            "<html>" +
            "<head>" +
            "<title>Invoice</title>" +

            "<style>" +

            "body {" +
                "font-family: Arial, sans-serif;" +
                "padding: 40px;" +
            "}" +

            ".invoice {" +
                "max-width: 700px;" +
                "margin: auto;" +
                "border: 1px solid #ddd;" +
                "padding: 30px;" +
            "}" +

            "h1 {" +
                "text-align: center;" +
            "}" +

            ".row {" +
                "display: flex;" +
                "justify-content: space-between;" +
                "padding: 15px 0;" +
                "border-bottom: 1px solid #eee;" +
            "}" +

            ".total {" +
                "font-size: 22px;" +
                "font-weight: bold;" +
            "}" +

            "</style>" +

            "</head>" +

            "<body>" +

            "<div class='invoice'>" +

            "<h1>SMART TOOL ROOM</h1>" +

            "<h2>Invoice</h2>" +

            "<div class='row'>" +
                "<span>Invoice ID</span>" +
                "<strong>#" + invoice.invoice_id + "</strong>" +
            "</div>" +

            "<div class='row'>" +
                "<span>Job ID</span>" +
                "<strong>#" + invoice.job_id + "</strong>" +
            "</div>" +

            "<div class='row total'>" +
                "<span>Total Amount</span>" +
                "<span>₹ " +
                Number(invoice.amount).toFixed(2) +
                "</span>" +
            "</div>" +

            "</div>" +

            "</body>" +

            "</html>"
        );

        printWindow.document.close();

        setTimeout(function () {
            printWindow.print();
        }, 500);

    }
    catch (error) {

        console.error("Print Invoice Error:", error);

        alert("Unable to print invoice.");

    }

}

async function payInvoice(invoiceId) {

    try {

        const response = await fetch(
            `${API_CONFIG.BASE_URL}/createPaymentOrder/` +
            invoiceId,
            {
                method: "POST",
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error(
                "Unable to create payment order."
            );
        }

        const order =
            await response.json();

        const options = {

            key: "YOUR_RAZORPAY_TEST_KEY_ID",

            amount: order.amount,

            currency: order.currency,

            name: "YantraX",

            description:
                "Payment for Invoice " +
                order.invoiceNo,

            order_id: order.orderId,

            handler: async function (response) {

                await verifyPayment(
                    order.invoiceId,
                    response
                );
            },

            theme: {
                color: "#3399cc"
            }
        };

        const razorpay =
            new Razorpay(options);

        razorpay.on(
            "payment.failed",
            function (response) {

                console.error(
                    "Payment Failed:",
                    response.error
                );

                alert(
                    "Payment failed. Please try again."
                );
            }
        );

        razorpay.open();

    } catch (error) {

        console.error(
            "Payment Error:",
            error
        );

        alert(
            "Unable to start payment."
        );
    }
}

async function verifyPayment(
    invoiceId,
    razorpayResponse
) {

    try {

        const requestData = {

            invoiceId: invoiceId,

            razorpayOrderId:
                razorpayResponse.razorpay_order_id,

            razorpayPaymentId:
                razorpayResponse.razorpay_payment_id,

            razorpaySignature:
                razorpayResponse.razorpay_signature,

            paymentMethod:
                "ONLINE"
        };

        const response = await fetch(
           `${API_CONFIG.BASE_URL}/verifyCustomerPayment`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                credentials: "include",

                body:
                    JSON.stringify(requestData)
            }
        );

        const result =
            await response.text();

        if (result === "PAYMENT_SUCCESS") {

            alert(
                "Payment successful!"
            );

            location.reload();

        } else if (
            result === "PAYMENT_VERIFICATION_FAILED"
        ) {

            alert(
                "Payment verification failed."
            );

        } else if (
            result === "SESSION_EXPIRED"
        ) {

            alert(
                "Session expired. Please login again."
            );

        } else {

            alert(
                "Payment could not be completed."
            );
        }

    } catch (error) {

        console.error(
            "Verification Error:",
            error
        );

        alert(
            "Unable to verify payment."
        );
    }
}

