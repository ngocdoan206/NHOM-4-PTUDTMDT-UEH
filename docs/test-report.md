# Báo Cáo Kiểm Thử - Bước 8: Hiệu Ứng Hover, Focus & UX

**Dự án:** PawCare Website  
**Thực hiện:** Nguyễn Hoàng Bảo Nghi  
**Ngày kiểm thử:** 01/11/2026  
**Môi trường:** Chrome (phiên bản mới nhất), DevTools chế độ responsive, độ rộng 1366/768/390 px  
**Bằng chứng:** docs/screenshots/ (ảnh hover và focus)
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
| **Trang chủ (`index.html`)** | Đạt - Menu, nút bấm trong banner và thẻ dịch vụ/sản phẩm đổi trạng thái mượt | Đạt - Vầng sáng focus di chuyển chuẩn từ Logo -> Menu -> Tìm kiếm -> Nút | Đạt - Không tràn/vỡ khung | **ĐẠT** |
| **Danh sách sản phẩm (`products.html`)** | Đạt - Thẻ nổi mượt, ảnh zoom nhẹ | Đạt - Phím Tab ăn đúng từng thẻ sản phẩm và nút "Xem chi tiết" | Đạt - Không che hay đẩy thẻ bên cạnh | **ĐẠT** |
| **Chi tiết sản phẩm (`product-detail.html`)** | Đạt - Nút "Đặt lịch" đổi nền và nổi nhẹ; ảnh nhỏ đổi viền | Đạt - Focus đi theo thứ tự menu → liên kết quay lại → câu hỏi thường gặp → nút "Đặt lịch" → thẻ liên quan; ảnh nhỏ không nhận focus vì chỉ là ảnh minh họa | Đạt - Giữ nguyên vị trí | **ĐẠT** |
| **Giới thiệu (`about.html`)** | Đạt - Khối CTA & các nút phản hồi tốt | Đạt - Phím Tab di chuyển chuẩn qua toàn bộ các liên kết | Đạt - Chuẩn bố cục | **ĐẠT** |

---

## 3. Quy trình xử lý lỗi & Giải trình kỹ thuật

* **Xử lý xê dịch bố cục:** Không thay đổi `margin`, `padding` hay `border-width` ở trạng thái `:hover`. Sử dụng thuộc tính `transform: translateY(...)` kết hợp `box-shadow` để hiệu ứng chỉ diễn ra trên lớp thị giác mà không đẩy lệch các thẻ xung quanh.
* **Độ tương phản (Contrast):** Chữ trắng trên nền hover `#00665C` đạt 6,87:1; chữ menu `#00665C` trên nền trắng khi hover đạt 6,87:1; chữ `#212529` trên nền nút chính `#FC7060` đạt 5,60:1. Viền focus `#00665C` đạt trên 3:1 so với nền trang (WCAG 1.4.11 và 2.4.7).

---

---

## 4. Kiểm thử trang Giới thiệu và bố cục responsive

**Thực hiện:** Dương Thành Đạt
**Ngày kiểm thử:** 02/11/2026
**Môi trường:** Chrome (phiên bản mới nhất), DevTools chế độ responsive, độ rộng 1366/768/390 px
**Bằng chứng:** `docs/screenshots/about-1366.png`, `about-768.png`, `about-390.png` (trang Giới thiệu)

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
| `index.html` | **ĐẠT** |

### 4.3. Hạn chế đã biết (ngoài phạm vi kiểm thử trang Giới thiệu)

- File `css/style.css` hiện có 2 khối `@media (max-width: 599px)` tách rời
  nhau thay vì gộp thành 1 khối duy nhất. Một số selector (`.container`,
  `.search`, `.search input`) bị khai báo trùng ở cả 2 khối — khối sau nằm
  sau trong file nên vẫn hiển thị đúng trên thực tế, nhưng cần gộp lại
  trong lần cập nhật sau để tránh khó bảo trì.

## 5. Rà soát toàn bộ website

**Thực hiện:** Dương Thành Đạt
**Ngày kiểm thử:** 03/11/2026

| # | Tiêu chí | Kết quả |
| :-: | :--- | :--- |
| 1 | Các trang có liên kết đúng không? | **ĐẠT** — rà soát toàn bộ `href` ở cả 4 trang, tất cả trỏ đúng trang/anchor có thật |
| 2 | CSS có được áp dụng nhất quán không? | **KHÔNG ĐẠT** — `products.html` liên kết tới `css/products.css` nhưng file này chưa tồn tại trong repo (lỗi 404 khi tải trang); ngoài phạm vi kiểm thử của Đạt (`products.html` do Phạm Bảo Ngọc phụ trách), đã ghi nhận để bạn phụ trách xử lý. Ngoài ra còn hạn chế 2 khối `@media (max-width: 599px)` trùng lặp (xem mục 4.4) |
| 3 | Hình ảnh có đường dẫn phù hợp không? | **ĐẠT** — rà soát 22 đường dẫn ảnh trên cả 4 trang, không ảnh nào bị vỡ |
| 4 | Danh sách sản phẩm có đủ ít nhất 8 sản phẩm không? | **ĐẠT** — `products.html` có đúng 8 thẻ trong khu vực "Sản phẩm" |
| 5 | Các trang có bố cục hợp lý không? | **ĐẠT** — xem mục 2 (Nghi) và mục 4.1 (Đạt, trang Giới thiệu) |
| 6 | Có lỗi responsive nào cần kiểm tra không? | **ĐẠT** — không phát hiện lỗi responsive |
| 7 | Hover và focus có hoạt động phù hợp không? | **ĐẠT** — xem mục 1-3 (Nghi) |

## 6. Đánh giá bằng AI (theo Prompt 9B)

**Công cụ:** Claude. Nhóm chọn 2 vấn đề thực tế AI phát hiện khi rà soát mã nguồn:

**Vấn đề 1 — Liên kết CSS trỏ tới file chưa tồn tại trong `products.html`**
- Vị trí: `products.html`, dòng 9 — `<link rel="stylesheet" href="css/products.css">`.
- Lý do cần xem xét: comment ngay phía trên dòng này ("CSS riêng của trang danh sách: nạp SAU style.css để ghi đè khi cần") cho thấy đây là chủ đích thiết kế, nhưng file `css/products.css` chưa từng được tạo — gây lỗi 404 khi tải trang.
- Mức độ ưu tiên: Cao (ảnh hưởng hiệu năng tải trang).
- Quyết định: **chưa áp dụng** — `products.html` thuộc phạm vi phụ trách của Phạm Bảo Ngọc, không phải của Đạt; chỉ ghi nhận phát hiện để bạn xử lý (tạo file `css/products.css` còn thiếu).
- Kết quả: không thay đổi code, chỉ ghi nhận.

**Vấn đề 2 — 2 khối `@media (max-width: 599px)` trùng lặp trong `css/style.css`**
- Vị trí: `css/style.css`, dòng ~1022 và ~1103.
- Lý do cần xem xét: 3 selector (`.container`, `.search`, `.search input`) bị khai báo trùng ở cả 2 khối, gây khó bảo trì.
- Mức độ ưu tiên: Trung bình (giao diện vẫn hiển thị đúng do cascade CSS, không phải lỗi hiển thị).
- Quyết định: **chưa áp dụng** đề xuất gộp lại — do đã quá hạn nộp, nhóm quyết định ghi nhận là hạn chế đã biết (mục 4.4) để xử lý ở đợt sau thay vì sửa gấp, tránh phát sinh lỗi mới sát deadline.
- Kết quả: không thay đổi code, chỉ ghi nhận.
