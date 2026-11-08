window.formatPrice = function(number) {
  if (!Number.isFinite(number)) {
    return '0 ₫';
  }
  return number.toLocaleString('vi-VN') + ' ₫';
};
