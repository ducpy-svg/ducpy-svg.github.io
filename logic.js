(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.OceanLogic = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var GROUPS = [
    { id: 'KINDY', label: 'Nhóm KINDY' },
    { id: 'KIDS', label: 'Nhóm KIDS' },
    { id: 'TEENS', label: 'Nhóm TEENS' },
    { id: 'IELTS', label: 'Nhóm IELTS' },
    { id: 'CUSTOM', label: 'Nhóm custom' }
  ];

  var DAYS = [
    { dow: 1, short: 'T2', label: 'Thứ Hai' },
    { dow: 2, short: 'T3', label: 'Thứ Ba' },
    { dow: 3, short: 'T4', label: 'Thứ Tư' },
    { dow: 4, short: 'T5', label: 'Thứ Năm' },
    { dow: 5, short: 'T6', label: 'Thứ Sáu' },
    { dow: 6, short: 'T7', label: 'Thứ Bảy' },
    { dow: 0, short: 'CN', label: 'Chủ Nhật' }
  ];

  var BANDS = [
    { id: 'morning', label: 'Nhóm lớp sáng' },
    { id: 'afternoon', label: 'Nhóm lớp chiều' },
    { id: 'evening', label: 'Nhóm lớp tối' }
  ];

  var WEEKDAYS = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

  var FET = [
    'Rica Lamera Gitamondoc',
    'Jonaleah Acero Figueroa',
    'Sheila Mae Wasawas Pañales',
    'Jayvelyn Logatoc Faeldan'
  ];

  var STAFF = [
    'Đặng Thị Hạnh',
    'Nguyễn Lê Na',
    'Hồ Thùy Dương',
    'Mai Quang Đức',
    'Nguyễn Hoàng Lê Vũ'
  ];

  var LEVEL_CHOICES = ['KINDY', 'KIDS', 'TEENS'];

  function g(id, track, label, form, code, lessons) {
    return { id: id, track: track, label: label, form: form, code: code, lessons: lessons };
  }

  var GRADES = [
    g('pre-kindy-a', 'KINDY', 'Pre-KINDY_A', 'pre', 'A', 24),
    g('pre-kindy-b', 'KINDY', 'Pre-KINDY_B', 'pre', 'B', 24),
    g('kindy-1a', 'KINDY', 'KINDY 1A', 'std', '1A', 24),
    g('kindy-1b', 'KINDY', 'KINDY 1B', 'std', '1B', 24),
    g('kindy-2a', 'KINDY', 'KINDY 2A', 'std', '2A', 24),
    g('kindy-2b', 'KINDY', 'KINDY 2B', 'std', '2B', 24),
    g('kindy-3a', 'KINDY', 'KINDY 3A', 'std', '3A', 24),
    g('kindy-3b', 'KINDY', 'KINDY 3B', 'std', '3B', 24),
    g('pre-kids-a', 'KIDS', 'Pre-KIDS_A', 'pre', 'A', 24),
    g('pre-kids-b', 'KIDS', 'Pre-KIDS_B', 'pre', 'B', 24),
    g('kids-1a', 'KIDS', 'KIDS 1A', 'std', '1A', 24),
    g('kids-1b', 'KIDS', 'KIDS 1B', 'std', '1B', 24),
    g('kids-2a', 'KIDS', 'KIDS 2A', 'std', '2A', 24),
    g('kids-2b', 'KIDS', 'KIDS 2B', 'std', '2B', 24),
    g('kids-3a', 'KIDS', 'KIDS 3A', 'std', '3A', 24),
    g('kids-3b', 'KIDS', 'KIDS 3B', 'std', '3B', 24),
    g('kids-4a', 'KIDS', 'KIDS 4A', 'std', '4A', 24),
    g('kids-4b', 'KIDS', 'KIDS 4B', 'std', '4B', 24),
    g('kids-5a', 'KIDS', 'KIDS 5A', 'std', '5A', 24),
    g('kids-5b', 'KIDS', 'KIDS 5B', 'std', '5B', 24),
    g('teens-1a', 'TEENS', 'TEENS 1A', 'std', '1A', 36),
    g('teens-1b', 'TEENS', 'TEENS 1B', 'std', '1B', 36),
    g('teens-2a', 'TEENS', 'TEENS 2A', 'std', '2A', 36),
    g('teens-2b', 'TEENS', 'TEENS 2B', 'std', '2B', 36),
    g('pre-ielts', 'IELTS', 'Pre-IELTS', 'preielts', '', 36),
    g('ielts-40', 'IELTS', 'IELTS 4.0', 'std', '4.0', 36),
    g('ielts-50', 'IELTS', 'IELTS 5.0', 'std', '5.0', 36),
    g('ielts-60', 'IELTS', 'IELTS 6.0', 'std', '6.0', 36),
    g('ielts-70', 'IELTS', 'IELTS 7.0', 'std', '7.0', 36),
    g('ielts-80', 'IELTS', 'IELTS 8.0', 'std', '8.0', 36)
  ];

  function uid() {
    return Math.random().toString(36).slice(2, 8) + Date.now().toString(36);
  }

  function gradeById(id) {
    for (var i = 0; i < GRADES.length; i++) if (GRADES[i].id === id) return GRADES[i];
    return null;
  }

  function gradeIndex(id) {
    for (var i = 0; i < GRADES.length; i++) if (GRADES[i].id === id) return i;
    return 999;
  }

  function nextGrade(grade) {
    var i = gradeIndex(grade.id);
    if (i < 0 || i >= GRADES.length - 1) return null;
    return GRADES[i + 1];
  }

  function gradesForChoice(choice) {
    if (choice === 'TEENS') {
      return GRADES.filter(function (item) { return item.track === 'TEENS' || item.track === 'IELTS'; });
    }
    return GRADES.filter(function (item) { return item.track === choice; });
  }

  function className(grade, number, homeTrack) {
    if (!grade) return '';
    if (homeTrack === 'TEENS' && grade.track === 'IELTS') {
      if (grade.form === 'preielts') return 'XH_TEENS' + number + '_Pre-IELTS';
      return 'XH_TEENS' + number + '_' + grade.code;
    }
    if (grade.form === 'pre') return 'XH_Pre-' + grade.track + number + '_' + grade.code;
    if (grade.form === 'preielts') return 'XH_Pre-IELTS' + number;
    return 'XH_' + grade.track + number + '_' + grade.code;
  }

  function levelToken(grade) {
    if (!grade) return '';
    if (grade.form === 'preielts') return 'PRE-IELTS';
    if (grade.form === 'pre') return 'PRE-' + grade.track + grade.code;
    return grade.track + grade.code;
  }

  function customClassName(customName, grade, customLevel) {
    var name = String(customName || '').trim();
    if (!name) return '';
    var token = String(customLevel || '').trim() || levelToken(grade);
    if (!token) return 'XH_' + name;
    return 'XH_' + name + '_' + token;
  }

  function currentName(cls) {
    if (!cls) return '';
    if (cls.kind === 'custom') {
      var named = customClassName(cls.customName, gradeById(cls.gradeId), cls.customLevel);
      if (named) return named;
    }
    return className(gradeById(cls.gradeId), cls.number, cls.homeTrack);
  }

  function trackLabel(cls, grade) {
    if (cls && cls.kind === 'custom') return 'Custom';
    var resolved = grade || gradeById(cls && cls.gradeId);
    if (cls && cls.homeTrack === 'TEENS' && resolved && resolved.track === 'IELTS') return 'TEENS';
    if (resolved) return resolved.track;
    return '';
  }

  function nameKey(value) {
    return String(value || '').toUpperCase().replace(/[_\-\s]/g, '');
  }

  function lessonTotal(gradeId) {
    var grade = gradeById(gradeId);
    return grade ? grade.lessons : 24;
  }

  function parseDateInput(value) {
    var parts = String(value || '').split('-');
    if (parts.length < 3) return null;
    var y = Number(parts[0]);
    var m = Number(parts[1]);
    var d = Number(parts[2]);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d, 0, 0, 0, 0);
  }

  function startOfDay(date) {
    var d = new Date(date.getTime());
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function addDays(date, days) {
    var d = new Date(date.getTime());
    d.setDate(d.getDate() + days);
    return d;
  }

  function atTime(day, hhmm) {
    var bits = String(hhmm || '0:0').split(':');
    var d = new Date(day.getTime());
    d.setHours(Number(bits[0]) || 0, Number(bits[1]) || 0, 0, 0);
    return d;
  }

  function addMonths(date, n) {
    var d = new Date(date.getTime());
    var day = d.getDate();
    d.setDate(1);
    d.setMonth(d.getMonth() + n);
    var last = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    d.setDate(Math.min(day, last));
    return d;
  }

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function formatDMY(value) {
    var d = value instanceof Date ? value : new Date(value);
    if (isNaN(d.getTime())) return '—';
    return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear();
  }

  function formatAmPm(date, withSeconds) {
    var h = date.getHours();
    var ap = h >= 12 ? 'P.M.' : 'A.M.';
    h = h % 12;
    if (h === 0) h = 12;
    var text = h + ':' + pad(date.getMinutes());
    if (withSeconds) text += ':' + pad(date.getSeconds());
    return text + ' ' + ap;
  }

  function formatTimeValue(hhmm) {
    var bits = String(hhmm || '00:00').split(':');
    var h = Number(bits[0]) || 0;
    var m = Number(bits[1]) || 0;
    var ap = h >= 12 ? 'P.M.' : 'A.M.';
    h = h % 12;
    if (h === 0) h = 12;
    return h + ':' + pad(m) + ' ' + ap;
  }

  function monthKey(date) {
    return date.getFullYear() + '-' + pad(date.getMonth() + 1);
  }

  function shiftMonth(key, dir) {
    var parts = String(key).split('-');
    var d = new Date(Number(parts[0]), Number(parts[1]) - 1 + dir, 1);
    return monthKey(d);
  }

  function monthLabel(key) {
    var parts = String(key).split('-');
    return 'Tháng ' + parts[1] + '/' + parts[0];
  }

  function weekdayName(date) {
    return WEEKDAYS[date.getDay()];
  }

  function todayInput(now) {
    return now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
  }

  function staffText(value) {
    if (!value) return '?';
    return String(value).replace(/,\s*/g, ', ');
  }

  function ageOf(dobStr, now) {
    var dob = parseDateInput(dobStr);
    if (!dob) return null;
    var age = now.getFullYear() - dob.getFullYear();
    var md = now.getMonth() - dob.getMonth();
    if (md < 0 || (md === 0 && now.getDate() < dob.getDate())) age--;
    return Math.max(0, age);
  }

  function noteVisible(note, now) {
    if (!note || !note.since) return false;
    return now.getTime() < addMonths(new Date(note.since), 1).getTime();
  }

  function numberTrack(cls) {
    if (!cls || cls.kind === 'custom') return '';
    if (cls.homeTrack === 'TEENS') return 'TEENS';
    var grade = gradeById(cls.gradeId);
    return grade ? grade.track : '';
  }

  function nextNumber(classes, track, exceptId) {
    var max = 0;
    (classes || []).forEach(function (cls) {
      if (!cls || cls.id === exceptId) return;
      if (numberTrack(cls) !== track) return;
      if (cls.number > max) max = cls.number;
    });
    return max + 1;
  }

  function numberTaken(classes, track, number, exceptId) {
    return (classes || []).some(function (cls) {
      if (!cls || cls.id === exceptId) return false;
      return numberTrack(cls) === track && cls.number === number;
    });
  }

  function cloneSlots(slots) {
    return (slots || []).map(function (slot) {
      return { dow: Number(slot.dow), start: String(slot.start || ''), end: String(slot.end || '') };
    }).filter(function (slot) {
      return !isNaN(slot.dow) && slot.start && slot.end;
    });
  }

  function revisionDay(value) {
    var text = String(value || '').slice(0, 10);
    var parsed = parseDateInput(text);
    if (parsed) return startOfDay(parsed);
    var date = new Date(value);
    if (isNaN(date.getTime())) return null;
    return startOfDay(date);
  }

  function slotsOn(cls, day) {
    var revisions = Array.isArray(cls.scheduleRevisions) ? cls.scheduleRevisions : [];
    if (!revisions.length) return cls.schedule || [];
    var when = startOfDay(day instanceof Date ? day : new Date(day)).getTime();
    var chosen = null;
    for (var i = 0; i < revisions.length; i++) {
      var from = revisionDay(revisions[i] && revisions[i].from);
      if (!from) continue;
      if (from.getTime() <= when) chosen = revisions[i];
    }
    if (!chosen) chosen = revisions[0];
    return chosen && chosen.slots ? chosen.slots : (cls.schedule || []);
  }

  function writeStandingSchedule(cls, slots) {
    var next = cloneSlots(slots);
    cls.schedule = next;
    if (!Array.isArray(cls.scheduleRevisions)) cls.scheduleRevisions = [];
    if (cls.scheduleRevisions.length) {
      cls.scheduleRevisions[cls.scheduleRevisions.length - 1].slots = cloneSlots(next);
    }
    return { ok: true };
  }

  function applyFixedSchedule(cls, slots, fromDate) {
    var next = cloneSlots(slots);
    if (!next.length) return { error: 'Hãy chọn ít nhất một buổi học trong tuần.' };
    var from = fromDate instanceof Date ? startOfDay(fromDate) : parseDateInput(fromDate);
    if (!from) return { error: 'Chọn ngày bắt đầu lịch mới.' };
    var born = revisionDay(cls.cycleStart) || from;
    if (!Array.isArray(cls.scheduleRevisions)) cls.scheduleRevisions = [];
    if (from.getTime() <= born.getTime()) {
      cls.scheduleRevisions = [{ from: isoDay(born), slots: cloneSlots(next) }];
      cls.schedule = cloneSlots(next);
      return { ok: true };
    }
    if (!cls.scheduleRevisions.length) {
      cls.scheduleRevisions.push({ from: isoDay(born), slots: cloneSlots(cls.schedule) });
    }
    var iso = isoDay(from);
    var replaced = false;
    for (var i = 0; i < cls.scheduleRevisions.length; i++) {
      if (String(cls.scheduleRevisions[i].from).slice(0, 10) === iso) {
        cls.scheduleRevisions[i].slots = cloneSlots(next);
        replaced = true;
      }
    }
    if (!replaced) cls.scheduleRevisions.push({ from: iso, slots: cloneSlots(next) });
    cls.scheduleRevisions.sort(function (a, b) {
      return String(a.from).localeCompare(String(b.from));
    });
    var latest = cls.scheduleRevisions[cls.scheduleRevisions.length - 1];
    cls.schedule = cloneSlots(latest.slots);
    return { ok: true };
  }

  function occurrenceAt(day, slot) {
    var sessionStart = atTime(day, slot.start);
    var sessionEnd = atTime(day, slot.end);
    return {
      iso: isoDay(day),
      key: isoDay(day) + '|' + slot.start,
      date: sessionStart,
      endDate: sessionEnd,
      dow: day.getDay(),
      start: slot.start,
      end: slot.end,
      custom: false
    };
  }

  function naturalOccurrences(cls, howMany) {
    if (howMany < 1) return [];
    var hasSlots = (cls.schedule && cls.schedule.length) || (cls.scheduleRevisions && cls.scheduleRevisions.length);
    if (!hasSlots) return [];
    var cycleStart = new Date(cls.cycleStart);
    if (isNaN(cycleStart.getTime())) return [];
    var anchor = startOfDay(cycleStart);
    var list = [];
    for (var w = 0; w < 900 && list.length < howMany; w++) {
      var winStart = addDays(anchor, w * 7);
      var winEnd = addDays(anchor, w * 7 + 7);
      var week = [];
      for (var i = 0; i < 7; i++) {
        var day = addDays(winStart, i);
        if (day.getTime() >= winEnd.getTime()) break;
        var daySlots = slotsOn(cls, day);
        for (var s = 0; s < daySlots.length; s++) {
          var slot = daySlots[s];
          if (day.getDay() !== Number(slot.dow)) continue;
          var sessionEnd = atTime(day, slot.end);
          if (sessionEnd.getTime() <= cycleStart.getTime()) continue;
          week.push(occurrenceAt(day, slot));
        }
      }
      week.sort(function (a, b) { return a.date - b.date; });
      for (var e = 0; e < week.length && list.length < howMany; e++) list.push(week[e]);
    }
    return list;
  }

  function sessionSkipMap(cls) {
    var map = {};
    (cls.sessionChanges || []).forEach(function (change) {
      if (change && change.from) map[change.from] = change;
    });
    return map;
  }

  function customOccurrence(change) {
    var day = parseDateInput(change.date);
    if (!day || !change.start || !change.end) return null;
    var slot = occurrenceAt(day, { start: change.start, end: change.end });
    slot.custom = true;
    return slot;
  }

  function lessonSessions(cls, howMany) {
    var changes = cls.sessionChanges || [];
    var deferN = 0;
    var customs = [];
    changes.forEach(function (change) {
      if (change.action === 'custom') customs.push(change);
      else if (change.action === 'defer') deferN += 1;
    });
    var skips = sessionSkipMap(cls);
    var kept = [];
    naturalOccurrences(cls, howMany + deferN).forEach(function (ses) {
      if (!skips[ses.key]) kept.push(ses);
    });
    customs.forEach(function (change) {
      var ses = customOccurrence(change);
      if (!ses) return;
      var later = skips[ses.key];
      if (later && later !== change) return;
      kept.push(ses);
    });
    kept.sort(function (a, b) { return a.endDate - b.endDate; });
    return kept;
  }

  function lessonEndDates(cls, howMany) {
    return lessonSessions(cls, howMany).map(function (ses) { return ses.endDate; });
  }

  function changeSession(cls, input) {
    cls.sessionChanges = cls.sessionChanges || [];
    var from = String(input.from || '');
    if (!from) return { error: 'Chưa chọn buổi.' };
    if (cls.sessionChanges.some(function (change) { return change.from === from; })) {
      return { error: 'Buổi này đã được hủy hoặc đổi.' };
    }
    var course = lessonSessions(cls, lessonTotal(cls.gradeId));
    if (!course.some(function (ses) { return ses.key === from; })) {
      return { error: 'Buổi này không nằm trong số lesson của cấp độ.' };
    }
    var reason = String(input.reason || '').trim() || 'none';
    if (input.action === 'custom') {
      if (!input.date || !input.start || !input.end || input.end <= input.start) {
        return { error: 'Chọn ngày và giờ hợp lệ cho buổi custom.' };
      }
      var previewSes = customOccurrence({ date: input.date, start: input.start, end: input.end });
      if (!previewSes) return { error: 'Chọn ngày và giờ hợp lệ cho buổi custom.' };
      if (course.some(function (ses) { return ses.key === previewSes.key && ses.key !== from; })) {
        return { error: 'Khung giờ này đã có buổi của lớp.' };
      }
      cls.sessionChanges.push({
        id: uid(),
        action: 'custom',
        from: from,
        date: input.date,
        start: input.start,
        end: input.end,
        reason: reason,
        at: input.at || new Date().toISOString()
      });
    } else {
      cls.sessionChanges.push({
        id: uid(),
        action: 'defer',
        from: from,
        reason: reason,
        at: input.at || new Date().toISOString()
      });
    }
    var next = lessonSessions(cls, lessonTotal(cls.gradeId));
    return { reason: reason, last: next.length ? next[next.length - 1] : null };
  }

  function currentLevel(cls) {
    var history = cls && cls.levelHistory;
    if (!history || !history.length) {
      return { gradeId: cls && cls.gradeId, number: cls && cls.number, from: cls && cls.cycleStart, to: null, name: currentName(cls) };
    }
    return history[history.length - 1];
  }

  function progressOf(cls, now) {
    var total = lessonTotal(cls.gradeId);
    var level = currentLevel(cls);
    var start = new Date(level && level.from ? level.from : cls.cycleStart);
    if (cls.completed) {
      return {
        done: total,
        total: total,
        end: cls.endOpen ? null : (cls.completedAt ? new Date(cls.completedAt) : null),
        open: !!cls.endOpen,
        start: start
      };
    }
    var ends = lessonEndDates(cls, total);
    var done = 0;
    for (var i = 0; i < ends.length; i++) if (ends[i].getTime() <= now.getTime()) done++;
    return {
      done: Math.min(done, total),
      total: total,
      end: cls.endOpen ? null : (ends.length >= total ? ends[total - 1] : null),
      open: !!cls.endOpen,
      start: start
    };
  }

  function pushNotice(state, announcedAt, text) {
    state.announcements.push({
      id: uid(),
      at: announcedAt.toISOString(),
      month: monthKey(announcedAt),
      text: text
    });
    if (state.announcements.length > 300) {
      state.announcements.splice(0, state.announcements.length - 300);
    }
  }

  function promote(state, cls, at, announcedAt) {
    if (!cls || cls.kind === 'custom' || cls.endOpen) return null;
    var grade = gradeById(cls.gradeId);
    if (!grade) return null;
    var oldName = currentName(cls);
    var next = nextGrade(grade);
    var when = at.toISOString();
    var last = cls.levelHistory[cls.levelHistory.length - 1];
    last.to = when;
    if (!next) {
      cls.completed = true;
      cls.completedAt = when;
      pushNotice(state, announcedAt, formatDMY(at) + ': ' + oldName + ' đã hoàn thành chương trình (cấp độ cuối).');
      return { oldName: oldName, newName: null, at: when, done: true };
    }
    var keepTeens = (cls.homeTrack === 'TEENS' || grade.track === 'TEENS') && next.track === 'IELTS';
    var number = cls.number;
    if (keepTeens) cls.homeTrack = 'TEENS';
    else if (next.track !== grade.track) {
      number = nextNumber(state.classes, next.track, cls.id);
      cls.homeTrack = '';
    }
    var newName = className(next, number, cls.homeTrack);
    cls.gradeId = next.id;
    cls.number = number;
    cls.cycleStart = when;
    cls.levelHistory.push({
      gradeId: next.id,
      number: number,
      from: when,
      to: null,
      name: newName
    });
    pushNotice(state, announcedAt, formatDMY(at) + ': ' + oldName + ' đã lên thành ' + newName + '.');
    return { oldName: oldName, newName: newName, at: when, done: false };
  }

  function finishCustom(state, cls, at, announcedAt) {
    var name = currentName(cls);
    var when = at.toISOString();
    cls.completed = true;
    cls.completedAt = when;
    pushNotice(state, announcedAt, formatDMY(at) + ': ' + name + ' đã kết thúc khóa và không lên trình độ.');
    return { name: name, at: when };
  }

  function sameLocalDay(iso, date) {
    var prev = new Date(iso || '');
    if (!date || isNaN(prev.getTime())) return false;
    return prev.getFullYear() === date.getFullYear() && prev.getMonth() === date.getMonth() && prev.getDate() === date.getDate();
  }

  function applyLevelEdit(cls, classes, input) {
    if (!cls) return { error: 'Không thấy lớp.' };
    var custom = cls.kind === 'custom';
    var grade = gradeById(input && input.gradeId);
    var keptLevel = custom ? String(input && input.customLevel != null ? input.customLevel : (cls.customLevel || '')).trim() : '';
    if (!grade && !(custom && keptLevel)) return { error: 'Chọn cấp độ.' };
    var start = input && input.start instanceof Date ? input.start : parseDateInput(input && input.start);
    if (!start) return { error: 'Ngày bắt đầu chưa hợp lệ.' };
    var history = Array.isArray(cls.levelHistory) ? cls.levelHistory : [];
    if (history.length > 1) {
      var prev = history[history.length - 2];
      var prevTo = prev && prev.to ? new Date(prev.to).getTime() : NaN;
      if (!isNaN(prevTo) && start.getTime() < prevTo) {
        return { error: 'Ngày bắt đầu cấp độ này phải từ ngày kết thúc cấp độ trước.' };
      }
    }
    var customName = custom ? String(input.customName || '').trim().replace(/\s+/g, '') : '';
    if (custom && (!customName || !/^[A-Za-z0-9.-]+$/.test(customName))) {
      return { error: 'Tên custom chỉ gồm chữ, số, dấu chấm hoặc gạch ngang, không có khoảng trắng.' };
    }
    var number = custom ? 0 : parseInt(input.number, 10);
    if (!custom && (!number || number < 1)) return { error: 'Điền số lớp và cấp độ.' };
    var homeTrack = !custom && input.homeTrack === 'TEENS' ? 'TEENS' : '';
    var numberTrackId = homeTrack === 'TEENS' ? 'TEENS' : (grade ? grade.track : '');
    if (!custom && numberTaken(classes, numberTrackId, number, cls.id)) {
      return { error: 'Số ' + number + ' đã có trong trình độ ' + numberTrackId + '.' };
    }
    var customLevel = '';
    if (custom) {
      if (!grade) customLevel = keptLevel;
      else if (String(input.gradeId || '') === String(cls.gradeId || '')) customLevel = String(cls.customLevel || '');
      else customLevel = '';
    }
    var nextName = custom ? customClassName(customName, grade, customLevel) : className(grade, number, homeTrack);
    var taken = (classes || []).some(function (item) {
      return item && item.id !== cls.id && nameKey(currentName(item)) === nameKey(nextName);
    });
    if (taken) return { error: 'Đã có lớp ' + nextName + '.' };
    var open = history.length ? history[history.length - 1] : null;
    var fromIso = open && open.from && sameLocalDay(open.from, start) ? open.from : start.toISOString();
    var identity = currentName(cls) !== nextName
      || String(cls.gradeId || '') !== (grade ? grade.id : '')
      || Number(cls.number || 0) !== number
      || String(cls.homeTrack || '') !== homeTrack
      || (custom && cls.customName !== customName)
      || (custom && String(cls.customLevel || '') !== customLevel)
      || !open
      || open.from !== fromIso;
    cls.gradeId = grade ? grade.id : '';
    cls.number = number;
    cls.homeTrack = homeTrack;
    if (custom) {
      cls.customName = customName;
      cls.customLevel = customLevel;
    }
    if (!open) {
      cls.levelHistory = [{ gradeId: cls.gradeId, number: number, from: fromIso, to: null, name: nextName }];
    } else {
      open.gradeId = cls.gradeId;
      open.number = number;
      open.from = fromIso;
      open.name = nextName;
    }
    if (cls.levelHistory.length === 1) {
      cls.cycleStart = sameLocalDay(cls.cycleStart, start) ? cls.cycleStart : fromIso;
    }
    return { ok: true, name: nextName, identity: identity };
  }

  function runSystemUpdate(state, now, holdId) {
    var promoted = [];
    var finished = [];
    var guard = 0;
    while (guard++ < 200) {
      var ready = [];
      var ordered = state.classes.slice().sort(function (a, b) {
        return String(a.createdAt).localeCompare(String(b.createdAt)) || String(a.id).localeCompare(String(b.id));
      });
      for (var i = 0; i < ordered.length; i++) {
        var cls = ordered[i];
        if (holdId && cls.id === holdId) continue;
        if (cls.completed || cls.endOpen) continue;
        var need = lessonTotal(cls.gradeId);
        var ends = lessonEndDates(cls, need);
        if (!(ends.length >= need && now.getTime() >= ends[need - 1].getTime())) continue;
        if (cls.kind === 'custom') {
          finished.push(finishCustom(state, cls, ends[need - 1], now));
          continue;
        }
        ready.push({ cls: cls, at: ends[need - 1] });
      }
      if (!ready.length) break;
      for (var r = 0; r < ready.length; r++) {
        var step = promote(state, ready[r].cls, ready[r].at, now);
        if (step) promoted.push(step);
      }
    }
    var notesCleared = 0;
    state.classes.forEach(function (cls) {
      (cls.students || []).forEach(function (stu) {
        if (stu.transferNote && !noteVisible(stu.transferNote, now)) {
          stu.transferNote = null;
          notesCleared++;
        }
      });
    });
    var ending = 0;
    state.classes.forEach(function (cls) {
      if (cls.completed) return;
      var progress = progressOf(cls, now);
      var left = progress.total - progress.done;
      if (holdId && cls.id === holdId) return;
      if (!(left > 0 && left < 3) || !progress.end) return;
      var key = progress.end.toISOString();
      if (cls.endWarnKey === key) return;
      cls.endWarnKey = key;
      ending += 1;
      pushNotice(state, now, formatDMY(now) + ': ' + currentName(cls) + ' sắp kết thúc khóa, còn ' + left + ' buổi. Dự kiến kết thúc ' + formatDMY(progress.end) + '.');
    });
    var archived = settleRoster(state, now);
    return { promoted: promoted, notesCleared: notesCleared, ending: ending, finished: finished, archived: archived };
  }

  function createClass(input) {
    var start = input.cycleStart instanceof Date ? input.cycleStart : parseDateInput(input.startDate);
    var grade = gradeById(input.gradeId);
    if (!start || !grade) return null;
    var custom = input.kind === 'custom';
    var customName = String(input.customName || '').trim();
    if (custom && !customName) return null;
    var number = custom ? 0 : input.number;
    var homeTrack = !custom && input.homeTrack === 'TEENS' ? 'TEENS' : '';
    var name = custom ? customClassName(customName, grade, input.customLevel) : className(grade, number, homeTrack);
    var iso = start.toISOString();
    return {
      id: input.id || uid(),
      number: number,
      gradeId: grade.id,
      schedule: cloneSlots(input.schedule),
      scheduleRevisions: [],
      fet: input.fet || '',
      cm: input.cm || '',
      ta: input.ta || '',
      createdAt: input.createdAt || new Date().toISOString(),
      cycleStart: iso,
      kind: custom ? 'custom' : (input.kind === 'addon' ? 'addon' : 'starter'),
      customName: custom ? customName : '',
      customLevel: custom ? String(input.customLevel || '') : '',
      homeTrack: homeTrack,
      endOpen: !!(custom && input.endOpen),
      sessionChanges: [],
      completed: false,
      completedAt: null,
      levelHistory: [{ gradeId: grade.id, number: number, from: iso, to: null, name: name }],
      students: []
    };
  }

  function createStudent(input) {
    return {
      id: input.id || uid(),
      code: input.code || '',
      name: input.name || '',
      englishName: input.englishName || '',
      gender: input.gender || 'Nam',
      dob: input.dob || '',
      phone: input.phone || '',
      ec: input.ec || '',
      status: 'active',
      stoppedAt: null,
      transferNote: null,
      transfers: [],
      notes: [],
      joinedAt: input.joinedAt || new Date().toISOString(),
      originClassId: input.originClassId || '',
      homework: input.homework || {},
      enroll: input.enroll === 'trial' || input.enroll === 'scholarship' ? input.enroll : 'official',
      trialOn: input.trialOn || '',
      trialStart: input.trialStart || '',
      trialEnd: input.trialEnd || '',
      scholarshipLessons: Math.min(24, Math.max(0, Number(input.scholarshipLessons) || 0)),
      expireKind: input.expireKind === 'stop' || input.expireKind === 'outdated' ? input.expireKind : '',
      expiredAt: input.expiredAt || '',
      expireReason: input.expireReason || ''
    };
  }

  function enrollOf(stu) {
    if (!stu) return 'official';
    if (stu.enroll === 'trial' || stu.enroll === 'scholarship') return stu.enroll;
    return 'official';
  }

  function trialMoment(stu) {
    var day = parseDateInput(stu && stu.trialOn);
    if (!day) return null;
    return atTime(day, (stu.trialEnd || stu.trialStart || '23:59'));
  }

  function scholarshipStat(cls, stu, now) {
    var limit = Math.min(24, Math.max(0, Number(stu.scholarshipLessons) || 0));
    var joined = new Date(stu.joinedAt || (cls && cls.cycleStart) || 0);
    if (!cls || !limit || isNaN(joined.getTime())) return { used: 0, limit: limit, doneAt: null };
    var skips = sessionSkipMap(cls);
    var used = 0;
    var doneAt = null;
    var day = startOfDay(joined);
    var last = startOfDay(now);
    var guard = 0;
    while (day.getTime() <= last.getTime() && guard++ < 900 && !doneAt) {
      var current = new Date(day.getTime());
      slotsOn(cls, current).forEach(function (slot) {
        if (doneAt || current.getDay() !== Number(slot.dow)) return;
        var ses = occurrenceAt(current, slot);
        if (skips[ses.key]) return;
        if (ses.endDate.getTime() < joined.getTime() || ses.endDate.getTime() > now.getTime()) return;
        used += 1;
        if (used >= limit) doneAt = ses.endDate;
      });
      day = addDays(day, 1);
    }
    return { used: used, limit: limit, doneAt: doneAt };
  }

  function studentPhase(cls, stu, now) {
    var when = now instanceof Date ? now : new Date(now);
    if (!stu) return { kind: 'listed', tag: 'official', reason: '', expiredAt: null, until: null };
    if ((stu.expireKind === 'stop' || stu.expireKind === 'outdated') && stu.expiredAt) {
      var stopAt = new Date(stu.expiredAt);
      var stopUntil = addDays(stopAt, 7);
      var stopReason = stu.expireReason || (stu.expireKind === 'outdated' ? 'Học viên outdated' : 'Dừng');
      var stopTag = stu.expireKind === 'outdated' ? 'outdated' : 'stop';
      if (!isNaN(stopAt.getTime()) && when.getTime() >= stopUntil.getTime()) {
        return { kind: 'archive', tag: stopTag, reason: stopReason, expiredAt: stopAt, until: stopUntil };
      }
      if (!isNaN(stopAt.getTime())) {
        return { kind: 'gray', tag: stopTag, reason: stopReason, expiredAt: stopAt, until: stopUntil };
      }
    }
    if (stu.status === 'stopped' && stu.stoppedAt) {
      var heldAt = new Date(stu.stoppedAt);
      var heldUntil = addDays(heldAt, 7);
      var heldReason = stu.expireReason || 'Dừng học';
      if (!isNaN(heldAt.getTime()) && when.getTime() >= heldUntil.getTime()) {
        return { kind: 'archive', tag: 'stop', reason: heldReason, expiredAt: heldAt, until: heldUntil };
      }
      if (!isNaN(heldAt.getTime())) {
        return { kind: 'gray', tag: 'stop', reason: heldReason, expiredAt: heldAt, until: heldUntil };
      }
    }
    var enroll = enrollOf(stu);
    if (enroll === 'trial' && !(stu.transfers && stu.transfers.length)) {
      var moment = trialMoment(stu);
      if (moment && startOfDay(when).getTime() > startOfDay(moment).getTime()) {
        var grayFrom = addDays(startOfDay(moment), 1);
        var grayUntil = addDays(grayFrom, 7);
        if (when.getTime() >= grayUntil.getTime()) {
          return { kind: 'archive', tag: 'trial', reason: 'Hết buổi Trial', expiredAt: grayFrom, until: grayUntil };
        }
        return { kind: 'gray', tag: 'trial', reason: 'Hết buổi Trial', expiredAt: grayFrom, until: grayUntil };
      }
    }
    if (enroll === 'scholarship') {
      var stat = scholarshipStat(cls, stu, when);
      if (stat.doneAt) {
        var until = addDays(stat.doneAt, 7);
        if (when.getTime() >= until.getTime()) {
          return { kind: 'archive', tag: 'scholarship', reason: 'Hết số buổi học bổng', expiredAt: stat.doneAt, until: until, used: stat.used, limit: stat.limit };
        }
        return { kind: 'gray', tag: 'scholarship', reason: 'Hết số buổi học bổng', expiredAt: stat.doneAt, until: until, used: stat.used, limit: stat.limit };
      }
      return { kind: 'listed', tag: 'scholarship', reason: '', expiredAt: null, until: null, used: stat.used, limit: stat.limit };
    }
    return { kind: 'listed', tag: enroll, reason: '', expiredAt: null, until: null };
  }

  function archiveRecord(cls, stu, phase, now) {
    var grade = gradeById(cls && cls.gradeId);
    var track = cls && cls.kind === 'custom' ? 'CUSTOM' : (grade ? grade.track : '');
    return {
      id: stu.id,
      code: stu.code || '',
      name: stu.name || '',
      englishName: stu.englishName || '',
      gender: stu.gender || '',
      dob: stu.dob || '',
      phone: stu.phone || '',
      ec: stu.ec || '',
      enroll: enrollOf(stu),
      joinedAt: stu.joinedAt || '',
      notes: stu.notes || [],
      transfers: stu.transfers || [],
      lastClassId: cls ? cls.id : '',
      lastClassName: cls ? currentName(cls) : '',
      track: track,
      reason: (phase && phase.reason) || '',
      expiredAt: phase && phase.expiredAt ? phase.expiredAt.toISOString() : '',
      archivedAt: (now instanceof Date ? now : new Date()).toISOString()
    };
  }

  function settleRoster(state, now) {
    if (!state) return [];
    if (!Array.isArray(state.archive)) state.archive = [];
    var archived = [];
    (state.classes || []).forEach(function (cls) {
      var keep = [];
      (cls.students || []).forEach(function (stu) {
        var phase = studentPhase(cls, stu, now);
        if (phase.kind !== 'archive') { keep.push(stu); return; }
        state.archive.push(archiveRecord(cls, stu, phase, now));
        archived.push(stu);
        pushNotice(state, now, formatDMY(now) + ': ' + (stu.name || 'Học viên') + ' đã chuyển vào Học viên cũ/kết thúc.');
      });
      cls.students = keep;
    });
    return archived;
  }

  function listedCount(cls, now) {
    var when = now instanceof Date ? now : new Date(now || Date.now());
    var n = 0;
    (cls && cls.students || []).forEach(function (stu) {
      if (!stu || stu.status === 'stopped') return;
      if (studentPhase(cls, stu, when).kind === 'listed') n += 1;
    });
    return n;
  }

  function sameLevel(a, b) {
    return String((a && a.gradeId) || '') === String((b && b.gradeId) || '');
  }

  function transferStudents(state, fromId, toId, studentIds, now) {
    var from = null;
    var to = null;
    state.classes.forEach(function (cls) {
      if (cls.id === fromId) from = cls;
      if (cls.id === toId) to = cls;
    });
    if (!from || !to || from.id === to.id) return { error: 'Chọn một lớp khác lớp hiện tại.' };
    var when = now instanceof Date ? now : new Date(now || Date.now());
    var incoming = [];
    var incomingListed = 0;
    for (var i = 0; i < studentIds.length; i++) {
      for (var s = 0; s < from.students.length; s++) {
        var candidate = from.students[s];
        if (candidate.id === studentIds[i] && candidate.status === 'active') {
          incoming.push(candidate);
          if (studentPhase(to, candidate, when).kind === 'listed') incomingListed += 1;
        }
      }
    }
    if (!incoming.length) return { error: 'Chưa chọn học viên đang học.' };
    if (listedCount(to, when) + incomingListed > 20) {
      return { error: 'Không thể thực hiện vì sĩ số đã đạt 20.' };
    }
    var fromName = currentName(from);
    var toName = currentName(to);
    var moved = [];
    incoming.forEach(function (stu) {
      var idx = from.students.indexOf(stu);
      if (idx < 0) return;
      from.students.splice(idx, 1);
      if (!stu.originClassId) stu.originClassId = from.id;
      if (!stu.joinedAt) stu.joinedAt = from.levelHistory[0].from;
      if (!stu.homework) stu.homework = {};
      if (!Array.isArray(stu.transfers)) stu.transfers = [];
      stu.transferNote = { fromName: fromName, since: when.toISOString() };
      stu.transfers.push({
        fromId: from.id,
        fromName: fromName,
        toId: to.id,
        toName: toName,
        at: when.toISOString()
      });
      to.students.push(stu);
      moved.push(stu.id);
    });
    var levelGap = !sameLevel(from, to);
    if (moved.length) {
      var line = formatDMY(when) + ': ' + moved.length + ' học viên chuyển từ ' + fromName + ' sang ' + toName + '.';
      if (levelGap) line += ' Bạn đang xếp chuyển lớp lệch trình độ.';
      pushNotice(state, when, line);
    }
    return { moved: moved, fromName: fromName, toName: toName, levelGap: levelGap };
  }

  function sortStudents(list, mode) {
    var arr = list.slice();
    if (mode === 'dob') {
      arr.sort(function (a, b) {
        return String(a.dob).localeCompare(String(b.dob)) || a.name.localeCompare(b.name, 'vi');
      });
    } else {
      arr.sort(function (a, b) {
        return a.name.localeCompare(b.name, 'vi', { sensitivity: 'base' }) || String(a.dob).localeCompare(String(b.dob));
      });
    }
    return arr;
  }

  function activeStudents(cls) {
    return cls.students.filter(function (stu) { return stu.status !== 'stopped'; });
  }

  function weekMonday(date) {
    var d = startOfDay(date);
    var day = d.getDay();
    var diff = day === 0 ? -6 : 1 - day;
    return addDays(d, diff);
  }

  function minutesOf(hhmm) {
    var bits = String(hhmm || '0:0').split(':');
    return (Number(bits[0]) || 0) * 60 + (Number(bits[1]) || 0);
  }

  function bandOf(start) {
    var mins = minutesOf(start);
    if (mins < 12 * 60) return 'morning';
    if (mins < 17 * 60) return 'afternoon';
    return 'evening';
  }

  function staffHas(value, needle) {
    if (!needle) return true;
    if (value === needle) return true;
    var parts = String(value || '').split(',');
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].trim() === needle) return true;
    }
    return false;
  }

  function sessionFetOf(cls, iso, start) {
    var book = cls && cls.sessionFets;
    var key = String(iso || '') + '|' + String(start || '');
    if (book && typeof book === 'object' && !Array.isArray(book) && book[key]) return String(book[key]);
    return String(cls && cls.fet || '');
  }

  function classFetNames(cls) {
    var seen = {};
    var out = [];
    function add(value) {
      String(value || '').split(',').forEach(function (part) {
        var name = part.trim();
        if (!name || name === '?' || name === '-' || seen[name]) return;
        seen[name] = true;
        out.push(name);
      });
    }
    if (!cls) return out;
    add(cls.fet);
    var book = cls.sessionFets || {};
    Object.keys(book).forEach(function (key) { add(book[key]); });
    return out;
  }

  function classFetHit(cls, needle) {
    if (!needle) return true;
    if (staffHas(cls && cls.fet, needle)) return true;
    var book = cls && cls.sessionFets;
    if (!book || typeof book !== 'object') return false;
    var keys = Object.keys(book);
    for (var i = 0; i < keys.length; i++) {
      if (staffHas(book[keys[i]], needle)) return true;
    }
    return false;
  }

  function countdownLabel(until, now) {
    var end = until instanceof Date ? until : new Date(until);
    var when = now instanceof Date ? now : new Date(now || Date.now());
    if (isNaN(end.getTime())) return '';
    var ms = end.getTime() - when.getTime();
    if (ms < 0) ms = 0;
    var total = Math.floor(ms / 1000);
    var days = Math.floor(total / 86400);
    total -= days * 86400;
    var hours = Math.floor(total / 3600);
    total -= hours * 3600;
    var mins = Math.floor(total / 60);
    var secs = total - mins * 60;
    return days + ' ngày ' + hours + ' giờ ' + mins + ' phút ' + secs + ' giây';
  }

  function passFilter(cls, filter) {
    if (!filter) return true;
    if (filter.fet && !classFetHit(cls, filter.fet)) return false;
    if (filter.cm && cls.cm !== filter.cm) return false;
    if (filter.ta && cls.ta !== filter.ta) return false;
    return true;
  }

  function levelAt(cls, instant) {
    var t = instant.getTime();
    var fallback = cls.levelHistory[cls.levelHistory.length - 1];
    for (var i = 0; i < cls.levelHistory.length; i++) {
      var h = cls.levelHistory[i];
      var from = new Date(h.from).getTime();
      var to = h.to ? new Date(h.to).getTime() : Infinity;
      if (t >= from && t < to) return h;
    }
    return fallback;
  }

  function slotText(key, end) {
    var parts = String(key || '').split('|');
    var day = parseDateInput(parts[0]);
    var start = parts[1] || '';
    if (!day) return String(key || '');
    var clock = start ? formatTimeValue(start) : '';
    if (end) clock += (clock ? '–' : '') + formatTimeValue(end);
    return weekdayName(day) + ' ' + formatDMY(day) + (clock ? ' ' + clock : '');
  }

  function endForKey(cls, key) {
    var parts = String(key || '').split('|');
    var start = parts[1] || '';
    var day = parseDateInput(parts[0]);
    var slots = day ? slotsOn(cls, day) : (cls.schedule || []);
    for (var i = 0; i < slots.length; i++) {
      if (slots[i].start === start) return slots[i].end || '';
    }
    var current = cls.schedule || [];
    for (var j = 0; j < current.length; j++) {
      if (current[j].start === start) return current[j].end || '';
    }
    return '';
  }

  function reasonText(reason) {
    var text = String(reason || '').trim();
    if (!text || text === 'none') return 'Không ghi lý do';
    return text;
  }

  function sessionAlerts(cls) {
    var map = {};
    if (!cls) return map;
    var changes = cls.sessionChanges || [];
    if (!changes.length) return map;
    var total = lessonTotal(cls.gradeId);
    var original = {};
    naturalOccurrences(cls, total).forEach(function (ses) { original[ses.key] = true; });
    var makeups = lessonSessions(cls, total).filter(function (ses) {
      return ses && !ses.custom && !original[ses.key];
    });
    var deferI = 0;
    changes.forEach(function (change) {
      if (!change) return;
      var reason = reasonText(change.reason);
      if (change.action === 'custom') {
        var ses = customOccurrence(change);
        if (!ses) return;
        map[ses.key] = 'Chuyển lịch: ' + slotText(change.from, endForKey(cls, change.from)) + ' → ' + slotText(ses.key, change.end) + '. Lý do: ' + reason;
      } else {
        var makeup = makeups[deferI];
        deferI += 1;
        if (!makeup) return;
        map[makeup.key] = 'Hủy cuối khóa: buổi ' + slotText(change.from, endForKey(cls, change.from)) + ' được dời thành buổi bù ' + slotText(makeup.key, makeup.end) + '. Lý do: ' + reason;
      }
    });
    return map;
  }

  function buildSchedule(classes, weekStart, now, filter, office) {
    var start = startOfDay(weekStart);
    var end = addDays(start, 7);
    var rows = { morning: [], afternoon: [], evening: [] };
    var index = { morning: {}, afternoon: {}, evening: {} };
    function ensureRow(band, slotStart, slotEnd) {
      var key = slotStart + '|' + slotEnd;
      if (!index[band][key]) {
        var row = { start: slotStart, end: slotEnd, cells: { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] } };
        index[band][key] = row;
        rows[band].push(row);
      }
      return index[band][key];
    }
    function chipFor(cls, ses, tag, alert) {
      var level = levelAt(cls, ses.date);
      var grade = level ? gradeById(level.gradeId) : null;
      return {
        id: cls.id,
        name: cls.kind === 'custom' ? currentName(cls) : ((level && level.name) || currentName(cls)),
        group: cls.kind === 'custom' ? 'CUSTOM' : (grade ? grade.track : 'CUSTOM'),
        fet: sessionFetOf(cls, ses.iso, ses.start),
        cm: cls.cm || '',
        ta: cls.ta || '',
        iso: ses.iso,
        start: ses.start,
        end: ses.end,
        sessionKey: ses.key,
        tag: tag || '',
        alert: alert || ''
      };
    }
    (classes || []).forEach(function (cls) {
      if (!passFilter(cls, filter)) return;
      var alerts = sessionAlerts(cls);
      var bornFrom = cls.levelHistory && cls.levelHistory[0] ? cls.levelHistory[0].from : cls.cycleStart;
      var born = new Date(bornFrom);
      var skipped = sessionSkipMap(cls);
      var tags = {};
      if ((cls.sessionChanges || []).length) {
        var total = lessonTotal(cls.gradeId);
        var original = {};
        naturalOccurrences(cls, total).forEach(function (ses) { original[ses.key] = true; });
        lessonSessions(cls, total).forEach(function (ses) {
          if (ses.custom) tags[ses.key] = 'Đổi';
          else if (!original[ses.key]) tags[ses.key] = 'Bù';
        });
      }
      for (var i = 0; i < 7; i++) {
        var day = addDays(start, i);
        if (day.getTime() < start.getTime() || day.getTime() >= end.getTime()) continue;
        slotsOn(cls, day).forEach(function (slot) {
          if (day.getDay() !== Number(slot.dow)) return;
          var ses = occurrenceAt(day, slot);
          if (ses.endDate.getTime() <= born.getTime()) return;
          if (cls.completedAt && ses.date.getTime() > new Date(cls.completedAt).getTime()) return;
          if (skipped[ses.key]) return;
          var chip = chipFor(cls, ses, tags[ses.key], alerts[ses.key]);
          if (filter && filter.fet && !staffHas(chip.fet, filter.fet)) return;
          ensureRow(bandOf(slot.start), slot.start, slot.end).cells[Number(slot.dow)].push(chip);
        });
      }
      (cls.sessionChanges || []).forEach(function (change) {
        if (change.action !== 'custom') return;
        var ses = customOccurrence(change);
        if (!ses) return;
        if (ses.date.getTime() < start.getTime() || ses.date.getTime() >= end.getTime()) return;
        if (ses.endDate.getTime() <= born.getTime()) return;
        if (cls.completedAt && ses.date.getTime() > new Date(cls.completedAt).getTime()) return;
        var moved = chipFor(cls, ses, 'Đổi', alerts[ses.key]);
        if (filter && filter.fet && !staffHas(moved.fet, filter.fet)) return;
        ensureRow(bandOf(ses.start), ses.start, ses.end).cells[ses.dow].push(moved);
      });
    });
    (office || []).forEach(function (slot) {
      if (!slot || !slot.start || !slot.end || !slot.date) return;
      var day = parseDateInput(slot.date);
      if (!day) return;
      if (day.getTime() < start.getTime() || day.getTime() >= end.getTime()) return;
      ensureRow(bandOf(slot.start), slot.start, slot.end).cells[day.getDay()].push({
        soa: true,
        id: slot.id || '',
        name: slot.type || 'SOA',
        group: 'SOA',
        fet: slot.fet || '',
        cm: '',
        ta: '',
        iso: isoDay(day),
        start: slot.start,
        end: slot.end,
        sessionKey: '',
        tag: 'SOA',
        alert: ''
      });
    });
    BANDS.forEach(function (band) {
      rows[band.id].sort(function (a, b) {
        return minutesOf(a.start) - minutesOf(b.start) || minutesOf(a.end) - minutesOf(b.end);
      });
      var withGaps = [];
      rows[band.id].forEach(function (row, rowIndex) {
        withGaps.push(row);
        var next = rows[band.id][rowIndex + 1];
        if (next && minutesOf(row.end) < minutesOf(next.start)) {
          withGaps.push({ gap: true, start: row.end, end: next.start, cells: {} });
        }
        Object.keys(row.cells).forEach(function (dow) {
          row.cells[dow].sort(function (a, b) { return a.name.localeCompare(b.name, 'vi'); });
        });
      });
      rows[band.id] = withGaps;
    });
    return { weekStart: start, weekEnd: addDays(start, 6), rows: rows, now: now };
  }

  function weekStats(classes, weekStart, now, filter, office) {
    var filtered = (classes || []).filter(function (cls) { return passFilter(cls, filter); });
    var current = filtered.filter(function (cls) { return !cls.completed; });
    var grid = buildSchedule(filtered, weekStart, now, filter, office);
    var sessions = 0;
    var minutes = 0;
    BANDS.forEach(function (band) {
      (grid.rows[band.id] || []).forEach(function (row) {
        if (row.gap) return;
        var dur = Math.max(0, minutesOf(row.end) - minutesOf(row.start));
        DAYS.forEach(function (day) {
          var list = (row.cells[day.dow] || []).filter(function (chip) { return !chip.soa; });
          sessions += list.length;
          minutes += dur * list.length;
        });
      });
    });
    return { classCount: current.length, sessionCount: sessions, minutes: minutes, grid: grid };
  }

  function formatHours(minutes) {
    var rounded = Math.round((minutes / 60) * 10) / 10;
    return String(rounded).replace('.', ',') + ' giờ';
  }

  function isoDay(date) {
    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
  }

  function monthRange(key) {
    var parts = String(key || '').split('-');
    var start = new Date(Number(parts[0]), Number(parts[1]) - 1, 1);
    var end = new Date(Number(parts[0]), Number(parts[1]), 1);
    return { start: start, end: end };
  }

  function scheduleText(cls) {
    var slots = (cls.schedule || []).slice().sort(function (a, b) {
      return DAYS.findIndex(function (day) { return day.dow === a.dow; }) - DAYS.findIndex(function (day) { return day.dow === b.dow; });
    });
    if (!slots.length) return 'Chưa có lịch học';
    return slots.map(function (slot) {
      var day = DAYS.filter(function (item) { return item.dow === slot.dow; })[0];
      return (day ? day.short : '') + ' ' + formatTimeValue(slot.start) + '–' + formatTimeValue(slot.end);
    }).join(', ');
  }

  function monthSessions(cls, key) {
    var range = monthRange(key);
    var bornFrom = cls.levelHistory && cls.levelHistory[0] ? cls.levelHistory[0].from : cls.cycleStart;
    var born = new Date(bornFrom);
    var doneAt = cls.completedAt ? new Date(cls.completedAt) : null;
    var skipped = sessionSkipMap(cls);
    var sessions = [];
    var seen = {};
    function pushSes(ses) {
      if (!ses || seen[ses.key]) return;
      if (ses.date.getTime() < range.start.getTime() || ses.date.getTime() >= range.end.getTime()) return;
      if (ses.endDate.getTime() <= born.getTime()) return;
      if (doneAt && ses.date.getTime() > doneAt.getTime()) return;
      seen[ses.key] = true;
      sessions.push(ses);
    }
    for (var day = new Date(range.start.getTime()); day < range.end; day = addDays(day, 1)) {
      var dow = day.getDay();
      slotsOn(cls, day).forEach(function (slot) {
        if (Number(slot.dow) !== dow) return;
        var ses = occurrenceAt(day, slot);
        if (skipped[ses.key]) return;
        pushSes(ses);
      });
    }
    (cls.sessionChanges || []).forEach(function (change) {
      if (change.action === 'custom') pushSes(customOccurrence(change));
    });
    sessions.sort(function (a, b) { return a.date - b.date; });
    return sessions;
  }

  function findClassById(classes, id) {
    for (var i = 0; i < classes.length; i++) if (classes[i].id === id) return classes[i];
    return null;
  }

  function findClassByName(classes, name) {
    if (!name) return null;
    for (var i = 0; i < classes.length; i++) {
      var cls = classes[i];
      if (currentName(cls) === name) return cls;
      var hist = cls.levelHistory || [];
      for (var h = 0; h < hist.length; h++) if (hist[h].name === name) return cls;
    }
    return null;
  }

  function locateStudent(stu, classes) {
    for (var i = 0; i < classes.length; i++) {
      var list = classes[i].students || [];
      for (var s = 0; s < list.length; s++) if (list[s].id === stu.id) return classes[i];
    }
    return null;
  }

  function classLabelAt(cls, instant) {
    if (!cls) return '';
    var level = levelAt(cls, instant);
    return level && level.name ? level.name : currentName(cls);
  }

  function studentSpans(stu, classes) {
    var current = locateStudent(stu, classes);
    var transfers = (stu.transfers || []).slice().filter(function (item) { return item && item.at; });
    transfers.sort(function (a, b) { return new Date(a.at) - new Date(b.at); });
    var originId = stu.originClassId || '';
    if (!originId && transfers.length) originId = transfers[0].fromId || '';
    if (!originId && transfers.length) {
      var named = findClassByName(classes, transfers[0].fromName);
      if (named) originId = named.id;
    }
    if (!originId && current) originId = current.id;
    var originAt = stu.joinedAt || '';
    if (!originAt && originId) {
      var originCls = findClassById(classes, originId);
      if (originCls && originCls.levelHistory && originCls.levelHistory[0]) originAt = originCls.levelHistory[0].from;
    }
    if (!originAt && current && current.levelHistory && current.levelHistory[0]) originAt = current.levelHistory[0].from;
    if (!originAt) originAt = '1970-01-01T00:00:00.000Z';
    var spans = [];
    var classId = originId;
    var from = originAt;
    transfers.forEach(function (tr) {
      var fromId = tr.fromId || classId;
      if (!fromId) {
        var fromCls = findClassByName(classes, tr.fromName);
        if (fromCls) fromId = fromCls.id;
      }
      var toId = tr.toId || '';
      if (!toId) {
        var toCls = findClassByName(classes, tr.toName);
        if (toCls) toId = toCls.id;
      }
      spans.push({
        classId: fromId || '',
        from: from,
        to: tr.at,
        toClassId: toId,
        toName: tr.toName || '',
        fromName: tr.fromName || ''
      });
      classId = toId || '';
      from = tr.at;
    });
    if (current && classId !== current.id) classId = current.id;
    spans.push({ classId: classId || '', from: from, to: null, toClassId: '', toName: '', fromName: '' });
    return spans;
  }

  function placementAt(spans, classId, instant, classes) {
    var t = instant.getTime();
    var covering = null;
    for (var i = 0; i < spans.length; i++) {
      var from = new Date(spans[i].from).getTime();
      var to = spans[i].to ? new Date(spans[i].to).getTime() : Infinity;
      if (t >= from && t < to) { covering = spans[i]; break; }
    }
    if (covering && covering.classId === classId) return { mode: 'here' };
    var member = false;
    var left = null;
    for (var j = 0; j < spans.length; j++) {
      if (spans[j].classId !== classId) continue;
      member = true;
      if (!spans[j].to) continue;
      var ended = new Date(spans[j].to).getTime();
      if (t >= ended && (!left || ended >= new Date(left.to).getTime())) left = spans[j];
    }
    if (!member) return { mode: 'hidden' };
    if (left) {
      var destId = covering && covering.classId ? covering.classId : (left.toClassId || '');
      var destName = left.toName || '';
      if (destId) {
        var dest = findClassById(classes, destId);
        if (dest) destName = classLabelAt(dest, instant) || destName;
      }
      return { mode: 'out', classId: destId, className: destName || 'lớp khác' };
    }
    if (covering && covering.classId && covering.classId !== classId) {
      var src = findClassById(classes, covering.classId);
      return { mode: 'in-from', classId: covering.classId, className: src ? (classLabelAt(src, instant) || 'lớp khác') : 'lớp khác' };
    }
    return { mode: 'before' };
  }

  var HW_STATUS = {
    done: { label: 'DONE', score: 1 },
    none: { label: 'NONE', score: 0 },
    miss: { label: 'MISS', score: 0.5 },
    absent: { label: 'ABSENT', score: 0 },
    applied: { label: 'APPLIED', score: 1 }
  };

  function levelsInMonth(cls, key) {
    var range = monthRange(key);
    var start = range.start.getTime();
    var end = range.end.getTime();
    return (cls.levelHistory || []).filter(function (level) {
      var from = new Date(level.from).getTime();
      var to = level.to ? new Date(level.to).getTime() : Infinity;
      return from < end && to > start;
    });
  }

  function homeworkLevel(cls, key) {
    var levels = levelsInMonth(cls, key);
    if (!levels.length) return currentLevel(cls);
    if (cls.kind === 'addon') return levels[levels.length - 1];
    return levels[0];
  }

  function percentNumber(rate) {
    if (rate === null || rate === undefined) return null;
    return Math.round(rate * 100);
  }

  function attendanceUnavailable(stu) {
    return !!(stu && (stu.status === 'stopped' || stu.expireKind === 'stop'));
  }

  function curriculumName(grade) {
    var item = grade && grade.id ? grade : gradeById(grade);
    if (!item) return '?';
    if (item.id === 'pre-kindy-a') return 'Little Learning Star A';
    if (item.id === 'pre-kindy-b') return 'Little Learning Star B';
    if (item.track === 'KINDY' && item.form === 'std') return 'Disney ' + item.code;
    if (item.id === 'pre-kids-a') return 'English Code starter A';
    if (item.id === 'pre-kids-b') return 'English Code starter B';
    if (item.track === 'KIDS' && item.form === 'std') return 'English Code ' + item.code;
    if (item.id === 'teens-1a') return 'Focus 1';
    if (item.id === 'teens-1b') return 'Focus 2';
    if (item.id === 'teens-2a') return 'Focus 3';
    if (item.id === 'teens-2b') return 'Focus 4';
    if (item.id === 'pre-ielts') return 'Focus on IELTS';
    return '?';
  }

  var BOOK_STATUS = [
    { id: 'not-bought', label: 'Chưa mua' },
    { id: 'issued-paid', label: 'Đã phát và đóng' },
    { id: 'issued-unpaid', label: 'Đã phát-Chưa thanh toán' }
  ];

  function levelKey(level) {
    if (!level) return '';
    return String(level.gradeId || '') + '|' + String(level.from || '');
  }

  function normalizeBook(bag) {
    var status = bag && bag.bookStatus;
    if (status !== 'issued-paid' && status !== 'issued-unpaid') status = 'not-bought';
    var self = !!(bag && bag.pecMode === 'self');
    return {
      bookStatus: status,
      pecMode: self ? 'self' : '',
      pecUser: self ? '' : String((bag && bag.pecUser) || ''),
      pecPass: self ? '' : String((bag && bag.pecPass) || '')
    };
  }

  function bookOf(stu, level) {
    var key = levelKey(level);
    var bag = stu && stu.curriculum && key ? stu.curriculum[key] : null;
    if (!bag && stu && level && !level.to) {
      bag = { bookStatus: stu.bookStatus, pecMode: stu.pecMode, pecUser: stu.pecUser, pecPass: stu.pecPass };
    }
    return normalizeBook(bag || {});
  }

  function bookBought(rec) {
    return !!(rec && (rec.bookStatus === 'issued-paid' || rec.bookStatus === 'issued-unpaid'));
  }

  function pecReady(rec) {
    if (!rec) return false;
    if (rec.pecMode === 'self') return true;
    return !!(String(rec.pecUser || '').trim() && String(rec.pecPass || '').trim());
  }

  function homeworkGroups(students) {
    function names(test) {
      return students.filter(test).map(function (stu) { return stu.name; });
    }
    function pct(stu) { return percentNumber(stu.rate); }
    return {
      perfect: names(function (stu) { return pct(stu) === 100; }),
      high: names(function (stu) { var value = pct(stu); return value !== null && value > 90; }),
      mid: names(function (stu) { var value = pct(stu); return value !== null && value >= 40 && value <= 80; }),
      below: names(function (stu) { var value = pct(stu); return value !== null && value < 40; })
    };
  }

  function homeworkRate(cells) {
    var sum = 0;
    var count = 0;
    cells.forEach(function (cell) {
      if (cell.mode !== 'here') return;
      count += 1;
      var spec = HW_STATUS[cell.status];
      sum += spec ? spec.score : 0;
    });
    if (!count) return null;
    return sum / count;
  }

  function homeworkBoard(cls, classes, key) {
    var range = monthRange(key);
    var sessions = monthSessions(cls, key);
    var students = [];
    (classes || []).forEach(function (host) {
      (host.students || []).forEach(function (stu) {
        var spans = studentSpans(stu, classes);
        var seen = false;
        for (var i = 0; i < spans.length; i++) {
          if (spans[i].classId !== cls.id) continue;
          var from = new Date(spans[i].from).getTime();
          var to = spans[i].to ? new Date(spans[i].to).getTime() : Infinity;
          if (from < range.end.getTime() && to > range.start.getTime()) seen = true;
        }
        if (!seen) return;
        var marks = stu.homework || {};
        var cells = sessions.map(function (session) {
          var place = placementAt(spans, cls.id, session.date, classes);
          var marked = marks[session.key] || marks[session.iso] || '';
          var past = session.endDate.getTime() <= Date.now();
          var mode = place.mode === 'before' && marked ? 'here' : place.mode;
          return {
            iso: session.iso,
            key: session.key,
            mode: mode,
            status: mode === 'here' ? marked : '',
            classId: place.classId || '',
            className: place.className || '',
            past: past,
            canBackfill: place.mode === 'before' && past
          };
        });
        var unavailable = attendanceUnavailable(stu);
        students.push({
          id: stu.id,
          name: stu.name,
          englishName: stu.englishName || '',
          stopped: stu.status === 'stopped',
          unavailable: unavailable,
          rate: unavailable ? null : homeworkRate(cells),
          cells: cells
        });
      });
    });
    students.sort(function (a, b) {
      if (!!a.unavailable !== !!b.unavailable) return a.unavailable ? 1 : -1;
      return a.name.localeCompare(b.name, 'vi');
    });
    return {
      sessions: sessions,
      students: students,
      groups: homeworkGroups(students.filter(function (stu) { return !stu.unavailable; }))
    };
  }

  function archiveKeepsCode(stu) {
    if (!stu) return false;
    var reason = String(stu.reason || '');
    return reason !== 'Xóa khỏi lớp' && reason !== 'Xóa lớp';
  }

  function nextStudentCode(classes, archive) {
    var max = 0;
    function note(code) {
      var m = /^HV(\d+)$/.exec(code || '');
      if (m) max = Math.max(max, Number(m[1]));
    }
    (classes || []).forEach(function (cls) {
      (cls.students || []).forEach(function (stu) { note(stu.code); });
    });
    (archive || []).forEach(function (stu) {
      if (archiveKeepsCode(stu)) note(stu && stu.code);
    });
    return 'HV' + String(max + 1).padStart(4, '0');
  }

  function codeTaken(classes, code, exceptId, archive) {
    var text = String(code || '').trim();
    if (!text || text === '-' || text === '?') return false;
    var found = false;
    (classes || []).forEach(function (cls) {
      (cls.students || []).forEach(function (stu) {
        if (stu.id !== exceptId && stu.code === code) found = true;
      });
    });
    (archive || []).forEach(function (stu) {
      if (stu && archiveKeepsCode(stu) && stu.id !== exceptId && stu.code === code) found = true;
    });
    return found;
  }

  var STUDENT_COLUMNS = [
    { key: 'code', label: 'Mã học viên' },
    { key: 'name', label: 'Tên học viên' },
    { key: 'englishName', label: 'English name' },
    { key: 'gender', label: 'Giới tính' },
    { key: 'dob', label: 'Ngày sinh' },
    { key: 'phone', label: 'Số điện thoại' },
    { key: 'ec', label: 'First EC' }
  ];

  function excelSerialToISO(serial) {
    var whole = Math.floor(Number(serial) + 1e-6);
    if (!isFinite(whole) || whole < 1) return '';
    var d = new Date(Date.UTC(1899, 11, 30) + whole * 86400000);
    if (isNaN(d.getTime())) return '';
    return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate());
  }

  function checkedISO(iso) {
    var date = parseDateInput(iso);
    if (!date) return '';
    var parts = iso.split('-');
    if (date.getFullYear() !== Number(parts[0]) || date.getMonth() + 1 !== Number(parts[1]) || date.getDate() !== Number(parts[2])) return '';
    return iso;
  }

  function parseImportDate(value) {
    if (value instanceof Date && !isNaN(value.getTime())) {
      return checkedISO(value.getFullYear() + '-' + pad(value.getMonth() + 1) + '-' + pad(value.getDate()));
    }
    if (typeof value === 'number') return excelSerialToISO(value);
    var text = String(value == null ? '' : value).trim();
    if (!text) return '';
    var iso = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(text);
    if (iso) return checkedISO(iso[1] + '-' + pad(Number(iso[2])) + '-' + pad(Number(iso[3])));
    var dmy = /^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{2,4})$/.exec(text);
    if (!dmy) return '';
    var year = Number(dmy[3]);
    if (year < 100) year += year >= 50 ? 1900 : 2000;
    return checkedISO(year + '-' + pad(Number(dmy[2])) + '-' + pad(Number(dmy[1])));
  }

  function normalizeGender(value) {
    var s = String(value == null ? '' : value).trim().toLowerCase();
    if (!s) return 'Nam';
    if (s === 'nam' || s === 'male' || s === 'm') return 'Nam';
    if (s === 'nữ' || s === 'nu' || s === 'female' || s === 'f') return 'Nữ';
    if (s === 'khác' || s === 'khac' || s === 'other') return 'Khác';
    return '';
  }

  function phoneText(value) {
    if (typeof value === 'number' && isFinite(value)) {
      var digits = String(Math.round(value));
      if (digits.length === 9) return '0' + digits;
      return digits;
    }
    return String(value == null ? '' : value).trim();
  }

  function cellText(value) {
    if (value == null) return '';
    if (typeof value === 'number' && isFinite(value)) {
      if (Math.abs(value - Math.round(value)) < 1e-6) return String(Math.round(value));
      return String(value);
    }
    return String(value).trim();
  }

  function blankImportRow(row) {
    if (!row) return true;
    for (var i = 0; i < STUDENT_COLUMNS.length; i++) {
      if (cellText(row[i]) !== '') return false;
    }
    return true;
  }

  function nextFreeCode(classes, taken) {
    var max = 0;
    function note(code) {
      var m = /^HV(\d+)$/i.exec(code || '');
      if (m) max = Math.max(max, Number(m[1]));
    }
    classes.forEach(function (cls) {
      cls.students.forEach(function (stu) { note(stu.code); });
    });
    Object.keys(taken).forEach(note);
    var code = '';
    do {
      max += 1;
      code = 'HV' + String(max).padStart(4, '0');
    } while (taken[code]);
    return code;
  }

  function rowsToStudents(rows, classes, archive) {
    var students = [];
    var errors = [];
    var taken = {};
    var archivedCode = {};
    (classes || []).forEach(function (cls) {
      (cls.students || []).forEach(function (stu) {
        if (stu.code) taken[stu.code] = true;
      });
    });
    (archive || []).forEach(function (stu) {
      if (!stu || !archiveKeepsCode(stu) || !stu.code || taken[stu.code]) return;
      taken[stu.code] = true;
      archivedCode[stu.code] = true;
    });
    var list = rows || [];
    for (var r = 1; r < list.length; r++) {
      var row = list[r] || [];
      if (blankImportRow(row)) continue;
      var line = r + 1;
      var code = cellText(row[0]);
      var name = cellText(row[1]) || '?';
      var dob = parseImportDate(row[4]);
      var genderRaw = cellText(row[3]);
      var gender = genderRaw ? (normalizeGender(genderRaw) || '?') : '?';
      if (!code) code = nextFreeCode(classes || [], taken);
      if (taken[code]) {
        if (archivedCode[code]) errors.push('Hàng ' + line + ': trùng mã ' + code + '. Mã này nằm trong Học viên cũ/kết thúc. Dùng Thêm học viên để cho em vào lại lớp.');
        else errors.push('Hàng ' + line + ': trùng mã ' + code + '.');
        continue;
      }
      taken[code] = true;
      students.push({
        code: code,
        name: name,
        englishName: cellText(row[2]) || '?',
        gender: gender,
        dob: dob || '?',
        phone: phoneText(row[5]) || '?',
        ec: cellText(row[6]) || '?',
        enroll: 'official'
      });
    }
    return { students: students, errors: errors };
  }

  function isBlankValue(value) {
    var text = String(value == null ? '' : value).trim();
    return !text || text === '?' || text === '-';
  }

  function studentNameKey(value) {
    return String(value == null ? '' : value).trim().toLowerCase().replace(/\s+/g, ' ');
  }

  function usableNameKey(value) {
    var key = studentNameKey(value);
    if (!key || key === '?' || key === '-') return '';
    return key;
  }

  function importGender(value) {
    var raw = cellText(value);
    if (!raw || raw === '?' || raw === '-') return '';
    var gender = normalizeGender(raw);
    return gender === 'Nam' || gender === 'Nữ' || gender === 'Khác' ? gender : '';
  }

  function sheetFields(row) {
    var code = cellText(row[0]);
    if (code === '?' || code === '-') code = '';
    return {
      code: code,
      name: cellText(row[1]),
      englishName: cellText(row[2]),
      gender: importGender(row[3]),
      dob: parseImportDate(row[4]),
      phone: phoneText(row[5]),
      ec: cellText(row[6])
    };
  }

  function fillPatch(stu, fields, taken) {
    var patch = {};
    function put(key, value) {
      if (!isBlankValue(stu[key]) || isBlankValue(value)) return;
      patch[key] = value;
    }
    if (isBlankValue(stu.code) && fields.code) {
      if (taken[fields.code] && taken[fields.code] !== stu.id) patch.codeError = fields.code;
      else patch.code = fields.code;
    }
    put('englishName', fields.englishName);
    put('gender', fields.gender);
    put('dob', fields.dob);
    put('phone', fields.phone);
    put('ec', fields.ec);
    return patch;
  }

  function rowsToClassUpdate(cls, rows, classes, archive) {
    var students = [];
    var updates = [];
    var errors = [];
    var taken = {};
    var owners = {};
    (classes || []).forEach(function (host) {
      (host.students || []).forEach(function (stu) {
        if (stu && stu.code && stu.code !== '-' && stu.code !== '?') {
          taken[stu.code] = stu.id;
          owners[stu.code] = stu.id;
        }
      });
    });
    (archive || []).forEach(function (stu) {
      if (!stu || !archiveKeepsCode(stu)) return;
      if (!stu.code || stu.code === '-' || stu.code === '?') return;
      if (taken[stu.code]) return;
      taken[stu.code] = stu.id;
    });
    var byName = {};
    var patched = {};
    (cls.students || []).forEach(function (stu) {
      var key = usableNameKey(stu && stu.name);
      if (!key) return;
      if (!byName[key]) byName[key] = [];
      byName[key].push(stu);
      patched[stu.id] = {};
    });
    var claimed = {};
    var list = rows || [];
    for (var r = 1; r < list.length; r++) {
      var row = list[r] || [];
      if (blankImportRow(row)) continue;
      var line = r + 1;
      var fields = sheetFields(row);
      var name = fields.name || '?';
      var key = usableNameKey(name);
      var pool = key ? (byName[key] || []) : [];
      if (pool.length) {
        var target = null;
        var i;
        for (i = 0; i < pool.length; i++) {
          if (claimed[pool[i].id]) continue;
          var preview = fillPatch(Object.assign({}, pool[i], patched[pool[i].id]), fields, taken);
          if (Object.keys(preview).some(function (item) { return item !== 'codeError'; })) { target = pool[i]; break; }
        }
        if (!target) {
          for (i = 0; i < pool.length; i++) if (!claimed[pool[i].id]) { target = pool[i]; break; }
        }
        if (!target) {
          for (i = 0; i < pool.length; i++) {
            var again = fillPatch(Object.assign({}, pool[i], patched[pool[i].id]), fields, taken);
            if (Object.keys(again).some(function (item) { return item !== 'codeError'; })) { target = pool[i]; break; }
          }
        }
        if (!target) {
          errors.push('Hàng ' + line + ': trùng tên ' + name + ', không còn thông tin thiếu.');
          continue;
        }
        claimed[target.id] = true;
        var current = Object.assign({}, target, patched[target.id]);
        var patch = fillPatch(current, fields, taken);
        if (patch.codeError) {
          errors.push('Hàng ' + line + ': trùng mã ' + patch.codeError + ', không ghi vào học viên đang có.');
          delete patch.codeError;
        }
        if (patch.code) {
          taken[patch.code] = target.id;
          owners[patch.code] = target.id;
        }
        Object.keys(patch).forEach(function (item) { patched[target.id][item] = patch[item]; });
        continue;
      }
      var code = fields.code;
      if (!code) code = nextFreeCode(classes || [], taken);
      if (taken[code]) {
        if (owners[code]) errors.push('Hàng ' + line + ': trùng mã ' + code + '.');
        else errors.push('Hàng ' + line + ': trùng mã ' + code + '. Mã này nằm trong Học viên cũ/kết thúc. Dùng Thêm học viên để cho em vào lại lớp.');
        continue;
      }
      taken[code] = 'new';
      students.push({
        code: code,
        name: name,
        englishName: fields.englishName || '?',
        gender: fields.gender || '?',
        dob: fields.dob || '?',
        phone: fields.phone || '?',
        ec: fields.ec || '?',
        enroll: 'official'
      });
    }
    Object.keys(patched).forEach(function (id) {
      var patch = patched[id];
      if (!Object.keys(patch).length) return;
      var stu = null;
      (cls.students || []).forEach(function (item) { if (item.id === id) stu = item; });
      updates.push({ id: id, name: stu ? stu.name : '', patch: patch });
    });
    return { students: students, updates: updates, errors: errors };
  }

  function attendanceSessions(cls) {
    var total = lessonTotal(cls.gradeId);
    var lessons = lessonSessions(cls, total);
    var bornFrom = cls.levelHistory && cls.levelHistory[0] ? cls.levelHistory[0].from : cls.cycleStart;
    var born = new Date(bornFrom);
    var skipped = sessionSkipMap(cls);
    var seen = {};
    var sessions = [];
    function pushSes(ses) {
      if (!ses || seen[ses.key]) return;
      if (isNaN(born.getTime()) || ses.endDate.getTime() <= born.getTime()) return;
      if (cls.completedAt && ses.date.getTime() > new Date(cls.completedAt).getTime()) return;
      seen[ses.key] = true;
      sessions.push(ses);
    }
    lessons.forEach(pushSes);
    var start = isNaN(born.getTime()) ? null : startOfDay(born);
    var last = lessons.length ? lessons[lessons.length - 1].date : (start ? addDays(start, 400) : null);
    if (start && last) {
      var end = addDays(startOfDay(last), 1);
      for (var day = new Date(start.getTime()); day < end; day = addDays(day, 1)) {
        var dow = day.getDay();
        slotsOn(cls, day).forEach(function (slot) {
          if (Number(slot.dow) !== dow) return;
          var ses = occurrenceAt(day, slot);
          if (skipped[ses.key]) return;
          pushSes(ses);
        });
      }
    }
    (cls.sessionChanges || []).forEach(function (change) {
      if (change.action === 'custom') pushSes(customOccurrence(change));
    });
    sessions.sort(function (a, b) { return a.date - b.date; });
    return sessions;
  }

  function studentsOnClass(cls, classes) {
    var list = [];
    var seen = {};
    function add(stu) {
      if (!stu || seen[stu.id]) return;
      seen[stu.id] = true;
      list.push(stu);
    }
    (cls.students || []).forEach(add);
    (classes || []).forEach(function (host) {
      (host.students || []).forEach(function (stu) {
        if (seen[stu.id]) return;
        var spans = studentSpans(stu, classes);
        for (var i = 0; i < spans.length; i++) {
          if (spans[i].classId === cls.id) { add(stu); return; }
        }
      });
    });
    return list;
  }

  function parseClockText(text) {
    var match = /(\d{1,2}):(\d{2})(?::\d{2})?\s*(A\.?M\.?|P\.?M\.?)?/i.exec(String(text || ''));
    if (!match) return '';
    var hour = Number(match[1]);
    var minute = Number(match[2]);
    var ap = String(match[3] || '').toUpperCase();
    if (hour > 23 || minute > 59) return '';
    if (ap.indexOf('P') === 0 && hour < 12) hour += 12;
    if (ap.indexOf('A') === 0 && hour === 12) hour = 0;
    if (hour > 23) return '';
    return pad(hour) + ':' + pad(minute);
  }

  function parseSheetWhen(value) {
    if (value instanceof Date && !isNaN(value.getTime())) {
      var iso = checkedISO(value.getFullYear() + '-' + pad(value.getMonth() + 1) + '-' + pad(value.getDate()));
      var start = pad(value.getHours()) + ':' + pad(value.getMinutes());
      return { iso: iso, start: start === '00:00' ? '' : start, label: iso };
    }
    if (typeof value === 'number' && isFinite(value)) {
      var whole = excelSerialToISO(value);
      var frac = value - Math.floor(value);
      var startNum = '';
      if (frac > 0.0005) {
        var mins = Math.round(frac * 1440) % 1440;
        startNum = pad(Math.floor(mins / 60)) + ':' + pad(mins % 60);
      }
      return { iso: whole, start: startNum, label: whole || String(value) };
    }
    var text = cellText(value);
    if (!text) return { iso: '', start: '', day: 0, month: 0, label: '' };
    var start = parseClockText(text);
    var dated = text.replace(/(\d{1,2}:\d{2}(?::\d{2})?\s*(?:A\.?M\.?|P\.?M\.?)?)/ig, ' ').trim();
    var iso = parseImportDate(dated) || parseImportDate(text);
    var day = 0;
    var month = 0;
    if (!iso) {
      var dmy = /(\d{1,2})[\/.\-](\d{1,2})(?:[\/.\-](\d{2,4}))?/.exec(text);
      if (dmy && dmy[3]) iso = parseImportDate(dmy[1] + '/' + dmy[2] + '/' + dmy[3]);
      else if (dmy) { day = Number(dmy[1]); month = Number(dmy[2]); }
    }
    return { iso: iso || '', start: start, day: day, month: month, label: text };
  }

  function parseHwCell(value) {
    var text = cellText(value).toUpperCase();
    if (!text || text === '—' || text === '-' || text === '·' || text === 'MOVED') return '';
    if (text === 'DONE') return 'done';
    if (text === 'NONE') return 'none';
    if (text === 'MISS') return 'miss';
    if (text === 'ABSENT') return 'absent';
    if (text === 'APPLIED') return 'applied';
    return null;
  }

  function headerRole(value) {
    var text = cellText(value).toLowerCase();
    if (!text) return 'empty';
    if (/english|tên tiếng|ten tieng/.test(text)) return 'english';
    if (/học viên|hoc vien|^tên$|^ten$|^name$|^họ tên|^ho ten/.test(text)) return 'name';
    if (/tỉ lệ|ti le|tỷ lệ|ty le|rate/.test(text)) return 'skip';
    if (text === 'stt') return 'skip';
    return 'date';
  }

  function matchSession(parsed, sessions) {
    var pool = sessions.slice();
    if (parsed.iso) pool = pool.filter(function (ses) { return ses.iso === parsed.iso; });
    else if (parsed.day && parsed.month) {
      pool = pool.filter(function (ses) {
        var parts = String(ses.iso || '').split('-');
        return Number(parts[2]) === parsed.day && Number(parts[1]) === parsed.month;
      });
    } else return null;
    if (parsed.start) {
      var timed = pool.filter(function (ses) { return ses.start === parsed.start; });
      if (timed.length) pool = timed;
    }
    if (!pool.length) return null;
    return pool[0];
  }

  function columnWhen(parsed, cls) {
    if (parsed.iso) return parseDateInput(parsed.iso);
    if (parsed.day && parsed.month) {
      var year = cls && cls.cycleStart ? new Date(cls.cycleStart).getFullYear() : 2026;
      if (!year || isNaN(year)) year = 2026;
      return new Date(year, parsed.month - 1, parsed.day);
    }
    return null;
  }

  function applyHomeworkSheet(cls, rows, classes) {
    var sessions = attendanceSessions(cls);
    var roster = studentsOnClass(cls, classes);
    var list = rows || [];
    var header = list[0] || [];
    var errors = [];
    var columns = [];
    var nameCol = -1;
    for (var c = 0; c < header.length; c++) {
      var role = headerRole(header[c]);
      if (role === 'name' && nameCol < 0) { nameCol = c; continue; }
      if (role === 'english' || role === 'skip' || role === 'empty') continue;
      var parsed = parseSheetWhen(header[c]);
      if (!parsed.iso && !(parsed.day && parsed.month) && !parsed.start) continue;
      columns.push({ index: c, parsed: parsed, label: parsed.label || ('Cột ' + (c + 1)), session: null, exact: false });
    }
    if (nameCol < 0) nameCol = 0;
    var reserved = {};
    columns.forEach(function (col) {
      var hit = matchSession(col.parsed, sessions);
      if (!hit) return;
      col.session = hit;
      col.exact = true;
      reserved[hit.key] = true;
    });
    var named = {};
    roster.forEach(function (stu) {
      var key = usableNameKey(stu.name);
      if (!key) return;
      if (!named[key]) named[key] = [];
      named[key].push(stu);
    });
    function columnWrites(col) {
      var writes = [];
      for (var i = 1; i < list.length; i++) {
        var who = cellText((list[i] || [])[nameCol]);
        if (!who || /^(100%|trên 90%|40% đến|dưới 40%)/i.test(who)) continue;
        var status = parseHwCell((list[i] || [])[col.index]);
        if (!status) continue;
        var nameKey = usableNameKey(who);
        var pool = named[nameKey] || [];
        if (pool.length && pool.every(attendanceUnavailable)) continue;
        writes.push({ name: nameKey, status: status });
      }
      return writes;
    }
    function accepts(ses, writes) {
      var have = {};
      roster.forEach(function (stu) {
        var marks = stu.homework || {};
        var mark = marks[ses.key] || (!marks[ses.key] && marks[ses.iso]) || '';
        if (mark) have[stu.id] = mark;
      });
      if (!Object.keys(have).length) return true;
      var used = {};
      var adds = false;
      var conflict = false;
      writes.forEach(function (item) {
        var pool = named[item.name] || [];
        var stu = null;
        var n;
        for (n = 0; n < pool.length; n++) {
          if (used[pool[n].id] || attendanceUnavailable(pool[n])) continue;
          stu = pool[n];
          break;
        }
        if (!stu && pool.length) {
          for (n = pool.length - 1; n >= 0; n--) {
            if (used[pool[n].id] || attendanceUnavailable(pool[n])) continue;
            stu = pool[n];
            break;
          }
        }
        if (!stu) return;
        used[stu.id] = true;
        var mark = have[stu.id] || '';
        if (!mark) adds = true;
        else if (mark !== item.status) conflict = true;
      });
      return !adds && !conflict;
    }
    columns.forEach(function (col) {
      if (col.session) return;
      var when = columnWhen(col.parsed, cls);
      if (!when) {
        errors.push('Cột ' + col.label + ' không đọc được ngày.');
        return;
      }
      var writes = columnWrites(col);
      if (!writes.length) return;
      var best = null;
      var bestDist = Infinity;
      var bestAfter = 2;
      sessions.forEach(function (ses) {
        if (reserved[ses.key] || !accepts(ses, writes)) return;
        var dist = Math.abs(ses.date.getTime() - when.getTime());
        var after = ses.date.getTime() >= when.getTime() ? 0 : 1;
        if (dist < bestDist || (dist === bestDist && after < bestAfter)) {
          best = ses;
          bestDist = dist;
          bestAfter = after;
        }
      });
      if (!best) errors.push('Cột ' + col.label + ' không khớp buổi nào còn trống.');
      else {
        col.session = best;
        col.exact = false;
        reserved[best.key] = true;
      }
    });
    var byName = {};
    roster.forEach(function (stu) {
      var key = usableNameKey(stu.name);
      if (!key) return;
      if (!byName[key]) byName[key] = [];
      byName[key].push(stu);
    });
    var claimed = {};
    var written = 0;
    var matched = 0;
    for (var r = 1; r < list.length; r++) {
      var row = list[r] || [];
      var name = cellText(row[nameCol]);
      if (!name) continue;
      if (/^(100%|trên 90%|40% đến|dưới 40%)/i.test(name)) continue;
      var line = r + 1;
      var key = usableNameKey(name);
      var pool = key ? (byName[key] || []) : [];
      var stu = null;
      var i;
      for (i = 0; i < pool.length; i++) {
        if (claimed[pool[i].id] || attendanceUnavailable(pool[i])) continue;
        stu = pool[i];
        break;
      }
      if (!stu && pool.length) {
        for (i = pool.length - 1; i >= 0; i--) {
          if (!attendanceUnavailable(pool[i])) { stu = pool[i]; break; }
        }
      }
      if (!stu && pool.length) {
        for (i = 0; i < pool.length; i++) if (!claimed[pool[i].id]) { stu = pool[i]; break; }
        if (!stu) stu = pool[pool.length - 1];
        if (stu && attendanceUnavailable(stu)) {
          claimed[stu.id] = true;
          matched += 1;
          errors.push('Hàng ' + line + ': ' + name + ' đã dừng học, không ghi chuyên cần.');
          continue;
        }
      }
      if (!stu) {
        errors.push('Hàng ' + line + ': không thấy học viên ' + name + ' trong lớp.');
        continue;
      }
      claimed[stu.id] = true;
      matched += 1;
      if (!stu.homework || typeof stu.homework !== 'object') stu.homework = {};
      columns.forEach(function (col) {
        var status = parseHwCell(row[col.index]);
        if (status === null) {
          errors.push('Hàng ' + line + ', cột ' + col.label + ': không rõ trạng thái ' + cellText(row[col.index]) + '.');
          return;
        }
        if (!status || !col.session) return;
        stu.homework[col.session.key] = status;
        written += 1;
      });
    }
    return {
      written: written,
      matched: matched,
      errors: errors,
      placements: columns.filter(function (col) { return col.session; }).map(function (col) {
        return {
          label: col.label,
          exact: col.exact,
          iso: col.session.iso,
          start: col.session.start,
          key: col.session.key
        };
      })
    };
  }

  var CRC_TABLE = (function () {
    var table = new Uint32Array(256);
    for (var n = 0; n < 256; n++) {
      var c = n;
      for (var k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      table[n] = c >>> 0;
    }
    return table;
  })();

  function crc32(bytes) {
    var c = 0xffffffff;
    for (var i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 255] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  }

  function xmlEsc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function colLetter(index) {
    var name = '';
    var n = index + 1;
    while (n > 0) {
      var rem = (n - 1) % 26;
      name = String.fromCharCode(65 + rem) + name;
      n = Math.floor((n - 1) / 26);
    }
    return name;
  }

  function utf8(value) {
    if (typeof TextEncoder !== 'undefined') return new TextEncoder().encode(value);
    var encoded = unescape(encodeURIComponent(value));
    var bytes = new Uint8Array(encoded.length);
    for (var i = 0; i < encoded.length; i++) bytes[i] = encoded.charCodeAt(i);
    return bytes;
  }

  function zipStore(files) {
    var locals = [];
    var central = [];
    var offset = 0;
    files.forEach(function (file) {
      var nameBytes = utf8(file.name);
      var crc = crc32(file.data);
      var local = new Uint8Array(30 + nameBytes.length);
      var view = new DataView(local.buffer);
      view.setUint32(0, 0x04034b50, true);
      view.setUint16(4, 20, true);
      view.setUint16(8, 0, true);
      view.setUint32(14, crc, true);
      view.setUint32(18, file.data.length, true);
      view.setUint32(22, file.data.length, true);
      view.setUint16(26, nameBytes.length, true);
      local.set(nameBytes, 30);
      locals.push(local, file.data);
      var cen = new Uint8Array(46 + nameBytes.length);
      var cenView = new DataView(cen.buffer);
      cenView.setUint32(0, 0x02014b50, true);
      cenView.setUint16(4, 20, true);
      cenView.setUint16(6, 20, true);
      cenView.setUint32(16, crc, true);
      cenView.setUint32(20, file.data.length, true);
      cenView.setUint32(24, file.data.length, true);
      cenView.setUint16(28, nameBytes.length, true);
      cenView.setUint32(42, offset, true);
      cen.set(nameBytes, 46);
      central.push(cen);
      offset += local.length + file.data.length;
    });
    var centralSize = 0;
    central.forEach(function (part) { centralSize += part.length; });
    var end = new Uint8Array(22);
    var endView = new DataView(end.buffer);
    endView.setUint32(0, 0x06054b50, true);
    endView.setUint16(8, files.length, true);
    endView.setUint16(10, files.length, true);
    endView.setUint32(12, centralSize, true);
    endView.setUint32(16, offset, true);
    var parts = locals.concat(central, [end]);
    var total = 0;
    parts.forEach(function (part) { total += part.length; });
    var out = new Uint8Array(total);
    var pos = 0;
    parts.forEach(function (part) { out.set(part, pos); pos += part.length; });
    return out;
  }

  function sheetXml(spec) {
    var cols = Math.max(1, (spec.headers || []).length);
    var rows = [{ type: 'title', cells: [spec.title || ''] }];
    (spec.meta || []).forEach(function (line) { rows.push({ type: 'meta', cells: [line] }); });
    rows.push({ type: 'blank', cells: [''] });
    rows.push({ type: 'header', cells: spec.headers || [] });
    (spec.rows || []).forEach(function (row) {
      var cells = (row.cells || []).slice();
      while (cells.length < cols) cells.push('');
      var type = row.kind === 'band' ? 'band' : (row.kind === 'gap' ? 'gap' : 'data');
      rows.push({ type: type, cells: cells });
    });
    var styleOf = { title: 1, meta: 2, blank: 0, header: 3, data: 4, band: 5, gap: 6 };
    var widths = [];
    for (var c = 0; c < cols; c++) widths.push(10);
    rows.forEach(function (row) {
      for (var i = 0; i < cols; i++) {
        String(row.cells[i] == null ? '' : row.cells[i]).split('\n').forEach(function (line) {
          widths[i] = Math.max(widths[i], Math.min(42, line.length + 2));
        });
      }
    });
    var merges = [];
    var body = rows.map(function (row, index) {
      var lineCount = 1;
      row.cells.forEach(function (cell) {
        lineCount = Math.max(lineCount, String(cell == null ? '' : cell).split('\n').length);
      });
      var height = row.type === 'title' ? 24 : 18 + (lineCount - 1) * 15;
      var style = styleOf[row.type];
      var span = row.type === 'title' || row.type === 'meta' || row.type === 'blank' || row.type === 'band' || row.type === 'gap';
      if (span && cols > 1) merges.push(colLetter(0) + (index + 1) + ':' + colLetter(cols - 1) + (index + 1));
      var cells = '';
      var limit = span ? cols : Math.max(cols, row.cells.length);
      for (var i = 0; i < limit; i++) {
        var text = xmlEsc(row.cells[i] == null ? '' : row.cells[i]).replace(/\n/g, '&#10;');
        cells += '<c r="' + colLetter(i) + (index + 1) + '" s="' + style + '" t="inlineStr"><is><t xml:space="preserve">' + text + '</t></is></c>';
      }
      return '<row r="' + (index + 1) + '" ht="' + height + '" customHeight="1">' + cells + '</row>';
    }).join('');
    var colXml = widths.map(function (width, index) {
      return '<col min="' + (index + 1) + '" max="' + (index + 1) + '" width="' + width + '" customWidth="1"/>';
    }).join('');
    var mergeXml = merges.length
      ? '<mergeCells count="' + merges.length + '">' + merges.map(function (ref) { return '<mergeCell ref="' + ref + '"/>'; }).join('') + '</mergeCells>'
      : '';
    var last = colLetter(cols - 1) + rows.length;
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
      '<dimension ref="A1:' + last + '"/>' +
      '<sheetViews><sheetView workbookViewId="0"/></sheetViews>' +
      '<sheetFormatPr defaultRowHeight="18"/>' +
      '<cols>' + colXml + '</cols>' +
      '<sheetData>' + body + '</sheetData>' +
      mergeXml +
      '</worksheet>';
  }

  function stylesXml() {
    return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
      '<fonts count="4">' +
      '<font><sz val="11"/><name val="Calibri"/></font>' +
      '<font><b/><sz val="16"/><color rgb="FF0C4A72"/><name val="Calibri"/></font>' +
      '<font><b/><sz val="11"/><color rgb="FF0C4A72"/><name val="Calibri"/></font>' +
      '<font><b/><sz val="11"/><color rgb="FFF5FBFF"/><name val="Calibri"/></font>' +
      '</fonts>' +
      '<fills count="6">' +
      '<fill><patternFill patternType="none"/></fill>' +
      '<fill><patternFill patternType="gray125"/></fill>' +
      '<fill><patternFill patternType="solid"><fgColor rgb="FFD7EEFC"/><bgColor rgb="FFD7EEFC"/></patternFill></fill>' +
      '<fill><patternFill patternType="solid"><fgColor rgb="FF0C4A72"/><bgColor rgb="FF0C4A72"/></patternFill></fill>' +
      '<fill><patternFill patternType="solid"><fgColor rgb="FFE7F3FB"/><bgColor rgb="FFE7F3FB"/></patternFill></fill>' +
      '<fill><patternFill patternType="solid"><fgColor rgb="FFFFFFFF"/><bgColor rgb="FFFFFFFF"/></patternFill></fill>' +
      '</fills>' +
      '<borders count="2">' +
      '<border><left/><right/><top/><bottom/><diagonal/></border>' +
      '<border>' +
      '<left style="thin"><color rgb="FF0C4A72"/></left>' +
      '<right style="thin"><color rgb="FF0C4A72"/></right>' +
      '<top style="thin"><color rgb="FF0C4A72"/></top>' +
      '<bottom style="thin"><color rgb="FF0C4A72"/></bottom>' +
      '<diagonal/>' +
      '</border>' +
      '</borders>' +
      '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>' +
      '<cellXfs count="7">' +
      '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>' +
      '<xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1" applyAlignment="1"><alignment horizontal="center" vertical="center"/></xf>' +
      '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>' +
      '<xf numFmtId="0" fontId="2" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>' +
      '<xf numFmtId="0" fontId="0" fillId="5" borderId="1" xfId="0" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>' +
      '<xf numFmtId="0" fontId="3" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>' +
      '<xf numFmtId="0" fontId="2" fillId="4" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>' +
      '</cellXfs>' +
      '</styleSheet>';
  }

  function buildStyledXlsx(spec, sheetName) {
    var safeName = String(sheetName || 'Ocean EDU').replace(/[\\/?*[\]:]/g, ' ').slice(0, 31) || 'Ocean EDU';
    var files = [
      { name: '[Content_Types].xml', data: utf8('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
        '<Default Extension="xml" ContentType="application/xml"/>' +
        '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>' +
        '<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>' +
        '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>' +
        '</Types>') },
      { name: '_rels/.rels', data: utf8('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>' +
        '</Relationships>') },
      { name: 'xl/workbook.xml', data: utf8('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
        '<sheets><sheet name="' + xmlEsc(safeName) + '" sheetId="1" r:id="rId1"/></sheets></workbook>') },
      { name: 'xl/_rels/workbook.xml.rels', data: utf8('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>' +
        '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>' +
        '</Relationships>') },
      { name: 'xl/styles.xml', data: utf8(stylesXml()) },
      { name: 'xl/worksheets/sheet1.xml', data: utf8(sheetXml(spec)) }
    ];
    return zipStore(files);
  }

  var DAY_TOKEN = { MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6, SUN: 0 };

  function padTime(value) {
    var bits = String(value || '').split(':');
    if (bits.length < 2) return '';
    var h = Number(bits[0]);
    var m = Number(bits[1]);
    if (isNaN(h) || isNaN(m)) return '';
    return pad(h) + ':' + pad(m);
  }

  function parseScheduleText(text) {
    var slots = [];
    String(text || '').split(';').forEach(function (chunk) {
      var part = chunk.trim().replace(/^\/+/, '').trim();
      if (!part) return;
      var match = part.match(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);
      if (!match) return;
      var start = padTime(match[1]);
      var end = padTime(match[2]);
      var days = part.slice(0, match.index).replace(/\//g, ' ').trim();
      days.split(/\s+/).forEach(function (word) {
        var token = word.slice(0, 3).toUpperCase();
        if (!token || DAY_TOKEN[token] == null) return;
        slots.push({ dow: DAY_TOKEN[token], start: start, end: end });
      });
    });
    return slots;
  }

  function parseDMY(value) {
    var parts = String(value || '').split('/');
    if (parts.length < 3) return null;
    var d = Number(parts[0]);
    var m = Number(parts[1]);
    var y = Number(parts[2]);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d, 0, 0, 0, 0);
  }

  function folderDisplayName(row) {
    var grade = gradeById(row.gradeId);
    if (row.kind === 'custom') return customClassName(row.customName, grade, row.customLevel);
    return className(grade, row.number, row.homeTrack);
  }

  function catalogClass(row) {
    var start = parseDMY(row.start);
    var iso = start.toISOString();
    var grade = gradeById(row.gradeId);
    var custom = row.kind === 'custom';
    var number = custom ? 0 : row.number;
    var homeTrack = !custom && row.homeTrack === 'TEENS' ? 'TEENS' : '';
    var name = folderDisplayName(row);
    return {
      id: uid(),
      number: number,
      gradeId: row.gradeId || '',
      schedule: parseScheduleText(row.schedule),
      scheduleRevisions: [],
      fet: row.fet || '',
      cm: row.cm || '',
      ta: '',
      createdAt: iso,
      cycleStart: iso,
      kind: custom ? 'custom' : 'starter',
      customName: custom ? row.customName : '',
      customLevel: custom ? (row.customLevel || '') : '',
      homeTrack: homeTrack,
      endOpen: !!row.endOpen,
      sessionChanges: [],
      completed: false,
      completedAt: null,
      levelHistory: [{ gradeId: row.gradeId || '', number: number, from: iso, to: null, name: name }],
      students: []
    };
  }

  var EXTRA_FOLDERS = [
    { gradeId: 'pre-kindy-b', number: 10, schedule: 'Sat/Sun 14:00-16:00', start: '13/09/2026', fet: 'Jayvelyn Logatoc Faeldan', cm: '' },
    { gradeId: 'kindy-1a', number: 8, schedule: 'Thu/Sat 19:35-21:35', start: '03/09/2026', fet: 'Sheila Mae Wasawas Pañales', cm: 'Nguyễn Hoàng Lê Vũ' },
    { gradeId: 'kindy-2a', number: 6, schedule: 'Thu/Sun 17:30-19:30', start: '16/08/2026', fet: 'Sheila Mae Wasawas Pañales', cm: 'Mai Quang Đức' },
    { gradeId: 'kindy-2b', number: 11, schedule: 'Tue/Sun 17:30-19:30', start: '15/09/2026', fet: 'Jayvelyn Logatoc Faeldan', cm: 'Mai Quang Đức' },
    { gradeId: 'kindy-2b', number: 3, schedule: 'Sat/Sun 09:35-11:35', start: '26/09/2026', fet: 'Rica Lamera Gitamondoc', cm: 'Nguyễn Hoàng Lê Vũ' },
    { gradeId: 'kindy-2b', number: 9, schedule: 'Wed/Sat 17:30-19:30', start: '12/08/2026', fet: 'Jayvelyn Logatoc Faeldan', cm: 'Mai Quang Đức' },
    { gradeId: 'kindy-3a', number: 5, schedule: 'Mon/Sat 17:30-19:30', start: '25/07/2026', fet: 'Jonaleah Acero Figueroa', cm: 'Mai Quang Đức' },
    { gradeId: 'kindy-3b', number: 1, schedule: 'Tue/Fri 17:30-19:30', start: '13/10/2026', fet: 'Rica Lamera Gitamondoc', cm: 'Nguyễn Hoàng Lê Vũ' },
    { gradeId: 'pre-kids-a', number: 16, schedule: 'Mon19:35-21:35; /Sat09:35-11:35;', start: '20/07/2026', fet: 'Sheila Mae Wasawas Pañales', cm: 'Nguyễn Hoàng Lê Vũ' },
    { gradeId: 'pre-kids-a', number: 17, schedule: 'Tue19:35-21:35; /Sat09:35-11:35;', start: '21/07/2026', fet: 'Jayvelyn Logatoc Faeldan', cm: 'Mai Quang Đức' },
    { gradeId: 'pre-kids-a', number: 18, schedule: 'Mon/Fri 17:30-19:30', start: '31/07/2026', fet: 'Sheila Mae Wasawas Pañales', cm: 'Nguyễn Hoàng Lê Vũ' },
    { gradeId: 'kids-1a', number: 11, schedule: 'Mon/Sat 17:30-19:30', start: '22/08/2026', fet: 'Rica Lamera Gitamondoc', cm: '' },
    { gradeId: 'kids-1a', number: 13, schedule: 'Mon/Fri 17:30-19:30', start: '17/08/2026', fet: 'Jayvelyn Logatoc Faeldan', cm: 'Mai Quang Đức' },
    { gradeId: 'kids-2a', number: 7, schedule: 'Thu17:30-19:30; /Sat07:30-09:30;', start: '06/08/2026', fet: 'Jonaleah Acero Figueroa', cm: 'Mai Quang Đức' },
    { gradeId: 'kids-2b', number: 10, schedule: 'Sat/Sun 14:00-16:00', start: '01/08/2026', fet: 'Sheila Mae Wasawas Pañales', cm: 'Nguyễn Hoàng Lê Vũ' },
    { gradeId: 'kids-2b', number: 15, schedule: 'Wed19:35-21:35; /Sun09:35-11:35;', start: '12/08/2026', fet: 'Jayvelyn Logatoc Faeldan', cm: 'Mai Quang Đức' },
    { gradeId: 'kids-3a', number: 19, schedule: 'Sat/Sun 19:35-21:35', start: '22/08/2026', fet: 'Jayvelyn Logatoc Faeldan', cm: 'Mai Quang Đức' },
    { gradeId: 'kids-3a', number: 1, schedule: 'Wed/Sun 17:30-19:30', start: '22/07/2026', fet: 'Rica Lamera Gitamondoc', cm: '' },
    { gradeId: 'kids-4a', number: 3, schedule: 'Fri17:30-19:30; /Sun09:35-11:35;', start: '18/09/2026', fet: 'Jonaleah Acero Figueroa', cm: 'Mai Quang Đức' },
    { gradeId: 'kids-4a', number: 8, schedule: 'Wed19:35-21:35; /Sat07:30-09:30;', start: '22/07/2026', fet: 'Rica Lamera Gitamondoc', cm: '' },
    { gradeId: 'kids-4b', number: 14, schedule: 'Mon/Fri 19:35-21:35', start: '21/08/2026', fet: 'Jayvelyn Logatoc Faeldan', cm: 'Nguyễn Hoàng Lê Vũ' },
    { gradeId: 'kids-4b', number: 5, schedule: 'Mon/Fri 19:35-21:35', start: '31/08/2026', fet: 'Jonaleah Acero Figueroa', cm: 'Mai Quang Đức' },
    { gradeId: 'kids-4b', number: 9, schedule: 'Sat/Sun 14:00-16:00', start: '26/07/2026', fet: 'Jonaleah Acero Figueroa', cm: 'Mai Quang Đức' },
    { gradeId: 'kids-5a', number: 2, schedule: 'Tue/Sun 19:35-21:35', start: '02/08/2026', fet: 'Rica Lamera Gitamondoc', cm: 'Nguyễn Hoàng Lê Vũ' },
    { gradeId: 'kids-5b', number: 4, schedule: 'Tue/Sat 19:35-21:35', start: '21/07/2026', fet: 'Jonaleah Acero Figueroa', cm: 'Mai Quang Đức' },
    { gradeId: 'teens-1a', number: 4, schedule: 'Fri/Sun 19:35-21:35', start: '12/07/2026', fet: 'Sheila Mae Wasawas Pañales', cm: 'Nguyễn Hoàng Lê Vũ' },
    { gradeId: 'teens-1a', number: 5, schedule: 'Thu/Sun 19:35-21:35', start: '09/07/2026', fet: 'Jonaleah Acero Figueroa', cm: 'Mai Quang Đức' },
    { gradeId: 'teens-2a', number: 3, schedule: 'Tue/Sun 17:30-19:30', start: '21/06/2026', fet: 'Jonaleah Acero Figueroa', cm: 'Nguyễn Hoàng Lê Vũ' },
    { gradeId: 'teens-2a', number: 6, schedule: 'Mon/Sat 19:35-21:35', start: '12/09/2026', fet: 'Rica Lamera Gitamondoc', cm: 'Mai Quang Đức' },
    { gradeId: 'pre-ielts', number: 2, homeTrack: 'TEENS', schedule: 'Fri19:35-21:35; /Sun14:00-16:00;', start: '26/06/2026', fet: 'Rica Lamera Gitamondoc', cm: 'Mai Quang Đức', endOpen: true },
    { kind: 'custom', customName: 'GC01', gradeId: '', customLevel: 'GN', schedule: 'Thu/Sat 17:30-18:30', start: '21/05/2026', fet: 'Rica Lamera Gitamondoc,Sheila Mae Wasawas Pañales', cm: 'Mai Quang Đức', endOpen: true },
    { kind: 'custom', customName: 'VIP1', gradeId: 'teens-1b', schedule: 'Tue 09:00-10:00', start: '15/09/2026', fet: 'Jayvelyn Logatoc Faeldan', cm: 'Mai Quang Đức', endOpen: true },
    { kind: 'custom', customName: 'VIP5', gradeId: 'ielts-50', schedule: 'Tue16:30-17:30; /Sat15:00-17:00;', start: '26/09/2026', fet: 'Rica Lamera Gitamondoc', cm: 'Nguyễn Hoàng Lê Vũ', endOpen: true }
  ];

  function mergeExtraFolders(classes) {
    var list = Array.isArray(classes) ? classes.filter(function (cls) { return cls && typeof cls === 'object'; }) : [];
    var seen = {};
    function mark(value) {
      var key = nameKey(value);
      if (key) seen[key] = true;
    }
    list.forEach(function (cls) {
      mark(currentName(cls));
      (cls.levelHistory || []).forEach(function (level) { if (level) mark(level.name); });
      if (cls.kind !== 'custom') mark(className(gradeById(cls.gradeId), cls.number, cls.homeTrack));
    });
    var added = [];
    EXTRA_FOLDERS.forEach(function (row) {
      var display = folderDisplayName(row);
      if (!display || seen[nameKey(display)]) return;
      if (!parseDMY(row.start)) return;
      var created = catalogClass(row);
      if (!created.schedule.length) return;
      mark(display);
      added.push(created);
    });
    return { classes: list.concat(added), added: added.length };
  }

  function migrateTeensHome(classes) {
    var changed = 0;
    (classes || []).forEach(function (cls) {
      if (!cls) return;
      if (cls.homeTrack === 'TEENS' && cls.kind !== 'custom' && Number(cls.number) === 2 && cls.gradeId === 'pre-ielts') return;
      var key = nameKey(currentName(cls));
      var customHit = cls.kind === 'custom' && nameKey(cls.customName) === 'TEENS2' && cls.gradeId === 'pre-ielts';
      var nameHit = key === 'XHTEENS2PREIELTS' && cls.gradeId === 'pre-ielts';
      if (!customHit && !nameHit) return;
      cls.kind = cls.kind === 'addon' ? 'addon' : 'starter';
      cls.homeTrack = 'TEENS';
      cls.number = 2;
      cls.gradeId = 'pre-ielts';
      cls.customName = '';
      cls.customLevel = '';
      if (cls.endOpen !== false) cls.endOpen = true;
      var name = className(gradeById('pre-ielts'), 2, 'TEENS');
      if (!Array.isArray(cls.levelHistory) || !cls.levelHistory.length) {
        cls.levelHistory = [{ gradeId: 'pre-ielts', number: 2, from: cls.cycleStart || '', to: null, name: name }];
      } else {
        cls.levelHistory.forEach(function (level) {
          if (!level || level.to) return;
          level.gradeId = 'pre-ielts';
          level.number = 2;
          level.name = name;
        });
      }
      changed++;
    });
    return { classes: classes, changed: changed };
  }

  function dashText(value) {
    var text = String(value == null ? '' : value).replace(/\s+/g, ' ').trim();
    if (!text || text === '-' || text === '—') return '-';
    return text;
  }

  function headerKind(cell) {
    var s = String(cell || '').trim().toLowerCase().replace(/\s+/g, ' ');
    if (!s) return '';
    if (s === 'no' || s === 'stt' || s === 'số tt' || s === 'so tt') return 'stt';
    if (/mã hv|ma hv|mã học|ma hoc|^code$/.test(s)) return 'code';
    if (/tên hv|ten hv|tên học|ten hoc|^student$/.test(s)) return 'name';
    if (/eng|english/.test(s)) return 'english';
    if (s === 'ec' || /phụ trách|phu trach|first ec/.test(s)) return 'ec';
    if (s === 'g' || s === 'gender' || /giới tính|gioi tinh/.test(s)) return 'gender';
    if (/date of birth|ngày sinh|ngay sinh|birth/.test(s)) return 'dob';
    if (/sđt|sdt|điện thoại|dien thoai|^zalo$|số liên hệ|so lien he|^phone$/.test(s)) return 'phone';
    return '';
  }

  function sttOf(value) {
    var text = String(value == null ? '' : value).trim();
    if (!/^\d{1,2}(?:\.0+)?$/.test(text)) return 0;
    var n = Math.round(Number(text));
    return n >= 1 && n <= 40 ? n : 0;
  }

  function codeOrDash(value) {
    var text = String(value == null ? '' : value).replace(/\s+/g, '');
    if (/^\d{2}_\d{4,}$/.test(text)) return text;
    if (/^\d{5,10}$/.test(text)) return text;
    return '-';
  }

  function isPersonName(value) {
    var text = String(value || '').replace(/\s+/g, ' ').trim();
    if (!text || text.length > 80) return false;
    if (/https?:|zalo\.me/i.test(text)) return false;
    if (/dừng tuyển|không nhận|khong nhan|check |lớp rất|lop rat|theo dõi|cô phương|in và phát|gửi nội dung|học viên tách|tách lớp|thông tin học viên|tiền sách|tồn đọng|worksheet|bài tập/i.test(text)) return false;
    if (/^(done|x|mới|moi|new|off|none)$/i.test(text)) return false;
    var letters = text.match(/[A-Za-zÀ-ỹ]/g);
    return !!(letters && letters.length >= 2);
  }

  function englishOrDash(value) {
    var text = dashText(value);
    if (text === '-') return '-';
    if (codeOrDash(text) !== '-') return '-';
    if (/^(trial|mới|moi|hb|new|done|off|x)$/i.test(text)) return '-';
    if (/chuyển|tháng|thang|btvn|cần|làm|ngoan|đọc|lười|hv mới|cọc|lên |học viên|1 tháng|1 thang|month|standard/i.test(text)) return '-';
    if (text.length > 22 || (text.match(/ /g) || []).length > 2 || /[,:;\/]/.test(text)) return '-';
    return text;
  }

  function genderOrDash(value) {
    var s = String(value == null ? '' : value).trim().toLowerCase();
    if (s === 'nam' || s === 'm' || s === 'male') return 'Nam';
    if (s === 'nữ' || s === 'nu' || s === 'f' || s === 'female') return 'Nữ';
    if (s === 'khác' || s === 'khac' || s === 'other') return 'Khác';
    return '-';
  }

  function dobOrDash(value) {
    var text = String(value == null ? '' : value).trim();
    if (!text || text === '-' || text === '—') return '-';
    var dmy = /^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})$/.exec(text);
    if (dmy) {
      var day = Number(dmy[1]);
      var month = Number(dmy[2]);
      var year = Number(dmy[3]);
      if (year >= 1995 && year <= 2025 && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
        return year + '-' + pad(month) + '-' + pad(day);
      }
    }
    if (/^(?:19|20)\d{2}$/.test(text)) return text;
    if (/^\d{5}(?:\.0+)?$/.test(text)) {
      var serial = Math.floor(Number(text));
      if (serial > 30000 && serial < 60000) {
        var utc = new Date(Date.UTC(1899, 11, 30) + serial * 86400000);
        var born = utc.getUTCFullYear();
        if (born >= 1995 && born <= 2025) {
          return born + '-' + pad(utc.getUTCMonth() + 1) + '-' + pad(utc.getUTCDate());
        }
      }
    }
    return '-';
  }

  function phoneOrDash(value) {
    var digits = String(value == null ? '' : value).replace(/[^\d]/g, '');
    if (digits.length === 9 && /^[3-9]/.test(digits)) digits = '0' + digits;
    if (digits.length >= 8 && digits.length <= 12) return digits;
    return '-';
  }

  function ecOrDash(value) {
    var text = dashText(value);
    if (text === '-') return '-';
    if (/chuyển|done|đã có|^x$|http|zalo\.me|btvn/i.test(text)) return '-';
    if (text.length > 40) return '-';
    return text;
  }

  function sheetToken(name) {
    var raw = String(name || '').trim();
    if (/bản sao|ban sao/i.test(raw)) return null;
    var key = raw.toUpperCase().replace(/\s+/g, '');
    var gc = /^GC0*(\d+)[_-]([A-Z0-9.]+)$/.exec(key);
    if (gc) return { gc: true, number: String(Number(gc[1])), level: gc[2].replace(/[^A-Z0-9]/g, '') };
    var parsed = /^(PRE)?(KINDY|KIDS|TEENS|IELTS)(\d+)[_-]([A-Z0-9.-]+)$/.exec(key);
    if (!parsed) return null;
    return {
      pre: !!parsed[1],
      track: parsed[2],
      number: String(Number(parsed[3])),
      level: parsed[4].replace(/[^A-Z0-9]/g, '')
    };
  }

  function compactClassKey(name) {
    return String(name || '').toUpperCase().replace(/[^A-Z0-9]/g, '').replace(/^XH/, '');
  }

  function classMatchKeys(cls) {
    var keys = [];
    function add(name) {
      var key = compactClassKey(name);
      if (key && keys.indexOf(key) < 0) keys.push(key);
    }
    add(currentName(cls));
    (cls.levelHistory || []).forEach(function (level) { if (level) add(level.name); });
    if (cls && cls.kind === 'custom') {
      var custom = String(cls.customName || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
      var gm = /^GC0*(\d+)$/.exec(custom);
      if (gm) add('GC' + Number(gm[1]) + String(cls.customLevel || '').toUpperCase().replace(/[^A-Z0-9]/g, ''));
    }
    return keys;
  }

  function sheetMatchKeys(token) {
    if (!token) return [];
    if (token.gc) return ['GC' + token.number + token.level];
    var keys = [];
    function push(key) { if (key && keys.indexOf(key) < 0) keys.push(key); }
    push(token.track + token.number + token.level);
    push('PRE' + token.track + token.number + token.level);
    if (!token.pre && (token.level === 'A' || token.level === 'B')) push(token.track + token.number + '1' + token.level);
    return keys;
  }

  function matchSheetClass(sheetName, classes) {
    var token = sheetToken(sheetName);
    var wanted = sheetMatchKeys(token);
    if (!wanted.length) return null;
    var found = [];
    (classes || []).forEach(function (cls) {
      if (!cls) return;
      var keys = classMatchKeys(cls);
      for (var i = 0; i < wanted.length; i++) {
        if (keys.indexOf(wanted[i]) >= 0) { found.push(cls); return; }
      }
    });
    if (found.length === 1) return found[0];
    return null;
  }

  function findSheetHeader(rows) {
    var limit = Math.min(rows.length, 16);
    for (var r = 0; r < limit; r++) {
      var map = {};
      var cells = rows[r] || [];
      for (var c = 0; c < cells.length; c++) {
        var kind = headerKind(cells[c]);
        if (kind && map[kind] == null) map[kind] = c;
      }
      if (map.stt != null && map.name != null) return { row: r, map: map };
    }
    return null;
  }

  function inferSheetLayout(rows) {
    var limit = Math.min(rows.length, 30);
    for (var r = 0; r < limit; r++) {
      var cells = rows[r] || [];
      var sttIdx = -1;
      var codeIdx = -1;
      var people = [];
      for (var c = 0; c < cells.length; c++) {
        if (sttIdx < 0 && sttOf(cells[c])) sttIdx = c;
        if (codeIdx < 0 && codeOrDash(cells[c]) !== '-') codeIdx = c;
        if (isPersonName(cells[c]) && codeOrDash(cells[c]) === '-') people.push(c);
      }
      if (sttIdx < 0 || codeIdx < 0 || !people.length) continue;
      people.sort(function (a, b) {
        var wa = String(cells[a] || '').trim().split(/\s+/).length;
        var wb = String(cells[b] || '').trim().split(/\s+/).length;
        if (wb !== wa) return wb - wa;
        return b - a;
      });
      var nameIdx = people[0];
      var ecIdx = -1;
      for (var p = 0; p < people.length; p++) {
        if (people[p] !== nameIdx) { ecIdx = people[p]; break; }
      }
      return { row: r - 1, map: { stt: sttIdx, code: codeIdx, name: nameIdx, ec: ecIdx } };
    }
    return null;
  }

  function sheetStudents(rows) {
    var layout = findSheetHeader(rows) || inferSheetLayout(rows);
    if (!layout) return [];
    var map = layout.map;
    var students = [];
    var closed = false;
    var gap = 0;
    for (var r = layout.row + 1; r < rows.length; r++) {
      var row = rows[r] || [];
      var blob = row.join(' ');
      if (/tách lớp|tach lop|ngoài danh sách|học viên cũ/i.test(blob)) {
        closed = true;
        gap = 0;
        continue;
      }
      var name = dashText(row[map.name]);
      if (!isPersonName(name)) {
        gap += 1;
        if (gap >= 2 && students.length) closed = true;
        continue;
      }
      gap = 0;
      var stt = sttOf(row[map.stt]);
      var genderCell = map.gender == null ? '' : row[map.gender];
      var englishCell = map.english == null ? '' : row[map.english];
      var gender = genderOrDash(genderCell);
      var english = englishOrDash(englishCell);
      if (gender === '-' && genderOrDash(englishCell) !== '-') {
        gender = genderOrDash(englishCell);
        english = '-';
      }
      students.push({
        name: name,
        code: map.code == null ? '-' : codeOrDash(row[map.code]),
        englishName: english,
        gender: gender,
        dob: map.dob == null ? '-' : dobOrDash(row[map.dob]),
        phone: map.phone == null ? '-' : phoneOrDash(row[map.phone]),
        ec: map.ec == null ? '-' : ecOrDash(row[map.ec]),
        outdated: closed || !stt
      });
    }
    return students;
  }

  function applyClassSheets(state, sheets, now) {
    var when = now instanceof Date ? now : new Date(now || Date.now());
    var report = { filled: [], skipped: [], unmatched: [], capped: [], added: 0, outdated: 0 };
    if (!state || !Array.isArray(state.classes)) return report;
    (sheets || []).forEach(function (sheet) {
      var name = sheet && sheet.name ? String(sheet.name) : '';
      if (/bản sao|ban sao/i.test(name)) return;
      var cls = matchSheetClass(name, state.classes);
      if (!cls) {
        if (sheetToken(name)) report.unmatched.push(name.trim());
        return;
      }
      if ((cls.students || []).length) {
        report.skipped.push(currentName(cls));
        return;
      }
      var parsed = sheetStudents(sheet.rows || []);
      var listed = 0;
      var capped = false;
      var count = 0;
      parsed.forEach(function (row) {
        var outdated = !!row.outdated;
        if (!outdated && listed >= 20) {
          capped = true;
          return;
        }
        var stu = createStudent({
          code: row.code || '-',
          name: row.name,
          englishName: row.englishName || '-',
          gender: row.gender || '-',
          dob: row.dob || '-',
          phone: row.phone || '-',
          ec: row.ec || '-',
          enroll: 'official',
          joinedAt: cls.cycleStart || when.toISOString(),
          originClassId: cls.id,
          expireKind: outdated ? 'outdated' : '',
          expiredAt: outdated ? when.toISOString() : '',
          expireReason: outdated ? 'Học viên outdated' : ''
        });
        stu.rosterBatch = '1.3.1';
        cls.students.push(stu);
        count += 1;
        report.added += 1;
        if (outdated) report.outdated += 1;
        else listed += 1;
      });
      if (capped) report.capped.push(currentName(cls));
      if (count) report.filled.push(currentName(cls));
    });
    if (report.filled.length) {
      pushNotice(state, when, formatDMY(when) + ': đã bổ sung học viên cho ' + report.filled.length + ' lớp từ file theo dõi. Các lớp đã có học viên được giữ nguyên.');
    }
    report.capped.forEach(function (classNameText) {
      pushNotice(state, when, formatDMY(when) + ': ' + classNameText + ' không thể nhận thêm học viên vì sĩ số đã đạt 20.');
    });
    return report;
  }

  function deferSessionsOnDates(cls, dates, at) {
    var want = {};
    (dates || []).forEach(function (iso) {
      var key = String(iso || '').slice(0, 10);
      if (key) want[key] = true;
    });
    var total = lessonTotal(cls.gradeId);
    var hits = lessonSessions(cls, total).filter(function (ses) { return ses && want[ses.iso]; });
    hits.sort(function (a, b) { return b.date - a.date; });
    var deferred = [];
    var skipped = [];
    hits.forEach(function (ses) {
      var result = changeSession(cls, { action: 'defer', from: ses.key, reason: 'Nghỉ 1-2/9', at: at });
      if (result.error) skipped.push({ key: ses.key, iso: ses.iso, error: result.error });
      else deferred.push({ key: ses.key, iso: ses.iso, start: ses.start, end: ses.end });
    });
    var next = lessonSessions(cls, total);
    return { deferred: deferred, skipped: skipped, last: next.length ? next[next.length - 1] : null };
  }

  function revertRosterFill(state, batch) {
    var mark = batch || '1.3.1';
    var removed = 0;
    (state && state.classes || []).forEach(function (cls) {
      var keep = [];
      (cls.students || []).forEach(function (stu) {
        if (stu && stu.rosterBatch === mark) { removed += 1; return; }
        keep.push(stu);
      });
      cls.students = keep;
    });
    return removed;
  }

  function ageBound(value) {
    if (value == null || String(value).trim() === '') return null;
    var n = Number(String(value).trim());
    if (!isFinite(n)) return null;
    return n;
  }

  function ageInRange(dob, from, to, now) {
    var low = ageBound(from);
    var high = ageBound(to);
    if (low == null && high == null) return true;
    if (low == null) low = high;
    if (high == null) high = low;
    if (low > high) {
      var swap = low;
      low = high;
      high = swap;
    }
    var age = ageOf(dob, now instanceof Date ? now : new Date(now || Date.now()));
    if (age == null) return false;
    return age >= low && age <= high;
  }

  function officialJoinSeries(classes, archive, now) {
    var when = now instanceof Date ? now : new Date(now || Date.now());
    var counts = {};
    function add(stu) {
      if (!stu || enrollOf(stu) !== 'official' || !stu.joinedAt) return;
      var at = new Date(stu.joinedAt);
      if (isNaN(at.getTime())) return;
      var key = monthKey(at);
      counts[key] = (counts[key] || 0) + 1;
    }
    (classes || []).forEach(function (cls) {
      (cls.students || []).forEach(add);
    });
    (archive || []).forEach(function (stu) {
      if (archiveKeepsCode(stu)) add(stu);
    });
    var keys = Object.keys(counts).sort();
    var end = monthKey(when);
    if (!keys.length) return [{ key: end, count: 0 }];
    var cursor = keys[0];
    var series = [];
    while (cursor <= end) {
      series.push({ key: cursor, count: counts[cursor] || 0 });
      cursor = shiftMonth(cursor, 1);
      if (series.length > 240) break;
    }
    if (series.length > 18) series = series.slice(series.length - 18);
    if (!series.length) return [{ key: end, count: 0 }];
    return series;
  }

  function monthHeadcount(classes, archive, key, now) {
    var range = monthRange(key);
    var out = { trial: 0, official: 0, stopped: 0, scholarship: 0 };
    function consider(stu, archivedAt) {
      if (!stu || !stu.joinedAt) return;
      var joined = new Date(stu.joinedAt);
      if (isNaN(joined.getTime()) || joined.getTime() >= range.end.getTime()) return;
      var arch = archivedAt ? new Date(archivedAt) : null;
      if (arch && !isNaN(arch.getTime()) && arch.getTime() < range.start.getTime()) return;
      var stoppedAt = stu.stoppedAt ? new Date(stu.stoppedAt) : null;
      var stopped = !!(stoppedAt && !isNaN(stoppedAt.getTime()) && stoppedAt.getTime() < range.end.getTime());
      var archivedDuring = !!(arch && !isNaN(arch.getTime()) && arch.getTime() >= range.start.getTime() && arch.getTime() < range.end.getTime());
      if (stopped || archivedDuring) {
        out.stopped += 1;
        return;
      }
      var enroll = enrollOf(stu);
      if (enroll === 'trial') out.trial += 1;
      else if (enroll === 'scholarship') out.scholarship += 1;
      else out.official += 1;
    }
    (classes || []).forEach(function (cls) {
      (cls.students || []).forEach(function (stu) { consider(stu, null); });
    });
    (archive || []).forEach(function (stu) {
      if (!archiveKeepsCode(stu)) return;
      consider(stu, stu.archivedAt);
    });
    return out;
  }

  function classLoad(classes, now) {
    var when = now instanceof Date ? now : new Date(now || Date.now());
    var bands = { low: [], steady: [], high: [] };
    (classes || []).forEach(function (cls) {
      if (!cls) return;
      var count = listedCount(cls, when);
      var row = { id: cls.id, name: currentName(cls), count: count };
      if (count < 15) bands.low.push(row);
      else if (count <= 17) bands.steady.push(row);
      else bands.high.push(row);
    });
    function byName(a, b) { return String(a.name).localeCompare(String(b.name), 'vi'); }
    bands.low.sort(byName);
    bands.steady.sort(byName);
    bands.high.sort(byName);
    return bands;
  }

  function examCandidates(cls, opts) {
    opts = opts || {};
    var now = opts.now instanceof Date ? opts.now : new Date(opts.now || Date.now());
    var rows = [];
    ((cls && cls.students) || []).forEach(function (stu) {
      if (!stu) return;
      if (stu.status === 'stopped' || stu.expireKind === 'stop') return;
      var enroll = enrollOf(stu);
      if (enroll !== 'official' && enroll !== 'trial') return;
      if (!ageInRange(stu.dob, opts.ageFrom, opts.ageTo, now)) return;
      rows.push({
        studentId: stu.id,
        name: stu.name || '',
        englishName: stu.englishName || '',
        code: stu.code || '',
        enroll: enroll,
        score: '',
        review: '',
        extra: false
      });
    });
    rows.sort(function (a, b) { return String(a.name).localeCompare(String(b.name), 'vi'); });
    return rows;
  }

  function mergeById(local, incoming, newer) {
    var localList = Array.isArray(local) ? local : [];
    var incList = Array.isArray(incoming) ? incoming : [];
    var incById = {};
    incList.forEach(function (item) {
      if (item && item.id) incById[String(item.id)] = item;
    });
    var seen = {};
    var out = [];
    localList.forEach(function (item) {
      if (!item || typeof item !== 'object') return;
      var id = item.id ? String(item.id) : '';
      if (id && seen[id]) return;
      if (id) seen[id] = true;
      out.push(id && newer && incById[id] ? incById[id] : item);
    });
    incList.forEach(function (item) {
      if (!item || !item.id || seen[String(item.id)]) return;
      seen[String(item.id)] = true;
      out.push(item);
    });
    return out;
  }

  function mergeStaffRows(local, incoming, newer) {
    var out = {};
    var base = local && typeof local === 'object' && !Array.isArray(local) ? local : {};
    Object.keys(base).forEach(function (name) { out[name] = base[name]; });
    var inc = incoming && typeof incoming === 'object' && !Array.isArray(incoming) ? incoming : {};
    Object.keys(inc).forEach(function (name) {
      var add = inc[name];
      if (!add || typeof add !== 'object') return;
      var row = out[name];
      if (!row || newer) {
        out[name] = add;
        return;
      }
      var soa = {};
      var addSoa = add.soa && typeof add.soa === 'object' && !Array.isArray(add.soa) ? add.soa : {};
      var rowSoa = row.soa && typeof row.soa === 'object' && !Array.isArray(row.soa) ? row.soa : {};
      Object.keys(addSoa).forEach(function (month) { soa[month] = addSoa[month]; });
      Object.keys(rowSoa).forEach(function (month) { soa[month] = rowSoa[month]; });
      out[name] = { code: String(row.code || add.code || ''), soa: soa };
    });
    return out;
  }

  function teachingMinutes(classes, fetName, key) {
    var name = String(fetName || '').trim();
    if (!name || name === '?' || name === '-') return 0;
    var total = 0;
    (classes || []).forEach(function (cls) {
      if (!cls) return;
      monthSessions(cls, key).forEach(function (ses) {
        if (!staffHas(sessionFetOf(cls, ses.iso, ses.start), name)) return;
        total += Math.max(0, minutesOf(ses.end) - minutesOf(ses.start));
      });
    });
    return total;
  }

  function examWeekSpan(entries) {
    var seen = {};
    var mondays = [];
    (entries || []).forEach(function (entry) {
      var dates = [];
      if (entry && Array.isArray(entry.examDates) && entry.examDates.length) dates = entry.examDates;
      else if (entry && entry.examDate) dates = [entry.examDate];
      dates.forEach(function (iso) {
        var day = parseDateInput(iso);
        if (!day) return;
        var monday = weekMonday(day);
        var stamp = isoDay(monday);
        if (seen[stamp]) return;
        seen[stamp] = true;
        mondays.push(monday);
      });
    });
    mondays.sort(function (a, b) { return a.getTime() - b.getTime(); });
    if (!mondays.length) return [];
    var cursor = mondays[0];
    var last = mondays[mondays.length - 1].getTime();
    var out = [];
    var guard = 0;
    while (cursor.getTime() <= last && guard < 60) {
      out.push(isoDay(cursor));
      cursor = addDays(cursor, 7);
      guard += 1;
    }
    return out;
  }

  return {
    GROUPS: GROUPS,
    DAYS: DAYS,
    BANDS: BANDS,
    WEEKDAYS: WEEKDAYS,
    FET: FET,
    STAFF: STAFF,
    LEVEL_CHOICES: LEVEL_CHOICES,
    GRADES: GRADES,
    uid: uid,
    gradeById: gradeById,
    gradeIndex: gradeIndex,
    nextGrade: nextGrade,
    gradesForChoice: gradesForChoice,
    className: className,
    levelToken: levelToken,
    customClassName: customClassName,
    nameKey: nameKey,
    trackLabel: trackLabel,
    lessonTotal: lessonTotal,
    currentName: currentName,
    migrateTeensHome: migrateTeensHome,
    slotsOn: slotsOn,
    writeStandingSchedule: writeStandingSchedule,
    applyFixedSchedule: applyFixedSchedule,
    parseScheduleText: parseScheduleText,
    mergeExtraFolders: mergeExtraFolders,
    parseDateInput: parseDateInput,
    startOfDay: startOfDay,
    addDays: addDays,
    atTime: atTime,
    addMonths: addMonths,
    formatDMY: formatDMY,
    formatAmPm: formatAmPm,
    formatTimeValue: formatTimeValue,
    monthKey: monthKey,
    shiftMonth: shiftMonth,
    monthLabel: monthLabel,
    weekdayName: weekdayName,
    todayInput: todayInput,
    staffText: staffText,
    ageOf: ageOf,
    ageInRange: ageInRange,
    officialJoinSeries: officialJoinSeries,
    monthHeadcount: monthHeadcount,
    classLoad: classLoad,
    examCandidates: examCandidates,
    teachingMinutes: teachingMinutes,
    mergeById: mergeById,
    mergeStaffRows: mergeStaffRows,
    examWeekSpan: examWeekSpan,
    noteVisible: noteVisible,
    nextNumber: nextNumber,
    numberTaken: numberTaken,
    lessonEndDates: lessonEndDates,
    lessonSessions: lessonSessions,
    sessionAlerts: sessionAlerts,
    changeSession: changeSession,
    deferSessionsOnDates: deferSessionsOnDates,
    pushNotice: pushNotice,
    currentLevel: currentLevel,
    progressOf: progressOf,
    runSystemUpdate: runSystemUpdate,
    applyLevelEdit: applyLevelEdit,
    createClass: createClass,
    createStudent: createStudent,
    enrollOf: enrollOf,
    studentPhase: studentPhase,
    archiveRecord: archiveRecord,
    archiveKeepsCode: archiveKeepsCode,
    settleRoster: settleRoster,
    transferStudents: transferStudents,
    sortStudents: sortStudents,
    activeStudents: activeStudents,
    weekMonday: weekMonday,
    bandOf: bandOf,
    passFilter: passFilter,
    levelAt: levelAt,
    buildSchedule: buildSchedule,
    weekStats: weekStats,
    formatHours: formatHours,
    isoDay: isoDay,
    monthRange: monthRange,
    scheduleText: scheduleText,
    monthSessions: monthSessions,
    studentSpans: studentSpans,
    placementAt: placementAt,
    homeworkRate: homeworkRate,
    homeworkLevel: homeworkLevel,
    attendanceUnavailable: attendanceUnavailable,
    curriculumName: curriculumName,
    BOOK_STATUS: BOOK_STATUS,
    levelKey: levelKey,
    normalizeBook: normalizeBook,
    bookOf: bookOf,
    bookBought: bookBought,
    pecReady: pecReady,
    homeworkGroups: homeworkGroups,
    homeworkBoard: homeworkBoard,
    buildStyledXlsx: buildStyledXlsx,
    HW_STATUS: HW_STATUS,
    nextStudentCode: nextStudentCode,
    codeTaken: codeTaken,
    STUDENT_COLUMNS: STUDENT_COLUMNS,
    parseImportDate: parseImportDate,
    normalizeGender: normalizeGender,
    rowsToStudents: rowsToStudents,
    rowsToClassUpdate: rowsToClassUpdate,
    attendanceSessions: attendanceSessions,
    applyHomeworkSheet: applyHomeworkSheet,
    listedCount: listedCount,
    sameLevel: sameLevel,
    applyClassSheets: applyClassSheets,
    revertRosterFill: revertRosterFill,
    matchSheetClass: matchSheetClass,
    sheetStudents: sheetStudents,
    dobOrDash: dobOrDash,
    sessionFetOf: sessionFetOf,
    classFetNames: classFetNames,
    countdownLabel: countdownLabel
  };
});
