# NHẬT KÝ SỬ DỤNG AI – NHÓM 4 PAWCARE

## Quy ước sử dụng

1. Mỗi buổi một phần lớn; mỗi người một mục riêng trong mỗi buổi, chỉ viết trong mục của mình.
2. Mã mỗi lần ghi có dạng `B2-TN-01` (B + số buổi + tên mình + số thứ tự).
3. Ghi ngay lúc dùng AI, đi qua nhánh riêng và pull request; commit dạng `docs: ghi nhật ký AI B2-TN-01`.
4. Mỗi lần ghi gồm công cụ, bước đề bài, mục đích và prompt nguyên văn.

## Mục lục

- [Buổi 1](#buổi-1)
- [Buổi 2](#buổi-2)

# BUỔI 1

> Mã của Buổi 1: AI 1 (Claude) là B1-01; AI 2 (ChatGPT) là B1-02.

## SỬ DỤNG AI 1 (CLAUDE) PHÂN TÍCH YÊU CẦU
## Prompt
Bạn là chuyên gia phân tích nghiệp vụ cho dự án thương mại điện tử.
Thông tin dự án:

* Tên dự án: PawCare
* Sản phẩm hoặc dịch vụ: tiệm spa và grooming thú cưng, một chi nhánh, tự vận hành tại HCM. Đặt lịch dịch vụ là phần chính, bán đồ cho thú cưng là phần phụ.
* Khách hàng mục tiêu: Chủ nuôi chó mèo, chủ yếu dưới 45 tuổi, mới nuôi hoặc ít kinh nghiệm, đang đặt lịch qua tin nhắn hoặc hotline; Gia đình nuôi từ 2 thú trở lên
* Vấn đề kinh doanh:

Không biết chăm đúng, khó dự tính chi phí: Không rõ ăn bao nhiêu, bao lâu tắm hoặc cắt tỉa một lần, tốn bao nhiêu mỗi tháng.
Giá khó đoán: Giá niêm yết một đằng, phụ phí phát sinh theo lông và cân nặng, hóa đơn cuối cao hơn dự kiến
Đặt lịch thủ công: Phải nhắn tin hoặc gọi, không biết giờ trống đúng groomer, chờ xác nhận, dịp lễ tết dễ kín
Lo lắng khi giao thú cho người khác: Không biết sau dịch vụ bé thế nào
Xếp lịch thủ công (của tiệm): Dễ trùng lịch, khó cân đối giờ vắng và giờ kín.

* Website tham khảo: [Pet Mart Cửa Hàng Thú Cưng | Hà Nội, TP.HCM, Đà Nẵng, Hải Phòng](https://www.petmart.vn/)
[Dịch Vụ Grooming Cắt Tỉa Lông Chó Mèo tại TPHCM](https://dogparadise.vn/blogs/dich-vu/dich-vu-grooming-cat-tia-long-cho-meo)
[Mobile Pet Grooming Near You - Book Groomit Today](https://www.groomit.me/)
* Thời gian thực hiện: 7 tuần.
* Quy mô nhóm: 7 thành viên.

  - *Kết quả khảo sát ba website:*
  1. Pet Mart: có tìm kiếm và danh mục lớn, mua hàng trực tuyến; hệ thống lớn có thể vượt nhu cầu của một tiệm nhỏ.
  2. Dog Paradise: công khai bảng giá và quy trình grooming, nhưng bảng giá dạng ảnh khó tra cứu; trang khuyến khích liên hệ hoặc đặt trước.
  3. Groomit (Mỹ): đặt lịch số hóa, tra giá theo đặc điểm thú cưng và khu vực; mô hình tại nhà/xe lưu động khó áp dụng cho một tiệm đơn lẻ.

Hãy đề xuất:

1. Mục tiêu và phạm vi dự án.
2. Các nhóm người dùng và quyền hạn.
3. Danh sách chức năng cần có.
4. Quy trình nghiệp vụ chính.
5. Yêu cầu phi chức năng.
6. Các chức năng nên hoàn thành ở phiên bản đầu tiên.
7. Các chức năng nâng cao có thể bổ sung.
8. Rủi ro khi triển khai và cách giảm thiểu.

Phân biệt rõ:

* Yêu cầu bắt buộc.
* Yêu cầu có thể phát triển sau.
* Đề xuất cần nhóm xác minh thêm.

Không giả định nhóm có đủ thời gian hoặc năng lực để triển khai tất cả chức năng. Hãy giải thích cơ sở của từng đề xuất.
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


# SỬ DỤNG AI 2 (ChatGPT) ĐỂ PHẢN BIỆN VÀ ĐÁNH GIÁ

## Prompt
Bạn là người phản biện độc lập cho một dự án website thương mại điện tử do nhóm sinh viên thực hiện trong một học phần. 

Tôi sẽ cung cấp thông tin dự án: 

- **Tên dự án:** PawCare 
- **Sản phẩm hoặc dịch vụ:** Tiệm spa và grooming thú cưng, một chi nhánh, tự vận hành tại HCM. Đặt lịch dịch vụ là phần chính, bán đồ cho thú cưng là phần phụ. 
- **Khách hàng mục tiêu:** Chủ nuôi chó mèo, chủ yếu dưới 45 tuổi, mới nuôi hoặc ít kinh nghiệm, đang đặt lịch qua tin nhắn hoặc hotline; Gia đình nuôi từ 2 thú trở lên.
- **Vấn đề kinh doanh:**  
  - *Không biết chăm đúng, khó dự tính chi phí:* Không rõ ăn bao nhiêu, bao lâu tắm hoặc cắt tỉa một lần, tốn bao nhiêu mỗi tháng. 
  - *Giá khó đoán:* Giá niêm yết một đằng, phụ phí phát sinh theo lông và cân nặng, hóa đơn cuối cao hơn dự kiến.
  - *Đặt lịch thủ công:* Phải nhắn tin hoặc gọi, không biết giờ trống đúng groomer, chờ xác nhận, dịp lễ tết dễ kín.
  - *Lo lắng khi giao thú cho người khác:* Không biết sau dịch vụ bé thế nào.
  - *Xếp lịch thủ công (của tiệm):* Dễ trùng lịch, khó cân đối giờ vắng và giờ kín.  
- **Website tham khảo:** 
  - [Pet Mart Cửa Hàng Thú Cưng | Hà Nội, TP.HCM, Đà Nẵng, Hải Phòng](https://www.petmart.vn/) 
  - [Dịch Vụ Grooming Cắt Tỉa Lông Chó Mèo tại TPHCM](https://dogparadise.vn/blogs/dich-vu/dich-vu-grooming-cat-tia-long-cho-meo) 
  - [Mobile Pet Grooming Near You - Book Groomit Today](https://www.groomit.me/) 
- **Thời gian thực hiện:** 7 tuần 
- **Quy mô nhóm:** 7 thành viên 

Dưới đây là danh sách yêu cầu do một công cụ AI khác đề xuất: 

**Quy ước nhãn:**
- `[BB]` là yêu cầu bắt buộc: thiếu thì hệ thống không giải quyết được vấn đề cốt lõi.
- `[SAU]` là có thể phát triển sau.
- `[XM]` là đề xuất cần nhóm xác minh với chủ tiệm hoặc khách trước khi chốt.

*Giả định:* Hệ thống ở mức sản phẩm chạy được (web responsive), chưa phải hệ thống vận hành thật quy mô lớn. 

### 1. Mục tiêu và phạm vi
**Mục tiêu kinh doanh**
1. Chuyển việc đặt lịch từ nhắn tin/gọi điện sang đặt lịch trực tuyến theo khung giờ trống. `[BB]` Đây là vấn đề lớn nhất và là nguồn doanh thu chính.
2. Giá minh bạch ngay từ trước khi đặt: khách thấy khoảng giá theo cân nặng và loại lông, phụ phí được nêu rõ. `[BB]` Nó giải quyết nỗi lo "hóa đơn cao hơn dự kiến".
3. Cho chủ nuôi biết thú cưng đang ở bước nào và kết quả sau dịch vụ. `[BB]` Nó giải quyết nỗi lo khi giao thú.
4. Giảm trùng lịch và giúp tiệm thấy giờ vắng/giờ kín. `[BB]`
5. Hướng dẫn chăm sóc và nhắc lịch định kỳ cho chủ nuôi mới, đồng thời kéo khách quay lại. `[BB]`
6. Bán đồ thú cưng (phụ). `[SAU]`

**Chỉ số nên đo `[XM]`:** Tỷ lệ lịch đặt qua hệ thống, số lần trùng lịch/tháng, thời gian từ lúc khách hỏi đến lúc lịch được xác nhận, tỷ lệ khách quay lại.
**Trong phạm vi:** Một chi nhánh tại HCM, chó và mèo, đặt lịch dịch vụ tại tiệm, hồ sơ thú cưng, báo giá, quản lý lịch groomer, cập nhật trạng thái, bán sản phẩm ở mức cơ bản.
**Ngoài phạm vi (phiên bản đầu):** Nhiều chi nhánh, dịch vụ tại nhà, ứng dụng di động riêng, thú cưng khác ngoài chó mèo, vận chuyển đơn hàng, chăm sóc thú y/y tế, đưa đón thú. 

### 2. Nhóm người dùng và quyền hạn
Với tiệm tự vận hành, chủ tiệm thường kiêm lễ tân nên chưa tách vai trò này (bốn vai trò đã đủ cho phiên bản đầu). 
Quy tắc phân quyền bắt buộc: chủ nuôi chỉ thấy dữ liệu của mình; groomer chỉ sửa trạng thái các lịch được giao; chỉ chủ tiệm đổi giá và cấu hình. `[BB]`

| Nhóm | Quyền chính | Nhãn |
| :--- | :--- | :--- |
| **Khách vãng lai** (chưa đăng nhập) | Xem dịch vụ, bảng giá, nội dung hướng dẫn, sản phẩm. | `[BB]` |
| **Chủ nuôi** (đã đăng ký) | Quản lý hồ sơ nhiều thú; đặt/hủy/dời lịch; xem trạng thái, ảnh, ghi chú sau dịch vụ; đánh giá dịch vụ; xem lịch sử; mua sản phẩm. | `[BB]` |
| **Groomer/nhân viên** | Xem lịch của mình; check-in/check-out; cập nhật trạng thái, ảnh, ghi chú; ghi nhận phụ phí; xem đánh giá từ khách hàng. | `[BB]` |
| **Chủ tiệm/quản lý** | Toàn quyền: cấu hình dịch vụ, giá, ca làm, groomer, sản phẩm; duyệt/sửa/hủy lịch; xem báo cáo; quản lý tài khoản nhân viên; xem đánh giá từ khách hàng và rating nhân viên. | `[BB]` |

### 3. Danh sách chức năng
**A. Tài khoản và hồ sơ thú cưng**
| Chức năng | Nhãn | Cơ sở |
| :--- | :--- | :--- |
| Đăng ký/đăng nhập bằng email hoặc SĐT. | `[BB]` | Gắn lịch và lịch sử với một người |
| Hồ sơ thú cưng: loài, giống, tuổi, cân nặng, loại/độ dài lông, tính cách, ghi chú; nhiều thú/tài khoản | `[BB]` | Là dữ liệu đầu vào để tính giá và thời lượng; phục vụ nhóm nuôi từ 2 thú. |
| Đặt lịch không cần tài khoản (chỉ SĐT) | `[XM]` | Giảm rào cản nhưng khó gắn lịch sử; hỏi khách có chịu đăng ký không |

**B. Dịch vụ và giá**
| Chức năng | Nhãn | Cơ sở |
| :--- | :--- | :--- |
| Danh mục dịch vụ, thời lượng, bảng giá theo bậc cân nặng/loại lông | `[BB]` | Giá là điểm yếu số 1 |
| Ước tính giá trước khi đặt từ hồ sơ thú, hiển thị khoảng giá và điều kiện phụ phí | `[BB]` | Giải quyết “giá niêm yết một đằng, hóa đơn một nẻo” |
| Ghi nhận phụ phí phát sinh và in hóa đơn chi tiết từng khoản | `[BB]` | Minh bạch sau dịch vụ |
| Chủ nuôi xác nhận phụ phí phát sinh trong hệ thống trước khi làm | `[SAU]` | Giá trị cao nhưng cần quy trình và thông báo thời gian thực; giai đoạn đầu nhân viên gọi/nhắn xác nhận rồi ghi lại |
| Quy tắc phụ phí cụ thể (lông rối, thú hung dữ, cân nặng vượt bậc) | `[XM]` | Chỉ chủ tiệm biết; thiếu thì công cụ ước giá sai |

**C. Đặt lịch**
| Chức năng | Nhãn | Cơ sở |
| :--- | :--- | :--- |
| Xem khung giờ trống theo ngày và theo groomer | `[BB]` | "Không biết giờ trống đúng groomer" |
| Đặt 1 hoặc nhiều thú trong cùng một lần đặt | `[BB]` | Nhóm khách đích có 2+ thú; hệ thống cộng thời lượng |
| Chặn trùng lịch (khóa slot khi đang đặt) | `[BB]` | Trùng lịch là vấn đề của tiệm |
| Xác nhận lịch tự động khi slot hợp lệ | `[XM]` | Đỡ việc cho tiệm nhưng chủ tiệm có thể muốn duyệt thủ công |
| Hủy/dời lịch theo chính sách | `[BB]` | Phải có chức năng; nội dung chính sách (hạn hủy, phí) |
| Đặt cọc cho dịp lễ/Tết | `[SAU]` | Giảm no-show, nhưng cần cổng thanh toán và chính sách rõ |
| Email xác nhận và nhắc lịch | `[BB]` | Rẻ, ít rủi ro tích hợp |
| Nhắc qua Zalo/SMS | `[SAU]` | Hợp thói quen khách VN nhưng phát sinh chi phí và thủ tục tích hợp |

**D. Vận hành tiệm**
| Chức năng | Nhãn | Cơ sở |
| :--- | :--- | :--- |
| Lịch theo groomer/ngày; ca làm và ngày nghỉ | `[BB]` | Cốt lõi của "xếp lịch thủ công" |
| Check-in: ghi cân nặng/tình trạng lông thực tế, điều chỉnh giá nếu lệch | `[BB]` | Điểm phát sinh phụ phí |
| Cập nhật trạng thái (đã nhận → đang tắm → sấy/cắt → xong → sẵn sàng đón) | `[BB]` | Rẻ mà giảm được nỗi lo; chỉ cần đổi trạng thái |
| Ảnh trước/sau và ghi chú sau dịch vụ | `[BB]` | Trả lời “sau dịch vụ bé thế nào”; chỉ upload ảnh + ô ghi chú |
| Báo cáo cơ bản: số lịch, tỷ lệ lấp đầy theo khung giờ, no-show, doanh thu | `[BB]` | Để cân đối giờ vắng/kín; chưa cần biểu đồ phức tạp |

**E. Hướng dẫn chăm sóc**
| Chức năng | Nhãn | Cơ sở |
| :--- | :--- | :--- |
| Nội dung chu kỳ tắm/cắt tỉa theo loài, giống, loại lông | `[BB]` | Giải quyết không rõ ăn bao nhiêu, bao lâu tắm hoặc cắt tỉa một lần |
| Lượng ăn tham khảo | `[XM]` | Phụ thuộc loại thức ăn, độ tuổi, sức khỏe; sai có thể gây hại. Nếu làm thì ghi "tham khảo" và dẫn nguồn, hoặc bỏ |
| Nhắc lịch grooming kế tiếp theo chu kỳ sau mỗi lịch hoàn thành | `[BB]` | Đơn giản và kéo khách quay lại |
| Ước tính chi phí grooming hàng tháng (số thú × chu kỳ × giá) | `[BB]` | Tái dùng dữ liệu giá; trả lời “tốn bao nhiêu mỗi tháng” |
| Ước tính chi phí thức ăn và vật dụng | `[SAU]` | Cần dữ liệu ngoài phạm vi tiệm |

**F. Bán sản phẩm (phần phụ)**
| Chức năng | Nhãn | Cơ sở |
| :--- | :--- | :--- |
| Danh mục và trang chi tiết sản phẩm | `[XM]` | Có bắt buộc theo yêu cầu "thương mại điện tử" của đề tài không? |
| Đặt hàng, nhận/thanh toán tại tiệm hoặc mua kèm khi đặt lịch | `[XM]` | Tối thiểu hóa vận chuyển và tồn kho |
| Giao hàng, mã giảm giá, quản lý tồn kho đầy đủ | `[SAU]` | Phức tạp, không thuộc lõi |

**G. Thanh toán và quản trị**
| Chức năng | Nhãn | Cơ sở |
| :--- | :--- | :--- |
| Ghi nhận thanh toán tại tiệm (tiền mặt/chuyển khoản/QR) | `[BB]` | Không phụ thuộc bên thứ ba |
| Cổng thanh toán trực tuyến | `[SAU]` | Cần đăng ký merchant, thời gian kiểm thử |
| Quản lý tài khoản, phân quyền, dịch vụ, giá, sản phẩm | `[BB]` | Không có thì mọi thay đổi phải nhờ lập trình viên |

### 4. Quy trình nghiệp vụ chính
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
1. Khách hủy hoặc dời trong hạn → slot được giải phóng.
2. Quá hạn → áp dụng chính sách phí `[XM]`.
3. Không đến → đánh dấu no-show; nhiều lần thì có thể khóa acc.

**4.4 Sau dịch vụ**
1. Cho phép KH đánh giá chất lượng dịch vụ.
2. Hệ thống tính ngày đề xuất cho lần sau theo chu kỳ.
3. Gửi nhắc trước hạn; khách bấm vào là sang bước đặt lịch.

**4.5 Mua sản phẩm** 
Chọn sản phẩm → đặt → nhận/thanh toán tại tiệm → trừ tồn kho (nếu có).

**4.6 Vận hành định kỳ của chủ tiệm** 
Xem báo cáo lấp đầy → điều chỉnh ca làm hoặc khung giờ mở → giá/ưu đãi giờ vắng.

### 5. Yêu cầu phi chức năng
| Nhóm | Yêu cầu | Nhãn |
| :--- | :--- | :--- |
| **Bảo mật** | HTTPS, băm mật khẩu, phân quyền theo vai trò, chống truy cập dữ liệu người khác | `[BB]` |
| **Dữ liệu cá nhân** | Chỉ thu thập dữ liệu cần thiết (SĐT, thông tin thú), có thông báo mục đích; ảnh thú chỉ hiển thị cho chủ của nó. | `[BB]` |
| **Toàn vẹn đặt lịch** | Hai người không thể đặt cùng một slot (xử lý đồng thời) | `[BB]` |
| **Dùng trên điện thoại** | Giao diện responsive; khách chủ yếu đặt qua điện thoại | `[BB]` |
| **Dễ dùng** | Người mới nuôi dùng được không cần hướng dẫn; đặt lịch tối đa vài bước | `[BB]` |
| **Địa phương hóa** | Tiếng Việt, VND, múi giờ VN | `[BB]` |
| **Hiệu năng** | Trang chính và xem slot phản hồi nhanh ở mức chấp nhận được | `[BB]` |
| **Sao lưu** | Sao lưu dữ liệu định kỳ | `[BB]` |
| **Tính sẵn sàng/mở rộng**| Cam kết uptime cao, mở rộng đa chi nhánh | `[SAU]` |

### 6. Chức năng nên hoàn thành ở phiên bản đầu
| STT | Chức năng |
| :--- | :--- |
| 1 | Tài khoản, phân quyền 4 vai trò |
| 2 | Hồ sơ nhiều thú |
| 3 | Danh mục dịch vụ và bảng giá theo bậc |
| 4 | Ước tính giá trước khi đặt |
| 5 | Đặt lịch theo slot + chặn trùng + nhiều thú |
| 6 | Hủy/dời lịch |
| 7 | Lịch groomer, ca làm |
| 8 | Check-in, phụ phí, hóa đơn chi tiết |
| 9 | Cập nhật trạng thái + ghi chú sau dịch vụ (+ ảnh) |
| 10 | Email xác nhận/nhắc lịch |
| 11 | Nội dung chu kỳ chăm sóc + nhắc lần sau |
| 12 | Đánh giá chất lượng dịch vụ |
| 13 | Báo cáo cơ bản |

### 7. Chức năng nâng cao
- Chủ nuôi xác nhận phụ phí trực tuyến
- Nhắc lịch qua Zalo/SMS
- Cổng thanh toán và đặt cọc dịp lễ
- Gói/combo dịch vụ, thẻ thành viên, tích điểm
- Giá hoặc ưu đãi theo giờ vắng/kín, chỉ nên làm khi có dữ liệu lấp đầy từ báo cáo cơ bản
- Hồ sơ tiêm phòng và nhắc lịch tiêm; tiệm không phải phòng khám thú y nên cần xem có phù hợp không
- Quản lý tồn kho và giao hàng đầy đủ
- Chatbot tư vấn, gợi ý dịch vụ bằng AI; rủi ro đưa ra lời khuyên sai về chăm sóc
- Đa chi nhánh, ứng dụng di động riêng

### 8. Rủi ro và cách giảm thiểu
| Rủi ro | Ảnh hưởng | Giảm thiểu |
| :--- | :--- | :--- |
| **Phạm vi phình to** | Không kịp 7 tuần | Chốt MVP ở mục 6 từ tuần 1; có danh sách cắt giảm sẵn |
| **Chặn trùng phức tạp** | Lỗi lõi | Làm sớm nhất; kiểm thử đặt đồng thời; tách chặn trùng thành module riêng |
| **Thiếu dữ liệu giá thật** | Ước giá sai, mất tin tưởng | Khảo sát giá các dịch vụ; hiển thị khoảng giá, không hiển thị giá cố định |
| **Khách lười đăng ký** | Giảm tỷ lệ đặt | Khảo sát nhanh; cân nhắc đặt lịch chỉ với SĐT |
| **Tranh chấp phụ phí** | Mất khách | Chính sách hiển thị rõ lúc đặt; hóa đơn chi tiết; ghi nhận xác nhận phụ phí |
| **Lộ ảnh/dữ liệu** | Pháp lý, mất uy tín | Phân quyền chặt, HTTPS, thu thập tối thiểu |
| **Nội dung chăm sóc sai** | Có thể hại thú | Chỉ đăng nội dung có nguồn; ghi “tham khảo”; bỏ phần lượng ăn nếu không kiểm chứng |
| **Phụ thuộc bên thứ ba** | Trễ tiến độ | MVP chỉ dùng email; hoãn thanh toán và Zalo |
| **7 thành viên khó phối hợp**| Chậm, lỗi tích hợp | Phân vai rõ, chia module độc lập, họp ngắn hàng tuần, đánh giá năng lực ở tuần 1 |
| **Không có User thật** | Không rõ hiệu quả | Thử nghiệm với 5–10 khách quen; hoặc dùng kịch bản kiểm thử có dữ liệu mô phỏng |

---

Hãy phản biện các yêu cầu trên theo những khía cạnh: 
- Có thực sự giải quyết vấn đề kinh doanh không? Có yêu cầu nào trùng lặp hoặc không cần thiết không? 
- Có chức năng nào vượt quá phạm vi của nhóm không? 
- Có thiếu chức năng cơ bản hoặc quy trình nghiệp vụ nào không? 
- Có rủi ro về dữ liệu, bảo mật hoặc quyền riêng tư không? 
- Có yêu cầu nào chưa đủ rõ để lập trình và kiểm thử không? 

Với mỗi vấn đề, hãy nêu lý do và đề xuất điều chỉnh. 

*Không mặc định rằng phương án của công cụ AI trước là đúng. Không tự ý thay đổi toàn bộ đề tài.*

## 1 Chi tiết các vấn đề AI 2 phản biện

**1.1 Có thực sự giải quyết vấn đề kinh doanh không? Có yêu cầu nào trùng lặp/không cần thiết?**
* **Vấn đề:** Tính năng “Lượng ăn tham khảo” (Mục E)
  * **Lý do:** Khách hàng mục tiêu đến với PawCare chủ yếu để giải quyết vấn đề grooming (tắm, tỉa lông), không phải để khám dinh dưỡng. Việc tư vấn sai lượng ăn có thể gây rủi ro về sức khỏe thú cưng, làm mất uy tín tiệm.
  * **Đề xuất điều chỉnh:** Loại bỏ hoàn toàn. Tập trung vào chu kỳ tắm/cắt tỉa là đủ để giải quyết vấn đề "Không biết chăm đúng" trong phạm vi grooming.
* **Vấn đề:** Tính năng “Bán sản phẩm” (Mục F)
  * **Lý do:** Theo mô tả ban đầu, đây chỉ là phần phụ. Nhưng nếu làm một hệ thống E-commerce bán lẻ đầy đủ (giỏ hàng, thanh toán, quản lý tồn kho độc lập) sẽ làm phân tán nguồn lực khỏi tính năng cốt lõi là đặt lịch.
  * **Đề xuất điều chỉnh:** Đơn giản hóa thành “Mua kèm dịch vụ” (Upsell). Khách chọn lịch tắm, hệ thống gợi ý “Mua thêm sữa tắm/pate mang về”, thanh toán gộp vào hóa đơn dịch vụ. Không làm hệ thống giỏ hàng mua sắm riêng biệt cho phiên bản này.
* **Vấn đề:** Chức năng "Ước tính chi phí grooming hàng tháng" (Mục E)
  * **Lý do:** Không mang lại giá trị thực tế cao lúc đặt lịch, dễ gây rối UI.
  * **Đề xuất điều chỉnh:** Chuyển thành một bài viết blog/landing page tĩnh (bảng biểu tham khảo) thay vì làm công cụ tính toán động phức tạp.

**1.2 Có chức năng nào vượt quá phạm vi của nhóm không? (7 tuần, 7 người)**
* **Vấn đề:** Chặn trùng lịch (Khóa slot realtime) (Mục C)
  * **Lý do:** Xử lý đồng thời (Concurrency) để khóa slot theo thời gian thực (giống rạp chiếu phim) đòi hỏi kỹ thuật cao, rất dễ gây lỗi (bug) hoặc khóa chết (deadlock) database. Trong 7 tuần, điều này là quá sức.
  * **Đề xuất điều chỉnh:** Giảm mức độ phức tạp. Chuyển sang cơ chế “Đặt chỗ (Pending) -> Tiệm xác nhận” hoặc xử lý trùng lịch ở mức Database Constraint cơ bản. Nếu có 2 người đặt cùng lúc, người submit sau sẽ nhận thông báo “Slot vừa được đặt, vui lòng chọn giờ khác”.
* **Vấn đề:** Phân chia 4 vai trò quản trị (Mục 2)
  * **Lý do:** Xây dựng UI/UX và logic phân quyền cho 3 luồng riêng biệt: Khách, Groomer, và Chủ tiệm tốn rất nhiều thời gian. Thực tế tiệm nhỏ thường chủ tiệm kiêm luôn lễ tân và xếp lịch.
  * **Đề xuất điều chỉnh:** Gộp vai trò Groomer và Chủ tiệm/Nhân viên thành 1 vai trò duy nhất là "Staff/Admin" cho phiên bản đầu (MVP). Ai trực máy tính ở quầy thì người đó thao tác cập nhật trạng thái.

**1.3 Có thiếu chức năng cơ bản hoặc quy trình nghiệp vụ nào không?**
* **Vấn đề:** Xử lý khách vãng lai (Walk-in)
  * **Lý do:** Tài liệu hoàn toàn tập trung vào khách đặt trực tuyến. Thực tế tiệm luôn có khách tự dắt chó/mèo đến. Nếu hệ thống không cho phép đưa khách này vào web, slot trống sẽ bị sai lệch so với thực tế, gây trùng lịch.
  * **Đề xuất điều chỉnh:** Bổ sung chức năng "Tạo lịch nhanh tại quầy (POS cơ bản)" dành riêng cho Admin để điền khách vãng lai vào slot trống ngay lập tức.
* **Vấn đề:** Thiếu cơ chế thông báo cho hệ thống nội bộ của tiệm
  * **Lý do:** Tài liệu có đề cập "Email xác nhận gửi cho khách", nhưng khi có booking mới, nhân viên/chủ tiệm biết bằng cách nào để chuẩn bị?
  * **Đề xuất điều chỉnh:** Bổ sung chức năng hiển thị Notification (chuông báo) hoặc tự động làm mới (auto-refresh) trang quản lý lịch của tiệm, hoặc gửi email thông báo về email của tiệm.

**1.4 Có rủi ro về dữ liệu, bảo mật hoặc quyền riêng tư không?**
* **Vấn đề:** Lưu trữ “Ảnh trước/sau dịch vụ” (Mục D)
  * **Lý do:** File ảnh gốc rất nặng. Nếu không kiểm soát, server của sinh viên (thường dùng gói free/rẻ) sẽ sập hoặc hết băng thông chỉ sau vài ngày test.
  * **Đề xuất điều chỉnh:** Bắt buộc thêm yêu cầu: Giới hạn kích thước file upload (VD: tối đa 2MB/ảnh) và chỉ lưu trữ ảnh tối đa 30 ngày, sau đó tự động xóa để tiết kiệm tài nguyên.
* **Vấn đề:** Quyền riêng tư của ảnh thú cưng
  * **Lý do:** Chủ nuôi (đặc biệt các giống chó/mèo đắt tiền) rất nhạy cảm với việc hình ảnh thú cưng của mình bị người khác xem hoặc lấy cắp.
  * **Đề xuất điều chỉnh:** Đảm bảo logic code kiểm tra quyền (Authorization): Chỉ User ID sở hữu thú cưng hoặc Admin mới gọi được API để xem URL hình ảnh đó.

**1.5 Có yêu cầu nào chưa đủ rõ để lập trình và kiểm thử không?**
* **Vấn đề:** Yêu cầu “Hủy/dời lịch theo chính sách” (Mục C)
  * **Lý do:** Từ "chính sách" là từ ngữ kinh doanh, Lập trình viên không thể code và Tester không thể viết test-case từ chữ này.
  * **Đề xuất điều chỉnh:** Lượng hóa rõ ràng ngay trong yêu cầu. Ví dụ: "Khách chỉ được phép ấn nút Hủy/Dời lịch trên web trước giờ hẹn tối thiểu 12 tiếng. Dưới 12 tiếng nút này bị mờ (disabled), khách phải gọi hotline".
* **Vấn đề:** "Ước tính giá trước khi đặt... hiển thị khoảng giá" (Mục B)
  * **Lý do:** Khoảng giá tính theo công thức nào? Việc tính toán động dựa vào 3 biến số (Cân nặng, Độ dài lông, Tình trạng rối) rất dễ sinh lỗi logic nếu không có ma trận (matrix) cụ thể.
  * **Đề xuất điều chỉnh:** Cần nhóm Business Analyst (hoặc thành viên phụ trách) cung cấp bảng Mapping giá cố định cho Dev. Ví dụ: Base price = Cân nặng. Phụ phí lông dài = +50k. Thay vì hiển thị "khoảng giá ước tính", hãy hiển thị "Giá cơ bản: X VND. Phụ phí thực tế sẽ xác nhận khi check-in".
* **Vấn đề:** "Cập nhật trạng thái... giảm nỗi lo" (Mục D)
  * **Lý do:** Việc này hoạt động ra sao ở phía người dùng? Người dùng phải F5 (tải lại trang) liên tục để chờ trạng thái đổi từ "Đang tắm" sang "Đã sấy"?
  * **Đề xuất điều chỉnh:** Làm rõ hành vi: Khách vào trang "Lịch sử của tôi" để xem dòng thời gian (Timeline). Không yêu cầu làm WebSockets (Realtime) để tiết kiệm thời gian, chỉ cần khách reload trang là thấy trạng thái mới.

> **Tiểu kết:** Danh sách AI 1 đề xuất khá đầy đủ về mặt kinh doanh nhưng đang hơi phình to về mặt kỹ thuật đối với một dự án học phần 7 tuần. Nhóm nên mạnh tay cắt bỏ các tính năng tư vấn râu ria, gộp role quản trị, và lượng hóa bằng số liệu cụ thể (giá, giờ hủy lịch) để Dev có thể bắt tay vào làm ngay.

---

## 2 Bảng Tổng hợp Đề xuất, Phản biện và Quyết định của nhóm

| Nội dung / Tính năng | AI thứ nhất đề xuất | AI thứ hai phản biện | Quyết định của nhóm |
| :--- | :--- | :--- | :--- |
| **Lượng ăn tham khảo** | Có | Không giải quyết vấn đề cốt lõi, có thể gây rủi ro sức khỏe thú cưng và mất uy tín. Đề xuất loại bỏ. | Loại bỏ hoàn toàn |
| **Bán sản phẩm** | Có | Việc làm hệ thống E-commerce đầy đủ sẽ gây phân tán nguồn lực. Đề xuất đơn giản hóa thành chức năng “Mua kèm dịch vụ” (Upsell) gộp vào hóa đơn. | Giữ lại nhưng thu hẹp thành chức năng “Mua kèm dịch vụ” (Upsell) |
| **Ước tính chi phí grooming hàng tháng** | Có | Không mang lại giá trị cao lúc đặt lịch, dễ gây rối UI. Đề xuất chuyển thành bảng biểu tham khảo tĩnh. | Giữ. Nếu không kịp triển khai, cân nhắc đổi thành trang nội dung/bảng biểu tĩnh vì đây là chức năng thêm. |
| **Chặn trùng lịch (Khóa slot realtime)** | Có | Đòi hỏi kỹ thuật cao, dễ sinh lỗi hoặc deadlock trong 7 tuần. Đề xuất đổi sang “Đặt chỗ -> Tiệm xác nhận”. | Giữ |
| **Phân chia vai trò quản trị** | Có (Khách vãng lai, Chủ nuôi, Groomer, Chủ tiệm) | Tốn nhiều thời gian thiết kế logic và UI riêng. Đề xuất gộp vai trò Groomer và Chủ tiệm thành một role “Staff/Admin”. | Gộp thành 3 vai trò: Khách vãng lai, Khách hàng, Admin như AI 2 đề xuất |
| **Xử lý khách vãng lai (Walk-in)** | Không có (chỉ tập trung khách online) | Thiếu sót này sẽ gây sai lệch dữ liệu slot trống thực tế. Đề xuất bổ sung “Tạo lịch nhanh tại quầy (POS)”. | Bổ sung chức năng “Tạo lịch nhanh tại quầy” cho Admin |
| **Cơ chế thông báo nội bộ cho tiệm** | Chỉ gửi email xác nhận cho khách | Nhân viên không biết có lịch mới. Đề xuất thêm Notification hoặc tự động làm mới trang quản lý. | Bổ sung Notification/Email thông báo cho hệ thống quản trị |
| **Lưu trữ ảnh trước/sau dịch vụ** | Có | Ảnh nặng dễ làm quá tải server sinh viên. Đề xuất giới hạn kích thước (tối đa 2MB) và tự động xóa sau 30 ngày. | Áp dụng giới hạn dung lượng upload 2MB và thời gian lưu 30 ngày |
| **Quyền riêng tư ảnh thú cưng** | Có đề cập chung chung | Chủ nuôi nhạy cảm. Cần đảm bảo logic phân quyền (Authorization) để chỉ chủ thú cưng và Admin mới xem được URL ảnh. | Bổ sung logic phân quyền bắt buộc cho API lấy ảnh |
| **Hủy/dời lịch theo chính sách** | Có | Từ “chính sách” quá chung chung, không thể code và test. Đề xuất lượng hóa rõ ràng bằng số (ví dụ: trước 12 tiếng). | Lượng hóa cụ thể (VD: chỉ cho phép thao tác trước 12 tiếng) |
| **Ước tính hiển thị khoảng giá** | Có | Dễ sinh lỗi logic do nhiều biến số. Đề xuất cung cấp bảng giá cố định thay cho khoảng giá động. | Hiển thị “Giá cơ bản” và ghi chú các khoản phụ phí sẽ xác nhận tại tiệm |
| **Cập nhật trạng thái trực tuyến** | Có | Cần làm rõ hành vi người dùng (không nên dùng WebSockets). Đề xuất xây dựng Timeline và tải lại trang thủ công. | Làm giao diện Timeline, cập nhật bằng cách tải lại trang thủ công |

### Người kiểm tra

Nguyễn Thanh Hà

*Ghi chú:* Prompt ghi thời gian thực hiện 7 tuần theo thời điểm hỏi AI. Kế hoạch thực tế là 15/10–15/12/2026 (xem PROJECT_PLAN.md).
---

# BUỔI 2

### Nhật ký của Đoàn Thị Thu Ngọc

#### B2-TN-01 – Lập kế hoạch triển khai giao diện

- **Công cụ:** Claude
- **Bước đề bài:** Bước 1 (Mục 2)
- **Mục đích:** Phân loại yêu cầu, xác định nội dung 4 trang, đề xuất phân công, liệt kê rủi ro tích hợp.

**Prompt (nguyên văn):**

````text
Nhóm tôi đang thực hiện dự án website thương mại điện tử trong môn Phát triển ứng dụng thương mại điện tử (Buổi 2: HTML5 & CSS3).

Ở Buổi 1, nhóm đã hoàn thành:
- Chủ đề cửa hàng: PawCare, tiệm spa và grooming thú cưng tại TP.HCM. Dịch vụ đặt lịch là chính, bán thức ăn và phụ kiện là phụ.
- Đối tượng khách hàng: chủ nuôi chó mèo tại TP.HCM, chủ yếu dưới 45 tuổi, mới nuôi hoặc ít kinh nghiệm.
- Website tham khảo: Pet Mart, Dog Paradise, Groomit.
- Các yêu cầu đã xác định (F01–F15): [dán danh sách F01–F15 tại đây]
- Bản phác thảo giao diện (wireframe của Thanh Hà): [mô tả bố cục từng trang hoặc đính kèm ảnh]
- Thành viên và vai trò dự kiến: Thu Ngọc (nhóm trưởng), Thanh Hà (UI/UX), Hồng Hạnh (frontend), Bảo Ngọc (backend), Thành Đạt (backend), Huỳnh Giao (admin/dashboard), Bảo Nghi (đăng nhập, kiểm thử).
- Thời hạn nộp Buổi 2: [ngày]

Hãy giúp nhóm lập kế hoạch triển khai giao diện ở Buổi 2.

Yêu cầu:
1. Xác định nội dung cần xây dựng cho ít nhất 4 trang HTML.
2. Xác định các thành phần giao diện dùng chung.
3. Đề xuất cách tổ chức CSS và hình ảnh.
4. Chia công việc thành các nhiệm vụ nhỏ.
5. Đề xuất thứ tự thực hiện và tiêu chí hoàn thành.
6. Xác định các vấn đề có thể xảy ra khi tích hợp mã nguồn.

Ràng buộc từ đề bài:
- Chưa viết mã HTML/CSS.
- Không đề xuất backend, cơ sở dữ liệu hoặc thanh toán trực tuyến.
- Kế hoạch phải kế thừa kết quả Buổi 1 và phù hợp với sinh viên mới học HTML5, CSS3.

Lưu ý riêng cho nhóm:
- Buổi 2 chỉ làm giao diện tĩnh, không dùng JavaScript. Với các yêu cầu F01–F15 cần JS/backend (đặt lịch theo giờ trống, tài khoản khách hàng, giỏ hàng...), hãy lập bảng phân loại: yêu cầu nào thể hiện được bằng giao diện tĩnh (ví dụ form đặt lịch hoặc trang đăng nhập chỉ để minh họa), yêu cầu nào hoãn lại cho buổi sau. Không tự bổ sung chức năng ngoài phạm vi.
- Với 4 trang bắt buộc, hãy đề xuất cách áp dụng cho PawCare: trang Danh sách sản phẩm hiển thị dịch vụ và sản phẩm như thế nào, trang Chi tiết sản phẩm dùng cho dịch vụ hay sản phẩm nào (kèm lý do). Nhớ có tối thiểu 8 mục trên trang danh sách.
- Vai trò backend, admin và đăng nhập chưa có việc đúng chuyên môn ở Buổi 2. Hãy chia lại công việc theo HTML/CSS, gồm cả việc quản lý GitHub (nhánh riêng, pull request, xử lý xung đột) và kiểm thử. Mỗi thành viên phải phụ trách một phần mã mà bạn ấy có thể giải thích được.
- Giữ cấu trúc thư mục tham khảo của đề: index.html, products.html, product-detail.html, about.html, css/style.css, images/, docs/ui-design.md, README.md.

Định dạng đầu ra (dùng tiếng Việt, ngắn gọn):
1. Bảng nội dung 4 trang (trang | nội dung chính | thành phần dùng chung | người phụ trách).
2. Bảng phân loại yêu cầu F01–F15 (làm ở Buổi 2 / hoãn / lý do).
3. Bảng phân công nhiệm vụ (nhiệm vụ | người làm | thứ tự | tiêu chí hoàn thành).
4. Danh sách rủi ro khi tích hợp mã và cách phòng tránh.
Nếu thiếu thông tin để làm tốt, hãy ghi rõ giả định bạn đã dùng hoặc hỏi tôi tối đa 3 câu trước khi làm.
````

#### B2-TN-02 – Tạo bộ wireframe bằng HTML5 và CSS3

- **Công cụ:** Claude
- **Bước đề bài:** Bước 1 (Mục 2)
- **Mục đích:** Tạo bộ wireframe 4 trang và một tệp CSS dùng chung để cả nhóm thống nhất bố cục.

**Prompt (nguyên văn):**

````text
VAI TRÒ
Bạn là lập trình viên frontend và UI/UX, đang hướng dẫn một nhóm sinh viên MỚI HỌC HTML5 và CSS3. Hãy viết mã nguồn dễ đọc, có chú thích tiếng Việt, đặt tên rõ ràng. Mỗi dòng mã quan trọng phải có thể giải thích được cho người mới.

BỐI CẢNH
Nhóm đang làm website thương mại điện tử tên PawCare: tiệm spa và grooming thú cưng tại TP.HCM, một chi nhánh. Đặt lịch dịch vụ là chức năng chính, bán thức ăn và phụ kiện là phần phụ. Khách chính là chủ nuôi chó mèo tại TP.HCM, mới nuôi hoặc ít kinh nghiệm, đặt lịch qua tin nhắn hoặc hotline. Bài tập Buổi 2 của môn "Phát triển ứng dụng WEB/TMĐT" yêu cầu 4 trang HTML. Giai đoạn này nhóm cần WIREFRAME BẰNG MÃ (độ chi tiết thấp, chưa phải thiết kế hoàn chỉnh) để cả nhóm thống nhất bố cục trước khi làm giao diện thật.

SẢN PHẨM CẦN TẠO
Bộ file wireframe chạy được khi mở trực tiếp bằng trình duyệt, không cần máy chủ:
wireframe/
  index.html            (Trang chủ)
  products.html         (Danh sách dịch vụ và sản phẩm)
  product-detail.html   (Chi tiết: lấy dịch vụ "Tắm sấy" làm ví dụ)
  about.html            (Giới thiệu cửa hàng)
  css/style.css         (một file CSS dùng chung cho cả 4 trang)
  README.md             (cách mở, cấu trúc, quy ước đặt tên)

RÀNG BUỘC KỸ THUẬT (bắt buộc)
- Chỉ HTML5 và CSS3. KHÔNG JavaScript. KHÔNG Bootstrap, Tailwind hay thư viện CSS nào.
- Dùng thẻ semantic: header, nav, main, section, article, footer. Mỗi trang có đúng một h1, thứ tự h2/h3 hợp lý.
- Bố cục bằng Flexbox hoặc CSS Grid. Không định vị thủ công bằng position:absolute để xếp bố cục.
- Responsive tại 3 kích thước: 1366px (máy tính), 768px (máy tính bảng), 390px (điện thoại). Dùng media query. Không tràn ngang ở cả ba kích thước. Không dùng hamburger JavaScript: ở điện thoại menu xếp gọn bằng flex-wrap hoặc xếp dọc.
- Wireframe TRẮNG ĐEN XÁM: chỉ dùng thang xám. Chỗ đặt ảnh là khung xám có nhãn như "Ảnh dịch vụ", "Banner". Khai báo màu bằng biến CSS ở :root (ví dụ --color-bg, --color-surface, --color-text, --color-muted, --color-primary, --color-accent, --color-border) và gán giá trị xám, để sau này nhóm chỉ thay giá trị biến là đổi bảng màu.
- Font hệ thống (system-ui, sans-serif). Khoảng cách dùng bội của 8px.
- Hover và focus-visible rõ ràng cho mọi liên kết và nút (viền đậm hơn, không làm xê dịch bố cục). Tương phản chữ/nền đạt tối thiểu 4,5:1.
- Đường dẫn tương đối. Tên file và class CSS viết thường, nối bằng dấu gạch ngang (ví dụ product-card). Không dùng style="" trong HTML.
- Thẻ html có lang="vi". Mọi ảnh thật (nếu có) phải có alt; khung ảnh giả dùng div có aria-label.
- Các nút "Đặt lịch", "Thêm vào giỏ", ô tìm kiếm chỉ là GIAO DIỆN, chưa có chức năng. Không viết form gửi dữ liệu, không backend.

THÀNH PHẦN DÙNG CHUNG (sao chép y hệt ở 4 trang)
- Header: logo chữ "PawCare" (khung xám giữ chỗ logo), menu 3 liên kết đúng đường dẫn: Trang chủ (index.html), Dịch vụ & Sản phẩm (products.html), Giới thiệu (about.html), ô tìm kiếm (giao diện), nút "Đặt lịch" dẫn tới products.html, biểu tượng giỏ hàng (khung giữ chỗ). Trang hiện tại có trạng thái "đang chọn" (aria-current="page").
- Footer: tên cửa hàng, 3 cột (Liên kết nhanh, Liên hệ, Giờ mở cửa), dòng bản quyền. Giờ mở cửa: 8:00–19:00. Địa chỉ, hotline, email: để placeholder "[địa chỉ]", "[hotline]", "[email]". Không bịa thông tin.

NỘI DUNG TỪNG TRANG
1) index.html
- Banner: tiêu đề, một câu mô tả ngắn, nút "Đặt lịch ngay" (dẫn products.html), khung ảnh lớn bên phải trên máy tính, xếp dọc ở điện thoại.
- Khu "Dịch vụ nổi bật": 4 thẻ (Tắm sấy, Cắt tỉa tạo kiểu, Vệ sinh tai, Cắt móng), mỗi thẻ có khung ảnh, tên, dòng "Giá từ [giá]", liên kết "Xem chi tiết".
- Khu "Sản phẩm nổi bật": 4 thẻ sản phẩm, cùng cấu trúc thẻ.
- Khu "Vì sao chọn PawCare": 3 ô, nội dung placeholder "[Điểm nổi bật 1/2/3]".
- Liên kết sang products.html và about.html.
2) products.html
- Tiêu đề trang và một dòng mô tả.
- Phần "Dịch vụ" gồm 7 thẻ: Tắm sấy; Cắt tỉa tạo kiểu; Vệ sinh tai; Cắt móng; Combo Tắm sấy + Vệ sinh tai + Cắt móng; Combo Tắm sấy + Cắt tỉa; Trọn gói. ⚠ (tên combo chờ nhóm chốt)
- Phần "Sản phẩm bán kèm" gồm 8 thẻ: thức ăn hạt cho chó; thức ăn hạt cho mèo; pate cho mèo; snack thưởng cho chó; đồ gặm cho chó; vòng cổ và dây dắt; bát ăn; lược chải lông. ⚠
- Mỗi thẻ: khung ảnh, tên, giá "[giá]", nút/liên kết "Xem chi tiết" dẫn product-detail.html.
- Lưới: 4 cột ở 1366px, 2 cột ở 768px, 1 cột ở 390px. Các thẻ cao đều nhau kể cả khi tên dài khác nhau.
3) product-detail.html (dịch vụ "Tắm sấy")
- Đường dẫn "Quay lại danh sách" (products.html).
- Bên trái: khung ảnh chính và 3 khung ảnh nhỏ. Bên phải: tên, giá "Giá từ [giá]", mô tả ngắn "[mô tả]".
- Thuộc tính: Áp dụng cho (chó, mèo), Thời lượng ước tính "[thời lượng]", Hình thức (tại tiệm).
- Bảng giá mẫu: hàng là mốc cân nặng ("Dưới 5 kg", "5–10 kg", "10–20 kg", "Trên 20 kg"), cột là độ dài lông ("Lông ngắn", "Lông dài"), ô là "[giá]".
- Nút "Đặt lịch" (to, dễ bấm). Ở điện thoại ảnh nằm trên, thông tin nằm dưới.
- Dưới cùng: khu "Dịch vụ/sản phẩm liên quan" gồm 3 thẻ.
4) about.html
- Giới thiệu PawCare (2 đoạn placeholder), ảnh minh họa (khung xám), 3 giá trị (placeholder), khu thông tin liên hệ (placeholder như footer), liên kết "Đặt lịch" dẫn products.html. Các đoạn được chia thành các section có tiêu đề, không đặt trong một đoạn dài.

CHÚ THÍCH TRONG WIREFRAME
Ở đầu mỗi trang thêm một khối chú thích ngắn (thẻ details đóng sẵn, nhãn "Ghi chú wireframe") nêu mục đích trang, các thành phần chính và hành vi dự kiến trên máy tính / máy tính bảng / điện thoại. Không dùng JavaScript.

CÁCH TRẢ LỜI
1. Trước tiên mô tả ngắn cấu trúc và lý do chọn Grid hay Flexbox cho từng khu vực.
2. In đầy đủ nội dung của TỪNG file, mỗi file trong một khối mã riêng có tên file ở trên.
3. Cuối cùng cho bảng tự kiểm tra: ở mỗi mục dưới đây ghi Đã đáp ứng / Chưa đáp ứng và chỉ rõ chỗ trong mã: đủ 4 trang; liên kết giữa các trang đúng; một file CSS dùng chung; không JavaScript và không framework; Grid/Flexbox; 3 mốc responsive; hover và focus-visible; thẻ semantic; không style trong HTML; không bịa thông tin kinh doanh.
4. Nêu rõ các giả định bạn đã đặt ra ở những chỗ đề không nói.
5. KHÔNG khẳng định đã chạy thử trên trình duyệt hay đã sửa lỗi thành công, vì bạn không có trình duyệt. Chỉ ghi "cần kiểm tra bằng DevTools ở 1366/768/390".
6. Không thêm trang, chức năng, màu sắc hay thông tin ngoài yêu cầu. Nếu thiếu thông tin thì dùng placeholder dạng "[...]" và liệt kê danh sách placeholder ở cuối.
````

#### B2-TN-03 – Kiểm tra cấu trúc dự án

- **Công cụ:** Claude
- **Bước đề bài:** Bước 2 (Mục 3)
- **Mục đích:** Kiểm tra cấu trúc thư mục hiện tại, đề xuất cách tổ chức, quy ước đặt tên và lỗi tích hợp.

**Prompt (nguyên văn):**

````text
Nhóm tôi đang phát triển website thương mại điện tử từ dự án Buổi 1.

Cấu trúc thư mục hiện tại:
[.gitignore, AGENTS.md, AI_USAGE_LOG.md, PROJECT_PLAN.md, README.md, REQUIREMENTS.md, docs/business-workflow.md, docs/competitor analytics.md]

Nhóm dự kiến có các trang:
index.html, products.html, product-detail.html, about.html.

Hãy giúp nhóm:
1. Kiểm tra cấu trúc thư mục hiện tại.
2. Đề xuất cách tổ chức file HTML, CSS và hình ảnh.
3. Xác định các thành phần giao diện nên dùng chung.
4. Đề xuất quy ước đặt tên file và class CSS.
5. Hướng dẫn cách liên kết CSS và hình ảnh bằng đường dẫn tương đối.
6. Chỉ ra các lỗi có thể xảy ra khi tích hợp mã nguồn từ nhiều thành viên.

Không tạo lại toàn bộ dự án.
Không sử dụng framework CSS.
Giải thích rõ lý do của từng đề xuất.
````

#### B2-TN-04 – Hoàn thiện trang chi tiết sản phẩm (product-detail.html)

- **Công cụ:** Claude
- **Bước đề bài:** Bước 6 (Mục 7), Phần A
- **Mục đích:** Hoàn thiện trang chi tiết dịch vụ Tắm sấy: tìm giá tham khảo của đối thủ, thay đường dẫn ảnh, bổ sung nội dung hữu ích và chỉnh CSS để ảnh vừa khung. Bản tự kiểm tra của người phụ trách ghi ở cuối mục.

**Prompt:**

````text
VAI TRÒ
Bạn là lập trình viên frontend và UI/UX, đang hướng dẫn nhóm sinh viên mới học HTML5 và CSS3. Mã phải dễ đọc, có chú thích tiếng Việt, giải thích được cho người mới.

BỐI CẢNH
Nhóm làm website PawCare: tiệm spa và grooming chó mèo tại TP.HCM, một chi nhánh. Tôi phụ trách trang product-detail.html (dịch vụ "Tắm sấy"). Đính kèm là HTML và CSS hiện tại của dự án.

NHIỆM VỤ
Rà soát và cải thiện trang chi tiết theo các yêu cầu:
1. Bố trí rõ ràng giữa khu ảnh và khu thông tin.
2. Có đủ: hình ảnh sản phẩm, tên và giá bán, mô tả, thuộc tính phù hợp, nút mua hàng dạng giao diện, liên kết quay lại danh sách.
3. Nút "Đặt lịch" dễ nhận biết.
4. Bố cục phù hợp màn hình lớn và nhỏ (1366, 768, 390 px).
5. Dùng Grid hoặc Flexbox đúng chỗ, giải thích lý do chọn.
6. Thống nhất với trang chủ (màu, font, nút, thẻ trong css/style.css).

RÀNG BUỘC
- Chỉ HTML5 và CSS3. Không JavaScript, backend, thanh toán thật, framework CSS.
- Không đổi phần header, footer và các lớp CSS dùng chung của trang khác.
- Không tự bịa thông tin kinh doanh. Dữ liệu không có thì để "[...]".
- Giữ nguyên quyết định nhóm: giữ 3 ảnh nhỏ (thumb), không thêm breadcrumb.

CÁCH TRẢ LỜI
1. Liệt kê ngắn các vấn đề bạn thấy trong mã hiện tại.
2. Với mỗi chỉnh sửa: ghi số dòng, đoạn cũ, đoạn mới, và giải thích thuộc tính CSS quan trọng.
3. Chỉ cung cấp phần cần bổ sung hoặc sửa, không in lại cả tệp.
4. Cuối cùng cho bảng tự kiểm tra từng yêu cầu: Đã đáp ứng / Chưa đáp ứng, chỉ rõ chỗ trong mã.
5. Không khẳng định đã chạy thử trình duyệt; ghi "cần kiểm tra bằng DevTools ở 1366/768/390".
````

*Đính kèm khi gửi: product-detail.html và css/style.css hiện tại của dự án.*

**Kết quả và cách xử lý:**

- Giá: giữ giá từng dòng do nhóm tự đặt trong khoảng đó.
- Nội dung thêm: quy trình, lưu ý, câu hỏi thường gặp, thẻ liên quan; loại bỏ đề xuất breadcrumb; giữ 3 ảnh nhỏ theo quyết định của nhóm.
- CSS: bản đầu dùng chế độ cắt ảnh nên ảnh mất phần rìa, đã yêu cầu sửa thành hiển thị trọn ảnh; bỏ đoạn trùng với style.css.
- Kiểm tra: tự dán mã vào tệp, xem bằng Live Preview rồi commit lên nhánh riêng.

### Nhật ký của Nguyễn Thanh Hà
#### B2-TH-01 – Thiết kế hệ thống nhận diện UI & Viết tài liệu docs/ui-design.md

- **Công cụ:** Gemini
- **Bước đề bài:** Buổi 2 – Bước 2 (Mục 3.1) & Bước 3 (Mục 4.1)[cite: 34, 35, 36, 37]
- **Mục đích:** Xây dựng và thống nhất hệ thống thiết kế UI (Design System) cho toàn bộ website PawCare bao gồm: Bảng màu 7 màu, Kiểu chữ Nunito, Khoảng cách Spacing 8-point, Các mốc Responsive (1366px, 768px, 390px), Quy ước Nút bấm / Thẻ / Naming class[cite: 25, 26, 35]; kiểm tra độ tương phản tiếp cận (Accessibility) qua WebAIM Contrast Checker; xuất nội dung tài liệu `docs/ui-design.md`[cite: 26, 35].

**Prompt:**

```text
VAI TRÒ
Bạn là chuyên gia UI/UX và thiết kế hệ thống (Design System) cho ứng dụng web thương mại điện tử.

BỐI CẢNH
Nhóm đang phát triển giao diện website PawCare: tiệm spa, grooming và đồ dùng chó mèo dành cho Gen Z và người đi làm trẻ (22–35 tuổi) tại TP.HCM. Website gồm 4 trang HTML5/CSS3 (index.html, products.html, product-detail.html, about.html). Tôi phụ trách xây dựng tài liệu thiết kế UI (docs/ui-design.md) và thiết kế bộ Logo dự án.

NHIỆM VỤ
Hãy đề xuất hệ thống thiết kế UI toàn diện cho dự án PawCare bao gồm:
1. Bảng màu (7 màu): Màu chính (Primary), Hover, Nhấn (Accent), Nền Web, Nền Card, Text chính, Text phụ.
2. Kiểu chữ (Typography): Chọn 1 phông chữ duy nhất hỗ trợ tiếng Việt tốt (bo tròn nhẹ, thân thiện với chủ nuôi thú cưng), quy định cỡ chữ và trọng lượng (weight) cho H1, H2, H3, Body, Small.
3. Khoảng cách (Spacing): Bội số của 8px (4px, 8px, 16px, 24px, 32px, 48px).
4. Mốc Responsive Breakpoints: 1366px (Desktop), 768px (Tablet), 390px (Mobile).
5. Thành phần dùng chung: Nút bấm (Button Primary/Secondary), Thẻ (Card), Header, Footer.
6. Quy ước đặt tên Class & Tệp: Viết theo kiểu kebab-case, quy ước đặt tên file hình ảnh.

RÀNG BUỘC
- Đảm bảo độ tương phản giữa chữ và nền đạt tiêu chuẩn WCAG AA (tối thiểu 4.5:1 cho chữ thường qua WebAIM Contrast Checker).
- Không sử dụng CSS framework (Bootstrap/Tailwind) hay JavaScript.
- Xuất kết quả dưới dạng cấu trúc Markdown chuẩn để dán trực tiếp vào docs/ui-design.md.

CÁCH TRẢ LỜI
1. Liệt kê bảng màu kèm mã HEX và kết quả kiểm tra tương phản WebAIM.
2. Cung cấp bảng quy định Typography và Spacing.
3. Cung cấp trọn vẹn nội dung file docs/ui-design.md bằng định dạng Markdown.
````
**Kết quả và cách xử lý:**
- Bảng màu & Typography: Thống nhất sử dụng phông chữ Nunito và bộ 7 mã màu: Màu chính Xanh ngọc (#00A896), Hover (#028090), Nhấn Cam (#f78c57), Nền Web (#F8F9FA), Nền Card (#FFFFFF), Text chính (#212529), Text phụ (#6C757D).
- Kiểm tra tương phản (Accessibility): Khi kiểm tra thử nghiệm cặp chữ Trắng trên nền Xanh ngọc (#00A896) qua WebAIM Contrast Checker, hệ thống báo Fail với tỉ lệ tương phản 2.98:1 (chưa đạt chuẩn WCAG AA). Đã điều chỉnh lại quy tắc nút bấm: Nút chính (.btn-primary) dùng màu nền Cam Nhấn (#f78c57) chữ #212529 hoặc nền Xanh ngọc đậm (#028090) chữ Trắng để đạt tỉ lệ tương phản chuẩn.   
- Khắc phục liên kết ảnh Logo: File ui-design.md nằm trong thư mục docs/ còn tệp ảnh logo nằm trong thư mục images/ ở cấp thư mục gốc. Đã điều chỉnh đường dẫn tương đối từ ./assets/ thành ../images/logo-icon.png để hiển thị đúng ảnh.   
- Xử lý phản hồi trên GitHub Pull Request: Khi nhận review trên GitHub PR về lỗi lặp đoạn văn bản trong mục "Quy ước viết code giao diện", đã tiến hành xóa phần thừa trong file, thực hiện git commit, git push cập nhật nhánh riêng và ấn chọn "Resolve conversation".   
image_dac136.png
- Kiểm tra: Dán mã Markdown vào tệp docs/ui-design.md, kiểm tra hiển thị qua Markdown Preview VS Code rồi commit lên nhánh riêng.

### Nhật ký của Nguyễn Hồng Hạnh

#### B2-HH-01 – Hoàn thiện CSS dùng chung và header/footer cho 4 trang

- **Công cụ:** Claude
- **Bước đề bài:** Bước 4 (Mục 5)
- **Mục đích:** Hỗ trợ code phần style, quy định responsive. Thống nhất header footer. Giải thích code

**Prompt (nguyên văn):**

````text
# HOÀN THIỆN CSS DÙNG CHUNG VÀ HEADER/FOOTER CHO WEBSITE PAWCARE

## 1. Vai trò và bối cảnh

Bạn là người hỗ trợ lập trình frontend, có nhiệm vụ chỉnh sửa một dự án website thương mại điện tử PawCare sử dụng HTML5 và CSS3 thuần, không dùng JavaScript hoặc framework CSS.

Tôi là sinh viên đang học HTML/CSS và thực hiện dự án nhóm. Tôi cần bạn đề xuất chỉnh sửa code dựa trên các file hiện có, giải thích ngắn gọn những thay đổi quan trọng và giúp tôi hiểu cách kiểm tra kết quả.

Đây là dự án nhóm, vì vậy cần bảo toàn cấu trúc và phạm vi công việc của các thành viên khác. Không tự ý tái thiết kế toàn bộ website.

## 2. Nhiệm vụ theo GitHub issue

Hoàn thiện CSS dùng chung và header/footer theo các yêu cầu sau:

1. Giữ nguyên tên các class hiện có để không làm hỏng giao diện bốn trang HTML.
2. Thay các giá trị biến trong `:root` theo tài liệu `docs/ui-design.md`. Các biến khoảng cách phải sử dụng bội số của 8 px.
3. Hoàn thiện nền tảng CSS gồm reset phù hợp, font chữ, tiêu đề, liên kết và trạng thái `:focus-visible` rõ ràng.
4. Hoàn thiện khung chứa dùng chung, header, các nút/liên kết và footer.
5. Sao chép một đoạn HTML header giống hệt và một đoạn HTML footer giống hệt sang cả bốn trang. Chỉ được khác giá trị `aria-current` trong liên kết menu tương ứng với trang hiện tại.
6. Không chỉnh sửa CSS riêng từng trang, tức mục 8 trong `css/style.css`.
7. Không sử dụng JavaScript hoặc framework CSS.
8. Không viết lại toàn bộ dự án nếu chỉ cần sửa một số phần.

**Điều kiện hoàn thành theo issue:**

- Cả bốn trang dùng chung nền và hệ thống giao diện nhất quán.
- Header/footer giống nhau trên cả bốn trang, ngoại trừ `aria-current` theo trang hiện tại.
- Không còn mã màu viết trực tiếp ngoài `:root` trong CSS, ngoại trừ trường hợp cần thiết phải được giải thích rõ.
- Các liên kết điều hướng trỏ đến file HTML thực tế.
- Không làm hỏng CSS hoặc nội dung riêng của từng trang.

## 3. Tài liệu thiết kế chính thức: `docs/ui-design.md`

### Bảng màu

- Màu chính (Primary): `#007A6E`
- Màu logo trang trí: `#00A090`
- Màu hover: `#00665C`
- Màu nhấn (Accent): `#FC7060`
- Màu nền website (Background): `#F8F9FA`
- Màu nền card: `#FFFFFF`
- Màu chữ chính: `#212529`
- Màu chữ phụ: `#5C6570`

### Kiểu chữ

Font chữ chính: Nunito.

| Thành phần      | Kích thước | Trọng lượng |
| --------------- | ---------: | ----------: |
| H1              |       32px |         700 |
| H2              |       24px |         700 |
| H3              |       20px |         600 |
| Nội dung thường |       16px |         400 |
| Chữ nhỏ         |       14px |         400 |

Nếu cần tải hoặc nhúng Nunito từ nguồn bên ngoài, hãy kiểm tra cấu hình hiện có trước. Không tự thêm phụ thuộc bên ngoài nếu chưa cần thiết. Nếu font chưa được tải, hãy giải thích và đề xuất cách xử lý phù hợp.

### Khoảng cách

Các khoảng cách thiết kế gồm 8px, 16px, 24px, 32px và 48px. Hệ thống biến hiện có có thể giữ thêm các bội số của 8px cần thiết, chẳng hạn 64px.

### Logo

- Logo vuông dùng ở header/favicon: `images/logo-icon.png`
- Logo đầy đủ dùng ở footer/trang giới thiệu: `images/logo-full.png`

Hãy kiểm tra file thực tế có tồn tại trước khi sử dụng. Header cần hiển thị logo vuông với kích thước khoảng 40 × 40px. Footer sử dụng logo đầy đủ nếu phù hợp với cấu trúc hiện tại và yêu cầu của nhóm.

### Các thành phần dùng chung

- Header: logo bên trái; menu gồm ba liên kết Trang chủ, Dịch vụ & Sản phẩm, Giới thiệu; ô tìm kiếm giao diện; nút Đặt lịch; biểu tượng giỏ hàng.
- Nút chính: nền `#FC7060`, chữ `#212529`. Khi hover: nền `#00665C`, chữ trắng.
- Nút phụ: nền trắng, viền `#007A6E`, chữ màu chính. Khi hover: nền `#00665C`, chữ trắng.
- Nút có `border-radius: 8px`.
- Card: nền trắng, bo góc 12px. Không sửa CSS riêng của card nếu thuộc phạm vi trang khác.
- Footer: tên thương hiệu, ba cột Liên kết nhanh, Liên hệ, Giờ mở cửa và dòng bản quyền.
- Quy ước tên class: `kebab-case`.

### Responsive

- Desktop: kiểm tra tại 1366px.
- Tablet: kiểm tra tại 768px.
- Mobile: kiểm tra tại 390px.
- Các breakpoint hiện có trong CSS là `max-width: 1023px` và `max-width: 599px`. Không tự thay đổi nếu không có lý do cụ thể.

## 4. Các file và cấu trúc hiện tại

Dự án có bốn trang HTML, một CSS dùng chung và tài liệu thiết kế:

- `css/style.css`: CSS dùng chung cho bốn trang.
- `index.html`: trang chủ.
- `products.html`: trang danh sách dịch vụ và sản phẩm.
- `product-detail.html`: trang chi tiết.
- `about.html`: trang giới thiệu.
- `docs/ui-design.md`: tài liệu hệ thống thiết kế.
- `images/logo-icon.png`: logo vuông.
- `images/logo-full.png`: logo đầy đủ.

## 5. CSS hiện tại

File `css/style.css` đã có cấu trúc tương đối đầy đủ với các mục:

1. Biến CSS (`:root`)
2. Nền tảng
3. Khung chứa
4. Header
5. Nút
6. Khung ảnh giả
7. Lưới và thẻ
8. CSS riêng từng trang
9. Footer
10. Responsive

Một số class đã được sử dụng và phải giữ nguyên tên, bao gồm:

`.site-header`, `.container`, `.header-inner`, `.logo`, `.logo-box`, `.main-nav`, `.nav-list`, `.search`, `.header-btn`, `.cart-box`, `.btn`, `.btn-primary`, `.btn-outline`, `.site-footer`, `.footer-brand`, `.footer-cols`, `.footer-title`, `.footer-list`, `.copyright`.

CSS hiện có đã chứa nhiều quy tắc về Flexbox, liên kết, hover, focus và responsive. Hãy đọc và tận dụng các quy tắc này, tránh tạo quy tắc trùng lặp hoặc ghi đè không cần thiết.

Đặc biệt, giữ nguyên toàn bộ phạm vi CSS riêng từng trang trong mục 8, từ `.hero` đến `.cta-title`, trừ khi phát hiện lỗi khiến yêu cầu dùng chung không thể hoàn thành. Nếu gặp trường hợp này, hãy báo cáo và xin xác nhận thay vì tự sửa.

## 6. HTML header hiện tại trong `index.html`

Header đang có cấu trúc sau:

```html
<header class="site-header">
  <div class="container header-inner">
    <a class="logo" href="index.html">
      <span class="logo-box" aria-hidden="true">Logo</span>
      PawCare
    </a>

    <nav class="main-nav" aria-label="Menu chính">
      <ul class="nav-list">
        <li><a href="index.html" aria-current="page">Trang chủ</a></li>
        <li><a href="products.html">Dịch vụ &amp; Sản phẩm</a></li>
        <li><a href="about.html">Giới thiệu</a></li>
      </ul>
    </nav>

    <div class="search" role="search">
      <label for="search-input">Tìm kiếm</label>
      <input id="search-input" type="search"
             placeholder="Tìm dịch vụ, sản phẩm">
    </div>

    <a class="btn btn-primary header-btn"
       href="products.html">Đặt lịch</a>

    <div class="cart-box" role="img"
         aria-label="Biểu tượng giỏ hàng">Giỏ</div>
  </div>
</header>
```

Đây là cấu trúc hiện tại của trang chủ, không phải yêu cầu giữ nguyên ô logo giả. Hãy thay ô logo giả bằng logo thật nếu tài nguyên tồn tại, nhưng giữ nguyên tên class `.logo` và bố cục chung.

Lưu ý:

- Tài liệu thiết kế chốt ba liên kết menu, không phải bốn liên kết.
- Không tự thêm mục Chi tiết vào menu nếu tài liệu thiết kế và HTML hiện tại không yêu cầu.
- Ô tìm kiếm chỉ cần giao diện, không cần xử lý tìm kiếm bằng JavaScript.
- Nút Đặt lịch và giỏ hàng chưa cần xử lý nghiệp vụ.
- Mỗi trang cần có `aria-current="page"` ở liên kết đại diện cho trang hiện tại; các liên kết còn lại không có thuộc tính này.
- Nếu cần chỉnh `id` của ô tìm kiếm để tránh trùng lặp trong một trang, hãy kiểm tra nhãn `label` tương ứng và không thay đổi không cần thiết.

## 7. HTML footer hiện tại

Footer đang có cấu trúc gồm:

- `<footer class="site-footer">`
- `.container`
- `.footer-brand`
- `.footer-cols` với ba cột:
  - Liên kết nhanh
  - Liên hệ
  - Giờ mở cửa
- `.copyright`

Thông tin liên hệ đang có các chỗ giữ chỗ như `[địa chỉ]`, `[hotline]`, `[email]`, `[năm]`. Không tự bịa thông tin thật. Hãy giữ nguyên các chỗ giữ chỗ nếu chưa có dữ liệu được nhóm xác nhận.

Hãy sử dụng logo đầy đủ ở footer nếu tài nguyên có sẵn và việc bổ sung không làm thay đổi đáng kể bố cục hoặc phá vỡ class hiện có.

## 8. Phạm vi chỉnh sửa và nguyên tắc bảo toàn code

Được phép:

- Cập nhật giá trị biến trong `:root`.
- Điều chỉnh CSS nền tảng, typography, liên kết và focus.
- Hoàn thiện `.container`, header, nút/liên kết và footer.
- Thay ô logo giả bằng logo thật theo tài nguyên có sẵn.
- Đồng bộ HTML header/footer giữa bốn trang.
- Sửa các mã màu viết trực tiếp ngoài `:root` trong phạm vi được giao bằng cách sử dụng biến CSS phù hợp.
- Bổ sung quy tắc cần thiết nếu thực sự thiếu, miễn là không phá vỡ cấu trúc hiện tại.

Không được:

- Viết lại toàn bộ CSS hoặc HTML.
- Đổi tên class hiện có.
- Sửa CSS riêng từng trang trong mục 8.
- Thay đổi nội dung banner, card, lưới sản phẩm hoặc bố cục riêng của trang.
- Xóa các thành phần tìm kiếm, nút Đặt lịch hoặc giỏ hàng.
- Thêm JavaScript, thư viện hoặc framework CSS.
- Tự tạo thông tin liên hệ, giá sản phẩm hoặc nội dung chưa được cung cấp.
- Thay đổi tên file, cấu trúc thư mục hoặc cấu hình Git không cần thiết.

Nếu phát hiện mâu thuẫn giữa CSS hiện có, tài liệu thiết kế và yêu cầu GitHub issue, hãy ưu tiên yêu cầu issue cùng tài liệu thiết kế đã chốt, nhưng báo cáo rõ mâu thuẫn và cách xử lý. Không âm thầm tự quyết định các thay đổi vượt phạm vi.

## 9. Các bước thực hiện

Hãy làm theo thứ tự:

**Bước 1: Kiểm tra repository**

- Xác minh các file HTML, CSS, tài liệu thiết kế và hình ảnh logo.
- Đọc CSS hiện tại trước khi sửa.
- Xác định các mã màu viết trực tiếp ngoài `:root`.
- Kiểm tra header/footer của cả bốn trang để phát hiện khác biệt.
- Không sửa file ngay nếu chưa xác định rõ phạm vi.

**Bước 2: Lập kế hoạch ngắn**

- Liệt kê những phần cần sửa trong `style.css`.
- Liệt kê các khác biệt cần đồng bộ trong bốn file HTML.
- Nêu rõ những phần sẽ giữ nguyên.

**Bước 3: Chỉnh sửa&#x20;**

- Thực hiện các thay đổi tối thiểu.
- Tận dụng class và cấu trúc hiện có.
- Không viết lại toàn bộ file nếu không cần.
- Giữ nguyên mục 8 trong `style.css`.

**Bước 4: Giải thích và hướng dẫn tôi tự kiểm tra**

## 10. Cách giải thích cho người mới học

Tôi đang học HTML/CSS nên không chỉ cần code chạy được. Sau khi sửa, hãy giải thích ngắn gọn bằng tiếng Việt, tránh thuật ngữ khó hoặc giải thích chúng bằng ví dụ đơn giản.

Tôi muốn hiểu:

- Biến CSS có tác dụng gì.
- Tại sao cần giữ nguyên tên class.
- Header/footer được dùng chung giữa bốn trang như thế nào.
- Tại sao cần dùng biến màu thay vì viết mã màu trực tiếp.
- Tôi cần kiểm tra những gì trước khi gửi Pull Request.

**Bắt đầu bằng việc kiểm tra các file hiện có, sau đó lập kế hoạch ngắn và tiến hành chỉnh sửa trong đúng phạm vi được giao.**
````
#### B2-HH-02 – Nâng cấp Header

- **Công cụ:** Claude
- **Bước đề bài:** Bước 4 (Mục 5)
- **Mục đích:** Cải tiến header sao cho đẹp và dễ nhìn hơn sau khi tự quan sát kết quả AI code lần 1.

**Prompt (nguyên văn):**

````text
Tôi muốn nâng cấp phần giao diện (UI) của Header theo hướng hiện đại, chuyên nghiệp và trực quan hơn, nhưng vẫn giữ bản sắc thương hiệu PawCare.1. Các yêu cầu cải thiện1.1. Ô tìm kiếm (Search bar)
* Giữ nguyên vị trí và chức năng hiện tại.
* Bổ sung icon kính lúp bên trong ô tìm kiếm, đặt ở bên trái hoặc bên phải tùy theo phương án thiết kế hợp lý.
* Icon phải được viết bằng SVG inline trực tiếp trong HTML, không sử dụng file PNG/JPG hoặc emoji.
* Cải thiện border, border-radius và hiệu ứng focus để ô tìm kiếm trông hiện đại, thân thiện hơn.
1.2. Nút Đặt lịch (CTA)
* Giữ màu cam san hô hiện tại làm màu chủ đạo để duy trì nhận diện thương hiệu và nhấn mạnh đây là hành động quan trọng nhất trên Header.
* Bổ sung icon lịch (calendar) nhỏ bên cạnh chữ "Đặt lịch".
* Icon phải được triển khai bằng SVG inline trực tiếp trong HTML.
* Thiết kế hiệu ứng hover tinh tế, ưu tiên màu nền tối hơn một chút, kết hợp transition mượt mà.
* Đảm bảo icon và nội dung chữ được căn chỉnh cân đối.
1.3. Màu nền Header (Optional – đề xuất phương án)
* Tôi đang cân nhắc thay đổi nền trắng hiện tại vì nhiều website hiện đại sử dụng màu nền riêng cho khu vực Header để tạo sự phân tách với nội dung chính.
* Hãy đánh giá liệu PawCare có nên sử dụng nền khác màu trắng hay không.
* Nếu có, đề xuất 2–3 phương án màu nền phù hợp với nhận diện thương hiệu PawCare (xanh teal, cam san hô, trắng).
* Ưu tiên các tone sáng, nhẹ nhàng, thân thiện, phù hợp với lĩnh vực chăm sóc thú cưng.
* Đảm bảo logo, menu, ô tìm kiếm và CTA có độ tương phản tốt trên nền mới.
* Không tự ý chọn màu quá đậm hoặc quá nổi bật làm giảm khả năng đọc nội dung.
2. Nguyên tắc triển khai kỹ thuật
* Sử dụng SVG inline trực tiếp trong HTML cho tất cả icon mới (search, calendar...). Không tạo thêm file ảnh icon riêng.
* Có thể tham khảo thư viện Lucide Icons để lựa chọn icon có phong cách outline tối giản, đồng bộ.
* Sử dụng thuộc tính currentColor khi phù hợp để icon có thể kế thừa màu sắc từ CSS.
* Tận dụng các class CSS hiện có, hạn chế tạo thêm class không cần thiết.
* Không sử dụng emoji thay thế icon giao diện.
* Viết CSS riêng cho các trạng thái mặc định, hover, focus và responsive khi cần thiết.
Lưu ý quan trọng: Hãy ưu tiên cải thiện thẩm mỹ nhưng không đánh đổi tính nhất quán của hệ thống giao diện hiện tại. Nếu có đề xuất thay đổi màu nền Header, hãy giải thích lý do lựa chọn trước khi triển khai.
````

#### B2-HH-03 – Hoàn thiện Trang chủ

- **Công cụ:** Claude
- **Bước đề bài:** 
- **Mục đích:** Hỗ trợ code trang chủ và giải thích code.

**Prompt (nguyên văn):**

````text
# PROMPT: HOÀN THIỆN TRANG CHỦ INDEX.HTML – WEBSITE PAWCARE

## 1. Vai trò và bối cảnh

Bạn là lập trình viên Frontend hỗ trợ phát triển website thương mại điện tử PawCare bằng HTML5 và CSS3 thuần.

Tôi là sinh viên đang học HTML/CSS và thực hiện dự án nhóm. Tôi cần bạn đề xuất chỉnh sửa code dựa trên các file hiện có, giải thích ngắn gọn những thay đổi quan trọng và giúp tôi hiểu cách kiểm tra kết quả.

Đây là dự án nhóm được thực hiện theo từng task tuần tự. Các task trước đã hoàn thành phần header, footer thống nhất cho cả bốn trang và CSS dùng chung. Vì vậy, nhiệm vụ hiện tại chỉ tập trung hoàn thiện nội dung trang chủ `index.html` và CSS riêng của trang này.

Tôi sẽ cung cấp  tài liệu và mã nguồn mới nhất. 

## **2. Nhiệm vụ của task**

Hoàn thiện trang chủ PawCare với các khu vực sau:

1. Banner giới thiệu PawCare:

   - Tiêu đề chính: **Chăm sóc thú cưng, an tâm từng khoảnh khắc.**

   - Mô tả ngắn: PawCare mang đến trải nghiệm chăm sóc thú cưng tiện lợi với dịch vụ grooming chuyên nghiệp, báo giá minh bạch và đặt lịch trực tuyến theo thời gian trống của groomer.

   - CTA chính: **Đặt lịch ngay**.

   - CTA phụ (nếu bố cục hiện tại phù hợp): **Khám phá dịch vụ**.

   - Ảnh banner - hiện đã quy ước tên nhưng chưa có nội dung, bạn cứ code đúng mã tên vào đi ảnh sẽ update sau\

2. Khu vực Dịch vụ nổi bật:

   - Hiển thị 4 thẻ dịch vụ (cơ sở chọn từ index.html và readme.md trong thư mục images), mỗi thẻ gồm:

     - Hình ảnh minh họa.

     - Tên dịch vụ.

     - Mô tả ngắn.

     - Thông tin giá hoặc hướng dẫn xem giá.

     - Liên kết xem chi tiết.

   - **Quy định về hiển thị giá:**
     PawCare sử dụng công cụ báo giá tự động dựa trên thông tin thú cưng, thay vì một mức giá cố định áp dụng cho tất cả trường hợp.
     Các yếu tố tính giá gồm:

     - Loài thú cưng.

     - Mốc cân nặng.

     - Độ dài lông (ngắn hoặc dài).\

   - Giá cuối cùng được xác định sau khi khách hàng lựa chọn các thông tin trên công cụ báo giá.
     Do đó:

     - Không tự đặt giá cụ thể cho các dịch vụ.

     - Không hiển thị những mức giá giả định trên thẻ dịch vụ.

     - Sử dụng nội dung thống nhất: **"Giá từ công cụ báo giá"** hoặc **"Tính giá theo đặc điểm của bé"**.

     - Có thể thêm một dòng hướng dẫn ngắn: "Chọn cân nặng và độ dài lông để nhận báo giá phù hợp".

     - Mỗi thẻ có liên kết "Xem chi tiết" hoặc "Tính giá".\

   - Bên dưới khu vực này có liên kết **"Xem tất cả dịch vụ"**.
     **Danh mục dịch vụ hiện có của PawCare (7 dịch vụ):**

     - Tắm sấy.

     - Cắt tỉa tạo kiểu.

     - Vệ sinh tai.

     - Cắt móng.

     - Combo Tắm sấy + Vệ sinh tai + Cắt móng.

     - Combo Tắm sấy + Cắt tỉa.

     - Trọn gói.

   - Chỉ hiển thị 4 dịch vụ nổi bật đã chọn ở trên tại trang chủ. Các dịch vụ còn lại được xem trong trang danh sách dịch vụ.

3. Khu vực Sản phẩm nổi bật:
   Hiển thị 4 thẻ sản phẩm ((cơ sở chọn từ index.html và readme.md trong thư mục images), mỗi thẻ gồm:

   - Hình ảnh sản phẩm.

   - Tên sản phẩm.

   - Vị trí hiển thị giá.

   - Liên kết xem chi tiết.

4. **Quy định về giá:**

   - Để trống phần giá trị giá bán hoặc sử dụng placeholder phù hợp để tôi tự điền số sau.

   - Không tự đặt giá.

   - Thiết kế vị trí giá thống nhất giữa các thẻ.

   - Mỗi sản phẩm có liên kết "Xem chi tiết".

5. Bên dưới khu vực này có liên kết **"Xem tất cả sản phẩm"**.
   **Danh mục sản phẩm hiện có của PawCare (8 sản phẩm):**

   - Thức ăn hạt chó.

   - Thức ăn hạt mèo.

   - Pate mèo.

   - Snack thưởng chó.

   - Đồ gặm chó.

   - Vòng cổ và dây dắt.

   - Bát ăn.

   - Lược chải lông.

6. Chỉ hiển thị 4 sản phẩm nổi bật đã chọn ở trên tại trang chủ.

7. Khu vực Vì sao chọn PawCare:

   - Mỗi ô gồm:

     - Icon hoặc hình minh họa nhỏ.

     - Tiêu đề.

     - Mô tả ngắn.

   - **Ba nội dung được chốt:**
     **Ô 1: Đặt lịch chủ động, không cần chờ xác nhận**
     Mô tả: Xem giờ trống, lựa chọn groomer phù hợp hoặc để PawCare tự sắp xếp. Hệ thống hỗ trợ giữ chỗ trong 10 phút và hạn chế trùng lịch.
     **Ô 2: Minh bạch chi phí trước khi đặt**
     Mô tả: Nhận báo giá dựa trên loài, cân nặng và độ dài lông của thú cưng. Biết trước chi phí dự kiến và thời lượng dịch vụ trước khi xác nhận lịch hẹn.
     **Ô 3: Hồ sơ chăm sóc riêng cho từng bé**
     Mô tả: Lưu trữ thông tin thú cưng, theo dõi lịch sử grooming và phiếu kết quả sau dịch vụ. PawCare còn hỗ trợ gợi ý khẩu phần ăn, sản phẩm và chu kỳ chăm sóc phù hợp.
     Bên dưới có liên kết **"Tìm hiểu thêm về PawCare"** dẫn đến trang giới thiệu.

8. CSS riêng của trang chủ:

   - Bổ sung hoặc điều chỉnh các class cần thiết để hoàn thiện giao diện.

   - Đảm bảo responsive theo hệ thống thiết kế hiện có.

   - Không làm ảnh hưởng các trang còn lại.

## 3. Các file cần kiểm tra trước khi chỉnh sửa

Hãy đọc các file sau trong repository:
**File HTML:**

- `index.html`: trang chủ cần hoàn thiện.
- `products.html`: kiểm tra cấu trúc và cách liên kết tới trang danh sách.
- `product-detail.html`: kiểm tra cấu trúc và cách liên kết tới trang chi tiết.

**File CSS:**

- `css/style.css`

**Tài liệu:**

- `docs/ui-design.md`: hệ thống thiết kế giao diện.

Nếu có tài liệu mới hơn hoặc nội dung mâu thuẫn với thông tin trong prompt, hãy ưu tiên phiên bản đã cập nhật trong repository và báo cáo những điểm mâu thuẫn đáng chú ý.

## 4. Tài nguyên hình ảnh

Dự án có thư mục `images/`, dự kiến phân chia như sau:

### 4.1. Banner và hình ảnh cửa hàng

| Đường dẫn dự kiến                    | Mục đích                        |
| ------------------------------------ | ------------------------------- |
| `images/pages/banner-trangchu.jpg`   | Banner trang chủ                |
| `images/pages/gioithieu-cuahang.jpg` | Ảnh cửa hàng ở trang giới thiệu |

### 4.2. Hình ảnh dịch vụ

| Đường dẫn dự kiến                 | Tên dịch vụ      |
| --------------------------------- | ---------------- |
| `images/services/tam-say.jpg`     | Tắm sấy          |
| `images/services/cat-tia.jpg`     | Cắt tỉa tạo kiểu |
| `images/services/ve-sinh-tai.jpg` | Vệ sinh tai      |
| `images/services/cat-mong.jpg`    | Cắt móng         |

### 4.3. Hình ảnh sản phẩm

| Đường dẫn dự kiến                    | Tên sản phẩm         | Dùng ở trang chủ |
| ------------------------------------ | -------------------- | ---------------- |
| `images/products/thucan-hat-cho.jpg` | Thức ăn hạt cho chó  | Có               |
| `images/products/thucan-hat-meo.jpg` | Thức ăn hạt cho mèo  | Có               |
| `images/products/pate-meo.jpg`       | Pate cho mèo         | Có               |
| `images/products/snack-cho.jpg`      | Snack thưởng cho chó | Có               |
| `images/products/do-gam-cho.jpg`     | Đồ gặm cho chó       | Không            |
| `images/products/vongco-daydat.jpg`  | Vòng cổ và dây dắt   | Không            |
| `images/products/bat-an.jpg`         | Bát ăn               | Không            |
| `images/products/luoc-chai-long.jpg` | Lược chải lông       | Không            |

Đây là danh sách tài nguyên dự kiến, không phải xác nhận rằng tất cả file đã tồn tại.

**Yêu cầu bắt buộc:**

- Sử dụng đúng đường dẫn tương đối tính từ vị trí của `index.html`.
- Không tự đặt tên file hoặc sử dụng ảnh không tồn tại.
- Nếu ảnh chưa tồn tại, hãy báo cáo cụ thể file nào đang thiếu và giữ lại một giải pháp tạm thời phù hợp, không tạo đường dẫn ảnh giả.
- Tất cả ảnh nội dung phải sử dụng thẻ `<img>` với thuộc tính `alt` mô tả đúng nội dung ảnh.
- Không sử dụng `background-image` thay cho thẻ `<img>` đối với các ảnh banner, dịch vụ và sản phẩm cần có văn bản thay thế.
- Sử dụng `object-fit` và tỷ lệ khung hình phù hợp để ảnh không bị méo hoặc biến dạng.

Liên kết xem chi tiết sử dụng `product-detail.html` nếu phù hợp với cấu trúc hiện tại.

Liên kết "Xem tất cả sản phẩm" dẫn tới `products.html`.

Bảo toàn về header và footer: Nếu phát hiện lỗi thực sự trong header/footer ảnh hưởng đến trang chủ, hãy báo cáo trước, không tự mở rộng phạm vi công việc.

## 7. Quy định về CSS

Hãy kiểm tra CSS dùng chung hiện tại trước khi tạo class mới.

**Nguyên tắc:**

1. Tận dụng các class dùng chung đã có.
2. Chỉ bổ sung class riêng khi thực sự cần thiết cho trang chủ.
3. Không thay đổi các quy tắc CSS dùng chung của header, footer, nút, card hoặc responsive nếu không cần thiết.
4. Không sử dụng JavaScript hoặc framework CSS.

### Responsive

Đảm bảo trang chủ hiển thị phù hợp tại ba kích thước kiểm thử:

| Thiết bị | Chiều rộng | Yêu cầu                                  |
| -------- | ---------: | ---------------------------------------- |
| Desktop  |     1366px | Banner 2 cột, các card 4 cột             |
| Tablet   |      768px | Banner 2 cột nếu phù hợp, các card 2 cột |
| Mobile   |      390px | Banner xếp dọc, các card 1 cột           |

Sử dụng các breakpoint hiện có trong `style.css` nếu phù hợp:

- Tablet: `max-width: 1023px`.
- Mobile: `max-width: 599px`.

## 8. Các file được phép chỉnh sửa

**Được phép:**

- `index.html`: hoàn thiện nội dung bên trong `<main>`.
- `css/style.css`: bổ sung CSS riêng cho trang chủ.

**Không được tự ý chỉnh sửa:**

- Header và footer của cả bốn trang.
- `docs/ui-design.md`.

Nếu phát hiện cần thay đổi file ngoài phạm vi trên, hãy nêu lý do và xin xác nhận trước.

## 9. Quy trình thực hiện

Thực hiện tuần tự theo các bước sau:

### Bước 1. Kiểm tra repository

- Đọc các file và tài liệu được yêu cầu.
- Kiểm tra chính xác đường dẫn CSS.
- Kiểm tra các ảnh thực tế trong thư mục `images/`.
- Kiểm tra cấu trúc HTML hiện tại của bốn trang.
- Xác định các class CSS có thể tái sử dụng.
- Kiểm tra nội dung và thông tin giá hiện có.

### Bước 2. Lập kế hoạch

Trước khi sửa code, hãy trình bày ngắn gọn:

- Các khu vực cần hoàn thiện trong `index.html`.
- Các hình ảnh có thể sử dụng và hình ảnh còn thiếu.
- Các class CSS có thể tái sử dụng.
- Những class mới dự kiến bổ sung.
- Những thông tin nội dung hoặc giá chưa được cung cấp.

### Bước 3. Tiến hành chỉnh sửa

### Bước 4. Kiểm tra sau chỉnh sửa

### Bước 5. Báo cáo kết quả

Sau khi hoàn thành, hãy báo cáo:

1. Những file đã chỉnh sửa.
2. Những khu vực đã hoàn thiện.
3. Những class CSS mới được thêm và mục đích sử dụng.
4. Các hình ảnh còn thiếu hoặc thông tin chưa được cung cấp.
5. Kết quả kiểm tra HTML, liên kết và responsive.
6. Những điểm tôi cần tự kiểm tra trước khi tạo Pull Request.

## 10. Cách giải thích cho người mới học

Tôi đang học HTML/CSS nên cần hiểu code bạn đã chỉnh sửa, không chỉ nhận kết quả.

Hãy giải thích ngắn gọn bằng tiếng Việt:

- Cấu trúc của từng khu vực trong `<main>`.
- Cách sử dụng `<section>` và `<article>` trong trang chủ.
- Cách sử dụng `<img>` và thuộc tính `alt`.
- Cách các class CSS dùng chung được tái sử dụng.
- Cách CSS Grid/Flexbox bố trí các card.
- Cách media query giúp giao diện thay đổi theo kích thước màn hình.

Không cần giải thích lại toàn bộ HTML/CSS cơ bản. Chỉ tập trung vào những phần mới hoặc đã thay đổi trong task này.
````
### Nhật ký của Phạm Bảo Ngọc
#### B2-PBN-01 – Xây dựng danh sách sản phẩm (products.html)
- **Công cụ:** Claude
- **Bước đề bài:** Bước 5 (Mục 6) Xây dựng trang danh sách sản phẩm
- **Mục đích:** Hoàn thiện danh sách 7 dịch vụ + 8 sản phẩm bán kèm; lưới 4/2/1 cột ở 1366/768/390 px; thẻ cao đều; ảnh có alt; hover/focus; không dùng JavaScript, framework CSS hay backend; chỉ sửa phần cần thiết.

**Prompt (nguyên văn):**

````text
Nhóm tôi đang xây dựng trang products.html cho cửa hàng thương mại điện tử.

HTML hiện tại:
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dịch vụ &amp; Sản phẩm – PawCare (wireframe)</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <!-- ===== HEADER (giống hệt ở 4 trang, chỉ khác aria-current) ===== -->
  <header class="site-header">
    <div class="container header-inner">
      <!-- Logo vuông thật + chữ PawCare (alt rỗng vì đã có chữ PawCare bên cạnh) -->
      <a class="logo" href="index.html">
        <img class="logo-img" src="images/logo/logo-icon.png" alt="" width="40" height="40">
        PawCare
      </a>

      <!-- Menu chính: 3 liên kết -->
      <nav class="main-nav" aria-label="Menu chính">
        <ul class="nav-list">
          <li><a href="index.html">Trang chủ</a></li>
          <li><a href="products.html" aria-current="page">Dịch vụ &amp; Sản phẩm</a></li>
          <li><a href="about.html">Giới thiệu</a></li>
        </ul>
      </nav>

      <!-- Ô tìm kiếm: chỉ là giao diện, không có form gửi dữ liệu -->
      <div class="search" role="search">
        <label for="search-input">Tìm kiếm</label>
        <!-- Icon kính lúp (Lucide "search"), kế thừa màu từ CSS qua currentColor -->
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
        <input id="search-input" type="search" placeholder="Tìm dịch vụ, sản phẩm">
      </div>

      <!-- Nút Đặt lịch dẫn tới trang danh sách -->
      <a class="btn btn-primary header-btn" href="products.html">
        <!-- Icon lịch (Lucide "calendar") -->
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
          <path d="M8 2v4"></path>
          <path d="M16 2v4"></path>
          <rect width="18" height="18" x="3" y="4" rx="2"></rect>
          <path d="M3 10h18"></path>
        </svg>
        Đặt lịch
      </a>

      <!-- Biểu tượng giỏ hàng (Lucide "shopping-cart"), chưa xử lý nghiệp vụ -->
      <div class="cart-box" role="img" aria-label="Giỏ hàng">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
          <circle cx="8" cy="21" r="1"></circle>
          <circle cx="19" cy="21" r="1"></circle>
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
        </svg>
      </div>
    </div>
  </header>

  <main class="container">
    <!-- ===== GHI CHÚ WIREFRAME ===== -->
    <details class="wireframe-note">
      <summary>Ghi chú wireframe</summary>
      <p><strong>Mục đích:</strong> cho khách xem toàn bộ dịch vụ (chức năng chính) và sản phẩm bán kèm (phần phụ), rồi bấm vào trang chi tiết.</p>
      <ul>
        <li><strong>Thành phần:</strong> tiêu đề trang, phần Dịch vụ (7 thẻ), phần Sản phẩm bán kèm (8 thẻ).</li>
        <li><strong>Máy tính (1366px):</strong> lưới 4 cột.</li>
        <li><strong>Máy tính bảng (768px):</strong> lưới 2 cột.</li>
        <li><strong>Điện thoại (390px):</strong> lưới 1 cột.</li>
        <li>Thẻ trong cùng lưới cao đều nhau; nút "Xem chi tiết" luôn nằm ở đáy thẻ.</li>
        <li>⚠ Tên combo và danh sách sản phẩm đang chờ nhóm chốt.</li>
      </ul>
    </details>

    <!-- ===== TIÊU ĐỀ TRANG ===== -->
    <div class="page-head">
      <h1>Dịch vụ &amp; Sản phẩm</h1>
      <p class="page-desc">[mô tả ngắn cho trang danh sách]</p>
    </div>

    <!-- ===== DỊCH VỤ (7 thẻ) ===== -->
    <section class="section" aria-labelledby="services-title">
      <div class="section-head">
        <h2 id="services-title">Dịch vụ</h2>
      </div>

      <div class="grid grid-4">
        <article class="card">
          <div class="img-box" role="img" aria-label="Ảnh dịch vụ Tắm sấy">Ảnh dịch vụ</div>
          <h3 class="card-title">Tắm sấy</h3>
          <p class="card-price">[giá]</p>
          <a class="btn btn-outline card-action" href="product-detail.html" aria-label="Xem chi tiết Tắm sấy">Xem chi tiết</a>
        </article>

        <article class="card">
          <div class="img-box" role="img" aria-label="Ảnh dịch vụ Cắt tỉa tạo kiểu">Ảnh dịch vụ</div>
          <h3 class="card-title">Cắt tỉa tạo kiểu</h3>
          <p class="card-price">[giá]</p>
          <a class="btn btn-outline card-action" href="product-detail.html" aria-label="Xem chi tiết Cắt tỉa tạo kiểu">Xem chi tiết</a>
        </article>

        <article class="card">
          <div class="img-box" role="img" aria-label="Ảnh dịch vụ Vệ sinh tai">Ảnh dịch vụ</div>
          <h3 class="card-title">Vệ sinh tai</h3>
          <p class="card-price">[giá]</p>
          <a class="btn btn-outline card-action" href="product-detail.html" aria-label="Xem chi tiết Vệ sinh tai">Xem chi tiết</a>
        </article>

        <article class="card">
          <div class="img-box" role="img" aria-label="Ảnh dịch vụ Cắt móng">Ảnh dịch vụ</div>
          <h3 class="card-title">Cắt móng</h3>
          <p class="card-price">[giá]</p>
          <a class="btn btn-outline card-action" href="product-detail.html" aria-label="Xem chi tiết Cắt móng">Xem chi tiết</a>
        </article>

        <!-- ⚠ Tên combo chờ nhóm chốt -->
        <article class="card">
          <div class="img-box" role="img" aria-label="Ảnh dịch vụ Combo Tắm sấy, Vệ sinh tai, Cắt móng">Ảnh dịch vụ</div>
          <h3 class="card-title">Combo Tắm sấy + Vệ sinh tai + Cắt móng</h3>
          <p class="card-price">[giá]</p>
          <a class="btn btn-outline card-action" href="product-detail.html" aria-label="Xem chi tiết Combo Tắm sấy, Vệ sinh tai, Cắt móng">Xem chi tiết</a>
        </article>

        <article class="card">
          <div class="img-box" role="img" aria-label="Ảnh dịch vụ Combo Tắm sấy, Cắt tỉa">Ảnh dịch vụ</div>
          <h3 class="card-title">Combo Tắm sấy + Cắt tỉa</h3>
          <p class="card-price">[giá]</p>
          <a class="btn btn-outline card-action" href="product-detail.html" aria-label="Xem chi tiết Combo Tắm sấy, Cắt tỉa">Xem chi tiết</a>
        </article>

        <article class="card">
          <div class="img-box" role="img" aria-label="Ảnh dịch vụ Trọn gói">Ảnh dịch vụ</div>
          <h3 class="card-title">Trọn gói</h3>
          <p class="card-price">[giá]</p>
          <a class="btn btn-outline card-action" href="product-detail.html" aria-label="Xem chi tiết Trọn gói">Xem chi tiết</a>
        </article>
      </div>
    </section>

    <!-- ===== SẢN PHẨM BÁN KÈM (8 thẻ) ⚠ danh sách chờ nhóm chốt ===== -->
    <section class="section" aria-labelledby="products-title">
      <div class="section-head">
        <h2 id="products-title">Sản phẩm bán kèm</h2>
      </div>

      <div class="grid grid-4">
        <article class="card">
          <div class="img-box" role="img" aria-label="Ảnh sản phẩm Thức ăn hạt cho chó">Ảnh sản phẩm</div>
          <h3 class="card-title">Thức ăn hạt cho chó</h3>
          <p class="card-price">[giá]</p>
          <a class="btn btn-outline card-action" href="product-detail.html" aria-label="Xem chi tiết Thức ăn hạt cho chó">Xem chi tiết</a>
        </article>

        <article class="card">
          <div class="img-box" role="img" aria-label="Ảnh sản phẩm Thức ăn hạt cho mèo">Ảnh sản phẩm</div>
          <h3 class="card-title">Thức ăn hạt cho mèo</h3>
          <p class="card-price">[giá]</p>
          <a class="btn btn-outline card-action" href="product-detail.html" aria-label="Xem chi tiết Thức ăn hạt cho mèo">Xem chi tiết</a>
        </article>

        <article class="card">
          <div class="img-box" role="img" aria-label="Ảnh sản phẩm Pate cho mèo">Ảnh sản phẩm</div>
          <h3 class="card-title">Pate cho mèo</h3>
          <p class="card-price">[giá]</p>
          <a class="btn btn-outline card-action" href="product-detail.html" aria-label="Xem chi tiết Pate cho mèo">Xem chi tiết</a>
        </article>

        <article class="card">
          <div class="img-box" role="img" aria-label="Ảnh sản phẩm Snack thưởng cho chó">Ảnh sản phẩm</div>
          <h3 class="card-title">Snack thưởng cho chó</h3>
          <p class="card-price">[giá]</p>
          <a class="btn btn-outline card-action" href="product-detail.html" aria-label="Xem chi tiết Snack thưởng cho chó">Xem chi tiết</a>
        </article>

        <article class="card">
          <div class="img-box" role="img" aria-label="Ảnh sản phẩm Đồ gặm cho chó">Ảnh sản phẩm</div>
          <h3 class="card-title">Đồ gặm cho chó</h3>
          <p class="card-price">[giá]</p>
          <a class="btn btn-outline card-action" href="product-detail.html" aria-label="Xem chi tiết Đồ gặm cho chó">Xem chi tiết</a>
        </article>

        <article class="card">
          <div class="img-box" role="img" aria-label="Ảnh sản phẩm Vòng cổ và dây dắt">Ảnh sản phẩm</div>
          <h3 class="card-title">Vòng cổ và dây dắt</h3>
          <p class="card-price">[giá]</p>
          <a class="btn btn-outline card-action" href="product-detail.html" aria-label="Xem chi tiết Vòng cổ và dây dắt">Xem chi tiết</a>
        </article>

        <article class="card">
          <div class="img-box" role="img" aria-label="Ảnh sản phẩm Bát ăn">Ảnh sản phẩm</div>
          <h3 class="card-title">Bát ăn</h3>
          <p class="card-price">[giá]</p>
          <a class="btn btn-outline card-action" href="product-detail.html" aria-label="Xem chi tiết Bát ăn">Xem chi tiết</a>
        </article>

        <article class="card">
          <div class="img-box" role="img" aria-label="Ảnh sản phẩm Lược chải lông">Ảnh sản phẩm</div>
          <h3 class="card-title">Lược chải lông</h3>
          <p class="card-price">[giá]</p>
          <a class="btn btn-outline card-action" href="product-detail.html" aria-label="Xem chi tiết Lược chải lông">Xem chi tiết</a>
        </article>
      </div>
    </section>
  </main>

  <!-- ===== FOOTER (giống hệt ở 4 trang) ===== -->
  <footer class="site-footer">
    <div class="container">
      <p class="footer-brand">PawCare</p>

      <div class="footer-cols">
        <div>
          <h2 class="footer-title">Liên kết nhanh</h2>
          <ul class="footer-list">
            <li><a href="index.html">Trang chủ</a></li>
            <li><a href="products.html">Dịch vụ &amp; Sản phẩm</a></li>
            <li><a href="about.html">Giới thiệu</a></li>
          </ul>
        </div>

        <div>
          <h2 class="footer-title">Liên hệ</h2>
          <ul class="footer-list">
            <li>Địa chỉ: 279 Nguyễn Tri Phương, Phường Diên Hồng</li>
            <li>Hotline: 0123456789</li>
            <li>Email: pawcare@ueh.edu.st.vn</li>
          </ul>
        </div>

        <div>
          <h2 class="footer-title">Giờ mở cửa</h2>
          <p>8:00–19:00</p>
        </div>
      </div>

      <p class="copyright">© 2026 PawCare. [nội dung bản quyền]</p>
    </div>
  </footer>

</body>
</html>

CSS hiện tại:
/* =========================================================
   PawCare – WIREFRAME (độ chi tiết thấp)
   File CSS dùng chung cho cả 4 trang.
   Thứ tự đọc file:
     1. Biến CSS          6. Khung ảnh giả
     2. Nền tảng          7. Lưới và thẻ (card)
     3. Khung chứa        8. Riêng từng trang
     4. Header            9. Footer
     5. Nút và liên kết  10. Responsive (768px, 390px)
   Cách viết: "desktop trước" – kiểu mặc định dành cho 1366px,
   media query bên dưới ghi đè cho máy tính bảng và điện thoại.
   ========================================================= */

@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap");
/* ---------- 1. BIẾN CSS ----------
   Muốn đổi bảng màu thật sau này: chỉ sửa giá trị ở đây. */
:root {
 /* Màu – theo docs/ui-design.md, mục 1 */
  --color-bg: #F8F9FA;             /* nền web */
  --color-card: #FFFFFF;           /* nền card, header, ô nhập */
  --color-surface: var(--color-card); /* nền khối phụ (docs chưa quy định riêng → dùng màu card) */
  --color-text: #212529;           /* chữ chính */
  --color-muted: #5C6570;          /* chữ phụ */
  --color-primary: #007A6E;        /* màu chính: liên kết, viền nút phụ */
  --color-primary-hover: #00665C;  /* hover, focus */
  --color-on-primary: #FFFFFF;     /* chữ đặt trên nền màu chính/hover */
  --color-accent: #FC7060;         /* nền nút chính */
  --color-logo: #00A090;           /* màu logo – chỉ dùng trang trí */
  --color-border: var(--color-muted); /* docs chưa quy định màu viền → dùng màu chữ phụ (≥ 3:1) */
  --color-placeholder: #D9D9D9;    /* TẠM: nền khung ảnh giả, xóa khi có ảnh thật */
  /* Màu bổ sung cho Header (docs chưa quy định → cần cập nhật docs) */
  --color-header-bg: #E8F5F3;      /* nền Header: teal nhạt (phương án B). A: var(--color-card), C: #FFF3F0 */
  --color-accent-hover: #EF6551;   /* hover nút Đặt lịch: cam đậm hơn một chút (chữ #212529 ≈ 4,9:1) */
  --color-focus-ring: #BFDEDB;     /* vầng sáng teal quanh ô tìm kiếm khi focus */
  --color-header-line: #B8DCD7;    /* đường kẻ dưới Header: teal nhạt, chỉ trang trí */
  --radius-pill: 999px;            /* bo tròn hoàn toàn cho ô tìm kiếm */
  /* Khoảng cách – luôn là bội của 8px */
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-6: 48px;
  --space-8: 64px;

  /* Chữ, bo góc, viền */
  --font-base: "Nunito", system-ui, sans-serif;
  --radius: 8px;                   /* nút, ô nhập */
  --radius-card: 12px;             /* card */
  --border-width: 2px;

  /* Chiều rộng tối đa của nội dung */
  --container-width: 1200px;
}


/* ---------- 2. NỀN TẢNG ---------- */

/* Tính width/height gồm cả padding và viền → dễ canh, tránh tràn ngang */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  font-family: var(--font-base);
  font-size: 1rem;              /* 16px */
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-text);
  background-color: var(--color-bg);
}

img {
  max-width: 100%;
  height: auto;
}

button,
input {
  font: inherit;
}

h1,
h2,
h3 {
  margin: 0 0 var(--space-2);
  line-height: 1.25;
  color: var(--color-text);
}

h1 { font-size: 2rem;    font-weight: 700; }  /* 32px */
h2 { font-size: 1.5rem;  font-weight: 700; }  /* 24px */
h3 { font-size: 1.25rem; font-weight: 600; }  /* 20px */

p {
  margin: 0 0 var(--space-2);
}

/* Liên kết chữ: màu chính (≈4,9:1 trên nền web), hover đổi màu + gạch dày hơn */
a {
  color: var(--color-primary);
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
}

a:hover {
  color: var(--color-primary-hover);
  text-decoration-thickness: 3px;
}

/* Focus bàn phím: dùng màu hover đậm (≈7:1) thay vì màu nhấn cam (chỉ ≈2,6:1) */
a:focus-visible,
button:focus-visible,
input:focus-visible,
summary:focus-visible {
  outline: 3px solid var(--color-primary-hover);
  outline-offset: 2px;
}


/* ---------- 3. KHUNG CHỨA ---------- */

/* Giữ nội dung ở giữa, không rộng quá 1200px */
.container {
  width: 100%;
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 var(--space-3);
}

/* Mỗi khu nội dung lớn cách nhau đều */
.section {
  padding: var(--space-6) 0;
}

/* Dòng tiêu đề khu + liên kết "Xem tất cả" nằm cùng hàng (Flexbox) */
.section-head {
  display: flex;
  flex-wrap: wrap;               /* hẹp quá thì liên kết xuống dòng */
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
}

.section-head h2 {
  margin: 0;
}

/* Khối "Ghi chú wireframe" (thẻ details, đóng sẵn) */
.wireframe-note {
  margin: var(--space-3) 0;
  padding: var(--space-2);
  background-color: var(--color-surface);
  border: var(--border-width) dashed var(--color-border);
  border-radius: var(--radius);
}

.wireframe-note summary {
  font-weight: 600;
  cursor: pointer;
}

.wireframe-note p,
.wireframe-note ul {
  margin: var(--space-1) 0 0;
}

.wireframe-note ul {
  padding-left: var(--space-3);
}


/* ---------- 4. HEADER ---------- */

.site-header {
  background-color: var(--color-header-bg);
  /* Đường kẻ mảnh 1px, chỉ trang trí */
  border-bottom: 1px solid var(--color-header-line);
}

/* Flexbox: xếp logo – menu – tìm kiếm – nút – giỏ hàng trên một hàng */
.header-inner {
  display: flex;
  flex-wrap: wrap;               /* cho phép xuống hàng ở màn hình nhỏ */
  align-items: center;
  gap: var(--space-2);
  padding-top: var(--space-2);
  padding-bottom: var(--space-2);
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: 20px;
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: none;
}

.logo:hover {
  color: var(--color-primary-hover);
}

.logo-img {
  display: block;
  width: 40px;
  height: 40px;
  object-fit: contain;
}

/* Menu chiếm phần trống còn lại, đẩy ô tìm kiếm sang phải */
.main-nav {
  flex: 1;
}

.nav-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Viền trong suốt có sẵn → hover chỉ đổi màu, không đổi kích thước */
.nav-list a {
  display: block;
  padding: var(--space-1) var(--space-2);
  color: var(--color-text);
  text-decoration: none;
  border: var(--border-width) solid transparent;
  border-radius: var(--radius);
  transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
}

.nav-list a:hover {
  color: var(--color-primary-hover);
  background-color: var(--color-card);
  border-color: var(--color-primary-hover);
}

/* Trang hiện tại: bắt cả aria-current="page" và "true". Đặt SAU :hover */
.nav-list a[aria-current] {
  color: var(--color-primary);
  background-color: var(--color-card);
  border-color: var(--color-primary);
}

/* Ô tìm kiếm – chỉ là giao diện.
   .search là khung định vị: icon kính lúp nằm tuyệt đối bên trái ô nhập. */
.search {
  position: relative;
  display: flex;
  align-items: center;
}

/* Nhãn chỉ dành cho trình đọc màn hình (icon + placeholder đã đủ nghĩa với mắt thường) */
.search label {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.search svg {
  position: absolute;
  top: 50%;
  left: var(--space-2);
  width: 20px;
  height: 20px;
  color: var(--color-muted);
  transform: translateY(-50%);
  pointer-events: none;          /* bấm vào icon vẫn rơi vào ô nhập */
  transition: color 0.2s ease;
}

.search input {
  width: 240px;
  min-height: 40px;
  padding: 0 var(--space-2) 0 var(--space-6);  /* chừa chỗ cho icon bên trái */
  font: inherit;
  color: var(--color-text);
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  -webkit-appearance: none;      /* Safari: cho phép bo tròn ô type="search" */
  appearance: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search input::placeholder {
  color: var(--color-muted);
  opacity: 1;
}

.search input:hover {
  border-color: var(--color-primary);
}

/* Focus: viền đậm thêm 1px + vầng sáng teal. Không đổi kích thước ô.
   outline trong suốt vẫn hiện ở chế độ High Contrast của Windows. */
.search input:focus-visible {
  border-color: var(--color-primary-hover);
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 1px var(--color-primary-hover),
              0 0 0 4px var(--color-focus-ring);
}

.search:focus-within svg {
  color: var(--color-primary-hover);
}

/* Nút Đặt lịch: icon lịch + chữ, canh giữa theo chiều dọc */
.header-btn {
  gap: var(--space-1);
}

.header-btn svg {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

/* Biểu tượng giỏ hàng (chưa có nghiệp vụ) */
.cart-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--color-primary);
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}

.cart-box svg {
  width: 20px;
  height: 20px;
}
/* Người dùng bật "giảm chuyển động" → tắt hiệu ứng chuyển màu */
@media (prefers-reduced-motion: reduce) {
  .btn,
  .nav-list a,
  .search svg,
  .search input {
    transition: none;
  }
}


/* ---------- 5. NÚT ---------- */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: var(--space-1) var(--space-3);
  font: inherit;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  border: var(--border-width) solid var(--color-primary);
  border-radius: var(--radius);
  cursor: pointer;  
  transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
}

/* Nút chính: nền nhấn cam, chữ tối (≈5,7:1). Hover: nền #00665C, chữ trắng */
.btn-primary {
  color: var(--color-text);
  background-color: var(--color-accent);
  border-color: var(--color-accent);
}

.btn-primary:hover {
  color: var(--color-on-primary);
  background-color: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
}

/* Nút phụ: nền trắng, viền + chữ màu chính. Hover: nền #00665C, chữ trắng */
.btn-outline {
  color: var(--color-primary);
  background-color: var(--color-card);
  border-color: var(--color-primary);
}

.btn-outline:hover {
  color: var(--color-on-primary);
  background-color: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
}

/* Docs: nút phụ khi focus có vòng viền 2px */
.btn-outline:focus-visible {
  outline-width: var(--border-width);
}

/* Nút to, dễ bấm (trang chi tiết) */
.btn-large {
  width: 100%;
  max-width: 320px;
  min-height: 56px;
  padding: var(--space-2) var(--space-4);
  font-size: 18px;
}


/* ---------- 6. KHUNG ẢNH GIẢ ---------- */

/* Khung xám có nhãn, thay cho ảnh thật */
.img-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 4 / 3;          /* giữ tỉ lệ khung dù rộng hẹp thế nào */
  padding: var(--space-1);
  font-size: 14px;
  text-align: center;
  color: var(--color-text);
  background-color: var(--color-placeholder);
  border: var(--border-width) dashed var(--color-border);
  border-radius: var(--radius);
}

.img-box-wide {
  aspect-ratio: 16 / 10;        /* banner, ảnh chính */
}

.img-box-square {
  aspect-ratio: 1 / 1;          /* ảnh nhỏ (thumbnail) */
}


/* ---------- 7. LƯỚI VÀ THẺ ---------- */

/* CSS Grid cho danh sách thẻ.
   minmax(0, 1fr): cột co lại được, chữ dài không làm tràn ngang. */
.grid {
  display: grid;
  gap: var(--space-3);
}

.grid-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-rows: 1fr;          /* mọi hàng cao bằng hàng cao nhất → thẻ cao đều */
}

.grid-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

/* Thẻ dịch vụ / sản phẩm: nền trắng, bo góc 12px */
.card {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-2);
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
}

