
# Quy trình nghiệp vụ: Đặt lịch dịch vụ grooming

Đây là quy trình nghiệp vụ chính của PawCare, mô tả hành trình của một khách hàng từ lúc vào website đến khi xem được trạng thái đơn của mình. 

## Hành trình của khách hàng

Khách truy cập website để xem giá và tham khảo Lộ trình chăm sóc mà không cần đăng nhập, nhưng khi muốn đặt lịch thì bắt buộc phải đăng nhập trước. Sau khi đăng nhập, khách chọn hồ sơ bé đã lưu hoặc tạo hồ sơ mới với các thông tin loài, cân nặng và loại lông, vì đây là dữ liệu nền để hệ thống tính giá và thời lượng sau này.

Tiếp theo, khách chọn một trong bốn dịch vụ lẻ (tắm sấy, cắt tỉa tạo kiểu, vệ sinh tai, cắt móng) hoặc một trong ba combo, rồi chọn groomer theo hình thức "Bất kỳ" để hệ thống tự gán, hoặc chỉ định groomer hiện có. Ngay khi đủ thông tin, hệ thống tự động tra bảng giá theo mốc cân nặng và độ dài lông, cộng thêm phụ phí nếu có (lông rối, thú quá cỡ), đồng thời tính luôn thời lượng dự kiến của lượt dịch vụ — khách biết trước chi phí trước khi phải chọn giờ.

Hệ thống chỉ hiển thị những khung giờ còn đủ thời lượng theo groomer đã chọn. Khi khách chốt một khung giờ, hệ thống giữ chỗ trong 10 phút để khách kịp hoàn tất thanh toán; nếu hai khách cùng chọn trùng giờ thì chỉ một người giữ được chỗ, người còn lại sẽ được báo và gợi ý khung giờ lân cận. Trước khi thanh toán, khách xem lại toàn bộ thông tin đơn — dịch vụ, groomer, giờ hẹn, giá dự tính, ghi chú — và tick xác nhận điều kiện tiếp nhận (không nhận thú đang mang thai, đang điều trị bệnh hoặc mới phẫu thuật). Nếu muốn, khách có thể thêm sản phẩm (thức ăn, snack, phụ kiện) vào cùng giỏ hàng với dịch vụ trước khi thanh toán một lần duy nhất.

Khách thanh toán bằng một trong ba hình thức: VNPay sandbox, trả tại tiệm, hoặc COD khi giỏ hàng có sản phẩm cần giao. Thanh toán thành công thì hệ thống xác nhận đơn ngay, và từ lúc này khách có thể vào mục "Đơn của tôi" để theo dõi trạng thái đơn theo thời gian thực — mỗi khách chỉ xem được đơn của chính mình.

## Quy trình phía tiệm

Khi khách đưa bé đến, nhân viên check-in và đánh giá nhanh tình trạng thực tế của bé; nếu có khác biệt so với khai báo ban đầu, Admin điều chỉnh lại mức giá và khách xác nhận trước khi tiến hành. Groomer thực hiện dịch vụ, thường mất khoảng 2–4 giờ cho một lượt grooming đầy đủ. Sau khi xong, Admin lập phiếu kết quả gồm các mục da, lông, tai, móng, răng kèm ghi chú và lưu vào hồ sơ bé, rồi báo khách đến đón.

## Trạng thái đơn theo từng mốc

Đơn dịch vụ di chuyển qua các trạng thái theo đúng trình tự: **Chờ thanh toán → Đã xác nhận → Đã check-in → Đang thực hiện → Sẵn sàng đón → Hoàn tất**. Ngoài luồng chính này còn hai trạng thái ngoại lệ là **Đã hủy** (khách hoặc tiệm hủy trước khi check-in) và **Không đến** (khách không đến đúng giờ đã đặt).

| Trạng thái | Thời điểm xảy ra | Ai cập nhật |
| --- | --- | --- |
| Chờ thanh toán | Khách vừa giữ chỗ, chưa thanh toán xong | Hệ thống |
| Đã xác nhận | Thanh toán thành công | Hệ thống |
| Đã check-in | Khách đã đưa bé đến tiệm | Admin |
| Đang thực hiện | Groomer đang thực hiện dịch vụ | Admin |
| Sẵn sàng đón | Dịch vụ hoàn tất, chờ khách đến đón | Admin |
| Hoàn tất | Khách đã nhận lại bé | Admin |
| Đã hủy | Hủy trước khi check-in | *(chưa quy định rõ trong REQUIREMENTS.md)* |
| Không đến | Khách không đến đúng giờ đã đặt | Admin |

## Sơ đồ tóm tắt

 
```mermaid
flowchart TD
    A[Khách vào website & đăng nhập] --> B[Chọn bé, dịch vụ, groomer]
    B --> C[Hệ thống báo giá & thời lượng]
    C --> D[Chọn giờ trống, giữ chỗ 10 phút]
    D --> E[Xem lại đơn, xác nhận điều kiện tiếp nhận]
    E --> F[Thanh toán]
    F --> G["Đơn: Chờ thanh toán → Đã xác nhận"]
    G --> H[Khách theo dõi 'Đơn của tôi']
    G --> I[Tiệm check-in bé]
    I --> J["Đơn: Đã check-in"]
    J --> K[Groomer thực hiện dịch vụ]
    K --> L["Đơn: Đang thực hiện"]
    L --> M[Admin lập phiếu kết quả]
    M --> N["Đơn: Sẵn sàng đón"]
    N --> O[Khách đến đón bé]
    O --> P["Đơn: Hoàn tất"]
```

