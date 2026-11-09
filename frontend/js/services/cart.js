// Owner: Hanh
// Giỏ hàng PawCare – nơi DUY NHẤT được đọc/ghi localStorage của giỏ hàng.
// Mỗi dòng giỏ: { key, id, quantity, options, unitPrice }
(function () {
  const CART_STORAGE_KEY = 'cart';

  // ---------- Hàm nội bộ ----------

  // Tìm sản phẩm trong products.js theo id (chấp nhận id dạng chuỗi từ URL)
  function findProductById(id) {
    if (typeof products === 'undefined' || !Array.isArray(products)) return null;
    const numId = Number(id);
    if (!Number.isFinite(numId)) return null;
    return products.find((p) => p.id === numId) || null;
  }

  // Chuẩn hóa options: chỉ nhận object thường, bỏ giá trị rỗng. Không có -> {}
  function normalizeOptions(options) {
    const result = {};
    if (options && typeof options === 'object' && !Array.isArray(options)) {
      Object.keys(options).forEach((k) => {
        const v = options[k];
        if (v !== undefined && v !== null && v !== '') result[k] = v;
      });
    }
    return result;
  }

  // Key duy nhất = id + options (sắp xếp tên thuộc tính để thứ tự không ảnh hưởng)
  function buildCartKey(id, options) {
    const pairs = Object.keys(options).sort().map((k) => [k, options[k]]);
    return id + '::' + JSON.stringify(pairs);
  }

  function isValidLine(line) {
    return (
      line &&
      typeof line === 'object' &&
      typeof line.key === 'string' &&
      Number.isFinite(line.id) &&
      Number.isFinite(line.quantity) && line.quantity >= 1 &&
      Number.isFinite(line.unitPrice) && line.unitPrice >= 0
    );
  }

  // ---------- Hàm công khai ----------

  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) return [];
      const data = JSON.parse(raw);
      if (!Array.isArray(data)) return [];
      return data.filter(isValidLine).map((line) => ({
        key: line.key,
        id: line.id,
        quantity: Math.floor(line.quantity),
        options: normalizeOptions(line.options),
        unitPrice: line.unitPrice
      }));
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(Array.isArray(cart) ? cart : []));
      return true;
    } catch (e) {
      return false; // đầy bộ nhớ / chế độ riêng tư: không làm crash trang
    }
  }

  function getCartCount() {
    return loadCart().reduce((sum, line) => sum + line.quantity, 0);
  }

  function getCartTotal() {
    return loadCart().reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
  }

  function updateCartBadge() {
    const badge = document.getElementById('cart-count');
    if (!badge) return;
    badge.textContent = String(getCartCount());
  }

  // Trả về true nếu thêm thành công, false nếu id không tồn tại hoặc không lưu được
  function addToCart(id, quantity, options, unitPrice) {
    const product = findProductById(id);
    if (!product || !Number.isFinite(product.price)) return false;

    let qty = Math.floor(Number(quantity));
    if (!Number.isFinite(qty) || qty < 1) qty = 1;

    const opts = normalizeOptions(options);

    // Không truyền (hoặc truyền sai) unitPrice -> lấy giá từ products.js
    let price = Number(unitPrice);
    if (unitPrice === undefined || unitPrice === null || !Number.isFinite(price) || price < 0) {
      price = product.price;
    }

    const key = buildCartKey(product.id, opts);
    const cart = loadCart();
    const existing = cart.find((line) => line.key === key);

    if (existing) {
      existing.quantity += qty; // cùng id + options: tăng số lượng, giữ đơn giá lúc thêm
    } else {
      cart.push({ key: key, id: product.id, quantity: qty, options: opts, unitPrice: price });
    }

    if (!saveCart(cart)) return false;
    updateCartBadge();
    return true;
  }

  function removeFromCart(key) {
    const cart = loadCart().filter((line) => line.key !== key);
    saveCart(cart);
    updateCartBadge();
  }

  function updateQuantity(key, quantity) {
    const qty = Math.floor(Number(quantity));
    if (!Number.isFinite(qty)) return; // giá trị rác: bỏ qua, không đổi giỏ
    if (qty < 1) {
      removeFromCart(key);
      return;
    }
    const cart = loadCart();
    const line = cart.find((l) => l.key === key);
    if (!line) return;
    line.quantity = qty;
    saveCart(cart);
    updateCartBadge();
  }

  function clearCart() {
    saveCart([]);
    updateCartBadge();
  }

  // Gắn ra window để các file khác gọi trực tiếp
  window.loadCart = loadCart;
  window.saveCart = saveCart;
  window.addToCart = addToCart;
  window.updateQuantity = updateQuantity;
  window.removeFromCart = removeFromCart;
  window.clearCart = clearCart;
  window.getCartCount = getCartCount;
  window.getCartTotal = getCartTotal;
  window.updateCartBadge = updateCartBadge;
})();