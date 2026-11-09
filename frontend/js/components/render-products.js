// Owner: Nghi
function createProductCard(product) {
  const formattedPrice = window.formatPrice(product.price);
  const priceDisplay = product.priceFrom ? `Từ ${formattedPrice}` : formattedPrice;

  return `
    <article class="card">
      <div class="card-media">
        <img src="${product.image}" alt="${product.name}" width="400" height="300" loading="lazy">
      </div>
      <h3 class="card-title">${product.name}</h3>
      <p class="card-price">${priceDisplay}</p>
      <div class="card-actions">
        <a class="btn btn-outline card-action" href="product-detail.html?id=${product.id}" aria-label="Xem chi tiết ${product.name}">Xem chi tiết</a>
        ${product.type === 'product'
          ? `<button class="btn btn-primary btn-add-cart" type="button" data-product-id="${product.id}" aria-label="Thêm ${product.name} vào giỏ hàng">Thêm vào giỏ</button>`
          : ''}
      </div>
    </article>
  `;
}

// Vẽ danh sách thẻ vào #product-list, cập nhật dòng "Tìm thấy X sản phẩm" và thông báo rỗng
function renderProducts(list) {
  const listEl = document.getElementById('product-list');
  const countEl = document.getElementById('result-count');
  const emptyEl = document.getElementById('empty-message');
  if (!listEl) return;

  listEl.innerHTML = list.map(product => createProductCard(product)).join('');
  if (countEl) countEl.textContent = list.length ? `Tìm thấy ${list.length} sản phẩm` : '';
  if (emptyEl) emptyEl.hidden = list.length > 0;
}