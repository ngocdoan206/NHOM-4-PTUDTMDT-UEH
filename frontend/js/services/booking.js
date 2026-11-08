// Đặt lịch: dữ liệu lịch hẹn, khung giờ trống, chống đặt trùng. Chỉ file này đọc/ghi localStorage khóa "bookings".
// Giao diện chỉ gọi các hàm công khai ở cuối file. Khi có backend, thay phần lưu trữ (loadBookings/saveBookings)
// bằng lời gọi API, giao diện không phải sửa.
//
// Quy ước thời gian: ngày là chuỗi "YYYY-MM-DD" (giờ Việt Nam), giờ là số phút tính từ 0h ("startMin").
// Các hàm tính khung giờ là hàm thuần: nhận dữ liệu vào, không đọc localStorage, không đọc đồng hồ.

const BOOKINGS_KEY = "bookings";
const BOOKING_CONFIG = {
  stepMinutes: 15,          // khoảng cách giữa hai giờ bắt đầu
  bufferMinutes: 10,        // thời gian dọn dẹp sau mỗi lượt (giữa hai lượt luôn cách nhau ít nhất số phút này)
  holdMinutes: 10,          // giữ chỗ khi khách chưa xác nhận
  minLeadMinutes: 60,       // khách phải đặt trước giờ bắt đầu ít nhất số phút này (nhân viên không bị giới hạn)
  maxAdvanceDays: 30,       // đặt trước tối đa
  maxHeldPerClient: 2,      // số lượt đang giữ chỗ tối đa của một trình duyệt (chống chiếm chỗ ảo)
  maxActivePerPhone: 3,     // số lịch còn hiệu lực tối đa của một số điện thoại
  durationFactorEnabled: true,
  // Phút cộng thêm cho dịch vụ có tính giá theo tùy chọn (thú lớn, lông dài làm lâu hơn). Đặt false ở trên để tắt.
  weightExtraMinutes: { "<5kg": 0, "5-10kg": 0, "10-20kg": 15, ">20kg": 30 },
  longCoatExtraMinutes: 15
};
const OCCUPYING_STATUSES = ["held", "confirmed", "checked-in"];
const STATUS_TRANSITIONS = {
  held: ["confirmed", "cancelled"],
  confirmed: ["checked-in", "cancelled", "no-show"],
  "checked-in": ["completed"],
  completed: [],
  cancelled: [],
  "no-show": [],
  expired: []
};

// ---------- Đồng hồ (để kiểm thử đổi được) ----------
let bookingClock = function () { return Date.now(); };
function setBookingClock(fn) { bookingClock = fn || function () { return Date.now(); }; }

// ---------- Thời gian ----------
const VN_OFFSET_MS = 7 * 3600 * 1000;

// Tách mốc thời gian (ms) thành ngày và phút theo giờ Việt Nam, không phụ thuộc múi giờ máy.
function toVnParts(ms) {
  const d = new Date(ms + VN_OFFSET_MS);
  return {
    date: d.getUTCFullYear() + "-" + pad2(d.getUTCMonth() + 1) + "-" + pad2(d.getUTCDate()),
    minutes: d.getUTCHours() * 60 + d.getUTCMinutes()
  };
}
function pad2(n) { return (n < 10 ? "0" : "") + n; }
function minutesToText(min) { return pad2(Math.floor(min / 60)) + ":" + pad2(min % 60); }
// Mốc thời gian (ms) của một ngày và phút giờ Việt Nam.
function vnToMs(date, minutes) { return Date.parse(date + "T00:00:00+07:00") + minutes * 60000; }
function toIso(date, minutes) { return date + "T" + minutesToText(minutes) + ":00+07:00"; }
function weekdayOf(date) { return new Date(date + "T00:00:00Z").getUTCDay(); }
function addDays(date, n) { return toVnParts(Date.parse(date + "T00:00:00+07:00") + n * 86400000 + 12 * 3600000).date; }
function isValidDate(date) { return /^\d{4}-\d{2}-\d{2}$/.test(date) && !isNaN(Date.parse(date + "T00:00:00+07:00")); }

