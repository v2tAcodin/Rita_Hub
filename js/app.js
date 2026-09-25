// Rita's Study Lounge · Main Application Controller
// Includes Dynamic Folder/Subject Management & In-depth Note/Summary Editing
import { StorageManager } from './storage.js';
import { soundEngine } from './audio.js';
import { MaterialityCalculator } from './calculator.js';
import { StudyHeatmap } from './heatmap.js';
import { DAILY_AFFIRMATIONS, AUDIT_DICTIONARY } from './data.js';

class App {
  constructor() {
    this.activeTab = 'docs';
    this.activeFolderId = null; // null means viewing all folders
    this.activeFormat = 'all';
    this.searchQuery = '';
    this.onlyFavorites = false;
    this.editingDocId = null;
    this.editingFolderId = null;

    // Pomodoro State
    this.pomoMode = 'focus'; // focus, shortBreak, longBreak
    this.pomoDurations = { focus: 25 * 60, shortBreak: 5 * 60, longBreak: 15 * 60 };
    this.pomoTimeRemaining = this.pomoDurations.focus;
    this.pomoTimerInterval = null;
    this.pomoIsRunning = false;
    this.pomoCompletedCount = parseInt(localStorage.getItem('rita_pomo_count') || '0', 10);

    this.init();
  }

  init() {
    this.initTheme();
    this.initNavigation();
    this.initDailyAffirmation();
    this.initHeatmap();
    this.initFolders();
    this.initDocumentsHub();
    this.initPomodoro();
    this.initAmbientAudio();
    this.initCalculator();
    this.initChecklist();
    this.initDictionary();
    this.initStudyCorner();
    this.initModals();
    this.updateStats();
  }

