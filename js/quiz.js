// Multiple-Choice Practice Quiz & Study Generator for Rita Hub
// Specifically designed for Auditing & Economics students

export class QuizManager {
  static STORAGE_KEY = 'rita_hub_quizzes_v2';

  // Sample starter quiz questions categorized by folder/subject
  static DEFAULT_QUIZZES = [
    {
      id: "q-1",
      folderId: "folder-vsa",
      folderName: "Chuẩn mực VSA / ISA",
      question: "Theo VSA 320, mục đích chính của việc xác định Mức trọng yếu thực hiện (Performance Materiality - PM) là gì?",
      options: [
        "A. Để giảm số lượng mẫu cần kiểm tra xuống mức tối thiểu",
        "B. Để giảm thiểu rủi ro tổng hợp các sai sót chưa sửa chữa vượt quá mức trọng yếu tổng thể (OM)",
        "C. Để làm cơ sở tính phí dịch vụ kiểm toán cho khách hàng",
        "D. Để xác định số tiền bồi thường bảo hiểm trách nhiệm nghề nghiệp"
      ],
      correctAnswer: 1, // index of option B
      explanation: "Theo VSA 320 đoạn 09: Mức trọng yếu thực hiện được KTV ấn định thấp hơn mức trọng yếu tổng thể để giảm thiểu khả năng tổng hợp các sai sót chưa được điều chỉnh và chưa được phát hiện vượt quá mức trọng yếu của toàn bộ BCTC (thường lấy từ 50% - 75% OM).",
      documentRef: "VSA 320 · Tính trọng yếu trong kiểm toán"
    },
    {
      id: "q-2",
      folderId: "folder-vsa",
      folderName: "Chuẩn mực VSA / ISA",
      question: "Rủi ro phát hiện (Detection Risk - DR) trong mô hình rủi ro kiểm toán (AR = IR x CR x DR) có đặc điểm nào sau đây?",
      options: [
        "A. Là rủi ro do bản chất kinh doanh của đơn vị được kiểm toán",
        "B. KTV hoàn toàn không thể kiểm soát hay giảm thiểu được",
        "C. Có mối quan hệ tỷ lệ nghịch với rủi ro có sai sót trọng yếu (RoMM)",
        "D. Chỉ xuất hiện trong giai đoạn phát hành báo cáo kiểm toán"
      ],
      correctAnswer: 2, // index of option C
      explanation: "Khi Rủi ro có sai sót trọng yếu (RoMM = IR x CR) được đánh giá càng cao, KTV phải chấp nhận mức Rủi ro phát hiện (DR) càng thấp, nghĩa là KTV phải tăng cường phạm vi và quy mô các thử nghiệm cơ bản để thu thập thêm bằng chứng.",
      documentRef: "VSA 200 & VSA 315"
    },
    {
      id: "q-3",
      folderId: "folder-fin-audit",
      folderName: "Kiểm toán BCTC",
      question: "Thủ tục chứng kiến kiểm kê hàng tồn kho của kiểm toán viên (VSA 501) nhằm thu thập bằng chứng chủ yếu cho cơ sở dẫn liệu (Assertion) nào?",
      options: [
        "A. Tính hiện hữu (Existence) và Đánh giá (Valuation/Condition)",
        "B. Quyền và Nghĩa vụ (Rights and Obligations) của toàn bộ kho hàng",
        "C. Tính đầy đủ của doanh thu bán hàng trong năm",
        "D. Tính chính xác của chi phí lãi vay ngân hàng"
      ],
      correctAnswer: 0, // index of option A
      explanation: "Chứng kiến kiểm kê giúp KTV trực tiếp xác nhận hàng tồn kho có thực sự tồn tại (Hiện hữu - Existence) và đánh giá tình trạng phẩm chất hàng hóa (hỏng hóc, lỗi thời để lập dự phòng giảm giá - Valuation). Lưu ý: Kiểm kê không thể khẳng định 100% quyền sở hữu (vì có thể có hàng nhận giữ hộ, ký gửi).",
      documentRef: "VSA 501 · Bằng chứng kiểm toán đối với khoản mục đặc biệt"
    },
    {
      id: "q-4",
      folderId: "folder-fin-audit",
      folderName: "Kiểm toán BCTC",
      question: "Thủ tục kiểm tra khóa sổ (Cut-off test) đối với chu trình Bán hàng - Thu tiền chủ yếu nhằm ngăn ngừa sai phạm nào?",
      options: [
        "A. Ghi nhận khống nợ phải trả người bán",
        "B. Ghi nhận doanh thu sai niên độ kế toán (ghi trước hoặc ghi lùi doanh thu)",
        "C. Tính sai khấu hao tài sản cố định",
        "D. Quên trích lập quỹ khen thưởng phúc lợi"
      ],
      correctAnswer: 1, // index of option B
      explanation: "Thủ tục Cut-off so sánh ngày trên Hóa đơn, Phiếu xuất kho và Sổ cái bán hàng vài ngày trước và sau ngày kết thúc niên độ (31/12) nhằm đảm bảo doanh thu được ghi nhận đúng vào kỳ kế toán phát sinh, tránh tình trạng đẩy doanh thu năm sau sang năm nay để làm đẹp BCTC.",
      documentRef: "Kiểm toán chu trình Doanh thu - Bán hàng"
    },
    {
      id: "q-5",
      folderId: "folder-tax",
      folderName: "Thuế & Luật kinh tế",
      question: "Khoản chi nào sau đây KHÔNG ĐƯỢC TRỪ khi xác định thu nhập chịu thuế Thu nhập doanh nghiệp (TNDN)?",
      options: [
        "A. Tiền lương trả cho người lao động có hợp đồng và chứng từ thanh toán đầy đủ",
        "B. Chi trang phục bằng tiền cho nhân viên không quá 5 triệu đồng/người/năm",
        "C. Tiền phạt vi phạm hành chính về thuế, vi phạm luật giao thông",
        "D. Chi phí nghiên cứu khoa học và phát triển công nghệ"
      ],
      correctAnswer: 2, // index of option C
      explanation: "Theo Luật Thuế TNDN: Các khoản tiền phạt về vi phạm hành chính (giao thông, vi phạm chế độ kế toán thống kê, chậm nộp thuế, vi phạm môi trường...) đều không được tính vào chi phí được trừ khi tính thuế TNDN.",
      documentRef: "Luật Thuế TNDN & Thông tư hướng dẫn"
    }
  ];