// ---------- Thời lượng ----------
// Thời lượng gốc lấy từ products.js; dịch vụ có tính giá theo tùy chọn cộng thêm phút theo cân nặng và độ dài lông.
function getServiceDuration(serviceId, options) {
  const product = products.find(function (p) { return p.id === Number(serviceId); });
  if (!product || product.type !== "service") return 0;
  let minutes = product.duration;
  if (BOOKING_CONFIG.durationFactorEnabled && isPricedService(product) && options) {
    minutes += BOOKING_CONFIG.weightExtraMinutes[options.weightRange] || 0;
    if (options.coat === "long") minutes += BOOKING_CONFIG.longCoatExtraMinutes;
  }
  return minutes;
}

// ---------- Hàm thuần: khung giờ ----------
function isOccupying(booking, nowMs) {
  if (OCCUPYING_STATUSES.indexOf(booking.status) === -1) return false;
  if (booking.status === "held" && booking.holdExpiresAt <= nowMs) return false;   // giữ chỗ hết hạn thì trả chỗ
  return true;
}

// Các đoạn làm việc liên tục của groomer trong một ngày (đã trừ nghỉ trưa). Rỗng nếu nghỉ.
function getWorkSegments(groomer, date) {
  if (groomer.daysOff.indexOf(date) !== -1) return [];
  const hours = groomer.hours[weekdayOf(date)];
  if (!hours) return [];
  const open = hours[0], close = hours[1], lunch = groomer.lunch;
  if (!lunch || lunch[1] <= open || lunch[0] >= close) return [[open, close]];
  const segments = [];
  if (lunch[0] > open) segments.push([open, lunch[0]]);
  if (lunch[1] < close) segments.push([lunch[1], close]);
  return segments;
}

// Hai khoảng [a1, a2) và [b1, b2) có chồng nhau không.
function rangesOverlap(a1, a2, b1, b2) { return a1 < b2 && b1 < a2; }

// Lượt `start`, `duration` trên groomer có đụng lượt nào trong `bookings` không. Mỗi lượt chiếm thêm thời gian đệm phía sau.
function hasConflict(groomerId, date, start, duration, bookings, nowMs, config, excludeId) {
  const buffer = config.bufferMinutes;
  return bookings.some(function (b) {
    if (b.groomerId !== groomerId || b.date !== date || b.id === excludeId) return false;
    if (!isOccupying(b, nowMs)) return false;
    return rangesOverlap(start, start + duration + buffer, b.startMin, b.endMin + buffer);
  });
}

// Giờ bắt đầu sớm nhất được phép (phút trong ngày) và ngày xa nhất, theo giờ hiện tại và cấu hình.
// Trả về { ok, minStart } cho ngày `date`; ok = false nếu cả ngày không đặt được.
function getDateWindow(date, nowMs, config, ignoreLead) {
  const now = toVnParts(nowMs);
  if (date < now.date) return { ok: false, minStart: 0 };
  if (date > addDays(now.date, config.maxAdvanceDays)) return { ok: false, minStart: 0 };
  if (date > now.date) return { ok: true, minStart: 0 };
  const lead = ignoreLead ? 0 : config.minLeadMinutes;
  return { ok: true, minStart: roundUp(now.minutes + lead, config.stepMinutes) };
}
function roundUp(value, step) { return Math.ceil(value / step) * step; }

// Danh sách giờ bắt đầu còn trống của MỘT groomer trong một ngày cho dịch vụ có thời lượng `duration`.
// Giờ hợp lệ khi toàn bộ khoảng thời lượng nằm gọn trong một đoạn làm việc và không đụng lượt nào.
function computeFreeStarts(groomer, date, duration, bookings, nowMs, config, ignoreLead) {
  const win = getDateWindow(date, nowMs, config, ignoreLead);
  if (!win.ok || duration <= 0) return [];
  const starts = [];
  getWorkSegments(groomer, date).forEach(function (seg) {
    for (let s = seg[0]; s + duration <= seg[1]; s += config.stepMinutes) {
      if (s < win.minStart) continue;
      if (hasConflict(groomer.id, date, s, duration, bookings, nowMs, config, null)) continue;
      starts.push(s);
    }
  });
  return starts;
}

