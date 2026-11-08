// Owner: Ngoc Pham
// Hàm loại bỏ dấu tiếng Việt
function removeAccents(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}
document.addEventListener('DOMContentLoaded', () => {
  // 1. Lấy danh sách sản phẩm gốc (15 sản phẩm)
  const allProducts = window.products || (typeof products !== 'undefined' ? products : []);

  // 2. Kiểm tra xem URL có từ khóa tìm kiếm không (ví dụ: ?q=tắm)
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q')?.trim() || '';

  const searchInput = document.getElementById('search-input');
  if (searchInput && query) {
    searchInput.value = query;
  }

  // 3. Xử lý hiển thị danh sách
  if (query) {
    // Nếu người dùng có tìm kiếm từ khóa
    const cleanQuery = query.toLowerCase();
    const filtered = allProducts.filter(item => 
      item.name && item.name.toLowerCase().includes(cleanQuery)
    );
    renderProducts(filtered);
  } else {
    // Nếu KHÔNG có từ khóa -> Tự động hiển thị toàn bộ 15 sản phẩm
    renderProducts(allProducts);
  }

  // 4. Lắng nghe khi gõ vào ô tìm kiếm trực tiếp trên trang
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const keyword = e.target.value.trim().toLowerCase();
      if (!keyword) {
        renderProducts(allProducts);
      } else {
        const filtered = allProducts.filter(item => 
          item.name && item.name.toLowerCase().includes(keyword)
        );
        renderProducts(filtered);
      }
    });
  }
});
