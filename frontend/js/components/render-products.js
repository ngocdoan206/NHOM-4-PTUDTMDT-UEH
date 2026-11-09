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