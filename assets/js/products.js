// Product Data
const products = [
    // Kitchen Products
    {
        "ProductID": "1",
        "Title": "Bamboo Kitchen Set",
        "CurrentPrice": "2999",
        "DiscountedPrice": "2699",
        "ImageUrl": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
        "PointValue": "27",
        "discount": "10",
        "discountAmt": "300",
        "cashback": "2.70",
        "catid": "1",
        "subcatid": "",
        "subsubcatid": "",
        "description": "Eco-friendly bamboo utensils set for sustainable cooking",
        "category": "kitchen",
        "eco": true
    },
    {
        "ProductID": "6",
        "Title": "Ceramic Cookware Set",
        "CurrentPrice": "8999",
        "DiscountedPrice": "8099",
        "ImageUrl": "https://images.unsplash.com/photo-1584990347449-39b4aa02d0f9?w=500&h=500&fit=crop",
        "PointValue": "81",
        "discount": "10",
        "discountAmt": "900",
        "cashback": "8.10",
        "catid": "1",
        "subcatid": "",
        "subsubcatid": "",
        "description": "Non-toxic ceramic coating, PFOA-free cookware",
        "category": "kitchen",
        "eco": true
    },
    {
        "ProductID": "9",
        "Title": "Stainless Steel Straws",
        "CurrentPrice": "1499",
        "DiscountedPrice": "1349",
        "ImageUrl": "https://images.unsplash.com/photo-1600857062241-98e5dba60f2f?w=500&h=500&fit=crop",
        "PointValue": "13",
        "discount": "10",
        "discountAmt": "150",
        "cashback": "1.35",
        "catid": "1",
        "subcatid": "",
        "subsubcatid": "",
        "description": "Reusable metal straws with cleaning brush",
        "category": "kitchen",
        "eco": true
    },
    {
        "ProductID": "10",
        "Title": "Glass Food Containers",
        "CurrentPrice": "3499",
        "DiscountedPrice": "3149",
        "ImageUrl": "https://images.unsplash.com/photo-1584990347449-39b4aa02d0f9?w=500&h=500&fit=crop",
        "PointValue": "31",
        "discount": "10",
        "discountAmt": "350",
        "cashback": "3.15",
        "catid": "1",
        "subcatid": "",
        "subsubcatid": "",
        "description": "BPA-free glass storage containers set",
        "category": "kitchen",
        "eco": true
    },
    
    // Health Products
    {
        "ProductID": "2",
        "Title": "Organic Protein Powder",
        "CurrentPrice": "3999",
        "DiscountedPrice": "3599",
        "ImageUrl": "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=500&h=500&fit=crop",
        "PointValue": "36",
        "discount": "10",
        "discountAmt": "400",
        "cashback": "3.60",
        "catid": "2",
        "subcatid": "",
        "subsubcatid": "",
        "description": "Plant-based protein supplement with natural ingredients",
        "category": "health",
        "eco": true
    },
    {
        "ProductID": "7",
        "Title": "Vitamin D3 Supplement",
        "CurrentPrice": "1999",
        "DiscountedPrice": "1799",
        "ImageUrl": "https://images.unsplash.com/photo-1550572017-4814c6f5d6c7?w=500&h=500&fit=crop",
        "PointValue": "18",
        "discount": "10",
        "discountAmt": "200",
        "cashback": "1.80",
        "catid": "2",
        "subcatid": "",
        "subsubcatid": "",
        "description": "Natural vitamin D3 from plant sources",
        "category": "health",
        "eco": true
    },
    {
        "ProductID": "11",
        "Title": "Omega-3 Fish Oil",
        "CurrentPrice": "2799",
        "DiscountedPrice": "2519",
        "ImageUrl": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop",
        "PointValue": "25",
        "discount": "10",
        "discountAmt": "280",
        "cashback": "2.52",
        "catid": "2",
        "subcatid": "",
        "subsubcatid": "",
        "description": "Wild-caught fish oil capsules for heart health",
        "category": "health",
        "eco": true
    },
    {
        "ProductID": "12",
        "Title": "Herbal Tea Collection",
        "CurrentPrice": "2299",
        "DiscountedPrice": "2069",
        "ImageUrl": "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500&h=500&fit=crop",
        "PointValue": "21",
        "discount": "10",
        "discountAmt": "230",
        "cashback": "2.07",
        "catid": "2",
        "subcatid": "",
        "subsubcatid": "",
        "description": "Organic herbal tea variety pack",
        "category": "health",
        "eco": true
    },
    
    // Electronics Products
    {
        "ProductID": "3",
        "Title": "Solar Power Bank",
        "CurrentPrice": "4999",
        "DiscountedPrice": "4499",
        "ImageUrl": "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop",
        "PointValue": "45",
        "discount": "10",
        "discountAmt": "500",
        "cashback": "4.50",
        "catid": "3",
        "subcatid": "",
        "subsubcatid": "",
        "description": "Portable solar-powered charger for all devices",
        "category": "electronics",
        "eco": true
    },
    {
        "ProductID": "8",
        "Title": "Eco Bluetooth Speaker",
        "CurrentPrice": "5999",
        "DiscountedPrice": "5399",
        "ImageUrl": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
        "PointValue": "54",
        "discount": "10",
        "discountAmt": "600",
        "cashback": "5.40",
        "catid": "3",
        "subcatid": "",
        "subsubcatid": "",
        "description": "Wireless speaker made from recycled materials",
        "category": "electronics",
        "eco": true
    },
    {
        "ProductID": "13",
        "Title": "Bamboo Wireless Charger",
        "CurrentPrice": "3599",
        "DiscountedPrice": "3239",
        "ImageUrl": "https://images.unsplash.com/photo-1591290619762-c588f7e8e86f?w=500&h=500&fit=crop",
        "PointValue": "32",
        "discount": "10",
        "discountAmt": "360",
        "cashback": "3.24",
        "catid": "3",
        "subcatid": "",
        "subsubcatid": "",
        "description": "Fast wireless charging pad made from bamboo",
        "category": "electronics",
        "eco": true
    },
    {
        "ProductID": "14",
        "Title": "Recycled Laptop Stand",
        "CurrentPrice": "4499",
        "DiscountedPrice": "4049",
        "ImageUrl": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
        "PointValue": "40",
        "discount": "10",
        "discountAmt": "450",
        "cashback": "4.05",
        "catid": "3",
        "subcatid": "",
        "subsubcatid": "",
        "description": "Ergonomic stand made from recycled aluminum",
        "category": "electronics",
        "eco": true
    },
    
    // Grocery Products
    {
        "ProductID": "4",
        "Title": "Organic Quinoa",
        "CurrentPrice": "1299",
        "DiscountedPrice": "1169",
        "ImageUrl": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop",
        "PointValue": "12",
        "discount": "10",
        "discountAmt": "130",
        "cashback": "1.17",
        "catid": "4",
        "subcatid": "",
        "subsubcatid": "",
        "description": "Premium organic quinoa, sustainably sourced",
        "category": "grocery",
        "eco": true
    },
    {
        "ProductID": "15",
        "Title": "Organic Chia Seeds",
        "CurrentPrice": "999",
        "DiscountedPrice": "899",
        "ImageUrl": "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500&h=500&fit=crop",
        "PointValue": "9",
        "discount": "10",
        "discountAmt": "100",
        "cashback": "0.90",
        "catid": "4",
        "subcatid": "",
        "subsubcatid": "",
        "description": "Raw organic chia seeds, rich in omega-3",
        "category": "grocery",
        "eco": true
    },
    {
        "ProductID": "16",
        "Title": "Fair Trade Coffee",
        "CurrentPrice": "1699",
        "DiscountedPrice": "1529",
        "ImageUrl": "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=500&fit=crop",
        "PointValue": "15",
        "discount": "10",
        "discountAmt": "170",
        "cashback": "1.53",
        "catid": "4",
        "subcatid": "",
        "subsubcatid": "",
        "description": "Ethically sourced organic coffee beans",
        "category": "grocery",
        "eco": true
    },
    {
        "ProductID": "17",
        "Title": "Organic Honey",
        "CurrentPrice": "1899",
        "DiscountedPrice": "1709",
        "ImageUrl": "https://images.unsplash.com/photo-1587049352846-4a222e784acc?w=500&h=500&fit=crop",
        "PointValue": "17",
        "discount": "10",
        "discountAmt": "190",
        "cashback": "1.71",
        "catid": "4",
        "subcatid": "",
        "subsubcatid": "",
        "description": "Raw unfiltered organic honey",
        "category": "grocery",
        "eco": true
    },
    
    // Lifestyle Products
    {
        "ProductID": "5",
        "Title": "Reusable Water Bottle",
        "CurrentPrice": "2499",
        "DiscountedPrice": "2249",
        "ImageUrl": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop",
        "PointValue": "22",
        "discount": "10",
        "discountAmt": "250",
        "cashback": "2.25",
        "catid": "5",
        "subcatid": "",
        "subsubcatid": "",
        "description": "Stainless steel insulated bottle, keeps drinks cold for 24hrs",
        "category": "lifestyle",
        "eco": true
    },
    {
        "ProductID": "18",
        "Title": "Yoga Mat - Cork",
        "CurrentPrice": "5499",
        "DiscountedPrice": "4949",
        "ImageUrl": "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop",
        "PointValue": "49",
        "discount": "10",
        "discountAmt": "550",
        "cashback": "4.95",
        "catid": "5",
        "subcatid": "",
        "subsubcatid": "",
        "description": "Natural cork yoga mat with rubber base",
        "category": "lifestyle",
        "eco": true
    },
    {
        "ProductID": "19",
        "Title": "Organic Cotton Tote Bag",
        "CurrentPrice": "1999",
        "DiscountedPrice": "1799",
        "ImageUrl": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=500&fit=crop",
        "PointValue": "18",
        "discount": "10",
        "discountAmt": "200",
        "cashback": "1.80",
        "catid": "5",
        "subcatid": "",
        "subsubcatid": "",
        "description": "Reusable shopping bag made from organic cotton",
        "category": "lifestyle",
        "eco": true
    },
    {
        "ProductID": "20",
        "Title": "Bamboo Sunglasses",
        "CurrentPrice": "4299",
        "DiscountedPrice": "3869",
        "ImageUrl": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop",
        "PointValue": "39",
        "discount": "10",
        "discountAmt": "430",
        "cashback": "3.87",
        "catid": "5",
        "subcatid": "",
        "subsubcatid": "",
        "description": "Stylish sunglasses with bamboo frames",
        "category": "lifestyle",
        "eco": true
    },
    {
        "ProductID": "58",
        "Title": "Leather belt",
        "CurrentPrice": "750",
        "DiscountedPrice": "750",
        "ImageUrl": "https://emegatask.com/profilepic/8c017de2-7351-4a88-9d58-98120e8863b0.png",
        "PointValue": "1",
        "discount": "0",
        "discountAmt": "0",
        "cashback": "1.00",
        "catid": "0",
        "subcatid": "",
        "subsubcatid": "",
        "description": "Premium leather belt",
        "category": "lifestyle",
        "eco": false
    }
];

// Current filter state
let currentFilter = 'all';

// Filter products by category
function filterProducts(category) {
    currentFilter = category;
    
    // Update active button state
    document.querySelectorAll('.category-filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Filter and render products
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
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
    renderProducts();
    
    // Update cart count on page load
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
    
    // Update product buttons to reflect cart state
    setTimeout(() => {
        updateAllProductButtons();
    }, 100);
});
