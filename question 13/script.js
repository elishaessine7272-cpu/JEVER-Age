
// 1. CREATE FIVE USER OBJECTS
let users = [

    {
        id: 1,
        name: "John Doe",
        email: "john@gmail.com",
        age: 24,
        course: "Computer Science"
    },

    {
        id: 2,
        name: "Mary Smith",
        email: "mary@gmail.com",
        age: 22,
        course: "Software Engineering"
    },

    {
        id: 3,
        name: "David Brown",
        email: "david@gmail.com",
        age: 26,
        course: "Data Science"
    },

    {
        id: 4,
        name: "Sarah James",
        email: "sarah@gmail.com",
        age: 21,
        course: "Cyber Security"
    },

    {
        id: 5,
        name: "Peter Wilson",
        email: "peter@gmail.com",
        age: 25,
        course: "Web Development"
    }

];


// 2. CONVERT JAVASCRIPT OBJECTS INTO JSON STRING
let jsonData = JSON.stringify(users, null, 2);


// 3. CONVERT JSON STRING BACK INTO JAVASCRIPT OBJECTS
let parsedUsers = JSON.parse(jsonData);


// Display JSON data
document.getElementById("jsonOutput").textContent = jsonData;


// Display data types
document.getElementById("originalType").textContent = typeof users;

document.getElementById("jsonType").textContent = typeof jsonData;

document.getElementById("parsedType").textContent = typeof parsedUsers;


// 4. SEARCH FOR USER BY EMAIL
document.getElementById("searchForm").addEventListener("submit", function(event) {

    event.preventDefault();

    // Get entered email
    let searchEmail = document.getElementById("email").value.trim().toLowerCase();

    // Search through parsed user objects
    let user = parsedUsers.find(function(user) {

        return user.email.toLowerCase() === searchEmail;

    });

    let message = document.getElementById("message");

    let userResult = document.getElementById("userResult");


    // 5. DISPLAY USER INFORMATION
    if (user) {

        document.getElementById("userId").textContent = user.id;

        document.getElementById("userName").textContent = user.name;

        document.getElementById("userEmail").textContent = user.email;

        document.getElementById("userAge").textContent = user.age;

        document.getElementById("userCourse").textContent = user.course;

        message.textContent = "User found successfully!";

        userResult.style.display = "block";

    } else {

        message.textContent = "No user found with this email address.";

        userResult.style.display = "none";

    }

});
