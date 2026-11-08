// Owner: Ngoc Pham
function removeAccents(str) {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

// Chuẩn hóa chuỗi để tìm không dấu, không phân biệt hoa thường
function normalize(text) {
  return removeAccents(String(text || '')).toLowerCase().trim();
}

// Lọc danh sách theo từ khóa (so khớp theo tên)
function filterProducts(list, keyword) {
  const key = normalize(keyword);
  if (!key) return list;
  return list.filter(item => normalize(item.name).includes(key));
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Lấy danh sách sản phẩm gốc
  const allProducts = typeof products !== 'undefined' ? products : [];

  // 2. Lấy từ khóa trên URL (nếu có)
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q')?.trim() || '';

  const searchInput = document.getElementById('search-input');
 
  // 3. Hiển thị ban đầu
  const initialFiltered = filterProducts(allProducts, query);
  renderProducts(initialFiltered);
    // 3b. Nút "Thêm vào giỏ": dùng event delegation vì danh sách được render lại khi tìm kiếm
  const productListEl = document.getElementById('product-list');
  if (productListEl) {
    productListEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-add-cart');
      if (!btn) return;

      const ok = typeof addToCart === 'function' && addToCart(Number(btn.dataset.productId), 1);

      if (!btn.dataset.label) btn.dataset.label = btn.textContent;
      btn.textContent = ok ? 'Đã thêm ✓' : 'Không thêm được';
      clearTimeout(btn._resetTimer);
      btn._resetTimer = setTimeout(() => {
        btn.textContent = btn.dataset.label;
      }, 1200);
    });
  }

  // 4. Lắng nghe khi gõ ô tìm kiếm
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const keyword = e.target.value.trim();
      const filtered = filterProducts(allProducts, keyword);
      renderProducts(filtered);
    });
  }
});
