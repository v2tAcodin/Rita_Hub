// Sample Auditing & Economics data for Rita Hub
export const INITIAL_DOCUMENTS = [
  {
    id: "doc-1",
    title: "Trọn Bộ Slide & Tóm Tắt Chuẩn Mực Kiểm Toán Việt Nam (VSA)",
    subject: "audit-standards",
    subjectName: "Chuẩn mực VSA / ISA",
    format: "summary",
    formatName: "Tóm tắt / Cheat Sheet",
    semester: "Học kỳ 1 - Năm 3",
    author: "Bộ môn Kiểm toán & Rita",
    url: "https://mof.gov.vn",
    fileSize: "14.2 MB",
    favorite: true,
    rating: 5,
    dateAdded: "2026-09-20",
    tags: ["VSA 200", "VSA 315", "VSA 320", "VSA 500", "VSA 700"],
    summary: "Hệ thống hóa toàn bộ các chuẩn mực VSA trọng tâm: VSA 315 (Xác định và đánh giá rủi ro có sai sót trọng yếu), VSA 320 (Tính trọng yếu), VSA 500 (Bằng chứng kiểm toán), VSA 700 (Hình thành ý kiến kiểm toán).",
    examTips: "Đặc biệt chú ý câu hỏi thi: Trình bày quy trình đánh giá rủi ro theo VSA 315 và mối quan hệ giữa Rủi ro tiềm tàng (IR), Rủi ro kiểm soát (CR) và Rủi ro phát hiện (DR)."
  },
  {
    id: "doc-2",
    title: "Mẫu Giấy Làm Việc (Working Paper) Kiểm Toán Chu Trình Bán Hàng - Thu Tiền",
    subject: "working-papers",
    subjectName: "Giấy tờ làm việc (W/P)",
    format: "excel",
    formatName: "Mẫu W/P Excel",
    semester: "Học kỳ 2 - Năm 3",
    author: "Big4 Alumni & Giảng viên",
    url: "#",
    fileSize: "3.8 MB",
    favorite: true,
    rating: 5,
    dateAdded: "2026-09-18",
    tags: ["W/P Bán Hàng", "Lead Schedule", "Thư Xác Nhận Nợ", "Aging Report"],
    summary: "Mẫu bảng kê tổng hợp (Lead Schedule), bảng phân tích tuổi nợ (Aging analysis), mẫu thư xác nhận nợ phải thu gửi khách hàng (Confirmation letter) song ngữ Anh - Việt chuẩn Big4.",
    examTips: "Nhớ ghi chú tham chiếu chiếu chéo (Cross-referencing) giữa W/P chi tiết với Bảng số liệu tổng hợp (Lead Schedule)."
  },
  {
    id: "doc-3",
    title: "Kiểm Toán Báo Cáo Tài Chính - Sơ Đồ Quy Trình & Bài Tập Tình Huống",
    subject: "financial-audit",
    subjectName: "Kiểm toán BCTC",
    format: "slide",
    formatName: "Slide bài giảng",
    semester: "Học kỳ 1 - Năm 3",
    author: "PGS.TS Nguyễn & Khoa Kế Kiểm",
    url: "#",
    fileSize: "28.5 MB",
    favorite: true,
    rating: 5,
    dateAdded: "2026-09-15",
    tags: ["Kiểm toán BCTC", "Hàng tồn kho", "Tài sản cố định", "Cut-off"],
    summary: "Slide bài giảng chi tiết về thủ tục kiểm toán từng phần hành: Tiền, Nợ phải thu, Hàng tồn kho (thủ tục chứng kiến kiểm kê), TSCĐ và Khóa sổ (Cut-off test).",
    examTips: "Nắm vững thủ tục kiểm tra khóa sổ (Cut-off) trước và sau ngày 31/12 để phát hiện ghi nhận doanh thu sai niên độ."
  },
  {
    id: "doc-4",
    title: "Bộ Đề Thi Kiểm Toán Căn Bản Kèm Lời Giải Chi Tiết (2023 - 2026)",
    subject: "audit-basics",
    subjectName: "Kiểm toán căn bản",
    format: "exam",
    formatName: "Đề thi & Đáp án",
    semester: "Học kỳ 2 - Năm 2",
    author: "CLB Kế toán Kiểm toán A&A",
    url: "#",
    fileSize: "8.6 MB",
    favorite: false,
    rating: 4,
    dateAdded: "2026-09-10",
    tags: ["Đề thi", "Trắc nghiệm", "Bài tập lớn", "Gian lận & Sai sót"],
    summary: "Tổng hợp 10 đề thi kết thúc học phần Kiểm toán căn bản, gồm 30 câu trắc nghiệm giải thích lý do và 3 bài tập tình huống phân biệt Gian lận (Fraud) vs Sai sót (Error).",
    examTips: "Phần tam giác gian lận (Fraud Triangle: Áp lực, Cơ hội, Thái độ/Hợp lý hóa) thường chiếm 2 điểm trong đề thi tự luận."
  },
  {
    id: "doc-5",
    title: "Tóm Tắt Chuẩn Mực Kế Toán Quốc Tế IFRS & VAS Tương Ứng",
    subject: "accounting-ifrs",
    subjectName: "Kế toán tài chính & IFRS",
    format: "summary",
    formatName: "Tóm tắt / Cheat Sheet",
    semester: "Học kỳ 1 - Năm 4",
    author: "Rita Study Notes",
    url: "#",
    fileSize: "5.1 MB",
    favorite: true,
    rating: 5,
    dateAdded: "2026-09-05",
    tags: ["IFRS 15", "IFRS 16", "IAS 16", "VAS 01", "So sánh"],
    summary: "Bảng đối chiếu điểm giống và khác nhau giữa VAS và IFRS: IFRS 15 (Doanh thu theo mô hình 5 bước), IFRS 16 (Thuê tài sản - vốn hóa quyền sử dụng tài sản), IAS 2 (Hàng tồn kho).",
    examTips: "Cần nhớ mô hình 5 bước ghi nhận doanh thu theo IFRS 15 để phân tích các case hợp đồng kèm nghĩa vụ thực hiện."
  },
  {
    id: "doc-6",
    title: "Cẩm Nang Thuế Dành Cho Kiểm Toán Viên: GTGT, TNDN, TNCN & Hóa Đơn",
    subject: "tax-law",
    subjectName: "Thuế & Luật kinh tế",
    format: "summary",
    formatName: "Tóm tắt / Cheat Sheet",
    semester: "Học kỳ 2 - Năm 3",
    author: "Cục Thuế & Hội Kiểm toán viên",
    url: "#",
    fileSize: "7.4 MB",
    favorite: false,
    rating: 4,
    dateAdded: "2026-08-28",
    tags: ["Thuế TNDN", "Chi phí không được trừ", "Thuế GTGT", "Hóa đơn điện tử"],
    summary: "Checklist các khoản chi phí không được trừ khi xác định thu nhập chịu thuế TNDN (chi phí không có hóa đơn chứng từ, vượt định mức, chi phí lãi vay vượt ngưỡng...).",
    examTips: "Bài tập thuế TNDN hay bẫy ở tiền phạt vi phạm hành chính (không được trừ) và chênh lệch tỷ giá chưa thực hiện."
  },
  {
    id: "doc-7",
    title: "ACCA Audit and Assurance (AA / F8) - Pocket Study Notes & Mindmap",
    subject: "acca-cpa",
    subjectName: "ACCA / CPA Ôn thi",
    format: "summary",
    formatName: "Tóm tắt / Cheat Sheet",
    semester: "Tự học chứng chỉ",
    author: "BPP & Kaplan Condensed",
    url: "#",
    fileSize: "18.0 MB",
    favorite: true,
    rating: 5,
    dateAdded: "2026-08-20",
    tags: ["ACCA AA", "Audit Risks", "Substantive Procedures", "Ethics"],
    summary: "Toàn bộ kiến thức môn ACCA Audit & Assurance tóm lược: Đạo đức nghề nghiệp (IESBA Code), Rủi ro kiểm toán, Thủ tục cơ bản cho từng khoản mục BCTC, Báo cáo kiểm toán sửa đổi.",
    examTips: "Công thức viết Substantive Procedure cho ACCA: Verb + Source Document + Detail to inspect + Reason (VD: Inspect sales invoice to verify price matches price list)."
  },
  {
    id: "doc-8",
    title: "Đánh Giá Hệ Thống Kiểm Soát Nội Bộ (Internal Control - COSO Framework)",
    subject: "internal-control",
    subjectName: "Hệ thống KSNB & Rủi ro",
    format: "slide",
    formatName: "Slide bài giảng",
    semester: "Học kỳ 1 - Năm 3",
    author: "Viện Kiểm toán Nội bộ IIA",
    url: "#",
    fileSize: "11.2 MB",
    favorite: false,
    rating: 4,
    dateAdded: "2026-08-15",
    tags: ["COSO", "5 Thành phần KSNB", "Bảng câu hỏi ICQ", "Walkthrough Test"],
    summary: "Mô hình COSO 2013 với 5 bộ phận cấu thành: Môi trường kiểm soát, Đánh giá rủi ro, Hoạt động kiểm soát, Thông tin & Truyền thông, Giám sát. Kèm mẫu Bảng câu hỏi phỏng vấn KSNB (ICQ).",
    examTips: "Nhớ 5 bộ phận COSO viết tắt CRIME (Control environment, Risk assessment, Info & comm, Monitoring, Existing control activities)."
  }
];

