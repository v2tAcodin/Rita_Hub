// LocalStorage Manager with Dynamic Folder/Subject Management & Export/Import for Rita Hub
import { INITIAL_DOCUMENTS, INITIAL_FOLDERS, INITIAL_STICKY_NOTES, AUDIT_CHECKLIST_PHASES, EXAM_COUNTDOWNS } from './data.js';

const STORAGE_KEYS = {
  FOLDERS: 'rita_hub_folders_v2',
  DOCS: 'rita_hub_documents_v2',
  NOTES: 'rita_hub_sticky_notes',
  CHECKLIST: 'rita_hub_audit_checklist',
  COUNTDOWNS: 'rita_hub_exam_countdowns',
  SETTINGS: 'rita_hub_user_settings'
};

export class StorageManager {
  // ==========================================
  // Folders / Subjects Management
  // ==========================================
  static getFolders() {
    const raw = localStorage.getItem(STORAGE_KEYS.FOLDERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.FOLDERS, JSON.stringify(INITIAL_FOLDERS));
      return INITIAL_FOLDERS;
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error("Error parsing stored folders, resetting to defaults", e);
      return INITIAL_FOLDERS;
    }
  }

  static saveFolders(folders) {
    localStorage.setItem(STORAGE_KEYS.FOLDERS, JSON.stringify(folders));
  }

  static addFolder({ name, icon = '📁', color = 'yellow', description = '' }) {
    const folders = this.getFolders();
    const newFolder = {
      id: 'folder-' + Date.now(),
      name: name.trim(),
      icon: icon || '📁',
      color: color || 'yellow',
      description: description.trim()
    };
    folders.push(newFolder);
    this.saveFolders(folders);
    return newFolder;
  }

  static updateFolder(id, updatedFields) {
    const folders = this.getFolders();
    const index = folders.findIndex(f => f.id === id);
    if (index !== -1) {
      folders[index] = { ...folders[index], ...updatedFields };
      this.saveFolders(folders);
      return folders[index];
    }
    return null;
  }

  static deleteFolder(id) {
    let folders = this.getFolders();
    folders = folders.filter(f => f.id !== id);
    this.saveFolders(folders);

    // Also remove documents inside this deleted folder
    let docs = this.getDocuments();
    docs = docs.filter(d => d.folderId !== id);
    this.saveDocuments(docs);

    return folders;
  }

  // ==========================================
  // Documents Management (Initialized Empty)
  // ==========================================
  static getDocuments() {
    const raw = localStorage.getItem(STORAGE_KEYS.DOCS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.DOCS, JSON.stringify(INITIAL_DOCUMENTS));
      return INITIAL_DOCUMENTS;
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error("Error parsing stored documents", e);
      return [];
    }
  }

  static saveDocuments(docs) {
    localStorage.setItem(STORAGE_KEYS.DOCS, JSON.stringify(docs));
  }

  static addDocument(newDoc) {
    const docs = this.getDocuments();
    const docWithId = {
      ...newDoc,
      id: 'doc-' + Date.now(),
      dateAdded: new Date().toISOString().split('T')[0],
      favorite: false,
      rating: 5
    };
    docs.unshift(docWithId);
    this.saveDocuments(docs);
    return docWithId;
  }

  static updateDocument(id, updatedFields) {
    const docs = this.getDocuments();
    const index = docs.findIndex(d => d.id === id);
    if (index !== -1) {
      docs[index] = { ...docs[index], ...updatedFields };
      this.saveDocuments(docs);
      return docs[index];
    }
    return null;
  }

  static deleteDocument(id) {
    let docs = this.getDocuments();
    docs = docs.filter(d => d.id !== id);
    this.saveDocuments(docs);
    return docs;
  }

  static toggleFavorite(id) {
    const docs = this.getDocuments();
    const doc = docs.find(d => d.id === id);
    if (doc) {
      doc.favorite = !doc.favorite;
      this.saveDocuments(docs);
      return doc.favorite;
    }
    return false;
  }

  // Quick update only summary and notes
  static updateSummaryAndNotes(id, summary, examTips) {
    const docs = this.getDocuments();
    const doc = docs.find(d => d.id === id);
    if (doc) {
      doc.summary = summary;
      doc.examTips = examTips;
      this.saveDocuments(docs);
      return true;
    }
    return false;
  }

  // ==========================================
  // Sticky Notes
  // ==========================================
  static getStickyNotes() {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(INITIAL_STICKY_NOTES));
      return INITIAL_STICKY_NOTES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_STICKY_NOTES;
    }
  }

  static saveStickyNotes(notes) {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  }

  static addStickyNote(note) {
    const notes = this.getStickyNotes();
    const newNote = {
      ...note,
      id: 'note-' + Date.now(),
      date: new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
    };
    notes.unshift(newNote);
    this.saveStickyNotes(notes);
    return newNote;
  }

  static deleteStickyNote(id) {
    let notes = this.getStickyNotes();
    notes = notes.filter(n => n.id !== id);
    this.saveStickyNotes(notes);
    return notes;
  }

  // ==========================================
  // Checklist
  // ==========================================
  static getChecklist() {
    const raw = localStorage.getItem(STORAGE_KEYS.CHECKLIST);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CHECKLIST, JSON.stringify(AUDIT_CHECKLIST_PHASES));
      return AUDIT_CHECKLIST_PHASES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return AUDIT_CHECKLIST_PHASES;
    }
  }

  static saveChecklist(checklist) {
    localStorage.setItem(STORAGE_KEYS.CHECKLIST, JSON.stringify(checklist));
  }

  static toggleChecklistItem(phaseIndex, itemId) {
    const phases = this.getChecklist();
    if (phases[phaseIndex]) {
      const item = phases[phaseIndex].items.find(i => i.id === itemId);
      if (item) {
        item.checked = !item.checked;
        this.saveChecklist(phases);
        return item.checked;
      }
    }
    return false;
  }

  // ==========================================
  // Countdowns
  // ==========================================
  static getCountdowns() {
    const raw = localStorage.getItem(STORAGE_KEYS.COUNTDOWNS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.COUNTDOWNS, JSON.stringify(EXAM_COUNTDOWNS));
      return EXAM_COUNTDOWNS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return EXAM_COUNTDOWNS;
    }
  }

  static saveCountdowns(countdowns) {
    localStorage.setItem(STORAGE_KEYS.COUNTDOWNS, JSON.stringify(countdowns));
  }

  // ==========================================
  // Export and Import JSON
  // ==========================================
  static exportFullBackup() {
    const backupData = {
      version: "2.0",
      exportDate: new Date().toISOString(),
      user: "Rita",
      folders: this.getFolders(),
      documents: this.getDocuments(),
      notes: this.getStickyNotes(),
      checklist: this.getChecklist(),
      countdowns: this.getCountdowns()
    };
    const jsonStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Rita_Hub_Study_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  static importBackup(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.folders && Array.isArray(data.folders)) {
        this.saveFolders(data.folders);
      }
      if (data.documents && Array.isArray(data.documents)) {
        this.saveDocuments(data.documents);
      }
      if (data.notes && Array.isArray(data.notes)) {
        this.saveStickyNotes(data.notes);
      }
      if (data.checklist && Array.isArray(data.checklist)) {
        this.saveChecklist(data.checklist);
      }
      if (data.countdowns && Array.isArray(data.countdowns)) {
        this.saveCountdowns(data.countdowns);
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
}
