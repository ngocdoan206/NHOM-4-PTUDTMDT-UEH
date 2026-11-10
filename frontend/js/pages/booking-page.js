// Trang đặt lịch của khách: 4 bước (Dịch vụ → Giờ và groomer → Thông tin → Xác nhận).
// Không tự đọc localStorage: mọi dữ liệu lịch đi qua các hàm của booking.js.
(function () {
  const WEIGHTS = [["<5kg", "Dưới 5kg"], ["5-10kg", "5–10kg"], ["10-20kg", "10–20kg"], [">20kg", "Trên 20kg"]];
  const WEEKDAYS = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const DAYS_PER_PAGE = 7;

  const state = {
    step: 1, serviceId: null,
    options: { species: "dog", weightRange: "<5kg", coat: "short" },
    date: null, groomerId: "any", startMin: null, dayPage: 0,
    held: null,                       // lịch đang giữ chỗ (bản ghi từ booking.js)
    customer: { name: "", phone: "" }, petName: "", note: "",
    confirmed: null, error: "", suggestions: [], fieldErrors: {}
  };

  function esc(text) {
    return String(text).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }
  function getService(id) { return products.find(function (p) { return p.id === Number(id) && p.type === "service"; }); }
  function groomerName(id) { const g = groomers.find(function (x) { return x.id === id; }); return g ? g.name : ""; }
  function avatarHtml(g, size) {
    const initial = esc((g.name || "?").charAt(0).toUpperCase());
    return `<span class="avatar avatar-${size}" aria-hidden="true"><img src="${esc(g.photo || "")}" alt="" width="64" height="64" loading="lazy" data-initial="${initial}"><b>${initial}</b></span>`;
  }
  // Thẻ chọn groomer: ảnh, chức danh, kinh nghiệm, chuyên môn, và số giờ trống của ngày đang chọn
  function groomerCardsHtml() {
    const anyFree = getAvailability(state.serviceId, state.options, state.date, "any", false).length;
    const cards = eligibleGroomers(state.serviceId).map(function (g) {
      const n = getAvailability(state.serviceId, state.options, state.date, g.id, false).length;
      return `<label class="groomer-card ${n === 0 ? "is-full" : ""}">
        <input type="radio" name="groomer" data-field="groomer" value="${g.id}" ${state.groomerId === g.id ? "checked" : ""}>
        ${avatarHtml(g, "lg")}
        <span class="groomer-info">
          <span class="groomer-name">${esc(g.name)} <small>${esc(g.title)} · ${g.experienceYears} năm kinh nghiệm</small></span>
          <span class="groomer-tags">${g.specialties.map(function (t) { return `<i>${esc(t)}</i>`; }).join("")}</span>
          <span class="groomer-bio">${esc(g.bio)}</span>
          <span class="groomer-free">${n === 0 ? "Hết chỗ ngày này" : "Còn " + n + " giờ trống ngày này"}</span>
        </span></label>`;
    }).join("");
    return `<fieldset class="groomer-list"><legend>Chọn groomer</legend>
      <label class="groomer-card groomer-any ${anyFree === 0 ? "is-full" : ""}">
        <input type="radio" name="groomer" data-field="groomer" value="any" ${state.groomerId === "any" ? "checked" : ""}>
        <span class="avatar avatar-lg" aria-hidden="true"><b>★</b></span>
        <span class="groomer-info"><span class="groomer-name">Bất kỳ groomer còn trống <small>Nhiều giờ để chọn nhất</small></span>
        <span class="groomer-bio">Tiệm xếp cho groomer phù hợp và ít lịch nhất trong ngày.</span>
        <span class="groomer-free">${anyFree === 0 ? "Hết chỗ ngày này" : "Còn " + anyFree + " giờ trống ngày này"}</span></span></label>
      ${cards}</fieldset>`;
  }
  function groomerChip(id) {
    const g = groomers.find(function (x) { return x.id === id; });
    if (!g) return "";
    return `<span class="groomer-chip">${avatarHtml(g, "sm")}<span>${esc(g.name)}<small>${esc(g.title)} · ${esc(g.specialties.slice(0, 2).join(", "))}</small></span></span>`;
  }
  function dateText(date) { const p = date.split("-"); return p[2] + "/" + p[1] + "/" + p[0]; }
    // Nhãn tháng cho dải ngày đang hiện, ví dụ "Tháng 11/2026" hoặc "Tháng 11/2026 – Tháng 12/2026" khi dải ngày qua tháng
  function monthLabel(dates) {
    const first = dates[0].split("-"), last = dates[dates.length - 1].split("-");
    const a = "Tháng " + Number(first[1]) + "/" + first[0], b = "Tháng " + Number(last[1]) + "/" + last[0];
    return a === b ? a : a + " – " + b;
  }
  function today() { return toVnParts(Date.now()).date; }
  function timeRange(start, duration) { return minutesToText(start) + " – " + minutesToText(start + duration); }
  function listDates() {
    const out = []; const t = today();
    for (let i = 0; i <= BOOKING_CONFIG.maxAdvanceDays; i++) out.push(addDays(t, i));
    return out;
  }

  // ---------- Khung chung ----------
  const app = document.getElementById("booking-app");
  const holdBar = document.getElementById("hold-bar");
  const stepper = document.getElementById("stepper");

  function renderStepper() {
    stepper.querySelectorAll("li").forEach(function (li) {
      const n = Number(li.dataset.step);
      li.className = state.confirmed ? "is-done" : n < state.step ? "is-done" : n === state.step ? "is-current" : "";
      if (n === state.step && !state.confirmed) li.setAttribute("aria-current", "step"); else li.removeAttribute("aria-current");
    });
  }

  function renderHoldBar() {
    const show = state.held && (state.step === 3 || state.step === 4) && !state.confirmed;
    holdBar.hidden = !show;
    if (!show) return;
    const left = getBookingSecondsLeft(state.held.id);
    const current = getBookingById(state.held.id);
    if (!current || ["cancelled", "no-show"].indexOf(current.status) !== -1) {
      holdBar.className = "hold-bar is-expired";
      holdBar.textContent = "Lịch này vừa bị hủy. Vui lòng chọn lại giờ.";
    } else if (left > 0) {
      holdBar.className = "hold-bar";
      holdBar.textContent = "Đang giữ chỗ cho bạn: còn " + pad2(Math.floor(left / 60)) + ":" + pad2(left % 60);
    } else {
      holdBar.className = "hold-bar is-expired";
      holdBar.textContent = "Thời gian giữ chỗ đã hết. Bạn vẫn xác nhận được nếu khung giờ còn trống.";
    }
  }

  // ---------- Bước 1: dịch vụ và bé ----------
  function step1Html() {
    const services = products.filter(function (p) { return p.type === "service"; });
    return `
      <section class="panel" aria-labelledby="s1-title">
        <h2 id="s1-title">1. Chọn dịch vụ và thông tin của bé</h2>
        <fieldset class="service-list">
          <legend class="sr-only">Dịch vụ</legend>
          ${services.map(function (s) {
            const dur = getServiceDuration(s.id, state.options);
            return `<label class="service-card">
              <input type="radio" name="service" value="${s.id}" ${state.serviceId === s.id ? "checked" : ""}>
              <span class="service-name">${esc(s.name)}</span>
              <span class="service-meta">${dur} phút · ${isPricedService(s) ? "Từ " : ""}${formatPrice(calculatePrice(s, state.options))}</span>
            </label>`;
          }).join("")}
        </fieldset>
        <div class="field-row">
          <div class="field"><label for="f-species">Loài</label>
            <select id="f-species" data-field="species"><option value="dog">Chó</option><option value="cat">Mèo</option></select></div>
          <div class="field"><label for="f-weight">Cân nặng</label>
            <select id="f-weight" data-field="weightRange">${WEIGHTS.map(function (w) { return `<option value="${w[0]}">${w[1]}</option>`; }).join("")}</select></div>
          <div class="field"><label for="f-coat">Độ dài lông</label>
            <select id="f-coat" data-field="coat"><option value="short">Lông ngắn</option><option value="long">Lông dài</option></select></div>
        </div>
        <p class="summary-line" id="s1-summary" aria-live="polite"></p>
        <p class="form-error" id="s1-error" role="alert" hidden></p>
        <div class="actions"><button type="button" class="btn btn-primary btn-large" data-action="to-step-2">Chọn giờ</button></div>
      </section>`;
  }
  function updateStep1Summary() {
    const el = document.getElementById("s1-summary"); if (!el) return;
    const s = getService(state.serviceId);
    document.querySelectorAll(".service-card").forEach(function (card) {
      const sv = getService(card.querySelector("input").value);
      card.querySelector(".service-meta").textContent = getServiceDuration(sv.id, state.options) + " phút · " + (isPricedService(sv) ? "Từ " : "") + formatPrice(calculatePrice(sv, state.options));
    });
    el.textContent = s ? "Dự kiến: " + s.name + ", khoảng " + getServiceDuration(s.id, state.options) + " phút, " + formatPrice(calculatePrice(s, state.options)) : "Hãy chọn một dịch vụ.";
  }

  // ---------- Bước 2: ngày, groomer, giờ ----------
  function step2Html() {
    const s = getService(state.serviceId);
    const dates = listDates();
    const summary = getDaySummary(state.serviceId, state.options, dates, state.groomerId);
    if (!state.date || summary[state.date] === undefined) {
      state.date = dates.find(function (d) { return summary[d] > 0; }) || dates[0];   // mặc định: ngày gần nhất còn chỗ
      state.dayPage = Math.floor(dates.indexOf(state.date) / DAYS_PER_PAGE);
    }
    const pageDates = dates.slice(state.dayPage * DAYS_PER_PAGE, (state.dayPage + 1) * DAYS_PER_PAGE);
    const maxPage = Math.ceil(dates.length / DAYS_PER_PAGE) - 1;
    const free = getAvailability(state.serviceId, state.options, state.date, state.groomerId, false);
    const freeMap = {}; free.forEach(function (f) { freeMap[f.startMin] = f.groomerIds; });
    const all = getAllStarts(state.serviceId, state.options, state.date, state.groomerId);
    const groups = [["Sáng", 0, 720], ["Chiều", 720, 1080], ["Tối", 1080, 1440]];
    const dur = getServiceDuration(state.serviceId, state.options);

    const dayChips = pageDates.map(function (d) {
      const n = summary[d]; const wd = WEEKDAYS[weekdayOf(d)];
      return `<button type="button" class="day-chip ${d === state.date ? "is-selected" : ""} ${n === 0 ? "is-full" : ""}" data-action="pick-date" data-date="${d}" ${n === 0 ? "disabled" : ""}
        aria-pressed="${d === state.date}" aria-label="${wd} ${dateText(d)}, ${n === 0 ? "hết chỗ" : n + " giờ trống"}">
        <span>${wd}</span><strong>${d.slice(8)}</strong><i class="dot ${n === 0 ? "dot-full" : "dot-free"}"></i></button>`;
    }).join("");

    const timeHtml = groups.map(function (g) {
      const slots = all.filter(function (m) { return m >= g[1] && m < g[2]; });
      if (!slots.length) return "";
      return `<div class="time-group"><h3>${g[0]}</h3><div class="time-chips">${slots.map(function (m) {
        const ok = !!freeMap[m];
        return `<button type="button" class="time-chip ${m === state.startMin ? "is-selected" : ""} ${ok ? "" : "is-full"}" data-action="pick-time" data-start="${m}"
          ${ok ? "" : "disabled"} aria-pressed="${m === state.startMin}" aria-label="${minutesToText(m)}${ok ? "" : ", đã kín hoặc đã qua"}">${minutesToText(m)}</button>`;
      }).join("")}</div></div>`;
    }).join("");

    const chosenGroomers = state.startMin !== null && freeMap[state.startMin] ? freeMap[state.startMin] : [];
    const who = state.groomerId === "any" ? "Groomer được xếp tự động" : "Groomer " + groomerName(state.groomerId);

    return `
      <section class="panel" aria-labelledby="s2-title">
        <h2 id="s2-title">2. Chọn groomer, ngày và giờ</h2>
        ${groomerCardsHtml()}
                <p class="month-label" aria-live="polite">${monthLabel(pageDates)}</p>
        <div class="day-strip">
          <button type="button" class="btn btn-outline" data-action="days-prev" ${state.dayPage === 0 ? "disabled" : ""} aria-label="Tuần trước">‹</button>
          <div class="day-chips">${dayChips}</div>
          <button type="button" class="btn btn-outline" data-action="days-next" ${state.dayPage >= maxPage ? "disabled" : ""} aria-label="Tuần sau">›</button>
        </div>
        <p class="note">Giờ mờ là đã kín hoặc đã qua. Giữa hai lịch có 5 phút dọn dẹp. Giờ theo múi giờ Việt Nam (GMT+7).</p>
        <p class="note">Bạn có thể đến sớm tối đa ${BOOKING_CONFIG.earlyArriveMinutes} phút. Nếu quá giờ hẹn ${BOOKING_CONFIG.lateCancelMinutes} phút mà chưa đến, tiệm có quyền hủy lịch.</p>
        ${free.length === 0 ? `<p class="form-error">Ngày này đã hết chỗ cho dịch vụ này. Hãy chọn ngày khác hoặc groomer khác.</p>` : ""}
        ${timeHtml}
        <p class="summary-line">${esc(s.name)} · ${dur} phút · ${state.startMin !== null ? "Giờ " + timeRange(state.startMin, dur) + " · " + (chosenGroomers.length === 1 || state.groomerId !== "any" ? "Groomer " + groomerName(chosenGroomers[0] || state.groomerId) : who) : "Chưa chọn giờ"}</p>
        ${state.error ? `<p class="form-error" role="alert">${esc(state.error)}</p>` : ""}
        ${state.suggestions.length ? `<div class="suggest"><p>Giờ trống gần nhất:</p>${state.suggestions.map(function (x) {
          return `<button type="button" class="time-chip" data-action="take-suggestion" data-date="${x.date}" data-start="${x.startMin}" data-groomer="${x.groomerId}">${dateText(x.date)} ${minutesToText(x.startMin)} · ${esc(groomerName(x.groomerId))}</button>`;
        }).join("")}</div>` : ""}
        <div class="actions">
          <button type="button" class="btn btn-outline" data-action="to-step-1">Quay lại</button>
          <button type="button" class="btn btn-primary btn-large" data-action="to-step-3" ${state.startMin === null ? "disabled" : ""}>Tiếp tục</button>
        </div>
      </section>`;
  }

  // ---------- Bước 3: thông tin liên hệ ----------
  function step3Html() {
    const e = state.fieldErrors;
    return `
      <section class="panel" aria-labelledby="s3-title">
        <h2 id="s3-title">3. Thông tin liên hệ</h2>
        ${summaryBlock()}
        <div class="field"><label for="c-name">Họ tên *</label>
          <input id="c-name" data-bind="name" autocomplete="name" value="${esc(state.customer.name)}" aria-invalid="${!!e.name}" aria-describedby="c-name-e">
          <p class="form-error" id="c-name-e" role="alert" ${e.name ? "" : "hidden"}>${esc(e.name || "")}</p></div>
        <div class="field"><label for="c-phone">Số điện thoại *</label>
          <input id="c-phone" data-bind="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="0912 345 678" value="${esc(state.customer.phone)}" aria-invalid="${!!e.phone}" aria-describedby="c-phone-e">
          <p class="form-error" id="c-phone-e" role="alert" ${e.phone ? "" : "hidden"}>${esc(e.phone || "")}</p></div>
        <div class="field"><label for="c-pet">Tên bé (không bắt buộc)</label>
          <input id="c-pet" data-bind="petName" value="${esc(state.petName)}"></div>
        <div class="field"><label for="c-note">Ghi chú (không bắt buộc)</label>
          <textarea id="c-note" data-bind="note" rows="3" placeholder="Ví dụ: bé nhát, dễ bị rối lông">${esc(state.note)}</textarea></div>
        <div class="actions">
          <button type="button" class="btn btn-outline" data-action="to-step-2">Quay lại</button>
          <button type="button" class="btn btn-primary btn-large" data-action="to-step-4">Xem lại và xác nhận</button>
        </div>
      </section>`;
  }
  function summaryBlock(b) {
    const x = b || state.held; const s = getService(x.serviceId);
    return `<dl class="summary">
      <dt>Dịch vụ</dt><dd>${esc(s.name)} (${x.duration} phút)</dd>
      <dt>Bé</dt><dd>${x.pet.species === "cat" ? "Mèo" : "Chó"}, ${esc((WEIGHTS.find(function (w) { return w[0] === x.pet.weightRange; }) || [0, ""])[1])}, ${x.pet.coat === "long" ? "lông dài" : "lông ngắn"}</dd>
      <dt>Groomer</dt><dd>${groomerChip(x.groomerId)}</dd>
      <dt>Thời gian</dt><dd>${dateText(x.date)}, ${timeRange(x.startMin, x.duration)}</dd>
      <dt>Giá tạm tính</dt><dd>${formatPrice(x.unitPrice)}</dd></dl>`;
  }

  // ---------- Bước 4: xác nhận ----------
  function step4Html() {
    const b = getBookingById(state.held.id) || state.held;
    return `
      <section class="panel" aria-labelledby="s4-title">
        <h2 id="s4-title">4. Xác nhận đặt lịch</h2>
        ${summaryBlock(b)}
        <dl class="summary"><dt>Khách</dt><dd>${esc(b.customer.name)} · ${esc(b.customer.phone)}</dd>
          ${b.pet.name ? `<dt>Tên bé</dt><dd>${esc(b.pet.name)}</dd>` : ""}${b.note ? `<dt>Ghi chú</dt><dd>${esc(b.note)}</dd>` : ""}</dl>
        <p class="note">Chính sách hủy (mô phỏng): bạn có thể hủy lịch bất cứ lúc nào ngay trên trang này. Tiệm giữ nguyên giờ nếu bạn không đến.</p>
        ${state.error ? `<p class="form-error" role="alert">${esc(state.error)}</p>` : ""}
        ${state.suggestions.length ? `<div class="suggest"><p>Giờ trống gần nhất:</p>${state.suggestions.map(function (x) {
          return `<button type="button" class="time-chip" data-action="take-suggestion" data-date="${x.date}" data-start="${x.startMin}" data-groomer="${x.groomerId}">${dateText(x.date)} ${minutesToText(x.startMin)} · ${esc(groomerName(x.groomerId))}</button>`;
        }).join("")}</div>` : ""}
        <div class="actions">
          <button type="button" class="btn btn-outline" data-action="to-step-3">Quay lại</button>
          <button type="button" class="btn btn-primary btn-large" data-action="confirm">Xác nhận đặt lịch</button>
        </div>
      </section>`;
  }

  function doneHtml() {
    const b = getBookingById(state.confirmed.id) || state.confirmed;
    const cancelled = b.status === "cancelled";
    return `
      <section class="panel done" aria-labelledby="done-title">
        <h2 id="done-title">${cancelled ? "Lịch đã được hủy" : "Đặt lịch thành công"}</h2>
        <p class="code">Mã lịch hẹn: <strong>${esc(b.id)}</strong></p>
        ${summaryBlock(b)}
        <dl class="summary"><dt>Khách</dt><dd>${esc(b.customer.name)} · ${esc(b.customer.phone)}</dd></dl>
        <p class="note">Đây là lịch mô phỏng – bản demo. Hãy lưu lại mã lịch hẹn.</p>
        <div class="actions">
          ${cancelled ? "" : `<button type="button" class="btn btn-outline" data-action="cancel-booking">Hủy lịch này</button>`}
          <button type="button" class="btn btn-primary" data-action="restart">Đặt lịch khác</button>
        </div>
      </section>`;
  }

  // ---------- Vẽ ----------
  function render() {
    renderStepper();
    app.innerHTML = state.confirmed ? doneHtml() : state.step === 1 ? step1Html() : state.step === 2 ? step2Html() : state.step === 3 ? step3Html() : step4Html();
    if (state.step === 1 && !state.confirmed) {
      document.getElementById("f-species").value = state.options.species;
      document.getElementById("f-weight").value = state.options.weightRange;
      document.getElementById("f-coat").value = state.options.coat;
      updateStep1Summary();
    }
    renderHoldBar();
    const heading = app.querySelector("h2"); if (heading) { heading.setAttribute("tabindex", "-1"); }
  }
  function go(step) { state.step = step; state.error = ""; state.suggestions = []; render(); window.scrollTo(0, 0); const h = app.querySelector("h2"); if (h) h.focus(); }

  // ---------- Hành động ----------
  function releaseHold() {
    if (state.held) { const cur = getBookingById(state.held.id); if (cur && cur.status === "held") cancelBooking(cur.id); state.held = null; }
  }
  function toStep2() {
    const err = document.getElementById("s1-error");
    if (!getService(state.serviceId)) { err.textContent = "Vui lòng chọn một dịch vụ."; err.hidden = false; return; }
    if (state.held) { releaseHold(); state.startMin = null; }   // đổi dịch vụ hoặc thông tin bé thì phải chọn lại giờ
    go(2);
  }
  function toStep3() {
    if (state.startMin === null) return;
    const same = state.held && state.held.date === state.date && state.held.startMin === state.startMin &&
      state.held.serviceId === state.serviceId && (state.groomerId === "any" || state.held.groomerId === state.groomerId) && getBookingSecondsLeft(state.held.id) > 0;
    if (!same) {
      releaseHold();
      const s = getService(state.serviceId);
      const r = holdBooking({ serviceId: s.id, options: state.options, date: state.date, startMin: state.startMin, groomerId: state.groomerId,
        clientId: getClientId(), unitPrice: calculatePrice(s, state.options) });
      if (!r.ok) { state.error = r.message; state.suggestions = r.suggestions || []; state.startMin = null; render(); return; }
      state.held = r.booking;
    }
    go(3);
  }
  function toStep4() {
    const errors = {};
    if (!state.customer.name.trim()) errors.name = "Vui lòng nhập họ tên.";
    if (!normalizePhone(state.customer.phone)) errors.phone = "Số điện thoại chưa đúng. Ví dụ: 0912 345 678.";
    state.fieldErrors = errors;
    if (errors.name || errors.phone) { render(); const el = document.querySelector('[aria-invalid="true"]'); if (el) el.focus(); return; }
    const r = updateBookingDetails(state.held.id, { customer: state.customer, pet: { name: state.petName.trim() }, note: state.note.trim() });
    if (!r.ok) { state.error = r.message; render(); return; }
    go(4);
  }
  function confirm() {
    const r = confirmBooking(state.held.id);
    if (!r.ok) {
      state.error = r.message; state.suggestions = r.suggestions || [];
      if (r.code === "HOLD_EXPIRED" || r.code === "BAD_TRANSITION") { state.held = null; state.startMin = null; state.step = 2; }
      render(); return;
    }
    state.confirmed = r.booking; state.held = null; render(); window.scrollTo(0, 0);
    const h = app.querySelector("h2"); if (h) h.focus();
  }
  function takeSuggestion(el) {
    state.date = el.dataset.date; state.startMin = Number(el.dataset.start); state.groomerId = el.dataset.groomer;
    state.dayPage = Math.floor(listDates().indexOf(state.date) / DAYS_PER_PAGE);
    state.error = ""; state.suggestions = []; state.step = 2; render();
  }
  function restart() {
    state.step = 1; state.serviceId = null; state.date = null; state.startMin = null; state.groomerId = "any"; state.held = null; state.confirmed = null;
    state.customer = { name: "", phone: "" }; state.petName = ""; state.note = ""; state.error = ""; state.suggestions = []; state.fieldErrors = {}; state.dayPage = 0;
    render();
  }

  document.addEventListener("DOMContentLoaded", function () {
    const wanted = Number(new URLSearchParams(window.location.search).get("service"));
    if (getService(wanted)) state.serviceId = wanted;
    render();

    // Ảnh groomer thiếu file thì ẩn ảnh, chỉ hiện chữ cái đầu (sự kiện "error" không nổi bọt nên bắt ở giai đoạn capture)
    app.addEventListener("error", function (event) {
      if (event.target.tagName === "IMG" && event.target.dataset.initial) event.target.style.display = "none";
    }, true);

    app.addEventListener("click", function (event) {
      const el = event.target.closest("[data-action]"); if (!el || el.disabled) return;
      const a = el.dataset.action;
      if (a === "to-step-1") go(1);
      else if (a === "to-step-2") { state.step === 1 ? toStep2() : go(2); }
      else if (a === "to-step-3") { state.step === 2 ? toStep3() : go(3); }
      else if (a === "to-step-4") toStep4();
      else if (a === "pick-date") { state.date = el.dataset.date; state.startMin = null; state.error = ""; state.suggestions = []; render(); }
      else if (a === "pick-time") { state.startMin = Number(el.dataset.start); state.error = ""; state.suggestions = []; render(); const chip = app.querySelector('.time-chip.is-selected'); if (chip) chip.focus(); }
      else if (a === "days-prev") { state.dayPage = Math.max(0, state.dayPage - 1); render(); }
      else if (a === "days-next") { state.dayPage += 1; render(); }
      else if (a === "take-suggestion") takeSuggestion(el);
      else if (a === "confirm") confirm();
      else if (a === "cancel-booking") { cancelBooking(state.confirmed.id); render(); }
      else if (a === "restart") restart();
    });

    app.addEventListener("change", function (event) {
      const t = event.target;
      if (t.name === "service") { state.serviceId = Number(t.value); updateStep1Summary(); }
      else if (t.dataset.field === "species" || t.dataset.field === "weightRange" || t.dataset.field === "coat") { state.options[t.dataset.field] = t.value; updateStep1Summary(); }
      else if (t.dataset.field === "groomer") { state.groomerId = t.value; state.startMin = null; state.error = ""; state.suggestions = []; render(); }
    });

    // Ghi nhớ nội dung đang gõ ở bước 3 mà không vẽ lại (không mất con trỏ)
    app.addEventListener("input", function (event) {
      const key = event.target.dataset.bind; if (!key) return;
      if (key === "name" || key === "phone") state.customer[key] = event.target.value; else state[key] = event.target.value;
    });

    // Đồng hồ giữ chỗ chạy mỗi giây
    setInterval(renderHoldBar, 1000);
    // Lịch đổi ở tab khác (nhân viên đặt hộ, hủy...) thì làm mới ngay
    onBookingsChanged(function () {
      if (state.confirmed) return;
      if (state.step === 2) render(); else renderHoldBar();
    });
  });
})();