export const DAILY_AFFIRMATIONS = [
  "Bảng cân đối phát sinh rồi sẽ cân, những nỗ lực hôm nay của Rita rồi sẽ được đền đáp xứng đáng! ☕✨",
  "Một tách latte ấm, một tâm trí sáng suốt và sự cẩn trọng của một nữ kiểm toán viên tương lai! 🌸",
  "Tính trọng yếu nằm ở việc bạn luôn kiên trì mỗi ngày, dẫu từng con số có phức tạp đến đâu! 💛",
  "Hít thật sâu, thở thật chậm. Đừng để rủi ro phát hiện làm lu mờ sự tự tin rạng rỡ của bạn! 🌿",
  "Học kiểm toán rèn luyện sự tinh tế, tư duy logic và bản lĩnh của người phụ nữ hiện đại! 📖💫",
  "Mỗi trang tài liệu đọc hôm nay là một bước tiến gần hơn đến tấm bằng xuất sắc và danh hiệu CPA/ACCA! 🎯",
  "Hôm nay hãy yêu thương bản thân, uống đủ nước và học bài thật thong thả nhé cô gái! ☕🌻"
];

export const AUDIT_DICTIONARY = [
  { term: "Audit Risk (AR)", vi: "Rủi ro kiểm toán", desc: "Rủi ro kiểm toán viên đưa ra ý kiến kiểm toán không thích hợp khi báo cáo tài chính còn có những sai sót trọng yếu. Công thức: AR = IR x CR x DR." },
  { term: "Inherent Risk (IR)", vi: "Rủi ro tiềm tàng", desc: "Khả năng số dư tài khoản hoặc loại nghiệp vụ chứa đựng sai sót trọng yếu do bản chất ngành nghề kinh doanh, khi chưa tính đến tác động của kiểm soát nội bộ." },
  { term: "Control Risk (CR)", vi: "Rủi ro kiểm soát", desc: "Rủi ro sai sót trọng yếu không được hệ thống kiểm soát nội bộ của đơn vị ngăn chặn hoặc phát hiện và sửa chữa kịp thời." },
  { term: "Detection Risk (DR)", vi: "Rủi ro phát hiện", desc: "Rủi ro các thủ tục kiểm toán mà KTV thực hiện không phát hiện được sai sót trọng yếu còn tồn tại. KTV kiểm soát được rủi ro này bằng cách tăng quy mô mẫu." },
  { term: "Materiality (OM)", vi: "Tính trọng yếu", desc: "Mức độ sai sót hoặc bỏ sót thông tin tài chính có thể làm ảnh hưởng đến quyết định kinh tế của người sử dụng báo cáo tài chính (VSA 320)." },
  { term: "Performance Materiality (PM)", vi: "Mức trọng yếu thực hiện", desc: "Mức giá trị do KTV ấn định thấp hơn mức trọng yếu tổng thể nhằm giảm thiểu khả năng tổng hợp các sai sót chưa sửa chữa vượt quá OM (thường từ 50% - 75% OM)." },
  { term: "Substantive Procedures", vi: "Thử nghiệm cơ bản", desc: "Thủ tục kiểm toán được thiết kế nhằm phát hiện các sai sót trọng yếu ở cấp độ cơ sở dẫn liệu, gồm: Thử nghiệm chi tiết (TOD) và Thủ tục phân tích cơ bản (SAP)." },
  { term: "Test of Controls (TOC)", vi: "Thử nghiệm kiểm soát", desc: "Thủ tục kiểm toán nhằm đánh giá tính hữu hiệu trong thiết kế và vận hành của hệ thống kiểm soát nội bộ tại đơn vị được kiểm toán." },
  { term: "Assertions", vi: "Cơ sở dẫn liệu (CSDL)", desc: "Các khẳng định của Ban giám đốc về các khoản mục trên BCTC, ví dụ: Tính hiện hữu (Existence), Đầy đủ (Completeness), Đo lường (Accuracy), Quyền & Nghĩa vụ (Rights & Obligations)." },
  { term: "Cut-off Test", vi: "Kiểm tra khóa sổ / đúng kỳ", desc: "Thủ tục kiểm tra xem các nghiệp vụ kinh tế phát sinh có được ghi nhận đúng vào kỳ kế toán thực tế xảy ra hay không." },
  { term: "Going Concern", vi: "Hoạt động liên tục", desc: "Giả định cơ bản cho rằng đơn vị sẽ tiếp tục hoạt động kinh doanh bình thường trong tương lai có thể dự đoán được (ít nhất 12 tháng tới - VSA 570)." },
  { term: "Management Representation Letter", vi: "Thư giải trình của BGD", desc: "Văn bản của Ban Giám đốc đơn vị gửi cho KTV xác nhận trách nhiệm lập BCTC và cung cấp đầy đủ thông tin (VSA 580)." },
  { term: "Working Papers (W/P)", vi: "Hồ sơ / Giấy làm việc kiểm toán", desc: "Tài liệu ghi lại toàn bộ kế hoạch, bằng chứng thu thập và kết luận của KTV trong suốt quá trình kiểm toán." }
];

