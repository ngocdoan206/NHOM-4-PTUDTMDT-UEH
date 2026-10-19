# Project Plan – PawCare

> Website spa và grooming thú cưng tại TP.HCM: đặt lịch theo giờ trống của từng groomer, báo giá tự động, lộ trình chăm sóc theo hồ sơ bé, dịch vụ và sản phẩm chung một giỏ hàng.

**Thời gian dự án:** 15/10 – 15/12/2026. Sản phẩm và nội dung báo cáo hoàn thành trước **10/12**; từ 11/12 đến 15/12 dành cho format, hoàn thiện báo cáo và chuẩn bị slide thuyết trình.

**Trạng thái:** Chưa bắt đầu · Đang làm · Chờ review · Hoàn thành

---

## 1. Thành viên và vai trò
 
Vai trò là vai trò chính, không giới hạn công việc. Các thành viên phối hợp, hỗ trợ nhau khi tích hợp và kiểm thử, và phải giải thích được phần việc mình phụ trách.
 
| STT | Họ tên | Vai trò | Trách nhiệm |
|---:|---|---|---|
| 1 | Ngọc Đoàn | Trưởng nhóm / BA / Backend | Phân tích yêu cầu, đặc tả nghiệp vụ và API, quản lý tiến độ; phát triển backend Voucher và Shipping, phối hợp tích hợp các module |
| 2 | Hà | UI/UX / Frontend đặt lịch | Thiết kế UI/UX, xây dựng giao diện đặt lịch theo groomer và khung giờ trống, đảm bảo trải nghiệm người dùng và responsive |
| 3 | Hạnh | Frontend mua hàng / Innovation | Xây dựng giao diện danh mục và chi tiết sản phẩm; phát triển Lộ trình chăm sóc cá nhân hóa dựa trên hồ sơ thú cưng và lịch sử sử dụng dịch vụ |
| 4 | Ngọc Phạm | Backend / Database | Thiết kế cơ sở dữ liệu, phát triển nghiệp vụ lịch trống, kiểm tra xung đột lịch, giữ chỗ và đảm bảo tính nhất quán dữ liệu đặt lịch |
| 5 | Đạt | Backend / Tích hợp thanh toán | Phát triển giỏ hàng chung cho dịch vụ và sản phẩm, xử lý checkout, tính tổng tiền, tạo đơn hàng và tích hợp thanh toán VNPay |
| 6 | Giao | Admin / Dashboard | Phát triển trang quản trị, Dashboard thống kê, phiếu kết quả grooming và chức năng quản lý Review, phối hợp xử lý dữ liệu báo cáo |
| 7 | Nghi | Authentication / QA / DevOps | Phát triển đăng nhập, đăng ký và phân quyền; quản lý môi trường phát triển chung, kiểm thử tích hợp, kiểm tra bảo mật cơ bản, triển khai và tài liệu kỹ thuật |
 
### Quy ước làm việc
 
- Mỗi công việc có **một người chịu trách nhiệm chính** và một GitHub Issue tương ứng.
- Thay đổi vào nhánh chính qua Pull Request, người duyệt khác người viết.
- Mọi lần dùng AI được ghi vào `AI_USAGE_LOG.md`; code do AI sinh ra phải được người phụ trách kiểm tra và hiểu trước khi tích hợp.

---
 
## 2. Các giai đoạn
 
| Giai đoạn | Thời gian | Cột mốc nghiệm thu |
|---|---|---|
| 1. Khảo sát và xác định yêu cầu | 15/10 – 20/10 | Bản bài tập hoàn chỉnh nộp thầy: đề tài, phân tích đối thủ, yêu cầu, quy trình nghiệp vụ, kế hoạch và repo công khai |
| 2. Thiết kế giao diện | 21/10 – 08/11 | Có thiết kế giao diện, thiết kế cơ sở dữ liệu và luồng xử lý chính, được cả nhóm thống nhất |
| 3. Xây dựng các chức năng frontend | 02/11 – 22/11 | Các trang chính của khách hàng và quản trị chạy được, dùng được trên desktop và mobile |
| 4. Phát triển backend và cơ sở dữ liệu | 02/11 – 29/11 | Các nghiệp vụ chính hoạt động và kết nối được với giao diện |
| 5. Tích hợp và kiểm thử | 23/11 – 06/12 | Các luồng chính chạy từ đầu đến cuối; có kết quả kiểm thử và lỗi đã xử lý |
| 6. Triển khai và hoàn thiện | 30/11 – 10/12 | Website chạy công khai, repo gọn gàng, nội dung báo cáo hoàn thành |
| Hoàn tất báo cáo và thuyết trình | 11/12 – 15/12 | Báo cáo đã format, slide và phần tập dượt sẵn sàng |
 
Giai đoạn 3 và 4 chạy song song; giai đoạn 5 bắt đầu khi các chức năng chính đã tích hợp được.
 
---
 
## 3. Công việc
 
### Giai đoạn 1: Khảo sát và xác định yêu cầu
 
