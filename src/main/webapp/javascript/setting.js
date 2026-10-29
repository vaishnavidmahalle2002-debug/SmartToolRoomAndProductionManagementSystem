// ==========================================
// YantraX - Settings
// ==========================================

const BASE_URL = API_CONFIG.BASE_URL;

// ==========================================
// Load User Profile
// ==========================================

function loadProfile() {

    fetch(BASE_URL + "/getProfile")

    .then(response => {

        if (!response.ok) {
            throw new Error("Unable to load profile");
        }

        return response.json();

    })

    .then(user => {

        document.getElementById("fullName").value = user.full_name || "";
        document.getElementById("email").value = user.email || "";
        document.getElementById("mobile").value = user.mobile_no || "";
        document.getElementById("username").value = user.username || "";

    })

    .catch(error => {

        console.log(error);

    });

}



// ==========================================
// Update Profile
// ==========================================

function updateProfile() {

    let fullName = document.getElementById("fullName").value.trim();
    let email = document.getElementById("email").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let username = document.getElementById("username").value.trim();

    let oldPassword = document.getElementById("oldPassword").value;
    let newPassword = document.getElementById("newPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;


    if(fullName==""){
        alert("Enter Full Name");
        return;
    }

    if(email==""){
        alert("Enter Email");
        return;
    }

    if(mobile==""){
        alert("Enter Mobile Number");
        return;
    }

    if(newPassword!="" && newPassword!=confirmPassword){

        alert("New Password and Confirm Password do not match.");

        return;

    }


    let profile = {

        full_name: fullName,
        email: email,
        mobile_no: mobile,
        username: username,
        old_password: oldPassword,
        new_password: newPassword

    };


    fetch(BASE_URL + "/updateProfile",{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(profile)

    })

    .then(response=>response.text())

    .then(message=>{

        alert(message);

        document.getElementById("oldPassword").value="";
        document.getElementById("newPassword").value="";
        document.getElementById("confirmPassword").value="";

        loadProfile();

    })

    .catch(error=>{

        console.log(error);

        alert("Unable to Update Profile.");

    });

}



// ==========================================
// Clear Password Fields
// ==========================================

function clearPasswords(){

    document.getElementById("oldPassword").value="";
    document.getElementById("newPassword").value="";
    document.getElementById("confirmPassword").value="";

}