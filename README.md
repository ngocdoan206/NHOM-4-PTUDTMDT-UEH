# PawCare

Website spa, grooming và cửa hàng thú cưng tại TP.HCM. Đồ án nhóm 4, học phần Phát triển ứng dụng WEB/TMĐT, GV TS Nguyễn Mạnh Tuấn, UEH.

## 1. Giới thiệu

PawCare là website của một tiệm spa và grooming chó mèo tại TP.HCM. Khách xem giá, chọn giờ trống và chọn groomer để đặt lịch online, rồi mua thức ăn, phụ kiện trong cùng một giỏ hàng.

**Vấn đề kinh doanh.** Chủ nuôi đang đặt lịch spa qua tin nhắn hoặc hotline, giá khó đoán vì phụ phí phát sinh và họ ít biết cách chăm đúng. Tiệm thì xếp lịch thủ công nên dễ trùng giờ.

**Website giải quyết như thế nào.**
- Đặt lịch theo giờ trống của từng groomer, giữ chỗ 10 phút, không trùng giờ.
- Báo giá tự động trước khi đặt, theo loài, cân nặng và độ dài lông.
- Lộ trình chăm sóc theo hồ sơ của bé: khẩu phần mỗi ngày, lịch grooming, chi phí dự tính.
- Dịch vụ và sản phẩm nằm chung một giỏ hàng, một lần thanh toán.
- Admin có màn hình quản lý lịch và Dashboard.

**Khác biệt so với các website tương tự.** Các tiệm spa thú cưng đã khảo sát thường chỉ có trang giới thiệu và bảng giá hoặc cửa hàng kèm spa nhưng vẫn đặt qua hotline hoặc form. PawCare cho đặt lịch online theo giờ trống, báo giá trước, có lộ trình chăm sóc và đưa dịch vụ vào cùng giỏ hàng với sản phẩm.

## 2. Khách hàng mục tiêu

Chủ nuôi chó mèo tại TP.HCM, chủ yếu dưới 45 tuổi, mới nuôi hoặc ít kinh nghiệm, hiện đặt lịch qua tin nhắn hoặc hotline. Khách phụ là gia đình nuôi từ 2 thú trở lên.

## 3. Chức năng chính

Bản đầu gồm 15 chức năng (F01 đến F15), làm theo thứ tự ưu tiên.

**Cốt lõi (bắt buộc)**
- F01: Đăng ký, đăng nhập, hồ sơ khách và hồ sơ bé
- F02: Danh mục dịch vụ và sản phẩm, chi tiết, tìm kiếm, lọc, sắp xếp
- F03: Báo giá tự động và thời lượng theo hồ sơ bé
- F04: Chọn giờ trống theo groomer, giữ chỗ 10 phút
- F05: Giỏ hàng gộp dịch vụ và sản phẩm
- F06: Checkout và thanh toán (VNPay sandbox, trả tại tiệm, COD)
- F07: Lịch sử và trạng thái đơn của khách
- F08: Admin quản lý dịch vụ, sản phẩm, danh mục, groomer, đơn, lịch

**Làm ngay sau phần cốt lõi**
- F09: Voucher (có mã Sinh viên UEH)
- F10: Phí ship theo bảng phí cố định
- F11: Review và rating
- F12: Trang chủ
- F13: Dashboard Admin
- F14: Phiếu kết quả sau grooming

**Điểm sáng tạo**
- F15: Lộ trình chăm sóc

Chi tiết từng chức năng nằm trong REQUIREMENTS.md.

## 4. Thành viên

- Đoàn Thị Thu Ngọc – Trưởng nhóm 
- Nguyễn Hồng Hạnh
- Nguyễn Hoàng Bảo Nghi
- Nguyễn Thị Huỳnh Giao
- Phạm Bảo Ngọc
- Nguyễn Thanh Hà 
- Dương Thành Đạt

## 5. Công nghệ dự kiến

(đang xác nhận)

## 6. Kế hoạch thực hiện

- Giai đoạn 1: Khảo sát và xác định yêu cầu
- Giai đoạn 2: Thiết kế giao diện
- Giai đoạn 3: Xây dựng các chức năng frontend
- Giai đoạn 4: Phát triển backend và cơ sở dữ liệu
- Giai đoạn 5: Tích hợp và kiểm thử
- Giai đoạn 6: Triển khai và hoàn thiện

Lịch chi tiết và người phụ trách: xem PROJECT_PLAN.md.

## 7. Liên kết

- Bảng yêu cầu: REQUIREMENTS.md
- Kế hoạch: PROJECT_PLAN.md
- Phân tích website: docs/competitor-analysis.md
