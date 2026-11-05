# 🐾 PawCare
 
Website spa, grooming và cửa hàng thú cưng tại TP.HCM, cho đặt lịch online theo giờ trống.
 
**Đồ án Nhóm 4** · Học phần Phát triển ứng dụng TMĐT
 
| | |
|---|---|
| 🌐 **Trang chính (GitHub Pages)** | https://ngocdoan206.github.io/NHOM-4-PTUDTMDT-UEH/ |
| 📦 **Mã nguồn** | https://github.com/ngocdoan206/NHOM-4-PTUDTMDT-UEH |
| 📋 **Công việc (Issues)** | https://github.com/ngocdoan206/NHOM-4-PTUDTMDT-UEH/issues |
 
## Mục lục
1. [Giới thiệu](#1-giới-thiệu)
2. [Khách hàng mục tiêu](#2-khách-hàng-mục-tiêu)
3. [Chức năng](#3-chức-năng)
4. [Công nghệ](#4-công-nghệ)
5. [Cấu trúc thư mục](#5-cấu-trúc-thư-mục)
6. [Chạy dự án](#6-chạy-dự-án)
7. [Tiến độ theo buổi](#7-tiến-độ-theo-buổi)
8. [Quy ước làm việc](#8-quy-ước-làm-việc)
9. [Thành viên](#9-thành-viên)
10. [Tài liệu liên quan](#10-tài-liệu-liên-quan)
## 1. Giới thiệu
 
PawCare là website của một tiệm spa và grooming chó mèo tại TP.HCM. Khách xem giá, chọn giờ trống và chọn groomer để đặt lịch online, rồi mua thức ăn, phụ kiện trong cùng một giỏ hàng.
 
**Vấn đề.** Chủ nuôi đang đặt lịch spa qua tin nhắn hoặc hotline, giá khó đoán vì phụ phí phát sinh và họ ít biết cách chăm đúng. Tiệm xếp lịch thủ công nên dễ trùng giờ.
 
**Giải pháp.**
- Đặt lịch theo giờ trống của từng groomer, giữ chỗ 10 phút, không trùng giờ.
- Báo giá tự động trước khi đặt, theo loài, cân nặng và độ dài lông.
- Lộ trình chăm sóc theo hồ sơ của bé: lịch grooming, chi phí dự tính.
- Dịch vụ và sản phẩm nằm chung một giỏ hàng, một lần thanh toán.
- Admin có màn hình quản lý lịch và Dashboard.
**Khác biệt so với các website tương tự.** Các tiệm spa thú cưng đã khảo sát thường chỉ có trang giới thiệu và bảng giá, hoặc cửa hàng kèm spa nhưng vẫn đặt qua hotline hay form. PawCare cho đặt lịch online theo giờ trống, báo giá trước, có lộ trình chăm sóc và đưa dịch vụ vào cùng giỏ hàng với sản phẩm. Kết quả khảo sát: [docs/competitor-analysis.md](docs/competitor-analysis.md).
 
## 2. Khách hàng mục tiêu
 
Chủ nuôi chó mèo tại TP.HCM, chủ yếu dưới 45 tuổi, mới nuôi hoặc ít kinh nghiệm, hiện đặt lịch qua tin nhắn hoặc hotline. Khách phụ là gia đình nuôi từ 2 thú trở lên.
 
## 3. Chức năng
 
Bản đầu gồm 22 chức năng (F01 đến F22) chia làm 3 đợt. Chi tiết từng chức năng: [docs/requirements.md](docs/requirements.md).
 
| Đợt | Chức năng |
|---|---|
| **1. Nền tảng đặt lịch và mua hàng** | F01 Đăng ký · F02 Đăng nhập/đăng xuất · F03 Hồ sơ bé · F04 Danh sách dịch vụ, sản phẩm · F05 Chi tiết · F06 Tìm kiếm và lọc · F07 Báo giá tự động · F08 Chọn giờ trống và giữ chỗ · F09 Giỏ hàng gộp · F10 Đặt hàng · F11 Thanh toán trực tuyến · F12 Theo dõi và hủy đơn · F13 Quản lý dịch vụ, sản phẩm · F14 Quản lý groomer và lịch · F15 Quản lý đơn và lịch hẹn |
| **2. Hoàn thiện** | F16 Voucher · F17 Phí giao hàng · F18 Đánh giá · F19 Trang chủ · F20 Dashboard · F21 Phiếu kết quả grooming |
| **3. Điểm sáng tạo** | F22 Lộ trình chăm sóc |
 
## 4. Công nghệ
 
**Hiện tại (Buổi 2 và 3, giao diện web tĩnh):** HTML5, CSS3 (Grid, Flexbox, media query), JavaScript thuần (không framework), lưu giỏ hàng bằng `localStorage`, triển khai bằng GitHub Pages.
 
**Dự kiến cho đồ án cuối kỳ:**
 
| Phần | Công nghệ | Dùng để |
|---|---|---|
| Ứng dụng | C#, ASP.NET Core MVC | Xây website, xử lý nghiệp vụ |
| Truy cập dữ liệu | Entity Framework Core | Đọc, ghi cơ sở dữ liệu |
| Cơ sở dữ liệu | SQLite (khi phát triển) | Lưu dữ liệu, chống đặt trùng giờ |
| Giao diện | HTML, CSS, JavaScript, Bootstrap 5 | Giao diện đáp ứng nhiều màn hình |
| Đăng nhập, phân quyền | ASP.NET Core Identity | Tài khoản khách hàng và Admin |
| Biểu đồ | Chart.js | Dashboard cho Admin |
| Thanh toán | VNPay sandbox, trả tại tiệm, COD | Thanh toán đơn |
| Kiểm thử | xUnit | Kiểm thử chức năng |
| Mã nguồn | GitHub (Issues, Pull Request) | Phối hợp nhóm |
 
## 5. Cấu trúc thư mục
 
```
.
├── frontend/            Giao diện web (thư mục được đưa lên GitHub Pages)
│   ├── *.html           index, products, product-detail, cart, about
│   ├── css/             base, layout, components, pages và CSS theo tính năng
│   ├── js/              data, utils, services, components, pages
│   └── images/          logo, pages, products, services
├── backend/             Phần máy chủ cho đồ án cuối kỳ
├── docs/                Tài liệu, khảo sát, kiểm thử, ảnh chụp
├── .github/             Workflow GitHub Pages, mẫu pull request
├── AGENTS.md            Quy ước cho công cụ AI
├── AI_USAGE_LOG.md      Nhật ký sử dụng AI
└── README.md
```
 
## 6. Chạy dự án
 
**Xem bản đã triển khai:** mở https://ngocdoan206.github.io/NHOM-4-PTUDTMDT-UEH/
 
**Chạy trên máy:**
1. Tải về: `git clone https://github.com/ngocdoan206/NHOM-4-PTUDTMDT-UEH.git`
2. Mở file `frontend/index.html` bằng trình duyệt. Không cần cài đặt gì.
3. Kiểm tra giao diện ở 1366, 768, 390 px bằng DevTools (F12, Ctrl + Shift + M).
## 7. Tiến độ theo buổi
 
### Buổi 2: Giao diện HTML5 và CSS3
Giao diện tĩnh gồm các trang Trang chủ, Danh sách, Chi tiết, Giới thiệu. Chưa có JavaScript. Báo cáo kiểm thử: [docs/testing/test-report-buoi2.md](docs/testing/test-report-buoi2.md).
 
### Buổi 3: JavaScript
Thêm dữ liệu sản phẩm, hiển thị danh sách, tìm kiếm, lọc, sắp xếp, trang chi tiết theo `?id=`, giỏ hàng lưu bằng `localStorage`, cùng hai điểm đột phá: máy tính giá theo cân nặng và độ dài lông, đặt lịch khung giờ mô phỏng.
 
> Phần này sẽ bổ sung đủ 10 mục theo đề: cách chạy, cách dùng từng chức năng, kết quả kiểm thử, hạn chế và hướng phát triển.
 
## 8. Quy ước làm việc
 
- **Tên tệp:** chữ thường, không dấu, nối bằng gạch ngang; đã chốt thì không đổi.
- **Nhánh:** `loại/tên-việc`, ví dụ `feat/trang-chu`.
- **Commit:** `loại: việc đã làm`, với loại là `feat`, `fix`, `style`, `docs`, `images`.
- **Pull request:** không commit thẳng vào nhánh chính; làm trên nhánh riêng, có người duyệt, không tự gộp pull request của mình.
- **JavaScript:** tách lớp data, utils, services, components, pages; chỉ lớp pages gắn sự kiện; không dùng `onclick` trong HTML.
- **AI:** dùng AI thì ghi vào `AI_USAGE_LOG.md` ngay, ở mục có tên mình.
## 9. Thành viên
 
| Họ tên | Vai trò (đồ án cuối kỳ) |
|---|---|
| Đoàn Thị Thu Ngọc | Trưởng nhóm, phân tích nghiệp vụ, backend Voucher và phí ship |
| Nguyễn Thanh Hà | UI/UX, frontend đặt lịch |
| Nguyễn Hồng Hạnh | Frontend mua hàng, điểm sáng tạo Lộ trình chăm sóc |
| Phạm Bảo Ngọc | Backend, CSDL lịch trống và giữ chỗ |
| Dương Thành Đạt | Backend giỏ hàng, checkout, VNPay |
| Nguyễn Thị Huỳnh Giao | Admin, Dashboard, phiếu kết quả, review |
| Nguyễn Hoàng Bảo Nghi | Đăng nhập, phân quyền, kiểm thử, triển khai |
 
Phân công từng buổi xem tại [Issues](https://github.com/ngocdoan206/NHOM-4-PTUDTMDT-UEH/issues) và [kế hoạch dự án](docs/project-plan.md).
 
## 10. Tài liệu liên quan
 
| Tài liệu | Liên kết |
|---|---|
| Trang web đã triển khai | [ngocdoan206.github.io/NHOM-4-PTUDTMDT-UEH](https://ngocdoan206.github.io/NHOM-4-PTUDTMDT-UEH/) |
| Bảng yêu cầu chức năng | [docs/requirements.md](docs/requirements.md) |
| Kế hoạch dự án | [docs/project-plan.md](docs/project-plan.md) |
| Thiết kế giao diện | [docs/ui-design.md](docs/ui-design.md) |
| Quy trình nghiệp vụ | [docs/business-workflow.md](docs/business-workflow.md) |
| Phân tích website tương tự | [docs/competitor-analysis.md](docs/competitor-analysis.md) |
| Báo cáo kiểm thử Buổi 2 | [docs/testing/test-report-buoi2.md](docs/testing/test-report-buoi2.md) |
| Ảnh chụp minh chứng | [docs/screenshots/](docs/screenshots/) |
| **Nhật ký sử dụng AI** | [AI_USAGE_LOG.md](AI_USAGE_LOG.md) |
| Quy ước cho công cụ AI | [AGENTS.md](AGENTS.md) |
| Công việc và tiến độ | [Issues](https://github.com/ngocdoan206/NHOM-4-PTUDTMDT-UEH/issues) · [Milestones](https://github.com/ngocdoan206/NHOM-4-PTUDTMDT-UEH/milestones) |
