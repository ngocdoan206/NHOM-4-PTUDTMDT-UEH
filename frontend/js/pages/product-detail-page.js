// Owner: Ngoc Doan
// Trang chi tiết: đọc ?id= trên đường dẫn, tìm sản phẩm, vẽ chi tiết.
// Sản phẩm có nút Thêm vào giỏ; dịch vụ có nút Đặt lịch (sang booking.html?service=<id>).
(function () {
  const SPECIES_TEXT = { all: "Chó, mèo", dog: "Chó", cat: "Mèo" };
 
  let current = null;   // sản phẩm đang xem
 
  // Lấy sản phẩm theo ?id=. Id trên đường dẫn là chuỗi nên đổi sang số. Sai hoặc thiếu thì trả null.
  function getProductFromUrl() {
    const raw = new URLSearchParams(window.location.search).get("id");
    if (raw === null || raw.trim() === "") return null;
    const id = Number(raw);
    return products.find(function (p) { return p.id === id; }) || null;
  }
 
  function showError() {
    document.getElementById("detail-error").hidden = false;
    document.getElementById("detail-content").hidden = true;
    document.title = "Không tìm thấy sản phẩm – PawCare";
  }
 
  // Cột ảnh: ảnh chính, và ảnh nhỏ nếu sản phẩm có gallery
  function renderGallery(product) {
    const thumbs = (product.gallery || []).slice(0, 3).map(function (src) {
      return `<img src="${src}" alt="${product.name} – ảnh minh họa" width="200" height="200" loading="lazy">`;
    }).join("");
    return `
      <div class="gallery">
        <figure class="gallery-main">
          <img src="${product.image}" alt="${product.name}" width="600" height="600">
        </figure>
        ${thumbs ? `<div class="thumbs">${thumbs}</div>` : ""}
      </div>`;
  }
 
  // Khung hành động: dịch vụ -> nút Đặt lịch; sản phẩm -> số lượng + nút Thêm vào giỏ
  function renderActions(product) {
    if (product.type === "service") {
      return `
        <div class="option-form">
          <h2>Đặt lịch dịch vụ</h2>
          <p>Chọn thú cưng, groomer và giờ phù hợp ở bước tiếp theo.</p>
          <a class="btn btn-primary btn-large" id="book-link" data-action="book" href="booking.html?service=${product.id}">Đặt lịch</a>
        </div>`;
    }
    return `
      <form class="option-form" id="option-form" novalidate>
        <h2>Đặt mua</h2>
        <div class="option-field">
          <label for="opt-quantity">Số lượng</label>
          <input id="opt-quantity" type="number" min="1" max="99" step="1" value="1" inputmode="numeric">
        </div>
        <p class="option-total">Thành tiền: <strong id="option-total"></strong></p>
        <button class="btn btn-primary btn-large" type="submit" data-action="add-to-cart" data-id="${product.id}">Thêm vào giỏ</button>
        <p class="option-message" id="option-message" role="status" hidden></p>
      </form>`;
  }
 
  function renderInfo(product) {
    const isService = product.type === "service";
    const priceText = (product.priceFrom ? "Từ " : "") + formatPrice(product.price);
    const attrs = isService
      ? `<dt>Áp dụng cho</dt><dd>${SPECIES_TEXT[product.species]}</dd>
         <dt>Thời lượng ước tính</dt><dd>Khoảng ${product.duration} phút</dd>
         <dt>Hình thức</dt><dd>Tại tiệm</dd>`
      : `<dt>Dành cho</dt><dd>${SPECIES_TEXT[product.species]}</dd>
         <dt>Danh mục</dt><dd>${product.category}</dd>
         <dt>Mã sản phẩm</dt><dd>${product.sku}</dd>`;
    const notes = isService ? `
      <section aria-labelledby="note-title">
        <h2 id="note-title">Lưu ý trước khi đặt lịch</h2>
        <ul class="note-list">
          <li>Báo trước nếu thú cưng có bệnh da, vết thương hoặc đang mang thai.</li>
          <li>Thú cưng nên tiêm phòng đầy đủ.</li>
          <li>Lông rối nhiều có thể phát sinh phụ phí gỡ rối.</li>
        </ul>
      </section>` : "";
    return `
      <div class="detail-info">
        <div>
          <h1 id="detail-title">${product.name}</h1>
          <p class="detail-price" id="detail-price">${priceText}</p>
          <p>${product.description}</p>
        </div>
        ${renderActions(product)}
        <section aria-labelledby="attr-title">
          <h2 id="attr-title">${isService ? "Thông tin dịch vụ" : "Thông tin sản phẩm"}</h2>
          <dl class="attr-list">${attrs}</dl>
        </section>
        ${notes}
      </div>`;
  }
 
  function readQuantity() {
    if (!document.getElementById("opt-quantity")) return 1;
    const q = Math.floor(Number(document.getElementById("opt-quantity").value));
    return q >= 1 && q <= 99 ? q : 1;
  }
 
  // Cập nhật thành tiền = đơn giá × số lượng (chỉ sản phẩm có ô số lượng)
  function updateTotal() {
    const total = document.getElementById("option-total");
    if (!total) return;
    total.textContent = formatPrice(current.price * readQuantity());
  }
 
  // Gợi ý tối đa 3 mục: cùng danh mục trước, thiếu thì lấy cùng loại
  function renderRelated(product) {
    const others = products.filter(function (p) { return p.id !== product.id; });
    const same = others.filter(function (p) { return p.category === product.category; });
    const sameType = others.filter(function (p) { return p.type === product.type && same.indexOf(p) === -1; });
    const list = same.concat(sameType).slice(0, 3);
    if (list.length === 0) return;
    document.getElementById("related-list").innerHTML = list.map(function (p) { return createProductCard(p); }).join("");
    document.getElementById("related-section").hidden = false;
  }
 
  document.addEventListener("DOMContentLoaded", function () {
    const content = document.getElementById("detail-content");
    if (!content) return;
    current = getProductFromUrl();
    if (!current) { showError(); return; }
 
    document.title = current.name + " – PawCare";
    content.innerHTML = renderGallery(current) + renderInfo(current);
    updateTotal();
    renderRelated(current);
 
    // Đổi tùy chọn hoặc số lượng thì tính lại tiền
    content.addEventListener("input", updateTotal);
    content.addEventListener("change", updateTotal);
 
    // Thêm vào giỏ (chỉ sản phẩm): đơn giá lấy từ products.js, cart.js chỉ lưu
    const form = document.getElementById("option-form");
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        const message = document.getElementById("option-message");
        if (typeof addToCart !== "function") {
          message.textContent = "Giỏ hàng chưa sẵn sàng, vui lòng thử lại.";
          message.hidden = false;
          return;
        }
        addToCart(current.id, readQuantity(), {}, current.price);
        if (typeof updateCartBadge === "function") updateCartBadge();
        message.textContent = "Đã thêm vào giỏ hàng.";
        message.hidden = false;
      });
    }
  });
})();