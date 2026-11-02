# Báo Cáo Kiểm Thử - Bước 8: Hiệu Ứng Hover, Focus & UX

**Dự án:** PawCare Website  
**Thực hiện:** [Điền tên nhóm/thành viên]  
**Ngày kiểm thử:** [Điền ngày thực hiện]  

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