.card-title {
  margin: 0;
  overflow-wrap: anywhere;      /* tên dài thì xuống dòng, không tràn */
}

.card-price {
  margin: 0;
  color: var(--color-muted);
}

/* margin-top: auto đẩy nút xuống đáy thẻ → các nút thẳng hàng */
.card-action {
  margin-top: auto;
}

/* Ô "Vì sao chọn PawCare", ô "Giá trị" */
.feature-box {
  padding: var(--space-3);
  background-color: var(--color-surface);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius);
}

.feature-box p {
  margin: 0;
  color: var(--color-muted);
}


/* ---------- 8. RIÊNG TỪNG TRANG ---------- */

/* 8.1 Trang chủ – Banner: Grid 2 cột (chữ trái, ảnh phải) */
.hero {
  padding: var(--space-8) 0;
  background-color: var(--color-surface);
}

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: var(--space-4);
}

.hero-title {
  font-size: 40px;
}

.hero-text {
  font-size: 18px;
  color: var(--color-muted);
}

.more-link {
  margin: var(--space-3) 0 0;
}

/* 8.2 Danh sách – tiêu đề trang */
.page-head {
  padding-top: var(--space-2);
}

.page-desc {
  color: var(--color-muted);
}

/* 8.3 Chi tiết – Grid 2 cột: ảnh trái, thông tin phải */
.back-link {
  display: inline-block;
  margin-bottom: var(--space-3);
}

.detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  gap: var(--space-6);
}

.gallery {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.thumbs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-2);
}

.detail-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.detail-info h2 {
  margin-bottom: var(--space-1);
}

.detail-price {
  font-size: 24px;
  font-weight: 700;
}

/* Danh sách thuộc tính / liên hệ: Grid 2 cột (nhãn – giá trị) */
.attr-list {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: var(--space-1) var(--space-3);
  margin: 0;
}

.attr-list dt {
  font-weight: 600;
}

.attr-list dd {
  margin: 0;
}

/* Bảng giá: nếu quá hẹp thì cuộn trong khung, trang không tràn ngang */
.table-wrap {
  overflow-x: auto;
}

.price-table {
  width: 100%;
  border-collapse: collapse;
}

.price-table caption {
  padding-bottom: var(--space-1);
  text-align: left;
  color: var(--color-muted);
}

.price-table th,
.price-table td {
  padding: var(--space-1) var(--space-2);
  text-align: left;
  border: 1px solid var(--color-border);
}

.price-table thead th {
  background-color: var(--color-surface);
}

/* 8.4 Giới thiệu – Grid 2 cột: chữ trái, ảnh phải */
.about-intro {
  display: grid;
  grid-template-columns: 3fr 2fr;
  align-items: start;
  gap: var(--space-4);
}

