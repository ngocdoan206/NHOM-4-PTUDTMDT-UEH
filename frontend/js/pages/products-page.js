
import { renderProducts } from '../components/render-products.js';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const query = normalizeText(urlParams.get('q') || '');

  const allProducts = typeof products !== 'undefined' ? products : [];

  let filteredList = allProducts;

  if (query) {
    filteredList = allProducts.filter(item =>
      normalizeText(item.name).includes(query)
    );
  }

  renderProducts(filteredList);
});

// Chuẩn hóa tiếng Việt, bỏ dấu và chuyển thành chữ thường
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd');
}
