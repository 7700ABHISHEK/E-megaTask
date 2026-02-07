/**
 * Category Management System
 * 
 * This file fetches categories from the API: https://emegatask.com/GetCategory.ashx
 * 
 * API Structure:
 * - Categories have: id, name, display, logo, children[]
 * - Subcategories (children) have: id, name, display, grandchildren[]
 * - Grandchildren have: id, name, display
 * 
 * To add more categories:
 * 1. Add categories through your API backend
 * 2. Categories will automatically appear on the website
 * 3. Navigation and category sections will update automatically
 */

let categories = [];
let categoryMap = {}; // Maps category ID to category info

// Fetch categories from API
async function fetchCategories() {
    try {
        let response;
        let data;
        
        try {
            response = await fetch('https://emegatask.com/GetCategory.ashx', {
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
            response = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://emegatask.com/GetCategory.ashx'));
            
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            data = await response.json();
        }
        
        categories = data;
        buildCategoryMap();
        renderNavigation();
        renderCategorySection();
        renderCategoryFilters();
        
        console.log(`Loaded ${categories.length} categories from API`);
        console.log('Category Map:', categoryMap);
    } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback to default categories if API fails
        useFallbackCategories();
    }
}

// Build a flat map of all categories, subcategories, and grandchildren
function buildCategoryMap() {
    categoryMap = {};
    
    categories.forEach(category => {
        // Add main category
        categoryMap[category.id] = {
            id: category.id,
            name: category.name,
            display: category.display,
            logo: category.logo,
            type: 'category',
            slug: category.name.toLowerCase().replace(/\s+/g, '-')
        };
        
        // Add subcategories (children)
        if (category.children && category.children.length > 0) {
            category.children.forEach(child => {
                const childKey = `${category.id}-${child.id}`;
                categoryMap[childKey] = {
                    id: child.id,
                    parentId: category.id,
                    name: child.name,
                    display: child.display,
                    type: 'subcategory',
                    slug: child.name.toLowerCase().replace(/\s+/g, '-')
                };
                
                // Add grandchildren
                if (child.grandchildren && child.grandchildren.length > 0) {
                    child.grandchildren.forEach(grandchild => {
                        const grandchildKey = `${category.id}-${child.id}-${grandchild.id}`;
                        categoryMap[grandchildKey] = {
                            id: grandchild.id,
                            parentId: child.id,
                            categoryId: category.id,
                            name: grandchild.name,
                            display: grandchild.display,
                            type: 'grandchild',
                            slug: grandchild.name.toLowerCase().replace(/\s+/g, '-')
                        };
                    });
                }
            });
        }
    });
}

// Get category icon based on name
function getCategoryIcon(categoryName) {
    const iconMap = {
        'home-and-kitchen': 'fa-home',
        'kitchen': 'fa-utensils',
        'health-supplement': 'fa-heartbeat',
        'electronics': 'fa-laptop',
        'grocery': 'fa-shopping-basket',
        'lifestyle': 'fa-spa',
        'home-decor': 'fa-couch',
        'kitchen-appliances': 'fa-blender',
        'men': 'fa-male',
        'female': 'fa-female',
        'curtain': 'fa-window-maximize',
        'furniture': 'fa-chair',
        'wrist-watch': 'fa-clock'
    };
    
    const slug = categoryName.toLowerCase().replace(/\s+/g, '-');
    return iconMap[slug] || 'fa-tag';
}

// Map category names to actual file names
function getCategoryPageUrl(categoryName) {
    const fileMap = {
        'home-and-kitchen': 'home-and-kitchen.html',
        'health-supplement': 'health-supplement.html',
        'electronics': 'electronics.html',
        'grocery': 'grocery.html',
        'lifestyle': 'lifestyle.html'
    };
    
    const slug = categoryName.toLowerCase().replace(/\s+/g, '-');
    return fileMap[slug] || `${slug}.html`;
}

// Render navigation menu
function renderNavigation() {
    const desktopNav = document.querySelector('.hidden.xl\\:flex.items-center.space-x-6');
    const mobileNav = document.querySelector('#mobileMenu .flex.flex-col.space-y-3');
    
    if (!desktopNav || !mobileNav) return;
    
    // Keep Home link
    let desktopHTML = '<a href="index.html" class="nav-link text-gray-700 hover:text-green-600 font-medium transition">Home</a>';
    let mobileHTML = '<a href="index.html" class="nav-link text-gray-700 hover:text-green-600 font-medium py-2">Home</a>';
    
    // Add category links (limit to main categories)
    categories.slice(0, 6).forEach(category => {
        const pageUrl = getCategoryPageUrl(category.name);
        
        desktopHTML += `
            <a href="${pageUrl}" class="nav-link text-gray-700 hover:text-green-600 font-medium transition">
                ${category.display}
            </a>
        `;
        
        mobileHTML += `
            <a href="${pageUrl}" class="nav-link text-gray-700 hover:text-green-600 font-medium py-2">
                ${category.display}
            </a>
        `;
    });
    
    // Remove existing nav links first
    const existingDesktopLinks = desktopNav.querySelectorAll('.nav-link');
    existingDesktopLinks.forEach(link => link.remove());
    
    const existingMobileLinks = mobileNav.querySelectorAll('.nav-link');
    existingMobileLinks.forEach(link => link.remove());
    
    // Then add new links
    desktopNav.insertAdjacentHTML('afterbegin', desktopHTML);
    mobileNav.insertAdjacentHTML('afterbegin', mobileHTML);
}

// Render category section on homepage
function renderCategorySection() {
    const categoryGrid = document.querySelector('.grid.grid-cols-2.sm\\:grid-cols-3.lg\\:grid-cols-6');
    
    if (!categoryGrid) return;
    
    let html = '';
    
    // Show main categories (limit to 6 for grid layout)
    categories.slice(0, 6).forEach((category, index) => {
        const pageUrl = getCategoryPageUrl(category.name);
        const icon = getCategoryIcon(category.name);
        const delay = (index + 1) * 50;
        
        html += `
            <a href="${pageUrl}" class="category-card" data-aos="fade-up" data-aos-delay="${delay}">
                <div class="category-icon-wrapper">
                    <i class="fas ${icon} text-4xl text-green-600"></i>
                </div>
                <h3 class="category-title">${category.display}</h3>
            </a>
        `;
    });
    
    categoryGrid.innerHTML = html;
}

// Render category filter buttons
function renderCategoryFilters() {
    const filterContainer = document.querySelector('.flex.flex-wrap.justify-center.gap-3.mb-12');
    
    if (!filterContainer) return;
    
    let html = `
        <button onclick="filterProducts('all')" class="category-filter-btn active" data-category="all">
            <i class="fas fa-th"></i> All Products
        </button>
    `;
    
    // Add main category filters
    categories.forEach(category => {
        const slug = category.name.toLowerCase().replace(/\s+/g, '-');
        const icon = getCategoryIcon(category.name);
        
        html += `
            <button onclick="filterProducts('${category.id}')" class="category-filter-btn" data-category="${category.id}">
                <i class="fas ${icon}"></i> ${category.display}
            </button>
        `;
    });
    
    filterContainer.innerHTML = html;
}

// Get category info by ID
function getCategoryById(categoryId) {
    return categoryMap[categoryId] || null;
}

// Get all subcategories for a category
function getSubcategories(categoryId) {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.children : [];
}

// Get all grandchildren for a subcategory
function getGrandchildren(categoryId, subcategoryId) {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return [];
    
    const subcategory = category.children.find(child => child.id === subcategoryId);
    return subcategory ? subcategory.grandchildren : [];
}

// Fallback categories if API fails
function useFallbackCategories() {
    categories = [
        {
            id: 1,
            name: "Home-And-Kitchen",
            display: "Home And Kitchen",
            logo: null,
            children: []
        },
        {
            id: 2,
            name: "Health-Supplement",
            display: "Health Supplement",
            logo: null,
            children: []
        },
        {
            id: 3,
            name: "Electronics",
            display: "Electronics",
            logo: null,
            children: []
        },
        {
            id: 4,
            name: "Grocery",
            display: "Grocery",
            logo: null,
            children: []
        },
        {
            id: 5,
            name: "LifeStyle",
            display: "LifeStyle",
            logo: null,
            children: []
        }
    ];
    
    buildCategoryMap();
    renderNavigation();
    renderCategorySection();
    renderCategoryFilters();
    
    console.log('Using fallback categories');
}

// Export for use in other files
window.categoryAPI = {
    fetchCategories,
    getCategoryById,
    getSubcategories,
    getGrandchildren,
    getCategoryIcon,
    categories: () => categories,
    categoryMap: () => categoryMap
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
});