// Tất cả giờ trong lưới của ngày (kể cả đã kín) cho các groomer, để hiển thị giờ mờ.
function computeAllStarts(groomerList, date, duration, config) {
  const set = {};
  groomerList.forEach(function (g) {
    getWorkSegments(g, date).forEach(function (seg) {
      for (let s = seg[0]; s + duration <= seg[1]; s += config.stepMinutes) set[s] = true;
    });
  });
  return Object.keys(set).map(Number).sort(function (a, b) { return a - b; });
}

// ---------- Lưu trữ (nơi duy nhất đọc, ghi localStorage) ----------
function loadBookings() {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    const list = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(list)) return [];
    return list.filter(isWellFormedBooking);   // bỏ bản ghi hỏng thay vì làm hỏng cả lịch
  } catch (error) {
    return [];
  }
}
function isWellFormedBooking(b) {
  return b && typeof b.id === "string" && typeof b.groomerId === "string" && isValidDate(b.date) &&
    Number.isFinite(b.startMin) && Number.isFinite(b.endMin) && b.endMin > b.startMin && typeof b.status === "string";
}
function saveBookings(list) {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(list));
  notifyBookingsChanged();
}

// Đánh dấu các lượt giữ chỗ đã hết hạn là "expired" (giữ lại bản ghi để tra cứu). Trả về true nếu có thay đổi.
function expireHolds(list, nowMs) {
  let changed = false;
  list.forEach(function (b) {
    if (b.status === "held" && b.holdExpiresAt <= nowMs) { b.status = "expired"; b.updatedAt = nowMs; changed = true; }
  });
  return changed;
}

// ---------- Báo thay đổi giữa các tab ----------
const bookingListeners = [];
function onBookingsChanged(callback) { bookingListeners.push(callback); }
function notifyBookingsChanged() { bookingListeners.slice().forEach(function (cb) { try { cb(); } catch (e) { /* một nơi lỗi không làm hỏng nơi khác */ } }); }
if (typeof window !== "undefined" && window.addEventListener) {
  // Sự kiện "storage" chỉ bắn ở các tab KHÁC khi một tab ghi localStorage.
  window.addEventListener("storage", function (event) { if (event.key === BOOKINGS_KEY || event.key === null) notifyBookingsChanged(); });
}

// ---------- Kiểm tra dữ liệu ----------
const PHONE_PATTERN = /^(0|\+?84)(3|5|7|8|9)\d{8}$/;
function normalizePhone(phone) {
  const digits = String(phone || "").replace(/[\s.\-()]/g, "");
  return PHONE_PATTERN.test(digits) ? "0" + digits.replace(/^(0|\+?84)/, "") : "";
}
function newBookingId(list) {
  let id;
  do { id = "BK-" + Math.random().toString(36).slice(2, 8).toUpperCase(); } while (list.some(function (b) { return b.id === id; }));
  return id;
}
function eligibleGroomers(serviceId) {
  return groomers.filter(function (g) { return g.services.indexOf(Number(serviceId)) !== -1; });
}
function fail(code, message, extra) { return Object.assign({ ok: false, code: code, message: message }, extra || {}); }

// Các giờ trống gần nhất (cùng ngày trước, rồi các ngày sau) để gợi ý khi chỗ vừa bị lấy.
function suggestNearest(serviceId, duration, date, bookings, nowMs, ignoreLead, limit) {
  const found = [];
  for (let i = 0; i < 7 && found.length < limit; i++) {
    const d = addDays(date, i);
    eligibleGroomers(serviceId).forEach(function (g) {
      computeFreeStarts(g, d, duration, bookings, nowMs, BOOKING_CONFIG, ignoreLead).forEach(function (s) {
        found.push({ date: d, startMin: s, groomerId: g.id });
      });
    });
  }
  found.sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : a.startMin - b.startMin; });
  return found.slice(0, limit);
}

