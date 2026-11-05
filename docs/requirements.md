# Requirements
## 1. Mục tiêu dự án
### Mục tiêu kinh doanh
- Số hóa quy trình vận hành dịch vụ spa/grooming và bán lẻ phụ kiện thú cưng của tiệm tại TP.HCM.
- Giải quyết vấn đề đặt lịch trùng giờ, quản lý tải phục vụ của Groomer theo từng khung giờ thực tế.
- Tăng giá trị đơn hàng trung bình thông qua mô hình giỏ hàng kết hợp (mua phụ kiện/thức ăn kèm dịch vụ làm đẹp trong một lần thanh toán duy nhất).
### Giá trị mang lại cho khách hàng
- Báo giá dịch vụ tự động dựa trên đặc điểm thể trạng của thú cưng (loài, cân nặng, độ dài lông), giúp giảm nỗi lo phát sinh phụ phí tại quầy.
- Xem giờ trống của từng groomer; cơ chế giữ chỗ 10 phút khi đặt hàng giúp đảm bảo lịch hẹn.
- Cung cấp lộ trình chăm sóc định kỳ cá nhân hóa theo từng hồ sơ thú cưng, giúp người nuôi dự trù chi phí và thời gian làm đẹp cho bé.
## 2. Phạm vi dự án
### Trong phạm vi
- Xây dựng ứng dụng web thương mại điện tử theo kiến trúc ASP.NET Core MVC.
- Quản lý thông tin và hồ sơ sức khỏe cơ bản của thú cưng (Pet Profile).
- Đặt lịch dịch vụ theo giờ trống của Groomer kèm cơ chế giữ chỗ tạm thời 10 phút từ lúc khách bấm đặt hàng.
- Công cụ tính toán báo giá tự động theo thông số thú cưng.
- Giỏ hàng đa năng: gộp sản phẩm vật lý và dịch vụ đặt lịch vào cùng một đơn hàng.
- Tích hợp cổng thanh toán trực tuyến giả lập (VNPay Sandbox) và phương thức COD / thanh toán tại quầy.
- Quản trị dành cho Admin: quản lý dịch vụ, sản phẩm, groomer và ca làm việc, đơn và lịch hẹn, voucher, Dashboard thống kê.
- Điểm sáng tạo: Lộ trình chăm sóc cá nhân hóa (F22).
### Ngoài phạm vi
- Ứng dụng di động (Mobile App Android/iOS) – chỉ triển khai Web Responsive.
- Tự động hoàn tiền qua cổng VNPay API (Refund API) khi hủy đơn – Việc hoàn tiền (nếu có) được xử lý thủ công bởi Admin.
- Tích hợp trực tiếp API của các đơn vị vận chuyển bên thứ 3 (GHTK, GHN, AhaMove) – Phí giao hàng được tính theo bảng phí định sẵn của cửa hàng.
- Các dịch vụ khám chữa bệnh thú y chuyên sâu, tiêm phòng hoặc lưu trú dài ngày.
- Hỗ trợ đa ngôn ngữ (chỉ phát triển giao diện Tiếng Việt).
## 3. Người dùng
| Vai trò | Nhiệm vụ chính | Quyền hạn dự kiến |
| :--- | :--- | :--- |
| Khách chưa đăng nhập | Xem thông tin dịch vụ/sản phẩm, tìm kiếm, lọc, dùng thử tính năng Báo giá tự động. | Truy cập các trang công khai; Đăng ký tài khoản mới và Đăng nhập. |
| Chủ nuôi | Đặt lịch spa, mua sản phẩm, quản lý hồ sơ thú cưng, chọn groomer/giờ trống, thanh toán và đánh giá. | CRUD Hồ sơ bé, Giữ chỗ 10p, Tạo/Hủy đơn hàng & lịch hẹn, Đánh giá, Xem Lộ trình chăm sóc. |
| Admin| Quản lý danh mục, thiết lập lịch Groomer, xử lý đơn hàng/lịch hẹn, lập phiếu kết quả và theo dõi doanh thu. | CRUD Sản phẩm/Dịch vụ/Groomer/Voucher, Cập nhật trạng thái đơn, Xem Dashboard, Quản lý tài khoản. |

## 4. Yêu cầu chức năng
### Đợt 1 – Nền tảng đặt lịch và mua hàng

