
// Create an empty array to store students
let students = [];


// 1. ADD NEW STUDENT
document.getElementById("studentForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let id = document.getElementById("studentId").value.trim();
    let name = document.getElementById("fullName").value.trim();
    let email = document.getElementById("email").value.trim();
    let age = Number(document.getElementById("age").value);
    let course = document.getElementById("course").value.trim();

    // Check if student ID already exists
    let existingStudent = students.find(function(student) {
        return student.id === id;
    });

    if (existingStudent) {
        alert("Student ID already exists!");
        return;
    }

    // Create student object
    let student = {
        id: id,
        name: name,
        email: email,
        age: age,
        course: course
    };

    // Add student to array
    students.push(student);

    alert("Student added successfully!");

    // Clear form
    document.getElementById("studentForm").reset();

    // Hide previous search and update results
    document.getElementById("searchResult").style.display = "none";
    document.getElementById("updateSection").style.display = "none";

});


// 2. DISPLAY ALL STUDENTS
document.getElementById("displayBtn").addEventListener("click", function() {

    let studentList = document.getElementById("studentList");

    studentList.innerHTML = "";

    if (students.length === 0) {

        document.getElementById("studentTable").style.display = "none";

        document.getElementById("emptyMessage").textContent =
            "No students registered yet.";

        return;
    }

    // Show student table
    document.getElementById("studentTable").style.display = "table";

    document.getElementById("emptyMessage").style.display = "none";

    // Display each student
    students.forEach(function(student) {

        let row = document.createElement("tr");

        let values = [
            student.id,
            student.name,
            student.email,
            student.age,
            student.course
        ];

        values.forEach(function(value) {

            let cell = document.createElement("td");

            cell.textContent = value;

            row.appendChild(cell);

        });

        studentList.appendChild(row);

    });

});


// 3. SEARCH STUDENT USING ID
document.getElementById("searchBtn").addEventListener("click", function() {

    let searchId = document.getElementById("searchId").value.trim();

    let student = students.find(function(student) {
        return student.id === searchId;
    });

    let message = document.getElementById("searchMessage");

    if (student) {

        message.textContent = "Student found successfully!";

        // Display student details
        document.getElementById("resultId").textContent = student.id;
        document.getElementById("resultName").textContent = student.name;
        document.getElementById("resultEmail").textContent = student.email;
        document.getElementById("resultAge").textContent = student.age;
        document.getElementById("resultCourse").textContent = student.course;

        document.getElementById("searchResult").style.display = "block";

        // Fill update form with existing information
        document.getElementById("updateId").value = student.id;
        document.getElementById("updateName").value = student.name;
        document.getElementById("updateEmail").value = student.email;
        document.getElementById("updateAge").value = student.age;
        document.getElementById("updateCourse").value = student.course;

        // Show update section
        document.getElementById("updateSection").style.display = "block";

    } else {

        message.textContent = "Student not found!";

        document.getElementById("searchResult").style.display = "none";
        document.getElementById("updateSection").style.display = "none";

    }

});


// 4. UPDATE STUDENT INFORMATION
document.getElementById("updateForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let id = document.getElementById("updateId").value;

    // Find the student
    let student = students.find(function(student) {
        return student.id === id;
    });

    if (student) {

        // Update student details
        student.name = document.getElementById("updateName").value.trim();
        student.email = document.getElementById("updateEmail").value.trim();
        student.age = Number(document.getElementById("updateAge").value);
        student.course = document.getElementById("updateCourse").value.trim();

        alert("Student information updated successfully!");

        // Update displayed search details
        document.getElementById("resultName").textContent = student.name;
        document.getElementById("resultEmail").textContent = student.email;
        document.getElementById("resultAge").textContent = student.age;
        document.getElementById("resultCourse").textContent = student.course;

    } else {

        alert("Student not found!");

    }

});


// 5. DELETE STUDENT
document.getElementById("deleteBtn").addEventListener("click", function() {

    let deleteId = document.getElementById("deleteId").value.trim();

    let student = students.find(function(student) {
        return student.id === deleteId;
    });

    let message = document.getElementById("deleteMessage");

    if (student) {

        let confirmDelete = confirm(
            "Are you sure you want to delete " + student.name + "?"
        );

        if (confirmDelete) {

            // Remove student from array
            students = students.filter(function(student) {
                return student.id !== deleteId;
            });

            message.textContent = "Student deleted successfully!";

            // Clear delete input
            document.getElementById("deleteId").value = "";

            // Hide search and update sections if they show deleted student
            if (document.getElementById("resultId").textContent === deleteId) {

                document.getElementById("searchResult").style.display = "none";
                document.getElementById("updateSection").style.display = "none";

                document.getElementById("searchMessage").textContent = "";

            }

            // Refresh table if it is currently visible
            if (document.getElementById("studentTable").style.display === "table") {
                document.getElementById("displayBtn").click();
            }

        }

    } else {

        message.textContent = "Student ID not found!";

    }

});
