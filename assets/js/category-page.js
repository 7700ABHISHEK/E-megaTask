/**
 * Category Page Handler
 * 
 * This file handles dynamic category pages
 * It detects the category from the URL and loads appropriate products
 */

let currentCategoryId = null;
let currentSubcategoryId = null;
let currentGrandchildId = null;

// Get category from URL
function getCategoryFromURL() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().replace('.html', '');
    
    // Map filename to category
    // This will be populated after categories are loaded
    return filename;
}

// Initialize category page
async function initCategoryPage() {
    // Wait for categories to load
    await waitForCategories();
    
    const categorySlug = getCategoryFromURL();
    
    // Find category by slug
    const categoryMapData = window.categoryAPI.categoryMap();
    const category = Object.values(categoryMapData).find(cat => 
        cat.slug === categorySlug && cat.type === 'category'
    );
    
    if (!category) {
        console.error('Category not found:', categorySlug);
        return;
    }
    
    currentCategoryId = category.id;
    
    // Update page title and header
    document.getElementById('pageTitle').textContent = `${category.display} - E-megaTask`;
    document.getElementById('categoryTitle').textContent = category.display;
    document.getElementById('breadcrumbCategory').textContent = category.display;
    
    // Load subcategories if available
    loadSubcategories(category.id);
    
    // Wait for products to load
    await waitForProducts();
    
    // Filter and display products
    filterProductsByCategory(category.id);
}

// Wait for categories to be loaded
function waitForCategories() {
    return new Promise((resolve) => {
        const checkCategories = setInterval(() => {
            if (window.categoryAPI && window.categoryAPI.categories().length > 0) {
                clearInterval(checkCategories);
                resolve();
            }
        }, 100);
    });
}

// Wait for products to be loaded
function waitForProducts() {
    return new Promise((resolve) => {
        const checkProducts = setInterval(() => {
            if (typeof products !== 'undefined' && products.length > 0) {
                clearInterval(checkProducts);
                resolve();
            }
        }, 100);
    });
}

// Load subcategories
function loadSubcategories(categoryId) {
    const subcategories = window.categoryAPI.getSubcategories(categoryId);
    
    if (!subcategories || subcategories.length === 0) {
        document.getElementById('subcategoriesSection').style.display = 'none';
        return;
    }
    
    document.getElementById('subcategoriesSection').style.display = 'block';
    
    const subcategoriesGrid = document.getElementById('subcategoriesGrid');
    let html = '';
    
    subcategories.forEach((subcat, index) => {
        const icon = window.categoryAPI.getCategoryIcon(subcat.name);
        const delay = (index + 1) * 50;
        
        html += `
            <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer" 
                 onclick="filterBySubcategory(${categoryId}, ${subcat.id})"
                 data-aos="fade-up" 
                 data-aos-delay="${delay}">
                <div class="text-center">
                    <i class="fas ${icon} text-3xl text-green-600 mb-3"></i>
                    <h3 class="font-semibold text-gray-800">${subcat.display}</h3>
                </div>
            </div>
        `;
    });
    
    subcategoriesGrid.innerHTML = html;
}

// Filter products by category
function filterProductsByCategory(categoryId) {
    if (typeof products === 'undefined') {
        console.error('Products not loaded');
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.categoryId == categoryId
    );
    
    if (typeof renderProducts === 'function') {
        renderProducts(filteredProducts);
    }
}

// Sort products
document.addEventListener('DOMContentLoaded', () => {
    const sortSelect = document.getElementById('sortSelect');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const sortType = e.target.value;
            let sortedProducts = [...products];
            
            switch(sortType) {
                case 'price-low':
                    sortedProducts.sort((a, b) => 
                        parseFloat(a.DiscountedPrice) - parseFloat(b.DiscountedPrice)
                    );
                    break;
                case 'price-high':
                    sortedProducts.sort((a, b) => 
                        parseFloat(b.DiscountedPrice) - parseFloat(a.DiscountedPrice)
                    );
                    break;
                case 'name':
                    sortedProducts.sort((a, b) => 
                        a.Title.localeCompare(b.Title)
                    );
                    break;
                default:
                    // Filter by current category
                    if (currentCategoryId) {
                        sortedProducts = sortedProducts.filter(p => 
                            p.categoryId == currentCategoryId
                        );
                    }
            }
            
            if (typeof renderProducts === 'function') {
                renderProducts(sortedProducts);
            }
        });
    }
    
    // Initialize category page
    initCategoryPage();
});

// Override filterBySubcategory to work on category pages
window.filterBySubcategory = function(categoryId, subcategoryId) {
    currentSubcategoryId = subcategoryId;
    
    const filteredProducts = products.filter(product => 
        product.categoryId == categoryId && product.subcategoryId == subcategoryId
    );
    
    if (typeof renderProducts === 'function') {
        renderProducts(filteredProducts);
    }
    
    // Update breadcrumb
    const subcategories = window.categoryAPI.getSubcategories(categoryId);
    const subcat = subcategories.find(s => s.id === subcategoryId);
    
    if (subcat) {
        const breadcrumb = document.getElementById('breadcrumb');
        breadcrumb.innerHTML = `
            <a href="index.html" class="text-gray-600 hover:text-green-600">Home</a>
            <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
            <a href="#" onclick="initCategoryPage(); return false;" class="text-gray-600 hover:text-green-600" id="breadcrumbCategory"></a>
            <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
            <span class="text-gray-800 font-medium">${subcat.display}</span>
        `;
    }
};
