(function () {
  'use strict';

  var L = window.OceanLogic;
  var APP_TITLE = 'Ocean EDU - Student management list (Unofficial) ver 1.4.0';
  var SUGGEST_URL = 'https://script.google.com/macros/s/AKfycbyNFHdMszhrmqyfXDHSDi2ti51y5_Ib3kiXgA5cGzcPkWLboUJSnPYJ5xwikb9N-fLOkg/exec';
  var PRIMARY_IDS = ['ocean', 'sky', 'teal', 'green', 'lime', 'amber', 'orange', 'coral', 'rose', 'violet', 'indigo', 'slate'];
  var SKIN_IDS = ['default', 'y2k', 'mcbling', 'indie', 'aero', 'minimal'];
  var STORAGE = 'oceanEdu.v1';
  var DATA_FILE = 'ocean-edu-data.json';
  var CLASS_FILE = 'ocean-edu-classes.json';

  function defaultAccount() {
    return { id: 'admin-origin', username: '25040392', password: 'Origin2003', name: 'Admin Quang Đức', role: 'admin' };
  }

  var state = {
    settings: { theme: 'day', title: APP_TITLE },
    classes: [],
    announcements: [],
    accounts: [defaultAccount()],
    archive: [],
    exams: [],
    staffBook: {},
    soaSlots: [],
    tasks: [],
    activity: []
  };

  var ui = {
    user: null,
    screen: 'login',
    classId: null,
    sort: 'name',
    selected: {},
    modal: null,
    detailId: null,
    importDraft: null,
    detailEdit: false,
    boardMonth: '',
    weekOffset: 0,
    loginError: '',
    formError: '',
    pendingUpdate: false,
    staffFilter: { fet: '', cm: '', ta: '' },
    hwMonth: '',
    hwPick: {},
    archiveFolder: '',
    archiveQuery: '',
    archiveTrack: '',
    archiveClass: '',
    archiveEnroll: '',
    accountForm: null,
    postDraft: '',
    postImages: [],
    sending: false,
    curriculumId: null,
    curriculumLevel: '',
    dashMonth: '',
    archivePick: {},
    examId: null,
    examWizard: null,
    examWeek: '',
    staffMonth: '',
    mailMonth: '',
    mailId: '',
    missedAt: 0,
    noticeMonth: '',
    suggest: { type: 'transfer' },
    rejectId: ''
  };

  var droppedArchive = [];
  var archivePurgePersist = false;
  var examsSeen = false;
  var staffBookSeen = false;
  var soaSeen = false;
  var tasksSeen = false;
  var activitySeen = false;
  var toastQueue = [];
  var toastPlaying = false;
  var SOA_TYPES = ['Interview', 'event', 'Lớp EB'];

  var loading = false;
  var toastTimer = null;
  var lastDay = '';
  var dirHandle = null;
  var preview = { scale: 1, x: 0, y: 0, pointers: {}, lastDist: 0 };
  var localRaw = {};
  var savePaused = true;
  var persistBook = false;
  var dataNote = 'Chưa đọc file data trên bản web.';
  var classNote = 'Chưa đọc file lớp, học viên và chuyên cần.';
  var lastClassJson = null;
  var folderAsked = false;
  var syncWarned = false;
  var syncTimer = null;
  var classFileSeen = false;
  var classAdopted = false;

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function bookScore(raw) {
    if (!raw || typeof raw !== 'object') return 0;
    var classes = Array.isArray(raw.classes) ? raw.classes : [];
    var announcements = Array.isArray(raw.announcements) ? raw.announcements : [];
    var students = 0;
    classes.forEach(function (cls) {
      if (cls && Array.isArray(cls.students)) students += cls.students.length;
    });
    return classes.length * 1000 + students * 10 + announcements.length;
  }

  function savedTime(raw) {
    var iso = raw && raw.settings && raw.settings.savedAt;
    var time = Date.parse(iso || '');
    return isNaN(time) ? 0 : time;
  }

  function shouldAdopt(current, incoming) {
    if (bookScore(incoming) <= 0) return false;
    if (bookScore(current) <= 0) return true;
    return savedTime(incoming) > savedTime(current);
  }

  function applyRaw(raw) {
    raw = raw && typeof raw === 'object' ? raw : {};
    try {
      state.settings = raw.settings ? raw.settings : { theme: 'day', title: APP_TITLE };
      var legacyTitle = [
        'Ocean EDU - Student management list (Unofficial) ver 1.0',
        'Ocean EDU - Student management list (Unofficial) ver 1.1',
        'Ocean EDU - Student management list (Unofficial) ver 1.2.0',
        'Ocean EDU - Student management list (Unofficial) ver 1.2.1',
        'Ocean EDU - Student management list (Unofficial) ver 1.2.2',
        'Ocean EDU - Student management list (Unofficial) ver 1.2.3',
        'Ocean EDU - Student management list (Unofficial) ver 1.2.4',
        'Ocean EDU - Student management list (Unofficial) ver 1.2.5',
        'Ocean EDU - Student management list (Unofficial) ver 1.2.6',
        'Ocean EDU - Student management list (Unofficial) ver 1.2.7',
        'Ocean EDU - Student management list (Unofficial) ver 1.2.8',
        'Ocean EDU - Student management list (Unofficial) ver 1.2.9',
        'Ocean EDU - Student management list (Unofficial) ver 1.3',
        'Ocean EDU - Student management list (Unofficial) ver 1.3.1',
        'Ocean EDU - Student management list (Unofficial) ver 1.3.2',
        'Ocean EDU - Student management list (Unofficial) ver 1.3.3',
        'Ocean EDU - Student management list (Unofficial) ver 1.3.4',
        'Ocean EDU - Student management list (Unofficial) ver 1.3.5',
        'Ocean EDU - Student management list (Unofficial) ver 1.3.6',
        'Ocean EDU - Student management list (Unofficial) ver 1.3.7',
        'Ocean EDU - Student management list (Unofficial) ver 1.3.8',
        'Ocean EDU - Student management list (Unofficial) ver 1.3.9'
      ];
      if (!state.settings.title || legacyTitle.indexOf(state.settings.title) >= 0) state.settings.title = APP_TITLE;
      delete state.settings.supabaseUrl;
      delete state.settings.supabaseKey;
      if (state.settings.theme !== 'night') state.settings.theme = 'day';
      if (PRIMARY_IDS.indexOf(state.settings.primary) < 0) state.settings.primary = 'ocean';
      state.classes = normalizeClasses(raw.classes);
      if (!state.settings.classesSavedAt) state.settings.classesSavedAt = state.settings.savedAt || '';
      state.announcements = Array.isArray(raw.announcements) ? raw.announcements : [];
      state.announcements.forEach(function (item) {
        if (!item || typeof item !== 'object') return;
        if (!item.kind) item.kind = 'system';
        if (!Array.isArray(item.images)) item.images = [];
        item.images = item.images.filter(function (src) {
          return typeof src === 'string' && src.indexOf('data:image/') === 0;
        }).slice(0, 4);
      });
      state.announcements = state.announcements.filter(function (item) { return item && typeof item === 'object'; });
      state.accounts = Array.isArray(raw.accounts) && raw.accounts.length ? raw.accounts : [defaultAccount()];
      state.accounts.forEach(function (acc) {
        if (!acc || typeof acc !== 'object') return;
        var role = String(acc.role || '').toLowerCase();
        acc.role = role === 'admin' || role === 'commenter' || role === 'guest' ? role : 'guest';
        if (!acc.id) acc.id = L.uid();
        if (acc.role === 'guest') acc.password = '';
        else acc.password = acc.password == null ? '' : String(acc.password);
        acc.appearance = normalizeAppearance(acc.appearance);
        if (!acc.ack || typeof acc.ack !== 'object' || Array.isArray(acc.ack)) acc.ack = {};
      });
      state.accounts = state.accounts.filter(function (acc) { return acc && typeof acc === 'object' && acc.username; });
      if (!state.accounts.length) state.accounts = [defaultAccount()];
      state.archive = normalizeArchive(raw.archive);
      state.exams = normalizeExams(raw.exams);
      examsSeen = Array.isArray(raw.exams);
      state.staffBook = normalizeStaffBook(raw.staffBook);
      staffBookSeen = !!(raw.staffBook && typeof raw.staffBook === 'object' && !Array.isArray(raw.staffBook));
      state.soaSlots = normalizeSoa(raw.soaSlots);
      soaSeen = Array.isArray(raw.soaSlots);
      state.tasks = [];
      tasksSeen = false;
      state.activity = [];
      activitySeen = false;
    } catch (err) {
      state.settings = { theme: 'day', primary: 'ocean', title: APP_TITLE };
      state.classes = [];
      state.announcements = [];
      state.accounts = [defaultAccount()];
      state.archive = [];
      state.exams = [];
      state.staffBook = {};
      state.soaSlots = [];
      state.tasks = [];
      state.activity = [];
      droppedArchive = [];
      examsSeen = false;
      staffBookSeen = false;
      soaSeen = false;
      tasksSeen = false;
      activitySeen = false;
    }
  }

  function normalizeClasses(list) {
    var classes = Array.isArray(list) ? list.filter(function (cls) { return cls && typeof cls === 'object'; }) : [];
    classes.forEach(function (cls) {
      if (cls.kind !== 'addon' && cls.kind !== 'starter' && cls.kind !== 'custom') cls.kind = 'starter';
      if (!Array.isArray(cls.sessionChanges)) cls.sessionChanges = [];
      if (!Array.isArray(cls.students)) cls.students = [];
      if (!Array.isArray(cls.schedule)) cls.schedule = [];
      if (!Array.isArray(cls.scheduleRevisions)) cls.scheduleRevisions = [];
      cls.scheduleRevisions = cls.scheduleRevisions.filter(function (rev) {
        return rev && rev.from && Array.isArray(rev.slots);
      }).map(function (rev) {
        return {
          from: String(rev.from).slice(0, 10),
          slots: rev.slots.map(function (slot) {
            return { dow: Number(slot.dow), start: String(slot.start || ''), end: String(slot.end || '') };
          }).filter(function (slot) { return !isNaN(slot.dow) && slot.start && slot.end; })
        };
      }).sort(function (a, b) { return a.from.localeCompare(b.from); });
      var fets = {};
      if (cls.sessionFets && typeof cls.sessionFets === 'object' && !Array.isArray(cls.sessionFets)) {
        Object.keys(cls.sessionFets).forEach(function (key) {
          var name = String(cls.sessionFets[key] || '').trim();
          if (!name || !/^\d{4}-\d{2}-\d{2}\|/.test(key)) return;
          fets[key] = name;
        });
      }
      cls.sessionFets = fets;
      if (cls.homeTrack !== 'TEENS') cls.homeTrack = '';
      if (cls.kind === 'custom') {
        cls.customName = String(cls.customName || '').trim();
        cls.customLevel = String(cls.customLevel || '').trim();
        cls.endOpen = !!cls.endOpen;
      } else {
        cls.customName = '';
        cls.customLevel = '';
        cls.endOpen = cls.homeTrack === 'TEENS' ? !!cls.endOpen : false;
      }
      cls.students.forEach(function (stu) {
        if (!stu || typeof stu !== 'object') return;
        if (stu.enroll !== 'trial' && stu.enroll !== 'scholarship') stu.enroll = 'official';
        var lessons = Number(stu.scholarshipLessons);
        stu.scholarshipLessons = lessons > 0 ? Math.min(24, Math.round(lessons)) : 0;
        stu.trialOn = String(stu.trialOn || '').slice(0, 10);
        stu.trialStart = String(stu.trialStart || '');
        stu.trialEnd = String(stu.trialEnd || '');
        stu.expireKind = stu.expireKind === 'stop' || stu.expireKind === 'outdated' ? stu.expireKind : '';
        stu.expireReason = String(stu.expireReason || '');
        stu.expiredAt = stu.expiredAt || '';
        if (!Array.isArray(stu.transfers)) stu.transfers = [];
        if (!Array.isArray(stu.notes)) stu.notes = [];
        if (!stu.homework || typeof stu.homework !== 'object') stu.homework = {};
      });
      if (!Array.isArray(cls.levelHistory) || !cls.levelHistory.length) {
        cls.levelHistory = [{
          gradeId: cls.gradeId || '',
          number: cls.number || 0,
          from: cls.cycleStart || new Date().toISOString(),
          to: null,
          name: L.currentName(cls)
        }];
      }
    });
    return classes;
  }

  function normalizeArchive(list) {
    var rows = (Array.isArray(list) ? list : []).filter(function (item) {
      return item && typeof item === 'object' && (item.name || item.code || item.id);
    }).map(function (item) {
      return {
        id: item.id || L.uid(),
        code: item.code || '',
        name: item.name || '?',
        englishName: item.englishName || '',
        gender: item.gender || '',
        dob: item.dob || '',
        phone: item.phone || '',
        ec: item.ec || '',
        enroll: item.enroll === 'trial' || item.enroll === 'scholarship' ? item.enroll : 'official',
        joinedAt: item.joinedAt || '',
        notes: Array.isArray(item.notes) ? item.notes : [],
        transfers: Array.isArray(item.transfers) ? item.transfers : [],
        lastClassId: item.lastClassId || '',
        lastClassName: item.lastClassName || '',
        track: item.track || '',
        reason: item.reason || '',
        expiredAt: item.expiredAt || '',
        archivedAt: item.archivedAt || ''
      };
    });
    var keep = [];
    droppedArchive = [];
    rows.forEach(function (item) {
      if (item.reason === 'Xóa khỏi lớp' || item.reason === 'Xóa lớp') droppedArchive.push(item);
      else keep.push(item);
    });
    return keep;
  }

  function examSlotDow(value) {
    if (value === '' || value == null) return '';
    var dow = Number(value);
    return isNaN(dow) ? '' : dow;
  }

  function examDateList(entry) {
    var dates = [];
    function add(iso) {
      var text = String(iso || '').slice(0, 10);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(text) || dates.indexOf(text) >= 0) return;
      dates.push(text);
    }
    if (entry && Array.isArray(entry.examDates)) entry.examDates.forEach(add);
    if (!dates.length && entry) add(entry.examDate);
    dates.sort();
    return dates;
  }

  function normalizeStaffBook(raw) {
    var out = {};
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return out;
    Object.keys(raw).forEach(function (name) {
      var row = raw[name];
      if (!row || typeof row !== 'object') return;
      var key = String(name || '').trim();
      if (!key || key === '?' || key === '-') return;
      var soa = {};
      var src = row.soa && typeof row.soa === 'object' && !Array.isArray(row.soa) ? row.soa : {};
      Object.keys(src).forEach(function (month) {
        if (!/^\d{4}-\d{2}$/.test(month)) return;
        var value = String(src[month] == null ? '' : src[month]).trim();
        if (value) soa[month] = value;
      });
      out[key] = { code: String(row.code == null ? '' : row.code).trim(), soa: soa };
    });
    return out;
  }

  function staffBookHasData() {
    var book = state.staffBook || {};
    return Object.keys(book).some(function (name) {
      var row = book[name];
      if (!row) return false;
      if (String(row.code || '').trim()) return true;
      return !!(row.soa && Object.keys(row.soa).length);
    });
  }

  function normalizeSoa(list) {
    var allowed = {};
    SOA_TYPES.forEach(function (type) { allowed[type] = true; });
    return (Array.isArray(list) ? list : []).filter(function (item) {
      return item && typeof item === 'object' && allowed[item.type] && item.fet && item.date && item.start && item.end;
    }).map(function (item) {
      return {
        id: item.id || L.uid(),
        fet: String(item.fet).trim(),
        type: item.type,
        date: String(item.date).slice(0, 10),
        start: String(item.start),
        end: String(item.end)
      };
    });
  }

  var shareArchive = false;
  var shareExams = false;
  var shareStaff = false;
  var shareSoa = false;
  var shareTasks = false;
  var shareActivity = false;

  function shareStamp(file) {
    var iso = file && file.settings && file.settings.savedAt ? file.settings.savedAt : (file && file.savedAt);
    var time = Date.parse(iso || '');
    return isNaN(time) ? 0 : time;
  }

  function absorbShare(file) {
    if (!file || typeof file !== 'object') return;
    var newer = shareStamp(file) > (Date.parse(state.settings.savedAt || '') || 0);
    if (Array.isArray(file.archive)) {
      state.archive = L.mergeById(state.archive || [], file.archive, newer);
      shareArchive = true;
    }
    if (Array.isArray(file.exams)) {
      state.exams = L.mergeById(state.exams || [], file.exams, newer);
      shareExams = true;
    }
    if (file.staffBook && typeof file.staffBook === 'object' && !Array.isArray(file.staffBook)) {
      state.staffBook = L.mergeStaffRows(state.staffBook || {}, file.staffBook, newer);
      shareStaff = true;
    }
    if (Array.isArray(file.soaSlots)) {
      state.soaSlots = L.mergeById(state.soaSlots || [], file.soaSlots, newer);
      shareSoa = true;
    }
    if (Array.isArray(file.accounts) && file.accounts.length) {
      state.accounts = mergeAccounts(state.accounts, file.accounts, newer);
    }
  }

  function sealShare() {
    if (shareArchive) state.archive = normalizeArchive(state.archive);
    if (shareExams) {
      state.exams = normalizeExams(state.exams);
      if (state.exams.length) examsSeen = true;
    }
    if (shareStaff) {
      state.staffBook = normalizeStaffBook(state.staffBook);
      if (staffBookHasData()) staffBookSeen = true;
    }
    if (shareSoa) {
      state.soaSlots = normalizeSoa(state.soaSlots);
      if (state.soaSlots.length) soaSeen = true;
    }
  }

  function normalizeExams(list) {
    return (Array.isArray(list) ? list : []).filter(function (item) {
      return item && typeof item === 'object' && String(item.name || '').trim();
    }).map(function (item) {
      return {
        id: item.id || L.uid(),
        name: String(item.name || '').trim(),
        type: item.type === 'pick' ? 'pick' : 'class',
        ageFrom: item.ageFrom == null ? '' : String(item.ageFrom),
        ageTo: item.ageTo == null ? '' : String(item.ageTo),
        createdAt: item.createdAt || '',
        entries: (Array.isArray(item.entries) ? item.entries : []).filter(function (entry) {
          return entry && typeof entry === 'object';
        }).map(function (entry) {
          return {
            classId: entry.classId || '',
            className: entry.className || '',
            slotDow: examSlotDow(entry.slotDow),
            slotStart: entry.slotStart || '',
            slotEnd: entry.slotEnd || '',
            examDate: examDateList(entry)[0] || '',
            examDates: examDateList(entry),
            students: (Array.isArray(entry.students) ? entry.students : []).filter(function (stu) {
              return stu && typeof stu === 'object';
            }).map(function (stu) {
              return {
                studentId: stu.studentId || '',
                name: stu.name || '',
                englishName: stu.englishName || '',
                code: stu.code || '',
                enroll: stu.enroll === 'trial' || stu.enroll === 'scholarship' ? stu.enroll : 'official',
                score: stu.score == null ? '' : String(stu.score),
                review: stu.review == null ? '' : String(stu.review),
                extra: !!stu.extra
              };
            })
          };
        })
      };
    });
  }

  function archiveForSave() {
    var archive = state.archive || [];
    if (!archivePurgePersist && droppedArchive.length) return archive.concat(droppedArchive);
    return archive;
  }

  function classListScore(classes) {
    if (!Array.isArray(classes)) return 0;
    var students = 0;
    var marks = 0;
    classes.forEach(function (cls) {
      var list = cls && Array.isArray(cls.students) ? cls.students : [];
      list.forEach(function (stu) {
        students += 1;
        if (stu && stu.homework && typeof stu.homework === 'object') marks += Object.keys(stu.homework).length;
      });
    });
    return classes.length * 1000 + students * 10 + marks;
  }

  function classStamp(settings) {
    var iso = settings && (settings.classesSavedAt || settings.savedAt);
    var time = Date.parse(iso || '');
    return isNaN(time) ? 0 : time;
  }

  function load() {
    try {
      localRaw = JSON.parse(localStorage.getItem(STORAGE) || '{}');
    } catch (err) {
      localRaw = {};
    }
    if (!localRaw || typeof localRaw !== 'object' || Array.isArray(localRaw)) localRaw = {};
    applyRaw(localRaw);
  }

  function readIdbBook() {
    return openLocalDb().then(function (db) {
      return new Promise(function (resolve) {
        var tx = db.transaction('kv', 'readonly');
        var req = tx.objectStore('kv').get('state');
        req.onsuccess = function () { resolve(req.result || null); };
        req.onerror = function () { resolve(null); };
      });
    }).catch(function () { return null; });
  }

  function fetchBook(name) {
    if (!window.fetch) return Promise.resolve(null);
    return new Promise(function (resolve) {
      var done = false;
      var timer = setTimeout(function () {
        if (done) return;
        done = true;
        resolve(null);
      }, 15000);
      fetch(name + '?v=' + Date.now(), { cache: 'no-store', credentials: 'same-origin' }).then(function (res) {
        if (!res.ok) return null;
        return res.text();
      }).then(function (text) {
        if (!text) return null;
        var trimmed = String(text).replace(/^\uFEFF/, '').trim();
        if (!trimmed || trimmed.charAt(0) !== '{') return null;
        var data = JSON.parse(trimmed);
        if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
        return data;
      }).then(function (data) {
        if (done) return;
        done = true;
        clearTimeout(timer);
        resolve(data || null);
      }).catch(function () {
        if (done) return;
        done = true;
        clearTimeout(timer);
        resolve(null);
      });
    });
  }

  function hydrateBook() {
    return readIdbBook().then(function (stored) {
      if (stored && shouldAdopt(localRaw, stored)) {
        localRaw = stored;
        applyRaw(stored);
        persistBook = true;
        dataNote = 'Đã lấy lại dữ liệu từ bộ nhớ trình duyệt trên máy này.';
      }
      return Promise.all([fetchBook(DATA_FILE), fetchBook(CLASS_FILE)]).then(function (httpPair) {
        return folderBooks().then(function (diskPair) {
          return { http: httpPair, disk: diskPair };
        });
      });
    }).then(function (books) {
      var remote = books.http[0];
      var classFile = books.http[1];
      var diskData = books.disk[0];
      var diskClasses = books.disk[1];
      if (remote && shouldAdopt(localRaw, remote)) {
        localRaw = remote;
        applyRaw(remote);
        persistBook = true;
        dataNote = 'Đã đọc ocean-edu-data.json. Tài khoản và thông báo lấy từ file này.';
      } else if (remote && bookScore(remote) > 0) {
        dataNote = 'Trình duyệt này đang giữ bản tài khoản hoặc thông báo mới hơn file ocean-edu-data.json.';
      } else if (bookScore(localRaw) <= 0) {
        dataNote = 'Không thấy ocean-edu-data.json cạnh index.html.';
      }
      if (diskData && shouldAdopt(localRaw, diskData)) {
        localRaw = diskData;
        applyRaw(diskData);
        persistBook = true;
        dataNote = 'Đã đọc ocean-edu-data.json trong thư mục Index local.';
      }
      absorbShare(remote);
      absorbShare(diskData);
      classFileSeen = false;
      classAdopted = false;
      applyClassFile(classFile, false);
      applyClassFile(diskClasses, true);
      sealShare();
      if (!state.settings.folders128) {
        var merged = L.mergeExtraFolders(state.classes);
        state.classes = normalizeClasses(merged.classes);
        state.settings.folders128 = true;
        if (merged.added) {
          persistBook = true;
          classNote = (classNote ? classNote + ' ' : '') + 'Đã bổ sung ' + merged.added + ' lớp còn thiếu trong danh mục.';
        }
      }
      if (!state.settings.teensTrack129) {
        var teensHome = L.migrateTeensHome(state.classes);
        state.classes = normalizeClasses(teensHome.classes);
        state.settings.teensTrack129 = true;
        if (teensHome.changed) {
          persistBook = true;
          classNote = (classNote ? classNote + ' ' : '') + 'Đã chuyển XH_TEENS2_Pre-IELTS sang nhóm IELTS. Tên trình độ vẫn là TEENS.';
        }
      }
      lastClassJson = JSON.stringify(state.classes);
    }).catch(function () {});
  }

  function applyClassFile(file, fromFolder) {
    absorbShare(file);
    var incoming = file && Array.isArray(file.classes) ? file.classes : null;
    if (!incoming || classListScore(incoming) <= 0) {
      if (classFileSeen || classAdopted) return;
      if (classListScore(state.classes) <= 0) {
        classNote = 'Chưa thấy ocean-edu-classes.json cạnh index.html. File này mang lớp, học viên và chuyên cần khi đổi máy hoặc đăng lên Netlify.';
      } else {
        classNote = 'Chưa có ocean-edu-classes.json. Hãy tải file này và chép vào thư mục Index local để đồng bộ lớp, học viên và chuyên cần.';
      }
      return;
    }
    classFileSeen = true;
    var incomingStamp = Date.parse(file.savedAt || '') || 0;
    var currentStamp = classStamp(state.settings);
    if (classListScore(state.classes) > 0 && incomingStamp <= currentStamp) {
      if (!classAdopted) classNote = 'Máy này đang giữ lớp, học viên và chuyên cần mới hơn file ocean-edu-classes.json.';
      return;
    }
    state.classes = normalizeClasses(incoming);
    state.settings.classesSavedAt = file.savedAt || state.settings.classesSavedAt || '';
    persistBook = true;
    classAdopted = true;
    classNote = fromFolder
      ? 'Đã đọc ocean-edu-classes.json trong thư mục Index local. Lớp, học viên, chuyên cần và thông tin học viên lấy từ file này.'
      : 'Đã đọc ocean-edu-classes.json. Lớp, học viên và chuyên cần lấy từ file này.';
  }

  function dataPayload() {
    var payload = {
      settings: state.settings,
      classes: state.classes,
      announcements: state.announcements,
      accounts: state.accounts,
      archive: archiveForSave()
    };
    if (examsSeen || (state.exams && state.exams.length)) payload.exams = state.exams || [];
    if (staffBookSeen || staffBookHasData()) payload.staffBook = state.staffBook || {};
    if (soaSeen || (state.soaSlots && state.soaSlots.length)) payload.soaSlots = state.soaSlots || [];
    return payload;
  }

  function classBookPayload() {
    var payload = {
      kind: 'ocean-edu-classes',
      savedAt: state.settings.classesSavedAt || '',
      classes: state.classes,
      archive: archiveForSave()
    };
    if (examsSeen || (state.exams && state.exams.length)) payload.exams = state.exams || [];
    if (staffBookSeen || staffBookHasData()) payload.staffBook = state.staffBook || {};
    if (soaSeen || (state.soaSlots && state.soaSlots.length)) payload.soaSlots = state.soaSlots || [];
    return payload;
  }

  function openLocalDb() {
    return new Promise(function (resolve, reject) {
      var req = indexedDB.open('oceanEduLocal', 2);
      req.onupgradeneeded = function () {
        var db = req.result;
        if (!db.objectStoreNames.contains('kv')) db.createObjectStore('kv');
        if (!db.objectStoreNames.contains('handles')) db.createObjectStore('handles');
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    });
  }

  function ensureFolderWrite() {
    if (!dirHandle || !dirHandle.getFileHandle) return Promise.resolve(false);
    if (!dirHandle.queryPermission) return Promise.resolve(true);
    return dirHandle.queryPermission({ mode: 'readwrite' }).then(function (perm) {
      if (perm === 'granted') return true;
      var active = navigator.userActivation && navigator.userActivation.isActive;
      if (perm === 'prompt' && active && dirHandle.requestPermission) {
        return dirHandle.requestPermission({ mode: 'readwrite' }).then(function (next) {
          return next === 'granted';
        });
      }
      return false;
    }).catch(function () { return false; });
  }

  function writeNamedFile(name, json) {
    if (!dirHandle || !dirHandle.getFileHandle) return Promise.resolve(false);
    return dirHandle.getFileHandle(name, { create: true }).then(function (file) {
      return file.createWritable().then(function (stream) {
        return stream.write(json).then(function () { return stream.close(); }).then(function () { return true; });
      });
    }).catch(function () { return false; });
  }

  function writeDataFile() {
    return writeFrozenFiles(JSON.stringify(dataPayload()), JSON.stringify(classBookPayload()));
  }

  function readHandleJson(name) {
    if (!dirHandle || !dirHandle.getFileHandle) return Promise.resolve(null);
    function granted(mode) {
      if (!dirHandle.queryPermission) return Promise.resolve(true);
      return dirHandle.queryPermission({ mode: mode }).then(function (perm) {
        return perm === 'granted';
      }).catch(function () { return false; });
    }
    return granted('read').then(function (ok) {
      if (ok) return true;
      return granted('readwrite');
    }).then(function (ok) {
      if (!ok) return null;
      return dirHandle.getFileHandle(name).then(function (handle) {
        return handle.getFile();
      }).then(function (file) {
        return file.text();
      }).then(function (text) {
        if (!text) return null;
        var trimmed = String(text).replace(/^\uFEFF/, '').trim();
        if (!trimmed || trimmed.charAt(0) !== '{') return null;
        var data = JSON.parse(trimmed);
        if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
        return data;
      });
    }).catch(function () { return null; });
  }

  function folderBooks() {
    if (!dirHandle) return Promise.resolve([null, null]);
    return Promise.all([readHandleJson(DATA_FILE), readHandleJson(CLASS_FILE)]);
  }

  function rememberFolder(handle) {
    dirHandle = handle;
    folderAsked = true;
    return openLocalDb().then(function (db) {
      return new Promise(function (resolve) {
        var tx = db.transaction('handles', 'readwrite');
        tx.objectStore('handles').put(handle, 'dir');
        tx.oncomplete = function () { resolve(true); };
        tx.onerror = function () { resolve(false); };
      });
    }).catch(function () { return false; });
  }

  function showSync(mode) {
    var box = document.getElementById('syncbox');
    if (!box) return;
    clearTimeout(syncTimer);
    box.classList.remove('hidden', 'is-saving', 'is-confirmed');
    var label = document.getElementById('sync-label');
    if (mode === 'saving') {
      box.classList.add('is-saving');
      if (label) label.textContent = '';
      return;
    }
    if (mode === 'confirmed') {
      box.classList.add('is-confirmed');
      if (label) label.textContent = 'confirmed';
      syncTimer = setTimeout(function () { box.classList.add('hidden'); }, 2200);
      return;
    }
    box.classList.add('hidden');
  }

  var folderWrite = Promise.resolve();
  var folderSerial = 0;

  function writeFrozenFiles(dataJson, classFileJson) {
    return ensureFolderWrite().then(function (ok) {
      if (!ok) return false;
      return Promise.all([
        writeNamedFile(DATA_FILE, dataJson),
        writeNamedFile(CLASS_FILE, classFileJson)
      ]).then(function (flags) { return !!(flags[0] && flags[1]); });
    });
  }

  function save(options) {
    if (savePaused) return true;
    if (!(options && (options.quiet || options.keepStamp))) archivePurgePersist = true;
    var classJson = JSON.stringify(state.classes);
    if (lastClassJson !== null && classJson !== lastClassJson) state.settings.classesSavedAt = new Date().toISOString();
    lastClassJson = classJson;
    if (!(options && options.keepStamp) || !state.settings.savedAt) {
      state.settings.savedAt = new Date().toISOString();
      state.settings.rev = (Number(state.settings.rev) || 0) + 1;
    }
    var dataJson = JSON.stringify(dataPayload());
    var classFileJson = JSON.stringify(classBookPayload());
    var snapshot = JSON.parse(dataJson);
    localRaw = snapshot;
    try {
      localStorage.setItem(STORAGE, dataJson);
    } catch (err) {
      toast('Không đủ chỗ lưu trên máy. Hãy bớt ảnh thông báo.');
      return false;
    }
    openLocalDb().then(function (db) {
      var tx = db.transaction('kv', 'readwrite');
      tx.objectStore('kv').put(JSON.parse(dataJson), 'state');
    }).catch(function () {});
    var quiet = options && options.quiet;
    var serial = ++folderSerial;
    if (!quiet) showSync('saving');
    folderWrite = folderWrite.then(function () {
      if (serial !== folderSerial) return false;
      return writeFrozenFiles(dataJson, classFileJson);
    }).then(function (ok) {
      if (serial !== folderSerial || quiet) return;
      if (ok) { showSync('confirmed'); return; }
      showSync('idle');
      if (!syncWarned) {
        syncWarned = true;
        toast('Đã lưu trên trình duyệt. Chưa ghi được file JSON trong thư mục. Hãy chọn thư mục Index local một lần để lần sau ghi thẳng và hiện confirmed.');
      }
    });
    return true;
  }

  function roleKey() {
    var role = ui.user && ui.user.role ? String(ui.user.role).toLowerCase() : '';
    if (role === 'admin' || role === 'commenter' || role === 'guest') return role;
    return ui.user ? 'guest' : '';
  }

  function canEdit() { return roleKey() === 'admin'; }
  function canMark() { return roleKey() === 'admin' || roleKey() === 'commenter'; }

  function defaultPerms(role) {
    var on = role === 'commenter';
    return { exportClasses: on, exportHomework: on, suggest: on };
  }

  function currentAccount() {
    if (!ui.user) return null;
    for (var i = 0; i < state.accounts.length; i++) {
      if (state.accounts[i].username === ui.user.username) return state.accounts[i];
    }
    return null;
  }

  function accountPerms(acc) {
    if (!acc) return defaultPerms('guest');
    if (acc.role === 'admin') return { exportClasses: true, exportHomework: true, suggest: true };
    var base = defaultPerms(acc.role);
    var stored = acc.perms || {};
    return {
      exportClasses: stored.exportClasses == null ? base.exportClasses : !!stored.exportClasses,
      exportHomework: stored.exportHomework == null ? base.exportHomework : !!stored.exportHomework,
      suggest: stored.suggest == null ? base.suggest : !!stored.suggest
    };
  }

  function canExportClasses() { return !!(currentAccount() && accountPerms(currentAccount()).exportClasses); }
  function canExportHomework() { return !!(currentAccount() && accountPerms(currentAccount()).exportHomework); }
  function canSuggest() { return !!(currentAccount() && accountPerms(currentAccount()).suggest); }

  function roleLabel(role) {
    if (role === 'admin') return 'ADMIN';
    if (role === 'commenter') return 'COMMENTER';
    return 'GUEST';
  }

  function deny(allowed) {
    if (allowed) return false;
    toast('Tài khoản này không có quyền thực hiện.');
    return true;
  }

  function primaryId(value) {
    return PRIMARY_IDS.indexOf(value) >= 0 ? value : 'ocean';
  }

  function paintAppearance() {
    state.settings.theme = state.settings.theme === 'night' ? 'night' : 'day';
    state.settings.primary = primaryId(state.settings.primary);
    applyAccountLook();
    paintThemeButtons();
  }

  function rememberLook(patch) {
    var acc = currentAccount();
    if (!acc) return;
    acc.appearance = normalizeAppearance(acc.appearance);
    Object.keys(patch).forEach(function (key) { acc.appearance[key] = patch[key]; });
    acc.appearance = normalizeAppearance(acc.appearance);
  }

  function applySkin(skin) {
    if (!ui.user) { toast('Đăng nhập để giữ giao diện cho tài khoản này.'); return; }
    rememberLook({ skin: SKIN_IDS.indexOf(skin) >= 0 ? skin : 'default' });
    paintAppearance();
    save();
  }

  function applyTheme(theme) {
    if (skinOf(currentAccount()) !== 'default') return;
    var next = theme === 'night' ? 'night' : 'day';
    if (ui.user) rememberLook({ theme: next });
    else state.settings.theme = next;
    paintAppearance();
    save();
  }

  function applyPrimary(id) {
    if (skinOf(currentAccount()) !== 'default') return;
    var next = primaryId(id);
    if (ui.user) rememberLook({ primary: next });
    else state.settings.primary = next;
    paintAppearance();
    save();
  }

  function paintThemeButtons() {
    var acc = currentAccount();
    var theme = acc && acc.appearance && acc.appearance.theme ? acc.appearance.theme : state.settings.theme;
    var primary = acc && acc.appearance && PRIMARY_IDS.indexOf(acc.appearance.primary) >= 0 ? acc.appearance.primary : state.settings.primary;
    document.querySelectorAll('[data-theme-btn]').forEach(function (btn) {
      var on = btn.getAttribute('data-theme') === theme;
      btn.classList.toggle('is-on', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    document.querySelectorAll('[data-primary-btn]').forEach(function (btn) {
      var on = btn.getAttribute('data-primary') === primary;
      btn.classList.toggle('is-on', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function paintTitles() {
    document.title = state.settings.title;
    document.querySelectorAll('[data-app-title]').forEach(function (el) {
      el.textContent = state.settings.title;
    });
  }

  function paintClock() {
    var now = new Date();
    var map = {
      weekday: L.weekdayName(now),
      date: L.formatDMY(now),
      time: L.formatAmPm(now, false),
      'time-sec': L.formatAmPm(now, true)
    };
    document.querySelectorAll('[data-live]').forEach(function (el) {
      var key = el.getAttribute('data-live');
      if (map[key]) el.textContent = map[key];
    });
    document.querySelectorAll('[data-age-for]').forEach(function (el) {
      var raw = el.getAttribute('data-age-for') || '';
      if (raw === '?' || raw === '-') { el.textContent = raw; return; }
      if (/^\d{4}$/.test(raw)) { el.textContent = '-'; return; }
      var age = L.ageOf(raw, now);
      el.textContent = age == null ? '—' : String(age);
    });
    var stamp = L.monthKey(now) + '-' + now.getDate();
    if (lastDay && stamp !== lastDay && ui.user && !busy()) render();
    lastDay = stamp;
    paintGateClocks();
  }

  function toast(message, ms) {
    enqueueToast(message, ms || 4200);
  }

  function enqueueToast(message, ms) {
    if (!message) return;
    toastQueue.push({ message: message, ms: ms || 4200 });
    playToast();
  }

  function playToast() {
    if (toastPlaying || !toastQueue.length) return;
    var item = toastQueue.shift();
    var el = document.getElementById('toast');
    if (!el) return;
    toastPlaying = true;
    el.textContent = item.message;
    el.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.classList.add('hidden');
      toastPlaying = false;
      playToast();
    }, item.ms);
  }

  function normalizeAppearance(raw) {
    var look = raw && typeof raw === 'object' ? raw : {};
    var skin = SKIN_IDS.indexOf(look.skin) >= 0 ? look.skin : 'default';
    var theme = look.theme === 'night' ? 'night' : 'day';
    var primary = PRIMARY_IDS.indexOf(look.primary) >= 0 ? look.primary : '';
    return { skin: skin, theme: theme, primary: primary };
  }

  function normalizeTasks(list) {
    return (Array.isArray(list) ? list : []).filter(function (item) {
      return item && typeof item === 'object' && item.id && item.type;
    }).map(function (item) {
      var status = item.status === 'done' || item.status === 'rejected' ? item.status : 'open';
      return {
        id: String(item.id),
        type: String(item.type),
        status: status,
        createdAt: item.createdAt || new Date().toISOString(),
        updatedAt: item.updatedAt || item.createdAt || new Date().toISOString(),
        actedAt: item.actedAt || '',
        month: String(item.month || '').slice(0, 7),
        fromUser: String(item.fromUser || ''),
        fromName: String(item.fromName || ''),
        toUser: String(item.toUser || ''),
        toName: String(item.toName || ''),
        summary: String(item.summary || ''),
        reason: String(item.reason || ''),
        rejectReason: String(item.rejectReason || ''),
        studentId: String(item.studentId || ''),
        studentName: String(item.studentName || ''),
        fromClassId: String(item.fromClassId || ''),
        fromClassName: String(item.fromClassName || ''),
        toClassId: String(item.toClassId || ''),
        toClassName: String(item.toClassName || ''),
        draft: item.draft && typeof item.draft === 'object' ? {
          name: String(item.draft.name || ''),
          dob: String(item.draft.dob || ''),
          englishName: String(item.draft.englishName || ''),
          phone: String(item.draft.phone || ''),
          ec: String(item.draft.ec || '')
        } : null
      };
    });
  }

  function normalizeActivity(list) {
    return (Array.isArray(list) ? list : []).filter(function (item) {
      return item && item.id && item.text;
    }).map(function (item) {
      return {
        id: String(item.id),
        at: item.at || new Date().toISOString(),
        actor: String(item.actor || ''),
        text: String(item.text || ''),
        aboutUser: String(item.aboutUser || '')
      };
    });
  }

  function mergeAccounts(local, incoming, newer) {
    function keyOf(acc) { return String(acc && acc.username || '').trim(); }
    var inc = {};
    (incoming || []).forEach(function (acc) {
      var key = keyOf(acc);
      if (key) inc[key] = acc;
    });
    var seen = {};
    var out = [];
    (local || []).forEach(function (acc) {
      var key = keyOf(acc);
      if (!key || seen[key]) return;
      seen[key] = true;
      var other = inc[key];
      if (newer && other) {
        if (other.role !== 'guest' && !other.password && acc.password) other.password = acc.password;
        if (!other.ack && acc.ack) other.ack = acc.ack;
        out.push(other);
      } else out.push(acc);
    });
    if (newer) {
      (incoming || []).forEach(function (acc) {
        var key = keyOf(acc);
        if (!key || seen[key]) return;
        seen[key] = true;
        out.push(acc);
      });
    }
    return out.filter(function (acc) { return acc && acc.username; });
  }

  function plainName(value) {
    return String(value || '').split('(')[0].trim().toLowerCase().replace(/\s+/g, ' ');
  }

  function isCmOf(acc, cls) {
    if (!acc || !cls || !cls.cm) return false;
    var cm = plainName(cls.cm);
    var name = plainName(acc.name);
    return !!cm && cm === name;
  }

  function todayKey(now) {
    return L.isoDay(now || new Date());
  }

  function taskTypeLabel(type) {
    if (type === 'transfer') return 'Chuyển lớp';
    if (type === 'add') return 'Thêm học viên';
    if (type === 'other') return 'Khác';
    return 'Đề xuất';
  }

  function logAction() {}

  function playUnseenActivity() {}

  function accountByUsername(username) {
    var key = String(username || '').trim();
    for (var i = 0; i < state.accounts.length; i++) {
      if (String(state.accounts[i].username || '').trim() === key) return state.accounts[i];
    }
    return null;
  }

  function popupItems(now) {
    var acc = currentAccount();
    if (!acc || !ui.user) return [];
    var when = now || new Date();
    var today = todayKey(when);
    var items = [];
    state.classes.forEach(function (cls) {
      if (!isCmOf(acc, cls)) return;
      var progress = L.progressOf(cls, when);
      if (progress.end && !progress.open) {
        var end = new Date(progress.end.getTime());
        end.setHours(23, 59, 59, 999);
        var lead = end.getTime() - when.getTime();
        if (lead >= 0 && lead <= 7 * 86400000) {
          items.push({
            id: 'level:' + cls.id + ':' + L.isoDay(end),
            kind: 'level',
            title: L.currentName(cls) + ' sắp hết trình độ',
            text: 'Đếm ngược tới hết ngày buổi cuối.',
            until: end.toISOString(),
            createdAt: new Date(end.getTime() - 7 * 86400000).toISOString()
          });
        }
      }
      (cls.students || []).forEach(function (stu) {
        if (!stu || stu.status !== 'stopped') return;
        var phase = L.studentPhase(cls, stu, when);
        if (phase.kind === 'archive') return;
        items.push({
          id: 'stop:' + cls.id + ':' + stu.id,
          kind: 'stopped',
          title: 'Học viên dừng · ' + L.currentName(cls),
          text: (stu.name || 'Học viên') + (phase.reason ? ' · ' + phase.reason : ''),
          until: phase.until ? phase.until.toISOString() : '',
          createdAt: stu.stoppedAt || when.toISOString()
        });
      });
    });
    (state.exams || []).forEach(function (exam) {
      var dates = exam.examDates && exam.examDates.length ? exam.examDates : [];
      (exam.entries || []).forEach(function (entry) {
        var entryDates = entry.examDates && entry.examDates.length ? entry.examDates : (entry.examDate ? [entry.examDate] : dates);
        var cls = findClass(entry.classId);
        if (!cls || !isCmOf(acc, cls)) return;
        entryDates.forEach(function (iso) {
          var day = L.parseDateInput(iso);
          if (!day) return;
          var end = new Date(day.getTime());
          end.setHours(23, 59, 59, 999);
          var lead = end.getTime() - when.getTime();
          if (lead < 0 || lead > 2 * 86400000) return;
          items.push({
            id: 'exam:' + exam.id + ':' + entry.classId + ':' + L.isoDay(day),
            kind: 'exam',
            title: 'Lịch thi · ' + (exam.name || 'Kỳ thi'),
            text: L.currentName(cls) + ' · ' + L.formatDMY(day),
            until: end.toISOString(),
            createdAt: exam.createdAt || new Date(end.getTime() - 2 * 86400000).toISOString()
          });
        });
      });
    });
    return items.filter(function (item) {
      var mark = acc.ack && acc.ack[item.id];
      if (!mark) return true;
      if (mark === 'keep') return false;
      return mark !== today;
    });
  }

  function ackItem(id, mode) {
    var acc = currentAccount();
    if (!acc) return;
    if (!acc.ack) acc.ack = {};
    acc.ack[id] = mode || todayKey(new Date());
  }

  function paintGate() {
    var box = document.getElementById('gatebox');
    if (!box) return;
    var now = new Date();
    var items = ui.user ? popupItems(now) : [];
    var acc = currentAccount();
    if (!items.length || !acc) {
      box.classList.add('hidden');
      box.innerHTML = '';
      return;
    }
    var primed = !!acc.popupPrimed;
    var startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    var cards = items.map(function (item) {
      var clock = item.until ? '<span class="gate-clock" data-until="' + esc(item.until) + '">' + esc(L.countdownLabel(item.until, now)) + '</span>' : '';
      var warn = item.warn ? '<p class="gate-warn">Đề xuất này chưa được xác nhận hoặc thực hiện từ 3 ngày trở lên.</p>' : '';
      return '<article class="gate-card"><div class="gate-top"><h3>' + esc(item.title) + '</h3>' + clock + '</div><p>' + esc(item.text) + '</p>' + warn +
        '<button type="button" class="btn btn-primary" data-act="gate-confirm" data-id="' + esc(item.id) + '">Confirm</button></article>';
    }).join('');
    var bulk = primed
      ? '<label class="checkline"><input type="checkbox" id="gate-all-old"> Confirm toàn bộ thông tin cũ</label><button type="button" class="btn" data-act="gate-confirm-old">Xác nhận thông tin cũ</button>'
      : '';
    box.classList.remove('hidden');
    box.innerHTML = '<div class="gate-card-wrap" data-stop><h2>Việc cần xác nhận</h2><p class="help">Danh sách hiện một lần trong ngày. Confirm từng mục. Khi hết mục, sổ tay mới dùng tiếp.</p>' + cards + bulk + '</div>';
    box.dataset.today = todayKey(now);
    box.dataset.old = String(startToday);
  }

  function paintGateClocks() {
    var box = document.getElementById('gatebox');
    if (!box || box.classList.contains('hidden')) return;
    var now = new Date();
    box.querySelectorAll('[data-until]').forEach(function (el) {
      el.textContent = L.countdownLabel(el.getAttribute('data-until'), now);
    });
  }

  function finishGateIfClear() {
    var acc = currentAccount();
    if (!acc) return;
    if (popupItems(new Date()).length) {
      save({ quiet: true });
      paintGate();
      return;
    }
    acc.popupDay = todayKey(new Date());
    acc.popupClosedAt = new Date().toISOString();
    acc.popupPrimed = true;
    var box = document.getElementById('gatebox');
    if (box) { box.classList.add('hidden'); box.innerHTML = ''; }
    save({ quiet: true });
  }

  function confirmGate(id) {
    ackItem(id, todayKey(new Date()));
    finishGateIfClear();
  }

  function confirmOldGate() {
    var box = document.getElementById('gate-all-old');
    if (!box || !box.checked) { toast('Hãy tick Confirm toàn bộ thông tin cũ.'); return; }
    var start = new Date();
    start.setHours(0, 0, 0, 0);
    popupItems(new Date()).forEach(function (item) {
      if (new Date(item.createdAt).getTime() < start.getTime()) ackItem(item.id, 'keep');
    });
    finishGateIfClear();
  }

  function paintNotices() {
    var box = document.getElementById('noticebox');
    if (!box || box.classList.contains('hidden')) return;
    var month = ui.noticeMonth || ui.boardMonth || L.monthKey(new Date());
    ui.noticeMonth = month;
    var items = state.announcements.filter(function (item) { return item && item.kind !== 'post' && item.month === month; }).slice().reverse();
    var body = items.length ? items.map(function (item) {
      return '<article class="notice-row"><p>' + esc(item.text || '') + '</p><small>' + esc(feedWhen(item)) + '</small></article>';
    }).join('') : '<p class="muted">Chưa có thông báo data trong tháng này.</p>';
    box.innerHTML = '<div class="notice-card" data-stop><div class="mail-head"><h2>Thông báo data</h2><button type="button" class="icon-x" data-act="notice-close" aria-label="Đóng">X</button></div>' +
      '<label class="field"><span>Tháng</span><input id="notice-month" type="month" value="' + esc(month) + '"></label>' + body + '</div>';
  }

  function paintDesk() {
    if (!ui.user) {
      var gate = document.getElementById('gatebox');
      if (gate) { gate.classList.add('hidden'); gate.innerHTML = ''; }
      return;
    }
    paintNotices();
    paintGateClocks();
  }

  function skinOf(acc) {
    var look = acc && acc.appearance;
    if (look && SKIN_IDS.indexOf(look.skin) >= 0) return look.skin;
    return 'default';
  }

  function applyAccountLook() {
    var acc = currentAccount();
    var root = document.documentElement;
    var skin = skinOf(acc);
    root.setAttribute('data-skin', skin);
    var theme = state.settings.theme === 'night' ? 'night' : 'day';
    var primary = PRIMARY_IDS.indexOf(state.settings.primary) >= 0 ? state.settings.primary : 'ocean';
    if (acc && acc.appearance && skin === 'default') {
      if (acc.appearance.theme) theme = acc.appearance.theme === 'night' ? 'night' : 'day';
      if (PRIMARY_IDS.indexOf(acc.appearance.primary) >= 0) primary = acc.appearance.primary;
    }
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-primary', primary);
    var look = document.getElementById('default-look');
    if (look) look.hidden = skin !== 'default';
    document.querySelectorAll('[data-skin-btn]').forEach(function (btn) {
      var on = btn.getAttribute('data-skin') === skin;
      btn.classList.toggle('is-on', on);
    });
  }

  function wait(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  function busy() {
    return !!ui.modal || ui.detailEdit;
  }

  async function showLoaderThen(work) {
    if (loading) return null;
    loading = true;
    document.getElementById('loader').classList.remove('hidden');
    await wait(70);
    var result = null;
    try { result = work ? work() : null; } catch (err) { console.error(err); }
    await wait(760);
    document.getElementById('loader').classList.add('hidden');
    loading = false;
    render();
    return result;
  }

  function findClass(id) {
    for (var i = 0; i < state.classes.length; i++) if (state.classes[i].id === id) return state.classes[i];
    return null;
  }

  function findStudent(id) {
    for (var i = 0; i < state.classes.length; i++) {
      var list = state.classes[i].students;
      for (var s = 0; s < list.length; s++) if (list[s].id === id) return { cls: state.classes[i], stu: list[s] };
    }
    return null;
  }

  function selectedIds() {
    return Object.keys(ui.selected).filter(function (id) { return ui.selected[id]; });
  }

  function iconClass() {
    return '<svg class="pixel-icon" viewBox="0 0 16 16" aria-hidden="true" shape-rendering="crispEdges">' +
      '<rect fill="#e2b007" x="1" y="4" width="14" height="10"/>' +
      '<rect fill="#fff6d8" x="2" y="6" width="12" height="7"/>' +
      '<rect fill="#e2b007" x="1" y="2" width="6" height="3"/>' +
      '<rect fill="#1a73e8" x="4" y="8" width="2" height="2"/>' +
      '<rect fill="#e11d2e" x="7" y="8" width="2" height="2"/>' +
      '<rect fill="#ef8a1a" x="10" y="8" width="2" height="2"/>' +
      '</svg>';
  }

  function iconHw() {
    return '<svg class="pixel-icon" viewBox="0 0 16 16" aria-hidden="true" shape-rendering="crispEdges">' +
      '<rect fill="#f7fbff" x="2" y="1" width="12" height="14"/>' +
      '<rect fill="#0c4a72" x="2" y="1" width="12" height="2"/>' +
      '<rect fill="#1f9d55" x="4" y="5" width="2" height="2"/>' +
      '<rect fill="#d90429" x="4" y="8" width="2" height="2"/>' +
      '<rect fill="#ef8a1a" x="4" y="11" width="2" height="2"/>' +
      '<rect fill="#0c4a72" x="7" y="5" width="5" height="2"/>' +
      '<rect fill="#0c4a72" x="7" y="8" width="5" height="2"/>' +
      '<rect fill="#0c4a72" x="7" y="11" width="5" height="2"/>' +
      '</svg>';
  }

  function iconCal() {
    return '<svg class="pixel-icon" viewBox="0 0 16 16" aria-hidden="true" shape-rendering="crispEdges">' +
      '<rect fill="#0c4a72" x="1" y="2" width="14" height="13"/>' +
      '<rect fill="#f7fbff" x="2" y="5" width="12" height="9"/>' +
      '<rect fill="#d90429" x="2" y="5" width="12" height="2"/>' +
      '<rect fill="#0c4a72" x="4" y="1" width="2" height="3"/>' +
      '<rect fill="#0c4a72" x="10" y="1" width="2" height="3"/>' +
      '<rect fill="#1578b8" x="3" y="8" width="2" height="2"/>' +
      '<rect fill="#1578b8" x="7" y="8" width="2" height="2"/>' +
      '<rect fill="#1578b8" x="11" y="8" width="2" height="2"/>' +
      '<rect fill="#1578b8" x="3" y="11" width="2" height="2"/>' +
      '</svg>';
  }

  function gearSvg() {
    return '<svg width="18" height="18" viewBox="0 0 16 16" aria-hidden="true" shape-rendering="crispEdges"><rect fill="currentColor" x="6" y="1" width="4" height="3"/><rect fill="currentColor" x="6" y="12" width="4" height="3"/><rect fill="currentColor" x="1" y="6" width="3" height="4"/><rect fill="currentColor" x="12" y="6" width="3" height="4"/><rect fill="currentColor" x="5" y="5" width="6" height="6"/></svg>';
  }

  function boardHtml() {
    var month = ui.boardMonth || L.monthKey(new Date());
    ui.boardMonth = month;
    var items = state.announcements.filter(function (item) { return item.month === month; });
    var body;
    if (!items.length) {
      body = '<p class="marquee-empty">Chưa có thông báo trong tháng này.</p>';
    } else {
      var lines = items.map(function (item) { return '<p>' + esc(item.text) + '</p>'; }).join('');
      var seconds = Math.max(28, items.length * 7);
      body = '<div class="board-roll"><div class="board-roll-track" style="animation-duration:' + seconds + 's">' + lines + lines + '</div></div>';
    }
    return '<section class="board" aria-label="Bảng thông báo theo tháng">' +
      '<div class="board-head"><span>Bảng thông báo · ' + esc(L.monthLabel(month)) + '</span>' +
      '<span class="tool-row"><button type="button" class="icon-btn" data-act="open-notices" aria-label="Xem đủ thông báo data">☰</button>' +
      '<button type="button" class="icon-btn" data-act="board-shift" data-dir="-1" aria-label="Tháng trước">‹</button>' +
      '<button type="button" class="icon-btn" data-act="board-shift" data-dir="1" aria-label="Tháng sau">›</button></span></div>' +
      body + '</section>';
  }

  function clockButton() {
    return '<button type="button" class="clock-btn" data-act="open-clock" aria-label="Mở hộp thoại ngày giờ">' +
      '<span data-live="date">—</span><strong data-live="time">—</strong></button>';
  }

  function toolButtons() {
    return '<div class="tool-row">' + clockButton() +
      '<button type="button" class="icon-btn" data-act="open-settings" aria-label="Cài đặt">' + gearSvg() + '</button>' +
      (ui.user ? '<button type="button" class="btn" data-act="logout">Đăng xuất</button>' : '') +
      '</div>';
  }

  function viewLogin() {
    return '<div class="wrap">' +
      '<div class="login-tools">' + toolButtons() + '</div>' +
      '<div class="brand"><img class="logo-bob" src="Token.png" alt="Ocean EDU">' +
      '<h1 data-app-title>' + esc(state.settings.title) + '</h1>' +
      '<p class="sub">Sổ quản lý lớp và học viên</p></div>' +
      boardHtml() +
      '<form class="login-card' + (ui.loginError ? ' shake' : '') + '" id="login-form">' +
      '<h2>Đăng nhập nhân sự</h2>' +
      '<label class="field"><span>Username</span><input name="username" autocomplete="username" required></label>' +
      '<label class="field"><span>Mật khẩu</span><input name="password" type="password" autocomplete="current-password"></label>' +
      '<p class="help">Admin và Commenter nhập mật khẩu. Guest chỉ điền Username và để trống mật khẩu.</p>' +
      '<p class="form-error" role="alert">' + esc(ui.loginError) + '</p>' +
      '<button class="btn btn-primary" type="submit">Đăng nhập</button></form></div>';
  }

  function shell(inner) {
    var role = roleKey();
    return '<div class="wrap"><header class="topbar"><div class="hello role-' + role + '"><span class="role">' + roleLabel(role) + '</span><span>Xin chào ' +
      esc(ui.user.name) + '</span></div>' + toolButtons() + '</header>' +
      boardHtml() + inner + saveBar() + '</div>';
  }

  function saveBar() {
    var when = 'Chưa ghi nhận';
    if (state.settings.savedAt) {
      var at = new Date(state.settings.savedAt);
      when = L.formatDMY(at) + ' ' + L.formatAmPm(at);
    }
    return '<div class="savebar"><span>Data được cập nhật lần cuối: ' + esc(when) + '</span>' +
      '<button type="button" class="btn btn-danger" data-act="request-update">Yêu cầu cập nhật</button></div>';
  }

  function currentWeekStats(filter) {
    var now = new Date();
    return L.weekStats(state.classes, L.weekMonday(now), now, filter || null);
  }

  function summaryHtml(stats, fetName) {
    var fet = '';
    if (fetName) {
      fet = '<div class="stat fet-card"><b>FET · ' + esc(fetName) + '</b><span>' + stats.sessionCount +
        ' buổi dạy trong tuần đang xem</span><span>' + esc(L.formatHours(stats.minutes)) + '</span></div>';
    }
    return '<div class="stat-grid summary-grid"><div class="stat"><b>Số lớp hiện tại</b>' + stats.classCount +
      '</div><div class="stat"><b>Tổng buổi trong tuần</b>' + stats.sessionCount + '</div>' + fet + '</div>';
  }

  function dashMonthKey() {
    return ui.dashMonth || L.monthKey(new Date());
  }

  function dashChartSvg(series) {
    var w = 680;
    var h = 240;
    var padL = 40;
    var padR = 16;
    var padT = 22;
    var padB = 42;
    var max = 1;
    series.forEach(function (point) { if (point.count > max) max = point.count; });
    var innerW = w - padL - padR;
    var innerH = h - padT - padB;
    var pts = series.map(function (point, index) {
      var x = series.length === 1 ? padL + innerW / 2 : padL + innerW * index / (series.length - 1);
      var y = padT + innerH - (point.count / max) * innerH;
      return { x: x, y: y, point: point };
    });
    var d = pts.map(function (pt, index) {
      return (index ? 'L' : 'M') + pt.x.toFixed(1) + ' ' + pt.y.toFixed(1);
    }).join(' ');
    var last = series.length - 1;
    var step = series.length > 10 ? 2 : 1;
    var labels = pts.map(function (pt, index) {
      if (index !== last && index % step !== 0) return '';
      var parts = String(pt.point.key).split('-');
      var text = parts[1] + '/' + String(parts[0]).slice(2);
      return '<text x="' + pt.x.toFixed(1) + '" y="' + (h - 14) + '" text-anchor="middle">' + esc(text) + '</text>';
    }).join('');
    var dots = pts.map(function (pt) {
      return '<circle cx="' + pt.x.toFixed(1) + '" cy="' + pt.y.toFixed(1) + '" r="4"><title>' +
        esc(L.monthLabel(pt.point.key) + ': ' + pt.point.count) + '</title></circle>' +
        '<text x="' + pt.x.toFixed(1) + '" y="' + Math.max(14, pt.y - 8).toFixed(1) + '" text-anchor="middle">' + pt.point.count + '</text>';
    }).join('');
    return '<svg class="dash-chart" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="Biểu đồ học viên chính thức theo tháng">' +
      '<line x1="' + padL + '" y1="' + (padT + innerH) + '" x2="' + (w - padR) + '" y2="' + (padT + innerH) + '"></line>' +
      '<text x="6" y="' + (padT + 8) + '">' + max + '</text>' +
      '<path d="' + d + '" fill="none"></path>' + dots + labels + '</svg>';
  }

  function loadNames(rows) {
    if (!rows.length) return '<p class="muted">Không có lớp.</p>';
    return '<ul class="load-list">' + rows.map(function (row) {
      return '<li>' + esc(row.name) + ' · ' + row.count + '</li>';
    }).join('') + '</ul>';
  }

  function dashboardHtml() {
    var month = dashMonthKey();
    var series = L.officialJoinSeries(state.classes, state.archive, new Date());
    var counts = L.monthHeadcount(state.classes, state.archive, month, new Date());
    var load = L.classLoad(state.classes, new Date());
    return '<section class="dash-board"><h2>Bảng data</h2>' +
      '<p class="help">Đường biểu đồ đếm học viên chính thức được thêm vào nhóm theo tháng. Không tính học viên đã xóa vĩnh viễn. Học viên vào lại lớp được tính ở tháng vào lại.</p>' +
      dashChartSvg(series) +
      '<label class="field dash-month"><span>Tháng xem chỉ số</span><input id="dash-month" type="month" value="' + esc(month) + '"></label>' +
      '<div class="table-wrap dash-wrap"><table class="dash-table"><thead><tr><th>Trial</th><th>Chính thức</th><th>Dừng học</th><th>Học bổng</th></tr></thead><tbody><tr>' +
      '<td>' + counts.trial + '</td><td>' + counts.official + '</td><td>' + counts.stopped + '</td><td>' + counts.scholarship + '</td>' +
      '</tr></tbody></table></div>' +
      '<h3>Sĩ số các lớp</h3>' +
      '<div class="table-wrap dash-wrap"><table class="load-table"><thead><tr>' +
      '<th>Ít học viên (dưới 15)</th><th>Ổn định (15–17)</th><th>Quá tải (trên 17)</th></tr></thead><tbody><tr>' +
      '<td>' + loadNames(load.low) + '</td><td>' + loadNames(load.steady) + '</td><td>' + loadNames(load.high) + '</td>' +
      '</tr></tbody></table></div></section>';
  }

  function viewMenu() {
    var stats = currentWeekStats(null);
    return shell(summaryHtml(stats) + dashboardHtml() +
      '<details class="menu-fold"><summary>Menu chính A–H</summary><section class="menu-grid">' +
      '<button type="button" class="menu-card" data-act="nav" data-screen="classes">' + iconClass() +
      '<div class="kicker">A · CLASS INFOS</div><h2>Quản lý lớp</h2>' +
      '<p>Lớp, học viên, sĩ số. Nút xem chuyên cần nằm trên từng thẻ.</p></button>' +
      '<button type="button" class="menu-card" data-act="nav" data-screen="schedule">' + iconCal() +
      '<div class="kicker">B · TIMETABLE</div><h2>Lịch các lớp</h2>' +
      '<p>Một bảng sáng, chiều, tối. Lọc FET, CM, TA.</p></button>' +
      '<button type="button" class="menu-card" data-act="nav" data-screen="homework">' + iconHw() +
      '<div class="kicker">C · HOMEWORK</div><h2>Theo dõi chuyên cần</h2>' +
      '<p>Chuyên cần theo buổi trong tháng.</p></button>' +
      '<button type="button" class="menu-card" data-act="nav" data-screen="feed">' + iconFeed() +
      '<div class="kicker">D · BOARD</div><h2>Thông báo và đề xuất</h2>' +
      '<p>Thông báo nhân sự và đề xuất.</p></button>' +
      '<button type="button" class="menu-card" data-act="nav" data-screen="archive">' + iconArchive() +
      '<div class="kicker">E · STUDENT ARCHIVE</div><h2>Thư viện học viên</h2>' +
      '<p>Official đang học. Học viên cũ/kết thúc đã dừng hoặc hết hạn.</p></button>' +
      '<button type="button" class="menu-card" data-act="nav" data-screen="curriculum">' + iconBook() +
      '<div class="kicker">F · CURRICULUM</div><h2>Xác nhận giáo trình</h2>' +
      '<p>Giáo trình, mua sách và tài khoản PEC.</p></button>' +
      '<button type="button" class="menu-card" data-act="nav" data-screen="exam">' + iconExam() +
      '<div class="kicker">G · EXAM</div><h2>Kỳ thi</h2>' +
      '<p>Chọn ngày trên lịch tháng, xem lịch thi theo tuần.</p></button>' +
      '<button type="button" class="menu-card" data-act="nav" data-screen="staff">' + iconStaff() +
      '<div class="kicker">H · TEACHER HOURS</div><h2>Công giáo viên</h2>' +
      '<p>Giờ Teaching và giờ SOA của từng FET.</p></button></section></details>');
  }

  function iconBook() {
    return '<svg class="pixel-icon" viewBox="0 0 16 16" aria-hidden="true" shape-rendering="crispEdges">' +
      '<rect fill="#0c4a72" x="2" y="2" width="12" height="12"/>' +
      '<rect fill="#fff6d8" x="4" y="3" width="8" height="10"/>' +
      '<rect fill="#e2b007" x="7" y="3" width="2" height="10"/>' +
      '</svg>';
  }

  function iconExam() {
    return '<svg class="pixel-icon" viewBox="0 0 16 16" aria-hidden="true" shape-rendering="crispEdges">' +
      '<rect fill="#0c4a72" x="2" y="1" width="12" height="14"/>' +
      '<rect fill="#fff6d8" x="4" y="3" width="8" height="10"/>' +
      '<rect fill="#15803d" x="5" y="5" width="6" height="2"/>' +
      '<rect fill="#15803d" x="5" y="9" width="4" height="2"/>' +
      '</svg>';
  }

  function iconStaff() {
    return '<svg class="pixel-icon" viewBox="0 0 16 16" aria-hidden="true" shape-rendering="crispEdges">' +
      '<rect fill="#e2b007" x="6" y="1" width="4" height="4"/>' +
      '<rect fill="#0c4a72" x="4" y="6" width="8" height="6"/>' +
      '<rect fill="#15803d" x="2" y="13" width="12" height="2"/>' +
      '</svg>';
  }

  function iconLock() {
    return '<svg class="pixel-icon" viewBox="0 0 16 16" aria-hidden="true" shape-rendering="crispEdges">' +
      '<rect fill="#0c4a72" x="4" y="7" width="8" height="7"/>' +
      '<rect fill="#e2b007" x="5" y="2" width="6" height="6"/>' +
      '<rect fill="transparent" stroke="#0c4a72" x="6" y="3" width="4" height="4"/>' +
      '<rect fill="#fff6d8" x="7" y="9" width="2" height="3"/>' +
      '</svg>';
  }

  function findExam(id) {
    var found = null;
    (state.exams || []).forEach(function (item) { if (item && item.id === id) found = item; });
    return found;
  }

  function slotLabel(dow, start, end) {
    var day = L.DAYS.filter(function (item) { return item.dow === Number(dow); })[0];
    if (!start && !end) return 'Chưa chọn lịch';
    return (day ? day.short + ' ' : '') + L.formatTimeValue(start) + '–' + L.formatTimeValue(end);
  }

  function examDatesOf(bag) {
    if (!bag || typeof bag !== 'object' || Array.isArray(bag)) return [];
    return Object.keys(bag).filter(function (iso) {
      return bag[iso] && /^\d{4}-\d{2}-\d{2}$/.test(iso);
    }).sort();
  }

  function slotForExamDates(cls, isos) {
    var empty = { dow: '', start: '', end: '' };
    if (!cls || !isos || !isos.length) return empty;
    var picked = {};
    var months = {};
    isos.forEach(function (iso) {
      picked[iso] = true;
      months[iso.slice(0, 7)] = true;
    });
    var sessions = [];
    Object.keys(months).sort().forEach(function (key) {
      sessions = sessions.concat(L.monthSessions(cls, key));
    });
    sessions.sort(function (a, b) { return a.date - b.date; });
    for (var i = 0; i < sessions.length; i++) {
      if (picked[sessions[i].iso]) {
        return { dow: sessions[i].dow, start: sessions[i].start || '', end: sessions[i].end || '' };
      }
    }
    return empty;
  }

  function examCalendar(cls, month, selected) {
    var range = L.monthRange(month);
    var gridStart = L.weekMonday(range.start);
    var sessions = {};
    L.monthSessions(cls, month).forEach(function (ses) {
      if (!sessions[ses.iso]) sessions[ses.iso] = [];
      sessions[ses.iso].push(L.formatTimeValue(ses.start) + '–' + L.formatTimeValue(ses.end));
    });
    var heads = L.DAYS.map(function (day) { return '<span>' + esc(day.short) + '</span>'; }).join('');
    var cells = '';
    for (var i = 0; i < 42; i++) {
      var day = L.addDays(gridStart, i);
      var iso = L.isoDay(day);
      var inMonth = day.getMonth() === range.start.getMonth() && day.getFullYear() === range.start.getFullYear();
      if (!inMonth) {
        cells += '<span class="exam-day is-out">' + day.getDate() + '</span>';
        continue;
      }
      var times = sessions[iso];
      var on = selected && selected[iso];
      var title = times ? 'Có lịch học ' + times.join(', ') : '';
      cells += '<button type="button" class="exam-day' + (times ? ' is-session' : '') + (on ? ' is-exam' : '') + '" data-act="exam-day" data-class="' + esc(cls.id) + '" data-iso="' + esc(iso) + '"' +
        (title ? ' title="' + esc(title) + '"' : '') + '>' + day.getDate() + '</button>';
    }
    return '<section class="exam-cal-card"><h3>' + esc(L.currentName(cls)) + '</h3>' +
      '<div class="exam-cal-head">' + heads + '</div><div class="exam-cal">' + cells + '</div></section>';
  }

  function readExamWizardDom() {
    var w = ui.examWizard;
    if (!w) return;
    if (!w.dates || typeof w.dates !== 'object') w.dates = {};
    var name = document.getElementById('exam-name');
    var type = document.getElementById('exam-type');
    if (name) w.name = name.value;
    if (type) w.type = type.value === 'pick' ? 'pick' : 'class';
    var from = document.getElementById('exam-age-from');
    var to = document.getElementById('exam-age-to');
    if (from) w.ageFrom = from.value.trim();
    if (to) w.ageTo = to.value.trim();
    document.querySelectorAll('[data-exam-class]').forEach(function (box) {
      var id = box.getAttribute('data-exam-class');
      if (box.checked) w.classIds[id] = true;
      else delete w.classIds[id];
    });
  }

  function commitExam() {
    var w = ui.examWizard;
    if (!w) return;
    var ids = Object.keys(w.classIds);
    var entries = [];
    for (var i = 0; i < ids.length; i++) {
      var cls = findClass(ids[i]);
      if (!cls) {
        ui.formError = 'Không thấy một lớp đã chọn.';
        render();
        return;
      }
      var dates = examDatesOf(w.dates[ids[i]]);
      if (!dates.length) {
        ui.formError = 'Chọn ít nhất một ngày thi cho từng lớp.';
        render();
        return;
      }
      var slot = slotForExamDates(cls, dates);
      entries.push({
        classId: cls.id,
        className: L.currentName(cls),
        slotDow: slot.start ? Number(slot.dow) : '',
        slotStart: slot.start || '',
        slotEnd: slot.end || '',
        examDate: dates[0],
        examDates: dates,
        students: L.examCandidates(cls, {
          ageFrom: w.type === 'pick' ? w.ageFrom : '',
          ageTo: w.type === 'pick' ? w.ageTo : '',
          now: new Date()
        })
      });
    }
    if (!state.exams) state.exams = [];
    var examId = L.uid();
    state.exams.push({
      id: examId,
      name: String(w.name || '').trim(),
      type: w.type === 'pick' ? 'pick' : 'class',
      ageFrom: w.type === 'pick' ? String(w.ageFrom || '') : '',
      ageTo: w.type === 'pick' ? String(w.ageTo || '') : '',
      createdAt: new Date().toISOString(),
      entries: entries
    });
    examsSeen = true;
    logAction('tạo lịch, tổ chức buổi thi ' + String(w.name || '').trim());
    ui.examWizard = null;
    ui.examId = examId;
    ui.examWeek = '';
    ui.formError = '';
    save();
    toast('Đã tạo đợt thi.');
    render();
  }

  function examListView() {
    var exams = state.exams || [];
    var cards = exams.length ? exams.map(function (exam) {
      var n = 0;
      (exam.entries || []).forEach(function (entry) { n += (entry.students || []).length; });
      return '<button type="button" class="folder group-ielts" data-act="open-exam" data-id="' + esc(exam.id) + '">' +
        '<strong>' + esc(exam.name) + '</strong>' +
        '<span>' + (exam.type === 'pick' ? 'Chọn lọc' : 'Theo lớp') + '</span>' +
        '<span>' + (exam.entries || []).length + ' lớp · ' + n + ' học viên</span></button>';
    }).join('') : '<p class="muted">Chưa có đợt thi.</p>';
    return shell('<div class="section-head"><div><button type="button" class="btn" data-act="nav" data-screen="menu">← Menu</button>' +
      '<h2>Kỳ thi</h2><p class="meta">Mục G</p></div><div class="btn-row">' +
      (canEdit() ? '<button type="button" class="btn btn-primary" data-act="exam-create">+ Tạo đợt thi</button>' : '') +
      '</div></div>' +
      '<p class="help">Mỗi đợt thi là một thư mục. Theo lớp lấy học viên chính thức và trial của các lớp được chọn. Chọn lọc thêm khoảng tuổi. Ngày thi chọn trên lịch tháng, có thể nhiều ngày. Học bổng và học viên không thuộc hai nhóm đó được thêm sau bằng Thêm học viên test.</p>' +
      '<div class="folder-grid">' + cards + '</div>');
  }

  function examWizardView() {
    var w = ui.examWizard;
    var step = w.step || 0;
    var body = '';
    if (step === 0) {
      body = '<label class="field"><span>Tên đợt thi</span><input id="exam-name" value="' + esc(w.name || '') + '" required></label>' +
        '<label class="field"><span>Loại kỳ thi</span><select id="exam-type">' +
        '<option value="class"' + (w.type !== 'pick' ? ' selected' : '') + '>Theo lớp</option>' +
        '<option value="pick"' + (w.type === 'pick' ? ' selected' : '') + '>Chọn lọc</option></select></label>' +
        '<p class="help">Xác nhận để sang bước chọn lớp. Thư mục chỉ được tạo sau bước chọn ngày thi.</p>';
    } else if (step === 1) {
      var classes = (state.classes || []).slice().sort(function (a, b) {
        return L.currentName(a).localeCompare(L.currentName(b), 'vi');
      });
      var age = w.type === 'pick'
        ? '<div class="age-row"><label class="field"><span>Từ tuổi</span><input id="exam-age-from" inputmode="numeric" value="' + esc(w.ageFrom || '') + '"></label>' +
          '<label class="field"><span>Tới tuổi</span><input id="exam-age-to" inputmode="numeric" value="' + esc(w.ageTo || '') + '"></label></div>' +
          '<p class="help">Để trống cả hai ô nếu không giới hạn tuổi. Điền một ô thì chỉ lấy đúng tuổi đó. Ví dụ từ 8 và tới để trống nghĩa là chỉ tuổi 8. Điền cả hai thì lấy khoảng đó, tính cả hai đầu.</p>'
        : '';
      body = age + '<label class="field class-q"><span>Tìm lớp</span><input id="exam-class-q" placeholder="Tên lớp" autocomplete="off"></label>' +
        '<p class="field-label">Lớp tham gia</p><div class="pick-grid" id="exam-class-picks">' +
        classes.map(function (cls) {
          var on = w.classIds[cls.id] ? ' checked' : '';
          return '<label class="pick-opt" data-name="' + esc(L.currentName(cls).toLowerCase()) + '"><input type="checkbox" data-exam-class="' + esc(cls.id) + '"' + on + '><span>' + esc(L.currentName(cls)) + '</span></label>';
        }).join('') + '</div>';
    } else {
      if (!w.calMonth) w.calMonth = L.monthKey(new Date());
      var chosen = Object.keys(w.classIds).map(findClass).filter(Boolean).sort(function (a, b) {
        return L.currentName(a).localeCompare(L.currentName(b), 'vi');
      });
      body = '<div class="exam-month"><button type="button" class="btn" data-act="exam-cal" data-dir="-1">‹</button><span>' +
        esc(L.monthLabel(w.calMonth)) + '</span><button type="button" class="btn" data-act="exam-cal" data-dir="1">›</button></div>' +
        '<div class="exam-cals">' + chosen.map(function (cls) {
          return examCalendar(cls, w.calMonth, w.dates[cls.id] || {});
        }).join('') + '</div>' +
        '<p class="help">Ngày nền xanh baby là buổi học theo lịch của lớp. Bấm để chọn ngày thi, khung đỏ. Bấm lại để hủy. Có thể chọn nhiều ngày, kể cả ngày không có lịch để bù. Mỗi lớp cần ít nhất một ngày.</p>';
    }
    var foot = '';
    if (step > 0) foot += '<button type="button" class="btn" data-act="exam-back">Quay lại</button>';
    foot += '<button type="button" class="btn" data-act="exam-cancel">Hủy</button>';
    if (step < 2) foot += '<button type="button" class="btn btn-primary" data-act="exam-next">' + (step === 0 ? 'Xác nhận' : 'Tiếp') + '</button>';
    else foot += '<button type="button" class="btn btn-primary" data-act="exam-commit">Tạo thư mục đợt thi</button>';
    return shell('<div class="section-head"><div><button type="button" class="btn" data-act="exam-cancel">← Kỳ thi</button>' +
      '<h2>Tạo đợt thi</h2><p class="meta">' + (step === 0 ? 'Tên và loại' : ('Bước ' + step + ' / 2')) + '</p></div></div>' +
      '<section class="panel exam-panel">' + body + '<p class="form-error">' + esc(ui.formError) + '</p><div class="btn-row">' + foot + '</div></section>');
  }

  function examStudentRows(exam, entry) {
    var rows = entry.students || [];
    if (!rows.length) return '<tr><td colspan="5">Chưa có học viên trong thẻ này.</td></tr>';
    return rows.map(function (stu) {
      var score = canEdit()
        ? '<input data-exam-score data-exam="' + esc(exam.id) + '" data-entry="' + esc(entry.classId) + '" data-stu="' + esc(stu.studentId) + '" value="' + esc(stu.score || '') + '">'
        : esc(stu.score || '—');
      var review = canEdit()
        ? '<input data-exam-review data-exam="' + esc(exam.id) + '" data-entry="' + esc(entry.classId) + '" data-stu="' + esc(stu.studentId) + '" value="' + esc(stu.review || '') + '">'
        : esc(stu.review || '—');
      return '<tr><td>' + esc(stu.name || '—') + (stu.extra ? ' <span class="tag">Test</span>' : '') + '</td><td>' + esc(stu.englishName || '—') + '</td><td>' +
        esc(stu.code || '—') + '</td><td>' + score + '</td><td>' + review + '</td></tr>';
    }).join('');
  }

  function entryTouchesWeek(entry, mondayIso) {
    var start = L.parseDateInput(mondayIso);
    if (!start) return false;
    var from = start.getTime();
    var end = L.addDays(start, 7).getTime();
    return examDateList(entry).some(function (iso) {
      var day = L.parseDateInput(iso);
      return day && day.getTime() >= from && day.getTime() < end;
    });
  }

  function examWeekBoard(exam, mondayIso) {
    var start = L.parseDateInput(mondayIso);
    if (!start) return '';
    var days = L.DAYS.map(function (day, index) {
      var date = L.addDays(start, index);
      var iso = L.isoDay(date);
      var items = [];
      (exam.entries || []).forEach(function (entry) {
        if (examDateList(entry).indexOf(iso) < 0) return;
        var cls = findClass(entry.classId);
        var times = [];
        if (cls) {
          L.monthSessions(cls, iso.slice(0, 7)).forEach(function (ses) {
            if (ses.iso === iso) times.push(L.formatTimeValue(ses.start) + '–' + L.formatTimeValue(ses.end));
          });
        }
        items.push('<p><b>' + esc(entry.className || 'Lớp') + '</b>' + (times.length ? '<br>' + esc(times.join(', ')) : '') + '</p>');
      });
      return '<div class="exam-week-day"><strong>' + esc(day.short) + ' ' + esc(L.formatDMY(date)) + '</strong>' +
        (items.length ? items.join('') : '<p class="muted">—</p>') + '</div>';
    }).join('');
    return '<div class="exam-week-wrap"><div class="exam-week">' + days + '</div></div>';
  }

  function examDetailView() {
    var exam = findExam(ui.examId);
    if (!exam) {
      ui.examId = null;
      return examListView();
    }
    var weeks = L.examWeekSpan(exam.entries || []);
    if (weeks.length && weeks.indexOf(ui.examWeek) < 0) ui.examWeek = weeks[0];
    var week = weeks.length ? ui.examWeek : '';
    var age = exam.type === 'pick'
      ? '<p class="meta">Tuổi: ' + esc(exam.ageFrom || '…') + ' – ' + esc(exam.ageTo || '…') + '</p>'
      : '';
    var chips = weeks.length ? '<div class="week-picks">' + weeks.map(function (iso) {
      var on = iso === week ? ' is-on' : '';
      return '<button type="button" class="btn' + on + '" data-act="exam-week" data-week="' + esc(iso) + '">Tuần ' + esc(L.formatDMY(L.parseDateInput(iso))) + '</button>';
    }).join('') + '</div>' + examWeekBoard(exam, week) : '<p class="help">Chưa có ngày thi.</p>';
    var shown = (exam.entries || []).filter(function (entry) {
      return week ? entryTouchesWeek(entry, week) : true;
    });
    var cards = shown.map(function (entry) {
      var dates = examDateList(entry).map(function (iso) {
        return L.formatDMY(L.parseDateInput(iso));
      }).join(', ');
      var extra = canEdit()
        ? '<label class="field"><span>Thêm học viên test</span><input data-exam-extra data-entry="' + esc(entry.classId) + '" placeholder="Tên hoặc mã trong lớp" autocomplete="off"></label>' +
          '<div class="rejoin-list" id="extra-' + esc(entry.classId) + '"></div>'
        : '';
      return '<section class="panel exam-card"><h3>' + esc(entry.className || 'Lớp') + '</h3>' +
        '<p class="meta">' + esc(slotLabel(entry.slotDow, entry.slotStart, entry.slotEnd)) + ' · Ngày thi ' + esc(dates || 'Chưa có ngày') + '</p>' +
        '<div class="table-wrap"><table class="exam-table"><thead><tr><th>Tên</th><th>Tên tiếng Anh</th><th>Mã học viên</th><th>Điểm thi</th><th>Đánh giá</th></tr></thead><tbody>' +
        examStudentRows(exam, entry) + '</tbody></table></div>' + extra + '</section>';
    }).join('');
    return shell('<div class="section-head"><div><button type="button" class="btn" data-act="exam-list">← Kỳ thi</button>' +
      '<h2>' + esc(exam.name) + '</h2><p class="meta">' + (exam.type === 'pick' ? 'Chọn lọc' : 'Theo lớp') + '</p>' + age + '</div></div>' +
      '<p class="help">Lịch tuần tính từ tuần của ngày thi sớm nhất tới tuần của ngày thi muộn nhất.</p>' +
      (canEdit() ? '' : '<p class="help">Tài khoản này chỉ xem điểm và đánh giá.</p>') + chips + cards);
  }

  function viewExam() {
    if (ui.examWizard && canEdit()) return examWizardView();
    if (ui.examId) return examDetailView();
    return examListView();
  }

  function paintExamExtra(entryId, query) {
    var box = document.getElementById('extra-' + entryId);
    var exam = findExam(ui.examId);
    if (!box || !exam) return;
    var entry = null;
    (exam.entries || []).forEach(function (item) { if (item.classId === entryId) entry = item; });
    if (!entry) return;
    var q = String(query || '').trim().toLowerCase();
    if (!q) { box.innerHTML = ''; return; }
    var have = {};
    (entry.students || []).forEach(function (stu) { have[stu.studentId] = true; });
    var cls = findClass(entry.classId);
    var hits = ((cls && cls.students) || []).filter(function (stu) {
      if (!stu || have[stu.id]) return false;
      var blob = ((stu.name || '') + ' ' + (stu.code || '') + ' ' + (stu.englishName || '')).toLowerCase();
      return blob.indexOf(q) >= 0;
    }).slice(0, 8);
    box.innerHTML = hits.length ? hits.map(function (stu) {
      return '<button type="button" class="rejoin-hit" data-act="exam-extra-pick" data-entry="' + esc(entry.classId) + '" data-id="' + esc(stu.id) + '">' +
        esc(stu.name || '') + ' · ' + esc(stu.code || '') + '</button>';
    }).join('') : '<p class="help">Không thấy học viên trong lớp.</p>';
  }

  function patchExamStudent(examId, classId, studentId, patch) {
    var exam = findExam(examId);
    if (!exam) return;
    (exam.entries || []).forEach(function (entry) {
      if (entry.classId !== classId) return;
      (entry.students || []).forEach(function (stu) {
        if (stu.studentId !== studentId) return;
        if (patch.score != null) stu.score = patch.score;
        if (patch.review != null) stu.review = patch.review;
      });
    });
    save({ quiet: true });
  }

  function curriculumLevels(cls) {
    var history = cls && cls.levelHistory;
    if (history && history.length) return history.slice();
    var level = L.currentLevel(cls);
    return level ? [level] : [];
  }

  function curriculumLevelOf(cls) {
    var levels = curriculumLevels(cls);
    var key = ui.curriculumLevel;
    for (var i = 0; i < levels.length; i++) {
      if (L.levelKey(levels[i]) === key) return levels[i];
    }
    return levels.length ? levels[levels.length - 1] : L.currentLevel(cls);
  }

  function curriculumRatio(cls, level) {
    var use = level || L.currentLevel(cls);
    var students = (cls && cls.students) || [];
    var books = 0;
    var pec = 0;
    students.forEach(function (stu) {
      var rec = L.bookOf(stu, use);
      if (L.bookBought(rec)) books += 1;
      if (L.pecReady(rec)) pec += 1;
    });
    return { books: books, pec: pec, total: students.length };
  }

  function ratioText(ratio) {
    return 'Sách ' + ratio.books + '/' + ratio.total + ' · PEC ' + ratio.pec + '/' + ratio.total;
  }

  function bookStatusLabel(id) {
    var list = L.BOOK_STATUS;
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i].label;
    return 'Chưa mua';
  }

  function levelOptionLabel(level) {
    var grade = L.gradeById(level && level.gradeId);
    var book = L.curriculumName(grade);
    var gradeLabel = grade ? grade.label : (level && level.name ? level.name : '?');
    var head = level && !level.to ? 'Hiện tại' : L.formatDMY(level && level.from) + ' – ' + L.formatDMY(level && level.to);
    return head + ' · ' + gradeLabel + ' · ' + book;
  }

  function writeCurriculum(stu, level, patch) {
    if (!stu || !level) return;
    if (!stu.curriculum || typeof stu.curriculum !== 'object' || Array.isArray(stu.curriculum)) stu.curriculum = {};
    var key = L.levelKey(level);
    if (!key) return;
    var current = L.bookOf(stu, level);
    var next = L.normalizeBook({
      bookStatus: patch && patch.bookStatus != null ? patch.bookStatus : current.bookStatus,
      pecMode: patch && patch.pecMode != null ? patch.pecMode : current.pecMode,
      pecUser: patch && patch.pecUser != null ? patch.pecUser : current.pecUser,
      pecPass: patch && patch.pecPass != null ? patch.pecPass : current.pecPass
    });
    stu.curriculum[key] = next;
    if (!level.to) {
      stu.bookStatus = next.bookStatus;
      stu.pecMode = next.pecMode;
      stu.pecUser = next.pecUser;
      stu.pecPass = next.pecPass;
    }
  }

  function applyCurriculumPatch(studentId, patch, rerender) {
    if (!canEdit()) return;
    var found = findStudent(studentId);
    var cls = findClass(ui.curriculumId);
    if (!found || !cls || found.cls.id !== cls.id) return;
    writeCurriculum(found.stu, curriculumLevelOf(cls), patch || {});
    save();
    if (rerender) render();
    else paintCurriculumRatio();
  }

  function paintCurriculumRatio() {
    var ratio = document.getElementById('curriculum-ratio');
    var cls = findClass(ui.curriculumId);
    if (!ratio || !cls) return;
    ratio.textContent = ratioText(curriculumRatio(cls, curriculumLevelOf(cls)));
  }

  function viewCurriculumList() {
    var rows = state.classes.slice().sort(function (a, b) {
      return L.currentName(a).localeCompare(L.currentName(b), 'vi');
    }).map(function (cls) {
      var level = L.currentLevel(cls);
      var grade = L.gradeById(level && (level.gradeId || cls.gradeId));
      var ratio = curriculumRatio(cls, level);
      return '<tr><td><button type="button" class="stu-name" data-act="open-curriculum" data-id="' + esc(cls.id) + '">' + esc(L.currentName(cls)) + '</button></td>' +
        '<td>' + esc(gradeText(grade, cls)) + '</td>' +
        '<td>' + esc(L.curriculumName(grade)) + '</td>' +
        '<td>' + esc(ratioText(ratio)) + '</td></tr>';
    }).join('');
    return shell('<div class="section-head"><div><button type="button" class="btn" data-act="nav" data-screen="menu">← Menu</button>' +
      '<h2>Xác nhận giáo trình</h2><p class="meta">Mục F</p></div></div>' +
      '<p class="help">Mỗi lớp hiện tên, cấp độ đang học, giáo trình của cấp đó, số học viên đã mua sách và số học viên đã có PEC. Bấm tên lớp để xem từng học viên. Khi lớp lên cấp, giáo trình trên danh sách đổi theo cấp mới.</p>' +
      '<div class="table-wrap"><table class="curriculum-table"><thead><tr><th>Tên lớp</th><th>Cấp độ</th><th>Giáo trình</th><th>Mua sách / PEC</th></tr></thead><tbody>' +
      (rows || '<tr><td colspan="4">Chưa có lớp.</td></tr>') + '</tbody></table></div>');
  }

  function curriculumPecCells(stu, rec, edit) {
    var self = rec.pecMode === 'self';
    var box = edit
      ? '<label class="checkline"><input type="checkbox" data-pec-self data-id="' + esc(stu.id) + '"' + (self ? ' checked' : '') + '> Hv tự tạo</label>'
      : (self ? 'Hv tự tạo' : '');
    if (self) {
      return '<td>' + box + '<div class="pec-unknown">Thông tin không rõ</div></td><td><div class="pec-unknown">Thông tin không rõ</div></td>';
    }
    if (edit) {
      return '<td>' + box + '<input data-pec-user data-id="' + esc(stu.id) + '" value="' + esc(rec.pecUser) + '" autocomplete="off" spellcheck="false"></td>' +
        '<td><input data-pec-pass data-id="' + esc(stu.id) + '" value="' + esc(rec.pecPass) + '" autocomplete="off" spellcheck="false"></td>';
    }
    return '<td>' + esc(showText(rec.pecUser)) + '</td><td>' + esc(showText(rec.pecPass)) + '</td>';
  }

  function viewCurriculumClass() {
    var cls = findClass(ui.curriculumId);
    if (!cls) { ui.curriculumId = null; ui.curriculumLevel = ''; return viewCurriculumList(); }
    var levels = curriculumLevels(cls);
    var level = curriculumLevelOf(cls);
    ui.curriculumLevel = L.levelKey(level);
    var grade = L.gradeById(level && (level.gradeId || cls.gradeId));
    var edit = canEdit();
    var options = levels.map(function (item) {
      var key = L.levelKey(item);
      return '<option value="' + esc(key) + '"' + (key === ui.curriculumLevel ? ' selected' : '') + '>' + esc(levelOptionLabel(item)) + '</option>';
    }).join('');
    var active = [];
    var paused = [];
    (cls.students || []).forEach(function (stu) {
      if (isPausedStudent(stu)) paused.push(stu);
      else active.push(stu);
    });
    var ordered = L.sortStudents(active, 'name').concat(L.sortStudents(paused, 'name'));
    var rows = ordered.map(function (stu, index) {
      var rec = L.bookOf(stu, level);
      var bookCell = edit
        ? '<select data-book data-id="' + esc(stu.id) + '">' + L.BOOK_STATUS.map(function (item) {
          return '<option value="' + item.id + '"' + (rec.bookStatus === item.id ? ' selected' : '') + '>' + esc(item.label) + '</option>';
        }).join('') + '</select>'
        : esc(bookStatusLabel(rec.bookStatus));
      return '<tr' + (isPausedStudent(stu) ? ' class="row-gray"' : '') + '><td>' + (index + 1) + '</td><td>' + esc(showText(stu.name)) + '</td><td>' + esc(showText(stu.englishName)) + '</td><td>' + esc(showText(stu.code)) + '</td><td>' + bookCell + '</td>' + curriculumPecCells(stu, rec, edit) + '</tr>';
    }).join('');
    var pastNote = level && level.to
      ? '<p class="help">Đang xem cấp độ cũ. Giáo trình của cấp này là ' + esc(L.curriculumName(grade)) + '. Admin sửa dữ liệu sách và PEC của giai đoạn này mà không đổi cấp đang học.</p>'
      : '<p class="help">Giáo trình hiện tại là ' + esc(L.curriculumName(grade)) + '. Chọn cấp độ cũ trong danh sách để xem lại giáo trình và dữ liệu sách, PEC của giai đoạn đó.</p>';
    return shell('<div class="section-head"><div><button type="button" class="btn" data-act="curriculum-back">← Danh sách giáo trình</button>' +
      '<h2>' + esc(L.currentName(cls)) + '</h2><p class="meta">' + esc(gradeText(grade, cls)) + ' · ' + esc(L.curriculumName(grade)) + '</p>' +
      '<p class="meta" id="curriculum-ratio">' + esc(ratioText(curriculumRatio(cls, level))) + '</p></div></div>' +
      '<label class="field filter-field"><span>Cấp độ và giáo trình</span><select id="curriculum-level">' + options + '</select></label>' +
      pastNote +
      (edit ? '' : '<p class="help">Tài khoản này chỉ xem. Admin mới sửa trạng thái mua sách và PEC.</p>') +
      '<div class="table-wrap"><table class="curriculum-table"><thead><tr><th>STT</th><th>Học viên</th><th>Tên tiếng Anh</th><th>Mã học viên</th><th>Mua sách</th><th>Tài khoản PEC</th><th>Mật khẩu PEC</th></tr></thead><tbody>' +
      (rows || '<tr><td colspan="7">Lớp chưa có học viên.</td></tr>') + '</tbody></table></div>');
  }

  function viewCurriculum() {
    if (!ui.curriculumId) return viewCurriculumList();
    return viewCurriculumClass();
  }

  function iconArchive() {
    return '<svg class="pixel-icon" viewBox="0 0 16 16" aria-hidden="true" shape-rendering="crispEdges">' +
      '<rect fill="#0c4a72" x="2" y="3" width="12" height="3"/>' +
      '<rect fill="#e2b007" x="3" y="7" width="10" height="6"/>' +
      '<rect fill="#fff6d8" x="6" y="9" width="4" height="2"/>' +
      '</svg>';
  }

  function iconFeed() {
    return '<svg class="pixel-icon" viewBox="0 0 16 16" aria-hidden="true" shape-rendering="crispEdges">' +
      '<rect fill="#0c4a72" x="1" y="2" width="10" height="8"/>' +
      '<rect fill="#f7fbff" x="2" y="3" width="8" height="6"/>' +
      '<rect fill="#d90429" x="3" y="4" width="6" height="1"/>' +
      '<rect fill="#0c4a72" x="3" y="6" width="4" height="1"/>' +
      '<rect fill="#e2b007" x="8" y="8" width="6" height="5"/>' +
      '<rect fill="#fff6d8" x="9" y="9" width="4" height="3"/>' +
      '</svg>';
  }

  function classMonthRate(cls, now) {
    var board = L.homeworkBoard(cls, state.classes, L.monthKey(now));
    var rates = board.students.map(function (stu) { return stu.rate; }).filter(function (rate) { return rate !== null; });
    if (!rates.length) return null;
    var sum = 0;
    rates.forEach(function (rate) { sum += rate; });
    return sum / rates.length;
  }

  function percentText(rate) {
    if (rate === null || rate === undefined) return '—';
    return Math.round(rate * 100) + '%';
  }

  function displayLevel(cls, now, mode) {
    if (mode === 'homework') return L.homeworkLevel(cls, L.monthKey(now));
    return L.currentLevel(cls);
  }

  function kindLabel(cls) {
    if (cls && cls.kind === 'custom') return 'Lớp custom';
    return cls && cls.kind === 'addon' ? 'Lớp add-in' : 'Lớp khởi điểm';
  }

  function endLabel(cls, progress) {
    if (cls && cls.endOpen) return '99/99/9999';
    return progress && progress.end ? L.formatDMY(progress.end) : '—';
  }

  function classGroupId(cls, level) {
    if (cls && cls.kind === 'custom') return 'CUSTOM';
    var grade = L.gradeById((level && level.gradeId) || (cls && cls.gradeId));
    return grade ? grade.track : '';
  }

  function gradeText(grade, cls) {
    if (grade) return grade.label;
    if (cls && cls.customLevel) return cls.customLevel;
    return 'Custom';
  }

  function lessonHint(grade) {
    var teens = grade && (grade.track === 'TEENS' || grade.track === 'IELTS')
      ? ' Lớp TEENS hết TEENS 2B thì lên thang IELTS, giữ nguyên số lớp và tên trình độ TEENS, thư mục chuyển sang nhóm IELTS.'
      : '';
    return grade.lessons + ' lesson. Mỗi khung giờ trong tuần tính là 1 lesson. Lớp học 2 buổi mỗi tuần thì mỗi tuần ghi 2 lesson. Trong cùng trình độ, số lớp giữ nguyên khi lên cấp. Sang trình độ mới, số lớp lấy số tiếp theo (đang có KIDS10 thì lớp lên từ KINDY thành KIDS11).' + teens;
  }

  function kindField(kind, mode) {
    if (kind === 'custom') {
      return '<p><b>Loại lớp:</b> Lớp custom</p><p class="help">Lớp custom không lên trình độ sau khi kết thúc. Lớp chỉ có trong sổ trong thời gian khóa học chạy.</p>';
    }
    var value = kind === 'addon' ? 'addon' : 'starter';
    var customOption = mode === 'add' ? '<option value="custom">Lớp custom</option>' : '';
    return '<label class="field"><span>Loại lớp</span><select name="kind" id="f-kind">' +
      '<option value="starter"' + (value === 'starter' ? ' selected' : '') + '>Lớp khởi điểm</option>' +
      '<option value="addon"' + (value === 'addon' ? ' selected' : '') + '>Lớp add-in</option>' +
      customOption + '</select></label>' +
      '<p class="help" id="kind-help">Lớp khởi điểm tính chuyên cần từ tháng được thiết lập. Trong tháng lên trình độ, bảng chuyên cần vẫn giữ trình độ cũ. Lớp add-in cũng tính từ tháng thiết lập, nhưng bảng chuyên cần chuyển sang trình độ mới ngay trong tháng lên cấp. Lớp custom có tên XH_[tên custom]_[cấp độ], không lên trình độ và chỉ có trong sổ khi khóa học đang chạy.</p>';
  }

  function showText(value) {
    if (value === '?') return '?';
    if (value == null || String(value).trim() === '') return '—';
    return String(value);
  }

  function showDob(dob) {
    if (dob === '?' || dob === '-') return dob;
    if (!dob) return '—';
    if (/^\d{4}$/.test(String(dob))) return String(dob);
    var parsed = L.parseDateInput(dob);
    return parsed ? L.formatDMY(parsed) : '-';
  }

  function listedCount(cls, now) {
    return L.listedCount(cls, now || new Date());
  }

  var ROSTER_FULL = 'Không thể thực hiện vì sĩ số đã đạt 20.';

  function isPausedStudent(stu) {
    return !!(stu && (stu.status === 'stopped' || stu.expireKind === 'stop'));
  }

  function pausedRows(cls, now) {
    var list = (cls.students || []).filter(isPausedStudent);
    return L.sortStudents(list, ui.sort).map(function (stu) {
      return { stu: stu, phase: L.studentPhase(cls, stu, now) };
    });
  }

  function rosterOf(cls, now) {
    var listed = [];
    var gray = [];
    (cls.students || []).forEach(function (stu) {
      if (!stu || isPausedStudent(stu)) return;
      var phase = L.studentPhase(cls, stu, now);
      if (phase.kind === 'gray') gray.push(stu);
      else if (phase.kind !== 'archive') listed.push(stu);
    });
    function pack(list) {
      return L.sortStudents(list, ui.sort).map(function (stu) {
        return { stu: stu, phase: L.studentPhase(cls, stu, now) };
      });
    }
    return { listed: pack(listed), gray: pack(gray) };
  }

  function countdownText(phase, now) {
    if (!phase || !phase.until) return 'Sắp chuyển vào lưu trữ';
    var ms = phase.until.getTime() - now.getTime();
    if (ms <= 0) return 'Sắp chuyển vào lưu trữ';
    var days = Math.ceil(ms / 86400000);
    if (days <= 1) return 'Còn dưới 1 ngày trước khi chuyển vào Học viên cũ';
    return 'Còn ' + days + ' ngày trước khi chuyển vào Học viên cũ';
  }

  function enrollMark(phase) {
    if (!phase || phase.kind === 'gray') return '';
    if (phase.tag === 'scholarship') {
      var used = phase.used || 0;
      var limit = phase.limit || 0;
      return '<span class="tag tag-scholar">Học viên 1 tháng' + (limit ? ' · ' + used + '/' + limit : '') + '</span>';
    }
    if (phase.tag === 'trial') return '<span class="tag tag-trial">Trial</span>';
    return '';
  }

  function enrollLabel(enroll) {
    if (enroll === 'trial') return 'Trial';
    if (enroll === 'scholarship') return 'Học bổng';
    return 'Chính thức';
  }

  function classSessionChoices(cls) {
    if (!cls) return [];
    var now = new Date();
    var key = L.monthKey(now);
    var keys = [L.shiftMonth(key, -1), key, L.shiftMonth(key, 1), L.shiftMonth(key, 2)];
    var seen = {};
    var list = [];
    keys.forEach(function (month) {
      L.monthSessions(cls, month).forEach(function (ses) {
        if (!ses || seen[ses.key]) return;
        seen[ses.key] = true;
        list.push(ses);
      });
    });
    list.sort(function (a, b) { return a.date - b.date; });
    var from = now.getTime() - 21 * 86400000;
    var near = list.filter(function (ses) { return ses.date.getTime() >= from; });
    return (near.length ? near : list).slice(0, 24);
  }

  function folderCard(cls, now, mode) {
    var level = displayLevel(cls, now, mode);
    var grade = L.gradeById(level.gradeId || cls.gradeId);
    var progress = L.progressOf(cls, now);
    var count = listedCount(cls, now);
    var pct = progress.total ? Math.round(progress.done / progress.total * 100) : 0;
    var act = mode === 'homework' ? 'open-homework' : 'open-class';
    var name = mode === 'homework' ? ((level && level.name) || L.currentName(cls)) : L.currentName(cls);
    var held = mode === 'homework' && name !== L.currentName(cls) ? '<span>Tháng này giữ trình độ cũ</span>' : '';
    var extra = mode === 'homework'
      ? '<span>Chuyên cần tháng: ' + percentText(classMonthRate(cls, now)) + '</span>'
      : (cls.completed ? '<span class="done-flag">Đã hoàn thành</span>' : '<span>' + (cls.schedule || []).length + ' buổi/tuần · ' + progress.done + '/' + progress.total + ' lesson</span>');
    var group = classGroupId(cls, level);
    var crowd = count > 17
      ? '<span class="crowd">!<span class="crowd-tip">Lớp quá tải</span></span>'
      : '';
    var button = '<button type="button" class="folder group-' + esc(group.toLowerCase()) + '" data-act="' + act + '" data-id="' + esc(cls.id) + '">' +
      crowd +
      '<strong>' + esc(name) + '</strong>' +
      '<span>' + esc(kindLabel(cls)) + '</span>' +
      '<span>Trình độ: ' + esc(L.trackLabel(cls, grade)) + '</span>' +
      '<span>Cấp độ: ' + esc(gradeText(grade, cls)) + '</span>' +
      '<span>Sĩ số: ' + count + '</span>' +
      '<span>Bắt đầu: ' + esc(L.formatDMY(progress.start)) + '</span>' +
      '<span>Kết thúc: ' + esc(endLabel(cls, progress)) + '</span>' +
      held + extra +
      '<span class="meter" aria-hidden="true"><span style="width:' + pct + '%"></span></span></button>';
    if (mode === 'homework') return button;
    return '<div class="folder-item" data-name="' + esc(String(name).toLowerCase()) + '">' + button +
      '<button type="button" class="btn folder-hw" data-act="open-homework" data-id="' + esc(cls.id) + '">Xem chuyên cần</button></div>';
  }

  function viewClasses() {
    var now = new Date();
    var blocks = L.GROUPS.map(function (group) {
      var list = state.classes.filter(function (cls) {
        return classGroupId(cls, L.currentLevel(cls)) === group.id;
      }).sort(function (a, b) {
        if (group.id === 'CUSTOM') return L.currentName(a).localeCompare(L.currentName(b), 'vi');
        return L.gradeIndex(a.gradeId) - L.gradeIndex(b.gradeId) || a.number - b.number;
      });
      var cards = list.length ? list.map(function (cls) { return folderCard(cls, now); }).join('') : '<p class="muted">Chưa có lớp trong nhóm này.</p>';
      return '<section class="group-block group-' + group.id.toLowerCase() + '"><h3>' + esc(group.label) + '</h3><div class="folder-grid">' + cards + '</div></section>';
    }).join('');
    return shell('<div class="section-head"><div><button type="button" class="btn" data-act="nav" data-screen="menu">← Menu</button>' +
      '<h2>Quản lý lớp</h2></div><div class="btn-row">' +
      (canExportClasses() ? '<button type="button" class="btn" data-act="export-classes" data-kind="xlsx">Excel</button>' +
        '<button type="button" class="btn" data-act="export-classes" data-kind="pdf">PDF</button>' +
        '<button type="button" class="btn" data-act="export-classes" data-kind="img">Ảnh</button>' +
        '<button type="button" class="btn" data-act="export-classes" data-kind="print">Print (in)</button>' : '') +
      (canEdit() ? '<button type="button" class="btn btn-primary" data-act="open-add-class">+ Thêm lớp</button>' : '') +
      '</div></div>' +
      summaryHtml(currentWeekStats(null)) +
      '<p class="help">Thư mục viền vàng là KINDY, viền xanh là KIDS, viền đỏ là TEENS, viền xanh lá là IELTS, viền tím là lớp custom. Lớp custom không lên trình độ. Lớp TEENS hết TEENS 2B lên thang IELTS: tên trình độ vẫn là TEENS, cấp độ theo IELTS, số lớp giữ nguyên, thư mục nằm ở nhóm IELTS. Thẻ có dấu ! là lớp quá tải, sĩ số trên 17. Sĩ số có số thứ tự tối đa 20. Bấm vào thư mục để mở lớp. Nút Xem chuyên cần mở bảng chuyên cần của lớp. Print (in) mở hộp thoại in của máy và in bảng danh sách lớp đang xem.</p>' +
      '<label class="field class-q"><span>Tìm lớp</span><input id="class-q" placeholder="Tên lớp" autocomplete="off"></label>' +
      blocks + modalHtml());
  }

  function studentRows(rows, now, openId) {
    return rows.map(function (row, index) {
      var stu = row.stu;
      var phase = row.phase || { kind: 'listed', tag: 'official' };
      var gray = phase.kind === 'gray';
      var rowCls = gray ? 'row-gray' : (phase.tag === 'scholarship' ? 'row-scholar' : (phase.tag === 'trial' ? 'row-trial' : ''));
      var note = L.noteVisible(stu.transferNote, now)
        ? '<div class="transfer-note">Chuyển lớp từ ' + esc(stu.transferNote.fromName) + '</div>' : '';
      var mark = enrollMark(phase);
      var card = gray
        ? '<div class="expire-card">' + esc(countdownText(phase, now)) +
          (phase.reason ? '<small>' + esc(phase.reason) + '</small>' : '') + '</div>'
        : '';
      var picked = ui.selected[stu.id] ? ' checked' : '';
      return '<tr class="' + rowCls + '">' + (canEdit() ? '<td><input type="checkbox" data-pick="' + esc(stu.id) + '"' + picked + ' aria-label="Chọn ' + esc(stu.name) + '"></td>' : '') +
        '<td>' + (gray ? '' : (index + 1)) + '</td>' +
        '<td>' + esc(showText(stu.code)) + '</td>' +
        '<td><button type="button" class="stu-name' + (stu.id === openId ? ' is-open' : '') + '" data-act="open-student" data-id="' + esc(stu.id) + '">' + esc(showText(stu.name)) + '</button>' + mark + note + card + '</td>' +
        '<td>' + esc(showText(stu.englishName)) + '</td>' +
        '<td>' + esc(showText(stu.gender)) + '</td>' +
        '<td>' + esc(showDob(stu.dob)) + '</td>' +
        '<td data-age-for="' + esc(stu.dob || '') + '">—</td>' +
        '<td>' + esc(showText(stu.ec)) + '</td>' +
        (canEdit() ? '<td><button type="button" class="pencil" data-act="edit-student" data-id="' + esc(stu.id) + '" aria-label="Sửa ' + esc(stu.name) + '">✎</button></td>' : '') + '</tr>';
    }).join('');
  }

  function viewClass() {
    var cls = findClass(ui.classId);
    if (!cls) { ui.screen = 'classes'; return viewClasses(); }
    var now = new Date();
    var grade = L.gradeById(cls.gradeId);
    var progress = L.progressOf(cls, now);
    var roster = rosterOf(cls, now);
    var paused = pausedRows(cls, now);
    var ids = roster.listed.concat(roster.gray).map(function (row) { return row.stu.id; });
    var allOn = ids.length > 0 && ids.every(function (id) { return ui.selected[id]; });
    var slots = (cls.schedule || []).slice().sort(function (a, b) { return L.DAYS.findIndex(function (d) { return d.dow === a.dow; }) - L.DAYS.findIndex(function (d) { return d.dow === b.dow; }); });
    var slotHtml = slots.map(function (slot) {
      var day = L.DAYS.filter(function (d) { return d.dow === slot.dow; })[0];
      return '<span class="slot-pill">' + esc(day.short) + ' ' + esc(L.formatTimeValue(slot.start)) + ' – ' + esc(L.formatTimeValue(slot.end)) + '</span>';
    }).join('');
    var edit = canEdit();
    var studentOps = canEdit();
    var table = '<div class="table-wrap" id="roster-table"><table><thead><tr>' +
      (studentOps ? '<th><input type="checkbox" data-pick-all ' + (allOn ? 'checked' : '') + ' aria-label="Chọn tất cả"></th>' : '') +
      '<th>STT</th><th>Mã học viên</th><th>Học viên</th><th>English name</th><th>Giới tính</th><th>Ngày sinh</th><th>Tuổi</th><th>First EC</th>' +
      (edit ? '<th>Sửa</th>' : '') +
      '</tr></thead><tbody>' + ((roster.listed.length || roster.gray.length) ? studentRows(roster.listed, now, ui.detailId) + studentRows(roster.gray, now, ui.detailId) : '<tr><td colspan="' + (8 + (studentOps ? 1 : 0) + (edit ? 1 : 0)) + '">Chưa có học viên đang học.</td></tr>') + '</tbody></table></div>';
    var stoppedHtml = paused.length ? '<div id="paused-list"><h3>Đã dừng học</h3>' +
      '<p class="help">Các em hiện riêng, không có số thứ tự. Dòng giải trình đi cùng đếm ngược 7 ngày, rồi chuyển vào Học viên cũ/kết thúc.</p>' +
      '<div class="table-wrap"><table><thead><tr><th>Mã</th><th>Học viên</th><th>Giải trình</th><th>Đếm ngược</th>' + (edit ? '<th></th>' : '') + '</tr></thead><tbody>' +
      paused.map(function (row) {
        var stu = row.stu;
        var phase = row.phase || {};
        return '<tr class="row-gray"><td>' + esc(showText(stu.code)) + '</td><td>' + esc(showText(stu.name)) + '</td><td>' + esc(phase.reason || '—') + '</td><td>' + esc(countdownText(phase, now)) + '</td>' +
          (edit ? '<td><button type="button" class="btn" data-act="resume-student" data-id="' + esc(stu.id) + '">Học lại</button></td>' : '') + '</tr>';
      }).join('') + '</tbody></table></div></div>' : '';
    var n = selectedIds().length;
    var printBtn = canExportClasses() ? '<button type="button" class="btn" data-act="print-students">Print (in)</button>' : '';
    var tools = (edit || canEdit() || printBtn) ? '<div class="btn-row">' +
      (canEdit() ? '<button type="button" class="btn" data-act="edit-class">Sửa lớp</button>' : '') +
      (edit ? '<button type="button" class="btn" data-act="open-import">Cập nhật Excel</button>' +
      '<button type="button" class="btn btn-primary" data-act="open-add-student">+ Thêm học viên</button>' : '') +
      printBtn + '</div>' : '';
    return shell('<div class="class-head"><div><button type="button" class="btn" data-act="nav" data-screen="classes">← Danh sách lớp</button>' +
      '<h2>' + esc(L.currentName(cls)) + '</h2>' +
      '<p class="meta">' + esc(gradeText(grade, cls)) + ' · Nhóm ' + esc(classGroupId(cls)) + ' · Trình độ ' + esc(L.trackLabel(cls, grade)) + ' · ' + esc(kindLabel(cls)) + (cls.completed ? ' · Đã hoàn thành' : '') + (cls.endOpen ? ' · Ngày kết thúc 99/99/9999' : '') + '</p></div>' +
      tools + '</div>' +
      '<div class="stat-grid"><div class="stat"><b>Sĩ số</b>' + roster.listed.length + '</div>' +
      '<div class="stat"><b>Ngày bắt đầu</b>' + esc(L.formatDMY(progress.start)) + '</div>' +
      '<div class="stat"><b>Ngày kết thúc</b>' + esc(endLabel(cls, progress)) + '</div>' +
      '<div class="stat"><b>Khai giảng</b>' + esc(L.formatDMY(cls.levelHistory[0].from)) + '</div>' +
      '<div class="stat"><b>Lesson</b>' + progress.done + '/' + progress.total + ' · ' + (cls.schedule || []).length + ' buổi/tuần</div>' +
      '<div class="stat"><b>FET</b>' + esc(L.staffText(L.classFetNames(cls).join(', '))) + '</div>' +
      '<div class="stat"><b>CM phụ trách</b>' + esc(L.staffText(cls.cm)) + '</div>' +
      '<div class="stat"><b>TA phụ trách</b>' + esc(L.staffText(cls.ta)) + '</div></div>' +
      '<div class="slot-list">' + (slotHtml || '<span class="muted">Chưa có lịch học.</span>') + '</div>' +
      '<div class="meter" aria-hidden="true"><span style="width:' + (progress.total ? Math.round(progress.done / progress.total * 100) : 0) + '%"></span></div>' +
      '<div class="toolbar"><span class="help">Sắp xếp STT</span>' +
      '<button type="button" class="btn' + (ui.sort === 'name' ? ' btn-primary' : '') + '" data-act="sort" data-sort="name">Theo tên</button>' +
      '<button type="button" class="btn' + (ui.sort === 'dob' ? ' btn-primary' : '') + '" data-act="sort" data-sort="dob">Theo ngày sinh</button></div>' +
      '<p class="help">Chính thức có số thứ tự. Học bổng đánh dấu vàng Học viên 1 tháng và có số thứ tự đến khi hết số buổi. Trial đúng một buổi: nếu ngày đó đã qua và chưa chuyển lớp, dòng nằm cuối bảng màu xám, không có số thứ tự. Học viên outdated cũng là dòng xám và hiện thời gian xóa tự động. Nút Dừng cần một dòng giải trình. Học viên đó rời danh sách có số thứ tự, hiện riêng phía dưới, không có số thứ tự, và đếm ngược 7 ngày trước khi vào Học viên cũ/kết thúc. Sĩ số có số thứ tự tối đa 20.</p>' +
      (canExportClasses() ? '<p class="help">Print (in) in các hàng học viên đã tick. Không tick thì in cả bảng đang xem, kể cả dòng xám không số thứ tự.</p>' : '') +
      (studentOps || edit ? '<div class="bulk-bar" id="bulk-bar"' + (n ? '' : ' hidden') + '><strong>Đã chọn <span id="bulk-count">' + n + '</span></strong>' +
      '<div class="btn-row">' + (studentOps ? '<button type="button" class="btn" data-act="bulk-transfer">Chuyển lớp</button>' : '') +
      (edit ? '<button type="button" class="btn" data-act="bulk-expire">Dừng</button>' : '') +
      (studentOps ? '<button type="button" class="btn btn-danger" data-act="bulk-delete">Xóa học viên</button>' : '') + '</div></div>' : '') +
      table + stoppedHtml + detailHtml() + modalHtml());
  }

  function detailHtml() {
    if (!ui.detailId) return '';
    var found = findStudent(ui.detailId);
    if (!found) return '';
    var stu = found.stu;
    var now = new Date();
    var age = L.ageOf(stu.dob, now);
    var transfers = stu.transfers.length ? '<ul class="history-list">' + stu.transfers.map(function (item) {
      return '<li>' + esc(L.formatDMY(item.at)) + ': ' + esc(item.fromName) + ' → ' + esc(item.toName) + '</li>';
    }).join('') + '</ul>' : '<p class="muted">Chưa có lịch sử chuyển lớp.</p>';
    var noteLine = L.noteVisible(stu.transferNote, now) ? '<p class="transfer-note">Chuyển lớp từ ' + esc(stu.transferNote.fromName) + '</p>' : '';
    var body;
    var bookLevel = found.cls ? L.currentLevel(found.cls) : null;
    var bookRec = L.bookOf(stu, bookLevel);
    var bookGrade = bookLevel ? L.gradeById(bookLevel.gradeId) : null;
    var bookName = L.curriculumName(bookGrade);
    if (ui.detailEdit) {
      var notes = (stu.notes || []).map(function (note) {
        return noteRow(note.id, note.month, note.text);
      }).join('');
      var selfOn = bookRec.pecMode === 'self';
      var bookPick = L.BOOK_STATUS.map(function (item) {
        return '<option value="' + item.id + '"' + (bookRec.bookStatus === item.id ? ' selected' : '') + '>' + esc(item.label) + '</option>';
      }).join('');
      body = '<label class="field"><span>Số điện thoại</span><input id="d-phone" value="' + esc(stu.phone) + '"></label>' +
        '<p class="help">Giáo trình hiện tại: ' + esc(bookName) + '. Cấp độ cũ sửa ở mục Xác nhận giáo trình.</p>' +
        '<label class="field"><span>Mua sách</span><select id="d-book">' + bookPick + '</select></label>' +
        '<label class="checkline"><input type="checkbox" id="d-pec-self"' + (selfOn ? ' checked' : '') + '> Hv tự tạo</label>' +
        '<p class="field-label">Tài khoản PEC</p>' +
        '<input id="d-pec-user" value="' + esc(bookRec.pecUser) + '" autocomplete="off" spellcheck="false"' + (selfOn ? ' hidden' : '') + '>' +
        '<p id="d-pec-user-mark" class="pec-unknown"' + (selfOn ? '' : ' hidden') + '>Thông tin không rõ</p>' +
        '<p class="field-label">Mật khẩu PEC</p>' +
        '<input id="d-pec-pass" value="' + esc(bookRec.pecPass) + '" autocomplete="off" spellcheck="false"' + (selfOn ? ' hidden' : '') + '>' +
        '<p id="d-pec-pass-mark" class="pec-unknown"' + (selfOn ? '' : ' hidden') + '>Thông tin không rõ</p>' +
        '<p class="field-label">Lịch sử chuyển lớp</p>' + transfers +
        '<p class="field-label">Nhận xét theo tháng</p><div id="note-list">' + notes + '</div>' +
        '<button type="button" class="btn" data-act="add-note">+ Thêm nhận xét</button>' +
        '<div class="modal-foot"><button type="button" class="btn btn-primary" data-act="save-detail">Lưu</button>' +
        '<button type="button" class="btn" data-act="cancel-detail">Hủy sửa</button></div>';
    } else {
      var noteView = (stu.notes || []).length ? '<ul class="history-list">' + stu.notes.map(function (note) {
        var parts = String(note.month).split('-');
        return '<li><strong>' + esc(parts[1] + '/' + parts[0]) + ':</strong> ' + esc(note.text) + '</li>';
      }).join('') + '</ul>' : '<p class="muted">Chưa có nhận xét.</p>';
      var phase = L.studentPhase(found.cls, stu, now);
      var typeLine = '<br><b>Loại:</b> ' + esc(enrollLabel(L.enrollOf(stu)));
      var expireLine = phase.kind === 'gray'
        ? '<div class="expire-card">' + esc(countdownText(phase, now)) + (phase.reason ? '<small>' + esc(phase.reason) + '</small>' : '') + '</div>'
        : '';
      var pecUserView = bookRec.pecMode === 'self' ? '<span class="pec-unknown">Thông tin không rõ</span>' : esc(showText(bookRec.pecUser));
      var pecPassView = bookRec.pecMode === 'self' ? '<span class="pec-unknown">Thông tin không rõ</span>' : esc(showText(bookRec.pecPass));
      body = '<p><b>Mã:</b> ' + esc(showText(stu.code)) + '<br><b>English name:</b> ' + esc(showText(stu.englishName)) +
        '<br><b>Giới tính:</b> ' + esc(showText(stu.gender)) + '<br><b>Ngày sinh:</b> ' + esc(showDob(stu.dob)) +
        '<br><b>Tuổi:</b> <span data-age-for="' + esc(stu.dob || '') + '">' + (stu.dob === '?' ? '?' : (age == null ? '—' : age)) + '</span>' +
        typeLine +
        '<br><b>First EC:</b> ' + esc(showText(stu.ec)) +
        '<br><b>Giáo trình:</b> ' + esc(bookName) +
        '<br><b>Mua sách:</b> ' + esc(bookStatusLabel(bookRec.bookStatus)) +
        (bookRec.pecMode === 'self' ? '<br><b>PEC:</b> Hv tự tạo' : '') +
        '<br><b>Tài khoản PEC:</b> ' + pecUserView +
        '<br><b>Mật khẩu PEC:</b> ' + pecPassView + '</p>' + expireLine + noteLine +
        '<p class="field-label">Số điện thoại</p><p>' + esc(stu.phone || '—') + '</p>' +
        '<p class="field-label">Lịch sử chuyển lớp</p>' + transfers +
        '<p class="field-label">Nhận xét theo tháng</p>' + noteView +
        (canEdit() ? '<div class="modal-foot"><button type="button" class="btn btn-primary" data-act="edit-detail">Sửa</button></div>' : '');
    }
    return '<div class="scrim"><div class="detail-card" data-stop role="dialog" aria-label="Thông tin học viên">' +
      '<div class="dialog-head"><h2>' + esc(stu.name) + '</h2>' +
      '<button type="button" class="icon-x" data-act="close-detail" aria-label="Đóng">X</button></div>' + body + '</div></div>';
  }

  function noteRow(id, month, text) {
    return '<div class="note-row" data-id="' + esc(id || '') + '">' +
      '<input data-month type="month" value="' + esc(month || L.monthKey(new Date())) + '">' +
      '<textarea data-text>' + esc(text || '') + '</textarea>' +
      '<button type="button" class="icon-x" data-act="remove-note" aria-label="Xóa nhận xét">X</button></div>';
  }

  function bandTitle(id) {
    if (id === 'morning') return 'Buổi sáng';
    if (id === 'afternoon') return 'Buổi chiều';
    return 'Buổi tối';
  }

  function filterLine() {
    var parts = [];
    if (ui.staffFilter.fet) parts.push('FET: ' + ui.staffFilter.fet);
    if (ui.staffFilter.cm) parts.push('CM: ' + ui.staffFilter.cm);
    if (ui.staffFilter.ta) parts.push('TA: ' + ui.staffFilter.ta);
    return parts.length ? parts.join(' · ') : 'Không lọc';
  }

  function soaOfficeBlocks() {
    if (ui.staffFilter.cm || ui.staffFilter.ta) return [];
    var fet = ui.staffFilter.fet || '';
    return (state.soaSlots || []).filter(function (slot) {
      return slot && (!fet || slot.fet === fet);
    });
  }

  function scheduleModel() {
    var now = new Date();
    var start = L.addDays(L.weekMonday(now), ui.weekOffset * 7);
    if (start.getTime() > L.weekMonday(now).getTime()) {
      ui.weekOffset = 0;
      start = L.weekMonday(now);
    }
    var stats = L.weekStats(state.classes, start, now, ui.staffFilter, soaOfficeBlocks());
    return {
      now: now,
      stats: stats,
      label: L.formatDMY(stats.grid.weekStart) + ' – ' + L.formatDMY(stats.grid.weekEnd)
    };
  }

  function staffFilterSelect(label, key, list) {
    var value = ui.staffFilter[key] || '';
    return '<label class="field filter-field"><span>' + label + '</span><select data-filter="' + key + '"><option value="">Tất cả</option>' +
      list.map(function (name) {
        return '<option value="' + esc(name) + '"' + (name === value ? ' selected' : '') + '>' + esc(name) + '</option>';
      }).join('') + '</select></label>';
  }

  function timetableHtml(grid, now) {
    var todayDow = now.getDay();
    var head = '<tr><th>Khung giờ</th>' + L.DAYS.map(function (day) {
      var today = ui.weekOffset === 0 && day.dow === todayDow ? ' class="today"' : '';
      return '<th' + today + '>' + day.short + '</th>';
    }).join('') + '</tr>';
    var body = L.BANDS.map(function (band) {
      var html = '<tr class="band-row band-' + band.id + '"><td colspan="8">' + bandTitle(band.id) + '</td></tr>';
      var rows = grid.rows[band.id] || [];
      if (!rows.length) return html + '<tr class="gap-row"><td colspan="8">Không có lớp</td></tr>';
      return html + rows.map(function (row) {
        if (row.gap) {
          return '<tr class="gap-row"><td colspan="8">Trống · ' + esc(L.formatTimeValue(row.start)) + ' – ' + esc(L.formatTimeValue(row.end)) + '</td></tr>';
        }
        return '<tr><th class="time-cell">' + esc(L.formatTimeValue(row.start)) + '<br>–<br>' + esc(L.formatTimeValue(row.end)) + '</th>' +
          L.DAYS.map(function (day) {
            var today = ui.weekOffset === 0 && day.dow === todayDow ? ' today' : '';
            var cards = (row.cells[day.dow] || []).map(function (chip) {
              if (chip.soa) {
                var drop = canEdit()
                  ? '<button type="button" class="soa-drop" data-act="soa-drop" data-id="' + esc(chip.id) + '">Gỡ</button>'
                  : '';
                return '<div class="tt-card tt-soa"><strong>' + esc(chip.name) + '</strong><small>SOA · Office</small><small>FET: ' +
                  esc(L.staffText(chip.fet)) + '</small>' + drop + '</div>';
              }
              var act = (canEdit()) ? 'schedule-pick' : 'open-class';
              var tag = chip.tag ? '<small class="tt-tag">' + esc(chip.tag) + '</small>' : '';
              return '<button type="button" class="tt-card group-' + esc(String(chip.group).toLowerCase()) + '" data-act="' + act + '" data-id="' + esc(chip.id) + '" data-key="' + esc(chip.sessionKey || '') + '" data-iso="' + esc(chip.iso || '') + '" data-start="' + esc(chip.start || '') + '" data-end="' + esc(chip.end || '') + '">' +
                bangHtml(chip.alert) + '<strong>' + esc(chip.name) + '</strong>' + tag + '<small>FET: ' + esc(L.staffText(chip.fet)) + '</small>' +
                '<small>CM: ' + esc(L.staffText(chip.cm)) + '</small><small>TA: ' + esc(L.staffText(chip.ta)) + '</small></button>';
            }).join('');
            return '<td class="' + today + '">' + cards + '</td>';
          }).join('') + '</tr>';
      }).join('');
    }).join('');
    return '<div class="grid-scroll"><table class="timetable"><thead>' + head + '</thead><tbody>' + body + '</tbody></table></div>';
  }

  function viewSchedule() {
    var model = scheduleModel();
    var exportBtns = canExportClasses()
      ? '<div class="btn-row"><button type="button" class="btn" data-act="export-schedule" data-kind="xlsx">Excel</button>' +
        '<button type="button" class="btn" data-act="export-schedule" data-kind="pdf">PDF</button>' +
        '<button type="button" class="btn" data-act="export-schedule" data-kind="img">Ảnh</button>' +
        '<button type="button" class="btn" data-act="export-schedule" data-kind="print">Print (in)</button></div>'
      : '';
    var soaBtn = canEdit() ? '<button type="button" class="btn" data-act="open-soa">Thêm giờ SOA</button>' : '';
    return shell('<div class="section-head"><div><button type="button" class="btn" data-act="nav" data-screen="menu">← Menu</button><h2>Thời khóa biểu</h2>' +
      '<p class="help">Một bảng cho buổi sáng, chiều và tối. Mỗi khung giờ của lớp là một buổi trên bảng. Lớp có hai buổi trong tuần hiện ở cả hai buổi đó. Bộ lọc đổi luôn nội dung xuất file. Print (in) in đúng bảng tuần đang hiển thị. Admin bấm thẻ lớp để hủy/đổi buổi hoặc mở danh sách lớp. Dấu ! đỏ ở góc thẻ là buổi chuyển lịch hoặc hủy cuối khóa. Đưa chuột vào dấu ! hoặc chạm giữ để xem chi tiết. Admin thêm giờ SOA (Office) cho FET và chọn Interview, event hoặc Lớp EB. Thẻ SOA nền trắng, chữ đỏ, không tính buổi dạy. Ô giờ SOA ở Mục H vẫn do Admin nhập theo tháng.</p></div>' +
      '<div class="btn-row">' + soaBtn + '<button type="button" class="btn" data-act="week" data-dir="-1">‹ Tuần trước</button>' +
      '<strong>' + (ui.weekOffset === 0 ? 'Tuần này · ' : '') + esc(model.label) + '</strong>' +
      '<button type="button" class="btn" data-act="week" data-dir="1"' + (ui.weekOffset === 0 ? ' disabled' : '') + '>Tuần sau ›</button></div></div>' +
      '<div class="filter-bar">' + staffFilterSelect('FET', 'fet', L.FET) + staffFilterSelect('CM', 'cm', L.STAFF) + staffFilterSelect('TA', 'ta', L.STAFF) +
      '<button type="button" class="btn" data-act="clear-filter">Bỏ lọc</button></div>' +
      summaryHtml(model.stats, ui.staffFilter.fet) + exportBtns +
      '<div class="schedule">' + timetableHtml(model.stats.grid, model.now) + '</div>' + modalHtml());
  }

  function groupBlocks(mode) {
    var now = new Date();
    var month = L.monthKey(now);
    return L.GROUPS.map(function (group) {
      var list = state.classes.filter(function (cls) {
        var level = mode === 'homework' ? L.homeworkLevel(cls, month) : L.currentLevel(cls);
        return classGroupId(cls, level) === group.id;
      }).sort(function (a, b) {
        if (group.id === 'CUSTOM') return L.currentName(a).localeCompare(L.currentName(b), 'vi');
        var left = mode === 'homework' ? L.homeworkLevel(a, month) : L.currentLevel(a);
        var right = mode === 'homework' ? L.homeworkLevel(b, month) : L.currentLevel(b);
        return L.gradeIndex(left.gradeId) - L.gradeIndex(right.gradeId) || (left.number || 0) - (right.number || 0);
      });
      var cards = list.length ? list.map(function (cls) { return folderCard(cls, now, mode); }).join('') : '<p class="muted">Chưa có lớp trong nhóm này.</p>';
      return '<section class="group-block group-' + group.id.toLowerCase() + '"><h3>' + esc(group.label) + '</h3><div class="folder-grid">' + cards + '</div></section>';
    }).join('');
  }

  function viewHomework() {
    return shell('<div class="section-head"><div><button type="button" class="btn" data-act="nav" data-screen="menu">← Menu</button>' +
      '<h2>Theo dõi chuyên cần</h2></div></div>' +
      '<p class="help">Homework progress dùng cùng thư mục lớp với mục A. Chuyên cần tính từ tháng lớp được thiết lập. Lớp khởi điểm giữ trình độ cũ trong tháng lên cấp. Lớp add-in chuyển sang trình độ mới ngay trong tháng đó. Ô buổi đã qua, kể cả buổi trước ngày học viên vào lớp, vẫn đánh dấu được.</p>' +
      summaryHtml(currentWeekStats(null)) + groupBlocks('homework'));
  }

  function hwBounds(cls) {
    var first = L.monthKey(new Date(cls.levelHistory[0].from));
    var last = L.monthKey(new Date());
    if (first > last) last = first;
    return { first: first, last: last };
  }

  function clampHwMonth(cls, key) {
    var bounds = hwBounds(cls);
    if (!key || key < bounds.first) return bounds.first;
    if (key > bounds.last) return bounds.last;
    return key;
  }

  function bangHtml(detail) {
    if (!detail) return '';
    return '<span class="bang" data-detail="' + esc(detail) + '" role="note" aria-label="Chi tiết đổi buổi">!</span>';
  }

  function sessionHead(session, detail) {
    var day = L.DAYS.filter(function (item) { return item.dow === session.dow; })[0];
    var parts = session.iso.split('-');
    return bangHtml(detail) + (day ? day.short : '') + '<br>' + parts[2] + '/' + parts[1] + '<br>' + esc(L.formatTimeValue(session.start));
  }

  function hwNotes(student) {
    var notes = [];
    var seen = {};
    student.cells.forEach(function (cell) {
      if (cell.mode !== 'out' && cell.mode !== 'in-from') return;
      var key = cell.mode + ':' + cell.classId + ':' + cell.className;
      if (seen[key]) return;
      seen[key] = true;
      notes.push(cell);
    });
    return notes.map(function (cell) {
      var lead = cell.mode === 'out' ? 'Đã chuyển lớp sang ' : 'Chuyển lớp từ ';
      var link = cell.classId
        ? '<button type="button" class="linkish" data-act="open-homework" data-id="' + esc(cell.classId) + '">' + esc(cell.className) + '</button>'
        : esc(cell.className);
      return '<div class="hw-note">' + lead + link + '</div>';
    }).join('');
  }

  function hwCellHtml(stu, cell) {
    if (stu && stu.unavailable) {
      return '<td class="hw-slot"><span class="hw-mark hw-unavailable" aria-disabled="true">·</span></td>';
    }
    var open = cell.mode === 'here' || cell.canBackfill;
    if (!open && cell.mode === 'before') return '<td class="hw-slot"><span class="hw-mark hw-before">—</span></td>';
    if (cell.mode === 'out' || cell.mode === 'in-from') return '<td class="hw-slot"><span class="hw-mark hw-moved">MOVED</span></td>';
    var spec = cell.status ? L.HW_STATUS[cell.status] : null;
    var cls = spec ? ' hw-' + cell.status : ' hw-empty';
    var label = spec ? spec.label : '·';
    if (!canMark() || !open) return '<td class="hw-slot"><span class="hw-mark' + cls + '">' + label + '</span></td>';
    return '<td class="hw-slot"><button type="button" class="hw-mark' + cls + '" data-act="hw-cell" data-id="' + esc(stu.id) + '" data-key="' + esc(cell.key) + '">' + label + '</button></td>';
  }

  function hwCards(groups) {
    function box(cls, title, names) {
      var body = names.length ? names.map(function (name) { return esc(name); }).join(', ') : '<span class="muted">Không có</span>';
      return '<div class="hw-card ' + cls + '"><b>' + title + '</b><span>' + names.length + ' học viên</span><p>' + body + '</p></div>';
    }
    return '<div class="hw-cards">' +
      box('is-perfect', 'Hoàn thành 100% trong tháng', groups.perfect) +
      box('is-high', 'Hoàn thành trên 90% trong tháng', groups.high) +
      box('is-low', 'Học viên hoàn thiện trong 40% đến 80% tổng bài tập tháng', groups.mid) +
      box('is-empty', 'Học viên hoàn thành dưới 40% tổng bài tập tháng', groups.below) +
      '</div>';
  }

  function hwLegend() {
    return '<div class="hw-legend"><p><b>DONE</b> xanh lá: đã hoàn thành bài tập, tính 100%. <b>NONE</b> đỏ: chưa làm bài, tính 0%. <b>MISS</b> cam: thiếu bài, tính 50%. <b>ABSENT</b> nền trắng chữ đen: vắng mặt, không bù, tính 0%. <b>APPLIED</b> cyan: vắng mặt đã bù, tính 100% buổi đó. <b>MOVED</b> xanh/vàng: chuyển lớp, không tính vào tỉ lệ.</p>' +
      '<p>Tỉ lệ tháng bằng tổng điểm các buổi học viên đang ở lớp, chia đều cho số buổi đó. Ô chưa đánh dấu tính 0%. Buổi sau khi chuyển đi không tính. Buổi đã qua, kể cả trước ngày vào lớp, Admin và Commenter vẫn bấm để đánh dấu.</p>' +
      '<p>Hàng xanh là chuyên cần trên 80%. Hàng đỏ là dưới 50% trong tháng. Khung vàng là học viên từ 40% đến 80%. Khung đỏ là học viên dưới 40%. Học viên đã dừng nằm cuối bảng, ô chuyên cần khóa và dòng ghi Unavailable.</p></div>';
  }

  function viewHomeworkClass() {
    var cls = findClass(ui.classId);
    if (!cls) { ui.screen = 'homework'; return viewHomework(); }
    ui.hwMonth = clampHwMonth(cls, ui.hwMonth);
    var bounds = hwBounds(cls);
    var board = L.homeworkBoard(cls, state.classes, ui.hwMonth);
    var level = L.homeworkLevel(cls, ui.hwMonth);
    var grade = L.gradeById(level.gradeId || cls.gradeId);
    var levelName = level.name || L.currentName(cls);
    var held = levelName !== L.currentName(cls)
      ? '<p class="help">Bảng tháng này theo trình độ ' + esc(levelName) + '. Trình độ hiện tại của lớp là ' + esc(L.currentName(cls)) + '.</p>'
      : '';
    var pick = canExportHomework();
    var headDates = board.sessions.map(function (session) {
      var detail = cls ? (L.sessionAlerts(cls)[session.key] || '') : '';
      return '<th class="hw-date">' + sessionHead(session, detail) + '</th>';
    }).join('');
    var rows = board.students.length ? board.students.map(function (stu) {
      var pct = stu.unavailable || stu.rate === null ? null : Math.round(stu.rate * 100);
      var rowCls = stu.unavailable ? 'hw-row-unavailable' : (pct !== null && pct > 80 ? 'hw-row-high' : (pct !== null && pct < 50 ? 'hw-row-low' : ''));
      var box = pick ? '<td><input type="checkbox" data-hw-pick="' + esc(stu.id) + '"' + (ui.hwPick[stu.id] ? ' checked' : '') + ' aria-label="Chọn ' + esc(stu.name) + '"></td>' : '';
      return '<tr class="' + rowCls + '">' + box +
        '<td class="hw-name"><button type="button" class="stu-name" data-act="open-student" data-id="' + esc(stu.id) + '">' + esc(stu.name) + '</button>' +
        (stu.unavailable ? '<div class="hw-unavailable">Unavailable</div>' : '') + hwNotes(stu) + '</td>' +
        '<td>' + esc(showText(stu.englishName)) + '</td>' +
        stu.cells.map(function (cell) { return hwCellHtml(stu, cell); }).join('') +
        '<td class="hw-rate">' + (stu.unavailable ? 'Unavailable' : percentText(stu.rate)) + '</td></tr>';
    }).join('') : '<tr><td colspan="' + (board.sessions.length + (pick ? 4 : 3)) + '">Chưa có học viên trong tháng này.</td></tr>';
    var updateBtn = canMark() ? '<button type="button" class="btn" data-act="open-hw-import">Cập nhật Excel</button>' : '';
    var tools = (pick || updateBtn)
      ? '<div class="btn-row">' + updateBtn +
        (pick ? '<button type="button" class="btn" data-act="export-homework" data-kind="xlsx">Excel</button>' +
        '<button type="button" class="btn" data-act="export-homework" data-kind="pdf">PDF</button>' +
        '<button type="button" class="btn" data-act="export-homework" data-kind="img">Ảnh</button>' +
        '<button type="button" class="btn" data-act="export-homework" data-kind="print">Print (in)</button>' : '') +
        '</div>' +
        '<p class="help">Cập nhật Excel ghi dấu từ hàng 2 theo ngày của lớp, kể cả tháng đã qua. Cột lệch ngày dán vào buổi gần nhất chưa có dữ liệu.</p>' +
        (pick ? '<p class="help">Tick một hoặc nhiều học viên để xuất hoặc in riêng. Không tick thì xuất hoặc in cả danh sách tháng này. Print (in) mở hộp thoại in của máy.</p>' : '')
      : '<p class="help">Tài khoản này không xuất và không in bảng chuyên cần.</p>';
    return shell('<div class="section-head"><div><button type="button" class="btn" data-act="nav" data-screen="homework">← Chuyên cần</button>' +
      '<h2>' + esc(levelName) + '</h2><p class="meta">' + esc(gradeText(grade, cls)) + ' · ' + esc(kindLabel(cls)) + ' · ' + esc(L.scheduleText(cls)) + '</p>' + held + '</div>' +
      '<div class="btn-row"><button type="button" class="btn" data-act="hw-month" data-dir="-1"' + (ui.hwMonth === bounds.first ? ' disabled' : '') + '>‹ Tháng trước</button>' +
      '<strong>' + esc(L.monthLabel(ui.hwMonth)) + '</strong>' +
      '<button type="button" class="btn" data-act="hw-month" data-dir="1"' + (ui.hwMonth === bounds.last ? ' disabled' : '') + '>Tháng sau ›</button></div></div>' +
      hwCards(board.groups) + tools +
      '<p class="help">Học viên đã dừng nằm cuối bảng. Ô chuyên cần của các em bị khóa và dòng ghi Unavailable.</p>' +
      '<div class="grid-scroll"><table class="hw-table"><thead><tr>' +
      (pick ? '<th><input type="checkbox" data-hw-all aria-label="Chọn tất cả"></th>' : '') +
      '<th>Học viên</th><th>English name</th>' + headDates + '<th>Tỉ lệ</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      hwLegend() + detailHtml() + modalHtml());
  }

  function staffOptions(list, selected) {
    var html = '<option value="">— Không chọn —</option>';
    var seen = false;
    list.forEach(function (name) {
      if (name === selected) seen = true;
      html += '<option value="' + esc(name) + '"' + (name === selected ? ' selected' : '') + '>' + esc(name) + '</option>';
    });
    if (selected && !seen) html += '<option value="' + esc(selected) + '" selected>' + esc(selected) + '</option>';
    return html;
  }

  function dayEditor(schedule) {
    var map = {};
    (schedule || []).forEach(function (slot) { map[slot.dow] = slot; });
    return L.DAYS.map(function (day) {
      var slot = map[day.dow];
      var on = !!slot;
      return '<div class="day-row" data-day="' + day.dow + '"><label class="checkline"><input type="checkbox" data-day-toggle' + (on ? ' checked' : '') + '> ' + esc(day.label) + '</label>' +
        '<input data-start type="time" value="' + esc(slot ? slot.start : '') + '"' + (on ? '' : ' disabled') + '>' +
        '<input data-end type="time" value="' + esc(slot ? slot.end : '') + '"' + (on ? '' : ' disabled') + '></div>';
    }).join('');
  }

  function modalShell(title, body, footer) {
    return '<div class="scrim"><div class="modal" data-stop role="dialog"><div class="dialog-head"><h2>' + title + '</h2>' +
      '<button type="button" class="icon-x" data-act="close-modal" aria-label="Đóng">X</button></div>' +
      body + '<p class="form-error">' + esc(ui.formError) + '</p><div class="modal-foot">' + footer + '</div></div></div>';
  }

  function classForm(mode) {
    var editing = mode === 'edit' ? findClass(ui.classId) : null;
    var choice = 'KINDY';
    var gradeId = L.gradesForChoice('KINDY')[0].id;
    var number = L.nextNumber(state.classes, 'KINDY');
    var start = L.todayInput(new Date());
    var schedule = [];
    var fet = '';
    var cm = '';
    var ta = '';
    var kind = 'starter';
    if (editing) {
      var grade = L.gradeById(editing.gradeId);
      if (grade) {
        choice = grade.track === 'IELTS' ? 'TEENS' : grade.track;
        gradeId = editing.gradeId;
      }
      number = editing.number;
      var openLevel = L.currentLevel(editing);
      start = L.todayInput(new Date(openLevel && openLevel.from ? openLevel.from : editing.cycleStart));
      schedule = editing.schedule;
      fet = editing.fet;
      cm = editing.cm;
      ta = editing.ta;
      kind = editing.kind === 'custom' ? 'custom' : editing.kind;
    }
    var grades = L.gradesForChoice(choice);
    var selectedGrade = L.gradeById(gradeId);
    var customEdit = !!(editing && editing.kind === 'custom');
    var keepToken = customEdit && !selectedGrade;
    var levelHelp = customEdit
      ? 'Admin sửa tên custom, cấp độ và ngày bắt đầu. Học viên và chuyên cần giữ nguyên. Lớp custom không lên trình độ.'
      : (editing
        ? 'Admin sửa số lớp, trình độ, cấp độ và ngày bắt đầu của cấp độ đang mở. Học viên, chuyên cần và lịch các cấp trước giữ nguyên.'
        : lessonHint(selectedGrade));
    var previewHome = editing && editing.homeTrack === 'TEENS' ? 'TEENS' : '';
    var previewText = customEdit
      ? L.currentName(editing)
      : (selectedGrade ? L.className(selectedGrade, number, previewHome) : '—');
    var gradeOptions = grades.map(function (item) {
      return '<option value="' + item.id + '"' + (item.id === gradeId ? ' selected' : '') + '>' + esc(item.label) + '</option>';
    }).join('');
    if (keepToken) gradeOptions = '<option value="" selected>Giữ ký hiệu ' + esc(editing.customLevel || 'hiện tại') + '</option>' + gradeOptions;
    var createFields = '<div class="field" id="number-row"' + (customEdit ? ' hidden' : '') + '><span>Số lớp</span><input id="f-number" name="number" type="number" min="1" max="9999" value="' + number + '"' + (editing ? ' data-dirty="1"' : '') + (customEdit ? '' : ' required') + '></div>' +
      '<div class="field" id="custom-name-row"' + (customEdit ? '' : ' hidden') + '><span>Tên custom</span><input id="f-custom" name="customName" maxlength="40" placeholder="VD: VIP1" value="' + esc(editing && editing.customName ? editing.customName : '') + '"' + (customEdit ? ' required' : '') + '></div>' +
      '<label class="field"><span>Trình độ</span><select id="f-track" name="track">' +
      L.LEVEL_CHOICES.map(function (item) { return '<option' + (item === choice ? ' selected' : '') + '>' + item + '</option>'; }).join('') +
      '</select></label>' +
      '<label class="field"><span>Cấp độ</span><select id="f-grade" name="grade">' + gradeOptions + '</select></label>' +
      '<p class="field-label">Tên khi hiển thị</p><div class="preview-name" id="name-preview">' + esc(previewText) + '</div>' +
      '<p class="help" id="lesson-hint">' + esc(levelHelp) + '</p>';
    var fixedSchedule = editing
      ? '<label class="checkline"><input type="checkbox" name="fixSchedule" id="f-fix"> Sửa lịch học cố định</label>' +
        '<div id="fix-box" hidden><label class="field"><span>Ngày bắt đầu lịch mới</span><input name="fixFrom" type="date" value="' + esc(L.todayInput(new Date())) + '"></label>' +
        '<p class="help">Chọn lại các buổi ở lịch phía trên. Buổi không đổi giờ thì giữ nguyên. Các buổi trước ngày này giữ lịch cũ. Từ ngày này, lớp học theo lịch mới.</p></div>'
      : '';
    var closeEnd = editing && editing.endOpen
      ? '<label class="checkline"><input type="checkbox" name="closeEnd"> Chốt ngày kết thúc theo số buổi của cấp độ</label>' +
        '<p class="help">Đang để 99/99/9999. Chỉ chọn mục này khi muốn tính ngày kết thúc theo số buổi của cấp độ. Lớp custom không lên trình độ. Lớp TEENS sau TEENS 2B lên thang IELTS và vẫn giữ tên trình độ TEENS.</p>'
      : '';
    var startHelp = editing && editing.levelHistory && editing.levelHistory.length > 1
      ? '<p class="help">Ngày này là ngày bắt đầu của cấp độ đang mở. Các cấp độ trước giữ nguyên. Lần lưu này không tự lên cấp lớp vừa sửa.</p>'
      : '';
    var body = '<form id="class-form">' +
      createFields +
      kindField(kind, editing ? 'edit' : 'add') +
      '<label class="field"><span>Ngày bắt đầu cấp độ</span><input name="start" type="date" value="' + esc(start) + '" required></label>' +
      startHelp +
      '<p class="field-label">Lịch học trong tuần (tối đa 7 buổi)</p>' + dayEditor(schedule) +
      fixedSchedule +
      closeEnd +
      '<label class="field"><span>FET</span><select name="fet">' + staffOptions(L.FET, fet) + '</select></label>' +
      '<label class="field"><span>CM phụ trách</span><select name="cm">' + staffOptions(L.STAFF, cm) + '</select></label>' +
      '<label class="field"><span>TA phụ trách</span><select name="ta">' + staffOptions(L.STAFF, ta) + '</select></label>' +
      '<p class="help">Bỏ trống FET, CM hoặc TA thì hồ sơ hiện dấu ?</p></form>';
    var footer = '<button type="submit" form="class-form" class="btn btn-primary">' + (editing ? 'Lưu lớp' : 'Tạo lớp') + '</button>' +
      (editing ? '<button type="button" class="btn btn-danger" data-act="delete-class">Xóa lớp</button>' : '') +
      '<button type="button" class="btn" data-act="close-modal">Hủy</button>';
    return modalShell(editing ? 'Sửa thông tin lớp' : 'Thêm lớp mới', body, footer);
  }

  function trialOptions(cls, stu) {
    var choices = classSessionChoices(cls);
    if (!choices.length) return '<option value="">Lớp chưa có lịch để xếp buổi Trial.</option>';
    var current = stu && stu.trialOn ? (stu.trialOn + '|' + (stu.trialStart || '') + '|' + (stu.trialEnd || '')) : '';
    var picked = false;
    return choices.map(function (ses) {
      var value = ses.iso + '|' + ses.start + '|' + ses.end;
      var day = L.DAYS.filter(function (item) { return item.dow === ses.dow; })[0];
      var label = L.formatDMY(ses.date) + ' · ' + (day ? day.short + ' ' : '') + L.formatTimeValue(ses.start) + '–' + L.formatTimeValue(ses.end);
      var select = false;
      if (current && value === current) select = true;
      else if (!current && !picked && ses.endDate.getTime() >= Date.now()) { select = true; picked = true; }
      return '<option value="' + esc(value) + '"' + (select ? ' selected' : '') + '>' + esc(label) + '</option>';
    }).join('');
  }

  function rejoinRecord() {
    if (!ui.modal || ui.modal.type !== 'add-student' || !ui.modal.rejoinId) return null;
    var found = null;
    (state.archive || []).forEach(function (item) { if (item.id === ui.modal.rejoinId) found = item; });
    return found;
  }

  function paintRejoin(query) {
    var box = document.getElementById('rejoin-list');
    if (!box) return;
    var q = String(query || '').trim().toLowerCase();
    if (!q) { box.innerHTML = ''; return; }
    var hits = (state.archive || []).filter(function (stu) {
      var name = String(stu.name || '').toLowerCase();
      var code = String(stu.code || '').toLowerCase();
      return name.indexOf(q) >= 0 || code.indexOf(q) >= 0;
    });
    var shown = hits.slice(0, 8);
    box.innerHTML = shown.length ? shown.map(function (stu) {
      return '<button type="button" class="rejoin-hit" data-act="rejoin-pick" data-id="' + esc(stu.id) + '">' +
        esc(stu.name || '') + ' · ' + esc(stu.code || '') + '</button>';
    }).join('') + (hits.length > 8 ? '<p class="help">Gõ thêm để thu hẹp.</p>' : '') : '<p class="help">Không thấy học viên cũ khớp.</p>';
  }

  function studentForm() {
    var editing = ui.modal && ui.modal.type === 'edit-student' ? findStudent(ui.modal.id) : null;
    var stu = editing ? editing.stu : null;
    var rejoin = stu ? null : rejoinRecord();
    var seed = stu || rejoin;
    var host = editing ? editing.cls : findClass(ui.classId);
    var enroll = stu ? L.enrollOf(stu) : (rejoin && rejoin.enroll === 'trial' ? 'trial' : 'official');
    var lessons = stu && stu.scholarshipLessons ? stu.scholarshipLessons : 8;
    var genders = ['Nam', 'Nữ', 'Khác'];
    if (seed && seed.gender === '?') genders.push('?');
    if (seed && seed.gender === '-') genders.push('-');
    if (seed && seed.gender && genders.indexOf(seed.gender) < 0) genders.push(seed.gender);
    var rejoinBox = stu ? '' :
      '<label class="field"><span>Tìm học viên cũ/kết thúc</span><input id="rejoin-q" placeholder="Tên hoặc mã học viên" autocomplete="off"></label>' +
      '<div id="rejoin-list" class="rejoin-list"></div>' +
      (rejoin ? '<p class="help">Đang cho vào lại: ' + esc(rejoin.name || '') + ' · ' + esc(rejoin.code || '') + '</p>' : '') +
      '<p class="help">Tìm theo tên hoặc mã trong Học viên cũ/kết thúc để vào lại lớp bằng Chính thức hoặc Trial. Học viên xóa vĩnh viễn không nằm trong danh sách này.</p>';
    var body = '<form id="student-form">' +
      rejoinBox +
      '<label class="field"><span>Loại học viên</span><select name="enroll" id="f-enroll">' +
      '<option value="official"' + (enroll === 'official' ? ' selected' : '') + '>Chính thức</option>' +
      '<option value="trial"' + (enroll === 'trial' ? ' selected' : '') + '>Trial</option>' +
      '<option value="scholarship"' + (enroll === 'scholarship' ? ' selected' : '') + '>Học bổng</option></select></label>' +
      '<div id="trial-box"' + (enroll === 'trial' ? '' : ' hidden') + '><label class="field"><span>Buổi Trial</span><select name="trialSession">' +
      trialOptions(host, stu) + '</select></label>' +
      '<p class="help">Trial ở đúng một buổi đã xếp. Nếu ngày đó đã qua và học viên chưa chuyển lớp, dòng nằm cuối danh sách, màu xám, không có số thứ tự, trong 7 ngày rồi chuyển vào Học viên cũ/kết thúc. Đổi sang Chính thức hoặc Học bổng để học tiếp hoặc chuyển lớp.</p></div>' +
      '<div id="scholar-box"' + (enroll === 'scholarship' ? '' : ' hidden') + '><label class="field"><span>Số buổi học bổng (tối đa 24)</span>' +
      '<input name="scholarshipLessons" type="number" min="1" max="24" value="' + esc(String(lessons)) + '"></label>' +
      '<p class="help">Học viên được đánh dấu vàng Học viên 1 tháng và có số thứ tự đến khi hết số buổi này.</p></div>' +
      '<label class="field"><span>Mã học viên</span><input name="code" required value="' + esc(seed ? seed.code : L.nextStudentCode(state.classes, state.archive)) + '"></label>' +
      '<label class="field"><span>Tên học viên</span><input name="name" required value="' + esc(seed ? seed.name : '') + '"></label>' +
      '<label class="field"><span>Tên tiếng Anh</span><input name="englishName" value="' + esc(seed ? seed.englishName : '') + '"></label>' +
      '<label class="field"><span>Giới tính</span><select name="gender">' +
      genders.map(function (g) { return '<option' + (seed && seed.gender === g ? ' selected' : '') + '>' + g + '</option>'; }).join('') +
      '</select></label>' +
      '<label class="field"><span>Ngày sinh</span><input name="dob" type="date" required value="' + esc(seed && seed.dob && seed.dob !== '?' && seed.dob !== '-' ? String(seed.dob).slice(0, 10) : '') + '"></label>' +
      '<label class="field"><span>Số điện thoại</span><input name="phone" value="' + esc(seed ? seed.phone : '') + '"></label>' +
      '<label class="field"><span>First EC</span><input name="ec" value="' + esc(seed ? seed.ec : '') + '"></label></form>';
    var footer = '<button type="submit" form="student-form" class="btn btn-primary">Lưu</button>' +
      (stu ? '<button type="button" class="btn btn-danger" data-act="delete-one" data-id="' + esc(stu.id) + '">Xóa học viên</button>' : '') +
      '<button type="button" class="btn" data-act="close-modal">Hủy</button>';
    return modalShell(stu ? 'Sửa học viên' : 'Thêm học viên', body, footer);
  }

  function importForm() {
    var cols = L.STUDENT_COLUMNS.map(function (col, index) {
      return '<li>Cột ' + String.fromCharCode(65 + index) + ' · ' + esc(col.label) + '</li>';
    }).join('');
    var body = '<p class="help">Hàng 1 là tiêu đề. Học viên được lấy từ hàng 2 trở xuống, mỗi người một hàng. File mẫu có sẵn đúng thứ tự cột.</p>' +
      '<ol class="col-list">' + cols + '</ol>' +
      '<p class="help">Ngày sinh ghi DD/MM/YYYY. Học viên mới thiếu tên tiếng Anh, giới tính, ngày sinh, số điện thoại hoặc EC thì ghi ?. Mã để trống sẽ được cấp tự động. Hàng trùng mã thì bỏ qua. Mã đang nằm trong Học viên cũ/kết thúc không ghi đè bằng Excel. Dùng Thêm học viên để cho em vào lại lớp.</p>' +
      '<p class="help">Nếu tên trùng học viên đang có trong lớp, file chỉ bổ sung ô còn thiếu (?, - hoặc trống) và không tạo thêm người trùng tên. Tên mới vẫn được thêm. Sĩ số có số thứ tự tối đa 20.</p>' +
      '<label class="field"><span>File Excel (.xlsx, .xls)</span><input id="excel-file" type="file" accept=".xlsx,.xls,.xlsm,.xlsb"></label>' +
      '<div id="import-status" class="import-status"></div>';
    var footer = '<button type="button" class="btn" data-act="download-template">Tải file mẫu</button>' +
      '<button type="button" class="btn btn-primary" data-act="run-import">Cập nhật vào lớp</button>' +
      '<button type="button" class="btn" data-act="close-modal">Hủy</button>';
    return modalShell('Cập nhật học viên từ Excel', body, footer);
  }

  function setImportStatus(message, errors) {
    var el = document.getElementById('import-status');
    if (!el) return;
    var list = '';
    if (errors && errors.length) {
      list = '<ul class="history-list">' + errors.slice(0, 8).map(function (line) {
        return '<li>' + esc(line) + '</li>';
      }).join('') + (errors.length > 8 ? '<li>… và ' + (errors.length - 8) + ' hàng khác.</li>' : '') + '</ul>';
    }
    el.innerHTML = '<p>' + esc(message) + '</p>' + list;
  }

  function readExcelFile(file) {
    ui.importDraft = null;
    if (!file) return;
    if (!window.XLSX) {
      setImportStatus('Không tải được bộ đọc Excel.');
      return;
    }
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var book = window.XLSX.read(reader.result, { type: 'array', cellDates: false });
        var sheet = book.Sheets[book.SheetNames[0]];
        var rows = window.XLSX.utils.sheet_to_json(sheet, { header: 1, raw: true, defval: '', blankrows: true });
        var cls = findClass(ui.classId);
        ui.importDraft = cls ? L.rowsToClassUpdate(cls, rows, state.classes, state.archive) : { students: [], updates: [], errors: ['Không thấy lớp.'] };
        ui.importDraft.mode = 'students';
        var message = 'Đọc được ' + ui.importDraft.updates.length + ' học viên cần bổ sung và ' + ui.importDraft.students.length + ' học viên mới.';
        if (ui.importDraft.errors.length) message += ' ' + ui.importDraft.errors.length + ' hàng cần xem lại.';
        setImportStatus(message, ui.importDraft.errors);
      } catch (err) {
        ui.importDraft = null;
        setImportStatus('Không đọc được file Excel. Hãy dùng file .xlsx hoặc .xls.');
      }
    };
    reader.readAsArrayBuffer(file);
  }

  function downloadTemplate() {
    if (!window.XLSX) { toast('Không tải được bộ đọc Excel.'); return; }
    var header = L.STUDENT_COLUMNS.map(function (col) { return col.label; });
    var sheet = window.XLSX.utils.aoa_to_sheet([header]);
    sheet['!cols'] = header.map(function () { return { wch: 22 }; });
    var book = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(book, sheet, 'Hoc vien');
    window.XLSX.writeFile(book, 'OceanEDU_hoc_vien_mau.xlsx');
  }

  function runImport() {
    var draft = ui.importDraft;
    var updates = draft && draft.updates ? draft.updates : [];
    var fresh = draft && draft.students ? draft.students : [];
    if (!draft || draft.mode === 'homework') {
      showFormError('Chọn file Excel có học viên từ hàng 2.');
      return;
    }
    if (!updates.length && !fresh.length) {
      if (draft.errors && draft.errors.length) {
        showFormError(draft.errors[0]);
        setImportStatus(draft.errors[0], draft.errors);
      } else {
        showFormError('Không có thông tin thiếu để bổ sung và không có học viên mới.');
      }
      return;
    }
    var cls = findClass(ui.classId);
    if (!cls) return;
    var blocked = fresh.length > 0 && listedCount(cls, new Date()) + fresh.length > 20;
    if (blocked && !updates.length) {
      showFormError(ROSTER_FULL);
      return;
    }
    updates.forEach(function (item) {
      var stu = null;
      cls.students.forEach(function (row) { if (row.id === item.id) stu = row; });
      if (!stu || !item.patch) return;
      Object.keys(item.patch).forEach(function (key) { stu[key] = item.patch[key]; });
    });
    var added = 0;
    if (!blocked) {
      var joinedAt = new Date().toISOString();
      fresh.forEach(function (row) {
        row.originClassId = cls.id;
        row.joinedAt = joinedAt;
        cls.students.push(L.createStudent(row));
        added += 1;
      });
    }
    ui.importDraft = null;
    ui.modal = null;
    ui.formError = '';
    save();
    var message = '';
    if (updates.length) message += 'Đã bổ sung thông tin cho ' + updates.length + ' học viên. ';
    if (added) message += 'Đã thêm ' + added + ' học viên. ';
    if (blocked) message += ROSTER_FULL;
    toast(message.trim());
    render();
  }

  function homeworkImportForm() {
    var body = '<p class="help">Hàng 1 là tiêu đề. Từ hàng 2 xuống, mỗi hàng là một học viên. Cột ngày theo buổi của lớp. Ngày nào ghi vào đúng buổi đó trên bảng Data, kể cả tháng đã qua, không khóa trong tháng đang xem.</p>' +
      '<p class="help">Ô ghi DONE, NONE, MISS, ABSENT hoặc APPLIED. Ô trống không xóa dấu cũ. Cột lệch ngày được dán vào buổi học gần nhất chưa có dữ liệu. File mẫu lấy đủ ngày của lớp.</p>' +
      '<label class="field"><span>File Excel (.xlsx, .xls)</span><input id="hw-excel-file" type="file" accept=".xlsx,.xls,.xlsm,.xlsb"></label>' +
      '<div id="import-status" class="import-status"></div>';
    var footer = '<button type="button" class="btn" data-act="download-hw-template">Tải file mẫu</button>' +
      '<button type="button" class="btn btn-primary" data-act="run-hw-import">Cập nhật bảng</button>' +
      '<button type="button" class="btn" data-act="close-modal">Hủy</button>';
    return modalShell('Cập nhật chuyên cần từ Excel', body, footer);
  }

  function readHomeworkFile(file) {
    ui.importDraft = null;
    if (!file) return;
    if (!window.XLSX) {
      setImportStatus('Không tải được bộ đọc Excel.');
      return;
    }
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var book = window.XLSX.read(reader.result, { type: 'array', cellDates: false });
        var sheet = book.Sheets[book.SheetNames[0]];
        var rows = window.XLSX.utils.sheet_to_json(sheet, { header: 1, raw: true, defval: '', blankrows: true });
        ui.importDraft = { mode: 'homework', rows: rows };
        var cls = findClass(ui.classId);
        var probe = cls ? L.attendanceSessions(cls) : [];
        var message = 'Đọc được ' + Math.max(0, rows.length - 1) + ' hàng từ hàng 2. Lớp có ' + probe.length + ' buổi để ghép cột.';
        setImportStatus(message);
      } catch (err) {
        ui.importDraft = null;
        setImportStatus('Không đọc được file Excel. Hãy dùng file .xlsx hoặc .xls.');
      }
    };
    reader.readAsArrayBuffer(file);
  }

  function downloadHomeworkTemplate() {
    if (!window.XLSX) { toast('Không tải được bộ đọc Excel.'); return; }
    var cls = findClass(ui.classId);
    if (!cls) return;
    var header = ['Học viên', 'English name'].concat(L.attendanceSessions(cls).map(function (ses) {
      var parts = ses.iso.split('-');
      return parts[2] + '/' + parts[1] + '/' + parts[0] + ' ' + ses.start;
    }));
    var sheet = window.XLSX.utils.aoa_to_sheet([header]);
    sheet['!cols'] = header.map(function () { return { wch: 22 }; });
    var book = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(book, sheet, 'Chuyen can');
    window.XLSX.writeFile(book, 'OceanEDU_chuyen_can_mau.xlsx');
  }

  function runHomeworkImport() {
    if (deny(canMark())) return;
    var draft = ui.importDraft;
    if (!draft || draft.mode !== 'homework' || !draft.rows) {
      showFormError('Chọn file Excel chuyên cần từ hàng 2.');
      return;
    }
    var cls = findClass(ui.classId);
    if (!cls) return;
    var result = L.applyHomeworkSheet(cls, draft.rows, state.classes);
    if (!result.written && result.errors.length) {
      showFormError(result.errors[0]);
      setImportStatus(result.errors[0], result.errors);
      return;
    }
    ui.importDraft = null;
    ui.modal = null;
    ui.formError = '';
    if (result.written) {
      var first = result.placements && result.placements[0];
      if (first && first.iso) ui.hwMonth = clampHwMonth(cls, first.iso.slice(0, 7));
      save();
    }
    var shifted = (result.placements || []).filter(function (item) { return !item.exact; }).length;
    var message = 'Đã ghi ' + result.written + ' ô chuyên cần' + (shifted ? '. ' + shifted + ' cột lệch ngày đã dán vào buổi gần nhất còn trống.' : '.');
    if (result.errors.length) message += ' ' + result.errors.length + ' chỗ cần xem lại: ' + result.errors[0];
    toast(message);
    render();
  }

  function transferForm() {
    var current = findClass(ui.classId);
    var options = state.classes.filter(function (cls) { return cls.id !== current.id; }).sort(function (a, b) {
      return L.currentName(a).localeCompare(L.currentName(b), 'vi');
    });
    var picked = ui.modal && ui.modal.target ? ui.modal.target : '';
    var body = options.length
      ? '<p>Chuyển ' + selectedIds().length + ' học viên đang chọn.</p>' +
        '<label class="field"><span>Tìm lớp chuyển đến</span><input id="transfer-q" placeholder="Tên lớp" autocomplete="off"></label>' +
        '<input type="hidden" id="transfer-target" value="' + esc(picked) + '">' +
        '<div class="pick-grid" id="transfer-picks">' +
        options.map(function (cls) {
          var on = picked === cls.id ? ' is-on' : '';
          return '<button type="button" class="pick-opt' + on + '" data-act="transfer-pick" data-id="' + esc(cls.id) + '" data-name="' + esc(L.currentName(cls).toLowerCase()) + '">' +
            '<span>' + esc(L.currentName(cls)) + '<small>' + esc(gradeText(L.gradeById(cls.gradeId), cls)) + '</small></span></button>';
        }).join('') + '</div>' +
        '<p id="transfer-level-note" class="help" hidden>Bạn đang xếp chuyển lớp lệch trình độ.</p><p class="help">Sau khi xác nhận, học viên có dòng đỏ "Chuyển lớp từ [lớp cũ]". Dòng này tự mất sau 1 tháng.</p>'
      : '<p>Chưa có lớp khác để chuyển.</p>';
    var footer = (options.length ? '<button type="button" class="btn btn-primary" data-act="confirm-transfer">Xác nhận</button>' : '') +
      '<button type="button" class="btn" data-act="close-modal">Hủy</button>';
    return modalShell('Chuyển lớp', body, footer);
  }

  function confirmForm() {
    var modal = ui.modal;
    var extra = modal.id ? ' data-id="' + esc(modal.id) + '"' : '';
    return modalShell('Xác nhận', '<p>' + esc(modal.text) + '</p>',
      '<button type="button" class="btn btn-danger" data-act="' + esc(modal.yes) + '"' + extra + '>Xác nhận</button>' +
      '<button type="button" class="btn" data-act="close-modal">Hủy</button>');
  }

  function hwMarkForm() {
    var modal = ui.modal;
    var found = findStudent(modal.id);
    var keyBits = String(modal.iso || '').split('|');
    var when = keyBits[0] ? keyBits[0].split('-').reverse().join('/') : '';
    if (keyBits[1]) when += ' · ' + L.formatTimeValue(keyBits[1]);
    var choices = Object.keys(L.HW_STATUS).map(function (key) {
      return '<button type="button" class="hw-mark hw-' + key + '" data-act="hw-set" data-status="' + key + '">' + L.HW_STATUS[key].label + '</button>';
    }).join('');
    return modalShell('Đánh dấu buổi ' + when, '<p>' + esc(found ? found.stu.name : '') + '</p><div class="hw-choices">' + choices + '</div>',
      '<button type="button" class="btn" data-act="hw-set" data-status="">Xóa dấu</button><button type="button" class="btn" data-act="close-modal">Đóng</button>');
  }

  function sessionLabel(modal) {
    var date = modal && modal.iso ? String(modal.iso).split('-').reverse().join('/') : '';
    var time = modal && modal.start && modal.end ? L.formatTimeValue(modal.start) + '–' + L.formatTimeValue(modal.end) : '';
    return date + (time ? ' · ' + time : '');
  }

  function scheduleChoiceForm() {
    var cls = findClass(ui.modal.id);
    var fetBox = '';
    if (cls && canEdit()) {
      var key = String(ui.modal.iso || '') + '|' + String(ui.modal.start || '');
      var override = cls.sessionFets && cls.sessionFets[key] ? cls.sessionFets[key] : '';
      var names = {};
      L.classFetNames(cls).forEach(function (name) { names[name] = true; });
      L.FET.forEach(function (name) { names[name] = true; });
      var options = '<option value="">FET lớp</option>' + Object.keys(names).map(function (name) {
        return '<option value="' + esc(name) + '"' + (override === name ? ' selected' : '') + '>' + esc(name) + '</option>';
      }).join('');
      fetBox = '<label class="field"><span>FET phụ trách buổi này</span><select id="session-fet">' + options + '</select></label>' +
        '<p class="help">Mục này chỉ hiện khi buổi đã được chọn. Chọn FET lớp thì buổi dùng FET của lớp. Buổi nào chọn giáo viên khác thì hồ sơ lớp hiện đủ các FET đang phụ trách.</p>';
    }
    var move = canEdit() ? '<button type="button" class="btn btn-primary" data-act="move-session">Hủy/ đổi buổi</button>' : '';
    var saveFet = canEdit() ? '<button type="button" class="btn" data-act="save-session-fet">Lưu FET buổi</button>' : '';
    return modalShell('Buổi học',
      '<p><b>' + esc(cls ? L.currentName(cls) : '') + '</b></p><p>' + esc(sessionLabel(ui.modal)) + '</p>' + fetBox,
      move + saveFet +
      '<button type="button" class="btn" data-act="open-class" data-id="' + esc(ui.modal.id) + '">Xem chi tiết lớp</button>');
  }

  function moveForm() {
    var cls = findClass(ui.modal.id);
    var custom = ui.modal.action === 'custom';
    return modalShell('Hủy / đổi buổi',
      '<p><b>' + esc(cls ? L.currentName(cls) : '') + '</b> · ' + esc(sessionLabel(ui.modal)) + '</p>' +
      '<label class="checkline"><input type="radio" name="move-mode" value="defer"' + (custom ? '' : ' checked') + '> Lùi về cuối khóa</label>' +
      '<label class="checkline"><input type="radio" name="move-mode" value="custom"' + (custom ? ' checked' : '') + '> Custom</label>' +
      '<div id="custom-slot"' + (custom ? '' : ' hidden') + '>' +
      '<label class="field"><span>Ngày mới</span><input id="move-date" type="date" value="' + esc(ui.modal.iso || '') + '"></label>' +
      '<label class="field"><span>Giờ bắt đầu</span><input id="move-start" type="time" value="' + esc(ui.modal.start || '') + '"></label>' +
      '<label class="field"><span>Giờ kết thúc</span><input id="move-end" type="time" value="' + esc(ui.modal.end || '') + '"></label></div>' +
      '<label class="field"><span>Lý do</span><textarea id="move-reason" placeholder="Để trống sẽ ghi none"></textarea></label>' +
      '<p class="help">Lùi về cuối khóa chuyển buổi này thành buổi ngay sau buổi cuối theo lịch tuần, và ngày kết thúc khóa đổi theo. Ví dụ lớp thứ 7 và Chủ Nhật kết thúc thứ 7 ngày 3/10 thì buổi bù rơi vào Chủ Nhật 4/10. Custom chọn ngày và giờ mới.</p>',
      '<button type="button" class="btn btn-primary" data-act="save-move">Lưu</button><button type="button" class="btn" data-act="close-modal">Hủy</button>');
  }

  function classPickButtons(selectedId) {
    return state.classes.slice().sort(function (a, b) {
      return L.currentName(a).localeCompare(L.currentName(b), 'vi');
    }).map(function (cls) {
      var on = selectedId === cls.id ? ' is-on' : '';
      return '<button type="button" class="pick-opt' + on + '" data-act="suggest-class" data-id="' + esc(cls.id) + '" data-name="' + esc(L.currentName(cls).toLowerCase()) + '">' +
        '<span>' + esc(L.currentName(cls)) + '<small>' + esc(L.scheduleText(cls)) + '</small></span></button>';
    }).join('');
  }

  function suggestForm() {
    return modalShell('Đề xuất',
      '<label class="field"><span>Loại đề xuất</span><select id="suggest-type">' +
      '<option value="add">Add học viên</option>' +
      '<option value="transfer">Chuyển lớp</option>' +
      '<option value="other">Khác</option></select></label>' +
      '<label class="field"><span>Nội dung</span><textarea id="suggest-text" maxlength="1500"></textarea></label>' +
      '<p class="help">Gửi lên Google Sheet. Username vào cột Mã nhân sự, tên hiển thị vào cột Tên nhân sự, nội dung vào cột Nội dung. Số thứ tự và thời gian do bảng tính ghi. Mỗi loại vào một thẻ riêng.</p>',
      '<button type="button" class="btn btn-primary" data-act="suggest-send">Gửi</button><button type="button" class="btn" data-act="close-modal">Hủy</button>');
  }

  function feedWhen(item) {
    var at = new Date(item.at);
    if (isNaN(at.getTime())) return '';
    return L.formatDMY(at) + ' ' + L.formatAmPm(at);
  }

  function feedCard(item) {
    var kind = item.kind === 'post' ? 'Thông báo' : 'Hệ thống';
    var who = item.author ? ' · ' + item.author : '';
    var images = (item.images || []).map(function (src, index) {
      return '<button type="button" class="feed-photo" data-act="preview-image" data-id="' + esc(item.id) + '" data-index="' + index + '"><img src="' + src + '" alt="Ảnh thông báo"></button>';
    }).join('');
    return '<article class="feed-card' + (item.kind === 'post' ? ' is-post' : '') + '"><div class="feed-meta">' + esc(kind + who) + ' · ' + esc(feedWhen(item)) + '</div><p>' + esc(item.text) + '</p><div class="feed-photos">' + images + '</div></article>';
  }

  function viewFeed() {
    var month = ui.boardMonth || L.monthKey(new Date());
    var items = state.announcements.filter(function (item) { return item.month === month; }).slice().reverse();
    var posts = items.filter(function (item) { return item.kind === 'post'; });
    var systems = items.filter(function (item) { return item.kind !== 'post'; });
    var composer = '';
    if (canEdit()) {
      var thumbs = (ui.postImages || []).map(function (src, index) {
        return '<span class="thumb"><img src="' + src + '" alt=""><button type="button" class="icon-x" data-act="drop-image" data-index="' + index + '" aria-label="Bỏ ảnh">X</button></span>';
      }).join('');
      composer = '<form id="post-form" class="feed-form"><h3>Thêm thông báo</h3>' +
        '<label class="field"><span>Nội dung</span><textarea id="post-text" maxlength="2000">' + esc(ui.postDraft || '') + '</textarea></label>' +
        '<label class="field"><span>Ảnh</span><input id="post-images" type="file" accept="image/*" multiple></label>' +
        '<div class="thumbs">' + thumbs + '</div>' +
        '<p class="help">Tối đa 4 ảnh. Bấm ảnh để xem, cuộn chuột, chụm ngón hoặc nút +/− để phóng to.</p>' +
        '<button type="submit" class="btn btn-primary">Đăng thông báo</button></form>';
    }
    var postBody = posts.length ? posts.map(feedCard).join('') : '<p class="muted">Chưa có thông báo nhân sự trong tháng này.</p>';
    var systemBody = systems.length ? systems.map(feedCard).join('') : '<p class="muted">Chưa có thay đổi data trong tháng này.</p>';
    var suggest = canSuggest() ? '<button type="button" class="btn btn-primary" data-act="suggest-open">Đề xuất</button>' : '';
    return shell('<div class="section-head"><div><button type="button" class="btn" data-act="nav" data-screen="menu">← Menu</button>' +
      '<h2>Thông báo và đề xuất</h2>' +
      '<p class="help">Mục này là thông báo nhân sự đăng. Thông báo data chỉ ở menu chính. Bấm biểu tượng trên bảng để xem đủ theo tháng.</p></div>' +
      '<div class="btn-row">' + suggest + '</div></div>' +
      '<section class="feed-frame"><h3>Thông tin cập nhật tháng của nhân sự</h3>' + composer + postBody + '</section>' + modalHtml());
  }

  function archivePeople() {
    if (ui.archiveFolder === 'official') {
      var now = new Date();
      var rows = [];
      state.classes.forEach(function (cls) {
        var grade = L.gradeById(cls.gradeId);
        var track = cls.kind === 'custom' ? 'CUSTOM' : (grade ? grade.track : '');
        (cls.students || []).forEach(function (stu) {
          if (!stu || stu.status === 'stopped') return;
          var phase = L.studentPhase(cls, stu, now);
          if (phase.kind !== 'listed') return;
          var enroll = L.enrollOf(stu);
          if (enroll !== 'official' && enroll !== 'scholarship') return;
          rows.push({
            id: stu.id,
            code: stu.code || '',
            name: stu.name || '',
            englishName: stu.englishName || '',
            gender: stu.gender || '',
            dob: stu.dob || '',
            ec: stu.ec || '',
            enroll: enroll,
            lastClassName: L.currentName(cls),
            track: track,
            reason: ''
          });
        });
      });
      return rows;
    }
    if (ui.archiveFolder === 'former') {
      return (state.archive || []).map(function (item) {
        return {
          id: item.id,
          code: item.code || '',
          name: item.name || '',
          englishName: item.englishName || '',
          gender: item.gender || '',
          dob: item.dob || '',
          ec: item.ec || '',
          enroll: item.enroll || 'official',
          lastClassName: item.lastClassName || '',
          track: item.track || '',
          reason: item.reason || ''
        };
      });
    }
    return [];
  }

  function archiveFiltered(rows) {
    var q = String(ui.archiveQuery || '').trim().toLowerCase();
    return rows.filter(function (row) {
      if (ui.archiveTrack && row.track !== ui.archiveTrack) return false;
      if (ui.archiveClass && row.lastClassName !== ui.archiveClass) return false;
      if (ui.archiveEnroll && row.enroll !== ui.archiveEnroll) return false;
      if (!q) return true;
      var blob = [row.name, row.code, row.englishName, row.gender, row.lastClassName, row.ec, enrollLabel(row.enroll), row.reason].join(' ').toLowerCase();
      return blob.indexOf(q) >= 0;
    });
  }

  function viewArchive() {
    if (!ui.archiveFolder) {
      var officialN = 0;
      var now = new Date();
      state.classes.forEach(function (cls) {
        (cls.students || []).forEach(function (stu) {
          if (!stu || stu.status === 'stopped') return;
          var phase = L.studentPhase(cls, stu, now);
          var enroll = L.enrollOf(stu);
          if (phase.kind === 'listed' && (enroll === 'official' || enroll === 'scholarship')) officialN += 1;
        });
      });
      var formerN = (state.archive || []).length;
      return shell('<div class="section-head"><div><button type="button" class="btn" data-act="nav" data-screen="menu">← Menu</button>' +
        '<h2>Thư viện học viên</h2></div></div>' +
        '<p class="help">Official gồm học viên chính thức và học bổng đang có số thứ tự trên danh sách lớp. Học viên cũ/kết thúc dành cho các em đã dừng học hoặc hết hạn. Học viên xóa ở mục A không vào danh sách này.</p>' +
        '<div class="archive-grid">' +
        '<button type="button" class="archive-card is-official" data-act="archive-open" data-folder="official"><strong>Official</strong><span>Học viên chính thức</span><span>' + officialN + ' học viên</span></button>' +
        '<button type="button" class="archive-card is-former" data-act="archive-open" data-folder="former"><strong>Học viên cũ/kết thúc</strong><span>Đã rời danh sách lớp</span><span>' + formerN + ' học viên</span></button></div>');
    }
    var title = ui.archiveFolder === 'former' ? 'Học viên cũ/kết thúc' : 'Official';
    var source = archivePeople();
    var names = [];
    var seenName = {};
    source.forEach(function (row) {
      if (!row.lastClassName || seenName[row.lastClassName]) return;
      seenName[row.lastClassName] = true;
      names.push(row.lastClassName);
    });
    names.sort(function (a, b) { return a.localeCompare(b, 'vi'); });
    var tracks = ['KINDY', 'KIDS', 'TEENS', 'IELTS', 'CUSTOM'];
    var enrolls = ui.archiveFolder === 'former'
      ? [['official', 'Chính thức'], ['trial', 'Trial'], ['scholarship', 'Học bổng']]
      : [['official', 'Chính thức'], ['scholarship', 'Học bổng']];
    var filtered = archiveFiltered(source);
    var former = ui.archiveFolder === 'former';
    var pick = former && canEdit();
    var cols = (former ? 10 : 9) + (pick ? 1 : 0);
    var head = '<tr>' + (pick ? '<th></th>' : '') + '<th>Mã</th><th>Tên</th><th>English</th><th>Giới tính</th><th>Ngày sinh</th><th>EC</th><th>Loại</th><th>Lớp cuối</th><th>Nhóm</th>' +
      (former ? '<th>Lý do</th>' : '') + '</tr>';
    var body = filtered.length ? filtered.map(function (row) {
      var box = pick ? '<td><input type="checkbox" data-archive-pick="' + esc(row.id) + '"' + (ui.archivePick[row.id] ? ' checked' : '') + ' aria-label="Chọn ' + esc(row.name) + '"></td>' : '';
      return '<tr>' + box + '<td>' + esc(showText(row.code)) + '</td><td>' + esc(showText(row.name)) + '</td><td>' + esc(showText(row.englishName)) + '</td><td>' +
        esc(showText(row.gender)) + '</td><td>' + esc(showDob(row.dob)) + '</td><td>' + esc(showText(row.ec)) + '</td><td>' + esc(enrollLabel(row.enroll)) + '</td><td>' +
        esc(showText(row.lastClassName)) + '</td><td>' + esc(row.track || '—') + '</td>' +
        (former ? '<td>' + esc(showText(row.reason)) + '</td>' : '') + '</tr>';
    }).join('') : '<tr><td colspan="' + cols + '">Không có học viên khớp bộ lọc.</td></tr>';
    var purge = pick ? '<div class="btn-row"><button type="button" class="btn btn-danger" data-act="archive-purge">Xóa vĩnh viễn</button></div>' +
      '<p class="help">Danh sách này dành cho học viên đã dừng học, sau 7 ngày, và các em hết hạn Trial, học bổng hoặc outdated. Admin chọn học viên ở đây để xóa vĩnh viễn khỏi data.</p>' : '';
    return shell('<div class="section-head"><div><button type="button" class="btn" data-act="archive-back">← Thư viện</button>' +
      '<h2>' + esc(title) + '</h2></div></div>' +
      '<div class="filter-bar">' +
      '<label class="field filter-field"><span>Tìm kiếm</span><input id="archive-q" value="' + esc(ui.archiveQuery || '') + '" placeholder="Tên, mã, tên tiếng Anh, lớp"></label>' +
      '<label class="field filter-field"><span>Nhóm</span><select id="archive-track"><option value="">Tất cả</option>' +
      tracks.map(function (track) { return '<option value="' + track + '"' + (ui.archiveTrack === track ? ' selected' : '') + '>' + track + '</option>'; }).join('') +
      '</select></label>' +
      '<label class="field filter-field"><span>Lớp cuối</span><select id="archive-class"><option value="">Tất cả</option>' +
      names.map(function (name) { return '<option value="' + esc(name) + '"' + (ui.archiveClass === name ? ' selected' : '') + '>' + esc(name) + '</option>'; }).join('') +
      '</select></label>' +
      '<label class="field filter-field"><span>Loại</span><select id="archive-enroll"><option value="">Tất cả</option>' +
      enrolls.map(function (pair) { return '<option value="' + pair[0] + '"' + (ui.archiveEnroll === pair[0] ? ' selected' : '') + '>' + pair[1] + '</option>'; }).join('') +
      '</select></label></div>' +
      '<p class="help">' + filtered.length + ' / ' + source.length + ' học viên.</p>' +
      purge +
      '<div class="table-wrap"><table><thead>' + head + '</thead><tbody>' + body + '</tbody></table></div>');
  }

  function expireForm() {
    return modalShell('Dừng',
      '<p>Dừng ' + selectedIds().length + ' học viên đã chọn. Các em rời danh sách có số thứ tự và hiện riêng phía dưới, không có số thứ tự. Dòng giải trình đi cùng đếm ngược 7 ngày, rồi chuyển vào Học viên cũ/kết thúc.</p>' +
      '<label class="field"><span>Giải trình</span><textarea id="expire-reason" maxlength="500"></textarea></label>' +
      '<p class="help">Viết dòng giải trình trước khi xác nhận.</p>',
      '<button type="button" class="btn btn-primary" data-act="do-expire">Xác nhận</button>' +
      '<button type="button" class="btn" data-act="close-modal">Hủy</button>');
  }

  function soaForm() {
    return modalShell('Thêm giờ SOA',
      '<form id="soa-form">' +
      '<label class="field"><span>FET</span><select name="fet" required><option value="">Chọn giáo viên</option>' +
      L.FET.map(function (name) { return '<option value="' + esc(name) + '">' + esc(name) + '</option>'; }).join('') +
      '</select></label>' +
      '<label class="field"><span>Loại giờ</span><select name="soaType" required><option value="">Chọn loại giờ</option>' +
      SOA_TYPES.map(function (type) { return '<option value="' + esc(type) + '">' + esc(type) + '</option>'; }).join('') +
      '</select></label>' +
      '<label class="field"><span>Ngày</span><input name="date" type="date" value="' + esc(L.todayInput(new Date())) + '" required></label>' +
      '<label class="field"><span>Giờ bắt đầu</span><input name="start" type="time" value="17:30" required></label>' +
      '<label class="field"><span>Giờ kết thúc</span><input name="end" type="time" value="19:00" required></label>' +
      '<p class="help">Thẻ SOA nền trắng, chữ đỏ trên lịch Mục B. Không tính buổi dạy và không ghi vào ô giờ SOA của Mục H.</p></form>',
      '<button type="submit" form="soa-form" class="btn btn-primary">Thêm vào lịch</button>' +
      '<button type="button" class="btn" data-act="close-modal">Hủy</button>');
  }

  function saveSoa(form) {
    if (deny(canEdit())) return;
    var data = new FormData(form);
    var fet = String(data.get('fet') || '').trim();
    var type = String(data.get('soaType') || '');
    var date = L.parseDateInput(data.get('date'));
    var start = String(data.get('start') || '');
    var end = String(data.get('end') || '');
    if (!fet) { showFormError('Chọn giáo viên FET.'); return; }
    if (SOA_TYPES.indexOf(type) < 0) { showFormError('Chọn loại giờ Interview, event hoặc Lớp EB.'); return; }
    if (!date) { showFormError('Chọn ngày.'); return; }
    if (!start || !end || start >= end) { showFormError('Giờ kết thúc phải sau giờ bắt đầu.'); return; }
    if (!state.soaSlots) state.soaSlots = [];
    state.soaSlots.push({
      id: L.uid(),
      fet: fet,
      type: type,
      date: L.isoDay(date),
      start: start,
      end: end
    });
    soaSeen = true;
    ui.modal = null;
    ui.formError = '';
    save();
    toast('Đã thêm giờ SOA.');
    render();
  }

  function modalHtml() {
    if (!ui.modal) return '';
    if (ui.modal.type === 'add-class' || ui.modal.type === 'edit-class') return classForm(ui.modal.type === 'edit-class' ? 'edit' : 'add');
    if (ui.modal.type === 'add-student' || ui.modal.type === 'edit-student') return studentForm();
    if (ui.modal.type === 'import-students') return importForm();
    if (ui.modal.type === 'import-homework') return homeworkImportForm();
    if (ui.modal.type === 'transfer') return transferForm();
    if (ui.modal.type === 'expire') return expireForm();
    if (ui.modal.type === 'confirm') return confirmForm();
    if (ui.modal.type === 'hw-mark') return hwMarkForm();
    if (ui.modal.type === 'schedule-choice') return scheduleChoiceForm();
    if (ui.modal.type === 'add-soa') return soaForm();
    if (ui.modal.type === 'move-session') return moveForm();
    if (ui.modal.type === 'suggest') return suggestForm();
    return '';
  }

  function sweepRoster() {
    var moved = L.settleRoster(state, new Date());
    if (moved && moved.length) save({ quiet: true });
    return moved || [];
  }

  function staffMonthKey() {
    if (!ui.staffMonth || !/^\d{4}-\d{2}$/.test(ui.staffMonth)) ui.staffMonth = L.monthKey(new Date());
    return ui.staffMonth;
  }

  function staffNames() {
    var seen = {};
    var names = [];
    function add(name) {
      var text = String(name || '').trim();
      if (!text || text === '?' || text === '-' || seen[text]) return;
      seen[text] = true;
      names.push(text);
    }
    (L.FET || []).forEach(add);
    (state.classes || []).forEach(function (cls) {
      String(cls && cls.fet || '').split(',').forEach(add);
    });
    return names;
  }

  function viewStaff() {
    var month = staffMonthKey();
    var cards = staffNames().map(function (name) {
      var row = (state.staffBook && state.staffBook[name]) || { code: '', soa: {} };
      var minutes = L.teachingMinutes(state.classes, name, month);
      var soaValue = row.soa && row.soa[month] ? row.soa[month] : '';
      var code = canEdit()
        ? '<label class="field"><span>Mã nhân sự</span><input data-staff-code data-name="' + esc(name) + '" value="' + esc(row.code || '') + '" autocomplete="off"></label>'
        : '<p>Mã nhân sự: ' + esc(row.code || '—') + '</p>';
      var soa = canEdit()
        ? '<label class="field"><span>Giờ SOA (giờ OFFICE)</span><input data-staff-soa data-name="' + esc(name) + '" data-month="' + esc(month) + '" inputmode="decimal" value="' + esc(soaValue) + '"></label>'
        : '<p>Giờ SOA: ' + esc(soaValue || '—') + '</p>';
      return '<article class="staff-card"><h3>' + esc(name) + '</h3><p class="meta">FET</p>' + code +
        '<p class="staff-hours">Giờ Teaching: <b>' + esc(L.formatHours(minutes)) + '</b></p>' + soa + '</article>';
    }).join('');
    return shell('<div class="section-head"><div><button type="button" class="btn" data-act="nav" data-screen="menu">← Menu</button>' +
      '<h2>Công giáo viên</h2><p class="meta">Mục H</p></div></div>' +
      '<label class="field dash-month"><span>Tháng</span><input id="staff-month" type="month" value="' + esc(month) + '"></label>' +
      '<p class="help">Giờ Teaching cộng mỗi buổi trong tháng theo khung giờ của lớp. Một buổi 5:30–7:30 là 2 giờ, tháng cộng mọi buổi của giáo viên đó. Giờ SOA là giờ OFFICE, Admin nhập theo tháng. Khối Interview, event và Lớp EB trên lịch Mục B là thẻ riêng, không cộng vào ô này và không tính giờ Teaching. Mã nhân sự do Admin cập nhật.</p>' +
      (canEdit() ? '' : '<p class="help">Tài khoản này chỉ xem công giáo viên.</p>') +
      '<div class="staff-grid-cards">' + (cards || '<p class="muted">Chưa có FET.</p>') + '</div>');
  }

  function render() {
    var root = document.getElementById('app');
    var html = '';
    try {
      if (ui.user && ui.screen !== 'login') sweepRoster();
      if (!ui.user || ui.screen === 'login') html = viewLogin();
      else if (ui.screen === 'menu') html = viewMenu();
      else if (ui.screen === 'classes') html = viewClasses();
      else if (ui.screen === 'class') html = viewClass();
      else if (ui.screen === 'schedule') html = viewSchedule();
      else if (ui.screen === 'homework') html = viewHomework();
      else if (ui.screen === 'homework-class') html = viewHomeworkClass();
      else if (ui.screen === 'feed') html = viewFeed();
      else if (ui.screen === 'archive') html = viewArchive();
      else if (ui.screen === 'curriculum') html = viewCurriculum();
      else if (ui.screen === 'exam') html = viewExam();
      else if (ui.screen === 'staff') html = viewStaff();
      else html = viewMenu();
      root.innerHTML = html;
    } catch (err) {
      console.error(err);
      root.innerHTML = '<div class="wrap"><p>Không mở được giao diện. Tải lại trang.</p></div>';
    }
    paintTitles();
    paintClock();
    paintThemeButtons();
    paintTransferLevel();
    applyAccountLook();
    pulseMinimal();
    paintDesk();
  }

  function pulseMinimal() {
    var app = document.getElementById('app');
    if (!app) return;
    app.classList.remove('is-enter');
    if (document.documentElement.getAttribute('data-skin') !== 'minimal') return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    void app.offsetWidth;
    app.classList.add('is-enter');
  }

  function readSchedule(form) {
    var slots = [];
    form.querySelectorAll('[data-day]').forEach(function (row) {
      var on = row.querySelector('[data-day-toggle]').checked;
      if (!on) return;
      slots.push({
        dow: Number(row.getAttribute('data-day')),
        start: row.querySelector('[data-start]').value,
        end: row.querySelector('[data-end]').value
      });
    });
    return slots;
  }

  function validateSchedule(slots) {
    if (!slots.length) return 'Hãy chọn ít nhất một buổi học trong tuần.';
    if (slots.length > 7) return 'Tối đa 7 buổi mỗi tuần.';
    for (var i = 0; i < slots.length; i++) {
      if (!slots[i].start || !slots[i].end) return 'Mỗi buổi đã chọn cần đủ giờ bắt đầu và giờ kết thúc.';
      if (slots[i].end <= slots[i].start) return 'Giờ kết thúc phải sau giờ bắt đầu.';
    }
    return '';
  }

  function isCustomKind() {
    var kind = document.getElementById('f-kind');
    if (kind) return kind.value === 'custom';
    var editing = ui.modal && ui.modal.type === 'edit-class' ? findClass(ui.classId) : null;
    return !!(editing && editing.kind === 'custom');
  }

  function chosenHomeTrack(grade) {
    if (isCustomKind() || !grade) return '';
    var trackEl = document.getElementById('f-track');
    var choice = trackEl ? trackEl.value : '';
    if (choice !== 'TEENS') return '';
    var editing = ui.modal && ui.modal.type === 'edit-class' ? findClass(ui.classId) : null;
    if (!editing) return '';
    if (editing.homeTrack === 'TEENS') return 'TEENS';
    var original = L.gradeById(editing.gradeId);
    if (original && original.track === 'TEENS' && grade.track === 'IELTS') return 'TEENS';
    return '';
  }

  function syncKindFields() {
    var custom = isCustomKind();
    var numberRow = document.getElementById('number-row');
    var customRow = document.getElementById('custom-name-row');
    var numberEl = document.getElementById('f-number');
    var customEl = document.getElementById('f-custom');
    if (numberRow) numberRow.hidden = custom;
    if (customRow) customRow.hidden = !custom;
    if (numberEl) numberEl.required = !custom;
    if (customEl) customEl.required = custom;
    updateClassPreview();
  }

  function updateClassPreview() {
    var gradeEl = document.getElementById('f-grade');
    var numberEl = document.getElementById('f-number');
    var preview = document.getElementById('name-preview');
    if (!gradeEl || !preview) return;
    var grade = L.gradeById(gradeEl.value);
    var hint = document.getElementById('lesson-hint');
    var editing = ui.modal && ui.modal.type === 'edit-class';
    if (isCustomKind()) {
      var customName = document.getElementById('f-custom');
      var token = customName ? customName.value.trim() : '';
      var levelToken = '';
      var current = editing ? findClass(ui.classId) : null;
      if (current && current.customLevel && (!grade || grade.id === current.gradeId)) levelToken = current.customLevel;
      preview.textContent = L.customClassName(token, grade, levelToken) || '—';
      if (hint && grade && !editing) hint.textContent = grade.lessons + ' lesson. Lớp custom không lên trình độ khi hết buổi. Lớp chỉ có trong sổ trong thời gian khóa học chạy.';
      return;
    }
    if (!numberEl) return;
    var number = parseInt(numberEl.value, 10);
    preview.textContent = grade && number > 0 ? L.className(grade, number, chosenHomeTrack(grade)) : '—';
    if (hint && grade && !editing) hint.textContent = lessonHint(grade);
  }

  function refillGrades() {
    var track = document.getElementById('f-track');
    var gradeEl = document.getElementById('f-grade');
    var numberEl = document.getElementById('f-number');
    if (!track || !gradeEl) return;
    var grades = L.gradesForChoice(track.value);
    gradeEl.innerHTML = grades.map(function (item) {
      return '<option value="' + item.id + '">' + esc(item.label) + '</option>';
    }).join('');
    if (numberEl && grades[0]) {
      var editing = ui.modal && ui.modal.type === 'edit-class';
      var exceptId = editing ? ui.classId : '';
      var keep = parseInt(numberEl.value, 10);
      var numberTrack = grades[0].track;
      if (editing && keep > 0 && !L.numberTaken(state.classes, numberTrack, keep, exceptId)) {
        numberEl.dataset.dirty = '1';
        numberEl.value = String(keep);
      } else {
        numberEl.dataset.dirty = editing ? '1' : '';
        numberEl.value = String(L.nextNumber(state.classes, numberTrack, exceptId));
      }
    }
    updateClassPreview();
  }

  function onGradePick() {
    var gradeEl = document.getElementById('f-grade');
    var numberEl = document.getElementById('f-number');
    if (!gradeEl || !numberEl) return;
    var grade = L.gradeById(gradeEl.value);
    var exceptId = ui.modal && ui.modal.type === 'edit-class' ? ui.classId : '';
    if (!isCustomKind() && numberEl.dataset.dirty !== '1' && grade) numberEl.value = String(L.nextNumber(state.classes, grade.track, exceptId));
    updateClassPreview();
  }

  function showFormError(message) {
    ui.formError = message;
    var el = document.querySelector('.modal .form-error');
    if (el) el.textContent = message;
    else render();
  }

  function finishClassSave(message, holdId) {
    ui.modal = null;
    ui.formError = '';
    var result = L.runSystemUpdate(state, new Date(), holdId || '');
    save();
    var extra = '';
    if (result.promoted.length) extra += ' Có ' + result.promoted.length + ' lượt lên cấp.';
    if (result.finished && result.finished.length) extra += ' Có ' + result.finished.length + ' lớp custom kết thúc, không lên trình độ.';
    if (result.promoted.length) {
      showLoaderThen(null).then(function () {
        toast(message + extra);
      });
    } else {
      toast(message + extra);
      render();
    }
  }

  function customToken(value) {
    return String(value || '').trim().replace(/\s+/g, '');
  }

  function saveClass(form) {
    var editingClass = !!(ui.modal && ui.modal.type === 'edit-class');
    if (editingClass) { if (deny(canEdit())) return; }
    else if (deny(canEdit())) return;
    var slots = readSchedule(form);
    var problem = validateSchedule(slots);
    if (problem) { showFormError(problem); return; }
    var data = new FormData(form);
    if (ui.modal.type === 'edit-class') {
      var cls = findClass(ui.classId);
      if (!cls) return;
      var closeEnd = form.querySelector('[name="closeEnd"]');
      var postedGrade = String(data.get('grade') || '');
      var grade = L.gradeById(postedGrade);
      if (cls.endOpen && closeEnd && closeEnd.checked && !grade) {
        showFormError('Lớp này chưa có cấp độ trong sổ tay nên chưa chốt được ngày kết thúc.');
        return;
      }
      var fixOn = form.querySelector('[name="fixSchedule"]');
      if (fixOn && fixOn.checked && !L.parseDateInput(data.get('fixFrom'))) {
        showFormError('Chọn ngày bắt đầu lịch mới.');
        return;
      }
      var oldName = L.currentName(cls);
      var edited = L.applyLevelEdit(cls, state.classes, {
        gradeId: postedGrade,
        number: data.get('number'),
        customName: customToken(data.get('customName')),
        customLevel: cls.kind === 'custom' && postedGrade === String(cls.gradeId || '') ? (cls.customLevel || '') : '',
        homeTrack: cls.kind === 'custom' ? '' : (String(data.get('track') || '') === 'TEENS' && (
          cls.homeTrack === 'TEENS' || (grade && grade.track === 'IELTS' && L.gradeById(cls.gradeId) && L.gradeById(cls.gradeId).track === 'TEENS')
        ) ? 'TEENS' : ''),
        start: data.get('start')
      });
      if (edited.error) { showFormError(edited.error); return; }
      if (fixOn && fixOn.checked) {
        var applied = L.applyFixedSchedule(cls, slots, data.get('fixFrom'));
        if (applied.error) { showFormError(applied.error); return; }
      } else {
        L.writeStandingSchedule(cls, slots);
      }
      if (cls.kind !== 'custom') cls.kind = String(data.get('kind') || '') === 'addon' ? 'addon' : 'starter';
      cls.fet = String(data.get('fet') || '');
      cls.cm = String(data.get('cm') || '');
      cls.ta = String(data.get('ta') || '');
      if (cls.endOpen && closeEnd && closeEnd.checked) cls.endOpen = false;
      if (edited.name && edited.name !== oldName) {
        L.pushNotice(state, new Date(), L.formatDMY(new Date()) + ': đổi ' + oldName + ' thành ' + edited.name + '.');
      }
      logAction('thay đổi thông tin lớp ' + L.currentName(cls));
      finishClassSave('Đã lưu thông tin lớp.', edited.identity ? cls.id : '');
      return;
    }
    var grade = L.gradeById(String(data.get('grade')));
    var startDate = L.parseDateInput(data.get('start'));
    var kind = String(data.get('kind') || '');
    if (!grade) { showFormError('Chọn cấp độ.'); return; }
    if (!startDate) { showFormError('Chọn ngày bắt đầu.'); return; }
    var number = parseInt(data.get('number'), 10);
    var customName = '';
    if (kind === 'custom') {
      customName = customToken(data.get('customName'));
      if (!customName || !/^[A-Za-z0-9.-]+$/.test(customName)) {
        showFormError('Tên custom chỉ gồm chữ, số, dấu chấm hoặc gạch ngang, không có khoảng trắng.');
        return;
      }
      var previewName = L.customClassName(customName, grade, '');
      var taken = state.classes.some(function (item) { return L.nameKey(L.currentName(item)) === L.nameKey(previewName); });
      if (taken) { showFormError('Đã có lớp ' + previewName + '.'); return; }
    } else {
      if (!number || number < 1) { showFormError('Điền số lớp và cấp độ.'); return; }
      if (L.numberTaken(state.classes, grade.track, number)) {
        showFormError('Số ' + number + ' đã có trong trình độ ' + grade.track + '.');
        return;
      }
    }
    var created = L.createClass({
      number: number,
      gradeId: grade.id,
      startDate: data.get('start'),
      schedule: slots,
      fet: String(data.get('fet') || ''),
      cm: String(data.get('cm') || ''),
      ta: String(data.get('ta') || ''),
      kind: kind,
      customName: customName
    });
    if (!created) { showFormError('Chưa tạo được lớp.'); return; }
    state.classes.push(created);
    L.pushNotice(state, new Date(), L.formatDMY(new Date()) + ': thêm lớp mới ' + L.currentName(created) + '.');
    logAction('tạo lớp ' + L.currentName(created));
    finishClassSave('Đã tạo ' + L.currentName(created) + '.');
  }

  function saveStudent(form) {
    if (deny(canEdit())) return;
    var data = new FormData(form);
    var code = String(data.get('code') || '').trim();
    var name = String(data.get('name') || '').trim();
    var dob = String(data.get('dob') || '');
    var enroll = String(data.get('enroll') || 'official');
    if (enroll !== 'trial' && enroll !== 'scholarship') enroll = 'official';
    var trialRaw = String(data.get('trialSession') || '');
    var bits = trialRaw.split('|');
    var lessons = Math.round(Number(data.get('scholarshipLessons')) || 0);
    if (!code || !name || !dob) { showFormError('Cần mã, tên và ngày sinh.'); return; }
    if (enroll === 'trial' && !bits[0]) { showFormError('Lớp chưa có lịch để xếp buổi Trial.'); return; }
    if (enroll === 'scholarship' && (lessons < 1 || lessons > 24)) { showFormError('Học bổng cần số buổi từ 1 đến 24.'); return; }
    var rejoinId = ui.modal && ui.modal.type === 'add-student' ? ui.modal.rejoinId : '';
    if (rejoinId && enroll === 'scholarship') { showFormError('Học viên cũ vào lại lớp bằng Chính thức hoặc Trial.'); return; }
    var except = ui.modal.type === 'edit-student' ? ui.modal.id : (rejoinId || null);
    if (L.codeTaken(state.classes, code, except, state.archive)) { showFormError('Mã học viên đã tồn tại.'); return; }
    var room = findClass(ui.classId);
    var addingListed = enroll === 'official' || enroll === 'scholarship' || enroll === 'trial';
    if (enroll === 'trial' && bits[0]) {
      var trialDay = L.parseDateInput(bits[0]);
      if (trialDay && L.startOfDay(new Date()).getTime() > L.startOfDay(trialDay).getTime()) addingListed = false;
    }
    if (ui.modal.type === 'edit-student') {
      var currentRow = findStudent(ui.modal.id);
      if (currentRow && L.studentPhase(currentRow.cls, currentRow.stu, new Date()).kind === 'listed') addingListed = false;
    }
    if (addingListed && room && listedCount(room, new Date()) >= 20) {
      showFormError(ROSTER_FULL);
      return;
    }
    var payload = {
      code: code,
      name: name,
      englishName: String(data.get('englishName') || '').trim(),
      gender: String(data.get('gender') || 'Nam'),
      dob: dob,
      phone: String(data.get('phone') || '').trim(),
      ec: String(data.get('ec') || '').trim(),
      enroll: enroll,
      trialOn: enroll === 'trial' ? bits[0] : '',
      trialStart: enroll === 'trial' ? (bits[1] || '') : '',
      trialEnd: enroll === 'trial' ? (bits[2] || '') : '',
      scholarshipLessons: enroll === 'scholarship' ? lessons : 0,
      expireKind: '',
      expiredAt: '',
      expireReason: ''
    };
    if (ui.modal.type === 'edit-student') {
      var found = findStudent(ui.modal.id);
      Object.keys(payload).forEach(function (key) { found.stu[key] = payload[key]; });
    } else {
      var cls = findClass(ui.classId);
      var archived = null;
      if (rejoinId) {
        (state.archive || []).forEach(function (item) { if (item.id === rejoinId) archived = item; });
        payload.id = rejoinId;
        payload.joinedAt = new Date().toISOString();
      } else {
        payload.joinedAt = new Date().toISOString();
        if (enroll === 'trial' && bits[0]) {
          var trialDate = L.parseDateInput(bits[0]);
          if (trialDate) payload.joinedAt = L.atTime(trialDate, bits[1] || '00:00').toISOString();
        }
      }
      payload.originClassId = cls.id;
      var made = L.createStudent(payload);
      if (archived) {
        made.notes = Array.isArray(archived.notes) ? archived.notes : [];
        made.transfers = Array.isArray(archived.transfers) ? archived.transfers : [];
        state.archive = (state.archive || []).filter(function (item) { return item.id !== rejoinId; });
      }
      cls.students.push(made);
    }
    ui.modal = null;
    ui.formError = '';
    save();
    toast('Đã lưu học viên.');
    render();
  }

  function saveDetail() {
    if (deny(canEdit())) return;
    var found = findStudent(ui.detailId);
    if (!found) return;
    var phone = document.getElementById('d-phone');
    found.stu.phone = phone ? phone.value.trim() : found.stu.phone;
    var notes = [];
    document.querySelectorAll('#note-list .note-row').forEach(function (row) {
      var month = row.querySelector('[data-month]').value;
      var text = row.querySelector('[data-text]').value.trim();
      if (!month || !text) return;
      notes.push({ id: row.getAttribute('data-id') || L.uid(), month: month, text: text });
    });
    found.stu.notes = notes;
    var bookEl = document.getElementById('d-book');
    var selfEl = document.getElementById('d-pec-self');
    var userEl = document.getElementById('d-pec-user');
    var passEl = document.getElementById('d-pec-pass');
    if (bookEl && found.cls) {
      writeCurriculum(found.stu, L.currentLevel(found.cls), {
        bookStatus: bookEl.value,
        pecMode: selfEl && selfEl.checked ? 'self' : '',
        pecUser: userEl ? userEl.value : '',
        pecPass: passEl ? passEl.value : ''
      });
    }
    ui.detailEdit = false;
    save();
    toast('Đã lưu chi tiết học viên.');
    render();
  }

  function paintTransferLevel() {
    var target = document.getElementById('transfer-target');
    var note = document.getElementById('transfer-level-note');
    if (!target || !note) return;
    var current = findClass(ui.classId);
    var dest = findClass(target.value);
    var gap = !!(current && dest && !L.sameLevel(current, dest));
    note.hidden = !gap;
  }

  function doTransfer() {
    if (deny(canEdit())) return;
    var target = document.getElementById('transfer-target');
    if (!target) return;
    var result = L.transferStudents(state, ui.classId, target.value, selectedIds(), new Date());
    if (result.error) { showFormError(result.error); return; }
    if (ui.detailId && result.moved.indexOf(ui.detailId) >= 0) ui.detailId = null;
    ui.selected = {};
    ui.modal = null;
    ui.formError = '';
    logAction('chuyển ' + result.moved.length + ' học viên tới ' + result.toName);
    save();
    toast('Đã chuyển ' + result.moved.length + ' học viên tới ' + result.toName + '.' + (result.levelGap ? ' Bạn đang xếp chuyển lớp lệch trình độ.' : ''));
    render();
  }

  function doExpire() {
    var reasonEl = document.getElementById('expire-reason');
    var reason = reasonEl ? reasonEl.value.trim() : '';
    if (!reason) { showFormError('Viết dòng giải trình trước khi dừng.'); return; }
    var cls = findClass(ui.classId);
    if (!cls) return;
    var ids = selectedIds();
    var now = new Date().toISOString();
    var n = 0;
    cls.students.forEach(function (stu) {
      if (ids.indexOf(stu.id) < 0 || stu.status !== 'active' || isPausedStudent(stu)) return;
      stu.status = 'stopped';
      stu.stoppedAt = now;
      stu.expireKind = 'stop';
      stu.expiredAt = now;
      stu.expireReason = reason;
      n += 1;
    });
    ui.selected = {};
    ui.modal = null;
    ui.formError = '';
    logAction('dừng ' + n + ' học viên');
    save();
    toast('Đã dừng ' + n + ' học viên.');
    render();
  }

  function doDeleteStudents(ids) {
    if (deny(canEdit())) return;
    var cls = findClass(ui.classId);
    if (!cls) return;
    var drop = {};
    ids.forEach(function (id) { drop[id] = true; });
    var n = 0;
    cls.students = (cls.students || []).filter(function (stu) {
      if (!drop[stu.id]) return true;
      n += 1;
      return false;
    });
    state.archive = (state.archive || []).filter(function (stu) { return !drop[stu.id]; });
    ids.forEach(function (id) { delete ui.selected[id]; if (ui.detailId === id) ui.detailId = null; });
    ui.modal = null;
    logAction('xóa vĩnh viễn ' + n + ' học viên');
    save();
    toast('Đã xóa vĩnh viễn ' + n + ' học viên.');
    render();
  }

  function doArchivePurge() {
    var ids = Object.keys(ui.archivePick || {});
    if (!ids.length) return;
    var drop = {};
    ids.forEach(function (id) { drop[id] = true; });
    state.archive = (state.archive || []).filter(function (stu) { return !drop[stu.id]; });
    ui.archivePick = {};
    ui.modal = null;
    save();
    toast('Đã xóa vĩnh viễn ' + ids.length + ' học viên.');
    render();
  }

  function doDeleteClass() {
    if (deny(canEdit())) return;
    var cls = findClass(ui.classId);
    var className = cls ? L.currentName(cls) : 'lớp';
    var drop = {};
    if (cls && Array.isArray(cls.students)) {
      cls.students.forEach(function (stu) { if (stu && stu.id) drop[stu.id] = true; });
    }
    state.archive = (state.archive || []).filter(function (stu) { return !drop[stu.id]; });
    state.classes = state.classes.filter(function (item) { return item.id !== ui.classId; });
    ui.modal = null;
    ui.classId = null;
    ui.detailId = null;
    ui.screen = 'classes';
    logAction('xóa lớp ' + className);
    save();
    toast('Đã xóa lớp.');
    render();
  }

  function openSettings() {
    var title = document.getElementById('setting-title');
    title.value = state.settings.title;
    title.disabled = !canEdit();
    var saveBtn = document.querySelector('#settings-form [type="submit"]');
    if (saveBtn) saveBtn.hidden = !canEdit();
    document.getElementById('settingsbox').classList.remove('hidden');
    paintThemeButtons();
    paintAccounts();
    paintScript();
  }

  function closeSettings() {
    ui.accountForm = null;
    document.getElementById('settingsbox').classList.add('hidden');
  }

  function tickSystem() {
    if (!ui.user || loading || document.hidden) return;
    var result = L.runSystemUpdate(state, new Date());
    var finished = result.finished || [];
    var archived = result.archived || [];
    if (!result.promoted.length && !result.notesCleared && !result.ending && !finished.length && !archived.length) return;
    save({ quiet: true });
    if (result.promoted.length && busy()) {
      ui.pendingUpdate = true;
      toast('Có lớp vừa lên cấp. Dữ liệu sẽ làm mới khi đóng cửa sổ.');
      return;
    }
    if (result.promoted.length) {
      showLoaderThen(null).then(function () {
        toast(result.promoted.length + ' lớp vừa được cập nhật cấp độ.');
      });
      return;
    }
    if (!busy()) render();
  }

  function releasePending() {
    if (!ui.pendingUpdate || busy()) return;
    ui.pendingUpdate = false;
    showLoaderThen(null).then(function () {
      toast('Dữ liệu lớp vừa được cập nhật.');
    });
  }

  function groupFill(group) {
    var map = { KINDY: '#ffe29a', KIDS: '#cfe6ff', TEENS: '#ffc9cf', IELTS: '#b7e4c7', CUSTOM: '#e7d7ff' };
    return map[group] || '#ffffff';
  }

  function chipExport(chip) {
    if (chip.soa) return chip.name + '\nSOA · Office\nFET: ' + L.staffText(chip.fet);
    return chip.name + '\nFET: ' + L.staffText(chip.fet) + '\nCM: ' + L.staffText(chip.cm) + '\nTA: ' + L.staffText(chip.ta);
  }

  function scheduleSpec(model) {
    var headers = ['Khung giờ'].concat(L.DAYS.map(function (day) { return day.short; }));
    var rows = [];
    L.BANDS.forEach(function (band) {
      rows.push({ kind: 'band', cells: [bandTitle(band.id)] });
      var list = model.stats.grid.rows[band.id] || [];
      if (!list.length) {
        rows.push({ kind: 'gap', cells: ['Không có lớp'] });
        return;
      }
      list.forEach(function (row) {
        if (row.gap) {
          rows.push({ kind: 'gap', cells: ['Trống ' + L.formatTimeValue(row.start) + ' – ' + L.formatTimeValue(row.end)] });
          return;
        }
        var cells = [L.formatTimeValue(row.start) + ' – ' + L.formatTimeValue(row.end)];
        var fills = ['#d7eefc'];
        var ink = ['#12324a'];
        L.DAYS.forEach(function (day) {
          var chips = row.cells[day.dow] || [];
          var soaOnly = chips.length && chips.every(function (chip) { return chip.soa; });
          var painted = chips.filter(function (chip) { return !chip.soa; })[0];
          cells.push(chips.map(chipExport).join('\n\n'));
          fills.push(soaOnly || !chips.length ? '#ffffff' : groupFill(painted ? painted.group : chips[0].group));
          ink.push(soaOnly ? '#d90429' : '#12324a');
        });
        rows.push({ kind: 'data', cells: cells, fills: fills, ink: ink });
      });
    });
    var meta = ['Tuần ' + model.label, filterLine(), 'Số lớp hiện tại: ' + model.stats.classCount, 'Tổng buổi trong tuần: ' + model.stats.sessionCount];
    if (ui.staffFilter.fet) meta.push('FET ' + ui.staffFilter.fet + ': ' + model.stats.sessionCount + ' buổi, ' + L.formatHours(model.stats.minutes));
    return { title: state.settings.title, meta: meta, headers: headers, rows: rows, minCol: 90 };
  }

  function cellExport(cell) {
    if (cell.mode === 'before') return { text: '—', fill: '#eef6fb', ink: '#3d6278' };
    if (cell.mode === 'out' || cell.mode === 'in-from') return { text: 'MOVED', fill: '#e2b007', ink: '#3d2a00' };
    var map = {
      done: ['DONE', '#1f9d55', '#ffffff'],
      none: ['NONE', '#d90429', '#ffffff'],
      miss: ['MISS', '#ef8a1a', '#1a1a1a'],
      absent: ['ABSENT', '#ffffff', '#111111'],
      applied: ['APPLIED', '#67e8f9', '#042033']
    };
    var item = map[cell.status];
    if (!item) return { text: '', fill: '#ffffff', ink: '#12324a' };
    return { text: item[0], fill: item[1], ink: item[2] };
  }

  function homeworkSubset(board) {
    var ids = Object.keys(ui.hwPick).filter(function (id) { return ui.hwPick[id]; });
    if (!ids.length) return board.students.slice();
    return board.students.filter(function (stu) { return ids.indexOf(stu.id) >= 0; });
  }

  function subsetGroups(students) {
    return L.homeworkGroups((students || []).filter(function (stu) { return !stu.unavailable; }));
  }

  function homeworkSpec(cls, students, sessions) {
    var headers = ['Học viên', 'English name'].concat(sessions.map(function (session) {
      var day = L.DAYS.filter(function (item) { return item.dow === session.dow; })[0];
      var parts = session.iso.split('-');
      return (day ? day.short : '') + ' ' + parts[2] + '/' + parts[1] + ' ' + L.formatTimeValue(session.start);
    })).concat(['Tỉ lệ']);
    var rows = students.map(function (stu) {
      if (stu.unavailable) {
        var muted = [stu.name + ' · Unavailable', stu.englishName || '—'];
        var mutedFills = ['#e7eef3', '#e7eef3'];
        var mutedInk = ['#3d6278', '#3d6278'];
        (stu.cells || []).forEach(function () {
          muted.push('—');
          mutedFills.push('#e7eef3');
          mutedInk.push('#3d6278');
        });
        muted.push('Unavailable');
        mutedFills.push('#e7eef3');
        mutedInk.push('#3d6278');
        return { kind: 'data', cells: muted, fills: mutedFills, ink: mutedInk };
      }
      var cells = [stu.name, stu.englishName || '—'];
      var fills = ['#ffffff', '#ffffff'];
      var ink = ['#12324a', '#12324a'];
      var pct = stu.rate === null ? null : Math.round(stu.rate * 100);
      if (pct !== null && pct > 80) { fills[0] = '#8ee0b0'; fills[1] = '#8ee0b0'; }
      if (pct !== null && pct < 50) { fills[0] = '#ff9aa8'; fills[1] = '#ff9aa8'; }
      stu.cells.forEach(function (cell) {
        var painted = cellExport(cell);
        cells.push(painted.text);
        fills.push(painted.fill);
        ink.push(painted.ink);
      });
      cells.push(percentText(stu.rate));
      fills.push(fills[0]);
      ink.push('#12324a');
      return { kind: 'data', cells: cells, fills: fills, ink: ink };
    });
    var groups = subsetGroups(students);
    rows.push({ kind: 'gap', cells: ['100%: ' + (groups.perfect.join(', ') || 'Không có')] });
    rows.push({ kind: 'gap', cells: ['Trên 90%: ' + (groups.high.join(', ') || 'Không có')] });
    rows.push({ kind: 'gap', cells: ['40% đến 80%: ' + (groups.mid.join(', ') || 'Không có')] });
    rows.push({ kind: 'gap', cells: ['Dưới 40%: ' + (groups.below.join(', ') || 'Không có')] });
    var level = L.homeworkLevel(cls, ui.hwMonth);
    var levelGrade = L.gradeById(level.gradeId || cls.gradeId);
    return {
      title: state.settings.title,
      meta: [(level.name || L.currentName(cls)) + ' · ' + gradeText(levelGrade, cls) + ' · ' + kindLabel(cls), 'Lịch: ' + L.scheduleText(cls), L.monthLabel(ui.hwMonth)],
      headers: headers,
      rows: rows,
      minCol: 54,
      maxCol: 160
    };
  }

  function downloadXlsx(spec, name, sheetName) {
    var bytes = L.buildStyledXlsx(spec, sheetName);
    downloadBlob(new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), name);
  }

  function downloadBlob(blob, name) {
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
  }

  function drawSheet(spec) {
    var scale = 2;
    var padX = 8;
    var lineH = 16;
    var font = '14px "Segoe UI", sans-serif';
    var bold = '700 14px "Segoe UI", sans-serif';
    var measure = document.createElement('canvas').getContext('2d');
    measure.font = font;
    var cols = spec.headers.length;
    var widths = [];
    for (var c = 0; c < cols; c++) {
      measure.font = bold;
      var w = measure.measureText(String(spec.headers[c] || '')).width;
      spec.rows.forEach(function (row) {
        if (row.kind === 'band' || row.kind === 'gap') return;
        measure.font = font;
        String((row.cells && row.cells[c]) || '').split('\n').forEach(function (line) {
          w = Math.max(w, measure.measureText(line).width);
        });
      });
      widths.push(Math.min(spec.maxCol || 220, Math.max(spec.minCol || 72, Math.ceil(w) + padX * 2)));
    }
    var heights = spec.rows.map(function (row) {
      if (row.kind === 'band' || row.kind === 'gap') return 28;
      var lines = 1;
      (row.cells || []).forEach(function (cell) {
        lines = Math.max(lines, String(cell || '').split('\n').length);
      });
      return lines * lineH + 12;
    });
    var tableW = widths.reduce(function (sum, width) { return sum + width; }, 0);
    var meta = spec.meta || [];
    var top = 36 + meta.length * 20 + 16;
    var headerH = 34;
    var tableH = headerH + heights.reduce(function (sum, height) { return sum + height; }, 0);
    var width = Math.max(tableW + 48, 640);
    var height = top + tableH + 24;
    var canvas = document.createElement('canvas');
    canvas.width = Math.floor(width * scale);
    canvas.height = Math.floor(height * scale);
    var g = canvas.getContext('2d');
    g.scale(scale, scale);
    g.fillStyle = '#f4fbff';
    g.fillRect(0, 0, width, height);
    g.fillStyle = '#0c4a72';
    g.font = '700 22px "Segoe UI", sans-serif';
    g.fillText(spec.title, 24, 30);
    g.font = font;
    g.fillStyle = '#12324a';
    meta.forEach(function (line, index) { g.fillText(line, 24, 56 + index * 20); });
    var x0 = 24;
    var y = top;
    function box(x, yPos, w, h, fill) {
      g.fillStyle = fill;
      g.fillRect(x, yPos, w, h);
      g.strokeStyle = '#0c4a72';
      g.lineWidth = 1;
      g.strokeRect(x + 0.5, yPos + 0.5, w - 1, h - 1);
    }
    var x = x0;
    spec.headers.forEach(function (header, index) {
      box(x, y, widths[index], headerH, '#d7eefc');
      g.fillStyle = '#0c4a72';
      g.font = bold;
      g.fillText(String(header), x + padX, y + 22);
      x += widths[index];
    });
    y += headerH;
    spec.rows.forEach(function (row, index) {
      var h = heights[index];
      if (row.kind === 'band' || row.kind === 'gap') {
        box(x0, y, tableW, h, row.kind === 'band' ? '#0c4a72' : '#e7f3fb');
        g.fillStyle = row.kind === 'band' ? '#f5fbff' : '#12324a';
        g.font = bold;
        g.fillText(String((row.cells && row.cells[0]) || ''), x0 + padX, y + 18);
        y += h;
        return;
      }
      var cx = x0;
      for (var i = 0; i < cols; i++) {
        box(cx, y, widths[i], h, (row.fills && row.fills[i]) || '#ffffff');
        g.fillStyle = (row.ink && row.ink[i]) || '#12324a';
        g.font = font;
        String((row.cells && row.cells[i]) || '').split('\n').forEach(function (line, lineIndex) {
          g.fillText(line, cx + padX, y + 16 + lineIndex * lineH);
        });
        cx += widths[i];
      }
      y += h;
    });
    return canvas;
  }

  function sliceCanvas(src) {
    var sliceH = Math.max(1, Math.floor(src.width * 595.28 / 841.89));
    var pages = [];
    for (var y = 0; y < src.height; y += sliceH) {
      var h = Math.min(sliceH, src.height - y);
      var piece = document.createElement('canvas');
      piece.width = src.width;
      piece.height = h;
      var ctx = piece.getContext('2d');
      ctx.fillStyle = '#f4fbff';
      ctx.fillRect(0, 0, piece.width, piece.height);
      ctx.drawImage(src, 0, y, src.width, h, 0, 0, src.width, h);
      pages.push(piece);
    }
    return pages;
  }

  function jpegBytes(canvas) {
    var bin = atob(canvas.toDataURL('image/jpeg', 0.92).split(',')[1]);
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  }

  function concatBytes(parts) {
    var len = 0;
    parts.forEach(function (part) { len += part.length; });
    var out = new Uint8Array(len);
    var pos = 0;
    parts.forEach(function (part) { out.set(part, pos); pos += part.length; });
    return out;
  }

  function textBytes(value) { return new TextEncoder().encode(value); }

  function pdfFromCanvases(canvases) {
    var pageW = 841.89;
    var pageH = 595.28;
    var chunks = [textBytes('%PDF-1.3\n')];
    var offsets = [0];
    var pos = chunks[0].length;
    var count = 0;
    function pushObj(body) {
      offsets.push(pos);
      count += 1;
      var packed = concatBytes([textBytes(count + ' 0 obj\n'), body, textBytes('\nendobj\n')]);
      chunks.push(packed);
      pos += packed.length;
      return count;
    }
    var kids = [];
    for (var n = 0; n < canvases.length; n++) kids.push((3 + n * 3) + ' 0 R');
    pushObj(textBytes('<< /Type /Catalog /Pages 2 0 R >>'));
    pushObj(textBytes('<< /Type /Pages /Count ' + canvases.length + ' /Kids [' + kids.join(' ') + '] >>'));
    canvases.forEach(function (canvas) {
      var jpg = jpegBytes(canvas);
      var drawW = pageW;
      var drawH = pageW * (canvas.height / canvas.width);
      if (drawH > pageH) {
        drawH = pageH;
        drawW = pageH * (canvas.width / canvas.height);
      }
      drawW = Math.round(drawW * 100) / 100;
      drawH = Math.round(drawH * 100) / 100;
      var x = Math.round(((pageW - drawW) / 2) * 100) / 100;
      var y = Math.round((pageH - drawH) * 100) / 100;
      var content = 'q ' + drawW + ' 0 0 ' + drawH + ' ' + x + ' ' + y + ' cm /Im0 Do Q';
      var pageId = count + 1;
      pushObj(textBytes('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' + pageW + ' ' + pageH + '] /Contents ' + (pageId + 1) + ' 0 R /Resources << /XObject << /Im0 ' + (pageId + 2) + ' 0 R >> >> >>'));
      pushObj(concatBytes([textBytes('<< /Length ' + content.length + ' >>\nstream\n'), textBytes(content), textBytes('\nendstream')]));
      pushObj(concatBytes([textBytes('<< /Type /XObject /Subtype /Image /Width ' + canvas.width + ' /Height ' + canvas.height + ' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ' + jpg.length + ' >>\nstream\n'), jpg, textBytes('\nendstream')]));
    });
    var xref = 'xref\n0 ' + (count + 1) + '\n0000000000 65535 f \n';
    for (var i = 1; i <= count; i++) xref += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
    xref += 'trailer << /Size ' + (count + 1) + ' /Root 1 0 R >>\nstartxref\n' + pos + '\n%%EOF';
    chunks.push(textBytes(xref));
    return new Blob([concatBytes(chunks)], { type: 'application/pdf' });
  }

  function printSpec(spec) {
    var root = document.getElementById('print-root');
    if (!root) return;
    var cols = (spec.headers || []).length || 1;
    function cellHtml(value) {
      return esc(value).replace(/\n/g, '<br>');
    }
    var head = (spec.headers || []).map(function (header) {
      return '<th>' + cellHtml(header) + '</th>';
    }).join('');
    var body = (spec.rows || []).map(function (row) {
      if (row.kind === 'band' || row.kind === 'gap') {
        return '<tr class="' + row.kind + '"><td colspan="' + cols + '">' + cellHtml((row.cells && row.cells[0]) || '') + '</td></tr>';
      }
      var cells = row.cells || [];
      var tds = [];
      for (var i = 0; i < cols; i++) tds.push('<td>' + cellHtml(cells[i] == null ? '' : cells[i]) + '</td>');
      return '<tr>' + tds.join('') + '</tr>';
    }).join('');
    var meta = (spec.meta || []).map(function (line) {
      return '<p>' + cellHtml(line) + '</p>';
    }).join('');
    root.innerHTML = '<h1>' + cellHtml(spec.title || APP_TITLE) + '</h1>' + meta +
      '<table><thead><tr>' + head + '</tr></thead><tbody>' + body + '</tbody></table>';
    document.body.classList.add('is-printing');
    function cleanup() {
      document.body.classList.remove('is-printing');
      root.innerHTML = '';
      window.removeEventListener('afterprint', cleanup);
    }
    window.addEventListener('afterprint', cleanup);
    window.print();
  }

  function exportSheet(spec, kind, name) {
    if (kind === 'print') { printSpec(spec); return; }
    if (kind === 'xlsx') { downloadXlsx(spec, name + '.xlsx', 'Ocean EDU'); return; }
    var canvas = drawSheet(spec);
    if (kind === 'pdf') downloadBlob(pdfFromCanvases(sliceCanvas(canvas)), name + '.pdf');
    else canvas.toBlob(function (blob) { downloadBlob(blob, name + '.png'); });
  }

  function exportSchedule(kind) {
    if (deny(canExportClasses())) return;
    var model = scheduleModel();
    exportSheet(scheduleSpec(model), kind, 'OceanEDU_thoi_khoa_bieu_' + L.isoDay(model.stats.grid.weekStart));
    if (kind !== 'print') toast('Đã xuất thời khóa biểu.');
  }

  function exportHomework(kind) {
    if (deny(canExportHomework())) return;
    var cls = findClass(ui.classId);
    if (!cls) return;
    var board = L.homeworkBoard(cls, state.classes, ui.hwMonth);
    var students = homeworkSubset(board);
    if (!students.length) { toast('Không có học viên để xuất.'); return; }
    exportSheet(homeworkSpec(cls, students, board.sessions), kind, 'OceanEDU_chuyen_can_' + L.currentName(cls) + '_' + ui.hwMonth);
    if (kind !== 'print') toast('Đã xuất chuyên cần ' + students.length + ' học viên.');
  }

  function classListSpec() {
    var now = new Date();
    var headers = ['Lớp', 'Nhóm', 'Loại', 'Sĩ số', 'Lịch', 'Bắt đầu', 'Kết thúc', 'Buổi', 'FET', 'CM', 'TA'];
    var rows = state.classes.map(function (cls) {
      var level = L.currentLevel(cls);
      var grade = L.gradeById(level.gradeId);
      var progress = L.progressOf(cls, now);
      var active = listedCount(cls, now);
      return {
        kind: 'data',
        cells: [
          L.currentName(cls),
          classGroupId(cls, level),
          kindLabel(cls),
          String(active),
          L.scheduleText(cls),
          L.formatDMY(progress.start),
          endLabel(cls, progress),
          progress.done + '/' + progress.total,
          L.staffText(cls.fet),
          L.staffText(cls.cm),
          L.staffText(cls.ta)
        ]
      };
    });
    return {
      title: state.settings.title,
      meta: ['Danh sách lớp', 'Cập nhật ' + L.formatDMY(now) + ' ' + L.formatAmPm(now)],
      headers: headers,
      rows: rows
    };
  }

  function exportClasses(kind) {
    if (deny(canExportClasses())) return;
    exportSheet(classListSpec(), kind, 'OceanEDU_danh_sach_lop');
    if (kind !== 'print') toast('Đã xuất danh sách lớp.');
  }

  function studentListSpec(cls) {
    var now = new Date();
    var roster = rosterOf(cls, now);
    var all = roster.listed.concat(roster.gray).concat(pausedRows(cls, now));
    var picked = selectedIds();
    var list = picked.length ? all.filter(function (row) { return picked.indexOf(row.stu.id) >= 0; }) : all;
    var headers = ['STT', 'Mã học viên', 'Học viên', 'English name', 'Giới tính', 'Ngày sinh', 'Tuổi', 'First EC'];
    var rows = list.map(function (row) {
      var stu = row.stu;
      var gray = row.phase.kind === 'gray';
      var stt = '';
      if (!gray) {
        for (var i = 0; i < roster.listed.length; i++) {
          if (roster.listed[i].stu.id === stu.id) stt = String(i + 1);
        }
      }
      var age = stu.dob === '?' ? null : L.ageOf(stu.dob, now);
      return {
        kind: 'data',
        cells: [
          stt,
          showText(stu.code),
          showText(stu.name),
          showText(stu.englishName),
          showText(stu.gender),
          showDob(stu.dob),
          stu.dob === '?' ? '?' : (age == null ? '—' : String(age)),
          showText(stu.ec)
        ]
      };
    });
    return {
      title: state.settings.title,
      meta: [
        L.currentName(cls),
        picked.length ? ('Học viên đã chọn · ' + list.length + ' hàng') : 'Học viên đang học'
      ],
      headers: headers,
      rows: rows
    };
  }

  function printStudents() {
    if (deny(canExportClasses())) return;
    var cls = findClass(ui.classId);
    if (!cls) return;
    var spec = studentListSpec(cls);
    if (!spec.rows.length) { toast('Không có học viên để in.'); return; }
    printSpec(spec);
  }

  function callScript(payload) {
    return new Promise(function (resolve, reject) {
      var url = SUGGEST_URL;
      var cb = 'oceanCb_' + Date.now();
      var script = document.createElement('script');
      var timer = setTimeout(function () {
        cleanup();
        reject(new Error('Không nhận được phản hồi từ ứng dụng web đề xuất.'));
      }, 12000);
      function cleanup() {
        clearTimeout(timer);
        try { delete window[cb]; } catch (err) { window[cb] = undefined; }
        if (script.parentNode) script.parentNode.removeChild(script);
      }
      window[cb] = function (result) {
        cleanup();
        if (result && result.ok) resolve(result);
        else reject(new Error((result && result.error) || 'Google Sheet từ chối dữ liệu.'));
      };
      var join = url.indexOf('?') >= 0 ? '&' : '?';
      script.src = url + join + 'callback=' + encodeURIComponent(cb) + '&payload=' + encodeURIComponent(JSON.stringify(payload || {}));
      script.onerror = function () {
        cleanup();
        reject(new Error('Không tải được ứng dụng web đề xuất.'));
      };
      document.head.appendChild(script);
    });
  }

  function requestUpdate() {
    if (!ui.user || ui.sending) return;
    ui.sending = true;
    callScript({
      action: 'row',
      type: 'other',
      username: ui.user.username,
      name: ui.user.name,
      content: 'Nhân sự yêu cầu cập nhật sổ tay',
      red: true
    }).then(function () {
      ui.sending = false;
      toast('Đã gửi yêu cầu cập nhật sổ tay lên thẻ Khác.');
    }).catch(function (err) {
      ui.sending = false;
      toast(err.message || 'Không gửi được.');
    });
  }

  function sendSuggestion() {
    if (deny(canSuggest())) return;
    var typeEl = document.getElementById('suggest-type');
    var textEl = document.getElementById('suggest-text');
    var content = textEl ? textEl.value.trim() : '';
    if (!content) { showFormError('Hãy viết nội dung đề xuất.'); return; }
    if (content.length > 1500) { showFormError('Nội dung tối đa 1500 ký tự.'); return; }
    if (ui.sending) return;
    ui.sending = true;
    callScript({
      action: 'row',
      type: typeEl ? typeEl.value : 'other',
      username: ui.user.username,
      name: ui.user.name,
      content: content,
      red: false
    }).then(function (result) {
      ui.sending = false;
      ui.modal = null;
      ui.formError = '';
      toast('Đã gửi đề xuất lên thẻ ' + (result.sheet || 'Google Sheet') + '.');
      render();
    }).catch(function (err) {
      ui.sending = false;
      showFormError(err.message);
    });
  }

  function saveMove() {
    if (deny(canEdit()) || !ui.modal) return;
    var cls = findClass(ui.modal.id);
    if (!cls) return;
    var picked = document.querySelector('input[name="move-mode"]:checked');
    var mode = picked ? picked.value : 'defer';
    var reasonBox = document.getElementById('move-reason');
    var reason = (reasonBox && reasonBox.value.trim()) || 'none';
    var input = { action: mode === 'custom' ? 'custom' : 'defer', from: ui.modal.key, reason: reason };
    if (input.action === 'custom') {
      input.date = document.getElementById('move-date').value;
      input.start = document.getElementById('move-start').value;
      input.end = document.getElementById('move-end').value;
    }
    var when = sessionLabel(ui.modal);
    var modeLabel = input.action === 'custom' ? 'Custom' : 'Lùi về cuối khóa';
    var ok = window.confirm('Xác nhận hủy/đổi buổi ' + when + ' của lớp ' + L.currentName(cls) + '?\nCách làm: ' + modeLabel + '\nLý do: ' + reason + '\nNgày kết thúc khóa có thể thay đổi.');
    if (!ok) return;
    var result = L.changeSession(cls, input);
    if (result.error) { showFormError(result.error); return; }
    var endText = result.last ? L.formatDMY(result.last.endDate) : '—';
    L.pushNotice(state, new Date(), L.formatDMY(new Date()) + ': ' + L.currentName(cls) + ' hủy/đổi buổi ' + when + ' (' + modeLabel + ', lý do: ' + result.reason + '). Kết thúc khóa: ' + endText + '.');
    logAction('hủy hoặc đổi lịch buổi ' + when + ' của lớp ' + L.currentName(cls));
    ui.modal = null;
    ui.formError = '';
    save();
    toast('Đã đổi buổi. Kết thúc khóa: ' + endText + '.');
    render();
  }

  function compressImage(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onerror = function () { reject(new Error('read')); };
      reader.onload = function () {
        var img = new Image();
        img.onload = function () {
          var maxEdge = 1280;
          var scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
          var canvas = document.createElement('canvas');
          canvas.width = Math.max(1, Math.round(img.width * scale));
          canvas.height = Math.max(1, Math.round(img.height * scale));
          var ctx = canvas.getContext('2d');
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.72));
        };
        img.onerror = function () { reject(new Error('image')); };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function announcementById(id) {
    for (var i = 0; i < state.announcements.length; i++) {
      if (state.announcements[i].id === id) return state.announcements[i];
    }
    return null;
  }

  function clampScale(value) {
    return Math.min(8, Math.max(1, value));
  }

  function applyPreviewTransform() {
    var img = document.getElementById('preview-img');
    if (!img) return;
    img.style.transform = 'translate(' + preview.x + 'px,' + preview.y + 'px) scale(' + preview.scale + ')';
  }

  function openPreview(src) {
    if (!src || String(src).indexOf('data:image/') !== 0) return;
    preview.scale = 1;
    preview.x = 0;
    preview.y = 0;
    preview.pointers = {};
    preview.lastDist = 0;
    var img = document.getElementById('preview-img');
    var box = document.getElementById('previewbox');
    if (!img || !box) return;
    img.src = src;
    applyPreviewTransform();
    box.classList.remove('hidden');
  }

  function closePreview() {
    var box = document.getElementById('previewbox');
    if (box) box.classList.add('hidden');
    preview.pointers = {};
    preview.scale = 1;
    preview.x = 0;
    preview.y = 0;
  }

  function bindPreview() {
    var stage = document.getElementById('preview-stage');
    if (!stage || stage.dataset.bound) return;
    stage.dataset.bound = '1';
    function pointerList() {
      return Object.keys(preview.pointers).map(function (key) { return preview.pointers[key]; });
    }
    function pointerDistance() {
      var pts = pointerList();
      if (pts.length < 2) return 0;
      var dx = pts[0].x - pts[1].x;
      var dy = pts[0].y - pts[1].y;
      return Math.sqrt(dx * dx + dy * dy);
    }
    stage.addEventListener('wheel', function (e) {
      var box = document.getElementById('previewbox');
      if (!box || box.classList.contains('hidden')) return;
      e.preventDefault();
      preview.scale = clampScale(preview.scale * (e.deltaY < 0 ? 1.12 : 1 / 1.12));
      if (preview.scale === 1) { preview.x = 0; preview.y = 0; }
      applyPreviewTransform();
    }, { passive: false });
    stage.addEventListener('pointerdown', function (e) {
      preview.pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
      if (stage.setPointerCapture) stage.setPointerCapture(e.pointerId);
      preview.lastDist = pointerList().length >= 2 ? pointerDistance() : 0;
    });
    stage.addEventListener('pointermove', function (e) {
      var prev = preview.pointers[e.pointerId];
      if (!prev) return;
      if (pointerList().length >= 2) {
        preview.pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
        var dist = pointerDistance();
        if (preview.lastDist) preview.scale = clampScale(preview.scale * (dist / preview.lastDist));
        preview.lastDist = dist;
        if (preview.scale === 1) { preview.x = 0; preview.y = 0; }
        applyPreviewTransform();
        return;
      }
      if (preview.scale > 1) {
        preview.x += e.clientX - prev.x;
        preview.y += e.clientY - prev.y;
        applyPreviewTransform();
      }
      preview.pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
    });
    function endPointer(e) {
      delete preview.pointers[e.pointerId];
      preview.lastDist = pointerList().length >= 2 ? pointerDistance() : 0;
    }
    stage.addEventListener('pointerup', endPointer);
    stage.addEventListener('pointercancel', endPointer);
  }

  function paintScript() {
    var panel = document.getElementById('script-panel');
    if (!panel) return;
    if (!canEdit()) { panel.innerHTML = ''; return; }
    panel.innerHTML = '<h3>Đề xuất</h3>' +
      '<p class="help">Form đề xuất và nút yêu cầu cập nhật gửi lên Google Sheet. Add học viên, Chuyển lớp và Khác vào ba thẻ tương ứng.</p>' +
      '<p class="deploy-url">' + esc(SUGGEST_URL) + '</p>' +
      '<h3>Bản data dùng chung</h3>' +
      '<p class="help">' + esc(classNote) + '</p>' +
      '<p class="help">' + esc(dataNote) + '</p>' +
      '<p class="help">App ghi ocean-edu-classes.json và ocean-edu-data.json vào thư mục Index local đã chọn. Góc trên hiện Token đang xoay, rồi chữ confirmed khi cả hai file đã ghi xong. Lúc mở trang, app đọc hai file này. Nếu quyền thư mục còn đang chờ, lần lưu do người dùng bấm sẽ xin quyền rồi ghi. Chưa chọn thư mục thì dữ liệu nằm trên trình duyệt và không hiện confirmed. GitHub chỉ phục vụ file đã đăng, máy khác thấy dữ liệu mới sau khi thư mục được đăng lại.</p>' +
      '<div class="btn-row"><button type="button" class="btn btn-primary" data-act="download-classes">Tải ocean-edu-classes.json</button>' +
      '<button type="button" class="btn" data-act="download-data">Tải ocean-edu-data.json</button>' +
      '<button type="button" class="btn" data-act="pick-folder">Chọn thư mục Index local</button></div>';
  }

  function downloadClasses() {
    if (deny(canEdit())) return;
    var blob = new Blob([JSON.stringify(classBookPayload())], { type: 'application/json' });
    downloadBlob(blob, CLASS_FILE);
    toast('Đã tạo ocean-edu-classes.json. Chép file vào thư mục Index local, cạnh index.html, để đồng bộ lớp, học viên và chuyên cần.');
  }

  function downloadData() {
    if (deny(canEdit())) return;
    var blob = new Blob([JSON.stringify(dataPayload())], { type: 'application/json' });
    downloadBlob(blob, DATA_FILE);
    toast('Đã tạo ocean-edu-data.json. File này giữ tài khoản, thông báo và cả sổ lớp.');
  }

  function restoreDir() {
    if (!window.indexedDB || !window.showDirectoryPicker) return Promise.resolve(null);
    return openLocalDb().then(function (db) {
      return new Promise(function (resolve) {
        var tx = db.transaction('handles', 'readonly');
        var req = tx.objectStore('handles').get('dir');
        req.onsuccess = function () { resolve(req.result || null); };
        req.onerror = function () { resolve(null); };
      });
    }).then(function (handle) {
      if (handle) dirHandle = handle;
      return dirHandle;
    }).catch(function () { return null; });
  }

  function accountById(id) {
    for (var i = 0; i < state.accounts.length; i++) if (state.accounts[i].id === id) return state.accounts[i];
    return null;
  }

  function adminCount(exceptId) {
    return state.accounts.filter(function (acc) { return acc.role === 'admin' && acc.id !== exceptId; }).length;
  }

  function paintAccounts() {
    var panel = document.getElementById('account-panel');
    if (!panel) return;
    if (!canEdit()) { panel.innerHTML = ''; return; }
    var rows = state.accounts.map(function (acc) {
      var self = ui.user && acc.username === ui.user.username;
      var bits = acc.role === 'admin' ? 'Đầy đủ quyền' : permBits(acc);
      return '<div class="account-row"><span class="role-pill role-' + esc(acc.role) + '">' + roleLabel(acc.role) + '</span><b>' + esc(acc.name) + '</b><span>' + esc(acc.username) + (self ? ' · đang dùng' : '') + '</span><span>' + esc(bits) + '</span>' +
        '<button type="button" class="btn" data-act="edit-account" data-id="' + esc(acc.id) + '">Sửa</button>' +
        (self ? '' : '<button type="button" class="btn btn-danger" data-act="delete-account" data-id="' + esc(acc.id) + '">Xóa</button>') + '</div>';
    }).join('');
    var form = '';
    if (ui.accountForm) {
      var editing = ui.accountForm.mode === 'edit' ? accountById(ui.accountForm.id) : null;
      var role = ui.accountForm.role || (editing ? editing.role : 'commenter');
      var perms = editing ? accountPerms(editing) : defaultPerms(role);
      form = '<form id="account-form" class="account-form"><h3>' + (editing ? 'Sửa tài khoản' : 'Tạo tài khoản') + '</h3>' +
        '<label class="field"><span>Tên hiển thị</span><input id="acc-name" value="' + esc(editing ? editing.name : '') + '" required></label>' +
        '<label class="field"><span>Username</span><input id="acc-user" value="' + esc(editing ? editing.username : '') + '" required></label>' +
        '<label class="field"><span>Bậc tài khoản</span><select id="acc-role">' +
        '<option value="admin"' + (role === 'admin' ? ' selected' : '') + '>Admin (đỏ)</option>' +
        '<option value="commenter"' + (role === 'commenter' ? ' selected' : '') + '>Commenter (vàng)</option>' +
        '<option value="guest"' + (role === 'guest' ? ' selected' : '') + '>Guest (xanh biển)</option></select></label>' +
        '<div id="acc-perm-wrap" class="perm-box"' + (role === 'admin' ? ' hidden' : '') + '>' +
        '<p class="field-label">Quyền bật / tắt</p>' +
        '<label class="checkline"><input type="checkbox" id="perm-classes"' + (perms.exportClasses ? ' checked' : '') + '> Quyền xuất file trên danh sách lớp</label>' +
        '<label class="checkline"><input type="checkbox" id="perm-homework"' + (perms.exportHomework ? ' checked' : '') + '> Quyền xuất file trên danh sách chuyên cần</label>' +
        '<label class="checkline"><input type="checkbox" id="perm-suggest"' + (perms.suggest ? ' checked' : '') + '> Quyền comment, nhắn tin đề xuất ở Mục D</label></div>' +
        '<label class="field" id="acc-pass-wrap"' + (role === 'guest' ? ' hidden' : '') + '><span>Mật khẩu' + (editing ? ' — gõ mật khẩu mới, để trống nếu giữ mật khẩu đang dùng' : ' — gõ mật khẩu dùng để đăng nhập') + '</span><input id="acc-pass" type="password" autocomplete="off" readonly spellcheck="false"></label>' +
        '<div class="btn-row"><button type="submit" class="btn btn-primary">Lưu tài khoản</button><button type="button" class="btn" data-act="cancel-account">Hủy</button></div></form>';
    }
    panel.innerHTML = '<h3>Quản lý tài khoản</h3><p class="help">Admin sửa tài khoản của mình, thêm, xóa và phân bậc tài khoản khác. Với Commenter và Guest, bật hoặc tắt từng quyền. Các việc không được bật (sửa lớp, học viên, tài khoản, đăng thông báo, đổi buổi) chỉ Admin làm được. Commenter vẫn đánh dấu chuyên cần. Chọn Guest thì không nhập mật khẩu.</p>' +
      rows + (ui.accountForm ? '' : '<button type="button" class="btn btn-primary" data-act="new-account">+ Tạo tài khoản</button>') + form;
  }

  function permBits(acc) {
    var perms = accountPerms(acc);
    return (perms.exportClasses ? 'Xuất lớp: bật' : 'Xuất lớp: tắt') + ' · ' +
      (perms.exportHomework ? 'Xuất chuyên cần: bật' : 'Xuất chuyên cần: tắt') + ' · ' +
      (perms.suggest ? 'Đề xuất: bật' : 'Đề xuất: tắt');
  }

  function saveAccountForm(event) {
    event.preventDefault();
    if (deny(canEdit())) return;
    var editing = ui.accountForm && ui.accountForm.mode === 'edit' ? accountById(ui.accountForm.id) : null;
    var name = document.getElementById('acc-name').value.trim();
    var username = document.getElementById('acc-user').value.trim();
    var role = document.getElementById('acc-role').value;
    var passEl = document.getElementById('acc-pass');
    var typed = !!(passEl && passEl.getAttribute('data-typed') === '1');
    var password = role !== 'guest' && typed && passEl ? String(passEl.value || '') : '';
    if (!name || !username) { toast('Cần tên và username.'); return; }
    if (!editing && role !== 'guest' && !password) { toast('Admin và Commenter cần gõ mật khẩu đăng nhập.'); return; }
    var taken = state.accounts.some(function (acc) { return String(acc.username || '').trim() === username && (!editing || acc.id !== editing.id); });
    if (taken) { toast('Username đã được dùng.'); return; }
    if (editing && editing.role === 'admin' && role !== 'admin' && adminCount(editing.id) === 0) {
      toast('Cần giữ ít nhất một tài khoản Admin.');
      return;
    }
    var nextPassword = editing ? String(editing.password || '') : '';
    if (role === 'guest') nextPassword = '';
    else if (typed) nextPassword = password;
    if (role !== 'guest' && !nextPassword) { toast('Admin và Commenter cần mật khẩu.'); return; }
    var perms = null;
    if (role !== 'admin') {
      perms = {
        exportClasses: !!(document.getElementById('perm-classes') && document.getElementById('perm-classes').checked),
        exportHomework: !!(document.getElementById('perm-homework') && document.getElementById('perm-homework').checked),
        suggest: !!(document.getElementById('perm-suggest') && document.getElementById('perm-suggest').checked)
      };
    }
    var wasSelf = !!(editing && ui.user && ui.user.username === editing.username);
    if (editing) {
      editing.name = name;
      editing.username = username;
      editing.role = role;
      editing.password = nextPassword;
      if (perms) editing.perms = perms;
      else delete editing.perms;
    } else {
      var createdAcc = { id: L.uid(), name: name, username: username, role: role, password: nextPassword };
      if (perms) createdAcc.perms = perms;
      state.accounts.push(createdAcc);
    }
    if (wasSelf) {
      ui.user = { username: username, name: name, role: role };
      sessionStorage.setItem('oceanEduUser', JSON.stringify(ui.user));
      render();
    }
    var saved = state.accounts.filter(function (acc) { return String(acc.username || '').trim() === username; })[0];
    if (!saved || (role !== 'guest' && String(saved.password || '') !== nextPassword)) {
      toast('Chưa lưu được mật khẩu đăng nhập.');
      return;
    }
    ui.accountForm = null;
    if (!save()) return;
    paintAccounts();
    toast('Đã lưu tài khoản. Dùng đúng username và mật khẩu vừa gõ để đăng nhập.');
  }

  function deleteAccount(id) {
    if (deny(canEdit())) return;
    var acc = accountById(id);
    if (!acc) return;
    if (ui.user && acc.username === ui.user.username) { toast('Không xóa tài khoản đang đăng nhập.'); return; }
    if (acc.role === 'admin' && adminCount(acc.id) === 0) { toast('Cần giữ ít nhất một tài khoản Admin.'); return; }
    if (!window.confirm('Xóa tài khoản ' + acc.username + '?')) return;
    state.accounts = state.accounts.filter(function (item) { return item.id !== id; });
    save();
    paintAccounts();
    toast('Đã xóa tài khoản.');
  }

  document.addEventListener('click', function (e) {
    if (e.target.id === 'previewbox') { closePreview(); return; }
    if (e.target.id === 'clockbox') document.getElementById('clockbox').classList.add('hidden');
    if (e.target.id === 'settingsbox') closeSettings();
    if (e.target.classList && e.target.classList.contains('scrim')) {
      if (ui.detailId && !ui.modal) { ui.detailId = null; ui.detailEdit = false; render(); releasePending(); return; }
      if (ui.modal) { ui.modal = null; ui.formError = ''; ui.importDraft = null; render(); releasePending(); }
      return;
    }
    var btn = e.target.closest('[data-act]');
    if (!btn) return;
    var act = btn.getAttribute('data-act');
    var adminOnly = {
      'open-add-class': 1, 'open-add-student': 1, 'open-import': 1, 'download-template': 1,
      'run-import': 1, 'edit-student': 1, 'edit-detail': 1, 'save-detail': 1, 'add-note': 1, 'remove-note': 1,
      'bulk-expire': 1, 'do-expire': 1, 'resume-student': 1,
      'archive-purge': 1, 'do-archive-purge': 1, 'rejoin-pick': 1,
      'new-account': 1, 'edit-account': 1, 'delete-account': 1,
      'download-data': 1, 'download-classes': 1, 'pick-folder': 1,
      'drop-image': 1, 'open-soa': 1, 'soa-drop': 1
    };
    var studentActs = {
      'bulk-transfer': 1, 'confirm-transfer': 1, 'transfer-pick': 1,
      'bulk-delete': 1, 'do-bulk-delete': 1, 'delete-one': 1, 'do-delete-one': 1
    };
    var classActs = { 'edit-class': 1, 'delete-class': 1, 'do-delete-class': 1 };
    var examActs = {
      'exam-create': 1, 'exam-next': 1, 'exam-back': 1, 'exam-cancel': 1, 'exam-commit': 1,
      'exam-extra-pick': 1, 'exam-day': 1, 'exam-cal': 1
    };
    if (adminOnly[act] && deny(canEdit())) return;
    if (studentActs[act] && deny(canEdit())) return;
    if (classActs[act] && deny(canEdit())) return;
    if (examActs[act] && deny(canEdit())) return;
    if ((act === 'hw-cell' || act === 'hw-set') && deny(canMark())) return;
    if (act === 'export-schedule' && deny(canExportClasses())) return;
    if (act === 'export-classes' && deny(canExportClasses())) return;
    if (act === 'print-students' && deny(canExportClasses())) return;
    if (act === 'export-homework' && deny(canExportHomework())) return;
    if ((act === 'suggest-open' || act === 'suggest-send') && deny(canSuggest())) return;
    if (act === 'schedule-pick' && deny(canEdit())) return;
    if ((act === 'move-session' || act === 'save-move') && deny(canEdit())) return;
    if (act === 'save-session-fet' && deny(canEdit())) return;
    if (act === 'open-clock') { document.getElementById('clockbox').classList.remove('hidden'); paintClock(); return; }
    if (act === 'close-clock') { document.getElementById('clockbox').classList.add('hidden'); return; }
    if (act === 'open-settings') { openSettings(); return; }
    if (act === 'close-settings') { closeSettings(); return; }
    if (act === 'set-theme') { applyTheme(btn.getAttribute('data-theme')); return; }
    if (act === 'set-primary') { applyPrimary(btn.getAttribute('data-primary')); return; }
    if (act === 'set-skin') { applySkin(btn.getAttribute('data-skin')); return; }
    if (act === 'gate-confirm') { confirmGate(btn.getAttribute('data-id')); return; }
    if (act === 'gate-confirm-old') { confirmOldGate(); return; }
    if (act === 'open-notices') {
      ui.noticeMonth = ui.boardMonth || L.monthKey(new Date());
      var notice = document.getElementById('noticebox');
      if (notice) notice.classList.remove('hidden');
      paintNotices();
      return;
    }
    if (act === 'notice-close') {
      var noticeClose = document.getElementById('noticebox');
      if (noticeClose) noticeClose.classList.add('hidden');
      return;
    }
    if (act === 'request-update') { requestUpdate(); return; }
    if (act === 'logout') {
      ui.user = null;
      ui.screen = 'login';
      ui.modal = null;
      ui.detailId = null;
      ui.accountForm = null;
      closeSettings();
      sessionStorage.removeItem('oceanEduUser');
      render();
      return;
    }
    if (act === 'board-shift') {
      ui.boardMonth = L.shiftMonth(ui.boardMonth || L.monthKey(new Date()), Number(btn.getAttribute('data-dir')));
      render();
      return;
    }
    if (act === 'nav') {
      ui.screen = btn.getAttribute('data-screen');
      ui.modal = null;
      ui.detailId = null;
      ui.detailEdit = false;
      if (ui.screen === 'classes') ui.selected = {};
      if (ui.screen === 'curriculum') {
        ui.curriculumId = null;
        ui.curriculumLevel = '';
      }
      if (ui.screen === 'archive') {
        ui.archiveFolder = '';
        ui.archiveQuery = '';
        ui.archiveTrack = '';
        ui.archiveClass = '';
        ui.archiveEnroll = '';
        ui.archivePick = {};
      }
      if (ui.screen === 'exam') {
        ui.examId = null;
        ui.examWizard = null;
        ui.formError = '';
      }
      render();
      releasePending();
      return;
    }
    if (act === 'open-class') {
      ui.classId = btn.getAttribute('data-id');
      ui.screen = 'class';
      ui.selected = {};
      ui.detailId = null;
      ui.detailEdit = false;
      ui.sort = 'name';
      ui.modal = null;
      ui.formError = '';
      render();
      return;
    }
    if (act === 'open-soa') { ui.formError = ''; ui.modal = { type: 'add-soa' }; render(); return; }
    if (act === 'soa-drop') {
      var soaId = btn.getAttribute('data-id');
      state.soaSlots = (state.soaSlots || []).filter(function (slot) { return slot.id !== soaId; });
      soaSeen = !!(state.soaSlots && state.soaSlots.length);
      save();
      toast('Đã gỡ giờ SOA.');
      render();
      return;
    }
    if (act === 'schedule-pick') {
      ui.formError = '';
      ui.modal = {
        type: 'schedule-choice',
        id: btn.getAttribute('data-id'),
        key: btn.getAttribute('data-key'),
        iso: btn.getAttribute('data-iso'),
        start: btn.getAttribute('data-start'),
        end: btn.getAttribute('data-end'),
        action: 'defer'
      };
      render();
      return;
    }
    if (act === 'move-session') {
      if (!ui.modal) return;
      ui.modal.type = 'move-session';
      ui.modal.action = 'defer';
      ui.formError = '';
      render();
      return;
    }
    if (act === 'save-move') { saveMove(); return; }
    if (act === 'save-session-fet') { saveSessionFet(); return; }
    if (act === 'export-classes') { exportClasses(btn.getAttribute('data-kind')); return; }
    if (act === 'print-students') { printStudents(); return; }
    if (act === 'suggest-open') {
      ui.formError = '';
      ui.modal = { type: 'suggest' };
      render();
      return;
    }
    if (act === 'suggest-send') { sendSuggestion(); return; }
    if (act === 'drop-image') {
      var postBox = document.getElementById('post-text');
      ui.postDraft = postBox ? postBox.value : ui.postDraft;
      ui.postImages.splice(Number(btn.getAttribute('data-index')), 1);
      render();
      return;
    }
    if (act === 'preview-image') {
      var ann = announcementById(btn.getAttribute('data-id'));
      var imageIndex = Number(btn.getAttribute('data-index'));
      if (ann && ann.images && ann.images[imageIndex]) openPreview(ann.images[imageIndex]);
      return;
    }
    if (act === 'preview-in' || act === 'preview-out') {
      preview.scale = clampScale(preview.scale * (act === 'preview-in' ? 1.25 : 0.8));
      if (preview.scale === 1) { preview.x = 0; preview.y = 0; }
      applyPreviewTransform();
      return;
    }
    if (act === 'preview-close') { closePreview(); return; }
    if (act === 'download-classes') { downloadClasses(); return; }
    if (act === 'download-data') { downloadData(); return; }
    if (act === 'pick-folder') {
      if (!window.showDirectoryPicker) {
        toast('Trình duyệt không cho trang ghi thẳng vào thư mục. Hãy tải ocean-edu-classes.json, chép vào Index local rồi đăng lại thư mục.');
        return;
      }
      folderAsked = true;
      showSync('saving');
      window.showDirectoryPicker({ id: 'ocean-edu-index-local', mode: 'readwrite' }).then(function (handle) {
        return rememberFolder(handle).then(function () { return writeDataFile(); });
      }).then(function (ok) {
        if (ok) {
          showSync('confirmed');
          toast('Đã gắn thư mục. Mỗi lần lưu, app ghi ocean-edu-classes.json và ocean-edu-data.json.');
          return;
        }
        showSync('idle');
        toast('Đã chọn thư mục nhưng chưa ghi được hai file JSON.');
      }).catch(function (err) {
        showSync('idle');
        if (err && err.name === 'AbortError') return;
        toast('Không gắn được thư mục. Hãy tải file và lưu vào Index local.');
      });
      return;
    }
    if (act === 'open-add-class') { ui.formError = ''; ui.modal = { type: 'add-class' }; render(); return; }
    if (act === 'edit-class') { ui.formError = ''; ui.modal = { type: 'edit-class' }; render(); return; }
    if (act === 'close-modal') { ui.modal = null; ui.formError = ''; ui.importDraft = null; render(); releasePending(); return; }
    if (act === 'open-add-student') { ui.formError = ''; ui.modal = { type: 'add-student' }; render(); return; }
    if (act === 'open-import') { ui.formError = ''; ui.importDraft = null; ui.modal = { type: 'import-students' }; render(); return; }
    if (act === 'open-hw-import') {
      if (deny(canMark())) return;
      ui.formError = '';
      ui.importDraft = null;
      ui.modal = { type: 'import-homework' };
      render();
      return;
    }
    if (act === 'download-template') { downloadTemplate(); return; }
    if (act === 'run-import') { runImport(); return; }
    if (act === 'run-hw-import') { runHomeworkImport(); return; }
    if (act === 'download-hw-template') { downloadHomeworkTemplate(); return; }
    if (act === 'edit-student') { ui.formError = ''; ui.modal = { type: 'edit-student', id: btn.getAttribute('data-id') }; render(); return; }
    if (act === 'open-student') { ui.detailId = btn.getAttribute('data-id'); ui.detailEdit = false; render(); return; }
    if (act === 'close-detail') { ui.detailId = null; ui.detailEdit = false; render(); releasePending(); return; }
    if (act === 'edit-detail') { ui.detailEdit = true; render(); return; }
    if (act === 'cancel-detail') { ui.detailEdit = false; render(); releasePending(); return; }
    if (act === 'save-detail') { saveDetail(); return; }
    if (act === 'add-note') {
      var list = document.getElementById('note-list');
      if (list) list.insertAdjacentHTML('beforeend', noteRow('', L.monthKey(new Date()), ''));
      return;
    }
    if (act === 'remove-note') {
      var row = btn.closest('.note-row');
      if (row) row.remove();
      return;
    }
    if (act === 'sort') { ui.sort = btn.getAttribute('data-sort'); render(); return; }
    if (act === 'week') {
      var dir = Number(btn.getAttribute('data-dir'));
      ui.weekOffset = Math.min(0, ui.weekOffset + dir);
      render();
      return;
    }
    if (act === 'clear-filter') {
      ui.staffFilter = { fet: '', cm: '', ta: '' };
      render();
      return;
    }
    if (act === 'export-schedule') { exportSchedule(btn.getAttribute('data-kind')); return; }
    if (act === 'open-homework') {
      ui.classId = btn.getAttribute('data-id');
      ui.screen = 'homework-class';
      ui.hwPick = {};
      ui.detailId = null;
      ui.detailEdit = false;
      ui.modal = null;
      var hwCls = findClass(ui.classId);
      ui.hwMonth = hwCls ? clampHwMonth(hwCls, L.monthKey(new Date())) : '';
      render();
      return;
    }
    if (act === 'hw-month') {
      var clsMonth = findClass(ui.classId);
      if (!clsMonth) return;
      ui.hwMonth = clampHwMonth(clsMonth, L.shiftMonth(ui.hwMonth, Number(btn.getAttribute('data-dir'))));
      render();
      return;
    }
    if (act === 'open-curriculum') {
      ui.curriculumId = btn.getAttribute('data-id');
      ui.curriculumLevel = '';
      ui.screen = 'curriculum';
      ui.modal = null;
      ui.detailId = null;
      ui.detailEdit = false;
      render();
      return;
    }
    if (act === 'curriculum-back') {
      ui.curriculumId = null;
      ui.curriculumLevel = '';
      ui.screen = 'curriculum';
      render();
      return;
    }
    if (act === 'hw-cell') {
      var cellStu = findStudent(btn.getAttribute('data-id'));
      if (cellStu && L.attendanceUnavailable(cellStu.stu)) return;
      ui.modal = { type: 'hw-mark', id: btn.getAttribute('data-id'), iso: btn.getAttribute('data-key') };
      render();
      return;
    }
    if (act === 'hw-set') {
      var mark = findStudent(ui.modal && ui.modal.id);
      if (mark && L.attendanceUnavailable(mark.stu)) {
        ui.modal = null;
        render();
        return;
      }
      if (mark && ui.modal.iso) {
        if (!mark.stu.homework) mark.stu.homework = {};
        var status = btn.getAttribute('data-status') || '';
        if (status) mark.stu.homework[ui.modal.iso] = status;
        else delete mark.stu.homework[ui.modal.iso];
        save();
      }
      ui.modal = null;
      render();
      return;
    }
    if (act === 'export-homework') { exportHomework(btn.getAttribute('data-kind')); return; }
    if (act === 'new-account') { ui.accountForm = { mode: 'new', role: 'commenter' }; paintAccounts(); return; }
    if (act === 'edit-account') {
      var acc = accountById(btn.getAttribute('data-id'));
      ui.accountForm = { mode: 'edit', id: btn.getAttribute('data-id'), role: acc ? acc.role : 'commenter' };
      paintAccounts();
      return;
    }
    if (act === 'cancel-account') { ui.accountForm = null; paintAccounts(); return; }
    if (act === 'delete-account') { deleteAccount(btn.getAttribute('data-id')); return; }
    if (act === 'bulk-transfer') {
      if (!selectedIds().length) return;
      ui.formError = '';
      ui.modal = { type: 'transfer' };
      render();
      return;
    }
    if (act === 'confirm-transfer') { doTransfer(); return; }
    if (act === 'bulk-expire') {
      if (!selectedIds().length) return;
      ui.formError = '';
      ui.modal = { type: 'expire' };
      render();
      return;
    }
    if (act === 'do-expire') { doExpire(); return; }
    if (act === 'archive-open') {
      ui.archiveFolder = btn.getAttribute('data-folder') === 'former' ? 'former' : 'official';
      ui.archiveQuery = '';
      ui.archiveTrack = '';
      ui.archiveClass = '';
      ui.archiveEnroll = '';
      ui.archivePick = {};
      render();
      return;
    }
    if (act === 'archive-back') {
      ui.archiveFolder = '';
      render();
      return;
    }
    if (act === 'bulk-delete') {
      if (!selectedIds().length) return;
      ui.modal = { type: 'confirm', text: 'Xóa vĩnh viễn ' + selectedIds().length + ' học viên khỏi data? Các em sẽ không vào Học viên cũ/kết thúc.', yes: 'do-bulk-delete' };
      render();
      return;
    }
    if (act === 'do-bulk-delete') { doDeleteStudents(selectedIds()); return; }
    if (act === 'delete-one') {
      ui.modal = { type: 'confirm', text: 'Xóa vĩnh viễn học viên này khỏi data? Em sẽ không vào Học viên cũ/kết thúc.', yes: 'do-delete-one', id: btn.getAttribute('data-id') };
      render();
      return;
    }
    if (act === 'do-delete-one') {
      var deleteId = (ui.modal && ui.modal.id) || btn.getAttribute('data-id');
      if (deleteId) doDeleteStudents([deleteId]);
      return;
    }
    if (act === 'delete-class') {
      ui.modal = { type: 'confirm', text: 'Xóa cả lớp? Học viên trong lớp bị xóa vĩnh viễn khỏi data và không vào Học viên cũ/kết thúc.', yes: 'do-delete-class' };
      render();
      return;
    }
    if (act === 'do-delete-class') { doDeleteClass(); return; }
    if (act === 'archive-purge') {
      if (!Object.keys(ui.archivePick || {}).length) return;
      ui.modal = { type: 'confirm', text: 'Xóa vĩnh viễn ' + Object.keys(ui.archivePick).length + ' học viên khỏi data? Các em sẽ không còn trong Học viên cũ/kết thúc.', yes: 'do-archive-purge' };
      render();
      return;
    }
    if (act === 'do-archive-purge') { doArchivePurge(); return; }
    if (act === 'rejoin-pick') {
      var rejoin = null;
      var rejoinId = btn.getAttribute('data-id');
      (state.archive || []).forEach(function (item) { if (item.id === rejoinId) rejoin = item; });
      if (!rejoin || !ui.modal) return;
      ui.modal.rejoinId = rejoin.id;
      function setField(name, value) {
        var el = document.querySelector('#student-form [name="' + name + '"]');
        if (el) el.value = value == null ? '' : value;
      }
      setField('code', rejoin.code || '');
      setField('name', rejoin.name || '');
      setField('englishName', rejoin.englishName || '');
      setField('phone', rejoin.phone || '');
      setField('ec', rejoin.ec || '');
      setField('dob', rejoin.dob && rejoin.dob !== '?' && rejoin.dob !== '-' ? String(rejoin.dob).slice(0, 10) : '');
      var genderBox = document.querySelector('#student-form [name="gender"]');
      if (genderBox && rejoin.gender) genderBox.value = rejoin.gender;
      var enrollBox = document.getElementById('f-enroll');
      if (enrollBox) {
        enrollBox.value = rejoin.enroll === 'trial' ? 'trial' : 'official';
        enrollBox.dispatchEvent(new Event('change', { bubbles: true }));
      }
      var rejoinList = document.getElementById('rejoin-list');
      if (rejoinList) rejoinList.innerHTML = '<p class="help">Đang cho vào lại: ' + esc(rejoin.name || '') + ' · ' + esc(rejoin.code || '') + '</p>';
      return;
    }
    if (act === 'exam-create') {
      ui.examWizard = { step: 0, name: '', type: 'class', ageFrom: '', ageTo: '', classIds: {}, dates: {}, calMonth: L.monthKey(new Date()) };
      ui.examId = null;
      ui.examWeek = '';
      ui.formError = '';
      render();
      return;
    }
    if (act === 'exam-day') {
      readExamWizardDom();
      var dayWizard = ui.examWizard;
      if (!dayWizard) return;
      var dayClass = btn.getAttribute('data-class');
      var dayIso = btn.getAttribute('data-iso') || '';
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dayIso)) return;
      if (!dayWizard.dates[dayClass] || typeof dayWizard.dates[dayClass] !== 'object') dayWizard.dates[dayClass] = {};
      if (dayWizard.dates[dayClass][dayIso]) delete dayWizard.dates[dayClass][dayIso];
      else dayWizard.dates[dayClass][dayIso] = true;
      btn.classList.toggle('is-exam', !!dayWizard.dates[dayClass][dayIso]);
      return;
    }
    if (act === 'exam-cal') {
      readExamWizardDom();
      if (!ui.examWizard) return;
      ui.examWizard.calMonth = L.shiftMonth(ui.examWizard.calMonth || L.monthKey(new Date()), Number(btn.getAttribute('data-dir')));
      ui.formError = '';
      render();
      return;
    }
    if (act === 'exam-week') {
      ui.examWeek = btn.getAttribute('data-week') || '';
      render();
      return;
    }
    if (act === 'transfer-pick') {
      var transferId = btn.getAttribute('data-id');
      if (ui.modal) ui.modal.target = transferId;
      var transferHidden = document.getElementById('transfer-target');
      if (transferHidden) transferHidden.value = transferId;
      document.querySelectorAll('#transfer-picks .pick-opt').forEach(function (el) {
        el.classList.toggle('is-on', el.getAttribute('data-id') === transferId);
      });
      paintTransferLevel();
      return;
    }
    if (act === 'exam-cancel' || act === 'exam-list') {
      ui.examWizard = null;
      if (act === 'exam-list') ui.examId = null;
      ui.formError = '';
      render();
      return;
    }
    if (act === 'open-exam') {
      ui.examWizard = null;
      ui.examId = btn.getAttribute('data-id');
      ui.examWeek = '';
      ui.formError = '';
      render();
      return;
    }
    if (act === 'exam-back') {
      readExamWizardDom();
      if (ui.examWizard) ui.examWizard.step = Math.max(0, (ui.examWizard.step || 0) - 1);
      ui.formError = '';
      render();
      return;
    }
    if (act === 'exam-next' || act === 'exam-commit') {
      readExamWizardDom();
      var wizard = ui.examWizard;
      if (!wizard) return;
      if (wizard.step === 0) {
        if (!String(wizard.name || '').trim()) { ui.formError = 'Điền tên đợt thi.'; render(); return; }
        wizard.name = String(wizard.name).trim();
        wizard.step = 1;
        ui.formError = '';
        render();
        return;
      }
      if (wizard.step === 1) {
        if (!Object.keys(wizard.classIds).length) { ui.formError = 'Chọn ít nhất một lớp.'; render(); return; }
        if (!wizard.calMonth) wizard.calMonth = L.monthKey(new Date());
        if (!wizard.dates) wizard.dates = {};
        wizard.step = 2;
        ui.formError = '';
        render();
        return;
      }
      if (act !== 'exam-commit') return;
      var missingDate = Object.keys(wizard.classIds).some(function (id) { return !examDatesOf(wizard.dates[id]).length; });
      if (missingDate) { ui.formError = 'Chọn ít nhất một ngày thi cho từng lớp.'; render(); return; }
      commitExam();
      return;
    }
    if (act === 'exam-extra-pick') {
      var extraExam = findExam(ui.examId);
      var extraEntry = null;
      var extraClass = btn.getAttribute('data-entry');
      if (extraExam) (extraExam.entries || []).forEach(function (entry) { if (entry.classId === extraClass) extraEntry = entry; });
      var extraCls = findClass(extraClass);
      var extraStu = null;
      if (extraCls) (extraCls.students || []).forEach(function (stu) { if (stu.id === btn.getAttribute('data-id')) extraStu = stu; });
      if (!extraEntry || !extraStu) return;
      var already = (extraEntry.students || []).some(function (stu) { return stu.studentId === extraStu.id; });
      if (already) return;
      extraEntry.students.push({
        studentId: extraStu.id,
        name: extraStu.name || '',
        englishName: extraStu.englishName || '',
        code: extraStu.code || '',
        enroll: L.enrollOf(extraStu),
        score: '',
        review: '',
        extra: true
      });
      examsSeen = true;
      save();
      render();
      return;
    }
    if (act === 'resume-student') {
      var found = findStudent(btn.getAttribute('data-id'));
      if (!found) return;
      var stu = found.stu;
      var prev = {
        status: stu.status,
        stoppedAt: stu.stoppedAt,
        expireKind: stu.expireKind,
        expiredAt: stu.expiredAt,
        expireReason: stu.expireReason
      };
      stu.status = 'active';
      stu.stoppedAt = null;
      if (stu.expireKind === 'stop') {
        stu.expireKind = '';
        stu.expiredAt = '';
        stu.expireReason = '';
      }
      var resumed = L.studentPhase(found.cls, stu, new Date());
      if (resumed.kind === 'listed' && listedCount(found.cls, new Date()) > 20) {
        stu.status = prev.status;
        stu.stoppedAt = prev.stoppedAt;
        stu.expireKind = prev.expireKind;
        stu.expiredAt = prev.expiredAt;
        stu.expireReason = prev.expireReason;
        toast(ROSTER_FULL);
        return;
      }
      save();
      toast(stu.name + ' đã học lại.');
      render();
    }
  });

  document.addEventListener('change', function (e) {
    var t = e.target;
    if (t.matches('[data-archive-pick]')) {
      var archiveId = t.getAttribute('data-archive-pick');
      if (t.checked) ui.archivePick[archiveId] = true;
      else delete ui.archivePick[archiveId];
      return;
    }
    if (t.matches('[data-exam-score]') || t.matches('[data-exam-review]')) {
      var examPatch = {};
      if (t.hasAttribute('data-exam-score')) examPatch.score = t.value;
      else examPatch.review = t.value;
      patchExamStudent(t.getAttribute('data-exam'), t.getAttribute('data-entry'), t.getAttribute('data-stu'), examPatch);
      return;
    }
    if (t.id === 'dash-month') {
      ui.dashMonth = t.value;
      render();
      return;
    }
    if (t.id === 'staff-month') {
      ui.staffMonth = t.value;
      render();
      return;
    }
    if (t.matches('[data-staff-code]') || t.matches('[data-staff-soa]')) {
      var staffName = t.getAttribute('data-name');
      if (!staffName) return;
      if (!state.staffBook) state.staffBook = {};
      if (!state.staffBook[staffName]) state.staffBook[staffName] = { code: '', soa: {} };
      if (!state.staffBook[staffName].soa) state.staffBook[staffName].soa = {};
      if (t.hasAttribute('data-staff-code')) state.staffBook[staffName].code = String(t.value || '').trim();
      else {
        var soaMonth = t.getAttribute('data-month') || '';
        var soaValue = String(t.value || '').trim();
        if (soaValue && /^\d{4}-\d{2}$/.test(soaMonth)) state.staffBook[staffName].soa[soaMonth] = soaValue;
        else if (soaMonth) delete state.staffBook[staffName].soa[soaMonth];
      }
      staffBookSeen = true;
      save({ quiet: true });
      return;
    }
    if (t.matches('[data-pick]')) {
      if (t.checked) ui.selected[t.getAttribute('data-pick')] = true;
      else delete ui.selected[t.getAttribute('data-pick')];
      var bar = document.getElementById('bulk-bar');
      var count = document.getElementById('bulk-count');
      var n = selectedIds().length;
      if (bar) bar.hidden = n === 0;
      if (count) count.textContent = String(n);
      return;
    }
    if (t.matches('[data-pick-all]')) {
      document.querySelectorAll('[data-pick]').forEach(function (box) {
        box.checked = t.checked;
        if (t.checked) ui.selected[box.getAttribute('data-pick')] = true;
        else delete ui.selected[box.getAttribute('data-pick')];
      });
      var barAll = document.getElementById('bulk-bar');
      var countAll = document.getElementById('bulk-count');
      var total = selectedIds().length;
      if (barAll) barAll.hidden = total === 0;
      if (countAll) countAll.textContent = String(total);
      return;
    }
    if (t.matches('[data-day-toggle]')) {
      var row = t.closest('[data-day]');
      var inputs = row.querySelectorAll('input[type="time"]');
      inputs.forEach(function (input) { input.disabled = !t.checked; });
      if (t.checked) {
        if (!inputs[0].value) inputs[0].value = '17:30';
        if (!inputs[1].value) inputs[1].value = '19:00';
      }
    }
    if (t.id === 'f-track') refillGrades();
    if (t.id === 'f-grade') onGradePick();
    if (t.id === 'f-kind') syncKindFields();
    if (t.id === 'f-fix') {
      var fixBox = document.getElementById('fix-box');
      if (fixBox) fixBox.hidden = !t.checked;
    }
    if (t.id === 'transfer-target') paintTransferLevel();
    if (t.id === 'f-enroll') {
      var trialBox = document.getElementById('trial-box');
      var scholarBox = document.getElementById('scholar-box');
      if (trialBox) trialBox.hidden = t.value !== 'trial';
      if (scholarBox) scholarBox.hidden = t.value !== 'scholarship';
    }
    if (t.id === 'archive-track' || t.id === 'archive-class' || t.id === 'archive-enroll') {
      if (t.id === 'archive-track') ui.archiveTrack = t.value;
      if (t.id === 'archive-class') ui.archiveClass = t.value;
      if (t.id === 'archive-enroll') ui.archiveEnroll = t.value;
      render();
      return;
    }
    if (t.id === 'excel-file') readExcelFile(t.files && t.files[0]);
    if (t.id === 'hw-excel-file') readHomeworkFile(t.files && t.files[0]);
    if (t.matches('[data-filter]')) {
      ui.staffFilter[t.getAttribute('data-filter')] = t.value;
      render();
      return;
    }
    if (t.id === 'notice-month') {
      ui.noticeMonth = t.value || L.monthKey(new Date());
      paintNotices();
      return;
    }
    if (t.id === 'acc-role') {
      var wrap = document.getElementById('acc-pass-wrap');
      if (wrap) wrap.hidden = t.value === 'guest';
      var permWrap = document.getElementById('acc-perm-wrap');
      if (permWrap) permWrap.hidden = t.value === 'admin';
      var defaults = defaultPerms(t.value);
      var classesBox = document.getElementById('perm-classes');
      var homeworkBox = document.getElementById('perm-homework');
      var suggestBox = document.getElementById('perm-suggest');
      if (classesBox) classesBox.checked = defaults.exportClasses;
      if (homeworkBox) homeworkBox.checked = defaults.exportHomework;
      if (suggestBox) suggestBox.checked = defaults.suggest;
      if (ui.accountForm) ui.accountForm.role = t.value;
      return;
    }
    if (t.name === 'move-mode') {
      var slot = document.getElementById('custom-slot');
      if (slot) slot.hidden = t.value !== 'custom';
      if (ui.modal) ui.modal.action = t.value;
      return;
    }
    if (t.id === 'post-images') {
      var draft = document.getElementById('post-text');
      ui.postDraft = draft ? draft.value : ui.postDraft;
      var room = 4 - (ui.postImages ? ui.postImages.length : 0);
      var files = Array.prototype.slice.call(t.files || []).filter(function (file) {
        return file && String(file.type || '').indexOf('image/') === 0 && file.size <= 12 * 1024 * 1024;
      }).slice(0, room);
      if (room <= 0) { toast('Tối đa 4 ảnh.'); return; }
      if (!files.length) { toast('Chọn file ảnh.'); return; }
      Promise.all(files.map(compressImage)).then(function (urls) {
        ui.postImages = (ui.postImages || []).concat(urls).slice(0, 4);
        render();
      }).catch(function () { toast('Không đọc được ảnh.'); });
    }
    if (t.id === 'curriculum-level') {
      ui.curriculumLevel = t.value;
      render();
      return;
    }
    if (t.id === 'd-pec-self') {
      var pecOn = t.checked;
      var pecUser = document.getElementById('d-pec-user');
      var pecPass = document.getElementById('d-pec-pass');
      var pecUserMark = document.getElementById('d-pec-user-mark');
      var pecPassMark = document.getElementById('d-pec-pass-mark');
      if (pecUser) pecUser.hidden = pecOn;
      if (pecPass) pecPass.hidden = pecOn;
      if (pecUserMark) pecUserMark.hidden = !pecOn;
      if (pecPassMark) pecPassMark.hidden = !pecOn;
      return;
    }
    if (t.matches('[data-book]')) {
      applyCurriculumPatch(t.getAttribute('data-id'), { bookStatus: t.value }, true);
      return;
    }
    if (t.matches('[data-pec-self]')) {
      applyCurriculumPatch(t.getAttribute('data-id'), { pecMode: t.checked ? 'self' : '' }, true);
      return;
    }
    if (t.matches('[data-pec-user]')) {
      applyCurriculumPatch(t.getAttribute('data-id'), { pecUser: t.value }, false);
      return;
    }
    if (t.matches('[data-pec-pass]')) {
      applyCurriculumPatch(t.getAttribute('data-id'), { pecPass: t.value }, false);
      return;
    }
    if (t.matches('[data-hw-pick]')) {
      if (t.checked) ui.hwPick[t.getAttribute('data-hw-pick')] = true;
      else delete ui.hwPick[t.getAttribute('data-hw-pick')];
      return;
    }
    if (t.matches('[data-hw-all]')) {
      document.querySelectorAll('[data-hw-pick]').forEach(function (box) {
        box.checked = t.checked;
        var id = box.getAttribute('data-hw-pick');
        if (t.checked) ui.hwPick[id] = true;
        else delete ui.hwPick[id];
      });
    }
  });

  document.addEventListener('focusin', function (e) {
    if (e.target && e.target.id === 'acc-pass') e.target.removeAttribute('readonly');
  });

  document.addEventListener('beforeinput', function (e) {
    if (e.target && e.target.id === 'acc-pass') e.target.setAttribute('data-typed', '1');
  });

  document.addEventListener('input', function (e) {
    if (e.target.id === 'rejoin-q') {
      paintRejoin(e.target.value);
      return;
    }
    if (e.target.id === 'class-q') {
      var classQuery = String(e.target.value || '').trim().toLowerCase();
      document.querySelectorAll('.group-block').forEach(function (block) {
        var items = block.querySelectorAll('.folder-item');
        if (!items.length) {
          block.hidden = !!classQuery;
          return;
        }
        var anyClass = false;
        items.forEach(function (item) {
          var className = item.getAttribute('data-name') || '';
          var showClass = !classQuery || className.indexOf(classQuery) >= 0;
          item.hidden = !showClass;
          if (showClass) anyClass = true;
        });
        block.hidden = !anyClass;
      });
      return;
    }
    if (e.target.id === 'exam-class-q') {
      var examQuery = String(e.target.value || '').trim().toLowerCase();
      document.querySelectorAll('#exam-class-picks .pick-opt').forEach(function (el) {
        var examName = el.getAttribute('data-name') || '';
        el.hidden = !!(examQuery && examName.indexOf(examQuery) < 0);
      });
      return;
    }
    if (e.target.id === 'transfer-q') {
      var transferQuery = String(e.target.value || '').trim().toLowerCase();
      document.querySelectorAll('#transfer-picks .pick-opt').forEach(function (el) {
        var transferName = el.getAttribute('data-name') || '';
        el.hidden = !!(transferQuery && transferName.indexOf(transferQuery) < 0);
      });
      return;
    }
    if (e.target.matches && e.target.matches('[data-exam-extra]')) {
      paintExamExtra(e.target.getAttribute('data-entry'), e.target.value);
      return;
    }
    if (e.target.id === 'archive-q') {
      var start = e.target.selectionStart;
      var end = e.target.selectionEnd;
      ui.archiveQuery = e.target.value;
      render();
      var box = document.getElementById('archive-q');
      if (box) {
        box.focus();
        if (start != null && box.setSelectionRange) box.setSelectionRange(start, end);
      }
      return;
    }
    if (e.target.id === 'post-text') ui.postDraft = e.target.value;
    if (e.target.id === 'f-number') {
      e.target.dataset.dirty = '1';
      updateClassPreview();
    }
    if (e.target.id === 'f-grade' || e.target.id === 'f-custom') updateClassPreview();
  });

  document.addEventListener('submit', function (e) {
    if (e.target.id === 'login-form') {
      e.preventDefault();
      var data = new FormData(e.target);
      var username = String(data.get('username') || '').trim();
      var password = String(data.get('password') || '');
      var account = null;
      for (var i = 0; i < state.accounts.length; i++) {
        if (String(state.accounts[i].username || '').trim() === username) account = state.accounts[i];
      }
      var storedPassword = account && account.role !== 'guest' ? String(account.password || '') : '';
      if (!account || (account.role === 'guest' ? password !== '' : storedPassword !== password)) {
        ui.loginError = 'Sai username hoặc mật khẩu.';
        render();
        return;
      }
      ui.loginError = '';
      ui.user = { username: account.username, name: account.name, role: account.role };
      sessionStorage.setItem('oceanEduUser', JSON.stringify(ui.user));
      ui.screen = 'menu';
      ui.boardMonth = L.monthKey(new Date());
      showLoaderThen(function () {
        var result = L.runSystemUpdate(state, new Date());
        save();
        return result;
      }).then(function (result) {
        paintGate();
        playUnseenActivity();
        if (result && result.promoted.length) toast(result.promoted.length + ' lớp vừa lên cấp. Xem bảng thông báo tháng.');
        else if (result && result.finished && result.finished.length) toast(result.finished.length + ' lớp custom đã kết thúc và không lên trình độ.');
        else if (result && result.archived && result.archived.length) toast(result.archived.length + ' học viên đã chuyển vào Học viên cũ/kết thúc.');
      });
      return;
    }
    if (e.target.id === 'settings-form') {
      e.preventDefault();
      if (deny(canEdit())) return;
      var title = document.getElementById('setting-title').value.trim();
      if (!title) return;
      state.settings.title = title;
      delete state.settings.supabaseUrl;
      delete state.settings.supabaseKey;
      save();
      paintTitles();
      closeSettings();
      toast('Đã lưu cài đặt.');
      return;
    }
    if (e.target.id === 'account-form') { saveAccountForm(e); return; }
    if (e.target.id === 'post-form') {
      e.preventDefault();
      if (deny(canEdit())) return;
      var text = document.getElementById('post-text').value.trim();
      var images = (ui.postImages || []).slice(0, 4);
      if (!text && !images.length) { toast('Nhập nội dung hoặc chọn ảnh.'); return; }
      var now = new Date();
      L.pushNotice(state, now, text || 'Thông báo kèm ảnh.');
      var item = state.announcements[state.announcements.length - 1];
      item.kind = 'post';
      item.author = ui.user.name;
      item.images = images;
      if (!save()) {
        state.announcements.pop();
        return;
      }
      ui.postDraft = '';
      ui.postImages = [];
      toast('Đã đăng thông báo.');
      render();
      return;
    }
    if (e.target.id === 'class-form') { e.preventDefault(); saveClass(e.target); }
    if (e.target.id === 'soa-form') { e.preventDefault(); saveSoa(e.target); }
    if (e.target.id === 'student-form') { e.preventDefault(); saveStudent(e.target); }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var gateBox = document.getElementById('gatebox');
    if (gateBox && !gateBox.classList.contains('hidden')) return;
    var previewBox = document.getElementById('previewbox');
    if (previewBox && !previewBox.classList.contains('hidden')) { closePreview(); return; }
    if (!document.getElementById('clockbox').classList.contains('hidden')) {
      document.getElementById('clockbox').classList.add('hidden');
      return;
    }
    if (!document.getElementById('settingsbox').classList.contains('hidden')) { closeSettings(); return; }
    if (ui.modal) { ui.modal = null; ui.formError = ''; ui.importDraft = null; render(); releasePending(); return; }
    if (ui.detailId) { ui.detailId = null; ui.detailEdit = false; render(); releasePending(); }
  });

  function bindBang() {
    var holdTimer = null;
    var hideTimer = null;
    var holding = false;
    function tipEl() {
      var tip = document.getElementById('bang-tip');
      if (tip) return tip;
      tip = document.createElement('div');
      tip.id = 'bang-tip';
      tip.className = 'hidden';
      tip.setAttribute('role', 'tooltip');
      document.body.appendChild(tip);
      return tip;
    }
    function show(el) {
      clearTimeout(hideTimer);
      var tip = tipEl();
      tip.textContent = el.getAttribute('data-detail') || '';
      tip.classList.remove('hidden');
      var rect = el.getBoundingClientRect();
      var width = Math.min(280, window.innerWidth - 16);
      var left = rect.left;
      if (left + width > window.innerWidth - 8) left = window.innerWidth - width - 8;
      if (left < 8) left = 8;
      var top = rect.bottom + 8;
      tip.style.width = width + 'px';
      tip.style.left = left + 'px';
      tip.style.top = top + 'px';
      var height = tip.offsetHeight;
      if (top + height > window.innerHeight - 8) tip.style.top = Math.max(8, rect.top - height - 8) + 'px';
    }
    function hideSoon(ms) {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(function () {
        holding = false;
        var tip = document.getElementById('bang-tip');
        if (tip) tip.classList.add('hidden');
      }, ms);
    }
    document.addEventListener('mouseover', function (e) {
      var bang = e.target.closest ? e.target.closest('.bang') : null;
      if (!bang) return;
      show(bang);
    });
    document.addEventListener('mouseout', function (e) {
      var bang = e.target.closest ? e.target.closest('.bang') : null;
      if (!bang || holding) return;
      hideSoon(120);
    });
    document.addEventListener('pointerdown', function (e) {
      var bang = e.target.closest ? e.target.closest('.bang') : null;
      if (!bang) return;
      e.preventDefault();
      e.stopPropagation();
      clearTimeout(holdTimer);
      holdTimer = setTimeout(function () {
        holding = true;
        show(bang);
      }, 350);
    }, true);
    function endHold() {
      clearTimeout(holdTimer);
      if (holding) hideSoon(2600);
    }
    document.addEventListener('pointerup', endHold, true);
    document.addEventListener('pointercancel', endHold, true);
    document.addEventListener('click', function (e) {
      var bang = e.target.closest ? e.target.closest('.bang') : null;
      if (!bang) return;
      e.preventDefault();
      e.stopPropagation();
    }, true);
  }

  function finishBoot() {
    applyTheme(state.settings.theme);
    savePaused = false;
    var loader = document.getElementById('loader');
    try {
      var savedUser = JSON.parse(sessionStorage.getItem('oceanEduUser') || 'null');
      var restored = savedUser && state.accounts.filter(function (acc) { return acc.username === savedUser.username; })[0];
      if (restored) {
        ui.user = { username: restored.username, name: restored.name, role: restored.role };
        sessionStorage.setItem('oceanEduUser', JSON.stringify(ui.user));
        ui.screen = 'menu';
        if (loader) loader.classList.add('hidden');
        showLoaderThen(function () {
          var result = L.runSystemUpdate(state, new Date());
          var changed = result.promoted.length || result.notesCleared || result.ending || (result.finished && result.finished.length) || (result.archived && result.archived.length);
          if (persistBook || changed) save(persistBook && !changed ? { keepStamp: true, quiet: true } : { quiet: true });
        }).then(function () {
          paintGate();
        });
        return;
      }
    } catch (err) {}
    if (persistBook) save({ keepStamp: true, quiet: true });
    if (loader) loader.classList.add('hidden');
    render();
  }

  function frameLabel(frame) {
    var map = {
      narrow: 'khung hẹp',
      phone: 'điện thoại',
      tablet: 'máy tính bảng',
      desktop: 'máy tính',
      wide: 'rộng',
      short: 'ngang thấp'
    };
    return map[frame] || frame;
  }

  function fitViewport() {
    var w = window.innerWidth || document.documentElement.clientWidth || 0;
    var h = window.innerHeight || document.documentElement.clientHeight || 0;
    var orient = h > w ? 'portrait' : 'landscape';
    var frame = 'desktop';
    if (w < 520) frame = 'narrow';
    else if (w < 800) frame = 'phone';
    else if (w < 1100) frame = 'tablet';
    else if (w / Math.max(h, 1) > 1.9) frame = 'wide';
    if (orient === 'landscape' && h < 500) frame = 'short';
    var root = document.documentElement;
    root.setAttribute('data-orient', orient);
    root.setAttribute('data-frame', frame);
    root.setAttribute('data-ratio', (w / Math.max(h, 1)).toFixed(2));
    return { w: w, h: h, orient: orient, frame: frame };
  }

  function paintLoaderRatio() {
    var box = fitViewport();
    var title = document.getElementById('loader-title');
    var note = document.getElementById('loader-note');
    if (title) title.textContent = 'Đang đo màn hình và đọc dữ liệu...';
    if (!note) return;
    var orient = box.orient === 'portrait' ? 'Dọc' : 'Ngang';
    var ratio = (box.w / Math.max(box.h, 1)).toFixed(2);
    var extra = classListScore(state.classes) > 0 ? ' · đã nạp JSON' : '';
    note.textContent = orient + ' · ' + box.w + ' × ' + box.h + ' · tỉ lệ ' + ratio + ' · ' + frameLabel(box.frame) + extra;
  }

  load();
  bindPreview();
  bindBang();
  applyTheme(state.settings.theme);
  ui.boardMonth = L.monthKey(new Date());
  fitViewport();
  paintLoaderRatio();
  window.addEventListener('resize', function () {
    fitViewport();
    var loader = document.getElementById('loader');
    if (loader && !loader.classList.contains('hidden')) paintLoaderRatio();
  });
  var bootStarted = Date.now();
  var bootLoader = document.getElementById('loader');
  if (bootLoader) bootLoader.classList.remove('hidden');
  restoreDir().then(hydrateBook).then(function () {
    paintLoaderRatio();
    var left = 900 - (Date.now() - bootStarted);
    if (left > 0) return wait(left);
  }).then(finishBoot, finishBoot);
  paintClock();
  setInterval(paintClock, 1000);
  setInterval(tickSystem, 10000);
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) tickSystem();
  });
})();