export const AUDIT_CHECKLIST_PHASES = [
  {
    phase: "1. Giai đoạn Lập Kế Hoạch (Planning Phase)",
    icon: "📋",
    items: [
      { id: "p1-1", text: "Đánh giá tính độc lập của kiểm toán viên & chấp nhận hợp đồng kiểm toán (VSA 210)", checked: true },
      { id: "p1-2", text: "Tìm hiểu ngành nghề, môi trường kinh doanh và hoạt động của khách hàng (VSA 315)", checked: true },
      { id: "p1-3", text: "Tìm hiểu và đánh giá sơ bộ hệ thống kiểm soát nội bộ (Internal Control)", checked: false },
      { id: "p1-4", text: "Xác định mức trọng yếu tổng thể (OM) và mức trọng yếu thực hiện (PM) (VSA 320)", checked: false },
      { id: "p1-5", text: "Đánh giá rủi ro có sai sót trọng yếu (RoMM) ở cấp độ BCTC và CSDL", checked: false },
      { id: "p1-6", text: "Lập Chiến lược kiểm toán tổng thể và Kế hoạch kiểm toán chi tiết", checked: false }
    ]
  },
  {
    phase: "2. Giai đoạn Thực Hiện Kiểm Toán (Execution Phase)",
    icon: "🔍",
    items: [
      { id: "p2-1", text: "Thực hiện thử nghiệm kiểm soát (TOC) nếu tin tưởng vào KSNB hoặc bắt buộc", checked: false },
      { id: "p2-2", text: "Gửi thư xác nhận độc lập: Số dư tài khoản ngân hàng, Nợ phải thu, Nợ phải trả", checked: false },
      { id: "p2-3", text: "Chứng kiến kiểm kê hàng tồn kho tại ngày khóa sổ hoặc thời điểm gần nhất (VSA 501)", checked: false },
      { id: "p2-4", text: "Kiểm tra khóa sổ (Cut-off test) chu trình Bán hàng - Thu tiền & Mua hàng - Trả tiền", checked: false },
      { id: "p2-5", text: "Kiểm tra chứng từ gốc cho các giao dịch phát sinh bất thường (Substantive Testing)", checked: false },
      { id: "p2-6", text: "Thực hiện thủ tục phân tích cơ bản (SAP): Tỷ suất sinh lời, biến động chi phí", checked: false }
    ]
  },
  {
    phase: "3. Giai đoạn Hoàn Thành & Báo Cáo (Completion Phase)",
    icon: "📊",
    items: [
      { id: "p3-1", text: "Đánh giá các sự kiện phát sinh sau ngày kết thúc kỳ kế toán (VSA 560)", checked: false },
      { id: "p3-2", text: "Đánh giá khả năng hoạt động liên tục (Going Concern) của doanh nghiệp (VSA 570)", checked: false },
      { id: "p3-3", text: "Thu thập Thư giải trình của Ban Giám đốc (Management Representation Letter - VSA 580)", checked: false },
      { id: "p3-4", text: "Tổng hợp các sai sót chưa điều chỉnh (Summary of Unadjusted Differences - SUD)", checked: false },
      { id: "p3-5", text: "So sánh tổng sai sót với mức trọng yếu để quyết định loại ý kiến kiểm toán", checked: false },
      { id: "p3-6", text: "Phát hành Báo cáo kiểm toán độc lập và Thư quản lý (Management Letter)", checked: false }
    ]
  }
];

