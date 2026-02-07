# E-Commerce Website

A modern, dynamic e-commerce platform with API-driven category management and real-time product filtering.

## Features

- **Dynamic Category System**: Categories load automatically from API
- **Multi-Level Categorization**: Support for categories, subcategories, and grandchildren
- **Real-Time Product Filtering**: Filter products by category, price, and search
- **Shopping Cart**: Full cart functionality with add/remove/update
- **User Authentication**: Login and signup system
- **Order Management**: Track and manage orders
- **Profile Management**: User profile with order history
- **Responsive Design**: Mobile-friendly interface

## Quick Start

1. Open `index.html` in your browser
2. Browse categories and products
3. Add items to cart
4. Proceed to checkout

## Project Structure

```
├── index.html              # Homepage
├── assets/
│   ├── css/
│   │   ├── style.css       # Main styles
│   │   ├── auth.css        # Authentication styles
│   │   ├── cart.css        # Cart styles
│   │   └── profile.css     # Profile styles
│   ├── js/
│   │   ├── categories.js   # Category API management
│   │   ├── products.js     # Product API management
│   │   ├── main.js         # Main functionality
│   │   ├── cart.js         # Cart functionality
│   │   ├── auth.js         # Authentication
│   │   ├── checkout.js     # Checkout process
│   │   ├── orders.js       # Order management
│   │   └── profile.js      # Profile management
│   └── images/
│       └── logo.png
├── Category Pages:
│   ├── home-and-kitchen.html
│   ├── health-supplement.html
│   ├── electronics.html
│   ├── grocery.html
│   └── lifestyle.html
└── Other Pages:
    ├── cart.html
    ├── checkout.html
    ├── orders.html
    ├── profile.html
    ├── login.html
    └── signup.html
```

## API Integration

### Category API
**Endpoint**: `https://emegatask.com/GetCategory.ashx`

Returns categories with subcategories and grandchildren:
```json
[
  {
    "id": 1,
    "name": "Home-And-Kitchen",
    "display": "Home And Kitchen",
    "children": [
      {
        "id": 1,
        "name": "Kitchen-Appliances",
        "display": "Kitchen Appliances",
        "grandchildren": []
      }
    ]
  }
]
```

### Products API
**Endpoint**: `https://emegatask.com/GetProducts.ashx`

Returns products with category mapping:
```json
[
  {
    "ProductID": "58",
    "Title": "Product Name",
    "CurrentPrice": "750",
    "DiscountedPrice": "750",
    "ImageUrl": "https://...",
    "catid": "5",
    "subcatid": "3",
    "subsubcatid": "3"
  }
]
```

## How It Works

### Category System
1. Page loads and fetches categories from API
2. Navigation menu updates automatically
3. Category sections render dynamically
4. Filter buttons are generated from API data

### Product Filtering
Products can be filtered by:
- **Category**: Main category level (`catid`)
- **Subcategory**: Second level (`subcatid`)
- **Grandchild**: Third level (`subsubcatid`)

### Cart System
- Add products to cart
- Update quantities
- Remove items
- Calculate totals with discounts
- Persist cart in localStorage

## Adding New Categories

### Method 1: Through API (Recommended)
1. Add category to your backend database
2. Ensure it's returned by `GetCategory.ashx`
3. Website updates automatically ✅

### Method 2: Create Category Page
```bash
cp category-template.html your-category.html
```

## Customization

### Change Category Icons
Edit `assets/js/categories.js`:
```javascript
function getCategoryIcon(categoryName) {
    const iconMap = {
        'home-and-kitchen': 'fa-home',
        'your-category': 'fa-your-icon',
    };
    return iconMap[slug] || 'fa-tag';
}
```

### Modify Number of Categories Displayed
In `assets/js/categories.js`:
```javascript
// Show 6 categories
categories.slice(0, 6)

// Change to 8
categories.slice(0, 8)
```

## Testing

### Basic Tests
1. Open `index.html` - verify categories load
2. Click filter buttons - test product filtering
3. Add items to cart - verify cart functionality
4. Check browser console - ensure no errors

### Console Messages
Look for these success messages:
```
✅ Loaded 5 categories from API
✅ Loaded X products from API
✅ Category Map: {1: {...}, 2: {...}}
```

## Troubleshooting

### Categories Not Loading
- Verify API is accessible: `https://emegatask.com/GetCategory.ashx`
- Check browser console for CORS errors
- System uses fallback categories if API fails

### Products Not Filtering
- Ensure products have `catid` field
- Verify `catid` matches category `id` from API
- Check script load order in HTML

### Navigation Not Updating
- Clear browser cache
- Verify `categories.js` is included before other scripts
- Check that DOM elements exist

## Script Load Order

Scripts must load in this order:
```html
<script src="assets/js/categories.js"></script>
<script src="assets/js/products.js"></script>
<script src="assets/js/main.js"></script>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- HTML5
- CSS3 (Tailwind CSS)
- JavaScript (ES6+)
- Font Awesome Icons
- AOS (Animate On Scroll)

## Key Features Explained

### Dynamic Category Loading
Categories are fetched from the API on every page load, ensuring the navigation always reflects the current category structure in your database.

### Multi-Level Filtering
The system supports three levels of product categorization:
- **Level 1**: Main categories (e.g., Electronics, Grocery)
- **Level 2**: Subcategories (e.g., Kitchen Appliances, Home Decor)
- **Level 3**: Grandchildren (e.g., Curtain, Furniture)

### Automatic Navigation
When you add a new category through your API, it automatically appears in:
- Navigation menu
- Category sections on homepage
- Filter buttons
- Category pages

### Cart Persistence
Cart data is stored in localStorage, so items remain in the cart even after closing the browser.

## Future Enhancements

- Category images/logos from API
- Category search functionality
- Category descriptions
- Breadcrumb navigation
- Category-specific banners
- Lazy loading for large product lists
- Product reviews and ratings
- Wishlist functionality

## License

This project is proprietary software.

## Support

For issues or questions:
1. Check browser console for error messages
2. Verify API responses are correct
3. Ensure all JavaScript files load in correct order
4. Check that category IDs in products match category API

---

**Built with ❤️ for modern e-commerce**
