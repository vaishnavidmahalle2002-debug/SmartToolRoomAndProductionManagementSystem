
/* =========================================================
   GLOBAL CONFIGURATION
========================================================= */

const CONTEXT_PATH = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 1));

const API_BASE = API_CONFIG.BASE_URL;


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Admin Dashboard JS loaded successfully!");

    initializeSidebar();

    initializeNavigation();

    initializeSearch();

    initializeNotifications();

    initializeQuickActions();

    initializeModals();

    initializeDashboard();
    
    initializeProductionIntelligence();

    initializeManagementSections();

    initializeLogout();

    setCurrentDate();

    // Load dynamic Job Status
    loadDashboardJobStatus();
    
    loadRecentJobOrders();
    
    loadDashboardMachines();
    
     loadDashboardMaterials();
     
      loadInvoices();
      
      loadPaymentManagement();
      
      loadUserRoleCounts();
      
       initializeContactSupport();
       
       loadJobStatusTracking();
      
     


});


// =====================================================
// LOAD DASHBOARD ALERTS
// =====================================================

async function loadAlerts() {

    const alertsList =
        document.getElementById(
            "dashboardAlertsList"
        );

    const alertCount =
        document.getElementById(
            "dashboardAlertCount"
        );

    if (!alertsList) {
        return;
    }

    try {

        // =================================================
        // LOAD ALL REQUIRED DATA
        // =================================================

        const [
            materialResponse,
            machineResponse,
            jobResponse,
            invoiceResponse,
            paymentResponse
        ] = await Promise.all([

            fetch(
                `${API_CONFIG.BASE_URL}/material`
            ),

            fetch(
                `${API_CONFIG.BASE_URL}/viewallMachines`
            ),

            fetch(
                `${API_CONFIG.BASE_URL}/viewallJob`
            ),

            fetch(
                `${API_CONFIG.BASE_URL}/viewallInvoice`
            ),

            fetch(
                `${API_CONFIG.BASE_URL}/paymentHistory`
            )

        ]);


        // =================================================
        // CHECK RESPONSES
        // =================================================

        if (!materialResponse.ok) {
            throw new Error(
                "Unable to load materials"
            );
        }

        if (!machineResponse.ok) {
            throw new Error(
                "Unable to load machines"
            );
        }

        if (!jobResponse.ok) {
            throw new Error(
                "Unable to load jobs"
            );
        }

        if (!invoiceResponse.ok) {
            throw new Error(
                "Unable to load invoices"
            );
        }

        if (!paymentResponse.ok) {
            throw new Error(
                "Unable to load payments"
            );
        }


        // =================================================
        // CONVERT RESPONSE TO JSON
        // =================================================

        const materials =
            await materialResponse.json();

        const machines =
            await machineResponse.json();

        const jobs =
            await jobResponse.json();

        const invoices =
            await invoiceResponse.json();

        const payments =
            await paymentResponse.json();


        // =================================================
        // ALERT ARRAY
        // =================================================

        const alerts = [];


        // =================================================
        // 1. LOW MATERIAL STOCK
        // =================================================

        if (Array.isArray(materials)) {

            materials.forEach(function (material) {

                const quantity =
                    Number(
                        material.quantity || 0
                    );

                const minimumStock =
                    Number(
                        material.minimum_stock ??
                        material.minimumStock ??
                        0
                    );

                const materialName =
                    material.material_name ||
                    material.materialName ||
                    "Material";


                if (
                    minimumStock > 0 &&
                    quantity <= minimumStock
                ) {

                    alerts.push({

                        type: "warning",

                        icon: "bi bi-box-seam",

                        title: "Low Material Stock",

                        message:
                            materialName +
                            " below minimum level"

                    });

                }

            });

        }


        // =================================================
        // 2. MACHINE MAINTENANCE
        // =================================================

        if (Array.isArray(machines)) {

            machines.forEach(function (machine) {

                const status =
                    String(
                        machine.status ||
                        machine.machine_status ||
                        machine.machineStatus ||
                        ""
                    ).toLowerCase();

                const machineName =
                    machine.machine_name ||
                    machine.machineName ||
                    machine.name ||
                    "Machine";


                if (
                    status.includes("maintenance") ||
                    status.includes("maintain")
                ) {

                    alerts.push({

                        type: "danger",

                        icon: "bi bi-gear",

                        title: "Machine Maintenance",

                        message:
                            machineName +
                            " needs service"

                    });

                }

            });

        }


        // =================================================
        // 3. PENDING PAYMENTS
        // =================================================

        if (
            Array.isArray(invoices) &&
            Array.isArray(payments)
        ) {

            let pendingPaymentCount = 0;

            invoices.forEach(function (invoice) {

                const invoiceId =
                    Number(
                        invoice.invoice_id ??
                        invoice.invoiceId ??
                        0
                    );

                const invoiceAmount =
                    Number(
                        invoice.amount || 0
                    );


                // Find payments for this invoice

                const paidAmount =
                    payments

                        .filter(function (payment) {

                            return Number(
                                payment.invoice_id ??
                                payment.invoiceId ??
                                0
                            ) === invoiceId;

                        })

                        .reduce(function (
                            total,
                            payment
                        ) {

                            return total +
                                Number(
                                    payment.amount || 0
                                );

                        }, 0);


                const remainingAmount =
                    invoiceAmount -
                    paidAmount;


                if (remainingAmount > 0) {

                    pendingPaymentCount++;

                }

            });


            if (pendingPaymentCount > 0) {

                alerts.push({

                    type: "info",

                    icon: "bi bi-cash-coin",

                    title: "Pending Payments",

                    message:
                        pendingPaymentCount +
                        (
                            pendingPaymentCount === 1
                                ? " payment awaiting"
                                : " payments awaiting"
                        )

                });

            }

        }


        // =================================================
        // 4. PENDING JOBS
        // =================================================

        if (Array.isArray(jobs)) {

            let pendingJobCount = 0;

            jobs.forEach(function (job) {

                const status =
                    String(
                        job.status ||
                        job.job_status ||
                        job.jobStatus ||
                        ""
                    ).toLowerCase();


                if (
                    status === "pending"
                ) {

                    pendingJobCount++;

                }

            });


            if (pendingJobCount > 0) {

                alerts.push({

                    type: "warning",

                    icon: "bi bi-clock",

                    title: "Pending Jobs",

                    message:
                        pendingJobCount +
                        (
                            pendingJobCount === 1
                                ? " job needs assignment"
                                : " jobs need assignment"
                        )

                });

            }

        }


        // =================================================
        // SHOW ALERT COUNT
        // =================================================

        if (alertCount) {

            alertCount.textContent =
                alerts.length;

        }


        // =================================================
        // NO ALERTS
        // =================================================

        if (alerts.length === 0) {

            alertsList.innerHTML = `

                <div
                    class="text-center py-3">

                    <small>
                        No alerts at the moment
                    </small>

                </div>

            `;

            return;

        }


        // =================================================
        // SHOW ONLY FIRST 4 ALERTS
        // =================================================

        const displayAlerts =
            alerts.slice(0, 4);


        // =================================================
        // CREATE ALERT HTML
        // =================================================

        alertsList.innerHTML =

            displayAlerts

                .map(function (alert) {

                    let alertClass = "";

                    if (
                        alert.type === "danger"
                    ) {

                        alertClass =
                            "danger-alert";

                    }
                    else if (
                        alert.type === "info"
                    ) {

                        alertClass =
                            "info-alert";

                    }
                    else {

                        alertClass =
                            "warning-alert";

                    }


                    return `

                        <div
                            class="alert-item ${alertClass}">

                            <div
                                class="alert-item-icon">

                                <i
                                    class="bi ${escapeDashboardHtml(
                                        alert.icon
                                    )}">
                                </i>

                            </div>

                            <div>

                                <strong>

                                    ${escapeDashboardHtml(
                                        alert.title
                                    )}

                                </strong>

                                <small>

                                    ${escapeDashboardHtml(
                                        alert.message
                                    )}

                                </small>

                            </div>

                        </div>

                    `;

                })

                .join("");


    }
    catch (error) {

        console.error(
            "Dashboard Alerts Error:",
            error
        );


        // =================================================
        // ERROR MESSAGE
        // =================================================

        if (alertCount) {

            alertCount.textContent = "0";

        }


        alertsList.innerHTML = `

            <div
                class="text-center py-3">

                <small>
                    Unable to load alerts
                </small>

            </div>

        `;

    }

}

// =====================================================
// HTML SAFETY FOR RECENT JOB ORDERS
// =====================================================

function escapeDashboardHtml(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}

/* =========================================================
   SIDEBAR
========================================================= */

function initializeSidebar() {

    const sidebar = document.getElementById("sidebar");

    const mobileMenuBtn = document.getElementById("mobileMenuBtn");

    const sidebarOverlay = document.getElementById("sidebarOverlay");


    if (mobileMenuBtn) { mobileMenuBtn.addEventListener("click", function () {

           if (sidebar) {sidebar.classList.toggle("open");

            }
            if (sidebarOverlay) {sidebarOverlay.classList.toggle("show");

            }
        });
    }


    if (sidebarOverlay) {sidebarOverlay.addEventListener("click", function () {
            closeSidebar();

        });
    }
}


/* =========================================================
   CLOSE MOBILE SIDEBAR
========================================================= */

function closeSidebar() {

    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    if (sidebar) { 
    sidebar.classList.remove("open");
    }

    if (sidebarOverlay) {
    sidebarOverlay.classList.remove("show");
    }
}


/* =========================================================
   SIDEBAR NAVIGATION
========================================================= */

function initializeNavigation() {

    const links = document.querySelectorAll(".sidebar-link");

    links.forEach(function (link) {

        link.addEventListener("click", function (event) {
            event.preventDefault();

            links.forEach(function (item) {
                item.classList.remove("active");

            });

            this.classList.add("active");
            const section =  this.getAttribute("data-section");

            if (section) {
                showSection(section);
            }
            closeSidebar();
        });
    });
}


/* =========================================================
   SHOW SECTION
========================================================= */

function showSection(sectionName) {
    console.log("Opening section:", sectionName);


    /* Dashboard */
    const dashboard = document.getElementById("dashboardSection");

    if (dashboard) {
        dashboard.classList.remove("active-section");
    }


    /* Management sections */
    const sections = document.querySelectorAll(".management-section");
    sections.forEach(function (section) {

        section.classList.remove(
            "active-section"
        );
    });


    /* Requested section */
    const target = document.getElementById(sectionName);
    if (target) {  
            target.classList.add(
            "active-section"
        );
    }


    /* Dashboard */
    if (
        sectionName === "dashboard" ||
        sectionName === "dashboardSection"
    ) {

        if (dashboard) {
            dashboard.classList.add(
                "active-section"
            );
        }
    }
    updatePageTitle(sectionName);
}


// =====================================================
// LOAD DASHBOARD MACHINE STATUS
// =====================================================

async function loadDashboardMachines() {

    const machineList =
        document.getElementById(
            "dashboardMachineList"
        );

    if (!machineList) {
        return;
    }

    try {

        const response = await fetch(
             `${API_CONFIG.BASE_URL}/viewallMachines`
        );

        if (!response.ok) {

            throw new Error(
                "Unable to load machines"
            );

        }

        const machines =
            await response.json();


        if (!machines || machines.length === 0) {

            machineList.innerHTML = `

                <div class="machine-item">

                    <div class="machine-item-left">

                        <div class="machine-icon orange-bg">

                            <i class="bi bi-tools"></i>

                        </div>

                        <div>

                            <strong>
                                No machines found
                            </strong>

                            <small>
                                Production floor
                            </small>

                        </div>

                    </div>

                </div>

            `;

            return;
        }


        // Show latest/first 4 machines
        const recentMachines =
            machines.slice(0, 4);


        machineList.innerHTML =
            recentMachines.map(
                function (machine) {

                    const status =
                        machine.status ||
                        machine.machine_status ||
                        "Available";


                    const normalizedStatus =
                        String(status)
                            .trim()
                            .toLowerCase();


                    let badgeClass =
                        "completed-status";

                    let iconClass =
                        "green-bg";

                    let icon =
                        "bi-gear";


                    if (
                        normalizedStatus ===
                        "in use"
                    ) {

                        badgeClass =
                            "progress-status";

                        iconClass =
                            "pink-bg";

                        icon =
                            "bi-gear-wide-connected";

                    }
                    else if (
                        normalizedStatus ===
                        "maintenance"
                    ) {

                        badgeClass =
                            "pending-status";

                        iconClass =
                            "orange-bg";

                        icon =
                            "bi-tools";

                    }
                    else if (
                        normalizedStatus ===
                        "available"
                    ) {

                        badgeClass =
                            "completed-status";

                        iconClass =
                            "green-bg";

                        icon =
                            "bi-gear";

                    }


                    return `

                        <div class="machine-item">

                            <div class="machine-item-left">

                                <div
                                    class="machine-icon ${iconClass}">

                                    <i
                                        class="bi ${icon}">
                                    </i>

                                </div>

                                <div>

                                    <strong>

                                        ${escapeDashboardHtml(
                                            machine.machine_name ||
                                            machine.name ||
                                            "Machine #" +
                                            (
                                                machine.machine_id ??
                                                "-"
                                            )
                                        )}

                                    </strong>

                                    <small>

                                        ${escapeDashboardHtml(
                                            machine.location ||
                                            "Production Floor"
                                        )}

                                    </small>

                                </div>

                            </div>


                            <span
                                class="status-badge ${badgeClass}">

                                ${escapeDashboardHtml(
                                    status
                                )}

                            </span>

                        </div>

                    `;

                }
            ).join("");

    }
    catch (error) {

        console.error(
            "Machine Status Error:",
            error
        );

        machineList.innerHTML = `

            <div class="machine-item">

                <div class="machine-item-left">

                    <div class="machine-icon orange-bg">

                        <i class="bi bi-exclamation-triangle"></i>

                    </div>

                    <div>

                        <strong>
                            Unable to load machines
                        </strong>

                        <small>
                            Check backend server
                        </small>

                    </div>

                </div>

            </div>

        `;

    }

}

/* =========================================================
   PAGE TITLE
========================================================= */

function updatePageTitle(sectionName) {

    const title = document.getElementById("pageTitle");
    const subtitle = document.getElementById("pageSubtitle");


    if (!title) {
        return;
    }


    const pageData = {
        dashboard: [ "Admin Dashboard","Overview of Smart Tool Room operations"],

        customers: ["Customer Management","Manage registered customers"],

        workers: ["Worker Management","Manage workers and assignments"],

        machines: ["Machine Management","Manage machines and availability"],

        materials: ["Material Management","Manage materials and inventory"],

        jobs: ["Job Order Management", "Manage customer job orders"],

        jobStatus: ["Job Status Tracking","Track and update production jobs"],

        invoices: ["Invoice Management","Manage invoices and billing"],

        payments: ["Payment Management","Track payments and outstanding amounts"],

        reports: ["Reports & Analytics","View business and operational reports"],

        settings: ["Settings","Manage system settings"]
    };


    const data = pageData[sectionName];

    if (data) {
        title.textContent = data[0];
        if (subtitle) {
            subtitle.textContent = data[1];
        }
    }
}


/* =========================================================
   GLOBAL SEARCH
========================================================= */

function initializeSearch() {

    const searchInput = document.getElementById("globalSearch");
    if (!searchInput) {
        return;
    }


    searchInput.addEventListener(
        "input",
        function () {
            const searchText = this.value.toLowerCase().trim();
            filterDashboardTables(searchText);
        }
    );
}


/* =========================================================
   TABLE SEARCH
========================================================= */

function filterDashboardTables(searchText) {

    const rows = document.querySelectorAll(".dashboard-table tbody tr");

    rows.forEach(function (row) {
        const text =row.textContent.toLowerCase();


        if (searchText === "" ||text.includes(searchText))
           {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function initializeNotifications() {

    const notificationButton = document.getElementById("notificationButton");

    if (!notificationButton) {
        return;
    }

    notificationButton.addEventListener(
        "click",
        function () {
            showNotificationPanel();
        }
    );
}


/* =========================================================
   NOTIFICATION PANEL
========================================================= */

function showNotificationPanel() {

    const messages = [ "Low stock material requires attention.",
                       "New customer order received.",
                       "3 pending job orders need assignment.",
                       "Payment is pending for invoice #INV-1024."];

    let message = "Notifications\n\n";
    messages.forEach(function (item, index) {

        message += (index + 1) +  ". " + item + "\n";
    });
    alert(message);
}


/* =========================================================
   QUICK ACTIONS
========================================================= */

function initializeQuickActions() {

    const buttons = document.querySelectorAll("[data-action]" );
    buttons.forEach(function (button) 
    {
        button.addEventListener(
            "click",
            function () {
                const action = this.getAttribute(
                        "data-action"
                    );
                handleQuickAction(action);
            }
        );
    });
}


/* =========================================================
   QUICK ACTION HANDLER
========================================================= */

function handleQuickAction(action) {

    switch (action) {

        case "customer":
            showSection("customers");
            break;


        case "worker":
             showSection("workers");
             loadWorkers();
             break;


        case "machine":
             showSection("machines");
             loadMachines();
             break;


        case "material":
            showSection("materials");
            loadMaterials();
            break;


        case "job":
            showSection("jobs");
            break;


        case "invoice":
            showSection("invoices");
            break;


        case "payment":
            showSection("payments");
            break;


        case "report":
            showSection("reports");
            break;


        default:
            console.log(
                "Unknown quick action:",
                action
            );
    }
}

/* =========================================================
   ADD WORKER
========================================================= */

function openAddWorker() {

    const form = document.getElementById("addWorkerForm");
    if (form) {
        form.reset();
    }


    /* Set default values again after reset */

    const role = document.getElementById("workerRole");
    if (role) {
        role.value = "Worker";
    }


    const status = document.getElementById("workerStatus");
    if (status) {
        status.value = "Active";
    }
    openModal("addWorkerModal");
}

/* =========================================================
   SAVE WORKER
========================================================= */

async function saveWorker() {

    const form = document.getElementById("addWorkerForm");
    const saveButton = document.getElementById("saveWorkerBtn");

    if (!form) {
        console.error( "Add Worker form not found." );
        return;
    }


    /* Browser validation */

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }


    try {
        /* Disable button */
        if (saveButton) {
            saveButton.disabled = true;
            saveButton.innerHTML ='<i class="bi bi-hourglass-split"></i> Saving...';
        }

        const worker = {

            fullName: document.getElementById("workerFullName").value.trim(),
            
            email:document.getElementById("workerEmail" ).value.trim(),

            mobileNo: document.getElementById("workerMobileNo").value.trim(),

            username:document.getElementById("workerUsername").value.trim(),

            password:document.getElementById("workerPassword").value,

            role:document.getElementById("workerRole").value,

            status: document.getElementById("workerStatus" ).value,

            skill:document.getElementById("workerSkill" ).value.trim(),

            salary: parseFloat(document.getElementById("workerSalary" ).value ),

            profilePhoto: null
        };


        console.log( "Adding worker:",worker );


        const response = await fetch(API_BASE + "/addWorker",
        {
           method: "POST",
           headers: {
                     "Content-Type":"application/json"
                    },

                    credentials: "include",
                    body:
                        JSON.stringify(worker)
                }
            );

        if (!response.ok) {
            let errorMessage = "Unable to add worker.";

            try {
                const errorText = await response.text();

                if (errorText) {
                    errorMessage = errorText;
                }

            } catch (e) {
                console.error(
                    "Could not read error response:",e
                );
            }
            throw new Error(errorMessage);
        }

        const result = await response.text();

console.log("Worker response:", result);

if (result.toLowerCase().includes("not added")) {
    throw new Error(result);
}

closeModal("addWorkerModal");
form.reset();

showSuccess("Worker added successfully.");

await loadWorkers();


        


    } catch (error) {

        console.error(
            "Add worker error:",
            error
        );


        showError(
            error.message ||
            "Unable to add worker."
        );


    } finally {

        /* Enable button */

        if (saveButton) {

            saveButton.disabled = false;

            saveButton.innerHTML =
                '<i class="bi bi-check-lg"></i> Save Worker';

        }

    }

}


/* =========================================================
   MODALS
========================================================= */

function initializeModals() {

    const modalButtons =
        document.querySelectorAll(
            "[data-modal]"
        );


    modalButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const modalId =
                    this.getAttribute(
                        "data-modal"
                    );


                openModal(modalId);

            }
        );

    });

}


/* =========================================================
   OPEN MODAL
========================================================= */

function openModal(modalId) {

    const modal =
        document.getElementById(modalId);


    if (!modal) {

        console.warn(
            "Modal not found:",
            modalId
        );

        return;

    }


    if (
        typeof bootstrap !== "undefined" &&
        bootstrap.Modal
    ) {

        const modalInstance =
            bootstrap.Modal.getOrCreateInstance(
                modal
            );

        modalInstance.show();

    } else {

        modal.style.display = "block";

        modal.classList.add("show");

    }

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeModal(modalId) {

    const modal =
        document.getElementById(modalId);


    if (!modal) {

        return;

    }


    if (
        typeof bootstrap !== "undefined" &&
        bootstrap.Modal
    ) {

        const modalInstance =
            bootstrap.Modal.getInstance(
                modal
            );


        if (modalInstance) {

            modalInstance.hide();

        }

    } else {

        modal.style.display = "none";

        modal.classList.remove("show");

    }

}


/* =========================================================

   DASHBOARD INITIALIZATION

========================================================= */

async function initializeDashboard() {

    loadDashboardStatistics();

    loadRecentJobs();

    loadMachines();

    loadMaterials();

    loadAlerts();

    await loadJobStatusSummary();
    
    loadDashboardSummary();
    
    loadRevenueOverview();
    
    loadPaymentSummary();

}


/* =========================================================
   LOAD DASHBOARD STATISTICS
========================================================= */

async function loadDashboardStatistics() {

    try { 
        console.log(
            "Loading dashboard statistics..."
        );

    } catch (error) {

        console.error(
            "Dashboard statistics error:",
            error
        );

    }

}


/* =========================================================
   UPDATE COUNTER
========================================================= */

function updateCounter(
    elementId,
    value
) {

    const element =
        document.getElementById(elementId);


    if (element) {

        element.textContent = value;

    }

}


/* =========================================================
   LOAD RECENT JOBS
========================================================= */

async function loadRecentJobs() {

    try {

        const response =
            await fetch(
                API_BASE +
                "/viewAssignedJobs"
            );


        if (!response.ok) {

            console.warn(
                "Could not load recent jobs:",
                response.status
            );

            return;

        }


        const jobs =
            await response.json();


        console.log(
            "Jobs loaded:",
            jobs
        );


        renderRecentJobs(jobs);


    } catch (error) {

        console.error(
            "Error loading jobs:",
            error
        );

    }

}

/* =========================================================
   LOAD AND DISPLAY ALL CUSTOMERS
========================================================= */

async function loadAndDisplayCustomers() {

    const tableBody =
        document.getElementById(
            "customerTableBody"
        );


    if (!tableBody) {

        console.log(
            "Customer table not available."
        );

        return;
    }


    tableBody.innerHTML = `
        <tr>
            <td colspan="8" class="text-center">
                <i class="bi bi-hourglass-split"></i>
                Loading customers...
            </td>
        </tr>
    `;


    try {

        const customers =
            await loadCustomers();


        if (
            !customers ||
            customers.length === 0
        ) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center">
                        <i class="bi bi-people"></i>
                        No customers found.
                    </td>
                </tr>
            `;

            return;
        }


        tableBody.innerHTML = "";


        customers.forEach(function(customer) {

            const customerId =
                customer.customer_id ??
                customer.customerId ??
                "";


            const userId =
                customer.user_id ??
                customer.userId ??
                "";


            const fullName =
                customer.fullName ??
                "";


            const mobile =
                customer.mobileNo ??
                "";


            const email =
                customer.email ??
                "";


            const company =
                customer.companyName ??
                "";


            const city =
                customer.city ??
                "";


            const gst =
                customer.gstNo ??
                "";


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${escapeCustomerHtml(customerId)}
                </td>


                <td>

                    <div class="customer-name-cell">

                        <strong>
                            ${escapeCustomerHtml(fullName)}
                        </strong>

                        <small>
                            User ID:
                            ${escapeCustomerHtml(userId)}
                        </small>

                    </div>

                </td>


                <td>
                    ${escapeCustomerHtml(mobile)}
                </td>


                <td>
                    ${escapeCustomerHtml(email)}
                </td>


                <td>
                    ${escapeCustomerHtml(company)}
                </td>


                <td>
                    ${escapeCustomerHtml(city)}
                </td>


                <td>
                    ${escapeCustomerHtml(gst)}
                </td>


                <td>

                    <button
                        type="button"
                        class="action-btn view-btn"
                        onclick="viewCustomer(${customerId})"
                        title="View Customer">

                        <i class="bi bi-eye"></i>

                    </button>

                </td>

            `;


            tableBody.appendChild(row);

        });


        initializeCustomerTableSearch();


    } catch (error) {

        console.error(
            "Customer table error:",
            error
        );


        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center text-danger">

                    <i class="bi bi-exclamation-circle"></i>

                    Unable to load customers.

                </td>
            </tr>
        `;

    }

}


/* =========================================================
   CUSTOMER HTML ESCAPE
========================================================= */

function escapeCustomerHtml(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   CUSTOMER TABLE SEARCH
========================================================= */

function initializeCustomerTableSearch() {

    const searchInput =
        document.getElementById(
            "customerTableSearch"
        );


    if (!searchInput) {
        return;
    }


    if (
        searchInput.dataset.initialized ===
        "true"
    ) {
        return;
    }


    searchInput.dataset.initialized =
        "true";


    searchInput.addEventListener(
        "input",
        function() {

            const searchText =
                this.value
                    .toLowerCase()
                    .trim();


            const rows =
                document.querySelectorAll(
                    "#customerTableBody tr"
                );


            rows.forEach(function(row) {

                const rowText =
                    row.textContent
                        .toLowerCase();


                if (
                    searchText === "" ||
                    rowText.includes(searchText)
                ) {

                    row.style.display = "";

                } else {

                    row.style.display =
                        "none";

                }

            });

        }
    );

}

/* =========================================================
   OPEN CUSTOMER MANAGEMENT
========================================================= */

function openCustomerManagement() {

    showSection("customers");

    loadAndDisplayCustomers();

}


/* =========================================================
   RENDER RECENT JOBS
========================================================= */

function renderRecentJobs(jobs) {

    const tbody =
        document.getElementById(
            "recentJobsBody"
        );


    if (!tbody) {

        return;

    }


    tbody.innerHTML = "";


    if (
        !jobs ||
        jobs.length === 0
    ) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="text-center"
                >

                    No jobs available

                </td>

            </tr>

        `;

        return;

    }


    jobs.slice(0, 5).forEach(function (job) {

        const row =
            document.createElement("tr");


        const jobId =
            job.job_id ??
            job.jobId ??
            "-";


        const customer =
            job.customer_name ??
            job.customerName ??
            "-";


        const status =
            job.status ??
            job.job_status ??
            "Pending";


        row.innerHTML = `

            <td>

                <strong class="job-id">
                    #${escapeHtml(jobId)}
                </strong>

            </td>

            <td>
                ${escapeHtml(customer)}
            </td>

            <td>
                ${escapeHtml(
                    job.machine_name ??
                    job.machineName ??
                    "-"
                )}
            </td>

            <td>
                ${escapeHtml(
                    job.worker_name ??
                    job.workerName ??
                    "-"
                )}
            </td>

            <td>

                <span class="status-badge
                    ${getStatusClass(status)}">

                    ${escapeHtml(status)}

                </span>

            </td>

            <td>

                <button
                    class="table-action"
                    onclick="viewJob('${escapeHtml(jobId)}')">

                    <i class="bi bi-eye"></i>

                </button>

            </td>

        `;


        tbody.appendChild(row);

    });

}


