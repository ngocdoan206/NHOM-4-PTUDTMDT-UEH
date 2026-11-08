// Owner: Ngoc Pham
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const query = (urlParams.get('q') || '').trim().toLowerCase();

  const allProducts = window.products || [];

  const filteredList = query
    ? allProducts.filter(item =>
        item.name.toLowerCase().includes(query)
      )
    : allProducts;

  if (typeof window.renderProducts === 'function') {
    window.renderProducts(filteredList);
  } else {
    console.error('Không tìm thấy hàm renderProducts!');
  }
});
