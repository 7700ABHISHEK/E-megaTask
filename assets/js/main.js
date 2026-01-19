// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = 0;

// Initialize cart count on page load
function initializeCart() {
    updateCartCountFromCart();
    updateAllProductButtons();
}

// Update cart count from cart array
function updateCartCountFromCart() {
    cartCount = cart.length; // Count unique products, not total quantity
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        
        // Pop animation
        cartCountElement.classList.remove('pop');
        void cartCountElement.offsetWidth; // Trigger reflow
        cartCountElement.classList.add('pop');
        
        // Scale animation
        cartCountElement.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartCountElement.style.transform = 'scale(1)';
        }, 200);
    }
}

// Update all product buttons based on cart state
function updateAllProductButtons() {
    cart.forEach(item => {
        updateProductButton(item.id, item.quantity);
    });
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Add to Cart Function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
        showNotification(`${product.name} quantity increased!`);
        updateProductButton(productId, existingItem.quantity);
    } else {
        cart.push({ ...product, quantity: 1 });
        showNotification(`${product.name} added to cart!`);
        updateProductButton(productId, 1);
    }
    
    updateCartCountFromCart();
    saveCart();
    
    // Update sidebar if it's already open (don't auto-open)
    if (document.getElementById('cartSidebar').classList.contains('active')) {
        renderSidebarCart();
    }
}

// Increase quantity
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity++;
        updateProductButton(productId, item.quantity);
        saveCart();
        
        // Update sidebar if open without full re-render
        if (document.getElementById('cartSidebar').classList.contains('active')) {
            const sidebarItem = document.querySelector(`[data-product-id="${productId}"]`);
            if (sidebarItem) {
                const quantityDisplay = sidebarItem.querySelector('.font-semibold.text-gray-800');
                const itemTotal = sidebarItem.querySelector('.text-sm.font-semibold.text-gray-700');
                quantityDisplay.textContent = item.quantity;
                itemTotal.textContent = `${(item.price * item.quantity).toFixed(2)}`;
                updateSidebarTotal();
            }
        }
    }
}

// Decrease quantity
function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity--;
        updateProductButton(productId, item.quantity);
        saveCart();
        
        // Update sidebar if open without full re-render
        if (document.getElementById('cartSidebar').classList.contains('active')) {
            const sidebarItem = document.querySelector(`[data-product-id="${productId}"]`);
            if (sidebarItem) {
                const quantityDisplay = sidebarItem.querySelector('.font-semibold.text-gray-800');
                const itemTotal = sidebarItem.querySelector('.text-sm.font-semibold.text-gray-700');
                quantityDisplay.textContent = item.quantity;
                itemTotal.textContent = `${(item.price * item.quantity).toFixed(2)}`;
                updateSidebarTotal();
            }
        }
    } else if (item && item.quantity === 1) {
        removeFromCart(productId);
    }
}

// Remove from cart
function removeFromCart(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        cart = cart.filter(item => item.id !== productId);
        updateCartCountFromCart();
        updateProductButton(productId, 0);
        saveCart();
        showNotification('Item removed from cart');
        
        // Update sidebar if open
        if (document.getElementById('cartSidebar').classList.contains('active')) {
            renderSidebarCart();
        }
    }
}

// Update product button state
function updateProductButton(productId, quantity) {
    const productCard = document.querySelector(`[data-id="${productId}"]`);
    if (!productCard) return;

    const buttonContainer = productCard.querySelector('.button-container');
    
    if (quantity > 0) {
        buttonContainer.innerHTML = `
            <div class="flex items-center space-x-2">
                <button onclick="decreaseQuantity(${productId})" class="bg-gray-200 text-gray-700 w-8 h-8 rounded-full hover:bg-gray-300 transition flex items-center justify-center">
                    <i class="fas fa-minus text-sm"></i>
                </button>
                <span class="font-semibold text-gray-800 min-w-[2rem] text-center">${quantity}</span>
                <button onclick="increaseQuantity(${productId})" class="bg-green-600 text-white w-8 h-8 rounded-full hover:bg-green-700 transition flex items-center justify-center">
                    <i class="fas fa-plus text-sm"></i>
                </button>
            </div>
        `;
    } else {
        buttonContainer.innerHTML = `
            <button onclick="addToCart(${productId})" class="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition">
                <i class="fas fa-cart-plus"></i> Add
            </button>
        `;
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Show Notification
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

// Search Functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    renderProducts(filteredProducts);
});

