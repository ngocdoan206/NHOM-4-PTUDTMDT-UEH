import { renderProducts } from '../components/render-products.js';
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const query = (urlParams.get('q') || '').trim().toLowerCase();

  const allProducts = typeof products !== 'undefined' ? products : [];

  let filteredList = allProducts;
  if (query) {
    filteredList = allProducts.filter(item =>
      item.name.toLowerCase().includes(query)
    );
  }

  renderProducts(filteredList);
});
