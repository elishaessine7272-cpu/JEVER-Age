
// Create an empty array to store users
let users = [];

// Generate unique user IDs
let nextUserId = 1;

// Keep track of the user being updated
let editingUserId = null;


// FORMAT REGISTRATION DATE
function formatDate(date) {

    return new Date(date).toLocaleDateString("en-NG", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

}


// DISPLAY SUCCESS OR ERROR MESSAGE
function showMessage(elementId, message) {

    document.getElementById(elementId).textContent = message;

}


// VALIDATE USER INFORMATION
function validateUser(name, email, age, currentUserId = null) {

    // Check full name
    if (name === "") {
        throw new Error("Full name is required.");
    }

    // Check email format
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailPattern.test(email)) {
        throw new Error("Please enter a valid email address.");
    }

    // Check age
    if (!Number.isInteger(age) || age < 1) {
        throw new Error("Please enter a valid age.");
    }

    // Check for duplicate email
    let existingUser = users.find(function(user) {

        return user.email.toLowerCase() === email.toLowerCase()
            && user.id !== currentUserId;

    });

    if (existingUser) {
        throw new Error("This email address is already registered.");
    }

}


// 1. REGISTER NEW USER
function registerUser(name, email, age) {

    // Validate information
    validateUser(name, email, age);

    // Create a new user object
    let newUser = {

        id: "USR-" + String(nextUserId).padStart(4, "0"),

        fullName: name,

        email: email,

        age: age,

        registrationDate: new Date().toISOString()

    };

    // Increase ID counter
    nextUserId++;

    // Add user to array
    users.push(newUser);

    return newUser;

}


// 2. RETRIEVE ALL REGISTERED USERS
function getAllUsers() {

    return users;

}


// 3. RETRIEVE A SINGLE USER USING ID
function getUserById(id) {

    return users.find(function(user) {

        return user.id.toLowerCase() === id.toLowerCase();

    });

}


// 4. UPDATE USER INFORMATION
function updateUser(id, name, email, age) {

    // Find existing user
    let user = getUserById(id);

    if (!user) {
        throw new Error("User not found.");
    }

    // Validate updated information
    validateUser(name, email, age, id);

    // Update user properties
    user.fullName = name;

    user.email = email;

    user.age = age;

    // Registration date and ID remain unchanged
    return user;

}


// 5. DELETE USER
function deleteUser(id) {

    // Find user first
    let user = getUserById(id);

    if (!user) {
        throw new Error("User not found.");
    }

    // Remove user from array
    users = users.filter(function(user) {

        return user.id !== id;

    });

    return user;

}


// 6. SEARCH USERS BY NAME
function searchUsersByName(name) {

    return users.filter(function(user) {

        return user.fullName.toLowerCase().includes(name.toLowerCase());

    });

}


// DISPLAY USER INFORMATION
function displayUserDetails(user) {

    document.getElementById("detailId").textContent = user.id;

    document.getElementById("detailName").textContent = user.fullName;

    document.getElementById("detailEmail").textContent = user.email;

    document.getElementById("detailAge").textContent = user.age;

    document.getElementById("detailDate").textContent =
        formatDate(user.registrationDate);

    document.getElementById("userDetails").hidden = false;

}


// RESET REGISTRATION FORM
function resetForm() {

    document.getElementById("userForm").reset();

    editingUserId = null;

    document.getElementById("formTitle").textContent = "Register New User";

    document.getElementById("submitBtn").textContent = "Register User";

    document.getElementById("cancelEditBtn").hidden = true;

}


// DISPLAY USERS IN TABLE
function displayUsers(userList) {

    let tableBody = document.getElementById("userList");

    let tableContainer = document.getElementById("userTableContainer");

    tableBody.innerHTML = "";

    if (userList.length === 0) {

        tableContainer.hidden = true;

        showMessage("listMessage", "No users found.");

        return;

    }

    tableContainer.hidden = false;

    showMessage("listMessage", "Showing " + userList.length + " user(s).");

    userList.forEach(function(user) {

        let row = document.createElement("tr");

        // User ID
        let idCell = document.createElement("td");
        idCell.textContent = user.id;

        // Full name
        let nameCell = document.createElement("td");
        nameCell.textContent = user.fullName;

        // Email
        let emailCell = document.createElement("td");
        emailCell.textContent = user.email;

        // Age
        let ageCell = document.createElement("td");
        ageCell.textContent = user.age;

        // Registration date
        let dateCell = document.createElement("td");
        dateCell.textContent = formatDate(user.registrationDate);

        // Action buttons
        let actionCell = document.createElement("td");

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        editBtn.addEventListener("click", function() {

            editUser(user.id);

        });

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function() {

            deleteUserFromPage(user.id);

        });

        actionCell.appendChild(editBtn);

        actionCell.appendChild(deleteBtn);

        // Add cells to row
        row.appendChild(idCell);

        row.appendChild(nameCell);

        row.appendChild(emailCell);

        row.appendChild(ageCell);

        row.appendChild(dateCell);

        row.appendChild(actionCell);

        tableBody.appendChild(row);

    });

}


