// Multiple-Choice Practice Quiz & Study Generator for Rita Hub
// Specifically designed for Auditing & Economics students
// Featuring deep explanations, explicit distractor analyses (why each wrong choice is wrong), and exam traps.

export class QuizManager {
  static STORAGE_KEY = 'rita_hub_quizzes_v3';

  // Comprehensive starter quiz questions categorized by folder/subject
  static DEFAULT_QUIZZES = [
    {
      id: "q-1",
      folderId: "folder-vsa",
      folderName: "Chuẩn mực VSA / ISA",
      question: "Theo VSA 320, mục đích chính của việc xác định Mức trọng yếu thực hiện (Performance Materiality - PM) là gì?",
      options: [
        "A. Để giảm số lượng mẫu cần kiểm tra xuống mức tối thiểu nhằm tiết kiệm chi phí kiểm toán",
        "B. Để giảm thiểu rủi ro tổng hợp các sai sót chưa sửa chữa và chưa phát hiện vượt quá mức trọng yếu tổng thể (OM)",
        "C. Để làm cơ sở tính phí dịch vụ kiểm toán và phân bổ giờ làm việc cho trợ lý",
        "D. Để xác định giới hạn trách nhiệm bồi thường pháp lý tối đa của công ty kiểm toán"
      ],
      correctAnswer: 1, // B
      correctExplanation: "Theo VSA 320 (Đoạn 09 & A13): Mức trọng yếu thực hiện (PM) là mức giá trị do KTV ấn định thấp hơn Mức trọng yếu tổng thể (OM) của BCTC nhằm giảm thiểu đến mức độ thấp có thể chấp nhận được khả năng tổng hợp các sai sót không được điều chỉnh và không được phát hiện trong BCTC vượt quá mức trọng yếu tổng thể (thường lấy từ 50% - 75% OM).",
      distractorExplanations: [
        "❌ Phương án A SAI VÌ: Việc giảm quy mô mẫu chỉ là hệ quả kỹ thuật của phương pháp chọn mẫu, không phải mục đích kiểm toán theo chuẩn mực. KTV không được phép hạ thấp phạm vi kiểm toán chỉ vì mục tiêu tiết kiệm chi phí mà bỏ qua rủi ro sai sót.",
        "✅ Phương án B ĐÚNG: Đây là định nghĩa và mục đích cốt lõi chuẩn xác 100% được quy định tại VSA 320 đoạn 09.",
        "❌ Phương án C SAI VÌ: Phí kiểm toán được đàm phán trong Hợp đồng kiểm toán dựa trên thời gian, độ phức tạp, rủi ro hợp đồng (theo VSA 210), hoàn toàn không căn cứ vào mức trọng yếu thực hiện PM.",
        "❌ Phương án D SAI VÌ: Trách nhiệm pháp lý và bồi thường được điều chỉnh bởi Luật Kiểm toán độc lập và hợp đồng bảo hiểm trách nhiệm nghề nghiệp, không phải do PM quyết định."
      ],
      examTrap: "Đề thi hay gài bẫy giữa 'Mục đích của PM' và 'Mục đích của SUD (Ngưỡng sai sót có thể bỏ qua)'. Nhớ kỹ: PM dùng để lập kế hoạch phạm vi thử nghiệm cơ bản nhằm bảo vệ OM, còn SUD dùng để lọc các sai sót vụn vặt không cần tổng hợp lên Bảng chênh lệch kiểm toán.",
      documentRef: "VSA 320 · Tính trọng yếu trong kiểm toán"
    },
    {
      id: "q-2",
      folderId: "folder-vsa",
      folderName: "Chuẩn mực VSA / ISA",
      question: "Trong mô hình Rủi ro kiểm toán (AR = IR x CR x DR theo VSA 200), mối quan hệ giữa Rủi ro có sai sót trọng yếu (RoMM = IR x CR) và Rủi ro phát hiện (DR) được xác định như thế nào?",
      options: [
        "A. Tỷ lệ thuận: RoMM càng cao thì KTV chấp nhận DR càng cao để giảm tải công việc",
        "B. Độc lập: Hai loại rủi ro này không có mối liên hệ nào với nhau trong kế hoạch kiểm toán",
        "C. Tỷ lệ nghịch: RoMM được đánh giá càng cao thì KTV phải ấn định mức DR chấp nhận được càng thấp",
        "D. Đồng biến tuyệt đối: Cả RoMM và DR đều do Ban Giám đốc doanh nghiệp kiểm soát và quyết định"
      ],
      correctAnswer: 2, // C
      correctExplanation: "Theo VSA 200 và VSA 315: Rủi ro kiểm toán AR là cố định ở mức thấp có thể chấp nhận được. Do đó, giữa RoMM (Rủi ro tiềm tàng IR x Rủi ro kiểm soát CR) và DR có mối quan hệ TỶ LỆ NGHỊCH. Khi KTV đánh giá khách hàng có rủi ro sai sót trọng yếu cao, KTV buộc phải hạ thấp mức rủi ro phát hiện (DR) bằng cách tăng cỡ mẫu, áp dụng thủ tục kiểm tra chi tiết vào cuối kỳ và bố trí nhân sự có kinh nghiệm.",
      distractorExplanations: [
        "❌ Phương án A SAI VÌ: Nếu RoMM cao mà KTV lại chấp nhận DR cao thì Rủi ro kiểm toán (AR = RoMM x DR) sẽ tăng vọt vượt mức chấp nhận được, dẫn đến nguy cơ đưa ra ý kiến kiểm toán sai lầm.",
        "❌ Phương án B SAI VÌ: Hai rủi ro này có mối liên hệ mật thiết mang tính bản lề trong kiểm toán dựa trên đánh giá rủi ro (Risk-based Audit).",
        "✅ Phương án C ĐÚNG: Khi RoMM tăng cao ➔ KTV phải giảm DR (bằng cách thực hiện nhiều thủ tục kiểm toán cơ bản hơn, thu thập bằng chứng chất lượng hơn).",
        "❌ Phương án D SAI VÌ: RoMM thuộc về khách hàng (nội tại doanh nghiệp), nhưng DR lại thuộc về KTV (do KTV kiểm soát thông qua thiết kế và thực hiện các thủ tục kiểm toán)."
      ],
      examTrap: "Bẫy kinh điển: 'Ai kiểm soát rủi ro nào?'. Ghi nhớ: KTV KHÔNG THỂ thay đổi IR và CR của khách hàng (chỉ có thể đánh giá chúng), KTV CHỈ CÓ THỂ kiểm soát và điều chỉnh Rủi ro phát hiện (DR).",
      documentRef: "VSA 200 & VSA 315 · Mô hình rủi ro kiểm toán"
    },
    {
      id: "q-3",
      folderId: "folder-fin-audit",
      folderName: "Kiểm toán BCTC",
      question: "Thủ tục chứng kiến kiểm kê hàng tồn kho của kiểm toán viên (VSA 501) nhằm thu thập bằng chứng chủ yếu cho cơ sở dẫn liệu (Assertion) nào sau đây?",
      options: [
        "A. Tính hiện hữu (Existence) và Đánh giá (Valuation - tình trạng phẩm chất)",
        "B. Quyền và Nghĩa vụ (Rights & Obligations) đối với 100% hàng hóa trong kho",
        "C. Tính đầy đủ (Completeness) của chi phí giá vốn hàng bán phát sinh trong kỳ",
        "D. Tính chính xác (Accuracy) của đơn giá xuất kho theo phương pháp bình quân gia quyền"
      ],
      correctAnswer: 0, // A
      correctExplanation: "Theo VSA 501 (Đoạn 04 - 08): Chứng kiến kiểm kê giúp KTV quan sát thực tế để xác minh hàng tồn kho có thực sự tồn tại ở thời điểm kiểm kê hay không (Cơ sở dẫn liệu Hiện hữu - Existence), đồng thời quan sát tình trạng vật lý (hàng ứ đọng, hư hỏng, lỗi mốt) để đánh giá sự cần thiết của việc trích lập dự phòng giảm giá HTK (Cơ sở dẫn liệu Đánh giá - Valuation).",
      distractorExplanations: [
        "✅ Phương án A ĐÚNG: Chứng kiến kiểm kê trực tiếp kiểm chứng sự tồn tại vật chất (Hiện hữu) và chất lượng hàng hóa (Đánh giá).",
        "❌ Phương án B SAI VÌ: Việc có mặt trong kho KHÔNG khẳng định doanh nghiệp có toàn quyền sở hữu số hàng đó (vì hàng có thể là hàng nhận giữ hộ, ký gửi từ đơn vị khác, hoặc hàng đã bán nhưng chưa giao). Để kiểm tra Quyền & Nghĩa vụ, KTV phải đối chiếu hóa đơn, hợp đồng mua hàng và chứng từ thanh toán.",
        "❌ Phương án C SAI VÌ: Chứng kiến kiểm kê số dư tại một thời điểm không cung cấp bằng chứng đầy đủ cho số phát sinh của chi phí giá vốn (COGS) trong suốt cả năm.",
        "❌ Phương án D SAI VÌ: Việc kiểm kê số lượng vật lý không kiểm tra được công thức tính toán đơn giá xuất kho trên phần mềm kế toán."
      ],
      examTrap: "Đề thi trắc nghiệm luôn gài bẫy: 'Kiểm kê kho có chứng minh được Quyền sở hữu (Rights) hay không?'. Câu trả lời luôn là KHÔNG ĐỦ BẰNG CHỨNG, KTV bắt buộc phải xem xét chứng từ pháp lý!",
      documentRef: "VSA 501 · Bằng chứng kiểm toán đối với khoản mục đặc biệt"
    },
    {
      id: "q-4",
      folderId: "folder-fin-audit",
      folderName: "Kiểm toán BCTC",
      question: "Thủ tục kiểm tra khóa sổ (Cut-off test) đối với chu trình Bán hàng - Thu tiền chủ yếu nhằm ngăn ngừa sai phạm nào?",
      options: [
        "A. Khách hàng không có khả năng thanh toán nợ dẫn đến nợ xấu tăng cao",
        "B. Doanh thu được ghi nhận sai niên độ kế toán (ghi trước doanh thu năm sau hoặc ghi lùi doanh thu)",
        "C. Doanh nghiệp áp dụng sai mức thuế suất GTGT đầu ra trên hóa đơn điện tử",
        "D. Kế toán làm thất lạc phiếu thu tiền mặt và giấy báo Có của ngân hàng"
      ],
      correctAnswer: 1, // B
      correctExplanation: "Thủ tục Cut-off so sánh ngày lập trên Hóa đơn GTGT, Phiếu xuất kho, Biên bản bàn giao hàng và Ngày ghi sổ kế toán bán hàng vào vài ngày trước và sau ngày kết thúc niên độ (thường là 31/12). Mục tiêu cốt lõi là kiểm tra cơ sở dẫn liệu Đúng kỳ (Cut-off): đảm bảo doanh thu thuộc năm nào thì được ghi đúng vào niên độ đó, triệt tiêu động cơ đẩy doanh thu tương lai về năm nay để hoàn thành KPI.",
      distractorExplanations: [
        "❌ Phương án A SAI VÌ: Khả năng thu hồi nợ liên quan đến cơ sở dẫn liệu 'Đánh giá nợ phải thu' (lập dự phòng nợ phải thu khó đòi theo Thông tư 48/2019), được kiểm tra qua việc phân tích tuổi nợ và tình hình tài chính khách nợ, không phải qua thủ tục Cut-off.",
        "✅ Phương án B ĐÚNG: Đây là mục đích chuẩn xác của thủ tục khóa sổ Cut-off theo chuẩn mực kiểm toán.",
        "❌ Phương án C SAI VÌ: Kiểm tra thuế suất GTGT là thủ tục kiểm tra tính tuân thủ pháp luật thuế và tính toán số học (Accuracy), không phải Cut-off.",
        "❌ Phương án D SAI VÌ: Thất lạc chứng từ thuộc về kiểm soát nội bộ và lưu trữ hồ sơ, không phải trọng tâm của thử nghiệm khóa sổ."
      ],
      examTrap: "Nếu chứng từ xuất kho ký ngày 31/12 nhưng điều khoản giao hàng là FOB Destination (giao tại kho người mua) và đến 03/01 người mua mới nhận hàng, thì việc kế toán ghi nhận doanh thu vào năm cũ là SAI CƠ SỞ DẪN LIỆU CUT-OFF.",
      documentRef: "Kiểm toán chu trình Bán hàng - Phải thu khách hàng"
    },
    {
      id: "q-5",
      folderId: "folder-tax",
      folderName: "Thuế & Luật kinh tế",
      question: "Khoản chi phí nào sau đây của doanh nghiệp KHÔNG ĐƯỢC TÍNH VÀO CHI PHÍ ĐƯỢC TRỪ khi xác định thu nhập chịu thuế Thu nhập doanh nghiệp (TNDN)?",
      options: [
        "A. Tiền lương trả cho người lao động có hợp đồng lao động và chứng từ thanh toán ngân hàng",
        "B. Chi trang phục bằng tiền mặt cho nhân viên với mức 4.500.000 VNĐ/người/năm",
        "C. Tiền phạt vi phạm hành chính về thuế, vi phạm luật an toàn giao thông đường bộ",
        "D. Chi phí nghiên cứu khoa học, đổi mới công nghệ có hóa đơn chứng từ hợp pháp"
      ],
      correctAnswer: 2, // C
      correctExplanation: "Theo Luật Thuế TNDN và Thông tư 78/2014/TT-BTC (sửa đổi bởi TT 96/2015/TT-BTC): Các khoản tiền phạt về vi phạm hành chính bao gồm vi phạm chế độ kế toán thống kê, vi phạm pháp luật thuế (phạt chậm nộp, phạt trốn thuế, khai sai) và các khoản phạt vi phạm hành chính khác (giao thông, môi trường...) đều thuộc nhóm chi phí KHÔNG ĐƯỢC TRỪ khi tính thuế TNDN (chỉ phạt vi phạm hợp đồng kinh tế mới được bù trừ với tiền phạt thu được).",
      distractorExplanations: [
        "❌ Phương án A SAI VÌ: Chi phí tiền lương có hợp đồng, quy chế và chứng từ thanh toán hợp lệ là chi phí được trừ 100%.",
        "❌ Phương án B SAI VÌ: Chi trang phục bằng tiền không vượt quá 05 triệu đồng/người/năm được tính vào chi phí được trừ (ở đây mức 4,5 triệu vẫn trong khung cho phép).",
        "✅ Phương án C ĐÚNG: Tiền phạt vi phạm hành chính KHÔNG được trừ khi tính thuế TNDN.",
        "❌ Phương án D SAI VÌ: Chi nghiên cứu khoa học phục vụ hoạt động sản xuất kinh doanh có chứng từ hợp lệ là chi phí được trừ, thậm chí còn được trích lập Quỹ Phát triển KH&CN."
      ],
      examTrap: "Phân biệt cực kỳ cẩn thận giữa: 'Phạt vi phạm HỢP ĐỒNG KINH TẾ' (được trừ sau khi bù trừ thu nhập phạt) và 'Phạt vi phạm HÀNH CHÍNH / LUẬT PHÁP' (vĩnh viễn KHÔNG ĐƯỢC TRỪ).",
      documentRef: "Luật Thuế TNDN & Thông tư 96/2015/TT-BTC"
    },
    {
      id: "q-6",
      folderId: "folder-vsa",
      folderName: "Chuẩn mực VSA / ISA",
      question: "Theo VSA 505 (Thư xác nhận từ bên ngoài), tại sao hình thức gửi Thư xác nhận mở (Positive Confirmation) lại cung cấp bằng chứng kiểm toán có độ tin cậy cao hơn Thư xác nhận phủ định (Negative Confirmation)?",
      options: [
        "A. Vì thư xác nhận phủ định chỉ yêu cầu bên thứ ba phản hồi khi họ KHÔNG đồng ý với số dư, nếu không phản hồi thì KTV không thể chắc chắn họ có nhận được thư hay không",
        "B. Vì thư xác nhận mở chỉ áp dụng cho tài khoản ngân hàng còn thư phủ định chỉ áp dụng cho người mua",
        "C. Vì thư xác nhận phủ định bắt buộc phải có chữ ký của Kiểm toán Nhà nước mới có hiệu lực",
        "D. Vì chi phí bưu điện khi gửi thư xác nhận mở được miễn thuế GTGT theo quy định"
      ],
      correctAnswer: 0, // A
      correctExplanation: "Theo VSA 505 đoạn 15: Thư xác nhận phủ định (Negative confirmation) chỉ yêu cầu bên xác nhận phản hồi nếu họ bất đồng với thông tin đã nêu. Do đó, việc không nhận được thư phản hồi không đồng nghĩa với việc bên thứ ba đã xác nhận số dư là đúng (vì có thể thư bị thất lạc bưu điện, người nhận bỏ qua không thèm đọc hoặc không hiểu). Vì vậy, thư phủ định cung cấp bằng chứng kiểm toán kém thuyết phục hơn và chỉ được dùng khi rủi ro được đánh giá là rất thấp, có số lượng lớn các số dư nhỏ.",
      distractorExplanations: [
        "✅ Phương án A ĐÚNG: Nêu chính xác bản chất rủi ro của thư xác nhận phủ định theo quy định tại VSA 505.",
        "❌ Phương án B SAI VÌ: Cả hai hình thức đều có thể áp dụng cho các đối tượng khác nhau tùy thuộc vào đánh giá rủi ro của KTV, không có quy định cứng nhắc ngân hàng bắt buộc chỉ dùng một loại.",
        "❌ Phương án C SAI VÌ: Kiểm toán BCTC của doanh nghiệp do KTV độc lập thực hiện, Kiểm toán Nhà nước chỉ kiểm toán các đơn vị sử dụng ngân sách/tài sản công.",
        "❌ Phương án D SAI VÌ: Vấn đề chi phí bưu chính không liên quan đến chuẩn mực về độ tin cậy của bằng chứng kiểm toán."
      ],
      examTrap: "VSA 505 quy định: KTV KHÔNG ĐƯỢC sử dụng thư xác nhận phủ định làm thủ tục kiểm tra cơ bản duy nhất, trừ khi thỏa mãn đồng thời 4 điều kiện khắt khe (rủi ro RoMM thấp, tổng thể gồm nhiều số dư nhỏ, tỷ lệ sai sót kỳ vọng thấp, KTV tin rằng bên nhận thư sẽ phản hồi nghiêm túc).",
      documentRef: "VSA 505 · Thông tin xác nhận từ bên ngoài"
    },
    {
      id: "q-7",
      folderId: "folder-vsa",
      folderName: "Chuẩn mực VSA / ISA",
      question: "Theo VSA 240, trách nhiệm hàng đầu và chủ yếu trong việc phòng ngừa và phát hiện gian lận (Fraud) thuộc về ai?",
      options: [
        "A. Kiểm toán viên độc lập ký tên trên Báo cáo kiểm toán",
        "B. Ban quản trị và Ban Giám đốc của đơn vị được kiểm toán",
        "C. Cơ quan Thuế trực tiếp quản lý doanh nghiệp",
        "D. Ủy ban Chứng khoán Nhà nước và Sở Giao dịch Chứng khoán"
      ],
      correctAnswer: 1, // B
      correctExplanation: "Theo VSA 240 đoạn 04: Trách nhiệm hàng đầu đối với việc ngăn ngừa và phát hiện gian lận thuộc về Ban quản trị (BQT) và Ban Giám đốc (BGĐ) của đơn vị được kiểm toán thông qua việc thiết lập môi trường kiểm soát trung thực, chuẩn mực đạo đức và duy trì hệ thống kiểm soát nội bộ hữu hiệu. Trách nhiệm của KTV chỉ là thu thập sự đảm bảo hợp lý (reasonable assurance) rằng BCTC xét trên phương diện tổng thể không còn sai sót trọng yếu do gian lận hoặc nhầm lẫn.",
      distractorExplanations: [
        "❌ Phương án A SAI VÌ: KTV không chịu trách nhiệm ngăn ngừa gian lận cho doanh nghiệp. KTV chỉ chịu trách nhiệm lập kế hoạch và thực hiện cuộc kiểm toán để đạt được sự đảm bảo hợp lý.",
        "✅ Phương án B ĐÚNG: BGĐ và BQT chịu trách nhiệm quản lý, điều hành và kiểm soát nội bộ nên là bên chịu trách nhiệm cao nhất.",
        "❌ Phương án C SAI VÌ: Cơ quan Thuế thực hiện chức năng quản lý nhà nước về thuế, không chịu trách nhiệm vận hành nội bộ hay ngăn chặn gian lận cho doanh nghiệp.",
        "❌ Phương án D SAI VÌ: Cơ quan quản lý chứng khoán chỉ giám sát việc công bố thông tin trên thị trường chứng khoán."
      ],
      examTrap: "Đừng bao giờ nhầm lẫn giữa 'Khoảng cách kỳ vọng' (Expectation Gap): Công chúng thường nghĩ KTV phải chịu trách nhiệm tìm ra mọi gian lận, nhưng chuẩn mực kiểm toán VSA 240 khẳng định KTV KHÔNG PHẢI là người bảo đảm tuyệt đối cho việc BCTC không có gian lận.",
      documentRef: "VSA 240 · Trách nhiệm của KTV đối với gian lận"
    },
    {
      id: "q-8",
      folderId: "folder-vsa",
      folderName: "Chuẩn mực VSA / ISA",
      question: "Khi BCTC có sai sót trọng yếu nhưng KHÔNG CÓ TÍNH LAN TỎA (Material but not Pervasive), KTV sẽ đưa ra loại ý kiến kiểm toán nào theo VSA 705?",
      options: [
        "A. Ý kiến chấp nhận toàn phần (Unmodified Opinion)",
        "B. Ý kiến chấp nhận từng phần (Qualified Opinion / Ngoại trừ)",
        "C. Ý kiến trái ngược (Adverse Opinion)",
        "D. Từ chối đưa ra ý kiến (Disclaimer of Opinion)"
      ],
      correctAnswer: 1, // B
      correctExplanation: "Theo VSA 705 (Bảng ma trận ý kiến kiểm toán): Khi BCTC có sai sót trọng yếu nhưng KHÔNG lan tỏa (ảnh hưởng chỉ giới hạn ở một hoặc một vài khoản mục cụ thể mà không làm sai lệch toàn bộ bức tranh tài chính), KTV phải đưa ra 'Ý kiến kiểm toán chấp nhận từng phần' (Ngoại trừ). Chỉ khi sai sót vừa trọng yếu VỪA LAN TỎA (Pervasive) thì KTV mới đưa ra 'Ý kiến trái ngược' (Adverse).",
      distractorExplanations: [
        "❌ Phương án A SAI VÌ: Sai sót đã là TRỌNG YẾU (Material) thì dứt khoát không thể phát hành Báo cáo kiểm toán Chấp nhận toàn phần sạch sẽ (Clean report) được.",
        "✅ Phương án B ĐÚNG: Trọng yếu + KHÔNG lan tỏa ➔ Ý kiến Chấp nhận từng phần (Ngoại trừ - Qualified).",
        "❌ Phương án C SAI VÌ: Ý kiến Trái ngược đòi hỏi sai sót phải đồng thời TRỌNG YẾU và LAN TỎA (Material and Pervasive), làm biến dạng hoàn toàn BCTC.",
        "❌ Phương án D SAI VÌ: Từ chối đưa ra ý kiến chỉ áp dụng khi KTV KHÔNG THỂ thu thập được đầy đủ bằng chứng kiểm toán thích hợp và ảnh hưởng tiềm tàng là vừa Trọng yếu vừa Lan tỏa."
      ],
      examTrap: "Bảng thần chú VSA 705: (1) Trọng yếu + Không lan tỏa ➔ Ngoại trừ (Qualified). (2) Sai sót trọng yếu + Lan tỏa ➔ Trái ngược (Adverse). (3) Không thu thập được bằng chứng + Lan tỏa ➔ Từ chối (Disclaimer).",
      documentRef: "VSA 700 & VSA 705 · Báo cáo kiểm toán"
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

  static addQuizQuestion({ folderId, folderName, question, options, correctAnswer, correctExplanation, distractorExplanations = [], examTrap = '', documentRef = '' }) {
    const quizzes = this.getAllQuizzes();
    
    // Auto-generate distractor hints if not manually populated
    const optLabels = ['A', 'B', 'C', 'D'];
    const finalDistractors = distractorExplanations.length === 4 ? distractorExplanations : options.map((opt, i) => {
      if (i === parseInt(correctAnswer, 10)) {
        return `✅ Phương án ${optLabels[i]} ĐÚNG: Phù hợp với nội dung và quy định được trích dẫn.`;
      }
      return `❌ Phương án ${optLabels[i]} SAI VÌ: Nội dung này mâu thuẫn hoặc không phản ánh đúng quy định và bản chất của tài liệu tham chiếu.`;
    });

    const newQ = {
      id: "q-" + Date.now(),
      folderId,
      folderName,
      question: question.trim(),
      options: options.map(o => o.trim()),
      correctAnswer: parseInt(correctAnswer, 10),
      correctExplanation: correctExplanation.trim(),
      distractorExplanations: finalDistractors,
      examTrap: examTrap.trim(),
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
      const summarySnippet = doc.summary.length > 90 ? doc.summary.slice(0, 90) + '...' : doc.summary;
      templates.push({
        folderId: doc.folderId,
        folderName: doc.folderName,
        question: `Nội dung cốt lõi nào sau đây được kết luận chính xác trong tài liệu "${title}"?`,
        options: [
          `A. ${summarySnippet}`,
          `B. Kiểm toán viên được phép tự động miễn trừ trách nhiệm pháp lý nếu khách hàng cung cấp số liệu sai`,
          `C. Thủ tục phân bổ toàn bộ chi phí phát sinh vào quỹ dự phòng tài chính của năm sau`,
          `D. Doanh nghiệp chỉ cần thu thập bằng chứng kiểm toán bằng hình thức phỏng vấn miệng nhân viên`
        ],
        correctAnswer: 0,
        correctExplanation: `Căn cứ theo tài liệu nghiên cứu "${title}": Nội dung trọng tâm khẳng định: ${doc.summary}.`,
        distractorExplanations: [
          `✅ Phương án A ĐÚNG: Phản ánh chuẩn xác nội dung được tóm tắt từ tài liệu "${title}".`,
          `❌ Phương án B SAI VÌ: Theo chuẩn mực VSA 200, KTV duy trì trách nhiệm nghề nghiệp độc lập và không thể tùy tiện miễn trừ trách nhiệm đối với ý kiến kiểm toán đã phát hành.`,
          `❌ Phương án C SAI VÌ: Chi phí phải được ghi nhận phù hợp với doanh thu tạo ra trong kỳ theo nguyên tắc Phù hợp (Matching Principle), không được đẩy tùy tiện sang năm sau.`,
          `❌ Phương án D SAI VÌ: Theo VSA 500, phỏng vấn chỉ là thủ tục hỗ trợ, bằng chứng phỏng vấn đơn thuần KHÔNG ĐỦ độ tin cậy nếu không có tài liệu chứng minh độc lập.`
        ],
        examTrap: `Luôn cảnh giác với các phương án chứa từ ngữ tuyệt đối hóa như 'chỉ cần', 'miễn trừ toàn bộ' vì chuẩn mực kiểm toán luôn đòi hỏi sự cẩn trọng nghề nghiệp và hoài nghi nghề nghiệp.`,
        documentRef: title
      });
    }

    if (doc.examTips) {
      const tipsSnippet = doc.examTips.length > 90 ? doc.examTips.slice(0, 90) + '...' : doc.examTips;
      templates.push({
        folderId: doc.folderId,
        folderName: doc.folderName,
        question: `Khi làm bài thi phần kiến thức liên quan đến "${title}", KTV/sinh viên cần đặc biệt ghi nhớ lưu ý quan trọng nào?`,
        options: [
          `A. Bỏ qua các thủ tục kiểm tra chéo và đối chiếu chứng từ gốc để đẩy nhanh tiến độ làm bài`,
          `B. ${tipsSnippet}`,
          `C. Chỉ cần kiểm tra số dư đầu kỳ, không cần kiểm tra số phát sinh trong kỳ của tài khoản`,
          `D. Không cần tuân thủ quy định của chuẩn mực kiểm toán VSA nếu thời gian kiểm toán quá ngắn`
        ],
        correctAnswer: 1,
        correctExplanation: `Căn cứ ghi chú ôn thi trọng điểm của tài liệu "${title}": ${doc.examTips}.`,
        distractorExplanations: [
          `❌ Phương án A SAI VÌ: Bỏ qua kiểm tra chéo chứng từ gốc là lỗi nghiệp vụ nghiêm trọng dẫn đến việc bỏ sót sai phạm trọng yếu và rủi ro phát hiện tăng cao.`,
          `✅ Phương án B ĐÚNG: Đây là điểm mấu chốt và cạm bẫy thi cử được nhấn mạnh trong tài liệu ôn tập.`,
          `❌ Phương án C SAI VÌ: Kiểm tra số dư đầu kỳ chỉ là một phần (VSA 510), KTV bắt buộc phải kiểm tra các giao dịch phát sinh trong kỳ để xác định số dư cuối kỳ hợp lý.`,
          `❌ Phương án D SAI VÌ: Chuẩn mực VSA là quy định pháp lý mang tính bắt buộc tuân thủ đối với mọi cuộc kiểm toán độc lập tại Việt Nam.`
        ],
        examTrap: `Đề thi thường tạo ra các phương án nghe có vẻ thực tế (như áp lực thời gian, tiết kiệm chi phí) để đánh lừa sinh viên. Chuẩn mực kiểm toán KHÔNG BAO GIỜ nhân nhượng việc vi phạm vì lý do thiếu thời gian!`,
        documentRef: title
      });
    }

    return templates;
  }
}
