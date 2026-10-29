/**
 * 
 */
 
 document.addEventListener("DOMContentLoaded", function () {
    loadCustomerProfile();
});


async function loadCustomerProfile() {

    const loadingMessage = document.getElementById("loadingMessage");
    const errorMessage = document.getElementById("errorMessage");
    const profileContent = document.getElementById("profileContent");

    try {

        loadingMessage.style.display = "block";
        errorMessage.style.display = "none";
        profileContent.style.display = "none";


        // Get logged-in user
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


        const sessionUser = await sessionResponse.json();

        console.log("Session User:", sessionUser);


        if (!sessionUser || !sessionUser.user_id) {
            throw new Error("Session user not found.");
        }


        const userId = sessionUser.user_id;


        // Get customer using user ID
        const customerResponse = await fetch(
            `${API_CONFIG.BASE_URL}/customer/user/` + userId,
            {
                method: "GET",
                credentials: "include"
            }
        );


        if (!customerResponse.ok) {
            throw new Error("Customer profile not found.");
        }


        const customer = await customerResponse.json();

        console.log("Customer:", customer);


        if (!customer) {
            throw new Error("Customer profile not found.");
        }


        displayCustomerProfile(customer);


        loadingMessage.style.display = "none";
        profileContent.style.display = "block";


    } catch (error) {

        console.error(error);

        loadingMessage.style.display = "none";

        errorMessage.innerText = error.message;

        errorMessage.style.display = "block";
    }
}


function displayCustomerProfile(customer) {

    document.getElementById("customerId").textContent =
        customer.customer_id || "-";


    document.getElementById("userId").textContent =
        customer.user_id || "-";


    document.getElementById("fullName").textContent =
        customer.fullName || "Customer";


    document.getElementById("fullNameValue").textContent =
        customer.fullName || "-";


    document.getElementById("mobileNo").textContent =
        customer.mobileNo || "-";


    document.getElementById("email").textContent =
        customer.email || "-";


    document.getElementById("address").textContent =
        customer.address || "-";


    document.getElementById("city").textContent =
        customer.city || "-";


    document.getElementById("state").textContent =
        customer.state || "-";


    document.getElementById("companyName").textContent =
        customer.companyName || "Customer";


    document.getElementById("companyNameValue").textContent =
        customer.companyName || "-";


    document.getElementById("gstNo").textContent =
        customer.gstNo || "-";


    document.getElementById("createdDate").textContent =
        formatDate(customer.createdDate);


    const profilePhoto =
        document.getElementById("profilePhoto");


    if (customer.profilePhoto) {

        profilePhoto.src =
            "/Frontend_JSPP/images/" + customer.profilePhoto;

    } else {

        profilePhoto.src =
            "/Frontend_JSPP/images/avatar.webp";
    }
}


function formatDate(dateValue) {

    if (!dateValue) {
        return "-";
    }


    const date = new Date(dateValue);


    if (isNaN(date.getTime())) {
        return dateValue;
    }


    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}