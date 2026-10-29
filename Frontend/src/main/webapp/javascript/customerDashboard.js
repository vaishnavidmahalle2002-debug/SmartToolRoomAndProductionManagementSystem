
/* =========================================================
   API CONFIGURATION
   ========================================================= */
   
   const RAZORPAY_KEY_ID = "rzp_test_xxxxxxxxxxxx";

const API_BASE_URL = API_CONFIG.BASE_URL;

const JOB_ORDER_API = API_BASE_URL;

const CUSTOMER_ORDERS_API =
    API_BASE_URL + "/viewJobByCustomer";

const API = {

    CUSTOMER_LIST:
        API_BASE_URL + "/viewallCustomers",

    CUSTOMER_VIEW:
        API_BASE_URL + "/viewCustomer/",

    MY_PROFILE:
        API_BASE_URL + "/viewMyCustomer/",

    ADD_JOB_ORDER:
        API_BASE_URL + "/customer/addJob",

    VIEW_JOB:
        API_BASE_URL + "/viewJob/",

    ASSIGNED_JOBS:
        API_BASE_URL + "/viewAssignedJobs",

    UPDATE_JOB_STATUS:
        API_BASE_URL + "/updJobStatus",

    INVOICES:
        API_BASE_URL + "/myInvoices",

     PAYMENTS:
        API_BASE_URL + "/myPayments",
        
        NOTIFICATIONS:
    API_BASE_URL + "/myNotifications",

   LOGOUT:
    API_BASE_URL + "/auth/logout"
};


/* =========================================================
   GLOBAL VARIABLES
   ========================================================= */

let customerId = null;
let customerData = null;

let orders = [];
let invoices = [];
let payments = [];

let selectedOrder = null;


/* =========================================================
   PAGE INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", async function () {

    console.log("======================================");
    console.log("Customer Dashboard Loaded");
    console.log("======================================");

    initializeSidebar();
    initializeQuickActions();
    initializeMobileMenu();
    initializeJobOrderForm();
    initializeNotifications();
    initializeStatusDropdown();
    initializeProfileForm();
    initializeProfilePhotoPreview();

    await loadCustomerProfile();

    await loadCustomerOrders();

    console.log("Customer Dashboard initialization completed.");

});


/* =========================================================
   GET USER ID FROM LOGIN SESSION
   ========================================================= */

function getUserId() {

    const userId =
        sessionStorage.getItem("userId");

    console.log("Session userId:", userId);

    return userId;
}


/* =========================================================
   GET CUSTOMER ID
   ---------------------------------------------------------
   This function NEVER assumes userId = customerId.
   It resolves the real customer_id from backend.
   ========================================================= */

async function getLoggedInCustomerId() {

    if (
        customerId !== null &&
        customerId !== undefined &&
        !isNaN(Number(customerId))
    ) {

        return Number(customerId);
    }

    const storedCustomerId =
        sessionStorage.getItem("customerId");

    if (
        storedCustomerId &&
        !isNaN(Number(storedCustomerId))
    ) {

        customerId =
            Number(storedCustomerId);

        console.log(
            "Using cached customerId:",
            customerId
        );

        return customerId;
    }

    const userId = getUserId();

    if (!userId) {

        console.error(
            "No userId found in sessionStorage."
        );

        return null;
    }

    try {

        const url =
    API.MY_PROFILE +
    encodeURIComponent(userId);

        console.log(
            "Resolving customer from userId:",
            url
        );

        const response =
            await fetch(
                url,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );


        const responseText =
            await response.text();

        console.log(
            "Customer resolution status:",
            response.status
        );

        console.log(
            "Customer resolution response:",
            responseText
        );


        if (!response.ok) {

            throw new Error(
                responseText ||
                "Unable to load customer information."
            );
        }


        if (
            !responseText ||
            responseText.trim() === ""
        ) {

            throw new Error(
                "Customer information is empty."
            );
        }


        const customer =
            JSON.parse(responseText);


        if (!customer) {

            throw new Error(
                "Customer record not found."
            );
        }

        const realCustomerId =
            customer.customerId ??
            customer.customer_id;


        if (
            realCustomerId === null ||
            realCustomerId === undefined ||
            realCustomerId === ""
        ) {

            console.error(
                "Customer object does not contain customer_id:",
                customer
            );

            throw new Error(
                "Real customer ID was not returned by backend."
            );
        }


        customerId =
            Number(realCustomerId);


        if (isNaN(customerId)) {

            throw new Error(
                "Invalid customer ID returned by backend."
            );
        }

        sessionStorage.setItem(
            "customerId",
            String(customerId)
        );


        customerData =
            customer;


        console.log(
            "REAL customer_id resolved:",
            customerId
        );


        return customerId;

    }
    catch (error) {

        console.error(
            "Unable to resolve customer ID:",
            error
        );

        return null;
    }
}


/* =========================================================
   OLD URL / SESSION CUSTOMER ID HANDLING
   ---------------------------------------------------------
   Kept for compatibility with existing dashboard usage.
   ========================================================= */

function getCustomerId() {

    const urlParams =
        new URLSearchParams(
            window.location.search
        );

    const idFromUrl =
        urlParams.get("id");

    if (
        idFromUrl &&
        !isNaN(Number(idFromUrl))
    ) {

        customerId =
            Number(idFromUrl);

        sessionStorage.setItem(
            "customerId",
            String(customerId)
        );

        return customerId;
    }


    const storedCustomerId =
        sessionStorage.getItem("customerId");

    if (
        storedCustomerId &&
        !isNaN(Number(storedCustomerId))
    ) {

        customerId =
            Number(storedCustomerId);

        return customerId;
    }


    return null;
}


/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function showSection(sectionId, clickedLink) {

    openSection(sectionId);
}


/* =========================================================
   OPEN SECTION
   ========================================================= */

function openSection(sectionId) {

    const sections =
        document.querySelectorAll(
            ".dashboard-section"
        );


    sections.forEach(function (section) {

        section.classList.remove("active");

    });


    const selectedSection =
        document.getElementById(sectionId);


    if (!selectedSection) {

        console.warn(
            "Section not found:",
            sectionId
        );

        return;
    }


    selectedSection.classList.add("active");

    const sidebarLinks =
        document.querySelectorAll(
            ".sidebar-link"
        );


    sidebarLinks.forEach(function (link) {

        link.classList.remove("active");


        if (
            link.dataset.section ===
            sectionId
        ) {

            link.classList.add("active");
        }

    });

    const pageInfo = {

        dashboard: {
            title: "Customer Dashboard",
            subtitle:
                "Welcome back! Manage your orders and track production."
        },

        profile: {
            title: "My Profile",
            subtitle:
                "View and manage your customer information."
        },

        newOrder: {
            title: "New Job Order",
            subtitle:
                "Submit a new manufacturing job request."
        },

        orders: {
            title: "My Orders",
            subtitle:
                "View all your submitted job orders."
        },

        status: {
            title: "Order Status",
            subtitle:
                "Track the progress of your jobs."
        },

        jobDetails: {
            title: "Job Details",
            subtitle:
                "View complete information about your selected job."
        },

        invoices: {
            title: "Invoices",
            subtitle:
                "View invoices generated for your jobs."
        },

        payments: {
            title: "Payments",
            subtitle:
                "View your payment history."
        },

        notifications: {
            title: "Notifications",
            subtitle:
                "View important updates about your orders."
        }
    };


    const info =
        pageInfo[sectionId];


    if (info) {

        setText(
            "pageTitle",
            info.title
        );

        setText(
            "pageSubtitle",
            info.subtitle
        );
    }

    if (sectionId === "profile") {

        loadCustomerProfile();
    }


    if (sectionId === "orders") {

        loadCustomerOrders();
    }


    if (sectionId === "status") {

        loadCustomerOrders();
    }


    if (sectionId === "invoices") {

        loadInvoices();
    }


    if (sectionId === "payments") {

        loadPayments();
    }

    const sidebar =
        document.getElementById("sidebar");


    if (sidebar) {

        sidebar.classList.remove("show");
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   SIDEBAR EVENTS
   ========================================================= */

function initializeSidebar() {

    const links =
        document.querySelectorAll(
            ".sidebar-link"
        );


    links.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                if (this.dataset.section) {

                    event.preventDefault();

                    openSection(
                        this.dataset.section
                    );
                }

            }
        );

    });
}


/* =========================================================
   QUICK ACTION EVENTS
   ========================================================= */

function initializeQuickActions() {

    const buttons =
        document.querySelectorAll(
            "[data-open-section]"
        );


    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const section =
                    this.dataset.openSection;


                if (section) {

                    openSection(section);
                }

            }
        );

    });
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function initializeMobileMenu() {

    const menuButton =
        document.querySelector(".mobile-menu");


    if (!menuButton) {

        return;
    }


    menuButton.addEventListener(
        "click",
        function () {

            toggleSidebar();

        }
    );
}


/* =========================================================
   TOGGLE SIDEBAR
   ========================================================= */

function toggleSidebar() {

    const sidebar =
        document.getElementById("sidebar");


    if (sidebar) {

        sidebar.classList.toggle("show");
    }
}


/* =========================================================
   LOAD LOGGED-IN CUSTOMER PROFILE
   ========================================================= */

async function loadCustomerProfile() {

    console.log("Loading logged-in customer profile...");

    try {
        const userId = getUserId();

        console.log(
            "Logged-in userId:",
            userId
        );

        if (
            userId === null ||
            userId === undefined ||
            userId === ""
        ) {
            showProfileError(
                "User session not found. Please login again."
            );
            return;
        }


        const url =
            API.MY_PROFILE +
            encodeURIComponent(userId);

        console.log(
            "Customer Profile API:",
            url
        );


        const response = await fetch(
            url,
            {
                method: "GET",

                credentials: "include",

                headers: {
                    "Accept": "application/json"
                }
            }
        );


        const responseText =
            await response.text();


        console.log(
            "Customer API Status:",
            response.status
        );

        console.log(
            "Customer API Response:",
            responseText
        );

        if (!response.ok) {

            throw new Error(
                responseText ||
                "Unable to load customer profile."
            );
        }

        if (
            !responseText ||
            responseText.trim() === ""
        ) {

            throw new Error(
                "Customer profile is empty."
            );
        }

        let customer;

        try {

            customer =
                JSON.parse(responseText);

        }
        catch (error) {

            console.error(
                "Invalid customer JSON:",
                responseText
            );

            throw new Error(
                "Backend returned invalid customer data."
            );
        }

        if (!customer) {

            throw new Error(
                "Customer record not found."
            );
        }
        customerData = customer;

        const realCustomerId =
            customer.customer_id ??
            customer.customerId;


        if (
            realCustomerId === null ||
            realCustomerId === undefined ||
            realCustomerId === ""
        ) {

            throw new Error(
                "Real customer_id not found in customer profile."
            );
        }


        customerId =
            Number(realCustomerId);

        if (isNaN(customerId)) {

            throw new Error(
                "Invalid customer_id received."
            );
        }


        sessionStorage.setItem(
            "customerId",
            String(customerId)
        );


        console.log(
            "REAL customer_id:",
            customerId
        );


        populateCustomerProfile( customer );

    }

    catch (error) {

        console.error(
            "Customer profile error:",
            error
        );

        showProfileError(
            error.message ||
            "Unable to load customer profile."
        );
    }

}