/* =========================================================
   JOB STATUS CLASS
========================================================= */

function getStatusClass(status) {

    const value =
        String(status)
            .toLowerCase();


    if (
        value.includes("complete") ||
        value.includes("delivered")
    ) {

        return "completed-status";

    }


    if (
        value.includes("progress") ||
        value.includes("production")
    ) {

        return "progress-status";

    }


    return "pending-status";

}


/* =========================================================
   VIEW JOB
========================================================= */

function viewJob(jobId) {

    console.log(
        "View job:",
        jobId
    );


    showSection("jobs");

}


/* =========================================================
   LOAD ALL MACHINES
========================================================= */
async function loadMachines() {

    try {

        const response = await fetch(
            API_BASE + "/viewallMachines",
            {
                method: "GET",
                credentials: "include"
            }
        );

        if (!response.ok) {

            throw new Error(
                "Machine API error: " +
                response.status
            );
        }

        const machines =
            await response.json();

        console.log(
            "Machines loaded:",
            machines
        );

        if (!Array.isArray(machines)) {

            throw new Error(
                "Machine API did not return an array."
            );
        }

        /* ===============================
           TOTAL MACHINES
        =============================== */

        updateCounter(
            "machineCount",
            machines.length
        );

        updateCounter(
            "totalMachines",
            machines.length
        );


        /* ===============================
           AVAILABLE MACHINES
        =============================== */

        const availableMachines =
            machines.filter(function(machine) {

                const status =
                    String(
                        machine.status ??
                        machine.machine_status ??
                        ""
                    ).toLowerCase();

                return status === "available";
            });


        /* ===============================
           MAINTENANCE MACHINES
        =============================== */

        const maintenanceMachines =
            machines.filter(function(machine) {

                const status =
                    String(
                        machine.status ??
                        machine.machine_status ??
                        ""
                    ).toLowerCase();

                return status.includes(
                    "maintenance"
                );
            });


        updateCounter(
            "availableMachineCount",
            availableMachines.length
        );

        updateCounter(
            "maintenanceMachineCount",
            maintenanceMachines.length
        );


        /* ===============================
           DASHBOARD MACHINE LIST
        =============================== */

        renderMachines(
            machines
        );


        /* ===============================
           MACHINE MANAGEMENT TABLE
        =============================== */

        renderMachineTable(
            machines
        );


        return machines;


    } catch (error) {

        console.error(
            "Machine loading error:",
            error
        );

        const tableBody =
            document.getElementById(
                "machineTableBody"
            );

        if (tableBody) {

            tableBody.innerHTML = `
                <tr>
                    <td
                        colspan="5"
                        class="text-center text-danger"
                    >
                        <i class="bi bi-exclamation-circle"></i>
                        Unable to load machines.
                    </td>
                </tr>
            `;
        }

        return [];
    }
}
             
 /* =========================================================
   RENDER MACHINE TABLE
========================================================= */

