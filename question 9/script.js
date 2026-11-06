
// Create an array of employee objects
let employees = [

    {
        name: "John",
        salary: 250000,
        department: "IT"
    },

    {
        name: "Mary",
        salary: 180000,
        department: "HR"
    },

    {
        name: "David",
        salary: 300000,
        department: "IT"
    },

    {
        name: "Sarah",
        salary: 150000,
        department: "Finance"
    },

    {
        name: "Peter",
        salary: 220000,
        department: "HR"
    },

    {
        name: "Grace",
        salary: 350000,
        department: "Finance"
    }

];


// Format salary in Naira
function formatMoney(amount) {
    return "₦" + amount.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


// 1. GET EMPLOYEES BY DEPARTMENT
function getEmployeesByDepartment(employeeList, department) {

    return employeeList.filter(function(employee) {

        return employee.department.toLowerCase() === department.trim().toLowerCase();

    });

}


// 2. FIND EMPLOYEES EARNING ABOVE ₦200,000
function getHighEarners(employeeList) {

    return employeeList.filter(function(employee) {

        return employee.salary > 200000;

    });

}


// 3. CALCULATE AVERAGE SALARY
function calculateAverageSalary(employeeList) {

    if (employeeList.length === 0) {
        return 0;
    }

    let totalSalary = employeeList.reduce(function(total, employee) {

        return total + employee.salary;

    }, 0);

    return totalSalary / employeeList.length;

}


// 4. FIND EMPLOYEE WITH THE HIGHEST SALARY
function getHighestPaidEmployee(employeeList) {

    if (employeeList.length === 0) {
        return null;
    }

    let highestSalary = employeeList.reduce(function(highest, employee) {

        return Math.max(highest, employee.salary);

    }, -Infinity);

    return employeeList.find(function(employee) {

        return employee.salary === highestSalary;

    });

}


// 5. GET ONLY EMPLOYEE NAMES
function getEmployeeNames(employeeList) {

    return employeeList.map(function(employee) {

        return employee.name;

    });

}


// PROCESS EMPLOYEE DATA
document.getElementById("employeeForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let department = document.getElementById("department").value.trim();

    // Get employees in selected department
    let departmentEmployees = getEmployeesByDepartment(employees, department);

    // Get employees earning above ₦200,000
    let highEarners = getHighEarners(employees);

    // Calculate average salary
    let averageSalary = calculateAverageSalary(employees);

    // Get highest paid employee
    let highestEmployee = getHighestPaidEmployee(employees);

    // Get all employee names
    let employeeNames = getEmployeeNames(employees);


    // Display department employees
    if (departmentEmployees.length > 0) {

        document.getElementById("departmentEmployees").textContent =
            departmentEmployees.map(function(employee) {
                return employee.name + " - " + formatMoney(employee.salary);
            }).join(", ");

    } else {

        document.getElementById("departmentEmployees").textContent =
            "No employees found in this department.";

    }


    // Display high earners
    document.getElementById("highEarners").textContent =
        highEarners.map(function(employee) {
            return employee.name + " - " + formatMoney(employee.salary);
        }).join(", ");


    // Display average salary
    document.getElementById("averageSalary").textContent =
        formatMoney(averageSalary);


    // Display highest paid employee
    if (highestEmployee) {

        document.getElementById("highestEmployee").textContent =
            highestEmployee.name + " - " + formatMoney(highestEmployee.salary);

    } else {

        document.getElementById("highestEmployee").textContent =
            "No employee records available.";

    }


    // Display employee names
    document.getElementById("employeeNames").textContent =
        employeeNames.join(", ");


    // Show result section
    document.getElementById("result").style.display = "block";

});