/* =========================================================
   PROFILE ERROR
   ========================================================= */

function showProfileError(message) {

    const profileSection =
        document.getElementById("profile");


    if (!profileSection) {

        return;
    }


    const oldError =
        document.getElementById(
            "customerProfileError"
        );


    if (oldError) {

        oldError.remove();
    }


    const errorBox =
        document.createElement("div");


    errorBox.id =
        "customerProfileError";


    errorBox.className =
        "alert alert-danger mt-3";


    errorBox.innerHTML =
        '<i class="bi bi-exclamation-circle me-2"></i>' +
        '<strong>Profile Error:</strong> ' +
        escapeHtml(message);


    const card =
        profileSection.querySelector(
            ".content-card"
        );


    if (card) {

        card.prepend(errorBox);

    }
    else {

        profileSection.prepend(errorBox);
    }
}


/* =========================================================
   POPULATE CUSTOMER PROFILE
   ========================================================= */

function populateCustomerProfile(customer) {

    if (!customer) {

        return;
    }


    const fullName =
        customer.fullName ??
        customer.full_name ??
        customer.name ??
        "";


    const mobile =
        customer.mobileNo ??
        customer.mobile_no ??
        customer.mobile ??
        "";


    const email =
        customer.email ??
        "";


    const company =
        customer.companyName ??
        customer.company_name ??
        "";


    const gst =
        customer.gstNo ??
        customer.gst_no ??
        "";


    const city =
        customer.city ??
        "";


    const state =
        customer.state ??
        "";


    const address =
        customer.address ??
        "";


    const photo =
        customer.profilePhoto ??
        customer.profile_photo ??
        "";

    setText(
        "profileName",
        fullName || "Customer"
    );


    setText(
        "topCustomerName",
        fullName || "Customer"
    );


    setText(
        "welcomeCustomerName",
        fullName || "Customer"
    );

    setInputValue(
        "fullName",
        fullName
    );


    setInputValue(
        "mobileNo",
        mobile
    );


    setInputValue(
        "email",
        email
    );


    setInputValue(
        "companyName",
        company
    );


    setInputValue(
        "gstNo",
        gst
    );


    setInputValue(
        "city",
        city
    );


    setInputValue(
        "state",
        state
    );


    const addressElement =
        document.getElementById("address");


    if (addressElement) {

        addressElement.value =
            address;
    }

    const profilePhoto =
        document.getElementById(
            "profilePhoto"
        );


    if (profilePhoto) {

        if (photo) {

            profilePhoto.src =
                API_BASE_URL +
                "/uploads/customers/" +
                encodeURIComponent(photo);

        }
        else {

            profilePhoto.src =
                "images/avatar.webp";
        }


        profilePhoto.onerror =
            function () {

                this.onerror = null;

                this.src =
                    "images/avatar.webp";
            };
            
            /* =========================================================
   CUSTOMER ID AND USER ID
========================================================= */

const realCustomerId =
    customer.customerId ??
    customer.customer_id ??
    null;


const realUserId =
    customer.userId ??
    customer.user_id ??
    sessionStorage.getItem("userId");


console.log(
    "Profile Customer ID:",
    realCustomerId
);


console.log(
    "Profile User ID:",
    realUserId
);


/* Store customer ID */

const customerIdElement =
    document.getElementById(
        "customer_id"
    );


if (customerIdElement) {

    customerIdElement.value =
        realCustomerId || "";

}


/* Store user ID */

const userIdElement =
    document.getElementById(
        "user_id"
    );


if (userIdElement) {

    userIdElement.value =
        realUserId || "";

}
    }
}

/* =========================================================
   PROFILE PHOTO PREVIEW
========================================================= */

function initializeProfilePhotoPreview() {

    const input =
        document.getElementById(
            "profilePhotoInput"
        );


    const image =
        document.getElementById(
            "profilePhoto"
        );


    if (!input || !image) {

        return;

    }


    if (
        input.dataset.initialized ===
        "true"
    ) {

        return;

    }


    input.dataset.initialized =
        "true";


    input.addEventListener(
        "change",
        function() {

            const file =
                this.files &&
                this.files[0];


            if (!file) {

                return;

            }


            if (
                !file.type.startsWith(
                    "image/"
                )
            ) {

                alert(
                    "Please select an image file."
                );


                this.value =
                    "";


                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                function(event) {

                    image.src =
                        event.target.result;

                };


            reader.readAsDataURL(
                file
            );

        }
    );

}

/* =========================================================
   ENABLE PROFILE EDIT
========================================================= */

function enableProfileEdit() {

    console.log(
        "Edit Profile clicked."
    );


    const fields =
        document.querySelectorAll(
            ".profile-edit-field"
        );


    fields.forEach(
        function(field) {

            field.removeAttribute(
                "readonly"
            );


            field.classList.add(
                "profile-edit-enabled"
            );

        }
    );


    /* Show save/cancel buttons */

    const actions =
        document.getElementById(
            "profileEditActions"
        );


    if (actions) {

        actions.style.display =
            "flex";

    }


    /* Show photo upload */

    const photoUpload =
        document.getElementById(
            "profilePhotoUploadBox"
        );


    if (photoUpload) {

        photoUpload.style.display =
            "block";

    }


    /* Hide Edit button */

    const editButton =
        document.getElementById(
            "editProfileBtn"
        );


    if (editButton) {

        editButton.style.display =
            "none";

    }

}

/* =========================================================
   CANCEL PROFILE EDIT
========================================================= */

function cancelProfileEdit() {

    console.log(
        "Cancelling profile edit."
    );


    /*
     * Reload original customer data
     * from backend.
     */

    loadCustomerProfile();


    disableProfileEdit();

}

/* =========================================================
   DISABLE PROFILE EDIT
========================================================= */

function disableProfileEdit() {

    const fields =
        document.querySelectorAll(
            ".profile-edit-field"
        );


    fields.forEach(
        function(field) {

            field.setAttribute(
                "readonly",
                "readonly"
            );


            field.classList.remove(
                "profile-edit-enabled"
            );

        }
    );


    const actions =
        document.getElementById(
            "profileEditActions"
        );


    if (actions) {

        actions.style.display =
            "none";

    }


    const photoUpload =
        document.getElementById(
            "profilePhotoUploadBox"
        );


    if (photoUpload) {

        photoUpload.style.display =
            "none";

    }


    const editButton =
        document.getElementById(
            "editProfileBtn"
        );


    if (editButton) {

        editButton.style.display =
            "inline-block";

    }


    const photoInput =
        document.getElementById(
            "profilePhotoInput"
        );


    if (photoInput) {

        photoInput.value =
            "";

    }

}


/* =========================================================
   PROFILE FORM
========================================================= */

function initializeProfileForm() {

    const form =
        document.getElementById(
            "customerProfileForm"
        );


    if (!form) {

        return;

    }


    if (
        form.dataset.profileInitialized ===
        "true"
    ) {

        return;

    }


    form.dataset.profileInitialized =
        "true";


    form.addEventListener(
        "submit",
        saveCustomerProfile
    );

}


/* =========================================================
   SAVE CUSTOMER PROFILE
========================================================= */

async function saveCustomerProfile(event) {

    event.preventDefault();


    console.log(
        "Saving customer profile..."
    );


    if (!customerId) {

        alert(
            "Customer ID not found. Please login again."
        );

        return;

    }


    const saveButton =
        document.getElementById(
            "saveProfileBtn"
        );


    try {

        if (saveButton) {

            saveButton.disabled =
                true;

            saveButton.innerHTML =
                '<i class="bi bi-hourglass-split me-1"></i> Saving...';

        }


        /* =================================================
           GET USER ID
        ================================================= */

        const userId =
            sessionStorage.getItem(
                "userId"
            );


        if (!userId) {

            throw new Error(
                "User ID not found. Please login again."
            );

        }


        /* =================================================
           GET PROFILE VALUES
        ================================================= */

        const fullName =
            document.getElementById(
                "fullName"
            ).value.trim();


        const mobileNo =
            document.getElementById(
                "mobileNo"
            ).value.trim();


        const email =
            document.getElementById(
                "email"
            ).value.trim();


        const companyName =
            document.getElementById(
                "companyName"
            ).value.trim();


        const gstNo =
            document.getElementById(
                "gstNo"
            ).value.trim();


        const city =
            document.getElementById(
                "city"
            ).value.trim();


        const state =
            document.getElementById(
                "state"
            ).value.trim();


        const address =
            document.getElementById(
                "address"
            ).value.trim();


        /* =================================================
           VALIDATION
        ================================================= */

        if (!fullName) {

            alert(
                "Full Name is required."
            );

            return;

        }


        if (!mobileNo) {

            alert(
                "Mobile Number is required."
            );

            return;

        }


        if (!email) {

            alert(
                "Email is required."
            );

            return;

        }


        /* =================================================
           CREATE MULTIPART FORM DATA
        ================================================= */

        const formData =
            new FormData();


        formData.append(
            "customer_id",
            String(customerId)
        );


        formData.append(
            "user_id",
            String(userId)
        );


        formData.append(
            "fullName",
            fullName
        );


        formData.append(
            "mobileNo",
            mobileNo
        );


        formData.append(
            "email",
            email
        );


        formData.append(
            "address",
            address
        );


        formData.append(
            "city",
            city
        );


        formData.append(
            "state",
            state
        );


        formData.append(
            "companyName",
            companyName
        );


        formData.append(
            "gstNo",
            gstNo
        );


        /* =================================================
           PROFILE PHOTO
        ================================================= */

        const photoInput =
            document.getElementById(
                "profilePhotoInput"
            );


        if (
            photoInput &&
            photoInput.files &&
            photoInput.files.length > 0
        ) {

            formData.append(
                "profilePhoto",
                photoInput.files[0]
            );

        }


        console.log(
            "Updating customer ID:",
            customerId
        );


        console.log(
            "User ID:",
            userId
        );


        /* =================================================
           SEND UPDATE REQUEST
        ================================================= */

        const response =
            await fetch(
                API_BASE_URL +
                "/updCustomer",
                {
                    method: "PUT",

                    body: formData,

                    credentials: "include"
                }
            );


        const responseText =
            await response.text();


        console.log(
            "Update Customer Status:",
            response.status
        );


        console.log(
            "Update Customer Response:",
            responseText
        );


        if (!response.ok) {

            throw new Error(
                responseText ||
                "Unable to update customer profile."
            );

        }


        /* =================================================
           CHECK BACKEND RESPONSE
        ================================================= */

        if (
            responseText
                .toLowerCase()
                .includes("not updated")
        ) {

            throw new Error(
                responseText
            );

        }


        /* =================================================
           SUCCESS
        ================================================= */

        alert(
            responseText ||
            "Profile updated successfully."
        );


        /* Reload latest profile */

        await loadCustomerProfile();


        /* Return to view mode */

        disableProfileEdit();


    }
    catch (error) {

        console.error(
            "Profile update error:",
            error
        );


        alert(
            error.message ||
            "Unable to update customer profile."
        );

    }
    finally {

        if (saveButton) {

            saveButton.disabled =
                false;

            saveButton.innerHTML =
                '<i class="bi bi-check-circle me-1"></i> Save Changes';

        }

    }

}

/* =========================================================
   ENABLE PROFILE EDIT
   ========================================================= */

function enableProfileEdit() {

    const fields = [

        "fullName",
        "mobileNo",
        "email",
        "companyName",
        "gstNo",
        "city",
        "state",
        "address"

    ];


    fields.forEach(function (id) {

        const element =
            document.getElementById(id);


        if (element) {

            element.removeAttribute("readonly");
        }

    });


    const actions =
        document.getElementById(
            "profileEditActions"
        );


    if (actions) {

        actions.style.display = "block";
    }
}


/* =========================================================
   CANCEL PROFILE EDIT
   ========================================================= */

function cancelProfileEdit() {

    fieldsReadonly();


    if (customerData) {

        populateCustomerProfile(
            customerData
        );
    }


    const actions =
        document.getElementById(
            "profileEditActions"
        );


    if (actions) {

        actions.style.display = "none";
    }
}


/* =========================================================
   PROFILE FIELDS READONLY
   ========================================================= */

function fieldsReadonly() {

    const fields = [

        "fullName",
        "mobileNo",
        "email",
        "companyName",
        "gstNo",
        "city",
        "state",
        "address"

    ];


    fields.forEach(function (id) {

        const element =
            document.getElementById(id);


        if (element) {

            element.setAttribute(
                "readonly",
                "readonly"
            );
        }

    });
}


/* =========================================================
   INITIALIZE JOB ORDER FORM
========================================================= */

function initializeJobOrderForm() {

    const form =
        document.getElementById(
            "jobOrderForm"
        );

    if (!form) {

        console.warn(
            "jobOrderForm not found."
        );

        return;
    }


    if (
        form.dataset.jobOrderInitialized ===
        "true"
    ) {

        return;
    }


    form.dataset.jobOrderInitialized =
        "true";


    console.log(
        "Job Order Form initialized."
    );


    /* =====================================================
       LOAD MATERIALS
    ===================================================== */

    loadCustomerMaterials();


    /* =====================================================
       SUBMIT EVENT
    ===================================================== */

    form.addEventListener(
        "submit",
        submitJobOrder
    );
}

/* =========================================================
   LOAD MATERIALS FOR CUSTOMER JOB ORDER
========================================================= */

async function loadCustomerMaterials() {

    const materialSelect =
        document.getElementById(
            "material"
        );


    if (!materialSelect) {

        console.warn(
            "Material select field not found."
        );

        return;
    }


    try {

        console.log(
            "Loading materials for customer job order..."
        );


        const response =
            await fetch(
                API_BASE_URL +
                "/viewallMaterial",
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Accept":
                            "application/json"
                    }
                }
            );


        console.log(
            "Material API status:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                "Unable to load materials. HTTP " +
                response.status
            );
        }


        const materials =
            await response.json();


        console.log(
            "Materials received:",
            materials
        );


        if (!Array.isArray(materials)) {

            throw new Error(
                "Invalid material data received from backend."
            );
        }


        /* Keep first option */

        materialSelect.innerHTML =
            '<option value="">Select Material</option>';


        if (materials.length === 0) {

            materialSelect.innerHTML =
                '<option value="">No materials available</option>';

            return;
        }


        materials.forEach(
            function(material) {

                const materialName =
                    material.materialName ??
                    material.material_name ??
                    "";


                if (!materialName) {

                    return;
                }


                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    materialName;


                option.textContent =
                    materialName;


                materialSelect.appendChild(
                    option
                );
            }
        );


        console.log(
            "Customer material dropdown loaded successfully."
        );

    } catch (error) {

        console.error(
            "Error loading customer materials:",
            error
        );


        materialSelect.innerHTML =
            '<option value="">Unable to load materials</option>';


        alert(
            "Unable to load materials. Please try again."
        );
    }
}