function renderMachineTable(machines) {

    const tableBody =
        document.getElementById(
            "machineTableBody"
        );


    if (!tableBody) {

        return;

    }


    tableBody.innerHTML = "";


    if (
        !machines ||
        machines.length === 0
    ) {

        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="text-center"
                >

                    <i class="bi bi-gear"></i>

                    No machines found.

                </td>

            </tr>

        `;

        return;

    }


    machines.forEach(function(machine) {


        const machineId =
            machine.machine_id ??
            machine.machineId ??
            "";


        const machineName =
            machine.machine_name ??
            machine.machineName ??
            "-";


        const machineType =
            machine.machine_type ??
            machine.machineType ??
            "-";


        const status =
            machine.status ??
            machine.machine_status ??
            "Available";


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                ${escapeHtml(machineId)}

            </td>


            <td>

                <strong>

                    ${escapeHtml(machineName)}

                </strong>

            </td>


            <td>

                ${escapeHtml(machineType)}

            </td>


            <td>

                <span class="
                    status-badge
                    ${getStatusClass(status)}
                ">

                    ${escapeHtml(status)}

                </span>

            </td>


            <td>

                <button
                    type="button"
                    class="action-btn view-btn"
                    onclick="viewMachine('${escapeHtml(machineId)}')"
                    title="View Machine">

                    <i class="bi bi-eye"></i>

                </button>


                <button
                    type="button"
                    class="action-btn delete-btn"
                    onclick="deleteMachine('${escapeHtml(machineId)}')"
                    title="Delete Machine">

                    <i class="bi bi-trash"></i>

                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });


    initializeMachineTableSearch();

}

/* =========================================================
   OPEN MACHINE MANAGEMENT
========================================================= */

function openMachineManagement() {

    showSection(
        "machines"
    );


    loadMachines();

}

/* =========================================================
   MACHINE TABLE SEARCH
========================================================= */

function initializeMachineTableSearch() {

    const searchInput =
        document.getElementById(
            "machineTableSearch"
        );


    if (!searchInput) {

        return;

    }


    if (
        searchInput.dataset.initialized ===
        "true"
    ) {

        return;

    }


    searchInput.dataset.initialized =
        "true";


    searchInput.addEventListener(
        "input",
        function () {

            const searchText =
                this.value
                    .toLowerCase()
                    .trim();


            const rows =
                document.querySelectorAll(
                    "#machineTableBody tr"
                );


            rows.forEach(
                function (row) {

                    const rowText =
                        row.textContent
                            .toLowerCase();


                    if (
                        searchText === "" ||
                        rowText.includes(
                            searchText
                        )
                    ) {

                        row.style.display =
                            "";

                    } else {

                        row.style.display =
                            "none";

                    }

                }
            );

        }
    );

}

/* =========================================================
   REFRESH MACHINE COUNT
========================================================= */

async function refreshMachineCount() {

    try {

        const response =
            await fetch(
                API_BASE +
                "/viewallMachines",
                {
                    credentials: "include"
                }
            );


        if (!response.ok) {

            return;

        }


        const machines =
            await response.json();


        updateCounter(
            "machineCount",
            machines.length
        );


        updateCounter(
            "totalMachines",
            machines.length
        );


    } catch (error) {

        console.error(
            "Machine count refresh error:",
            error
        );

    }

}



/* =========================================================
   VIEW MACHINE
========================================================= */

function viewMachine(machineId) {

    if (!machineId) {

        return;

    }


    console.log(
        "View machine:",
        machineId
    );


    window.location.href =
        "machineProfile.jsp?id=" +
        encodeURIComponent(
            machineId
        );

}


/* =========================================================
   RENDER MACHINES
========================================================= */

function renderMachines(machines) {

    const container =
        document.getElementById(
            "machineList"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    machines
        .slice(0, 5)
        .forEach(function (machine) {

            const name =
                machine.machine_name ??
                machine.machineName ??
                "Machine";


            const status =
                machine.status ??
                machine.machine_status ??
                "Available";


            const item =
                document.createElement("div");


            item.className =
                "machine-item";


            item.innerHTML = `

                <div class="machine-item-left">

                    <div class="
                        machine-icon
                        blue-bg
                    ">

                        <i class="
                            bi bi-gear-wide-connected
                        "></i>

                    </div>

                    <div>

                        <strong>
                            ${escapeHtml(name)}
                        </strong>

                        <small>
                            ${escapeHtml(status)}
                        </small>

                    </div>

                </div>

                <span class="
                    status-badge
                    ${getStatusClass(status)}
                ">

                    ${escapeHtml(status)}

                </span>

            `;


            container.appendChild(item);

        });

}


// =========================================================
// MATERIAL MANAGEMENT
// =========================================================

// Backend base URL
var MATERIAL_API = API_CONFIG.BASE_URL;

// Store all materials loaded from backend
let allMaterials = [];


// =========================================================
// OPEN ADD MATERIAL MODAL
// =========================================================

function openAddMaterial() {

    const form = document.getElementById("addMaterialForm");

    if (form) {
        form.reset();
    }

    const modalElement =
        document.getElementById("addMaterialModal");

    if (!modalElement) {

        console.error(
            "addMaterialModal not found"
        );

        return;
    }

    const modal =
        bootstrap.Modal.getOrCreateInstance(
            modalElement
        );

    modal.show();
}

// =========================================================
// LOAD ALL MATERIALS
// =========================================================

async function loadMaterials() {

    try {

        console.log("Loading materials...");

        const response = await fetch(
            MATERIAL_API + "/viewallMaterial",
            {
                method: "GET",
                credentials: "include"
            }
        );

        if (!response.ok) {

            throw new Error(
                "HTTP " + response.status
            );
        }

        const data = await response.json();

        console.log(
            "Materials received:",
            data
        );

        if (!Array.isArray(data)) {

            throw new Error(
                "Material API did not return an array."
            );
        }

        allMaterials = data;

        displayMaterials(allMaterials);

        updateMaterialSummary(allMaterials);

    } catch (error) {

        console.error(
            "Material loading error:",
            error
        );

        const tbody =
            document.getElementById(
                "materialTableBody"
            );

        if (tbody) {

            tbody.innerHTML = `
                <tr>
                    <td
                        colspan="10"
                        class="text-center text-danger">
                        Failed to load materials
                    </td>
                </tr>
            `;
        }
    }
}

// =========================================================
// DISPLAY MATERIAL TABLE
// =========================================================

function displayMaterials(materials) {

    const tbody =
        document.getElementById(
            "materialTableBody"
        );


    if (!tbody) {

        console.warn(
            "materialTableBody not found"
        );

        return;
    }


    if (!Array.isArray(materials)) {

        materials = [];
    }


    // No materials
    if (materials.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td
                    colspan="10"
                    class="text-center">

                    No materials found

                </td>
            </tr>
        `;

        return;
    }


    tbody.innerHTML = "";


    materials.forEach(function(material) {

        const quantity =
            Number(material.quantity || 0);


        const minimumStock =
            Number(material.minimumStock || 0);


        const isLowStock =
            quantity <= minimumStock;


        const statusBadge = isLowStock

            ? `
                <span class="badge bg-warning text-dark">
                    Low Stock
                </span>
              `

            : `
                <span class="badge bg-success">
                    Available
                </span>
              `;


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <!-- MATERIAL ID -->
            <td>
                ${material.materialId ?? ""}
            </td>


            <!-- MATERIAL NAME -->
            <td>

                <strong>
                    ${escapeMaterialHtml(
                        material.materialName
                    )}
                </strong>

            </td>


            <!-- MATERIAL TYPE -->
            <td>
                ${escapeMaterialHtml(
                    material.materialType
                )}
            </td>


            <!-- QUANTITY -->
            <td>
                ${quantity}
            </td>


            <!-- UNIT -->
            <td>
                ${escapeMaterialHtml(
                    material.unit
                )}
            </td>


            <!-- UNIT PRICE -->
            <td>
                ₹${Number(
                    material.unitPrice || 0
                ).toFixed(2)}
            </td>


            <!-- SUPPLIER -->
            <td>
                ${escapeMaterialHtml(
                    material.supplierName
                )}
            </td>


            <!-- MINIMUM STOCK -->
            <td>
                ${minimumStock}
            </td>


            <!-- STATUS -->
            <td>
                ${statusBadge}
            </td>


            <!-- ACTIONS -->
            <td>

                <div class="d-flex gap-1 flex-wrap">

                    <!-- VIEW -->
                    <button
                        type="button"
                        class="btn btn-sm btn-outline-primary"
                        title="View Material"
                        onclick="viewMaterial(${material.materialId})">

                        <i class="bi bi-eye"></i>

                    </button>


                    <!-- EDIT -->
                    <button
                        type="button"
                        class="btn btn-sm btn-outline-warning"
                        title="Edit Material"
                        onclick="openEditMaterial(${material.materialId})">

                        <i class="bi bi-pencil"></i>

                    </button>


                    <!-- CONSUME -->
                    <button
                        type="button"
                        class="btn btn-sm btn-outline-success"
                        title="Consume Material"
                        onclick="openConsumeMaterial(${material.materialId})">

                        <i class="bi bi-box-arrow-down"></i>

                    </button>


                    <!-- DELETE -->
                    <button
                        type="button"
                        class="btn btn-sm btn-outline-danger"
                        title="Delete Material"
                        onclick="deleteMaterial(${material.materialId})">

                        <i class="bi bi-trash"></i>

                    </button>

                </div>

            </td>

        `;


        tbody.appendChild(row);

    });
}

// =========================================================
// SAVE MATERIAL
// =========================================================

async function saveMaterial() {

    const material = {

        materialName: document
            .getElementById("materialName")
            .value
            .trim(),

        materialType: document
            .getElementById("materialType")
            .value
            .trim(),

        unit: document
            .getElementById("materialUnit")
            .value
            .trim(),

        quantity: Number(
            document
                .getElementById("materialQuantity")
                .value
        ),

        unitPrice: Number(
            document
                .getElementById("materialUnitPrice")
                .value
        ),

        supplierName: document
            .getElementById("materialSupplierName")
            .value
            .trim(),

        minimumStock: Number(
            document
                .getElementById("materialMinimumStock")
                .value
        )
    };


    if (!material.materialName) {
        alert("Please enter material name.");
        return;
    }

    if (!material.materialType) {
        alert("Please enter material type.");
        return;
    }

    if (!material.unit) {
        alert("Please enter unit.");
        return;
    }

    if (material.quantity < 0) {
        alert("Quantity cannot be negative.");
        return;
    }

    if (material.unitPrice < 0) {
        alert("Unit price cannot be negative.");
        return;
    }

    if (!material.supplierName) {
        alert("Please enter supplier name.");
        return;
    }

    if (material.minimumStock < 0) {
        alert("Minimum stock cannot be negative.");
        return;
    }


    const url =
        MATERIAL_API + "/addMaterial";


    console.log(
        "ADD MATERIAL URL:",
        url
    );


    try {

        const response = await fetch(
            url,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                credentials: "include",

                body:
                    JSON.stringify(material)
            }
        );


        const message =
            await response.text();


        if (!response.ok) {

            throw new Error(
                message ||
                "HTTP " + response.status
            );
        }


        alert(
            message ||
            "Material added successfully"
        );


        const form =
            document.getElementById(
                "addMaterialForm"
            );

        if (form) {
            form.reset();
        }


        const modalElement =
            document.getElementById(
                "addMaterialModal"
            );


        if (modalElement) {

            const modal =
                bootstrap.Modal.getInstance(
                    modalElement
                );

            if (modal) {
                modal.hide();
            }
        }


        await loadMaterials();


        if (
            typeof loadMaterialStock ===
            "function"
        ) {

            await loadMaterialStock();
        }


    } catch (error) {

        console.error(
            "Error adding material:",
            error
        );

        alert(
            "Failed to add material:\n\n" +
            error.message
        );
    }
}


// =========================================================
// VIEW MATERIAL
// =========================================================

async function viewMaterial(materialId) {

    try {

        const response =
            await fetch(
                MATERIAL_API +
                "/viewMaterial/" +
                materialId,
                {
                    method: "GET",
                    credentials: "include"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Material not found"
            );
        }


        const material =
            await response.json();


        const quantity =
            Number(
                material.quantity || 0
            );


        const minimumStock =
            Number(
                material.minimumStock || 0
            );


        const status =
            quantity <= minimumStock

                ? "Low Stock"

                : "Stock Available";


        alert(

            "MATERIAL DETAILS\n\n" +

            "Material ID: " +
            material.materialId +

            "\nMaterial Name: " +
            material.materialName +

            "\nMaterial Type: " +
            material.materialType +

            "\nQuantity: " +
            quantity +
            " " +
            material.unit +

            "\nUnit Price: ₹" +
            Number(
                material.unitPrice || 0
            ).toFixed(2) +

            "\nSupplier: " +
            material.supplierName +

            "\nMinimum Stock: " +
            minimumStock +

            "\nStatus: " +
            status
        );


    } catch (error) {

        console.error(
            "View material error:",
            error
        );


        alert(
            "Unable to load material details."
        );
    }
}


// =========================================================
// OPEN EDIT MATERIAL
// =========================================================

async function openEditMaterial(materialId) {

    try {

        const response =
            await fetch(
                MATERIAL_API +
                "/viewMaterial/" +
                materialId,
                {
                    method: "GET",
                    credentials: "include"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Unable to fetch material."
            );
        }


        const material =
            await response.json();


        const idElement =
            document.getElementById(
                "editMaterialId"
            );


        const nameElement =
            document.getElementById(
                "editMaterialName"
            );


        const typeElement =
            document.getElementById(
                "editMaterialType"
            );


        const quantityElement =
            document.getElementById(
                "editMaterialQuantity"
            );


        const unitElement =
            document.getElementById(
                "editMaterialUnit"
            );


        const priceElement =
            document.getElementById(
                "editMaterialUnitPrice"
            );


        const supplierElement =
            document.getElementById(
                "editMaterialSupplierName"
            );


        const minimumElement =
            document.getElementById(
                "editMaterialMinimumStock"
            );


        if (
            !idElement ||
            !nameElement ||
            !typeElement ||
            !quantityElement ||
            !unitElement ||
            !priceElement ||
            !supplierElement ||
            !minimumElement
        ) {

            throw new Error(
                "Edit Material form fields are missing."
            );
        }


        idElement.value =
            material.materialId;


        nameElement.value =
            material.materialName || "";


        typeElement.value =
            material.materialType || "";


        quantityElement.value =
            material.quantity ?? 0;


        unitElement.value =
            material.unit || "";


        priceElement.value =
            material.unitPrice ?? 0;


        supplierElement.value =
            material.supplierName || "";


        minimumElement.value =
            material.minimumStock ?? 0;


        const modalElement =
            document.getElementById(
                "editMaterialModal"
            );


        if (!modalElement) {

            throw new Error(
                "editMaterialModal not found."
            );
        }


        const modal =
            bootstrap.Modal.getOrCreateInstance(
                modalElement
            );


        modal.show();


    } catch (error) {

        console.error(
            "Open edit material error:",
            error
        );


        alert(
            "Unable to load material."
        );
    }
}


// =========================================================
// UPDATE MATERIAL
// =========================================================

async function updateMaterial() {

    const idElement =
        document.getElementById("editMaterialId");

    const nameElement =
        document.getElementById("editMaterialName");

    const typeElement =
        document.getElementById("editMaterialType");

    const unitElement =
        document.getElementById("editMaterialUnit");

    const quantityElement =
        document.getElementById("editMaterialQuantity");

    const priceElement =
        document.getElementById("editMaterialUnitPrice");

    const supplierElement =
        document.getElementById("editMaterialSupplierName");

    const minimumElement =
        document.getElementById("editMaterialMinimumStock");


    if (
        !idElement ||
        !nameElement ||
        !typeElement ||
        !unitElement ||
        !quantityElement ||
        !priceElement ||
        !supplierElement ||
        !minimumElement
    ) {

        alert("Edit Material form fields are missing.");

        return;
    }


    const material = {

        materialId:
            Number(idElement.value),

        materialName:
            nameElement.value.trim(),

        materialType:
            typeElement.value.trim(),

        unit:
            unitElement.value.trim(),

        quantity:
            Number(quantityElement.value),

        unitPrice:
            Number(priceElement.value),

        supplierName:
            supplierElement.value.trim(),

        minimumStock:
            Number(minimumElement.value)
    };


    /* =========================
       VALIDATION
    ========================= */

    if (!material.materialId) {

        alert("Invalid material ID.");

        return;
    }


    if (!material.materialName) {

        alert("Please enter material name.");

        return;
    }


    if (!material.materialType) {

        alert("Please enter material type.");

        return;
    }


    if (!material.unit) {

        alert("Please enter unit.");

        return;
    }


    if (
        !Number.isFinite(material.quantity) ||
        material.quantity < 0
    ) {

        alert("Quantity cannot be negative.");

        return;
    }


    if (
        !Number.isFinite(material.unitPrice) ||
        material.unitPrice < 0
    ) {

        alert("Unit price cannot be negative.");

        return;
    }


    if (!material.supplierName) {

        alert("Please enter supplier name.");

        return;
    }


    if (
        !Number.isFinite(material.minimumStock) ||
        material.minimumStock < 0
    ) {

        alert("Minimum stock cannot be negative.");

        return;
    }


    /* =========================
       UPDATE MATERIAL
    ========================= */

    try {

        const response =
            await fetch(
                MATERIAL_API + "/updMaterial",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    credentials: "include",

                    body:
                        JSON.stringify(material)
                }
            );


        const message =
            await response.text();


        if (!response.ok) {

            throw new Error(
                message ||
                "HTTP " + response.status
            );
        }


        alert(
            message ||
            "Material updated successfully."
        );


        /* Close modal */

        const modalElement =
            document.getElementById(
                "editMaterialModal"
            );


        if (modalElement) {

            const modal =
                bootstrap.Modal.getInstance(
                    modalElement
                );

            if (modal) {

                modal.hide();
            }
        }


        /* Reload material table */

        await loadMaterials();


        /* Reload dashboard stock */

        if (
            typeof loadMaterialStock ===
            "function"
        ) {

            await loadMaterialStock();
        }


    } catch (error) {

        console.error(
            "Error updating material:",
            error
        );


        alert(
            "Failed to update material:\n\n" +
            error.message
        );
    }
}


// =========================================================
// OPEN CONSUME MATERIAL MODAL
// =========================================================

async function openConsumeMaterial(materialId) {

    try {

        const response =
            await fetch(
                MATERIAL_API +
                "/viewMaterial/" +
                materialId,
                {
                    method: "GET",
                    credentials: "include"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load material."
            );
        }


        const material =
            await response.json();


        const idElement =
            document.getElementById(
                "consumeMaterialId"
            );


        const nameElement =
            document.getElementById(
                "consumeMaterialName"
            );


        const availableElement =
            document.getElementById(
                "consumeAvailableQuantity"
            );


        const quantityElement =
            document.getElementById(
                "consumeQuantity"
            );


        if (
            !idElement ||
            !nameElement ||
            !availableElement ||
            !quantityElement
        ) {

            throw new Error(
                "Consume Material form fields are missing."
            );
        }


        idElement.value =
            material.materialId;


        nameElement.value =
            material.materialName || "";


        availableElement.value =
            material.quantity ?? 0;


        quantityElement.value = "";


        const modalElement =
            document.getElementById(
                "consumeMaterialModal"
            );


        if (!modalElement) {

            throw new Error(
                "consumeMaterialModal not found."
            );
        }


        const modal =
            bootstrap.Modal.getOrCreateInstance(
                modalElement
            );


        modal.show();


    } catch (error) {

        console.error(
            "Open consume material error:",
            error
        );


        alert(
            "Unable to load material."
        );
    }
}


// =========================================================
// CONSUME MATERIAL
// =========================================================

async function consumeMaterial() {

    const materialId =
        Number(
            document.getElementById(
                "consumeMaterialId"
            ).value
        );


    const quantity =
        Number(
            document.getElementById(
                "consumeQuantity"
            ).value
        );


    const available =
        Number(
            document.getElementById(
                "consumeAvailableQuantity"
            ).value
        );


    if (
        !materialId ||
        !Number.isFinite(materialId)
    ) {

        alert(
            "Invalid material ID."
        );

        return;
    }


    if (
        !Number.isFinite(quantity) ||
        quantity <= 0
    ) {

        alert(
            "Enter a valid quantity."
        );

        return;
    }


    if (quantity > available) {

        alert(
            "Insufficient stock."
        );

        return;
    }


    try {

        const response =
            await fetch(
                MATERIAL_API +
                "/consumeMaterial/" +
                materialId +
                "?quantity=" +
                encodeURIComponent(
                    quantity
                ),
                {

                    method: "PUT",

                    credentials: "include"
                }
            );


        const message =
            await response.text();


        if (!response.ok) {

            throw new Error(
                message ||
                "Material consumption failed."
            );
        }


        alert(
            message ||
            "Material consumed successfully"
        );


        const modalElement =
            document.getElementById(
                "consumeMaterialModal"
            );


        if (modalElement) {

            const modal =
                bootstrap.Modal.getInstance(
                    modalElement
                );


            if (modal) {
                modal.hide();
            }
        }


        await loadMaterials();

        await loadMaterialStock();


    } catch (error) {

        console.error(
            "Error consuming material:",
            error
        );


        alert(
            "Failed to consume material: " +
            error.message
        );
    }
}


// =========================================================
// CHECK MATERIAL STOCK
// =========================================================

async function checkMaterialStock(materialId) {

    try {

        const response =
            await fetch(
                MATERIAL_API +
                "/checkStock/" +
                materialId,
                {
                    method: "GET",
                    credentials: "include"
                }
            );


        const message =
            await response.text();


        if (!response.ok) {

            throw new Error(
                message ||
                "Unable to check stock."
            );
        }


        alert(
            "Stock Status: " +
            message
        );


    } catch (error) {

        console.error(
            "Check stock error:",
            error
        );


        alert(
            "Unable to check stock."
        );
    }
}


// =========================================================
// LOAD MATERIAL STOCK
// =========================================================

async function loadMaterialStock() {

    const stockList =
        document.getElementById(
            "materialStockList"
        );

    if (!stockList) {
        return;
    }

    try {

        const response = await fetch(
            MATERIAL_API +
            "/viewallMaterial",
            {
                method: "GET",
                credentials: "include"
            }
        );

        if (!response.ok) {

            throw new Error(
                "HTTP " + response.status
            );
        }

        const materials =
            await response.json();

        if (!Array.isArray(materials)) {

            throw new Error(
                "Invalid material response"
            );
        }

        stockList.innerHTML = "";

        if (materials.length === 0) {

            stockList.innerHTML = `
                <div class="text-center py-3">
                    <small>
                        No materials available.
                    </small>
                </div>
            `;

            return;
        }

        materials
            .slice(0, 5)
            .forEach(function(material) {

                const quantity =
                    Number(material.quantity) || 0;

                const minimumStock =
                    Number(
                        material.minimumStock
                    ) || 0;

                let percentage = 100;

                if (minimumStock > 0) {

                    percentage =
                        Math.round(
                            (
                                quantity /
                                (minimumStock * 3)
                            ) * 100
                        );
                }

                percentage =
                    Math.max(
                        0,
                        Math.min(
                            100,
                            percentage
                        )
                    );


                let stockClass = "high";
                let warningText = "";
                let warningClass = "";


                if (
                    quantity <= minimumStock
                ) {

                    stockClass = "low";
                    warningText = "Low stock";
                    warningClass =
                        "warning-text";

                } else if (
                    quantity <=
                    minimumStock * 2
                ) {

                    stockClass = "medium";
                    warningText =
                        "Stock getting low";

                    warningClass =
                        "warning-text";

                } else {

                    stockClass = "high";

                    warningText =
                        quantity +
                        " " +
                        (
                            material.unit ||
                            "units"
                        ) +
                        " available";
                }


                const item =
                    document.createElement(
                        "div"
                    );

                item.className =
                    "stock-item";


                item.innerHTML = `

                    <div class="stock-top">

                        <span>
                            ${escapeMaterialHtml(
                                material.materialName
                            )}
                        </span>

                        <strong>
                            ${percentage}%
                        </strong>

                    </div>


                    <div class="stock-bar">

                        <div
                            class="
                                stock-progress
                                ${stockClass}
                            "
                            style="
                                width:${percentage}%
                            ">
                        </div>

                    </div>


                    <small
                        class="${warningClass}">
                        ${escapeMaterialHtml(
                            warningText
                        )}
                    </small>

                `;


                stockList.appendChild(item);

            });


    } catch (error) {

        console.error(
            "Material stock loading error:",
            error
        );

        stockList.innerHTML = `
            <div class="text-center py-3">
                <small class="warning-text">
                    Unable to load materials
                </small>
            </div>
        `;
    }
}


// =========================================================
// SEARCH MATERIAL
// =========================================================

function searchMaterial() {

    const searchElement =
        document.getElementById(
            "materialSearch"
        );


    if (!searchElement) {
        return;
    }


    const searchValue =
        searchElement.value
            .toLowerCase()
            .trim();


    if (!searchValue) {

        displayMaterials(
            allMaterials
        );

        return;
    }


    const filtered =
        allMaterials.filter(
            function(material) {

                return (

                    String(
                        material.materialId ?? ""
                    )
                    .toLowerCase()
                    .includes(searchValue)

                    ||

                    String(
                        material.materialName ?? ""
                    )
                    .toLowerCase()
                    .includes(searchValue)

                    ||

                    String(
                        material.materialType ?? ""
                    )
                    .toLowerCase()
                    .includes(searchValue)

                    ||

                    String(
                        material.supplierName ?? ""
                    )
                    .toLowerCase()
                    .includes(searchValue)

                    ||

                    String(
                        material.unit ?? ""
                    )
                    .toLowerCase()
                    .includes(searchValue)

                );
            }
        );


    displayMaterials(
        filtered
    );
}


// =========================================================
// UPDATE MATERIAL SUMMARY
// =========================================================

function updateMaterialSummary(materials) {

    if (!Array.isArray(materials)) {
        materials = [];
    }


    const totalCount =
        materials.length;


    const lowStockCount =
        materials.filter(
            function(material) {

                return Number(
                    material.quantity || 0
                ) <= Number(
                    material.minimumStock || 0
                );

            }
        ).length;


    const totalStock =
        materials.reduce(
            function(total, material) {

                return total +
                    Number(
                        material.quantity || 0
                    );

            },
            0
        );


    const totalElement =
        document.getElementById(
            "totalMaterialCount"
        );


    const lowElement =
        document.getElementById(
            "lowStockMaterialCount"
        );


    const stockElement =
        document.getElementById(
            "totalMaterialStock"
        );


    if (totalElement) {

        totalElement.textContent =
            totalCount;
    }


    if (lowElement) {

        lowElement.textContent =
            lowStockCount;
    }


    if (stockElement) {

        stockElement.textContent =
            totalStock;
    }
}


// =========================================================
// HTML ESCAPE
// =========================================================

function escapeMaterialHtml(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";
    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );
}



/* =========================================================
   INITIALIZE MANAGEMENT SECTIONS
========================================================= */

function initializeManagementSections() {

    /*
     * Existing pages can be integrated here
     * without changing backend APIs.
     */


    initializeCustomerSection();

    initializeWorkerSection();

    initializeMachineSection();

    initializeMaterialSection();

    initializeJobSection();

    initializeInvoiceSection();

    initializePaymentSection();

}


/* =========================================================
   CUSTOMER MANAGEMENT
========================================================= */

function initializeCustomerSection() {

    console.log(
        "Customer management initialized"
    );

}


async function loadCustomers() {

    try {

        const response =
            await fetch(
                API_BASE +
                "/viewallCustomers"
            );


        if (!response.ok) {

            throw new Error(
                "Customer API error: " +
                response.status
            );

        }


        const customers =
            await response.json();


        console.log(
            "Customers:",
            customers
        );


        updateCounter(
            "customerCount",
            customers.length
        );


        return customers;


    } catch (error) {

        console.error(
            "Customer loading error:",
            error
        );

        return [];

    }

}

/* =========================================================
   ADD CUSTOMER
========================================================= */

function openAddCustomer() {

    const form =
        document.getElementById("addCustomerForm");

    if (form) {
        form.reset();
    }

    openModal("addCustomerModal");
}


/* =========================================================
   SAVE CUSTOMER
========================================================= */

async function saveCustomer() {

    const form =
        document.getElementById("addCustomerForm");

    const saveButton =
        document.getElementById("saveCustomerBtn");


    if (!form) {

        console.error(
            "Add Customer form not found."
        );

        return;
    }


    /* Browser validation */

    if (!form.checkValidity()) {

        form.reportValidity();

        return;
    }


    try {

        /* Disable button while saving */

        if (saveButton) {

            saveButton.disabled = true;

            saveButton.innerHTML =
                '<i class="bi bi-hourglass-split"></i> Saving...';

        }


        /*
         * IMPORTANT:
         * Do not manually set Content-Type.
         *
         * Browser automatically sets:
         * multipart/form-data
         * with the required boundary.
         */

        const formData =
            new FormData(form);


        console.log(
            "Saving customer..."
        );


        const response =
            await fetch(
                API_BASE + "/addCustomer",
                {
                    method: "POST",
                    body: formData,
                    credentials: "include"
                }
            );


        if (!response.ok) {

            let errorMessage =
                "Unable to add customer.";

            try {

                const errorText =
                    await response.text();

                if (errorText) {
                    errorMessage =
                        errorText;
                }

            } catch (e) {

                console.error(
                    "Could not read error response:",
                    e
                );

            }


            throw new Error(
                errorMessage
            );
        }


        console.log(
            "Customer added successfully."
        );


        /* Close modal */

        closeModal(
            "addCustomerModal"
        );


        /* Reset form */

        form.reset();


        /* Success message */

        showSuccess(
            "Customer added successfully."
        );


        /*
         * Refresh customer information
         */

        loadCustomers();


        /*
         * Refresh dashboard data
         */

        refreshCustomerCount();


    } catch (error) {

        console.error(
            "Add customer error:",
            error
        );


        showError(
            error.message ||
            "Unable to add customer."
        );


    } finally {

        /* Enable button again */

        if (saveButton) {

            saveButton.disabled = false;

            saveButton.innerHTML =
                '<i class="bi bi-check-lg"></i> Save Customer';

        }

    }

}


/* =========================================================
   REFRESH CUSTOMER COUNT
========================================================= */

async function refreshCustomerCount() {

    try {

        const response =
            await fetch(
                API_BASE +
                "/viewallCustomers"
            );


        if (!response.ok) {

            return;
        }


        const customers =
            await response.json();


        const totalCustomers =
            document.getElementById(
                "totalCustomers"
            );


        if (totalCustomers) {

            totalCustomers.textContent =
                customers.length;

        }


    } catch (error) {

        console.error(
            "Customer count refresh error:",
            error
        );

    }

}


/* =========================================================
   VIEW CUSTOMER
========================================================= */

async function viewCustomer(customerId) {

    if (!customerId) {

        return;

    }


    window.location.href =
        "customerProfile.jsp?id=" +
        encodeURIComponent(
            customerId
        );

}


/* =========================================================
   WORKER MANAGEMENT
========================================================= */

function initializeWorkerSection() {

    console.log(
        "Worker management initialized"
    );

}

/* =========================================================
   LOAD ALL WORKERS
========================================================= */

async function loadWorkers() {

    const tableBody =
        document.getElementById("workerTableBody");

    if (!tableBody) {

        console.warn(
            "workerTableBody not found."
        );

        return;
    }

    tableBody.innerHTML = `
        <tr>
            <td colspan="8" class="text-center">
                <i class="bi bi-hourglass-split"></i>
                Loading workers...
            </td>
        </tr>
    `;

    try {

        const response =
            await fetch(
                API_BASE + "/viewallWorkers",
                {
                    method: "GET",
                    credentials: "include"
                }
            );

        if (!response.ok) {

            throw new Error(
                "Worker API error: " +
                response.status
            );

        }

        const workers =
            await response.json();

        console.log(
            "Workers loaded:",
            workers
        );

        updateCounter(
            "workerCount",
            workers.length
        );

        renderWorkers(workers);

    } catch (error) {

        console.error(
            "Worker loading error:",
            error
        );

        tableBody.innerHTML = `
            <tr>
                <td
                    colspan="8"
                    class="text-center text-danger"
                >
                    <i class="bi bi-exclamation-circle"></i>
                    Unable to load workers.
                </td>
            </tr>
        `;

    }

}

/* =========================================================
   OPEN WORKER MANAGEMENT
========================================================= */

function openWorkerManagement() {

    showSection("workers");

    loadWorkers();

}
/* =========================================================
   RENDER ALL WORKERS
========================================================= */

function renderWorkers(workers) {

    const tableBody =
        document.getElementById(
            "workerTableBody"
        );

    if (!tableBody) {

        return;

    }

    tableBody.innerHTML = "";

    if (
        !workers ||
        workers.length === 0
    ) {

        tableBody.innerHTML = `
            <tr>
                <td
                    colspan="8"
                    class="text-center"
                >
                    <i class="bi bi-people"></i>
                    No workers found.
                </td>
            </tr>
        `;

        return;

    }


    workers.forEach(function(worker) {

        const workerId =
            worker.worker_id ??
            worker.workerId ??
            "";

        const userId =
            worker.user_id ??
            worker.userId ??
            "";

        const fullName =
            worker.fullName ??
            worker.full_name ??
            "";

        const email =
            worker.email ??
            "";

        const mobile =
            worker.mobileNo ??
            worker.mobile_no ??
            "";

        const skill =
            worker.skill ??
            "";

        const salary =
            worker.salary ??
            0;

        const role =
            worker.role ??
            "Worker";

        const status =
            worker.status ??
            "Active";


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${escapeHtml(workerId)}
            </td>


            <td>

                <div class="customer-name-cell">

                    <strong>
                        ${escapeHtml(fullName)}
                    </strong>

                    <small>
                        User ID:
                        ${escapeHtml(userId)}
                    </small>

                </div>

            </td>


            <td>
                ${escapeHtml(email)}
            </td>


            <td>
                ${escapeHtml(mobile)}
            </td>


            <td>
                ${escapeHtml(skill)}
            </td>


            <td>
                ${formatCurrency(salary)}
            </td>


            <td>

                <span class="status-badge
                    ${getStatusClass(status)}">

                    ${escapeHtml(status)}

                </span>

            </td>


            <td>

                <button
                    type="button"
                    class="action-btn view-btn"
                    onclick="viewWorker(${workerId})"
                    title="View Worker">

                    <i class="bi bi-eye"></i>

                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });

}

/* =========================================================
   WORKER TABLE SEARCH
========================================================= */

function initializeWorkerTableSearch() {

    const searchInput =
        document.getElementById(
            "workerTableSearch"
        );

    if (!searchInput) {

        return;

    }

    if (
        searchInput.dataset.initialized ===
        "true"
    ) {

        return;

    }

    searchInput.dataset.initialized =
        "true";


    searchInput.addEventListener(
        "input",
        function() {

            const searchText =
                this.value
                    .toLowerCase()
                    .trim();


            const rows =
                document.querySelectorAll(
                    "#workerTableBody tr"
                );


            rows.forEach(function(row) {

                const rowText =
                    row.textContent
                        .toLowerCase();


                if (
                    searchText === "" ||
                    rowText.includes(searchText)
                ) {

                    row.style.display = "";

                } else {

                    row.style.display =
                        "none";

                }

            });

        }
    );

}

/* =========================================================
   MACHINE MANAGEMENT
========================================================= */

function initializeMachineSection() {

    console.log(
        "Machine management initialized"
    );

}


async function deleteMachine(machineId) {

    if (!machineId) {

        return;

    }


    const confirmation =
        confirm(
            "Are you sure you want to delete this machine?"
        );


    if (!confirmation) {

        return;

    }


    try {

        const response =
            await fetch(
                API_BASE +
                "/delmMachine/" +
                encodeURIComponent(
                    machineId
                ),
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Delete machine failed"
            );

        }


        alert(
            "Machine deleted successfully."
        );


        loadMachines();


    } catch (error) {

        console.error(
            error
        );


        alert(
            "Unable to delete machine."
        );

    }

}

/* =========================================================
   OPEN ADD MACHINE
========================================================= */

function openAddMachine() {

    const form =
        document.getElementById(
            "addMachineForm"
        );

    if (form) {

        form.reset();

    }


    const status =
        document.getElementById(
            "machineStatus"
        );

    if (status) {

        status.value = "Available";

    }


    openModal(
        "addMachineModal"
    );

}
/* =========================================================
   SAVE MACHINE
========================================================= */

async function saveMachine() {

    try {

        const machineName =
            document.getElementById("machineName").value.trim();

        const machineType =
            document.getElementById("machineType").value.trim();

        const status =
            document.getElementById("machineStatus").value;

        // Validation
        if (!machineName) {
            alert("Please enter machine name");
            return;
        }

        if (!machineType) {
            alert("Please enter machine type");
            return;
        }

        if (!status) {
            alert("Please select machine status");
            return;
        }

        const machine = {
            machine_name: machineName,
            machine_type: machineType,
            status: status
        };

        console.log("Sending machine:", machine);

        const response = await fetch(
           `${API_CONFIG.BASE_URL}/addMachine`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(machine)
            }
        );

        const resultText = await response.text();

        console.log(
            "Add machine response:",
            resultText
        );

        if (!response.ok) {
            throw new Error(
                resultText || "Failed to add machine"
            );
        }

        // Machine successfully added
        alert("Machine added successfully");

        // Close Add Machine modal
        closeAddMachine();

        // Reload machine list
        await loadMachines();

        // Refresh machine statistics
        updateMachineStatistics();

    } catch (error) {

        console.error(
            "Add machine error:",
            error
        );

        alert(
            "Failed to add machine.\n\n" +
            error.message
        );
    }
}
/* =========================================================
   MATERIAL MANAGEMENT
========================================================= */

function initializeMaterialSection() {

    console.log(
        "Material management initialized"
    );

}


/* =========================================================
   JOB MANAGEMENT
========================================================= */

function initializeJobSection() {

    console.log(
        "Job management initialized"
    );

}


/* =========================================================
   JOB STATUS UPDATE
========================================================= */

async function updateJobStatus(
    jobId,
    status
) {

    if (!jobId || !status) {

        alert(
            "Job ID and status are required."
        );

        return;

    }


    try {

        const response =
            await fetch(
                API_BASE +
                "/updJobStatus",
                {
                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        jobId: jobId,

                        status: status

                    })

                }
            );


        if (!response.ok) {

            throw new Error(
                "Status update failed"
            );

        }


        alert(
            "Job status updated successfully."
        );


        loadRecentJobs();


    } catch (error) {

        console.error(
            "Job status error:",
            error
        );


        alert(
            "Unable to update job status."
        );

    }

}


/* =========================================================
   LOAD JOB STATUS TRACKING
========================================================= */

async function loadJobStatusTracking() {

    try {

        const response = await fetch(
            API_BASE + "/viewallJob"
        );

        if (!response.ok) {
            throw new Error(
                "Failed to load jobs: HTTP " + response.status
            );
        }

        const jobs = await response.json();

        console.log("Jobs loaded for status tracking:", jobs);

        updateJobStatusCards(jobs);

    } catch (error) {

        console.error(
            "Job Status Tracking Error:",
            error
        );

    }
}

/* =========================================================
   UPDATE JOB STATUS CARDS
========================================================= */

function updateJobStatusCards(jobs) {

    let pending = 0;
    let assigned = 0;
    let inProgress = 0;
    let completed = 0;

    if (!Array.isArray(jobs)) {
        console.warn("Jobs data is not an array:", jobs);
        return;
    }

    jobs.forEach(function (job) {

        const status = String(
            job.status || ""
        ).trim().toLowerCase();

        switch (status) {

            case "pending":
                pending++;
                break;

            case "assigned":
                assigned++;
                break;

            case "in progress":
            case "in_progress":
            case "inprogress":
                inProgress++;
                break;

            case "completed":
                completed++;
                break;
        }

    });

    const pendingElement =
        document.getElementById(
            "dashboardPendingJobs"
        );

    const assignedElement =
        document.getElementById(
            "dashboardAssignedJobs"
        );

    const progressElement =
        document.getElementById(
            "dashboardProgressJobs"
        );

    const completedElement =
        document.getElementById(
            "dashboardCompletedJobs"
        );

    if (pendingElement) {
        pendingElement.textContent =
            pending + (pending === 1 ? " Job" : " Jobs");
    }

    if (assignedElement) {
        assignedElement.textContent =
            assigned + (assigned === 1 ? " Job" : " Jobs");
    }

    if (progressElement) {
        progressElement.textContent =
            inProgress +
            (inProgress === 1 ? " Job" : " Jobs");
    }

    if (completedElement) {
        completedElement.textContent =
            completed +
            (completed === 1 ? " Job" : " Jobs");
    }

    console.log(
        "Job Status Counts:",
        {
            pending: pending,
            assigned: assigned,
            inProgress: inProgress,
            completed: completed
        }
    );
}



/* =========================================================
   INVOICE MANAGEMENT
========================================================= */

function initializeInvoiceSection() {

    console.log(
        "Invoice management initialized"
    );

}


/* =========================================================
   PAYMENT MANAGEMENT
========================================================= */

function initializePaymentSection() {

    console.log(
        "Payment management initialized"
    );

}


/* =========================================================
   LOGOUT
========================================================= */

function initializeLogout() {

    const logoutButtons =
        document.querySelectorAll(
            ".logout-btn"
        );


    logoutButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                logout();

            }
        );

    });

}


/* =========================================================
   LOGOUT FUNCTION
========================================================= */

async function logout() {

    const confirmation =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmation) {

        return;

    }


    try {

        const response =
            await fetch(
                API_BASE +
                "/logout",
                {
                    method: "POST",

                    credentials: "include"
                }
            );


        if (
            response.ok ||
            response.status === 302
        ) {

            window.location.href =
                "login.jsp";

            return;

        }

        window.location.href =
            "login.jsp";


    } catch (error) {

        console.error(
            "Logout error:",
            error
        );


        window.location.href =
            "login.jsp";

    }

}


/* =========================================================
   DATE
========================================================= */

function setCurrentDate() {

    const dateElement =
        document.getElementById(
            "currentDate"
        );


    if (!dateElement) {

        return;

    }


    const today =
        new Date();


    const options = {

        weekday: "long",

        year: "numeric",

        month: "long",

        day: "numeric"

    };


    dateElement.textContent =
        today.toLocaleDateString(
            "en-IN",
            options
        );

}


/* =========================================================
   CONFIRM DELETE
========================================================= */

function confirmDelete(
    message = "Are you sure you want to delete this record?"
) {

    return confirm(message);

}


/* =========================================================
   SUCCESS MESSAGE
========================================================= */

function showSuccess(message) {

    alert(
        message ||
        "Operation completed successfully."
    );

}


/* =========================================================
   ERROR MESSAGE
========================================================= */

function showError(message) {

    alert(
        message ||
        "Something went wrong."
    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   NUMBER FORMAT
========================================================= */

function formatNumber(number) {

    return Number(
        number || 0
    ).toLocaleString(
        "en-IN"
    );

}


/* =========================================================
   CURRENCY FORMAT
========================================================= */

function formatCurrency(amount) {

    return Number(
        amount || 0
    ).toLocaleString(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2
        }
    );

}


/* =========================================================
   RELOAD DASHBOARD
========================================================= */

function refreshDashboard() {

    console.log(
        "Refreshing dashboard..."
    );


    loadDashboardStatistics();

    loadRecentJobs();

    loadMachines();

    loadMaterials();

    loadAlerts();


    showSuccess(
        "Dashboard refreshed successfully."
    );

}


/* =========================================================
   WINDOW RESIZE
========================================================= */

window.addEventListener(
    "resize",
    function () {

        if (
            window.innerWidth > 1000
        ) {

            closeSidebar();

        }

    }
);

/* =========================================================
   GLOBAL FUNCTIONS
   These can be called directly from JSP
========================================================= */

window.openAddCustomer =
    openAddCustomer;

window.saveCustomer =
    saveCustomer;

window.openAddWorker =
    openAddWorker;

window.saveWorker =
    saveWorker;

window.showSection =
    showSection;

window.openModal =
    openModal;

window.closeModal =
    closeModal;

window.viewCustomer =
    viewCustomer;

window.viewJob =
    viewJob;

window.updateJobStatus =
    updateJobStatus;

window.deleteMachine =
    deleteMachine;

window.openAddMachine =
    openAddMachine;

window.saveMachine =
    saveMachine;

window.openMachineManagement =
    openMachineManagement;

window.viewMachine =
    viewMachine;

window.refreshMachineCount =
    refreshMachineCount;

window.confirmDelete =
    confirmDelete;

window.refreshDashboard =
    refreshDashboard;

window.formatCurrency =
    formatCurrency;

window.formatNumber =
    formatNumber;

window.logout =
    logout;

window.handleQuickAction =
    handleQuickAction;


/* ================================
   MATERIAL FUNCTIONS
================================ */

window.openAddMaterial =
    openAddMaterial;

window.saveMaterial =
    saveMaterial;

window.loadMaterials =
    loadMaterials;

window.viewMaterial =
    viewMaterial;

window.openEditMaterial =
    openEditMaterial;

window.updateMaterial =
    updateMaterial;

window.openConsumeMaterial =
    openConsumeMaterial;

window.consumeMaterial =
    consumeMaterial;

window.checkMaterialStock =
    checkMaterialStock;


/* ================================
   JOB ORDER FUNCTIONS
================================ */

window.openCreateJob =
    openCreateJob;

window.openJobOrders =
    openJobOrders;


/* ================================
   JOB STATUS FUNCTIONS
================================ */

window.updateJobStatus =
    updateJobStatus;


/* =========================================================
   FINAL MESSAGE
========================================================= */

console.log(
    "Smart Tool Room Admin Dashboard initialized."
);

/* =========================================================
   FINAL MESSAGE
========================================================= */

console.log(
    "Smart Tool Room Admin Dashboard initialized."
);


// ==========================================
// JOB ORDER NAVIGATION
// ==========================================

function openCreateJob() {
    window.location.href = "createJob.jsp";
}

function openJobOrders() {
    window.location.href = "joborder.jsp";
}


async function loadJobStatusSummary() {

    try {

        const response = await fetch(
            API_BASE + "/viewAllJobs"
        );

        if (!response.ok) {
            throw new Error("Failed to load job status");
        }

        const jobs = await response.json();

        let total = jobs.length;
        let pending = 0;
        let assigned = 0;
        let inProgress = 0;
        let completed = 0;
        let cancelled = 0;

        jobs.forEach(job => {

            const status =
                (job.status || "").trim().toLowerCase();

            switch (status) {

                case "pending":
                    pending++;
                    break;

                case "assigned":
                    assigned++;
                    break;

                case "in progress":
                case "in-progress":
                    inProgress++;
                    break;

                case "completed":
                    completed++;
                    break;

                case "cancelled":
                case "canceled":
                    cancelled++;
                    break;
            }
        });


        // ==========================================
        // UPDATE DASHBOARD STATISTICS
        // ==========================================

        updateElement(
            "totalJobs",
            total
        );

        updateElement(
            "pendingJobs",
            pending
        );

        updateElement(
            "assignedJobs",
            assigned
        );

        updateElement(
            "inProgressJobs",
            inProgress
        );

        updateElement(
            "completedJobs",
            completed
        );

        updateElement(
            "cancelledJobs",
            cancelled
        );

    } catch (error) {

        console.error(
            "Job status summary error:",
            error
        );
    }
}

async function loadAdminJobStatuses() {

    try {

        const response = await fetch(
        `${API_CONFIG.BASE_URL}/ad minJobStatuses`,
            {
                method: "GET"
            }
        );

        if (!response.ok) {
            throw new Error(
                "Failed to load job statuses: " + response.status
            );
        }

        const jobs = await response.json();

        console.log("Admin Job Statuses:", jobs);

        // Continue processing jobs here

    } catch (error) {

        console.error("Error loading job statuses:", error);

    }
}


// =====================================================
// LOAD JOB STATUS FOR ADMIN DASHBOARD
// =====================================================

async function loadDashboardJobStatus() {

    try {

        const response = await fetch(
            `${API_CONFIG.BASE_URL}/adminJobStatuses`
        );

        if (!response.ok) {

            throw new Error(
                "Unable to load job status"
            );

        }

        const jobs = await response.json();


        // Count statuses

        let pending = 0;
        let assigned = 0;
        let inProgress = 0;
        let completed = 0;


        jobs.forEach(function (job) {

            const status = String(
                job.status || ""
            )
            .trim()
            .toLowerCase();


            if (status === "pending") {

                pending++;

            }
            else if (status === "assigned") {

                assigned++;

            }
            else if (status === "in progress") {

                inProgress++;

            }
            else if (status === "completed") {

                completed++;

            }

        });


        // Update dashboard cards

        const pendingElement =
            document.getElementById(
                "dashboardPendingJobs"
            );

        const assignedElement =
            document.getElementById(
                "dashboardAssignedJobs"
            );

        const progressElement =
            document.getElementById(
                "dashboardProgressJobs"
            );

        const completedElement =
            document.getElementById(
                "dashboardCompletedJobs"
            );


        if (pendingElement) {

            pendingElement.textContent =
                pending + " Jobs";

        }


        if (assignedElement) {

            assignedElement.textContent =
                assigned + " Jobs";

        }


        if (progressElement) {

            progressElement.textContent =
                inProgress + " Jobs";

        }


        if (completedElement) {

            completedElement.textContent =
                completed + " Jobs";

        }


    }
    catch (error) {

        console.error(
            "Dashboard Job Status Error:",
            error
        );

    }
}


// =====================================================
// LOAD DYNAMIC JOB STATUS
// =====================================================

async function loadDashboardJobStatus() {

    try {

        const response = await fetch(
           `${API_CONFIG.BASE_URL}/adminJobStatuses `
        );

        if (!response.ok) {

            throw new Error(
                "Unable to load job status"
            );

        }

        const jobs = await response.json();


        // =====================================================
        // COUNT JOB STATUS
        // =====================================================

        let pending = 0;
        let assigned = 0;
        let inProgress = 0;
        let completed = 0;
        let cancelled = 0;


        jobs.forEach(function (job) {

            const status =
                String(job.status || "")
                    .trim()
                    .toLowerCase();


            if (status === "pending") {

                pending++;

            }
            else if (status === "assigned") {

                assigned++;

            }
            else if (status === "in progress") {

                inProgress++;

            }
            else if (status === "completed") {

                completed++;

            }
            else if (status === "cancelled") {

                cancelled++;

            }

        });


        // =====================================================
        // TOTAL
        // =====================================================

        const total = jobs.length;


        // =====================================================
        // UPDATE TOTAL
        // =====================================================

        const totalElement =
            document.getElementById(
                "dashboardTotalJobs"
            );

        if (totalElement) {

            totalElement.textContent = total;

        }


        // =====================================================
        // UPDATE STATUS COUNTS
        // =====================================================

        const pendingElement =
            document.getElementById(
                "dashboardPendingCount"
            );

        const assignedElement =
            document.getElementById(
                "dashboardAssignedCount"
            );

        const progressElement =
            document.getElementById(
                "dashboardProgressCount"
            );

        const completedElement =
            document.getElementById(
                "dashboardCompletedCount"
            );

        const cancelledElement =
            document.getElementById(
                "dashboardCancelledCount"
            );


        if (pendingElement) {

            pendingElement.textContent =
                pending;

        }

        if (assignedElement) {

            assignedElement.textContent =
                assigned;

        }

        if (progressElement) {

            progressElement.textContent =
                inProgress;

        }

        if (completedElement) {

            completedElement.textContent =
                completed;

        }

        if (cancelledElement) {

            cancelledElement.textContent =
                cancelled;

        }


        // =====================================================
        // UPDATE CIRCULAR CHART
        // =====================================================

        updateJobStatusCircle(
            total,
            pending,
            assigned,
            inProgress,
            completed,
            cancelled
        );


        console.log(
            "Dynamic Job Status:",
            {
                total: total,
                pending: pending,
                assigned: assigned,
                inProgress: inProgress,
                completed: completed,
                cancelled: cancelled
            }
        );


    }
    catch (error) {

        console.error(
            "Dashboard Job Status Error:",
            error
        );

    }

}

// =====================================================
// UPDATE JOB STATUS CIRCULAR CHART
// =====================================================

function updateJobStatusCircle(
    total,
    pending,
    assigned,
    inProgress,
    completed,
    cancelled
) {

    const circle =
        document.querySelector(
            ".status-circle"
        );


    if (!circle) {

        return;

    }


    // Prevent division by zero

    if (total === 0) {

        circle.style.background =
            "conic-gradient(#eee 0% 100%)";

        return;

    }


    // =====================================================
    // CALCULATE PERCENTAGES
    // =====================================================

    const pendingPercent =
        (pending / total) * 100;

    const assignedPercent =
        (assigned / total) * 100;

    const progressPercent =
        (inProgress / total) * 100;

    const completedPercent =
        (completed / total) * 100;

    const cancelledPercent =
        (cancelled / total) * 100;


    // =====================================================
    // CALCULATE CUMULATIVE POSITIONS
    // =====================================================

    const pendingEnd =
        pendingPercent;

    const assignedEnd =
        pendingEnd + assignedPercent;

    const progressEnd =
        assignedEnd + progressPercent;

    const completedEnd =
        progressEnd + completedPercent;

    const cancelledEnd =
        completedEnd + cancelledPercent;


    // =====================================================
    // GET CSS COLORS
    // =====================================================

    const rootStyles =
        getComputedStyle(
            document.documentElement
        );


    const yellow =
        rootStyles
            .getPropertyValue("--yellow")
            .trim();

    const blue =
        rootStyles
            .getPropertyValue("--blue")
            .trim();

    const primary =
        rootStyles
            .getPropertyValue("--primary")
            .trim();

    const green =
        rootStyles
            .getPropertyValue("--green")
            .trim();

    const pink =
        rootStyles
            .getPropertyValue("--pink")
            .trim();


    // =====================================================
    // APPLY DYNAMIC GRADIENT
    // =====================================================

    circle.style.background =
        `conic-gradient(
            ${yellow} 0% ${pendingEnd}%,
            ${blue} ${pendingEnd}% ${assignedEnd}%,
            ${primary} ${assignedEnd}% ${progressEnd}%,
            ${green} ${progressEnd}% ${completedEnd}%,
            ${pink} ${completedEnd}% ${cancelledEnd}%
        )`;

}

// =====================================================
// LOAD RECENT JOB ORDERS
// =====================================================

async function loadRecentJobOrders() {

    const tbody =
        document.getElementById(
            "recentJobsTableBody"
        );

    if (!tbody) {
        return;
    }

    try {

        const response = await fetch(
            `${API_CONFIG.BASE_URL}/adminJobStatuses`
        );

        if (!response.ok) {

            throw new Error(
                "Unable to load recent job orders"
            );

        }

        const jobs = await response.json();


        // =====================================================
        // SORT BY JOB ID - LATEST FIRST
        // =====================================================

        jobs.sort(function (a, b) {

            return Number(b.job_id || 0) -
                   Number(a.job_id || 0);

        });


        // =====================================================
        // GET ONLY LATEST 4 JOBS
        // =====================================================

        const recentJobs =
            jobs.slice(0, 4);


        if (recentJobs.length === 0) {

            tbody.innerHTML = `
                <tr>
                    <td colspan="8">
                        <div class="table-message">
                            No job orders found.
                        </div>
                    </td>
                </tr>
            `;

            return;
        }


        // =====================================================
        // DISPLAY JOBS
        // =====================================================

        tbody.innerHTML =
            recentJobs.map(function (job) {

                const status =
                    String(job.status || "Pending")
                        .trim();

                const statusClass =
                    getDashboardStatusClass(status);


                return `

                    <tr>

                        <!-- JOB ID -->

                        <td>

                            <strong class="job-id">

                                JOB-${job.job_id ?? "-"}

                            </strong>

                        </td>


                        <!-- CUSTOMER -->

                        <td>

                            ${escapeDashboardHtml(
                                job.customer_name ||
                                "Customer #" +
                                (job.customer_id ?? "-")
                            )}

                        </td>


                        <!-- JOB DESCRIPTION -->

                        <td>

                            ${escapeDashboardHtml(
                                job.part_name ||
                                "Production Job"
                            )}

                        </td>


                        <!-- WORKER -->

                        <td>

                            ${job.worker_name
                                ? escapeDashboardHtml(
                                    job.worker_name
                                  )
                                : job.worker_id
                                    ? "Worker #" +
                                      job.worker_id
                                    : "Not Assigned"
                            }

                        </td>


                        <!-- MACHINE -->

                        <td>

                            ${job.machine_name
                                ? escapeDashboardHtml(
                                    job.machine_name
                                  )
                                : job.machine_id
                                    ? "Machine #" +
                                      job.machine_id
                                    : "Not Assigned"
                            }

                        </td>


                        <!-- DUE DATE -->

                        <td>

                            ${formatDashboardDate(
                                job.due_date
                            )}

                        </td>


                        <!-- STATUS -->

                        <td>

                            <span
                                class="status-badge ${statusClass}">
                                ${escapeDashboardHtml(
                                    status
                                )}
                            </span>

                        </td>


                        <!-- ACTION -->

                        <td>

                            <button
                                class="table-action"
                                title="View"
                                onclick="viewDashboardJob(${job.job_id})">

                                <i class="bi bi-eye"></i>

                            </button>

                        </td>

                    </tr>

                `;

            }).join("");

    }
    catch (error) {

        console.error(
            "Recent Job Orders Error:",
            error
        );

        tbody.innerHTML = `
            <tr>
                <td colspan="8">
                    <div class="table-message">
                        Unable to load recent job orders.
                    </div>
                </td>
            </tr>
        `;

    }

}

// =====================================================
// DASHBOARD STATUS CLASS
// =====================================================

function getDashboardStatusClass(status) {

    const normalized =
        String(status || "")
            .trim()
            .toLowerCase();


    if (normalized === "in progress") {

        return "progress-status";

    }

    if (normalized === "pending") {

        return "pending-status";

    }

    if (normalized === "completed") {

        return "completed-status";

    }

    if (normalized === "assigned") {

        return "progress-status";

    }

    if (normalized === "cancelled") {

        return "pending-status";

    }


    return "progress-status";

}

// =====================================================
// FORMAT DASHBOARD DATE
// =====================================================

function formatDashboardDate(dateValue) {

    if (!dateValue) {

        return "—";

    }


    const date =
        new Date(dateValue);


    if (isNaN(date.getTime())) {

        return escapeDashboardHtml(
            dateValue
        );

    }


    return date.toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}

// =====================================================
// VIEW DASHBOARD JOB
// =====================================================

function viewDashboardJob(jobId) {

    console.log(
        "View Job:",
        jobId
    );


    // If your existing job-order page/function
    // is already available, connect it here.

    alert(
        "Job ID: JOB-" + jobId
    );

}

function openMachines() {

    const machineLink =
        document.querySelector(
            '[data-section="machines"]'
        );

    if (machineLink) {

        machineLink.click();

    }

}

// =====================================================
// LOAD DASHBOARD MATERIAL INVENTORY
// =====================================================

// =====================================================
// LOAD DASHBOARD MATERIAL INVENTORY
// =====================================================

async function loadDashboardMaterials() {

    const materialList =
        document.getElementById("materialStockList");

    if (!materialList) {
        console.log("materialStockList not found");
        return;
    }

    try {

        const response = await fetch(
            `${API_CONFIG.BASE_URL}/material`
        );

        if (!response.ok) {
            throw new Error(
                "HTTP Error: " + response.status
            );
        }

        const materials =
            await response.json();

        console.log(
            "Materials loaded:",
            materials
        );

        if (!materials || materials.length === 0) {

            materialList.innerHTML = `
                <div class="text-center py-3">
                    <small>
                        No materials available
                    </small>
                </div>
            `;

            return;
        }

        materialList.innerHTML =
            materials
                .slice(0, 3)
                .map(function (material) {

                    const quantity =
                        Number(
                            material.quantity || 0
                        );

                    const minimumStock =
                        Number(
                            material.minimum_stock ??
                            material.minimumStock ??
                            0
                        );

                    let percentage = 0;

                    if (minimumStock > 0) {

                        percentage =
                            Math.round(
                                (quantity /
                                (minimumStock * 2)) * 100
                            );

                    } else if (quantity > 0) {

                        percentage = 100;

                    }

                    percentage =
                        Math.max(
                            0,
                            Math.min(
                                100,
                                percentage
                            )
                        );

                    let progressClass = "medium";
                    let message =
                        quantity +
                        " units available";

                    if (
                        minimumStock > 0 &&
                        quantity <= minimumStock
                    ) {

                        progressClass = "low";
                        message = "Reorder required";

                    } else if (
                        percentage <= 40
                    ) {

                        progressClass = "low";
                        message = "Low stock";

                    }

                    return `
                        <div class="stock-item">

                            <div class="stock-top">

                                <span>
                                    ${escapeDashboardHtml(
                                        material.material_name ??
                                        material.materialName ??
                                        "Material"
                                    )}
                                </span>

                                <strong>
                                    ${percentage}%
                                </strong>

                            </div>

                            <div class="stock-bar">

                                <div
                                    class="stock-progress ${progressClass}"
                                    style="width:${percentage}%;">
                                </div>

                            </div>

                            <small
                                class="${
                                    progressClass === "low"
                                    ? "warning-text"
                                    : ""
                                }">

                                ${escapeDashboardHtml(
                                    message
                                )}

                            </small>

                        </div>
                    `;

                })
                .join("");

    } catch (error) {

        console.error(
            "Material Inventory Error:",
            error
        );

        materialList.innerHTML = `
            <div class="text-center py-3">

                <small>
                    Unable to load materials
                </small>

            </div>
        `;
    }
}

// =====================================================
// OPEN CREATE INVOICE
// =====================================================

function openCreateInvoice() {

    const modalElement =
        document.getElementById("createInvoiceModal");

    if (!modalElement) {

        console.error(
            "Create Invoice modal not found."
        );

        return;
    }

    // Clear previous values

    const jobId =
        document.getElementById("invoiceJobId");

    const materialCost =
        document.getElementById("invoiceMaterialCost");

    const machineCost =
        document.getElementById("invoiceMachineCost");

    const labourCost =
        document.getElementById("invoiceLabourCost");

    const amount =
        document.getElementById("invoiceAmount");

    if (jobId) {
        jobId.value = "";
    }

    if (materialCost) {
        materialCost.value = "";
    }

    if (machineCost) {
        machineCost.value = "";
    }

    if (labourCost) {
        labourCost.value = "";
    }

    if (amount) {
        amount.value = "";
    }

    // Open Bootstrap modal

    const modal =
        bootstrap.Modal.getOrCreateInstance(
            modalElement
        );

    modal.show();
}

// =====================================================
// GENERATE INVOICE
// =====================================================

async function generateInvoice() {

    const jobIdElement =
        document.getElementById("invoiceJobId");

    const amountElement =
        document.getElementById("invoiceAmount");

    if (!jobIdElement || !amountElement) {

        console.error(
            "Invoice form fields not found."
        );

        return;
    }

    const jobId =
        Number(jobIdElement.value);

    const amount =
        Number(amountElement.value);

    // Validate Job ID

    if (!jobId || jobId <= 0) {

        alert("Please enter a valid Job ID.");

        return;
    }

    // Validate Amount

    if (!amount || amount <= 0) {

        alert(
            "Please calculate the invoice amount first."
        );

        return;
    }

    const invoice = {

        job_id: jobId,

        amount: amount

    };

    try {

        const response = await fetch(
            `${API_CONFIG.BASE_URL}/invoiceGenerate `,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(invoice)
            }
        );

        if (!response.ok) {

            throw new Error(
                "Failed to generate invoice."
            );
        }

        const result =
            await response.text();

        console.log(
            "Invoice Response:",
            result
        );

        alert(
            "Invoice generated successfully!"
        );

        // Close modal

        const modalElement =
            document.getElementById(
                "createInvoiceModal"
            );

        if (modalElement) {

            const modal =
                bootstrap.Modal.getInstance(
                    modalElement
                );

            if (modal) {
                modal.hide();
            }
        }

        // Refresh invoice list

        if (
            typeof loadInvoices ===
            "function"
        ) {

            loadInvoices();

        }

    }
    catch (error) {

        console.error(
            "Generate Invoice Error:",
            error
        );

        alert(
            "Unable to generate invoice. Please try again."
        );
    }
}


// =====================================================
// CALCULATE INVOICE TOTAL
// =====================================================

async function calculateInvoiceAmount() {

    const materialCostElement =
        document.getElementById("invoiceMaterialCost");

    const machineCostElement =
        document.getElementById("invoiceMachineCost");

    const labourCostElement =
        document.getElementById("invoiceLabourCost");

    const amountElement =
        document.getElementById("invoiceAmount");


    if (
        !materialCostElement ||
        !machineCostElement ||
        !labourCostElement ||
        !amountElement
    ) {

        console.error(
            "Invoice calculation fields not found."
        );

        return;
    }


    const materialCost =
        Number(materialCostElement.value) || 0;

    const machineCost =
        Number(machineCostElement.value) || 0;

    const labourCost =
        Number(labourCostElement.value) || 0;


    // ---------------------------------------------
    // VALIDATION
    // ---------------------------------------------

    if (
        materialCost < 0 ||
        machineCost < 0 ||
        labourCost < 0
    ) {

        alert(
            "Cost values cannot be negative."
        );

        return;
    }


    try {

        const response = await fetch(
            `${API_CONFIG.BASE_URL}/invoiceCalculate` +
            "?materialCost=" +
            encodeURIComponent(materialCost) +
            "&machineCost=" +
            encodeURIComponent(machineCost) +
            "&labourCost=" +
            encodeURIComponent(labourCost)
        );


        if (!response.ok) {

            throw new Error(
                "Unable to calculate invoice amount."
            );

        }


        const total =
            await response.json();


        // ---------------------------------------------
        // DISPLAY TOTAL
        // ---------------------------------------------

        amountElement.value =
            Number(total).toFixed(2);


        console.log(
            "Invoice Total:",
            total
        );

    }
    catch (error) {

        console.error(
            "Invoice Calculation Error:",
            error
        );

        alert(
            "Unable to calculate invoice total."
        );

    }

}

// =====================================================
// LOAD ALL INVOICES
// =====================================================

async function loadInvoices() {

    const invoiceTableBody =
        document.getElementById("invoiceTableBody");

    if (!invoiceTableBody) {
        return;
    }

    try {

        const response = await fetch(
            `${API_CONFIG.BASE_URL}/viewallInvoice`
        );

        if (!response.ok) {
            throw new Error(
                "Unable to load invoices"
            );
        }

        const invoices =
            await response.json();

        console.log(
            "Invoices:",
            invoices
        );

        // ---------------------------------------------
        // NO INVOICES
        // ---------------------------------------------

        if (
            !invoices ||
            invoices.length === 0
        ) {

            invoiceTableBody.innerHTML = `
                <tr>
                    <td
                        colspan="4"
                        class="text-center">

                        No invoices found.

                    </td>
                </tr>
            `;

            return;
        }


        // ---------------------------------------------
        // DISPLAY INVOICES
        // ---------------------------------------------

        invoiceTableBody.innerHTML =
            invoices.map(function (invoice) {

                const invoiceId =
                    invoice.invoice_id ??
                    invoice.invoiceId ??
                    "";

                const jobId =
                    invoice.job_id ??
                    invoice.jobId ??
                    "";

                const amount =
                    Number(
                        invoice.amount || 0
                    ).toFixed(2);


                return `
                    <tr>

                        <td>

                            <strong class="job-id">

                                INV-${String(invoiceId)
                                    .padStart(4, "0")}

                            </strong>

                        </td>


                        <td>

                            JOB-${String(jobId)
                                .padStart(4, "0")}

                        </td>


                        <td>

                            ₹${amount}

                        </td>


                        <td>

                            <button
                                type="button"
                                class="table-action"
                                title="View"
                                onclick="viewInvoice(${invoiceId})">

                                <i class="bi bi-eye"></i>

                            </button>


                            <button
                                type="button"
                                class="table-action"
                                title="Print"
                                onclick="printInvoice(${invoiceId})">

                                <i class="bi bi-printer"></i>

                            </button>


                            <button
                                type="button"
                                class="table-action"
                                title="Delete"
                                onclick="deleteInvoice(${invoiceId})">

                                <i class="bi bi-trash"></i>

                            </button>

                        </td>

                    </tr>
                `;

            }).join("");

    }
    catch (error) {

        console.error(
            "Invoice Loading Error:",
            error
        );

        invoiceTableBody.innerHTML = `
            <tr>
                <td
                    colspan="4"
                    class="text-center">

                    Unable to load invoices.

                </td>
            </tr>
        `;

    }
}

// =====================================================
// OPEN MATERIAL MANAGEMENT
// =====================================================

function openMaterials() {

    const materialLink =
        document.querySelector(
            '.sidebar-link[data-section="materials"]'
        );

    if (materialLink) {

        materialLink.click();

        return;
    }

    console.warn(
        "Material sidebar link not found."
    );
}

// =====================================================
// VIEW INVOICE
// =====================================================

async function viewInvoice(invoiceId) {

    try {

        const response = await fetch(
             `${API_CONFIG.BASE_URL}/viewInvoice/${invoiceId}`
        );

        if (!response.ok) {
            throw new Error("Unable to load invoice");
        }

        const invoice = await response.json();

        alert(
            "Invoice ID: " + invoice.invoice_id +
            "\nJob ID: " + invoice.job_id +
            "\nAmount: ₹" + invoice.amount
        );

    } catch (error) {

        console.error("View Invoice Error:", error);

        alert("Unable to view invoice.");

    }
}


// =====================================================
// PRINT INVOICE
// =====================================================

async function printInvoice(invoiceId) {

    try {

        const response = await fetch(
             `${API_CONFIG.BASE_URL}/printInvoice/${invoiceId}`
        );

        if (!response.ok) {
            throw new Error("Unable to load invoice");
        }

        const invoice = await response.json();

        const printWindow = window.open(
            "",
            "_blank",
            "width=800,height=600"
        );

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Invoice ${invoice.invoice_id}</title>

                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 40px;
                    }

                    .invoice {
                        max-width: 700px;
                        margin: auto;
                        border: 1px solid #ddd;
                        padding: 30px;
                    }

                    h1 {
                        text-align: center;
                    }

                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 30px;
                    }

                    th,
                    td {
                        padding: 12px;
                        border: 1px solid #ddd;
                        text-align: left;
                    }

                    .total {
                        text-align: right;
                        font-size: 20px;
                        font-weight: bold;
                        margin-top: 20px;
                    }
                </style>
            </head>

            <body>

                <div class="invoice">

                    <h1>INVOICE</h1>

                    <p>
                        <strong>Invoice ID:</strong>
                        ${invoice.invoice_id}
                    </p>

                    <p>
                        <strong>Job ID:</strong>
                        ${invoice.job_id}
                    </p>

                    <table>

                        <tr>
                            <th>Description</th>
                            <th>Amount</th>
                        </tr>

                        <tr>
                            <td>Production Job</td>
                            <td>₹${invoice.amount}</td>
                        </tr>

                    </table>

                    <div class="total">
                        Total: ₹${invoice.amount}
                    </div>

                </div>

            </body>
            </html>
        `);

        printWindow.document.close();

        printWindow.focus();

        printWindow.print();

    } catch (error) {

        console.error("Print Invoice Error:", error);

        alert("Unable to print invoice.");

    }
}


