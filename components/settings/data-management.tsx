"use client"

import { useState } from "react"
import { dataSyncUtils } from "@/lib/data-sync"

export default function DataManagement() {
  const [backupCreated, setBackupCreated] = useState(false)
  const [storageInfo, setStorageInfo] = useState<{
    used: number
    quota: number
    percentage: number
  } | null>(null)

  const handleCreateBackup = () => {
    dataSyncUtils.createBackup()
    setBackupCreated(true)
    setTimeout(() => setBackupCreated(false), 2000)
  }

  const handleExportData = () => {
    const data = dataSyncUtils.exportDataAsJSON()
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `dermassist_backup_${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleCheckStorage = async () => {
    const info = await dataSyncUtils.getStorageInfo()
    setStorageInfo(info)
  }

  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear all application data? This action cannot be undone.")) {
      dataSyncUtils.clearAllData()
      window.location.reload()
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-lg border border-border p-4">
        <h3 className="font-semibold text-foreground mb-4">Data Management</h3>

        <div className="space-y-3">
          {/* Backup Section */}
          <button
            onClick={handleCreateBackup}
            className={`w-full text-left px-4 py-3 rounded-md border border-border transition-all ${
              backupCreated ? "bg-accent text-accent-foreground" : "hover:bg-muted"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{backupCreated ? "✓ Backup Created" : "Create Backup"}</span>
              <span className="text-sm text-muted-foreground">Automatic offline backup</span>
            </div>
          </button>

          {/* Export Data */}
          <button
            onClick={handleExportData}
            className="w-full text-left px-4 py-3 rounded-md border border-border hover:bg-muted transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">Export Data as JSON</span>
              <span className="text-sm text-muted-foreground">Download backup file</span>
            </div>
          </button>

          {/* Storage Info */}
          <button
            onClick={handleCheckStorage}
            className="w-full text-left px-4 py-3 rounded-md border border-border hover:bg-muted transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">Check Storage</span>
              <span className="text-sm text-muted-foreground">View usage</span>
            </div>
          </button>

          {storageInfo && (
            <div className="p-3 bg-muted rounded-md">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Storage Usage</span>
                <span className="font-medium">
                  {(storageInfo.used / 1024 / 1024).toFixed(1)} MB / {(storageInfo.quota / 1024 / 1024).toFixed(1)} MB
                </span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${storageInfo.percentage}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{storageInfo.percentage.toFixed(1)}% used</p>
            </div>
          )}

          {/* Clear Data */}
          <button
            onClick={handleClearData}
            className="w-full text-left px-4 py-3 rounded-md border border-destructive text-destructive hover:bg-destructive/10 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">Clear All Data</span>
              <span className="text-sm">Delete permanently</span>
            </div>
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-muted rounded-lg border border-border p-3">
        <p className="text-xs text-muted-foreground">
          All data is stored locally on your device for offline access. Regular backups are recommended to prevent data
          loss.
        </p>
      </div>
    </div>
  )
}