| Mã YC | Tên chức năng | Mô tả chức năng | Người sử dụng | Ưu tiên | Tiêu chí nghiệm thu |
| :---: | :--- | :--- | :---: | :---: | :--- |
| F01 | Đăng ký tài khoản | Khách hàng tạo tài khoản mới bằng Email, Mật khẩu và Họ tên, Số điện thoại. | Khách chưa đăng nhập| Cao | - Kiểm tra định dạng Email, SĐT hợp lệ.<br>- Báo lỗi nếu Email đã tồn tại trong hệ thống.<br>- Mã hóa mật khẩu an toàn trước khi lưu DB. |
| F02 | Đăng nhập & Đăng xuất | Cho phép người dùng đăng nhập vào hệ thống và đăng xuất an toàn. | Khách chưa đăng nhập, Chủ nuôi, Admin | Cao | - Xác thực đúng tài khoản/mật khẩu qua ASP.NET Core Identity.<br>- Điều hướng Admin về trang Quản trị, Khách về trang chủ.<br>- Xóa session/cookie khi chọn Đăng xuất. |
| F03 | Quản lý hồ sơ bé | Thêm, sửa, xóa, xem danh sách thú cưng của khách hàng (Tên, Loài, Giống, Cân nặng, Độ dài lông, Tuổi). | Chủ nuôi | Cao | - Cho phép tạo nhiều hồ sơ thú cưng cho 1 tài khoản.<br>- Cập nhật được các chỉ số cân nặng, lông để phục vụ tính giá tự động. |
| F04 | Xem danh sách dịch vụ & sản phẩm | Hiển thị danh sách các dịch vụ grooming/spa và danh mục sản phẩm (thức ăn, phụ kiện...). | Khách chưa đăng nhập, Chủ nuôi | Cao | - Phân loại rõ ràng giữa Dịch vụ và Sản phẩm.<br>- Hiển thị hình ảnh, tên, giá niêm yết/khoảng giá và lượt đánh giá. |
| F05 | Xem chi tiết dịch vụ & sản phẩm | Hiển thị thông tin chi tiết: mô tả, quy trình spa, thành phần sản phẩm, bảng giá tham chiếu. | Khách chưa đăng nhập, Chủ nuôi | Cao | - Hiển thị chi tiết mô tả, hình ảnh chất lượng cao.<br>- Đối với sản phẩm: chọn số lượng. Đối với dịch vụ: có nút "Đặt lịch ngay". |
| F06 | Tìm kiếm & Lọc | Tìm kiếm theo từ khóa tên dịch vụ/sản phẩm; Lọc theo loại (dịch vụ/sản phẩm), danh mục, khoảng giá, loài thú cưng (Chó/Mèo), điểm đánh giá. | Khách chưa đăng nhập, Chủ nuôi | Cao | - Trả về kết quả chính xác theo từ khóa.<br>- Lọc tức thì hoặc bấm áp dụng bộ lọc mượt mà, không lỗi trang.<br>- Có ít nhất 5 bộ lọc và kết hợp được nhiều bộ lọc cùng lúc. |
| F07 | Xem báo giá tự động | Hệ thống tự tính giá dịch vụ dựa trên Loài, Cân nặng và Độ dài lông từ hồ sơ bé hoặc do khách nhập. | Khách chưa đăng nhập, Chủ nuôi | Cao | - Báo giá thay đổi tương ứng theo công thức khi đổi chỉ số cân nặng/lông.<br>- Hiển thị minh bạch các khoản chi tiết cấu thành giá. |
| F08 | Chọn giờ trống & Giữ chỗ | Khách chọn Groomer (cụ thể hoặc "Bất kỳ" để hệ thống tự gán), ngày đặt, xem khung giờ trống khả dụng; hệ thống giữ chỗ 10 phút từ lúc khách bấm Đặt hàng (F10). | Chủ nuôi | Cao | - Không cho phép chọn các khung giờ đã có người đặt hoặc quá giờ.<br>- Giữ chỗ 10 phút kể từ lúc bấm Đặt hàng: giờ đang giữ không hiển thị là trống với khách khác; hai khách cùng đặt một giờ thì chỉ một người giữ được, người kia được gợi ý giờ lân cận; quá 10 phút chưa thanh toán xong thì khung giờ tự động mở lại. |
| F09 | Quản lý giỏ hàng gộp | Giỏ hàng lưu trữ đồng thời cả Lịch hẹn dịch vụ (kèm thông tin bé, groomer, giờ hẹn) và Sản phẩm vật lý. | Chủ nuôi | Cao | - Cho phép xem, chỉnh sửa số lượng sản phẩm, xóa item khỏi giỏ.<br>- Hiển thị rõ ràng phân đoạn Dịch vụ và Sản phẩm kèm tổng tiền tạm tính. |
| F10 | Đặt hàng (Checkout) | Khách hàng nhập/chọn thông tin giao hàng, xem lại lịch hẹn và tick xác nhận điều kiện tiếp nhận, chọn phương thức thanh toán và bấm Đặt hàng (hệ thống kiểm tra lại giờ và giữ chỗ). | Chủ nuôi | Cao | - Tạo thành công Đơn hàng lưu vào DB với mã đơn duy nhất.<br>- Giờ đã bị người khác đặt thì không tạo đơn và báo khách.<br>- Chọn VNPay: đơn "Chờ thanh toán"; chọn trả tại tiệm hoặc COD: đơn "Đã xác nhận" ngay. |
| F11 | Thanh toán trực tuyến | Tích hợp Cổng thanh toán VNPay (môi trường Sandbox), bên cạnh thanh toán COD và Trả tại tiệm. COD chỉ áp dụng khi giỏ hàng có sản phẩm cần giao. | Chủ nuôi | Cao | - Điều hướng sang cổng VNPay đúng số tiền đơn hàng.<br>- Nhận kết quả IPN/ReturnURL: thanh toán thành công thì đơn "Đã xác nhận"; thất bại thì báo và đơn vẫn "Chờ thanh toán" cho đến hết 10 phút giữ chỗ, sau đó "Đã hủy". |
| F12 | Theo dõi & Hủy đơn | Khách xem lịch sử đơn hàng, trạng thái xử lý (Chờ thanh toán, Đã xác nhận, Đã check-in, Đang thực hiện, Sẵn sàng đón, Hoàn tất, Đã hủy, Không đến) và hủy lịch. | Chủ nuôi | Cao | - Cho phép hủy lịch hẹn/đơn hàng nếu chưa đến hạn quy định (trước giờ hẹn tối thiểu 12 tiếng).<br>- Cập nhật trạng thái và giải phóng khung giờ làm việc của Groomer. |
| F13 | Quản lý dịch vụ & sản phẩm | Màn hình Admin thực hiện thêm, sửa, xóa (CRUD), ẩn/hiện dịch vụ và sản phẩm. | Admin | Cao | - Cho phép tải ảnh đại diện sản phẩm/dịch vụ.<br>- Đặt quy tắc tính giá cơ bản cho từng loại dịch vụ. |
| F14 | Quản lý groomer & Lịch làm việc | Admin thêm thông tin Groomer, phân ca làm việc, thiết lập ngày nghỉ và khung giờ phục vụ. | Admin | Cao | - Tránh xếp trùng ca cho 1 Groomer.<br>- Lịch làm việc của Groomer làm dữ liệu đầu vào cho F08. |
| F15 | Quản lý đơn & Lịch hẹn | Admin xem danh sách tất cả lịch hẹn/đơn hàng, lọc theo trạng thái, ngày đặt, cập nhật trạng thái đơn, check-in và điều chỉnh giá nếu tình trạng thực tế của bé khác khai báo, tạo lịch nhanh tại quầy cho khách đến trực tiếp. | Admin | Cao | - Giao diện trực quan xem lịch hẹn theo ngày/tuần.<br>- Cập nhật trạng thái đúng trình tự: Đã xác nhận → Đã check-in → Đang thực hiện → Sẵn sàng đón → Hoàn tất (hoặc Không đến/Đã hủy).<br>- Điều chỉnh giá phải được khách xác nhận trước khi thực hiện; lịch tạo tại quầy không trùng lịch khác. |

