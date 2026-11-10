// Dữ liệu groomer và giờ làm việc. File này chỉ chứa dữ liệu, không viết hàm.
// - services: id dịch vụ (trong products.js) mà groomer làm được
// - hours: giờ làm theo thứ trong tuần (0 = Chủ nhật ... 6 = Thứ bảy), [phút bắt đầu, phút kết thúc] tính từ 0h
//          thứ nào không có thì là ngày nghỉ hằng tuần
// - lunch: giờ nghỉ trưa [bắt đầu, kết thúc] (phút), không nhận lịch trong khoảng này
// - daysOff: các ngày nghỉ riêng, dạng "YYYY-MM-DD"
// - photo: ảnh chân dung, đường dẫn từ thư mục frontend/ (thiếu file thì trang tự hiện chữ cái đầu của tên)
// - title, experienceYears, specialties, bio: hồ sơ hiển thị cho khách chọn groomer
// LƯU Ý: phần hồ sơ dưới đây là THÔNG TIN MẪU. Nhóm thay bằng thông tin thật của tiệm và chỉ dùng ảnh đã được người đó đồng ý.
const groomers = [
  {
    id: "g-linh",
    name: "Linh",
    photo: "images/groomers/linh.jpg",
    title: "Groomer trưởng",
    experienceYears: 6,
    specialties: ["Cắt tỉa tạo kiểu", "Chó giống nhỏ", "Lông dài"],
    bio: "Chuyên cắt tỉa tạo kiểu theo giống, kiên nhẫn với các bé nhát.",
    services: [1, 2, 3, 4, 5, 6, 7],
    hours: { 1: [480, 1080], 2: [480, 1080], 3: [480, 1080], 4: [480, 1080], 5: [480, 1080], 6: [480, 1080] },
    lunch: [720, 780],
    daysOff: []
  },
  {
    id: "g-minh",
    name: "Minh",
    photo: "images/groomers/minh.jpg",
    title: "Groomer",
    experienceYears: 4,
    specialties: ["Chó lớn", "Tắm sấy", "Combo trọn gói"],
    bio: "Quen xử lý chó cỡ lớn, làm việc nhanh và gọn.",
    services: [1, 2, 3, 4, 5, 6, 7],
    hours: { 0: [540, 1140], 2: [540, 1140], 3: [540, 1140], 4: [540, 1140], 5: [540, 1140], 6: [540, 1140] },
    lunch: [750, 810],
    daysOff: []
  },
  {
    id: "g-an",
    name: "An",
    photo: "images/groomers/an.jpg",
    title: "Chuyên viên chăm sóc",
    experienceYears: 3,
    specialties: ["Mèo", "Vệ sinh tai", "Cắt móng"],
    bio: "Nhẹ tay với mèo và các bé nhạy cảm, chuyên chăm sóc cơ bản.",
    services: [1, 3, 4, 5],
    hours: { 1: [480, 1020], 2: [480, 1020], 3: [480, 1020], 4: [480, 1020], 5: [480, 1020], 6: [480, 720]  },
    lunch: [690, 750],
    daysOff: []
  }
];
