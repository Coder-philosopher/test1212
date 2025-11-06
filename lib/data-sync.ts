/**
 * Data Sync Utility
 * Handles localStorage persistence, data versioning, and backup/restore functionality
 */

export interface DataBackup {
  version: string
  timestamp: string
  data: {
    patients: any[]
    notes: Record<string, string>
    prescriptions: Record<string, string>
  }
}

const DATA_SYNC_VERSION = "1.0.0"
const BACKUP_KEY = "derma_backup"
const VERSION_KEY = "derma_version"

export const dataSyncUtils = {
  // Initialize or migrate data
  initializeData: () => {
    const version = localStorage.getItem(VERSION_KEY)
    if (!version) {
      localStorage.setItem(VERSION_KEY, DATA_SYNC_VERSION)
    }
  },

  // Create a full backup of all patient data
  createBackup: (): DataBackup => {
    const patients = JSON.parse(localStorage.getItem("derma_patients") || "[]")
    const notes: Record<string, string> = {}
    const prescriptions: Record<string, string> = {}

    // Collect all notes and prescriptions
    for (const patient of patients) {
      const patientNotes = localStorage.getItem(`derma_notes_${patient.id}`)
      const patientPrescription = localStorage.getItem(`derma_prescription_${patient.id}`)
      if (patientNotes) notes[patient.id] = patientNotes
      if (patientPrescription) prescriptions[patient.id] = patientPrescription
    }

    const backup: DataBackup = {
      version: DATA_SYNC_VERSION,
      timestamp: new Date().toISOString(),
      data: {
        patients,
        notes,
        prescriptions,
      },
    }

    localStorage.setItem(BACKUP_KEY, JSON.stringify(backup))
    return backup
  },

  // Restore data from backup
  restoreFromBackup: (backup: DataBackup): boolean => {
    try {
      localStorage.setItem("derma_patients", JSON.stringify(backup.data.patients))

      for (const [patientId, notes] of Object.entries(backup.data.notes)) {
        localStorage.setItem(`derma_notes_${patientId}`, notes)
      }

      for (const [patientId, prescription] of Object.entries(backup.data.prescriptions)) {
        localStorage.setItem(`derma_prescription_${patientId}`, prescription)
      }

      return true
    } catch (error) {
      console.error("Failed to restore backup:", error)
      return false
    }
  },

  // Export data as JSON for download
  exportDataAsJSON: (): string => {
    const backup = dataSyncUtils.createBackup()
    return JSON.stringify(backup, null, 2)
  },

  // Get storage usage estimate
  getStorageInfo: async (): Promise<{ used: number; quota: number; percentage: number }> => {
    if (navigator.storage && navigator.storage.estimate) {
      const estimate = await navigator.storage.estimate()
      return {
        used: estimate.usage || 0,
        quota: estimate.quota || 0,
        percentage: ((estimate.usage || 0) / (estimate.quota || 1)) * 100,
      }
    }
    return { used: 0, quota: 0, percentage: 0 }
  },

  // Clear all application data
  clearAllData: () => {
    const keysToRemove = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith("derma_")) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key))
  },

  // Validate data integrity
  validateDataIntegrity: (): boolean => {
    try {
      const patients = JSON.parse(localStorage.getItem("derma_patients") || "[]")
      if (!Array.isArray(patients)) return false

      for (const patient of patients) {
        if (!patient.id || !patient.name) return false
      }

      return true
    } catch (error) {
      return false
    }
  },
}
