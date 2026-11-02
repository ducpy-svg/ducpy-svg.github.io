(function () {
  'use strict';

  var L = window.OceanLogic;
  var APP_TITLE = 'Ocean EDU - Student management list (Unofficial) ver 1.5.10';
  var SUGGEST_URL = 'https://script.google.com/macros/s/AKfycbyNFHdMszhrmqyfXDHSDi2ti51y5_Ib3kiXgA5cGzcPkWLboUJSnPYJ5xwikb9N-fLOkg/exec';
  var PRIMARY_IDS = ['ocean', 'sky', 'teal', 'green', 'lime', 'amber', 'orange', 'coral', 'rose', 'violet', 'indigo', 'slate'];
  var SKIN_BOOK = [
    {
      id: 'a2000',
      title: 'Aesthetic 2000s',
      lead: 'Các giao diện đang có, gom một nhóm. Bấm một tên để đổi cả sổ tay. Khung xem trước đổi theo mục đang trỏ.',
      items: [
        { id: 'default', name: 'Default', text: 'Sổ tay gốc: nền sóng biển, khung đậm và chữ rõ. Bảng màu cố định, không còn chỉnh màu.' },
        { id: 'y2k', name: 'Y2K', text: 'Lưới cyan, kim loại và khung vuông của máy tính đời đầu.' },
        { id: 'mcbling', name: 'McBling', text: 'Nhung hồng, viền vàng và chữ serif bóng.' },
        { id: 'aero', name: 'Frutiger Aero', text: 'Kính bóng, xanh trời và giọt nước trong.' },
        { id: 'preppy', name: '2000s Preppy', text: 'Kẻ học đường, navy và đỏ rượu, chữ serif.' },
        { id: 'goth', name: 'Mall Goth', text: 'Đen, tím và đỏ đô, viền kép.' },
        { id: 'fantasy', name: 'Fantasy2K', text: 'Vàng đồng, cánh tiên và khung mềm.' }
      ]
    },
    {
      id: 'd2010',
      title: 'Diversity 2010s',
      lead: 'Bốn hướng 2010. Mỗi hướng giữ một chất liệu riêng.',
      items: [
        { id: 'aerox', name: 'Frutiger Aero extra', text: 'Quả cầu kính 3D bóng, bể cá nhiệt đới, cá heo số và kiểu Web 2.0 giả chất liệu. Bóng bẩy, nước và bong bóng thủy tinh.' },
        { id: 'vapor', name: 'Vaporwave', text: 'Màn hình Windows 98, lưới hoàng hôn hồng neon và teal. Hệ điều hành cũ, lưới 3D và nỗi hoài cổ.' },
        { id: 'indie', name: 'Tumblr Hipster / Indie Sleaze', text: 'Cắt dán, ảnh flash tương phản cao và họa tiết thiên hà.' },
        { id: 'seapunk', name: 'Seapunk', text: 'Xanh nước biển pha hồng neon, cá heo, biểu tượng âm dương và đại dương kỹ thuật số.' }
      ]
    },
    {
      id: 'd2020',
      title: 'Post-modernized 2020s',
      lead: 'Mười một hướng 2020, từ đồng quê và học thuật tới chữ lớn, khối 3D và neon.',
      items: [
        { id: 'cottage', name: 'Cottagecore', text: 'Đồng quê mơ mộng, tự cung tự cấp, làm bánh, thêu và họa tiết hoa. Bình yên, thoát nhịp đô thị.' },
        { id: 'academia', name: 'Dark Academia', text: 'Văn học cổ, kiến trúc Gothic, trường đại học xưa. Nâu đất, đen, xanh rêu và sự say mê tri thức.' },
        { id: 'goblin', name: 'Goblincore', text: 'Góc lộn xộn và hoang dã: nấm, bùn, ếch, xương và đồ nhặt nhỏ. Gồm cả Gremlincore, đối lập vẻ bóng của Cottagecore.' },
        { id: 'lightac', name: 'Light Academia', text: 'Bản sáng, ấm và lãng mạn của Dark Academia. Kem, trắng, ánh nắng và thư viện.' },
        { id: 'neo2k', name: 'Y2K / Neo-Nostalgia', text: 'Văn hóa cuối thập niên 90 và đầu 2000 trở lại: kim loại crôm, giao diện điện tử đời đầu và thời trang alt-TikTok.' },
        { id: 'realism', name: '3D và hiện thực ảo', text: 'Khối 3D bồng bềnh, sống động, nằm dày trên khung và nền.' },
        { id: 'dark', name: 'Chế độ hiển thị tối', text: 'Nền tối kiểu iOS 13 và Android Q. Tối giản, dịu mắt.' },
        { id: 'classic', name: 'Sắc xanh cổ điển', text: 'Classic Blue của Pantone năm 2020. Trầm, tin cậy và bình yên.' },
        { id: 'disrupt', name: 'Kiểu chữ phóng đại', text: 'Chữ khổng lồ và bố cục phá lưới. Nội dung vẫn đọc được.' },
        { id: 'collage', name: 'Cắt dán kỹ thuật số', text: 'Ảnh, nét nguệch ngoạc và mảng vector chồng lên nhau. Cảm giác thủ công.' },
        { id: 'cyber', name: 'Cyberpunk và neon', text: 'Khoa học viễn tưởng và thành phố tương lai. Neon rực đối lập trên nền tối. Chữ nhỏ giữ màu sáng, không dùng hồng neon làm chữ.' }
      ]
    }
  ];
  var SKIN_IDS = [];
  SKIN_BOOK.forEach(function (group) {
    group.items.forEach(function (item) { SKIN_IDS.push(item.id); });
  });
  var IFACES = [
    { id: 'classic', name: 'Sổ tay' },
    { id: 'square', name: 'Vuông' },
    { id: 'glass', name: 'Kính' },
    { id: 'ruled', name: 'Kẻ dòng' },
    { id: 'stark', name: 'Gọn' },
    { id: 'soft', name: 'Mềm' },
    { id: 'notebook', name: 'Notepad' },
    { id: 'compact', name: 'Dày' },
    { id: 'poster', name: 'Chữ lớn' },
    { id: 'grid', name: 'Lưới' },
    { id: 'collage', name: 'Cắt dán' }
  ];
  var IFACE_IDS = IFACES.map(function (item) { return item.id; });
  var SKIN_IFACE = {
    default: 'classic', y2k: 'square', mcbling: 'soft', aero: 'glass', preppy: 'ruled', goth: 'stark', fantasy: 'soft',
    aerox: 'glass', vapor: 'grid', indie: 'collage', seapunk: 'glass', cottage: 'soft', academia: 'notebook',
    goblin: 'stark', lightac: 'ruled', neo2k: 'square', realism: 'glass', dark: 'compact', classic: 'ruled',
    disrupt: 'poster', collage: 'collage', cyber: 'grid'
  };
  var PHOTO_DIR = 'student-photos';
  var CARE_STATUS = {
    none: { label: 'None', tip: 'Chưa tương tác', pct: 0 },
    video: { label: 'Video', tip: 'Chỉ tương tác video', pct: 15 },
    reissue: { label: 'Reissue', tip: 'Xử lý sự vụ thường, gồm lịch học và tình hình học của con', pct: 25 },
    urgent: { label: 'Urgent', tip: 'Xử lý sự vụ quan trọng', pct: 20 },
    comment: { label: 'Comment group', tip: 'Nhận xét, tương tác trên nhóm homework', pct: 10 },
    supported: { label: 'Supported', tip: 'Có sự hỗ trợ từ nhân sự khác, gồm CM, BM, EC', pct: 5 }
  };
  var CARE_RANKS = [
    { id: 'F', min: 0, max: 0, text: 'Không tương tác với học viên, không nắm được tình hình của học viên' },
    { id: 'D', min: 1, max: 30, text: 'Tương tác ít với phụ huynh, chưa cập nhật nhiều tình hình của con tới phụ huynh' },
    { id: 'C', min: 31, max: 50, text: 'Tương tác trung bình' },
    { id: 'B', min: 51, max: 75, text: 'Tương tác thường xuyên với phụ huynh' },
    { id: 'A', min: 76, max: 90, text: 'Tương tác khá kĩ, hỗ trợ nhiệt tình với phụ huynh' },
    { id: 'S', min: 91, max: 10000, text: 'Tương tác rất kĩ, cập nhật liên tục và hỗ trợ phụ huynh và học viên' }
  ];
  var STORAGE = 'oceanEdu.v1';
  var DATA_FILE = 'ocean-edu-data.json';
  var CLASS_FILE = 'ocean-edu-classes.json';
  var REMARK_FILE = 'ocean-edu-remarks.json';
  var LOGIN_KEY = 'oceanEduLogin';

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
    personnel: [],
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
    curriculumMonth: '',
    curriculumCmOpen: false,
    curriculumLayout: 'cards',
    curriculumSort: 'level',
    curriculumQuery: '',
    bookPick: {},
    bookFold: '',
    skinFold: '',
    skinPeek: '',
    dashMonth: '',
    archivePick: {},
    examId: null,
    examWizard: null,
    examWeek: '',
    examFolds: {},
    examFilter: { fet: '', grade: '', program: '' },
    staffMonth: '',
    mailMonth: '',
    mailId: '',
    missedAt: 0,
    noticeMonth: '',
    suggest: { type: 'transfer' },
    rejectId: '',
    classLayout: 'cards',
    classSort: 'level',
    classQuery: '',
    dict: { query: '', status: '', message: '', tab: 'mean', entry: null, suggestions: [], sentence: '', sentenceVi: '', sentenceStatus: '', sentencePair: '' },
    pastBookEdit: '',
    pastBookDraft: null,
    peopleLayout: 'table',
    peopleQuery: '',
    peopleKey: '',
    careMonth: '',
    careClassId: '',
    careLayout: 'cards',
    careSort: 'level',
    careQuery: '',
    profileId: '',
    profileMonth: '',
    profileEdit: false,
    photoPending: null,
    photoUrls: {},
    remarkClassId: '',
    remarkLayout: 'cards',
    remarkSort: 'level',
    remarkQuery: '',
    remarkMonth: '',
    remarkSession: '',
    remarkOpenClass: '',
    remarkDraft: null,
    remarkReadId: '',
    remarkSlip: '',
    remarkEditor: null
  };
  var scrollLatch = { key: '' };

  var remarkPainting = false;
  var REMARK_TAGS = [
    { id: 'finished', en: 'Homework finished', vi: 'Hoàn thành bài tập', comment: true },
    { id: 'redo', en: 'Unfinished', vi: 'Thiếu bài/ làm lại bài', comment: true },
    { id: 'issue', en: 'Issue', vi: 'Có vấn đề', comment: true },
    { id: 'incomplete', en: 'Unfinished', vi: 'Chưa hoàn thành bài tập', comment: true },
    { id: 'absent', en: 'Absent', vi: 'Vắng mặt', comment: false },
    { id: 'uncategorized', en: 'Uncategorized', vi: 'Chưa nhận xét', comment: false }
  ];

  var droppedArchive = [];
  var archivePurgePersist = false;
  var examsSeen = false;
  var staffBookSeen = false;
  var personnelSeen = false;
  var soaSeen = false;
  var tasksSeen = false;
  var activitySeen = false;
  var toastQueue = [];
  var toastPlaying = false;
  var SOA_TYPES = ['Interview', 'event', 'Lớp EB'];
  var POSITIONS = [
    { id: 'CM', name: 'Class Manager' },
    { id: 'EC', name: 'Educational Consultant' },
    { id: 'FET', name: 'Foreign English Teacher' },
    { id: 'BM', name: 'Branch Manager' },
    { id: 'BAM', name: 'Branch Administrative Manager' },
    { id: 'FBM', name: 'Floating Branch Manager' },
    { id: 'TTL', name: 'Training Team Leader' },
    { id: 'ATL', name: 'Administrative Team Leader' }
  ];

  var loading = false;
  var toastTimer = null;
  var lastDay = '';
  var dirHandle = null;
  var preview = { scale: 1, x: 0, y: 0, pointers: {}, lastDist: 0 };
  var localRaw = {};
  var savePaused = true;
  var bookEntered = false;
  var persistBook = false;
  var dataNote = 'Chưa đọc file data trên bản web.';
  var classNote = 'Chưa đọc file lớp, học viên và chuyên cần.';
  var remarkNote = 'Chưa đọc file nhận xét.';
  var remarksSavedAt = '';
  var lastRemarkBody = null;
  var syncShownAt = 0;
  var lastClassJson = null;
  var lastClassDiskBody = null;
  var classShareAt = '';
  var skinSwapTimer = null;
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
        'Ocean EDU - Student management list (Unofficial) ver 1.3.9',
        'Ocean EDU - Student management list (Unofficial) ver 1.4.0',
        'Ocean EDU - Student management list (Unofficial) ver 1.4.1',
        'Ocean EDU - Student management list (Unofficial) ver 1.4.2',
        'Ocean EDU - Student management list (Unofficial) ver 1.4.3',
        'Ocean EDU - Student management list (Unofficial) ver 1.4.4',
        'Ocean EDU - Student management list (Unofficial) ver 1.4.5 demo',
        'Ocean EDU - Student management list (Unofficial) ver 1.4.5v2',
        'Ocean EDU - Student management list (Unofficial) ver 1.4.6',
        'Ocean EDU - Student management list (Unofficial) ver 1.4.7',
        'Ocean EDU - Student management list (Unofficial) ver 1.4.8',
        'Ocean EDU - Student management list (Unofficial) ver 1.4.9',
        'Ocean EDU - Student management list (Unofficial) ver 1.5.0',
        'Ocean EDU - Student management list (Unofficial) ver 1.5.1',
        'Ocean EDU - Student management list (Unofficial) ver 1.5.2',
        'Ocean EDU - Student management list (Unofficial) ver 1.5.3',
        'Ocean EDU - Student management list (Unofficial) ver 1.5.4',
        'Ocean EDU - Student management list (Unofficial) ver 1.5.5',
        'Ocean EDU - Student management list (Unofficial) ver 1.5.6',
        'Ocean EDU - Student management list (Unofficial) ver 1.5.7',
        'Ocean EDU - Student management list (Unofficial) ver 1.5.8',
        'Ocean EDU - Student management list (Unofficial) ver 1.5.9'
      ];
      if (!state.settings.title || legacyTitle.indexOf(state.settings.title) >= 0) state.settings.title = APP_TITLE;
      delete state.settings.supabaseUrl;
      delete state.settings.supabaseKey;
      state.settings.scriptUrl = SUGGEST_URL;
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
        acc.remarkSeen = normalizeRemarkSeen(acc.remarkSeen);
      });
      state.accounts = state.accounts.filter(function (acc) { return acc && typeof acc === 'object' && acc.username; });
      if (!state.accounts.length) state.accounts = [defaultAccount()];
      state.archive = normalizeArchive(raw.archive);
      state.exams = normalizeExams(raw.exams);
      examsSeen = Array.isArray(raw.exams);
      state.staffBook = normalizeStaffBook(raw.staffBook);
      staffBookSeen = !!(raw.staffBook && typeof raw.staffBook === 'object' && !Array.isArray(raw.staffBook));
      state.personnel = normalizePersonnel(raw.personnel);
      personnelSeen = Array.isArray(raw.personnel);
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
      state.personnel = [];
      state.soaSlots = [];
      state.tasks = [];
      state.activity = [];
      droppedArchive = [];
      examsSeen = false;
      staffBookSeen = false;
      personnelSeen = false;
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
      if (cls.classCode != null) cls.classCode = String(cls.classCode).trim();
      if (!cls.codeHold) delete cls.codeHold;
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
        if (stu.phone2 != null) stu.phone2 = String(stu.phone2);
        if (stu.parentName != null) stu.parentName = String(stu.parentName);
        if (stu.photo != null) stu.photo = safePhotoName(stu.photo);
        if (stu.care) stu.care = normalizeCare(stu.care);
        if (Array.isArray(stu.remarks)) stu.remarks = normalizeRemarks(stu.remarks);
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
      var row = {
        id: item.id || L.uid(),
        code: item.code || '',
        name: item.name || '?',
        englishName: item.englishName || '',
        gender: item.gender || '',
        dob: item.dob || '',
        phone: item.phone || '',
        phone2: item.phone2 || '',
        parentName: item.parentName || '',
        photo: safePhotoName(item.photo || ''),
        care: item.care ? normalizeCare(item.care) : {},
        remarks: Array.isArray(item.remarks) ? normalizeRemarks(item.remarks) : [],
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
      if (item.curriculum && typeof item.curriculum === 'object' && !Array.isArray(item.curriculum) && Object.keys(item.curriculum).length) {
        row.curriculum = item.curriculum;
      }
      if (item.homework && typeof item.homework === 'object' && !Array.isArray(item.homework) && Object.keys(item.homework).length) {
        row.homework = item.homework;
      }
      if (item.bookStatus) row.bookStatus = String(item.bookStatus);
      if (item.pecMode) row.pecMode = String(item.pecMode);
      if (item.pecUser) row.pecUser = String(item.pecUser);
      if (item.pecPass) row.pecPass = String(item.pecPass);
      if (item.remarkAt) row.remarkAt = String(item.remarkAt);
      return row;
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
  var sharePersonnel = false;
  var shareSoa = false;
  var shareTasks = false;
  var shareActivity = false;

  function shareStamp(file) {
    var iso = file && file.settings && file.settings.savedAt
      ? file.settings.savedAt
      : (file && (file.shareAt || file.savedAt));
    var time = Date.parse(iso || '');
    return isNaN(time) ? 0 : time;
  }

  function absorbShare(file) {
    if (!file || typeof file !== 'object') return;
    var newer = shareStamp(file) > (Date.parse(state.settings.savedAt || '') || 0);
    if (Array.isArray(file.archive)) {
      var priorArchive = state.archive || [];
      state.archive = L.mergeById(priorArchive, file.archive, newer);
      syncArchiveRemarks(state.archive, priorArchive, file.archive);
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
    if (Array.isArray(file.personnel)) {
      state.personnel = normalizePersonnel(L.mergeById(state.personnel || [], file.personnel, newer));
      sharePersonnel = true;
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
    if (sharePersonnel) {
      state.personnel = normalizePersonnel(state.personnel);
      personnelSeen = true;
    }
    if (shareSoa) {
      state.soaSlots = normalizeSoa(state.soaSlots);
      if (state.soaSlots.length) soaSeen = true;
    }
  }

  function examTypeOf(value) {
    if (value === 'pick' || value === 'biannual' || value === 'class') return value;
    return 'class';
  }

  function examDayKey(value) {
    var text = String(value || '').slice(0, 10);
    return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : '';
  }

  function examSessionTags(entry) {
    var tags = {};
    var src = entry && entry.sessionTags;
    if (!src || typeof src !== 'object' || Array.isArray(src)) return tags;
    Object.keys(src).forEach(function (iso) {
      var day = examDayKey(iso);
      var tag = String(src[iso] || '').trim();
      if (day && tag) tags[day] = tag;
    });
    return tags;
  }

  function normalizeExams(list) {
    return (Array.isArray(list) ? list : []).filter(function (item) {
      return item && typeof item === 'object' && String(item.name || '').trim();
    }).map(function (item) {
      var type = examTypeOf(item.type);
      var exam = {
        id: item.id || L.uid(),
        name: String(item.name || '').trim(),
        type: type,
        ageFrom: item.ageFrom == null ? '' : String(item.ageFrom),
        ageTo: item.ageTo == null ? '' : String(item.ageTo),
        createdAt: item.createdAt || '',
        entries: (Array.isArray(item.entries) ? item.entries : []).filter(function (entry) {
          return entry && typeof entry === 'object';
        }).map(function (entry) {
          var row = {
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
              var pupil = {
                studentId: stu.studentId || '',
                name: stu.name || '',
                englishName: stu.englishName || '',
                code: stu.code || '',
                enroll: stu.enroll === 'trial' || stu.enroll === 'scholarship' ? stu.enroll : 'official',
                score: stu.score == null ? '' : String(stu.score),
                review: stu.review == null ? '' : String(stu.review),
                extra: !!stu.extra
              };
              if (stu.out === true) pupil.out = true;
              return pupil;
            })
          };
          var tags = examSessionTags(entry);
          if (Object.keys(tags).length) row.sessionTags = tags;
          return row;
        })
      };
      var quarter = String(item.quarter || '');
      if (quarter === 'I' || quarter === 'II' || quarter === 'III' || quarter === 'IV') exam.quarter = quarter;
      var rangeFrom = examDayKey(item.rangeFrom);
      var rangeTo = examDayKey(item.rangeTo);
      if (rangeFrom) exam.rangeFrom = rangeFrom;
      if (rangeTo) exam.rangeTo = rangeTo;
      return exam;
    });
  }

  function archiveForSave() {
    var archive = state.archive || [];
    if (!archivePurgePersist && droppedArchive.length) return archive.concat(droppedArchive);
    return archive;
  }

  var STUDENT_SHARE_KEYS = ['remarks', 'care', 'curriculum', 'homework', 'photo', 'bookStatus', 'pecMode', 'pecUser', 'pecPass'];

  function studentBagAbsent(value, key) {
    if (value == null || value === '') return true;
    if (key === 'homework' && value && typeof value === 'object' && !Array.isArray(value) && !Object.keys(value).length) return true;
    return false;
  }

  function studentBagPresent(value) {
    if (value == null || value === '') return false;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object') return Object.keys(value).length > 0;
    return true;
  }

  function remarkTime(value) {
    var time = Date.parse(value || '');
    return isNaN(time) ? 0 : time;
  }

  function remarkStamp(stu) {
    var stamp = remarkTime(stu && stu.remarkAt);
    remarkRowsOf(stu).forEach(function (item) {
      var time = remarkTime(item && item.at);
      if (time > stamp) stamp = time;
    });
    return stamp;
  }

  function remarkRowsOf(stu) {
    return Array.isArray(stu && stu.remarks) ? stu.remarks : [];
  }

  function newerRemark(a, b) {
    if (!a) return b;
    if (!b) return a;
    var left = remarkTime(a.at);
    var right = remarkTime(b.at);
    if (left !== right) return left > right ? a : b;
    return a;
  }

  function mergeRemarkRows(primary, secondary) {
    var byId = {};
    function take(item) {
      if (!item || !item.id) return;
      var id = String(item.id);
      byId[id] = byId[id] ? newerRemark(byId[id], item) : item;
    }
    (primary || []).forEach(take);
    (secondary || []).forEach(take);
    var bySession = {};
    var loose = [];
    Object.keys(byId).forEach(function (id) {
      var item = byId[id];
      var key = String(item.sessionKey || '');
      if (!key) { loose.push(item); return; }
      bySession[key] = bySession[key] ? newerRemark(bySession[key], item) : item;
    });
    var merged = loose.concat(Object.keys(bySession).map(function (key) { return bySession[key]; }));
    merged.sort(function (a, b) {
      var delta = remarkTime(a.at) - remarkTime(b.at);
      if (delta) return delta;
      return String(a.id).localeCompare(String(b.id));
    });
    return normalizeRemarks(merged);
  }

  function chooseRemarkSide(target, source, targetClass, sourceClass) {
    var targetStamp = remarkStamp(target);
    var sourceStamp = remarkStamp(source);
    if (targetStamp !== sourceStamp) return targetStamp > sourceStamp ? target : source;
    var targetRows = remarkRowsOf(target);
    var sourceRows = remarkRowsOf(source);
    var targetMarked = !!(target && target.remarkAt);
    var sourceMarked = !!(source && source.remarkAt);
    if (!targetRows.length && !sourceRows.length && !targetMarked && !sourceMarked) return target;
    if (targetStamp === 0 && sourceStamp === 0) {
      if (targetRows.length && !sourceRows.length) return target;
      if (sourceRows.length && !targetRows.length) return source;
    }
    var targetClassTime = remarkTime(targetClass && targetClass.updatedAt);
    var sourceClassTime = remarkTime(sourceClass && sourceClass.updatedAt);
    if (targetClassTime !== sourceClassTime) return targetClassTime > sourceClassTime ? target : source;
    if (!sourceRows.length) return target;
    if (!targetRows.length) return source;
    var merged = mergeRemarkRows(targetRows, sourceRows);
    if (JSON.stringify(normalizeRemarks(targetRows)) === JSON.stringify(merged)) return target;
    return merged;
  }

  function applyRemarkChoice(target, source, choice) {
    if (!target || !choice || choice === target) return;
    if (choice === source) {
      if (Array.isArray(source.remarks)) target.remarks = normalizeRemarks(source.remarks);
      else delete target.remarks;
      if (source.remarkAt) target.remarkAt = String(source.remarkAt);
      else delete target.remarkAt;
      return;
    }
    target.remarks = choice;
    var iso = '';
    var max = 0;
    choice.forEach(function (item) {
      var time = remarkTime(item && item.at);
      if (time >= max) { max = time; iso = item && item.at ? String(item.at) : iso; }
    });
    if (source && source.remarkAt && remarkTime(source.remarkAt) >= max) iso = String(source.remarkAt);
    if (target.remarkAt && remarkTime(target.remarkAt) > max) iso = String(target.remarkAt);
    if (iso) target.remarkAt = iso;
  }

  function syncStudentRemarks(target, source, targetClass, sourceClass) {
    if (!target || !source || target === source) return;
    applyRemarkChoice(target, source, chooseRemarkSide(target, source, targetClass, sourceClass));
  }

  function syncArchiveRemarks(merged, local, incoming) {
    var localBy = {};
    var incomingBy = {};
    (local || []).forEach(function (row) { if (row && row.id) localBy[String(row.id)] = row; });
    (incoming || []).forEach(function (row) { if (row && row.id) incomingBy[String(row.id)] = row; });
    (merged || []).forEach(function (row) {
      if (!row || !row.id) return;
      var left = localBy[String(row.id)];
      var right = incomingBy[String(row.id)];
      if (!left || !right) return;
      var other = row === left ? right : left;
      syncStudentRemarks(row, other, null, null);
    });
  }

  function remarkOmit(key, value) {
    if (key === 'remarks' || key === 'remarkAt') return undefined;
    return value;
  }

  function remarkEntryOf(stu) {
    if (!stu || !stu.id) return null;
    var remarks = Array.isArray(stu.remarks) ? normalizeRemarks(stu.remarks) : [];
    var remarkAt = stu.remarkAt ? String(stu.remarkAt) : '';
    if (!remarks.length && !remarkAt) return null;
    var row = { remarks: remarks };
    if (remarkAt) row.remarkAt = remarkAt;
    return row;
  }

  function remarkBookPayload() {
    var students = {};
    var archive = {};
    function put(stu, bag) {
      var row = remarkEntryOf(stu);
      if (row) bag[String(stu.id)] = row;
    }
    (state.classes || []).forEach(function (cls) {
      (cls.students || []).forEach(function (stu) { put(stu, students); });
    });
    (state.archive || []).forEach(function (stu) { put(stu, archive); });
    (droppedArchive || []).forEach(function (stu) {
      if (stu && stu.id && !archive[String(stu.id)]) put(stu, archive);
    });
    return {
      kind: 'ocean-edu-remarks',
      savedAt: remarksSavedAt || '',
      students: students,
      archive: archive
    };
  }

  function remarkBodyJson() {
    var book = remarkBookPayload();
    return JSON.stringify({ students: book.students, archive: book.archive });
  }

  function remarkMap(file, key) {
    var bag = file && file[key];
    if (!bag || typeof bag !== 'object' || Array.isArray(bag)) return null;
    return bag;
  }

  function applyRemarkBook(file) {
    if (!file || typeof file !== 'object' || file.kind !== 'ocean-edu-remarks') return;
    var students = remarkMap(file, 'students');
    var archive = remarkMap(file, 'archive');
    if (students) {
      (state.classes || []).forEach(function (cls) {
        (cls.students || []).forEach(function (stu) {
          if (!stu || !stu.id || !students[stu.id]) return;
          syncStudentRemarks(stu, students[stu.id], cls, cls);
        });
      });
    }
    if (archive) {
      (state.archive || []).forEach(function (row) {
        if (!row || !row.id || !archive[row.id]) return;
        syncStudentRemarks(row, archive[row.id], null, null);
      });
    }
    if (file.savedAt && remarkTime(file.savedAt) > remarkTime(remarksSavedAt)) remarksSavedAt = String(file.savedAt);
  }

  function adoptRaw(raw) {
    var carried = remarkBookPayload();
    localRaw = raw;
    applyRaw(raw);
    applyRemarkBook(carried);
  }

  function fillClassBags(kept, other) {
    if (!Array.isArray(kept) || !Array.isArray(other)) return;
    var classes = {};
    other.forEach(function (cls) {
      if (!cls || !cls.id) return;
      var students = {};
      (cls.students || []).forEach(function (stu) {
        if (stu && stu.id) students[stu.id] = stu;
      });
      classes[cls.id] = { cls: cls, students: students };
    });
    kept.forEach(function (cls) {
      var bag = classes[cls && cls.id];
      if (!bag) return;
      (cls.students || []).forEach(function (stu) {
        if (!stu || !stu.id || !bag.students[stu.id]) return;
        var from = bag.students[stu.id];
        STUDENT_SHARE_KEYS.forEach(function (key) {
          if (key === 'remarks') return;
          if (!studentBagAbsent(stu[key], key) || !studentBagPresent(from[key])) return;
          stu[key] = from[key];
          if (key === 'care' && stu.care) stu.care = normalizeCare(stu.care);
          if (key === 'photo') stu.photo = safePhotoName(stu.photo);
        });
        syncStudentRemarks(stu, from, cls, bag.cls);
      });
    });
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
        adoptRaw(stored);
        persistBook = true;
        dataNote = 'Đã lấy lại dữ liệu từ bộ nhớ trình duyệt trên máy này.';
      }
      return Promise.all([fetchBook(DATA_FILE), fetchBook(CLASS_FILE), fetchBook(REMARK_FILE)]).then(function (httpPair) {
        return folderBooks().then(function (diskPair) {
          return { http: httpPair, disk: diskPair };
        });
      });
    }).then(function (books) {
      var remote = books.http[0];
      var classFile = books.http[1];
      var remoteRemarks = books.http[2];
      var diskData = books.disk[0];
      var diskClasses = books.disk[1];
      var diskRemarks = books.disk[2];
      if (remote && shouldAdopt(localRaw, remote)) {
        adoptRaw(remote);
        persistBook = true;
        dataNote = 'Đã đọc ocean-edu-data.json. Tài khoản và thông báo lấy từ file này.';
      } else if (remote && bookScore(remote) > 0) {
        dataNote = 'Trình duyệt này đang giữ bản tài khoản hoặc thông báo mới hơn file ocean-edu-data.json.';
      } else if (bookScore(localRaw) <= 0) {
        dataNote = 'Không thấy ocean-edu-data.json cạnh index.html.';
      }
      if (diskData && shouldAdopt(localRaw, diskData)) {
        adoptRaw(diskData);
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
      applyRemarkBook(remoteRemarks);
      applyRemarkBook(diskRemarks);
      if ((remoteRemarks && remoteRemarks.kind === 'ocean-edu-remarks') || (diskRemarks && diskRemarks.kind === 'ocean-edu-remarks')) {
        remarkNote = 'Đã đọc ocean-edu-remarks.json. Thẻ nhận xét và nội dung nhận xét lấy từ file này.';
      }
      lastClassJson = JSON.stringify(state.classes, remarkOmit);
      lastClassDiskBody = classDiskBody();
      lastRemarkBody = remarkBodyJson();
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
    var incomingScore = classListScore(incoming);
    var currentScore = classListScore(state.classes);
    if (currentScore > 0 && incomingStamp < currentStamp) {
      fillClassBags(state.classes, incoming);
      if (!classAdopted) classNote = 'Máy này đang giữ lớp, học viên và chuyên cần mới hơn file ocean-edu-classes.json.';
      return;
    }
    if (currentScore > 0 && incomingStamp === currentStamp && incomingScore <= currentScore) {
      fillClassBags(state.classes, incoming);
      if (!classAdopted) classNote = 'Máy này đang giữ lớp, học viên và chuyên cần mới hơn file ocean-edu-classes.json.';
      return;
    }
    var sameStamp = currentScore > 0 && incomingStamp === currentStamp;
    fillClassBags(incoming, state.classes);
    state.classes = normalizeClasses(incoming);
    state.settings.classesSavedAt = file.savedAt || state.settings.classesSavedAt || '';
    persistBook = true;
    classAdopted = true;
    if (sameStamp) {
      classNote = 'Đã hoàn lại danh sách lớp từ ocean-edu-classes.json vì file này đủ hơn bản đang mở.';
      return;
    }
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
    if (personnelSeen || (state.personnel && state.personnel.length)) payload.personnel = state.personnel || [];
    if (soaSeen || (state.soaSlots && state.soaSlots.length)) payload.soaSlots = state.soaSlots || [];
    return payload;
  }

  function classDiskBody() {
    var body = {
      classes: state.classes,
      archive: archiveForSave()
    };
    if (examsSeen || (state.exams && state.exams.length)) body.exams = state.exams || [];
    if (staffBookSeen || staffBookHasData()) body.staffBook = state.staffBook || {};
    if (personnelSeen || (state.personnel && state.personnel.length)) body.personnel = state.personnel || [];
    if (soaSeen || (state.soaSlots && state.soaSlots.length)) body.soaSlots = state.soaSlots || [];
    return JSON.stringify(body, remarkOmit);
  }

  function classBookPayload() {
    var payload = {
      kind: 'ocean-edu-classes',
      savedAt: state.settings.classesSavedAt || '',
      classes: state.classes,
      archive: archiveForSave()
    };
    if (classShareAt) payload.shareAt = classShareAt;
    if (examsSeen || (state.exams && state.exams.length)) payload.exams = state.exams || [];
    if (staffBookSeen || staffBookHasData()) payload.staffBook = state.staffBook || {};
    if (personnelSeen || (state.personnel && state.personnel.length)) payload.personnel = state.personnel || [];
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
    if (!json || String(json).charAt(0) !== '{') return Promise.resolve(false);
    if (name === REMARK_FILE && String(json).indexOf('"ocean-edu-remarks"') < 0) return Promise.resolve(false);
    if ((name === CLASS_FILE || name === DATA_FILE) && String(json).indexOf('"classes"') < 0) return Promise.resolve(false);
    return dirHandle.getFileHandle(name, { create: true }).then(function (file) {
      return file.createWritable().then(function (stream) {
        return stream.write(json).then(function () { return stream.close(); }).then(function () { return true; });
      });
    }).catch(function () { return false; });
  }

  function writeDataFile() {
    return writeFrozenFiles(
      JSON.stringify(dataPayload(), remarkOmit),
      JSON.stringify(classBookPayload(), remarkOmit),
      JSON.stringify(remarkBookPayload())
    );
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
    return Promise.all([readHandleJson(DATA_FILE), readHandleJson(CLASS_FILE), readHandleJson(REMARK_FILE)]);
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
    syncTimer = null;
    box.classList.remove('hidden', 'is-saving', 'is-confirmed');
    var label = document.getElementById('sync-label');
    if (mode === 'saving') {
      syncShownAt = Date.now();
      box.classList.add('is-saving');
      if (label) label.textContent = 'Đang lưu';
      return;
    }
    if (mode === 'confirmed') {
      box.classList.add('is-confirmed');
      if (label) label.textContent = 'confirmed';
      syncTimer = setTimeout(function () { box.classList.add('hidden'); }, 2200);
      return;
    }
    if (label) label.textContent = '';
    box.classList.add('hidden');
  }

  var folderWrite = Promise.resolve();
  var folderSerial = 0;

  function writeFrozenFiles(dataJson, classFileJson, remarkFileJson) {
    return ensureFolderWrite().then(function (ok) {
      if (!ok) return false;
      var jobs = [writeNamedFile(DATA_FILE, dataJson)];
      if (classFileJson != null) jobs.push(writeNamedFile(CLASS_FILE, classFileJson));
      if (remarkFileJson != null) jobs.push(writeNamedFile(REMARK_FILE, remarkFileJson));
      return Promise.all(jobs).then(function (flags) {
        return flags.every(function (flag) { return !!flag; });
      });
    });
  }

  function classSignature(cls) {
    var copy = {};
    Object.keys(cls || {}).forEach(function (key) {
      if (key !== 'updatedAt') copy[key] = cls[key];
    });
    return JSON.stringify(copy, remarkOmit);
  }

  function stampClassUpdates() {
    if (lastClassJson === null) return;
    var previous = [];
    try { previous = JSON.parse(lastClassJson) || []; } catch (err) { return; }
    if (!Array.isArray(previous)) return;
    var prevById = {};
    previous.forEach(function (cls) {
      if (cls && cls.id) prevById[cls.id] = classSignature(cls);
    });
    var nowIso = new Date().toISOString();
    (state.classes || []).forEach(function (cls) {
      if (!cls || !cls.id) return;
      var before = prevById[cls.id];
      if (!before) {
        if (!cls.updatedAt) cls.updatedAt = nowIso;
        return;
      }
      if (classSignature(cls) !== before) cls.updatedAt = nowIso;
    });
  }

  function save(options) {
    if (savePaused) return true;
    var quiet = !!(options && options.quiet);
    var keepStamp = !!(options && options.keepStamp);
    if (!quiet && !keepStamp) archivePurgePersist = true;
    stampClassUpdates();
    var classJson = JSON.stringify(state.classes, remarkOmit);
    if (lastClassJson !== null && classJson !== lastClassJson) state.settings.classesSavedAt = new Date().toISOString();
    lastClassJson = classJson;
    var savedAtBefore = state.settings.savedAt || '';
    if (!keepStamp || !state.settings.savedAt) {
      state.settings.savedAt = new Date().toISOString();
      state.settings.rev = (Number(state.settings.rev) || 0) + 1;
    }
    var savedAtMoved = (state.settings.savedAt || '') !== savedAtBefore;
    var diskBody = classDiskBody();
    var classFileDirty = lastClassDiskBody === null || diskBody !== lastClassDiskBody;
    if (classFileDirty) classShareAt = state.settings.savedAt || new Date().toISOString();
    lastClassDiskBody = diskBody;
    var remarkBody = remarkBodyJson();
    var remarkDirty = lastRemarkBody === null || remarkBody !== lastRemarkBody;
    if (remarkDirty) remarksSavedAt = new Date().toISOString();
    lastRemarkBody = remarkBodyJson();
    var dataJson = JSON.stringify(dataPayload());
    var folderData = JSON.stringify(dataPayload(), remarkOmit);
    var classFileJson = classFileDirty ? JSON.stringify(classBookPayload(), remarkOmit) : null;
    var remarkFileJson = remarkDirty ? JSON.stringify(remarkBookPayload()) : null;
    var snapshot = JSON.parse(dataJson);
    localRaw = snapshot;
    var stored = true;
    try {
      localStorage.setItem(STORAGE, dataJson);
    } catch (err) {
      stored = false;
      toast('Không đủ chỗ lưu trên trình duyệt. Vẫn thử ghi file JSON trong thư mục Index local.');
    }
    openLocalDb().then(function (db) {
      var tx = db.transaction('kv', 'readwrite');
      tx.objectStore('kv').put(JSON.parse(dataJson), 'state');
    }).catch(function () {});
    var folderNew = savedAtMoved || classFileDirty || remarkDirty;
    var serial = ++folderSerial;
    if (folderNew) showSync('saving');
    folderWrite = folderWrite.catch(function () { return false; }).then(function () {
      if (serial !== folderSerial) return false;
      return writeFrozenFiles(folderData, classFileJson, remarkFileJson);
    }).then(function (ok) {
      if (serial !== folderSerial || !folderNew) return;
      var wait = 450 - (Date.now() - syncShownAt);
      if (wait < 0) wait = 0;
      clearTimeout(syncTimer);
      syncTimer = setTimeout(function () {
        if (serial !== folderSerial) return;
        if (ok) { showSync('confirmed'); return; }
        showSync('idle');
        if (quiet || !stored || syncWarned) return;
        syncWarned = true;
        toast('Đã lưu trên trình duyệt. Chưa ghi được file JSON trong thư mục. Hãy chọn thư mục Index local một lần để lần sau ghi thẳng và hiện confirmed.');
      }, wait);
    }).catch(function () {
      if (serial !== folderSerial || !folderNew || quiet) return;
      showSync('idle');
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

  function fileExportButtons(act) {
    if (!canExportClasses()) return '';
    return '<div class="btn-row">' +
      '<button type="button" class="btn" data-act="' + act + '" data-kind="xlsx">Excel</button>' +
      '<button type="button" class="btn" data-act="' + act + '" data-kind="pdf">PDF</button>' +
      '<button type="button" class="btn" data-act="' + act + '" data-kind="img">Ảnh</button>' +
      '<button type="button" class="btn" data-act="' + act + '" data-kind="jpg">JPG</button>' +
      '<button type="button" class="btn" data-act="' + act + '" data-kind="print">Print (in)</button>' +
      '</div>';
  }

  function codeTakenNotice(code, exceptId) {
    var holder = L.findCodeHolder(state.classes, code, exceptId, state.archive);
    var who = holder ? L.holderText(holder) : '';
    if (!who) return 'Mã học viên đã tồn tại.';
    return 'Mã học viên đã tồn tại. Mã này của ' + who + '.';
  }
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
    var next = SKIN_IDS.indexOf(skin) >= 0 ? skin : 'default';
    ui.skinPeek = next;
    rememberLook({ skin: next, iface: SKIN_IFACE[next] || 'classic' });
    paintAppearance();
    pinBars();
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

  function skinAlias(skin) {
    if (skin === 'minimal') return 'goth';
    return skin || '';
  }

  function normalizeAppearance(raw) {
    var look = raw && typeof raw === 'object' ? raw : {};
    var named = skinAlias(look.skin);
    var skin = SKIN_IDS.indexOf(named) >= 0 ? named : 'default';
    var theme = look.theme === 'night' ? 'night' : 'day';
    var primary = PRIMARY_IDS.indexOf(look.primary) >= 0 ? look.primary : '';
    var iface = SKIN_IFACE[skin] || 'classic';
    return { skin: skin, theme: theme, primary: primary, iface: iface };
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
        if (!other.remarkSeen && acc.remarkSeen) other.remarkSeen = acc.remarkSeen;
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
    var named = skinAlias(look && look.skin);
    if (SKIN_IDS.indexOf(named) >= 0) return named;
    return 'default';
  }

  function applyAccountLook() {
    var acc = currentAccount();
    var root = document.documentElement;
    var skin = skinOf(acc);
    var prevSkin = root.getAttribute('data-skin');
    root.setAttribute('data-skin', skin);
    root.setAttribute('data-iface', ifaceOf(acc));
    if (prevSkin && prevSkin !== skin) {
      var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reduceMotion) {
        root.classList.remove('is-skin-swap');
        void root.offsetWidth;
        root.classList.add('is-skin-swap');
        clearTimeout(skinSwapTimer);
        skinSwapTimer = setTimeout(function () { root.classList.remove('is-skin-swap'); }, 360);
      }
    }
    root.setAttribute('data-theme', 'day');
    root.setAttribute('data-primary', 'ocean');
    document.querySelectorAll('[data-skin-btn]').forEach(function (btn) {
      var on = btn.getAttribute('data-skin') === skin;
      btn.classList.toggle('is-on', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    paintSkinDesk();
    paintIface();
  }

  function ifaceOf(acc) {
    return SKIN_IFACE[skinOf(acc)] || 'classic';
  }

  function paintIface() {
    var root = document.getElementById('iface-row');
    if (!root) return;
    var current = ifaceOf(currentAccount());
    root.innerHTML = IFACES.map(function (item) {
      var on = item.id === current;
      return '<button type="button" class="skin-pick' + (on ? ' is-on' : '') + '" data-act="set-iface" data-iface="' + item.id + '" aria-pressed="' + (on ? 'true' : 'false') + '">' + esc(item.name) + '</button>';
    }).join('');
  }

  function applyIface(id) {
    if (!ui.user) { toast('Đăng nhập để giữ khung cho tài khoản này.'); return; }
    var next = IFACE_IDS.indexOf(id) >= 0 ? id : 'classic';
    rememberLook({ iface: next });
    paintAppearance();
    pinBars();
    save();
  }

  function skinRecord(id) {
    var found = null;
    SKIN_BOOK.forEach(function (group) {
      group.items.forEach(function (item) {
        if (item.id === id) found = { group: group, item: item };
      });
    });
    return found;
  }

  function paintSkinDesk() {
    var root = document.getElementById('skin-groups');
    if (!root) return;
    var current = skinOf(currentAccount());
    var peek = ui.skinPeek || current;
    root.innerHTML = SKIN_BOOK.map(function (group) {
      var open = ui.skinFold === group.id;
      var look = group.items[0];
      group.items.forEach(function (item) {
        if (item.id === current) look = item;
      });
      group.items.forEach(function (item) {
        if (item.id === peek) look = item;
      });
      var buttons = group.items.map(function (item) {
        var on = item.id === current;
        return '<button type="button" class="skin-pick' + (on ? ' is-on' : '') + '" data-act="set-skin" data-skin="' + item.id + '" data-skin-btn aria-pressed="' + (on ? 'true' : 'false') + '">' + esc(item.name) + '</button>';
      }).join('');
      return '<section class="skin-fold' + (open ? ' is-open' : '') + '">' +
        '<button type="button" class="skin-fold-btn" data-act="skin-fold" data-group="' + group.id + '" aria-expanded="' + (open ? 'true' : 'false') + '">' + esc(group.title) + '</button>' +
        (open
          ? '<div class="skin-fold-body"><p class="help">' + esc(group.lead) + '</p>' +
            '<div class="skin-stage" data-look="' + look.id + '">' +
            '<div class="skin-stage-bar"><span>Ocean EDU</span><b></b></div>' +
            '<div class="skin-stage-card"><strong>Khung cố định</strong><em>Menu chính</em></div>' +
            '<span class="skin-stage-pill">Mở</span></div>' +
            '<p class="skin-stage-copy">' + esc(look.text) + '</p>' +
            '<div class="skin-grid">' + buttons + '</div></div>'
          : '') +
        '</section>';
    }).join('');
  }

  function peekSkin(id) {
    if (!id || SKIN_IDS.indexOf(id) < 0 || ui.skinPeek === id) return;
    var rec = skinRecord(id);
    if (!rec || rec.group.id !== ui.skinFold) return;
    ui.skinPeek = id;
    var stage = document.querySelector('#skin-groups .skin-fold.is-open .skin-stage');
    var copy = document.querySelector('#skin-groups .skin-fold.is-open .skin-stage-copy');
    if (stage) stage.setAttribute('data-look', id);
    if (copy) copy.textContent = rec.item.text;
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

  function houseSvg() {
    return '<svg class="home-icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" shape-rendering="crispEdges">' +
      '<path fill="currentColor" d="M2 7L8 2l6 5v7H10v-4H6v4H2z"/>' +
      '</svg>';
  }

  function homeButton() {
    return '<button type="button" class="btn home-btn" data-act="nav" data-screen="menu" aria-label="home">' +
      houseSvg() + '<span>home</span></button>';
  }

  function penSvg() {
    return '<svg class="pen-icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">' +
      '<path fill="currentColor" d="M2 12.5l.6 1.5h2.2l.4-1.5zM11.2 1.4l3.4 3.4-8 8-2.6.4.4-2.6z"/>' +
      '</svg>';
  }

  function toolButtons() {
    return '<div class="tool-row">' + clockButton() +
      '<button type="button" class="icon-btn" data-act="open-settings" aria-label="Cài đặt">' + gearSvg() + '</button>' +
      (ui.user ? '<button type="button" class="btn" data-act="logout">Đăng xuất</button>' : '') +
      '</div>';
  }

  function readLoginMemory() {
    try {
      var raw = JSON.parse(localStorage.getItem(LOGIN_KEY) || 'null');
      if (!raw || typeof raw !== 'object' || Array.isArray(raw) || !raw.username) return null;
      return { username: String(raw.username), password: raw.password == null ? '' : String(raw.password) };
    } catch (err) {
      return null;
    }
  }

  function writeLoginMemory(username, password) {
    try {
      localStorage.setItem(LOGIN_KEY, JSON.stringify({
        username: String(username || ''),
        password: password == null ? '' : String(password)
      }));
    } catch (err) {}
  }

  function clearLoginMemory() {
    try { localStorage.removeItem(LOGIN_KEY); } catch (err) {}
  }

  function viewLogin() {
    var memory = readLoginMemory();
    return '<div class="wrap">' +
      '<div class="login-tools">' + toolButtons() + '</div>' +
      '<div class="brand"><img class="logo-bob" src="Token.png" alt="Ocean EDU">' +
      '<h1 data-app-title>' + esc(state.settings.title) + '</h1>' +
      '<p class="sub">Sổ quản lý lớp và học viên</p></div>' +
      boardHtml() +
      '<form class="login-card' + (ui.loginError ? ' shake' : '') + '" id="login-form">' +
      '<h2>Đăng nhập nhân sự</h2>' +
      '<label class="field"><span>Username</span><input name="username" autocomplete="username" required value="' + esc(memory ? memory.username : '') + '"></label>' +
      '<label class="field"><span>Mật khẩu</span><input name="password" type="password" autocomplete="current-password" value="' + esc(memory ? memory.password : '') + '"></label>' +
      '<label class="checkline"><input type="checkbox" name="remember" id="login-remember"' + (memory ? ' checked' : '') + '> Ghi nhớ mật khẩu trên thiết bị</label>' +
      '<p class="help">Admin và Commenter nhập mật khẩu. Guest chỉ điền Username và để trống mật khẩu. Ghi nhớ mật khẩu chỉ lưu trên thiết bị này, không ghi vào file lớp.</p>' +
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
      '<button type="button" class="btn btn-danger" data-act="request-update">Cập nhật sổ tay</button></div>';
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

  function safePhotoName(value) {
    var name = String(value || '').replace(/\\/g, '/').split('/').pop().replace(/[^a-zA-Z0-9._-]/g, '');
    if (!/^[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp|gif)$/i.test(name)) return '';
    return name;
  }

  function normalizeRemarkSeen(raw) {
    var out = {};
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return out;
    Object.keys(raw).forEach(function (id) {
      if (id) out[String(id)] = true;
    });
    return out;
  }

  function normalizeCare(raw) {
    var out = {};
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return out;
    Object.keys(raw).forEach(function (month) {
      if (!/^\d{4}-\d{2}$/.test(month) || !raw[month] || typeof raw[month] !== 'object') return;
      var weeks = {};
      Object.keys(raw[month]).forEach(function (iso) {
        var cell = raw[month][iso];
        if (!/^\d{4}-\d{2}-\d{2}$/.test(iso) || !cell || !CARE_STATUS[cell.status] || cell.status === 'none') return;
        weeks[iso] = { status: cell.status, note: String(cell.note || ''), at: cell.at || '' };
      });
      if (Object.keys(weeks).length) out[month] = weeks;
    });
    return out;
  }

  function remarkTagInfo(id) {
    var key = String(id || '');
    for (var i = 0; i < REMARK_TAGS.length; i++) {
      if (REMARK_TAGS[i].id === key) return REMARK_TAGS[i];
    }
    return null;
  }

  function normalizeRemarks(list) {
    var keepTag = { finished: 1, redo: 1, issue: 1, incomplete: 1, absent: 1 };
    return (Array.isArray(list) ? list : []).filter(function (item) {
      if (!item || !item.id) return false;
      var text = String(item.text || '').trim();
      return !!(text || keepTag[item.tag]);
    }).map(function (item) {
      var text = String(item.text || '');
      var row = {
        id: String(item.id),
        sessionKey: String(item.sessionKey || ''),
        sessionLabel: String(item.sessionLabel || ''),
        text: text,
        at: item.at || '',
        by: String(item.by || '')
      };
      if (keepTag[item.tag]) row.tag = item.tag;
      return row;
    });
  }

  function monthWeeks(month) {
    var key = /^\d{4}-\d{2}$/.test(month || '') ? month : L.monthKey(new Date());
    var range = L.monthRange(key);
    if (!range || isNaN(range.start.getTime())) return [];
    var last = L.addDays(range.end, -1);
    var cursor = L.weekMonday(range.start);
    var end = L.weekMonday(last);
    var weeks = [];
    var guard = 0;
    while (cursor.getTime() <= end.getTime() && guard++ < 8) {
      weeks.push({ n: weeks.length + 1, monday: new Date(cursor.getTime()), iso: L.isoDay(cursor), label: 'Tuần ' + (weeks.length + 1) });
      cursor = L.addDays(cursor, 7);
    }
    return weeks;
  }

  function careCellOf(stu, month, iso) {
    var care = stu && stu.care;
    var bag = care && care[month];
    var cell = bag && bag[iso];
    if (!cell || !CARE_STATUS[cell.status] || cell.status === 'none') return null;
    return { status: cell.status, note: String(cell.note || ''), at: cell.at || '' };
  }

  function careScore(stu, month) {
    var sum = 0;
    monthWeeks(month).forEach(function (week) {
      var cell = careCellOf(stu, month, week.iso);
      if (cell) sum += CARE_STATUS[cell.status].pct;
    });
    return sum;
  }

  function careRank(sum) {
    var score = Number(sum) || 0;
    for (var i = 0; i < CARE_RANKS.length; i++) {
      if (score >= CARE_RANKS[i].min && score <= CARE_RANKS[i].max) return CARE_RANKS[i];
    }
    return CARE_RANKS[CARE_RANKS.length - 1];
  }

  function writeCareCell(stu, month, iso, status, note) {
    if (!stu.care || typeof stu.care !== 'object' || Array.isArray(stu.care)) stu.care = {};
    if (!stu.care[month] || typeof stu.care[month] !== 'object') stu.care[month] = {};
    if (!status || status === 'none') {
      delete stu.care[month][iso];
      if (!Object.keys(stu.care[month]).length) delete stu.care[month];
      if (!Object.keys(stu.care).length) delete stu.care;
      return;
    }
    stu.care[month][iso] = { status: status, note: note || '', at: new Date().toISOString() };
  }

  function heldClasses() {
    return (state.classes || []).filter(function (cls) { return cls && cls.codeHold; });
  }

  function viewCodeGate() {
    var rows = heldClasses();
    if (!canEdit()) {
      return shell('<h2>Cập nhật mã lớp</h2><p class="help">Các lớp vừa lên trình độ cần admin cập nhật mã lớp trước khi vào sổ tay. Lịch đã xếp giữ nguyên.</p><ul class="history-list">' +
        rows.map(function (cls) { return '<li>' + esc(L.currentName(cls)) + '</li>'; }).join('') + '</ul>');
    }
    return shell('<h2>Cập nhật mã lớp</h2><p class="help">Lớp vừa lên trình độ. Nhập mã lớp mới trước khi vào sổ tay. Lịch đã xếp giữ nguyên.</p>' +
      rows.map(function (cls) {
        return '<label class="field"><span>' + esc(L.currentName(cls)) + (cls.classCode ? ' · mã hiện tại ' + esc(cls.classCode) : '') + '</span>' +
          '<input data-code-for="' + esc(cls.id) + '" maxlength="40" placeholder="Mã lớp mới" autocomplete="off"></label>';
      }).join('') +
      '<div class="btn-row"><button type="button" class="btn btn-primary" data-act="code-save">Cập nhật mã lớp</button></div>');
  }

  function saveCodeGate() {
    if (deny(canEdit())) return;
    var rows = heldClasses();
    var next = {};
    var bad = '';
    rows.forEach(function (cls) {
      var input = document.querySelector('[data-code-for="' + cls.id + '"]');
      var code = input ? String(input.value || '').trim() : '';
      if (!code) bad = 'Điền mã lớp cho ' + L.currentName(cls) + '.';
      else if (cls.classCode && code === String(cls.classCode).trim()) bad = 'Mã lớp của ' + L.currentName(cls) + ' cần khác mã đang có.';
      next[cls.id] = code;
    });
    if (bad) { toast(bad); return; }
    rows.forEach(function (cls) {
      cls.classCode = next[cls.id];
      cls.codeHold = false;
    });
    save();
    toast('Đã cập nhật mã lớp. Lịch học giữ nguyên.');
    ui.screen = 'menu';
    render();
  }

  function profileSubject(id) {
    var found = findStudent(id);
    if (found) return { stu: found.stu, cls: found.cls, archived: false };
    var row = null;
    (state.archive || []).forEach(function (item) { if (item && item.id === id) row = item; });
    if (!row) return null;
    return { stu: row, cls: findClass(row.lastClassId), archived: true };
  }

  function photoTag(stu) {
    var file = stu && stu.photo ? safePhotoName(stu.photo) : '';
    var pending = ui.photoPending && ui.photoPending.id === (stu && stu.id) ? ui.photoPending : null;
    var src = pending ? pending.url : (file ? (PHOTO_DIR + '/' + encodeURIComponent(file)) : '');
    if (!src) return '<span class="stu-photo stu-photo-empty">Chưa có ảnh</span>';
    return '<img class="stu-photo" data-photo="' + esc(file) + '" src="' + esc(src) + '" alt="Ảnh học viên">';
  }

  function storePhotoBlob(filename, blob) {
    var idb = openLocalDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction('kv', 'readwrite');
        tx.objectStore('kv').put(blob, 'photo:' + filename);
        tx.oncomplete = function () { resolve(true); };
        tx.onerror = function () { reject(tx.error); };
      });
    }).catch(function () { return false; });
    var disk = ensureFolderWrite().then(function (ok) {
      if (!ok || !dirHandle || !dirHandle.getDirectoryHandle) return false;
      return dirHandle.getDirectoryHandle(PHOTO_DIR, { create: true }).then(function (dir) {
        return dir.getFileHandle(filename, { create: true });
      }).then(function (file) {
        return file.createWritable();
      }).then(function (stream) {
        return stream.write(blob).then(function () { return stream.close(); }).then(function () { return true; });
      });
    }).catch(function () { return false; });
    return Promise.all([idb, disk]).then(function (flags) { return { idb: !!flags[0], disk: !!flags[1] }; });
  }

  function hydratePhotos() {
    document.querySelectorAll('[data-photo]').forEach(function (img) {
      var file = img.getAttribute('data-photo');
      if (!file) return;
      if (ui.photoUrls[file]) { img.src = ui.photoUrls[file]; return; }
      openLocalDb().then(function (db) {
        return new Promise(function (resolve) {
          var req = db.transaction('kv', 'readonly').objectStore('kv').get('photo:' + file);
          req.onsuccess = function () { resolve(req.result || null); };
          req.onerror = function () { resolve(null); };
        });
      }).then(function (blob) {
        if (!blob || typeof blob !== 'object') return;
        var url = URL.createObjectURL(blob);
        ui.photoUrls[file] = url;
        document.querySelectorAll('[data-photo]').forEach(function (el) {
          if (el.getAttribute('data-photo') === file) el.src = url;
        });
      }).catch(function () {});
    });
  }

  function bindPhotoZoom() {
    document.querySelectorAll('.stu-photo').forEach(function (img) {
      if (!img || img.dataset.zoomBound || img.tagName !== 'IMG') return;
      img.dataset.zoomBound = '1';
      function on() { img.classList.add('is-zoom'); }
      function off() { img.classList.remove('is-zoom'); }
      img.addEventListener('pointerdown', on);
      img.addEventListener('pointerup', off);
      img.addEventListener('pointerleave', off);
      img.addEventListener('pointercancel', off);
    });
    var drop = document.getElementById('photo-drop');
    if (!drop || drop.dataset.bound) return;
    drop.dataset.bound = '1';
    drop.addEventListener('dragover', function (e) { e.preventDefault(); drop.classList.add('is-over'); });
    drop.addEventListener('dragleave', function () { drop.classList.remove('is-over'); });
    drop.addEventListener('drop', function (e) {
      e.preventDefault();
      drop.classList.remove('is-over');
      var file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if (file) takePhotoFile(file);
    });
  }

  function photoExt(type) {
    if (type === 'image/png') return 'png';
    if (type === 'image/webp') return 'webp';
    if (type === 'image/gif') return 'gif';
    return 'jpg';
  }

  function takePhotoFile(file) {
    if (!file || String(file.type || '').indexOf('image/') !== 0) { toast('Chọn một file ảnh.'); return; }
    var stuId = ui.profileId;
    if (!stuId) return;
    var filename = String(stuId).replace(/[^a-zA-Z0-9_-]/g, '') + '.' + photoExt(file.type);
    if (ui.photoPending && ui.photoPending.url) URL.revokeObjectURL(ui.photoPending.url);
    ui.photoPending = { id: stuId, filename: filename, blob: file, url: URL.createObjectURL(file) };
    render();
  }

  function pullPhotoLink() {
    var input = document.getElementById('photo-url');
    var url = input ? String(input.value || '').trim() : '';
    if (!/^https?:\/\//i.test(url)) { toast('Dán link ảnh bắt đầu bằng http hoặc https.'); return; }
    fetch(url).then(function (res) {
      if (!res.ok) throw new Error('status');
      var type = res.headers.get('content-type') || '';
      if (type.indexOf('image/') !== 0) throw new Error('type');
      return res.blob();
    }).then(function (blob) {
      blob = new Blob([blob], { type: blob.type || 'image/jpeg' });
      takePhotoFile(blob);
    }).catch(function () {
      toast('Không lấy được ảnh từ link. Hãy kéo file hoặc chọn từ thư mục.');
    });
  }

  function boughtBookLines(stu, cls) {
    var lines = [];
    var levels = cls && Array.isArray(cls.levelHistory) && cls.levelHistory.length ? cls.levelHistory : (cls ? [L.currentLevel(cls)] : []);
    levels.forEach(function (level) {
      if (!level) return;
      var rec = L.bookOf(stu, level);
      var catalog = L.classLevelBooks(cls, level);
      catalog.forEach(function (book, index) {
        var item = rec.books && rec.books[index] ? rec.books[index] : { status: 'not-bought' };
        if (item.status !== 'issued-paid' && item.status !== 'issued-unpaid') return;
        lines.push((level.name || L.currentName(cls)) + ' · ' + book.name + ' · ' + (item.status === 'issued-paid' ? 'Đã mua và nhận' : 'Đã nhận, chưa thanh toán'));
      });
    });
    return lines;
  }

  function attendanceLines(stu, cls, month) {
    if (!cls || !stu) return [];
    var board = L.homeworkBoard(cls, state.classes, month);
    var row = null;
    board.students.forEach(function (item) { if (item.id === stu.id) row = item; });
    if (!row) return [];
    return board.sessions.map(function (ses, index) {
      var cell = row.cells[index];
      var mark = cell && cell.status && L.HW_STATUS[cell.status] ? L.HW_STATUS[cell.status].label : (cell && cell.mode === 'here' ? 'Chưa điểm danh' : '—');
      return L.formatDMY(ses.date) + ' · ' + L.formatTimeValue(ses.start) + '–' + L.formatTimeValue(ses.end) + ' · ' + mark;
    });
  }

  function remarkLines(stu, month) {
    return (stu && stu.remarks || []).filter(function (item) {
      return item && (String(item.sessionKey || '').indexOf(month) === 0 || String(item.at || '').indexOf(month) === 0);
    });
  }

  function careLines(stu, month) {
    var lines = [];
    monthWeeks(month).forEach(function (week) {
      var cell = careCellOf(stu, month, week.iso);
      if (!cell) return;
      var spec = CARE_STATUS[cell.status];
      lines.push(week.label + ' · ' + spec.label + ' · +' + spec.pct + '%' + (cell.note ? ' · ' + cell.note : ''));
    });
    return lines;
  }

  function viewProfile() {
    var subject = profileSubject(ui.profileId);
    if (!subject) { ui.screen = 'archive'; ui.archiveFolder = ''; return viewArchive(); }
    var stu = subject.stu;
    var cls = subject.cls;
    var month = /^\d{4}-\d{2}$/.test(ui.profileMonth || '') ? ui.profileMonth : L.monthKey(new Date());
    ui.profileMonth = month;
    var books = boughtBookLines(stu, cls);
    var attend = attendanceLines(stu, cls, month);
    var remarks = remarkLines(stu, month);
    var cares = careLines(stu, month);
    var edit = ui.profileEdit && canEdit();
    var identity = edit
      ? '<label class="field"><span>Tên học viên</span><input id="p-name" value="' + esc(stu.name || '') + '"></label>' +
        '<label class="field"><span>English name</span><input id="p-english" value="' + esc(stu.englishName || '') + '"></label>' +
        '<label class="field"><span>Mã học viên</span><input id="p-code" value="' + esc(stu.code || '') + '"></label>' +
        '<label class="field"><span>Số điện thoại 1</span><input id="p-phone" value="' + esc(stu.phone || '') + '"></label>' +
        '<label class="field"><span>Số điện thoại 2</span><input id="p-phone-2" value="' + esc(stu.phone2 || '') + '"></label>' +
        '<label class="field"><span>Tên phụ huynh</span><input id="p-parent" value="' + esc(stu.parentName || '') + '"></label>' +
        '<div class="photo-tools"><label class="field"><span>Chọn ảnh từ thư mục</span><input id="photo-file" type="file" accept="image/*"></label>' +
        '<label class="field"><span>Dán link ảnh</span><input id="photo-url" placeholder="https://"></label>' +
        '<button type="button" class="btn" data-act="photo-url">Lấy ảnh từ link</button></div>'
      : '<p><b>Tên học viên:</b> ' + esc(showText(stu.name)) + '</p>' +
        '<p><b>English name:</b> ' + esc(showText(stu.englishName)) + '</p>' +
        '<p><b>Mã học viên:</b> ' + esc(showText(stu.code)) + '</p>' +
        '<p><b>Số điện thoại 1:</b> ' + esc(stu.phone || '—') + '</p>' +
        '<p><b>Số điện thoại 2:</b> ' + esc(stu.phone2 || '—') + '</p>' +
        '<p><b>Tên phụ huynh:</b> ' + esc(stu.parentName || '—') + '</p>';
    function lines(list, empty) {
      return list.length ? '<ul class="history-list">' + list.map(function (line) { return '<li>' + esc(line) + '</li>'; }).join('') + '</ul>' : '<p class="muted">' + empty + '</p>';
    }
    var remarkHtml = remarks.length ? '<ul class="history-list">' + remarks.map(function (item) {
      var tag = remarkTagInfo(item.tag);
      var tagText = tag ? esc(tag.en + ' · ' + tag.vi) + (item.text ? ' · ' : '') : '';
      var body = remarkToEditorHtml(item.text);
      return '<li><strong>' + esc(item.sessionLabel || item.sessionKey) + ':</strong> ' + tagText +
        (body ? '<div class="remark-detail">' + body + '</div>' : '') + '</li>';
    }).join('') + '</ul>' : '<p class="muted">Chưa có nhận xét trong tháng này.</p>';
    return shell('<div class="section-head"><div><span class="nav-pair"><button type="button" class="btn" data-act="profile-back">← Thư viện</button>' + homeButton() + '</span>' +
      '<h2>Hồ sơ học viên</h2></div>' +
      (canEdit() ? '<div class="btn-row">' + (edit ? '<button type="button" class="btn btn-primary" data-act="profile-save">Lưu hồ sơ</button><button type="button" class="btn" data-act="profile-cancel">Hủy</button>' : '<button type="button" class="btn btn-primary" data-act="profile-edit">Sửa</button>') + '</div>' : '') +
      '</div><div class="profile-layout"><div id="photo-drop" class="photo-drop">' + photoTag(stu) +
      '<p class="help">Kéo hoặc chạm giữ ảnh để xem ở kích cỡ 200%. Kéo file vào đây, dán link, hoặc chọn từ thư mục. Ảnh được giữ trong thư mục student-photos.</p></div><div>' +
      identity + '</div></div>' +
      '<section class="profile-window"><h3>Giáo trình đã mua và nhận</h3>' + lines(books, 'Chưa có giáo trình đã nhận.') + '</section>' +
      '<label class="field dash-month"><span>Tháng</span><input id="profile-month" type="month" value="' + esc(month) + '"></label>' +
      '<section class="profile-window"><h3>Chuyên cần theo buổi</h3>' + lines(attend, 'Chưa có dữ liệu chuyên cần trong tháng này.') + '</section>' +
      '<section class="profile-window"><h3>Nhận xét theo buổi</h3>' + remarkHtml + '</section>' +
      '<section class="profile-window"><h3>Tương tác trong tháng</h3>' + lines(cares, 'Chưa có tương tác khác None trong tháng này.') + '</section>');
  }

  function saveProfile() {
    if (deny(canEdit())) return;
    var subject = profileSubject(ui.profileId);
    if (!subject) return;
    var stu = subject.stu;
    var name = document.getElementById('p-name');
    var code = document.getElementById('p-code');
    var nextName = name ? name.value.trim() : stu.name;
    var nextCode = code ? code.value.trim() : stu.code;
    if (!nextName || !nextCode) { toast('Cần tên và mã học viên.'); return; }
    if (L.codeTaken(state.classes, nextCode, stu.id, state.archive)) { toast(codeTakenNotice(nextCode, stu.id)); return; }
    stu.name = nextName;
    stu.code = nextCode;
    stu.englishName = (document.getElementById('p-english').value || '').trim();
    stu.phone = (document.getElementById('p-phone').value || '').trim();
    stu.phone2 = (document.getElementById('p-phone-2').value || '').trim();
    stu.parentName = (document.getElementById('p-parent').value || '').trim();
    var pending = ui.photoPending && ui.photoPending.id === stu.id ? ui.photoPending : null;
    ui.profileEdit = false;
    function finish(message) {
      ui.photoPending = null;
      save();
      toast(message);
      render();
    }
    if (!pending) { finish('Đã lưu hồ sơ học viên.'); return; }
    storePhotoBlob(pending.filename, pending.blob).then(function (result) {
      stu.photo = pending.filename;
      if (pending.url) URL.revokeObjectURL(pending.url);
      finish(result.disk ? 'Đã lưu hồ sơ và ảnh trong thư mục student-photos.' : 'Đã lưu hồ sơ. Ảnh nằm trên trình duyệt cho đến khi cấp quyền thư mục Index local.');
    });
  }

  function careMonthKey() {
    return /^\d{4}-\d{2}$/.test(ui.careMonth || '') ? ui.careMonth : L.monthKey(new Date());
  }

  function careCellButton(stu, month, week) {
    var cell = careCellOf(stu, month, week.iso);
    var status = cell ? cell.status : 'none';
    var spec = CARE_STATUS[status];
    var note = cell && cell.note ? cell.note : spec.tip;
    var bang = status === 'urgent' ? '<span class="care-bang" aria-hidden="true">!</span>' : '';
    return '<button type="button" class="care-cell care-' + status + '" data-act="care-open" data-id="' + esc(stu.id) + '" data-week="' + esc(week.iso) + '" data-label="' + esc(week.label) + '">' +
      esc(spec.label) + bang +
      '<span class="care-tip"><b>' + esc(spec.label) + '</b><span>+' + spec.pct + '%</span><span>' + esc(note) + '</span></span></button>';
  }

  function rankButton(stu, month) {
    var score = careScore(stu, month);
    var rank = careRank(score);
    var scale = CARE_RANKS.map(function (item) {
      var band = item.id === 'F' ? '0%' : (item.id === 'S' ? 'trên 91%' : (item.min + '%–' + item.max + '%'));
      return item.id + ' (' + band + ') ' + item.text;
    }).join(' | ');
    return '<button type="button" class="rank-pill rank-' + rank.id.toLowerCase() + '" data-act="rank-open" data-score="' + score + '" title="' + esc(rank.id + ' · ' + score + '% · ' + rank.text) + '">' +
      rank.id + '<span class="rank-tip"><b>' + rank.id + ' · ' + score + '%</b><span>' + esc(rank.text) + '</span><span>' + esc(scale) + '</span></span></button>';
  }

  function viewCare() {
    var month = careMonthKey();
    ui.careMonth = month;
    if (!ui.careClassId) {
      return shell('<div class="section-head"><div><span class="nav-pair"><button type="button" class="btn" data-act="nav" data-screen="menu">← Menu</button>' + homeButton() + '</span><h2>Chăm sóc học viên</h2></div></div>' +
        '<p class="help">Chọn lớp, rồi chọn tháng. Mỗi học viên có một ô cho mỗi tuần của tháng. Tuần 1 là tuần có ngày đầu tháng. Tuần cuối là tuần có ngày cuối tháng.</p>' +
        classBrowser('care'));
    }
    var cls = findClass(ui.careClassId);
    if (!cls) { ui.careClassId = ''; return viewCare(); }
    var weeks = monthWeeks(month);
    var head = weeks.map(function (week) { return '<th>' + esc(week.label) + '</th>'; }).join('');
    var now = new Date();
    var rows = (cls.students || []).filter(function (stu) {
      return stu && L.studentPhase(cls, stu, now).kind !== 'archive';
    }).map(function (stu) {
      var cells = weeks.map(function (week) { return '<td>' + careCellButton(stu, month, week) + '</td>'; }).join('');
      return '<tr><td>' + esc(showText(stu.name)) + '</td><td>' + esc(showText(stu.code)) + '</td>' + cells + '<td>' + rankButton(stu, month) + '</td></tr>';
    }).join('');
    return shell('<div class="section-head"><div><span class="nav-pair"><button type="button" class="btn" data-act="care-back">← Danh sách lớp</button>' + homeButton() + '</span><h2>' + esc(L.currentName(cls)) + '</h2>' +
      (cls.classCode ? '<p class="meta">Mã lớp: ' + esc(cls.classCode) + '</p>' : '') + '</div></div>' +
      '<label class="field dash-month"><span>Tháng</span><input id="care-month" type="month" value="' + esc(month) + '"></label>' +
      '<p class="help">Rê chuột vào ô để xem loại thẻ. Bấm ô để xem chi tiết. Admin chọn trạng thái. Reissue và Urgent cần nội dung trước khi xác nhận. Cuối dòng là mức hiệu quả của tổng phần trăm trong tháng.</p>' +
      fileExportButtons('export-care') +
      (canExportClasses() ? '<p class="help">Xuất tháng đang mở. Ô None là tuần chưa tương tác. Excel ghi tên trạng thái và nội dung. Ảnh, PDF và bản in giữ màu ô trên màn hình.</p>' : '') +
      '<div class="table-wrap"><table class="care-table"><thead><tr><th>Học viên</th><th>Mã</th>' + head + '<th>Hiệu quả</th></tr></thead><tbody>' +
      (rows || '<tr><td colspan="' + (3 + weeks.length) + '">Chưa có học viên.</td></tr>') + '</tbody></table></div>' + modalHtml());
  }

  function careCellForm() {
    var modal = ui.modal || {};
    var found = findStudent(modal.stuId);
    var cell = found ? careCellOf(found.stu, modal.month, modal.week) : null;
    var status = cell ? cell.status : 'none';
    var spec = CARE_STATUS[status] || CARE_STATUS.none;
    var note = cell ? cell.note : '';
    var options = Object.keys(CARE_STATUS).map(function (id) {
      var item = CARE_STATUS[id];
      return '<option value="' + id + '"' + (id === status ? ' selected' : '') + '>' + esc(item.label) + ' · +' + item.pct + '%</option>';
    }).join('');
    var body = '<p><b>' + esc(spec.label) + '</b> · +' + spec.pct + '%</p><p>' + esc(spec.tip) + '</p>' +
      (note ? '<p>' + esc(note) + '</p>' : '<p class="muted">Chưa có nội dung chi tiết.</p>');
    if (canEdit()) {
      body += '<label class="field"><span>Trạng thái</span><select id="care-status">' + options + '</select></label>' +
        '<label class="field"><span>Nội dung chi tiết</span><textarea id="care-note">' + esc(note) + '</textarea></label>' +
        '<p class="help">Reissue và Urgent cần ghi nội dung trước khi xác nhận. Chuyển hai trạng thái này sang trạng thái khác sẽ xóa nội dung chi tiết.</p>';
    }
    var foot = canEdit()
      ? '<button type="button" class="btn btn-primary" data-act="care-save">Xác nhận</button><button type="button" class="btn" data-act="close-modal">Hủy</button>'
      : '<button type="button" class="btn" data-act="close-modal">Đóng</button>';
    return modalShell(modal.weekLabel || 'Tuần', body, foot);
  }

  function saveCareCell() {
    if (deny(canEdit()) || !ui.modal || ui.modal.type !== 'care-cell') return;
    var found = findStudent(ui.modal.stuId);
    if (!found) return;
    var status = String((document.getElementById('care-status') || {}).value || 'none');
    if (!CARE_STATUS[status]) status = 'none';
    var note = String((document.getElementById('care-note') || {}).value || '').trim();
    var prev = careCellOf(found.stu, ui.modal.month, ui.modal.week);
    var prevStatus = prev ? prev.status : 'none';
    if ((status === 'reissue' || status === 'urgent') && !note) {
      showFormError('Reissue và Urgent cần ghi nội dung trước khi xác nhận.');
      return;
    }
    var leaving = (prevStatus === 'reissue' || prevStatus === 'urgent') && status !== 'reissue' && status !== 'urgent';
    if (leaving && prev && prev.note) {
      if (!window.confirm('Nội dung chi tiết sẽ bị mất nếu chuyển sang trạng thái khác ngoài Reissue và Urgent.')) return;
    }
    if (status !== 'reissue' && status !== 'urgent') note = '';
    writeCareCell(found.stu, ui.modal.month, ui.modal.week, status, note);
    ui.modal = null;
    ui.formError = '';
    save();
    toast('Đã lưu tương tác tuần.');
    render();
  }

  function rankScaleForm() {
    var score = Number(ui.modal && ui.modal.score) || 0;
    var current = careRank(score);
    var rows = CARE_RANKS.map(function (item) {
      var band = item.id === 'F' ? '0%' : (item.id === 'S' ? 'trên 91%' : (item.min + '%–' + item.max + '%'));
      return '<li class="' + (item.id === current.id ? 'is-on' : '') + '"><b>' + item.id + '</b> ' + esc(band) + ' — ' + esc(item.text) + '</li>';
    }).join('');
    return modalShell('Hiệu quả ' + current.id + ' · ' + score + '%', '<ul class="rank-scale">' + rows + '</ul>', '<button type="button" class="btn" data-act="close-modal">Đóng</button>');
  }

  function classesWithNewRemarks() {
    var acc = currentAccount();
    var seen = acc && acc.remarkSeen ? acc.remarkSeen : {};
    var list = [];
    (state.classes || []).forEach(function (cls) {
      var count = 0;
      (cls.students || []).forEach(function (stu) {
        (stu.remarks || []).forEach(function (item) { if (item && item.id && !seen[item.id]) count += 1; });
      });
      if (count) list.push({ cls: cls, count: count });
    });
    return list;
  }

  function remarkTagHtml() {
    if (canEdit()) return '';
    var list = classesWithNewRemarks();
    if (!list.length) return '';
    return '<button type="button" class="remark-tag" data-act="nav" data-screen="remarks">' + list.length + ' lớp được cập nhật nhận xét mới</button>';
  }

  function remarkMonthKey() {
    return /^\d{4}-\d{2}$/.test(ui.remarkMonth || '') ? ui.remarkMonth : L.monthKey(new Date());
  }

  function remarkInMonth(item, month) {
    if (!item) return false;
    if (String(item.sessionKey || '').indexOf(month) === 0) return true;
    return String(item.at || '').indexOf(month) === 0;
  }

  function remarkSessionLabel(ses) {
    if (!ses) return 'Buổi học';
    if (!ses.date) return ses.label || ses.key || 'Buổi học';
    var day = L.DAYS.filter(function (item) { return item.dow === ses.dow; })[0];
    return L.formatDMY(ses.date) + ' · ' + (day ? day.short + ' ' : '') + L.formatTimeValue(ses.start) + '–' + L.formatTimeValue(ses.end);
  }

  function latestRemark(stu, sessionKey) {
    var found = null;
    (stu && stu.remarks || []).forEach(function (item) {
      if (item && item.sessionKey === sessionKey) found = item;
    });
    return found;
  }

  function remarkSessions(cls, month) {
    var list = L.monthSessions(cls, month).map(function (ses) { return ses; });
    var have = {};
    list.forEach(function (ses) { if (ses && ses.key) have[ses.key] = true; });
    (cls.students || []).forEach(function (stu) {
      (stu && stu.remarks || []).forEach(function (item) {
        if (!remarkInMonth(item, month) || !item.sessionKey || have[item.sessionKey]) return;
        have[item.sessionKey] = true;
        list.push({ key: item.sessionKey, label: item.sessionLabel || item.sessionKey });
      });
    });
    return list;
  }

  function remarkRoster(cls, sessionKey) {
    var now = new Date();
    var list = [];
    (cls.students || []).forEach(function (stu) {
      if (!stu) return;
      var phase = L.studentPhase(cls, stu, now);
      var has = (stu.remarks || []).some(function (item) { return item && item.sessionKey === sessionKey; });
      if (phase.kind === 'archive' && !has) return;
      list.push(stu);
    });
    list.sort(function (a, b) { return String(a.name || '').localeCompare(String(b.name || ''), 'vi'); });
    return list;
  }

  function readRemarkDom() {
    var draft = ui.remarkDraft;
    if (!draft) return;
    document.querySelectorAll('[data-remark-text]').forEach(function (el) {
      draft.texts[el.getAttribute('data-remark-text')] = el.value;
    });
    draft.ticks = {};
    document.querySelectorAll('[data-remark-tick]').forEach(function (el) {
      if (el.checked) draft.ticks[el.getAttribute('data-remark-tick')] = true;
    });
    var ses = document.getElementById('remark-session');
    if (ses) draft.sessionKey = ses.value;
    var bulk = document.getElementById('remark-bulk');
    if (bulk) draft.bulk = bulk.value;
  }

  function remarkShown(item) {
    if (!item || !item.id) return false;
    return item.tag !== 'uncategorized';
  }

  function remarkDayKey(item) {
    var raw = String(item && (item.sessionKey || item.at) || '').slice(0, 10);
    return /^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw : '';
  }

  function remarkDayLabel(day) {
    var parsed = day ? L.parseDateInput(day) : null;
    return parsed ? L.formatDMY(parsed) : (day || 'Ngày khác');
  }

  function remarkNoteClass(cls, tagId) {
    var group = String(classGroupId(cls) || 'custom').toLowerCase();
    return 'remark-note remark-card group-' + esc(group) + ' tag-' + esc(tagId || 'plain');
  }

  function remarkEndsBr(html) {
    return /<br>$/.test(html);
  }

  function remarkStyleWrap(el, inner) {
    if (!inner) return '';
    var style = String(el.getAttribute('style') || '').toLowerCase();
    if (/font-weight\s*:\s*(bold|[6-9]00)/.test(style)) inner = '<b>' + inner + '</b>';
    if (/font-style\s*:\s*italic/.test(style)) inner = '<i>' + inner + '</i>';
    if (/text-decoration(?:-line)?\s*:[^;]*underline/.test(style)) inner = '<u>' + inner + '</u>';
    return inner;
  }

  function remarkSanitize(raw) {
    var host = document.createElement('div');
    host.innerHTML = String(raw || '');
    var blocks = { div: 1, p: 1, li: 1, tr: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, blockquote: 1, pre: 1 };
    function walk(node) {
      var out = '';
      var child = node.firstChild;
      while (child) {
        if (child.nodeType === 3) {
          var parts = String(child.nodeValue || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
          for (var i = 0; i < parts.length; i++) {
            if (i) out += '<br>';
            out += esc(parts[i]);
          }
        } else if (child.nodeType === 1) {
          var name = String(child.nodeName || '').toLowerCase();
          if (name === 'br') out += '<br>';
          else if (name === 'b' || name === 'strong') {
            var bold = walk(child);
            if (bold) out += '<b>' + bold + '</b>';
          } else if (name === 'i' || name === 'em') {
            var italic = walk(child);
            if (italic) out += '<i>' + italic + '</i>';
          } else if (name === 'u') {
            var under = walk(child);
            if (under) out += '<u>' + under + '</u>';
          } else if (blocks[name]) {
            var block = walk(child);
            if (out && !remarkEndsBr(out)) out += '<br>';
            if (!block) out += '<br>';
            else {
              out += block;
              if (!remarkEndsBr(block)) out += '<br>';
            }
          } else if (name === 'span' || name === 'font') out += remarkStyleWrap(child, walk(child));
          else out += walk(child);
        }
        child = child.nextSibling;
      }
      return out;
    }
    return walk(host).replace(/^(?:<br>)+/, '').replace(/(?:<br>)+$/, '');
  }

  function remarkToEditorHtml(text) {
    var raw = String(text || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    if (!raw) return '';
    if (/<[a-z!/]/i.test(raw)) return remarkSanitize(raw);
    return esc(raw).replace(/\n/g, '<br>');
  }

  function remarkToPlain(text) {
    var html = remarkToEditorHtml(text).replace(/<br>/g, '\n');
    var box = document.createElement('div');
    box.innerHTML = html;
    return String(box.textContent || '').replace(/\u00a0/g, ' ').trim();
  }

  function remarkDetailHtml(text, tag) {
    var html = remarkToEditorHtml(text);
    if (!html && tag && tag.vi) html = esc(tag.vi);
    if (!html) return '<p class="muted">Chưa có nhận xét.</p>';
    return '<div class="remark-detail">' + html + '</div>';
  }

  function composerMarkup() {
    var box = document.getElementById('remark-composer');
    if (!box) return ui.remarkEditor ? String(ui.remarkEditor.text || '') : '';
    return remarkSanitize(box.innerHTML);
  }

  function remarkSelInside(box) {
    var sel = window.getSelection();
    if (!box || !sel || !sel.rangeCount) return false;
    var node = sel.anchorNode;
    if (!node) return false;
    return node === box || box.contains(node);
  }

  function remarkReadCard(cls, stu, item, seen) {
    var tag = remarkTagInfo(item.tag);
    var tagId = tag ? tag.id : 'plain';
    var open = ui.remarkSlip === item.id;
    var pill = tag ? '<span class="remark-pill tag-' + tag.id + '">' + esc(tag.en) + '<small>' + esc(tag.vi) + '</small></span>' : '';
    var fresh = item.id && !seen[item.id] ? '<span class="remark-new">Mới</span>' : '';
    var body = open
      ? remarkDetailHtml(item.text, tag)
      : '<p class="muted">Bấm để xem chi tiết.</p><button type="button" class="btn" data-act="remark-slip" data-id="' + esc(item.id) + '">Xem chi tiết</button>';
    return '<article class="' + remarkNoteClass(cls, tagId) + '" data-remark="' + esc(item.id) + '"><strong>' + esc(showText(stu.name)) + '</strong>' +
      (stu.englishName ? '<span>' + esc(stu.englishName) + '</span>' : '') +
      '<span>Mã: ' + esc(showText(stu.code)) + '</span>' +
      '<span>' + esc(item.sessionLabel || item.sessionKey || '') + '</span>' +
      fresh + pill + body + '</article>';
  }

  function remarkEditCard(cls, stu, ses) {
    var stored = latestRemark(stu, ses.key);
    var tag = stored ? remarkTagInfo(stored.tag) : null;
    var tagId = tag ? tag.id : (stored && stored.text ? 'plain' : 'uncategorized');
    var label = remarkSessionLabel(ses);
    var pill = tag ? '<span class="remark-pill tag-' + tag.id + '">' + esc(tag.en) + '<small>' + esc(tag.vi) + '</small></span>' : '';
    var body = stored ? remarkDetailHtml(stored.text, tag) : '<p class="muted">Chưa có nhận xét.</p>';
    return '<article class="' + remarkNoteClass(cls, tagId) + '" data-stu="' + esc(stu.id) + '"><strong>' + esc(showText(stu.name)) + '</strong>' +
      (stu.englishName ? '<span>' + esc(stu.englishName) + '</span>' : '') +
      '<span>Mã: ' + esc(showText(stu.code)) + '</span>' +
      '<span>' + esc(label) + '</span>' + pill + body +
      '<button type="button" class="btn remark-revise" data-act="remark-revise" data-class="' + esc(cls.id) + '" data-stu="' + esc(stu.id) + '" data-session="' + esc(ses.key) + '" data-label="' + esc(label) + '">Sửa</button></article>';
  }

  function remarkEditorHtml() {
    var ed = ui.remarkEditor;
    if (!ed || !canEdit()) return '';
    var spec = remarkTagInfo(ed.tag) || remarkTagInfo('uncategorized');
    var cls = findClass(ed.classId);
    var stu = null;
    if (cls) (cls.students || []).forEach(function (item) { if (item && item.id === ed.stuId) stu = item; });
    var chips = REMARK_TAGS.map(function (item) {
      var on = item.id === spec.id ? ' is-on' : '';
      return '<button type="button" class="remark-chip tag-' + item.id + on + '" data-act="remark-pick" data-tag="' + item.id + '">' +
        esc(item.en) + '<small>' + esc(item.vi) + '</small></button>';
    }).join('');
    var editable = spec.comment ? 'true' : 'false';
    var lock = spec.comment ? '' : ' disabled';
    var html = remarkToEditorHtml(ed.text);
    var who = stu
      ? '<p><strong>' + esc(showText(stu.name)) + '</strong>' +
        (stu.englishName ? ' · ' + esc(stu.englishName) : '') +
        ' · Mã: ' + esc(showText(stu.code)) + '</p>'
      : '';
    return '<div class="scrim remark-scrim"><div class="modal remark-editor" data-stop data-scroll-keep="remark-editor" role="dialog" aria-label="Sửa nhận xét">' +
      '<div class="dialog-head"><h2>Sửa nhận xét</h2><button type="button" class="icon-x" data-act="remark-revise-close" aria-label="Đóng">X</button></div>' +
      who +
      '<p>' + esc(ed.label || '') + '</p>' +
      '<div class="remark-chips">' + chips + '</div>' +
      '<div class="remark-tools">' +
        '<button type="button" class="btn remark-italic" data-act="remark-style" data-style="italic"' + lock + '>I</button>' +
        '<button type="button" class="btn remark-bold" data-act="remark-style" data-style="bold"' + lock + '>B</button>' +
        '<button type="button" class="btn remark-under" data-act="remark-style" data-style="underline"' + lock + '>U</button>' +
      '</div>' +
      '<p class="help">Bôi đen chữ, rồi bấm I, B, U hoặc Ctrl+I, Ctrl+B, Ctrl+U. Enter để xuống dòng.</p>' +
      '<div id="remark-composer" class="remark-detail remark-composer" data-scroll-keep="remark-composer" contenteditable="' + editable + '" role="textbox" aria-multiline="true"' +
        (spec.comment ? '' : ' aria-disabled="true"') + '>' + html + '</div>' +
      '<div class="modal-foot"><button type="button" class="btn btn-primary" data-act="remark-save">Lưu thẻ</button>' +
      '<button type="button" class="btn" data-act="remark-revise-close">Hủy</button></div></div></div>';
  }

  function remarkDays(cls, month) {
    var map = {};
    var order = [];
    (cls.students || []).forEach(function (stu) {
      (stu && stu.remarks || []).forEach(function (item) {
        if (!remarkShown(item) || !remarkInMonth(item, month)) return;
        var day = remarkDayKey(item) || 'other';
        if (!map[day]) {
          map[day] = [];
          order.push(day);
        }
        map[day].push({ stu: stu, item: item });
      });
    });
    order.sort();
    return order.map(function (day) {
      var cards = map[day].slice().sort(function (a, b) {
        return String(a.stu.name || '').localeCompare(String(b.stu.name || ''), 'vi');
      });
      return { day: day, cards: cards };
    });
  }

  function remarkLegendHtml() {
    return '<section class="remark-admin"><h3>Khung nhận xét</h3><p class="help">Mỗi học viên một thẻ ghi chú. Bấm Sửa, chọn thẻ, rồi Lưu thẻ. Cửa sổ hiện đủ nhận xét, giữ cách dòng và xuống dòng. Bôi đen chữ rồi bấm I, B, U hoặc Ctrl+I, Ctrl+B, Ctrl+U. Absent và Uncategorized không nhập được nhận xét.</p><div class="remark-legend">' +
      REMARK_TAGS.map(function (item) {
        return '<span class="remark-pill tag-' + item.id + '">' + esc(item.en) + '<small>' + esc(item.vi) + '</small></span>';
      }).join('') + '</div></section>';
  }

  function viewRemarkEditor(cls) {
    var month = remarkMonthKey();
    ui.remarkMonth = month;
    var sessions = remarkSessions(cls, month);
    if (!ui.remarkSession || !sessions.some(function (ses) { return ses.key === ui.remarkSession; })) {
      ui.remarkSession = sessions.length ? sessions[0].key : '';
    }
    var current = null;
    sessions.forEach(function (ses) { if (ses.key === ui.remarkSession) current = ses; });
    var options = sessions.map(function (ses) {
      return '<option value="' + esc(ses.key) + '"' + (ses.key === ui.remarkSession ? ' selected' : '') + '>' + esc(remarkSessionLabel(ses)) + '</option>';
    }).join('');
    var cards = current ? remarkRoster(cls, current.key).map(function (stu) { return remarkEditCard(cls, stu, current); }).join('') : '';
    var roster = sessions.length
      ? '<details class="remark-roster" open><summary>Danh sách học viên · ' + remarkRoster(cls, current.key).length + '</summary><div class="remark-note-scroll" data-scroll-keep="remark-roster"><div class="remark-note-grid">' +
        (cards || '<p class="muted">Chưa có học viên.</p>') + '</div></div></details>'
      : '<p class="muted">Lớp không có buổi học trong tháng này.</p>';
    return shell('<div class="section-head"><div><span class="nav-pair"><button type="button" class="btn" data-act="remark-back">← Danh sách lớp</button>' + homeButton() + '</span><h2>' + esc(L.currentName(cls)) + '</h2></div></div>' +
      '<label class="field dash-month"><span>Tháng</span><input id="remark-month" type="month" value="' + esc(month) + '"></label>' +
      '<label class="field"><span>Buổi nhận xét</span><select id="remark-session-pick">' + options + '</select></label>' +
      '<p class="help">Thẻ học viên theo buổi đang chọn. Bấm Sửa để mở cửa sổ và xem đủ nhận xét. Đổi buổi trong ô phía trên. Ngăn rút gọn chỉ gồm danh sách học viên.</p>' +
      remarkLegendHtml() +
      fileExportButtons('export-remarks') +
      (canExportClasses() ? '<p class="help">Xuất nhận xét đã lưu của lớp này.</p>' : '') +
      roster) + remarkEditorHtml();
  }

  function viewRemarkReader() {
    var month = remarkMonthKey();
    ui.remarkMonth = month;
    var acc = currentAccount();
    var seen = acc && acc.remarkSeen ? acc.remarkSeen : {};
    var blocks = (state.classes || []).slice().sort(function (a, b) {
      return L.currentName(a).localeCompare(L.currentName(b), 'vi');
    }).map(function (cls) {
      var days = remarkDays(cls, month);
      if (!days.length) return '';
      var count = 0;
      days.forEach(function (bucket) { count += bucket.cards.length; });
      var group = String(classGroupId(cls) || 'custom').toLowerCase();
      var open = ui.remarkOpenClass === cls.id;
      var inner = open ? '<div class="remark-fold-body" data-scroll-keep="remark-days">' + days.map(function (bucket) {
        return '<section class="remark-day" data-day="' + esc(bucket.day) + '"><h3>' + esc(remarkDayLabel(bucket.day)) + '</h3><div class="remark-note-grid">' +
          bucket.cards.map(function (row) { return remarkReadCard(cls, row.stu, row.item, seen); }).join('') + '</div></section>';
      }).join('') + '</div>' : '';
      return '<details class="remark-fold" data-class="' + esc(cls.id) + '"' + (open ? ' open' : '') + '><summary><span class="remark-note remark-class-note group-' + esc(group) + '"><strong>' +
        esc(L.currentName(cls)) + '</strong><span>' + count + ' nhận xét · ' + days.length + ' ngày</span></span></summary>' + inner + '</details>';
    }).join('');
    return shell('<div class="section-head"><div><span class="nav-pair"><button type="button" class="btn" data-act="nav" data-screen="menu">← Menu</button>' + homeButton() + '</span><h2>Nhận xét học viên</h2></div></div>' +
      '<label class="field dash-month"><span>Tháng</span><input id="remark-month" type="month" value="' + esc(month) + '"></label>' +
      '<p class="help">Mỗi lớp là một thẻ ghi chú thu gọn. Bấm lớp để xem theo ngày. Thẻ Chưa nhận xét không hiện.</p>' +
      fileExportButtons('export-remarks') +
      (canExportClasses() ? '<p class="help">Mở một lớp rồi xuất nhận xét chưa xem của lớp đó.</p>' : '') +
      '<div class="remark-board" data-scroll-keep="remark-board">' + (blocks || '<p class="muted">Chưa có nhận xét trong tháng này.</p>') + '</div>');
  }

  function viewRemarks() {
    if (!canEdit()) return viewRemarkReader();
    if (!ui.remarkClassId) {
      return shell('<div class="section-head"><div><span class="nav-pair"><button type="button" class="btn" data-act="nav" data-screen="menu">← Menu</button>' + homeButton() + '</span><h2>Nhận xét học viên</h2></div></div>' +
        '<p class="help">Chọn một lớp trong thư mục, rồi nhận xét theo buổi.</p>' +
        classBrowser('remarks'));
    }
    var cls = findClass(ui.remarkClassId);
    if (!cls) { ui.remarkClassId = ''; ui.remarkSession = ''; return viewRemarks(); }
    return viewRemarkEditor(cls);
  }

  function confirmRemarkBulk() {
    if (deny(canEdit())) return;
    readRemarkDom();
    var draft = ui.remarkDraft;
    var text = String(draft && draft.bulk || '').trim();
    if (!text) { toast('Viết nội dung trước khi xác nhận.'); return; }
    var ids = Object.keys(draft.ticks);
    if (!ids.length) { toast('Chọn ít nhất một học viên.'); return; }
    ids.forEach(function (id) { draft.texts[id] = text; });
    render();
  }

  function commitRemarks() {
    if (deny(canEdit())) return;
    readRemarkDom();
    var draft = ui.remarkDraft;
    var cls = findClass(draft && draft.classId);
    if (!cls || !draft.sessionKey) { toast('Chọn buổi học.'); return; }
    var label = draft.sessionKey;
    var ses = document.getElementById('remark-session');
    if (ses && ses.selectedOptions && ses.selectedOptions[0]) label = ses.selectedOptions[0].getAttribute('data-label') || ses.selectedOptions[0].textContent || label;
    var any = false;
    (cls.students || []).forEach(function (stu) {
      if (!draft.ticks[stu.id]) return;
      var text = String(draft.texts[stu.id] || '').trim();
      if (!text) return;
      any = true;
      if (!Array.isArray(stu.remarks)) stu.remarks = [];
      var remarkedAt = new Date().toISOString();
      stu.remarkAt = remarkedAt;
      stu.remarks.push({ id: L.uid(), sessionKey: draft.sessionKey, sessionLabel: label, text: text, at: remarkedAt, by: ui.user ? ui.user.name : '' });
    });
    if (!any) { toast('Chọn học viên và ghi nội dung trước khi xong.'); return; }
    ui.remarkDraft = { classId: cls.id, sessionKey: draft.sessionKey, texts: {}, ticks: {}, editing: false, bulk: '' };
    save();
    toast('Đã lưu nhận xét theo buổi.');
    render();
  }

  function viewRemarkRead() {
    return viewRemarks();
  }

  function markRemarkSlip(remarkId) {
    var acc = currentAccount();
    if (!acc || !remarkId) return;
    if (!acc.remarkSeen || typeof acc.remarkSeen !== 'object') acc.remarkSeen = {};
    acc.remarkSeen[remarkId] = true;
    ui.remarkSlip = remarkId;
    save({ quiet: true });
    render();
  }

  function saveRemarkCard(btn) {
    if (deny(canEdit())) return;
    var ed = ui.remarkEditor;
    if (!ed) return;
    var classId = ed.classId || '';
    var stuId = ed.stuId || '';
    var sessionKey = ed.sessionKey || '';
    var label = ed.label || sessionKey;
    var cls = findClass(classId);
    var stu = null;
    if (cls) (cls.students || []).forEach(function (item) { if (item && item.id === stuId) stu = item; });
    if (!cls || !stu || !sessionKey) return;
    var on = document.querySelector('.remark-editor .remark-chip.is-on');
    var tagId = on ? on.getAttribute('data-tag') : (ed.tag || 'uncategorized');
    var spec = remarkTagInfo(tagId) || remarkTagInfo('uncategorized');
    var markup = composerMarkup();
    var text = spec.comment ? markup : '';
    if (spec.comment && !remarkToPlain(text)) { toast('Viết nhận xét trước khi lưu.'); return; }
    if (!Array.isArray(stu.remarks)) stu.remarks = [];
    var remarkedAt = new Date().toISOString();
    stu.remarkAt = remarkedAt;
    if (spec.id === 'uncategorized') {
      stu.remarks = stu.remarks.filter(function (item) { return !item || item.sessionKey !== sessionKey; });
    } else {
      var current = latestRemark(stu, sessionKey);
      if (current) {
        current.tag = spec.id;
        current.text = text;
        current.sessionLabel = label;
        current.at = remarkedAt;
        current.by = ui.user ? ui.user.name : '';
      } else {
        stu.remarks.push({
          id: L.uid(),
          sessionKey: sessionKey,
          sessionLabel: label,
          text: text,
          tag: spec.id,
          at: remarkedAt,
          by: ui.user ? ui.user.name : ''
        });
      }
    }
    ui.remarkDraft = null;
    ui.remarkEditor = null;
    save({ quiet: true });
    toast('Đã lưu nhận xét.');
    render();
  }

  function viewMenu() {
    var stats = currentWeekStats(null);
    var menuSpan = 'A–L';
    return shell(remarkTagHtml() + summaryHtml(stats) + dashboardHtml() +
      '<details class="menu-fold"><summary>Menu chính ' + menuSpan + '</summary><section class="menu-grid">' +
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
      (L.curriculumFresh(state.classes, new Date()) ? '<span class="comic-fresh">đăng kí mới</span>' : '') +
      '<div class="kicker">F · CURRICULUM</div><h2>Xác nhận giáo trình</h2>' +
      '<p>Giáo trình, mua sách và tài khoản PEC.</p></button>' +
      '<button type="button" class="menu-card" data-act="nav" data-screen="exam">' + iconExam() +
      '<div class="kicker">G · EXAM</div><h2>Kỳ thi</h2>' +
      '<p>Lọc lịch thi theo FET, cấp độ và chương trình.</p></button>' +
      '<button type="button" class="menu-card" data-act="nav" data-screen="staff">' + iconStaff() +
      '<div class="kicker">H · TEACHER HOURS</div><h2>Công giáo viên</h2>' +
      '<p>Giờ Teaching và giờ SOA của từng FET.</p></button>' +
      '<button type="button" class="menu-card" data-act="nav" data-screen="dictionary">' + iconDict() +
      '<span class="comic-meta">Bản meta thử nghiệm</span>' +
      '<div class="kicker">I · DICTIONARY</div><h2>Dictionary</h2>' +
      '<p>Tra từ Anh–Việt, mức CEFR, dịch câu và tải phát âm.</p></button>' +
      '<button type="button" class="menu-card" data-act="nav" data-screen="personnel">' + iconPeople() +
      '<div class="kicker">J · PERSONNEL</div><h2>Quản lý nhân sự</h2>' +
      '<p>Tên, mã, chức vụ, ngày sinh và giới tính.</p></button>' +
      '<button type="button" class="menu-card" data-act="nav" data-screen="care">' + iconCare() +
      '<div class="kicker">K · STUDENT CARE</div><h2>Chăm sóc học viên</h2>' +
      '<p>Tương tác theo tuần trong tháng và mức hiệu quả.</p></button>' +
      '<button type="button" class="menu-card" data-act="nav" data-screen="remarks">' + iconRemark() +
      '<div class="kicker">L · REMARKS</div><h2>Nhận xét học viên</h2>' +
      '<p>Thư mục lớp, sửa nhận xét trong cửa sổ nhỏ.</p></button>' +
      '</section></details>');
  }

  function iconDict() {
    return '<svg class="pixel-icon" viewBox="0 0 16 16" aria-hidden="true" shape-rendering="crispEdges">' +
      '<rect fill="#0c4a72" x="1" y="2" width="14" height="12"/>' +
      '<rect fill="#fff6d8" x="3" y="3" width="10" height="10"/>' +
      '<rect fill="#e11d2e" x="4" y="5" width="5" height="2"/>' +
      '<rect fill="#0c4a72" x="4" y="8" width="8" height="1"/>' +
      '<rect fill="#0c4a72" x="4" y="10" width="6" height="1"/>' +
      '</svg>';
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

  function iconCare() {
    return '<svg class="pixel-icon" viewBox="0 0 16 16" aria-hidden="true" shape-rendering="crispEdges">' +
      '<rect fill="#93c5fd" x="1" y="3" width="4" height="4"/>' +
      '<rect fill="#fde047" x="6" y="3" width="4" height="4"/>' +
      '<rect fill="#f87171" x="11" y="3" width="4" height="4"/>' +
      '<rect fill="#fb923c" x="1" y="9" width="4" height="4"/>' +
      '<rect fill="#60a5fa" x="6" y="9" width="4" height="4"/>' +
      '<rect fill="#9ca3af" x="11" y="9" width="4" height="4"/>' +
      '</svg>';
  }

  function iconRemark() {
    return '<svg class="pixel-icon" viewBox="0 0 16 16" aria-hidden="true" shape-rendering="crispEdges">' +
      '<rect fill="#f6edd9" x="3" y="1" width="10" height="14"/>' +
      '<rect fill="#1c1917" x="5" y="4" width="6" height="1"/>' +
      '<rect fill="#1c1917" x="5" y="7" width="6" height="1"/>' +
      '<rect fill="#b91c1c" x="5" y="10" width="4" height="1"/>' +
      '</svg>';
  }

  function iconPeople() {
    return '<svg class="pixel-icon" viewBox="0 0 16 16" aria-hidden="true" shape-rendering="crispEdges">' +
      '<rect fill="#e2b007" x="2" y="2" width="3" height="3"/>' +
      '<rect fill="#0c4a72" x="1" y="6" width="5" height="4"/>' +
      '<rect fill="#15803d" x="6" y="1" width="4" height="4"/>' +
      '<rect fill="#0c4a72" x="5" y="6" width="6" height="5"/>' +
      '<rect fill="#e11d2e" x="11" y="3" width="3" height="3"/>' +
      '<rect fill="#0c4a72" x="10" y="7" width="5" height="4"/>' +
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

  var EXAM_QUARTERS = ['I', 'II', 'III', 'IV'];

  function examYearOf(source) {
    var raw = source && source.createdAt ? String(source.createdAt) : '';
    var year = raw.slice(0, 4);
    if (/^\d{4}$/.test(year)) return year;
    return String(new Date().getFullYear());
  }

  function biannualTitle(quarter, year) {
    return 'KÌ THI QUÝ BIANUAL ' + year + ' Quý ' + quarter;
  }

  function biannualTags(dates) {
    var sorted = (dates || []).slice().sort();
    var tags = {};
    if (sorted[0]) tags[sorted[0]] = 'Paper test';
    if (sorted[1]) tags[sorted[1]] = 'Speaking test';
    return tags;
  }

  function examLoadTone(count) {
    if (count <= 3) return 'exam-load-blue';
    if (count <= 6) return 'exam-load-yellow';
    return 'exam-load-red';
  }

  function examTypeSelect(w) {
    var type = w.type === 'pick' ? 'pick' : (w.type === 'biannual' ? 'biannual' : 'class');
    function opt(value, label) {
      return '<option value="' + value + '"' + (type === value ? ' selected' : '') + '>' + label + '</option>';
    }
    return '<label class="field"><span>Loại kỳ thi</span><select id="exam-type">' +
      opt('class', 'Theo lớp') + opt('pick', 'Chọn lọc') + opt('biannual', 'BI-ANNUAL') + '</select></label>';
  }

  function eachExamMonth(from, to, fn) {
    var start = L.parseDateInput(String(from || '').slice(0, 7) + '-01');
    var last = L.parseDateInput(String(to || '').slice(0, 7) + '-01');
    if (!start || !last) return;
    var guard = 0;
    var cursor = start;
    while (cursor.getTime() <= last.getTime() && guard < 36) {
      fn(L.monthKey(cursor));
      cursor = L.addMonths(cursor, 1);
      guard += 1;
    }
  }

  function classSessionsBetween(cls, from, to) {
    var out = {};
    if (!cls || !/^\d{4}-\d{2}-\d{2}$/.test(from || '') || !/^\d{4}-\d{2}-\d{2}$/.test(to || '') || from > to) return out;
    eachExamMonth(from, to, function (key) {
      L.monthSessions(cls, key).forEach(function (ses) {
        if (!ses || ses.iso < from || ses.iso > to) return;
        if (!out[ses.iso] || String(ses.start || '') < String(out[ses.iso].start || '')) out[ses.iso] = ses;
      });
    });
    return out;
  }

  function biannualWindowDates(w, classId) {
    var from = w && w.rangeFrom || '';
    var to = w && w.rangeTo || '';
    return examDatesOf(w && w.dates ? w.dates[classId] : null).filter(function (iso) {
      return iso >= from && iso <= to;
    });
  }

  function biannualCalendar(cls, from, to, selected) {
    var sessions = classSessionsBetween(cls, from, to);
    if (!Object.keys(sessions).length) return '<p class="help exam-window-note">Lớp không có buổi học trong khoảng thi.</p>';
    var heads = L.DAYS.map(function (day) { return '<span>' + esc(day.short) + '</span>'; }).join('');
    var blocks = '';
    eachExamMonth(from, to, function (month) {
      var range = L.monthRange(month);
      var gridStart = L.weekMonday(range.start);
      var cells = '';
      for (var i = 0; i < 42; i++) {
        var day = L.addDays(gridStart, i);
        var iso = L.isoDay(day);
        var inMonth = day.getMonth() === range.start.getMonth() && day.getFullYear() === range.start.getFullYear();
        if (!inMonth || iso < from || iso > to) {
          cells += '<span class="exam-day is-out">' + day.getDate() + '</span>';
          continue;
        }
        var ses = sessions[iso];
        if (!ses) {
          cells += '<span class="exam-day is-locked">' + day.getDate() + '</span>';
          continue;
        }
        var on = selected && selected[iso];
        var title = 'Có lịch học ' + L.formatTimeValue(ses.start) + '–' + L.formatTimeValue(ses.end);
        cells += '<button type="button" class="exam-day is-session' + (on ? ' is-exam' : '') + '" data-act="exam-day" data-class="' + esc(cls.id) + '" data-iso="' + esc(iso) + '" title="' + esc(title) + '">' + day.getDate() + '</button>';
      }
      blocks += '<section class="exam-cal-card"><h3>' + esc(L.monthLabel(month)) + '</h3><div class="exam-cal-head">' + heads + '</div><div class="exam-cal">' + cells + '</div></section>';
    });
    return '<div class="exam-window-cal">' + blocks + '</div>';
  }

  function biannualClassMenu(w) {
    var chosen = Object.keys(w.classIds || {}).map(findClass).filter(Boolean).sort(function (a, b) {
      return L.currentName(a).localeCompare(L.currentName(b), 'vi');
    });
    return '<div class="exam-class-menu">' + chosen.map(function (cls) {
      var dates = biannualWindowDates(w, cls.id);
      var done = dates.length >= 2;
      var open = w.openClass === cls.id;
      var bang = done ? '' : '<span class="exam-bang" title="Chưa đủ 2 buổi">!</span>';
      var cal = open ? biannualCalendar(cls, w.rangeFrom, w.rangeTo, w.dates[cls.id] || {}) : '';
      return '<div class="exam-class-block"><button type="button" class="exam-class-item' + (done ? ' is-done' : '') + (open ? ' is-open' : '') + '" data-act="exam-focus" data-class="' + esc(cls.id) + '">' +
        bang + '<span>' + esc(L.currentName(cls)) + '</span><small>' + dates.length + '/2</small></button>' + cal + '</div>';
    }).join('') + '</div>';
  }

  function biannualBoard(w) {
    var from = w.rangeFrom || '';
    var to = w.rangeTo || '';
    var classes = Object.keys(w.classIds || {}).map(findClass).filter(Boolean).sort(function (a, b) {
      return L.currentName(a).localeCompare(L.currentName(b), 'vi');
    });
    var note = '<p class="help">Chọn đủ 2 buổi cho từng lớp. Buổi sớm hơn là Paper test, buổi sau là Speaking test.</p>' +
      '<p class="help exam-load-legend">Dưới 3 lớp: xanh. 4–5 lớp: vàng. Trên 6 lớp: đỏ. 3 lớp tính xanh, 6 lớp tính vàng.</p>';
    if (!classes.length || !from || !to) return note;
    var picks = {};
    var weekSet = {};
    classes.forEach(function (cls) {
      var dates = biannualWindowDates(w, cls.id);
      var sessions = classSessionsBetween(cls, from, to);
      picks[cls.id] = { dates: dates, tags: biannualTags(dates), sessions: sessions };
      dates.forEach(function (iso) {
        var day = L.parseDateInput(iso);
        if (!day || !sessions[iso]) return;
        weekSet[L.isoDay(L.weekMonday(day))] = true;
      });
    });
    var weeks = Object.keys(weekSet).sort();
    if (!weeks.length) return note;
    var tables = weeks.map(function (mondayIso) {
      var start = L.parseDateInput(mondayIso);
      var dayMeta = L.DAYS.map(function (day, index) {
        var date = L.addDays(start, index);
        var iso = L.isoDay(date);
        return { day: day, date: date, iso: iso, inRange: iso >= from && iso <= to };
      });
      var chips = [];
      classes.forEach(function (cls) {
        var bag = picks[cls.id];
        bag.dates.forEach(function (iso) {
          var meta = null;
          dayMeta.forEach(function (item) { if (item.iso === iso) meta = item; });
          var ses = bag.sessions[iso];
          if (!meta || !ses) return;
          chips.push({
            iso: iso,
            dow: ses.dow,
            start: ses.start || '',
            end: ses.end || '',
            band: L.bandOf(ses.start),
            name: L.currentName(cls),
            tag: bag.tags[iso] || '',
            group: String(classGroupId(cls) || 'custom').toLowerCase(),
            classId: cls.id
          });
        });
      });
      var head = '<tr><th>Khung giờ</th>' + dayMeta.map(function (item) {
        return '<th>' + esc(item.day.short) + '<br><small>' + esc(L.formatDMY(item.date)) + '</small></th>';
      }).join('') + '</tr>';
      var body = L.BANDS.map(function (band) {
        var html = '<tr class="band-row band-' + band.id + '"><td colspan="8">' + bandTitle(band.id) + '</td></tr>';
        var bandChips = chips.filter(function (chip) { return chip.band === band.id; });
        if (!bandChips.length) return html + '<tr class="gap-row"><td colspan="8">Không có lớp</td></tr>';
        var rowMap = {};
        var rowKeys = [];
        bandChips.forEach(function (chip) {
          var key = chip.start + '|' + chip.end;
          if (!rowMap[key]) {
            rowMap[key] = { start: chip.start, end: chip.end, cells: {} };
            rowKeys.push(key);
          }
          if (!rowMap[key].cells[chip.dow]) rowMap[key].cells[chip.dow] = [];
          rowMap[key].cells[chip.dow].push(chip);
        });
        rowKeys.sort(function (a, b) {
          function mins(value) {
            var bits = String(value || '0:0').split(':');
            return (Number(bits[0]) || 0) * 60 + (Number(bits[1]) || 0);
          }
          return mins(rowMap[a].start) - mins(rowMap[b].start);
        });
        return html + rowKeys.map(function (key) {
          var row = rowMap[key];
          return '<tr><th class="time-cell">' + esc(L.formatTimeValue(row.start)) + '<br>–<br>' + esc(L.formatTimeValue(row.end)) + '</th>' +
            dayMeta.map(function (item) {
              var cards = (row.cells[item.day.dow] || []).filter(function (chip) { return chip.iso === item.iso; }).map(function (chip) {
                return '<div class="tt-card tt-exam group-' + esc(chip.group) + '"><strong>' + esc(chip.name) + '</strong><small class="tt-tag">' + esc(chip.tag) + '</small></div>';
              }).join('');
              return '<td>' + cards + '</td>';
            }).join('') + '</tr>';
        }).join('');
      }).join('');
      var counts = dayMeta.map(function (item) {
        if (!item.inRange) return '<td>—</td>';
        var ids = {};
        chips.forEach(function (chip) { if (chip.iso === item.iso) ids[chip.classId] = true; });
        var n = Object.keys(ids).length;
        return '<td class="' + examLoadTone(n) + '">' + n + '</td>';
      }).join('');
      var roster = classes.map(function (cls) {
        var bag = picks[cls.id];
        var cells = dayMeta.map(function (item) {
          var tag = item.inRange ? bag.tags[item.iso] : '';
          return '<td>' + (tag ? esc(tag) : '') + '</td>';
        }).join('');
        return '<tr class="exam-roster-row"><th>' + esc(L.currentName(cls)) + '</th>' + cells + '</tr>';
      }).join('');
      return '<div class="grid-scroll exam-board-week"><table class="timetable exam-board"><thead>' + head + '</thead><tbody>' + body +
        '<tr class="exam-load-row"><th>Số lớp</th>' + counts + '</tr>' + roster + '</tbody></table></div>';
    }).join('');
    return tables + note;
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
    if (type) {
      if (type.value === 'biannual') w.type = 'biannual';
      else if (type.value === 'pick') w.type = 'pick';
      else w.type = 'class';
    }
    var quarter = document.getElementById('exam-quarter');
    var rangeFrom = document.getElementById('exam-from');
    var rangeTo = document.getElementById('exam-to');
    if (quarter && EXAM_QUARTERS.indexOf(quarter.value) >= 0) w.quarter = quarter.value;
    if (rangeFrom) w.rangeFrom = rangeFrom.value;
    if (rangeTo) w.rangeTo = rangeTo.value;
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

  function buildExamEntry(cls, dates, previous, ageFrom, ageTo, type) {
    var slot = slotForExamDates(cls, dates);
    var students = previous && Array.isArray(previous.students)
      ? previous.students
      : L.examCandidates(cls, {
        ageFrom: type === 'pick' ? ageFrom : '',
        ageTo: type === 'pick' ? ageTo : '',
        now: new Date()
      });
    var entry = {
      classId: cls.id,
      className: L.currentName(cls),
      slotDow: slot.start ? Number(slot.dow) : '',
      slotStart: slot.start || '',
      slotEnd: slot.end || '',
      examDate: dates[0],
      examDates: dates.slice(),
      students: students
    };
    if (type === 'biannual') entry.sessionTags = biannualTags(dates);
    return entry;
  }

  function openExamEditor(exam) {
    var classIds = {};
    var dates = {};
    var first = '';
    (exam.entries || []).forEach(function (entry) {
      if (!entry || !entry.classId) return;
      classIds[entry.classId] = true;
      dates[entry.classId] = {};
      examDateList(entry).forEach(function (iso) {
        dates[entry.classId][iso] = true;
        if (!first || iso < first) first = iso;
      });
    });
    ui.examWizard = {
      step: 0,
      editId: exam.id,
      name: exam.name || '',
      type: exam.type === 'pick' ? 'pick' : (exam.type === 'biannual' ? 'biannual' : 'class'),
      quarter: EXAM_QUARTERS.indexOf(exam.quarter) >= 0 ? exam.quarter : 'I',
      rangeFrom: exam.rangeFrom || '',
      rangeTo: exam.rangeTo || '',
      createdAt: exam.createdAt || '',
      openClass: '',
      ageFrom: exam.ageFrom || '',
      ageTo: exam.ageTo || '',
      classIds: classIds,
      dates: dates,
      calMonth: first ? first.slice(0, 7) : L.monthKey(new Date())
    };
    ui.examId = null;
    ui.examWeek = '';
    ui.formError = '';
    render();
  }

  function commitExam() {
    var w = ui.examWizard;
    if (!w) return;
    var ids = Object.keys(w.classIds);
    var previousByClass = {};
    var editing = null;
    if (w.editId) {
      editing = findExam(w.editId);
      if (!editing) {
        ui.formError = 'Không thấy đợt thi để sửa.';
        render();
        return;
      }
      (editing.entries || []).forEach(function (entry) {
        if (entry && entry.classId) previousByClass[entry.classId] = entry;
      });
    }
    var type = w.type === 'pick' ? 'pick' : (w.type === 'biannual' ? 'biannual' : 'class');
    var entries = [];
    for (var i = 0; i < ids.length; i++) {
      var cls = findClass(ids[i]);
      if (!cls) {
        ui.formError = 'Không thấy một lớp đã chọn.';
        render();
        return;
      }
      var dates = examDatesOf(w.dates[ids[i]]);
      if (type === 'biannual') {
        dates = dates.filter(function (iso) { return iso >= w.rangeFrom && iso <= w.rangeTo; });
        if (dates.length !== 2) {
          ui.formError = 'Mỗi lớp chọn đúng 2 buổi trong thời hạn thi.';
          render();
          return;
        }
      } else if (!dates.length) {
        ui.formError = 'Chọn ít nhất một ngày thi cho từng lớp.';
        render();
        return;
      }
      entries.push(buildExamEntry(cls, dates, previousByClass[ids[i]], w.ageFrom, w.ageTo, type));
    }
    if (!state.exams) state.exams = [];
    var examId = editing ? editing.id : L.uid();
    var yearSource = editing && editing.createdAt ? editing : w;
    var name = type === 'biannual' ? biannualTitle(w.quarter, examYearOf(yearSource)) : String(w.name || '').trim();
    if (!name) {
      ui.formError = 'Điền tên đợt thi.';
      render();
      return;
    }
    if (editing) {
      editing.name = name;
      editing.type = type;
      editing.ageFrom = type === 'pick' ? String(w.ageFrom || '') : '';
      editing.ageTo = type === 'pick' ? String(w.ageTo || '') : '';
      if (type === 'biannual') {
        editing.quarter = w.quarter;
        editing.rangeFrom = w.rangeFrom;
        editing.rangeTo = w.rangeTo;
      } else {
        delete editing.quarter;
        delete editing.rangeFrom;
        delete editing.rangeTo;
      }
      editing.entries = entries;
    } else {
      var createdExam = {
        id: examId,
        name: name,
        type: type,
        ageFrom: type === 'pick' ? String(w.ageFrom || '') : '',
        ageTo: type === 'pick' ? String(w.ageTo || '') : '',
        createdAt: new Date().toISOString(),
        entries: entries
      };
      if (type === 'biannual') {
        createdExam.quarter = w.quarter;
        createdExam.rangeFrom = w.rangeFrom;
        createdExam.rangeTo = w.rangeTo;
      }
      state.exams.push(createdExam);
    }
    examsSeen = true;
    logAction((editing ? 'sửa lớp và lịch thi ' : 'tạo lịch, tổ chức buổi thi ') + name);
    ui.examWizard = null;
    ui.examId = examId;
    ui.examWeek = '';
    ui.formError = '';
    save();
    toast(editing ? 'Đã lưu lớp và lịch thi.' : 'Đã tạo đợt thi.');
    render();
  }

  function examListView() {
    var exams = state.exams || [];
    var cards = exams.length ? exams.map(function (exam) {
      var n = 0;
      (exam.entries || []).forEach(function (entry) { n += (entry.students || []).length; });
      return '<button type="button" class="folder group-ielts" data-act="open-exam" data-id="' + esc(exam.id) + '">' +
        '<strong>' + esc(exam.name) + '</strong>' +
        '<span>' + (exam.type === 'pick' ? 'Chọn lọc' : (exam.type === 'biannual' ? 'BI-ANNUAL' : 'Theo lớp')) + '</span>' +
        '<span>' + (exam.entries || []).length + ' lớp · ' + n + ' học viên</span></button>';
    }).join('') : '<p class="muted">Chưa có đợt thi.</p>';
    return shell('<div class="section-head"><div><span class="nav-pair"><button type="button" class="btn" data-act="nav" data-screen="menu">← Menu</button>' + homeButton() + '</span>' +
      '<h2>Kỳ thi</h2><p class="meta">Mục G</p></div><div class="btn-row">' +
      (canEdit() ? '<button type="button" class="btn btn-primary" data-act="exam-create">+ Tạo đợt thi</button>' : '') +
      '</div></div>' +
      '<p class="help">Mỗi đợt thi là một thư mục. Theo lớp lấy học viên chính thức và trial của các lớp được chọn. Chọn lọc thêm khoảng tuổi. Ngày thi chọn trên lịch tháng, có thể nhiều ngày. BI-ANNUAL lấy tiêu đề theo quý và năm tạo, mỗi lớp đúng hai buổi trong thời hạn: Paper test rồi Speaking test. Học bổng và học viên không thuộc hai nhóm đó được thêm sau bằng Thêm học viên test.</p>' +
      '<div class="folder-grid">' + cards + '</div>');
  }

  function examWizardView() {
    var w = ui.examWizard;
    var step = w.step || 0;
    var biannual = w.type === 'biannual';
    var body = '';
    if (step === 0) {
      if (biannual) {
        var quarter = EXAM_QUARTERS.indexOf(w.quarter) >= 0 ? w.quarter : 'I';
        body = examTypeSelect(w) +
          '<label class="field"><span>Quý</span><select id="exam-quarter">' +
          EXAM_QUARTERS.map(function (item) {
            return '<option value="' + item + '"' + (item === quarter ? ' selected' : '') + '>Quý ' + item + '</option>';
          }).join('') + '</select></label>' +
          '<div class="age-row"><label class="field"><span>Từ ngày</span><input id="exam-from" type="date" value="' + esc(w.rangeFrom || '') + '" required></label>' +
          '<label class="field"><span>Đến ngày</span><input id="exam-to" type="date" value="' + esc(w.rangeTo || '') + '" required></label></div>' +
          '<p class="exam-title-preview" id="exam-title-preview"><strong>' + esc(biannualTitle(quarter, examYearOf(w))) + '</strong></p>' +
          '<p class="help">Không nhập tên. Tiêu đề lấy theo quý và năm tạo đợt thi. Chọn quý và thời hạn từ ngày đến ngày.</p>';
      } else {
        body = '<label class="field"><span>Tên đợt thi</span><input id="exam-name" value="' + esc(w.name || '') + '" required></label>' +
          examTypeSelect(w) +
          '<p class="help">' + (w.editId
            ? 'Sửa tên nếu cần, rồi chọn lại lớp và ngày thi. Lớp còn giữ thì giữ nguyên điểm và đánh giá. Lớp bỏ khỏi đợt thi sẽ mất thẻ điểm của lớp đó.'
            : 'Xác nhận để sang bước chọn lớp. Thư mục chỉ được tạo sau bước chọn ngày thi.') + '</p>';
      }
    } else if (step === 1) {
      var classes = (state.classes || []).slice().sort(function (a, b) {
        return L.currentName(a).localeCompare(L.currentName(b), 'vi');
      });
      var age = w.type === 'pick'
        ? '<div class="age-row"><label class="field"><span>Từ tuổi</span><input id="exam-age-from" inputmode="numeric" value="' + esc(w.ageFrom || '') + '"></label>' +
          '<label class="field"><span>Tới tuổi</span><input id="exam-age-to" inputmode="numeric" value="' + esc(w.ageTo || '') + '"></label></div>' +
          '<p class="help">Để trống cả hai ô nếu không giới hạn tuổi. Điền một ô thì chỉ lấy đúng tuổi đó. Ví dụ từ 8 và tới để trống nghĩa là chỉ tuổi 8. Điền cả hai thì lấy khoảng đó, tính cả hai đầu.</p>'
        : '';
      var allBtn = biannual ? '<div class="btn-row"><button type="button" class="btn" data-act="exam-all">Chọn toàn bộ</button></div>' : '';
      body = age + allBtn + '<label class="field class-q"><span>Tìm lớp</span><input id="exam-class-q" placeholder="Tên lớp" autocomplete="off"></label>' +
        '<p class="field-label">Lớp tham gia</p><div class="pick-grid' + (biannual ? ' exam-pick-scroll' : '') + '" id="exam-class-picks">' +
        classes.map(function (cls) {
          var on = w.classIds[cls.id] ? ' checked' : '';
          return '<label class="pick-opt" data-name="' + esc(L.currentName(cls).toLowerCase()) + '"><input type="checkbox" data-exam-class="' + esc(cls.id) + '"' + on + '><span>' + esc(L.currentName(cls)) + '</span></label>';
        }).join('') + '</div>';
    } else if (biannual) {
      body = '<div class="exam-step3"><div class="exam-pick-col">' + biannualClassMenu(w) + '</div><div class="exam-board-col">' + biannualBoard(w) + '</div></div>';
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
    var editing = !!w.editId;
    var foot = '';
    if (step > 0) foot += '<button type="button" class="btn" data-act="exam-back">Quay lại</button>';
    foot += '<button type="button" class="btn" data-act="exam-cancel">Hủy</button>';
    if (step < 2) foot += '<button type="button" class="btn btn-primary" data-act="exam-next">' + (step === 0 ? 'Xác nhận' : 'Tiếp') + '</button>';
    else foot += '<button type="button" class="btn btn-primary" data-act="exam-commit">' + (editing ? 'Lưu lớp và lịch thi' : 'Tạo thư mục đợt thi') + '</button>';
    var meta = biannual
      ? (step === 0 ? 'Bước 1 · Quý và thời hạn' : (step === 1 ? 'Bước 2 · Chọn lớp' : 'Bước 3 · Lịch thi'))
      : (step === 0 ? 'Tên và loại' : ('Bước ' + step + ' / 2'));
    return shell('<div class="section-head"><div><span class="nav-pair"><button type="button" class="btn" data-act="exam-cancel">← Kỳ thi</button>' + homeButton() + '</span>' +
      '<h2>' + (editing ? 'Sửa đợt thi' : 'Tạo đợt thi') + '</h2><p class="meta">' + meta + '</p></div></div>' +
      '<section class="panel exam-panel">' + body + '<p class="form-error">' + esc(ui.formError) + '</p><div class="btn-row">' + foot + '</div></section>');
  }

  function examStudentRows(exam, entry) {
    var rows = entry.students || [];
    if (!rows.length) return '<p class="help">Chưa có học viên trong thẻ này.</p>';
    var head = '<div class="exam-score-head"><span>Không thi</span><span>Học viên</span><span>Mã</span><span>Điểm</span><span>Đánh giá</span></div>';
    return '<div class="exam-score-list">' + head + rows.map(function (stu) {
      var out = !!stu.out;
      var box = canEdit()
        ? '<label class="checkline exam-out"><input type="checkbox" data-exam-out data-exam="' + esc(exam.id) + '" data-entry="' + esc(entry.classId) + '" data-stu="' + esc(stu.studentId) + '"' + (out ? ' checked' : '') + '> Không thi</label>'
        : '<span>' + (out ? 'Không thi' : '') + '</span>';
      var who = '<span class="exam-score-who"><b>' + esc(stu.name || '—') + '</b>' +
        (stu.englishName ? '<small>' + esc(stu.englishName) + '</small>' : '') +
        (stu.extra ? ' <span class="tag">Test</span>' : '') + '</span>';
      var score = canEdit()
        ? '<input data-exam-score data-exam="' + esc(exam.id) + '" data-entry="' + esc(entry.classId) + '" data-stu="' + esc(stu.studentId) + '" value="' + esc(stu.score || '') + '"' + (out ? ' disabled' : '') + '>'
        : '<span>' + esc(stu.score || '—') + '</span>';
      var review = canEdit()
        ? '<input data-exam-review data-exam="' + esc(exam.id) + '" data-entry="' + esc(entry.classId) + '" data-stu="' + esc(stu.studentId) + '" value="' + esc(stu.review || '') + '"' + (out ? ' disabled' : '') + '>'
        : '<span>' + esc(stu.review || '—') + '</span>';
      return '<div class="exam-score-row' + (out ? ' is-out' : '') + '">' + box + who + '<span class="exam-score-code">' + esc(stu.code || '—') + '</span>' + score + review + '</div>';
    }).join('') + '</div>';
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

  var EXAM_SHIFTS = [
    { id: 'morning', label: 'Buổi sáng' },
    { id: 'noon', label: 'Buổi trưa' },
    { id: 'afternoon', label: 'Buổi chiều' },
    { id: 'evening', label: 'Buổi tối' }
  ];

  function examShiftId(start) {
    if (!start) return '';
    var bits = String(start).split(':');
    var mins = (Number(bits[0]) || 0) * 60 + (Number(bits[1]) || 0);
    if (mins < 11 * 60) return 'morning';
    if (mins < 13 * 60 + 30) return 'noon';
    if (mins < 17 * 60 + 30) return 'afternoon';
    return 'evening';
  }

  function examSessionOn(entry, iso) {
    var cls = findClass(entry.classId);
    var found = null;
    if (cls) {
      L.monthSessions(cls, iso.slice(0, 7)).forEach(function (ses) {
        if (!ses || ses.iso !== iso) return;
        if (!found || String(ses.start || '') < String(found.start || '')) found = ses;
      });
    }
    if (found) return found;
    var day = L.parseDateInput(iso);
    if (entry.slotStart) {
      return { iso: iso, start: entry.slotStart, end: entry.slotEnd || '', dow: day ? day.getDay() : entry.slotDow };
    }
    return { iso: iso, start: '', end: '', dow: day ? day.getDay() : '' };
  }

  function examFilterState() {
    var src = ui.examFilter || {};
    return { fet: src.fet || '', grade: src.grade || '', program: src.program || '' };
  }

  function examFilterOn() {
    var filter = examFilterState();
    return !!(filter.fet || filter.grade || filter.program);
  }

  function examNameHit(value, needle) {
    if (!needle) return true;
    if (value === needle) return true;
    var parts = String(value || '').split(',');
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].trim() === needle) return true;
    }
    return false;
  }

  function examProgramOf(cls) {
    if (!cls) return '';
    var level = L.currentLevel(cls);
    var grade = level ? L.gradeById(level.gradeId) : L.gradeById(cls.gradeId);
    return L.trackLabel(cls, grade) || 'Custom';
  }

  function examGradeKey(cls) {
    if (!cls) return '';
    var level = L.currentLevel(cls);
    var gradeId = (level && level.gradeId) || cls.gradeId || '';
    if (gradeId && L.gradeById(gradeId)) return gradeId;
    if (cls.customLevel) return 'custom:' + String(cls.customLevel);
    return '';
  }

  function examGradeLabel(key) {
    if (!key) return 'Chưa rõ cấp độ';
    if (String(key).indexOf('custom:') === 0) return String(key).slice(7);
    var grade = L.gradeById(key);
    return grade ? grade.label : String(key);
  }

  function examFilterSelect(label, key, options, value) {
    return '<label class="field filter-field"><span>' + esc(label) + '</span><select data-exam-filter="' + esc(key) + '"><option value="">Tất cả</option>' +
      options.map(function (item) {
        return '<option value="' + esc(item.id) + '"' + (item.id === value ? ' selected' : '') + '>' + esc(item.label) + '</option>';
      }).join('') + '</select></label>';
  }

  function examFilterBar(exam) {
    var filter = examFilterState();
    var fetSeen = {};
    var fetList = [];
    function addFet(name) {
      String(name || '').split(',').forEach(function (part) {
        var text = part.trim();
        if (!text || text === '?' || text === '-' || fetSeen[text]) return;
        fetSeen[text] = true;
        fetList.push(text);
      });
    }
    (L.FET || []).forEach(addFet);
    var gradeMap = {};
    var programMap = {};
    (exam.entries || []).forEach(function (entry) {
      var cls = findClass(entry.classId);
      L.classFetNames(cls).forEach(addFet);
      var gradeKey = examGradeKey(cls);
      if (gradeKey) gradeMap[gradeKey] = examGradeLabel(gradeKey);
      var program = examProgramOf(cls);
      if (program) programMap[program] = program;
    });
    if (filter.fet) addFet(filter.fet);
    if (filter.grade && !gradeMap[filter.grade]) gradeMap[filter.grade] = examGradeLabel(filter.grade);
    if (filter.program) programMap[filter.program] = filter.program;
    var grades = Object.keys(gradeMap).sort(function (a, b) {
      return L.gradeIndex(a) - L.gradeIndex(b) || String(gradeMap[a]).localeCompare(String(gradeMap[b]), 'vi');
    }).map(function (id) { return { id: id, label: gradeMap[id] }; });
    var programOrder = ['KINDY', 'KIDS', 'TEENS', 'IELTS', 'Custom'];
    var programs = programOrder.filter(function (id) { return programMap[id]; }).map(function (id) { return { id: id, label: id }; });
    Object.keys(programMap).sort(function (a, b) { return a.localeCompare(b, 'vi'); }).forEach(function (id) {
      if (programOrder.indexOf(id) < 0) programs.push({ id: id, label: id });
    });
    return '<div class="filter-bar exam-filter">' +
      examFilterSelect('Giáo viên FET', 'fet', fetList.map(function (name) { return { id: name, label: name }; }), filter.fet) +
      examFilterSelect('Cấp độ', 'grade', grades, filter.grade) +
      examFilterSelect('Chương trình', 'program', programs, filter.program) +
      '<button type="button" class="btn" data-act="exam-clear-filter">Bỏ lọc</button></div>' +
      '<p class="help">Lọc lịch thi theo giáo viên FET của buổi, cấp độ đang học và chương trình. Chương trình TEENS vẫn gồm lớp đã lên thang IELTS. Số lớp trong ngày chỉ tính các lớp đang hiện.</p>';
  }

  function examWeekDates(entry, mondayIso) {
    var dates = examDateList(entry);
    if (!mondayIso) return dates;
    var start = L.parseDateInput(mondayIso);
    if (!start) return [];
    var from = start.getTime();
    var end = L.addDays(start, 7).getTime();
    return dates.filter(function (iso) {
      var day = L.parseDateInput(iso);
      return day && day.getTime() >= from && day.getTime() < end;
    });
  }

  function examEntryMatches(entry, mondayIso, filter) {
    var cls = findClass(entry && entry.classId);
    if (filter.program && examProgramOf(cls) !== filter.program) return false;
    if (filter.grade && examGradeKey(cls) !== filter.grade) return false;
    var dates = examWeekDates(entry, mondayIso);
    if (!dates.length) return false;
    if (!filter.fet) return true;
    for (var i = 0; i < dates.length; i++) {
      var ses = examSessionOn(entry, dates[i]);
      var fet = cls ? L.sessionFetOf(cls, dates[i], ses.start || '') : '';
      if (examNameHit(fet, filter.fet)) return true;
    }
    return false;
  }

  function examWeekBoard(exam, mondayIso) {
    var start = L.parseDateInput(mondayIso);
    if (!start) return '';
    var dayMeta = L.DAYS.map(function (day, index) {
      var date = L.addDays(start, index);
      return { day: day, date: date, iso: L.isoDay(date) };
    });
    var chips = [];
    (exam.entries || []).forEach(function (entry) {
      if (!entry) return;
      var dates = examDateList(entry);
      dayMeta.forEach(function (item) {
        if (dates.indexOf(item.iso) < 0) return;
        var ses = examSessionOn(entry, item.iso);
        var cls = findClass(entry.classId);
        var tag = entry.sessionTags && entry.sessionTags[item.iso] ? entry.sessionTags[item.iso] : '';
        chips.push({
          iso: item.iso,
          dow: ses.dow,
          start: ses.start || '',
          end: ses.end || '',
          band: examShiftId(ses.start),
          name: entry.className || (cls ? L.currentName(cls) : 'Lớp'),
          tag: tag,
          group: String(classGroupId(cls) || 'custom').toLowerCase(),
          classId: entry.classId,
          fet: cls ? L.sessionFetOf(cls, item.iso, ses.start || '') : '',
          grade: examGradeKey(cls),
          program: examProgramOf(cls)
        });
      });
    });
    var examFilter = examFilterState();
    chips = chips.filter(function (chip) {
      if (examFilter.program && chip.program !== examFilter.program) return false;
      if (examFilter.grade && chip.grade !== examFilter.grade) return false;
      if (examFilter.fet && !examNameHit(chip.fet, examFilter.fet)) return false;
      return true;
    });
    function minutesOfText(value) {
      var bits = String(value || '0:0').split(':');
      return (Number(bits[0]) || 0) * 60 + (Number(bits[1]) || 0);
    }
    var head = '<tr><th>Khung giờ</th>' + dayMeta.map(function (item) {
      return '<th>' + esc(item.day.short) + '<br><small>' + esc(L.formatDMY(item.date)) + '</small></th>';
    }).join('') + '</tr>';
    function bandBody(bandId, label) {
      var html = '<tr class="band-row band-' + bandId + '"><td colspan="8">' + esc(label) + '</td></tr>';
      var bandChips = chips.filter(function (chip) { return chip.band === bandId; });
      if (!bandChips.length) return html + '<tr class="gap-row"><td colspan="8">Không có lớp</td></tr>';
      var rowMap = {};
      var rowKeys = [];
      bandChips.forEach(function (chip) {
        var key = chip.start + '|' + chip.end;
        if (!rowMap[key]) {
          rowMap[key] = { start: chip.start, end: chip.end, cells: {} };
          rowKeys.push(key);
        }
        var dow = chip.dow;
        if (!rowMap[key].cells[dow]) rowMap[key].cells[dow] = [];
        rowMap[key].cells[dow].push(chip);
      });
      rowKeys.sort(function (a, b) { return minutesOfText(rowMap[a].start) - minutesOfText(rowMap[b].start); });
      return html + rowKeys.map(function (key) {
        var row = rowMap[key];
        var time = row.start ? esc(L.formatTimeValue(row.start)) + '<br>–<br>' + esc(L.formatTimeValue(row.end)) : '—';
        return '<tr><th class="time-cell">' + time + '</th>' + dayMeta.map(function (item) {
          var cards = (row.cells[item.day.dow] || []).filter(function (chip) { return chip.iso === item.iso; }).map(function (chip) {
            var tag = chip.tag ? '<small class="tt-tag">' + esc(chip.tag) + '</small>' : '';
            return '<div class="tt-card tt-exam group-' + esc(chip.group) + '" data-exam-class="' + esc(chip.classId) + '" data-exam-iso="' + esc(chip.iso) + '" data-exam-dow="' + esc(chip.dow) + '" data-exam-fet="' + esc(chip.fet) + '" data-exam-grade="' + esc(chip.grade) + '" data-exam-program="' + esc(chip.program) + '"><strong>' + esc(chip.name) + '</strong>' + tag + '</div>';
          }).join('');
          return '<td>' + cards + '</td>';
        }).join('') + '</tr>';
      }).join('');
    }
    var body = EXAM_SHIFTS.map(function (shift) { return bandBody(shift.id, shift.label); }).join('');
    var loose = chips.filter(function (chip) { return !chip.band; });
    if (loose.length) {
      body += '<tr class="gap-row"><td colspan="8">Chưa rõ giờ</td></tr><tr><th class="time-cell">—</th>' + dayMeta.map(function (item) {
        var cards = loose.filter(function (chip) { return chip.iso === item.iso; }).map(function (chip) {
          var tag = chip.tag ? '<small class="tt-tag">' + esc(chip.tag) + '</small>' : '';
          return '<div class="tt-card tt-exam group-' + esc(chip.group) + '" data-exam-class="' + esc(chip.classId) + '" data-exam-iso="' + esc(chip.iso) + '" data-exam-dow="' + esc(chip.dow) + '" data-exam-fet="' + esc(chip.fet) + '" data-exam-grade="' + esc(chip.grade) + '" data-exam-program="' + esc(chip.program) + '"><strong>' + esc(chip.name) + '</strong>' + tag + '</div>';
        }).join('');
        return '<td>' + cards + '</td>';
      }).join('') + '</tr>';
    }
    var counts = dayMeta.map(function (item) {
      var ids = {};
      chips.forEach(function (chip) { if (chip.iso === item.iso) ids[chip.classId] = true; });
      var n = Object.keys(ids).length;
      return '<td class="' + examLoadTone(n) + '">' + n + '</td>';
    }).join('');
    return '<div class="grid-scroll exam-board-week"><table class="timetable exam-board"><thead>' + head + '</thead><tbody>' + body +
      '<tr class="exam-load-row"><th>Số lớp</th>' + counts + '</tr></tbody></table></div>' +
      '<p class="help exam-load-legend">Số lớp trong ngày: 3 trở xuống xanh, 4–6 vàng, từ 7 đỏ. 3 lớp tính xanh, 6 lớp tính vàng.</p>';
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
    if (exam.type === 'biannual') {
      var fromText = exam.rangeFrom ? L.formatDMY(L.parseDateInput(exam.rangeFrom)) : '…';
      var toText = exam.rangeTo ? L.formatDMY(L.parseDateInput(exam.rangeTo)) : '…';
      age = '<p class="meta">Thời hạn: ' + esc(fromText) + ' – ' + esc(toText) + '</p>';
    }
    var typeLabel = exam.type === 'pick' ? 'Chọn lọc' : (exam.type === 'biannual' ? 'BI-ANNUAL' : 'Theo lớp');
    var filter = examFilterState();
    var chips = weeks.length ? '<div class="week-picks">' + weeks.map(function (iso) {
      var on = iso === week ? ' is-on' : '';
      return '<button type="button" class="btn' + on + '" data-act="exam-week" data-week="' + esc(iso) + '">Tuần ' + esc(L.formatDMY(L.parseDateInput(iso))) + '</button>';
    }).join('') + '</div>' + examFilterBar(exam) + examWeekBoard(exam, week) : '<p class="help">Chưa có ngày thi.</p>';
    var shown = (exam.entries || []).filter(function (entry) {
      if (week && !entryTouchesWeek(entry, week)) return false;
      if (week && examFilterOn() && !examEntryMatches(entry, week, filter)) return false;
      return true;
    });
    var cards = shown.map(function (entry) {
      var dates = examDateList(entry).map(function (iso) {
        var label = L.formatDMY(L.parseDateInput(iso));
        var tag = entry.sessionTags && entry.sessionTags[iso];
        return tag ? label + ' (' + tag + ')' : label;
      }).join(', ');
      var students = entry.students || [];
      var outCount = students.filter(function (stu) { return stu && stu.out; }).length;
      var extra = canEdit()
        ? '<label class="field"><span>Thêm học viên test</span><input data-exam-extra data-entry="' + esc(entry.classId) + '" placeholder="Tên hoặc mã trong lớp" autocomplete="off"></label>' +
          '<div class="rejoin-list" id="extra-' + esc(entry.classId) + '"></div>'
        : '';
      var open = ui.examFolds && ui.examFolds[entry.classId] ? ' open' : '';
      return '<details class="exam-score-fold"' + open + ' data-entry="' + esc(entry.classId) + '"><summary><strong>' + esc(entry.className || 'Lớp') + '</strong><span>' +
        students.length + ' học viên' + (outCount ? ' · ' + outCount + ' không thi' : '') + ' · ' + esc(dates || 'Chưa có ngày') + '</span></summary>' +
        '<p class="meta">' + esc(slotLabel(entry.slotDow, entry.slotStart, entry.slotEnd)) + '</p>' +
        examStudentRows(exam, entry) + extra + '</details>';
    }).join('') || (week && examFilterOn() ? '<p class="muted">Không có lớp khớp bộ lọc.</p>' : '');
    return shell('<div class="section-head"><div><span class="nav-pair"><button type="button" class="btn" data-act="exam-list">← Kỳ thi</button>' + homeButton() + '</span>' +
      '<h2>' + esc(exam.name) + '</h2><p class="meta">' + typeLabel + '</p>' + age + '</div></div>' +
      '<p class="help">Lịch trong thư mục xếp theo buổi sáng, trưa, chiều và tối. Lọc theo giáo viên FET, cấp độ và chương trình. Thẻ là lớp có buổi thi trong ngày. Danh sách điểm nằm gọn bên dưới, bấm tên lớp để mở.</p>' +
      (canEdit() ? '<div class="btn-row"><button type="button" class="btn" data-act="exam-edit">Sửa lớp và lịch thi</button></div>' : '<p class="help">Tài khoản này chỉ xem điểm và đánh giá.</p>') +
      chips + cards);
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
        if (patch.out === true) { stu.out = true; return; }
        if (patch.out === false) { delete stu.out; return; }
        if (stu.out) return;
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

  function bookStatusClass(id) {
    if (id === 'issued-paid') return 'book-issued-paid';
    if (id === 'issued-unpaid') return 'book-issued-unpaid';
    return 'book-not-bought';
  }

  function bookStatusOptions(selected) {
    return L.BOOK_STATUS.map(function (item) {
      return '<option class="' + bookStatusClass(item.id) + '" value="' + item.id + '"' + (selected === item.id ? ' selected' : '') + '>' + esc(item.label) + '</option>';
    }).join('');
  }

  function bookStatusView(id) {
    return '<span class="book-pick ' + bookStatusClass(id) + '">' + esc(bookStatusLabel(id)) + '</span>';
  }

  function levelBookNames(cls, level) {
    var books = L.classLevelBooks(cls, level);
    if (!books.length) return '?';
    return books.map(function (book) { return book.name; }).join(' · ');
  }

  function levelOptionLabel(level, cls) {
    var grade = L.gradeById(level && level.gradeId);
    var book = cls ? levelBookNames(cls, level) : L.curriculumName(grade);
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
    var books = (current.books || []).map(function (item) {
      return { status: item.status, statusAt: item.statusAt || '' };
    });
    while (books.length < 2) books.push({ status: 'not-bought', statusAt: '' });
    var stamp = new Date().toISOString();
    function put(index, status) {
      if (isNaN(index) || index < 0 || index > 5) return;
      while (books.length <= index) books.push({ status: 'not-bought', statusAt: '' });
      var prev = books[index];
      books[index] = {
        status: status,
        statusAt: status === prev.status ? (prev.statusAt || '') : stamp
      };
    }
    if (patch && Array.isArray(patch.books)) {
      patch.books.forEach(function (item, index) {
        if (item && item.status != null) put(index, item.status);
      });
    } else if (patch && patch.bookIndex != null && patch.bookStatus != null) {
      put(Number(patch.bookIndex), patch.bookStatus);
    } else if (patch && patch.bookStatus != null) {
      put(0, patch.bookStatus);
    }
    var next = L.normalizeBook({
      books: books,
      bookStatus: books[0].status,
      bookStatusAt: books[0].statusAt,
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

  function curriculumMonthKey() {
    return ui.curriculumMonth || L.monthKey(new Date());
  }

  function priceBoardHtml() {
    var rows = [
      ['Little Learning Star', L.curriculumBooks('pre-kindy-a')[0].price],
      ['Disney', L.curriculumBooks('kindy-1a')[0].price],
      ['English Code starter', L.curriculumBooks('pre-kids-a')[0].price],
      ['English Code', L.curriculumBooks('kids-1a')[0].price],
      ['FOCUS Coursebook', L.curriculumBooks('teens-1a')[0].price],
      ['FOCUS Workbook', L.curriculumBooks('teens-1a')[1].price],
      ['Focus on IELTS', L.curriculumBooks('pre-ielts')[0].price],
      ['Focus on IELTS Foundation Coursebook', L.curriculumBooks('ielts-40')[0].price],
      ['IELTS Expert 4.5 – 8.0', L.curriculumBooks('ielts-45')[0].price]
    ];
    return '<section class="price-board"><h3>Bảng giá giáo trình</h3>' +
      '<div class="table-wrap"><table class="book-stats-table"><thead><tr><th>Giáo trình</th><th>Đơn giá</th></tr></thead><tbody>' +
      rows.map(function (row) {
        return '<tr><td>' + esc(row[0]) + '</td><td>' + esc(L.formatVnd(row[1])) + '</td></tr>';
      }).join('') + '</tbody></table></div>' +
      '<p class="help">FOCUS TEENS có hai quyển: Coursebook và Workbook. IELTS 4.0 dùng Focus on IELTS Foundation Coursebook. IELTS 4.5 đến 8.0 dùng IELTS Expert theo cấp độ.</p></section>';
  }

  function curriculumStatsHtml() {
    var key = curriculumMonthKey();
    var stats = L.curriculumMonthStats(state.classes, key);
    var body = '<table class="book-stats-table" id="book-sales"><thead><tr><th>Chỉ số</th><th>Số</th></tr></thead><tbody>' +
      '<tr><td>Số sách đã đóng phát trong tháng</td><td data-sale="paid-count">' + stats.soldBooks + '</td></tr>' +
      '<tr><td>Số sách còn nợ</td><td data-sale="debt-count">' + stats.debtBooks + '</td></tr>' +
      '<tr><td>Tổng doanh số đã đóng phát trong tháng</td><td data-sale="paid-money">' + esc(L.formatVnd(stats.revenue)) + '</td></tr>' +
      '<tr><td>Doanh số sách còn nợ chưa thanh toán</td><td data-sale="debt-money">' + esc(L.formatVnd(stats.debtRevenue)) + '</td></tr>' +
      '</tbody></table>';
    var cm = '';
    if (ui.curriculumCmOpen) {
      var cmRows = stats.cms.map(function (row) {
        return '<tr><td>' + esc(row.cm) + '</td><td>' + row.soldBooks + '</td><td>' + esc(L.formatVnd(row.revenue)) + '</td><td>' + row.debtBooks + '</td><td>' + esc(L.formatVnd(row.debtRevenue)) + '</td></tr>';
      }).join('');
      cm = '<div class="table-wrap"><table class="book-stats-table" id="book-sales-cm"><thead><tr><th>CM</th><th>Sách đã đóng phát</th><th>Doanh số đã đóng</th><th>Sách còn nợ</th><th>Doanh số còn nợ</th></tr></thead><tbody>' +
        (cmRows || '<tr><td colspan="5">Chưa có CM.</td></tr>') + '</tbody></table></div>';
    }
    return '<section class="book-stats"><h3>Doanh số bán sách chung</h3>' +
      '<label class="field dash-month"><span>Tháng</span><input id="curriculum-month" type="month" value="' + esc(key) + '"></label>' +
      '<p class="help">Số sách đã đóng phát và doanh số đã đóng chỉ tính sách chuyển sang Đã phát và đóng trong tháng đang xem. Sách chưa ghi ngày không cộng vào tháng đó. Số sách còn nợ và doanh số còn nợ là sách đang ở Đã phát-Chưa thanh toán, kể cả sách chưa ghi ngày.</p>' +
      '<div class="book-stats-hit" data-act="curriculum-cm" role="button" tabindex="0">' + body + '</div>' +
      '<div class="btn-row"><button type="button" class="btn' + (ui.curriculumCmOpen ? ' btn-primary' : '') + '" data-act="curriculum-cm">' +
      (ui.curriculumCmOpen ? 'Ẩn chi tiết theo CM' : 'Xem chi tiết theo CM') + '</button></div>' +
      cm + '</section>';
  }

  function viewCurriculumList() {
    return shell('<div class="section-head"><div><span class="nav-pair"><button type="button" class="btn" data-act="nav" data-screen="menu">← Menu</button>' + homeButton() + '</span>' +
      '<h2>Xác nhận giáo trình</h2><p class="meta">Mục F</p></div></div>' +
      '<p class="help">Danh sách lớp giống Mục A: dạng thẻ theo nhóm KINDY, KIDS, TEENS, IELTS và custom, hoặc dạng list theo trình độ hay số lớp. Khung giữ màu của từng loại lớp. Bấm thư mục để mở giáo trình của lớp.</p>' +
      priceBoardHtml() + curriculumStatsHtml() + classBrowser('curriculum') + modalHtml());
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

  function pastBookEditor(cls, level, edit) {
    if (!edit || !level || !level.to) return '';
    var key = L.levelKey(level);
    if (ui.pastBookEdit !== key) {
      return '<div class="btn-row"><button type="button" class="btn" data-act="past-book-open">Sửa giáo trình cấp cũ</button></div>';
    }
    var draft = ui.pastBookDraft || [];
    var rows = draft.map(function (book, index) {
      return '<div class="past-book-row"><label class="field"><span>Tên sách</span><input data-past-name="' + index + '" maxlength="80" value="' + esc(book.name || '') + '"></label>' +
        '<label class="field"><span>Giá</span><input data-past-price="' + index + '" inputmode="numeric" value="' + esc(book.price == null ? '' : book.price) + '"></label>' +
        '<button type="button" class="btn" data-act="past-book-remove" data-index="' + index + '">Bỏ</button></div>';
    }).join('');
    return '<section class="past-books" id="past-books"><h3>Giáo trình trình độ cũ</h3>' +
      '<p class="help">Thêm hoặc sửa tên và giá sách của cấp độ này. Cấp đang học vẫn dùng giáo trình chuẩn. Hủy không ghi vào sổ.</p>' +
      rows +
      '<div class="btn-row"><button type="button" class="btn" data-act="past-book-add"' + (draft.length >= 6 ? ' disabled' : '') + '>Thêm sách</button>' +
      '<button type="button" class="btn btn-primary" data-act="past-book-save">Lưu giáo trình</button>' +
      '<button type="button" class="btn" data-act="past-book-standard">Dùng giáo trình chuẩn</button>' +
      '<button type="button" class="btn" data-act="past-book-cancel">Hủy</button></div></section>';
  }

  function readPastDraft() {
    var rows = [];
    document.querySelectorAll('[data-past-name]').forEach(function (input) {
      var index = input.getAttribute('data-past-name');
      var priceEl = document.querySelector('[data-past-price="' + index + '"]');
      rows.push({
        name: String(input.value || '').trim(),
        price: String(priceEl ? priceEl.value : '').replace(/[^\d]/g, '')
      });
    });
    return rows;
  }

  function closePastBooks() {
    ui.pastBookEdit = '';
    ui.pastBookDraft = null;
  }

  function savePastBooks() {
    if (!canEdit()) return;
    var cls = findClass(ui.curriculumId);
    var level = cls ? curriculumLevelOf(cls) : null;
    if (!cls || !level || !level.to) return;
    var rows = readPastDraft().filter(function (row) { return row.name; }).slice(0, 6).map(function (row) {
      return { name: row.name.slice(0, 80), price: Math.max(0, Math.round(Number(row.price) || 0)) };
    });
    if (!rows.length) { toast('Nhập ít nhất một tên sách.'); return; }
    if (!cls.levelBooks || typeof cls.levelBooks !== 'object' || Array.isArray(cls.levelBooks)) cls.levelBooks = {};
    cls.levelBooks[L.levelKey(level)] = rows;
    closePastBooks();
    save();
    toast('Đã lưu giáo trình cấp độ cũ.');
    render();
  }

  function resetPastBooks() {
    if (!canEdit()) return;
    var cls = findClass(ui.curriculumId);
    var level = cls ? curriculumLevelOf(cls) : null;
    if (!cls || !level || !level.to || !cls.levelBooks) { closePastBooks(); render(); return; }
    delete cls.levelBooks[L.levelKey(level)];
    if (!Object.keys(cls.levelBooks).length) delete cls.levelBooks;
    closePastBooks();
    save();
    toast('Cấp độ này dùng lại giáo trình chuẩn.');
    render();
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
      return '<option value="' + esc(key) + '"' + (key === ui.curriculumLevel ? ' selected' : '') + '>' + esc(levelOptionLabel(item, cls)) + '</option>';
    }).join('');
    var active = [];
    var paused = [];
    (cls.students || []).forEach(function (stu) {
      if (isPausedStudent(stu)) paused.push(stu);
      else active.push(stu);
    });
    var ordered = L.sortStudents(active, 'name').concat(L.sortStudents(paused, 'name'));
    var catalog = L.classLevelBooks(cls, level);
    var showSlots = catalog.length > 2 ? Math.min(catalog.length, 6) : 2;
    var bookHeads = '';
    for (var slot = 0; slot < showSlots; slot++) bookHeads += '<th>Giáo trình</th>';
    var cols = (edit ? 1 : 0) + 7 + showSlots;
    var rows = ordered.map(function (stu, index) {
      var rec = L.bookOf(stu, level);
      var tick = edit
        ? '<td><input type="checkbox" data-book-pick="' + esc(stu.id) + '"' + (ui.bookPick[stu.id] ? ' checked' : '') + ' aria-label="Chọn ' + esc(stu.name || '') + '"></td>'
        : '';
      var slots = '';
      for (var s = 0; s < showSlots; s++) slots += bookSlotCell(stu, catalog[s] || null, s, rec, edit);
      return '<tr' + (isPausedStudent(stu) ? ' class="row-gray"' : '') + '>' + tick +
        '<td>' + (index + 1) + '</td><td>' + esc(showText(stu.name)) + '</td><td>' + esc(showText(stu.englishName)) + '</td><td>' + esc(showText(stu.code)) + '</td>' +
        slots +
        '<td class="book-prices">' + bookPriceHtml(catalog, rec) + '</td>' +
        curriculumPecCells(stu, rec, edit) + '</tr>';
    }).join('');
    var priceLine = catalog.length
      ? catalog.map(function (book) { return book.name + ' ' + L.formatVnd(book.price); }).join(' · ')
      : 'Chưa có giá';
    var pastNote = level && level.to
      ? '<p class="help">Đang xem cấp độ cũ. Giáo trình của cấp này là ' + esc(levelBookNames(cls, level)) + '. Giá: ' + esc(priceLine) + '. Admin bổ sung hoặc sửa giáo trình của giai đoạn này, và vẫn sửa dữ liệu sách, PEC mà không đổi cấp đang học.</p>'
      : '<p class="help">Giáo trình hiện tại là ' + esc(levelBookNames(cls, level)) + '. Giá: ' + esc(priceLine) + '. Chọn cấp độ cũ trong danh sách để xem lại giáo trình và dữ liệu sách, PEC của giai đoạn đó.</p>';
    var send = edit
      ? '<div class="btn-row"><button type="button" class="btn btn-primary" data-act="book-message">Gửi tin nhắn</button></div>' +
        '<p class="help">Tick một hoặc nhiều học viên, rồi bấm Gửi tin nhắn để lấy nội dung đăng ký sách. Bút copy giữ xuống dòng khi dán.</p>'
      : '<p class="help">Tài khoản này chỉ xem. Admin mới sửa trạng thái mua sách và PEC.</p>';
    return shell('<div class="section-head"><div><span class="nav-pair"><button type="button" class="btn" data-act="curriculum-back">← Danh sách giáo trình</button>' + homeButton() + '</span>' +
      '<h2>' + esc(L.currentName(cls)) + '</h2><p class="meta">' + esc(gradeText(grade, cls)) + ' · ' + esc(levelBookNames(cls, level)) + '</p>' +
      '<p class="meta" id="curriculum-ratio">' + esc(ratioText(curriculumRatio(cls, level))) + '</p></div></div>' +
      '<label class="field filter-field"><span>Cấp độ và giáo trình</span><select id="curriculum-level">' + options + '</select></label>' +
      pastNote + pastBookEditor(cls, level, edit) + send +
      '<div class="table-wrap"><table class="curriculum-table"><thead><tr>' +
      (edit ? '<th></th>' : '') +
      '<th>STT</th><th>Học viên</th><th>Tên tiếng Anh</th><th>Mã học viên</th>' + bookHeads + '<th>Giá</th><th>Tài khoản PEC</th><th>Mật khẩu PEC</th></tr></thead><tbody>' +
      (rows || '<tr><td colspan="' + cols + '">Lớp chưa có học viên.</td></tr>') + '</tbody></table></div>' + modalHtml());
  }

  function bookSlotCell(stu, book, slot, rec, edit) {
    if (!book) return '<td class="book-slot book-slot-empty"></td>';
    var item = rec.books && rec.books[slot] ? rec.books[slot] : { status: 'not-bought' };
    var open = ui.bookFold === stu.id + ':' + slot;
    var arrow = edit
      ? '<button type="button" class="book-arrow" data-act="book-fold" data-id="' + esc(stu.id) + '" data-slot="' + slot + '" aria-expanded="' + (open ? 'true' : 'false') + '" aria-label="Trạng thái thanh toán"><span class="chev"></span></button>'
      : '';
    var menu = open && edit
      ? '<div class="book-menu">' + L.BOOK_STATUS.map(function (choice) {
        return '<button type="button" class="btn book-choice ' + bookStatusClass(choice.id) + (choice.id === item.status ? ' is-on' : '') + '" data-act="book-set" data-id="' + esc(stu.id) + '" data-slot="' + slot + '" data-status="' + choice.id + '">' + esc(choice.label) + '</button>';
      }).join('') + '</div>'
      : '';
    return '<td class="book-slot ' + bookStatusClass(item.status) + '"><div class="book-slot-head"><span>' + esc(book.name) + '</span>' + arrow + '</div>' + menu + '</td>';
  }

  function bookPriceHtml(catalog, rec) {
    if (!catalog.length) return '<span class="book-price">—</span>';
    return catalog.map(function (book, index) {
      var item = rec.books && rec.books[index] ? rec.books[index] : { status: 'not-bought' };
      var tone = item.status === 'issued-paid' ? ' is-paid' : (item.status === 'issued-unpaid' ? ' is-unpaid' : '');
      return '<span class="book-price' + tone + '">' + esc(L.formatVnd(book.price)) + '</span>';
    }).join('');
  }

  function detailBookFields(bookRec, bookGrade, edit) {
    var catalog = L.curriculumBooks(bookGrade);
    if (!catalog.length) {
      return edit
        ? '<p class="help">Cấp độ này chưa có giáo trình.</p>'
        : '<br><b>Giáo trình:</b> ?';
    }
    if (!edit) {
      return catalog.map(function (book, index) {
        var item = bookRec.books && bookRec.books[index] ? bookRec.books[index] : { status: 'not-bought' };
        var tone = item.status === 'issued-paid' ? ' is-paid' : (item.status === 'issued-unpaid' ? ' is-unpaid' : '');
        return '<br><b>' + esc(book.name) + ':</b> ' + bookStatusView(item.status) +
          ' <span class="book-price' + tone + '">' + esc(L.formatVnd(book.price)) + '</span>';
      }).join('');
    }
    return '<p class="help">Giáo trình hiện tại: ' + esc(catalog.map(function (book) { return book.name; }).join(' · ')) + '. Cấp độ cũ sửa ở mục Xác nhận giáo trình.</p>' +
      catalog.map(function (book, index) {
        var item = bookRec.books && bookRec.books[index] ? bookRec.books[index] : { status: 'not-bought' };
        var id = index === 0 ? 'd-book' : 'd-book-2';
        return '<label class="field"><span>' + esc(book.name) + ' · ' + esc(L.formatVnd(book.price)) + '</span><select id="' + id + '" class="book-pick ' + bookStatusClass(item.status) + '">' + bookStatusOptions(item.status) + '</select></label>';
      }).join('');
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

  function classUpdatedMark(cls) {
    if (!L.classJustUpdated(cls, new Date())) return '';
    return '<span class="comic-updated">(Updated)</span>';
  }

  function folderCard(cls, now, mode) {
    var level = displayLevel(cls, now, mode);
    var grade = L.gradeById(level.gradeId || cls.gradeId);
    var progress = L.progressOf(cls, now);
    var count = listedCount(cls, now);
    var pct = progress.total ? Math.round(progress.done / progress.total * 100) : 0;
    var act = mode === 'homework' ? 'open-homework' : (mode === 'curriculum' ? 'open-curriculum' : (mode === 'care' ? 'open-care' : (mode === 'remarks' ? 'open-remarks' : 'open-class')));
    var name = mode === 'homework' ? ((level && level.name) || L.currentName(cls)) : L.currentName(cls);
    var held = mode === 'homework' && name !== L.currentName(cls) ? '<span>Tháng này giữ trình độ cũ</span>' : '';
    var extra = mode === 'homework'
      ? '<span>Chuyên cần tháng: ' + percentText(classMonthRate(cls, now)) + '</span>'
      : (cls.completed ? '<span class="done-flag">Đã hoàn thành</span>' : '<span>' + (cls.schedule || []).length + ' buổi/tuần · ' + progress.done + '/' + progress.total + ' lesson</span>');
    var group = classGroupId(cls, level);
    var crowd = count > 17
      ? '<span class="crowd">!<span class="crowd-tip">Lớp quá tải</span></span>'
      : '';
    var updated = mode === 'homework' ? '' : classUpdatedMark(cls);
    var button = '<button type="button" class="folder group-' + esc(group.toLowerCase()) + '" data-act="' + act + '" data-id="' + esc(cls.id) + '">' +
      updated +
      crowd +
      '<strong>' + esc(name) + '</strong>' +
      '<span>' + esc(kindLabel(cls)) + '</span>' +
      '<span>Trình độ: ' + esc(L.trackLabel(cls, grade)) + '</span>' +
      '<span>Cấp độ: ' + esc(gradeText(grade, cls)) + '</span>' +
      (cls.classCode ? '<span>Mã lớp: ' + esc(cls.classCode) + '</span>' : '') +
      '<span>Sĩ số: ' + count + '</span>' +
      '<span>Bắt đầu: ' + esc(L.formatDMY(progress.start)) + '</span>' +
      '<span>Kết thúc: ' + esc(endLabel(cls, progress)) + '</span>' +
      held + extra +
      '<span class="meter" aria-hidden="true"><span style="width:' + pct + '%"></span></span></button>';
    if (mode === 'homework') return button;
    var side = (mode === 'curriculum' || mode === 'care' || mode === 'remarks') ? '' : '<button type="button" class="btn folder-hw" data-act="open-homework" data-id="' + esc(cls.id) + '">Xem chuyên cần</button>';
    return '<div class="folder-item" data-name="' + esc(String(name).toLowerCase()) + '">' + button + side + '</div>';
  }

  function classLine(cls, mode) {
    var level = L.currentLevel(cls);
    var grade = L.gradeById((level && level.gradeId) || cls.gradeId);
    var group = classGroupId(cls, level);
    var name = L.currentName(cls);
    var act = mode === 'curriculum' ? 'open-curriculum' : (mode === 'care' ? 'open-care' : (mode === 'remarks' ? 'open-remarks' : 'open-class'));
    var side = (mode === 'curriculum' || mode === 'care' || mode === 'remarks') ? '' : '<button type="button" class="btn" data-act="open-homework" data-id="' + esc(cls.id) + '">Xem chuyên cần</button>';
    return '<div class="class-line group-' + esc(String(group || '').toLowerCase()) + '" data-name="' + esc(name.toLowerCase()) + '">' +
      '<button type="button" class="class-open" data-act="' + act + '" data-id="' + esc(cls.id) + '">' +
      '<strong>' + esc(name) + classUpdatedMark(cls) + '</strong>' +
      '<span>Trình độ: ' + esc(L.trackLabel(cls, grade)) + '</span>' +
      (cls.classCode ? '<span>Mã lớp: ' + esc(cls.classCode) + '</span>' : '') +
      '<span>Số lớp: ' + esc(cls.number || '—') + '</span>' +
      '<span>Cấp độ: ' + esc(gradeText(grade, cls)) + '</span></button>' +
      side + '</div>';
  }

  function browserUi(mode) {
    if (mode === 'curriculum') return { layout: ui.curriculumLayout, sort: ui.curriculumSort, query: ui.curriculumQuery, layoutAct: 'curriculum-layout', sortAct: 'curriculum-sort', queryId: 'curriculum-q', card: 'curriculum' };
    if (mode === 'care') return { layout: ui.careLayout, sort: ui.careSort, query: ui.careQuery, layoutAct: 'care-layout', sortAct: 'care-sort', queryId: 'care-q', card: 'care' };
    if (mode === 'remarks') return { layout: ui.remarkLayout, sort: ui.remarkSort, query: ui.remarkQuery, layoutAct: 'remark-layout', sortAct: 'remark-sort', queryId: 'remark-q', card: 'remarks' };
    return { layout: ui.classLayout, sort: ui.classSort, query: ui.classQuery, layoutAct: 'class-layout', sortAct: 'class-sort', queryId: 'class-q', card: undefined };
  }

  function classBrowser(mode) {
    var now = new Date();
    var spec = browserUi(mode);
    var layout = spec.layout === 'list' ? 'list' : 'cards';
    var sort = spec.sort === 'number' ? 'number' : 'level';
    var query = String(spec.query || '').trim().toLowerCase();
    var cardMode = spec.card;
    function matches(cls) {
      if (!query) return true;
      return L.currentName(cls).toLowerCase().indexOf(query) >= 0;
    }
    function bySort(a, b) {
      var gradeGap = L.gradeIndex(a.gradeId) - L.gradeIndex(b.gradeId);
      var numberGap = (Number(a.number) || 0) - (Number(b.number) || 0);
      var nameGap = L.currentName(a).localeCompare(L.currentName(b), 'vi');
      if (sort === 'number') return numberGap || gradeGap || nameGap;
      return gradeGap || numberGap || nameGap;
    }
    var blocks = L.GROUPS.map(function (group) {
      var list = state.classes.filter(function (cls) {
        return classGroupId(cls, L.currentLevel(cls)) === group.id;
      }).sort(function (a, b) {
        if (group.id === 'CUSTOM') return L.currentName(a).localeCompare(L.currentName(b), 'vi');
        return L.gradeIndex(a.gradeId) - L.gradeIndex(b.gradeId) || a.number - b.number;
      });
      var cards = list.filter(matches);
      var cardHtml = cards.length ? cards.map(function (cls) { return folderCard(cls, now, cardMode); }).join('') : '<p class="muted">Chưa có lớp trong nhóm này.</p>';
      return '<section class="group-block group-' + group.id.toLowerCase() + '"><h3>' + esc(group.label) + '</h3><div class="folder-grid">' + cardHtml + '</div></section>';
    }).join('');
    var knownGroup = {};
    L.GROUPS.forEach(function (group) { knownGroup[group.id] = true; });
    var loose = state.classes.filter(function (cls) {
      return !knownGroup[classGroupId(cls, L.currentLevel(cls))];
    }).sort(function (a, b) {
      return L.currentName(a).localeCompare(L.currentName(b), 'vi');
    });
    if (loose.length) {
      var looseCards = loose.filter(matches);
      blocks += '<section class="group-block group-custom"><h3>Lớp chưa vào nhóm</h3><div class="folder-grid">' +
        (looseCards.length ? looseCards.map(function (cls) { return folderCard(cls, now, cardMode); }).join('') : '<p class="muted">Không có lớp khớp bộ lọc.</p>') +
        '</div></section>';
    }
    var listRows = state.classes.filter(matches).slice().sort(bySort).map(function (cls) { return classLine(cls, cardMode); }).join('');
    var listHtml = '<div class="class-list">' + (listRows || '<p class="muted">Không có lớp khớp bộ lọc.</p>') + '</div>';
    var layoutAct = spec.layoutAct;
    var sortAct = spec.sortAct;
    var queryId = spec.queryId;
    var queryVal = spec.query || '';
    var sortRow = layout === 'list'
      ? '<div class="btn-row class-sort"><button type="button" class="btn' + (sort !== 'number' ? ' btn-primary' : '') + '" data-act="' + sortAct + '" data-sort="level">Theo trình độ</button>' +
        '<button type="button" class="btn' + (sort === 'number' ? ' btn-primary' : '') + '" data-act="' + sortAct + '" data-sort="number">Theo số lớp</button></div>'
      : '';
    return '<div class="btn-row class-layout">' +
      '<button type="button" class="btn' + (layout === 'cards' ? ' btn-primary' : '') + '" data-act="' + layoutAct + '" data-layout="cards">Dạng thẻ</button>' +
      '<button type="button" class="btn' + (layout === 'list' ? ' btn-primary' : '') + '" data-act="' + layoutAct + '" data-layout="list">Dạng list</button></div>' +
      sortRow +
      '<label class="field class-q"><span>Tìm lớp</span><input id="' + queryId + '" placeholder="Tên lớp" autocomplete="off" value="' + esc(queryVal) + '"></label>' +
      (layout === 'list' ? listHtml : blocks);
  }

  function viewClasses() {
    return shell('<div class="section-head"><div><span class="nav-pair"><button type="button" class="btn" data-act="nav" data-screen="menu">← Menu</button>' + homeButton() + '</span>' +
      '<h2>Quản lý lớp</h2></div><div class="btn-row">' +
      (canExportClasses() ? '<button type="button" class="btn" data-act="export-classes" data-kind="xlsx">Excel</button>' +
        '<button type="button" class="btn" data-act="export-classes" data-kind="pdf">PDF</button>' +
        '<button type="button" class="btn" data-act="export-classes" data-kind="img">Ảnh</button>' +
        '<button type="button" class="btn" data-act="export-classes" data-kind="jpg">JPG</button>' +
        '<button type="button" class="btn" data-act="export-classes" data-kind="print">Print (in)</button>' : '') +
      (canEdit() ? '<button type="button" class="btn btn-primary" data-act="open-add-class">+ Thêm lớp</button>' : '') +
      '</div></div>' +
      summaryHtml(currentWeekStats(null)) +
      '<p class="help">Thư mục viền vàng là KINDY, viền xanh là KIDS, viền đỏ là TEENS, viền xanh lá là IELTS, viền tím là lớp custom. Dạng thẻ là mặc định. Dạng list xếp theo trình độ hoặc số lớp và giữ màu khung theo loại lớp. Mọi lớp trong file đều hiện ở đây. Lớp không thuộc năm nhóm trên nằm ở cuối. Lớp custom không lên trình độ. Lớp TEENS hết TEENS 2B lên thang IELTS: tên trình độ vẫn là TEENS, cấp độ theo IELTS, số lớp giữ nguyên, thư mục nằm ở nhóm IELTS. Thẻ có dấu ! là lớp quá tải, sĩ số trên 17. Sĩ số có số thứ tự tối đa 20. Nhãn (Updated) ở góc thẻ là lớp vừa có cập nhật, tự mất sau 2 ngày. Bấm vào thư mục để mở lớp. Nút Xem chuyên cần mở bảng chuyên cần của lớp. Print (in) mở hộp thoại in của máy và in bảng danh sách lớp đang xem.</p>' +
      classBrowser('classes') + modalHtml());
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
        '<td>' + esc(stu.phone || '—') + '</td>' +
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
      '<th>STT</th><th>Mã học viên</th><th>Học viên</th><th>English name</th><th>SĐT</th><th>Giới tính</th><th>Ngày sinh</th><th>Tuổi</th><th>First EC</th>' +
      (edit ? '<th>Sửa</th>' : '') +
      '</tr></thead><tbody>' + ((roster.listed.length || roster.gray.length) ? studentRows(roster.listed, now, ui.detailId) + studentRows(roster.gray, now, ui.detailId) : '<tr><td colspan="' + (9 + (studentOps ? 1 : 0) + (edit ? 1 : 0)) + '">Chưa có học viên đang học.</td></tr>') + '</tbody></table></div>';
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
    return shell('<div class="class-head"><div><span class="nav-pair"><button type="button" class="btn" data-act="nav" data-screen="classes">← Danh sách lớp</button>' + homeButton() + '</span>' +
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
      '<div class="stat"><b>TA phụ trách</b>' + esc(L.staffText(cls.ta)) + '</div>' +
      '<div class="stat"><b>Mã lớp</b>' + esc(cls.classCode || '—') + '</div></div>' +
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
    if (ui.detailEdit) {
      var notes = (stu.notes || []).map(function (note) {
        return noteRow(note.id, note.month, note.text);
      }).join('');
      var selfOn = bookRec.pecMode === 'self';
      body = '<label class="field"><span>Số điện thoại 1</span><input id="d-phone" value="' + esc(stu.phone || '') + '"></label>' +
        '<label class="field"><span>Số điện thoại 2</span><input id="d-phone-2" value="' + esc(stu.phone2 || '') + '"></label>' +
        '<label class="field"><span>Tên phụ huynh</span><input id="d-parent" value="' + esc(stu.parentName || '') + '"></label>' +
        detailBookFields(bookRec, bookGrade, true) +
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
      body = photoTag(stu) +
        '<p><b>Tên học viên:</b> ' + esc(showText(stu.name)) +
        '<br><b>English name:</b> ' + esc(showText(stu.englishName)) +
        '<br><b>Mã học viên:</b> ' + esc(showText(stu.code)) +
        '<br><b>Số điện thoại 1:</b> ' + esc(stu.phone || '—') +
        '<br><b>Số điện thoại 2:</b> ' + esc(stu.phone2 || '—') +
        '<br><b>Tên phụ huynh:</b> ' + esc(stu.parentName || '—') +
        '<br><b>Giới tính:</b> ' + esc(showText(stu.gender)) + '<br><b>Ngày sinh:</b> ' + esc(showDob(stu.dob)) +
        '<br><b>Tuổi:</b> <span data-age-for="' + esc(stu.dob || '') + '">' + (stu.dob === '?' ? '?' : (age == null ? '—' : age)) + '</span>' +
        typeLine +
        '<br><b>First EC:</b> ' + esc(showText(stu.ec)) +
        detailBookFields(bookRec, bookGrade, false) +
        (bookRec.pecMode === 'self' ? '<br><b>PEC:</b> Hv tự tạo' : '') +
        '<br><b>Tài khoản PEC:</b> ' + pecUserView +
        '<br><b>Mật khẩu PEC:</b> ' + pecPassView + '</p>' + expireLine + noteLine +
        '<p class="field-label">Lịch sử chuyển lớp</p>' + transfers +
        '<p class="field-label">Nhận xét theo tháng</p>' + noteView +
        '<div class="modal-foot"><button type="button" class="btn" data-act="open-profile" data-id="' + esc(stu.id) + '">Hồ sơ học viên</button>' +
        (canEdit() ? '<button type="button" class="btn btn-primary" data-act="edit-detail">Sửa</button>' : '') + '</div>';
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
        '<button type="button" class="btn" data-act="export-schedule" data-kind="jpg">JPG</button>' +
        '<button type="button" class="btn" data-act="export-schedule" data-kind="print">Print (in)</button></div>'
      : '';
    var soaBtn = canEdit() ? '<button type="button" class="btn" data-act="open-soa">Thêm giờ SOA</button>' : '';
    return shell('<div class="section-head"><div><span class="nav-pair"><button type="button" class="btn" data-act="nav" data-screen="menu">← Menu</button>' + homeButton() + '</span><h2>Thời khóa biểu</h2>' +
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
    var html = L.GROUPS.map(function (group) {
      var list = state.classes.filter(function (cls) {
        var level = mode === 'homework' ? L.homeworkLevel(cls, month) : L.currentLevel(cls);
        return classGroupId(cls, level) === group.id;
      }).sort(function (a, b) {
        if (group.id === 'CUSTOM') return L.currentName(a).localeCompare(L.currentName(b), 'vi');
        var left = mode === 'homework' ? L.homeworkLevel(a, month) : L.currentLevel(a);
        var right = mode === 'homework' ? L.homeworkLevel(b, month) : L.currentLevel(b);
        if (!left || !right) return L.currentName(a).localeCompare(L.currentName(b), 'vi');
        return L.gradeIndex(left.gradeId) - L.gradeIndex(right.gradeId) || (Number(left.number) || 0) - (Number(right.number) || 0);
      });
      var cards = list.length ? list.map(function (cls) { return folderCard(cls, now, mode); }).join('') : '<p class="muted">Chưa có lớp trong nhóm này.</p>';
      return '<section class="group-block group-' + group.id.toLowerCase() + '"><h3>' + esc(group.label) + '</h3><div class="folder-grid">' + cards + '</div></section>';
    }).join('');
    var knownGroup = {};
    L.GROUPS.forEach(function (group) { knownGroup[group.id] = true; });
    var loose = state.classes.filter(function (cls) {
      var level = mode === 'homework' ? L.homeworkLevel(cls, month) : L.currentLevel(cls);
      return !knownGroup[classGroupId(cls, level)];
    });
    if (!loose.length) return html;
    return html + '<section class="group-block group-custom"><h3>Lớp chưa vào nhóm</h3><div class="folder-grid">' +
      loose.map(function (cls) { return folderCard(cls, now, mode); }).join('') + '</div></section>';
  }

  function viewHomework() {
    return shell('<div class="section-head"><div><span class="nav-pair"><button type="button" class="btn" data-act="nav" data-screen="menu">← Menu</button>' + homeButton() + '</span>' +
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
        '<button type="button" class="btn" data-act="export-homework" data-kind="jpg">JPG</button>' +
        '<button type="button" class="btn" data-act="export-homework" data-kind="print">Print (in)</button>' : '') +
        '</div>' +
        '<p class="help">Cập nhật Excel ghi dấu từ hàng 2 theo ngày của lớp, kể cả tháng đã qua. Cột lệch ngày dán vào buổi gần nhất chưa có dữ liệu.</p>' +
        (pick ? '<p class="help">Tick một hoặc nhiều học viên để xuất hoặc in riêng. Không tick thì xuất hoặc in cả danh sách tháng này. Print (in) mở hộp thoại in của máy.</p>' : '')
      : '<p class="help">Tài khoản này không xuất và không in bảng chuyên cần.</p>';
    return shell('<div class="section-head"><div><span class="nav-pair"><button type="button" class="btn" data-act="nav" data-screen="homework">← Chuyên cần</button>' + homeButton() + '</span>' +
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
      '<label class="field"><span>Mã lớp</span><input name="classCode" required maxlength="40" value="' + esc(editing && editing.classCode ? editing.classCode : '') + '"></label>' +
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
      '<label class="field"><span>Số điện thoại 1</span><input name="phone" value="' + esc(seed ? seed.phone : '') + '"></label>' +
      '<label class="field"><span>Số điện thoại 2</span><input name="phone2" value="' + esc(seed && seed.phone2 ? seed.phone2 : '') + '"></label>' +
      '<label class="field"><span>Tên phụ huynh</span><input name="parentName" value="' + esc(seed && seed.parentName ? seed.parentName : '') + '"></label>' +
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
      '<p class="help">Ngày sinh ghi DD/MM/YYYY. Học viên mới thiếu tên tiếng Anh, giới tính, ngày sinh, số điện thoại hoặc EC thì ghi ?. Mã để trống sẽ được cấp tự động. Mã đã có sẵn trong chính lớp này thì bỏ qua. Mã trong Học viên cũ/kết thúc không ghi đè bằng Excel. Dùng Thêm học viên để cho em vào lại lớp.</p>' +
      '<p class="help">Nếu tên trùng học viên đang có trong lớp, file chỉ bổ sung ô còn thiếu (?, - hoặc trống) và không tạo thêm người trùng tên. Tên hoặc mã trùng học viên chính thức đang học ở lớp khác sẽ mở Trùng học viên để chuyển hoặc thêm mới, không chặn các học viên khác trong file. Sĩ số có số thứ tự tối đa 20.</p>' +
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
        var linkCount = ui.importDraft.links ? ui.importDraft.links.length : 0;
        var message = 'Đọc được ' + ui.importDraft.updates.length + ' học viên cần bổ sung, ' + ui.importDraft.students.length + ' học viên mới';
        if (linkCount) message += ' và ' + linkCount + ' học viên trùng lớp khác';
        message += '.';
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
    var links = draft && draft.links ? draft.links : [];
    if (!draft || draft.mode === 'homework') {
      showFormError('Chọn file Excel có học viên từ hàng 2.');
      return;
    }
    if (!updates.length && !fresh.length && !links.length) {
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
    updates.forEach(function (item) {
      var stu = null;
      cls.students.forEach(function (row) { if (row.id === item.id) stu = row; });
      if (!stu || !item.patch) return;
      Object.keys(item.patch).forEach(function (key) { stu[key] = item.patch[key]; });
    });
    var overCap = fresh.length > 0 && listedCount(cls, new Date()) + fresh.length > 20;
    if (overCap && !updates.length && !links.length) {
      showFormError(ROSTER_FULL);
      return;
    }
    var added = 0;
    if (!overCap) {
      var joinedAt = new Date().toISOString();
      fresh.forEach(function (row) {
        row.originClassId = cls.id;
        row.joinedAt = joinedAt;
        cls.students.push(L.createStudent(row));
        added += 1;
      });
    }
    var pending = links.map(function (link) {
      var payload = {
        code: link.student && link.student.code ? link.student.code : '',
        name: link.student && link.student.name ? link.student.name : '?',
        englishName: link.student && link.student.englishName ? link.student.englishName : '?',
        gender: link.student && link.student.gender ? link.student.gender : '?',
        dob: link.student && link.student.dob ? link.student.dob : '?',
        phone: link.student && link.student.phone ? link.student.phone : '?',
        ec: link.student && link.student.ec ? link.student.ec : '?',
        enroll: 'official',
        joinedAt: new Date().toISOString(),
        originClassId: cls.id
      };
      return { payload: payload, hits: link.hits || [] };
    });
    ui.importDraft = null;
    ui.formError = '';
    var message = '';
    if (updates.length) message += 'Đã bổ sung thông tin cho ' + updates.length + ' học viên. ';
    if (added) message += 'Đã thêm ' + added + ' học viên. ';
    if (overCap) message += ROSTER_FULL + ' ';
    if (updates.length || added) save();
    if (pending.length && listedCount(cls, new Date()) < 20) {
      var first = pending.shift();
      ui.modal = { type: 'dup-student', payload: first.payload, hits: first.hits, queue: pending };
      if (message.trim()) toast(message.trim());
      render();
      return;
    }
    if (pending.length) message += ROSTER_FULL;
    ui.modal = null;
    if (!updates.length && !added && !(message.trim())) {
      toast('Không thêm học viên trùng vì sĩ số đã đủ.');
      render();
      return;
    }
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

  function transferAskForm() {
    return modalShell('Đề xuất sự vụ',
      '<p>bạn có muốn lấy nội dung đề xuất sự vụ không?</p>',
      '<button type="button" class="btn btn-primary" data-act="transfer-report-yes">Yes</button>' +
      '<button type="button" class="btn btn-danger" data-act="close-modal">no</button>');
  }

  function copyForm() {
    var text = ui.modal && ui.modal.text ? ui.modal.text : '';
    return modalShell('Nội dung báo cáo',
      '<p class="help">Bấm bút copy rồi dán. Nội dung giữ xuống dòng.</p>' +
      '<textarea id="report-text" class="report-text" readonly>' + esc(text) + '</textarea>',
      '<button type="button" class="btn btn-primary" data-act="copy-report">' + penSvg() + '<span>Copy</span></button>' +
      '<button type="button" class="btn" data-act="close-modal">Đóng</button>');
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
    var user = ui.user || {};
    return modalShell('Đề xuất',
      '<label class="field"><span>Mã nhân sự</span><input id="suggest-user" value="' + esc(user.username || '') + '" readonly></label>' +
      '<label class="field"><span>Tên nhân sự</span><input id="suggest-name" value="' + esc(user.name || '') + '" readonly></label>' +
      '<label class="field"><span>Loại đề xuất</span><select id="suggest-type">' +
      '<option value="add">Add học viên</option>' +
      '<option value="transfer">Chuyển lớp</option>' +
      '<option value="other">Khác</option></select></label>' +
      '<label class="field"><span>Nội dung</span><textarea id="suggest-text" maxlength="1500"></textarea></label>' +
      '<p class="help">Submit gửi lên Google Sheet. Mã nhân sự vào cột C, tên nhân sự vào cột D, nội dung vào cột E. Cột A số thứ tự và cột B thời gian do bảng tính tự ghi. Add học viên, Chuyển lớp và Khác vào ba thẻ riêng.</p>',
      '<button type="button" class="btn btn-primary" data-act="suggest-send">Submit</button><button type="button" class="btn" data-act="close-modal">Hủy</button>');
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
    return shell('<div class="section-head"><div><span class="nav-pair"><button type="button" class="btn" data-act="nav" data-screen="menu">← Menu</button>' + homeButton() + '</span>' +
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
      return shell('<div class="section-head"><div><span class="nav-pair"><button type="button" class="btn" data-act="nav" data-screen="menu">← Menu</button>' + homeButton() + '</span>' +
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
    var cols = (former ? 11 : 10) + (pick ? 1 : 0);
    var head = '<tr>' + (pick ? '<th></th>' : '') + '<th>Mã</th><th>Tên</th><th>English</th><th>SĐT</th><th>Giới tính</th><th>Ngày sinh</th><th>EC</th><th>Loại</th><th>Lớp cuối</th><th>Nhóm</th>' +
      (former ? '<th>Lý do</th>' : '') + '</tr>';
    var body = filtered.length ? filtered.map(function (row) {
      var box = pick ? '<td><input type="checkbox" data-archive-pick="' + esc(row.id) + '"' + (ui.archivePick[row.id] ? ' checked' : '') + ' aria-label="Chọn ' + esc(row.name) + '"></td>' : '';
      return '<tr>' + box + '<td>' + esc(showText(row.code)) + '</td><td><button type="button" class="stu-name" data-act="open-profile" data-id="' + esc(row.id) + '">' + esc(showText(row.name)) + '</button></td><td>' + esc(showText(row.englishName)) + '</td><td>' + esc(row.phone || '—') + '</td><td>' +
        esc(showText(row.gender)) + '</td><td>' + esc(showDob(row.dob)) + '</td><td>' + esc(showText(row.ec)) + '</td><td>' + esc(enrollLabel(row.enroll)) + '</td><td>' +
        esc(showText(row.lastClassName)) + '</td><td>' + esc(row.track || '—') + '</td>' +
        (former ? '<td>' + esc(showText(row.reason)) + '</td>' : '') + '</tr>';
    }).join('') : '<tr><td colspan="' + cols + '">Không có học viên khớp bộ lọc.</td></tr>';
    var purge = pick ? '<div class="btn-row"><button type="button" class="btn btn-danger" data-act="archive-purge">Xóa vĩnh viễn</button></div>' +
      '<p class="help">Danh sách này dành cho học viên đã dừng học, sau 7 ngày, và các em hết hạn Trial, học bổng hoặc outdated. Admin chọn học viên ở đây để xóa vĩnh viễn khỏi data.</p>' : '';
    return shell('<div class="section-head"><div><span class="nav-pair"><button type="button" class="btn" data-act="archive-back">← Thư viện</button>' + homeButton() + '</span>' +
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
    if (ui.modal.type === 'transfer-ask') return transferAskForm();
    if (ui.modal.type === 'copy') return copyForm();
    if (ui.modal.type === 'expire') return expireForm();
    if (ui.modal.type === 'confirm') return confirmForm();
    if (ui.modal.type === 'hw-mark') return hwMarkForm();
    if (ui.modal.type === 'schedule-choice') return scheduleChoiceForm();
    if (ui.modal.type === 'add-soa') return soaForm();
    if (ui.modal.type === 'move-session') return moveForm();
    if (ui.modal.type === 'suggest') return suggestForm();
    if (ui.modal.type === 'edit-staff') return staffForm();
    if (ui.modal.type === 'people-form') return peopleForm();
    if (ui.modal.type === 'dup-student') return dupStudentForm();
    if (ui.modal.type === 'care-cell') return careCellForm();
    if (ui.modal.type === 'rank-scale') return rankScaleForm();
    return '';
  }

  function dupReason(by) {
    if (by === 'both') return 'Trùng họ tên và mã học viên';
    if (by === 'code') return 'Trùng mã học viên';
    return 'Trùng họ tên';
  }

  function dupLine(label, value) {
    return '<p><b>' + esc(label) + ':</b> ' + esc(value) + '</p>';
  }

  function dupStudentForm() {
    var hits = ui.modal && ui.modal.hits ? ui.modal.hits : [];
    var payload = ui.modal && ui.modal.payload ? ui.modal.payload : null;
    var adding = payload
      ? '<p class="dup-adding">Đang thêm: ' + esc(showText(payload.name)) + ' · mã ' + esc(showText(payload.code)) + '</p>'
      : '';
    var rows = hits.map(function (hit) {
      return '<article class="dup-hit">' +
        '<p><b>' + esc(showText(hit.name)) + '</b></p>' +
        '<p class="dup-reason">' + esc(dupReason(hit.by)) + '</p>' +
        dupLine('Mã học viên', showText(hit.code)) +
        dupLine('English name', showText(hit.englishName)) +
        dupLine('Giới tính', showText(hit.gender)) +
        dupLine('Ngày sinh', showDob(hit.dob)) +
        dupLine('Số điện thoại 1', showText(hit.phone)) +
        dupLine('Số điện thoại 2', showText(hit.phone2)) +
        dupLine('Tên phụ huynh', showText(hit.parentName)) +
        dupLine('First EC', showText(hit.ec)) +
        dupLine('Lớp đang học', showText(hit.className)) +
        dupLine('Ngày thêm vào lớp', hit.joined ? L.formatDMY(hit.joined) : '—') +
        '<button type="button" class="btn btn-primary" data-act="dup-transfer" data-id="' + esc(hit.id) + '" data-from="' + esc(hit.fromId) + '">Chuyển học viên vào đây và cập nhật thông tin</button></article>';
    }).join('');
    return modalShell('Trùng học viên',
      '<p>Có học viên chính thức đang học ở lớp khác trùng họ tên hoặc trùng mã.</p>' + adding + rows +
      '<p class="help">Bỏ qua sẽ giữ học viên ở lớp cũ và thêm một học viên mới tại đây. Nếu mã đang thuộc học viên lớp cũ, học viên mới nhận mã khác.</p>',
      '<button type="button" class="btn btn-danger" data-act="dup-skip">Bỏ qua và tiếp tục thêm</button>' +
      '<button type="button" class="btn" data-act="close-modal">Hủy</button>');
  }

  function staffForm() {
    var name = ui.modal && ui.modal.name ? ui.modal.name : '';
    var month = ui.modal && ui.modal.month ? ui.modal.month : staffMonthKey();
    var row = (state.staffBook && state.staffBook[name]) || { code: '', soa: {} };
    var soaValue = row.soa && row.soa[month] ? row.soa[month] : '';
    return modalShell('Sửa thông tin giáo viên',
      '<p class="meta">' + esc(name) + '</p>' +
      '<label class="field"><span>Mã nhân sự</span><input id="staff-code" value="' + esc(row.code || '') + '" autocomplete="off"></label>' +
      '<label class="field"><span>Giờ SOA tháng ' + esc(month) + '</span><input id="staff-soa" inputmode="decimal" value="' + esc(soaValue) + '"></label>' +
      '<p class="help">Giờ Teaching của tháng này do lịch lớp tính, không sửa ở đây.</p>',
      '<button type="button" class="btn btn-primary" data-act="save-staff">Lưu</button><button type="button" class="btn" data-act="close-modal">Hủy</button>');
  }

  function saveStaffInfo() {
    if (deny(canEdit()) || !ui.modal || ui.modal.type !== 'edit-staff') return;
    var name = ui.modal.name;
    var month = ui.modal.month;
    if (!name || !/^\d{4}-\d{2}$/.test(month || '')) return;
    var codeEl = document.getElementById('staff-code');
    var soaEl = document.getElementById('staff-soa');
    if (!state.staffBook) state.staffBook = {};
    if (!state.staffBook[name] || typeof state.staffBook[name] !== 'object') state.staffBook[name] = { code: '', soa: {} };
    if (!state.staffBook[name].soa || typeof state.staffBook[name].soa !== 'object' || Array.isArray(state.staffBook[name].soa)) {
      state.staffBook[name].soa = {};
    }
    state.staffBook[name].code = String(codeEl && codeEl.value || '').trim();
    var soaValue = String(soaEl && soaEl.value || '').trim();
    if (soaValue) state.staffBook[name].soa[month] = soaValue;
    else delete state.staffBook[name].soa[month];
    staffBookSeen = true;
    ui.modal = null;
    ui.formError = '';
    save();
    toast('Đã lưu thông tin giáo viên.');
    render();
  }

  function sweepRoster() {
    var moved = L.settleRoster(state, new Date());
    if (moved && moved.length) save({ quiet: true });
    return moved || [];
  }

  function normalizePersonnel(list) {
    var allowed = {};
    POSITIONS.forEach(function (item) { allowed[item.id] = true; });
    return (Array.isArray(list) ? list : []).filter(function (row) {
      return row && typeof row === 'object' && String(row.name || '').trim();
    }).map(function (row) {
      var position = String(row.position || '').toUpperCase();
      var gender = String(row.gender || '');
      if (gender !== 'Nam' && gender !== 'Nữ' && gender !== 'Khác') gender = '';
      var dob = String(row.dob || '');
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) dob = '';
      return {
        id: row.id || L.uid(),
        name: String(row.name).replace(/\s+/g, ' ').trim(),
        code: String(row.code || '').trim(),
        position: allowed[position] ? position : '',
        dob: dob,
        gender: gender
      };
    });
  }

  function personKey(name) {
    return String(name || '').trim().toLowerCase().replace(/\s+/g, ' ');
  }

  function positionText(id) {
    var key = String(id || '').toUpperCase();
    for (var i = 0; i < POSITIONS.length; i++) {
      if (POSITIONS[i].id === key) return POSITIONS[i].id + ' · ' + POSITIONS[i].name;
    }
    return '—';
  }

  function peopleRoster() {
    var map = {};
    function slot(name) {
      var text = String(name || '').replace(/\s+/g, ' ').trim();
      var key = personKey(text);
      if (!key || key === '?' || key === '-') return null;
      if (!map[key]) {
        map[key] = { key: key, id: '', name: text, code: '', position: '', dob: '', gender: '', saved: false, inferred: '' };
      }
      return map[key];
    }
    (state.personnel || []).forEach(function (row) {
      var item = slot(row.name);
      if (!item) return;
      item.id = row.id || '';
      item.name = row.name;
      item.code = row.code || '';
      item.position = row.position || '';
      item.dob = row.dob || '';
      item.gender = row.gender || '';
      item.saved = true;
    });
    Object.keys(state.staffBook || {}).forEach(function (name) {
      var item = slot(name);
      if (!item) return;
      var code = String((state.staffBook[name] || {}).code || '').trim();
      if (!item.code && code) item.code = code;
      if (!item.saved && !item.inferred) item.inferred = 'FET';
    });
    (L.FET || []).forEach(function (name) {
      var item = slot(name);
      if (item && !item.saved && !item.inferred) item.inferred = 'FET';
    });
    (state.classes || []).forEach(function (cls) {
      String(cls && cls.fet || '').split(',').forEach(function (part) {
        var item = slot(part);
        if (item && !item.saved && !item.inferred) item.inferred = 'FET';
      });
      String(cls && cls.cm || '').split(',').forEach(function (part) {
        var item = slot(part);
        if (item && !item.saved && !item.inferred) item.inferred = 'CM';
      });
      String(cls && cls.ta || '').split(',').forEach(function (part) { slot(part); });
    });
    (state.accounts || []).forEach(function (acc) {
      var item = slot(acc && acc.name);
      if (!item) return;
      if (!item.code && acc.username) item.code = String(acc.username);
    });
    return Object.keys(map).map(function (key) {
      var row = map[key];
      if (!row.saved && row.inferred) row.position = row.inferred;
      return row;
    }).sort(function (a, b) { return a.name.localeCompare(b.name, 'vi'); });
  }

  function personByKey(key) {
    var rows = peopleRoster();
    for (var i = 0; i < rows.length; i++) if (rows[i].key === key) return rows[i];
    return null;
  }

  function peopleForm() {
    var row = ui.modal && ui.modal.key ? personByKey(ui.modal.key) : null;
    var position = row ? row.position : '';
    var options = '<option value="">Chưa chọn</option>' + POSITIONS.map(function (item) {
      var label = item.id + ' · ' + item.name;
      return '<option value="' + item.id + '"' + (position === item.id ? ' selected' : '') + '>' + esc(label) + '</option>';
    }).join('');
    var gender = row ? row.gender : '';
    var genders = [{ value: '', label: '—' }, { value: 'Nam', label: 'Nam' }, { value: 'Nữ', label: 'Nữ' }, { value: 'Khác', label: 'Khác' }];
    var gopts = genders.map(function (item) {
      return '<option value="' + esc(item.value) + '"' + (gender === item.value ? ' selected' : '') + '>' + esc(item.label) + '</option>';
    }).join('');
    return modalShell(row ? 'Sửa nhân sự' : 'Thêm nhân sự',
      '<label class="field"><span>Tên nhân sự</span><input id="people-name" value="' + esc(row ? row.name : '') + '" autocomplete="off"></label>' +
      '<label class="field"><span>Mã nhân sự</span><input id="people-code" value="' + esc(row ? row.code : '') + '" autocomplete="off"></label>' +
      '<label class="field"><span>Chức vụ</span><select id="people-position">' + options + '</select></label>' +
      '<label class="field"><span>Ngày sinh</span><input id="people-dob" type="date" value="' + esc(row && row.dob ? row.dob : '') + '"></label>' +
      '<label class="field"><span>Giới tính</span><select id="people-gender">' + gopts + '</select></label>' +
      '<p class="help">Admin chọn chức vụ. Ngày sinh hiện trên danh sách theo dd/mm/yyyy.</p>',
      '<button type="button" class="btn btn-primary" data-act="people-save">Lưu</button><button type="button" class="btn" data-act="close-modal">Hủy</button>');
  }

  function savePerson() {
    if (deny(canEdit()) || !ui.modal || ui.modal.type !== 'people-form') return;
    var nameEl = document.getElementById('people-name');
    var codeEl = document.getElementById('people-code');
    var posEl = document.getElementById('people-position');
    var dobEl = document.getElementById('people-dob');
    var genderEl = document.getElementById('people-gender');
    var name = String(nameEl && nameEl.value || '').replace(/\s+/g, ' ').trim();
    if (!name || name === '?' || name === '-') {
      ui.formError = 'Cần tên nhân sự.';
      render();
      return;
    }
    var position = String(posEl && posEl.value || '').toUpperCase();
    var known = false;
    POSITIONS.forEach(function (item) { if (item.id === position) known = true; });
    if (position && !known) return;
    var gender = String(genderEl && genderEl.value || '');
    if (gender !== 'Nam' && gender !== 'Nữ' && gender !== 'Khác') gender = '';
    var dob = String(dobEl && dobEl.value || '');
    if (dob && !/^\d{4}-\d{2}-\d{2}$/.test(dob)) dob = '';
    var key = personKey(name);
    var prevKey = ui.modal.key || '';
    var keptId = '';
    (state.personnel || []).forEach(function (item) {
      var itemKey = personKey(item.name);
      if (!keptId && (itemKey === key || (prevKey && itemKey === prevKey))) keptId = item.id || '';
    });
    var next = (state.personnel || []).filter(function (item) {
      var itemKey = personKey(item.name);
      return itemKey !== key && itemKey !== prevKey;
    });
    next.push({
      id: keptId || L.uid(),
      name: name,
      code: String(codeEl && codeEl.value || '').trim(),
      position: position,
      dob: dob,
      gender: gender
    });
    state.personnel = normalizePersonnel(next);
    personnelSeen = true;
    ui.modal = null;
    ui.peopleKey = key;
    ui.formError = '';
    save();
    toast('Đã lưu nhân sự.');
    render();
  }

  function viewPerson(row) {
    var edit = canEdit()
      ? '<button type="button" class="btn btn-primary" data-act="people-edit" data-key="' + esc(row.key) + '">Sửa</button>'
      : '';
    return shell('<div class="section-head"><div><span class="nav-pair"><button type="button" class="btn" data-act="people-back">← Danh sách</button>' + homeButton() + '</span>' +
      '<h2>' + esc(row.name) + '</h2><p class="meta">Mục J · Chi tiết nhân sự</p></div>' + edit + '</div>' +
      '<article class="people-detail">' +
      '<p><b>Tên nhân sự:</b> ' + esc(row.name) + '</p>' +
      '<p><b>Mã nhân sự:</b> ' + esc(showText(row.code)) + '</p>' +
      '<p><b>Chức vụ:</b> ' + esc(positionText(row.position)) + '</p>' +
      '<p><b>Ngày sinh:</b> ' + esc(showDob(row.dob)) + '</p>' +
      '<p><b>Giới tính:</b> ' + esc(showText(row.gender)) + '</p></article>' +
      (canEdit() ? '' : '<p class="help">Tài khoản này chỉ xem nhân sự.</p>') +
      modalHtml());
  }

  function viewPeople() {
    var openKey = ui.peopleKey || '';
    if (openKey) {
      var one = personByKey(openKey);
      if (one) return viewPerson(one);
      ui.peopleKey = '';
    }
    var layout = ui.peopleLayout === 'list' ? 'list' : 'table';
    var query = String(ui.peopleQuery || '').trim().toLowerCase();
    var rows = peopleRoster();
    function findText(row) {
      return (row.name + ' ' + row.code + ' ' + positionText(row.position) + ' ' + (row.gender || '')).toLowerCase();
    }
    var table = '<div class="table-wrap"><table class="people-table"><thead><tr>' +
      '<th>Tên nhân sự</th><th>Mã nhân sự</th><th>Chức vụ</th><th>Ngày sinh</th><th>Giới tính</th><th></th>' +
      '</tr></thead><tbody>' + rows.map(function (row) {
        var blob = findText(row);
        var hide = query && blob.indexOf(query) < 0 ? ' hidden' : '';
        return '<tr data-person data-find="' + esc(blob) + '"' + hide + '><td>' + esc(row.name) + '</td><td>' +
          esc(showText(row.code)) + '</td><td>' + esc(positionText(row.position)) + '</td><td>' + esc(showDob(row.dob)) +
          '</td><td>' + esc(showText(row.gender)) + '</td><td><button type="button" class="btn" data-act="people-open" data-key="' +
          esc(row.key) + '">Chi tiết</button></td></tr>';
      }).join('') + '</tbody></table></div>';
    var list = '<div class="people-list">' + rows.map(function (row) {
      var blob = findText(row);
      var hide = query && blob.indexOf(query) < 0 ? ' hidden' : '';
      return '<article class="people-line" data-person data-find="' + esc(blob) + '"' + hide + '><p><b>' + esc(row.name) +
        '</b><span class="meta">' + esc(positionText(row.position)) + ' · ' + esc(showText(row.code)) + '</span></p>' +
        '<button type="button" class="btn" data-act="people-open" data-key="' + esc(row.key) + '">Chi tiết</button></article>';
    }).join('') + '</div>';
    return shell('<div class="section-head"><div><span class="nav-pair"><button type="button" class="btn" data-act="nav" data-screen="menu">← Menu</button>' + homeButton() + '</span>' +
      '<h2>Quản lý nhân sự</h2><p class="meta">Mục J</p></div>' +
      (canEdit() ? '<button type="button" class="btn btn-primary" data-act="people-add">+ Thêm nhân sự</button>' : '') +
      '</div><div class="btn-row">' +
      '<button type="button" class="btn' + (layout !== 'list' ? ' btn-primary' : '') + '" data-act="people-layout" data-layout="table">Dạng bảng</button>' +
      '<button type="button" class="btn' + (layout === 'list' ? ' btn-primary' : '') + '" data-act="people-layout" data-layout="list">Dạng danh sách</button></div>' +
      '<label class="field class-q"><span>Tìm nhân sự</span><input id="people-q" placeholder="Tên, mã hoặc chức vụ" autocomplete="off" value="' + esc(ui.peopleQuery || '') + '"></label>' +
      '<p class="help">Danh sách gồm tài khoản nhân sự và người đang là CM, FET hoặc TA trên lớp. Bấm Chi tiết để xem tên, mã, chức vụ, ngày sinh và giới tính. Admin sửa các mục này. CM là Class Manager, EC là Educational Consultant, FET là Foreign English Teacher, BM là Branch Manager, BAM là Branch Administrative Manager, FBM là Floating Branch Manager, TTL là Training Team Leader, ATL là Administrative Team Leader.</p>' +
      (rows.length ? (layout === 'list' ? list : table) : '<p class="muted">Chưa có nhân sự.</p>') +
      (canEdit() ? '' : '<p class="help">Tài khoản này chỉ xem nhân sự.</p>') +
      modalHtml());
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
      var editBtn = canEdit()
        ? '<button type="button" class="btn" data-act="edit-staff" data-name="' + esc(name) + '">Sửa thông tin</button>'
        : '';
      return '<article class="staff-card"><h3>' + esc(name) + '</h3><p class="meta">FET</p>' +
        '<p>Mã nhân sự: ' + esc(row.code || '—') + '</p>' +
        '<p class="staff-hours">Giờ Teaching: <b>' + esc(L.formatHours(minutes)) + '</b></p>' +
        '<p>Giờ SOA: ' + esc(soaValue || '—') + '</p>' + editBtn + '</article>';
    }).join('');
    return shell('<div class="section-head"><div><span class="nav-pair"><button type="button" class="btn" data-act="nav" data-screen="menu">← Menu</button>' + homeButton() + '</span>' +
      '<h2>Công giáo viên</h2><p class="meta">Mục H</p></div></div>' +
      '<label class="field dash-month"><span>Tháng</span><input id="staff-month" type="month" value="' + esc(month) + '"></label>' +
      '<p class="help">Giờ Teaching cộng mỗi buổi trong tháng theo khung giờ của lớp. Một buổi 5:30–7:30 là 2 giờ, tháng cộng mọi buổi của giáo viên đó. Giờ SOA là giờ OFFICE. Admin bấm Sửa thông tin để cập nhật mã nhân sự và giờ SOA của tháng đang xem. Khối Interview, event và Lớp EB trên lịch Mục B là thẻ riêng, không cộng vào ô này và không tính giờ Teaching.</p>' +
      (canEdit() ? '' : '<p class="help">Tài khoản này chỉ xem công giáo viên.</p>') +
      '<div class="staff-grid-cards">' + (cards || '<p class="muted">Chưa có FET.</p>') + '</div>' + modalHtml());
  }

  var dictTimer = null;
  var dictSeq = 0;
  var dictLook = 0;
  var dictSentenceSeq = 0;
  var dictAudioCtx = null;
  var dictCefr = { state: '', map: null };
  var DICT_CEFR_RANK = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 };

  function dictPosVi(pos) {
    var key = String(pos || '').toLowerCase();
    var map = {
      noun: 'danh từ',
      verb: 'động từ',
      adjective: 'tính từ',
      adverb: 'trạng từ',
      interjection: 'thán từ',
      exclamation: 'thán từ',
      pronoun: 'đại từ',
      preposition: 'giới từ',
      conjunction: 'liên từ',
      determiner: 'hạn định từ',
      article: 'mạo từ',
      numeral: 'số từ',
      n: 'danh từ',
      v: 'động từ',
      adj: 'tính từ',
      adv: 'trạng từ',
      u: 'thán từ'
    };
    return map[key] || key;
  }

  function dictLooksVi(text) {
    return /[ăâêôơưđáàảãạắằẳẵặấầẩẫậéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i.test(String(text || ''));
  }

  function dictTranslate(text, pair) {
    var q = String(text || '').trim();
    if (!q) return Promise.resolve('');
    var url = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(q.slice(0, 450)) + '&langpair=' + pair;
    return fetch(url).then(function (res) { return res.json(); }).then(function (data) {
      var out = data && data.responseData && data.responseData.translatedText;
      if (!out || /MYMEMORY WARNING|INVALID SOURCE/i.test(out)) return '';
      return String(out).trim();
    }).catch(function () { return ''; });
  }

  function dictPaintSuggest(items) {
    ui.dict.suggestions = items || [];
    var box = document.getElementById('dict-suggest');
    if (!box) return;
    if (!ui.dict.suggestions.length) {
      box.hidden = true;
      box.innerHTML = '';
      return;
    }
    box.hidden = false;
    box.innerHTML = ui.dict.suggestions.map(function (item) {
      return '<button type="button" data-act="dict-pick" data-word="' + esc(item.word) + '">' + esc(item.label) + '</button>';
    }).join('');
  }

  function dictSuggest(seq, text) {
    var raw = String(text || '').trim();
    if (raw.length < 2) { if (seq === dictSeq) dictPaintSuggest([]); return; }
    var job = dictLooksVi(raw)
      ? dictTranslate(raw, 'vi|en').then(function (english) {
        var word = String(english || '').trim().toLowerCase();
        if (!word || word === raw.toLowerCase()) return [];
        return [{ word: word, label: raw + ' → ' + word }];
      })
      : fetch('https://api.datamuse.com/sug?s=' + encodeURIComponent(raw) + '&max=8').then(function (res) {
        return res.json();
      }).then(function (rows) {
        return (rows || []).map(function (item) {
          return { word: item.word, label: item.word };
        }).filter(function (item) { return item.word; });
      }).catch(function () { return []; });
    job.then(function (items) {
      if (seq !== dictSeq || ui.screen !== 'dictionary') return;
      dictPaintSuggest(items);
    });
  }

  function dictAccent(name) {
    var blob = String(name || '').toLowerCase();
    if (blob.indexOf('uk') >= 0 || blob.indexOf('_gb') >= 0 || blob.indexOf('-gb') >= 0) return 'Anh (UK)';
    if (blob.indexOf('us') >= 0 || blob.indexOf('_us') >= 0 || blob.indexOf('-us') >= 0) return 'Mỹ (US)';
    if (blob.indexOf('au') >= 0) return 'Úc (AU)';
    return 'Phát âm';
  }

  function dictCommons(id) {
    var url = 'https://commons.wikimedia.org/w/api.php?action=query&pageids=' + encodeURIComponent(id) +
      '&prop=imageinfo&iiprop=url|mime&format=json&origin=*';
    return fetch(url).then(function (res) { return res.json(); }).then(function (data) {
      var pages = data && data.query && data.query.pages || {};
      var page = pages[id] || pages[Object.keys(pages)[0]];
      var info = page && page.imageinfo && page.imageinfo[0];
      if (!info || !info.url) return null;
      return { url: info.url, mime: info.mime || '', title: page.title || '' };
    }).catch(function () { return null; });
  }

  function dictAudios(word, phonetics) {
    var jobs = [];
    if (/^[a-z]+$/.test(word)) {
      jobs.push(Promise.resolve({
        label: 'Anh (UK) · Google Dictionary',
        playUrl: 'https://ssl.gstatic.com/dictionary/static/sounds/20200429/' + word + '--_gb_1.mp3',
        copyUrl: '',
        source: 'Google Dictionary',
        fileName: word + '-uk.mp3'
      }));
    }
    (phonetics || []).forEach(function (item) {
      var source = item && item.sourceUrl || '';
      var found = String(source).match(/curid=(\d+)/);
      if (!found) return;
      jobs.push(dictCommons(found[1]).then(function (file) {
        if (!file) return null;
        var title = String(file.title || '').replace(/^File:/, '');
        return {
          label: dictAccent(title || item.audio) + ' · Wikimedia Commons',
          playUrl: file.url,
          copyUrl: file.url,
          source: 'Wikimedia Commons',
          fileName: title || (word + '.ogg')
        };
      }));
    });
    return Promise.all(jobs).then(function (rows) {
      var seen = {};
      return rows.filter(function (row) {
        if (!row || !row.playUrl || seen[row.playUrl]) return false;
        seen[row.playUrl] = true;
        return true;
      });
    });
  }

  function dictSynMap(word) {
    return fetch('https://api.datamuse.com/words?rel_syn=' + encodeURIComponent(word) + '&md=p&max=20').then(function (res) {
      return res.json();
    }).then(function (rows) {
      var map = {};
      (rows || []).forEach(function (item) {
        if (!item || !item.word) return;
        var tags = item.tags || [];
        for (var i = 0; i < tags.length; i++) {
          var label = dictPosVi(tags[i]);
          if (label && label !== tags[i]) { map[item.word.toLowerCase()] = label; return; }
        }
      });
      return map;
    }).catch(function () { return {}; });
  }

  function dictApplyVi(senses, text) {
    var map = {};
    String(text || '').split(/\n/).forEach(function (line) {
      var found = String(line).match(/^\[\[(\d+)(x)?\]\]\s*(.*)$/);
      if (found) map[found[1] + (found[2] || '')] = found[3];
    });
    var n = 0;
    senses.forEach(function (sense) {
      sense.glosses.forEach(function (gloss) {
        gloss.vi = map[String(n)] || '';
        gloss.exampleVi = map[n + 'x'] || '';
        n += 1;
      });
    });
  }

  function dictBuild(raw) {
    var word = String(raw.word || '').toLowerCase();
    var senses = [];
    (raw.meanings || []).forEach(function (meaning) {
      if (senses.length >= 4) return;
      var glosses = [];
      var syns = (meaning.synonyms || []).slice();
      (meaning.definitions || []).forEach(function (def) {
        if (glosses.length >= 2 || !def || !def.definition) return;
        glosses.push({ en: def.definition, vi: '', example: def.example || '', exampleVi: '' });
        (def.synonyms || []).forEach(function (item) { syns.push(item); });
      });
      if (!glosses.length) return;
      var seen = {};
      var synonyms = [];
      syns.forEach(function (item) {
        var name = String(item || '').trim();
        var key = name.toLowerCase();
        if (!name || seen[key]) return;
        seen[key] = true;
        synonyms.push(name);
      });
      senses.push({
        pos: meaning.partOfSpeech || '',
        posVi: dictPosVi(meaning.partOfSpeech || ''),
        glosses: glosses,
        synonyms: synonyms.slice(0, 8)
      });
    });
    var ipa = [];
    (raw.phonetics || []).forEach(function (item) {
      if (item && item.text && ipa.indexOf(item.text) < 0) ipa.push(item.text);
    });
    var lines = [];
    var n = 0;
    senses.forEach(function (sense) {
      sense.glosses.forEach(function (gloss) {
        lines.push('[[' + n + ']] ' + gloss.en);
        if (gloss.example) lines.push('[[' + n + 'x]] ' + gloss.example);
        n += 1;
      });
    });
    return Promise.all([
      dictAudios(word, raw.phonetics || []),
      dictSynMap(word),
      dictTranslate(word, 'en|vi'),
      lines.length ? dictTranslate(lines.join('\n'), 'en|vi') : Promise.resolve('')
    ]).then(function (pack) {
      var posMap = pack[1];
      dictApplyVi(senses, pack[3]);
      senses.forEach(function (sense) {
        sense.synonyms = sense.synonyms.map(function (name) {
          return { word: name, pos: posMap[name.toLowerCase()] || sense.posVi || '' };
        });
      });
      return { word: word, ipa: ipa.join(' · '), vi: pack[2] || '', audios: pack[0], senses: senses };
    });
  }

  function dictLookup(raw) {
    var text = String(raw || '').trim();
    if (!text) { toast('Hãy nhập một từ.'); return; }
    var id = ++dictLook;
    ui.dict.query = text;
    ui.dict.status = 'loading';
    ui.dict.message = '';
    ui.dict.entry = null;
    ui.dict.suggestions = [];
    render();
    var prepare = dictLooksVi(text) ? dictTranslate(text, 'vi|en') : Promise.resolve(text);
    prepare.then(function (english) {
      var word = String(english || text).trim().toLowerCase();
      var ctrl = typeof AbortController === 'function' ? new AbortController() : null;
      var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 12000);
      return fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + encodeURIComponent(word), ctrl ? { signal: ctrl.signal } : undefined).then(function (res) {
        clearTimeout(timer);
        if (!res.ok) throw new Error('missing');
        return res.json();
      }, function (err) {
        clearTimeout(timer);
        throw err;
      });
    }).then(function (rows) {
      if (!rows || !rows[0]) throw new Error('missing');
      return dictBuild(rows[0]);
    }).then(function (entry) {
      if (id !== dictLook) return;
      ui.dict.entry = entry;
      ui.dict.query = entry.word || ui.dict.query;
      ui.dict.status = 'ready';
      ui.dict.tab = 'mean';
      render();
    }).catch(function () {
      if (id !== dictLook) return;
      ui.dict.status = 'error';
      ui.dict.message = 'Không thấy mục từ này trong từ điển tiếng Anh.';
      render();
    });
  }

  function dictDownload(file) {
    var link = document.createElement('a');
    var url = URL.createObjectURL(file);
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }

  function dictPutFile(blob, filename) {
    var type = blob.type || 'application/octet-stream';
    var file = new File([blob], filename, { type: type });
    dictDownload(file);
    toast('Đã tải ' + filename + '. Gửi file này vào Zalo.');
    return Promise.resolve();
  }

  function dictCsvSplit(line) {
    var out = [];
    var cur = '';
    var quoted = false;
    for (var i = 0; i < line.length; i++) {
      var ch = line.charAt(i);
      if (quoted) {
        if (ch === '"') {
          if (line.charAt(i + 1) === '"') { cur += '"'; i += 1; }
          else quoted = false;
        } else cur += ch;
      } else if (ch === '"') quoted = true;
      else if (ch === ',') { out.push(cur); cur = ''; }
      else cur += ch;
    }
    out.push(cur);
    return out;
  }

  function dictCefrKeep(map, word, level) {
    var key = String(word || '').trim().toLowerCase();
    var lv = String(level || '').trim().toUpperCase();
    if (!key || !DICT_CEFR_RANK[lv]) return;
    if (!map[key] || DICT_CEFR_RANK[lv] < DICT_CEFR_RANK[map[key]]) map[key] = lv;
  }

  function dictCefrParse(text, map) {
    var lines = String(text || '').split(/\r?\n/);
    if (!lines.length) return;
    var head = dictCsvSplit(lines[0]);
    var wordCol = 0;
    var levelCol = 2;
    head.forEach(function (name, index) {
      var label = String(name || '').trim().toLowerCase();
      if (label === 'headword' || label === 'lemma' || label === 'word') wordCol = index;
      if (label === 'cefr') levelCol = index;
    });
    for (var i = 1; i < lines.length; i++) {
      if (!lines[i]) continue;
      var cols = dictCsvSplit(lines[i]);
      var word = cols[wordCol] || '';
      var level = cols[levelCol] || '';
      dictCefrKeep(map, word, level);
      word.split('/').forEach(function (part) { dictCefrKeep(map, part, level); });
    }
  }

  function dictCefrLoad() {
    if (dictCefr.state) return;
    dictCefr.state = 'loading';
    var urls = [
      'https://raw.githubusercontent.com/openlanguageprofiles/olp-en-cefrj/master/cefrj-vocabulary-profile-1.5.csv',
      'https://raw.githubusercontent.com/openlanguageprofiles/olp-en-cefrj/master/octanove-vocabulary-profile-c1c2-1.0.csv'
    ];
    Promise.all(urls.map(function (url) {
      var ctrl = typeof AbortController === 'function' ? new AbortController() : null;
      var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 8000);
      return fetch(url, ctrl ? { signal: ctrl.signal } : undefined).then(function (res) {
        if (!res.ok) throw new Error('cefr');
        return res.text();
      }).then(function (text) {
        clearTimeout(timer);
        return text;
      }, function () {
        clearTimeout(timer);
        return '';
      });
    })).then(function (files) {
      var map = {};
      var any = false;
      files.forEach(function (text) {
        if (!text) return;
        any = true;
        dictCefrParse(text, map);
      });
      dictCefr.map = map;
      dictCefr.state = any ? 'ready' : 'miss';
      dictPaintCefr();
    });
  }

  function dictCefrOf(word) {
    if (!dictCefr.map) return '';
    return dictCefr.map[String(word || '').toLowerCase()] || '';
  }

  function dictCefrHtml(word) {
    if (dictCefr.state === 'loading' && !dictCefr.map) {
      return '<p class="dict-cefr"><span class="cefr-badge cefr-none">…</span> Đang tìm mức CEFR</p>';
    }
    var level = dictCefrOf(word);
    if (!level) return '<p class="dict-cefr"><span class="cefr-badge cefr-none">Chưa rõ</span> Chưa có mức CEFR cho từ này</p>';
    return '<p class="dict-cefr"><span class="cefr-badge cefr-' + level.toLowerCase() + '">' + esc(level) + '</span> CEFR</p>';
  }

  function dictPaintCefr() {
    var node = document.querySelector('.dict-cefr');
    var entry = ui.dict.entry;
    if (!node || !entry || ui.screen !== 'dictionary') return;
    node.outerHTML = dictCefrHtml(entry.word);
  }

  function dictSpeak(text, lang) {
    var line = String(text || '').trim();
    if (!line) { toast('Chưa có câu để nghe.'); return; }
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      toast('Trình duyệt này không đọc được câu.');
      return;
    }
    window.speechSynthesis.cancel();
    var utter = new SpeechSynthesisUtterance(line);
    utter.lang = lang === 'vi' ? 'vi-VN' : 'en-GB';
    utter.rate = 0.95;
    window.speechSynthesis.speak(utter);
  }

  function dictSentenceHtml(d) {
    var out = '';
    if (d.sentenceStatus === 'loading') out = '<p class="help">Đang dịch câu...</p>';
    else if (d.sentenceStatus === 'error') {
      out = '<p class="help">Chưa dịch được câu này.</p>' +
        '<div class="btn-row"><button type="button" class="btn" data-act="dict-speak" data-kind="sentence" data-lang="' + (dictLooksVi(d.sentence) ? 'vi' : 'en') + '">Nghe câu</button></div>';
    } else if (d.sentenceVi) {
      var srcLang = d.sentencePair === 'vi|en' ? 'vi' : 'en';
      var dstLang = d.sentencePair === 'vi|en' ? 'en' : 'vi';
      out = '<p class="dict-sentence-out">' + esc(d.sentenceVi) + '</p>' +
        '<div class="btn-row"><button type="button" class="btn" data-act="dict-speak" data-kind="sentence" data-lang="' + srcLang + '">Nghe câu</button>' +
        '<button type="button" class="btn" data-act="dict-speak" data-kind="sentence-vi" data-lang="' + dstLang + '">Nghe bản dịch</button></div>';
    }
    return '<section class="dict-sentence" id="dict-sentence-box"><h3>Dịch câu</h3>' +
      '<p class="help">Nhập một câu tiếng Anh hoặc tiếng Việt. Nghe câu gốc và bản dịch bằng giọng đọc của máy.</p>' +
      '<label class="field"><span>Câu</span><textarea id="dict-sentence" maxlength="450">' + esc(d.sentence || '') + '</textarea></label>' +
      '<div class="btn-row"><button type="button" class="btn btn-primary" data-act="dict-sentence">Dịch câu</button></div>' +
      out + '</section>';
  }

  function dictTranslateSentence() {
    var box = document.getElementById('dict-sentence');
    var text = box ? String(box.value || '').trim() : String(ui.dict.sentence || '').trim();
    if (!text) { toast('Hãy nhập một câu.'); return; }
    ui.dict.sentence = text;
    ui.dict.sentenceStatus = 'loading';
    ui.dict.sentenceVi = '';
    ui.dict.sentencePair = dictLooksVi(text) ? 'vi|en' : 'en|vi';
    render();
    var id = ++dictSentenceSeq;
    var pair = ui.dict.sentencePair;
    dictTranslate(text, pair).then(function (translated) {
      if (id !== dictSentenceSeq || ui.screen !== 'dictionary') return;
      ui.dict.sentenceStatus = translated ? 'ready' : 'error';
      ui.dict.sentenceVi = translated || '';
      render();
    });
  }

  function dictPrimeAudio() {
    var Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;
    if (!dictAudioCtx) dictAudioCtx = new Ctor();
    if (dictAudioCtx.state === 'suspended') dictAudioCtx.resume();
    return dictAudioCtx;
  }

  function dictToVideo(blob, word, ipa) {
    var ctx = dictPrimeAudio();
    if (!ctx || !window.MediaRecorder) return Promise.reject(new Error('recorder'));
    var mime = '';
    ['video/mp4', 'video/webm;codecs=vp8,opus', 'video/webm'].some(function (item) {
      if (MediaRecorder.isTypeSupported(item)) { mime = item; return true; }
      return false;
    });
    if (!mime) return Promise.reject(new Error('recorder'));
    return blob.arrayBuffer().then(function (buffer) {
      return ctx.decodeAudioData(buffer.slice(0));
    }).then(function (audioBuf) {
      return new Promise(function (resolve, reject) {
        try {
          var dest = ctx.createMediaStreamDestination();
          var source = ctx.createBufferSource();
          source.buffer = audioBuf;
          source.connect(dest);
          var canvas = document.createElement('canvas');
          canvas.width = 640;
          canvas.height = 360;
          var pen = canvas.getContext('2d');
          pen.fillStyle = '#0c4a72';
          pen.fillRect(0, 0, 640, 360);
          pen.fillStyle = '#fff6d8';
          pen.font = '700 56px sans-serif';
          pen.fillText(word || 'Ocean EDU', 36, 160);
          pen.font = '600 28px sans-serif';
          pen.fillText(ipa || '', 36, 220);
          var videoTrack = canvas.captureStream(12).getVideoTracks()[0];
          var audioTrack = dest.stream.getAudioTracks()[0];
          var stream = new MediaStream([videoTrack, audioTrack]);
          var recorder = new MediaRecorder(stream, { mimeType: mime });
          var chunks = [];
          recorder.ondataavailable = function (event) {
            if (event.data && event.data.size) chunks.push(event.data);
          };
          recorder.onerror = function () { reject(new Error('recorder')); };
          recorder.onstop = function () {
            videoTrack.stop();
            source.disconnect();
            var type = mime.split(';')[0];
            resolve(new Blob(chunks, { type: type }));
          };
          recorder.start();
          source.start();
          setTimeout(function () {
            if (recorder.state !== 'inactive') recorder.stop();
          }, Math.max(700, Math.ceil(audioBuf.duration * 1000) + 200));
        } catch (err) { reject(err); }
      });
    });
  }

  function dictCopy(index, asVideo) {
    var entry = ui.dict.entry;
    var audio = entry && entry.audios && entry.audios[index];
    if (!audio || !audio.copyUrl) {
      toast('Bản này chỉ nghe trên trình duyệt. Hãy tải bản Wikimedia Commons.');
      return;
    }
    dictPrimeAudio();
    toast(asVideo ? 'Đang đóng file video...' : 'Đang lấy file phát âm...');
    fetch(audio.copyUrl).then(function (res) {
      if (!res.ok) throw new Error('audio');
      return res.blob();
    }).then(function (blob) {
      if (!asVideo) return dictPutFile(blob, audio.fileName || ((entry.word || 'word') + '.ogg'));
      return dictToVideo(blob, entry.word, entry.ipa).then(function (video) {
        var ext = video.type.indexOf('mp4') >= 0 ? 'mp4' : 'webm';
        return dictPutFile(video, (entry.word || 'word') + '.' + ext);
      });
    }).catch(function () {
      toast(asVideo ? 'Không tạo được file video từ bản ghi này.' : 'Không lấy được file phát âm từ nguồn mạng.');
    });
  }

  function dictSenseHtml(sense, index) {
    var glosses = sense.glosses.map(function (gloss, gi) {
      var example = gloss.example
        ? '<p class="dict-example">' + esc(gloss.example) + '</p><button type="button" class="btn" data-act="dict-speak" data-kind="example" data-sense="' + index + '" data-gloss="' + gi + '" data-lang="en">Nghe ví dụ</button>'
        : '';
      var exampleVi = gloss.exampleVi
        ? '<p class="dict-example-vi">' + esc(gloss.exampleVi) + '</p><button type="button" class="btn" data-act="dict-speak" data-kind="example-vi" data-sense="' + index + '" data-gloss="' + gi + '" data-lang="vi">Nghe nghĩa ví dụ</button>'
        : '';
      return '<p class="dict-en">' + esc(gloss.en) + '</p>' +
        (gloss.vi ? '<p class="dict-vi-def">' + esc(gloss.vi) + '</p>' : '') + example + exampleVi;
    }).join('');
    var syn = sense.synonyms.length
      ? '<p class="dict-syn">Đồng nghĩa: ' + sense.synonyms.map(function (item) {
        return esc(item.word) + (item.pos ? ' (' + esc(item.pos) + ')' : '');
      }).join(', ') + '</p>'
      : '';
    return '<article class="dict-sense"><h3><span class="dict-pos">' + esc(sense.posVi || 'từ') + '</span> ' +
      (index > 0 ? 'Nghĩa khác' : 'Nghĩa chính') + '</h3>' + glosses + syn + '</article>';
  }

  function dictAudioHtml(entry) {
    if (!entry.audios.length) return '<p class="help">Chưa có file phát âm mở cho từ này.</p>';
    return entry.audios.map(function (audio, index) {
      var copy = audio.copyUrl
        ? '<div class="btn-row"><button type="button" class="btn" data-act="dict-copy-audio" data-index="' + index + '">Tải audio</button>' +
          '<button type="button" class="btn" data-act="dict-copy-mp4" data-index="' + index + '">Tải mp4</button></div>' +
          '<p class="help">Tải audio lấy file gốc. Tải mp4 gắn phát âm vào một video ngắn để gửi vào Zalo khi khung chat không nhận file âm thanh.</p>'
        : '<p class="help">Nguồn này phát trong trình duyệt. Muốn tải file thì dùng bản Wikimedia Commons.</p>';
      return '<article class="dict-audio-row"><h3>' + esc(audio.label) + '</h3>' +
        '<audio class="dict-player" controls preload="none" src="' + esc(audio.playUrl) + '"></audio>' +
        '<p class="help">Nguồn: ' + esc(audio.source) + '</p>' + copy + '</article>';
    }).join('');
  }

  function viewDictionary() {
    dictCefrLoad();
    var d = ui.dict;
    var body = '';
    if (d.status === 'loading') body = '<p class="help">Đang tra từ điển...</p>';
    else if (d.status === 'error') body = '<p class="help">' + esc(d.message || 'Không tra được từ.') + '</p>';
    else if (d.entry) {
      var entry = d.entry;
      var tabs = '<div class="btn-row dict-tabs">' +
        '<button type="button" class="btn' + (d.tab !== 'audio' ? ' btn-primary' : '') + '" data-act="dict-tab" data-tab="mean">Nghĩa</button>' +
        '<button type="button" class="btn' + (d.tab === 'audio' ? ' btn-primary' : '') + '" data-act="dict-tab" data-tab="audio">Phát âm</button></div>';
      var panel = d.tab === 'audio'
        ? '<div id="dict-audio">' + dictAudioHtml(entry) + '</div>'
        : '<div id="dict-mean">' + entry.senses.map(function (sense, index) { return dictSenseHtml(sense, index); }).join('') + '</div>';
      body = '<section class="dict-entry"><div class="dict-head"><h2 class="dict-word">' + esc(entry.word) + '</h2>' +
        dictCefrHtml(entry.word) + '</div>' +
        (entry.ipa ? '<p class="dict-ipa">' + esc(entry.ipa) + '</p>' : '') +
        (entry.vi ? '<p class="dict-vi">' + esc(entry.vi) + '</p>' : '<p class="help">Chưa có nghĩa tiếng Việt.</p>') +
        tabs + panel + '</section>';
    }
    var suggests = (d.suggestions || []).map(function (item) {
      return '<button type="button" data-act="dict-pick" data-word="' + esc(item.word) + '">' + esc(item.label) + '</button>';
    }).join('');
    return shell('<div class="section-head"><div><span class="nav-pair"><button type="button" class="btn" data-act="nav" data-screen="menu">← Menu</button>' + homeButton() + '</span>' +
      '<h2>Dictionary</h2><p class="meta">Mục I</p><span class="comic-meta">Bản meta thử nghiệm</span></div></div>' +
      '<p class="help">Tra như một từ điển: từ tiếng Anh, nghĩa tiếng Việt, mức CEFR, định nghĩa hai thứ tiếng, ví dụ và từ đồng nghĩa. Gõ tiếng Anh hoặc tiếng Việt để hiện gợi ý. Dịch một câu rồi nghe câu đó và các ví dụ. File nghe lấy từ Google Dictionary và bản ghi mở trên Wikimedia Commons.</p>' +
      '<label class="field dict-search"><span>Từ vựng</span><input id="dict-q" placeholder="tiếng Anh hoặc tiếng Việt" autocomplete="off" value="' + esc(d.query || '') + '">' +
      '<div id="dict-suggest" class="dict-suggest"' + (suggests ? '' : ' hidden') + '>' + suggests + '</div></label>' +
      '<div class="btn-row"><button type="button" class="btn btn-primary" data-act="dict-lookup">Tra từ</button></div>' +
      body + dictSentenceHtml(d));
  }

  function viewScrollKey() {
    return [
      ui.screen || '',
      ui.classId || '',
      ui.remarkClassId || '',
      ui.remarkSession || '',
      ui.remarkMonth || '',
      ui.careClassId || '',
      ui.careMonth || '',
      ui.curriculumId || '',
      ui.curriculumMonth || '',
      ui.examId || '',
      ui.examWeek || '',
      ui.profileId || '',
      ui.profileMonth || '',
      ui.archiveFolder || '',
      ui.peopleKey || '',
      ui.hwMonth || '',
      ui.staffMonth || '',
      ui.boardMonth || ''
    ].join('|');
  }

  function readScrollShot() {
    var boxes = {};
    document.querySelectorAll('[data-scroll-keep]').forEach(function (el) {
      var id = el.getAttribute('data-scroll-keep');
      if (!id) return;
      boxes[id] = { top: el.scrollTop || 0, left: el.scrollLeft || 0 };
    });
    return {
      x: window.pageXOffset || document.documentElement.scrollLeft || 0,
      y: window.pageYOffset || document.documentElement.scrollTop || 0,
      boxes: boxes
    };
  }

  function writeScrollShot(shot) {
    if (!shot) return;
    window.scrollTo(shot.x || 0, shot.y || 0);
    document.querySelectorAll('[data-scroll-keep]').forEach(function (el) {
      var saved = shot.boxes[el.getAttribute('data-scroll-keep')];
      if (!saved) return;
      el.scrollTop = saved.top;
      el.scrollLeft = saved.left;
    });
  }

  function render() {
    var root = document.getElementById('app');
    var html = '';
    var nextKey = '';
    var shot = null;
    try {
      if (ui.user && ui.screen !== 'login') sweepRoster();
      if (!ui.user || ui.screen === 'login') html = viewLogin();
      else if (heldClasses().length) html = viewCodeGate();
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
      else if (ui.screen === 'dictionary') html = viewDictionary();
      else if (ui.screen === 'personnel') html = viewPeople();
      else if (ui.screen === 'care') html = viewCare();
      else if (ui.screen === 'profile') html = viewProfile();
      else if (ui.screen === 'remarks') html = viewRemarks();
      else if (ui.screen === 'remark-read') html = viewRemarkRead();
      else html = viewMenu();
      nextKey = viewScrollKey();
      shot = readScrollShot();
      root.innerHTML = html;
    } catch (err) {
      console.error(err);
      root.innerHTML = '<div class="wrap"><p>Không mở được giao diện. Tải lại trang.</p></div>';
      shot = null;
      scrollLatch.key = '';
    }
    paintTitles();
    paintClock();
    paintThemeButtons();
    paintTransferLevel();
    applyAccountLook();
    pulseMinimal();
    paintDesk();
    pinBars();
    hydratePhotos();
    bindPhotoZoom();
    var sameScroll = !!(shot && nextKey && nextKey === scrollLatch.key);
    if (sameScroll) writeScrollShot(shot);
    if (nextKey) scrollLatch.key = nextKey;
    var composer = document.getElementById('remark-composer');
    if (composer && composer.getAttribute('contenteditable') === 'true') {
      try { composer.focus({ preventScroll: true }); } catch (ignoreFocus) {}
    }
    if (sameScroll) writeScrollShot(shot);
    if (ui.screen === 'dictionary') {
      document.querySelectorAll('audio.dict-player').forEach(function (el) {
        el.addEventListener('error', function () {
          var row = el.closest ? el.closest('.dict-audio-row') : null;
          if (row) row.hidden = true;
        });
      });
    }
  }

  function pinBars() {
    var bar = document.querySelector('#app .topbar');
    if (!bar) return;
    document.documentElement.style.setProperty('--topbar-h', bar.offsetHeight + 'px');
  }

  function pulseMinimal() {
    var app = document.getElementById('app');
    if (!app) return;
    app.classList.remove('is-enter');
    if (document.documentElement.getAttribute('data-skin') !== 'goth') return;
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
      var classCode = String(data.get('classCode') || '').trim();
      if (!classCode) { showFormError('Điền mã lớp.'); return; }
      if (cls.codeHold && cls.classCode && classCode === String(cls.classCode).trim()) {
        showFormError('Lớp vừa lên trình độ. Nhập mã lớp mới, khác mã đang có.');
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
      cls.classCode = classCode;
      if (cls.codeHold) cls.codeHold = false;
      if (cls.endOpen && closeEnd && closeEnd.checked) cls.endOpen = false;
      if (edited.name && edited.name !== oldName) {
        L.pushNotice(state, new Date(), L.formatDMY(new Date()) + ': đổi ' + oldName + ' thành ' + edited.name + '.');
      }
      logAction('thay đổi thông tin lớp ' + L.currentName(cls));
      finishClassSave('Đã lưu thông tin lớp.', edited.identity ? cls.id : '');
      return;
    }
    var grade = L.gradeById(String(data.get('grade')));
    var classCode = String(data.get('classCode') || '').trim();
    var startDate = L.parseDateInput(data.get('start'));
    if (!classCode) { showFormError('Điền mã lớp.'); return; }
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
      customName: customName,
      classCode: classCode
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
    var isFresh = ui.modal.type !== 'edit-student' && !rejoinId;
    if (!isFresh && L.codeTaken(state.classes, code, except, state.archive)) { showFormError(codeTakenNotice(code, except)); return; }
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
      phone2: String(data.get('phone2') || '').trim(),
      parentName: String(data.get('parentName') || '').trim(),
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
    if (!rejoinId) {
      payload.joinedAt = new Date().toISOString();
      if (enroll === 'trial' && bits[0]) {
        var trialDate = L.parseDateInput(bits[0]);
        if (trialDate) payload.joinedAt = L.atTime(trialDate, bits[1] || '00:00').toISOString();
      }
    }
    if (ui.modal.type === 'edit-student') {
      var found = findStudent(ui.modal.id);
      Object.keys(payload).forEach(function (key) { found.stu[key] = payload[key]; });
      ui.modal = null;
      ui.formError = '';
      save();
      toast('Đã lưu học viên.');
      render();
      return;
    }
    if (rejoinId) {
      commitNewStudent(payload, rejoinId);
      finishStudentSave('Đã lưu học viên.');
      return;
    }
    var twins = enroll === 'official' ? L.findOfficialTwins(state.classes, name, room && room.id, code, new Date()) : [];
    if (twins.length) {
      ui.formError = '';
      ui.modal = { type: 'dup-student', payload: payload, hits: twins, queue: [] };
      render();
      return;
    }
    if (L.codeTaken(state.classes, code, null, state.archive)) { showFormError(codeTakenNotice(code, null)); return; }
    commitNewStudent(payload, '');
    finishStudentSave('Đã lưu học viên.');
  }

  function fieldFilled(value) {
    var text = String(value == null ? '' : value).trim();
    return text !== '' && text !== '?' && text !== '-';
  }

  function overlayStudent(stu, payload) {
    ['englishName', 'gender', 'dob', 'phone', 'ec'].forEach(function (key) {
      if (fieldFilled(payload[key])) stu[key] = payload[key];
    });
    if (!fieldFilled(payload.code) || payload.code === stu.code) return;
    if (!L.codeTaken(state.classes, payload.code, stu.id, state.archive)) stu.code = payload.code;
  }

  function commitNewStudent(payload, rejoinId) {
    var cls = findClass(ui.classId);
    if (!cls) return;
    var archived = null;
    if (rejoinId) {
      (state.archive || []).forEach(function (item) { if (item.id === rejoinId) archived = item; });
      payload.id = rejoinId;
      payload.joinedAt = new Date().toISOString();
    }
    payload.originClassId = cls.id;
    var made = L.createStudent(payload);
    if (archived) {
      made.notes = Array.isArray(archived.notes) ? archived.notes : [];
      made.transfers = Array.isArray(archived.transfers) ? archived.transfers : [];
      state.archive = (state.archive || []).filter(function (item) { return item.id !== rejoinId; });
    }
    cls.students.push(made);
    return made;
  }

  function finishStudentSave(message) {
    ui.modal = null;
    ui.formError = '';
    save();
    toast(message || 'Đã lưu học viên.');
    render();
  }

  function continueTwinQueue(message) {
    var queue = ui.modal && ui.modal.queue ? ui.modal.queue.slice() : [];
    var room = findClass(ui.classId);
    if (queue.length && room && listedCount(room, new Date()) >= 20) {
      queue = [];
      message = (message ? message + ' ' : '') + ROSTER_FULL;
    }
    if (!queue.length) {
      finishStudentSave(message);
      return;
    }
    var next = queue.shift();
    ui.modal = { type: 'dup-student', payload: next.payload, hits: next.hits || [], queue: queue };
    ui.formError = '';
    save();
    toast(message);
    render();
  }

  function acceptTwin(id, fromId) {
    if (deny(canEdit()) || !ui.modal || ui.modal.type !== 'dup-student' || !ui.modal.payload) return;
    var room = findClass(ui.classId);
    if (!room) return;
    var result = L.transferStudents(state, fromId, room.id, [id], new Date());
    if (result.error) { showFormError(result.error); return; }
    var found = findStudent(id);
    if (found) overlayStudent(found.stu, ui.modal.payload);
    continueTwinQueue('Đã chuyển học viên trùng vào lớp này.');
  }

  function skipTwin() {
    if (deny(canEdit()) || !ui.modal || ui.modal.type !== 'dup-student' || !ui.modal.payload) return;
    var room = findClass(ui.classId);
    if (room && listedCount(room, new Date()) >= 20) { showFormError(ROSTER_FULL); return; }
    var payload = ui.modal.payload;
    var typed = String(payload.code || '').trim();
    var reassigned = !typed || L.codeTaken(state.classes, typed, null, state.archive);
    if (reassigned) payload.code = L.nextStudentCode(state.classes, state.archive);
    commitNewStudent(payload, '');
    continueTwinQueue(reassigned
      ? 'Đã thêm học viên mới. Mã trùng nên đã cấp ' + payload.code + '.'
      : 'Đã thêm học viên mới.');
  }

  function saveDetail() {
    if (deny(canEdit())) return;
    var found = findStudent(ui.detailId);
    if (!found) return;
    var phone = document.getElementById('d-phone');
    var phone2 = document.getElementById('d-phone-2');
    var parent = document.getElementById('d-parent');
    found.stu.phone = phone ? phone.value.trim() : found.stu.phone;
    if (phone2) found.stu.phone2 = phone2.value.trim();
    if (parent) found.stu.parentName = parent.value.trim();
    var notes = [];
    document.querySelectorAll('#note-list .note-row').forEach(function (row) {
      var month = row.querySelector('[data-month]').value;
      var text = row.querySelector('[data-text]').value.trim();
      if (!month || !text) return;
      notes.push({ id: row.getAttribute('data-id') || L.uid(), month: month, text: text });
    });
    found.stu.notes = notes;
    var bookEl = document.getElementById('d-book');
    var bookEl2 = document.getElementById('d-book-2');
    var selfEl = document.getElementById('d-pec-self');
    var userEl = document.getElementById('d-pec-user');
    var passEl = document.getElementById('d-pec-pass');
    if ((bookEl || bookEl2) && found.cls) {
      var bookPatch = {
        pecMode: selfEl && selfEl.checked ? 'self' : '',
        pecUser: userEl ? userEl.value : '',
        pecPass: passEl ? passEl.value : ''
      };
      if (bookEl2) {
        bookPatch.books = [
          { status: bookEl ? bookEl.value : 'not-bought' },
          { status: bookEl2.value }
        ];
      } else if (bookEl) {
        bookPatch.bookStatus = bookEl.value;
      }
      writeCurriculum(found.stu, L.currentLevel(found.cls), bookPatch);
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
    var when = new Date();
    var fromCls = findClass(ui.classId);
    var toCls = findClass(target.value);
    var ids = selectedIds().slice();
    var moving = [];
    ids.forEach(function (id) {
      var found = findStudent(id);
      if (found) moving.push({ name: found.stu.name, code: found.stu.code });
    });
    var result = L.transferStudents(state, ui.classId, target.value, ids, when);
    if (result.error) { showFormError(result.error); return; }
    if (ui.detailId && result.moved.indexOf(ui.detailId) >= 0) ui.detailId = null;
    ui.selected = {};
    ui.formError = '';
    ui.modal = { type: 'transfer-ask', text: L.transferReport(fromCls, toCls, moving, when) };
    logAction('chuyển ' + result.moved.length + ' học viên tới ' + result.toName);
    save();
    toast('Đã chuyển ' + result.moved.length + ' học viên tới ' + result.toName + '.' + (result.levelGap ? ' Bạn đang xếp chuyển lớp lệch trình độ.' : ''));
    render();
  }

  function copyReport() {
    var box = document.getElementById('report-text');
    var text = box ? box.value : ((ui.modal && ui.modal.text) || '');
    function done() { toast('Đã copy nội dung.'); }
    function fallback() {
      if (!box) { toast('Không copy được.'); return; }
      box.focus();
      box.select();
      try {
        if (document.execCommand('copy')) done();
        else toast('Không copy được.');
      } catch (err) { toast('Không copy được.'); }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(fallback);
      return;
    }
    fallback();
  }

  function openBookMessage() {
    if (!canEdit()) return;
    var cls = findClass(ui.curriculumId);
    if (!cls) return;
    var level = curriculumLevelOf(cls);
    var grade = L.gradeById(level && (level.gradeId || cls.gradeId));
    var books = L.classLevelBooks(cls, level);
    var active = [];
    var paused = [];
    (cls.students || []).forEach(function (stu) {
      if (isPausedStudent(stu)) paused.push(stu);
      else active.push(stu);
    });
    var ordered = L.sortStudents(active, 'name').concat(L.sortStudents(paused, 'name'));
    var picked = ordered.filter(function (stu) { return ui.bookPick[stu.id]; });
    if (!picked.length) { toast('Chọn học viên trước.'); return; }
    ui.formError = '';
    ui.modal = { type: 'copy', text: L.feeReport(picked, books, new Date()) };
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
    if (!ui.skinFold) {
      var nowSkin = skinOf(currentAccount());
      SKIN_BOOK.forEach(function (group) {
        group.items.forEach(function (item) {
          if (item.id === nowSkin) ui.skinFold = group.id;
        });
      });
    }
    ui.skinPeek = skinOf(currentAccount());
    paintSkinDesk();
    paintIface();
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

  function cssHex(value, fallback) {
    var text = String(value || '').trim();
    var hex = text.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (hex) {
      var h = hex[1];
      if (h.length === 3) h = h.charAt(0) + h.charAt(0) + h.charAt(1) + h.charAt(1) + h.charAt(2) + h.charAt(2);
      return '#' + h.toLowerCase();
    }
    var rgb = text.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
    if (!rgb) return fallback;
    function pair(n) {
      var s = Number(n).toString(16);
      return s.length < 2 ? '0' + s : s;
    }
    return '#' + pair(rgb[1]) + pair(rgb[2]) + pair(rgb[3]);
  }

  function colorLum(hex) {
    var h = String(hex || '').replace('#', '');
    if (h.length !== 6) return 0;
    function chan(i) { return parseInt(h.slice(i, i + 2), 16) / 255; }
    return 0.2126 * chan(0) + 0.7152 * chan(2) + 0.0722 * chan(4);
  }

  function exportTheme() {
    var cs = getComputedStyle(document.documentElement);
    function pick(name, fallback) { return cssHex(cs.getPropertyValue(name), fallback); }
    var paper = pick('--paper', '#f7fbff');
    var paper2 = pick('--paper2', '#e5f4ff');
    var ink = pick('--ink', '#12324a');
    var sea = pick('--sea-deep', '#0c4a72');
    var line = pick('--line', sea);
    var muted = pick('--muted', ink);
    var chip = pick('--chip', '#ffffff');
    var onAccent = pick('--on-accent', '#ffffff');
    var bandInk = colorLum(sea) > 0.62 ? ink : onAccent;
    if (colorLum(sea) > 0.62 && Math.abs(colorLum(bandInk) - colorLum(sea)) < 0.25) bandInk = '#12324a';
    var headInk = colorLum(paper2) > 0.55 ? (colorLum(sea) < 0.75 ? sea : ink) : onAccent;
    if (Math.abs(colorLum(headInk) - colorLum(paper2)) < 0.25) headInk = ink;
    var body = getComputedStyle(document.body);
    var sample = document.querySelector('#app h2') || document.body;
    var headFont = getComputedStyle(sample).fontFamily || body.fontFamily;
    return {
      paper: paper,
      paper2: paper2,
      ink: ink,
      sea: sea,
      line: line,
      muted: muted,
      chip: chip,
      bandInk: bandInk,
      headInk: headInk,
      font: body.fontFamily || '"Segoe UI", sans-serif',
      headFont: headFont || body.fontFamily || '"Segoe UI", sans-serif'
    };
  }

  function applyPrintTheme(theme) {
    var root = document.documentElement;
    root.style.setProperty('--print-paper', theme.paper);
    root.style.setProperty('--print-ink', theme.ink);
    root.style.setProperty('--print-muted', theme.muted);
    root.style.setProperty('--print-font', theme.font);
    root.style.setProperty('--print-head-font', theme.headFont);
    root.style.setProperty('--print-head', theme.paper2);
    root.style.setProperty('--print-head-ink', theme.headInk);
    root.style.setProperty('--print-line', theme.line);
    root.style.setProperty('--print-band', theme.sea);
    root.style.setProperty('--print-band-ink', theme.bandInk);
    root.style.setProperty('--print-gap', theme.paper2);
    root.style.setProperty('--print-chip', theme.chip);
  }

  function drawSheet(spec) {
    var theme = spec.theme || exportTheme();
    var scale = 2;
    var padX = 8;
    var lineH = 16;
    var font = '14px ' + theme.font;
    var bold = '700 14px ' + theme.font;
    var titleFont = '700 22px ' + theme.headFont;
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
    g.fillStyle = theme.paper;
    g.fillRect(0, 0, width, height);
    g.fillStyle = theme.sea;
    g.fillRect(0, 0, 10, height);
    g.fillStyle = theme.headInk;
    g.font = titleFont;
    g.textAlign = 'left';
    g.textBaseline = 'alphabetic';
    g.fillText(spec.title, 24, 30);
    g.font = font;
    g.fillStyle = theme.muted;
    meta.forEach(function (line, index) { g.fillText(line, 24, 56 + index * 20); });
    var x0 = 24;
    var y = top;
    var cuts = [];
    function box(x, yPos, w, h, fill) {
      g.fillStyle = fill;
      g.fillRect(x, yPos, w, h);
      g.strokeStyle = theme.line;
      g.lineWidth = 1;
      g.strokeRect(x + 0.5, yPos + 0.5, w - 1, h - 1);
    }
    function paintLines(text, x, yPos, w, h, color, face) {
      g.save();
      g.beginPath();
      g.rect(x + 1, yPos + 1, Math.max(1, w - 2), Math.max(1, h - 2));
      g.clip();
      g.fillStyle = color;
      g.font = face;
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      var lines = String(text || '').split('\n');
      var block = lines.length * lineH;
      var startY = yPos + (h - block) / 2 + lineH / 2;
      lines.forEach(function (line, lineIndex) {
        g.fillText(line, x + w / 2, startY + lineIndex * lineH);
      });
      g.restore();
    }
    var x = x0;
    spec.headers.forEach(function (header, index) {
      box(x, y, widths[index], headerH, theme.paper2);
      paintLines(header, x, y, widths[index], headerH, theme.headInk, bold);
      x += widths[index];
    });
    y += headerH;
    cuts.push(Math.round(y * scale));
    spec.rows.forEach(function (row, index) {
      var h = heights[index];
      if (row.kind === 'band' || row.kind === 'gap') {
        var band = row.kind === 'band';
        box(x0, y, tableW, h, band ? theme.sea : theme.paper2);
        paintLines((row.cells && row.cells[0]) || '', x0, y, tableW, h, band ? theme.bandInk : theme.ink, bold);
        y += h;
        cuts.push(Math.round(y * scale));
        return;
      }
      var cx = x0;
      for (var i = 0; i < cols; i++) {
        box(cx, y, widths[i], h, (row.fills && row.fills[i]) || theme.chip);
        paintLines((row.cells && row.cells[i]) || '', cx, y, widths[i], h, (row.ink && row.ink[i]) || theme.ink, font);
        cx += widths[i];
      }
      y += h;
      cuts.push(Math.round(y * scale));
    });
    g.textAlign = 'left';
    g.textBaseline = 'alphabetic';
    canvas._cuts = cuts;
    return canvas;
  }

  function sliceCanvas(src, theme) {
    var paper = theme && theme.paper ? theme.paper : '#f7fbff';
    var sliceH = Math.max(1, Math.floor(src.width * 595.28 / 841.89));
    var cuts = src._cuts && src._cuts.length ? src._cuts.slice() : [];
    if (!cuts.length || cuts[cuts.length - 1] !== src.height) cuts.push(src.height);
    var pages = [];
    var start = 0;
    while (start < src.height) {
      var end = Math.min(src.height, start + sliceH);
      if (end < src.height) {
        var best = start;
        for (var i = 0; i < cuts.length; i++) {
          if (cuts[i] > start && cuts[i] <= end) best = cuts[i];
        }
        if (best > start) end = best;
      }
      var h = Math.max(1, end - start);
      var piece = document.createElement('canvas');
      piece.width = src.width;
      piece.height = h;
      var ctx = piece.getContext('2d');
      ctx.fillStyle = paper;
      ctx.fillRect(0, 0, piece.width, piece.height);
      ctx.drawImage(src, 0, start, src.width, h, 0, 0, src.width, h);
      pages.push(piece);
      start = end;
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
    var theme = spec.theme || exportTheme();
    applyPrintTheme(theme);
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
      for (var i = 0; i < cols; i++) {
        var style = '';
        if (row.fills && row.fills[i]) style += 'background:' + row.fills[i] + ';';
        if (row.ink && row.ink[i]) style += 'color:' + row.ink[i] + ';';
        tds.push('<td' + (style ? ' style="' + style + '"' : '') + '>' + cellHtml(cells[i] == null ? '' : cells[i]) + '</td>');
      }
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
    spec.theme = exportTheme();
    if (kind === 'print') { printSpec(spec); return; }
    if (kind === 'xlsx') { downloadXlsx(spec, name + '.xlsx', 'Ocean EDU'); return; }
    var canvas = drawSheet(spec);
    if (kind === 'pdf') downloadBlob(pdfFromCanvases(sliceCanvas(canvas, spec.theme)), name + '.pdf');
    else if (kind === 'jpg') canvas.toBlob(function (blob) { downloadBlob(blob, name + '.jpg'); }, 'image/jpeg', 0.92);
    else canvas.toBlob(function (blob) { downloadBlob(blob, name + '.png'); }, 'image/png');
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

  var CARE_PAINT = {
    none: ['#9ca3af', '#111827'],
    video: ['#bfdbfe', '#1e3a8a'],
    reissue: ['#fde047', '#713f12'],
    urgent: ['#f87171', '#7f1d1d'],
    comment: ['#60a5fa', '#1e3a8a'],
    supported: ['#fb923c', '#7c2d12']
  };

  function careListed(cls) {
    var now = new Date();
    return (cls.students || []).filter(function (stu) {
      return stu && L.studentPhase(cls, stu, now).kind !== 'archive';
    });
  }

  function careSpec(cls, month) {
    var weeks = monthWeeks(month);
    var headers = ['Học viên', 'Mã', 'English name'].concat(weeks.map(function (week) { return week.label; })).concat(['Hiệu quả']);
    var rows = careListed(cls).map(function (stu) {
      var cells = [showText(stu.name), showText(stu.code), showText(stu.englishName)];
      var fills = ['#ffffff', '#ffffff', '#ffffff'];
      var ink = ['#12324a', '#12324a', '#12324a'];
      weeks.forEach(function (week) {
        var cell = careCellOf(stu, month, week.iso);
        var status = cell ? cell.status : 'none';
        var spec = CARE_STATUS[status] || CARE_STATUS.none;
        var paint = CARE_PAINT[status] || CARE_PAINT.none;
        cells.push(spec.label + (cell && cell.note ? '\n' + cell.note : ''));
        fills.push(paint[0]);
        ink.push(paint[1]);
      });
      var score = careScore(stu, month);
      var rank = careRank(score);
      cells.push(rank.id + ' · ' + score + '%');
      fills.push('#ffffff');
      ink.push('#12324a');
      return { kind: 'data', cells: cells, fills: fills, ink: ink };
    });
    return {
      title: state.settings.title,
      meta: [L.currentName(cls), 'Tương tác học viên · ' + L.monthLabel(month)],
      headers: headers,
      rows: rows,
      minCol: 72,
      maxCol: 180
    };
  }

  function exportCare(kind) {
    if (deny(canExportClasses())) return;
    var cls = findClass(ui.careClassId);
    if (!cls) return;
    var month = careMonthKey();
    var spec = careSpec(cls, month);
    if (!spec.rows.length) { toast('Không có học viên để xuất.'); return; }
    exportSheet(spec, kind, 'OceanEDU_tuong_tac_' + L.currentName(cls) + '_' + month);
    if (kind !== 'print') toast('Đã xuất tương tác học viên.');
  }

  function remarkWhen(at) {
    var d = at ? new Date(at) : null;
    if (!d || isNaN(d.getTime())) return '—';
    return L.formatDMY(d) + ' ' + L.formatAmPm(d);
  }

  function remarkExportRows(cls, unseenOnly) {
    var acc = currentAccount();
    var seen = acc && acc.remarkSeen ? acc.remarkSeen : {};
    var rows = [];
    (cls.students || []).forEach(function (stu) {
      (stu.remarks || []).forEach(function (item) {
        if (!item) return;
        var remarkText = remarkToPlain(item.text);
        var remarkTag = remarkTagInfo(item.tag);
        if (!remarkText && !(remarkTag && remarkTag.id === 'absent')) return;
        if (unseenOnly && item.id && seen[item.id]) return;
        rows.push({
          kind: 'data',
          cells: [
            showText(stu.name),
            showText(stu.code),
            showText(item.sessionLabel || item.sessionKey),
            remarkTag ? remarkTag.en + ' · ' + remarkTag.vi : '—',
            remarkText,
            showText(item.by),
            remarkWhen(item.at)
          ]
        });
      });
    });
    return rows;
  }

  function remarkSpec(cls, unseenOnly) {
    return {
      title: state.settings.title,
      meta: [L.currentName(cls), unseenOnly ? 'Nhận xét chưa xem' : 'Nhận xét học viên'],
      headers: ['Học viên', 'Mã', 'Buổi', 'Thẻ', 'Nội dung', 'Người ghi', 'Thời gian'],
      rows: remarkExportRows(cls, unseenOnly),
      minCol: 72,
      maxCol: 280
    };
  }

  function exportRemarks(kind) {
    if (deny(canExportClasses())) return;
    var cls = findClass(ui.remarkOpenClass || ui.remarkClassId || ui.remarkReadId);
    if (!cls) { toast('Mở một lớp trước khi xuất.'); return; }
    var spec = remarkSpec(cls, !canEdit());
    if (!spec.rows.length) { toast('Không có nhận xét để xuất.'); return; }
    exportSheet(spec, kind, 'OceanEDU_nhan_xet_' + L.currentName(cls));
    if (kind !== 'print') toast('Đã xuất nhận xét học viên.');
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
      '<p class="help">Form đề xuất dùng ứng dụng web đã triển khai. Không dán mã Apps Script trong cài đặt. Admin gắn bảng tính với ứng dụng web này bằng tay trên Google. Add học viên, Chuyển lớp và Khác vào ba thẻ. Nút Cập nhật sổ tay ghi vào thẻ Khác.</p>' +
      '<p class="deploy-url">' + esc(SUGGEST_URL) + '</p>' +
      '<h3>Bản data dùng chung</h3>' +
      '<p class="help">' + esc(classNote) + '</p>' +
      '<p class="help">' + esc(dataNote) + '</p>' +
      '<p class="help">' + esc(remarkNote) + '</p>' +
      '<p class="help">App ghi ocean-edu-classes.json, ocean-edu-data.json và ocean-edu-remarks.json vào thư mục Index local đã chọn. Thẻ nhận xét và nội dung nhận xét nằm ở ocean-edu-remarks.json. Khi có dữ liệu mới ghi vào thư mục, góc trên hiện Token đang xoay với chữ Đang lưu, rồi Token và chữ confirmed khi các file mới đã ghi xong. Lúc mở trang, app đọc ba file này. Nếu quyền thư mục còn đang chờ, lần lưu do người dùng bấm sẽ xin quyền rồi ghi. Chưa chọn thư mục thì dữ liệu nằm trên trình duyệt và không hiện confirmed. GitHub chỉ phục vụ file đã đăng, máy khác thấy dữ liệu mới sau khi thư mục được đăng lại.</p>' +
      '<div class="btn-row"><button type="button" class="btn btn-primary" data-act="download-classes">Tải ocean-edu-classes.json</button>' +
      '<button type="button" class="btn" data-act="download-data">Tải ocean-edu-data.json</button>' +
      '<button type="button" class="btn" data-act="download-remarks">Tải ocean-edu-remarks.json</button>' +
      '<button type="button" class="btn" data-act="pick-folder">Chọn thư mục Index local</button></div>';
  }

  function downloadClasses() {
    if (deny(canEdit())) return;
    var blob = new Blob([JSON.stringify(classBookPayload(), remarkOmit)], { type: 'application/json' });
    downloadBlob(blob, CLASS_FILE);
    toast('Đã tạo ocean-edu-classes.json. Chép file vào thư mục Index local, cạnh index.html, để đồng bộ lớp, học viên và chuyên cần.');
  }

  function downloadData() {
    if (deny(canEdit())) return;
    var blob = new Blob([JSON.stringify(dataPayload(), remarkOmit)], { type: 'application/json' });
    downloadBlob(blob, DATA_FILE);
    toast('Đã tạo ocean-edu-data.json. File này giữ tài khoản, thông báo và cả sổ lớp.');
  }

  function downloadRemarks() {
    if (deny(canEdit())) return;
    var blob = new Blob([JSON.stringify(remarkBookPayload())], { type: 'application/json' });
    downloadBlob(blob, REMARK_FILE);
    toast('Đã tạo ocean-edu-remarks.json. Chép file vào thư mục Index local để giữ thẻ nhận xét và nội dung nhận xét.');
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

  document.addEventListener('mouseover', function (e) {
    var skinBtn = e.target.closest ? e.target.closest('[data-skin-btn]') : null;
    if (!skinBtn) return;
    peekSkin(skinBtn.getAttribute('data-skin'));
  });
  document.addEventListener('focusin', function (e) {
    var skinBtn = e.target.closest ? e.target.closest('[data-skin-btn]') : null;
    if (!skinBtn) return;
    peekSkin(skinBtn.getAttribute('data-skin'));
  });

  document.addEventListener('click', function (e) {
    if (e.target.id === 'previewbox') { closePreview(); return; }
    if (e.target.id === 'clockbox') document.getElementById('clockbox').classList.add('hidden');
    if (e.target.id === 'settingsbox') closeSettings();
    if (e.target.classList && e.target.classList.contains('scrim')) {
      if (e.target.classList.contains('remark-scrim')) { ui.remarkEditor = null; render(); return; }
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
      'download-data': 1, 'download-classes': 1, 'download-remarks': 1, 'pick-folder': 1,
      'drop-image': 1, 'open-soa': 1, 'soa-drop': 1,
      'edit-staff': 1, 'save-staff': 1,
      'people-add': 1, 'people-edit': 1, 'people-save': 1,
      'code-save': 1, 'care-save': 1, 'profile-save': 1, 'profile-edit': 1, 'photo-url': 1,
      'remark-confirm': 1, 'remark-edit': 1, 'remark-done': 1, 'remark-pick': 1, 'remark-save': 1,
      'remark-revise': 1, 'remark-style': 1, 'remark-revise-close': 1,
      'dup-transfer': 1, 'dup-skip': 1,
      'book-fold': 1, 'book-set': 1, 'book-message': 1, 'copy-report': 1, 'transfer-report-yes': 1,
      'past-book-open': 1, 'past-book-add': 1, 'past-book-remove': 1, 'past-book-save': 1, 'past-book-standard': 1, 'past-book-cancel': 1
    };
    var studentActs = {
      'bulk-transfer': 1, 'confirm-transfer': 1, 'transfer-pick': 1,
      'bulk-delete': 1, 'do-bulk-delete': 1, 'delete-one': 1, 'do-delete-one': 1
    };
    var classActs = { 'edit-class': 1, 'delete-class': 1, 'do-delete-class': 1 };
    var examActs = {
      'exam-create': 1, 'exam-next': 1, 'exam-back': 1, 'exam-cancel': 1, 'exam-commit': 1,
      'exam-extra-pick': 1, 'exam-day': 1, 'exam-cal': 1, 'exam-edit': 1, 'exam-all': 1, 'exam-focus': 1
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
    if (act === 'export-care' && deny(canExportClasses())) return;
    if (act === 'export-remarks' && deny(canExportClasses())) return;
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
    if (act === 'skin-fold') {
      var groupId = btn.getAttribute('data-group');
      ui.skinFold = ui.skinFold === groupId ? '' : groupId;
      ui.skinPeek = skinOf(currentAccount());
      paintSkinDesk();
      return;
    }
    if (act === 'set-skin') { applySkin(btn.getAttribute('data-skin')); return; }
    if (act === 'set-iface') { applyIface(btn.getAttribute('data-iface')); return; }
    if (act === 'class-layout' || act === 'curriculum-layout' || act === 'care-layout' || act === 'remark-layout') {
      var nextLayout = btn.getAttribute('data-layout') === 'list' ? 'list' : 'cards';
      if (act === 'curriculum-layout') ui.curriculumLayout = nextLayout;
      else if (act === 'care-layout') ui.careLayout = nextLayout;
      else if (act === 'remark-layout') ui.remarkLayout = nextLayout;
      else ui.classLayout = nextLayout;
      render();
      return;
    }
    if (act === 'class-sort' || act === 'curriculum-sort' || act === 'care-sort' || act === 'remark-sort') {
      var nextSort = btn.getAttribute('data-sort') === 'number' ? 'number' : 'level';
      if (act === 'curriculum-sort') ui.curriculumSort = nextSort;
      else if (act === 'care-sort') ui.careSort = nextSort;
      else if (act === 'remark-sort') ui.remarkSort = nextSort;
      else ui.classSort = nextSort;
      render();
      return;
    }
    if (act === 'dup-transfer') { acceptTwin(btn.getAttribute('data-id'), btn.getAttribute('data-from')); return; }
    if (act === 'dup-skip') { skipTwin(); return; }
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
      ui.remarkEditor = null;
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
    if (act === 'dict-pick') { dictLookup(btn.getAttribute('data-word')); return; }
    if (act === 'dict-lookup') {
      var dictBox = document.getElementById('dict-q');
      dictLookup(dictBox ? dictBox.value : ui.dict.query);
      return;
    }
    if (act === 'dict-tab') {
      ui.dict.tab = btn.getAttribute('data-tab') === 'audio' ? 'audio' : 'mean';
      render();
      return;
    }
    if (act === 'dict-copy-audio' || act === 'dict-copy-mp4') {
      dictCopy(Number(btn.getAttribute('data-index')), act === 'dict-copy-mp4');
      return;
    }
    if (act === 'dict-sentence') { dictTranslateSentence(); return; }
    if (act === 'dict-speak') {
      var speakKind = btn.getAttribute('data-kind');
      var speakLang = btn.getAttribute('data-lang');
      if (speakKind === 'sentence') dictSpeak(ui.dict.sentence, speakLang);
      else if (speakKind === 'sentence-vi') dictSpeak(ui.dict.sentenceVi, speakLang);
      else if (speakKind === 'example' || speakKind === 'example-vi') {
        var speakEntry = ui.dict.entry;
        var speakSense = speakEntry && speakEntry.senses[Number(btn.getAttribute('data-sense'))];
        var speakGloss = speakSense && speakSense.glosses[Number(btn.getAttribute('data-gloss'))];
        if (speakGloss) dictSpeak(speakKind === 'example' ? speakGloss.example : speakGloss.exampleVi, speakLang);
      }
      return;
    }
    if (act === 'people-layout') {
      ui.peopleLayout = btn.getAttribute('data-layout') === 'list' ? 'list' : 'table';
      render();
      return;
    }
    if (act === 'people-open') {
      ui.peopleKey = btn.getAttribute('data-key') || '';
      ui.modal = null;
      render();
      return;
    }
    if (act === 'people-back') {
      ui.peopleKey = '';
      ui.modal = null;
      render();
      return;
    }
    if (act === 'people-add') {
      ui.formError = '';
      ui.modal = { type: 'people-form', key: '' };
      render();
      return;
    }
    if (act === 'people-edit') {
      ui.formError = '';
      ui.modal = { type: 'people-form', key: btn.getAttribute('data-key') || ui.peopleKey || '' };
      render();
      return;
    }
    if (act === 'people-save') { savePerson(); return; }
    if (act === 'code-save') { saveCodeGate(); return; }
    if (act === 'care-back') { ui.careClassId = ''; ui.modal = null; render(); return; }
    if (act === 'open-care') {
      ui.careClassId = btn.getAttribute('data-id') || '';
      ui.screen = 'care';
      ui.modal = null;
      render();
      return;
    }
    if (act === 'care-open') {
      ui.formError = '';
      ui.modal = { type: 'care-cell', stuId: btn.getAttribute('data-id'), month: careMonthKey(), week: btn.getAttribute('data-week'), weekLabel: btn.getAttribute('data-label') };
      render();
      return;
    }
    if (act === 'care-save') { saveCareCell(); return; }
    if (act === 'rank-open') {
      ui.modal = { type: 'rank-scale', score: btn.getAttribute('data-score') };
      render();
      return;
    }
    if (act === 'open-profile') {
      ui.profileId = btn.getAttribute('data-id') || ui.detailId || '';
      ui.profileMonth = ui.profileMonth || L.monthKey(new Date());
      ui.profileEdit = false;
      ui.detailId = null;
      ui.detailEdit = false;
      ui.screen = 'profile';
      ui.modal = null;
      render();
      return;
    }
    if (act === 'profile-back') {
      ui.profileEdit = false;
      ui.screen = 'archive';
      ui.archiveFolder = '';
      render();
      return;
    }
    if (act === 'profile-edit') { ui.profileEdit = true; render(); return; }
    if (act === 'profile-cancel') {
      if (ui.photoPending && ui.photoPending.url) URL.revokeObjectURL(ui.photoPending.url);
      ui.photoPending = null;
      ui.profileEdit = false;
      render();
      return;
    }
    if (act === 'profile-save') { saveProfile(); return; }
    if (act === 'photo-url') { pullPhotoLink(); return; }
    if (act === 'open-remarks') {
      ui.remarkOpenClass = btn.getAttribute('data-id') || '';
      ui.remarkClassId = ui.remarkOpenClass;
      ui.remarkSession = '';
      ui.remarkDraft = null;
      ui.remarkEditor = null;
      ui.remarkSlip = '';
      ui.screen = 'remarks';
      render();
      return;
    }
    if (act === 'remark-revise') {
      if (deny(canEdit())) return;
      var revClass = btn.getAttribute('data-class') || '';
      var revStu = btn.getAttribute('data-stu') || '';
      var revSession = btn.getAttribute('data-session') || '';
      var revHost = findClass(revClass);
      var revWho = null;
      if (revHost) (revHost.students || []).forEach(function (stu) { if (stu && stu.id === revStu) revWho = stu; });
      var revStored = latestRemark(revWho, revSession);
      var revTag = revStored && remarkTagInfo(revStored.tag) ? revStored.tag : 'uncategorized';
      ui.remarkEditor = {
        classId: revClass,
        stuId: revStu,
        sessionKey: revSession,
        label: btn.getAttribute('data-label') || revSession,
        tag: revTag,
        text: revStored ? String(revStored.text || '') : ''
      };
      render();
      return;
    }
    if (act === 'remark-revise-close') {
      ui.remarkEditor = null;
      render();
      return;
    }
    if (act === 'remark-style') {
      var styleBox = document.getElementById('remark-composer');
      if (!styleBox || styleBox.getAttribute('contenteditable') !== 'true') return;
      if (!remarkSelInside(styleBox)) { styleBox.focus(); return; }
      var styleName = btn.getAttribute('data-style');
      document.execCommand(styleName === 'bold' ? 'bold' : styleName === 'underline' ? 'underline' : 'italic', false, null);
      return;
    }
    if (act === 'remark-pick') {
      if (deny(canEdit())) return;
      if (!ui.remarkEditor) return;
      ui.remarkEditor.text = composerMarkup();
      ui.remarkEditor.tag = btn.getAttribute('data-tag') || 'uncategorized';
      render();
      return;
    }
    if (act === 'remark-save') { saveRemarkCard(btn); return; }
    if (act === 'remark-back') {
      ui.remarkClassId = '';
      ui.remarkOpenClass = '';
      ui.remarkSession = '';
      ui.remarkDraft = null;
      ui.remarkEditor = null;
      render();
      return;
    }
    if (act === 'remark-confirm') { confirmRemarkBulk(); return; }
    if (act === 'remark-edit') { readRemarkDom(); if (ui.remarkDraft) ui.remarkDraft.editing = true; render(); return; }
    if (act === 'remark-done') { commitRemarks(); return; }
    if (act === 'remark-cancel') {
      var keepClass = ui.remarkDraft && ui.remarkDraft.classId;
      var keepSession = ui.remarkDraft && ui.remarkDraft.sessionKey;
      ui.remarkDraft = keepClass ? { classId: keepClass, sessionKey: keepSession || '', texts: {}, ticks: {}, editing: false, bulk: '' } : null;
      render();
      return;
    }
    if (act === 'remark-open') { ui.remarkReadId = btn.getAttribute('data-id') || ''; ui.remarkSlip = ''; render(); return; }
    if (act === 'remark-read-back') { ui.remarkReadId = ''; ui.remarkSlip = ''; render(); return; }
    if (act === 'remark-slip') { markRemarkSlip(btn.getAttribute('data-id')); return; }
    if (act === 'nav') {
      ui.screen = btn.getAttribute('data-screen');
      ui.modal = null;
      ui.peopleKey = '';
      ui.detailId = null;
      ui.detailEdit = false;
      if (ui.screen === 'classes') ui.selected = {};
      if (ui.screen === 'curriculum' || ui.screen === 'menu') {
        ui.curriculumId = null;
        ui.curriculumLevel = '';
        ui.bookPick = {};
        ui.bookFold = '';
        closePastBooks();
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
      if (ui.screen === 'care') ui.careClassId = '';
      if (ui.screen === 'remarks' || ui.screen === 'remark-read') {
        ui.remarkClassId = '';
        ui.remarkDraft = null;
        ui.remarkEditor = null;
        ui.remarkOpenClass = '';
        ui.remarkSession = '';
        ui.remarkSlip = '';
        ui.remarkReadId = '';
      }
      if (ui.screen === 'profile') ui.profileEdit = false;
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
    if (act === 'edit-staff') {
      ui.formError = '';
      ui.modal = { type: 'edit-staff', name: btn.getAttribute('data-name') || '', month: staffMonthKey() };
      render();
      return;
    }
    if (act === 'save-staff') { saveStaffInfo(); return; }
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
    if (act === 'download-remarks') { downloadRemarks(); return; }
    if (act === 'pick-folder') {
      if (!window.showDirectoryPicker) {
        toast('Trình duyệt không cho trang ghi thẳng vào thư mục. Hãy tải ba file JSON, chép vào Index local rồi đăng lại thư mục.');
        return;
      }
      folderAsked = true;
      showSync('saving');
      window.showDirectoryPicker({ id: 'ocean-edu-index-local', mode: 'readwrite' }).then(function (handle) {
        return rememberFolder(handle).then(function () { return writeDataFile(); });
      }).then(function (ok) {
        if (ok) {
          showSync('confirmed');
          toast('Đã gắn thư mục. Mỗi lần lưu, app ghi ocean-edu-classes.json, ocean-edu-data.json và ocean-edu-remarks.json.');
          return;
        }
        showSync('idle');
        toast('Đã chọn thư mục nhưng chưa ghi được file JSON.');
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
      ui.bookPick = {};
      ui.bookFold = '';
      closePastBooks();
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
      ui.bookPick = {};
      ui.bookFold = '';
      closePastBooks();
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
    if (act === 'export-care') { exportCare(btn.getAttribute('data-kind')); return; }
    if (act === 'export-remarks') { exportRemarks(btn.getAttribute('data-kind')); return; }
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
    if (act === 'transfer-report-yes') {
      if (!ui.modal || ui.modal.type !== 'transfer-ask') return;
      ui.modal = { type: 'copy', text: ui.modal.text || '' };
      ui.formError = '';
      render();
      return;
    }
    if (act === 'copy-report') { copyReport(); return; }
    if (act === 'book-fold') {
      var foldKey = btn.getAttribute('data-id') + ':' + btn.getAttribute('data-slot');
      ui.bookFold = ui.bookFold === foldKey ? '' : foldKey;
      render();
      return;
    }
    if (act === 'book-set') {
      ui.bookFold = '';
      applyCurriculumPatch(btn.getAttribute('data-id'), {
        bookIndex: Number(btn.getAttribute('data-slot')),
        bookStatus: btn.getAttribute('data-status')
      }, true);
      return;
    }
    if (act === 'book-message') { openBookMessage(); return; }
    if (act === 'past-book-open') {
      var pastCls = findClass(ui.curriculumId);
      var pastLevel = pastCls ? curriculumLevelOf(pastCls) : null;
      if (!pastCls || !pastLevel || !pastLevel.to) return;
      var pastBooks = L.classLevelBooks(pastCls, pastLevel);
      ui.pastBookEdit = L.levelKey(pastLevel);
      ui.pastBookDraft = (pastBooks.length ? pastBooks : [{ name: '', price: '' }]).map(function (book) {
        return { name: book.name || '', price: book.price == null ? '' : String(book.price) };
      });
      render();
      return;
    }
    if (act === 'past-book-add') {
      var added = readPastDraft();
      if (added.length >= 6) return;
      added.push({ name: '', price: '' });
      ui.pastBookDraft = added;
      render();
      return;
    }
    if (act === 'past-book-remove') {
      var kept = readPastDraft();
      kept.splice(Number(btn.getAttribute('data-index')), 1);
      ui.pastBookDraft = kept.length ? kept : [{ name: '', price: '' }];
      render();
      return;
    }
    if (act === 'past-book-save') { savePastBooks(); return; }
    if (act === 'past-book-standard') { resetPastBooks(); return; }
    if (act === 'past-book-cancel') { closePastBooks(); render(); return; }
    if (act === 'curriculum-cm') { ui.curriculumCmOpen = !ui.curriculumCmOpen; render(); return; }
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
      ui.examWizard = {
        step: 0, name: '', type: 'class', quarter: 'I', rangeFrom: '', rangeTo: '', openClass: '',
        ageFrom: '', ageTo: '', classIds: {}, dates: {}, calMonth: L.monthKey(new Date())
      };
      ui.examId = null;
      ui.examWeek = '';
      ui.formError = '';
      render();
      return;
    }
    if (act === 'exam-all') {
      readExamWizardDom();
      if (!ui.examWizard) return;
      (state.classes || []).forEach(function (cls) {
        if (cls && cls.id) ui.examWizard.classIds[cls.id] = true;
      });
      ui.formError = '';
      render();
      return;
    }
    if (act === 'exam-focus') {
      readExamWizardDom();
      if (!ui.examWizard) return;
      var focusId = btn.getAttribute('data-class') || '';
      ui.examWizard.openClass = ui.examWizard.openClass === focusId ? '' : focusId;
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
      if (dayWizard.type === 'biannual') {
        var dayCls = findClass(dayClass);
        var daySessions = classSessionsBetween(dayCls, dayWizard.rangeFrom, dayWizard.rangeTo);
        if (!daySessions[dayIso]) return;
        if (dayWizard.dates[dayClass][dayIso]) delete dayWizard.dates[dayClass][dayIso];
        else if (biannualWindowDates(dayWizard, dayClass).length >= 2) {
          toast('Mỗi lớp chọn đúng 2 buổi.');
          render();
          return;
        } else dayWizard.dates[dayClass][dayIso] = true;
        render();
        return;
      }
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
    if (act === 'exam-clear-filter') {
      ui.examFilter = { fet: '', grade: '', program: '' };
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
      var backExam = ui.examWizard && ui.examWizard.editId;
      ui.examWizard = null;
      ui.examFolds = {};
      if (act === 'exam-list') ui.examId = null;
      else if (backExam) ui.examId = backExam;
      ui.formError = '';
      render();
      return;
    }
    if (act === 'exam-edit') {
      var editExam = findExam(ui.examId);
      if (!editExam) return;
      openExamEditor(editExam);
      return;
    }
    if (act === 'open-exam') {
      ui.examWizard = null;
      ui.examFolds = {};
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
        if (wizard.type === 'biannual') {
          if (EXAM_QUARTERS.indexOf(wizard.quarter) < 0) { ui.formError = 'Chọn quý thi.'; render(); return; }
          if (!/^\d{4}-\d{2}-\d{2}$/.test(wizard.rangeFrom || '') || !/^\d{4}-\d{2}-\d{2}$/.test(wizard.rangeTo || '')) {
            ui.formError = 'Nhập thời hạn thi từ ngày đến ngày.';
            render();
            return;
          }
          if (wizard.rangeFrom > wizard.rangeTo) { ui.formError = 'Ngày bắt đầu phải trước hoặc bằng ngày kết thúc.'; render(); return; }
          wizard.name = biannualTitle(wizard.quarter, examYearOf(wizard));
        } else if (!String(wizard.name || '').trim()) {
          ui.formError = 'Điền tên đợt thi.';
          render();
          return;
        } else wizard.name = String(wizard.name).trim();
        wizard.step = 1;
        ui.formError = '';
        render();
        return;
      }
      if (wizard.step === 1) {
        if (!Object.keys(wizard.classIds).length) { ui.formError = 'Chọn ít nhất một lớp.'; render(); return; }
        if (!wizard.calMonth) wizard.calMonth = L.monthKey(new Date());
        if (!wizard.dates) wizard.dates = {};
        wizard.openClass = '';
        wizard.step = 2;
        ui.formError = '';
        render();
        return;
      }
      if (act !== 'exam-commit') return;
      if (wizard.type === 'biannual') {
        var shortBiannual = Object.keys(wizard.classIds).some(function (id) {
          return biannualWindowDates(wizard, id).length !== 2;
        });
        if (shortBiannual) { ui.formError = 'Mỗi lớp chọn đúng 2 buổi trong thời hạn thi.'; render(); return; }
      } else {
        var missingDate = Object.keys(wizard.classIds).some(function (id) { return !examDatesOf(wizard.dates[id]).length; });
        if (missingDate) { ui.formError = 'Chọn ít nhất một ngày thi cho từng lớp.'; render(); return; }
      }
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

  document.addEventListener('toggle', function (e) {
    var fold = e.target;
    if (!fold || !fold.classList) return;
    if (fold.classList.contains('exam-score-fold')) {
      var foldId = fold.getAttribute('data-entry') || '';
      if (!ui.examFolds) ui.examFolds = {};
      if (fold.open) ui.examFolds[foldId] = true;
      else delete ui.examFolds[foldId];
      return;
    }
    if (!fold.classList.contains('remark-fold') || remarkPainting) return;
    var classId = fold.getAttribute('data-class') || '';
    var next = fold.open ? classId : '';
    if ((ui.remarkOpenClass || '') === next) return;
    ui.remarkOpenClass = next;
    remarkPainting = true;
    render();
    remarkPainting = false;
  }, true);

  document.addEventListener('change', function (e) {
    var t = e.target;
    if (t.id === 'exam-type' || t.id === 'exam-quarter') {
      readExamWizardDom();
      if (ui.examWizard) ui.formError = '';
      render();
      return;
    }
    if (t.matches('[data-archive-pick]')) {
      var archiveId = t.getAttribute('data-archive-pick');
      if (t.checked) ui.archivePick[archiveId] = true;
      else delete ui.archivePick[archiveId];
      return;
    }
    if (t.matches('[data-exam-out]')) {
      var outEntry = t.getAttribute('data-entry');
      if (!ui.examFolds) ui.examFolds = {};
      ui.examFolds[outEntry] = true;
      patchExamStudent(t.getAttribute('data-exam'), outEntry, t.getAttribute('data-stu'), { out: !!t.checked });
      render();
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
    if (t.id === 'care-month') {
      ui.careMonth = t.value;
      render();
      return;
    }
    if (t.id === 'profile-month') {
      ui.profileMonth = t.value;
      render();
      return;
    }
    if (t.id === 'photo-file' && t.files && t.files[0]) {
      takePhotoFile(t.files[0]);
      return;
    }
    if (t.id === 'remark-month') {
      ui.remarkMonth = t.value;
      ui.remarkSession = '';
      ui.remarkDraft = null;
      ui.remarkEditor = null;
      ui.remarkSlip = '';
      render();
      return;
    }
    if (t.id === 'remark-session-pick') {
      ui.remarkSession = t.value || '';
      ui.remarkDraft = null;
      ui.remarkEditor = null;
      render();
      return;
    }
    if (t.matches('[data-remark-note]')) {
      var noteCard = t.closest('.remark-card');
      var noteOn = noteCard && noteCard.querySelector('.remark-chip.is-on');
      ui.remarkDraft = {
        classId: t.getAttribute('data-class') || '',
        stuId: t.getAttribute('data-stu') || '',
        sessionKey: t.getAttribute('data-session') || '',
        tag: noteOn ? noteOn.getAttribute('data-tag') : 'uncategorized',
        text: t.value
      };
      return;
    }
    if (t.id === 'remark-session') {
      readRemarkDom();
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
    if (t.matches('[data-exam-filter]')) {
      var examKey = t.getAttribute('data-exam-filter');
      if (!ui.examFilter) ui.examFilter = { fet: '', grade: '', program: '' };
      if (examKey === 'fet' || examKey === 'grade' || examKey === 'program') ui.examFilter[examKey] = t.value;
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
      ui.bookFold = '';
      closePastBooks();
      render();
      return;
    }
    if (t.id === 'curriculum-month') {
      ui.curriculumMonth = t.value || L.monthKey(new Date());
      render();
      return;
    }
    if (t.id === 'd-book' || t.id === 'd-book-2') {
      t.className = 'book-pick ' + bookStatusClass(t.value);
      return;
    }
    if (t.matches('[data-book-pick]')) {
      var pickId = t.getAttribute('data-book-pick');
      if (t.checked) ui.bookPick[pickId] = true;
      else delete ui.bookPick[pickId];
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

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' || !e.target || e.target.id !== 'dict-q') return;
    e.preventDefault();
    dictLookup(e.target.value);
  });

  document.addEventListener('keydown', function (e) {
    var box = document.getElementById('remark-composer');
    if (!box || box.getAttribute('contenteditable') !== 'true') return;
    var active = document.activeElement;
    if (active !== box && !(active && box.contains(active))) return;
    var key = String(e.key || '').toLowerCase();
    if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && (key === 'i' || key === 'b' || key === 'u')) {
      e.preventDefault();
      document.execCommand(key === 'b' ? 'bold' : key === 'i' ? 'italic' : 'underline', false, null);
      return;
    }
    if (key === 'enter' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      document.execCommand('insertLineBreak');
    }
  });

  document.addEventListener('mousedown', function (e) {
    var styleBtn = e.target && e.target.closest ? e.target.closest('[data-act="remark-style"]') : null;
    if (!styleBtn || styleBtn.disabled) return;
    e.preventDefault();
  });

  document.addEventListener('input', function (e) {
    if (e.target.id === 'rejoin-q') {
      paintRejoin(e.target.value);
      return;
    }
    if (e.target.id === 'people-q') {
      ui.peopleQuery = e.target.value;
      var peopleQuery = String(e.target.value || '').trim().toLowerCase();
      document.querySelectorAll('[data-person]').forEach(function (el) {
        var blob = el.getAttribute('data-find') || '';
        el.hidden = !!(peopleQuery && blob.indexOf(peopleQuery) < 0);
      });
      return;
    }
    if (e.target.id === 'dict-q') {
      ui.dict.query = e.target.value;
      clearTimeout(dictTimer);
      var dictToken = ++dictSeq;
      var dictText = e.target.value;
      dictTimer = setTimeout(function () { dictSuggest(dictToken, dictText); }, 280);
      return;
    }
    if (e.target.id === 'dict-sentence') {
      ui.dict.sentence = e.target.value;
      return;
    }
    if (e.target.id === 'class-q' || e.target.id === 'curriculum-q' || e.target.id === 'care-q' || e.target.id === 'remark-q') {
      if (e.target.id === 'curriculum-q') ui.curriculumQuery = e.target.value;
      else if (e.target.id === 'care-q') ui.careQuery = e.target.value;
      else if (e.target.id === 'remark-q') ui.remarkQuery = e.target.value;
      else ui.classQuery = e.target.value;
      var classQuery = String(e.target.value || '').trim().toLowerCase();
      document.querySelectorAll('.folder-item, .class-line').forEach(function (item) {
        var className = item.getAttribute('data-name') || '';
        item.hidden = !!(classQuery && className.indexOf(classQuery) < 0);
      });
      document.querySelectorAll('.group-block').forEach(function (block) {
        var items = block.querySelectorAll('.folder-item');
        if (!items.length) {
          block.hidden = !!classQuery;
          return;
        }
        var anyClass = false;
        items.forEach(function (item) {
          if (!item.hidden) anyClass = true;
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
      var rememberBox = e.target.querySelector('[name="remember"]');
      if (rememberBox && rememberBox.checked) writeLoginMemory(username, password);
      else clearLoginMemory();
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
    if (ui.remarkEditor) { ui.remarkEditor = null; render(); return; }
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

  function enterBook() {
    if (bookEntered) return;
    bookEntered = true;
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

  function finishBoot() {
    applyTheme(state.settings.theme);
    savePaused = false;
    enterBook();
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
    pinBars();
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
