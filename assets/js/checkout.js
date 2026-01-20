// Check if user is logged in
const session = localStorage.getItem('session') || sessionStorage.getItem('session');
if (!session) {
    alert('Please login to continue checkout');
    sessionStorage.setItem('redirectAfterLogin', 'checkout.html');
    window.location.href = 'login.html';
}

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Check if cart is empty
if (cart.length === 0) {
    alert('Your cart is empty!');
    window.location.href = 'cart.html';
}

// Initialize checkout page
document.addEventListener('DOMContentLoaded', () => {
    loadOrderSummary();
    setupAddressForm();
    setupPaymentOptions();
});

// Load order summary
function loadOrderSummary() {
    const checkoutCartItems = document.getElementById('checkoutCartItems');
    let totalPrice = 0;
    let totalOriginalPrice = 0;
    let totalItems = 0;

    checkoutCartItems.innerHTML = '';

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const originalPrice = item.price * 1.2;
        const originalTotal = originalPrice * item.quantity;
        
        totalPrice += itemTotal;
        totalOriginalPrice += originalTotal;
        totalItems += item.quantity;

        const itemHTML = `
            <div class="flex items-center space-x-3 pb-3 border-b">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                <div class="flex-1">
                    <p class="text-sm font-medium text-gray-800">${item.name}</p>
                    <p class="text-xs text-gray-600">Qty: ${item.quantity}</p>
                    <p class="text-sm font-bold text-green-600">$${itemTotal.toFixed(2)}</p>
                </div>
            </div>
        `;
        checkoutCartItems.innerHTML += itemHTML;
    });

    const discount = totalOriginalPrice - totalPrice;
    const deliveryCharge = totalPrice >= 50 ? 0 : 5.99;
    const finalTotal = totalPrice + deliveryCharge;

    document.getElementById('checkoutItemCount').textContent = totalItems;
    document.getElementById('checkoutSubtotal').textContent = `$${totalOriginalPrice.toFixed(2)}`;
    document.getElementById('checkoutDiscount').textContent = `-$${discount.toFixed(2)}`;
    
    if (deliveryCharge === 0) {
        document.getElementById('checkoutDelivery').innerHTML = '<span class="text-green-600">FREE</span>';
    } else {
        document.getElementById('checkoutDelivery').textContent = `$${deliveryCharge.toFixed(2)}`;
    }
    
    document.getElementById('checkoutTotal').textContent = `$${finalTotal.toFixed(2)}`;
}

// Setup address form
function setupAddressForm() {
    const addressForm = document.getElementById('addressForm');
    
    // Pre-fill user name from session
    const sessionData = JSON.parse(session);
    document.getElementById('fullName').value = sessionData.name || '';
    
    addressForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Collect address data
        const addressData = {
            fullName: document.getElementById('fullName').value,
            phone: document.getElementById('phone').value,
            address1: document.getElementById('address1').value,
            address2: document.getElementById('address2').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            pincode: document.getElementById('pincode').value
        };
        
        // Store address in sessionStorage
        sessionStorage.setItem('checkoutAddress', JSON.stringify(addressData));
        
        // Move to payment section
        document.getElementById('addressSection').classList.add('hidden');
        document.getElementById('paymentSection').classList.remove('hidden');
        
        // Update step indicators
        document.getElementById('step1Indicator').classList.remove('bg-green-600');
        document.getElementById('step1Indicator').classList.add('bg-green-400');
        document.getElementById('step1Line').classList.remove('bg-gray-300');
        document.getElementById('step1Line').classList.add('bg-green-400');
        document.getElementById('step2Indicator').classList.remove('bg-gray-300', 'text-gray-600');
        document.getElementById('step2Indicator').classList.add('bg-green-600', 'text-white');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        showNotification('Address saved successfully!');
    });
}

// Setup payment options
function setupPaymentOptions() {
    const paymentOptions = document.querySelectorAll('.payment-option');
    
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
            
            // Remove active class from all options
            paymentOptions.forEach(opt => {
                opt.classList.remove('border-green-600', 'bg-green-50');
            });
            
            // Add active class to selected option
            this.classList.add('border-green-600', 'bg-green-50');
            
            // Hide all payment details
            document.getElementById('upiDetails').classList.add('hidden');
            document.getElementById('cardDetails').classList.add('hidden');
            
            // Show relevant payment details
            const paymentType = this.dataset.payment;
            if (paymentType === 'upi') {
                document.getElementById('upiDetails').classList.remove('hidden');
            } else if (paymentType === 'card') {
                document.getElementById('cardDetails').classList.remove('hidden');
            }
        });
    });
    
    // Back to address button
    document.getElementById('backToAddress').addEventListener('click', () => {
        document.getElementById('paymentSection').classList.add('hidden');
        document.getElementById('addressSection').classList.remove('hidden');
        
        // Update step indicators
        document.getElementById('step1Indicator').classList.add('bg-green-600');
        document.getElementById('step1Indicator').classList.remove('bg-green-400');
        document.getElementById('step1Line').classList.add('bg-gray-300');
        document.getElementById('step1Line').classList.remove('bg-green-400');
        document.getElementById('step2Indicator').classList.add('bg-gray-300', 'text-gray-600');
        document.getElementById('step2Indicator').classList.remove('bg-green-600', 'text-white');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Place order button
    document.getElementById('placeOrderBtn').addEventListener('click', () => {
        const selectedPayment = document.querySelector('input[name="payment"]:checked');
        
        if (!selectedPayment) {
            alert('Please select a payment method');
            return;
        }
        
        // Get address and payment data
        const addressData = JSON.parse(sessionStorage.getItem('checkoutAddress'));
        const paymentMethod = selectedPayment.value;
        
        // Calculate order total
        let totalPrice = 0;
        cart.forEach(item => {
            totalPrice += item.price * item.quantity;
        });
        const deliveryCharge = totalPrice >= 50 ? 0 : 5.99;
        const finalTotal = totalPrice + deliveryCharge;
        
        // Create order object
        const order = {
            orderId: 'ORD' + Date.now(),
            items: cart,
            address: addressData,
            paymentMethod: paymentMethod,
            total: finalTotal,
            status: 'Processing',
            date: new Date().toISOString()
        };
        
        // Store order in localStorage
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Clear cart
        localStorage.removeItem('cart');
        sessionStorage.removeItem('checkoutAddress');
        
        // Show success message
        showNotification('Order placed successfully! 🎉', 'success');
        
        // Redirect to order confirmation or orders page
        setTimeout(() => {
            window.location.href = 'orders.html';
        }, 2000);
    });
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    
    notification.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in`;
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <i class="fas ${icon} text-xl"></i>
            <span class="font-medium">${message}</span>
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
