
document.getElementById("salaryForm").addEventListener("submit", function(event) {

    event.preventDefault();

    // Get employee details
    let name = document.getElementById("employeeName").value;
    let basicSalary = Number(document.getElementById("basicSalary").value);

    // Calculate allowances
    let housing = basicSalary * 0.10;
    let transport = basicSalary * 0.05;

    // Calculate tax deduction
    let tax = basicSalary * 0.03;

    // Calculate final salary
    let finalSalary = basicSalary + housing + transport - tax;

    // Display salary breakdown
    document.getElementById("displayName").textContent = name;

    document.getElementById("displayBasic").textContent = basicSalary.toFixed(2);

    document.getElementById("housing").textContent = housing.toFixed(2);

    document.getElementById("transport").textContent = transport.toFixed(2);

    document.getElementById("tax").textContent = tax.toFixed(2);

    document.getElementById("finalSalary").textContent = finalSalary.toFixed(2);

    // Show salary result
    document.getElementById("result").style.display = "block";

});
