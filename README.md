# PawCare

Website spa, grooming và cửa hàng thú cưng tại TP.HCM. Đồ án nhóm 4, học phần Phát triển ứng dụng WEB/TMĐT, GV TS Nguyễn Mạnh Tuấn, UEH.

## 1. Giới thiệu

PawCare là website của một tiệm spa và grooming chó mèo tại TP.HCM. Khách xem giá, chọn giờ trống và chọn groomer để đặt lịch online, rồi mua thức ăn, phụ kiện trong cùng một giỏ hàng.

**Vấn đề kinh doanh.** Chủ nuôi đang đặt lịch spa qua tin nhắn hoặc hotline, giá khó đoán vì phụ phí phát sinh và họ ít biết cách chăm đúng. Tiệm thì xếp lịch thủ công nên dễ trùng giờ.

**Website giải quyết như thế nào.**
- Đặt lịch theo giờ trống của từng groomer, giữ chỗ 10 phút, không trùng giờ.
- Báo giá tự động trước khi đặt, theo loài, cân nặng và độ dài lông.
- Lộ trình chăm sóc theo hồ sơ của bé: lịch grooming, chi phí dự tính.
- Dịch vụ và sản phẩm nằm chung một giỏ hàng, một lần thanh toán.
- Admin có màn hình quản lý lịch và Dashboard.

**Khác biệt so với các website tương tự.** Các tiệm spa thú cưng đã khảo sát thường chỉ có trang giới thiệu và bảng giá hoặc cửa hàng kèm spa nhưng vẫn đặt qua hotline hoặc form. PawCare cho đặt lịch online theo giờ trống, báo giá trước, có lộ trình chăm sóc và đưa dịch vụ vào cùng giỏ hàng với sản phẩm.

## 2. Khách hàng mục tiêu

Chủ nuôi chó mèo tại TP.HCM, chủ yếu dưới 45 tuổi, mới nuôi hoặc ít kinh nghiệm, hiện đặt lịch qua tin nhắn hoặc hotline. Khách phụ là gia đình nuôi từ 2 thú trở lên.

## 3. Chức năng chính

Bản đầu gồm 17 chức năng (FR-01 đến FR-17), chia làm 3 đợt thực hiện.

**Đợt 1 – Nền tảng đặt lịch và mua hàng**
- FR-01: Đăng ký tài khoản
- FR-02: Đăng nhập và đăng xuất
- FR-03: Quản lý hồ sơ bé
- FR-04: Xem và tìm kiếm dịch vụ, sản phẩm
- FR-05: Xem báo giá tự động
- FR-06: Chọn giờ trống và giữ chỗ
- FR-07: Quản lý giỏ hàng
- FR-08: Thanh toán đơn hàng 
- FR-09: Theo dõi và hủy đơn
- FR-10: Quản lý dịch vụ, sản phẩm và đơn

**Đợt 2 – Hoàn thiện**
- FR-11: Áp dụng voucher
- FR-12: Tính phí giao hàng
- FR-13: Đánh giá dịch vụ, sản phẩm
- FR-14: Xem trang chủ
- FR-15: Xem Dashboard 
- FR-16: Lập phiếu kết quả grooming

**Đợt 3 – Điểm sáng tạo**
- FR-17: Xem lộ trình chăm sóc

Chi tiết từng chức năng nằm trong REQUIREMENTS.md.

## 4. Thành viên

| Họ tên | Vai trò |
|---|---|
| Đoàn Thị Thu Ngọc | Trưởng nhóm, phân tích nghiệp vụ, backend Voucher và phí ship |
| Nguyễn Thanh Hà | UI/UX, frontend đặt lịch |
| Nguyễn Hồng Hạnh | Frontend mua hàng, điểm sáng tạo Lộ trình chăm sóc |
| Phạm Bảo Ngọc | Backend, CSDL lịch trống và giữ chỗ |
| Dương Thành Đạt | Backend giỏ hàng, checkout, VNPay |
| Nguyễn Thị Huỳnh Giao | Admin, Dashboard, phiếu kết quả, review |
| Nguyễn Hoàng Bảo Nghi | Đăng nhập/phân quyền, kiểm thử, triển khai |

## 5. Công nghệ dự kiến

| Phần | Công nghệ | Dùng để |
|---|---|---|
| Ngôn ngữ và khung ứng dụng | C#, ASP.NET Core MVC | Xây website, xử lý nghiệp vụ |
| Truy cập dữ liệu | Entity Framework Core | Đọc, ghi cơ sở dữ liệu bằng mã C# |
| Cơ sở dữ liệu | SQLite (khi phát triển) | Lưu dữ liệu, ràng buộc chống đặt trùng giờ |
| Giao diện | HTML, CSS, JavaScript, Bootstrap 5 | Giao diện đáp ứng nhiều kích thước màn hình |
| Đăng nhập, phân quyền | ASP.NET Core Identity | Tài khoản khách hàng và Admin |
| Biểu đồ | Chart.js | Dashboard cho Admin |
| Thanh toán | VNPay sandbox, trả tại tiệm, COD | Thanh toán đơn |
| Kiểm thử | xUnit | Kiểm thử chức năng |
| Quản lý mã nguồn | GitHub (Issues, Pull Request) | Phối hợp nhóm |

**Nguồn mã mẫu tham khảo (dự kiến):** DemoTechEcommerceMVC, giấy phép MIT, tác giả NABIHAyman, đường dẫn: https://github.com/NABIHAyman/DemoTechEcommerceMVC. Nhóm sẽ kế thừa khung bán hàng (giỏ hàng, đơn hàng) và chỉnh sửa, bổ sung các chức năng đặt lịch, báo giá, lộ trình chăm sóc. Phần kế thừa và phần chỉnh sửa sẽ được ghi cụ thể khi triển khai.

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
