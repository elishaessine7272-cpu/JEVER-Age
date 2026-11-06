
// Addition function
export function addition(a, b) {
    return a + b;
}


// Subtraction function
export function subtraction(a, b) {
    return a - b;
}


// Multiplication function
export function multiplication(a, b) {
    return a * b;
}


// Division function
export function division(a, b) {

    if (b === 0) {
        throw new Error("Cannot divide by zero!");
    }

    return a / b;

}
