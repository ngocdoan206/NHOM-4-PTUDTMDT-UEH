document.addEventListener('DOMContentLoaded', () => {
  renderCartPage();

  document.addEventListener('click', (event) => {
    const actionBtn = event.target.closest('[data-action]');
    if (!actionBtn) return;

    const action = actionBtn.dataset.action;
    const key = actionBtn.dataset.key;
    if (!action || !key) return;

    let cart = getRawCart();
    let normalized = normalizeCart(cart);
    const targetItem = normalized.find(item => String(item.id) === String(key));

    if (!targetItem) return;

    if (action === 'increase') {
      if (targetItem.quantity < 99) {
        updateCartItemQuantity(key, targetItem.quantity + 1);
      }
    } else if (action === 'decrease') {
      if (targetItem.quantity > 1) {
        updateCartItemQuantity(key, targetItem.quantity - 1);
      }
    } else if (action === 'remove') {
      removeCartItem(key);
    }

    renderCartPage();
    if (typeof window.updateCartBadge === 'function') {
      window.updateCartBadge();
    }
  });
});

function getRawCart() {
  if (typeof window.getCart === 'function') {
    return window.getCart();
  }
  try {
    return JSON.parse(localStorage.getItem('cart')) || [];
  } catch (e) {
    return [];
  }
}

function normalizeCart(rawCart) {
  if (!rawCart) return [];

  if (!Array.isArray(rawCart) && typeof rawCart === 'object') {
    return Object.keys(rawCart).map(key => ({
      id: String(key),
      quantity: Number(rawCart[key]) || 1
    }));
  }

  if (!Array.isArray(rawCart)) return [];

  const isPrimitiveArray = rawCart.every(item => typeof item === 'number' || typeof item === 'string');
  if (isPrimitiveArray) {
    const map = {};
    rawCart.forEach(id => {
      const sId = String(id);
      map[sId] = (map[sId] || 0) + 1;
    });
    return Object.keys(map).map(id => ({
      id: id,
      quantity: map[id]
    }));
  }

  const map = {};
  rawCart.forEach(item => {
    if (!item) return;
    const id = item.id ?? item.productId ?? item.product_id ?? (item.product && item.product.id);
    if (id === undefined || id === null) return;

    const sId = String(id);
    const qty = Number(item.quantity ?? item.qty ?? item.count ?? 1) || 1;

    if (!map[sId]) {
      map[sId] = { id: sId, quantity: 0 };
    }
    map[sId].quantity += qty;
  });

  return Object.values(map);
}

function updateCartItemQuantity(id, newQty) {
  let raw = getRawCart();

  if (Array.isArray(raw)) {
    if (raw.length > 0 && (typeof raw[0] === 'number' || typeof raw[0] === 'string')) {
      raw = raw.filter(item => String(item) !== String(id));
      for (let i = 0; i < newQty; i++) raw.push(isNaN(id) ? id : Number(id));
    } else {
      const item = raw.find(i => String(i.id ?? i.productId ?? i.product_id) === String(id));
      if (item) {
        if ('quantity' in item) item.quantity = newQty;
        else if ('qty' in item) item.qty = newQty;
        else item.quantity = newQty;
      }
    }
  }

  saveCartData(raw);
}

function removeCartItem(id) {
  let raw = getRawCart();

  if (Array.isArray(raw)) {
    if (raw.length > 0 && (typeof raw[0] === 'number' || typeof raw[0] === 'string')) {
      raw = raw.filter(item => String(item) !== String(id));
    } else {
      raw = raw.filter(i => String(i.id ?? i.productId ?? i.product_id) !== String(id));
    }
  } else if (raw && typeof raw === 'object') {
    delete raw[String(id)];
  }

  saveCartData(raw);
}

function saveCartData(cart) {
  if (typeof window.saveCart === 'function') {
    window.saveCart(cart);
  } else {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

function renderCartPage() {
  const cartListEl = document.getElementById('cart-list');
  const cartTotalEl = document.getElementById('cart-total');
  const cartEmptyEl = document.getElementById('cart-empty');
  const cartContentEl = document.getElementById('cart-content');

  if (!cartListEl || !cartTotalEl) return;

  const rawCart = getRawCart();
  const normalizedCart = normalizeCart(rawCart);
  const allProducts = window.products || [];

  let grandTotal = 0;
  const validRowsHtml = [];

  normalizedCart.forEach((item) => {
    const product = allProducts.find(p => String(p.id) === String(item.id));
    if (!product) return;

    const unitPrice = typeof product.price === 'number' ? product.price : 0;
    const qty = Math.max(1, Math.min(99, item.quantity));
    const lineTotal = unitPrice * qty;

    grandTotal += lineTotal;

    const formattedUnitPrice = typeof window.formatPrice === 'function' ? window.formatPrice(unitPrice) : `${unitPrice} ₫`;
    const formattedLineTotal = typeof window.formatPrice === 'function' ? window.formatPrice(lineTotal) : `${lineTotal} ₫`;

    validRowsHtml.push(`
      <article class="cart-item-row">
        <div class="cart-item-media">
          <img src="${product.image}" alt="${product.name}" width="80" height="80" loading="lazy">
        </div>

        <div class="cart-item-info">
          <h3 class="cart-item-title">${product.name}</h3>
          <p class="cart-item-unit-price">Đơn giá: ${formattedUnitPrice}</p>
        </div>

        <div class="cart-item-qty">
          <button type="button" class="btn-qty" data-action="decrease" data-key="${item.id}" aria-label="Giảm số lượng" ${qty <= 1 ? 'disabled' : ''}>-</button>
          <span class="qty-value">${qty}</span>
          <button type="button" class="btn-qty" data-action="increase" data-key="${item.id}" aria-label="Tăng số lượng" ${qty >= 99 ? 'disabled' : ''}>+</button>
        </div>

        <div class="cart-item-subtotal">
          <span class="subtotal-label">Thành tiền: </span>
          <span class="subtotal-price">${formattedLineTotal}</span>
        </div>

        <div class="cart-item-action">
          <button type="button" class="btn-remove" data-action="remove" data-key="${item.id}" aria-label="Xóa ${product.name}">Xóa</button>
        </div>
      </article>
    `);
  });

  if (validRowsHtml.length === 0) {
    if (cartEmptyEl) cartEmptyEl.hidden = false;
    if (cartContentEl) cartContentEl.hidden = true;
    cartListEl.innerHTML = '';
    cartTotalEl.textContent = typeof window.formatPrice === 'function' ? window.formatPrice(0) : '0 ₫';
  } else {
    if (cartEmptyEl) cartEmptyEl.hidden = true;
    if (cartContentEl) cartContentEl.hidden = false;
    cartListEl.innerHTML = validRowsHtml.join('');
    cartTotalEl.textContent = typeof window.formatPrice === 'function' ? window.formatPrice(grandTotal) : `${grandTotal} ₫`;
  }
}
