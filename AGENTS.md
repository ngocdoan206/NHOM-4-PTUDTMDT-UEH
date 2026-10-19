# Project Instructions for AI

## 1. Project context

Đây là dự án website thương mại điện tử của sinh viên.

- Tên dự án: PawCare, website spa, grooming và cửa hàng thú cưng tại TP.HCM.
- Khách đặt lịch dịch vụ theo giờ trống của groomer và mua sản phẩm trong cùng một giỏ hàng.
- Công nghệ dự kiến: ASP.NET Core MVC, Entity Framework Core, SQLite, Bootstrap 5 (chi tiết trong README.md, mục 5).
- Tài liệu cần đọc trước khi làm việc: README.md, REQUIREMENTS.md, PROJECT_PLAN.md, docs/business-workflow.md.

## 2. Scope

Chỉ triển khai các chức năng đã được nhóm thống nhất
trong REQUIREMENTS.md.

- Không tự thêm chức năng mới. Có ý tưởng thì đề xuất để nhóm quyết định.
- Chức năng ghi "ngoài phạm vi" trong REQUIREMENTS.md thì không làm.

## 3. Coding principles

- Giữ mã nguồn dễ đọc và dễ bảo trì.
- Không thay đổi kiến trúc lớn khi chưa được nhóm đồng ý.
- Không tự ý xóa chức năng đang hoạt động.
- Ưu tiên thay đổi nhỏ, có thể kiểm tra.
- Khi dùng hoặc sửa mã từ nguồn mẫu, ghi rõ file nào được kế thừa, file nào đã chỉnh sửa.

## 4. Workflow

Trước khi sửa mã nguồn:
1. Đọc các tài liệu liên quan.
2. Phân tích hiện trạng.
3. Đề xuất phương án.
4. Chờ nhóm xác nhận.

Sau khi sửa mã nguồn:
1. Giải thích các thay đổi.
2. Nêu file đã sửa.
3. Hướng dẫn chạy và kiểm thử.
4. Báo cáo các giới hạn còn tồn tại.

Ghi nhận việc dùng AI: mỗi lần dùng AI cho việc quan trọng, thành viên ghi vào AI_USAGE_LOG.md (công cụ, mục đích, prompt, kết quả, quyết định của nhóm).

## 5. Security

- Không đưa mật khẩu, API key hoặc token vào mã nguồn.
- Không tự ý vô hiệu hóa kiểm tra bảo mật.
- Không sử dụng dữ liệu cá nhân thật khi chưa được phép.

## 6. Communication

Nếu yêu cầu chưa rõ, hãy hỏi lại trước khi triển khai.
