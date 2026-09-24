// REGISTER

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("registerName").value;
        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const user = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem("rideNovaUser", JSON.stringify(user));

        alert("Account created successfully!");

        window.location.href = "login.html";
    });
}


// LOGIN

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const storedUser = localStorage.getItem("rideNovaUser");

        if (!storedUser) {
            alert("No account found. Please register first.");
            return;
        }

        const user = JSON.parse(storedUser);

        if (email === user.email && password === user.password) {

            localStorage.setItem("isLoggedIn", "true");

            alert("Login successful!");

            window.location.href = "index.html";

        } else {

            alert("Invalid email or password!");

        }
    });

