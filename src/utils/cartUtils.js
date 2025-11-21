// Simple cart utilities using localStorage
const CART_KEY = "MASMAP_cart";

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read cart from localStorage", e);
    return [];
  }
}

function writeCart(items) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    // notify other parts of the app in this tab that cart changed
    try {
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("cartUpdated", { detail: { items } })
        );
      }
    } catch (e) {
      // ignore in non-browser envs
    }
  } catch (e) {
    console.error("Failed to write cart to localStorage", e);
  }
}

export function getCartItems() {
  return readCart();
}

export function addToCart(product, quantity = 1) {
  const items = readCart();
  const id = product._id || product.id;
  const existing = items.find((it) => (it._id || it.id) === id);
  if (existing) {
    existing.quantity = (existing.quantity || 0) + quantity;
  } else {
    items.push({ ...product, quantity });
  }
  writeCart(items);
  return items;
}

export function removeFromCart(id) {
  const items = readCart();
  const updated = items.filter((it) => (it._id || it.id) !== id);
  writeCart(updated);
  return updated;
}

export function updateQuantity(id, newQuantity) {
  const items = readCart();
  const item = items.find((it) => (it._id || it.id) === id);
  if (item) {
    item.quantity = Math.max(1, newQuantity); // ensure at least 1
  }
  writeCart(items);
  return items;
}

export function clearCart() {
  try {
    localStorage.removeItem(CART_KEY);
  } catch (e) {
    console.error("Failed to clear cart", e);
  }
}

export const cartUtils = {
  getCartItems,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
};
