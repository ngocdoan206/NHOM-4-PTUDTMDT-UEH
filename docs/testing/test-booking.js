// Kiểm thử lõi đặt lịch. Chạy: node test-booking.js
const vm = require('vm'), fs = require('fs');
const store = {}; 
const localStorage = { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } };
const ctx = vm.createContext({ console, Date, Math, JSON, Number, Object, Array, String, isNaN, parseInt, Intl, localStorage, sessionStorage: localStorage });
['js/data/products.js','js/services/price-calculator.js','js/data/groomers.js','js/services/booking.js'].forEach(f => vm.runInContext(fs.readFileSync('frontend/' + f, 'utf8'), ctx, { filename: f }));
const run = code => vm.runInContext(code, ctx);
let pass = 0, failN = 0;
function t(name, cond, info) { if (cond) { pass++; console.log('  ✓', name); } else { failN++; console.log('  ✗', name, info !== undefined ? '→ ' + JSON.stringify(info) : ''); } }
const reset = () => { Object.keys(store).forEach(k => delete store[k]); };
// Đồng hồ giả: Thứ Hai 2026-11-09 07:00 giờ VN (trước giờ mở cửa) để dễ tính
const at = (date, hh, mm) => Date.parse(date + 'T' + String(hh).padStart(2,'0') + ':' + String(mm||0).padStart(2,'0') + ':00+07:00');
const clock = ms => run('setBookingClock(function(){return ' + ms + ';})');
const MON = '2026-11-09', TUE = '2026-11-10', SUN = '2026-11-15';
const opts = { species: 'dog', weightRange: '<5kg', coat: 'short' };
const hold = (o) => run('holdBooking(' + JSON.stringify(Object.assign({ serviceId: 1, options: opts, date: MON, startMin: 540, groomerId: 'g-linh', clientId: 'c1' }, o)) + ')');
const walk = (o) => run('createWalkInBooking(' + JSON.stringify(Object.assign({ serviceId: 4, options: opts, date: MON, startMin: 540, groomerId: 'g-linh', customer: { name: 'Khách lẻ', phone: '' } }, o)) + ')');
const avail = (sid, o, date, g, staff) => run('getAvailability(' + sid + ',' + JSON.stringify(o) + ',"' + date + '",' + JSON.stringify(g) + ',' + !!staff + ')');
const starts = a => a.map(x => x.startMin);

console.log('1. Thời lượng');
reset(); clock(at(MON, 7));
t('Tắm sấy chó <5kg lông ngắn = 60 phút', run('getServiceDuration(1,' + JSON.stringify(opts) + ')') === 60);
t('Tắm sấy chó >20kg lông dài = 60+30+15 = 105', run('getServiceDuration(1,{species:"dog",weightRange:">20kg",coat:"long"})') === 105);
t('Cắt móng không đổi theo cân nặng = 15', run('getServiceDuration(4,{species:"dog",weightRange:">20kg",coat:"long"})') === 15);
t('Combo Trọn gói <5kg ngắn = 150', run('getServiceDuration(7,' + JSON.stringify(opts) + ')') === 150);

console.log('2. Tắm sấy 60 phút rồi Cắt móng 15 phút trên cùng groomer (ví dụ trong yêu cầu)');
reset(); clock(at(MON, 7));
let r = hold({ startMin: 480 });                   // Linh 8:00-9:00 (+đệm 10 phút)
t('đặt Tắm sấy 8:00 thành công', r.ok, r);
let a = starts(avail(4, opts, MON, 'g-linh'));
t('Cắt móng của Linh KHÔNG có 8:00, 8:15, 8:30, 8:45, 9:00', ![480,495,510,525,540].some(s => a.includes(s)), a.slice(0,6));
t('Cắt móng của Linh đầu tiên là 9:15 (sau 9:00 + đệm 10 phút, làm tròn lên bước 15)', a[0] === 555, a.slice(0,3));
let a60 = starts(avail(1, opts, MON, 'g-linh'));
t('Tắm sấy 60 phút của Linh bắt đầu từ 9:15', a60[0] === 555, a60.slice(0,3));
t('Giờ 60 phút khác giờ 15 phút (ít hơn gần nghỉ trưa)', a60.length < a.length, [a60.length, a.length]);

