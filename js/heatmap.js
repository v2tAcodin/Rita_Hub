// Study Activity Heatmap (Bản Đồ Nhiệt Chăm Chỉ) for Rita Hub
// Visualizes daily study sessions, Pomodoros, and document reviews in warm honey & coffee tones

export class StudyHeatmap {
  static STORAGE_KEY = 'rita_hub_study_heatmap_v2';

  static getHeatmapData() {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.error("Error parsing heatmap data", e);
      }
    }
    // Generate initial inspiring study history for the last 60 days
    const defaultData = this.generateInitialHistory();
    this.saveHeatmapData(defaultData);
    return defaultData;
  }

  static saveHeatmapData(data) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  static generateInitialHistory() {
    const data = {};
    const today = new Date();
    // Generate past 90 days with cute realistic pattern (active on study days, higher before exam)
    for (let i = 90; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayOfWeek = d.getDay(); // 0 is Sunday, 6 is Saturday

      // Weekends or middle of the week have nice study habits
      let count = 0;
      const rand = Math.random();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        if (rand > 0.25) count = Math.floor(Math.random() * 5) + 2; // 2 - 6 sessions
      } else {
        if (rand > 0.35) count = Math.floor(Math.random() * 4) + 1; // 1 - 4 sessions
      }

      // Recent 7 days streak
      if (i <= 7 && i > 0) {
        count = Math.max(count, Math.floor(Math.random() * 3) + 2);
      }

      // Today
      if (i === 0) {
        count = Math.max(count, 3);
      }

      if (count > 0) {
        data[dateStr] = {
          count: count,
          pomos: Math.max(1, Math.floor(count * 0.7)),
          notes: Math.floor(count * 0.3)
        };
      }
    }
    return data;
  }

  static recordTodayActivity(type = 'pomo', amount = 1) {
    const data = this.getHeatmapData();
    const todayStr = new Date().toISOString().split('T')[0];

    if (!data[todayStr]) {
      data[todayStr] = { count: 0, pomos: 0, notes: 0 };
    }

    data[todayStr].count += amount;
    if (type === 'pomo') data[todayStr].pomos += amount;
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

    // Calculate current streak
    while (true) {
      const dateStr = checkDate.toISOString().split('T')[0];
      if (data[dateStr] && data[dateStr].count > 0) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        // If today has no activity yet, check if yesterday was active
        if (streak === 0 && checkDate.getTime() === today.getTime()) {
          checkDate.setDate(checkDate.getDate() - 1);
          continue;
        }
        break;
      }
    }

    // Total activities
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
          const tooltip = `${day.dayName}, ${day.formattedDate}: ${day.count} phiên học tập & ôn thi ☕`;
          cellsHtml += `
            <div class="heatmap-cell level-${day.level}" 
                 data-date="${day.dateStr}" 
                 data-count="${day.count}" 
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
          <span>T4</span>
          <span>T6</span>
          <span>CN</span>
        </div>
        <div class="heatmap-grid-weeks">
          ${cellsHtml}
        </div>
      </div>
    `;

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
            <span class="heatmap-stat-lbl">Học hôm nay</span>
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
