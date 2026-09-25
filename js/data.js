// Data definition for Rita Hub
// Documents are initialized empty as requested by user

export const INITIAL_DOCUMENTS = [];

export const INITIAL_FOLDERS = [
  {
    id: "folder-vsa",
    name: "Chuẩn mực VSA / ISA",
    icon: "📜",
    color: "yellow",
    description: "Hệ thống chuẩn mực kiểm toán Việt Nam & Quốc tế (VSA 200, 315, 320, 500, 700...)"
  },
  {
    id: "folder-fin-audit",
    name: "Kiểm toán BCTC",
    icon: "🔍",
    color: "brown",
    description: "Kiểm toán chu trình Hàng tồn kho, Bán hàng - Thu tiền, Mua hàng - Trả tiền, TSCĐ"
  },
  {
    id: "folder-wp",
    name: "Giấy làm việc (W/P)",
    icon: "📂",
    color: "peach",
    description: "Mẫu bảng kê tổng hợp Lead Schedule, thư xác nhận ngân hàng, kiểm kê kho"
  },
  {
    id: "folder-tax",
    name: "Thuế & Luật kinh tế",
    icon: "⚖️",
    color: "cream",
    description: "Thuế TNDN, Thuế GTGT, chi phí không được trừ, luật doanh nghiệp"
  },
  {
    id: "folder-acca",
    name: "ACCA / CPA Ôn thi",
    icon: "🎓",
    color: "yellow",
    description: "Tài liệu ôn thi chứng chỉ nghề nghiệp quốc tế & chứng chỉ kiểm toán viên"
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