  // ==========================================
  // Theme Manager
  // ==========================================
  initTheme() {
    const savedTheme = localStorage.getItem('rita_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeButton(savedTheme);

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('rita_theme', next);
        this.updateThemeButton(next);
        this.showToast(next === 'dark' ? '🌙 Chuyển sang Midnight Mocha' : '☀️ Chuyển sang Warm Latte');
      });
    }
  }

  updateThemeButton(theme) {
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
      btn.title = theme === 'dark' ? 'Đổi sang Warm Latte (Sáng)' : 'Đổi sang Midnight Mocha (Tối)';
    }
  }

  // ==========================================
  // Navigation Tabs
  // ==========================================
  initNavigation() {
    const tabButtons = document.querySelectorAll('.nav-tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        this.switchTab(targetTab);
      });
    });
  }

  switchTab(tabId) {
    this.activeTab = tabId;
    document.querySelectorAll('.nav-tab-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-tab') === tabId);
    });
    document.querySelectorAll('.tab-pane').forEach(p => {
      p.classList.toggle('active', p.id === `tab-${tabId}`);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==========================================
  // Daily Quote & Stats
  // ==========================================
  initDailyAffirmation() {
    this.renderRandomAffirmation();
    const refreshBtn = document.getElementById('refresh-quote-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        this.renderRandomAffirmation();
      });
    }
  }

  renderRandomAffirmation() {
    const quoteEl = document.getElementById('daily-quote-text');
    if (quoteEl) {
      const randomIndex = Math.floor(Math.random() * DAILY_AFFIRMATIONS.length);
      quoteEl.textContent = DAILY_AFFIRMATIONS[randomIndex];
    }
  }

  updateStats() {
    const docs = StorageManager.getDocuments();
    const folders = StorageManager.getFolders();

    const statDocsEl = document.getElementById('stat-docs-count');
    if (statDocsEl) statDocsEl.textContent = docs.length;

    const statSubjectsEl = document.getElementById('stat-subjects-count');
    if (statSubjectsEl) statSubjectsEl.textContent = folders.length;

    const statPomoEl = document.getElementById('stat-pomo-count');
    if (statPomoEl) statPomoEl.textContent = this.pomoCompletedCount;
  }

  // ==========================================
  // Study Activity Heatmap Controller
  // ==========================================
  initHeatmap() {
    StudyHeatmap.renderHeatmap('study-heatmap-container', 'heatmap-stats-group');

    const checkinBtn = document.getElementById('btn-checkin-today');
    if (checkinBtn) {
      checkinBtn.addEventListener('click', () => {
        StudyHeatmap.recordTodayActivity('checkin', 1);
        StudyHeatmap.renderHeatmap('study-heatmap-container', 'heatmap-stats-group');
        this.showToast('🎉 Check-in thành công! Chuỗi ngày chăm chỉ của Rita lại tăng thêm! 🔥✨');
      });
    }
  }

  // ==========================================
  // Folders / Subjects Management
  // ==========================================
  initFolders() {
    this.renderFolders();

    // Create folder trigger
    const createFolderBtn = document.getElementById('btn-create-folder');
    if (createFolderBtn) {
      createFolderBtn.addEventListener('click', () => {
        this.openFolderModal();
      });
    }

    // Active folder banner triggers
    const backBtn = document.getElementById('btn-back-all-folders');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.activeFolderId = null;
        this.updateActiveFolderBanner();
        this.renderFolders();
        this.renderDocuments();
      });
    }

    const addDocToFolderBtn = document.getElementById('btn-add-doc-to-folder');
    if (addDocToFolderBtn) {
      addDocToFolderBtn.addEventListener('click', () => {
        this.openAddDocumentModal(null, this.activeFolderId);
      });
    }

    // Form folder submit
    const folderForm = document.getElementById('folder-form');
    if (folderForm) {
      folderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSaveFolder();
      });
    }
  }

  renderFolders() {
    const grid = document.getElementById('folder-grid');
    if (!grid) return;

    const folders = StorageManager.getFolders();
    const docs = StorageManager.getDocuments();

    grid.innerHTML = folders.map(folder => {
      const count = docs.filter(d => d.folderId === folder.id).length;
      const isActive = this.activeFolderId === folder.id;

      return `
        <div class="folder-card ${isActive ? 'active-folder' : ''}" data-id="${folder.id}">
          <div class="folder-card-top">
            <span class="folder-icon-large">${folder.icon || '📁'}</span>
            <div class="folder-card-actions">
              <button class="folder-action-btn btn-edit-folder" data-id="${folder.id}" title="Chỉnh sửa môn học">✏️</button>
              <button class="folder-action-btn btn-delete-folder" data-id="${folder.id}" title="Xóa môn học">🗑️</button>
            </div>
          </div>
          <div class="folder-card-name">${folder.name}</div>
          <div class="folder-card-desc">${folder.description || 'Chưa có mô tả môn học.'}</div>
          <div class="folder-card-footer">
            <span>${count} tài liệu</span>
            <span>Mở xem ➔</span>
          </div>
        </div>
      `;
    }).join('');

    // Attach folder click listeners
    grid.querySelectorAll('.folder-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.folder-card-actions')) return;
        const id = card.getAttribute('data-id');
        this.activeFolderId = id;
        this.updateActiveFolderBanner();
        this.renderFolders();
        this.renderDocuments();
      });
    });

    grid.querySelectorAll('.btn-edit-folder').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        this.openFolderModal(id);
      });
    });

    grid.querySelectorAll('.btn-delete-folder').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const folder = StorageManager.getFolders().find(f => f.id === id);
        if (!folder) return;

        if (confirm(`Bạn có chắc muốn xóa môn học "${folder.name}" và toàn bộ tài liệu bên trong?`)) {
          StorageManager.deleteFolder(id);
          if (this.activeFolderId === id) {
            this.activeFolderId = null;
          }
          this.updateActiveFolderBanner();
          this.renderFolders();
          this.renderDocuments();
          this.updateStats();
          this.showToast(`Đã xóa môn học "${folder.name}"`);
        }
      });
    });

    this.updateStats();
  }

  updateActiveFolderBanner() {
    const banner = document.getElementById('active-folder-banner');
    if (!banner) return;

    if (!this.activeFolderId) {
      banner.style.display = 'none';
      return;
    }

    const folder = StorageManager.getFolders().find(f => f.id === this.activeFolderId);
    if (!folder) {
      this.activeFolderId = null;
      banner.style.display = 'none';
      return;
    }

    document.getElementById('banner-folder-icon').textContent = folder.icon || '📁';
    document.getElementById('banner-folder-title').textContent = folder.name;
    document.getElementById('banner-folder-desc').textContent = folder.description || 'Thư mục tài liệu môn học chuyên ngành';
    banner.style.display = 'flex';
  }

  openFolderModal(folderId = null) {
    this.editingFolderId = folderId;
    const modalTitle = document.getElementById('modal-folder-title');
    const form = document.getElementById('folder-form');
    form.reset();

    if (folderId) {
      modalTitle.textContent = "Chỉnh Sửa Môn Học";
      const folder = StorageManager.getFolders().find(f => f.id === folderId);
      if (folder) {
        document.getElementById('input-folder-name').value = folder.name || '';
        document.getElementById('input-folder-icon').value = folder.icon || '📁';
        document.getElementById('input-folder-color').value = folder.color || 'yellow';
        document.getElementById('input-folder-desc').value = folder.description || '';
      }
    } else {
      modalTitle.textContent = "Tạo Môn Học Mới";
    }

    this.openModal('modal-folder');
  }

  handleSaveFolder() {
    const name = document.getElementById('input-folder-name').value.trim();
    if (!name) return;

    const icon = document.getElementById('input-folder-icon').value;
    const color = document.getElementById('input-folder-color').value;
    const description = document.getElementById('input-folder-desc').value.trim();

    if (this.editingFolderId) {
      StorageManager.updateFolder(this.editingFolderId, { name, icon, color, description });
      this.showToast(`Đã cập nhật môn "${name}"! 📁`);
    } else {
      const newFolder = StorageManager.addFolder({ name, icon, color, description });
      this.activeFolderId = newFolder.id;
      this.showToast(`Đã tạo môn học "${name}" thành công! 🌸`);
    }

    this.closeAllModals();
    this.updateActiveFolderBanner();
    this.renderFolders();
    this.renderDocuments();
  }

  // ==========================================
  // Documents Hub Controller
  // ==========================================
  initDocumentsHub() {
    this.renderDocuments();

    // Format filter
    const formatSelect = document.getElementById('doc-format-select');
    if (formatSelect) {
      formatSelect.addEventListener('change', (e) => {
        this.activeFormat = e.target.value;
        this.renderDocuments();
      });
    }

    // Search bar
    const searchInput = document.getElementById('doc-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.renderDocuments();
      });
    }

    // Top navbar search bar (syncs with main)
    const navSearchInput = document.getElementById('nav-search-input');
    if (navSearchInput) {
      navSearchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        if (searchInput) searchInput.value = this.searchQuery;
        if (this.activeTab !== 'docs') this.switchTab('docs');
        this.renderDocuments();
      });
    }

    // Favorites toggle button
    const favToggleBtn = document.getElementById('filter-fav-btn');
    if (favToggleBtn) {
      favToggleBtn.addEventListener('click', () => {
        this.onlyFavorites = !this.onlyFavorites;
        favToggleBtn.classList.toggle('active', this.onlyFavorites);
        this.renderDocuments();
      });
    }

    // Add Document button in navbar
    const addDocBtn = document.getElementById('btn-add-doc');
    if (addDocBtn) {
      addDocBtn.addEventListener('click', () => {
        this.openAddDocumentModal(null, this.activeFolderId);
      });
    }
  }

  renderDocuments() {
    const grid = document.getElementById('doc-grid');
    if (!grid) return;

    let docs = StorageManager.getDocuments();
    const folders = StorageManager.getFolders();

    // 1. Filter by Active Folder
    if (this.activeFolderId) {
      docs = docs.filter(d => d.folderId === this.activeFolderId);
    }

    // 2. Filter by Format
    if (this.activeFormat !== 'all') {
      docs = docs.filter(d => d.format === this.activeFormat);
    }

    // 3. Filter Favorites
    if (this.onlyFavorites) {
      docs = docs.filter(d => d.favorite);
    }

    // 4. Search Query
    if (this.searchQuery) {
      docs = docs.filter(d => {
        const text = `${d.title} ${d.summary || ''} ${d.examTips || ''} ${(d.tags || []).join(' ')} ${d.author || ''}`.toLowerCase();
        return text.includes(this.searchQuery);
      });
    }

    // Empty State Handling
    if (docs.length === 0) {
      const activeFolder = folders.find(f => f.id === this.activeFolderId);
      const emptyTitle = activeFolder
        ? `Môn "${activeFolder.name}" hiện chưa có tài liệu`
        : `Kho tài liệu của Rita đang trống`;
      const emptyDesc = activeFolder
        ? `Hãy bấm nút bên dưới để thêm bài giảng, đề thi, tóm tắt hoặc ghi chú đầu tiên vào môn ${activeFolder.name} nhé!`
        : `Bạn có thể bấm vào một môn học ở trên hoặc tạo môn học mới, sau đó thêm tài liệu học tập vào nhé! ✨`;

      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">☕📖</div>
          <h3 class="empty-state-title">${emptyTitle}</h3>
          <p class="empty-state-desc">${emptyDesc}</p>
          <button class="btn-primary" id="btn-empty-add-doc">
            ✨ + Thêm tài liệu hoặc tóm tắt mới
          </button>
        </div>
      `;
      const emptyAddBtn = document.getElementById('btn-empty-add-doc');
      if (emptyAddBtn) {
        emptyAddBtn.addEventListener('click', () => this.openAddDocumentModal(null, this.activeFolderId));
      }
      return;
    }

    grid.innerHTML = docs.map(doc => {
      const formatIcons = {
        summary: '📝',
        excel: '📊',
        slide: '📑',
        exam: '🎯',
        link: '🔗'
      };
      const fIcon = formatIcons[doc.format] || '📄';
      const folder = folders.find(f => f.id === doc.folderId) || { name: doc.folderName || 'Tài liệu', icon: '📁' };
      const tagsHtml = (doc.tags || []).map(t => `<span class="doc-tag">#${t}</span>`).join('');

      return `
        <article class="doc-card" data-id="${doc.id}">
          <div class="doc-card-header">
            <div class="doc-badge-group">
              <span class="badge badge-yellow">${fIcon} ${doc.formatName || doc.format}</span>
              <span class="badge badge-brown">${folder.icon} ${folder.name}</span>
            </div>
            <button class="fav-btn ${doc.favorite ? 'favorited' : ''}" data-id="${doc.id}" title="${doc.favorite ? 'Bỏ yêu thích' : 'Đánh dấu yêu thích'}">
              ${doc.favorite ? '❤️' : '🤍'}
            </button>
          </div>

          <h3 class="doc-card-title">${doc.title}</h3>
          
          <!-- Summary Section Preview -->
          <div class="doc-card-summary">
            ${doc.summary ? doc.summary : '<em style="color:var(--text-muted);">Chưa có tóm tắt. Nhấn vào xem chi tiết để ghi tóm tắt...</em>'}
          </div>

          <!-- Study Notes / Exam Tips Preview -->
          ${doc.examTips ? `
            <div class="doc-exam-tip">
              <strong>💡 Ghi chú ôn thi:</strong> ${doc.examTips}
            </div>
          ` : ''}

          <div class="doc-tag-list">
            ${tagsHtml}
          </div>

          <div class="doc-card-footer">
            <div class="doc-meta-info">
              <span>${doc.semester || 'Kỳ học'}</span> · <span>${doc.dateAdded || 'Mới thêm'}</span>
            </div>
            <div class="doc-card-actions">
              <button class="action-btn-sm btn-doc-preview" data-id="${doc.id}">
                👁️ Xem & Ghi chú
              </button>
              ${doc.url && doc.url !== '#' ? `
                <a href="${doc.url}" target="_blank" class="action-btn-sm action-btn-primary" style="text-decoration:none;">
                  🔗 Mở tệp
                </a>
              ` : `
                <button class="action-btn-sm action-btn-primary btn-doc-preview" data-id="${doc.id}">
                  📖 Chi tiết
                </button>
              `}
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach listeners
    grid.querySelectorAll('.fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const isFav = StorageManager.toggleFavorite(id);
        btn.classList.toggle('favorited', isFav);
        btn.innerHTML = isFav ? '❤️' : '🤍';
        this.showToast(isFav ? 'Đã thêm vào mục Yêu thích! 💖' : 'Đã bỏ khỏi mục Yêu thích');
        if (this.onlyFavorites) this.renderDocuments();
      });
    });

    grid.querySelectorAll('.btn-doc-preview').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        this.openPreviewModal(id);
      });
    });

    this.updateStats();
  }

  // ==========================================
  // Add / Edit Document Modal
  // ==========================================
  populateFolderSelect(selectedFolderId = null) {
    const select = document.getElementById('input-doc-folder');
    if (!select) return;

    const folders = StorageManager.getFolders();
    if (folders.length === 0) {
      select.innerHTML = '<option value="">(Chưa có môn học - Vui lòng tạo môn trước)</option>';
      return;
    }

    select.innerHTML = folders.map(f => `
      <option value="${f.id}" ${f.id === selectedFolderId ? 'selected' : ''}>
        ${f.icon || '📁'} ${f.name}
      </option>
    `).join('');
  }

  openAddDocumentModal(docId = null, preselectFolderId = null) {
    this.editingDocId = docId;
    const modalTitle = document.getElementById('modal-doc-title');
    const form = document.getElementById('doc-form');
    form.reset();

    const folders = StorageManager.getFolders();
    if (folders.length === 0) {
      alert('Bạn chưa có thư mục môn học nào. Hãy tạo một môn học trước nhé!');
      this.openFolderModal();
      return;
    }

    if (docId) {
      modalTitle.textContent = "Chỉnh Sửa Tài Liệu";
      const doc = StorageManager.getDocuments().find(d => d.id === docId);
      if (doc) {
        this.populateFolderSelect(doc.folderId);
        document.getElementById('input-doc-title').value = doc.title || '';
        document.getElementById('input-doc-format').value = doc.format || 'summary';
        document.getElementById('input-doc-semester').value = doc.semester || '';
        document.getElementById('input-doc-author').value = doc.author || '';
        document.getElementById('input-doc-url').value = doc.url || '';
        document.getElementById('input-doc-tags').value = (doc.tags || []).join(', ');
        document.getElementById('input-doc-summary').value = doc.summary || '';
        document.getElementById('input-doc-exam-tips').value = doc.examTips || '';
      }
    } else {
      modalTitle.textContent = "Thêm Tài Liệu Mới";
      this.populateFolderSelect(preselectFolderId || (folders[0] ? folders[0].id : null));
    }

    this.openModal('modal-add-doc');
  }

  handleSaveDocument() {
    const title = document.getElementById('input-doc-title').value.trim();
    if (!title) return;

    const folderSelect = document.getElementById('input-doc-folder');
    const formatSelect = document.getElementById('input-doc-format');

    const folderId = folderSelect.value;
    const folderName = folderSelect.options[folderSelect.selectedIndex]?.text || 'Môn học';

    const format = formatSelect.value;
    const formatName = formatSelect.options[formatSelect.selectedIndex].text;

    const semester = document.getElementById('input-doc-semester').value.trim() || 'Học kỳ này';
    const author = document.getElementById('input-doc-author').value.trim() || 'Rita Hub';
    const url = document.getElementById('input-doc-url').value.trim() || '#';
    const tagsRaw = document.getElementById('input-doc-tags').value.trim();
    const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];
    const summary = document.getElementById('input-doc-summary').value.trim();
    const examTips = document.getElementById('input-doc-exam-tips').value.trim();

    if (this.editingDocId) {
      StorageManager.updateDocument(this.editingDocId, {
        title,
        folderId,
        folderName,
        format,
        formatName,
        semester,
        author,
        url,
        tags,
        summary,
        examTips
      });
      this.showToast('Đã cập nhật tài liệu thành công! 📝');
    } else {
      StorageManager.addDocument({
        title,
        folderId,
        folderName,
        format,
        formatName,
        semester,
        author,
        url,
        tags,
        summary,
        examTips
      });
      this.showToast('Đã lưu tài liệu mới vào môn học! 🌸');
      StudyHeatmap.recordTodayActivity('notes', 1);
      StudyHeatmap.renderHeatmap('study-heatmap-container', 'heatmap-stats-group');
    }

    this.closeAllModals();
    this.renderFolders();
    this.renderDocuments();
  }

  // ==========================================
  // Document Preview Modal with In-Place Note-Taking
  // ==========================================
  openPreviewModal(docId) {
    const doc = StorageManager.getDocuments().find(d => d.id === docId);
    if (!doc) return;

    const body = document.getElementById('preview-modal-body');
    const folders = StorageManager.getFolders();
    const folder = folders.find(f => f.id === doc.folderId) || { name: doc.folderName || 'Môn học', icon: '📁' };
    const tagsHtml = (doc.tags || []).map(t => `<span class="badge badge-yellow">#${t}</span>`).join(' ');

    body.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:1rem;">
        <div>
          <span class="badge badge-brown">${folder.icon} ${folder.name}</span>
          <span class="badge badge-yellow">${doc.formatName || doc.format}</span>
        </div>
        <div style="font-size:0.85rem; color:var(--text-muted);">
          ${doc.dateAdded ? 'Thêm ngày ' + doc.dateAdded : ''}
        </div>
      </div>

      <h2 style="font-family:var(--font-serif); font-size:1.45rem; color:var(--brown-900); margin:0.6rem 0;">
        ${doc.title}
      </h2>

      <div style="font-size:0.88rem; color:var(--text-secondary); display:flex; gap:1.2rem; flex-wrap:wrap;">
        <span><strong>Tác giả / Giảng viên:</strong> ${doc.author || 'Chưa cập nhật'}</span>
        <span><strong>Học kỳ:</strong> ${doc.semester || 'Học kỳ này'}</span>
      </div>

      <!-- Tóm tắt tài liệu Section -->
      <div style="margin-top:0.8rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem;">
          <h4 style="font-size:0.95rem; color:var(--brown-800);">📖 Tóm tắt nội dung chính:</h4>
          <button class="btn-copy-sm" id="btn-copy-summary" title="Sao chép tóm tắt">
            📋 Sao chép tóm tắt
          </button>
        </div>
        <div class="doc-summary-text" id="preview-summary-content" style="white-space:pre-line;">
          ${doc.summary ? doc.summary : '<span style="color:var(--text-muted); font-style:italic;">Chưa có tóm tắt. Nhấn nút "Sửa nhanh ghi chú" bên dưới để thêm tóm tắt cho tài liệu này.</span>'}
        </div>
      </div>

      <!-- Ghi chú học tập / Mẹo ôn thi Section -->
      <div style="margin-top:0.8rem;">
        <h4 style="font-size:0.95rem; margin-bottom:0.35rem; color:var(--yellow-900);">💡 Ghi chú ôn thi & Cạm bẫy cần nhớ:</h4>
        <div class="doc-notes-block" id="preview-notes-content" style="white-space:pre-line;">
          ${doc.examTips ? doc.examTips : '<span style="color:var(--text-muted); font-style:italic;">Chưa có ghi chú ôn thi.</span>'}
        </div>
      </div>

      <!-- Quick Inline Notes Editor (Hidden by default, toggleable) -->
      <div id="inline-notes-editor" style="display:none; background:var(--bg-secondary); border:1.5px dashed var(--yellow-500); padding:1rem; border-radius:var(--radius-md); margin-top:0.8rem;">
        <h4 style="font-size:0.9rem; margin-bottom:0.5rem; color:var(--brown-900);">✏️ Chỉnh sửa nhanh Tóm tắt & Ghi chú:</h4>
        <div style="display:flex; flex-direction:column; gap:0.6rem;">
          <div>
            <label style="font-size:0.8rem; font-weight:600;">Tóm tắt tài liệu:</label>
            <textarea id="inline-summary-input" class="form-control" rows="3" style="width:100%; resize:vertical;">${doc.summary || ''}</textarea>
          </div>
          <div>
            <label style="font-size:0.8rem; font-weight:600;">Ghi chú ôn thi & cạm bẫy:</label>
            <textarea id="inline-notes-input" class="form-control" rows="2" style="width:100%; resize:vertical;">${doc.examTips || ''}</textarea>
          </div>
          <div style="display:flex; justify-content:flex-end; gap:0.5rem; margin-top:0.3rem;">
            <button class="btn-outline" id="btn-cancel-inline" style="font-size:0.8rem; padding:0.35rem 0.8rem;">Hủy</button>
            <button class="btn-primary" id="btn-save-inline" style="font-size:0.8rem; padding:0.35rem 0.8rem;">💾 Lưu ghi chú</button>
          </div>
        </div>
      </div>

      <div style="margin-top:0.8rem;">
        <h4 style="font-size:0.9rem; margin-bottom:0.35rem; color:var(--brown-800);">🏷️ Từ khóa:</h4>
        <div style="display:flex; flex-wrap:wrap; gap:0.4rem;">
          ${tagsHtml || '<span style="color:var(--text-muted); font-size:0.85rem;">Không có thẻ</span>'}
        </div>
      </div>

      <div style="display:flex; gap:0.75rem; justify-content:space-between; align-items:center; margin-top:1.5rem; padding-top:1rem; border-top:1px solid var(--border-subtle); flex-wrap:wrap;">
        <div style="display:flex; gap:0.5rem;">
          <button class="btn-outline" id="btn-toggle-inline-edit" style="font-size:0.85rem;">
            ✏️ Viết thêm ghi chú / Tóm tắt
          </button>
          <button class="btn-outline btn-edit-current-doc" data-id="${doc.id}" style="font-size:0.85rem;">
            ⚙️ Sửa toàn bộ
          </button>
        </div>
        
        <div style="display:flex; gap:0.5rem;">
          <button class="btn-outline" style="color:#C0392B; border-color:rgba(192,57,43,0.3); font-size:0.85rem;" id="btn-delete-current-doc" data-id="${doc.id}">
            🗑️ Xóa
          </button>
          ${doc.url && doc.url !== '#' ? `
            <a href="${doc.url}" target="_blank" class="btn-primary" style="text-decoration:none; font-size:0.85rem;">
              🚀 Mở tệp / Liên kết
            </a>
          ` : ''}
        </div>
      </div>
    `;

    // Copy Summary button
    const copyBtn = body.querySelector('#btn-copy-summary');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        if (!doc.summary) {
          this.showToast('Tài liệu chưa có tóm tắt để sao chép');
          return;
        }
        navigator.clipboard.writeText(doc.summary).then(() => {
          this.showToast('Đã sao chép tóm tắt vào clipboard! 📋✨');
        }).catch(() => {
          this.showToast('Không thể tự động sao chép');
        });
      });
    }

    // Toggle inline editor
    const inlineEditor = body.querySelector('#inline-notes-editor');
    const toggleInlineBtn = body.querySelector('#btn-toggle-inline-edit');
    const cancelInlineBtn = body.querySelector('#btn-cancel-inline');
    const saveInlineBtn = body.querySelector('#btn-save-inline');

    if (toggleInlineBtn && inlineEditor) {
      toggleInlineBtn.addEventListener('click', () => {
        const isShown = inlineEditor.style.display !== 'none';
        inlineEditor.style.display = isShown ? 'none' : 'block';
        if (!isShown) {
          inlineEditor.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    }

    if (cancelInlineBtn) {
      cancelInlineBtn.addEventListener('click', () => {
        inlineEditor.style.display = 'none';
      });
    }

    if (saveInlineBtn) {
      saveInlineBtn.addEventListener('click', () => {
        const newSummary = body.querySelector('#inline-summary-input').value.trim();
        const newTips = body.querySelector('#inline-notes-input').value.trim();

        StorageManager.updateSummaryAndNotes(doc.id, newSummary, newTips);
        doc.summary = newSummary;
        doc.examTips = newTips;

        body.querySelector('#preview-summary-content').textContent = newSummary || 'Chưa có tóm tắt.';
        body.querySelector('#preview-notes-content').textContent = newTips || 'Chưa có ghi chú ôn thi.';
        inlineEditor.style.display = 'none';

        this.renderDocuments();
        this.showToast('Đã lưu ghi chú & tóm tắt thành công! 🌸');
      });
    }

    body.querySelector('.btn-edit-current-doc').addEventListener('click', () => {
      this.closeAllModals();
      this.openAddDocumentModal(doc.id);
    });

    body.querySelector('#btn-delete-current-doc').addEventListener('click', () => {
      if (confirm(`Bạn có chắc muốn xóa tài liệu "${doc.title}" khỏi môn học?`)) {
        StorageManager.deleteDocument(doc.id);
        this.closeAllModals();
        this.renderFolders();
        this.renderDocuments();
        this.showToast('Đã xóa tài liệu khỏi danh sách');
      }
    });

    this.openModal('modal-preview-doc');
  }

  // ==========================================
  // Pomodoro Controller
  // ==========================================
  initPomodoro() {
    this.updatePomodoroDisplay();

    // Mode switches
    const modeBtns = document.querySelectorAll('.pomo-mode-btn');
    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.pomoMode = btn.getAttribute('data-mode');
        this.resetPomodoro();
      });
    });

    const toggleBtn = document.getElementById('btn-pomo-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        if (this.pomoIsRunning) {
          this.pausePomodoro();
        } else {
          this.startPomodoro();
        }
      });
    }

    const resetBtn = document.getElementById('btn-pomo-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.resetPomodoro();
      });
    }
  }

  startPomodoro() {
    this.pomoIsRunning = true;
    const toggleBtn = document.getElementById('btn-pomo-toggle');
    if (toggleBtn) {
      toggleBtn.textContent = 'Tạm dừng ⏸️';
      toggleBtn.style.background = 'linear-gradient(135deg, var(--brown-700), var(--brown-600))';
      toggleBtn.style.color = '#FFF';
    }

    this.pomoTimerInterval = setInterval(() => {
      if (this.pomoTimeRemaining > 0) {
        this.pomoTimeRemaining--;
        this.updatePomodoroDisplay();
      } else {
        this.handlePomodoroComplete();
      }
    }, 1000);
  }

  pausePomodoro() {
    this.pomoIsRunning = false;
    clearInterval(this.pomoTimerInterval);
    const toggleBtn = document.getElementById('btn-pomo-toggle');
    if (toggleBtn) {
      toggleBtn.textContent = 'Tiếp tục ▶️';
      toggleBtn.style.background = 'linear-gradient(135deg, var(--yellow-500), var(--yellow-600))';
      toggleBtn.style.color = '#2F1B05';
    }
  }

  resetPomodoro() {
    this.pausePomodoro();
    this.pomoTimeRemaining = this.pomoDurations[this.pomoMode];
    this.updatePomodoroDisplay();
    const toggleBtn = document.getElementById('btn-pomo-toggle');
    if (toggleBtn) {
      toggleBtn.textContent = 'Bắt đầu ▶️';
      toggleBtn.style.background = 'linear-gradient(135deg, var(--yellow-500), var(--yellow-600))';
      toggleBtn.style.color = '#2F1B05';
    }
  }

  handlePomodoroComplete() {
    this.pausePomodoro();
    soundEngine.playPomodoroChime(this.pomoMode !== 'focus');

    if (this.pomoMode === 'focus') {
      this.pomoCompletedCount++;
      localStorage.setItem('rita_pomo_count', this.pomoCompletedCount);
      this.updateStats();
      this.showToast('🎉 Hoàn thành phiên học 25 phút! Tuyệt vời lắm Rita!');
      StudyHeatmap.recordTodayActivity('pomo', 1);
      StudyHeatmap.renderHeatmap('study-heatmap-container', 'heatmap-stats-group');
      this.pomoMode = 'shortBreak';
      document.querySelectorAll('.pomo-mode-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-mode') === 'shortBreak');
      });
      this.resetPomodoro();
    } else {
      this.showToast('☕ Hết giờ giải lao! Sẵn sàng cho phiên học tiếp theo nhé!');
      this.pomoMode = 'focus';
      document.querySelectorAll('.pomo-mode-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-mode') === 'focus');
      });
      this.resetPomodoro();
    }
  }

  updatePomodoroDisplay() {
    const minutes = Math.floor(this.pomoTimeRemaining / 60);
    const seconds = this.pomoTimeRemaining % 60;
    const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    const digitsEl = document.getElementById('timer-digits');
    if (digitsEl) digitsEl.textContent = timeStr;

    const totalDuration = this.pomoDurations[this.pomoMode];
    const progress = (totalDuration - this.pomoTimeRemaining) / totalDuration;
    const offset = 691 - (progress * 691);

    const circle = document.getElementById('timer-progress-circle');
    if (circle) {
      circle.style.strokeDashoffset = offset;
    }

    if (this.pomoIsRunning) {
      document.title = `(${timeStr}) Rita's Lounge · ${this.pomoMode === 'focus' ? 'Đang học tập' : 'Giải lao'}`;
    } else {
      document.title = "Rita's Study Lounge | Góc Học Tập & Lưu Trữ Tài Liệu Kiểm Toán Chill";
    }
  }

  // ==========================================
  // Ambient Audio Controller
  // ==========================================
  initAmbientAudio() {
    const tracks = ['rain', 'cafe', 'typing', 'books'];

    tracks.forEach(trackKey => {
      const row = document.getElementById(`track-row-${trackKey}`);
      const btn = document.getElementById(`track-btn-${trackKey}`);
      const slider = document.getElementById(`track-vol-${trackKey}`);

      if (btn) {
        btn.addEventListener('click', () => {
          const isPlaying = soundEngine.tracks[trackKey].active;
          if (isPlaying) {
            this.stopAudioTrack(trackKey);
            btn.classList.remove('active');
            btn.textContent = '▶';
            if (row) row.classList.remove('playing');
          } else {
            this.startAudioTrack(trackKey);
            btn.classList.add('active');
            btn.textContent = '❚❚';
            if (row) row.classList.add('playing');
          }
        });
      }

      if (slider) {
        slider.addEventListener('input', (e) => {
          const val = parseFloat(e.target.value);
          soundEngine.setTrackVolume(trackKey, val);
        });
      }
    });

    // Master Audio Button in Top Navbar
    const masterAudioBtn = document.getElementById('nav-audio-btn');
    if (masterAudioBtn) {
      masterAudioBtn.addEventListener('click', () => {
        const isMuted = soundEngine.toggleMasterMute();
        masterAudioBtn.innerHTML = isMuted ? '🔇' : '🎵';
        masterAudioBtn.title = isMuted ? 'Bật âm thanh' : 'Tắt âm thanh';
        this.showToast(isMuted ? 'Đã tắt tiếng' : 'Đã bật lại âm thanh 🎶');
      });
    }
  }

  startAudioTrack(trackKey) {
    if (trackKey === 'rain') soundEngine.startRain();
    else if (trackKey === 'cafe') soundEngine.startCafe();
    else if (trackKey === 'typing') soundEngine.startTyping();
    else if (trackKey === 'books') soundEngine.startBooks();
  }

  stopAudioTrack(trackKey) {
    if (trackKey === 'rain') soundEngine.stopRain();
    else if (trackKey === 'cafe') soundEngine.stopCafe();
    else if (trackKey === 'typing') soundEngine.stopTyping();
    else if (trackKey === 'books') soundEngine.stopBooks();
  }

  // ==========================================
  // Auditor's Materiality Calculator
  // ==========================================
  initCalculator() {
    const calcBtn = document.getElementById('btn-calc-materiality');
    const benchmarkSelect = document.getElementById('calc-benchmark');
    const baseInput = document.getElementById('calc-base-amount');
    const pctInput = document.getElementById('calc-pct');
    const riskSelect = document.getElementById('calc-risk');

    const updateCalc = () => {
      const benchmarkKey = benchmarkSelect.value;
      const baseAmount = parseFloat(baseInput.value) || 0;
      const customPct = parseFloat(pctInput.value) || 0;
      const riskLevel = riskSelect.value;

      const result = MaterialityCalculator.calculate({
        benchmarkKey,
        baseAmount,
        customPct,
        riskLevel
      });

      const omEl = document.getElementById('res-om-amount');
      const pmEl = document.getElementById('res-pm-amount');
      const trivialEl = document.getElementById('res-trivial-amount');
      const noteEl = document.getElementById('res-note-text');

      if (omEl) omEl.textContent = MaterialityCalculator.formatVND(result.om);
      if (pmEl) pmEl.textContent = MaterialityCalculator.formatVND(result.pm);
      if (trivialEl) trivialEl.textContent = MaterialityCalculator.formatVND(result.trivial);
      if (noteEl) noteEl.textContent = `${result.suitableNote} (Tỷ lệ PM: ${result.pmRatioPercent}%)`;
    };

    if (benchmarkSelect) {
      benchmarkSelect.addEventListener('change', () => {
        const key = benchmarkSelect.value;
        const bm = MaterialityCalculator.BENCHMARKS[key];
        if (bm && pctInput) {
          pctInput.value = bm.defaultPct;
          document.getElementById('calc-pct-range-hint').textContent = `Khuyến nghị: ${bm.recommendedMin}% - ${bm.recommendedMax}%`;
        }
        updateCalc();
      });
    }

    if (baseInput) baseInput.addEventListener('input', updateCalc);
    if (pctInput) pctInput.addEventListener('input', updateCalc);
    if (riskSelect) riskSelect.addEventListener('change', updateCalc);
    if (calcBtn) calcBtn.addEventListener('click', updateCalc);

    updateCalc();
  }

  // ==========================================
  // Audit 3-Phase Interactive Checklist
  // ==========================================
  initChecklist() {
    this.renderChecklist();
  }

  renderChecklist() {
    const container = document.getElementById('checklist-phases-grid');
    if (!container) return;

    const phases = StorageManager.getChecklist();
    container.innerHTML = phases.map((phase, pIdx) => {
      const itemsHtml = phase.items.map(item => `
        <label class="check-item-label ${item.checked ? 'checked' : ''}">
          <input type="checkbox" class="check-item-input" data-phase="${pIdx}" data-id="${item.id}" ${item.checked ? 'checked' : ''}>
          <span>${item.text}</span>
        </label>
      `).join('');

      const completedCount = phase.items.filter(i => i.checked).length;
      const totalCount = phase.items.length;
      const pct = Math.round((completedCount / totalCount) * 100);

      return `
        <div class="phase-column">
          <div class="phase-title">
            <span>${phase.icon}</span>
            <div style="flex:1;">
              <div>${phase.phase}</div>
              <div style="font-size:0.75rem; font-weight:normal; color:var(--text-muted); margin-top:2px;">
                Tiến độ: ${completedCount}/${totalCount} (${pct}%)
              </div>
            </div>
          </div>
          <div class="checklist-items">
            ${itemsHtml}
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.check-item-input').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const pIdx = parseInt(checkbox.getAttribute('data-phase'), 10);
        const itemId = checkbox.getAttribute('data-id');
        StorageManager.toggleChecklistItem(pIdx, itemId);
        this.renderChecklist();
      });
    });
  }

  // ==========================================
  // Audit Dictionary
  // ==========================================
  initDictionary() {
    const grid = document.getElementById('dict-grid');
    const searchInput = document.getElementById('dict-search-input');

    const render = (query = '') => {
      if (!grid) return;
      let terms = AUDIT_DICTIONARY;
      if (query) {
        const q = query.toLowerCase();
        terms = terms.filter(t => t.term.toLowerCase().includes(q) || t.vi.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q));
      }

      grid.innerHTML = terms.map(t => `
        <div class="dict-item">
          <div class="dict-term">${t.term}</div>
          <div class="dict-vi">${t.vi}</div>
          <div class="dict-desc">${t.desc}</div>
        </div>
      `).join('');
    };

    render();

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        render(e.target.value.trim());
      });
    }
  }

  // ==========================================
  // Study Corner (Notes & Deadlines)
  // ==========================================
  initStudyCorner() {
    this.renderStickyNotes();
    this.renderCountdowns();

    const addNoteBtn = document.getElementById('btn-add-sticky');
    if (addNoteBtn) {
      addNoteBtn.addEventListener('click', () => {
        this.openAddNoteModal();
      });
    }
  }

  renderStickyNotes() {
    const grid = document.getElementById('notes-grid');
    if (!grid) return;

    const notes = StorageManager.getStickyNotes();
    if (notes.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align:center; padding: 2rem; color: var(--text-muted);">
          Chưa có ghi chú nào. Hãy dán một tờ giấy ghi nhớ xinh xắn nhé! ✨
        </div>
      `;
      return;
    }

    grid.innerHTML = notes.map(n => `
      <div class="sticky-note sticky-${n.color || 'yellow'}" data-id="${n.id}">
        <button class="sticky-delete-btn" data-id="${n.id}" title="Xóa ghi chú">✕</button>
        <div class="sticky-title">${n.title}</div>
        <div class="sticky-content">${n.content}</div>
        <div class="sticky-date">${n.date || ''}</div>
      </div>
    `).join('');

    grid.querySelectorAll('.sticky-delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        StorageManager.deleteStickyNote(id);
        this.renderStickyNotes();
        this.showToast('Đã gỡ ghi chú');
      });
    });
  }

  renderCountdowns() {
    const container = document.getElementById('countdown-list');
    if (!container) return;

    const countdowns = StorageManager.getCountdowns();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    container.innerHTML = countdowns.map(cd => {
      const examDate = new Date(cd.date);
      const diffTime = examDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let badgeText = `${diffDays} ngày`;
      let alertStyle = '';
      if (diffDays < 0) {
        badgeText = 'Đã thi';
      } else if (diffDays === 0) {
        badgeText = 'Hôm nay!';
        alertStyle = 'color: #E74C3C;';
      } else if (diffDays <= 7) {
        alertStyle = 'color: #E67E22;';
      }

      return `
        <div class="countdown-item">
          <div>
            <div class="cd-subject">${cd.subject}</div>
            <div class="cd-meta">📅 Ngày: ${cd.date} · Phòng: ${cd.room || 'Chưa có'}</div>
            ${cd.note ? `<div style="font-size:0.75rem; color:var(--brown-600); margin-top:2px;">📌 ${cd.note}</div>` : ''}
          </div>
          <div class="cd-days-box">
            <span class="cd-days-number" style="${alertStyle}">${diffDays > 0 ? diffDays : 0}</span>
            <span class="cd-days-label">${diffDays >= 0 ? 'ngày nữa' : 'kết thúc'}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // ==========================================
  // Modals & General Forms
  // ==========================================
  initModals() {
    // Close modal triggers
    document.querySelectorAll('.modal-close-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        this.closeAllModals();
      });
    });

    // Close on backdrop click
    document.querySelectorAll('.modal-backdrop').forEach(bd => {
      bd.addEventListener('click', (e) => {
        if (e.target === bd) {
          this.closeAllModals();
        }
      });
    });

    // Form: Add/Edit Document
    const docForm = document.getElementById('doc-form');
    if (docForm) {
      docForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSaveDocument();
      });
    }

    // Form: Add Sticky Note
    const noteForm = document.getElementById('sticky-note-form');
    if (noteForm) {
      noteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSaveStickyNote();
      });
    }

    // Backup & Restore
    const exportBtn = document.getElementById('btn-export-backup');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        StorageManager.exportFullBackup();
        this.showToast('Đã tải xuống file sao lưu JSON thành công! 📦');
      });
    }

    const importInput = document.getElementById('import-file-input');
    if (importInput) {
      importInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          const res = StorageManager.importBackup(event.target.result);
          if (res.success) {
            this.showToast('Khôi phục dữ liệu thành công! 🌸');
            this.renderFolders();
            this.renderDocuments();
            this.renderChecklist();
            this.renderStickyNotes();
            this.renderCountdowns();
            this.closeAllModals();
          } else {
            alert('Lỗi định dạng file: ' + res.error);
          }
        };
        reader.readAsText(file);
      });
    }

    const openBackupModalBtn = document.getElementById('btn-open-backup-modal');
    if (openBackupModalBtn) {
      openBackupModalBtn.addEventListener('click', () => {
        this.openModal('modal-backup');
      });
    }
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('open');
    }
  }

  closeAllModals() {
    document.querySelectorAll('.modal-backdrop').forEach(bd => {
      bd.classList.remove('open');
    });
    this.editingDocId = null;
    this.editingFolderId = null;
  }

  openAddNoteModal() {
    const form = document.getElementById('sticky-note-form');
    form.reset();
    this.openModal('modal-add-sticky');
  }

  handleSaveStickyNote() {
    const title = document.getElementById('input-note-title').value.trim();
    const content = document.getElementById('input-note-content').value.trim();
    const color = document.querySelector('input[name="note-color"]:checked')?.value || 'yellow';

    if (!title && !content) return;

    StorageManager.addStickyNote({
      title: title || 'Ghi nhớ',
      content,
      color
    });

    this.closeAllModals();
    this.renderStickyNotes();
    this.showToast('Đã dán giấy ghi nhớ mới! 📌');
  }

  // ==========================================
  // Toast Helper
  // ==========================================
  showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>🌸</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }
}

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.ritaApp = new App();
});