| Mã | Công việc | Người phụ trách | Kết quả cần đạt | Thời hạn | Trạng thái |
|---|---|---|---|---|---|
| T01 | Lựa chọn đề tài, viết README | Ngọc Đoàn | README.md | 12h 19/10 | Chờ review |
| T02 | Phân tích 3 website | Nghi | docs/competitor-analysis.md | 12h 19/10 | Chờ review |
| T03 | Dùng AI phân tích yêu cầu | Ngọc Phạm | AI_USAGE_LOG.md (Lần 1) | 12h 19/10 | Chờ review |
| T04 | Dùng AI phản biện | Hà | AI_USAGE_LOG.md (Lần 2) | 12h 19/10 | Chờ review |
| T05 | Vai trò người dùng và chức năng | Giao | REQUIREMENTS.md | 23h 19/10 | Đang làm |
| T06 | Quy trình nghiệp vụ | Đạt | docs/business-workflow.md | 23h 19/10 | Đang làm |
| T07 | Phân công vai trò và công việc | Hạnh | PROJECT_PLAN.md | 23h 19/10 | Chờ review |
| T08 | Repo Public và Issues | Ngọc Đoàn | AGENTS.md, danh sách Issues | 23h 19/10 | Hoàn thành |
| T09 | Review chéo tài liệu giai đoạn 1 và hoàn chỉnh bản nộp thầy | Cả nhóm (Ngọc Đoàn điều phối) | Bản bài tập hoàn chỉnh, thống nhất phạm vi bản đầu | 20/10 | Chưa bắt đầu |
 
### Giai đoạn 2: Thiết kế giao diện
 
| Mã | Công việc | Người phụ trách | Kết quả cần đạt | Thời hạn | Trạng thái |
|---|---|---|---|---|---|
| T10 | Thiết kế giao diện khách hàng và quản trị | Hà (phối hợp Hạnh, Giao) | Bản thiết kế giao diện cho mobile và desktop | 08/11 | Chưa bắt đầu |
| T11 | Thiết kế cơ sở dữ liệu | Ngọc Phạm | Sơ đồ ERD và mô tả dữ liệu | 08/11 | Chưa bắt đầu |
| T12 | Đặc tả nghiệp vụ, luồng xử lý và API chính | Ngọc Đoàn | Sơ đồ luồng và tài liệu API | 08/11 | Chưa bắt đầu |
| T13 | Chốt công nghệ và dựng môi trường chạy chung | Nghi | Mọi thành viên chạy được dự án trên máy mình, có hướng dẫn trong README | 01/11 | Chưa bắt đầu |
| T14 | Review chéo thiết kế và chốt bản thiết kế đầu tiên | Cả nhóm | Thiết kế được thống nhất | 08/11 | Chưa bắt đầu |
 
### Giai đoạn 3: Xây dựng các chức năng frontend
 
| Mã | Công việc | Người phụ trách | Kết quả cần đạt | Thời hạn | Trạng thái |
|---|---|---|---|---|---|
| T15 | Bố cục chung và trang chủ | Hà | Các trang chạy được, nhất quán về giao diện | 15/11 | Chưa bắt đầu |
| T16 | Giao diện đặt lịch theo groomer và khung giờ trống | Hà | Khách hàng đặt lịch được trên giao diện | 22/11 | Chưa bắt đầu |
| T17 | Giao diện danh mục, chi tiết sản phẩm, giỏ hàng, checkout và đơn hàng | Hạnh | Khách hàng thao tác mua hàng được trên giao diện | 22/11 | Chưa bắt đầu |
| T18 | Giao diện quản trị và thống kê | Giao | Các màn hình quản trị chạy được | 22/11 | Chưa bắt đầu |
| T19 | Hiệu ứng tương tác và kiểm tra responsive | Hà (phối hợp Hạnh) | Giao diện dùng được trên ít nhất 2 kích thước màn hình | 22/11 | Chưa bắt đầu |
 
### Giai đoạn 4: Phát triển backend và cơ sở dữ liệu
 
| Mã | Công việc | Người phụ trách | Kết quả cần đạt | Thời hạn | Trạng thái |
|---|---|---|---|---|---|
| T20 | Đăng nhập, đăng ký và phân quyền | Nghi | Người dùng được phân quyền đúng | 15/11 | Chưa bắt đầu |
| T21 | Nghiệp vụ lịch trống, kiểm tra xung đột và giữ chỗ | Ngọc Phạm | Đặt lịch hoạt động, không trùng lịch | 29/11 | Chưa bắt đầu |
| T22 | Giỏ hàng chung, checkout, đơn hàng và thanh toán VNPay thử nghiệm | Đạt | Giỏ hàng, đơn hàng và thanh toán thử nghiệm hoạt động | 29/11 | Chưa bắt đầu |
| T23 | Voucher và phí vận chuyển | Ngọc Đoàn | Các chức năng hoạt động và tính đúng tổng tiền | 29/11 | Chưa bắt đầu |
| T24 | Nghiệp vụ quản trị, thống kê, phiếu kết quả và quản lý review | Giao | Quản trị viên quản lý và xem được thống kê | 29/11 | Chưa bắt đầu |
| T25 | Tính năng sáng tạo (Innovation): Lộ trình chăm sóc | Hạnh | Tính năng chạy được với dữ liệu thật, không chỉ là mockup | 29/11 | Chưa bắt đầu |
 