.about-text {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.about-text p {
  margin: 0;
}

/* Khối kêu gọi "Đặt lịch" */
.cta-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4);
  background-color: var(--color-surface);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius);
}

.cta-title {
  margin: 0;
  font-size: 20px;
}


/* ---------- 9. FOOTER ---------- */

.site-footer {
  margin-top: var(--space-8);
  padding: var(--space-6) 0 var(--space-3);
  background-color: var(--color-surface);
  border-top: var(--border-width) solid var(--color-border);
}

.footer-brand {
  margin-bottom: var(--space-3);
  font-size: 20px;
  font-weight: 700;
  color: var(--color-primary);
}

/* Grid 3 cột: Liên kết nhanh – Liên hệ – Giờ mở cửa */
.footer-cols {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-4);
}

.footer-title {
  margin-bottom: var(--space-1);
  font-size: 16px;
  font-weight: 700;
}

.footer-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  margin: 0;
  padding: 0;
  list-style: none;
}

.site-footer p {
  margin: 0;
}

.copyright {
  margin-top: var(--space-4);
  padding-top: var(--space-2);
  font-size: 14px;
  color: var(--color-muted);
  border-top: 1px solid var(--color-border);
}


/* ---------- 10. RESPONSIVE ---------- */

/* 10.1 MÁY TÍNH BẢNG (mốc kiểm tra: 768px) */
@media (max-width: 1023px) {
  /* Menu xuống hàng thứ hai, chiếm hết chiều ngang */
  .main-nav {
    order: 5;
    flex-basis: 100%;
  }

  /* Ô tìm kiếm, nút, giỏ hàng dồn sang phải ở hàng một */
  .search {
    margin-left: auto;
  }

  /* 4 cột → 2 cột */
  .grid-4 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hero-title {
    font-size: 32px;
  }

  .detail {
    gap: var(--space-4);
  }

  .about-intro {
    grid-template-columns: 1fr 1fr;
  }
}

