import { formatPrice } from '../utils/format.js';
function createProductCard(product) {
  const formattedPrice = formatPrice(product.price);
  const priceDisplay = product.priceFrom ? `Từ ${formattedPrice}` : formattedPrice;

  return `
    <article class="card">
      <div class="card-media">
        <img src="${product.image}" alt="${product.name}" width="400" height="300" loading="lazy">
      </div>
      <h3 class="card-title">${product.name}</h3>
      <p class="card-price">${priceDisplay}</p>
      <a class="btn btn-outline card-action" href="product-detail.html?id=${product.id}" aria-label="Xem chi tiết ${product.name}">Xem chi tiết</a>
    </article>
  `;
}

function renderProducts(list) {
  const productListEl = document.getElementById('product-list');
  const resultCountEl = document.getElementById('result-count');
  const emptyMessageEl = document.getElementById('empty-message');

  if (!productListEl) return;

  const count = list ? list.length : 0;

  if (resultCountEl) {
    resultCountEl.textContent = `Tìm thấy ${count} sản phẩm`;
  }

  if (count === 0) {
    productListEl.innerHTML = '';
    if (emptyMessageEl) emptyMessageEl.hidden = false;
  } else {
    if (emptyMessageEl) emptyMessageEl.hidden = true;
    productListEl.innerHTML = list.map(item => createProductCard(item)).join('');
  }
}
