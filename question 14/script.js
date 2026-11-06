
// Create an empty array to store API users
let users = [];


// 1. FETCH USERS FROM EXTERNAL API
async function fetchUsers() {

    let apiMessage = document.getElementById("apiMessage");

    try {

        apiMessage.textContent = "Loading users...";

        // Send request to API
        let response = await fetch("https://jsonplaceholder.typicode.com/users");

        // Check if the request was successful
        if (!response.ok) {
            throw new Error("Unable to fetch users. Please try again.");
        }

        // Convert API response into JavaScript objects
        users = await response.json();

        // Check received data
        if (!Array.isArray(users)) {
            throw new Error("Invalid data received from the API.");
        }

        // Display all users
        displayUsers();

        apiMessage.textContent = "Users loaded successfully!";

        // Enable search button
        document.getElementById("searchBtn").disabled = false;

    } catch (error) {

        // Handle API errors
        apiMessage.textContent = "API Error: " + error.message;

    }

}


// 2. DISPLAY ALL USERS
function displayUsers() {

    let userList = document.getElementById("userList");

    userList.innerHTML = "";

    users.forEach(function(user) {

        let row = document.createElement("tr");

        // Display user name
        let nameCell = document.createElement("td");
        nameCell.textContent = user.name;

        // Display user email
        let emailCell = document.createElement("td");
        emailCell.textContent = user.email;

        // Add cells to row
        row.appendChild(nameCell);
        row.appendChild(emailCell);

        // Add row to table
        userList.appendChild(row);

    });

}


// 3. SEARCH USER BY EMAIL
document.getElementById("searchForm").addEventListener("submit", function(event) {

    event.preventDefault();

    // Get email entered by user
    let searchEmail = document.getElementById("searchInput").value.trim().toLowerCase();

    let message = document.getElementById("searchMessage");

    let userResult = document.getElementById("userResult");

    // Search for matching email
    let user = users.find(function(user) {

        return user.email.toLowerCase() === searchEmail;

    });


    // 4. DISPLAY SEARCH RESULT
    if (user) {

        document.getElementById("userName").textContent = user.name;

        document.getElementById("userEmail").textContent = user.email;

        message.textContent = "User found successfully!";

        userResult.style.display = "block";

    } else {

        message.textContent = "No user found with this email address.";

        userResult.style.display = "none";

    }

});


// 5. CALL FETCH FUNCTION WHEN PAGE LOADS
fetchUsers();
