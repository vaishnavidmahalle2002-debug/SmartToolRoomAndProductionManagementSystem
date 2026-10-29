 const API_BASE_URL = API_CONFIG.BASE_URL;


// =====================================================
// PAGE LOAD
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    loadCustomers();

    const form = document.getElementById("createJobForm");

    if (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            createJob();

        });

    }

});


// =====================================================
// LOAD CUSTOMERS
// =====================================================

function loadCustomers() {

    const customerSelect =
        document.getElementById("customer_id");

    if (!customerSelect) {

        console.error("Customer dropdown not found.");

        return;
    }

    fetch(API_BASE_URL + "/viewallCustomers", {

        method: "GET",

        credentials: "include"

    })

    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Failed to load customers. HTTP Status: " +
                response.status
            );

        }

        return response.json();

    })

    .then(customers => {

        customerSelect.innerHTML =
            '<option value="">Select Customer</option>';

        if (!customers || customers.length === 0) {

            customerSelect.innerHTML =
                '<option value="">No customers available</option>';

            return;
        }

        customers.forEach(customer => {

            const option =
                document.createElement("option");

            option.value =
                customer.customer_id;

            const customerName =
                customer.fullName ||
                customer.name ||
                "Unnamed Customer";

            const companyName =
                customer.companyName ||
                customer.company_name ||
                "";

            if (companyName) {

                option.textContent =
                    customerName +
                    " - " +
                    companyName;

            } else {

                option.textContent =
                    customerName;

            }

            customerSelect.appendChild(option);

        });

    })

    .catch(error => {

        console.error(
            "Error loading customers:",
            error
        );

        customerSelect.innerHTML =
            '<option value="">Unable to load customers</option>';

    });

}


// =====================================================
// CREATE JOB
// =====================================================

function createJob() {

    const customerId =
        document.getElementById("customer_id").value;

    const partName =
        document.getElementById("part_name").value.trim();

    const quantity =
        document.getElementById("quantity").value;

    const material =
        document.getElementById("material").value.trim();

    const designFile =
        document.getElementById("design_file").value.trim();

    const status =
        document.getElementById("status").value;


    // =================================================
    // VALIDATION
    // =================================================

    if (!customerId) {

        alert("Please select a customer.");

        return;
    }


    if (!partName) {

        alert("Please enter part name.");

        return;
    }


    if (!quantity || Number(quantity) <= 0) {

        alert("Please enter a valid quantity.");

        return;
    }


    // =================================================
    // JOB OBJECT
    // =================================================

    const job = {

        customer_id: Number(customerId),

        worker_id: null,

        machine_id: null,

        part_name: partName,

        quantity: Number(quantity),

        material: material,

        design_file: designFile,

        status: status || "Pending"

    };


    console.log(
        "Sending Job:",
        job
    );


    // =================================================
    // API CALL
    // =================================================

    fetch(API_BASE_URL + "/addJob", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        credentials: "include",

        body: JSON.stringify(job)

    })

    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Job creation failed. HTTP Status: " +
                response.status
            );

        }

        return response.text();

    })

    .then(message => {

        console.log(
            "Server Response:",
            message
        );


        alert(message);


        if (
            message
                .toLowerCase()
                .includes("success")
        ) {

            document
                .getElementById("createJobForm")
                .reset();

        }

    })

    .catch(error => {

        console.error(
            "Create Job Error:",
            error
        );

        alert(
            "Unable to create job.\n\n" +
            "Please check the server console."
        );

    });

}

function goBackToDashboard() {
    window.location.href = "adminDashboard.jsp";
}