/* =========================================================
   SUBMIT JOB ORDER
========================================================= */

async function submitJobOrder(event) {

    event.preventDefault();


    console.log(
        "Submitting new job order..."
    );


    const submitButton =
        document.getElementById(
            "submitJobBtn"
        );


    /* =====================================================
       GET FORM VALUES
    ===================================================== */

    const jobNameElement =
        document.getElementById(
            "jobName"
        );

    const jobTypeElement =
        document.getElementById(
            "jobType"
        );

    const quantityElement =
        document.getElementById(
            "quantity"
        );

    const requiredDateElement =
        document.getElementById(
            "requiredDate"
        );

    const materialElement =
        document.getElementById(
            "material"
        );

    const descriptionElement =
        document.getElementById(
            "jobDescription"
        );

    const additionalRequirementsElement =
        document.getElementById(
            "additionalRequirements"
        );

    const fileInput =
        document.getElementById(
            "jobFile"
        );


    /* =====================================================
       CHECK ELEMENTS
    ===================================================== */

    if (
        !jobNameElement ||
        !jobTypeElement ||
        !quantityElement ||
        !requiredDateElement ||
        !materialElement ||
        !descriptionElement ||
        !additionalRequirementsElement ||
        !fileInput
    ) {

        console.error(
            "One or more Job Order fields are missing."
        );


        alert(
            "Job Order form fields are missing. Please check the dashboard code."
        );


        return;
    }


    /* =====================================================
       GET VALUES
    ===================================================== */

    const jobName =
        jobNameElement.value.trim();


    const jobType =
        jobTypeElement.value.trim();


    const quantity =
        quantityElement.value;


    const requiredDate =
        requiredDateElement.value;


    const material =
        materialElement.value.trim();


    const description =
        descriptionElement.value.trim();


    const additionalRequirements =
        additionalRequirementsElement.value.trim();


    const file =
        fileInput.files.length > 0
            ? fileInput.files[0]
            : null;


    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!jobName) {

        alert(
            "Please enter Job / Product Name."
        );

        return;
    }


    if (!jobType) {

        alert(
            "Please select Job Type."
        );

        return;
    }


    if (
        !quantity ||
        Number(quantity) <= 0
    ) {

        alert(
            "Please enter a valid quantity."
        );

        return;
    }


    if (!requiredDate) {

        alert(
            "Please select Required Date."
        );

        return;
    }


    if (!material) {

        alert(
            "Please select Material."
        );

        return;
    }


    if (!description) {

        alert(
            "Please enter Job Description."
        );

        return;
    }


    /* =====================================================
       GET REAL CUSTOMER ID
    ===================================================== */

    const customerId =
        await getLoggedInCustomerId();


    if (!customerId) {

        alert(
            "Customer information could not be found. Please login again."
        );


        console.error(
            "Cannot submit job because customerId is missing."
        );


        return;
    }


    console.log(
        "Submitting with customerId:",
        customerId
    );


    console.log(
        "Selected material:",
        material
    );


    /* =====================================================
       CREATE FORM DATA
    ===================================================== */

    const formData =
        new FormData();


    formData.append(
        "customerId",
        customerId
    );


    formData.append(
        "partName",
        jobName
    );


    formData.append(
        "jobType",
        jobType
    );


    formData.append(
        "quantity",
        quantity
    );


    formData.append(
        "requiredDate",
        requiredDate
    );


    formData.append(
        "description",
        description
    );


    formData.append(
        "additionalRequirements",
        additionalRequirements
    );


    /* =====================================================
       IMPORTANT:
       SEND ONLY SELECTED MATERIAL
    ===================================================== */

    formData.append(
        "material",
        material
    );


    if (file) {

        formData.append(
            "designFile",
            file
        );
    }


    /* =====================================================
       DEBUG FORM DATA
    ===================================================== */

    console.log(
        "========== JOB ORDER DATA =========="
    );

    console.log(
        "customerId:",
        customerId
    );

    console.log(
        "partName:",
        jobName
    );

    console.log(
        "jobType:",
        jobType
    );

    console.log(
        "quantity:",
        quantity
    );

    console.log(
        "requiredDate:",
        requiredDate
    );

    console.log(
        "material:",
        material
    );

    console.log(
        "description:",
        description
    );

    console.log(
        "additionalRequirements:",
        additionalRequirements
    );

    console.log(
        "designFile:",
        file ? file.name : "No file"
    );


    /* =====================================================
       DISABLE BUTTON
    ===================================================== */

    if (submitButton) {

        submitButton.disabled =
            true;

        submitButton.innerHTML =
            '<i class="bi bi-hourglass-split me-1"></i> Submitting...';
    }


    /* =====================================================
       SEND REQUEST
    ===================================================== */

    try {

        const response =
            await fetch(
                API_BASE_URL +
                "/customer/addJob",
                {
                    method: "POST",

                    body: formData,

                    credentials: "include"
                }
            );


        console.log(
            "Job order response status:",
            response.status
        );


        const responseText =
            await response.text();


        console.log(
            "Job order response:",
            responseText
        );


        /*
         * Backend currently returns a String.
         * Therefore check the response text also.
         */

        if (!response.ok) {

            throw new Error(
                responseText ||
                "Job order submission failed."
            );
        }


        if (
            responseText
                .toLowerCase()
                .includes("failed")
        ) {

            throw new Error(
                responseText
            );
        }


        /* =================================================
           SUCCESS
        ================================================= */

        alert(
            responseText ||
            "Job order submitted successfully!"
        );


        document
            .getElementById(
                "jobOrderForm"
            )
            .reset();


        /* =================================================
           RELOAD ORDERS
        ================================================= */

        if (
            typeof loadCustomerOrders ===
            "function"
        ) {

            await loadCustomerOrders();
        }


        /* =================================================
           OPEN MY ORDERS
        ================================================= */

        if (
            typeof openSection ===
            "function"
        ) {

            openSection(
                "orders"
            );
        }


    } catch (error) {

        console.error(
            "JOB ORDER SUBMISSION ERROR:",
            error
        );


        alert(
            "Unable to submit job order.\n\n" +
            error.message
        );


    } finally {

        if (submitButton) {

            submitButton.disabled =
                false;

            submitButton.innerHTML =
                '<i class="bi bi-send me-1"></i> Submit Job Order';
        }
    }
}

/* =========================================================
   LOAD CUSTOMER ORDERS
   =========================================================
   
   IMPORTANT:
   This is the ONLY loadCustomerOrders() function.

   It calls:
       GET /viewJobByCustomer/{customerId}

   It does NOT call:
       GET /viewallJob
   ========================================================= */