console.log('3. Khoảng trống nhỏ hơn thời lượng không được hiện');
reset(); clock(at(MON, 7));
hold({ startMin: 480, serviceId: 4 });             // Cắt móng 8:00-8:15
hold({ startMin: 570, serviceId: 4, clientId: 'c2' }); // Cắt móng 9:30-9:45 -> khoảng trống giữa 8:25 và 9:30
a60 = starts(avail(1, opts, MON, 'g-linh'));
t('Tắm sấy 60 phút không chen vừa khoảng 8:30-9:30 (cần 60 + đệm)', !a60.includes(510) && !a60.includes(525), a60.slice(0,4));
let a15 = starts(avail(4, opts, MON, 'g-linh'));
t('Cắt móng 15 phút chen được ở 8:30 (khoảng trống đủ)', a15.includes(510), a15.slice(0,4));

console.log('4. Hai người cùng đặt một giờ');
reset(); clock(at(MON, 7));
const r1 = hold({ startMin: 600, clientId: 'cA' }), r2 = hold({ startMin: 600, clientId: 'cB' });
t('người 1 được, người 2 bị từ chối SLOT_TAKEN', r1.ok && !r2.ok && r2.code === 'SLOT_TAKEN', [r1.ok, r2.code]);
t('người 2 nhận được gợi ý giờ gần nhất', r2.suggestions && r2.suggestions.length > 0);
const rAny = hold({ startMin: 600, clientId: 'cC', groomerId: 'any' });
t('chọn "bất kỳ groomer" thì được xếp cho groomer khác còn trống', rAny.ok && rAny.booking.groomerId !== 'g-linh', rAny.booking && rAny.booking.groomerId);

console.log('5. Giữ chỗ hết hạn trả chỗ');
reset(); clock(at(MON, 7));
r = hold({ startMin: 600 }); run('updateBookingDetails("' + r.booking.id + '",{customer:{name:"An",phone:"0912345678"}})');
clock(at(MON, 7, 5));
t('sau 5 phút chỗ vẫn bị giữ', !hold({ startMin: 600, clientId: 'x' }).ok);
clock(at(MON, 7, 11));
t('sau 11 phút giữ chỗ hết hạn, người khác đặt được', hold({ startMin: 600, clientId: 'y' }).ok);
const exp = run('confirmBooking("' + r.booking.id + '")');
t('người cũ xác nhận muộn khi chỗ đã bị lấy → HOLD_EXPIRED (không xác nhận đè)', !exp.ok && exp.code === 'HOLD_EXPIRED', exp);
reset(); clock(at(MON, 7));
r = hold({ startMin: 600 }); run('updateBookingDetails("' + r.booking.id + '",{customer:{name:"An",phone:"0912345678"}})');
clock(at(MON, 7, 20));
const late = run('confirmBooking("' + r.booking.id + '")');
t('hết hạn nhưng chỗ vẫn trống → vẫn xác nhận được', late.ok && late.booking.status === 'confirmed', late);

console.log('6. Walk-in chen vào khung đang giữ');
reset(); clock(at(MON, 9));
r = hold({ startMin: 660 });                       // khách online giữ 11:00
const w = walk({ startMin: 660, serviceId: 4 });
t('walk-in bị chặn vì khung đang được giữ', !w.ok && w.code === 'SLOT_TAKEN', w);
const w2 = walk({ startMin: 545 });
t('walk-in ở giờ trống được ghi ngay, trạng thái confirmed, nguồn walk-in', w2.ok && w2.booking.status === 'confirmed' && w2.booking.source === 'walk-in', w2);
t('walk-in được đặt sát giờ (nhân viên không bị giới hạn 60 phút)', w2.ok);
const wNo = walk({ startMin: 700, customer: { name: '', phone: '0912345678' } });
t('walk-in thiếu cả tên lẫn số điện thoại bị từ chối', !wNo.ok && wNo.code === 'INVALID_INPUT');

console.log('7. Hủy rồi đặt lại đúng chỗ đó');
reset(); clock(at(MON, 7));
r = hold({ startMin: 600 });
t('đang giữ thì người khác không đặt được', !hold({ startMin: 600, clientId: 'z' }).ok);
t('hủy thành công', run('cancelBooking("' + r.booking.id + '")').ok);
t('hủy xong đặt lại đúng giờ đó được', hold({ startMin: 600, clientId: 'z' }).ok);
t('hủy lần hai bị chặn (cancelled không chuyển tiếp)', run('cancelBooking("' + r.booking.id + '")').code === 'BAD_TRANSITION');

