const menuGrid = document.getElementById("menu-grid");
const cartList = document.getElementById("cart-list");
const cartSubtotalEl = document.getElementById("cart-subtotal");
const cartCountEl = document.getElementById("cart-count");
const cartMsgEl = document.getElementById("cart-msg");
const checkoutBtn = document.getElementById("checkout-btn");

let cart;
try {
  cart = JSON.parse(localStorage.getItem("campus_cart")) || [];
  if (!Array.isArray(cart)) cart = [];
} catch {
  cart = [];
}

let activeCategory = "all";

function renderMenu(items) {
  menuGrid.innerHTML = "";

  if (items.length === 0) {
    menuGrid.innerHTML = '<p class="empty-state">No menu items found.</p>';
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="card-header">
        <span class="category-tag">${item.category}</span>
        <span class="price">₹${item.price}</span>
      </div>
      <h3>${item.name}</h3>
      <p style="font-size: 0.85rem; color: #6b7280;">${item.description}</p>
      <button class="btn btn-primary add-btn" data-id="${item.id}">Add to Cart</button>
    `;
    menuGrid.appendChild(card);
  });
}

function addToCart(itemId) {
  const found = MENU_ITEMS.find((item) => item.id === itemId);
  if (!found) return;

  const existing = cart.find((item) => item.id === itemId);
  if (existing) {
    existing.qty = Number(existing.qty || 1) + 1;
  } else {
    cart.push({
      id: found.id,
      name: found.name,
      price: Number(found.price),
      qty: 1
    });
  }

  if (cartMsgEl) cartMsgEl.textContent = "";
  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem("campus_cart", JSON.stringify(cart));
}

function renderCart() {
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = '<li class="empty-state">Your cart is empty.</li>';
  } else {
    cart.forEach((item) => {
      const li = document.createElement("li");
      li.className = "cart-row";
      li.innerHTML = `
        <span>${item.name}</span>
        <div class="qty-controls">
          <button class="qty-btn" data-action="decrease" data-id="${item.id}" aria-label="Decrease ${item.name} quantity">-</button>
          <span>x${item.qty}</span>
          <button class="qty-btn" data-action="increase" data-id="${item.id}" aria-label="Increase ${item.name} quantity">+</button>
        </div>
        <span>₹${(Number(item.price) * item.qty).toFixed(2)}</span>
      `;
      cartList.appendChild(li);
    });
  }

  let subtotal = 0;
  let itemCount = 0;
  cart.forEach((item) => {
    const quantity = Number(item.qty || 1);
    subtotal += Number(item.price) * quantity;
    itemCount += quantity;
  });

  cartSubtotalEl.textContent = subtotal.toFixed(2);
  cartCountEl.textContent = itemCount;
}

function applyMenuFilters() {
  const searchText = document.getElementById("search-input").value.trim().toLowerCase();
  const filtered = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchText);
    return matchesCategory && matchesSearch;
  });
  renderMenu(filtered);
}

document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    document.querySelectorAll(".filter-btn").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    applyMenuFilters();
  });
});

document.getElementById("search-input").addEventListener("input", applyMenuFilters);

menuGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".add-btn");
  if (!button) return;
  addToCart(Number(button.dataset.id));
});

cartList.addEventListener("click", (event) => {
  const button = event.target.closest(".qty-btn");
  if (!button) return;

  const itemId = Number(button.dataset.id);
  const item = cart.find((cartItem) => cartItem.id === itemId);
  if (!item) return;

  if (button.dataset.action === "increase") {
    item.qty = Number(item.qty || 1) + 1;
  } else {
    item.qty = Number(item.qty || 1) - 1;
    if (item.qty <= 0) cart = cart.filter((cartItem) => cartItem.id !== itemId);
  }

  saveCart();
  renderCart();
});

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    cartMsgEl.textContent = "Your cart is empty. Add an item before checkout.";
    cartMsgEl.className = "msg-error";
    return;
  }
  cartMsgEl.textContent = "";
  window.location.href = "pages/checkout.html";
});

// Initialize page
renderMenu(MENU_ITEMS);
renderCart();