async function loadCustomerOrders() {

    const ordersTable =
        document.getElementById(
            "ordersTable"
        );


    if (!ordersTable) {

        console.error(
            "ordersTable element not found."
        );

        return;
    }


    ordersTable.innerHTML =

        '<tr>' +
            '<td colspan="7" ' +
                'class="text-center text-muted py-4">' +

                '<i class="bi bi-hourglass-split me-2"></i>' +
                'Loading your orders...' +

            '</td>' +
        '</tr>';


    const realCustomerId =
        await getLoggedInCustomerId();


    console.log(
        "Customer ID for My Orders:",
        realCustomerId
    );


    if (
        realCustomerId === null ||
        realCustomerId === undefined ||
        isNaN(Number(realCustomerId))
    ) {

        orders = [];


        ordersTable.innerHTML =

            '<tr>' +
                '<td colspan="7" ' +
                    'class="text-center text-danger py-4">' +

                    '<i class="bi bi-exclamation-circle me-2"></i>' +
                    'Customer information not found. ' +
                    'Please login again.' +

                '</td>' +
            '</tr>';


        updateDashboardStatistics();

        populateStatusOrderDropdown();

        renderRecentOrders();

        return;
    }


    try {

        const url =
            CUSTOMER_ORDERS_API +
            "/" +
            encodeURIComponent(
                realCustomerId
            );


        console.log(
            "Customer Orders API:",
            url
        );


        const response =
            await fetch(
                url,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );


        console.log(
            "My Orders response status:",
            response.status
        );


        const responseText =
            await response.text();


        console.log(
            "My Orders response:",
            responseText
        );


        if (!response.ok) {

            throw new Error(
                responseText ||
                "Unable to load customer orders."
            );
        }


        if (
            !responseText ||
            responseText.trim() === ""
        ) {

            orders = [];

            renderOrders();

            updateDashboardStatistics();

            populateStatusOrderDropdown();

            return;
        }


        let data;


        try {

            data =
                JSON.parse(responseText);

        }
        catch (error) {

            console.error(
                "Invalid order JSON:",
                responseText
            );

            throw new Error(
                "Backend returned invalid order data."
            );
        }


        if (Array.isArray(data)) {

            orders =
                data;

        }
        else if (
            data &&
            Array.isArray(data.data)
        ) {

            orders =
                data.data;

        }
        else if (
            data &&
            Array.isArray(data.content)
        ) {

            orders =
                data.content;

        }
        else {

            orders = [];
        }


        console.log(
            "Customer Orders:",
            orders
        );


        renderOrders();

        updateDashboardStatistics();

        populateStatusOrderDropdown();

    }
    catch (error) {

        console.error(
            "Error loading customer orders:",
            error
        );


        orders = [];


        renderOrdersError();

        updateDashboardStatistics();

        populateStatusOrderDropdown();
    }
}


/* =========================================================
   RENDER CUSTOMER ORDERS
   ========================================================= */

function renderOrders() {

    const table =
        document.getElementById(
            "ordersTable"
        );


    if (!table) {

        return;
    }


    if (
        !Array.isArray(orders) ||
        orders.length === 0
    ) {

        table.innerHTML =

            '<tr>' +
                '<td colspan="7" ' +
                    'class="text-center text-muted py-4">' +

                    '<i class="bi bi-inbox fs-3 d-block mb-2"></i>' +
                    'No orders found.' +

                '</td>' +
            '</tr>';


        renderRecentOrders();

        return;
    }


    table.innerHTML = "";


    orders.forEach(function (order) {

        const id =
            getOrderId(order);


        const name =
            getJobName(order);


        const type =
            getJobType(order);


        const quantity =
            getValue(
                order,
                ["quantity"]
            ) ?? "-";


        const date =
            getOrderDate(order);


        const status =
            normalizeStatus(
                getOrderStatus(order)
            );


        const row =
            document.createElement("tr");


        row.innerHTML =

            '<td>' +
                '<strong>#' +
                    escapeHtml(id) +
                '</strong>' +
            '</td>' +

            '<td>' +
                escapeHtml(name) +
            '</td>' +

            '<td>' +
                escapeHtml(type) +
            '</td>' +

            '<td>' +
                escapeHtml(quantity) +
            '</td>' +

            '<td>' +
                formatDate(date) +
            '</td>' +

            '<td>' +
                createStatusBadge(status) +
            '</td>' +

            '<td>' +

                '<button ' +
                    'type="button" ' +
                    'class="btn btn-sm btn-outline-primary view-order-btn">' +

                    '<i class="bi bi-eye me-1"></i>' +
                    'View' +

                '</button>' +

            '</td>';


        const button =
            row.querySelector(
                ".view-order-btn"
            );


        if (button) {

            button.addEventListener(
                "click",
                function () {

                    viewCustomerOrder(id);

                }
            );
        }


        table.appendChild(row);

    });


    renderRecentOrders();
}


/* =========================================================
   RENDER RECENT ORDERS
   ========================================================= */

function renderRecentOrders() {

    const table =
        document.getElementById(
            "recentOrdersTable"
        );


    if (!table) {

        return;
    }


    const recent =
        orders.slice(0, 5);


    if (!recent.length) {

        table.innerHTML =

            '<tr>' +
                '<td colspan="6" ' +
                    'class="text-center text-muted py-4">' +

                    'No orders found.' +

                '</td>' +
            '</tr>';

        return;
    }


    table.innerHTML = "";


    recent.forEach(function (order) {

        const id =
            getOrderId(order);


        const name =
            getJobName(order);


        const date =
            getOrderDate(order);


        const machine =
            getValue(
                order,
                [
                    "machine_name",
                    "machineName",
                    "machine"
                ]
            ) || "Not Assigned";


        const status =
            normalizeStatus(
                getOrderStatus(order)
            );


        const row =
            document.createElement("tr");


        row.innerHTML =

            '<td>#' +
                escapeHtml(id) +
            '</td>' +

            '<td>' +
                escapeHtml(name) +
            '</td>' +

            '<td>' +
                formatDate(date) +
            '</td>' +

            '<td>' +
                escapeHtml(machine) +
            '</td>' +

            '<td>' +
                createStatusBadge(status) +
            '</td>' +

            '<td>' +

                '<button ' +
                    'type="button" ' +
                    'class="btn btn-sm btn-outline-primary recent-view-btn">' +

                    '<i class="bi bi-eye me-1"></i>' +
                    'View Details' +

                '</button>' +

            '</td>';


        const button =
            row.querySelector(
                ".recent-view-btn"
            );


        if (button) {

            button.addEventListener(
                "click",
                function () {

                    viewCustomerOrder(id);

                }
            );
        }


        table.appendChild(row);

    });
}


/* =========================================================
   ORDER ERROR
   ========================================================= */

function renderOrdersError() {

    const table =
        document.getElementById(
            "ordersTable"
        );


    if (!table) {

        return;
    }


    table.innerHTML =

        '<tr>' +
            '<td colspan="7" ' +
                'class="text-center text-danger py-4">' +

                '<i class="bi bi-exclamation-triangle me-2"></i>' +
                'Unable to load orders.' +

            '</td>' +
        '</tr>';
}


/* =========================================================
   DASHBOARD STATISTICS
   ========================================================= */

function updateDashboardStatistics() {

    let pending = 0;
    let active = 0;
    let completed = 0;


    orders.forEach(function (order) {

        const status =
            normalizeStatus(
                getOrderStatus(order)
            );


        if (status === "PENDING") {

            pending++;

        }
        else if (
            status === "ASSIGNED" ||
            status === "IN_PROGRESS"
        ) {

            active++;

        }
        else if (
            status === "COMPLETED" ||
            status === "DELIVERED"
        ) {

            completed++;
        }

    });


    setText(
        "totalOrders",
        orders.length
    );


    setText(
        "pendingOrders",
        pending
    );


    setText(
        "activeOrders",
        active
    );


    setText(
        "completedOrders",
        completed
    );
}


/* =========================================================
   VIEW CUSTOMER ORDER
   ========================================================= */

