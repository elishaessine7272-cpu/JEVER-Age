
// Create password validation function
function validatePassword(password) {

    let missingRequirements = [];

    // Check minimum 8 characters
    if (password.length < 8) {
        missingRequirements.push("Password must contain at least 8 characters.");
    }

    // Check uppercase letter
    if (!/[A-Z]/.test(password)) {
        missingRequirements.push("Password must contain at least one uppercase letter.");
    }

    // Check lowercase letter
    if (!/[a-z]/.test(password)) {
        missingRequirements.push("Password must contain at least one lowercase letter.");
    }

    // Check number
    if (!/[0-9]/.test(password)) {
        missingRequirements.push("Password must contain at least one number.");
    }

    // Check special character
    if (!/[^A-Za-z0-9\s]/.test(password)) {
        missingRequirements.push("Password must contain at least one special character.");
    }

    // Return validation result
    return {
        valid: missingRequirements.length === 0,
        missing: missingRequirements
    };

}


// Password form event
document.getElementById("passwordForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let password = document.getElementById("password").value;

    // Validate password
    let result = validatePassword(password);

    let message = document.getElementById("validationMessage");

    let requirementsList = document.getElementById("requirementsList");

    // Clear previous results
    requirementsList.innerHTML = "";

    // Check validation result
    if (result.valid) {

        message.textContent = "Congratulations! Your password is valid.";

    } else {

        message.textContent = "Your password is invalid. The following requirements are missing:";

        // Display missing requirements
        result.missing.forEach(function(requirement) {

            let listItem = document.createElement("li");

            listItem.textContent = requirement;

            requirementsList.appendChild(listItem);

        });

    }

    // Show result section
    document.getElementById("result").style.display = "block";

});
