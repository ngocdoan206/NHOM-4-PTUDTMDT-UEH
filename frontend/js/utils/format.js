window.formatPrice = function(number) {
  if (typeof number !== 'number' || isNaN(number)) {
    return '0 ₫';
  }
  return number.toLocaleString('vi-VN') + ' ₫';
};
