
// Create registration form event
document.getElementById("registrationForm").addEventListener("submit", function(event) {

    event.preventDefault();

    // Get user information
    let name = document.getElementById("fullName").value.trim();
    let email = document.getElementById("email").value.trim();
    let age = Number(document.getElementById("age").value);
    let password = document.getElementById("password").value;

    let message = document.getElementById("message");

    let result = document.getElementById("result");

    // Show result section
    result.style.display = "block";

    // Clear previous message
    message.textContent = "";

    try {

        // 1. Validate full name
        if (name === "") {
            throw new Error("Full name cannot be empty.");
        }


        // 2. Validate email address
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (!emailPattern.test(email)) {
            throw new Error("Please enter a valid email address.");
        }


        // 3. Validate age
        if (!document.getElementById("age").value.trim() ||
            !Number.isFinite(age) || age < 18) {

            throw new Error("You must be at least 18 years old to register.");

        }


        // 4. Validate password
        let missingRequirements = [];

        if (password.length < 8) {
            missingRequirements.push("At least 8 characters");
        }

        if (!/[A-Z]/.test(password)) {
            missingRequirements.push("At least one uppercase letter");
        }

        if (!/[a-z]/.test(password)) {
            missingRequirements.push("At least one lowercase letter");
        }

        if (!/[0-9]/.test(password)) {
            missingRequirements.push("At least one number");
        }

        if (!/[^A-Za-z0-9\s]/.test(password)) {
            missingRequirements.push("At least one special character");
        }


        // Check missing password requirements
        if (missingRequirements.length > 0) {

            throw new Error(
                "Password requirements missing: " +
                missingRequirements.join(", ")
            );

        }


        // If all validations pass
        message.textContent =
            "Registration successful! Welcome, " + name + ".";

        // Clear form
        document.getElementById("registrationForm").reset();


    } catch (error) {

        // Handle and display errors
        message.textContent = "Registration Error: " + error.message;

    }

});
