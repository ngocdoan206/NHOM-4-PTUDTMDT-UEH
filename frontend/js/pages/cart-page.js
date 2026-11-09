// Owner: Nghi
document.addEventListener('DOMContentLoaded', () => {
  // Hiển thị danh sách giỏ hàng lần đầu khi tải trang
  renderCartPage();

  // Gắn sự kiện 1 lần duy nhất ở cấp document (Event Delegation)
  // Không sử dụng onclick trong HTML
  document.addEventListener('click', (event) => {
    const actionBtn = event.target.closest('[data-action]');
    if (!actionBtn) return;

    const action = actionBtn.dataset.action;
    const key = actionBtn.dataset.key;
    if (!action || !key) return;

    let cart = getCartData();
    const index = cart.findIndex(item => String(item.id || item.productId) === String(key));

    if (index === -1) return;

    if (action === 'increase') {
      if (cart[index].quantity < 99) {
        cart[index].quantity += 1;
        saveCartData(cart);
      }
    } else if (action === 'decrease') {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        saveCartData(cart);
      }
    } else if (action === 'remove') {
      cart.splice(index, 1);
      saveCartData(cart);
    }

    // Vẽ lại danh sách và cập nhật biểu tượng giỏ hàng trên header
    renderCartPage();
    if (typeof window.updateCartBadge === 'function') {
      window.updateCartBadge();
    }
  });
});

/**
 * Đọc dữ liệu giỏ hàng an toàn từ hàm của cart.js hoặc localStorage
 */
function getCartData() {
  if (typeof window.getCart === 'function') {
    return window.getCart();
  }
  try {
    return JSON.parse(localStorage.getItem('cart')) || [];
  } catch (e) {
    return [];
  }
}

/**
 * Ghi lại dữ liệu giỏ hàng bằng hàm của cart.js hoặc localStorage
 */
function saveCartData(cart) {
  if (typeof window.saveCart === 'function') {
    window.saveCart(cart);
  } else {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

/**
 * Render toàn bộ danh sách giỏ hàng và tổng tiền
 */
function renderCartPage() {
  const cartListEl = document.getElementById('cart-list');
  const cartTotalEl = document.getElementById('cart-total');
  const cartEmptyEl = document.getElementById('cart-empty');
  const cartContentEl = document.getElementById('cart-content');

  if (!cartListEl || !cartTotalEl) return;

  const rawCart = getCartData();
  const allProducts = window.products || [];

  let grandTotal = 0;
  const validRowsHtml = [];

  rawCart.forEach((item) => {
    const itemId = item.id || item.productId;
    // Tra sản phẩm theo id trong window.products
    const product = allProducts.find(p => String(p.id) === String(itemId));

    // Nếu dòng nào không tìm thấy sản phẩm thì bỏ qua, tránh gây lỗi trang
    if (!product) return;

    const unitPrice = typeof product.price === 'number' ? product.price : (item.price || 0);
    const qty = Math.max(1, Math.min(99, Number(item.quantity) || 1));
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
          <button type="button" class="btn-qty" data-action="decrease" data-key="${itemId}" aria-label="Giảm số lượng" ${qty <= 1 ? 'disabled' : ''}>-</button>
          <span class="qty-value">${qty}</span>
          <button type="button" class="btn-qty" data-action="increase" data-key="${itemId}" aria-label="Tăng số lượng" ${qty >= 99 ? 'disabled' : ''}>+</button>
        </div>

        <div class="cart-item-subtotal">
          <span class="subtotal-label">Thành tiền: </span>
          <span class="subtotal-price">${formattedLineTotal}</span>
        </div>

        <div class="cart-item-action">
          <button type="button" class="btn-remove" data-action="remove" data-key="${itemId}" aria-label="Xóa ${product.name}">Xóa</button>
        </div>
      </article>
    `);
  });

  // Ẩn/hiện thông báo giỏ trống hoặc vẽ danh sách
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
