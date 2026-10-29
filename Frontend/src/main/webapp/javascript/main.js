
// ====================== API CONFIGURATION CHECK ======================

function getApiBaseUrl() {
    if (
        !window.API_CONFIG ||
        !window.API_CONFIG.BASE_URL
    ) {
        console.error(
            "API_CONFIG is missing. Check that api-config.js loads before main.js."
        );

        alert("API configuration is missing. Please contact support.");
        return null;
    }

    return window.API_CONFIG.BASE_URL.replace(/\/+$/, "");
}


// ====================== REGISTER ======================

function register() {

    const apiBaseUrl = getApiBaseUrl();

    if (!apiBaseUrl) {
        return;
    }

    const role = document.getElementById("role").value;
    const fullName = document.getElementById("full_name").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobileNo = document.getElementById("mobileNo").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (role === "") {
        alert("Please select a role.");
        return;
    }

    if (
        fullName === "" ||
        email === "" ||
        mobileNo === "" ||
        username === "" ||
        password === ""
    ) {
        alert("Please fill in all required fields.");
        return;
    }

    fetch(`${apiBaseUrl}/auth/register`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            user_id: 0,
            fullName: fullName,
            email: email,
            mobileNo: mobileNo,
            username: username,
            password: password,
            role: role,
            status: "Active"
        })

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Registration failed. Please try again.");
        }

        return response.text();

    })

    .then(data => {

        alert(data);

        document.getElementById("full_name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("mobileNo").value = "";
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";

        window.location.href = "login.jsp";

    })

    .catch(error => {

        console.error("Registration error:", error);
        alert("Registration failed. Please check your connection and try again.");

    });

}


// ====================== LOGIN ======================

function login() {

    const apiBaseUrl = getApiBaseUrl();

    if (!apiBaseUrl) {
        return;
    }

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Please enter username and password.");
        return;
    }

    console.log("Login Username:", username);

    fetch(`${apiBaseUrl}/auth/login`, {

        method: "POST",

        credentials: "include",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username: username,
            password: password
        })

    })

    .then(response => {

        console.log("Login Status =", response.status);

        if (!response.ok) {
            throw new Error("Invalid username or password.");
        }

        return response.json();

    })

    .then(user => {

        console.log("Login User Response:", user);

        if (!user || typeof user !== "object") {
            throw new Error("Invalid response received from the server.");
        }

        // ====================== STORE LOGGED-IN USER ======================

        sessionStorage.setItem(
            "loggedInUser",
            JSON.stringify(user)
        );

        // ====================== STORE USER ID ======================

        const userId =
            user.user_id !== undefined && user.user_id !== null
                ? user.user_id
                : user.userId;

        if (userId === undefined || userId === null) {

            console.error(
                "Login response does not contain user_id or userId."
            );

            sessionStorage.removeItem("loggedInUser");

            alert("Login response is missing the User ID. Please contact support.");
            return;
        }

        sessionStorage.setItem("userId", String(userId));

        // ====================== STORE USERNAME AND ROLE ======================

        const usernameValue = user.username || "";
        const role = (user.role || "").trim().toLowerCase();

        sessionStorage.setItem("username", usernameValue);
        sessionStorage.setItem("role", role);

        console.log("Stored userId:", sessionStorage.getItem("userId"));
        console.log("Stored username:", sessionStorage.getItem("username"));
        console.log("Stored role:", sessionStorage.getItem("role"));

        // ====================== VALIDATE ROLE ======================

        const dashboardPages = {
            admin: "adminDashboard.jsp",
            customer: "customerDashboard.jsp",
            worker: "workerDashboard.jsp"
        };

        const dashboard = dashboardPages[role];

        if (!dashboard) {

            console.error("Unknown user role:", user.role);

            alert("Unknown role: " + (user.role || "Not provided"));
            return;
        }

        alert("Welcome " + usernameValue);

        // ====================== REDIRECT TO DASHBOARD ======================

        // Uses the current JSP application's context path.
        // Example: /Frontend_JSP/login.jsp -> /Frontend_JSP/adminDashboard.jsp
        // Example: /login.jsp -> /adminDashboard.jsp

        const appContext = window.location.pathname.substring(
            0,
            window.location.pathname.lastIndexOf("/")
        );

        window.location.href = appContext + "/" + dashboard;

    })

    .catch(error => {

        console.error("Login error:", error);

        alert(error.message || "Login failed. Please try again.");

    });

}


// ====================== LOGOUT ======================

function logout() {

    const apiBaseUrl = getApiBaseUrl();

    if (!apiBaseUrl) {
        return;
    }

    fetch(`${apiBaseUrl}/auth/logout`, {
        method: "POST",
        credentials: "include"
    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Logout request failed.");
        }

        return response.text();

    })

    .then(data => {

        console.log("Logout response:", data);

    })

    .catch(error => {

        console.error("Logout error:", error);

    })

    .finally(() => {

        sessionStorage.removeItem("loggedInUser");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("role");

        window.location.href = "login.jsp";

    });

}


// ====================== CHANGE PASSWORD ======================

function changePassword() {

    const apiBaseUrl = getApiBaseUrl();

    if (!apiBaseUrl) {
        return;
    }

    const oldPassword =
        document.getElementById("oldPassword").value;

    const newPassword =
        document.getElementById("newPassword").value;

    const loggedInUser =
        sessionStorage.getItem("loggedInUser");

    if (!loggedInUser) {

        alert("Your session has expired. Please log in again.");
        window.location.href = "login.jsp";
        return;
    }

    let user;

    try {

        user = JSON.parse(loggedInUser);

    } catch (error) {

        console.error("Unable to read logged-in user:", error);

        alert("Invalid session. Please log in again.");
        return;
    }

    const userId =
        user.user_id !== undefined && user.user_id !== null
            ? user.user_id
            : user.userId;

    if (userId === undefined || userId === null) {

        alert("User ID not found. Please log in again.");
        return;
    }

    if (!oldPassword || !newPassword) {

        alert("Please enter both your old and new passwords.");
        return;
    }

    fetch(
        `${apiBaseUrl}/auth/changePassword?userId=${encodeURIComponent(userId)}` +
        `&oldPassword=${encodeURIComponent(oldPassword)}` +
        `&newPassword=${encodeURIComponent(newPassword)}`,

        {
            method: "POST",
            credentials: "include"
        }
    )

    .then(response => {

        if (!response.ok) {
            throw new Error("Unable to change password.");
        }

        return response.text();

    })

    .then(data => {

        alert(data);

        document.getElementById("oldPassword").value = "";
        document.getElementById("newPassword").value = "";

    })

    .catch(error => {

        console.error("Change password error:", error);

        alert(error.message || "Unable to change password. Please try again.");

    });

}

