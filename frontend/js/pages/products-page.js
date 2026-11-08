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

function filterProducts(allProducts, keyword) {
  const cleanKeyword = removeAccents(keyword);
  return allProducts.filter(item => {
    if (!item.name) return false;
    return removeAccents(item.name).includes(cleanKeyword);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Lấy danh sách sản phẩm gốc
  const allProducts = window.products || (typeof products !== 'undefined' ? products : []);

  // 2. Lấy từ khóa trên URL (nếu có)
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q')?.trim() || '';

  const searchInput = document.getElementById('search-input');
  if (searchInput && query) {
    searchInput.value = query;
  }

  // 3. Hiển thị ban đầu
  const initialFiltered = filterProducts(allProducts, query);
  renderProducts(initialFiltered);

  // 4. Lắng nghe khi gõ ô tìm kiếm
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const keyword = e.target.value.trim();
      const filtered = filterProducts(allProducts, keyword);
      renderProducts(filtered);
    });
  }
});
