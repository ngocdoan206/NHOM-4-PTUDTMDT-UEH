# SỬ DỤNG AI 1 PHÂN TÍCH YÊU CẦU
## Quy ước nhãn:
- **[BB]** là yêu cầu bắt buộc: thiếu thì hệ thống không giải quyết được vấn đề cốt lõi.
- **[SAU]** là có thể phát triển sau.
- **[XM]** là đề xuất cần nhóm xác minh với chủ tiệm hoặc khách trước khi chốt.

Giả định: hệ thống ở mức sản phẩm chạy được (web responsive), chưa phải hệ thống vận hành thật quy mô lớn. 

## 1. Mục tiêu và phạm vi
**Mục tiêu kinh doanh**
- Chuyển việc đặt lịch từ nhắn tin/gọi điện sang đặt lịch trực tuyến theo khung giờ trống. **[BB]** Đây là vấn đề lớn nhất và là nguồn doanh thu chính.
- Giá minh bạch ngay từ trước khi đặt: khách thấy khoảng giá theo cân nặng và loại lông, phụ phí được nêu rõ. **[BB]** Nó giải quyết nỗi lo "hóa đơn cao hơn dự kiến".
- Cho chủ nuôi biết thú cưng đang ở bước nào và kết quả sau dịch vụ. **[BB]** Nó giải quyết nỗi lo khi giao thú.
- Giảm trùng lịch và giúp tiệm thấy giờ vắng/giờ kín. **[BB]**
- Hướng dẫn chăm sóc và nhắc lịch định kỳ cho chủ nuôi mới, đồng thời kéo khách quay lại. **[BB]**
- Bán đồ thú cưng (phụ). **[SAU]**
- Chỉ số nên đo **[XM]**: tỷ lệ lịch đặt qua hệ thống, số lần trùng lịch/tháng, thời gian từ lúc khách hỏi đến lúc lịch được xác nhận, tỷ lệ khách quay lại.

**Trong phạm vi:** một chi nhánh tại HCM, chó và mèo, đặt lịch dịch vụ tại tiệm, hồ sơ thú cưng, báo giá, quản lý lịch groomer, cập nhật trạng thái, bán sản phẩm ở mức cơ bản.
**Ngoài phạm vi (phiên bản đầu):** nhiều chi nhánh, dịch vụ tại nhà, ứng dụng di động riêng, thú cưng khác ngoài chó mèo, vận chuyển đơn hàng, chăm sóc thú y/y tế, đưa đón thú. 

## 2. Nhóm người dùng và quyền hạn

| Nhóm | Quyền chính | Nhãn |
| --- | --- | --- |
| Khách vãng lai (chưa đăng nhập) | Xem dịch vụ, bảng giá, nội dung hướng dẫn, sản phẩm. | **[BB]** |
| Chủ nuôi (đã đăng ký) | Quản lý hồ sơ nhiều thú; đặt/hủy/dời lịch; xem trạng thái, ảnh, ghi chú sau dịch vụ; đánh giá dịch vụ; xem lịch sử; mua sản phẩm. | **[BB]** |
| Groomer/nhân viên | Xem lịch của mình; check-in/check-out; cập nhật trạng thái, ảnh, ghi chú; ghi nhận phụ phí; xem đánh giá từ khách hàng | **[BB]** |
| Chủ tiệm/quản lý | Toàn quyền: cấu hình dịch vụ, giá, ca làm, groomer, sản phẩm; duyệt/sửa/hủy lịch; xem báo cáo; quản lý tài khoản nhân viên; xem đánh giá từ khách hàng và rating nhân viên. | **[BB]** |

*Với tiệm tự vận hành, chủ tiệm thường kiêm lễ tân nên chưa tách vai trò này (bốn vai trò đã đủ cho phiên bản đầu).*
**Quy tắc phân quyền bắt buộc:** chủ nuôi chỉ thấy dữ liệu của mình; groomer chỉ sửa trạng thái các lịch được giao; chỉ chủ tiệm đổi giá và cấu hình. **[BB]**

## 3. Danh sách chức năng

**A. Tài khoản và hồ sơ thú cưng**
| Chức năng | Nhãn | Cơ sở |
| --- | --- | --- |
| Đăng ký/đăng nhập bằng email hoặc SĐT. | **[BB]** | Gắn lịch và lịch sử với một người |
| Hồ sơ thú cưng: loài, giống, tuổi, cân nặng, loại/độ dài lông, tính cách, ghi chú đặc biệt; nhiều thú/tài khoản | **[BB]** | Là dữ liệu đầu vào để tính giá và thời lượng; phục vụ nhóm nuôi từ 2 thú. |
| Đặt lịch không cần tài khoản (chỉ SĐT) | **[XM]** | Giảm rào cản nhưng khó gắn lịch sử; hỏi khách có chịu đăng ký không |