async function viewCustomerOrder(jobId) {

    if (
        jobId === null ||
        jobId === undefined ||
        jobId === "" ||
        jobId === "-"
    ) {
        alert("Order ID is missing.");
        return;
    }

    try {

        console.log("Loading Job Details for Job ID:", jobId);

        const response = await fetch(
            API.VIEW_JOB +
            encodeURIComponent(jobId),
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        console.log(
            "View Job response status:",
            response.status
        );

        const responseText = await response.text();

        console.log(
            "View Job response:",
            responseText
        );

        if (!response.ok) {

            throw new Error(
                responseText ||
                "Unable to load order details."
            );
        }

        if (
            !responseText ||
            responseText.trim() === ""
        ) {
            throw new Error(
                "No order details were returned."
            );
        }

        let order;

        try {

            order = JSON.parse(responseText);

        } catch (parseError) {

            console.error(
                "Invalid Job Details JSON:",
                responseText
            );

            throw new Error(
                "Backend returned invalid order data."
            );
        }

        if (!order) {

            throw new Error(
                "Order details not found."
            );
        }

        console.log(
            "Selected Order Details:",
            order
        );

        selectedOrder = order;

        /* Populate Job Details */

        populateJobDetails(order);

        /* Update Timeline */

        updateOrderTimeline(order);

        /* Open Job Details section */

        openSection("jobDetails");

    }

    catch (error) {

        console.error(
            "View order error:",
            error
        );

        alert(
            "Unable to load order details."
        );
    }
}


/* =========================================================
   COMPATIBILITY FUNCTION
   ========================================================= */

async function viewOrderDetails(orderId) {

    await viewCustomerOrder(orderId);

}



/* =========================================================
   POPULATE JOB DETAILS
   ========================================================= */

function populateJobDetails(order) {

    if (!order) {

        return;
    }


    setInputOrText(
        "detailOrderId",
        getOrderId(order)
    );


    setInputOrText(
        "detailJobName",
        getJobName(order)
    );


    setInputOrText(
        "detailWorker",
        getValue(
            order,
            [
                "worker_name",
                "workerName",
                "worker"
            ]
        ) || "Not Assigned"
    );


    setInputOrText(
        "detailMachine",
        getValue(
            order,
            [
                "machine_name",
                "machineName",
                "machine"
            ]
        ) || "Not Assigned"
    );


    setInputOrText(
        "detailQuantity",
        getValue(
            order,
            ["quantity"]
        ) ?? "-"
    );


    setInputOrText(
        "detailStatus",
        formatStatusText(
            getOrderStatus(order)
        )
    );

    setInputOrText(
        "detailDescription",
        getValue(
            order,
            [
                "description",
                "jobDescription"
            ]
        ) || extractDescription(order) || "-"
    );


    setInputOrText(
        "detailJobType",
        getJobType(order)
    );


    setInputOrText(
        "detailMaterial",
        getValue(
            order,
            [
                "material",
                "materialName",
                "material_name"
            ]
        ) ?? "-"
    );


    setInputOrText(
        "detailRequiredDate",
        formatDate(
            getValue(
                order,
                [
                    "required_date",
                    "requiredDate"
                ]
            )
        )
    );


    setInputOrText(
        "detailOrderDate",
        formatDate(
            getOrderDate(order)
        )
    );


    setInputOrText(
        "detailAdditionalRequirements",
        getValue(
            order,
            [
                "additional_requirements",
                "additionalRequirements"
            ]
        ) || "-"
    );


    setInputOrText(
        "detailDesignFile",
        getValue(
            order,
            [
                "design_file",
                "designFile"
            ]
        ) || "-"
    );
}


/* =========================================================
   STATUS DROPDOWN
   ========================================================= */

function populateStatusOrderDropdown() {

    const select =
        document.getElementById(
            "statusOrderSelect"
        );


    if (!select) {

        return;
    }


    select.innerHTML =

        '<option value="">' +
            'Select an order' +
        '</option>';


    orders.forEach(function (order) {

        const id =
            getOrderId(order);


        if (
            id === null ||
            id === undefined ||
            id === "-"
        ) {

            return;
        }


        const name =
            getJobName(order);


        const status =
            normalizeStatus(
                getOrderStatus(order)
            );


        const option =
            document.createElement(
                "option"
            );


        option.value =
            id;


        option.textContent =
            "#" +
            id +
            " - " +
            name +
            " (" +
            formatStatusText(status) +
            ")";


        select.appendChild(
            option
        );

    });
}


/* =========================================================
   STATUS DROPDOWN EVENT
   ========================================================= */

function initializeStatusDropdown() {

    const select =
        document.getElementById(
            "statusOrderSelect"
        );


    if (!select) {

        return;
    }


    if (
        select.dataset.initialized ===
        "true"
    ) {

        return;
    }


    select.dataset.initialized =
        "true";


    select.addEventListener(
        "change",
        function () {

            const id =
                this.value;


            if (!id) {

                resetOrderTimeline();

                return;
            }


            const order =
                orders.find(
                    function (item) {

                        return String(
                            getOrderId(item)
                        ) === String(id);

                    }
                );


            if (!order) {

                console.warn(
                    "Selected order not found:",
                    id
                );

                return;
            }


            selectedOrder =
                order;


            updateOrderTimeline(
                order
            );
        }
    );
}


/* =========================================================
   UPDATE ORDER TIMELINE
   ---------------------------------------------------------
   IMPORTANT:
   JSP uses:
       .timeline-step

   Therefore JS also uses:
       .timeline-step

   NOT .timeline-item
   ========================================================= */

function updateOrderTimeline(order) {

    if (!order) {

        return;
    }


    const status =
        normalizeStatus(
            getOrderStatus(order)
        );


    const statusOrder = [

        "PENDING",
        "ASSIGNED",
        "IN_PROGRESS",
        "COMPLETED",
        "DELIVERED"

    ];


    let currentIndex =
        statusOrder.indexOf(status);


    if (status === "CANCELLED") {

        currentIndex =
            statusOrder.indexOf("PENDING");
    }


    if (currentIndex === -1) {

        currentIndex = 0;
    }


    const timelineItems =
        document.querySelectorAll(
            "#status .timeline-step"
        );


    timelineItems.forEach(
        function (item, index) {

            item.classList.remove(
                "completed",
                "current"
            );


            if (
                index <
                currentIndex
            ) {

                item.classList.add(
                    "completed"
                );

            }
            else if (
                index ===
                currentIndex
            ) {

                item.classList.add(
                    "current"
                );
            }

        }
    );


    if (status === "CANCELLED") {

        const firstStep =
            document.querySelector(
                "#status .timeline-step"
            );


        if (firstStep) {

            firstStep.classList.add(
                "current"
            );
        }
    }


    const info =
        document.getElementById(
            "statusOrderInfo"
        );


    if (info) {

        info.innerText =

            "Order #" +
            getOrderId(order) +
            " — " +
            getJobName(order) +
            " — Current Status: " +
            formatStatusText(status);
    }
}


/* =========================================================
   RESET TIMELINE
   ========================================================= */

function resetOrderTimeline() {

    const timelineItems =
        document.querySelectorAll(
            "#status .timeline-step"
        );


    timelineItems.forEach(function (item) {

        item.classList.remove(
            "completed",
            "current"
        );

    });


    const info =
        document.getElementById(
            "statusOrderInfo"
        );


    if (info) {

        info.innerText =
            "Select an order to view its current status.";
    }
}


/* =========================================================
   STATUS BADGE
   ========================================================= */

function createStatusBadge(status) {

    const normalized =
        normalizeStatus(
            status || "Pending"
        );


    let badgeClass =
        "bg-secondary";


    switch (
        normalized
    ) {

        case "PENDING":

            badgeClass =
                "bg-warning text-dark";

            break;


        case "ASSIGNED":

            badgeClass =
                "bg-info text-dark";

            break;


        case "IN_PROGRESS":

            badgeClass =
                "bg-primary";

            break;


        case "COMPLETED":

            badgeClass =
                "bg-success";

            break;


        case "DELIVERED":

            badgeClass =
                "bg-success";

            break;


        case "CANCELLED":

            badgeClass =
                "bg-danger";

            break;
    }


    return (

        '<span class="badge ' +
        badgeClass +
        '">' +

        escapeHtml(
            formatStatusText(normalized)
        ) +

        '</span>'
    );
}


/* =========================================================
   NORMALIZE STATUS
   ========================================================= */

function normalizeStatus(status) {

    if (
        status === null ||
        status === undefined ||
        status === ""
    ) {

        return "PENDING";
    }


    return String(status)
        .trim()
        .toUpperCase()
        .replace(/[\s-]+/g, "_");
}


/* =========================================================
   FORMAT STATUS TEXT
   ========================================================= */

function formatStatusText(status) {

    const normalized =
        normalizeStatus(status);


    return normalized
        .toLowerCase()
        .split("_")
        .map(function (word) {

            return word.charAt(0).toUpperCase() +
                word.slice(1);

        })
        .join(" ");
}


/* =========================================================
   ORDER ID
   ========================================================= */

function getOrderId(order) {

    return getValue(
        order,
        [
            "job_id",
            "jobId",
            "jobOrderId",
            "job_order_id",
            "orderId",
            "order_id",
            "id"
        ]
    ) ?? "-";
}


/* =========================================================
   JOB NAME
   ========================================================= */

function getJobName(order) {

    const directName =
        getValue(
            order,
            [
                "jobName",
                "job_name",
                "partName",
                "part_name",
                "productName",
                "product_name"
            ]
        );


    if (!directName) {

        return "-";
    }

    const value =
        String(directName);


    const type =
        getJobType(order);


    if (
        type !== "-" &&
        value.endsWith(
            " - " + type
        )
    ) {

        return value.substring(
            0,
            value.length -
            (" - " + type).length
        );
    }


    return value;
}


/* =========================================================
   JOB TYPE
   ========================================================= */

function getJobType(order) {

    const directType =
        getValue(
            order,
            [
                "job_type",
                "jobType",
                "type"
            ]
        );


    if (directType) {

        return String(directType);
    }


    const partName =
        getValue(
            order,
            [
                "part_name",
                "partName"
            ]
        );


    if (partName) {

        const value =
            String(partName);


        const parts =
            value.split(" - ");


        if (parts.length > 1) {

            return parts[
                parts.length - 1
            ];
        }
    }


    return "-";
}


/* =========================================================
   ORDER DATE
   ========================================================= */

function getOrderDate(order) {

    return getValue(
        order,
        [
            "order_date",
            "orderDate",
            "created_date",
            "createdDate",
            "created_at",
            "createdAt"
        ]
    ) ?? "-";
}


/* =========================================================
   ORDER STATUS
   ========================================================= */

function getOrderStatus(order) {

    return getValue(
        order,
        [
            "status",
            "jobStatus",
            "job_status"
        ]
    ) ?? "Pending";
}


/* =========================================================
   GENERIC GET VALUE
   ========================================================= */

function getValue(object, keys) {

    if (!object) {

        return null;
    }


    for (
        let i = 0;
        i < keys.length;
        i++
    ) {

        const key =
            keys[i];


        if (
            object[key] !== undefined &&
            object[key] !== null &&
            object[key] !== ""
        ) {

            return object[key];
        }
    }


    /*
     * Nested customer object support.
     */
    if (object.customer) {

        for (
            let i = 0;
            i < keys.length;
            i++
        ) {

            const key =
                keys[i];


            if (
                object.customer[key] !== undefined &&
                object.customer[key] !== null
            ) {

                return object.customer[key];
            }
        }
    }


    return null;
}


/* =========================================================
   DESCRIPTION EXTRACTION
   ========================================================= */

function extractDescription(order) {

    const material =
        getValue(
            order,
            [
                "material",
                "materialName",
                "material_name"
            ]
        );


    if (!material) {

        return "";
    }


    const text =
        String(material);


    const separator =
        " | Additional Requirements:";


    const index =
        text.indexOf(separator);


    if (index !== -1) {

        return text.substring(
            0,
            index
        );
    }


    return text;
}


/* =========================================================
   DATE FORMAT
   ========================================================= */

function formatDate(dateValue) {

    if (
        !dateValue ||
        dateValue === "-"
    ) {

        return "-";
    }


    /*
     * yyyy-MM-dd
     */
    const date =
        new Date(dateValue);


    if (
        isNaN(
            date.getTime()
        )
    ) {

        return String(dateValue);
    }


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );
}


/* =========================================================
   PROFILE / INPUT HELPERS
   ========================================================= */

function setText(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value ?? "";
    }
}


function setTextIfExists(id, value) {

    setInputOrText(
        id,
        value
    );
}


function setInputOrText(id, value) {

    const element =
        document.getElementById(id);


    if (!element) {

        return;
    }


    if (
        element.tagName === "INPUT" ||
        element.tagName === "TEXTAREA" ||
        element.tagName === "SELECT"
    ) {

        element.value =
            value ?? "";

    }
    else {

        element.textContent =
            value ?? "";
    }
}


function setInputValue(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.value =
            value ?? "";
    }
}


function getInputValue(id) {

    const element =
        document.getElementById(id);


    if (!element) {

        return "";
    }


    return element.value.trim();
}


/* =========================================================
   HTML ESCAPE
   ========================================================= */

