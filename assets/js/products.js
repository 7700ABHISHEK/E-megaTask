/**
 * Product Management System
 * 
 * This file fetches products from the API: https://emegatask.com/GetProducts.ashx
 * 
 * To add more products:
 * 1. Add products through your API backend
 * 2. Products will automatically appear on the website
 * 3. No manual updates needed in this file
 * 
 * Category Mapping:
 * - catid 1 = Kitchen
 * - catid 2 = Health Supplement
 * - cati   d 3 = Electronics
 * - catid 4 = Grocery
 * - catid 5 = Lifestyle
 */

// Product Data
let products = []

// Category mapping will be loaded from categories.js
// This function gets the category ID from the API
function getCategoryIdFromProduct(catid) {
    // Return the catid as-is since it matches the category API
    return catid;
}

// Fetch products from API
async function fetchProducts() {
    try {
        // Try direct fetch first
        let response;
        let data;
        
        try {
            response = await fetch('https://emegatask.com/GetProducts.ashx', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                }
            });
            
            if (!response.ok) {
                throw new Error('Direct fetch failed');
            }
            data = await response.json();
        } catch (corsError) {
            console.log('Direct fetch failed, trying CORS proxy...');
            // If CORS fails, try using a CORS proxy
            response = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://emegatask.com/GetProducts.ashx'));
            
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            data = await response.json();
        }
        
        // Map API data to our product structure
        products = data.map(product => ({
            ProductID: product.ProductID,
            Title: product.Title,
            CurrentPrice: product.CurrentPrice,
            DiscountedPrice: product.DiscountedPrice,
            ImageUrl: product.ImageUrl,
            PointValue: product.PointValue,
            discount: product.discount,
            discountAmt: product.discountAmt,
            cashback: product.cashback,
            categoryId: product.catid, // Store the category ID from API
            subcategoryId: product.subcatid || null, // Store subcategory if available
            grandchildId: product.subsubcatid || null, // Store grandchild (API uses subsubcatid)
            description: product.Title, // Using title as description since API doesn't provide one
            eco: false // Set based on your criteria
        }));
        
        // Render products after fetching
        renderProducts();
        updateAllProductButtons();
        
        console.log(`Loaded ${products.length} products from API`);
    } catch (error) {
        console.error('Error fetching products:', error);
        // Show error message to user
        const productsGrid = document.getElementById('productsGrid');
        if (productsGrid) {
            productsGrid.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-exclamation-triangle text-6xl text-red-400 mb-4"></i>
                    <p class="text-xl text-gray-700 mb-2">Failed to load products</p>
                    <p class="text-sm text-gray-500 mb-4">${error.message}</p>
                    <button onclick="fetchProducts()" class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
                        <i class="fas fa-sync-alt"></i> Retry
                    </button>
                </div>
            `;
        }
    }
}

// Current filter state
let currentFilter = 'all';

// Filter products by category
function filterProducts(categoryId) {
    currentFilter = categoryId;

    // Update active button state
    document.querySelectorAll('.category-filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`[data-category="${categoryId}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    // Filter and render products
    const filteredProducts = categoryId === 'all'
        ? products
        : products.filter(product => {
            // Match by category ID, subcategory ID, or grandchild ID
            return product.categoryId == categoryId || 
                   product.subcategoryId == categoryId || 
                   product.grandchildId == categoryId;
        });

    renderProducts(filteredProducts);
}

// Filter products by subcategory
function filterBySubcategory(categoryId, subcategoryId) {
    const filteredProducts = products.filter(product => 
        product.categoryId == categoryId && product.subcategoryId == subcategoryId
    );
    renderProducts(filteredProducts);
}

// Filter products by grandchild
function filterByGrandchild(categoryId, subcategoryId, grandchildId) {
    const filteredProducts = products.filter(product => 
        product.categoryId == categoryId && 
        product.subcategoryId == subcategoryId && 
        product.grandchildId == grandchildId
    );
    renderProducts(filteredProducts);
}

// Render Products
function renderProducts(productsToRender = products) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    if (productsToRender.length === 0) {
        productsGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-box-open text-6xl text-gray-300 mb-4"></i>
                <p class="text-xl text-gray-500">No products found in this category</p>
            </div>
        `;
        return;
    }

    productsToRender.forEach((product, index) => {
        const delay = Math.min(index * 50, 400);
        const currentPrice = parseFloat(product.CurrentPrice) / 100;
        const discountedPrice = parseFloat(product.DiscountedPrice) / 100;
        const discount = parseInt(product.discount) || 0;
        const productCard = `
            <div class="product-card" data-id="${product.ProductID}" data-aos="fade-up" data-aos-delay="${delay}">
                <div class="relative overflow-hidden">
                    <img src="${product.ImageUrl}" alt="${product.Title}" class="product-image">
                    ${product.eco ? '<span class="eco-badge"><i class="fas fa-leaf"></i> Eco</span>' : ''}
                    ${discount > 0 ? `<span class="discount-badge">${discount}% OFF</span>` : ''}
                </div>
                <div class="p-4 flex flex-col flex-grow">
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">${product.Title}</h3>
                    <p class="text-sm text-gray-600 mb-3">${product.description}</p>
                    
                    <div class="rewards-section mb-3">
                        <div class="flex items-center gap-3 text-xs">
                            <div class="flex items-center gap-1 text-green-600">
                                <i class="fas fa-coins"></i>
                                <span class="font-semibold">$${parseFloat(product.cashback).toFixed(2)} Cashback</span>
                            </div>
                            <div class="flex items-center gap-1 text-purple-600">
                                <i class="fas fa-star"></i>
                                <span class="font-semibold">${product.PointValue} Points</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between mt-auto">
                        <div class="price-container">
                            ${currentPrice !== discountedPrice ? `<span class="original-price">$${currentPrice.toFixed(2)}</span>` : ''}
                            <span class="sale-price">$${discountedPrice.toFixed(2)}</span>
                        </div>
                        <div class="button-container">
                            <button onclick="addToCart('${product.ProductID}')" class="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition">
                                <i class="fas fa-cart-plus"></i> Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        productsGrid.innerHTML += productCard;
    });

    setTimeout(() => {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 100);
}

// Note: addToCart, increaseQuantity, decreaseQuantity, updateProductButton, 
// and showNotification functions are defined in main.js

// Update all product buttons based on cart state
function updateAllProductButtons() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach(item => {
        if (typeof updateProductButton === 'function') {
            updateProductButton(item.id, item.quantity);
        }
    });
}

// Initialize products on page load
document.addEventListener('DOMContentLoaded', () => {
    // Fetch products from API
    fetchProducts();

    // Update cart count on page load
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
});
