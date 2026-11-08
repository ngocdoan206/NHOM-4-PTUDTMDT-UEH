document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');

  if (searchInput) {
    const urlParams = new URLSearchParams(window.location.search);
    const qParam = urlParams.get('q');
    if (qParam) {
      searchInput.value = qParam;
    }

    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !event.isComposing) {
        event.preventDefault();
        const keyword = searchInput.value.trim();
        if (keyword) {
          window.location.href = `products.html?q=${encodeURIComponent(keyword)}`;
        } else {
          window.location.href = 'products.html';
        }
      }
    });
  }
});
// ----- Giỏ hàng: cập nhật badge -----
// Script có defer nên khi chạy tới đây DOM đã sẵn sàng, không cần thêm DOMContentLoaded mới.
if (typeof window.updateCartBadge === 'function') {
  window.updateCartBadge();
}

// Quay lại bằng nút Back (bfcache) có thể hiện badge cũ -> cập nhật lại
window.addEventListener('pageshow', (event) => {
  if (event.persisted && typeof window.updateCartBadge === 'function') {
    window.updateCartBadge();
  }
});