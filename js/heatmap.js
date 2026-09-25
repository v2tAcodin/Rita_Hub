// Study Activity Heatmap (Bản Đồ Nhiệt Chăm Chỉ) for Rita Hub
// Visualizes authentic university auditing study patterns, Pomodoros, and VSA quizzes

export class StudyHeatmap {
  static STORAGE_KEY = 'rita_hub_study_heatmap_v6_zero';

  static formatLocalDate(d) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  static getHeatmapData() {
    // Purge legacy versions to ensure complete reset to 0
    ['rita_hub_study_heatmap_v1', 'rita_hub_study_heatmap_v2', 'rita_hub_study_heatmap_v3', 'rita_hub_study_heatmap_v4', 'rita_hub_study_heatmap_v5'].forEach(k => {
      localStorage.removeItem(k);
    });

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

  static resetToZero() {
    // Reset all heatmap storage keys to 0
    Object.keys(localStorage).forEach(k => {
      if (k.includes('study_heatmap')) {
        localStorage.removeItem(k);
      }
    });
    const emptyData = {};
    this.saveHeatmapData(emptyData);
    return emptyData;
  }

  static resetToRealisticHistory() {
    return this.resetToZero();
  }

  static generateInitialHistory() {
    // Hoàn toàn về 0: Khởi tạo dữ liệu trống
    return {};
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

    // Number of days to show: 52 weeks * 7 = 364 days (1 full year, realistic like GitHub)
    const totalDays = 364;
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
            <span style="font-size:1.1rem;">🌱</span>
            <strong>${dateStr}:</strong>
            <span class="badge" style="background:var(--bg-secondary); color:var(--text-muted); border:1px solid var(--border-subtle);">0 phiên học</span>
            <span>Chưa có hoạt động nào được ghi nhận. Bấm "+1 Pomodoro" hoặc "Check-in" để bắt đầu hành trình nhé! ☕✨</span>
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