// =====================================================
// DELETE INVOICE
// =====================================================

async function deleteInvoice(invoiceId) {

    const confirmDelete = confirm(
        "Are you sure you want to delete Invoice #" +
        invoiceId +
        "?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(
             `${API_CONFIG.BASE_URL}/delInvoice/${invoiceId}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Unable to delete invoice");
        }

        const result = await response.text();

        console.log(result);

        alert("Invoice deleted successfully.");

        // Reload invoice table
        loadInvoices();

    } catch (error) {

        console.error("Delete Invoice Error:", error);

        alert("Unable to delete invoice.");

    }
}

// =====================================================
// LOAD PAYMENT MANAGEMENT
// =====================================================

async function loadPaymentManagement() {

    try {

        const response = await fetch(
             `${API_CONFIG.BASE_URL}/paymentHistory`
        );

        if (!response.ok) {

            throw new Error(
                "Unable to load payment history"
            );

        }

        const payments = await response.json();

        console.log(
            "Payments loaded:",
            payments
        );


        // =================================================
        // TOTAL RECEIVED
        // =================================================

        let totalReceived = 0;

        payments.forEach(function (payment) {

            totalReceived += Number(
                payment.amount || 0
            );

        });


        // =================================================
        // LOAD INVOICES FOR TOTAL REVENUE
        // =================================================

        let totalRevenue = 0;

        try {

            const invoiceResponse = await fetch(
                `${API_CONFIG.BASE_URL}/viewallInvoice`
            );

            if (invoiceResponse.ok) {

                const invoices =
                    await invoiceResponse.json();

                invoices.forEach(function (invoice) {

                    totalRevenue += Number(
                        invoice.amount || 0
                    );

                });

            }

        } catch (invoiceError) {

            console.error(
                "Invoice loading error:",
                invoiceError
            );

        }


        // =================================================
        // PENDING AMOUNT
        // =================================================

        const pendingAmount =
            Math.max(
                0,
                totalRevenue - totalReceived
            );


        // =================================================
        // UPDATE FINANCE CARDS
        // =================================================

        const receivedElement =
            document.getElementById(
                "totalReceivedAmount"
            );

        if (receivedElement) {

            receivedElement.textContent =
                formatCurrency(totalReceived);

        }


        const pendingElement =
            document.getElementById(
                "pendingPaymentAmount"
            );

        if (pendingElement) {

            pendingElement.textContent =
                formatCurrency(pendingAmount);

        }


        const revenueElement =
            document.getElementById(
                "totalRevenueAmount"
            );

        if (revenueElement) {

            revenueElement.textContent =
                formatCurrency(totalRevenue);

        }


        // =================================================
        // LOAD PAYMENT TABLE
        // =================================================

        renderPaymentTable(payments);

    }
    catch (error) {

        console.error(
            "Payment Management Error:",
            error
        );

        const tableBody =
            document.getElementById(
                "paymentTableBody"
            );

        if (tableBody) {

            tableBody.innerHTML = `

                <tr>

                    <td
                        colspan="4"
                        style="text-align:center;">

                        Unable to load payments

                    </td>

                </tr>

            `;

        }

    }

}


// =====================================================
// FORMAT CURRENCY
// =====================================================

function formatCurrency(amount) {

    return "₹" +
        Number(amount || 0).toLocaleString(
            "en-IN",
            {
                maximumFractionDigits: 2
            }
        );

}

// =====================================================
// RENDER PAYMENT TABLE
// =====================================================

function renderPaymentTable(payments) {

    const tableBody =
        document.getElementById(
            "paymentTableBody"
        );

    if (!tableBody) {

        return;

    }


    if (
        !payments ||
        payments.length === 0
    ) {

        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="4"
                    style="text-align:center;">

                    No payments found

                </td>

            </tr>

        `;

        return;

    }


    tableBody.innerHTML = payments
        .map(function (payment) {

            const paymentId =
                Number(payment.payment_id || 0);

            const invoiceId =
                Number(payment.invoice_id || 0);

            const amount =
                Number(payment.amount || 0);


            return `

                <tr>

                    <td>

                        <strong class="job-id">

                            PAY-${paymentId}

                        </strong>

                    </td>


                    <td>

                        INV-${invoiceId}

                    </td>


                    <td>

                        <strong>

                            ${formatCurrency(amount)}

                        </strong>

                    </td>


                    <td>

                        <button
                            class="table-action"
                            title="View"
                            onclick="viewPayment(${paymentId})">

                            <i class="bi bi-eye"></i>

                        </button>


                        <button
                            class="table-action"
                            title="Delete"
                            onclick="deletePayment(${paymentId})">

                            <i class="bi bi-trash"></i>

                        </button>

                    </td>

                </tr>

            `;

        })
        .join("");

}