export const INITIAL_STICKY_NOTES = [
  { id: "note-1", color: "yellow", title: "📌 Ôn thi môn Kiểm toán BCTC", content: "Chương 4 Hàng tồn kho: Học kỹ cách phân loại dự phòng giảm giá HTK & quy trình chứng kiến kiểm kê tại kho lạnh!", date: "24/09" },
  { id: "note-2", color: "peach", title: "💡 Mẹo nhớ 4 loại ý kiến", content: "1. Chấp nhận toàn phần (Clean)\n2. Ngoại trừ (Trọng yếu nhưng không lan tỏa)\n3. Trái ngược (Sai phạm trọng yếu & lan tỏa)\n4. Từ chối (Không thể thu thập bằng chứng + lan tỏa)", date: "22/09" },
  { id: "note-3", color: "cream", title: "🌸 Nhắc nhở bản thân", content: "Làm bài tập kiểm toán nhớ kiểm tra chéo số liệu. Dù mệt cũng đừng quên uống một ly trà mật ong ấm nhé Rita! ☕", date: "Hôm nay" }
];

export const EXAM_COUNTDOWNS = [
  { id: "cd-1", subject: "Kiểm Toán BCTC 1", date: "2026-10-18", room: "B1.302", note: "Mang máy tính Casio & bút dạ quang" },
  { id: "cd-2", subject: "Thuế & Kế Toán Thuế", date: "2026-10-25", room: "A2.204", note: "Được mang văn bản luật thuế không ghi chú" },
  { id: "cd-3", subject: "Chuẩn Mực Kiểm Toán VSA", date: "2026-11-05", room: "C1.101", note: "Học kỹ VSA 315 & VSA 320" }
];