function escapeHtml(value) {

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
   COMPATIBILITY HTML ESCAPE
   ========================================================= */

function escapeOrderHtml(value) {

    return escapeHtml(value);
}


/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function initializeNotifications() {

    /*
     * Current JSP contains static notifications.
     *
     * No fake API request is added here.
     */
}


/* =========================================================
   INVOICE LOADING
   ---------------------------------------------------------
   Existing backend integration remains separate.
   ========================================================= */

async function loadInvoices() {

    const table =
        document.getElementById(
            "invoiceTable"
        );


    if (!table) {

        return;
    }

    try {

        const response =
            await fetch(
                API.INVOICES,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load invoices."
            );
        }


        const data =
            await response.json();


        if (!Array.isArray(data)) {

            table.innerHTML =

                '<tr>' +
                    '<td colspan="6" ' +
                        'class="text-center text-muted py-4">' +
                        'No invoices available.' +
                    '</td>' +
                '</tr>';

            return;
        }


        invoices =
            data;
            
            updateInvoiceSummary(invoices);
            
            function updateInvoiceSummary(invoiceList) {

    const totalCountElement =
        document.getElementById(
            "totalInvoiceCount"
        );

    const totalAmountElement =
        document.getElementById(
            "totalInvoiceAmount"
        );

    const paidAmountElement =
        document.getElementById(
            "paidInvoiceAmount"
        );

    const pendingAmountElement =
        document.getElementById(
            "pendingInvoiceAmount"
        );


    let totalAmount = 0;
    let paidAmount = 0;
    let pendingAmount = 0;


    invoiceList.forEach(function(invoice) {

        const amount =
            Number(
                getValue(
                    invoice,
                    [
                        "amount",
                        "total_amount",
                        "totalAmount"
                    ]
                )
            ) || 0;


        const status =
            String(
                getValue(
                    invoice,
                    [
                        "payment_status",
                        "paymentStatus",
                        "status"
                    ]
                ) || "PENDING"
            ).toUpperCase();


        totalAmount += amount;


        if (status === "PAID") {

            paidAmount += amount;

        } else {

            pendingAmount += amount;
        }

    });


    if (totalCountElement) {

        totalCountElement.textContent =
            invoiceList.length;
    }


    if (totalAmountElement) {

        totalAmountElement.textContent =
            "₹" + totalAmount.toFixed(2);
    }


    if (paidAmountElement) {

        paidAmountElement.textContent =
            "₹" + paidAmount.toFixed(2);
    }


    if (pendingAmountElement) {

        pendingAmountElement.textContent =
            "₹" + pendingAmount.toFixed(2);
    }
}


        if (!invoices.length) {

            table.innerHTML =

                '<tr>' +
                    '<td colspan="6" ' +
                        'class="text-center text-muted py-4">' +
                        'No invoices available.' +
                    '</td>' +
                '</tr>';

            return;
        }


        table.innerHTML = "";


        invoices.forEach(function (invoice) {

            const row =
                document.createElement("tr");


            row.innerHTML =

                '<td>' +
                    escapeHtml(
                        getValue(
                            invoice,
                            [
                                "invoice_no",
                                "invoiceNo",
                                "invoice_id",
                                "invoiceId"
                            ]
                        ) ?? "-"
                    ) +
                '</td>' +

                '<td>' +
                    escapeHtml(
                        getValue(
                            invoice,
                            [
                                "job_id",
                                "jobId",
                                "order_id",
                                "orderId"
                            ]
                        ) ?? "-"
                    ) +
                '</td>' +

                '<td>' +
                    formatDate(
                        getValue(
                            invoice,
                            [
                                "invoice_date",
                                "invoiceDate",
                                "created_at",
                                "createdAt"
                            ]
                        )
                    ) +
                '</td>' +

                '<td>' +
                    escapeHtml(
                        getValue(
                            invoice,
                            [
                                "total_amount",
                                "totalAmount",
                                "amount"
                            ]
                        ) ?? "-"
                    ) +
                '</td>' +

                '<td>' +
                    escapeHtml(
                        getValue(
                            invoice,
                            [
                                "payment_status",
                                "paymentStatus",
                                "status"
                            ]
                        ) ?? "-"
                    ) +
                '</td>' +

                '<td>' +
                    '<button type="button" ' +
                        'class="btn btn-sm btn-outline-primary">' +
                        '<i class="bi bi-eye"></i> View' +
                    '</button>' +
                '</td>';


            table.appendChild(row);

        });

    }
    catch (error) {

        console.error(
            "Invoice loading error:",
            error
        );


        table.innerHTML =

            '<tr>' +
                '<td colspan="6" ' +
                    'class="text-center text-danger py-4">' +
                    'Unable to load invoices.' +
                '</td>' +
            '</tr>';
    }
}

async function viewInvoice(invoiceId) {

    try {

        const response =
            await fetch(
                API_BASE_URL +
                "/myInvoice/" +
                encodeURIComponent(invoiceId),
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load invoice."
            );
        }


        const invoice =
            await response.json();


        showInvoiceDetails(invoice);

    }
    catch (error) {

        console.error(
            "Invoice details error:",
            error
        );

        alert(
            "Unable to load invoice details."
        );
    }
}

let selectedCustomerInvoice = null;


function showInvoiceDetails(invoice) {

    selectedCustomerInvoice = invoice;


    const container =
        document.getElementById(
            "invoiceDetailsContent"
        );


    if (!container) {
        return;
    }


    const invoiceNo =
        getValue(
            invoice,
            [
                "invoice_no",
                "invoiceNo",
                "invoice_id",
                "invoiceId"
            ]
        ) || "-";


    const jobId =
        getValue(
            invoice,
            [
                "job_id",
                "jobId"
            ]
        ) || "-";


    const invoiceDate =
        formatDate(
            getValue(
                invoice,
                [
                    "invoice_date",
                    "invoiceDate"
                ]
            )
        );


    const dueDate =
        formatDate(
            getValue(
                invoice,
                [
                    "due_date",
                    "dueDate"
                ]
            )
        );


    const amount =
        Number(
            getValue(
                invoice,
                [
                    "amount",
                    "total_amount",
                    "totalAmount"
                ]
            )
        ) || 0;


    const status =
        getValue(
            invoice,
            [
                "payment_status",
                "paymentStatus",
                "status"
            ]
        ) || "PENDING";


    container.innerHTML = `

        <div class="invoice-preview">

            <div class="d-flex
                        justify-content-between
                        mb-4">

                <div>

                    <h4>
                        Smart Tool Room
                    </h4>

                    <p class="text-muted mb-0">
                        Production Management
                    </p>

                </div>


                <div class="text-end">

                    <h5>
                        ${escapeHtml(invoiceNo)}
                    </h5>

                    <small>
                        Invoice Date:
                        ${escapeHtml(invoiceDate)}
                    </small>

                </div>

            </div>


            <hr>


            <div class="row mb-4">

                <div class="col-md-6">

                    <strong>Order ID</strong>

                    <p>
                        ${escapeHtml(jobId)}
                    </p>

                </div>


                <div class="col-md-6">

                    <strong>Due Date</strong>

                    <p>
                        ${escapeHtml(dueDate)}
                    </p>

                </div>

            </div>


            <div class="table-responsive">

                <table class="table">

                    <thead>

                        <tr>

                            <th>Description</th>

                            <th class="text-end">
                                Amount
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        <tr>

                            <td>
                                Job Order #${escapeHtml(jobId)}
                            </td>

                            <td class="text-end">
                                ₹${amount.toFixed(2)}
                            </td>

                        </tr>

                    </tbody>


                    <tfoot>

                        <tr>

                            <th>
                                Total
                            </th>

                            <th class="text-end">
                                ₹${amount.toFixed(2)}
                            </th>

                        </tr>

                    </tfoot>

                </table>

            </div>


            <div class="mt-3">

                <strong>
                    Payment Status:
                </strong>

                <span class="badge bg-warning text-dark ms-2">
                    ${escapeHtml(
                        String(status).toUpperCase()
                    )}
                </span>

            </div>

        </div>
    `;


    const modalElement =
        document.getElementById(
            "invoiceDetailsModal"
        );


    if (modalElement) {

        const modal =
            new bootstrap.Modal(
                modalElement
            );

        modal.show();
    }
}

function printCustomerInvoice() {

    if (!selectedCustomerInvoice) {

        return;
    }


    const content =
        document.getElementById(
            "invoiceDetailsContent"
        );


    if (!content) {

        return;
    }


    const printWindow =
        window.open(
            "",
            "_blank"
        );


    printWindow.document.write(`

        <html>

        <head>

            <title>Customer Invoice</title>

            <style>

                body {
                    font-family: Arial, sans-serif;
                    padding: 40px;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                th,
                td {
                    border: 1px solid #ddd;
                    padding: 10px;
                }

                .text-end {
                    text-align: right;
                }

            </style>

        </head>

        <body>

            ${content.innerHTML}

        </body>

        </html>

    `);


    printWindow.document.close();

    printWindow.focus();

    printWindow.print();

    printWindow.close();
}



/* =========================================================
   PAYMENT LOADING
   Customer-specific payment history
   ========================================================= */