// =====================================================
// VIEW PAYMENT
// =====================================================

async function viewPayment(paymentId) {

    try {

        const response = await fetch(
           `${API_CONFIG.BASE_URL}/viewPayment/${paymentId}`
        );

        if (!response.ok) {

            throw new Error(
                "Unable to load payment"
            );

        }

        const payment =
            await response.json();


        alert(
            "Payment ID: " +
            payment.payment_id +

            "\nInvoice ID: " +
            payment.invoice_id +

            "\nAmount: " +
            formatCurrency(payment.amount)
        );

    }
    catch (error) {

        console.error(
            "View Payment Error:",
            error
        );

        alert(
            "Unable to view payment."
        );

    }

}

// =====================================================
// DELETE PAYMENT
// =====================================================

async function deletePayment(paymentId) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete Payment #" +
            paymentId +
            "?"
        );


    if (!confirmDelete) {

        return;

    }


    try {

        const response = await fetch(
            `${API_CONFIG.BASE_URL}/delPayment/${paymentId}`,
            {
                method: "DELETE"
            }
        );


        if (!response.ok) {

            throw new Error(
                "Unable to delete payment"
            );

        }


        const result =
            await response.text();


        console.log(result);


        alert(
            "Payment deleted successfully."
        );


        // Refresh payment information

        loadPaymentManagement();

    }
    catch (error) {

        console.error(
            "Delete Payment Error:",
            error
        );

        alert(
            "Unable to delete payment."
        );

    }

}

// =====================================================
// OPEN RECEIVE PAYMENT
// =====================================================

function openReceivePayment() {

    const modal =
        document.getElementById(
            "receivePaymentModal"
        );

    if (!modal) {

        console.warn(
            "Receive Payment modal not found."
        );

        return;

    }


    modal.classList.add("active");

}

// =====================================================
// CLOSE RECEIVE PAYMENT
// =====================================================

function closeReceivePayment() {

    const modal =
        document.getElementById(
            "receivePaymentModal"
        );

    if (!modal) {

        return;

    }


    modal.classList.remove("active");


    const invoiceInput =
        document.getElementById(
            "paymentInvoiceId"
        );

    const amountInput =
        document.getElementById(
            "paymentAmount"
        );

    const dueMessage =
        document.getElementById(
            "paymentDueMessage"
        );


    if (invoiceInput) {

        invoiceInput.value = "";

    }


    if (amountInput) {

        amountInput.value = "";

    }


    if (dueMessage) {

        dueMessage.innerHTML = "";

    }

}

// =====================================================
// RECEIVE PAYMENT
// =====================================================

async function receivePayment() {

    const invoiceId =
        Number(
            document.getElementById(
                "paymentInvoiceId"
            ).value
        );


    const amount =
        Number(
            document.getElementById(
                "paymentAmount"
            ).value
        );


    if (!invoiceId || invoiceId <= 0) {

        alert(
            "Please enter a valid Invoice ID."
        );

        return;

    }


    if (!amount || amount <= 0) {

        alert(
            "Please enter a valid payment amount."
        );

        return;

    }


    try {

        // =============================================
        // CHECK DUE AMOUNT FIRST
        // =============================================

        const dueResponse =
            await fetch(
                `${API_CONFIG.BASE_URL}/updDuePayment/${invoiceId}`
            );


        if (!dueResponse.ok) {

            throw new Error(
                "Invoice not found"
            );

        }


        const dueAmount =
            Number(
                await dueResponse.json()
            );


        if (dueAmount <= 0) {

            alert(
                "This invoice is already fully paid."
            );

            return;

        }


        if (amount > dueAmount) {

            alert(
                "Payment cannot be greater than the due amount.\n\n" +
                "Due Amount: " +
                formatCurrency(dueAmount)
            );

            return;

        }


        // =============================================
        // SAVE PAYMENT
        // =============================================

        const response =
            await fetch(
               `${API_CONFIG.BASE_URL}/receivePayment  `,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        invoice_id:
                            invoiceId,

                        amount:
                            amount

                    })

                }
            );


        if (!response.ok) {

            throw new Error(
                "Payment failed"
            );

        }


        const result =
            await response.text();


        console.log(result);


        alert(
            "Payment received successfully."
        );


        closeReceivePayment();


        // Refresh dashboard

        loadPaymentManagement();

    }
    catch (error) {

        console.error(
            "Receive Payment Error:",
            error
        );

        alert(
            "Unable to receive payment."
        );

    }

}

function openReceivePayment() {

    const modal =
        document.getElementById("receivePaymentModal");

    if (!modal) {
        return;
    }

    modal.classList.add("active");

}

function closeReceivePayment() {

    const modal =
        document.getElementById("receivePaymentModal");

    if (!modal) {
        return;
    }

    modal.classList.remove("active");

}

// =====================================================
// LOAD USER ROLE COUNTS
// =====================================================

async function loadUserRoleCounts() {

    const adminCount =
        document.getElementById(
            "adminUserCount"
        );

    const workerCount =
        document.getElementById(
            "workerUserCount"
        );

    const customerCount =
        document.getElementById(
            "customerUserCount"
        );


    // If User Management section is not
    // available on the current page

    if (
        !adminCount ||
        !workerCount ||
        !customerCount
    ) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_CONFIG.BASE_URL}/userRoleCounts `
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load user role counts"
            );

        }


        const counts =
            await response.json();


        // =================================================
        // ADMIN
        // =================================================

        adminCount.textContent =
            Number(
                counts.Admin ||
                counts.admin ||
                0
            );


        // =================================================
        // WORKER
        // =================================================

        workerCount.textContent =
            Number(
                counts.Worker ||
                counts.worker ||
                counts.Workers ||
                counts.workers ||
                0
            );


        // =================================================
        // CUSTOMER
        // =================================================

        customerCount.textContent =
            Number(
                counts.Customer ||
                counts.customer ||
                counts.Customers ||
                counts.customers ||
                0
            );


    }
    catch (error) {

        console.error(
            "User Management Error:",
            error
        );


        adminCount.textContent = "0";
        workerCount.textContent = "0";
        customerCount.textContent = "0";

    }

}

// =====================================================
// USER MANAGEMENT
// =====================================================

let allSystemUsers = [];


// =====================================================
// LOAD ALL USERS
// =====================================================

async function loadAllSystemUsers() {

    const tableBody =
        document.getElementById(
            "userManagementTableBody"
        );

    if (!tableBody) {
        return;
    }

    try {

        const response =
            await fetch(
                `${API_CONFIG.BASE_URL}/allUsers`,
                {
                    method: "GET",
                    credentials: "include"
                }
            );

        if (!response.ok) {

            throw new Error(
                "Unable to load users"
            );

        }

        allSystemUsers =
            await response.json();

        renderSystemUsers(
            allSystemUsers
        );

    }
    catch (error) {

        console.error(
            "User Management Error:",
            error
        );

        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    class="user-loading"
                >

                    Unable to load users.

                </td>

            </tr>

        `;

    }

}


// =====================================================
// RENDER USERS
// =====================================================

function renderSystemUsers(users) {

    const tableBody =
        document.getElementById(
            "userManagementTableBody"
        );

    const noUsersMessage =
        document.getElementById(
            "noUsersMessage"
        );

    if (!tableBody) {
        return;
    }


    if (!users || users.length === 0) {

        tableBody.innerHTML = "";

        if (noUsersMessage) {

            noUsersMessage.style.display =
                "flex";

        }

        return;

    }


    if (noUsersMessage) {

        noUsersMessage.style.display =
            "none";

    }


    tableBody.innerHTML =
        users.map(
            user => createUserTableRow(user)
        ).join("");

}


// =====================================================
// CREATE USER TABLE ROW
// =====================================================

function createUserTableRow(user) {

    const userId =
        user.user_id ??
        user.userId ??
        0;

    const fullName =
        user.fullName ??
        user.full_name ??
        "N/A";

    const email =
        user.email ??
        "N/A";

    const username =
        user.username ??
        "N/A";

    const role =
        user.role ??
        "N/A";

    const status =
        user.status ??
        "Inactive";


    const roleClass =
        role.toLowerCase();


    const statusClass =
        status.toLowerCase();


    const actionText =
        status.toLowerCase() === "active"
            ? "Deactivate"
            : "Activate";


    const actionIcon =
        status.toLowerCase() === "active"
            ? "bi-person-x"
            : "bi-person-check";


    return `

        <tr>

            <!-- USER ID -->

            <td>

                <span class="user-id">
                    #${userId}
                </span>

            </td>


            <!-- USER -->

            <td>

                <div class="user-name-cell">

                    <div class="user-avatar">

                        ${getUserInitials(fullName)}

                    </div>

                    <div>

                        <strong>
                            ${escapeUserHtml(fullName)}
                        </strong>

                    </div>

                </div>

            </td>


            <!-- EMAIL -->

            <td>

                ${escapeUserHtml(email)}

            </td>


            <!-- USERNAME -->

            <td>

                <span class="username-text">

                    @${escapeUserHtml(username)}

                </span>

            </td>


            <!-- ROLE -->

            <td>

                <span
                    class="user-role-badge ${roleClass}"
                >

                    ${escapeUserHtml(role)}

                </span>

            </td>


            <!-- STATUS -->

            <td>

                <span
                    class="user-status-badge ${statusClass}"
                >

                    <span class="status-dot"></span>

                    ${escapeUserHtml(status)}

                </span>

            </td>


            <!-- ACTION -->

            <td>

                <button
                    type="button"
                    class="user-status-btn"
                    onclick="toggleUserStatus(${userId}, '${status}')"
                    title="${actionText} user"
                >

                    <i class="bi ${actionIcon}"></i>

                    ${actionText}

                </button>

            </td>

        </tr>

    `;

}


// =====================================================
// GET USER INITIALS
// =====================================================

function getUserInitials(name) {

    if (!name) {
        return "U";
    }

    const parts =
        name.trim().split(/\s+/);

    if (parts.length === 1) {

        return parts[0]
            .substring(0, 2)
            .toUpperCase();

    }

    return (
        parts[0][0] +
        parts[parts.length - 1][0]
    ).toUpperCase();

}


// =====================================================
// ESCAPE HTML
// =====================================================

function escapeUserHtml(value) {

    if (value === null || value === undefined) {

        return "";

    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// =====================================================
// FILTER USERS
// =====================================================

function filterSystemUsers() {

    const searchInput =
        document.getElementById(
            "userTableSearch"
        );

    const roleFilter =
        document.getElementById(
            "userRoleFilter"
        );

    const statusFilter =
        document.getElementById(
            "userStatusFilter"
        );


    const search =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const selectedRole =
        roleFilter
            ? roleFilter.value
            : "All";


    const selectedStatus =
        statusFilter
            ? statusFilter.value
            : "All";


    const filteredUsers =
        allSystemUsers.filter(user => {

            const fullName =
                (
                    user.fullName ??
                    user.full_name ??
                    ""
                ).toLowerCase();


            const email =
                (
                    user.email ??
                    ""
                ).toLowerCase();


            const username =
                (
                    user.username ??
                    ""
                ).toLowerCase();


            const role =
                user.role ??
                "";


            const status =
                user.status ??
                "";


            const matchesSearch =
                fullName.includes(search) ||
                email.includes(search) ||
                username.includes(search);


            const matchesRole =
                selectedRole === "All" ||
                role.toLowerCase() ===
                    selectedRole.toLowerCase();


            const matchesStatus =
                selectedStatus === "All" ||
                status.toLowerCase() ===
                    selectedStatus.toLowerCase();


            return (
                matchesSearch &&
                matchesRole &&
                matchesStatus
            );

        });


    renderSystemUsers(
        filteredUsers
    );

}


// =====================================================
// TOGGLE USER STATUS
// =====================================================

async function toggleUserStatus(
    userId,
    currentStatus
) {

    const newStatus =
        currentStatus.toLowerCase() === "active"
            ? "Inactive"
            : "Active";


    const confirmMessage =
        newStatus === "Inactive"
            ? "Are you sure you want to deactivate this user?"
            : "Are you sure you want to activate this user?";


    if (!confirm(confirmMessage)) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API_CONFIG.BASE_URL}/updateUserStatus/${userId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        status: newStatus
                    }),

                    credentials: "include"
                }
            );


        if (!response.ok) {

            const message =
                await response.text();

            throw new Error(
                message ||
                "Unable to update user status"
            );

        }


        alert(
            `User ${newStatus.toLowerCase()} successfully.`
        );


        // Reload table

        await loadAllSystemUsers();


        // Reload role cards

        await loadUserRoleCounts();


    }
    catch (error) {

        console.error(
            "Status Update Error:",
            error
        );

        alert(
            "Unable to update user status."
        );

    }

}


// =====================================================
// INITIALIZE USER MANAGEMENT
// =====================================================

function initializeUserManagement() {

    const searchInput =
        document.getElementById(
            "userTableSearch"
        );

    const roleFilter =
        document.getElementById(
            "userRoleFilter"
        );

    const statusFilter =
        document.getElementById(
            "userStatusFilter"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterSystemUsers
        );

    }


    if (roleFilter) {

        roleFilter.addEventListener(
            "change",
            filterSystemUsers
        );

    }


    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            filterSystemUsers
        );

    }


    loadUserRoleCounts();

    loadAllSystemUsers();

}

// =====================================================
// PRODUCTION INTELLIGENCE REPORTS
// =====================================================

let reportData = {
    jobs: [],
    workers: [],
    customers: [],
    machines: [],
    revenue: []
};


// =====================================================
// REPORT API BASE URL
// =====================================================

const REPORT_API_BASE = API_CONFIG.BASE_URL;


// =====================================================
// SAFE FETCH
// =====================================================

async function reportFetch(endpoint) {

    try {

        const response = await fetch(
            REPORT_API_BASE + endpoint
        );

        if (!response.ok) {

            throw new Error(
                "HTTP " + response.status
            );

        }

        const data = await response.json();

        return Array.isArray(data)
            ? data
            : [];

    } catch (error) {

        console.error(
            "Report API Error:",
            endpoint,
            error
        );

        return [];

    }

}


// =====================================================
// GET PROPERTY SAFELY
// =====================================================

function reportValue(
    object,
    properties,
    defaultValue = null
) {

    if (!object) {
        return defaultValue;
    }

    for (const property of properties) {

        if (
            object[property] !== undefined &&
            object[property] !== null
        ) {

            return object[property];

        }

    }

    return defaultValue;

}


// =====================================================
// NORMALIZE STATUS
// =====================================================

function normalizeReportStatus(value) {

    return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/_/g, " ");

}


// =====================================================
// ANIMATED NUMBER
// =====================================================

