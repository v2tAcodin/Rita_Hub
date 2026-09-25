// Study Activity Heatmap (Bản Đồ Nhiệt Chăm Chỉ) for Rita Hub
// Visualizes realistic university auditing study sessions, Pomodoros, and VSA reviews

export class StudyHeatmap {
  static STORAGE_KEY = 'rita_hub_study_heatmap_v3';

  static getHeatmapData() {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.error("Error parsing heatmap data", e);
      }
    }
    // Generate realistic authentic academic history for the 16-week window
    const defaultData = this.generateInitialHistory();
    this.saveHeatmapData(defaultData);
    return defaultData;
  }

  static saveHeatmapData(data) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  static resetToRealisticHistory() {
    const freshData = this.generateInitialHistory();
    this.saveHeatmapData(freshData);
    return freshData;
  }

  static generateInitialHistory() {
    const data = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Realistic study highlights and topics for an auditing student
    const studyTopics = [
      "Ôn tập VSA 320: Xác định Mức trọng yếu tổng thể OM & PM",
      "Làm bài tập lớn Báo cáo tài chính & Working Papers Excel",
      "Giải 20 câu trắc nghiệm chu trình Bán hàng & Thu tiền",
      "Đọc chuẩn mực VSA 500 & VSA 505 về Thư xác nhận",
      "Ghi chú cạm bẫy Thuế TNDN: Chi phí không được trừ",
      "Luyện đề thi thử Kiểm toán căn bản & cơ sở dẫn liệu",
      "Học nhóm tại quán cà phê: Thảo luận rủi ro gian lận VSA 240",
      "Ôn thi giữa kỳ: Phân tích tỷ số tài chính và Cut-off test",
      "Đọc giáo trình Kiểm toán hoạt động & Kiểm soát nội bộ COSO"
    ];

    // Generate past 112 days (16 full weeks) with an authentic university rhythm
    for (let i = 112; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayOfWeek = d.getDay(); // 0: Sunday, 6: Saturday

      let count = 0;
      let topic = "";

      // PHASE 1: Final Exam Crunch period (75 - 95 days ago, ~ late June)
      if (i >= 75 && i <= 95) {
        // High intensity exam revision (4 - 7 sessions)
        const rand = (i * 13) % 10;
        if (rand > 1) {
          count = 4 + (i % 4); // 4, 5, 6, 7 sessions
          topic = "Mùa thi cuối kỳ: " + studyTopics[i % studyTopics.length];
        }
      }
      // PHASE 2: Summer break & Relaxing period (45 - 74 days ago, ~ July - August)
      else if (i >= 45 && i < 75) {
        // Sporadic, relaxing study (mostly 0, some 1 - 2 sessions on weekends)
        if (dayOfWeek === 0 || dayOfWeek === 6 || (i % 5 === 0)) {
          count = 1 + (i % 2); // 1 or 2 sessions
          topic = "Đọc tài liệu hè: " + studyTopics[i % studyTopics.length];
        } else {
          count = 0; // Rest day
        }
      }
      // PHASE 3: New Semester Start & Consistent Study (15 - 44 days ago, ~ late August - mid September)
      else if (i >= 15 && i < 45) {
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          // Weekend cafe study sessions: 3 - 5 sessions
          count = 3 + (i % 3);
          topic = "Học cuối tuần: " + studyTopics[i % studyTopics.length];
        } else if (dayOfWeek === 2 || dayOfWeek === 4) {
          // Busy class days: 2 - 3 sessions
          count = 2 + (i % 2);
          topic = "Bài tập về nhà: " + studyTopics[i % studyTopics.length];
        } else if (dayOfWeek === 5) {
          // Friday night chill / rest: 0 or 1 session
          count = i % 3 === 0 ? 1 : 0;
        } else {
          count = 1 + (i % 3);
          topic = "Tự học: " + studyTopics[i % studyTopics.length];
        }
      }
      // PHASE 4: Recent Active Streak (Last 14 days up to today)
      else if (i < 15 && i > 0) {
        // Continuous, unbroken 14-day streak!
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          count = 4 + (i % 3); // 4 - 6 sessions
          topic = "Cuối tuần tập trung cao độ: " + studyTopics[i % studyTopics.length];
        } else {
          count = 2 + (i % 3); // 2 - 4 sessions
          topic = "Tập trung buổi tối: " + studyTopics[i % studyTopics.length];
        }
      }
      // TODAY
      else if (i === 0) {
        count = 3; // 3 sessions completed today
        topic = "Hôm nay: 2 phiên Pomodoro + 1 lượt luyện trắc nghiệm VSA 320";
      }

      if (count > 0) {
        const pomos = Math.max(1, Math.floor(count * 0.65));
        const quizzes = count >= 3 ? Math.floor(count * 0.25) : 0;
        const notes = count - pomos - quizzes;

        data[dateStr] = {
          count: count,
          pomos: pomos,
          quizzes: quizzes,
          notes: Math.max(0, notes),
          topic: topic || studyTopics[i % studyTopics.length]
        };
      }
    }

    return data;
  }

  static recordTodayActivity(type = 'pomo', amount = 1) {
    const data = this.getHeatmapData();
    const todayStr = new Date().toISOString().split('T')[0];

    if (!data[todayStr]) {
      data[todayStr] = { count: 0, pomos: 0, quizzes: 0, notes: 0, topic: "Hoạt động tự học hôm nay" };
    }

    data[todayStr].count += amount;
    if (type === 'pomo') data[todayStr].pomos += amount;
    else if (type === 'quiz') data[todayStr].quizzes += amount;
    else data[todayStr].notes += amount;

    this.saveHeatmapData(data);
    return data[todayStr];
  }

  static calculateStats() {
    const data = this.getHeatmapData();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let streak = 0;
    let checkDate = new Date(today);

    // Calculate current streak backward from today
    while (true) {
      const dateStr = checkDate.toISOString().split('T')[0];
      if (data[dateStr] && data[dateStr].count > 0) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        if (streak === 0 && checkDate.getTime() === today.getTime()) {
          checkDate.setDate(checkDate.getDate() - 1);
          continue;
        }
        break;
      }
    }

    let totalSessions = 0;
    Object.values(data).forEach(entry => {
      totalSessions += (entry.count || 0);
    });

    const todayStr = today.toISOString().split('T')[0];
    const todayCount = data[todayStr]?.count || 0;

    return {
      streak,
      totalSessions,
      todayCount
    };
  }

  static renderHeatmap(containerId, statsContainerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const data = this.getHeatmapData();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Number of days to show: 16 weeks * 7 = 112 days
    const totalDays = 112;
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - totalDays + 1);

    // Align startDate to Monday of that week
    const dayOfWeek = (startDate.getDay() + 6) % 7; // Monday = 0
    startDate.setDate(startDate.getDate() - dayOfWeek);

    const weeks = [];
    let currentWeek = [];
    const loopDate = new Date(startDate);

    while (loopDate <= today || currentWeek.length > 0) {
      const dateStr = loopDate.toISOString().split('T')[0];
      const entry = data[dateStr];
      const count = entry ? entry.count : 0;

      let level = 0;
      if (count >= 6) level = 4;
      else if (count >= 4) level = 3;
      else if (count >= 2) level = 2;
      else if (count >= 1) level = 1;

      const isFuture = loopDate > today;

      currentWeek.push({
        dateStr,
        count,
        level: isFuture ? -1 : level,
        isFuture,
        entry: entry || null,
        dayName: loopDate.toLocaleDateString('vi-VN', { weekday: 'short' }),
        formattedDate: loopDate.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
      });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
        if (loopDate >= today) break;
      }

      loopDate.setDate(loopDate.getDate() + 1);
    }

    // Build Heatmap HTML
    let cellsHtml = '';
    weeks.forEach(week => {
      cellsHtml += '<div class="heatmap-week-col">';
      week.forEach(day => {
        if (day.isFuture) {
          cellsHtml += '<div class="heatmap-cell empty-cell"></div>';
        } else {
          const detailDesc = day.entry && day.entry.topic ? ` (${day.entry.topic})` : '';
          const tooltip = `${day.dayName}, ${day.formattedDate}: ${day.count} phiên học${detailDesc} ☕`;
          cellsHtml += `
            <div class="heatmap-cell level-${day.level}" 
                 data-date="${day.dateStr}" 
                 data-count="${day.count}" 
                 data-formatted="${day.dayName}, ${day.formattedDate}"
                 data-pomos="${day.entry?.pomos || 0}"
                 data-quizzes="${day.entry?.quizzes || 0}"
                 data-notes="${day.entry?.notes || 0}"
                 data-topic="${day.entry?.topic || 'Nghỉ ngơi hoặc tự học nhẹ'}"
                 title="${tooltip}">
            </div>
          `;
        }
      });
      cellsHtml += '</div>';
    });

    container.innerHTML = `
      <div class="heatmap-scroll-area">
        <div class="heatmap-days-legend">
          <span>T2</span>
          <span>T3</span>
          <span>T4</span>
          <span>T5</span>
          <span>T6</span>
          <span>T7</span>
          <span>CN</span>
        </div>
        <div class="heatmap-grid-weeks">
          ${cellsHtml}
        </div>
      </div>
    `;

    // Interactive Hover & Click Details
    const detailPanel = document.getElementById('heatmap-day-detail');
    const cells = container.querySelectorAll('.heatmap-cell:not(.empty-cell)');

    const showDayDetail = (cell) => {
      if (!detailPanel) return;
      cells.forEach(c => c.classList.remove('active-selected'));
      cell.classList.add('active-selected');

      const dateStr = cell.getAttribute('data-formatted');
      const count = parseInt(cell.getAttribute('data-count') || '0', 10);
      const pomos = cell.getAttribute('data-pomos') || '0';
      const quizzes = cell.getAttribute('data-quizzes') || '0';
      const notes = cell.getAttribute('data-notes') || '0';
      const topic = cell.getAttribute('data-topic') || '';

      if (count === 0) {
        detailPanel.innerHTML = `
          <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
            <span>🍃</span>
            <strong>${dateStr}:</strong>
            <span>Ngày nghỉ ngơi, nạp lại năng lượng hoặc đi dạo uống trà ☕</span>
          </div>
        `;
      } else {
        detailPanel.innerHTML = `
          <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
            <span>🔥</span>
            <strong>${dateStr}:</strong>
            <span class="badge badge-yellow">${count} phiên học</span>
            <span style="color:var(--text-secondary);">(${pomos} Pomodoro · ${quizzes} Trắc nghiệm · ${notes} Ghi chú VSA)</span>
            <span style="color:var(--brown-800); font-weight:500;">— 📖 ${topic}</span>
          </div>
        `;
      }
    };

    cells.forEach(cell => {
      cell.addEventListener('mouseenter', () => showDayDetail(cell));
      cell.addEventListener('click', () => showDayDetail(cell));
    });

    // Select today cell by default
    const todayStr = new Date().toISOString().split('T')[0];
    const todayCell = container.querySelector(`.heatmap-cell[data-date="${todayStr}"]`);
    if (todayCell) {
      showDayDetail(todayCell);
    }

    // Render Stats
    if (statsContainerId) {
      const stats = this.calculateStats();
      const statsEl = document.getElementById(statsContainerId);
      if (statsEl) {
        statsEl.innerHTML = `
          <div class="heatmap-stat-pill">
            <span class="heatmap-stat-num">🔥 ${stats.streak} ngày</span>
            <span class="heatmap-stat-lbl">Chuỗi chăm chỉ</span>
          </div>
          <div class="heatmap-stat-pill">
            <span class="heatmap-stat-num">☕ ${stats.todayCount} phiên</span>
            <span class="heatmap-stat-lbl">Hôm nay</span>
          </div>
          <div class="heatmap-stat-pill">
            <span class="heatmap-stat-num">🎯 ${stats.totalSessions} lượt</span>
            <span class="heatmap-stat-lbl">Tổng giờ cày bài</span>
          </div>
        `;
      }
    }
  }
}