/* 10.2 ĐIỆN THOẠI (mốc kiểm tra: 390px) */
@media (max-width: 599px) {
  .container {
    padding: 0 var(--space-2);
  }

  /* Header 3 hàng: [logo ... Đặt lịch, giỏ] / [tìm kiếm] / [menu] */
  .header-btn {
    margin-left: auto;
  }

  .search {
    order: 4;
    flex-basis: 100%;
    margin-left: 0;
  }

  .search input {
    flex: 1;
    width: auto;
    min-width: 0;               /* cho phép ô nhập co lại, tránh tràn */
  }

  /* Mọi lưới thẻ → 1 cột */
  .grid-4,
  .grid-3 {
    grid-template-columns: 1fr;
  }

  .grid-4 {
    grid-auto-rows: auto;       /* 1 cột thì không cần ép cao đều */
  }

  /* Banner xếp dọc: chữ trên, ảnh dưới */
  .hero {
    padding: var(--space-6) 0;
  }

  .hero-inner {
    grid-template-columns: 1fr;
  }

  .hero-title {
    font-size: 28px;
  }

  /* Chi tiết: ảnh trên, thông tin dưới */
  .detail {
    grid-template-columns: 1fr;
  }

  .btn-large {
    max-width: none;
  }

  .about-intro {
    grid-template-columns: 1fr;
  }

  .cta-box {
    flex-direction: column;
    align-items: flex-start;
    padding: var(--space-3);
  }

  .footer-cols {
    grid-template-columns: 1fr;
  }
}

