
// Create an empty account
let account = null;


// Format money in Naira
function formatCurrency(amount) {
    return "₦" + amount.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


// CREATE BANK ACCOUNT
document.getElementById("accountForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("holderName").value.trim();
    let number = document.getElementById("accountNumber").value.trim();
    let balance = Number(document.getElementById("initialBalance").value);

    if (balance < 0) {
        alert("Initial balance cannot be negative!");
        return;
    }

    // Create account object
    account = {
        name: name,
        accountNumber: number,
        balance: balance
    };

    alert("Bank account created successfully!");

    document.getElementById("accountForm").style.display = "none";

    document.getElementById("accountActions").style.display = "block";

    displayAccountInformation();

});


// DEPOSIT MONEY
function depositMoney(amount) {

    if (amount <= 0 || !Number.isFinite(amount)) {
        return "Invalid deposit amount. Enter a positive amount.";
    }

    account.balance += amount;

    return "Deposit successful! You deposited " + formatCurrency(amount);

}


// WITHDRAW MONEY
function withdrawMoney(amount) {

    if (amount <= 0 || !Number.isFinite(amount)) {
        return "Invalid withdrawal amount. Enter a positive amount.";
    }

    if (amount > account.balance) {
        return "Insufficient balance! You cannot withdraw more than your available balance.";
    }

    account.balance -= amount;

    return "Withdrawal successful! You withdrew " + formatCurrency(amount);

}


// DEPOSIT FORM EVENT
document.getElementById("depositForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let amount = Number(document.getElementById("depositAmount").value);

    let message = depositMoney(amount);

    document.getElementById("transactionMessage").textContent = message;

    document.getElementById("depositForm").reset();

    displayAccountInformation();

});


// WITHDRAW FORM EVENT
document.getElementById("withdrawForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let amount = Number(document.getElementById("withdrawAmount").value);

    let message = withdrawMoney(amount);

    document.getElementById("transactionMessage").textContent = message;

    document.getElementById("withdrawForm").reset();

    displayAccountInformation();

});


// CHECK ACCOUNT BALANCE
function checkBalance() {

    return account.balance;

}


// CHECK BALANCE BUTTON
document.getElementById("checkBalanceBtn").addEventListener("click", function() {

    document.getElementById("transactionMessage").textContent =
        "Your current balance is " + formatCurrency(checkBalance());

});


// DISPLAY ACCOUNT INFORMATION
function displayAccountInformation() {

    document.getElementById("accountInfo").innerHTML =
        "<p>Account Holder: " + account.name + "</p>" +
        "<p>Account Number: " + account.accountNumber + "</p>" +
        "<p>Account Balance: " + formatCurrency(account.balance) + "</p>";

}


// DISPLAY ACCOUNT BUTTON
document.getElementById("displayAccountBtn").addEventListener("click", function() {

    displayAccountInformation();

});