console.log('8. Giờ làm việc, nghỉ trưa, đóng cửa, ngày nghỉ');
reset(); clock(at(MON, 7));
t('Linh không có giờ 11:30 cho Tắm sấy (vướng nghỉ trưa 12:00)', !starts(avail(1, opts, MON, 'g-linh')).includes(690), starts(avail(1, opts, MON, 'g-linh')));
t('Linh có giờ 11:00 cho Tắm sấy (kết thúc đúng 12:00)', starts(avail(1, opts, MON, 'g-linh')).includes(660));
t('Linh có giờ 13:00 (sau nghỉ trưa)', starts(avail(1, opts, MON, 'g-linh')).includes(780));
t('Linh có giờ 17:00 Tắm sấy (kết thúc đúng 18:00 đóng cửa)', starts(avail(1, opts, MON, 'g-linh')).includes(1020));
t('Linh không có giờ 17:15 (vượt quá 18:00)', !starts(avail(1, opts, MON, 'g-linh')).includes(1035));
t('Cắt móng 15 phút có giờ 17:45 (vừa khít đóng cửa)', starts(avail(4, opts, MON, 'g-linh')).includes(1065));
t('Chủ nhật Linh nghỉ → không có giờ', avail(1, opts, SUN, 'g-linh').length === 0);
t('Chủ nhật Minh làm (9:00-19:00)', avail(1, opts, SUN, 'g-minh').length > 0);
t('Thứ Hai Minh nghỉ', avail(1, opts, MON, 'g-minh').length === 0);
t('Groomer An không làm Cắt tỉa (dịch vụ 2)', run('eligibleGroomers(2)').every(g => g.id !== 'g-an'));
t('Đặt giờ ngoài giờ làm → OUT_OF_HOURS', hold({ startMin: 1100 }).code === 'OUT_OF_HOURS');
run('groomers[0].daysOff.push("' + TUE + '")');
t('ngày nghỉ riêng của Linh (thứ Ba) → không có giờ', avail(1, opts, TUE, 'g-linh').length === 0);
run('groomers[0].daysOff.pop()');

console.log('9. Giới hạn thời gian đặt');
reset(); clock(at(MON, 9));
t('hôm nay 9:00, khách không đặt được 9:30 (cần cách 60 phút)', hold({ startMin: 570 }).code === 'TOO_SOON');
t('khách đặt được từ 10:00', hold({ startMin: 600 }).ok);
t('ngày đã qua bị chặn', hold({ date: '2026-11-08' }).code === 'IN_PAST');
t('quá 30 ngày bị chặn', hold({ date: '2026-12-15', startMin: 600 }).code === 'TOO_FAR');
t('ngày thứ 30 được phép', hold({ date: '2026-12-09', startMin: 600, clientId: 'q' }).ok);
t('định dạng ngày sai bị từ chối', hold({ date: '09/11/2026' }).code === 'INVALID_INPUT');

console.log('10. Múi giờ');
reset();
clock(Date.parse('2026-11-09T18:30:00Z'));   // = 01:30 ngày 10/11 giờ VN
t('18:30 UTC thì giờ Việt Nam đã sang ngày 10/11', run('toVnParts(' + Date.parse('2026-11-09T18:30:00Z') + ')').date === '2026-11-10');
t('"hôm nay" theo giờ VN: đặt cho 9/11 bị coi là quá khứ', hold({ date: MON, startMin: 600 }).code === 'IN_PAST');
t('startAt lưu có múi giờ +07:00', (() => { clock(at(MON, 7)); const b = hold({ startMin: 600 }).booking; return b.startAt === '2026-11-09T10:00:00+07:00' && b.endAt === '2026-11-09T11:00:00+07:00'; })());

