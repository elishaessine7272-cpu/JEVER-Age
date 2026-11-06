
// Available products
let products = [
    {
        id: 1,
        name: "Laptop",
        price: 42000
    },
    {
        id: 2,
        name: "Keyboard",
        price: 12000
    },
    {
        id: 3,
        name: "Headphones",
        price: 18000
    },
    {
        id: 4,
        name: "Power Bank",
        price: 8500
    },
    {
        id: 5,
        name: "Mouse",
        price: 5000
    }
];

// Create an empty shopping cart
let cart = [];


// Format prices in Naira
function formatCurrency(amount) {
    return "₦" + amount.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


// 1. DISPLAY AVAILABLE PRODUCTS
function displayProducts() {

    let productList = document.getElementById("productList");

    productList.innerHTML = "";

    products.forEach(function(product) {

        let card = document.createElement("div");

        card.className = "product-card";

        let name = document.createElement("h3");
        name.textContent = product.name;

        let price = document.createElement("p");
        price.textContent = "Price: " + formatCurrency(product.price);

        let button = document.createElement("button");
        button.textContent = "Add to Cart";

        button.addEventListener("click", function() {
            addToCart(product.id);
        });

        card.appendChild(name);
        card.appendChild(price);
        card.appendChild(button);

        productList.appendChild(card);

    });

}


// 2. ADD PRODUCTS TO CART
function addToCart(productId) {

    // Find selected product
    let product = products.find(function(product) {
        return product.id === productId;
    });

    // Check if product already exists in cart
    let cartItem = cart.find(function(item) {
        return item.id === productId;
    });

    if (cartItem) {

        // Increase quantity if product already exists
        cartItem.quantity++;

    } else {

        // Add new product to cart
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });

    }

    displayCart();

}


// 3. INCREASE OR DECREASE PRODUCT QUANTITY
function updateQuantity(productId, change) {

    let cartItem = cart.find(function(item) {
        return item.id === productId;
    });

    if (cartItem && cartItem.quantity + change >= 1) {

        cartItem.quantity += change;

        displayCart();

    }

}


// 4. REMOVE PRODUCT FROM CART
function removeFromCart(productId) {

    cart = cart.filter(function(item) {
        return item.id !== productId;
    });

    displayCart();

}


// CALCULATE CART TOTALS
function calculateTotals() {

    let subtotal = 0;
    let totalItems = 0;

    cart.forEach(function(item) {

        subtotal += item.price * item.quantity;

        totalItems += item.quantity;

    });

    // Apply 10% discount if subtotal is above ₦50,000
    let discount = 0;

    if (subtotal > 50000) {
        discount = subtotal * 0.10;
    }

    let finalTotal = subtotal - discount;

    return {
        subtotal: subtotal,
        totalItems: totalItems,
        discount: discount,
        finalTotal: finalTotal
    };

}


// 5. DISPLAY SHOPPING CART
function displayCart() {

    let cartItems = document.getElementById("cartItems");

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        document.getElementById("cartTable").classList.add("hidden");

        document.getElementById("cartSummary").classList.add("hidden");

        document.getElementById("checkoutSummary").classList.add("hidden");

        document.getElementById("emptyCart").classList.remove("hidden");

        return;

    }

    document.getElementById("cartTable").classList.remove("hidden");

    document.getElementById("cartSummary").classList.remove("hidden");

    document.getElementById("emptyCart").classList.add("hidden");


    // Display each cart item
    cart.forEach(function(item) {

        let row = document.createElement("tr");

        // Product name
        let nameCell = document.createElement("td");
        nameCell.textContent = item.name;

        // Product price
        let priceCell = document.createElement("td");
        priceCell.textContent = formatCurrency(item.price);

        // Quantity controls
        let quantityCell = document.createElement("td");

        let decreaseBtn = document.createElement("button");
        decreaseBtn.textContent = "-";
        decreaseBtn.disabled = item.quantity === 1;

        decreaseBtn.addEventListener("click", function() {
            updateQuantity(item.id, -1);
        });

        let quantityText = document.createElement("span");
        quantityText.textContent = " " + item.quantity + " ";

        let increaseBtn = document.createElement("button");
        increaseBtn.textContent = "+";

        increaseBtn.addEventListener("click", function() {
            updateQuantity(item.id, 1);
        });

        quantityCell.appendChild(decreaseBtn);
        quantityCell.appendChild(quantityText);
        quantityCell.appendChild(increaseBtn);

        // Calculate individual product total
        let totalCell = document.createElement("td");

        totalCell.textContent = formatCurrency(
            item.price * item.quantity
        );

        // Remove product button
        let actionCell = document.createElement("td");

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";

        removeBtn.addEventListener("click", function() {
            removeFromCart(item.id);
        });

        actionCell.appendChild(removeBtn);

        // Add all cells to the row
        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(quantityCell);
        row.appendChild(totalCell);
        row.appendChild(actionCell);

        cartItems.appendChild(row);

    });


    // Update cart summary
    let totals = calculateTotals();

    document.getElementById("totalItems").textContent = totals.totalItems;

    document.getElementById("subtotal").textContent =
        formatCurrency(totals.subtotal);

    document.getElementById("discount").textContent =
        formatCurrency(totals.discount);

    document.getElementById("finalTotal").textContent =
        formatCurrency(totals.finalTotal);


    // Update checkout summary
    document.getElementById("checkoutItems").textContent =
        totals.totalItems;

    document.getElementById("checkoutSubtotal").textContent =
        formatCurrency(totals.subtotal);

    document.getElementById("checkoutDiscount").textContent =
        formatCurrency(totals.discount);

    document.getElementById("checkoutTotal").textContent =
        formatCurrency(totals.finalTotal);

    if (totals.discount > 0) {

        document.getElementById("discountMessage").textContent =
            "Congratulations! You received a 10% discount.";

    } else {

        document.getElementById("discountMessage").textContent =
            "Spend more than ₦50,000 to receive a 10% discount.";

    }

}


// 6. PROCEED TO CHECKOUT
document.getElementById("checkoutBtn").addEventListener("click", function() {

    if (cart.length === 0) {

        alert("Your shopping cart is empty!");

        return;

    }

    document.getElementById("checkoutSummary").classList.remove("hidden");

});


// Display products when the page loads
displayProducts();