// ---------- HÀM DUY NHẤT GHI LỊCH: kiểm tra rồi ghi ----------
// Mọi thao tác tạo mới và dời lịch đều đi qua đây. Luôn đọc lại dữ liệu mới nhất ngay trước khi ghi.
// input: { id? (khi dời), serviceId, options, date, startMin, groomerId ("any" được), customer, pet, note, unitPrice,
//          source, status, clientId, ignoreLead }
function writeBooking(input) {
  const nowMs = bookingClock();
  const list = loadBookings();
  const expired = expireHolds(list, nowMs);

  const serviceId = Number(input.serviceId);
  const options = input.options || {};
  const duration = getServiceDuration(serviceId, options);
  if (!duration) return fail("INVALID_INPUT", "Dịch vụ không hợp lệ.");
  if (!isValidDate(input.date) || !Number.isInteger(input.startMin)) return fail("INVALID_INPUT", "Ngày hoặc giờ không hợp lệ.");

  const win = getDateWindow(input.date, nowMs, BOOKING_CONFIG, input.ignoreLead);
  if (!win.ok) {
    return fail(input.date < toVnParts(nowMs).date ? "IN_PAST" : "TOO_FAR",
      input.date < toVnParts(nowMs).date ? "Không thể đặt vào ngày đã qua." : "Chỉ nhận đặt trước tối đa " + BOOKING_CONFIG.maxAdvanceDays + " ngày.");
  }
  if (input.startMin < win.minStart) return fail("TOO_SOON", "Giờ này đã qua hoặc quá sát. Vui lòng chọn giờ muộn hơn.");

  // Tìm groomer: được chọn cụ thể hoặc "any" (lấy người còn trống, ưu tiên người ít lịch trong ngày)
  const candidates = eligibleGroomers(serviceId).filter(function (g) { return input.groomerId === "any" || g.id === input.groomerId; });
  if (candidates.length === 0) return fail("INVALID_INPUT", "Groomer này không làm dịch vụ đã chọn.");
  const free = candidates.filter(function (g) {
    return getWorkSegments(g, input.date).some(function (seg) { return input.startMin >= seg[0] && input.startMin + duration <= seg[1]; }) &&
      !hasConflict(g.id, input.date, input.startMin, duration, list, nowMs, BOOKING_CONFIG, input.id);
  });
  if (free.length === 0) {
    const inHours = candidates.some(function (g) { return getWorkSegments(g, input.date).some(function (seg) { return input.startMin >= seg[0] && input.startMin + duration <= seg[1]; }); });
    return fail(inHours ? "SLOT_TAKEN" : "OUT_OF_HOURS",
      inHours ? "Rất tiếc, khung giờ này vừa có người đặt." : "Giờ này ngoài giờ làm việc của groomer, hoặc không đủ thời gian cho dịch vụ.",
      { suggestions: suggestNearest(serviceId, duration, input.date, list, nowMs, input.ignoreLead, 4) });
  }
  free.sort(function (a, b) { return countDayLoad(list, a.id, input.date, nowMs) - countDayLoad(list, b.id, input.date, nowMs); });
  const groomer = free[0];

  // Giới hạn giữ chỗ ảo (chỉ áp dụng cho đặt online)
  if (!input.id && input.source !== "walk-in" && input.clientId) {
    const heldByClient = list.filter(function (b) { return b.status === "held" && b.clientId === input.clientId && isOccupying(b, nowMs); }).length;
    if (heldByClient >= BOOKING_CONFIG.maxHeldPerClient) return fail("HOLD_LIMIT", "Bạn đang giữ chỗ quá nhiều lịch. Hãy xác nhận hoặc hủy bớt.");
  }

  const status = input.status || "held";
  const endMin = input.startMin + duration;
  let booking;
  if (input.id) {
    booking = list.find(function (b) { return b.id === input.id; });
    if (!booking) return fail("NOT_FOUND", "Không tìm thấy lịch hẹn.");
    booking.groomerId = groomer.id; booking.date = input.date; booking.startMin = input.startMin; booking.endMin = endMin;
    booking.duration = duration; booking.startAt = toIso(input.date, input.startMin); booking.endAt = toIso(input.date, endMin);
    booking.updatedAt = nowMs; booking.version = (booking.version || 1) + 1;
  } else {
    booking = {
      id: newBookingId(list), serviceId: serviceId, groomerId: groomer.id,
      // groomerRequest: khách chọn đích danh hay để tiệm xếp (nhân viên chỉ tự ý đổi người khi là "any")
      groomerRequest: input.groomerId === "any" ? "any" : "specific",
      date: input.date, startMin: input.startMin, endMin: endMin,
      duration: duration, startAt: toIso(input.date, input.startMin), endAt: toIso(input.date, endMin), status: status,
      source: input.source || "online", clientId: input.clientId || "",
      holdExpiresAt: status === "held" ? nowMs + BOOKING_CONFIG.holdMinutes * 60000 : 0,
      customer: input.customer || { name: "", phone: "" }, pet: Object.assign({ name: "" }, options, input.pet || {}),
      note: input.note || "", unitPrice: Number(input.unitPrice) || 0, createdAt: nowMs, updatedAt: nowMs, version: 1
    };
    list.push(booking);
  }
  saveBookings(list);

  // Kiểm tra lại sau khi ghi: nếu hai tab ghi gần như cùng lúc, lượt ghi sau phải rút lui.
  const after = loadBookings();
  const clash = hasConflict(booking.groomerId, booking.date, booking.startMin, booking.duration,
    after.filter(function (b) { return b.id !== booking.id && b.updatedAt <= booking.updatedAt; }), nowMs, BOOKING_CONFIG, booking.id);
  if (clash && !input.id) {
    saveBookings(after.filter(function (b) { return b.id !== booking.id; }));
    return fail("SLOT_TAKEN", "Rất tiếc, khung giờ này vừa có người đặt.", { suggestions: suggestNearest(serviceId, duration, input.date, after, nowMs, input.ignoreLead, 4) });
  }
  return { ok: true, booking: booking };
}
function countDayLoad(list, groomerId, date, nowMs) {
  return list.filter(function (b) { return b.groomerId === groomerId && b.date === date && isOccupying(b, nowMs); }).length;
}