Danh sách sản phẩm:
## 1. Dịch vụ (Services)

| Tên dịch vụ | Giá đề xuất (VNĐ) | Đường dẫn hình ảnh (`src`) |
| :--- | :--- | :--- |
| Tắm sấy | 120.000 | images/services/tam-say.jpg |
| Cắt tỉa tạo kiểu | 200.000 | images/services/cat-tia.jpg |
| Vệ sinh tai | 40.000 | images/services/ve-sinh-tai.jpg |
| Cắt móng | 40.000 | images/services/cat-mong.jpg |
| Combo Tắm sấy + Vệ sinh tai + Cắt móng | 170.000 | images/services/combo-tam-tai-mong.jpg |
| Combo Tắm sấy + Cắt tỉa | 280.000 | images/services/combo-tam-cat-tia.jpg |
| Trọn gói | 350.000 | images/services/combo-tron-goi.jpg |

## 2. Sản phẩm bán kèm (Products)

| Tên sản phẩm | Giá đề xuất (VNĐ) | Đường dẫn hình ảnh (`src`) |
| :--- | :--- | :--- |
| Thức ăn hạt cho chó | 150.000 | images/products/thucan-hat-cho.jpg |
| Thức ăn hạt cho mèo | 135.000 | images/products/thucan-hat-meo.jpg |
| Pate cho mèo | 25.000 | images/products/pate-meo.jpg |
| Snack thưởng cho chó | 45.000 | images/products/snack-cho.jpg |
| Đồ gặm cho chó | 35.000 | images/products/do-gam-cho.jpg |
| Vòng cổ và dây dắt | 85.000 | images/products/vongco-daydat.jpg |
| Bát ăn | 50.000 | images/products/bat-an.jpg |
| Lược chải lông | 65.000 | images/products/luoc-chai-long.jpg |

