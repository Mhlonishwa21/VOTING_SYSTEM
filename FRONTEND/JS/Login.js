const loginForm = document.getElementById("Login");

loginForm.addEventListener("submit", async function(event){

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try{
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok){
            alert("Login Succesful!");

            window.location.href = data.redirectTo;   

            if (data.role === "admin") {
                window.location.href = "AdminDashboard.html";
            }
            else if (data.role === "voter") {
                window.location.href = "UserDashboard.html";
            }

        }else{
            alert(data.message || "Invalid login details");
        }
    }catch(error){
        console.error("Login error:", error);
        alert("Unable to connecct to the server");
    }
});