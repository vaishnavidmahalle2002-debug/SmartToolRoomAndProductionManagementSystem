
 function sendMessage(){

    let fullName=document.getElementById("fullName").value;
    let email=document.getElementById("email").value;
    let subject=document.getElementById("subject").value;
    let message=document.getElementById("message").value;

    fetch(`${API_CONFIG.BASE_URL}/contact`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            fullName:fullName,
            email:email,
            subject:subject,
            message:message

        })

    })

    .then(res=>res.text())

    .then(data=>{

        alert(data);

    });

}