async function loadPayments() {

    const table = document.getElementById("paymentTable");

    if (!table) {
        return;
    }

    try {

        const response = await fetch(
            API.PAYMENTS,
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error("Unable to load payments.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {

            table.innerHTML =
                '<tr>' +
                    '<td colspan="7" class="text-center text-muted py-4">' +
                        'No payment records found.' +
                    '</td>' +
                '</tr>';

            return;
        }

        payments = data;

        /* =====================================================
           SUMMARY CALCULATION
        ===================================================== */

        let totalPaid = 0;

        payments.forEach(function(payment) {

            const amount =
                Number(
                    getValue(
                        payment,
                        [
                            "amount",
                            "payment_amount",
                            "paymentAmount"
                        ]
                    )
                ) || 0;

            const status =
                String(
                    getValue(
                        payment,
                        [
                            "payment_status",
                            "paymentStatus",
                            "status"
                        ]
                    ) || "SUCCESS"
                ).toUpperCase();

            if (
                status === "SUCCESS" ||
                status === "PAID" ||
                status === "COMPLETED" ||
                status === "SUCCESSFUL"
            ) {

                totalPaid += amount;

            }

        });

        /* =====================================================
           UPDATE TRANSACTION COUNT
        ===================================================== */

        setText(
            "paymentCount",
            payments.length
        );

        /* =====================================================
           UPDATE TOTAL PAID
        ===================================================== */

        setText(
            "totalPaid",
            "₹" +
            totalPaid.toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            )
        );

        /* =====================================================
           TOTAL DUE COMES FROM BACKEND
        ===================================================== */

        await loadPaymentSummary();

        /* =====================================================
           EMPTY DATA
        ===================================================== */

        if (!payments.length) {

            table.innerHTML =
                '<tr>' +
                    '<td colspan="7" class="text-center text-muted py-4">' +
                        'No payment records found.' +
                    '</td>' +
                '</tr>';

            return;
        }

        /* =====================================================
           DISPLAY PAYMENT RECORDS
        ===================================================== */

        table.innerHTML = "";

        payments.forEach(function(payment) {

            const paymentId =
                getValue(
                    payment,
                    [
                        "payment_id",
                        "paymentId",
                        "id"
                    ]
                );

            const invoiceNo =
                getValue(
                    payment,
                    [
                        "invoice_no",
                        "invoiceNo"
                    ]
                ) ?? "-";

            const amount =
                Number(
                    getValue(
                        payment,
                        [
                            "amount",
                            "payment_amount",
                            "paymentAmount"
                        ]
                    )
                ) || 0;

            const paymentMethod =
                getValue(
                    payment,
                    [
                        "payment_method",
                        "paymentMethod",
                        "method"
                    ]
                ) ?? "-";

            const status =
                String(
                    getValue(
                        payment,
                        [
                            "payment_status",
                            "paymentStatus",
                            "status"
                        ]
                    ) || "SUCCESS"
                ).toUpperCase();

            const row =
                document.createElement("tr");

            row.innerHTML =

                '<td>' +
                    escapeHtml(
                        paymentId ?? "-"
                    ) +
                '</td>' +

                '<td>' +
                    escapeHtml(
                        invoiceNo
                    ) +
                '</td>' +

                '<td>' +
                    formatDate(
                        getValue(
                            payment,
                            [
                                "payment_date",
                                "paymentDate",
                                "created_at",
                                "createdAt"
                            ]
                        )
                    ) +
                '</td>' +

                '<td>₹' +
                    amount.toLocaleString(
                        "en-IN",
                        {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }
                    ) +
                '</td>' +

                '<td>' +
                    escapeHtml(
                        paymentMethod
                    ) +
                '</td>' +

                '<td>' +
                    getPaymentStatusBadge(status) +
                '</td>' +

                '<td>' +

                    '<button type="button" ' +
                        'class="btn btn-sm btn-outline-primary" ' +
                        'onclick="viewPayment(' +
                            paymentId +
                        ')">' +

                        '<i class="bi bi-eye"></i> View' +

                    '</button>' +

                '</td>';

            table.appendChild(row);

        });

    }
    catch (error) {

        console.error(
            "Payment loading error:",
            error
        );

        table.innerHTML =
            '<tr>' +
                '<td colspan="7" class="text-center text-danger py-4">' +
                    'Unable to load payment records.' +
                '</td>' +
            '</tr>';

    }

}

function getPaymentStatusBadge(status) {

    const normalizedStatus =
        String(status || "SUCCESS").toUpperCase();

    let badgeClass = "bg-success";

    if (normalizedStatus === "PENDING") {

        badgeClass = "bg-warning text-dark";

    }
    else if (
        normalizedStatus === "FAILED" ||
        normalizedStatus === "CANCELLED"
    ) {

        badgeClass = "bg-danger";

    }
    else if (
        normalizedStatus === "PARTIAL"
    ) {

        badgeClass = "bg-info text-dark";

    }

    return (
        '<span class="badge ' +
        badgeClass +
        '">' +
        escapeHtml(normalizedStatus) +
        '</span>'
    );

}

async function loadPaymentSummary() {

    try {

        const response =
            await fetch(
                API_BASE_URL + "/myPaymentSummary",
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

        if (!response.ok) {

            throw new Error(
                "Unable to load payment summary."
            );
        }

        const summary =
            await response.json();

        // Backend PaymentSummary fields
        const totalPaid =
            Number(summary.paidAmount) || 0;

        const totalDue =
            Number(summary.pendingAmount) || 0;

        setText(
            "totalPaid",
            "₹" +
            totalPaid.toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            )
        );

        setText(
            "totalDue",
            "₹" +
            totalDue.toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            )
        );

        setText(
            "paymentCount",
            payments.length
        );

    }
    catch (error) {

        console.error(
            "Payment summary error:",
            error
        );

    }
}




async function viewPayment(paymentId) {

    try {

        const response =
            await fetch(
                API_BASE_URL +
                "/myPayment/" +
                encodeURIComponent(paymentId),
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

        if (!response.ok) {

            throw new Error(
                "Unable to load payment details."
            );

        }

        const payment =
            await response.json();

        showPaymentDetails(payment);

    }
    catch (error) {

        console.error(
            "Payment details error:",
            error
        );

        alert(
            "Unable to load payment details."
        );

    }

}

function showPaymentDetails(payment) {

    const content =
        document.getElementById(
            "paymentDetailsContent"
        );

    if (!content) {
        return;
    }

    const paymentId =
        getValue(
            payment,
            [
                "payment_id",
                "paymentId"
            ]
        ) ?? "-";

    const invoiceNo =
        getValue(
            payment,
            [
                "invoice_no",
                "invoiceNo"
            ]
        ) ?? "-";

    const jobId =
        getValue(
            payment,
            [
                "job_id",
                "jobId",
                "order_id",
                "orderId"
            ]
        ) ?? "-";

    const amount =
        Number(
            getValue(
                payment,
                [
                    "amount",
                    "payment_amount",
                    "paymentAmount"
                ]
            )
        ) || 0;

    const invoiceAmount =
        Number(
            getValue(
                payment,
                [
                    "invoice_amount",
                    "invoiceAmount",
                    "total_amount",
                    "totalAmount"
                ]
            )
        ) || 0;

    const remainingAmount =
        Math.max(
            invoiceAmount - amount,
            0
        );

    const paymentMethod =
        getValue(
            payment,
            [
                "payment_method",
                "paymentMethod",
                "method"
            ]
        ) ?? "-";

    const transactionReference =
        getValue(
            payment,
            [
                "transaction_reference",
                "transactionReference"
            ]
        ) ?? "-";

    const status =
        String(
            getValue(
                payment,
                [
                    "payment_status",
                    "paymentStatus",
                    "status"
                ]
            ) || "SUCCESS"
        ).toUpperCase();

    const paymentDate =
        getValue(
            payment,
            [
                "payment_date",
                "paymentDate"
            ]
        );

    content.innerHTML =

        '<div class="invoice-preview">' +

            '<div class="row g-3">' +

                '<div class="col-md-6">' +
                    '<strong>Payment ID</strong>' +
                    '<div>' +
                        escapeHtml(paymentId) +
                    '</div>' +
                '</div>' +

                '<div class="col-md-6">' +
                    '<strong>Invoice No.</strong>' +
                    '<div>' +
                        escapeHtml(invoiceNo) +
                    '</div>' +
                '</div>' +

                '<div class="col-md-6">' +
                    '<strong>Order ID</strong>' +
                    '<div>' +
                        escapeHtml(jobId) +
                    '</div>' +
                '</div>' +

                '<div class="col-md-6">' +
                    '<strong>Payment Date</strong>' +
                    '<div>' +
                        formatDate(paymentDate) +
                    '</div>' +
                '</div>' +

                '<div class="col-md-6">' +
                    '<strong>Invoice Amount</strong>' +
                    '<div>₹' +
                        invoiceAmount.toLocaleString(
                            "en-IN",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }
                        ) +
                    '</div>' +
                '</div>' +

                '<div class="col-md-6">' +
                    '<strong>Amount Paid</strong>' +
                    '<div>₹' +
                        amount.toLocaleString(
                            "en-IN",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }
                        ) +
                    '</div>' +
                '</div>' +

                '<div class="col-md-6">' +
                    '<strong>Remaining Amount</strong>' +
                    '<div>₹' +
                        remainingAmount.toLocaleString(
                            "en-IN",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }
                        ) +
                    '</div>' +
                '</div>' +

                '<div class="col-md-6">' +
                    '<strong>Payment Method</strong>' +
                    '<div>' +
                        escapeHtml(paymentMethod) +
                    '</div>' +
                '</div>' +

                '<div class="col-md-6">' +
                    '<strong>Transaction Reference</strong>' +
                    '<div>' +
                        escapeHtml(transactionReference) +
                    '</div>' +
                '</div>' +

                '<div class="col-md-6">' +
                    '<strong>Payment Status</strong>' +
                    '<div class="mt-1">' +
                        getPaymentStatusBadge(status) +
                    '</div>' +
                '</div>' +

            '</div>' +

        '</div>';

    const modalElement =
        document.getElementById(
            "paymentDetailsModal"
        );

    if (modalElement) {

        const modal =
            bootstrap.Modal.getOrCreateInstance(
                modalElement
            );

        modal.show();

    }

}

function printPaymentDetails() {

    const content =
        document.getElementById(
            "paymentDetailsContent"
        );

    if (!content) {
        return;
    }

    const printWindow =
        window.open(
            "",
            "_blank",
            "width=900,height=700"
        );

    if (!printWindow) {

        alert(
            "Please allow pop-ups to print payment details."
        );

        return;

    }

    printWindow.document.write(
        '<html>' +
            '<head>' +

                '<title>Payment Details</title>' +

                '<style>' +

                    'body {' +
                        'font-family: Arial, sans-serif;' +
                        'padding: 30px;' +
                    '}' +

                    'h2 {' +
                        'margin-bottom: 25px;' +
                    '}' +

                    '.row {' +
                        'display: grid;' +
                        'grid-template-columns: 1fr 1fr;' +
                        'gap: 20px;' +
                    '}' +

                    '.item {' +
                        'padding: 12px;' +
                        'border-bottom: 1px solid #ddd;' +
                    '}' +

                    '.label {' +
                        'font-weight: bold;' +
                    '}' +

                '</style>' +

            '</head>' +

            '<body>' +

                '<h2>Payment Details</h2>' +

                content.innerHTML +

            '</body>' +

        '</html>'
    );

    printWindow.document.close();

    printWindow.focus();

    printWindow.print();

}

async function payInvoice(invoiceId) {

    try {

        if (!invoiceId) {
            alert("Invalid invoice.");
            return;
        }

        // Disable duplicate clicks
        const buttons = document.querySelectorAll(
            `[onclick="payInvoice(${invoiceId})"]`
        );

        buttons.forEach(button => {
            button.disabled = true;
            button.innerHTML =
                '<span class="spinner-border spinner-border-sm"></span> Processing...';
        });

        // =====================================================
        // STEP 1: CREATE RAZORPAY ORDER
        // =====================================================

        const response = await fetch(
            `${API_BASE_URL}/createPaymentOrder/${invoiceId}`,
            {
                method: "POST",
                credentials: "include"
            }
        );

        if (!response.ok) {

            const errorText = await response.text();

            throw new Error(
                errorText || "Unable to create payment order."
            );
        }

        const order = await response.json();

        console.log("Razorpay order:", order);

        if (!order.orderId) {
            throw new Error(
                "Razorpay order ID was not generated."
            );
        }

        // =====================================================
        // STEP 2: OPEN RAZORPAY CHECKOUT
        // =====================================================

        const options = {

            key: RAZORPAY_KEY_ID,

            amount: order.amount,

            currency: order.currency,

            name: "Smart Tool Room",

            description:
                "Payment for Invoice " +
                order.invoiceNo,

            order_id: order.orderId,

            handler: async function (paymentResponse) {

                console.log(
                    "Razorpay payment response:",
                    paymentResponse
                );

                await verifyCustomerPayment(
                    order.invoiceId,
                    paymentResponse
                );
            },

            modal: {

                ondismiss: function () {

                    console.log(
                        "Razorpay checkout closed."
                    );

                    resetPayButton(invoiceId);
                }
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
                    "Payment failed:",
                    response.error
                );

                alert(
                    "Payment failed. Please try again."
                );

                resetPayButton(invoiceId);
            }
        );

        razorpay.open();

    } catch (error) {

        console.error(
            "Payment error:",
            error
        );

        alert(
            error.message ||
            "Unable to start payment."
        );

        resetPayButton(invoiceId);
    }
}