function animateReportNumber(
    element,
    target,
    duration = 900
) {

    if (!element) {
        return;
    }

    target = Number(target) || 0;

    const startTime = performance.now();

    function update(currentTime) {

        const progress = Math.min(
            (currentTime - startTime) / duration,
            1
        );

        const eased =
            1 - Math.pow(
                1 - progress,
                3
            );

        const value = Math.floor(
            target * eased
        );

        element.textContent =
            value.toLocaleString();

        if (progress < 1) {

            requestAnimationFrame(update);

        }

    }

    requestAnimationFrame(update);

}


// =====================================================
// ANIMATED PERCENTAGE
// =====================================================

function animateReportPercent(
    element,
    target
) {

    if (!element) {
        return;
    }

    target = Math.max(
        0,
        Math.min(
            100,
            Number(target) || 0
        )
    );

    const startTime = performance.now();

    function update(time) {

        const progress = Math.min(
            (time - startTime) / 900,
            1
        );

        const eased =
            1 - Math.pow(
                1 - progress,
                3
            );

        const value = Math.round(
            target * eased
        );

        element.textContent =
            value + "%";

        if (progress < 1) {

            requestAnimationFrame(update);

        }

    }

    requestAnimationFrame(update);

}


// =====================================================
// LOAD REPORT DATA
// =====================================================

async function loadProductionIntelligence() {

    const reportsSection =
        document.getElementById("reports");

    if (!reportsSection) {
        return;
    }


    console.log(
        "Loading Production Intelligence..."
    );


    const [
        jobs,
        workers,
        customers,
        machines,
        revenue
    ] = await Promise.all([

        // JOB REPORT
        reportFetch("/reportjob"),

        // WORKER REPORT
        reportFetch("/reportWorker"),

        // CUSTOMER REPORT
        reportFetch("/reportCustomer"),

        // MACHINE REPORT
        reportFetch("/reportMachine"),

        // REVENUE REPORT
        reportFetch("/reportRevenue")

    ]);


    reportData.jobs = jobs;
    reportData.workers = workers;
    reportData.customers = customers;
    reportData.machines = machines;
    reportData.revenue = revenue;


    console.log(
        "Report Data:",
        reportData
    );


    calculateProductionReport();

}


// =====================================================
// CALCULATE PRODUCTION REPORT
// =====================================================

function calculateProductionReport() {

    const jobs =
        reportData.jobs;

    const workers =
        reportData.workers;

    const customers =
        reportData.customers;

    const machines =
        reportData.machines;

    const revenue =
        reportData.revenue;


    // =================================================
    // JOB STATUS ANALYSIS
    // =================================================

    let completed = 0;
    let pending = 0;
    let assigned = 0;
    let inProgress = 0;
    let cancelled = 0;


    jobs.forEach(job => {

        const status =
            normalizeReportStatus(
                reportValue(
                    job,
                    [
                        "status",
                        "job_status",
                        "jobStatus"
                    ],
                    ""
                )
            );


        if (status === "completed") {

            completed++;

        }

        else if (status === "pending") {

            pending++;

        }

        else if (status === "assigned") {

            assigned++;

        }

        else if (
            status === "in progress"
        ) {

            inProgress++;

        }

        else if (
            status === "cancelled" ||
            status === "canceled"
        ) {

            cancelled++;

        }

    });


    const totalJobs =
        jobs.length;


    const activeJobs =
        assigned + inProgress;


    // =================================================
    // JOB CARDS
    // =================================================

    animateReportNumber(
        document.getElementById(
            "reportTotalJobs"
        ),
        totalJobs
    );


    animateReportNumber(
        document.getElementById(
            "reportCompletedJobs"
        ),
        completed
    );


    animateReportNumber(
        document.getElementById(
            "reportPendingJobs"
        ),
        pending
    );


    // =================================================
    // PRODUCTION JOURNEY
    // =================================================

    animateReportNumber(
        document.getElementById(
            "flowTotal"
        ),
        totalJobs
    );


    animateReportNumber(
        document.getElementById(
            "flowAssigned"
        ),
        assigned
    );


    animateReportNumber(
        document.getElementById(
            "flowProgress"
        ),
        inProgress
    );


    animateReportNumber(
        document.getElementById(
            "flowCompleted"
        ),
        completed
    );


    // =================================================
    // COMPLETION RATE
    // =================================================

    const completionRate =
        totalJobs > 0
            ? Math.round(
                (
                    completed /
                    totalJobs
                ) * 100
            )
            : 0;


    animateReportPercent(
        document.getElementById(
            "reportCompletionRate"
        ),
        completionRate
    );


    // =================================================
    // WORKFORCE
    // =================================================

    const totalWorkers =
        workers.length;


    let activeWorkers =
        workers.filter(worker => {

            const status =
                normalizeReportStatus(
                    reportValue(
                        worker,
                        [
                            "status",
                            "worker_status",
                            "workerStatus"
                        ],
                        "Active"
                    )
                );

            return status === "active";

        }).length;

    if (
        totalWorkers > 0 &&
        activeWorkers === 0
    ) {

        const hasWorkerStatus =
            workers.some(worker =>
                reportValue(
                    worker,
                    [
                        "status",
                        "worker_status",
                        "workerStatus"
                    ],
                    null
                ) !== null
            );


        if (!hasWorkerStatus) {

            activeWorkers =
                totalWorkers;

        }

    }


    animateReportNumber(
        document.getElementById(
            "reportTotalWorkers"
        ),
        totalWorkers
    );


    animateReportNumber(
        document.getElementById(
            "reportActiveWorkers"
        ),
        activeWorkers
    );


    animateReportNumber(
        document.getElementById(
            "reportWorkerJobs"
        ),
        activeJobs
    );


    // =================================================
    // CUSTOMER
    // =================================================

    const totalCustomers =
        customers.length;


    animateReportNumber(
        document.getElementById(
            "reportTotalCustomers"
        ),
        totalCustomers
    );

    animateReportNumber(
        document.getElementById(
            "reportCustomerJobs"
        ),
        totalJobs
    );


    animateReportNumber(
        document.getElementById(
            "reportCustomerCompleted"
        ),
        completed
    );


    // =================================================
    // MACHINE
    // =================================================

    const totalMachines =
        machines.length;


    let availableMachines = 0;
    let usedMachines = 0;


    machines.forEach(machine => {

        const status =
            normalizeReportStatus(
                reportValue(
                    machine,
                    [
                        "status",
                        "machine_status",
                        "machineStatus"
                    ],
                    ""
                )
            );


        if (
            status.includes("available") ||
            status.includes("idle") ||
            status.includes("free")
        ) {

            availableMachines++;

        }

        else if (
            status.includes("use") ||
            status.includes("running") ||
            status.includes("busy") ||
            status.includes("working")
        ) {

            usedMachines++;

        }

    });


    if (
        availableMachines === 0 &&
        usedMachines === 0 &&
        totalMachines > 0
    ) {

        availableMachines =
            totalMachines;

    }


    animateReportNumber(
        document.getElementById(
            "reportTotalMachines"
        ),
        totalMachines
    );


    animateReportNumber(
        document.getElementById(
            "reportAvailableMachines"
        ),
        availableMachines
    );


    animateReportNumber(
        document.getElementById(
            "reportUsedMachines"
        ),
        usedMachines
    );


    // =================================================
    // REVENUE
    // =================================================

    let invoiceTotal = 0;
    let paidTotal = 0;
    let dueTotal = 0;


    revenue.forEach(row => {

        const invoiceAmount =
            Number(
                reportValue(
                    row,
                    [
                        "invoice_amount",
                        "invoiceAmount",
                        "amount"
                    ],
                    0
                )
            ) || 0;


        const paidAmount =
            Number(
                reportValue(
                    row,
                    [
                        "paid_amount",
                        "paidAmount"
                    ],
                    0
                )
            ) || 0;


        const dueAmount =
            Number(
                reportValue(
                    row,
                    [
                        "due_amount",
                        "dueAmount"
                    ],
                    invoiceAmount -
                    paidAmount
                )
            ) || 0;


        invoiceTotal +=
            invoiceAmount;

        paidTotal +=
            paidAmount;

        dueTotal +=
            dueAmount;

    });


    const invoiceCount =
        revenue.length;


    animateReportCurrency(
        document.getElementById(
            "reportRevenue"
        ),
        paidTotal
    );


    animateReportNumber(
        document.getElementById(
            "reportInvoiceCount"
        ),
        invoiceCount
    );


    animateReportCurrency(
        document.getElementById(
            "reportPendingAmount"
        ),
        dueTotal
    );


    // =================================================
    // MATERIAL
    // =================================================

    loadReportMaterials();


    // =================================================
    // SYSTEM HEALTH
    // =================================================

    const productionScore =
        completionRate;


    const workforceScore =
        totalWorkers > 0
            ? Math.round(
                (
                    activeWorkers /
                    totalWorkers
                ) * 100
            )
            : 0;


    const machineScore =
        totalMachines > 0
            ? Math.round(
                (
                    availableMachines /
                    totalMachines
                ) * 100
            )
            : 0;


    const inventoryScore = 100;


    const systemScore =
        Math.round(
            (
                productionScore +
                workforceScore +
                machineScore +
                inventoryScore
            ) / 4
        );


    updateReportHealth(
        "reportProductionScore",
        "reportProductionBar",
        productionScore
    );


    updateReportHealth(
        "reportWorkerScore",
        "reportWorkerBar",
        workforceScore
    );


    updateReportHealth(
        "reportMachineScore",
        "reportMachineBar",
        machineScore
    );


    updateReportHealth(
        "reportInventoryScore",
        "reportInventoryBar",
        inventoryScore
    );


    animateReportPercent(
        document.getElementById(
            "reportSystemScore"
        ),
        systemScore
    );


    // =================================================
    // EXECUTIVE INSIGHT
    // =================================================

    generateExecutiveInsight(
        totalJobs,
        completed,
        pending,
        0,
        systemScore
    );

}


// =====================================================
// CURRENCY ANIMATION
// =====================================================

function animateReportCurrency(
    element,
    target,
    duration = 1000
) {

    if (!element) {
        return;
    }


    target =
        Number(target) || 0;


    const startTime =
        performance.now();


    function update(time) {

        const progress =
            Math.min(
                (time - startTime) /
                duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const value =
            target * eased;


        element.textContent =
            "₹" +
            Math.round(value)
                .toLocaleString("en-IN");


        if (progress < 1) {

            requestAnimationFrame(update);

        }

    }


    requestAnimationFrame(update);

}
// =====================================================
// LOAD MATERIAL REPORT
// =====================================================

async function loadReportMaterials() {

    const materials = await reportFetch("/viewallMaterial");

    const totalMaterials = materials.length;
    let lowStock = 0;

    materials.forEach(material => {

        const quantity = Number(
            reportValue(material, ["quantity", "stock", "availableQuantity"], 0)
        ) || 0;

        const minimumStock = Number(
            reportValue(material, ["minimum_stock", "minimumStock", "minStock"], 0)
        ) || 0;

        if (minimumStock > 0 && quantity <= minimumStock) {
            lowStock++;
        }
    });

    const healthyStock = Math.max(totalMaterials - lowStock, 0);

    animateReportNumber(document.getElementById("reportTotalMaterials"), totalMaterials);
    animateReportNumber(document.getElementById("reportLowStock"), lowStock);
    animateReportNumber(document.getElementById("reportHealthyStock"), healthyStock);

    const inventoryScore =
        totalMaterials > 0
            ? Math.round((healthyStock / totalMaterials) * 100)
            : 0;

    updateReportHealth("reportInventoryScore", "reportInventoryBar", inventoryScore);

    const systemScore = updateOverallReportScore(inventoryScore);

    generateExecutiveInsight(
        reportData.jobs.length,
        countJobsByStatus("completed"),
        countJobsByStatus("pending"),
        lowStock,
        systemScore
    );
}

// =====================================================
// ACTIVE WORKER COUNT
// =====================================================

function getActiveWorkerCount() {

    const workers =
        reportData.workers;

    if (!workers.length) {
        return 0;
    }


    const hasStatus =
        workers.some(worker =>
            reportValue(
                worker,
                [
                    "status",
                    "worker_status",
                    "workerStatus"
                ],
                null
            ) !== null
        );


    if (!hasStatus) {
        return workers.length;
    }


    return workers.filter(worker => {

        const status =
            normalizeReportStatus(
                reportValue(
                    worker,
                    [
                        "status",
                        "worker_status",
                        "workerStatus"
                    ],
                    ""
                )
            );

        return status === "active";

    }).length;
}


// =====================================================
// AVAILABLE MACHINE COUNT
// =====================================================

function getAvailableMachineCount() {

    const machines =
        reportData.machines;


    let available = 0;


    machines.forEach(machine => {

        const status =
            normalizeReportStatus(
                reportValue(
                    machine,
                    [
                        "status",
                        "machine_status",
                        "machineStatus"
                    ],
                    ""
                )
            );


        if (
            status.includes("available") ||
            status.includes("idle") ||
            status.includes("free")
        ) {

            available++;

        }

    });


    if (
        machines.length > 0 &&
        available === 0
    ) {

        const hasStatus =
            machines.some(machine =>
                reportValue(
                    machine,
                    [
                        "status",
                        "machine_status",
                        "machineStatus"
                    ],
                    null
                ) !== null
            );


        if (!hasStatus) {
            available =
                machines.length;
        }

    }


    return available;

}


// =====================================================
// UPDATE OVERALL REPORT SCORE
// =====================================================

function updateOverallReportScore(
    inventoryScore
) {

    const jobs =
        reportData.jobs;


    const workers =
        reportData.workers;


    const machines =
        reportData.machines;


    let completed = 0;


    jobs.forEach(job => {

        const status =
            normalizeReportStatus(
                reportValue(
                    job,
                    [
                        "status",
                        "job_status",
                        "jobStatus"
                    ],
                    ""
                )
            );


        if (status === "completed") {
            completed++;
        }

    });


    const productionScore =
        jobs.length > 0
            ? Math.round(
                (
                    completed /
                    jobs.length
                ) * 100
            )
            : 0;


    const activeWorkers =
        getActiveWorkerCount();


    const workforceScore =
        workers.length > 0
            ? Math.round(
                (
                    activeWorkers /
                    workers.length
                ) * 100
            )
            : 0;


    const availableMachines = getAvailableMachineCount();

    const machineScore = machines.length > 0 ? Math.round(( availableMachines / machines.length) * 100 ): 0;

    const systemScore = Math.round(( productionScore + workforceScore + machineScore + inventoryScore)/4);
    
    animateReportPercent( document.getElementById("reportSystemScore"),systemScore);

}


// =====================================================
// UPDATE HEALTH
// =====================================================

function updateReportHealth(
    textId,
    barId,
    value
) {

    animateReportPercent(
        document.getElementById(textId),
        value
    );


    const bar =
        document.getElementById(barId);


    if (bar) {

        setTimeout(() => {

            bar.style.width =
                Math.max(
                    0,
                    Math.min(
                        100,
                        value
                    )
                ) + "%";

        }, 100);

    }

}


// =====================================================
// EXECUTIVE INSIGHT
// =====================================================

function generateExecutiveInsight(
    totalJobs,
    completed,
    pending,
    lowStock,
    systemScore
) {

    const title =
        document.getElementById(
            "executiveInsightTitle"
        );


    const text =
        document.getElementById(
            "executiveInsightText"
        );


    const status =
        document.getElementById(
            "executiveInsightStatus"
        );


    if (
        !title ||
        !text ||
        !status
    ) {

        return;

    }


    if (lowStock > 0) {

        title.textContent =
            "Inventory needs attention.";


        text.textContent =
            lowStock +
            " material item(s) are at or below minimum stock. Review inventory before the next production cycle.";


        status.textContent =
            "ACTION REQUIRED";


        return;

    }


    if (
        totalJobs > 0 &&
        completed / totalJobs >= 0.75
    ) {

        title.textContent =
            "Production performance is strong.";


        text.textContent =
            completed +
            " of " +
            totalJobs +
            " jobs are completed. Your production workflow is currently operating efficiently.";


        status.textContent =
            "HEALTHY";


        return;

    }


    if (
        pending > completed
    ) {

        title.textContent =
            "Production workload is building.";


        text.textContent =
            pending +
            " jobs are still pending. Consider reviewing worker and machine allocation.";


        status.textContent =
            "MONITOR";


        return;

    }


    if (systemScore >= 80) {

        title.textContent =
            "System performance is healthy.";


        text.textContent =
            "Production, workforce, machinery and inventory are operating within a healthy range.";


        status.textContent =
            "STABLE";


        return;

    }


    title.textContent =
        "System intelligence is monitoring operations.";


    text.textContent =
        "The dashboard is continuously analyzing jobs, workforce, machines and inventory.";


    status.textContent =
        "ANALYZING";

}


// =====================================================
// OPEN REPORT DETAIL
// =====================================================

function openReportDetail(type) {

    const panel =
        document.getElementById(
            "reportDetailPanel"
        );


    const title =
        document.getElementById(
            "reportDetailTitle"
        );


    const content =
        document.getElementById(
            "reportDetailContent"
        );


    if (
        !panel ||
        !title ||
        !content
    ) {

        return;

    }


    let html = "";


    // =================================================
    // JOBS
    // =================================================

    if (type === "jobs") {

        const jobs =
            reportData.jobs;


        const completed =
            countJobsByStatus(
                "completed"
            );


        const pending =
            countJobsByStatus(
                "pending"
            );


        const assigned =
            countJobsByStatus(
                "assigned"
            );


        const inProgress =
            countJobsByStatus(
                "in progress"
            );


        const cancelled =
            countJobsByStatus(
                "cancelled"
            );


        title.textContent =
            "Job Intelligence";


        html = `

            <div class="report-detail-list">

                <div class="report-detail-row">
                    <span>Total Jobs</span>
                    <strong>
                        ${jobs.length}
                    </strong>
                </div>

                <div class="report-detail-row">
                    <span>Completed Jobs</span>
                    <strong>
                        ${completed}
                    </strong>
                </div>

                <div class="report-detail-row">
                    <span>Pending Jobs</span>
                    <strong>
                        ${pending}
                    </strong>
                </div>

                <div class="report-detail-row">
                    <span>Assigned Jobs</span>
                    <strong>
                        ${assigned}
                    </strong>
                </div>

                <div class="report-detail-row">
                    <span>In Progress</span>
                    <strong>
                        ${inProgress}
                    </strong>
                </div>

                <div class="report-detail-row">
                    <span>Cancelled</span>
                    <strong>
                        ${cancelled}
                    </strong>
                </div>

            </div>

        `;

    }


    // =================================================
    // WORKERS
    // =================================================

    else if (type === "workers") {

        title.textContent =
            "Workforce Intelligence";


        html = `

            <div class="report-detail-list">

                <div class="report-detail-row">
                    <span>Total Workers</span>
                    <strong>
                        ${reportData.workers.length}
                    </strong>
                </div>

                <div class="report-detail-row">
                    <span>Active Workers</span>
                    <strong>
                        ${getActiveWorkerCount()}
                    </strong>
                </div>

                <div class="report-detail-row">
                    <span>Assigned / Active Jobs</span>
                    <strong>
                        ${countActiveJobs()}
                    </strong>
                </div>

            </div>

        `;

    }


    // =================================================
    // CUSTOMERS
    // =================================================

    else if (type === "customers") {

        title.textContent =
            "Customer Intelligence";


        html = `

            <div class="report-detail-list">

                <div class="report-detail-row">
                    <span>Total Customers</span>
                    <strong>
                        ${reportData.customers.length}
                    </strong>
                </div>

                <div class="report-detail-row">
                    <span>Total Jobs</span>
                    <strong>
                        ${reportData.jobs.length}
                    </strong>
                </div>

                <div class="report-detail-row">
                    <span>Completed Jobs</span>
                    <strong>
                        ${countJobsByStatus("completed")}
                    </strong>
                </div>

                <div class="report-detail-row">
                    <span>Pending Jobs</span>
                    <strong>
                        ${countJobsByStatus("pending")}
                    </strong>
                </div>

            </div>

        `;

    }


    // =================================================
    // MACHINES
    // =================================================

    else if (type === "machines") {

        title.textContent =
            "Machine Intelligence";


        html = `

            <div class="report-detail-list">

                <div class="report-detail-row">
                    <span>Total Machines</span>
                    <strong>
                        ${reportData.machines.length}
                    </strong>
                </div>

                <div class="report-detail-row">
                    <span>Available</span>
                    <strong>
                        ${getAvailableMachineCount()}
                    </strong>
                </div>

                <div class="report-detail-row">
                    <span>In Use</span>
                    <strong>
                        ${
                            Math.max(
                                reportData.machines.length -
                                getAvailableMachineCount(),
                                0
                            )
                        }
                    </strong>
                </div>

            </div>

        `;

    }


    // =================================================
    // MATERIALS
    // =================================================

    else if (type === "materials") {

        const materials = awaitReportMaterials();

        title.textContent = "Material Intelligence";


        html = ` <div class="report-detail-list">

                <div class="report-detail-row">
                    <span>Total Materials</span>
                    <strong>
                        ${materials.total}
                    </strong>
                </div>

                <div class="report-detail-row">
                    <span>Low Stock</span>
                    <strong>
                        ${materials.low}
                    </strong>
                </div>

                <div class="report-detail-row">
                    <span>Healthy Stock</span>
                    <strong>
                        ${materials.healthy}
                    </strong>
                </div>

            </div>

        `;

    }


    // =================================================
    // FINANCE
    // =================================================

    else if (type === "finance") {

        let invoiceTotal = 0;
        let paidTotal = 0;
        let dueTotal = 0;


        reportData.revenue.forEach(row => {

            invoiceTotal +=
                Number(
                    reportValue(
                        row,
                        [
                            "invoice_amount",
                            "invoiceAmount",
                            "amount"
                        ],
                        0
                    )
                ) || 0;


            paidTotal +=
                Number(
                    reportValue(
                        row,
                        [
                            "paid_amount",
                            "paidAmount"
                        ],
                        0
                    )
                ) || 0;


            dueTotal +=
                Number(
                    reportValue(
                        row,
                        [
                            "due_amount",
                            "dueAmount"
                        ],
                        0
                    )
                ) || 0;

        });


        const collectionRate =
            invoiceTotal > 0
                ? Math.round(
                    (
                        paidTotal /
                        invoiceTotal
                    ) * 100
                )
                : 0;


        title.textContent =
            "Financial Intelligence";


        html = `

            <div class="report-detail-list">

                <div class="report-detail-row">
                    <span>Total Invoice Amount</span>
                    <strong>
                        ₹${invoiceTotal.toLocaleString("en-IN")}
                    </strong>
                </div>

                <div class="report-detail-row">
                    <span>Total Collected</span>
                    <strong>
                        ₹${paidTotal.toLocaleString("en-IN")}
                    </strong>
                </div>

                <div class="report-detail-row">
                    <span>Outstanding</span>
                    <strong>
                        ₹${dueTotal.toLocaleString("en-IN")}
                    </strong>
                </div>

                <div class="report-detail-row">
                    <span>Collection Rate</span>
                    <strong>
                        ${collectionRate}%
                    </strong>
                </div>

                <div class="report-detail-row">
                    <span>Total Invoices</span>
                    <strong>
                        ${reportData.revenue.length}
                    </strong>
                </div>

            </div>

        `;

    }


    content.innerHTML =
        html;


    panel.classList.add(
        "active"
    );


    panel.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });

}


// =====================================================
// JOB STATUS COUNT
// =====================================================

function countJobsByStatus(
    requiredStatus
) {

    const target =
        normalizeReportStatus(
            requiredStatus
        );


    return reportData.jobs.filter(job => {

        const status =
            normalizeReportStatus(
                reportValue(
                    job,
                    [
                        "status",
                        "job_status",
                        "jobStatus"
                    ],
                    ""
                )
            );


        return status === target;

    }).length;

}


// =====================================================
// ACTIVE JOB COUNT
// =====================================================

function countActiveJobs() {

    return (
        countJobsByStatus("assigned") +
        countJobsByStatus("in progress")
    );

}


// =====================================================
// MATERIAL DETAIL DATA
// =====================================================

let reportMaterialCache = {
    total: 0,
    low: 0,
    healthy: 0
};


function awaitReportMaterials() {

    return reportMaterialCache;

}


// =====================================================
// STORE MATERIAL VALUES
// =====================================================

