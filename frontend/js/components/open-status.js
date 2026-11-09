// Dòng trạng thái Đang mở / Đã đóng theo giờ mở cửa 8:00–19:00 (giống chân trang), tính theo giờ Việt Nam.
(function () {
  const OPEN_MIN = 8 * 60, CLOSE_MIN = 19 * 60;
  const el = document.getElementById("open-status");
  if (!el) return;

  function update() {
    const now = new Date();
    const vn = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 7 * 3600000);
    const minutes = vn.getHours() * 60 + vn.getMinutes();
    const isOpen = minutes >= OPEN_MIN && minutes < CLOSE_MIN;
    el.textContent = isOpen ? "Đang mở cửa · đóng cửa lúc 19:00" : "Đã đóng cửa · mở cửa lại lúc 8:00";
    el.className = "open-status " + (isOpen ? "is-open" : "is-closed");
  }
  update();
  setInterval(update, 60000);
})();