**B. Dịch vụ và giá**
| Chức năng | Nhãn | Cơ sở |
| --- | --- | --- |
| Danh mục dịch vụ, thời lượng, bảng giá theo bậc cân nặng/loại lông | **[BB]** | Giá là điểm yếu số 1 |
| Ước tính giá trước khi đặt từ hồ sơ thú, hiển thị khoảng giá và điều kiện phụ phí | **[BB]** | Giải quyết “giá niêm yết một đằng, hóa đơn một nẻo” |
| Ghi nhận phụ phí phát sinh và in hóa đơn chi tiết từng khoản | **[BB]** | Minh bạch sau dịch vụ |
| Chủ nuôi xác nhận phụ phí phát sinh trong hệ thống trước khi làm | **[SAU]** | Giá trị cao nhưng cần quy trình và thông báo thời gian thực; giai đoạn đầu nhân viên gọi/nhắn xác nhận rồi ghi lại |
| Quy tắc phụ phí cụ thể (lông rối, thú hung dữ, cân nặng vượt bậc) | **[XM]** | Chỉ chủ tiệm biết; thiếu thì công cụ ước giá sai |

**C. Đặt lịch**
| Chức năng | Nhãn | Cơ sở |
| --- | --- | --- |
| Xem khung giờ trống theo ngày và theo groomer | **[BB]** | "Không biết giờ trống đúng groomer" |
| Đặt 1 hoặc nhiều thú trong cùng một lần đặt | **[BB]** | Nhóm khách đích có 2+ thú; hệ thống cộng thời lượng |
| Chặn trùng lịch (khóa slot khi đang đặt) | **[BB]** | Trùng lịch là vấn đề của tiệm |
| Xác nhận lịch tự động khi slot hợp lệ | **[XM]** | Đỡ việc cho tiệm nhưng chủ tiệm có thể muốn duyệt thủ công |
| Hủy/dời lịch theo chính sách | **[BB]** | Phải có chức năng; nội dung chính sách (hạn hủy, phí) |
| Đặt cọc cho dịp lễ/Tết | **[SAU]** | Giảm no-show, nhưng cần cổng thanh toán và chính sách rõ |
| Email xác nhận và nhắc lịch | **[BB]** | Rẻ, ít rủi ro tích hợp |
| Nhắc qua Zalo/SMS | **[SAU]** | Hợp thói quen khách VN nhưng phát sinh chi phí và thủ tục tích hợp |

**D. Vận hành tiệm**
| Chức năng | Nhãn | Cơ sở |
| --- | --- | --- |
| Lịch theo groomer/ngày; ca làm và ngày nghỉ | **[BB]** | Cốt lõi của "xếp lịch thủ công" |
| Check-in: ghi cân nặng/tình trạng lông thực tế, điều chỉnh giá nếu lệch | **[BB]** | Điểm phát sinh phụ phí |
| Cập nhật trạng thái (đã nhận → đang tắm → sấy/cắt → xong → sẵn sàng đón) | **[BB]** | Rẻ mà giảm được nỗi lo; chỉ cần đổi trạng thái |
| Ảnh trước/sau và ghi chú sau dịch vụ | **[BB]** | Trả lời “sau dịch vụ bé thế nào”; chỉ upload ảnh + ô ghi chú |
| Báo cáo cơ bản: số lịch, tỷ lệ lấp đầy theo khung giờ, no-show, doanh thu | **[BB]** | Để cân đối giờ vắng/kín; chưa cần biểu đồ phức tạp |

**E. Hướng dẫn chăm sóc**
| Chức năng | Nhãn | Cơ sở |
| --- | --- | --- |
| Nội dung chu kỳ tắm/cắt tỉa theo loài, giống, loại lông | **[BB]** | Giải quyết không rõ ăn bao nhiêu, bao lâu tắm hoặc cắt tỉa một lần |
| Lượng ăn tham khảo | **[XM]** | Phụ thuộc loại thức ăn, độ tuổi, sức khỏe; sai có thể gây hại. Nếu làm thì ghi "tham khảo" và dẫn nguồn, hoặc bỏ |
| Nhắc lịch grooming kế tiếp theo chu kỳ sau mỗi lịch hoàn thành | **[BB]** | Đơn giản và kéo khách quay lại |
| Ước tính chi phí grooming hàng tháng (số thú × chu kỳ × giá) | **[BB]** | Tái dùng dữ liệu giá; trả lời “tốn bao nhiêu mỗi tháng” |
| Ước tính chi phí thức ăn và vật dụng | **[SAU]** | Cần dữ liệu ngoài phạm vi tiệm |

