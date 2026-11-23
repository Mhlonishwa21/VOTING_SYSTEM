
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const middleName = document.getElementById("middleName").value.trim();
    const email = document.getElementById("email").value.trim();
    const idNumber = document.getElementById("idNumber").value.trim();
    const gender = document.getElementById("gender").value;
    const municipality = document.getElementById("municipality").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!isValidPassword(password)) {
        alert("Password must contain at least 8 characters, 1 special character, 1 digit and 1 uppercase letter.");
        return;
    }
ch
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    if (!isValidEmail(email)) {
        alert("Invalid email format!");
        return;
    }

    if (!isValidID(idNumber)) {
        alert("Invalid South African ID number!");
        return;
    }
    try {
        const response = await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                firstName,
                middleName,
                lastName,
                email,
                idNumber,
                gender,
                municipality,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registration successful!");

            registerForm.reset();

            window.location.href = "Login.html";

        } else {
            alert(data.message || "Registration failed!");
        }

    } catch (error) {
        console.error("Registration error:", error);
        alert("Unable to complete registration. Please try again.");
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

    const year = Number(idNumber.substring(0, 2));
    const month = Number(idNumber.substring(2, 4));
    const day = Number(idNumber.substring(4, 6));

    const currentYear = new Date().getFullYear();

    const fullYear = year <= currentYear % 100
        ? 2000 + year
        : 1900 + year;

    const birthDate = new Date(fullYear, month - 1, day);

    if (
        birthDate.getFullYear() !== fullYear ||
        birthDate.getMonth() !== month - 1 ||
        birthDate.getDate() !== day ||
        birthDate > new Date()
    ) {
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


function isValidPassword(password) {

    if (password.length < 8) {
        return false;
    }

    if (!/[!@#$%^&*(),.?":{}|<>_\-+=;'/\\[\]`~]/.test(password)) {
        return false;
    }

    if (!/[0-9]/.test(password)) {
        return false;
    }

    if (!/[A-Z]/.test(password)) {
        return false;
    }

    return true;
}