// ---------- API công khai ----------

// Giữ chỗ (khách chọn giờ xong, chưa nhập thông tin). Trả { ok, booking } hoặc { ok: false, code, message, suggestions }.
function holdBooking(input) { return writeBooking(Object.assign({}, input, { status: "held", source: "online" })); }

// Nhân viên ghi lịch cho khách đến trực tiếp: ghi thẳng "confirmed", không giới hạn đặt trước tối thiểu.
function createWalkInBooking(input) {
  const name = String((input.customer && input.customer.name) || "").trim();
  const phone = normalizePhone(input.customer && input.customer.phone);
  if (!name && !phone) return fail("INVALID_INPUT", "Cần có tên hoặc số điện thoại hợp lệ của khách.");
  return writeBooking(Object.assign({}, input, { status: "confirmed", source: "walk-in", ignoreLead: true,
    customer: { name: name, phone: phone } }));
}

// Cập nhật thông tin khách của lượt đang giữ chỗ hoặc đã xác nhận.
function updateBookingDetails(id, details) {
  const list = loadBookings();
  const b = list.find(function (x) { return x.id === id; });
  if (!b) return fail("NOT_FOUND", "Không tìm thấy lịch hẹn.");
  if (details.customer) b.customer = { name: String(details.customer.name || "").trim(), phone: normalizePhone(details.customer.phone) || String(details.customer.phone || "") };
  if (details.pet) b.pet = Object.assign({}, b.pet, details.pet);
  if (typeof details.note === "string") b.note = details.note;
  b.updatedAt = bookingClock();
  saveBookings(list);
  return { ok: true, booking: b };
}