**F. Bán sản phẩm (phần phụ)**
| Chức năng | Nhãn | Cơ sở |
| --- | --- | --- |
| Danh mục và trang chi tiết sản phẩm | **[XM]** | Có bắt buộc theo yêu cầu "thương mại điện tử" của đề tài không? |
| Đặt hàng, nhận/thanh toán tại tiệm hoặc mua kèm khi đặt lịch | **[XM]** | Tối thiểu hóa vận chuyển và tồn kho |
| Giao hàng, mã giảm giá, quản lý tồn kho đầy đủ | **[SAU]** | Phức tạp, không thuộc lõi |

**G. Thanh toán và quản trị**
| Chức năng | Nhãn | Cơ sở |
| --- | --- | --- |
| Ghi nhận thanh toán tại tiệm (tiền mặt/chuyển khoản/QR) | **[BB]** | Không phụ thuộc bên thứ ba |
| Cổng thanh toán trực tuyến | **[SAU]** | Cần đăng ký merchant, thời gian kiểm thử |
| Quản lý tài khoản, phân quyền, dịch vụ, giá, sản phẩm | **[BB]** | Không có thì mọi thay đổi phải nhờ lập trình viên |

## 4. Quy trình nghiệp vụ chính

**4.1 Tư vấn và báo giá → đặt lịch**
1. Khách tạo hồ sơ thú (hoặc chọn thú đã có) và chọn dịch vụ.
2. Hệ thống hiển thị khoảng giá và điều kiện phụ phí.
3. Khách chọn ngày và khung giờ trống (có thể chọn groomer).
4. Hệ thống tính tổng thời lượng, giữ chỗ và chặn trùng.
5. Lịch được xác nhận tự động hoặc chờ tiệm duyệt.
6. Hệ thống gửi email xác nhận.

**4.2 Ngày dịch vụ**
1. Khách đến, nhân viên check-in và ghi tình trạng của pet thực tế (cân nặng, lông, bệnh nền,…).
2. Nếu lệch khỏi báo giá, nhân viên ghi phụ phí và báo khách xác nhận (ghi lại).
3. Groomer thực hiện và cập nhật trạng thái theo từng bước.
4. Hoàn tất: tải ảnh, ghi chú.
5. Khách thanh toán, hệ thống chốt hóa đơn chi tiết và trả thú.

**4.3 Hủy/dời/trễ giờ/no-show**
- Khách hủy hoặc dời trong hạn → slot được giải phóng.
- Quá hạn → áp dụng chính sách phí **[XM]**.
- Không đến → đánh dấu no-show; nhiều lần thì có thể khóa acc.

**4.4 Sau dịch vụ**
- Cho phép KH đánh giá chất lượng dịch vụ.
- Hệ thống tính ngày đề xuất cho lần sau theo chu kỳ.
- Gửi nhắc trước hạn; khách bấm vào là sang bước đặt lịch.

**4.5 Mua sản phẩm**
- Chọn sản phẩm → đặt → nhận/thanh toán tại tiệm → trừ tồn kho (nếu có).

**4.6 Vận hành định kỳ của chủ tiệm**
- Xem báo cáo lấp đầy → điều chỉnh ca làm hoặc khung giờ mở → giá/ưu đãi giờ vắng.

## 5. Yêu cầu phi chức năng

| Nhóm | Yêu cầu | Nhãn |
| --- | --- | --- |
| Bảo mật | HTTPS, băm mật khẩu, phân quyền theo vai trò, chống truy cập dữ liệu người khác | **[BB]** |
| Dữ liệu cá nhân | Chỉ thu thập dữ liệu cần thiết (SĐT, thông tin thú), có thông báo mục đích; ảnh thú chỉ hiển thị cho chủ của nó. Nhóm nên đối chiếu quy định bảo vệ dữ liệu cá nhân hiện hành của VN | **[BB]** |
| Toàn vẹn đặt lịch | Hai người không thể đặt cùng một slot (xử lý đồng thời) | **[BB]** |
| Dùng được trên điện thoại | Giao diện responsive; khách chủ yếu đặt qua điện thoại | **[BB]** |
| Dễ dùng | Người mới nuôi dùng được không cần hướng dẫn; đặt lịch tối đa vài bước | **[BB]** |
| Địa phương hóa | Tiếng Việt, VND, múi giờ VN | **[BB]** |
| Hiệu năng | Trang chính và xem slot phản hồi nhanh ở mức chấp nhận được | **[BB]** |
| Sao lưu | Sao lưu dữ liệu định kỳ | **[BB]** |
| Tính sẵn sàng/mở rộng | Cam kết uptime cao, mở rộng đa chi nhánh | **[SAU]** |

