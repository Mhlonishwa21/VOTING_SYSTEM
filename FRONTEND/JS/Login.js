const loginForm = document.getByElementId("Login");

loginForm.addEventListener("submit", async function(event){

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try{
        const response = await fetch();
    }
});