// Khách xác nhận. Giữ chỗ còn hạn thì xác nhận; hết hạn nhưng chỗ vẫn trống thì được xác nhận lại; chỗ đã bị lấy thì báo lỗi.
function confirmBooking(id) {
  const nowMs = bookingClock();
  const list = loadBookings();
  const b = list.find(function (x) { return x.id === id; });
  if (!b) return fail("NOT_FOUND", "Không tìm thấy lịch hẹn.");
  if (b.status === "confirmed") return { ok: true, booking: b };
  if (b.status !== "held" && b.status !== "expired") return fail("BAD_TRANSITION", "Lịch này không thể xác nhận nữa.");
  const phone = normalizePhone(b.customer && b.customer.phone);
  if (!String(b.customer && b.customer.name).trim() || !phone) return fail("INVALID_INPUT", "Cần tên và số điện thoại hợp lệ để xác nhận.");
  const active = list.filter(function (x) { return x.id !== b.id && x.customer && x.customer.phone === phone && x.status !== "completed" && isOccupying(x, nowMs) && vnToMs(x.date, x.startMin) > nowMs; }).length;
  if (active >= BOOKING_CONFIG.maxActivePerPhone) return fail("PHONE_LIMIT", "Số điện thoại này đã có " + active + " lịch còn hiệu lực. Vui lòng liên hệ tiệm.");
  // Giữ chỗ đã hết hạn: kiểm tra chỗ còn trống không (loại chính nó ra)
  if (b.status === "expired" || b.holdExpiresAt <= nowMs) {
    if (hasConflict(b.groomerId, b.date, b.startMin, b.duration, list, nowMs, BOOKING_CONFIG, b.id)) {
      return fail("HOLD_EXPIRED", "Giữ chỗ đã hết hạn và khung giờ này đã có người đặt. Vui lòng chọn giờ khác.",
        { suggestions: suggestNearest(b.serviceId, b.duration, b.date, list, nowMs, false, 4) });
    }
  }
  b.customer.phone = phone;
  b.status = "confirmed"; b.holdExpiresAt = 0; b.updatedAt = nowMs; b.version = (b.version || 1) + 1;
  saveBookings(list);
  return { ok: true, booking: b };
}

// Đổi trạng thái theo vòng đời cho phép: held→confirmed|cancelled, confirmed→checked-in|cancelled|no-show, checked-in→completed.
function changeBookingStatus(id, nextStatus) {
  if (nextStatus === "confirmed") return confirmBooking(id);
  const list = loadBookings();
  const b = list.find(function (x) { return x.id === id; });
  if (!b) return fail("NOT_FOUND", "Không tìm thấy lịch hẹn.");
  const allowed = STATUS_TRANSITIONS[b.status] || [];
  if (allowed.indexOf(nextStatus) === -1) return fail("BAD_TRANSITION", "Không thể chuyển từ \"" + b.status + "\" sang \"" + nextStatus + "\".");
  b.status = nextStatus; b.updatedAt = bookingClock(); b.version = (b.version || 1) + 1;
  if (nextStatus !== "held") b.holdExpiresAt = 0;
  saveBookings(list);
  return { ok: true, booking: b };
}
function cancelBooking(id) { return changeBookingStatus(id, "cancelled"); }