## 6. Chức năng nên hoàn thành ở phiên bản đầu
- [ ] 1. Tài khoản, phân quyền 4 vai trò
- [ ] 2. Hồ sơ nhiều thú
- [ ] 3. Danh mục dịch vụ và bảng giá theo bậc
- [ ] 4. Ước tính giá trước khi đặt
- [ ] 5. Đặt lịch theo slot + chặn trùng + nhiều thú
- [ ] 6. Hủy/dời lịch
- [ ] 7. Lịch groomer, ca làm
- [ ] 8. Check-in, phụ phí, hóa đơn chi tiết
- [ ] 9. Cập nhật trạng thái + ghi chú sau dịch vụ (+ ảnh)
- [ ] 10. Email xác nhận/nhắc lịch
- [ ] 11. Nội dung chu kỳ chăm sóc + nhắc lần sau
- [ ] 12. Đánh giá chất lượng dịch vụ 
- [ ] 13. Báo cáo cơ bản

## 7. Chức năng nâng cao
- [ ] Chủ nuôi xác nhận phụ phí trực tuyến
- [ ] Nhắc lịch qua Zalo/SMS
- [ ] Cổng thanh toán và đặt cọc dịp lễ
- [ ] Gói/combo dịch vụ, thẻ thành viên, tích điểm
- [ ] Giá hoặc ưu đãi theo giờ vắng/kín, chỉ nên làm khi có dữ liệu lấp đầy từ báo cáo cơ bản
- [ ] Hồ sơ tiêm phòng và nhắc lịch tiêm; tiệm không phải phòng khám thú y nên cần xem có phù hợp không
- [ ] Quản lý tồn kho và giao hàng đầy đủ
- [ ] Chatbot tư vấn, gợi ý dịch vụ bằng AI; rủi ro đưa ra lời khuyên sai về chăm sóc
- [ ] Đa chi nhánh, ứng dụng di động riêng

## 8. Rủi ro và cách giảm thiểu

| Rủi ro | Ảnh hưởng | Giảm thiểu |
| --- | --- | --- |
| Phạm vi phình to (muốn làm đủ mọi pain point) | Không kịp 7 tuần | Chốt MVP ở mục 6 từ tuần 1; có danh sách cắt giảm sẵn |
| Đặt lịch + chống trùng phức tạp hơn dự kiến | Lỗi lõi | Làm sớm nhất; kiểm thử đặt đồng thời; tách chặn trùng thành module riêng |
| Thiếu dữ liệu giá thật và quy tắc phụ phí | Ước giá sai, khách mất tin | Khảo sát giá các dịch vụ chăm sóc thú cưng; hiển thị khoảng giá, không hiển thị giá cố định |
| Khách không muốn đăng ký tài khoản | Giảm tỷ lệ đặt | Kiểm tra bằng khảo sát nhanh; cân nhắc đặt lịch chỉ với SĐT |
| Tranh chấp về phụ phí/hủy lịch | Mất khách | Chính sách hiển thị rõ lúc đặt; hóa đơn chi tiết; ghi nhận xác nhận phụ phí |
| Dữ liệu cá nhân và ảnh thú bị lộ | Pháp lý, mất uy tín | Phân quyền chặt, HTTPS, thu thập tối thiểu |
| Nội dung chăm sóc sai (đặc biệt lượng ăn) | Có thể hại thú | Chỉ đăng nội dung có nguồn; ghi “tham khảo”; bỏ phần lượng ăn nếu không kiểm chứng được |
| Phụ thuộc bên thứ ba (email, thanh toán, Zalo) | Trễ tiến độ | MVP chỉ dùng email; hoãn thanh toán và Zalo |
| 7 thành viên khó phối hợp, năng lực kỹ thuật không đều | Chậm, lỗi tích hợp | Phân vai rõ, chia module độc lập, họp ngắn hàng tuần, đánh giá năng lực thật ở tuần 1 |
| Không có người dùng thật để kiểm chứng | Không biết giải pháp có hiệu quả | Thử nghiệm với 5–10 khách quen; nếu là bản demo thì dùng kịch bản kiểm thử có dữ liệu mô phỏng |