async function verifyCustomerPayment(
    invoiceId,
    paymentResponse
) {

    try {

        const requestData = {

            invoiceId: invoiceId,

            razorpayOrderId:
                paymentResponse.razorpay_order_id,

            razorpayPaymentId:
                paymentResponse.razorpay_payment_id,

            razorpaySignature:
                paymentResponse.razorpay_signature,

            paymentMethod: "Razorpay"
        };


        const response = await fetch(
            `${API_BASE_URL}/verifyCustomerPayment`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                credentials: "include",

                body: JSON.stringify(
                    requestData
                )
            }
        );


        const result =
            await response.text();

        console.log(
            "Payment verification:",
            result
        );


        if (result === "PAYMENT_SUCCESS") {

            alert(
                "Payment successful!"
            );

            // Refresh invoice section
            loadInvoices();

            // Refresh payment section
            loadPayments();

            return;
        }


        if (result === "SESSION_EXPIRED") {

            alert(
                "Your session has expired. Please login again."
            );

            return;
        }


        if (result === "INVOICE_ACCESS_DENIED") {

            alert(
                "You are not authorized to pay this invoice."
            );

            return;
        }


        if (
            result ===
            "PAYMENT_VERIFICATION_FAILED"
        ) {

            alert(
                "Payment verification failed."
            );

            return;
        }


        if (
            result ===
            "PAYMENT_SAVE_FAILED"
        ) {

            alert(
                "Payment was successful, but payment record could not be saved. Please contact admin."
            );

            return;
        }


        if (
            result ===
            "INVOICE_ALREADY_PAID"
        ) {

            alert(
                "This invoice is already paid."
            );

            return;
        }


        alert(
            "Payment processing failed: " +
            result
        );

    } catch (error) {

        console.error(
            "Payment verification error:",
            error
        );

        alert(
            "Payment verification failed."
        );

    } finally {

        resetPayButton(invoiceId);
    }
}

function resetPayButton(invoiceId) {

    const buttons =
        document.querySelectorAll(
            `[onclick="payInvoice(${invoiceId})"]`
        );

    buttons.forEach(button => {

        button.disabled = false;

        button.innerHTML =
            '<i class="bi bi-credit-card"></i> Pay Now';
    });
}



function displayInvoices(invoices) {

    const tableBody = document.getElementById("invoiceTable");

    if (!tableBody) {
        return;
    }

    if (!invoices || invoices.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="6"
                    class="text-center text-muted py-4">
                    No invoices available.
                </td>
            </tr>
        `;

        return;
    }

    tableBody.innerHTML = invoices.map(invoice => {

        return `
            <tr>

                <td>
                    ${invoice.invoice_no || "-"}
                </td>

                <td>
                    ${invoice.job_id || "-"}
                </td>

                <td>
                    ${formatInvoiceDate(invoice.invoice_date)}
                </td>

                <td>
                    ₹${Number(invoice.amount || 0).toFixed(2)}
                </td>

                <td>
                    ${getInvoiceStatusBadge(
                        invoice.payment_status
                    )}
                </td>

                <td>
                    ${getInvoiceAction(invoice)}
                </td>

            </tr>
        `;

    }).join("");
}

function getInvoiceAction(invoice) {

    const status =
        (invoice.payment_status || "PENDING")
        .toUpperCase();

    let paymentButton = "";

    if (
        status === "PENDING" ||
        status === "PARTIAL" ||
        status === "OVERDUE"
    ) {

        paymentButton = `
            <button
                class="btn btn-sm btn-success"
                onclick="payInvoice(${invoice.invoice_id})">
                <i class="bi bi-credit-card"></i>
                Pay Now
            </button>
        `;

    } else if (status === "PAID") {

        paymentButton = `
            <span class="badge bg-success">
                <i class="bi bi-check-circle"></i>
                Paid
            </span>
        `;

    } else if (status === "CANCELLED") {

        paymentButton = `
            <span class="badge bg-secondary">
                Cancelled
            </span>
        `;
    }

    return `
        <button
            class="btn btn-sm btn-primary"
            onclick="viewInvoice(${invoice.invoice_id})">
            <i class="bi bi-eye"></i>
            View
        </button>

        ${paymentButton}
    `;
}


/* =====================================================
   CUSTOMER NOTIFICATIONS
===================================================== */

let customerNotifications = [];


async function loadNotifications() {

    const container =
        document.getElementById("notificationList");

    if (!container) {
        return;
    }

    try {

        const response =
            await fetch(
                API.NOTIFICATIONS,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

        if (!response.ok) {

            throw new Error(
                "Unable to load notifications."
            );
        }

        const data =
            await response.json();

        customerNotifications =
            Array.isArray(data)
                ? data
                : [];

        displayNotifications();

    } catch (error) {

        console.error(
            "Notification loading error:",
            error
        );

        container.innerHTML = `
            <div class="text-center text-danger py-4">
                Unable to load notifications.
            </div>
        `;
    }
}

function displayNotifications() {

    const container =
        document.getElementById(
            "notificationList"
        );

    if (!container) {
        return;
    }

    if (!customerNotifications.length) {

        container.innerHTML = `
            <div class="text-center text-muted py-4">

                <i class="bi bi-bell-slash"
                   style="font-size: 30px;"></i>

                <p class="mt-2 mb-0">
                    No notifications available.
                </p>

            </div>
        `;

        return;
    }


    container.innerHTML = "";


    customerNotifications.forEach(
        function(notification) {

            const notificationId =
                getValue(
                    notification,
                    [
                        "notification_id",
                        "notificationId"
                    ]
                );

            const type =
                String(
                    getValue(
                        notification,
                        ["type"]
                    ) || ""
                ).toUpperCase();


            let icon =
                "bi bi-info-circle";


            if (type === "JOB_STATUS") {

                icon =
                    "bi bi-check-circle";

            }
            else if (type === "INVOICE") {

                icon =
                    "bi bi-receipt";
            }


            const title =
                getValue(
                    notification,
                    ["title"]
                ) || "Notification";


            const message =
                getValue(
                    notification,
                    ["message"]
                ) || "";


            const createdDate =
                getValue(
                    notification,
                    [
                        "created_date",
                        "createdDate"
                    ]
                );


            const isRead =
                Boolean(
                    getValue(
                        notification,
                        [
                            "is_read",
                            "isRead"
                        ]
                    )
                );


            const item =
                document.createElement("div");

            item.className =
                "notification-item";


            if (!isRead) {

                item.classList.add(
                    "notification-unread"
                );
            }


            item.innerHTML = `

                <div class="notification-icon">

                    <i class="${icon}"></i>

                </div>


                <div class="flex-grow-1">

                    <h6>
                        ${escapeHtml(title)}
                    </h6>

                    <p>
                        ${escapeHtml(message)}
                    </p>

                    <small class="text-muted">

                        ${formatDate(createdDate)}

                    </small>

                </div>


                ${
                    !isRead
                    ? `
                        <button
                            type="button"
                            class="btn btn-sm btn-outline-primary"
                            onclick="markNotificationAsRead(${notificationId})">

                            Mark read

                        </button>
                    `
                    : ""
                }

            `;


            container.appendChild(item);
        }
    );
}

async function markNotificationAsRead(
    notificationId
) {

    try {

        const response =
            await fetch(
                API_BASE_URL +
                "/markNotificationRead/" +
                encodeURIComponent(
                    notificationId
                ),
                {
                    method: "PUT",
                    credentials: "include"
                }
            );

        if (!response.ok) {

            throw new Error(
                "Unable to mark notification as read."
            );
        }

        await loadNotifications();

    } catch (error) {

        console.error(
            "Mark notification error:",
            error
        );
    }
}

async function markAllNotificationsAsRead() {

    try {

        const response =
            await fetch(
                API_BASE_URL +
                "/markAllNotificationsRead",
                {
                    method: "PUT",
                    credentials: "include"
                }
            );

        if (!response.ok) {

            throw new Error(
                "Unable to mark notifications as read."
            );
        }

        await loadNotifications();

    } catch (error) {

        console.error(
            "Mark all notifications error:",
            error
        );
    }
}




/* =========================================================
   LOGOUT
   ========================================================= */

async function logout() {

    try {

        const response =
            await fetch(
                API.LOGOUT,
                {
                    method: "POST",
                    credentials: "include"
                }
            );


        console.log(
            "Logout status:",
            response.status
        );

    }
    catch (error) {

        console.error(
            "Logout API error:",
            error
        );
    }
    finally {

        /*
         * Clear frontend session values.
         */
        sessionStorage.removeItem(
            "userId"
        );

        sessionStorage.removeItem(
            "customerId"
        );


        customerId = null;
        customerData = null;
        orders = [];
        selectedOrder = null;

        window.location.href =
            "login.jsp";
    }
}


/* =========================================================
   GLOBAL FUNCTIONS
   ========================================================= */

window.showSection =
    showSection;

window.openSection =
    openSection;

window.toggleSidebar =
    toggleSidebar;

window.logout =
    logout;

window.enableProfileEdit =
    enableProfileEdit;

window.cancelProfileEdit =
    cancelProfileEdit;

window.submitJobOrder =
    submitJobOrder;

window.initializeJobOrderForm =
    initializeJobOrderForm;

window.viewCustomerOrder =
    viewCustomerOrder;

window.viewOrderDetails =
    viewOrderDetails;

window.loadCustomerOrders =
    loadCustomerOrders;

window.loadCustomerProfile =
    loadCustomerProfile;
    
    window.loadNotifications =
    loadNotifications;

window.markNotificationAsRead =
    markNotificationAsRead;

window.markAllNotificationsAsRead =
    markAllNotificationsAsRead;


fetch(`${API_CONFIG.BASE_URL}/auth/sessionUser`, {

    credentials: "include"
})
.then(response => {

    if (!response.ok) {
        throw new Error("Session request failed.");
    }

    return response.json();
})
.then(user => {

    console.log("Session User:", user);

    if (!user || !user.user_id) {

        console.error(
            "No valid user found in backend session."
        );

        return;
    }

    sessionStorage.setItem(
        "userId",
        String(user.user_id)
    );

    console.log(
        "User ID from backend session:",
        user.user_id
    );
})
.catch(error => {

    console.error(
        "Session User Error:",
        error
    );
});