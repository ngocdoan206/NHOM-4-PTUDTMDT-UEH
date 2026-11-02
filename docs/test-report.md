# Báo Cáo Kiểm Thử - Bước 8: Hiệu Ứng Hover, Focus & UX

**Dự án:** PawCare Website  
**Thực hiện:** Nhóm 4  
**Ngày kiểm thử:** 01/11/2026  

---

## 1. Nội dung cải thiện kỹ thuật
- **Liên kết & Menu (`.nav-list a`, `.logo`):** Tích hợp `:hover` chuyển màu nền/viền mượt mà. Thiết lập `:focus-visible` với viền đậm 3px rõ ràng khi điều hướng bằng bàn phím.
- **Nút bấm (`.btn`, `.cart-box`):** Thêm phản hồi thị giác nổi nhẹ (`translateY(-2px)`), đổ bóng khi rê chuột và chìm lại vị trí chuẩn khi bấm nhấp (`:active`).
- **Thẻ sản phẩm (`.card`):** Đổ bóng mượt và phóng to nhẹ hình ảnh bên trong (`scale(1.04)`) khi hover.
- **Khả năng tiếp cận (Accessibility):** Tích hợp `@media (prefers-reduced-motion: reduce)` để tự động tắt chuyển động cho người dùng bật chế độ giảm hiệu ứng thị giác.

---

## 2. Kết quả kiểm thử thực tế trên 4 trang HTML

| Trang kiểm thử | Thao tác chuột (`:hover`) | Điều hướng bàn phím (Phím `Tab`) | Xê dịch bố cục (Layout Shift) | Trạng thái |
| :--- | :--- | :--- | :--- | :--- |
| **Trang chủ (`index.html`)** | Đạt - Menu, nút bấm, banner & thẻ nổi mượt | Đạt - Vầng sáng focus di chuyển chuẩn từ Logo -> Menu -> Tìm kiếm -> Nút | Đạt - Không tràn/vỡ khung | **ĐẠT** |
| **Danh sách sản phẩm (`products.html`)** | Đạt - Thẻ nổi mượt, ảnh zoom nhẹ | Đạt - Phím Tab ăn đúng từng thẻ sản phẩm và nút "Xem chi tiết" | Đạt - Không che hay đẩy thẻ bên cạnh | **ĐẠT** |
| **Chi tiết sản phẩm (`product-detail.html`)** | Đạt - Ảnh thumbs đổi màu viền mượt | Đạt - Focus nhảy chuẩn qua nút mua hàng, thumbnail và link quay lại | Đạt - Giữ nguyên vị trí | **ĐẠT** |
| **Giới thiệu (`about.html`)** | Đạt - Khối CTA & các nút phản hồi tốt | Đạt - Phím Tab di chuyển chuẩn qua toàn bộ các liên kết | Đạt - Chuẩn bố cục | **ĐẠT** |

---

## 3. Quy trình xử lý lỗi & Giải trình kỹ thuật

* **Xử lý xê dịch bố cục:** Không thay đổi `margin`, `padding` hay `border-width` ở trạng thái `:hover`. Sử dụng thuộc tính `transform: translateY(...)` kết hợp `box-shadow` để hiệu ứng chỉ diễn ra trên lớp thị giác mà không đẩy lệch các thẻ xung quanh.
* **Độ tương phản (Contrast):** Chữ và nền ở trạng thái hover/focus luôn đạt tỷ lệ tương phản ≥ 4.5:1.

---

---

## 4. Kiểm thử trang Giới thiệu và bố cục responsive

**Thực hiện:** Dương Thành Đạt
**Ngày kiểm thử:** 02/11/2026

### 4.1. Trang Giới thiệu (`about.html`) — 1366 / 768 / 390px

| Hạng mục kiểm tra | Kết quả |
| :--- | :--- |
| Khối "Về PawCare" (2 cột chữ – ảnh ở ≥600px, xuống 1 cột ở 390px) | **ĐẠT** |
| Khối "Giá trị của PawCare" (3 ô, giữ 3 cột ở cả 1366/768px, 1 cột ở 390px) | **ĐẠT** |
| Khối "Thông tin liên hệ" | **ĐẠT** |
| Khối kêu gọi đặt lịch (CTA) cuối trang | **ĐẠT** |
| Ảnh minh họa cửa hàng (`gioithieu-cuahang.jpg`) | **ĐẠT** |
| Không có thanh cuộn ngang ở cả 3 kích thước | **ĐẠT** |
| Điều hướng bằng phím Tab, viền focus rõ ràng | **ĐẠT** |

Không phát hiện lỗi trên trang Giới thiệu.

### 4.2. Kiểm tra nhanh 4 trang ở 390px

| Trang | Kết quả |
| :--- | :--- |
| `products.html` | **ĐẠT** — giá hiển thị đầy đủ |
| `product-detail.html` | **ĐẠT** — giá hiển thị đầy đủ |
| `about.html` | **ĐẠT** |
| `index.html` | **KHÔNG ĐẠT** — xem mục 4.3 |

### 4.3. Lỗi phát hiện: giá sản phẩm chưa cập nhật ở trang chủ

- **Vị trí:** `index.html`, mục "Sản phẩm nổi bật" (4 thẻ: Thức ăn hạt cho chó, Thức ăn hạt cho mèo, Pate cho mèo, Snack thưởng cho chó).
- **Hiện trạng:** `<p class="card-price">Giá [giá]</p>` — còn để nguyên placeholder, chưa thay bằng giá thật.
- **Lưu ý:** không phải lỗi responsive — hiển thị y vậy ở mọi kích thước màn hình, không riêng 390px.
- **Đối chiếu:** `products.html` và `product-detail.html` đã có giá thật đầy đủ, chỉ `index.html` còn thiếu.
- **Đề xuất:** cần cập nhật giá thật cho 4 sản phẩm này.

### 4.4. Hạn chế đã biết (ngoài phạm vi kiểm thử trang Giới thiệu)

- File `css/style.css` hiện có 2 khối `@media (max-width: 599px)` tách rời
  nhau thay vì gộp thành 1 khối duy nhất. Một số selector (`.container`,
  `.search`, `.search input`) bị khai báo trùng ở cả 2 khối — khối sau nằm
  sau trong file nên vẫn hiển thị đúng trên thực tế, nhưng cần gộp lại
  trong lần cập nhật sau để tránh khó bảo trì.
- `index.html`, mục "Sản phẩm nổi bật": 4 thẻ sản phẩm còn hiển thị giá
  dạng placeholder (`Giá [giá]`) thay vì giá thật — xem mục 4.3.