### Giai đoạn 5: Tích hợp và kiểm thử
 
| Mã | Công việc | Người phụ trách | Kết quả cần đạt | Thời hạn | Trạng thái |
|---|---|---|---|---|---|
| T26 | Tích hợp frontend và backend các luồng chính | Nghi (điều phối) | Các luồng chính chạy từ đầu đến cuối | 01/12 | Chưa bắt đầu |
| T27 | Lập test case và kiểm thử chức năng | Nghi | Bảng test case và kết quả kiểm thử | 06/12 | Chưa bắt đầu |
| T28 | Kiểm thử chéo giữa các thành viên | Cả nhóm | Lỗi được ghi lại thành Issue | 06/12 | Chưa bắt đầu |
| T29 | Kiểm tra bảo mật cơ bản | Nghi | Danh sách rủi ro, biện pháp và minh chứng | 06/12 | Chưa bắt đầu |
| T30 | Sửa lỗi | Từng người phụ trách phần của mình | Không còn lỗi nghiêm trọng | 06/12 | Chưa bắt đầu |
 
### Giai đoạn 6: Triển khai và hoàn thiện
 
| Mã | Công việc | Người phụ trách | Kết quả cần đạt | Thời hạn | Trạng thái |
|---|---|---|---|---|---|
| T31 | Triển khai website demo | Nghi | Website truy cập được công khai | 08/12 | Chưa bắt đầu |
| T32 | Hoàn thiện repo: README, dữ liệu demo, lịch sử commit | Ngọc Đoàn | Người ngoài chạy được theo hướng dẫn | 10/12 | Chưa bắt đầu |
| T33 | Hoàn thiện nội dung báo cáo các chương | Từng người theo phần mình phụ trách | Nội dung các chương hoàn chỉnh | 10/12 | Chưa bắt đầu |
| T34 | Tổng hợp nhật ký AI và bảng đánh giá mức độ tham gia | Ngọc Đoàn | Bảng đóng góp chi tiết, đối chiếu với lịch sử commit và Issue | 10/12 | Chưa bắt đầu |
 
### Hoàn tất báo cáo và thuyết trình (11/12 – 15/12)
 
| Mã | Công việc | Người phụ trách | Kết quả cần đạt | Thời hạn | Trạng thái |
|---|---|---|---|---|---|
| T35 | Format và finalize báo cáo | Ngọc Phạm (phối hợp Giao) | Báo cáo hoàn chỉnh theo chuẩn môn học | 13/12 | Chưa bắt đầu |
| T36 | Chuẩn bị slide thuyết trình | Hà (phối hợp cả nhóm) | Bộ slide hoàn chỉnh | 14/12 | Chưa bắt đầu |
| T37 | Tập dượt bảo vệ | Cả nhóm | Mỗi thành viên giải thích được phần mình phụ trách | 15/12 | Chưa bắt đầu |
 
---
 
## 4. Rủi ro
 
| Rủi ro | Phương án xử lý |
|---|---|
| Đặt lịch bị trùng khi nhiều người đặt cùng lúc | Thiết kế cơ chế giữ chỗ ngay từ giai đoạn thiết kế, kiểm thử với hai phiên đặt cùng giờ |
| Tích hợp thanh toán thử nghiệm gặp lỗi hoặc cần địa chỉ công khai để nhận kết quả | Triển khai bản thử nghiệm công khai sớm, ghi log và kiểm tra kết quả thanh toán |
| Công việc dồn vào một vài thành viên | Mỗi phần có người review, thành viên khác hỗ trợ khi tích hợp và kiểm thử |
| Khối lượng QA, bảo mật và triển khai dồn vào cuối kỳ | Kiểm thử chéo giữa các thành viên, mỗi người tự kiểm thử phần mình trước khi tích hợp |
| Frontend và backend lệch nhau, xung đột khi gộp code | Thống nhất tài liệu API trước, Pull Request nhỏ, review bắt buộc |
| Mở rộng phạm vi quá sức | Làm chức năng cốt lõi trước, bổ sung chỉ khi đã chạy ổn; ghi nhận mọi thay đổi phạm vi |
| Lộ khóa bí mật hoặc mật khẩu lên GitHub | Dùng file cấu hình riêng không đưa lên repo, kiểm tra repo trước khi nộp |
| Dùng AI nhưng không hiểu code | Ghi nhật ký AI, review chéo, tập dượt giải thích phần mình phụ trách |
| Đóng góp không đều hoặc khó chứng minh | Mỗi việc là một Issue có tên người phụ trách, cập nhật trạng thái hằng tuần |
| Trễ tiến độ do trùng lịch các môn khác | Hoàn thành sản phẩm trước 10/12 để còn thời gian hoàn thiện; họp tuần để phát hiện trễ sớm |
| Báo cáo dồn vào cuối kỳ, thiếu hình ảnh trước/sau | Mỗi người ghi chú và chụp ảnh ngay khi hoàn thành phần việc |