  static getAllQuizzes() {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.DEFAULT_QUIZZES));
      return this.DEFAULT_QUIZZES;
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error("Error parsing stored quizzes", e);
      return this.DEFAULT_QUIZZES;
    }
  }

  static saveQuizzes(quizzes) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(quizzes));
  }

  static getQuizzesByFolder(folderId) {
    const all = this.getAllQuizzes();
    if (!folderId || folderId === 'all') return all;
    return all.filter(q => q.folderId === folderId);
  }

  static addQuizQuestion({ folderId, folderName, question, options, correctAnswer, explanation, documentRef = '' }) {
    const quizzes = this.getAllQuizzes();
    const newQ = {
      id: "q-" + Date.now(),
      folderId,
      folderName,
      question: question.trim(),
      options: options.map(o => o.trim()),
      correctAnswer: parseInt(correctAnswer, 10),
      explanation: explanation.trim(),
      documentRef: documentRef.trim()
    };
    quizzes.push(newQ);
    this.saveQuizzes(quizzes);
    return newQ;
  }

  static deleteQuizQuestion(id) {
    let quizzes = this.getAllQuizzes();
    quizzes = quizzes.filter(q => q.id !== id);
    this.saveQuizzes(quizzes);
    return quizzes;
  }

  // Quick auto-generator template generator from a document's summary and notes
  static generateQuizTemplatesFromDocument(doc) {
    const templates = [];
    const title = doc.title || "Tài liệu học tập";

    if (doc.summary) {
      templates.push({
        folderId: doc.folderId,
        folderName: doc.folderName,
        question: `Nội dung cốt lõi nào sau đây được nhấn mạnh trong tài liệu "${title}"?`,
        options: [
          `A. ${doc.summary.slice(0, 80)}...`,
          `B. Quy định về kiểm toán công nghệ thông tin tự động hóa 100%`,
          `C. Thủ tục phân bổ vốn ngân sách nhà nước cho doanh nghiệp FDI`,
          `D. Miễn trừ toàn bộ trách nhiệm của Ban Giám đốc doanh nghiệp`
        ],
        correctAnswer: 0,
        explanation: `Theo tài liệu "${title}": ${doc.summary}`,
        documentRef: title
      });
    }

    if (doc.examTips) {
      templates.push({
        folderId: doc.folderId,
        folderName: doc.folderName,
        question: `Khi làm bài thi phần kiến thức liên quan đến "${title}", KTV/sinh viên cần đặc biệt lưu ý điểm gì?`,
        options: [
          `A. Bỏ qua các thủ tục kiểm tra chéo số liệu`,
          `B. ${doc.examTips}`,
          `C. Chỉ cần kiểm tra số dư đầu kỳ, không cần kiểm tra số phát sinh trong kỳ`,
          `D. Không cần tuân thủ quy định của chuẩn mực kiểm toán VSA`
        ],
        correctAnswer: 1,
        explanation: `💡 Lưu ý trọng tâm: ${doc.examTips}`,
        documentRef: title
      });
    }

    return templates;
  }
}
