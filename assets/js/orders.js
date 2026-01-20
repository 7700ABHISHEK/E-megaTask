// Check if user is logged in
const session = localStorage.getItem('session') || sessionStorage.getItem('session');
if (!session) {
    alert('Please login to view your orders');
    window.location.href = 'login.html';
}

// Load orders from localStorage
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Initialize orders page
document.addEventListener('DOMContentLoaded', () => {
    renderOrders();
});

// Render orders
function renderOrders() {
    const ordersContainer = document.getElementById('ordersContainer');
    const emptyOrders = document.getElementById('emptyOrders');

    if (orders.length === 0) {
        ordersContainer.classList.add('hidden');
        emptyOrders.classList.remove('hidden');
        return;
    }

    ordersContainer.classList.remove('hidden');
    emptyOrders.classList.add('hidden');

    // Sort orders by date (newest first)
    orders.sort((a, b) => new Date(b.date) - new Date(a.date));

    ordersContainer.innerHTML = '';

    orders.forEach((order, index) => {
        const orderDate = new Date(order.date);
        const formattedDate = orderDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const statusColors = {
            'Processing': 'bg-yellow-100 text-yellow-800',
            'Shipped': 'bg-blue-100 text-blue-800',
            'Delivered': 'bg-green-100 text-green-800',
            'Cancelled': 'bg-red-100 text-red-800'
        };

        const statusIcons = {
            'Processing': 'fa-clock',
            'Shipped': 'fa-truck',
            'Delivered': 'fa-check-circle',
            'Cancelled': 'fa-times-circle'
        };

        const orderHTML = `
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
                <div class="bg-gray-50 px-6 py-4 border-b flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p class="text-sm text-gray-600">Order ID</p>
                        <p class="font-bold text-gray-800">${order.orderId}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Order Date</p>
                        <p class="font-semibold text-gray-800">${formattedDate}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Total Amount</p>
                        <p class="font-bold text-green-600">$${order.total.toFixed(2)}</p>
                    </div>
                    <div>
                        <span class="px-4 py-2 rounded-full text-sm font-semibold ${statusColors[order.status] || statusColors['Processing']}">
                            <i class="fas ${statusIcons[order.status] || statusIcons['Processing']} mr-1"></i>
                            ${order.status}
                        </span>
                    </div>
                </div>

                <div class="p-6">
                    <!-- Delivery Address -->
                    <div class="mb-6">
                        <h3 class="font-semibold text-gray-800 mb-2">
                            <i class="fas fa-map-marker-alt text-green-600 mr-2"></i>Delivery Address
                        </h3>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <p class="font-medium text-gray-800">${order.address.fullName}</p>
                            <p class="text-gray-600 text-sm">${order.address.phone}</p>
                            <p class="text-gray-600 text-sm mt-2">
                                ${order.address.address1}${order.address.address2 ? ', ' + order.address.address2 : ''}<br>
                                ${order.address.city}, ${order.address.state} - ${order.address.pincode}
                            </p>
                        </div>
                    </div>

                    <!-- Order Items -->
                    <div class="mb-6">
                        <h3 class="font-semibold text-gray-800 mb-3">
                            <i class="fas fa-box text-green-600 mr-2"></i>Order Items (${order.items.length})
                        </h3>
                        <div class="space-y-3">
                            ${order.items.map(item => `
                                <div class="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                                    <div class="flex-1">
                                        <p class="font-medium text-gray-800">${item.name}</p>
                                        <p class="text-sm text-gray-600">Qty: ${item.quantity} × $${item.price.toFixed(2)}</p>
                                    </div>
                                    <p class="font-bold text-gray-800">$${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Payment Method -->
                    <div class="mb-6">
                        <h3 class="font-semibold text-gray-800 mb-2">
                            <i class="fas fa-credit-card text-green-600 mr-2"></i>Payment Method
                        </h3>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <p class="text-gray-700 capitalize">${order.paymentMethod.replace('-', ' ')}</p>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex flex-wrap gap-3">
                        <button onclick="viewOrderDetails(${index})" class="flex-1 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
                            <i class="fas fa-eye mr-2"></i>View Details
                        </button>
                        ${order.status === 'Processing' ? `
                            <button onclick="cancelOrder(${index})" class="flex-1 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">
                                <i class="fas fa-times mr-2"></i>Cancel Order
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;

        ordersContainer.innerHTML += orderHTML;
    });
}

// View order details
function viewOrderDetails(index) {
    const order = orders[index];
    alert(`Order Details:\n\nOrder ID: ${order.orderId}\nStatus: ${order.status}\nTotal: $${order.total.toFixed(2)}\n\nFor detailed tracking, please contact customer support.`);
}

// Cancel order
function cancelOrder(index) {
    const confirmCancel = confirm('Are you sure you want to cancel this order?');
    
    if (confirmCancel) {
        orders[index].status = 'Cancelled';
        localStorage.setItem('orders', JSON.stringify(orders));
        renderOrders();
        showNotification('Order cancelled successfully');
    }
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
