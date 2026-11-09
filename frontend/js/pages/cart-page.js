
document.addEventListener('DOMContentLoaded', () => {
  renderCartPage();

  document.addEventListener('click', (event) => {
    const actionBtn = event.target.closest('[data-action]');
    if (!actionBtn) return;

    const action = actionBtn.dataset.action;
    let key;

    try {
      key = decodeURIComponent(actionBtn.dataset.key);
    } catch (e) {
      return;
    }

    if (!action || !key) return;

    
    const cart = window.loadCart();
    const targetItem = cart.find(
      item => String(item.key) === String(key)
    );

    if (!targetItem) return;

    if (action === 'increase') {
      if (targetItem.quantity < 99) {
        window.updateQuantity(key, targetItem.quantity + 1);
      }
    } else if (action === 'decrease') {
      if (targetItem.quantity > 1) {
        window.updateQuantity(key, targetItem.quantity - 1);
      }
    } else if (action === 'remove') {
      window.removeFromCart(key);
    }

    renderCartPage();
    window.updateCartBadge();
  });
});

function renderCartPage() {
  const cartListEl = document.getElementById('cart-list');
  const cartTotalEl = document.getElementById('cart-total');
  const cartEmptyEl = document.getElementById('cart-empty');
  const cartContentEl = document.getElementById('cart-content');

  if (!cartListEl || !cartTotalEl) return;

  const cart = window.loadCart();
  const allProducts = typeof products !== 'undefined'
  ? products
  : (window.products || []);

  let grandTotal = 0;
  const validRowsHtml = [];

  cart.forEach((item) => {
    const product = allProducts.find(
      p => String(p.id) === String(item.id)
    );

    if (!product) return;

    const unitPrice = Number(item.unitPrice);
    const qty = Number(item.quantity);

    if (!Number.isFinite(unitPrice) || !Number.isFinite(qty)) return;

    const lineTotal = unitPrice * qty;
    grandTotal += lineTotal;

    const formattedUnitPrice =
      typeof window.formatPrice === 'function'
        ? window.formatPrice(unitPrice)
        : `${unitPrice} ₫`;

    const formattedLineTotal =
      typeof window.formatPrice === 'function'
        ? window.formatPrice(lineTotal)
        : `${lineTotal} ₫`;


    const encodedKey = encodeURIComponent(item.key);

    validRowsHtml.push(`
      <article class="cart-item-row">

        <div class="cart-item-media">
          <img
            src="${product.image}"
            alt="${product.name}"
            width="80"
            height="80"
            loading="lazy"
          >
        </div>

        <div class="cart-item-info">
          <h3 class="cart-item-title">${product.name}</h3>
          <p class="cart-item-unit-price">
            Đơn giá: ${formattedUnitPrice}
          </p>
        </div>

        <div class="cart-item-qty">
          <button
            type="button"
            class="btn-qty"
            data-action="decrease"
            data-key="${encodedKey}"
            aria-label="Giảm số lượng"
            ${qty <= 1 ? 'disabled' : ''}
          >-</button>

          <span class="qty-value">${qty}</span>

          <button
            type="button"
            class="btn-qty"
            data-action="increase"
            data-key="${encodedKey}"
            aria-label="Tăng số lượng"
            ${qty >= 99 ? 'disabled' : ''}
          >+</button>
        </div>

        <div class="cart-item-subtotal">
          <span class="subtotal-label">Thành tiền: </span>
          <span class="subtotal-price">
            ${formattedLineTotal}
          </span>
        </div>

        <div class="cart-item-action">
          <button
            type="button"
            class="btn-remove"
            data-action="remove"
            data-key="${encodedKey}"
            aria-label="Xóa ${product.name}"
          >Xóa</button>
        </div>

      </article>
    `);
  });

  if (validRowsHtml.length === 0) {
    if (cartEmptyEl) cartEmptyEl.hidden = false;
    if (cartContentEl) cartContentEl.hidden = true;

    cartListEl.innerHTML = '';

    cartTotalEl.textContent =
      typeof window.formatPrice === 'function'
        ? window.formatPrice(0)
        : '0 ₫';

  } else {
    if (cartEmptyEl) cartEmptyEl.hidden = true;
    if (cartContentEl) cartContentEl.hidden = false;

    cartListEl.innerHTML = validRowsHtml.join('');

    cartTotalEl.textContent =
      typeof window.formatPrice === 'function'
        ? window.formatPrice(grandTotal)
        : `${grandTotal} ₫`;
  }
}
