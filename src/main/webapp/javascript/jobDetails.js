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
            throw new Error("Session expired. Please login again.");
        }

        const user = await sessionResponse.json();

        if (!user || !user.user_id) {
            throw new Error("User session not found.");
        }


        const customerResponse = await fetch(
            `${API_CONFIG.BASE_URL}/customer/user/` + user.user_id,
            {
                method: "GET",
                credentials: "include"
            }
        );

        if (!customerResponse.ok) {
            throw new Error("Customer details not found.");
        }

        const customer = await customerResponse.json();

        if (!customer || !customer.customer_id) {
            throw new Error("Customer record not found.");
        }


        loadJobs(customer.customer_id);

    }
    catch (error) {

        console.error(error);

        document.getElementById("jobsContainer").innerHTML =
            `<div class="empty">${error.message}</div>`;
    }
}


async function loadJobs(customerId) {

    try {

        const response = await fetch(
           `${API_CONFIG.BASE_URL}/viewJobByCustomer/` + customerId,
            {
                method: "GET",
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error("Unable to load job details.");
        }

        const jobs = await response.json();

        displayJobs(jobs);

    }
    catch (error) {

        console.error(error);

        document.getElementById("jobsContainer").innerHTML =
            `<div class="empty">${error.message}</div>`;
    }
}


function displayJobs(jobs) {

    const container =
        document.getElementById("jobsContainer");


    if (!jobs || jobs.length === 0) {

        container.innerHTML =
            `<div class="empty">
                You don't have any job orders.
             </div>`;

        return;
    }


    container.innerHTML = "";


    jobs.forEach(function(job) {

        let statusClass = "pending";

        if (job.status &&
            job.status.toLowerCase().includes("progress")) {

            statusClass = "progress";

        }
        else if (job.status &&
                 job.status.toLowerCase() === "completed") {

            statusClass = "completed";
        }


        const card =
            document.createElement("div");

        card.className = "job-card";


        card.innerHTML = `

            <div class="job-header">

                <div class="job-id">
                    Job #${job.job_id}
                </div>

                <div class="status ${statusClass}">
                    ${job.status || "Pending"}
                </div>

            </div>


            <div class="details-grid">

                <div class="detail">
                    <label>Part Name</label>
                    <strong>
                        ${job.part_name || "-"}
                    </strong>
                </div>


                <div class="detail">
                    <label>Quantity</label>
                    <strong>
                        ${job.quantity ?? "-"}
                    </strong>
                </div>


                <div class="detail">
                    <label>Material</label>
                    <strong>
                        ${job.material || "-"}
                    </strong>
                </div>


                <div class="detail">
                    <label>Worker ID</label>
                    <strong>
                        ${job.worker_id ?? "Not Assigned"}
                    </strong>
                </div>


                <div class="detail">
                    <label>Machine ID</label>
                    <strong>
                        ${job.machine_id ?? "Not Assigned"}
                    </strong>
                </div>


                <div class="detail">
                    <label>Design File</label>
                    <strong>
                        ${job.design_file || "Not Uploaded"}
                    </strong>
                </div>

            </div>

        `;


        container.appendChild(card);

    });
}