console.log('11. Dữ liệu localStorage hỏng hoặc bị sửa tay');
reset(); clock(at(MON, 7));
store.bookings = '{hỏng json';
t('JSON hỏng → coi như chưa có lịch, không làm sập', Array.isArray(run('loadBookings()')) && run('loadBookings()').length === 0);
t('vẫn đặt được sau khi dữ liệu hỏng', hold({ startMin: 600 }).ok);
reset(); store.bookings = JSON.stringify([{ id: 'x' }, null, 5, { id: 'ok', groomerId: 'g-linh', date: MON, startMin: 600, endMin: 660, status: 'confirmed' }]);
t('bản ghi lỗi bị bỏ qua, bản ghi đúng vẫn còn', run('loadBookings()').length === 1);
t('bản ghi đúng vẫn chặn đặt trùng', hold({ startMin: 600 }).code === 'SLOT_TAKEN');
reset(); clock(at(MON, 7));
store.bookings = JSON.stringify([{ id: 'a', groomerId: 'g-linh', date: MON, startMin: 600, endMin: 660, status: 'confirmed' }, { id: 'b', groomerId: 'g-linh', date: MON, startMin: 620, endMin: 680, status: 'confirmed' }]);
t('sửa tay tạo 2 lịch chồng nhau: lịch vẫn tải được, giờ chồng không còn được hiển thị là trống', !starts(avail(4, opts, MON, 'g-linh')).some(s => s >= 600 && s < 690));
t('đặt thêm vào đúng giờ đó vẫn bị chặn', hold({ startMin: 630, serviceId: 4 }).code === 'SLOT_TAKEN');

console.log('12. Dời lịch');
reset(); clock(at(MON, 7));
r = hold({ startMin: 600 }); run('updateBookingDetails("' + r.booking.id + '",{customer:{name:"An",phone:"0912345678"}})'); run('confirmBooking("' + r.booking.id + '")');
hold({ startMin: 780, clientId: 'o' });
let mv = run('rescheduleBooking("' + r.booking.id + '",{date:"' + MON + '",startMin:780},true)');
t('dời vào giờ đang có người → bị chặn', !mv.ok && mv.code === 'SLOT_TAKEN', mv);
mv = run('rescheduleBooking("' + r.booking.id + '",{date:"' + MON + '",startMin:630},true)');
t('dời chồng lên chính nó (lùi 30 phút) được, vì loại chính nó ra', mv.ok && mv.booking.startMin === 630, mv);
t('sau khi dời, giờ cũ 10:00 vẫn bị chiếm một phần, 8:00 thì trống', starts(avail(4, opts, MON, 'g-linh')).includes(480));
mv = run('rescheduleBooking("' + r.booking.id + '",{date:"' + MON + '",startMin:900,groomerId:"g-minh"},true)');
t('dời sang groomer nghỉ hôm đó (Minh nghỉ thứ Hai) → OUT_OF_HOURS', !mv.ok && mv.code === 'OUT_OF_HOURS', mv);
mv = run('rescheduleBooking("' + r.booking.id + '",{date:"' + TUE + '",startMin:900,groomerId:"g-minh"},true)');
t('dời sang groomer đang làm (Minh làm thứ Ba) → được', mv.ok && mv.booking.groomerId === 'g-minh', mv);

console.log('13. Vòng đời trạng thái');
reset(); clock(at(MON, 7));
r = hold({ startMin: 600 });
t('held → checked-in bị chặn (phải xác nhận trước)', run('changeBookingStatus("' + r.booking.id + '","checked-in")').code === 'BAD_TRANSITION');
run('updateBookingDetails("' + r.booking.id + '",{customer:{name:"An",phone:"0912 345 678"}})');
t('xác nhận với số điện thoại có khoảng trắng → chuẩn hóa về 0912345678', run('confirmBooking("' + r.booking.id + '")').booking.customer.phone === '0912345678');
t('confirmed → checked-in', run('changeBookingStatus("' + r.booking.id + '","checked-in")').ok);
t('checked-in → completed', run('changeBookingStatus("' + r.booking.id + '","completed")').ok);
t('completed không chiếm chỗ nữa', starts(avail(4, opts, MON, 'g-linh')).includes(600));
r = hold({ startMin: 660, clientId: 'n' }); run('updateBookingDetails("' + r.booking.id + '",{customer:{name:"B",phone:"0912345679"}})'); run('confirmBooking("' + r.booking.id + '")');
t('no-show trả chỗ', run('changeBookingStatus("' + r.booking.id + '","no-show")').ok && starts(avail(4, opts, MON, 'g-linh')).includes(660));