// Account Button - Check if user is logged in
document.getElementById('accountBtn').addEventListener('click', () => {
    const session = localStorage.getItem('session') || sessionStorage.getItem('session');
    
    if (session) {
        const sessionData = JSON.parse(session);
        const confirmLogout = confirm(`Hello ${sessionData.name}!\n\nWould you like to logout?`);
        
        if (confirmLogout) {
            localStorage.removeItem('session');
            sessionStorage.removeItem('session');
            showNotification('Logged out successfully!');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        }
    } else {
        window.location.href = 'login.html';
    }
});

// Mobile Account Button - Same functionality
const mobileAccountBtn = document.getElementById('mobileAccountBtn');
if (mobileAccountBtn) {
    mobileAccountBtn.addEventListener('click', () => {
        const session = localStorage.getItem('session') || sessionStorage.getItem('session');
        
        if (session) {
            const sessionData = JSON.parse(session);
            const confirmLogout = confirm(`Hello ${sessionData.name}!\n\nWould you like to logout?`);
            
            if (confirmLogout) {
                localStorage.removeItem('session');
                sessionStorage.removeItem('session');
                showNotification('Logged out successfully!');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            }
        } else {
            window.location.href = 'login.html';
        }
        
        // Close mobile menu after clicking
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
}

// Cart Button - Navigate to cart page
document.getElementById('cartBtn').addEventListener('click', () => {
    window.location.href = 'cart.html';
});

// Cart Sidebar Functionality
const cartContainer = document.getElementById('cartContainer');
const cartSidebar = document.getElementById('cartSidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const closeSidebar = document.getElementById('closeSidebar');
const viewCartBtn = document.getElementById('viewCartBtn');
const checkoutSidebarBtn = document.getElementById('checkoutSidebarBtn');

let sidebarTimeout;

// Show sidebar on hover
cartContainer.addEventListener('mouseenter', () => {
    clearTimeout(sidebarTimeout);
    cartSidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    renderSidebarCart();
});

// Keep sidebar open when hovering over it
cartSidebar.addEventListener('mouseenter', () => {
    clearTimeout(sidebarTimeout);
});

// Hide sidebar when mouse leaves
cartContainer.addEventListener('mouseleave', () => {
    sidebarTimeout = setTimeout(() => {
        if (!cartSidebar.matches(':hover')) {
            closeSidebarCart();
        }
    }, 300);
});

cartSidebar.addEventListener('mouseleave', () => {
    sidebarTimeout = setTimeout(() => {
        closeSidebarCart();
    }, 300);
});

// Close sidebar on overlay click
sidebarOverlay.addEventListener('click', () => {
    closeSidebarCart();
});

// Close sidebar button
closeSidebar.addEventListener('click', () => {
    closeSidebarCart();
});

// View cart button
viewCartBtn.addEventListener('click', () => {
    window.location.href = 'cart.html';
});

// Checkout from sidebar
checkoutSidebarBtn.addEventListener('click', () => {
    const session = localStorage.getItem('session') || sessionStorage.getItem('session');
    
    if (!session) {
        closeSidebarCart();
        const confirmLogin = confirm('Please login to proceed with checkout. Would you like to login now?');
        if (confirmLogin) {
            sessionStorage.setItem('redirectAfterLogin', 'cart.html');
            window.location.href = 'login.html';
        }
        return;
    }
    
    window.location.href = 'cart.html';
});

function closeSidebarCart() {
    cartSidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
}

// Render sidebar cart
function renderSidebarCart() {
    const sidebarCartItems = document.getElementById('sidebarCartItems');
    const sidebarTotal = document.getElementById('sidebarTotal');
    
    if (cart.length === 0) {
        sidebarCartItems.innerHTML = `
            <div class="empty-cart-sidebar">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add items to get started</p>
            </div>
        `;
        sidebarTotal.textContent = '$0.00';
        return;
    }
    
    let total = 0;
    let itemsHTML = '';
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        itemsHTML += `
            <div class="sidebar-cart-item" data-sidebar-index="${index}" data-product-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="sidebar-item-image">
                <div class="sidebar-item-details">
                    <div>
                        <h4 class="sidebar-item-name">${item.name}</h4>
                        <div class="sidebar-item-price">
                            <span class="text-green-600 font-bold">$${item.price.toFixed(2)}</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-between mt-2">
                        <div class="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1">
                            <button onclick="decreaseQuantityFromSidebar(${item.id})" class="text-gray-600 hover:text-green-600 w-6 h-6 flex items-center justify-center">
                                <i class="fas fa-minus text-xs"></i>
                            </button>
                            <span class="font-semibold text-gray-800 min-w-[1.5rem] text-center">${item.quantity}</span>
                            <button onclick="increaseQuantityFromSidebar(${item.id})" class="text-gray-600 hover:text-green-600 w-6 h-6 flex items-center justify-center">
                                <i class="fas fa-plus text-xs"></i>
                            </button>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="text-sm font-semibold text-gray-700">$${itemTotal.toFixed(2)}</span>
                            <button onclick="removeFromSidebar(${item.id})" class="text-red-500 hover:text-red-700 text-sm">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    sidebarCartItems.innerHTML = itemsHTML;
    sidebarTotal.textContent = `$${total.toFixed(2)}`;
    
    // Animate total
    sidebarTotal.classList.add('updated');
    setTimeout(() => {
        sidebarTotal.classList.remove('updated');
    }, 200);
}

// Increase quantity from sidebar
function increaseQuantityFromSidebar(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity++;
        saveCart();
        
        // Update only the specific item in sidebar without full re-render
        const sidebarItem = document.querySelector(`[data-product-id="${productId}"]`);
        if (sidebarItem) {
            const quantityDisplay = sidebarItem.querySelector('.font-semibold.text-gray-800');
            const itemTotal = sidebarItem.querySelector('.text-sm.font-semibold.text-gray-700');
            quantityDisplay.textContent = item.quantity;
            itemTotal.textContent = `${(item.price * item.quantity).toFixed(2)}`;
            
            // Update total
            updateSidebarTotal();
        }
        
        updateProductButton(productId, item.quantity);
    }
}

// Decrease quantity from sidebar
function decreaseQuantityFromSidebar(productId) {
    const item = cart.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity--;
        saveCart();
        
        // Update only the specific item in sidebar without full re-render
        const sidebarItem = document.querySelector(`[data-product-id="${productId}"]`);
        if (sidebarItem) {
            const quantityDisplay = sidebarItem.querySelector('.font-semibold.text-gray-800');
            const itemTotal = sidebarItem.querySelector('.text-sm.font-semibold.text-gray-700');
            quantityDisplay.textContent = item.quantity;
            itemTotal.textContent = `${(item.price * item.quantity).toFixed(2)}`;
            
            // Update total
            updateSidebarTotal();
        }
        
        updateProductButton(productId, item.quantity);
    } else if (item && item.quantity === 1) {
        removeFromSidebar(productId);
    }
}

// Remove item from sidebar
function removeFromSidebar(productId) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    // Find the sidebar item element
    const sidebarItem = document.querySelector(`[data-product-id="${productId}"]`);
    if (sidebarItem) {
        sidebarItem.classList.add('removing');
    }
    
    setTimeout(() => {
        cart = cart.filter(item => item.id !== productId);
        updateCartCountFromCart();
        updateProductButton(productId, 0);
        saveCart();
        renderSidebarCart();
        showNotification('Item removed from cart');
    }, 300);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
});

// Add animation class to CSS
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

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeCart();
});

// Initialize Swiper Slider
const swiper = new Swiper('.bannerSwiper', {
    // Enable loop mode for continuous sliding
    loop: true,
    
    // Autoplay settings
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    
    // Smooth transition effect
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    
    // Speed of transition
    speed: 600,
    
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    
    // Pagination bullets
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    
    // Keyboard control
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },
    
    // Grab cursor
    grabCursor: true,
});

// Helper function to update sidebar total without re-rendering
function updateSidebarTotal() {
    const sidebarTotal = document.getElementById('sidebarTotal');
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    sidebarTotal.textContent = `${total.toFixed(2)}`;
    
    // Animate total
    sidebarTotal.classList.add('updated');
    setTimeout(() => {
        sidebarTotal.classList.remove('updated');
    }, 200);
}
