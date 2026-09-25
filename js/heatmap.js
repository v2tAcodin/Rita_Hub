// Study Activity Heatmap (Bản Đồ Nhiệt Chăm Chỉ) for Rita Hub
// Visualizes authentic university auditing study patterns, Pomodoros, and VSA quizzes

export class StudyHeatmap {
  static STORAGE_KEY = 'rita_hub_study_heatmap_v4';

  static formatLocalDate(d) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  static getHeatmapData() {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.error("Error parsing heatmap data", e);
      }
    }
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

    const studyTopics = [
      "VSA 320: Xác định Mức trọng yếu tổng thể OM & PM",
      "Bài tập lớn Báo cáo tài chính & Mẫu Working Papers Excel",
      "Giải 20 câu trắc nghiệm chu trình Bán hàng - Thu tiền",
      "Đọc chuẩn mực VSA 500 & VSA 505 về Thư xác nhận bên ngoài",
      "Ghi chú cạm bẫy Thuế TNDN: Các khoản chi phí không được trừ",
      "Luyện đề thi thử Kiểm toán căn bản & Các cơ sở dẫn liệu",
      "Học nhóm tại quán cà phê: Thảo luận rủi ro gian lận VSA 240",
      "Ôn tập giữa kỳ: Phân tích tỷ số tài chính & Thủ tục Cut-off",
      "Đọc giáo trình Kiểm toán hoạt động & Hệ thống kiểm soát nội bộ COSO",
      "Thực hành kiểm toán khoản mục Hàng tồn kho theo VSA 501",
      "Kiểm tra tính tuân thủ pháp luật thuế & Hóa đơn điện tử",
      "Phân tích ma trận ý kiến kiểm toán theo VSA 705"
    ];

    // Generate past 140 days (~20 weeks from early May to late September)
    for (let i = 140; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = this.formatLocalDate(d);
      const dayOfWeek = d.getDay(); // 0: Sunday, 6: Saturday

      let count = 0;
      let topic = "";

      // 1. RECENT STREAK (Last 14 days up to today): Continuous uninterrupted study
      if (i < 14 && i > 0) {
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          count = 4 + (i % 3); // 4 - 6 sessions on weekends
          topic = "Cuối tuần tập trung cao độ: " + studyTopics[i % studyTopics.length];
        } else {
          count = 2 + (i % 3); // 2 - 4 sessions on weekdays
          topic = "Buổi tối tự học: " + studyTopics[i % studyTopics.length];
        }
      }
      // TODAY
      else if (i === 0) {
        count = 4;
        topic = "Hôm nay: 2 phiên Pomodoro + 2 bài luyện trắc nghiệm VSA 320";
      }
      // 2. SEMESTER START & PRACTICE (14 - 45 days ago, ~ late Aug to mid Sep)
      else if (i >= 14 && i < 45) {
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          count = 3 + (i % 3); // 3 - 5 sessions
          topic = "Cày bài tại quán cà phê: " + studyTopics[i % studyTopics.length];
        } else if (dayOfWeek === 2 || dayOfWeek === 4) {
          count = 2 + (i % 2); // 2 - 3 sessions
          topic = "Làm bài tập về nhà: " + studyTopics[i % studyTopics.length];
        } else if (dayOfWeek === 5) {
          count = (i % 3 === 0) ? 1 : 0; // Friday rest
        } else {
          count = 1 + (i % 2);
          topic = "Đọc chuẩn mực kiểm toán: " + studyTopics[i % studyTopics.length];
        }
      }
      // 3. SUMMER BREAK (46 - 85 days ago, ~ mid July to mid August)
      else if (i >= 45 && i < 85) {
        // Sporadic light study during summer vacation
        if (dayOfWeek === 0 || (i % 4 === 0)) {
          count = 1 + (i % 2); // 1 or 2 sessions
          topic = "Tự đọc tài liệu hè: " + studyTopics[i % studyTopics.length];
        } else {
          count = 0; // Rest day
        }
      }
      // 4. FINAL EXAMS SEMESTER 2 CRUNCH (86 - 110 days ago, ~ late June)
      else if (i >= 85 && i <= 110) {
        // High intensity exam revision (4 - 7 sessions)
        const rand = (i * 7) % 10;
        if (rand > 1) {
          count = 4 + (i % 4); // 4 - 7 sessions
          topic = "Mùa thi cuối kỳ: " + studyTopics[i % studyTopics.length];
        } else {
          count = 1;
        }
      }
      // 5. MIDTERM TESTS & CLASS PROJECTS (111 - 140 days ago, ~ May)
      else {
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          count = 3 + (i % 2);
          topic = "Ôn tập giữa kỳ: " + studyTopics[i % studyTopics.length];
        } else if (i % 3 === 0) {
          count = 2;
          topic = "Thảo luận nhóm kiểm toán: " + studyTopics[i % studyTopics.length];
        } else {
          count = 0;
        }
      }

      if (count > 0) {
        const pomos = Math.max(1, Math.floor(count * 0.65));
        const quizzes = count >= 3 ? Math.floor(count * 0.25) : 0;
        const notes = Math.max(0, count - pomos - quizzes);

        data[dateStr] = {
          count,
          pomos,
          quizzes,
          notes,
          topic: topic || studyTopics[i % studyTopics.length]
        };
      }
    }

    return data;
  }

  static recordTodayActivity(type = 'pomo', amount = 1) {
    const data = this.getHeatmapData();
    const todayStr = this.formatLocalDate(new Date());

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

    while (true) {
      const dateStr = this.formatLocalDate(checkDate);
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

    const todayStr = this.formatLocalDate(today);
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

    // Number of days to show: 20 weeks * 7 = 140 days
    const totalDays = 140;
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - totalDays + 1);

    // Align startDate to Monday of that week
    const dayOfWeek = (startDate.getDay() + 6) % 7; // Monday = 0
    startDate.setDate(startDate.getDate() - dayOfWeek);

    const weeks = [];
    let currentWeek = [];
    const loopDate = new Date(startDate);

    while (loopDate <= today || currentWeek.length > 0) {
      const dateStr = this.formatLocalDate(loopDate);
      const entry = data[dateStr];
      const count = entry ? entry.count : 0;

      let level = 0;
      if (count >= 7) level = 4;
      else if (count >= 5) level = 3;
      else if (count >= 3) level = 2;
      else if (count >= 1) level = 1;

      const isFuture = loopDate > today;

      currentWeek.push({
        dateStr,
        count,
        level: isFuture ? -1 : level,
        isFuture,
        entry: entry || null,
        month: loopDate.getMonth(),
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

    // Build Month Labels Row aligned to weeks
    const monthNames = ['Thg 1', 'Thg 2', 'Thg 3', 'Thg 4', 'Thg 5', 'Thg 6', 'Thg 7', 'Thg 8', 'Thg 9', 'Thg 10', 'Thg 11', 'Thg 12'];
    let lastMonth = -1;
    let monthLabelsHtml = '';
    const colWidth = 19; // 15px cell + 4px gap

    weeks.forEach((week, wIdx) => {
      const firstDay = week[0];
      if (firstDay && firstDay.month !== lastMonth) {
        lastMonth = firstDay.month;
        const leftPos = wIdx * colWidth;
        monthLabelsHtml += `<span class="heatmap-month-label" style="left: ${leftPos}px;">${monthNames[firstDay.month]}</span>`;
      }
    });

    // Build Weeks Columns HTML
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
                 data-topic="${day.entry?.topic || 'Nghỉ ngơi hoặc thư giãn'}"
                 title="${tooltip}">
            </div>
          `;
        }
      });
      cellsHtml += '</div>';
    });

    container.innerHTML = `
      <div class="heatmap-scroll-area">
        <div class="heatmap-wrapper">
          <!-- Month Header Row -->
          <div class="heatmap-months-header">
            <div class="heatmap-days-legend-spacer"></div>
            <div class="heatmap-months-row">
              ${monthLabelsHtml}
            </div>
          </div>

          <!-- Heatmap Grid Body -->
          <div class="heatmap-body">
            <div class="heatmap-days-legend">
              <span class="day-lbl">T2</span>
              <span class="day-lbl"></span>
              <span class="day-lbl">T4</span>
              <span class="day-lbl"></span>
              <span class="day-lbl">T6</span>
              <span class="day-lbl"></span>
              <span class="day-lbl">CN</span>
            </div>
            <div class="heatmap-grid-weeks">
              ${cellsHtml}
            </div>
          </div>
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
          <div style="display:flex; align-items:center; gap:0.6rem; flex-wrap:wrap;">
            <span style="font-size:1.1rem;">🍃</span>
            <strong>${dateStr}:</strong>
            <span>Ngày nghỉ xả hơi, nạp lại năng lượng sau những ngày cày chuẩn mực! ☕✨</span>
          </div>
        `;
      } else {
        detailPanel.innerHTML = `
          <div style="display:flex; align-items:center; gap:0.6rem; flex-wrap:wrap;">
            <span style="font-size:1.1rem;">🔥</span>
            <strong>${dateStr}:</strong>
            <span class="badge badge-yellow" style="font-weight:700;">${count} phiên học tập</span>
            <span style="color:var(--text-secondary); font-size:0.84rem;">(${pomos} Pomodoro · ${quizzes} Trắc nghiệm · ${notes} Ghi chú VSA)</span>
            <span style="color:var(--brown-800); font-weight:600;">— 📖 ${topic}</span>
          </div>
        `;
      }
    };

    cells.forEach(cell => {
      cell.addEventListener('mouseenter', () => showDayDetail(cell));
      cell.addEventListener('click', () => showDayDetail(cell));
    });

    // Select today cell by default
    const todayStr = this.formatLocalDate(today);
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