async function refreshReportMaterialCache() {

    const materials =
        await reportFetch("/viewallMaterial");


    let low = 0;


    materials.forEach(material => {

        const quantity =
            Number(
                reportValue(
                    material,
                    [
                        "quantity",
                        "stock",
                        "availableQuantity"
                    ],
                    0
                )
            ) || 0;


        const minimum =
            Number(
                reportValue(
                    material,
                    [
                        "minimum_stock",
                        "minimumStock",
                        "minStock"
                    ],
                    0
                )
            ) || 0;


        if (
            minimum > 0 &&
            quantity <= minimum
        ) {

            low++;

        }

    });


    reportMaterialCache = {

        total:
            materials.length,

        low:
            low,

        healthy:
            Math.max(
                materials.length - low,
                0
            )

    };

}



// =====================================================
// CLOSE DETAIL
// =====================================================

function closeReportDetail() {

    const panel =
        document.getElementById(
            "reportDetailPanel"
        );


    if (panel) {

        panel.classList.remove(
            "active"
        );

    }

}


// =====================================================
// INITIALIZE REPORTS
// =====================================================

function initializeProductionIntelligence() {

    const reports =
        document.getElementById(
            "reports"
        );


    if (!reports) {
        return;
    }


    // =================================================
    // PREVENT DUPLICATE INITIALIZATION
    // =================================================

    if (
        reports.dataset.reportInitialized ===
        "true"
    ) {

        return;

    }


    reports.dataset.reportInitialized =
        "true";


    // =================================================
    // CARD CLICK
    // =================================================

    const cards =
        reports.querySelectorAll(
            ".report-intelligence-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "click",
            function () {

                const type =
                    this.dataset.report;


                openReportDetail(type);

            }
        );

    });


    // =================================================
    // CLOSE
    // =================================================

    const closeButton =
        document.getElementById(
            "closeReportDetail"
        );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeReportDetail
        );

    }


    // =================================================
    // REFRESH
    // =================================================

    const refreshButton =
        document.getElementById(
            "refreshReportsBtn"
        );


    if (refreshButton) {

        refreshButton.addEventListener(
            "click",
            async function () {

                const icon =
                    this.querySelector(
                        "i"
                    );


                if (icon) {

                    icon.classList.add(
                        "bi-spin"
                    );

                }


                await refreshReportMaterialCache();

                await loadProductionIntelligence();


                if (icon) {

                    icon.classList.remove(
                        "bi-spin"
                    );

                }

            }
        );

    }


    // =================================================
    // INITIAL LOAD
    // =================================================

    refreshReportMaterialCache();

    loadProductionIntelligence();

}


// =====================================================
// INITIALIZE WHEN DOM IS READY
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeProductionIntelligence();

    }
);


/* =========================================================
   SETTINGS MODULE
========================================================= */

const SETTINGS_API = API_CONFIG.BASE_URL;



/* =========================================================
   GET CURRENT ADMIN USER ID
========================================================= */

function getSettingsUserId() {

    /*
     * Your login code should already store the user ID.
     * This checks common locations without changing your
     * existing authentication code.
     */

    const userId =
        sessionStorage.getItem("userId") ||
        localStorage.getItem("userId");

    return userId;
}


/* =========================================================
   LOAD ADMIN SETTINGS
========================================================= */

async function loadAdminSettings() {

    const userId = getSettingsUserId();

    if (!userId) {

        console.warn("Admin user ID not found.");

        return;
    }

    try {

        const response = await fetch(
            `${SETTINGS_API}/viewSettings/${userId}`
        );

        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }

        const settings = await response.json();

        populateAdminSettings(settings);

    } catch (error) {

        console.error(
            "Settings loading error:",
            error
        );

    }
}


/* =========================================================
   POPULATE SETTINGS
========================================================= */

function populateAdminSettings(settings) {

    if (!settings) {
        return;
    }


    const usernameInput =
        document.getElementById("settingsUsername");

    const emailInput =
        document.getElementById("settingsEmail");

    const mobileInput =
        document.getElementById("settingsMobileNo");


    if (usernameInput) {

        usernameInput.value =
            settings.username || "";

    }


    if (emailInput) {

        emailInput.value =
            settings.email || "";

    }


    if (mobileInput) {

        mobileInput.value =
            settings.mobileNo || "";

    }


    const profileName =
        document.getElementById(
            "settingsProfileName"
        );

    const profileUsername =
        document.getElementById(
            "settingsProfileUsername"
        );


    if (profileName) {

        profileName.textContent =
            settings.username || "Administrator";

    }


    if (profileUsername) {

        profileUsername.textContent =
            settings.username
                ? `@${settings.username}`
                : "Administrator";

    }

}


/* =========================================================
   OPEN PROFILE MODAL
========================================================= */

function openAdminProfileModal() {

    const modal =
        document.getElementById(
            "adminProfileModal"
        );

    if (!modal) {
        return;
    }

    modal.classList.add("active");

    loadAdminSettings();

}


/* =========================================================
   CLOSE PROFILE MODAL
========================================================= */

function closeAdminProfileModal() {

    const modal =
        document.getElementById(
            "adminProfileModal"
        );

    if (modal) {

        modal.classList.remove("active");

    }

}


/* =========================================================
   SAVE ADMIN PROFILE
========================================================= */

async function saveAdminProfile() {

    const userId = getSettingsUserId();

    const username =
        document.getElementById(
            "settingsUsername"
        ).value.trim();

    const email =
        document.getElementById(
            "settingsEmail"
        ).value.trim();

    const mobileNo =
        document.getElementById(
            "settingsMobileNo"
        ).value.trim();


    if (!userId) {

        showSettingsToast(
            "Admin user ID not found.",
            "error"
        );

        return;
    }


    if (!username) {

        showSettingsToast(
            "Username is required.",
            "error"
        );

        return;
    }


    if (!email) {

        showSettingsToast(
            "Email is required.",
            "error"
        );

        return;
    }


    if (!mobileNo) {

        showSettingsToast(
            "Mobile number is required.",
            "error"
        );

        return;
    }


    const settings = {

        userId: Number(userId),

        username: username,

        email: email,

        mobileNo: mobileNo

    };


    try {

        const response = await fetch(
            `${SETTINGS_API}/updSettings`,
            {

                method: "PUT",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body:
                    JSON.stringify(settings)

            }
        );


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }


        const message =
            await response.text();


        console.log(
            "Profile update:",
            message
        );


        closeAdminProfileModal();

        populateAdminSettings(settings);

        showSettingsToast(
            "Admin profile updated successfully."
        );


    } catch (error) {

        console.error(
            "Profile update error:",
            error
        );

        showSettingsToast(
            "Profile update failed.",
            "error"
        );

    }

}


/* =========================================================
   OPEN CHANGE PASSWORD MODAL
========================================================= */

function openChangePasswordModal() {

    const modal =
        document.getElementById(
            "changePasswordModal"
        );

    if (!modal) {
        return;
    }

    modal.classList.add("active");

}


/* =========================================================
   CLOSE CHANGE PASSWORD MODAL
========================================================= */

function closeChangePasswordModal() {

    const modal =
        document.getElementById(
            "changePasswordModal"
        );

    if (modal) {

        modal.classList.remove("active");

    }


    const oldPassword =
        document.getElementById(
            "settingsOldPassword"
        );

    const newPassword =
        document.getElementById(
            "settingsNewPassword"
        );

    const confirmPassword =
        document.getElementById(
            "settingsConfirmPassword"
        );


    if (oldPassword) {
        oldPassword.value = "";
    }

    if (newPassword) {
        newPassword.value = "";
    }

    if (confirmPassword) {
        confirmPassword.value = "";
    }

}


/* =========================================================
   CHANGE PASSWORD
========================================================= */

async function saveSettingsPassword() {

    const userId = getSettingsUserId();


    const oldPassword =
        document.getElementById(
            "settingsOldPassword"
        ).value;

    const newPassword =
        document.getElementById(
            "settingsNewPassword"
        ).value;

    const confirmPassword =
        document.getElementById(
            "settingsConfirmPassword"
        ).value;


    if (!userId) {

        showSettingsToast(
            "Admin user ID not found.",
            "error"
        );

        return;
    }


    if (!oldPassword) {

        showSettingsToast(
            "Enter your current password.",
            "error"
        );

        return;
    }


    if (!newPassword) {

        showSettingsToast(
            "Enter a new password.",
            "error"
        );

        return;
    }


    if (newPassword !== confirmPassword) {

        showSettingsToast(
            "New passwords do not match.",
            "error"
        );

        return;
    }


    if (newPassword.length < 6) {

        showSettingsToast(
            "Password must contain at least 6 characters.",
            "error"
        );

        return;
    }


    const settings = {

        userId: Number(userId),

        oldPassword: oldPassword,

        newPassword: newPassword,

        confirmPassword: confirmPassword

    };


    try {

        const response = await fetch(
            `${SETTINGS_API}/changePasswordSetting`,
            {

                method: "PUT",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body:
                    JSON.stringify(settings)

            }
        );


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }


        const message =
            await response.text();


        if (
            message.toLowerCase().includes(
                "success"
            )
        ) {

            closeChangePasswordModal();

            showSettingsToast(
                "Password changed successfully."
            );

        } else {

            showSettingsToast(
                "Old password is incorrect or passwords do not match.",
                "error"
            );

        }


    } catch (error) {

        console.error(
            "Password change error:",
            error
        );

        showSettingsToast(
            "Unable to change password.",
            "error"
        );

    }

}


/* =========================================================
   NOTIFICATION SETTINGS
========================================================= */

function initializeNotificationSettings() {

    const notificationIds = [

        "lowStockNotification",

        "newJobNotification",

        "paymentNotification"

    ];


    notificationIds.forEach(id => {

        const element =
            document.getElementById(id);

        if (!element) {
            return;
        }


        const savedValue =
            localStorage.getItem(id);


        if (savedValue !== null) {

            element.checked =
                savedValue === "true";

        }


        element.addEventListener(
            "change",
            function () {

                localStorage.setItem(
                    id,
                    this.checked
                );

                showSettingsToast(
                    "Notification preference updated."
                );

            }
        );

    });

}


/* =========================================================
   INVENTORY SETTING
========================================================= */

function initializeInventorySetting() {

    const input =
        document.getElementById(
            "lowStockThreshold"
        );

    if (!input) {
        return;
    }


    const savedValue =
        localStorage.getItem(
            "lowStockThreshold"
        );


    if (savedValue !== null) {

        input.value =
            savedValue;

    }

}


/* =========================================================
   SAVE INVENTORY SETTING
========================================================= */

function saveInventorySetting() {

    const input =
        document.getElementById(
            "lowStockThreshold"
        );

    if (!input) {
        return;
    }


    const value =
        Number(input.value);


    if (value < 0) {

        showSettingsToast(
            "Threshold cannot be negative.",
            "error"
        );

        return;
    }


    localStorage.setItem(
        "lowStockThreshold",
        value
    );


    showSettingsToast(
        `Low stock threshold set to ${value} units.`
    );

}


/* =========================================================
   APPEARANCE
========================================================= */

function toggleDashboardTheme() {

    const toggle =
        document.getElementById(
            "dashboardDarkMode"
        );

    if (!toggle) {
        return;
    }


    const darkMode =
        toggle.checked;


    localStorage.setItem(
        "dashboardDarkMode",
        darkMode
    );


    document.body.classList.toggle(
        "dashboard-dark-mode",
        darkMode
    );


    showSettingsToast(
        darkMode
            ? "Dark mode enabled."
            : "Light mode enabled."
    );

}


/* =========================================================
   INITIALIZE APPEARANCE
========================================================= */

function initializeDashboardAppearance() {

    const toggle =
        document.getElementById(
            "dashboardDarkMode"
        );

    const saved =
        localStorage.getItem(
            "dashboardDarkMode"
        );


    if (saved === "true") {

        document.body.classList.add(
            "dashboard-dark-mode"
        );

        if (toggle) {
            toggle.checked = true;
        }

    }

}


/* =========================================================
   SYSTEM PREFERENCES
========================================================= */

function showSystemPreferences() {

    showSettingsToast(
        "System preferences are ready for configuration."
    );

}


/* =========================================================
   JOB SETTINGS
========================================================= */

function showJobSettings() {

    showSettingsToast(
        "Job workflow settings are ready for configuration."
    );

}


/* =========================================================
   BACKUP
========================================================= */

function showBackupMessage() {

    showSettingsToast(
        "Database backup API is not connected yet."
    );

}


/* =========================================================
   SETTINGS TOAST
========================================================= */

function showSettingsToast(
    message,
    type = "success"
) {

    const toast =
        document.getElementById(
            "settingsToast"
        );

    const messageElement =
        document.getElementById(
            "settingsToastMessage"
        );


    if (!toast || !messageElement) {
        return;
    }


    messageElement.textContent =
        message;


    toast.classList.remove(
        "error"
    );


    if (type === "error") {

        toast.classList.add(
            "error"
        );

    }


    toast.classList.add(
        "show"
    );


    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 3000);

}


/* =========================================================
   SETTINGS INITIALIZATION
========================================================= */

function initializeSettingsModule() {

    loadAdminSettings();

    initializeNotificationSettings();

    initializeInventorySetting();

    initializeDashboardAppearance();

}


/* =========================================================
   DOCUMENT READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeSettingsModule();

    }
);


/* =========================================================
   CONTACT SUPPORT
========================================================= */


var ADMIN_CONTACT_SUPPORT_API =
    `${API_CONFIG.BASE_URL}`;

var adminSupportMessagesCache = [];


/* =========================================================
   INITIALIZE CONTACT SUPPORT
========================================================= */

function initializeContactSupport() {

    var contactSupportBtn =
        document.getElementById(
            "contactSupportBtn"
        );

    var supportModal =
        document.getElementById(
            "supportModal"
        );

    var supportCloseBtn =
        document.getElementById(
            "supportCloseBtn"
        );

    var supportModalOverlay =
        document.getElementById(
            "supportModalOverlay"
        );


    if (!contactSupportBtn ||
        !supportModal) {

        console.warn(
            "Contact Support elements not found."
        );

        return;
    }


    /* =====================================================
       OPEN CONTACT SUPPORT
    ===================================================== */

    contactSupportBtn.onclick =
        function () {

            openSupportModal();

        };


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    if (supportCloseBtn) {

        supportCloseBtn.onclick =
            function () {

                closeSupportModal();

            };

    }


    /* =====================================================
       OVERLAY
    ===================================================== */

    if (supportModalOverlay) {

        supportModalOverlay.onclick =
            function () {

                closeSupportModal();

            };

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    var searchInput =
        document.getElementById(
            "supportMessageSearch"
        );


    if (searchInput) {

        searchInput.oninput =
            function () {

                filterSupportMessages(
                    this.value
                );

            };

    }

}


/* =========================================================
   OPEN SUPPORT MODAL
========================================================= */

async function openSupportModal() {

    var modal =
        document.getElementById(
            "supportModal"
        );


    if (!modal) {

        console.error(
            "supportModal not found."
        );

        return;

    }


    modal.style.display = "flex";


    document.body.style.overflow =
        "hidden";


    await loadSupportMessages();

}


/* =========================================================
   CLOSE SUPPORT MODAL
========================================================= */

function closeSupportModal() {

    var modal =
        document.getElementById(
            "supportModal"
        );


    if (!modal) {
        return;
    }


    modal.style.display = "none";


    document.body.style.overflow =
        "";


    var searchInput =
        document.getElementById(
            "supportMessageSearch"
        );


    if (searchInput) {

        searchInput.value = "";

    }

}


/* =========================================================
   LOAD SUPPORT MESSAGES
========================================================= */

async function loadSupportMessages() {

    var container =
        document.getElementById(
            "supportMessagesContainer"
        );


    if (!container) {

        console.error(
            "supportMessagesContainer not found."
        );

        return;

    }


    container.innerHTML = `

        <div class="support-loading">

            <div class="support-spinner"></div>

            <span>
                Loading support messages...
            </span>

        </div>

    `;


    try {

        /*
         * Direct backend URL.
         *
         * Do NOT use CONTACT_SUPPORT_API here.
         * Do NOT use ADMIN_CONTACT_SUPPORT_API here.
         */

        var response = await fetch(
           `${API_CONFIG.BASE_URL}/viewAllContacts`
        );


        if (!response.ok) {

            throw new Error(
                "HTTP Error: " +
                response.status
            );

        }


        var messages =
            await response.json();


        adminSupportMessagesCache =
            Array.isArray(messages)
                ? messages
                : [];


        updateSupportSummary(
            adminSupportMessagesCache
        );


        displaySupportMessages(
            adminSupportMessagesCache
        );


    } catch (error) {

        console.error(
            "Contact Support Error:",
            error
        );


        container.innerHTML = `

            <div class="support-error">

                <i class="bi bi-exclamation-triangle"></i>

                <h3>
                    Unable to Load Messages
                </h3>

                <p>
                    Unable to connect to the support
                    message service.
                </p>

                <button
                    type="button"
                    onclick="loadSupportMessages()">

                    <i class="bi bi-arrow-clockwise"></i>

                    Retry

                </button>

            </div>

        `;

    }

}




/* =========================================================
   UPDATE SUMMARY
========================================================= */

function updateSupportSummary(messages) {

    var total =
        document.getElementById(
            "totalSupportMessages"
        );


    var latest =
        document.getElementById(
            "latestSupportMessages"
        );


    if (total) {

        total.textContent =
            messages.length;

    }


    if (latest) {

        latest.textContent =
            messages.length > 0
                ? Math.min(messages.length, 5)
                : 0;

    }

}


/* =========================================================
   DISPLAY SUPPORT MESSAGES
========================================================= */

function displaySupportMessages(messages) {

    var container =
        document.getElementById(
            "supportMessagesContainer"
        );


    var empty =
        document.getElementById(
            "supportEmptyMessage"
        );


    if (!container) {
        return;
    }


    if (!messages ||
        messages.length === 0) {

        container.innerHTML = "";


        if (empty) {

            empty.style.display =
                "flex";

        }


        return;

    }


    if (empty) {

        empty.style.display =
            "none";

    }


    container.innerHTML =
        messages.map(
            function (contact) {

                var fullName =
                    contact.fullName ||
                    "Unknown User";

                var email =
                    contact.email ||
                    "No Email";

                var subject =
                    contact.subject ||
                    "No Subject";

                var message =
                    contact.message ||
                    "";


                return `

                    <div
                        class="support-message-card">

                        <div
                            class="support-message-top">

                            <div
                                class="support-user">

                                <div
                                    class="support-avatar">

                                    ${getSupportInitial(
                                        fullName
                                    )}

                                </div>


                                <div>

                                    <strong>

                                        ${escapeSupportHtml(
                                            fullName
                                        )}

                                    </strong>


                                    <span>

                                        <i
                                            class="bi bi-envelope">
                                        </i>

                                        ${escapeSupportHtml(
                                            email
                                        )}

                                    </span>

                                </div>

                            </div>


                            <span
                                class="support-message-id">

                                #${contact.contactId}

                            </span>

                        </div>


                        <div
                            class="support-message-body">

                            <h4>

                                ${escapeSupportHtml(
                                    subject
                                )}

                            </h4>


                            <p>

                                ${escapeSupportHtml(
                                    message
                                )}

                            </p>

                        </div>


                        <div
                            class="support-message-footer">

                            <span>

                                <i
                                    class="bi bi-headset">
                                </i>

                                Contact Support

                            </span>


                            <button
                                type="button"
                                onclick="viewSupportMessage(
                                    ${contact.contactId}
                                )">

                                View Message

                                <i
                                    class="bi bi-arrow-right">
                                </i>

                            </button>

                        </div>

                    </div>

                `;

            }
        ).join("");

}


/* =========================================================
   FILTER SUPPORT MESSAGES
========================================================= */

function filterSupportMessages(searchValue) {

    var search =
        String(searchValue || "")
            .trim()
            .toLowerCase();


    if (!search) {

        displaySupportMessages(
            adminSupportMessagesCache
        );

        return;

    }


    var filtered =
        adminSupportMessagesCache.filter(
            function (contact) {

                return (

                    String(
                        contact.fullName || ""
                    )
                    .toLowerCase()
                    .includes(search)

                    ||

                    String(
                        contact.email || ""
                    )
                    .toLowerCase()
                    .includes(search)

                    ||

                    String(
                        contact.subject || ""
                    )
                    .toLowerCase()
                    .includes(search)

                    ||

                    String(
                        contact.message || ""
                    )
                    .toLowerCase()
                    .includes(search)

                );

            }
        );


    displaySupportMessages(
        filtered
    );

}


/* =========================================================
   VIEW SINGLE MESSAGE
========================================================= */

function viewSupportMessage(contactId) {

    var contact =
        adminSupportMessagesCache.find(
            function (item) {

                return Number(
                    item.contactId
                ) === Number(contactId);

            }
        );


    if (!contact) {
        return;
    }


    alert(

        "Name: " +
        (contact.fullName || "N/A") +

        "\n\nEmail: " +
        (contact.email || "N/A") +

        "\n\nSubject: " +
        (contact.subject || "No Subject") +

        "\n\nMessage:\n" +
        (contact.message || "")

    );

}


/* =========================================================
   GET USER INITIAL
========================================================= */

function getSupportInitial(name) {

    if (!name) {
        return "?";
    }


    return String(name)
        .trim()
        .charAt(0)
        .toUpperCase();

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeSupportHtml(value) {

    if (value === null ||
        value === undefined) {

        return "";

    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   INITIALIZE
========================================================= */


if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            initializeContactSupport();

        }
    );

} else {

    initializeContactSupport();

}



/* =========================================================
   NOTIFICATIONS
========================================================= */

var adminNotifications = [];

var notificationInitialized = false;


/* =========================================================
   INITIALIZE NOTIFICATIONS
========================================================= */

function initializeNotifications() {

    if (notificationInitialized) {
        return;
    }

    notificationInitialized = true;


    var notificationBtn =
        document.getElementById(
            "notificationBtn"
        );

    var notificationPanel =
        document.getElementById(
            "notificationPanel"
        );

    var markReadBtn =
        document.getElementById(
            "markNotificationsRead"
        );


    if (!notificationBtn ||
        !notificationPanel) {

        console.warn(
            "Notification elements not found."
        );

        return;

    }


    /* =====================================================
       OPEN / CLOSE NOTIFICATION PANEL
    ===================================================== */

    notificationBtn.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            var isVisible =
                notificationPanel.style.display ===
                "block";

            if (isVisible) {

                notificationPanel.style.display =
                    "none";

            } else {

                notificationPanel.style.display =
                    "block";

                loadAdminNotifications();

            }

        }
    );


    /* =====================================================
       PREVENT PANEL CLICK FROM CLOSING
    ===================================================== */

    notificationPanel.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

        }
    );


    /* =====================================================
       CLOSE WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        function () {

            notificationPanel.style.display =
                "none";

        }
    );


    /* =====================================================
       MARK ALL READ
    ===================================================== */

    if (markReadBtn) {

        markReadBtn.addEventListener(
            "click",
            function () {

                markAllNotificationsRead();

            }
        );

    }


    /*
     * Load notification count when dashboard starts.
     */

    loadAdminNotifications();

}


/* =========================================================
   LOAD ADMIN NOTIFICATIONS
========================================================= */