// Dời lịch (đổi ngày, giờ, groomer). Đi qua cùng hàm kiểm tra rồi ghi, loại chính nó ra khi kiểm tra trùng.
function rescheduleBooking(id, target, asStaff) {
  const b = loadBookings().find(function (x) { return x.id === id; });
  if (!b) return fail("NOT_FOUND", "Không tìm thấy lịch hẹn.");
  if (b.status !== "held" && b.status !== "confirmed") return fail("BAD_TRANSITION", "Chỉ dời được lịch đang giữ chỗ hoặc đã xác nhận.");
  const options = { species: b.pet.species, weightRange: b.pet.weightRange, coat: b.pet.coat };
  return writeBooking({ id: id, serviceId: b.serviceId, options: options, date: target.date, startMin: target.startMin,
    groomerId: target.groomerId || b.groomerId, status: b.status, ignoreLead: !!asStaff });
}

function getBookingById(id) { return loadBookings().find(function (b) { return b.id === id; }) || null; }
// Trạng thái hiệu lực của một lượt: "held" đã hết hạn được coi là "expired" ngay cả khi chưa ai dọn.
function getEffectiveStatus(booking) { return booking.status === "held" && booking.holdExpiresAt <= bookingClock() ? "expired" : booking.status; }
function getBookingsByDate(date) { return loadBookings().filter(function (b) { return b.date === date; }); }
function getBookingSecondsLeft(id) {
  const b = getBookingById(id);
  if (!b || b.status !== "held") return 0;
  return Math.max(0, Math.ceil((b.holdExpiresAt - bookingClock()) / 1000));
}

// Giờ bắt đầu còn trống: [{ startMin, groomerIds }], gộp các groomer cùng giờ. forStaff = true thì bỏ giới hạn đặt trước.
function getAvailability(serviceId, options, date, groomerId, forStaff) {
  const nowMs = bookingClock();
  const duration = getServiceDuration(serviceId, options);
  const list = loadBookings();
  const byStart = {};
  eligibleGroomers(serviceId).filter(function (g) { return !groomerId || groomerId === "any" || g.id === groomerId; }).forEach(function (g) {
    computeFreeStarts(g, date, duration, list, nowMs, BOOKING_CONFIG, !!forStaff).forEach(function (s) { (byStart[s] = byStart[s] || []).push(g.id); });
  });
  return Object.keys(byStart).map(Number).sort(function (a, b) { return a - b; }).map(function (s) { return { startMin: s, groomerIds: byStart[s] }; });
}
// Toàn bộ giờ trong lưới (kể cả đã kín), để hiển thị giờ mờ.
function getAllStarts(serviceId, options, date, groomerId) {
  const duration = getServiceDuration(serviceId, options);
  return computeAllStarts(eligibleGroomers(serviceId).filter(function (g) { return !groomerId || groomerId === "any" || g.id === groomerId; }), date, duration, BOOKING_CONFIG);
}
// Số giờ trống của từng ngày trong danh sách, để vẽ chấm còn chỗ hay hết.
function getDaySummary(serviceId, options, dates, groomerId) {
  const out = {};
  dates.forEach(function (d) { out[d] = getAvailability(serviceId, options, d, groomerId, false).length; });
  return out;
}
// Giờ trống gần nhất từ bây giờ (cho khách đến trực tiếp). Trả { date, startMin, groomerId } hoặc null.
function getNearestFree(serviceId, options) {
  const nowMs = bookingClock();
  const duration = getServiceDuration(serviceId, options);
  const found = suggestNearest(serviceId, duration, toVnParts(nowMs).date, loadBookings(), nowMs, true, 1);
  return found[0] || null;
}
// Đoạn làm việc của groomer trong ngày, để màn hình nhân viên tô vùng ngoài giờ làm.
function getGroomerSegments(groomerId, date) {
  const g = groomers.find(function (x) { return x.id === groomerId; });
  return g ? getWorkSegments(g, date) : [];
}
// Mã khách trên trình duyệt này, dùng giới hạn giữ chỗ ảo. Lưu ở sessionStorage, không phải dữ liệu lịch.
function getClientId() {
  try {
    let id = sessionStorage.getItem("pawcare-client");
    if (!id) { id = "c-" + Math.random().toString(36).slice(2, 10); sessionStorage.setItem("pawcare-client", id); }
    return id;
  } catch (error) { return "c-anon"; }
}
