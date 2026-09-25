// Materiality Calculator based on Vietnamese Standard on Auditing (VSA 320) & ISA 320
// Specifically crafted for auditing students and practitioners

export class MaterialityCalculator {
  static BENCHMARKS = {
    pbt: {
      name: "Lợi nhuận trước thuế (PBT)",
      recommendedMin: 5.0,
      recommendedMax: 10.0,
      defaultPct: 5.0,
      suitableFor: "Doanh nghiệp hoạt động vì lợi nhuận, lợi nhuận ổn định qua các năm."
    },
    revenue: {
      name: "Doanh thu thuần (Revenue)",
      recommendedMin: 0.5,
      recommendedMax: 1.0,
      defaultPct: 0.5,
      suitableFor: "Doanh nghiệp bán lẻ, bán buôn, biên lợi nhuận thấp hoặc lợi nhuận biến động mạnh."
    },
    assets: {
      name: "Tổng tài sản (Total Assets)",
      recommendedMin: 0.5,
      recommendedMax: 1.0,
      defaultPct: 0.5,
      suitableFor: "Ngân hàng, công ty đầu tư, bất động sản hoặc doanh nghiệp thâm dụng vốn."
    },
    equity: {
      name: "Vốn chủ sở hữu (Equity)",
      recommendedMin: 1.0,
      recommendedMax: 2.0,
      defaultPct: 1.0,
      suitableFor: "Doanh nghiệp trong giai đoạn đầu khởi nghiệp hoặc quỹ đầu tư."
    }
  };

  static calculate({ benchmarkKey, baseAmount, customPct, riskLevel = "medium", trivialPct = 5.0 }) {
    const benchmark = this.BENCHMARKS[benchmarkKey] || this.BENCHMARKS.pbt;
    const pct = parseFloat(customPct) || benchmark.defaultPct;
    const amount = parseFloat(baseAmount) || 0;

    // 1. Mức trọng yếu tổng thể (Overall Materiality - OM)
    const om = amount * (pct / 100);

    // 2. Mức trọng yếu thực hiện (Performance Materiality - PM)
    // Tùy theo rủi ro đánh giá:
    // Rủi ro cao: 50% - 60%
    // Rủi ro trung bình: 65% - 70%
    // Rủi ro thấp: 75%
    let pmRatio = 0.65;
    if (riskLevel === "high") pmRatio = 0.50;
    else if (riskLevel === "low") pmRatio = 0.75;
    const pm = om * pmRatio;

    // 3. Ngưỡng sai sót không đáng kể (Clearly Trivial / SUD threshold)
    // Thường lấy từ 3% đến 5% của OM
    const trivialRatio = (parseFloat(trivialPct) || 5.0) / 100;
    const trivial = om * trivialRatio;

    return {
      benchmarkName: benchmark.name,
      baseAmount: amount,
      chosenPct: pct,
      riskLevel,
      pmRatioPercent: pmRatio * 100,
      om: Math.round(om),
      pm: Math.round(pm),
      trivial: Math.round(trivial),
      suitableNote: benchmark.suitableFor
    };
  }

  static formatVND(num) {
    if (isNaN(num)) return "0 đ";
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  }
}
