
document.getElementById("gradingForm").addEventListener("submit", function(event) {

    event.preventDefault();

    // Get student name
    let name = document.getElementById("studentName").value;

    // Get five subject scores
    let score1 = Number(document.getElementById("subject1").value);
    let score2 = Number(document.getElementById("subject2").value);
    let score3 = Number(document.getElementById("subject3").value);
    let score4 = Number(document.getElementById("subject4").value);
    let score5 = Number(document.getElementById("subject5").value);

    // Calculate total score
    let total = score1 + score2 + score3 + score4 + score5;

    // Calculate average score
    let average = total / 5;

    // Determine grade
    let grade;

    if (average >= 70) {
        grade = "A";
    } else if (average >= 60) {
        grade = "B";
    } else if (average >= 50) {
        grade = "C";
    } else if (average >= 45) {
        grade = "D";
    } else if (average >= 40) {
        grade = "E";
    } else {
        grade = "F";
    }

    // Display student result
    document.getElementById("displayName").textContent = name;
    document.getElementById("total").textContent = total;
    document.getElementById("average").textContent = average.toFixed(2);
    document.getElementById("grade").textContent = grade;

    document.getElementById("result").style.display = "block"; 

});
