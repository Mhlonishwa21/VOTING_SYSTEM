const registerForm = document.getElementById("Register");

registerForm.addEventListener("submit", async function(event){

    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const middleName = document.getElementById("middleName").value;
    const email = document.getElementById("email").value.trim();
    const idNumber = document.getElementById("idNumber").value;
    const gender = document.getElementById("gender").value;
    const municipality = document.getElementById("municipality").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword){
        alert("Passwords do not match");
        return;
    }

    if (!isValidEmail(email)){
        alert("Invalid email format");
        return;
    }

    if (!isValidID(idNumber)){
        alert("Invalid South African ID number");
        return;
    }

    try{
        const response = await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                email: email,
                idNumber: idNumber,
                gender: gender,
                municipality: municipality,
                password: password,
                confirmPassword: confirmPassword
            })
        });

    }catch(error){
        console.error("Registration error:", error);
        alert("Unable to connect to the server.");
    }

});

function isValidEmail(email) {

    if (email.trim() === "") {
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}


function isValidID(idNumber) {

    if (!/^\d{13}$/.test(idNumber)) {
        return false;
    }

    let sum = 0;
    let doubleDigit = false;

    for (let i = idNumber.length - 1; i >= 0; i--) {

        let digit = Number(idNumber[i]);

        if (doubleDigit) {
            digit = digit * 2;

            if (digit > 9) {
                digit = digit - 9;
            }
        }

        sum += digit;

        doubleDigit = !doubleDigit;
    }

    return sum % 10 === 0;
}