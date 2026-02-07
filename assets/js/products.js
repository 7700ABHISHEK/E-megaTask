// Product Data
const products = [
    // Kitchen Products
    {
        id: 1,
        name: "Bamboo Kitchen Set",
        category: "kitchen",
        price: 26.99,
        originalPrice: 29.99,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop",
        description: "Eco-friendly bamboo utensils set for sustainable cooking",
        eco: true,
        cashback: 2.70,
        points: 27
    },
    {
        id: 6,
        name: "Ceramic Cookware Set",
        category: "kitchen",
        price: 80.99,
        originalPrice: 89.99,
        image: "https://images.unsplash.com/photo-1584990347449-39b4aa02d0f9?w=500&h=500&fit=crop",
        description: "Non-toxic ceramic coating, PFOA-free cookware",
        eco: true,
        cashback: 8.10,
        points: 81
    },
    {
        id: 9,
        name: "Stainless Steel Straws",
        category: "kitchen",
        price: 13.49,
        originalPrice: 14.99,
        image: "https://images.unsplash.com/photo-1600857062241-98e5dba60f2f?w=500&h=500&fit=crop",
        description: "Reusable metal straws with cleaning brush",
        eco: true,
        cashback: 1.35,
        points: 13
    },
    {
        id: 10,
        name: "Glass Food Containers",
        category: "kitchen",
        price: 31.49,
        originalPrice: 34.99,
        image: "https://images.unsplash.com/photo-1584990347449-39b4aa02d0f9?w=500&h=500&fit=crop",
        description: "BPA-free glass storage containers set",
        eco: true,
        cashback: 3.15,
        points: 31
    },
    
    // Health Products
    {
        id: 2,
        name: "Organic Protein Powder",
        category: "health",
        price: 35.99,
        originalPrice: 39.99,
        image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=500&h=500&fit=crop",
        description: "Plant-based protein supplement with natural ingredients",
        eco: true,
        cashback: 3.60,
        points: 36
    },
    {
        id: 7,
        name: "Vitamin D3 Supplement",
        category: "health",
        price: 17.99,
        originalPrice: 19.99,
        image: "https://images.unsplash.com/photo-1550572017-4814c6f5d6c7?w=500&h=500&fit=crop",
        description: "Natural vitamin D3 from plant sources",
        eco: true,
        cashback: 1.80,
        points: 18
    },
    {
        id: 11,
        name: "Omega-3 Fish Oil",
        category: "health",
        price: 25.19,
        originalPrice: 27.99,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop",
        description: "Wild-caught fish oil capsules for heart health",
        eco: true,
        cashback: 2.52,
        points: 25
    },
    {
        id: 12,
        name: "Herbal Tea Collection",
        category: "health",
        price: 20.69,
        originalPrice: 22.99,
        image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500&h=500&fit=crop",
        description: "Organic herbal tea variety pack",
        eco: true,
        cashback: 2.07,
        points: 21
    },
    
    // Electronics Products
    {
        id: 3,
        name: "Solar Power Bank",
        category: "electronics",
        price: 44.99,
        originalPrice: 49.99,
        image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop",
        description: "Portable solar-powered charger for all devices",
        eco: true,
        cashback: 4.50,
        points: 45
    },
    {
        id: 8,
        name: "Eco Bluetooth Speaker",
        category: "electronics",
        price: 53.99,
        originalPrice: 59.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
        description: "Wireless speaker made from recycled materials",
        eco: true,
        cashback: 5.40,
        points: 54
    },
    {
        id: 13,
        name: "Bamboo Wireless Charger",
        category: "electronics",
        price: 32.39,
        originalPrice: 35.99,
        image: "https://images.unsplash.com/photo-1591290619762-c588f7e8e86f?w=500&h=500&fit=crop",
        description: "Fast wireless charging pad made from bamboo",
        eco: true,
        cashback: 3.24,
        points: 32
    },
    {
        id: 14,
        name: "Recycled Laptop Stand",
        category: "electronics",
        price: 40.49,
        originalPrice: 44.99,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
        description: "Ergonomic stand made from recycled aluminum",
        eco: true,
        cashback: 4.05,
        points: 40
    },
    
    // Grocery Products
    {
        id: 4,
        name: "Organic Quinoa",
        category: "grocery",
        price: 11.69,
        originalPrice: 12.99,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop",
        description: "Premium organic quinoa, sustainably sourced",
        eco: true,
        cashback: 1.17,
        points: 12
    },
    {
        id: 15,
        name: "Organic Chia Seeds",
        category: "grocery",
        price: 8.99,
        originalPrice: 9.99,
        image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500&h=500&fit=crop",
        description: "Raw organic chia seeds, rich in omega-3",
        eco: true,
        cashback: 0.90,
        points: 9
    },
    {
        id: 16,
        name: "Fair Trade Coffee",
        category: "grocery",
        price: 15.29,
        originalPrice: 16.99,
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=500&fit=crop",
        description: "Ethically sourced organic coffee beans",
        eco: true,
        cashback: 1.53,
        points: 15
    },
    {
        id: 17,
        name: "Organic Honey",
        category: "grocery",
        price: 17.09,
        originalPrice: 18.99,
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784acc?w=500&h=500&fit=crop",
        description: "Raw unfiltered organic honey",
        eco: true,
        cashback: 1.71,
        points: 17
    },
    
    // Lifestyle Products
    {
        id: 5,
        name: "Reusable Water Bottle",
        category: "lifestyle",
        price: 22.49,
        originalPrice: 24.99,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop",
        description: "Stainless steel insulated bottle, keeps drinks cold for 24hrs",
        eco: true,
        cashback: 2.25,
        points: 22
    },
    {
        id: 18,
        name: "Yoga Mat - Cork",
        category: "lifestyle",
        price: 49.49,
        originalPrice: 54.99,
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop",
        description: "Natural cork yoga mat with rubber base",
        eco: true,
        cashback: 4.95,
        points: 49
    },
    {
        id: 19,
        name: "Organic Cotton Tote Bag",
        category: "lifestyle",
        price: 17.99,
        originalPrice: 19.99,
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=500&fit=crop",
        description: "Reusable shopping bag made from organic cotton",
        eco: true,
        cashback: 1.80,
        points: 18
    },
    {
        id: 20,
        name: "Bamboo Sunglasses",
        category: "lifestyle",
        price: 38.69,
        originalPrice: 42.99,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop",
        description: "Stylish sunglasses with bamboo frames",
        eco: true,
        cashback: 3.87,
        points: 39
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
        const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
        const productCard = `
            <div class="product-card" data-id="${product.id}" data-aos="fade-up" data-aos-delay="${delay}">
                <div class="relative overflow-hidden">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    ${product.eco ? '<span class="eco-badge"><i class="fas fa-leaf"></i> Eco</span>' : ''}
                    ${discount > 0 ? `<span class="discount-badge">${discount}% OFF</span>` : ''}
                </div>
                <div class="p-4 flex flex-col flex-grow">
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">${product.name}</h3>
                    <p class="text-sm text-gray-600 mb-3">${product.description}</p>
                    
                    <div class="rewards-section mb-3">
                        <div class="flex items-center gap-3 text-xs">
                            <div class="flex items-center gap-1 text-green-600">
                                <i class="fas fa-coins"></i>
                                <span class="font-semibold">$${product.cashback.toFixed(2)} Cashback</span>
                            </div>
                            <div class="flex items-center gap-1 text-purple-600">
                                <i class="fas fa-star"></i>
                                <span class="font-semibold">${product.points} Points</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between mt-auto">
                        <div class="price-container">
                            ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                            <span class="sale-price">$${product.price.toFixed(2)}</span>
                        </div>
                        <div class="button-container">
                            <button onclick="addToCart(${product.id})" class="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition">
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

// Initialize products on page load
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setTimeout(() => {
        if (typeof updateAllProductButtons === 'function') {
            updateAllProductButtons();
        }
    }, 100);
});