async function loadAdminNotifications() {

    var notifications = [];


    try {

        /* =================================================
           LOAD JOBS
        ================================================= */

        var jobResponse =
            await fetch(
                `${API_CONFIG.BASE_URL}/viewAllJobs `
            );


        if (jobResponse.ok) {

            var jobs =
                await jobResponse.json();


            if (Array.isArray(jobs)) {

                jobs.forEach(
                    function (job) {

                        var status =
                            normalizeNotificationStatus(
                                job.status
                            );


                        var jobId =
                            job.jobId ||
                            job.job_id ||
                            "";


                        /*
                         * Pending Job
                         */

                        if (
                            status === "pending"
                        ) {

                            notifications.push({

                                type: "job-pending",

                                icon:
                                    "bi bi-hourglass-split",

                                title:
                                    "Pending Job",

                                message:
                                    "Job #" +
                                    jobId +
                                    " is waiting for processing.",

                                priority:
                                    "warning"

                            });

                        }


                        /*
                         * In Progress
                         */

                        if (
                            status === "in progress"
                        ) {

                            notifications.push({

                                type: "job-progress",

                                icon:
                                    "bi bi-gear-wide-connected",

                                title:
                                    "Job In Progress",

                                message:
                                    "Job #" +
                                    jobId +
                                    " is currently in progress.",

                                priority:
                                    "info"

                            });

                        }

                    }
                );

            }

        }

    } catch (error) {

        console.warn(
            "Job notification error:",
            error
        );

    }


    /* =====================================================
       LOAD MATERIALS
    ===================================================== */

    try {

        var materialResponse =
            await fetch(
              `${API_CONFIG.BASE_URL}/material`

            );


        if (materialResponse.ok) {

            var materials =
                await materialResponse.json();


            if (Array.isArray(materials)) {

                materials.forEach(
                    function (material) {

                        var quantity =
                            Number(
                                material.quantity ||
                                material.stockQuantity ||
                                material.stock_quantity ||
                                0
                            );


                        /*
                         * Same low-stock threshold
                         * commonly used by dashboard.
                         */

                        var threshold =
                            Number(
                                material.lowStockThreshold ||
                                material.low_stock_threshold ||
                                10
                            );


                        if (
                            quantity <= threshold
                        ) {

                            notifications.push({

                                type:
                                    "low-stock",

                                icon:
                                    "bi bi-box-seam",

                                title:
                                    "Low Stock",

                                message:
                                    (
                                        material.materialName ||
                                        material.material_name ||
                                        "Material"
                                    ) +
                                    " has low stock.",

                                priority:
                                    "danger"

                            });

                        }

                    }
                );

            }

        }

    } catch (error) {

        console.warn(
            "Material notification error:",
            error
        );

    }


    /* =====================================================
       LOAD CONTACT MESSAGES
    ===================================================== */

    try {

        var contactResponse =
            await fetch(
               `${API_CONFIG.BASE_URL}/viewAllContacts `
            );


        if (contactResponse.ok) {

            var contacts =
                await contactResponse.json();


            if (Array.isArray(contacts)) {

                contacts.forEach(
                    function (contact) {

                        notifications.push({

                            type:
                                "contact",

                            icon:
                                "bi bi-envelope",

                            title:
                                "New Support Message",

                            message:
                                (
                                    contact.fullName ||
                                    "A customer"
                                ) +
                                " sent a support message.",

                            priority:
                                "info"

                        });

                    }
                );

            }

        }

    } catch (error) {

        /*
         * Do not break dashboard if Contact API
         * is unavailable.
         */

        console.warn(
            "Contact notification error:",
            error
        );

    }


    /*
     * Store notifications globally.
     */

    adminNotifications =
        notifications;


    updateNotificationBadge(
        adminNotifications.length
    );


    displayAdminNotifications(
        adminNotifications
    );

}


/* =========================================================
   UPDATE NOTIFICATION BADGE
========================================================= */

function updateNotificationBadge(count) {

    var badge =
        document.getElementById(
            "notificationBadge"
        );


    if (!badge) {
        return;
    }


    if (count <= 0) {

        badge.style.display =
            "none";

        badge.textContent =
            "0";

        return;

    }


    badge.style.display =
        "flex";


    /*
     * Display 99+ for large numbers.
     */

    badge.textContent =
        count > 99
            ? "99+"
            : count;


}


/* =========================================================
   DISPLAY NOTIFICATIONS
========================================================= */

function displayAdminNotifications(
    notifications
) {

    var list =
        document.getElementById(
            "notificationList"
        );


    var summary =
        document.getElementById(
            "notificationSummary"
        );


    if (!list) {
        return;
    }


    if (!notifications ||
        notifications.length === 0) {

        list.innerHTML = `

            <div class="no-notifications">

                <div class="empty-notification-icon">

                    <i class="bi bi-bell-slash"></i>

                </div>

                <strong>
                    All caught up!
                </strong>

                <small>
                    No new notifications.
                </small>

            </div>

        `;


        if (summary) {

            summary.textContent =
                "No new notifications";

        }


        return;

    }


    if (summary) {

        summary.textContent =
            notifications.length +
            " notification" +
            (
                notifications.length === 1
                    ? ""
                    : "s"
            );

    }


    /*
     * Show newest 8 notifications
     */

    var visibleNotifications =
        notifications.slice(0, 8);


    list.innerHTML =
        visibleNotifications
            .map(
                function (notification) {

                    return `

                        <div
                            class="
                                notification-item
                                notification-${notification.priority}
                            ">

                            <div
                                class="notification-item-icon">

                                <i
                                    class="${notification.icon}">
                                </i>

                            </div>


                            <div
                                class="notification-item-content">

                                <strong>

                                    ${escapeNotificationHtml(
                                        notification.title
                                    )}

                                </strong>


                                <p>

                                    ${escapeNotificationHtml(
                                        notification.message
                                    )}

                                </p>

                            </div>


                            <button
                                type="button"
                                class="notification-close"
                                onclick="
                                    dismissNotification(
                                        '${notification.type}'
                                    )
                                "
                                title="Dismiss">

                                <i
                                    class="bi bi-x">
                                </i>

                            </button>

                        </div>

                    `;

                }
            )
            .join("");

}


/* =========================================================
   DISMISS NOTIFICATION
========================================================= */

function dismissNotification(type) {

    adminNotifications =
        adminNotifications.filter(
            function (notification) {

                return notification.type !==
                    type;

            }
        );


    updateNotificationBadge(
        adminNotifications.length
    );


    displayAdminNotifications(
        adminNotifications
    );

}


/* =========================================================
   MARK ALL READ
========================================================= */

function markAllNotificationsRead() {

    adminNotifications = [];


    updateNotificationBadge(0);


    displayAdminNotifications([]);


    var panel =
        document.getElementById(
            "notificationPanel"
        );


    if (panel) {

        panel.style.display =
            "block";

    }

}


/* =========================================================
   NORMALIZE STATUS
========================================================= */

function normalizeNotificationStatus(
    status
) {

    return String(
        status || ""
    )
    .trim()
    .toLowerCase()
    .replace(
        /_/g,
        " "
    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeNotificationHtml(
    value
) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   DYNAMIC BUSINESS OVERVIEW
========================================================= */

async function loadDashboardSummary() {

    try {

        const response = await fetch(
            `${API_CONFIG.BASE_URL}/adminDashboardSummary`
        );


        if (!response.ok) {

            throw new Error(
                "HTTP Error: " + response.status
            );

        }


        const summary =
            await response.json();


        /* ================================================
           MAIN SUMMARY CARDS
        ================================================ */

        setDashboardValue(
            "totalCustomers",
            summary.totalCustomers
        );


        setDashboardValue(
            "totalWorkers",
            summary.totalWorkers
        );


        setDashboardValue(
            "totalMachines",
            summary.totalMachines
        );


        setDashboardValue(
            "totalMaterials",
            summary.totalMaterials
        );


        setDashboardValue(
            "totalJobs",
            summary.totalJobs
        );


        setDashboardValue(
            "pendingJobs",
            summary.pendingJobs
        );


        setDashboardValue(
            "progressJobs",
            summary.progressJobs
        );


        setDashboardValue(
            "completedJobs",
            summary.completedJobs
        );


        /* ================================================
           FOOTER COUNTS
        ================================================ */

        setDashboardValue(
            "activeWorkers",
            summary.activeWorkers
        );


        setDashboardValue(
            "availableMachines",
            summary.availableMachines
        );


        setDashboardValue(
            "lowStockMaterials",
            summary.lowStockMaterials
        );


        console.log(
            "Dashboard summary loaded:",
            summary
        );


    } catch (error) {

        console.error(
            "Dashboard Summary Error:",
            error
        );

    }

}


/* =========================================================
   SET DASHBOARD VALUE
========================================================= */

function setDashboardValue(
    elementId,
    value
) {

    const element =
        document.getElementById(elementId);


    if (!element) {

        console.warn(
            "Dashboard element not found:",
            elementId
        );

        return;

    }


    element.textContent =
        value ?? 0;

}


/* =========================================================
   DYNAMIC FINANCIAL REVENUE OVERVIEW
   Uses existing APIs:
   /viewallInvoice
   /paymentHistory
========================================================= */

const INVOICE_API =
    `${API_CONFIG.BASE_URL}/viewallInvoice`;

const PAYMENT_API =
    `${API_CONFIG.BASE_URL}/paymentHistory`;


/* =========================================================
   LOAD REVENUE OVERVIEW
========================================================= */

async function loadRevenueOverview() {

    try {

        console.log("Loading Financial Revenue...");

        const periodElement =
            document.getElementById("revenuePeriod");

        const period =
            periodElement
                ? periodElement.value
                : "year";


        /* =====================================================
           LOAD INVOICES
        ===================================================== */

        const invoiceResponse =
            await fetch(INVOICE_API, {
                method: "GET",
                credentials: "include"
            });

        if (!invoiceResponse.ok) {

            throw new Error(
                "Invoice API Error: " +
                invoiceResponse.status
            );
        }

        const invoices =
            await invoiceResponse.json();


        /* =====================================================
           LOAD PAYMENTS
        ===================================================== */

        const paymentResponse =
            await fetch(PAYMENT_API, {
                method: "GET",
                credentials: "include"
            });

        if (!paymentResponse.ok) {

            throw new Error(
                "Payment API Error: " +
                paymentResponse.status
            );
        }

        const payments =
            await paymentResponse.json();


        console.log(
            "Invoices:",
            invoices
        );

        console.log(
            "Payments:",
            payments
        );


        /* =====================================================
           FILTER DATA ACCORDING TO PERIOD
        ===================================================== */

        const filteredInvoices =
            filterInvoicesByPeriod(
                invoices,
                period
            );

        const filteredPayments =
            filterPaymentsByPeriod(
                payments,
                period
            );


        /* =====================================================
           TOTAL REVENUE
           
           Financial Revenue =
           Total Invoice Amount
        ===================================================== */

        let totalRevenue = 0;

        filteredInvoices.forEach(
            invoice => {

                totalRevenue +=
                    Number(
                        invoice.amount || 0
                    );
            }
        );


        /* =====================================================
           PAID REVENUE
           
           Only successful payments
        ===================================================== */

        let paidRevenue = 0;

        filteredPayments.forEach(
            payment => {

                const status =
                    String(
                        payment.payment_status || ""
                    ).toUpperCase();


                if (
                    status === "SUCCESS" ||
                    status === "PAID" ||
                    status === "COMPLETED"
                ) {

                    paidRevenue +=
                        Number(
                            payment.amount || 0
                        );
                }

            }
        );


        /* =====================================================
           PENDING REVENUE
        ===================================================== */

        let pendingRevenue =
            totalRevenue - paidRevenue;


        if (pendingRevenue < 0) {

            pendingRevenue = 0;

        }


        /* =====================================================
           UPDATE TOTAL REVENUE
        ===================================================== */

        const totalRevenueElement =
            document.getElementById(
                "totalRevenue"
            );

        if (totalRevenueElement) {

            totalRevenueElement.textContent =
                formatCurrency(
                    totalRevenue
                );
        }


        /* =====================================================
           UPDATE PAID
        ===================================================== */

        const paidRevenueElement =
            document.getElementById(
                "paidRevenue"
            );

        if (paidRevenueElement) {

            paidRevenueElement.textContent =
                formatCurrency(
                    paidRevenue
                );
        }


        /* =====================================================
           UPDATE PENDING
        ===================================================== */

        const pendingRevenueElement =
            document.getElementById(
                "pendingRevenue"
            );

        if (pendingRevenueElement) {

            pendingRevenueElement.textContent =
                formatCurrency(
                    pendingRevenue
                );
        }


        /* =====================================================
           MONTHLY / PERIOD REVENUE
        ===================================================== */

        const monthlyRevenue =
            createRevenueChartData(
                filteredInvoices,
                period
            );


        /* =====================================================
           RENDER CHART
        ===================================================== */

        renderRevenueChart(
            monthlyRevenue
        );


        /* =====================================================
           COMPARISON
        ===================================================== */

        updateRevenueComparison(
            invoices,
            period
        );


        console.log(
            "Financial Revenue loaded successfully."
        );


    } catch (error) {

        console.error(
            "Financial Revenue Error:",
            error
        );

    }
}


/* =========================================================
   FILTER INVOICES
========================================================= */

function filterInvoicesByPeriod(
    invoices,
    period
) {

    const now =
        new Date();

    return invoices.filter(
        invoice => {

            if (!invoice.invoice_date) {

                return false;

            }

            const date =
                new Date(
                    invoice.invoice_date
                );


            if (
                isNaN(
                    date.getTime()
                )
            ) {

                return false;

            }


            /* ================================================
               THIS MONTH
            ================================================ */

            if (period === "month") {

                return (
                    date.getMonth() ===
                    now.getMonth()
                    &&
                    date.getFullYear() ===
                    now.getFullYear()
                );

            }


            /* ================================================
               LAST 6 MONTHS
            ================================================ */

            if (
                period === "sixMonths"
            ) {

                const sixMonthsAgo =
                    new Date(
                        now.getFullYear(),
                        now.getMonth() - 5,
                        1
                    );

                return date >= sixMonthsAgo;

            }


            /* ================================================
               THIS YEAR
            ================================================ */

            return (
                date.getFullYear() ===
                now.getFullYear()
            );

        }
    );
}


/* =========================================================
   FILTER PAYMENTS
========================================================= */

function filterPaymentsByPeriod(
    payments,
    period
) {

    const now =
        new Date();

    return payments.filter(
        payment => {

            if (!payment.payment_date) {

                return false;

            }

            const date =
                new Date(
                    payment.payment_date
                );


            if (
                isNaN(
                    date.getTime()
                )
            ) {

                return false;

            }


            /* ================================================
               THIS MONTH
            ================================================ */

            if (period === "month") {

                return (
                    date.getMonth() ===
                    now.getMonth()
                    &&
                    date.getFullYear() ===
                    now.getFullYear()
                );

            }


            /* ================================================
               LAST 6 MONTHS
            ================================================ */

            if (
                period === "sixMonths"
            ) {

                const sixMonthsAgo =
                    new Date(
                        now.getFullYear(),
                        now.getMonth() - 5,
                        1
                    );

                return date >= sixMonthsAgo;

            }


            /* ================================================
               THIS YEAR
            ================================================ */

            return (
                date.getFullYear() ===
                now.getFullYear()
            );

        }
    );
}


/* =========================================================
   CREATE REVENUE CHART DATA
========================================================= */

function createRevenueChartData(
    invoices,
    period
) {

    const now =
        new Date();


    /* =====================================================
       THIS MONTH
       Show weeks
    ===================================================== */

    if (period === "month") {

        const weeks = [
            {
                month: "Week 1",
                amount: 0
            },
            {
                month: "Week 2",
                amount: 0
            },
            {
                month: "Week 3",
                amount: 0
            },
            {
                month: "Week 4",
                amount: 0
            }
        ];


        invoices.forEach(
            invoice => {

                if (!invoice.invoice_date) {

                    return;

                }

                const date =
                    new Date(
                        invoice.invoice_date
                    );

                const day =
                    date.getDate();


                if (day <= 7) {

                    weeks[0].amount +=
                        Number(
                            invoice.amount || 0
                        );

                }
                else if (day <= 14) {

                    weeks[1].amount +=
                        Number(
                            invoice.amount || 0
                        );

                }
                else if (day <= 21) {

                    weeks[2].amount +=
                        Number(
                            invoice.amount || 0
                        );

                }
                else {

                    weeks[3].amount +=
                        Number(
                            invoice.amount || 0
                        );

                }

            }
        );


        return weeks;

    }


    /* =====================================================
       LAST 6 MONTHS
    ===================================================== */

    if (
        period === "sixMonths"
    ) {

        const result = [];

        for (
            let i = 5;
            i >= 0;
            i--
        ) {

            const date =
                new Date(
                    now.getFullYear(),
                    now.getMonth() - i,
                    1
                );

            const month =
                date.toLocaleString(
                    "en-IN",
                    {
                        month: "short"
                    }
                );


            let amount = 0;


            invoices.forEach(
                invoice => {

                    if (!invoice.invoice_date) {

                        return;

                    }

                    const invoiceDate =
                        new Date(
                            invoice.invoice_date
                        );


                    if (
                        invoiceDate.getMonth() ===
                            date.getMonth()
                        &&
                        invoiceDate.getFullYear() ===
                            date.getFullYear()
                    ) {

                        amount +=
                            Number(
                                invoice.amount || 0
                            );

                    }

                }
            );


            result.push({
                month: month,
                amount: amount
            });

        }


        return result;

    }


    /* =====================================================
       THIS YEAR
       Show Jan - Dec
    ===================================================== */

    const result = [];


    for (
        let monthIndex = 0;
        monthIndex < 12;
        monthIndex++
    ) {

        const monthName =
            new Date(
                now.getFullYear(),
                monthIndex,
                1
            ).toLocaleString(
                "en-IN",
                {
                    month: "short"
                }
            );


        let amount = 0;


        invoices.forEach(
            invoice => {

                if (!invoice.invoice_date) {

                    return;

                }

                const date =
                    new Date(
                        invoice.invoice_date
                    );


                if (
                    date.getMonth() ===
                    monthIndex
                ) {

                    amount +=
                        Number(
                            invoice.amount || 0
                        );

                }

            }
        );


        result.push({
            month: monthName,
            amount: amount
        });

    }


    return result;
}


/* =========================================================
   REVENUE COMPARISON
========================================================= */

function updateRevenueComparison(
    invoices,
    period
) {

    const comparison =
        document.getElementById(
            "revenueComparison"
        );

    if (!comparison) {

        return;

    }


    /* =====================================================
       For now comparison is calculated for monthly view.
    ===================================================== */

    if (period !== "month") {

        comparison.innerHTML =
            `<i class="bi bi-graph-up"></i>
             Financial revenue`;

        return;

    }


    const now =
        new Date();


    let currentMonthRevenue = 0;
    let previousMonthRevenue = 0;


    invoices.forEach(
        invoice => {

            if (!invoice.invoice_date) {

                return;

            }


            const date =
                new Date(
                    invoice.invoice_date
                );


            const amount =
                Number(
                    invoice.amount || 0
                );


            if (
                date.getMonth() ===
                    now.getMonth()
                &&
                date.getFullYear() ===
                    now.getFullYear()
            ) {

                currentMonthRevenue +=
                    amount;

            }


            const previousMonth =
                new Date(
                    now.getFullYear(),
                    now.getMonth() - 1,
                    1
                );


            if (
                date.getMonth() ===
                    previousMonth.getMonth()
                &&
                date.getFullYear() ===
                    previousMonth.getFullYear()
            ) {

                previousMonthRevenue +=
                    amount;

            }

        }
    );


    let percentage = 0;


    if (
        previousMonthRevenue > 0
    ) {

        percentage =
            (
                (
                    currentMonthRevenue -
                    previousMonthRevenue
                )
                /
                previousMonthRevenue
            ) * 100;

    }


    const icon =
        percentage >= 0
            ? "bi-arrow-up"
            : "bi-arrow-down";


    comparison.className =
        percentage >= 0
            ? "positive"
            : "negative";


    comparison.innerHTML =
        `<i class="bi ${icon}"></i>
         ${Math.abs(percentage).toFixed(1)}%
         compared to last month`;
}


/* =========================================================
   FORMAT CURRENCY
========================================================= */

function formatCurrency(
    amount
) {

    const value =
        Number(amount || 0);


    return "₹" +
        value.toLocaleString(
            "en-IN",
            {
                maximumFractionDigits: 0
            }
        );
}


/* =========================================================
   RENDER REVENUE CHART
========================================================= */

function renderRevenueChart(
    monthlyRevenue
) {

    const container =
        document.getElementById(
            "revenueBars"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    if (
        !monthlyRevenue ||
        monthlyRevenue.length === 0
    ) {

        return;

    }


    const amounts =
        monthlyRevenue.map(
            item =>
                Number(
                    item.amount || 0
                )
        );


    const maximum =
        Math.max(
            ...amounts,
            1
        );


    /* =====================================================
       Y AXIS
    ===================================================== */

    const chartMax =
        document.getElementById(
            "chartMax"
        );

    const chart75 =
        document.getElementById(
            "chart75"
        );

    const chart50 =
        document.getElementById(
            "chart50"
        );

    const chart0 =
        document.getElementById(
            "chart0"
        );


    if (chartMax) {

        chartMax.textContent =
            formatShortCurrency(
                maximum
            );

    }


    if (chart75) {

        chart75.textContent =
            formatShortCurrency(
                maximum * 0.75
            );

    }


    if (chart50) {

        chart50.textContent =
            formatShortCurrency(
                maximum * 0.50
            );

    }


    if (chart0) {

        chart0.textContent =
            "₹0";

    }


    /* =====================================================
       CREATE BARS
    ===================================================== */

    monthlyRevenue.forEach(
        (item, index) => {

            const amount =
                Number(
                    item.amount || 0
                );


            const percentage =
                maximum > 0
                    ? (
                        amount /
                        maximum
                    ) * 100
                    : 0;


            const bar =
                document.createElement(
                    "div"
                );


            bar.className =
                "bar";


            if (
                index ===
                monthlyRevenue.length - 1
            ) {

                bar.classList.add(
                    "active"
                );

            }


            bar.style.height =
                percentage + "%";


            const label =
                document.createElement(
                    "span"
                );


            label.textContent =
                item.month;


            bar.appendChild(
                label
            );


            container.appendChild(
                bar
            );

        }
    );
}


/* =========================================================
   SHORT CURRENCY FORMAT
========================================================= */

function formatShortCurrency(
    amount
) {

    const value =
        Number(amount || 0);


    if (value >= 100000) {

        return "₹" +
            (
                value / 100000
            ).toFixed(1) +
            "L";

    }


    if (value >= 1000) {

        return "₹" +
            (
                value / 1000
            ).toFixed(0) +
            "K";

    }


    return "₹" +
        value.toFixed(0);
}


/* =========================================================
   RELOAD WHEN PERIOD CHANGES
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const revenuePeriod =
            document.getElementById(
                "revenuePeriod"
            );


        if (revenuePeriod) {

            revenuePeriod.addEventListener(
                "change",
                function () {

                    loadRevenueOverview();

                }
            );

        }

    }
);
/* =========================================================
   PAYMENT SUMMARY - ADMIN DASHBOARD
========================================================= */

const PAYMENT_SUMMARY_API =
    `${API_CONFIG.BASE_URL}/adminPaymentSummary`;


async function loadPaymentSummary() {

    try {

        const response =
            await fetch(
                PAYMENT_SUMMARY_API
            );


        if (!response.ok) {

            throw new Error(
                "HTTP Error: " +
                response.status
            );

        }


        const data =
            await response.json();


        /* ================================================
           PAID
        ================================================ */

        const paidElement =
            document.getElementById(
                "dashboardPaidAmount"
            );


        if (paidElement) {

            paidElement.textContent =
                formatDashboardCurrency(
                    data.paidAmount
                );

        }


        /* ================================================
           PENDING
        ================================================ */

        const pendingElement =
            document.getElementById(
                "dashboardPendingAmount"
            );


        if (pendingElement) {

            pendingElement.textContent =
                formatDashboardCurrency(
                    data.pendingAmount
                );

        }


        /* ================================================
           TOTAL INVOICED
        ================================================ */

        const totalElement =
            document.getElementById(
                "dashboardTotalInvoiced"
            );


        if (totalElement) {

            totalElement.textContent =
                formatDashboardCurrency(
                    data.totalInvoiced
                );

        }


        /* ================================================
           COLLECTION PROGRESS
        ================================================ */

        const progress =
            Math.min(
                100,
                Math.max(
                    0,
                    Number(
                        data.collectionProgress || 0
                    )
                )
            );


        const progressText =
            document.getElementById(
                "dashboardCollectionProgress"
            );


        if (progressText) {

            progressText.textContent =
                progress.toFixed(0) + "%";

        }


        /* ================================================
           PROGRESS BAR
        ================================================ */

        const progressBar =
            document.getElementById(
                "dashboardCollectionProgressBar"
            );


        if (progressBar) {

            progressBar.style.width =
                progress + "%";

        }


        console.log(
            "Payment Summary loaded:",
            data
        );


    } catch (error) {

        console.error(
            "Payment Summary Error:",
            error
        );

    }

}


/* =========================================================
   CURRENCY FORMAT
========================================================= */

function formatDashboardCurrency(
    amount
) {

    const value =
        Number(amount || 0);


    return "₹" +
        value.toLocaleString(
            "en-IN",
            {
                maximumFractionDigits: 0
            }
        );

}