console.log('14. Giới hạn chống chiếm chỗ ảo');
reset(); clock(at(MON, 7));
t('đang giữ 2 lượt thì lượt thứ 3 của cùng trình duyệt bị chặn', hold({ startMin: 600, clientId: 'm' }).ok && hold({ startMin: 780, clientId: 'm' }).ok && hold({ startMin: 900, clientId: 'm' }).code === 'HOLD_LIMIT');
reset(); clock(at(MON, 7));
for (let i = 0; i < 3; i++) { const h = hold({ startMin: 600 + i * 90, serviceId: 4, clientId: 'p' + i }); run('updateBookingDetails("' + h.booking.id + '",{customer:{name:"K",phone:"0987654321"}})'); run('confirmBooking("' + h.booking.id + '")'); }
const h4 = hold({ startMin: 900, serviceId: 4, clientId: 'p9' }); run('updateBookingDetails("' + h4.booking.id + '",{customer:{name:"K",phone:"0987654321"}})');
t('một số điện thoại có 3 lịch còn hiệu lực thì lịch thứ 4 không xác nhận được', run('confirmBooking("' + h4.booking.id + '")').code === 'PHONE_LIMIT');
t('số điện thoại sai định dạng không xác nhận được', (() => { const h = hold({ startMin: 960, serviceId: 4, clientId: 'p8' }); run('updateBookingDetails("' + h.booking.id + '",{customer:{name:"K",phone:"12345"}})'); return run('confirmBooking("' + h.booking.id + '")').code === 'INVALID_INPUT'; })());

console.log('15. Bất biến: không bao giờ có hai lịch chồng nhau');
reset(); clock(at(MON, 7));
let seed = 12345; const rnd = n => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return Math.floor((seed >>> 8) / 0x800000 * n); };
for (let i = 0; i < 400; i++) {
  const sid = [1, 2, 3, 4, 5, 6, 7][rnd(7)], g = ['g-linh', 'g-minh', 'g-an', 'any'][rnd(4)], day = ['2026-11-09','2026-11-10','2026-11-11'][rnd(3)];
  const o = { species: 'dog', weightRange: ['<5kg','5-10kg','10-20kg','>20kg'][rnd(4)], coat: ['short','long'][rnd(2)] };
  if (rnd(2)) hold({ serviceId: sid, options: o, date: day, startMin: 480 + rnd(40) * 15, groomerId: g, clientId: 'r' + i });
  else walk({ serviceId: sid, options: o, date: day, startMin: 480 + rnd(40) * 15, groomerId: g, customer: { name: 'w' + i, phone: '09' + String(10000000 + i) } });
}
const all = run('loadBookings()').filter(b => ['held','confirmed','checked-in'].includes(b.status));
let clashes = 0;
for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) {
  const x = all[i], y = all[j];
  if (x.groomerId === y.groomerId && x.date === y.date && x.startMin < y.endMin + 10 && y.startMin < x.endMin + 10) clashes++;
}
t('400 lần đặt ngẫu nhiên → ' + all.length + ' lịch, 0 cặp chồng nhau (kể cả đệm 5 phút)', clashes === 0, clashes);
t('mọi lịch đều nằm trong giờ làm việc của groomer', all.every(b => run('getGroomerSegments("' + b.groomerId + '","' + b.date + '")').some(s => b.startMin >= s[0] && b.endMin <= s[1])));

console.log('16. Ghi nhận cách chọn groomer');
reset(); clock(at(MON, 7));
t('chọn đích danh → groomerRequest = specific', hold({ startMin: 600, groomerId: 'g-linh', clientId: 'k1' }).booking.groomerRequest === 'specific');
const anyB = hold({ startMin: 600, groomerId: 'any', clientId: 'k2' }).booking;
t('chọn "bất kỳ" → vẫn lưu groomerId cụ thể + groomerRequest = any', anyB.groomerRequest === 'any' && anyB.groomerId !== 'g-linh' && !!anyB.groomerId, anyB);

console.log('\nKết quả: ' + pass + ' đạt, ' + failN + ' lỗi');
process.exit(failN ? 1 : 0);
