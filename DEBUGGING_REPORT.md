# CampusCafe Debugging Report

## Project Overview

CampusCafe is a two-page student cafeteria ordering application built with HTML, CSS, and JavaScript. The debugging task addressed broken resource paths, menu and cart functionality, filtering, checkout calculations, promo codes, and order validation.

## Changes and Modifications

### 1. Resource and Folder Structure Fixes

- Corrected the stylesheet paths in `index.html`.
- Corrected the stylesheet and script paths in `pages/checkout.html`.
- Corrected the menu script loading order so `menuData.js` loads before `app.js`.
- Fixed checkout navigation back to the menu.
- Corrected the background pattern path in `styles/theme.css`.

### 2. Image and Icon Fixes

- Updated every menu item to use the correct SVG icon:
  - Coffee: `assets/icons/coffee.svg`
  - Sandwich: `assets/icons/sandwich.svg`
  - Muffin: `assets/icons/muffin.svg`
  - Juice: `assets/icons/juice.svg`

### 3. Menu Filtering and Search

- Added category filtering for All, Drinks, and Snacks.
- Highlighted the currently selected category button.
- Added real-time search by menu item name.
- Combined category and search filters so both work together.

### 4. Cart Functionality

- Fixed all Add to Cart buttons by using event delegation.
- Increasing an existing item's quantity no longer creates duplicate cart entries.
- Added working `+` and `-` quantity controls.
- Removed an item automatically when its quantity reaches zero.
- Calculated the subtotal using numeric prices and item quantities.
- Updated the cart badge to show the total quantity of items.
- Added a cart-empty message that prevents checkout navigation.

### 5. Checkout and Storage Fixes

- Changed the checkout page to read cart data from the `campus_cart` local-storage key.
- Fixed the grand-total element reference.
- Added numeric subtotal, GST, discount, and grand-total calculations.

### 6. Promo Code Logic

- Implemented the `STUDENT15` promo code.
- Applied a 15% discount only when the subtotal is at least ₹150.
- Displayed an error for invalid promo codes.
- Displayed an error when the subtotal is below ₹150.
- Reset the discount to zero when a promo code is invalid or ineligible.

### 7. Order Confirmation Logic

- Required both the student's full name and roll number.
- Prevented checkout confirmation when the cart is empty.
- Generated an order ID in the format `CC-XXXXXXXX`.
- Displayed a successful order confirmation message.
- Cleared the saved cart after successful confirmation.

## Steps to Perform the Debugging

1. Inspected the project folder structure and located HTML, CSS, JavaScript, image, and page files.
2. Identified incorrect or missing resource paths.
3. Updated the HTML and CSS links to match the actual folder structure.
4. Updated the menu item image paths to valid SVG files.
5. Fixed JavaScript loading order and connected menu data before application logic.
6. Replaced duplicate cart entries with quantity increments.
7. Added cart quantity controls and numeric subtotal calculations.
8. Implemented menu category filtering and real-time search.
9. Corrected local-storage usage between the menu and checkout pages.
10. Implemented GST, promo discount, and grand-total calculations.
11. Added student detail and empty-cart validation.
12. Implemented order ID generation and cart clearing.
13. Checked JavaScript syntax and verified that all project resources return HTTP 200.

## Validation

- JavaScript syntax was checked for:
  - `scripts/app.js`
  - `scripts/menuData.js`
  - `scripts/checkout.js`
- The index page, checkout page, stylesheets, scripts, background pattern, and all menu icons were verified through a local HTTP server.
- All tested resources returned HTTP status 200.

## Reflection

A single file pasted into a standard online chat window does not provide the AI with the complete project context. Workspace-aware tools can inspect the entire folder, find broken cross-file links, verify resource names, and update dependent files consistently. This allows them to fix issues accurately across HTML, CSS, JavaScript, and navigation rather than addressing only isolated code snippets.
