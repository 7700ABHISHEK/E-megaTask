// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize cart count on page load
function updateCartCount() {
    const cartCount = cart.length;
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Initialize cart page
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCart();
    updatePriceSummary();
});

// Render cart items
function renderCart() {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const emptyCart = document.getElementById('emptyCart');
    const cartContent = document.getElementById('cartContent');
    const cartItemCount = document.getElementById('cartItemCount');

    if (cart.length === 0) {
        emptyCart.classList.remove('hidden');
        cartContent.classList.add('hidden');
        return;
    }

    emptyCart.classList.add('hidden');
    cartContent.classList.remove('hidden');
    cartItemCount.textContent = `(${cart.length})`;

    cartItemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const originalPrice = item.price * 1.2; // Simulate original price (20% markup)
        const discount = ((originalPrice - item.price) / originalPrice * 100).toFixed(0);
        
        const cartItemHTML = `
            <div class="cart-item" data-index="${index}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div>
                        <h3 class="cart-item-name">${item.name}</h3>
                        <p class="cart-item-description">${item.description}</p>
                        <div class="cart-item-price">
                            <span class="current-price">${item.price.toFixed(2)}</span>
                            <span class="original-price">${originalPrice.toFixed(2)}</span>
                            <span class="discount-badge">${discount}% OFF</span>
                        </div>
                    </div>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn" onclick="decreaseQuantity(${index})" ${item.quantity <= 1 ? 'disabled' : ''}>
                                <i class="fas fa-minus text-sm"></i>
                            </button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" onclick="increaseQuantity(${index})">
                                <i class="fas fa-plus text-sm"></i>
                            </button>
                        </div>
                        <button class="remove-btn" onclick="removeItem(${index})">
                            <i class="fas fa-trash mr-1"></i>Remove
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        cartItemsContainer.innerHTML += cartItemHTML;
    });
}

// Increase quantity
function increaseQuantity(index) {
    cart[index].quantity++;
    saveCart();
    
    // Update only the quantity display without re-rendering
    const cartItem = document.querySelector(`[data-index="${index}"]`);
    if (cartItem) {
        const quantityDisplay = cartItem.querySelector('.quantity-display');
        quantityDisplay.textContent = cart[index].quantity;
    }
    
    updatePriceSummary();
    showNotification('Quantity updated');
}

// Decrease quantity
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        saveCart();
        
        // Update only the quantity display without re-rendering
        const cartItem = document.querySelector(`[data-index="${index}"]`);
        if (cartItem) {
            const quantityDisplay = cartItem.querySelector('.quantity-display');
            quantityDisplay.textContent = cart[index].quantity;
            
            // Enable/disable minus button
            const decreaseBtn = cartItem.querySelector('.quantity-btn:first-child');
            if (cart[index].quantity <= 1) {
                decreaseBtn.disabled = true;
            }
        }
        
        updatePriceSummary();
        showNotification('Quantity updated');
    }
}

// Remove item from cart
function removeItem(index) {
    const item = cart[index];
    const cartItem = document.querySelector(`[data-index="${index}"]`);
    
    // Add animation
    cartItem.classList.add('removing');
    
    setTimeout(() => {
        cart.splice(index, 1);
        saveCart();
        renderCart();
        updatePriceSummary();
        showNotification(`${item.name} removed from cart`);
    }, 300);
}

// Clear entire cart
document.getElementById('clearCartBtn').addEventListener('click', () => {
    if (cart.length === 0) return;
    
    const confirmClear = confirm('Are you sure you want to clear your entire cart?');
    if (confirmClear) {
        cart = [];
        saveCart();
        renderCart();
        updatePriceSummary();
        showNotification('Cart cleared');
    }
});

// Update price summary
function updatePriceSummary() {
    let totalPrice = 0;
    let totalOriginalPrice = 0;
    let totalItems = 0;
    let totalCashback = 0;
    let totalPoints = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const originalPrice = item.price * 1.2; // 20% markup
        const originalTotal = originalPrice * item.quantity;
        
        totalPrice += itemTotal;
        totalOriginalPrice += originalTotal;
        totalItems += item.quantity;
        
        // Calculate cashback and points (10% cashback and points equal to price)
        totalCashback += (item.price * 0.10) * item.quantity;
        totalPoints += Math.round(item.price) * item.quantity;
    });

    const discount = totalOriginalPrice - totalPrice;
    const deliveryCharge = totalPrice >= 50 ? 0 : 5.99;
    const finalTotal = totalPrice + deliveryCharge;

    // Update summary elements
    document.getElementById('summaryItemCount').textContent = totalItems;
    document.getElementById('summaryPrice').textContent = `${totalOriginalPrice.toFixed(2)}`;
    document.getElementById('summaryDiscount').textContent = `-${discount.toFixed(2)}`;
    
    if (deliveryCharge === 0) {
        document.getElementById('summaryDelivery').innerHTML = '<span class="text-green-600">FREE</span>';
    } else {
        document.getElementById('summaryDelivery').textContent = `${deliveryCharge.toFixed(2)}`;
    }
    
    document.getElementById('summaryTotal').textContent = `${finalTotal.toFixed(2)}`;
    document.getElementById('totalSavings').textContent = `${discount.toFixed(2)}`;
    
    // Update cashback and points
    document.getElementById('summaryCashback').textContent = `$${totalCashback.toFixed(2)}`;
    document.getElementById('summaryPoints').textContent = totalPoints;
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Checkout button
document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Check if user is logged in
    const session = localStorage.getItem('session') || sessionStorage.getItem('session');
    
    if (!session) {
        const confirmLogin = confirm('Please login to proceed with checkout. Would you like to login now?');
        if (confirmLogin) {
            // Store redirect to checkout after login
            sessionStorage.setItem('redirectAfterLogin', 'checkout.html');
            window.location.href = 'login.html';
        }
        return;
    }

    // Redirect to checkout page
    window.location.href = 'checkout.html';
});

// Account button functionality
document.getElementById('accountBtn').addEventListener('click', () => {
    const session = localStorage.getItem('session') || sessionStorage.getItem('session');
    if (session) {
        window.location.href = 'profile.html';
    } else {
        window.location.href = 'login.html';
    }
});

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in';
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slide-in {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    .animate-slide-in {
        animation: slide-in 0.3s ease-out;
    }
`;
document.head.appendChild(style);
