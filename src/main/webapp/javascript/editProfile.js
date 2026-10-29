//==============================================
// YantraX - Edit Customer
//==============================================

 const BASE_URL = API_CONFIG.BASE_URL;

document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);
    const customerId = params.get("id");

    console.log("Customer ID:", customerId);

    if (!customerId) {
        alert("Customer ID not found.");
        window.location.href = "customerDashboard.jsp";
        return;
    }

    //==========================================
    // Load Customer
    //==========================================

    fetch(`${BASE_URL}/viewCustomer/${customerId}`)

        .then(response => {

            if (!response.ok) {
                throw new Error("Customer not found");
            }

            return response.json();
        })

        .then(customer => {

            console.log("Customer Data:", customer);

            document.getElementById("customerId").value =
                customer.customer_id || customer.customerId || "";

            document.getElementById("userId").value =
                customer.user_id || customer.userId || "";

            document.getElementById("fullName").value =
                customer.fullName || customer.name || "";

            document.getElementById("mobileNo").value =
                customer.mobileNo || customer.mobile || "";

            document.getElementById("email").value =
                customer.email || "";

            document.getElementById("address").value =
                customer.address || "";

            document.getElementById("city").value =
                customer.city || "";

            document.getElementById("state").value =
                customer.state || "";

            document.getElementById("companyName").value =
                customer.companyName ||
                customer.company_name ||
                "";

            document.getElementById("gstNo").value =
                customer.gstNo ||
                customer.gst_no ||
                "";

        })

        .catch(error => {

            console.error("Error loading customer:", error);

            alert("Unable to load customer data.");

        });


    //==========================================
    // Update Customer
    //==========================================

    const form = document.getElementById("editCustomerForm");

    if (form) {

        form.addEventListener("submit", function (e) {

            e.preventDefault();

            const formData = new FormData();

            formData.append(
                "customer_id",
                document.getElementById("customerId").value
            );

            formData.append(
                "user_id",
                document.getElementById("userId").value
            );

            formData.append(
                "fullName",
                document.getElementById("fullName").value
            );

            formData.append(
                "mobileNo",
                document.getElementById("mobileNo").value
            );

            formData.append(
                "email",
                document.getElementById("email").value
            );

            formData.append(
                "address",
                document.getElementById("address").value
            );

            formData.append(
                "city",
                document.getElementById("city").value
            );

            formData.append(
                "state",
                document.getElementById("state").value
            );

            formData.append(
                "companyName",
                document.getElementById("companyName").value
            );

            formData.append(
                "gstNo",
                document.getElementById("gstNo").value
            );


            //==================================
            // Profile Photo
            //==================================

            const photoInput =
                document.getElementById("profilePhoto");

            if (photoInput && photoInput.files.length > 0) {

                formData.append(
                    "profilePhoto",
                    photoInput.files[0]
                );
            }


            console.log("Updating Customer...");


            //==================================
            // API Call
            //==================================

            fetch(`${BASE_URL}/updCustomer`, {

                method: "PUT",
                body: formData

            })

            .then(response => {

                if (!response.ok) {
                    throw new Error("Update failed");
                }

                return response.text();
            })

            .then(message => {

                console.log("Server:", message);

                alert(message);

                const id =
                    document.getElementById("customerId").value;

                window.location.href =
                    "customerProfile.jsp?id=" + id;

            })

            .catch(error => {

                console.error("Update Error:", error);

                alert("Customer update failed.");

            });

        });

    }

});