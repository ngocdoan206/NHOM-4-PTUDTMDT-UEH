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

Bản đầu gồm 22 chức năng (F01 đến F22), chia làm 3 đợt thực hiện.

**Đợt 1 – Nền tảng đặt lịch và mua hàng**
- F01: Đăng ký tài khoản
- F02: Đăng nhập và đăng xuất
- F03: Quản lý hồ sơ bé
- F04: Xem danh sách dịch vụ và sản phẩm
- F05: Xem chi tiết dịch vụ và sản phẩm
- F06: Tìm kiếm và lọc dịch vụ, sản phẩm
- F07: Xem báo giá tự động
- F08: Chọn giờ trống và giữ chỗ
- F09: Quản lý giỏ hàng gộp dịch vụ và sản phẩm
- F10: Đặt hàng
- F11: Thanh toán trực tuyến
- F12: Theo dõi và hủy đơn
- F13: Quản lý dịch vụ và sản phẩm 
- F14: Quản lý groomer và lịch làm việc 
- F15: Quản lý đơn và lịch hẹn 

**Đợt 2 – Hoàn thiện**
- F16: Quản lý và áp dụng voucher
- F17: Tính phí giao hàng 
- F18: Đánh giá dịch vụ, sản phẩm
- F19: Xem trang chủ
- F20: Xem Dashboard
- F21: Lập phiếu kết quả grooming

**Đợt 3 – Điểm sáng tạo**
- F22: Xem lộ trình chăm sóc

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
- Quy trình nghiệp vụ: docs/business-workflow.md
- Nhật ký sử dụng AI: AI_USAGE_LOG.md
