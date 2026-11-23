const loginForm = document.getElementById("Login");

loginForm.addEventListener("submit", async function(event){

    event.preventDefault();

    console.log("CLIKED!");

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

        }else{
            alert(data.message || "Invalid login details");
        }
    }catch(error){
        console.error("Login error:", error);
        alert("Unable to connecct to the server");
    }
});