Hãy giúp nhóm hoàn thiện giao diện danh sách sản phẩm.

Yêu cầu:
1. Hiển thị ít nhất 8 sản phẩm.
2. Các thẻ sản phẩm có cấu trúc nhất quán.
3. Hình ảnh, tên và giá được trình bày rõ ràng.
4. Sử dụng CSS Grid hoặc Flexbox phù hợp.
5. Các sản phẩm có khoảng cách hợp lý.
6. Các nút xem chi tiết có liên kết phù hợp.
7. Có hover và focus khi cần thiết.
8. Có thể điều chỉnh số cột theo kích thước màn hình.

Giải thích vì sao chọn Grid hoặc Flexbox.
Chỉ sửa phần cần thiết.
Không dùng JavaScript, framework CSS hoặc dữ liệu backend.
````

- **Kết quả đạt được:**
  - `products.html`: thay khung ảnh giả bằng `<img>` (có `alt`, `width`/`height`, `loading="lazy"`), điền giá, đổi liên kết thành `product-detail.html?id=<slug>`, điền mô tả trang, thêm dòng nạp `css/products.css`.
  - `css/style.css`: giữ nguyên.
- **Giải thích chọn kỹ thuật:** Grid cho lưới thẻ (bố cục 2 chiều, đổi số cột theo breakpoint, `grid-auto-rows: 1fr` cho thẻ cao đều); Flexbox trong thẻ (xếp dọc, `margin-top: auto` đẩy giá và nút xuống đáy).
- **Kiểm tra:** Đã chạy thử bằng trình duyệt với ảnh tạm ở 1366/768/390 px: đúng 4/2/1 cột, thẻ cùng hàng cao bằng nhau, giá và nút thẳng hàng, không tràn ngang. 

