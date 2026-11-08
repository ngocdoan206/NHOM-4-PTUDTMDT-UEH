// Owner: Ngoc Doan
// ----- Thêm vào giỏ ở trang chi tiết -----
document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('add-to-cart-btn');
  if (!addBtn) return;

  // Ưu tiên id trên URL (?id=), nếu không có thì dùng data-product-id
  const urlId = new URLSearchParams(window.location.search).get('id');
  const productId = Number(urlId || addBtn.dataset.productId);

  addBtn.addEventListener('click', () => {
    // Hiện chưa có ô chọn cân nặng/độ dài lông -> options = {}, giá lấy từ products.js.
    // Khi bộ tính giá hoàn thành, gọi: addToCart(productId, 1, { species, weight, coat }, giáĐãTính)
    const ok = typeof addToCart === 'function' && addToCart(productId, 1, {});

    if (!addBtn.dataset.label) addBtn.dataset.label = addBtn.textContent;
    addBtn.textContent = ok ? 'Đã thêm ✓' : 'Không thêm được';
    clearTimeout(addBtn._resetTimer);
    addBtn._resetTimer = setTimeout(() => {
      addBtn.textContent = addBtn.dataset.label;
    }, 1200);
  });
});