---

### Đợt 2 – Hoàn thiện

| Mã YC | Tên chức năng | Mô tả chức năng | Người sử dụng | Ưu tiên | Tiêu chí nghiệm thu |
| :---: | :--- | :--- | :---: | :---: | :--- |
| F16 | Quản lý & Áp dụng Voucher | Admin tạo mã giảm giá (theo %, theo số tiền cố định, đơn tối thiểu); Khách áp mã tại giỏ hàng/checkout. | Admin, Chủ nuôi | Cao | - Kiểm tra điều kiện hiệu lực mã (mã tồn tại, còn hiệu lực, số lượt dùng, giá trị đơn tối thiểu, mức giảm).<br>- Tự động trừ tiền chính xác vào tổng đơn hàng. |
| F17 | Tính phí giao hàng | Tính phí vận chuyển tự động cho các sản phẩm vật lý theo bảng phí cố định 2 khu vực (nội thành, ngoại thành TP.HCM). | Chủ nuôi | Cao | - Hiển thị phí ship rõ ràng trước khi thanh toán.<br>- Đơn hàng chỉ có Dịch vụ (đến tiệm) thì phí ship = 0 VNĐ. |
| F18 | Đánh giá dịch vụ & sản phẩm | Khách hàng đã hoàn thành đơn có thể gửi chấm điểm sao (1-5★) và để lại bình luận. | Chủ nuôi | Trung bình | - Chỉ tài khoản đã mua/sử dụng dịch vụ thành công mới được đánh giá.<br>- Tính điểm trung bình hiển thị trên trang chi tiết. |
| F19 | Trang chủ | Hiển thị giao diện trang chủ sinh động: Banner nổi bật, Dịch vụ hot, Sản phẩm bán chạy, Báo giá nhanh, Feedback. | Khách chưa đăng nhập, Chủ nuôi | Cao | - Giao diện bắt mắt, thời gian tải trang nhanh (< 2s).<br>- Điều hướng nhanh đến các trang đặt lịch và cửa hàng. |
| F20 | Xem Dashboard | Admin xem 5 chỉ số thống kê: tổng doanh thu, số đơn hàng, sản phẩm bán chạy, sản phẩm chờ giao, số khách hàng; kèm biểu đồ doanh thu theo thời gian. | Admin | Cao | - Hiển thị biểu đồ trực quan sử dụng Chart.js.<br>- Lọc dữ liệu thống kê theo Ngày / Tuần / Tháng. |
| F21 | Lập phiếu kết quả grooming | Sau khi làm xong dịch vụ, Admin lập phiếu ghi nhận tình trạng của bé (da, lông, tai, móng, răng, ghi chú cho chủ). | Admin, Chủ nuôi | Trung bình | - Lưu phiếu kết quả gắn liền với mã lịch hẹn.<br>- Khách hàng xem được phiếu trong lịch sử làm đẹp của bé. |