### Nhật ký của Dương Thành Đạt
#### B2-TD-01 – Hoàn thiện nội dung trang giới thiệu (about.html)

- **Công cụ:** Claude
- **Bước đề bài:** Bước 6 (Mục 7.3–7.4), Phần B – Trang giới thiệu cửa hàng
- **Mục đích:** Viết nội dung 2 đoạn giới thiệu và 3 giá trị cho about.html, dựa trên README.md và bảng 4 điểm khác biệt đã chốt trong docx, không thêm thông tin kinh doanh mới.

**Prompt (nguyên văn):**

````text
Nhóm tôi đang xây dựng trang about.html cho cửa hàng thương mại điện tử.

Thông tin cửa hàng:
- Tên: PawCare
- Lĩnh vực: Spa, grooming chó mèo tại TP.HCM (dịch vụ chính), kèm bán thức ăn và phụ kiện thú cưng (phụ)
- Đối tượng khách hàng: Chủ nuôi chó mèo tại TP.HCM, chủ yếu dưới 45 tuổi, mới nuôi hoặc ít kinh nghiệm, hiện đặt lịch qua tin nhắn hoặc hotline
- Điểm nổi bật: (1) Đặt lịch theo giờ trống và chọn groomer, giữ chỗ 10 phút; (2) Báo giá tự động theo loài, cân nặng, độ dài lông; (3) Lộ trình chăm sóc theo hồ sơ từng bé; (4) Dịch vụ và sản phẩm chung một giỏ hàng
- HTML/CSS hiện tại: [dán mã about.html và phần .about-intro, .feature-box trong style.css]

Hãy giúp nhóm hoàn thiện trang giới thiệu.

Yêu cầu:
1. Nội dung được chia thành các phần rõ ràng.
2. Có tiêu đề, đoạn giới thiệu và hình ảnh phù hợp.
3. Bố cục dễ đọc, khoảng cách hợp lý.
4. Sử dụng HTML semantic khi phù hợp.
5. Phong cách nhất quán với các trang khác.
6. Có thể hiển thị tốt trên điện thoại.

Không tự tạo thông tin kinh doanh không có trong dữ liệu.
Chỉ cung cấp phần mã cần bổ sung hoặc chỉnh sửa.
Không sử dụng JavaScript hoặc framework CSS.
````

**Kết quả & kiểm tra:** AI đề xuất nội dung 2 đoạn giới thiệu và 3 giá trị; đối chiếu lại với README.md và bảng 4 điểm khác biệt trong docx trước khi dùng, không có thông tin bịa thêm ngoài dữ liệu nhóm đã chốt. Thông tin liên hệ giữ nguyên dạng placeholder vì cả nhóm chưa chốt.

### Nhật ký của Nguyễn Thị Huỳnh Giao

### Nhật ký của Nguyễn Hoàng Bảo Nghi


