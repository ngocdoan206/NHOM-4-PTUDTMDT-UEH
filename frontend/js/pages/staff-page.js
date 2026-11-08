// Màn hình nhân viên: lưới groomer × giờ, ghi lịch cho khách đến trực tiếp, check-in, hủy, dời lịch.
// Dùng chung dữ liệu và hàm kiểm tra trùng với trang khách (booking.js). Không tự đọc localStorage.
(function () {
  const DAY_START = 420, DAY_END = 1200, STEP = 15, ROW = 20;          // lưới 7:00 – 20:00, 1 hàng = 15 phút
  const ROWS = (DAY_END - DAY_START) / STEP;
  const STATUS_TEXT = { held: "Đang giữ chỗ", confirmed: "Đã xác nhận", "checked-in": "Đã đến", completed: "Hoàn thành", "no-show": "Không đến", cancelled: "Đã hủy", expired: "Hết hạn giữ chỗ" };
  const ACTIONS = { confirmed: [["checked-in", "Khách đã đến"], ["no-show", "Không đến"], ["cancelled", "Hủy lịch"]], "checked-in": [["completed", "Hoàn thành"]], held: [["cancelled", "Hủy giữ chỗ"]] };
  const WEIGHTS = [["<5kg", "Dưới 5kg"], ["5-10kg", "5–10kg"], ["10-20kg", "10–20kg"], [">20kg", "Trên 20kg"]];

  const view = { date: toVnParts(Date.now()).date, selectedId: null, panel: null };   // panel: null | {mode:"walkin",...} | {mode:"detail"}
  const gridEl = document.getElementById("staff-grid");
  const panelEl = document.getElementById("staff-panel");

  function esc(t) { return String(t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function serviceName(id) { const p = products.find(function (x) { return x.id === id; }); return p ? p.name : "Dịch vụ " + id; }
  function groomerName(id) { const g = groomers.find(function (x) { return x.id === id; }); return g ? g.name : id; }
  function dateText(d) { const p = d.split("-"); return p[2] + "/" + p[1] + "/" + p[0]; }
  function px(min) { return (min - DAY_START) / STEP * ROW; }

  // ---------- Lưới ----------
  function renderGrid() {
    const bookings = getBookingsByDate(view.date).filter(function (b) { return ["cancelled", "expired"].indexOf(getEffectiveStatus(b)) === -1; });
    const nowParts = toVnParts(Date.now());
    let html = `<div class="sg-head">Giờ</div>` + groomers.map(function (g) { return `<div class="sg-head">${esc(g.name)}</div>`; }).join("");
    let labels = "";
    for (let m = DAY_START; m < DAY_END; m += 60) labels += `<span style="top:${px(m)}px">${minutesToText(m)}</span>`;
    html += `<div class="sg-times" style="--rows:${ROWS}">${labels}</div>`;
    groomers.forEach(function (g) {
      const segs = getGroomerSegments(g.id, view.date);
      let off = ""; let cursor = DAY_START;
      segs.concat([[DAY_END, DAY_END]]).forEach(function (s) {
        const from = Math.max(cursor, DAY_START), to = Math.min(s[0], DAY_END);
        if (to > from) off += `<div class="sg-off" style="top:${px(from)}px;height:${px(to) - px(from)}px" title="Ngoài giờ làm việc"></div>`;
        cursor = Math.max(cursor, s[1]);
      });
      const mine = bookings.filter(function (b) { return b.groomerId === g.id; }).map(function (b) {
        const st = getEffectiveStatus(b);
        return `<button type="button" class="sg-block st-${st} ${b.id === view.selectedId ? "is-selected" : ""}" data-booking="${b.id}"
          style="top:${px(Math.max(b.startMin, DAY_START))}px;height:${Math.max(px(b.endMin) - px(Math.max(b.startMin, DAY_START)), 18)}px"
          aria-label="${minutesToText(b.startMin)} đến ${minutesToText(b.endMin)}, ${esc(serviceName(b.serviceId))}, ${STATUS_TEXT[st]}">
          <strong>${minutesToText(b.startMin)} ${esc(serviceName(b.serviceId))}</strong>${esc((b.customer && b.customer.name) || "(chưa có tên)")}${b.source === "walk-in" ? " · trực tiếp" : ""}</button>`;
      }).join("");
      const nowLine = view.date === nowParts.date && nowParts.minutes >= DAY_START && nowParts.minutes < DAY_END ? `<div class="sg-now" style="top:${px(nowParts.minutes)}px"></div>` : "";
      html += `<div class="sg-col" data-groomer="${g.id}" style="--rows:${ROWS}" tabindex="0" role="button" aria-label="Lịch của ${esc(g.name)}, bấm để ghi lịch mới">${off}${mine}${nowLine}</div>`;
    });
    gridEl.style.setProperty("--cols", groomers.length);
    gridEl.innerHTML = html;
    document.getElementById("staff-date").value = view.date;
  }

  // ---------- Bảng bên phải ----------
  function optionsHtml(list, selected) { return list.map(function (o) { return `<option value="${o[0]}" ${String(o[0]) === String(selected) ? "selected" : ""}>${esc(o[1])}</option>`; }).join(""); }
  function timeOptions() { const out = []; for (let m = DAY_START; m < DAY_END; m += STEP) out.push([m, minutesToText(m)]); return out; }

  function renderPanel() {
    const p = view.panel;
    if (!p) { panelEl.innerHTML = `<p class="staff-hint">Bấm vào ô trống để ghi lịch cho khách đến trực tiếp, hoặc bấm vào một lịch để xem và xử lý.</p>`; return; }
    if (p.mode === "walkin") return renderWalkIn(p);
    return renderDetail(p);
  }

  function renderWalkIn(p) {
    const services = products.filter(function (s) { return s.type === "service" && (p.groomerId === "any" || groomers.find(function (g) { return g.id === p.groomerId; }).services.indexOf(s.id) !== -1); });
    if (!services.some(function (s) { return s.id === p.serviceId; })) p.serviceId = services[0].id;
    const dur = getServiceDuration(p.serviceId, p.options), price = calculatePrice(products.find(function (x) { return x.id === p.serviceId; }), p.options);
    panelEl.innerHTML = `
      <h2>Ghi lịch cho khách đến trực tiếp</h2>
      <form id="walkin-form" novalidate>
        <div class="sp-row">
          <div class="sp-field"><label for="w-groomer">Groomer</label><select id="w-groomer" data-w="groomerId">${optionsHtml(groomers.map(function (g) { return [g.id, g.name]; }), p.groomerId)}</select></div>
          <div class="sp-field"><label for="w-time">Giờ bắt đầu</label><select id="w-time" data-w="startMin">${optionsHtml(timeOptions(), p.startMin)}</select></div>
        </div>
        <div class="sp-field"><label for="w-service">Dịch vụ</label><select id="w-service" data-w="serviceId">${optionsHtml(services.map(function (s) { return [s.id, s.name]; }), p.serviceId)}</select></div>
        <div class="sp-row">
          <div class="sp-field"><label for="w-species">Loài</label><select id="w-species" data-wo="species">${optionsHtml([["dog", "Chó"], ["cat", "Mèo"]], p.options.species)}</select></div>
          <div class="sp-field"><label for="w-coat">Lông</label><select id="w-coat" data-wo="coat">${optionsHtml([["short", "Ngắn"], ["long", "Dài"]], p.options.coat)}</select></div>
        </div>
        <div class="sp-field"><label for="w-weight">Cân nặng</label><select id="w-weight" data-wo="weightRange">${optionsHtml(WEIGHTS, p.options.weightRange)}</select></div>
        <div class="sp-field"><label for="w-name">Tên khách</label><input id="w-name" data-wf="name" value="${esc(p.name || "")}"></div>
        <div class="sp-field"><label for="w-phone">Số điện thoại</label><input id="w-phone" data-wf="phone" type="tel" value="${esc(p.phone || "")}"></div>
        <div class="sp-field"><label for="w-pet">Tên bé</label><input id="w-pet" data-wf="petName" value="${esc(p.petName || "")}"></div>
        <p class="sp-info">${dur} phút, ${minutesToText(p.startMin)} – ${minutesToText(p.startMin + dur)}, ${formatPrice(price)}</p>
        ${p.error ? `<p class="sp-error" role="alert">${esc(p.error)}</p>` : ""}
        ${p.suggestions && p.suggestions.length ? `<div class="sp-suggest">${p.suggestions.map(function (x) { return `<button type="button" data-take="${x.date}|${x.startMin}|${x.groomerId}">${dateText(x.date)} ${minutesToText(x.startMin)} · ${esc(groomerName(x.groomerId))}</button>`; }).join("")}</div>` : ""}
        <div class="sp-actions">
          <button type="submit" class="btn btn-primary">Ghi lịch</button>
          <button type="button" class="btn btn-outline" data-act="nearest">Giờ trống gần nhất</button>
          <button type="button" class="btn btn-outline" data-act="close">Đóng</button>
        </div>
      </form>`;
  }

  function renderDetail(p) {
    const b = getBookingById(p.id);
    if (!b) { view.panel = null; view.selectedId = null; return renderPanel(); }
    const st = getEffectiveStatus(b);
    const actions = (ACTIONS[b.status] || []).map(function (a) { return `<button type="button" class="btn btn-outline" data-status="${a[0]}">${a[1]}</button>`; }).join("");
    const canMove = b.status === "held" || b.status === "confirmed";
    let moveForm = "";
    if (canMove && p.moving) {
      const opts = { species: b.pet.species, weightRange: b.pet.weightRange, coat: b.pet.coat };
      const targetGroomer = p.moveGroomer || b.groomerId, targetDate = p.moveDate || b.date;
      const free = getAvailability(b.serviceId, opts, targetDate, targetGroomer, true);
      moveForm = `<div class="sp-field"><label for="m-groomer">Groomer</label><select id="m-groomer" data-m="moveGroomer">${optionsHtml(eligibleGroomers(b.serviceId).map(function (g) { return [g.id, g.name]; }), targetGroomer)}</select></div>
        <div class="sp-field"><label for="m-date">Ngày</label><input id="m-date" type="date" data-m="moveDate" value="${targetDate}"></div>
        <div class="sp-field"><label for="m-time">Giờ trống</label><select id="m-time" data-m="moveStart">${free.length ? optionsHtml(free.map(function (f) { return [f.startMin, minutesToText(f.startMin)]; }), p.moveStart) : `<option value="">Không còn giờ trống</option>`}</select></div>
        <div class="sp-actions"><button type="button" class="btn btn-primary" data-act="do-move" ${free.length ? "" : "disabled"}>Dời lịch</button><button type="button" class="btn btn-outline" data-act="cancel-move">Bỏ qua</button></div>`;
    }
    const left = b.status === "held" ? getBookingSecondsLeft(b.id) : 0;
    panelEl.innerHTML = `
      <h2>Lịch ${esc(b.id)}</h2>
      <dl class="sp-dl">
        <dt>Trạng thái</dt><dd>${STATUS_TEXT[st]}${left ? ` (còn ${Math.floor(left / 60)}:${pad2(left % 60)})` : ""}</dd>
        <dt>Dịch vụ</dt><dd>${esc(serviceName(b.serviceId))}</dd>
        <dt>Groomer</dt><dd>${esc(groomerName(b.groomerId))}${b.groomerRequest === "any" ? " (tiệm xếp)" : b.groomerRequest === "specific" ? " (khách chọn)" : ""}</dd>
        <dt>Thời gian</dt><dd>${dateText(b.date)}, ${minutesToText(b.startMin)} – ${minutesToText(b.endMin)}</dd>
        <dt>Khách</dt><dd>${esc((b.customer && b.customer.name) || "(chưa có)")}${b.customer && b.customer.phone ? " · " + esc(b.customer.phone) : ""}</dd>
        <dt>Bé</dt><dd>${esc(b.pet.name || "")} ${b.pet.species === "cat" ? "Mèo" : "Chó"}, ${esc((WEIGHTS.find(function (w) { return w[0] === b.pet.weightRange; }) || [0, ""])[1])}, ${b.pet.coat === "long" ? "lông dài" : "lông ngắn"}</dd>
        <dt>Nguồn</dt><dd>${b.source === "walk-in" ? "Khách đến trực tiếp" : "Đặt online"}</dd>
        <dt>Giá</dt><dd>${formatPrice(b.unitPrice)}</dd>
        ${b.note ? `<dt>Ghi chú</dt><dd>${esc(b.note)}</dd>` : ""}
      </dl>
      ${p.error ? `<p class="sp-error" role="alert">${esc(p.error)}</p>` : ""}
      <div class="sp-actions">${actions}${canMove && !p.moving ? `<button type="button" class="btn btn-outline" data-act="start-move">Dời lịch</button>` : ""}<button type="button" class="btn btn-outline" data-act="close">Đóng</button></div>
      ${moveForm}`;
  }

  function redraw() { renderGrid(); renderPanel(); }

  // ---------- Sự kiện ----------
  function openWalkIn(groomerId, startMin) {
    const g = groomers.find(function (x) { return x.id === groomerId; });
    view.selectedId = null;
    view.panel = { mode: "walkin", groomerId: groomerId, startMin: startMin, serviceId: g.services[0], options: { species: "dog", weightRange: "<5kg", coat: "short" }, name: "", phone: "", petName: "", error: "", suggestions: [] };
    redraw();
  }

  document.addEventListener("DOMContentLoaded", function () {
    redraw();

    gridEl.addEventListener("click", function (event) {
      const block = event.target.closest("[data-booking]");
      if (block) { view.selectedId = block.dataset.booking; view.panel = { mode: "detail", id: block.dataset.booking }; redraw(); return; }
      if (event.target.closest(".sg-off")) return;
      const col = event.target.closest(".sg-col");
      if (col) {
        const y = event.clientY - col.getBoundingClientRect().top;
        const start = DAY_START + Math.floor(y / ROW) * STEP;
        openWalkIn(col.dataset.groomer, Math.min(start, DAY_END - STEP));
      }
    });
    gridEl.addEventListener("keydown", function (event) {
      if ((event.key === "Enter" || event.key === " ") && event.target.classList.contains("sg-col")) {
        event.preventDefault();
        const now = toVnParts(Date.now());
        openWalkIn(event.target.dataset.groomer, Math.min(Math.max(roundUp(view.date === now.date ? now.minutes : 540, STEP), DAY_START), DAY_END - STEP));
      }
    });

    document.querySelector(".staff-toolbar").addEventListener("click", function (event) {
      const a = event.target.closest("[data-action]"); if (!a) return;
      if (a.dataset.action === "prev-day") view.date = addDays(view.date, -1);
      if (a.dataset.action === "next-day") view.date = addDays(view.date, 1);
      if (a.dataset.action === "today") view.date = toVnParts(Date.now()).date;
      view.panel = null; view.selectedId = null; redraw();
    });
    document.getElementById("staff-date").addEventListener("change", function (event) {
      if (isValidDate(event.target.value)) { view.date = event.target.value; view.panel = null; view.selectedId = null; redraw(); }
    });

    panelEl.addEventListener("change", function (event) {
      const t = event.target, p = view.panel; if (!p) return;
      if (t.dataset.w) { p[t.dataset.w] = t.dataset.w === "groomerId" ? t.value : Number(t.value); p.error = ""; p.suggestions = []; renderPanel(); }
      else if (t.dataset.wo) { p.options[t.dataset.wo] = t.value; renderPanel(); }
      else if (t.dataset.m) { p[t.dataset.m] = t.dataset.m === "moveStart" ? Number(t.value) : t.value; if (t.dataset.m !== "moveStart") p.moveStart = undefined; renderPanel(); }
    });
    panelEl.addEventListener("input", function (event) {
      const t = event.target; if (view.panel && t.dataset.wf) view.panel[t.dataset.wf] = t.value;
    });

    panelEl.addEventListener("submit", function (event) {
      event.preventDefault();
      const p = view.panel; if (!p || p.mode !== "walkin") return;
      const r = createWalkInBooking({ serviceId: p.serviceId, options: p.options, date: view.date, startMin: p.startMin, groomerId: p.groomerId,
        customer: { name: p.name, phone: p.phone }, pet: { name: p.petName }, unitPrice: calculatePrice(products.find(function (x) { return x.id === p.serviceId; }), p.options) });
      if (!r.ok) { p.error = r.message; p.suggestions = r.suggestions || []; renderPanel(); return; }
      view.selectedId = r.booking.id; view.panel = { mode: "detail", id: r.booking.id }; redraw();
    });

    panelEl.addEventListener("click", function (event) {
      const p = view.panel;
      const take = event.target.closest("[data-take]");
      if (take && p) {
        const parts = take.dataset.take.split("|"); view.date = parts[0]; p.startMin = Number(parts[1]); p.groomerId = parts[2]; p.error = ""; p.suggestions = []; redraw(); return;
      }
      const st = event.target.closest("[data-status]");
      if (st && p) {
        const r = changeBookingStatus(p.id, st.dataset.status);
        p.error = r.ok ? "" : r.message; redraw(); return;
      }
      const act = event.target.closest("[data-act]"); if (!act) return;
      const a = act.dataset.act;
      if (a === "close") { view.panel = null; view.selectedId = null; redraw(); }
      else if (a === "nearest" && p) {
        const near = getNearestFree(p.serviceId, p.options);
        if (near) { view.date = near.date; p.startMin = near.startMin; p.groomerId = near.groomerId; p.error = ""; p.suggestions = []; redraw(); }
        else { p.error = "Không còn giờ trống trong 7 ngày tới."; renderPanel(); }
      }
      else if (a === "start-move") { p.moving = true; p.moveStart = undefined; renderPanel(); }
      else if (a === "cancel-move") { p.moving = false; renderPanel(); }
      else if (a === "do-move") {
        const start = p.moveStart !== undefined ? p.moveStart : Number(panelEl.querySelector("#m-time").value);
        const b = getBookingById(p.id);
        const r = rescheduleBooking(p.id, { date: p.moveDate || b.date, startMin: start, groomerId: p.moveGroomer || b.groomerId }, true);
        if (!r.ok) { p.error = r.message; renderPanel(); return; }
        view.date = r.booking.date; p.moving = false; p.error = ""; redraw();
      }
    });

    // Lịch đổi ở tab khác (khách đặt, hủy...) thì làm mới ngay; không vẽ lại bảng khi nhân viên đang nhập form
    onBookingsChanged(function () { renderGrid(); if (!view.panel || view.panel.mode === "detail") renderPanel(); });
    // Giữ chỗ hết hạn trả chỗ: làm mới mỗi 20 giây
    setInterval(function () { renderGrid(); if (view.panel && view.panel.mode === "detail") renderPanel(); }, 20000);
  });
})();
