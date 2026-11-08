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
  const urlParams = new URLSearchParams(window.location.search);
  const rawQuery = (urlParams.get('q') || '').trim().toLowerCase();
  const normalizedQuery = removeAccents(rawQuery);

  const allProducts = window.products || [];

  const filteredList = normalizedQuery
    ? allProducts.filter(item => {
        const itemName = item.name.toLowerCase();
        // So sánh cả chuỗi gốc lẫn chuỗi đã bỏ dấu
        return itemName.includes(rawQuery) || removeAccents(itemName).includes(normalizedQuery);
      })
    : allProducts;

  if (typeof window.renderProducts === 'function') {
    window.renderProducts(filteredList);
  } else {
    console.error('Không tìm thấy hàm renderProducts!');
  }
});
