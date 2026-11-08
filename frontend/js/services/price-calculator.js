// Owner: Ha
/**
 * Bảng phụ thu theo cân nặng và độ dài lông (so với giá từ)
 */
const SURCHARGE_TABLE = {
  "<5kg": { short: 0, long: 60000 },
  "5-10kg": { short: 60000, long: 140000 },
  "10-20kg": { short: 140000, long: 240000 },
  ">20kg": { short: 240000, long: 380000 }
};

/**
 * Danh sách ID các dịch vụ có tính giá biến đổi theo cân nặng / lông ("Giá từ")
 */
const PRICED_SERVICE_IDS = [1, 2, 5, 6, 7];

/**
 * Kiểm tra sản phẩm/dịch vụ có phải là dịch vụ "Giá từ" hay không
 * @param {Object} product 
 * @returns {boolean}
 */
function isPricedService(product) {
  if (!product || product.id === undefined) return false;
  return PRICED_SERVICE_IDS.includes(Number(product.id));
}

/**
 * Lấy giá gốc (giá "từ") của sản phẩm hoặc dịch vụ
 * @param {Object} product 
 * @returns {number}
 */
function getBasePrice(product) {
  if (!product || typeof product.price !== "number") return 0;
  return Number(product.price);
}

/**
 * Tính giá tạm tính cho dịch vụ dựa trên tùy chọn (cân nặng, độ dài lông, loại thú cưng)
 * @param {Object} product 
 * @param {Object} [options] { species: 'dog'|'cat', weightRange: '...', coat: 'short'|'long' }
 * @returns {number}
 */
function calculatePrice(product, options) {
  const basePrice = getBasePrice(product);

  // Nếu không phải dịch vụ có phụ thu hoặc thiếu thông tin sản phẩm, trả về giá gốc
  if (!isPricedService(product)) {
    return basePrice;
  }

  // Nếu không có tùy chọn truyền vào, trả về giá gốc (giá từ)
  if (!options || typeof options !== "object") {
    return basePrice;
  }

  const { species, weightRange, coat } = options;
  let totalPrice = basePrice;

  // 1. Tính phụ thu cân nặng và độ dài lông
  if (weightRange && coat && SURCHARGE_TABLE[weightRange] && SURCHARGE_TABLE[weightRange][coat] !== undefined) {
    const singleSurcharge = SURCHARGE_TABLE[weightRange][coat];
    const productId = Number(product.id);

    // Dịch vụ chứa 2 gói có phụ thu (id 6: Tắm + Cắt tỉa, id 7: Trọn gói) nhân đôi phụ thu
    if (productId === 6 || productId === 7) {
      totalPrice += singleSurcharge * 2;
    } else {
      totalPrice += singleSurcharge;
    }
  }

  // 2. Phụ thu Mèo: Cộng thêm 50.000 đ cho dịch vụ phụ thu
  if (species === "cat") {
    totalPrice += 50000;
  }

  return totalPrice;
}

// Gán hàm vào window để booking.js và các file khác gọi được
window.isPricedService = isPricedService;
window.getBasePrice = getBasePrice;
window.calculatePrice = calculatePrice;