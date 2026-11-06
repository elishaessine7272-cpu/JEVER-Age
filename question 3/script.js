
document.getElementById("numberForm").addEventListener("submit", function(event) {

    event.preventDefault();

    // Create an empty array
    let numbers = [];

    // Collect the 15 numbers
    for (let i = 1; i <= 15; i++) {
        let number = Number(document.getElementById("num" + i).value);
        numbers.push(number);
    }

    // Create empty arrays for even and odd numbers
    let evenNumbers = [];
    let oddNumbers = [];

    // Initialize largest, smallest and sum
    let largest = numbers[0];
    let smallest = numbers[0];
    let sum = 0;

    // Analyze the numbers
    for (let i = 0; i < numbers.length; i++) {

        // Identify even and odd numbers
        if (numbers[i] % 2 === 0) {
            evenNumbers.push(numbers[i]);
        } else {
            oddNumbers.push(numbers[i]);
        }

        // Find the largest number
        if (numbers[i] > largest) {
            largest = numbers[i];
        }

        // Find the smallest number
        if (numbers[i] < smallest) {
            smallest = numbers[i];
        }

        // Calculate sum
        sum += numbers[i];
    }

    // Calculate average
    let average = sum / numbers.length;

    // Display results
    document.getElementById("evenNumbers").textContent = evenNumbers.join(", ");

    document.getElementById("oddNumbers").textContent = oddNumbers.join(", ");

    document.getElementById("largest").textContent = largest;

    document.getElementById("smallest").textContent = smallest;

    document.getElementById("sum").textContent = sum;

    document.getElementById("average").textContent = average.toFixed(2);

    // Show result section
    document.getElementById("result").style.display = "block";

});