---

### Đợt 3 – Điểm sáng tạo

| Mã YC | Tên chức năng | Mô tả chức năng | Người sử dụng | Ưu tiên | Tiêu chí nghiệm thu |
| :---: | :--- | :--- | :---: | :---: | :--- |
| F22 | Xem lộ trình chăm sóc cá nhân hóa | Tự động phân tích hồ sơ bé (loài, giống, chu kỳ cắt lông/tắm) để đề xuất Lộ trình chăm sóc định kỳ và chi phí dự tính. | Khách chưa đăng nhập, Chủ nuôi | Thấp / Sáng tạo | - Gợi ý chu kỳ grooming phù hợp theo loài/giống, mang tính tham khảo (VD: Poodle cần cắt tỉa mỗi 3-4 tuần).<br>- Hiển thị mốc thời gian nhắc lịch làm đẹp tiếp theo và chi phí dự kiến theo tháng. |

## 5. Yêu cầu phi chức năng
- *Giao diện đáp ứng:* Hiển thị tốt và tự động tương thích trên các thiết bị (Desktop, Tablet, Mobile) bằng Bootstrap 5.
- *Kiểm tra dữ liệu:* Dữ liệu đầu vào (biểu mẫu đăng ký, thông tin thú cưng, đặt lịch) được kiểm tra tính hợp lệ trước khi xử lý.
- *Bảo mật & Phân quyền:* Phân quyền chặt chẽ giữa Khách hàng và Admin bằng ASP.NET Core Identity; mật khẩu người dùng được mã hóa an toàn.
- *Hiệu năng & Xử lý lịch:* Thời gian phản hồi trang dưới 2 giây; đảm bảo cơ chế giữ chỗ 10 phút và chống trùng lịch hẹn của Groomer.
- *Quản lý mã nguồn:* Tổ chức mã nguồn ASP.NET Core MVC rõ ràng, đúng chuẩn, dễ bảo trì và quản lý tiến độ qua GitHub.
- *Bảo mật và kiểm thử:* kiểm tra chống XSS, SQL Injection, CSRF và truy cập dữ liệu của người khác (IDOR); có test case cho các chức năng chính, dữ liệu biên và trường hợp lỗi.

## 6. Giới hạn và giả định
### Giới hạn thời gian: 
- Toàn bộ dự án được phân tích, thiết kế, lập trình và kiểm thử trong khuôn khổ thời lượng môn học (từ 15/10 đến 15/12/2026, sản phẩm hoàn thành trước 10/12).
### Giới hạn công nghệ & Tài nguyên:
- Sử dụng cơ sở dữ liệu *SQLite* trong giai đoạn phát triển nhằm tạo thuận lợi cho việc đóng gói mã nguồn, migration và chạy demo đồng bộ giữa các thành viên.
- Tích hợp thanh toán trực tuyến sử dụng thẻ thử nghiệm trên môi trường *VNPay Sandbox*.
### Giả định kinh doanh:
- Giả định hệ thống vận hành cho 01 cửa hàng duy nhất tại khu vực TP.HCM; cước phí giao hàng cố định theo 2 phân vùng nội thành và ngoại thành TP.HCM.
- Khách hàng có trách nhiệm đưa thú cưng đến tiệm đúng giờ đã hẹn; nếu trễ quá 15 phút mà không báo trước, cửa hàng có quyền hủy phiên đặt chỗ để phục vụ khách hàng tiếp theo. 