// LOAD USER INFORMATION INTO UPDATE FORM
function editUser(id) {

    let user = getUserById(id);

    if (!user) {

        showMessage("formMessage", "User not found.");

        return;

    }

    editingUserId = user.id;

    document.getElementById("fullName").value = user.fullName;

    document.getElementById("email").value = user.email;

    document.getElementById("age").value = user.age;

    document.getElementById("formTitle").textContent = "Update User Information";

    document.getElementById("submitBtn").textContent = "Update User";

    document.getElementById("cancelEditBtn").hidden = false;

    showMessage("formMessage", "Editing " + user.fullName + ".");

    document.getElementById("fullName").focus();

}


// DELETE USER FROM PAGE
function deleteUserFromPage(id) {

    let user = getUserById(id);

    if (!user) {

        showMessage("listMessage", "User not found.");

        return;

    }

    let confirmDelete = confirm(
        "Are you sure you want to delete " + user.fullName + "?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        deleteUser(id);

        // Reset form if the deleted user was being edited
        if (editingUserId === id) {
            resetForm();
        }

        // Hide details if the deleted user was being displayed
        if (document.getElementById("detailId").textContent === id) {
            document.getElementById("userDetails").hidden = true;
        }

        // Refresh the user table
        displayUsers(getAllUsers());

        showMessage("formMessage", "User deleted successfully.");

    } catch (error) {

        showMessage("listMessage", error.message);

    }

}


// REGISTER OR UPDATE USER
document.getElementById("userForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("fullName").value.trim();

    let email = document.getElementById("email").value.trim();

    let age = Number(document.getElementById("age").value);

    try {

        if (editingUserId === null) {

            // Register a new user
            let newUser = registerUser(name, email, age);

            showMessage(
                "formMessage",
                "User registered successfully! Your ID is " + newUser.id
            );

        } else {

            // Update existing user
            updateUser(editingUserId, name, email, age);

            showMessage("formMessage", "User information updated successfully.");

            // Exit update mode
            editingUserId = null;

            document.getElementById("formTitle").textContent = "Register New User";

            document.getElementById("submitBtn").textContent = "Register User";

            document.getElementById("cancelEditBtn").hidden = true;

        }

        // Clear form
        document.getElementById("userForm").reset();

        // Refresh user list
        displayUsers(getAllUsers());

    } catch (error) {

        showMessage("formMessage", error.message);

    }

});


// 7. DISPLAY ALL USERS
document.getElementById("displayAllBtn").addEventListener("click", function() {

    displayUsers(getAllUsers());

});


// RETRIEVE SINGLE USER BY ID
document.getElementById("idSearchForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let id = document.getElementById("searchId").value.trim();

    try {

        if (id === "") {
            throw new Error("Please enter a user ID.");
        }

        let user = getUserById(id);

        if (!user) {
            throw new Error("No user found with this ID.");
        }

        displayUserDetails(user);

        showMessage("idMessage", "User retrieved successfully.");

    } catch (error) {

        document.getElementById("userDetails").hidden = true;

        showMessage("idMessage", error.message);

    }

});


// SEARCH USERS BY NAME
document.getElementById("nameSearchForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("searchName").value.trim();

    try {

        if (name === "") {
            throw new Error("Please enter a name to search.");
        }

        let matchingUsers = searchUsersByName(name);

        if (matchingUsers.length === 0) {

            document.getElementById("userTableContainer").hidden = true;

            throw new Error("No matching users found.");

        }

        displayUsers(matchingUsers);

        showMessage(
            "nameMessage",
            matchingUsers.length + " matching user(s) found."
        );

    } catch (error) {

        showMessage("nameMessage", error.message);

    }

});


// CANCEL UPDATE
document.getElementById("cancelEditBtn").addEventListener("click", function() {

    resetForm();

    showMessage("formMessage", "Update cancelled.");

});


// CLEAR NAME SEARCH
document.getElementById("clearSearchBtn").addEventListener("click", function() {

    document.getElementById("nameSearchForm").reset();

    showMessage("nameMessage", "");

    displayUsers(getAllUsers());

});
