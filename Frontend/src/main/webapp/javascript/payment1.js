/**
 * 
 */
 
 document.addEventListener("DOMContentLoaded", function () {

    loadCustomer();

});


/* =====================================================
   GET LOGGED-IN CUSTOMER
===================================================== */

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


        loadPaymentData(customer.customer_id);

    }
    catch (error) {

        console.error(
            "Customer Error:",
            error
        );

        document.getElementById(
            "paymentContainer"
        ).innerHTML =
            '<div class="error">' +
            error.message +
            '</div>';

    }

}


/* =====================================================
   LOAD CUSTOMER PAYMENT DATA
===================================================== */

async function loadPaymentData(customerId) {

    try {

        /*
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
         * Get all invoices
         */

        const invoiceResponse = await fetch(
            `${API_CONFIG.BASE_URL}/viewallInvoice/`,
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
         * Find customer's job IDs
         */

        const customerJobIds =
            jobs.map(function (job) {

                return Number(job.job_id);

            });


        /*
         * Find customer's invoices
         */

        const customerInvoices =
            invoices.filter(function (invoice) {

                return customerJobIds.includes(
                    Number(invoice.job_id)
                );

            });


        /*
         * Get payment history
         */

        const paymentResponse = await fetch(
`${API_CONFIG.BASE_URL}/paymentHistory/`,
            {
                method: "GET",
                credentials: "include"
            }
        );


        if (!paymentResponse.ok) {

            throw new Error(
                "Unable to load payment history."
            );

        }


        const payments =
            await paymentResponse.json();


        /*
         * Display customer's payments
         */

        displayPayments(
            customerInvoices,
            payments
        );

    }
    catch (error) {

        console.error(
            "Payment Error:",
            error
        );

        document.getElementById(
            "paymentContainer"
        ).innerHTML =
            '<div class="error">' +
            error.message +
            '</div>';

    }

}


/* =====================================================
   DISPLAY PAYMENTS
===================================================== */

async function displayPayments(
    invoices,
    payments
) {

    const container =
        document.getElementById(
            "paymentContainer"
        );


    if (!invoices ||
        invoices.length === 0) {

        container.innerHTML =
            '<div class="empty">' +
            'No invoices found for your orders.' +
            '</div>';

        return;
    }


    container.innerHTML = "";


    /*
     * Process every invoice
     */

    for (let i = 0; i < invoices.length; i++) {

        const invoice = invoices[i];


        /*
         * Find payments belonging
         * to this invoice
         */

        const invoicePayments =
            payments.filter(function (payment) {

                return Number(payment.invoice_id) ===
                       Number(invoice.invoice_id);

            });


        /*
         * Calculate paid amount
         */

        let paidAmount = 0;


        invoicePayments.forEach(
            function (payment) {

                paidAmount +=
                    Number(payment.amount || 0);

            }
        );


        /*
         * Calculate due amount
         */

        const invoiceAmount =
            Number(invoice.amount || 0);


        let dueAmount =
            invoiceAmount - paidAmount;


        /*
         * Prevent negative due
         */

        if (dueAmount < 0) {

            dueAmount = 0;

        }


        /*
         * Determine status
         */

        let status = "";
        let statusClass = "";


        if (dueAmount === 0) {

            status = "Paid";
            statusClass = "status-paid";

        }
        else if (paidAmount > 0) {

            status = "Partial";
            statusClass = "status-partial";

        }
        else {

            status = "Payment Due";
            statusClass = "status-due";

        }


        /*
         * Create payment card
         */

        const card =
            document.createElement("div");


        card.className =
            "payment-card";


        let html = "";


        html += '<div class="payment-header">';

        html += '<div>';

        html += '<div class="payment-title">';
        html += 'Invoice Payment';
        html += '</div>';

        html += '<div class="payment-id">';
        html += 'Invoice #' + invoice.invoice_id;
        html += '</div>';

        html += '</div>';


        html += '<span class="payment-status ';
        html += statusClass;
        html += '">';
        html += status;
        html += '</span>';


        html += '</div>';


        html += '<div class="payment-details">';


        html += '<div class="detail">';

        html += '<label>Invoice Amount</label>';

        html += '<strong class="invoice-amount">';
        html += '₹ ' +
            invoiceAmount.toFixed(2);
        html += '</strong>';

        html += '</div>';


        html += '<div class="detail">';

        html += '<label>Paid Amount</label>';

        html += '<strong class="paid-amount">';
        html += '₹ ' +
            paidAmount.toFixed(2);
        html += '</strong>';

        html += '</div>';


        html += '<div class="detail">';

        html += '<label>Remaining Due</label>';

        html += '<strong class="due-amount">';
        html += '₹ ' +
            dueAmount.toFixed(2);
        html += '</strong>';

        html += '</div>';


        html += '</div>';


        /*
         * Payment form only when
         * amount is still due
         */

        if (dueAmount > 0) {

            html += '<div class="make-payment">';

            html += '<h3>Make Payment</h3>';

            html += '<input ';
            html += 'type="number" ';
            html += 'class="payment-input" ';
            html += 'id="amount-' +
                invoice.invoice_id +
                '" ';
            html += 'placeholder="Enter amount" ';
            html += 'min="1" ';
            html += 'max="' +
                dueAmount +
                '">';


            html += '<button ';
            html += 'class="pay-btn" ';
            html += 'onclick="makePayment(' +
                invoice.invoice_id +
                ',' +
                dueAmount +
                ')">';

            html += 'Pay Now';

            html += '</button>';

            html += '</div>';

        }


        card.innerHTML = html;


        container.appendChild(card);

    }

}


/* =====================================================
   MAKE PAYMENT
===================================================== */

async function makePayment(
    invoiceId,
    dueAmount
) {

    const input =
        document.getElementById(
            "amount-" + invoiceId
        );


    const amount =
        Number(input.value);


    /*
     * Validate amount
     */

    if (!amount ||
        amount <= 0) {

        alert(
            "Please enter a valid payment amount."
        );

        return;

    }


    /*
     * Don't allow payment
     * greater than due
     */

    if (amount > dueAmount) {

        alert(
            "Payment cannot be greater than ₹ "
            + dueAmount.toFixed(2)
        );

        return;

    }


    try {

        const response = await fetch(
           `${API_CONFIG.BASE_URL}/receivePayment/`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                credentials: "include",

                body: JSON.stringify({

                    invoice_id: invoiceId,

                    amount: amount

                })
            }
        );


        const message =
            await response.text();


        if (!response.ok) {

            throw new Error(message);

        }


        alert(message);


        /*
         * Refresh payment information
         */

        loadCustomer();

    }
    catch (error) {

        console.error(
            "Payment Error:",
            error
        );

        alert(
            "Payment failed: " +
            error.message
        );

    }

}