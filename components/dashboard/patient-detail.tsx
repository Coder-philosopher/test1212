"use client"

import { useState } from "react"
import ImageComparison from "@/components/features/image-comparison"
import AnalysisPanel from "@/components/features/analysis-panel"
import NotesPanel from "@/components/features/notes-panel"

interface Patient {
  id: string
  name: string
  age: number
  condition: string
  lastVisit: string
  images: string[]
}

interface PatientDetailProps {
  patient: Patient | null
  onBack: () => void
  onPatientUpdate?: () => void
}

export default function PatientDetail({ patient, onBack }: PatientDetailProps) {
  const [activeTab, setActiveTab] = useState<"comparison" | "analysis" | "notes">("comparison")
  const [showCameraModal, setShowCameraModal] = useState(false)

  if (!patient) {
    return (
      <div className="p-6">
        <button onClick={onBack} className="btn-outline mb-4">
          Back to Patients
        </button>
        <p className="text-muted-foreground">No patient selected</p>
      </div>
    )
  }

  return (
    <div className="p-6 pb-24 md:pb-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
        <button onClick={onBack} className="btn-outline">
          Back
        </button>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-foreground">{patient.name}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {patient.age} years old | {patient.condition}
          </p>
        </div>
        <button onClick={() => setShowCameraModal(true)} className="btn-primary">
          Capture Image
        </button>
      </div>

      {/* Tab Navigation - Removed emojis */}
      <div className="flex gap-2 mb-6 border-b border-border flex-wrap">
        {[
          { id: "comparison", label: "Image Comparison" },
          { id: "analysis", label: "AI Analysis" },
          { id: "notes", label: "Notes & Prescription" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 font-medium border-b-2 transition-all text-sm md:text-base ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {activeTab === "comparison" && <ImageComparison images={patient.images} />}
          {activeTab === "analysis" && <AnalysisPanel />}
          {activeTab === "notes" && (
            <NotesPanel
              patientId={patient.id}
              patientName={patient.name}
              patientAge={patient.age}
              condition={patient.condition}
            />
          )}
        </div>

        {/* Quick Actions Sidebar - Removed emojis */}
        <div className="bg-card border border-border p-6 h-fit shadow-sm">
          <h3 className="font-bold text-lg text-foreground mb-6">Clinical Actions</h3>
          <div className="space-y-3">
            <button className="w-full btn-secondary text-sm font-medium py-3">Generate Report</button>
            <button className="w-full btn-secondary text-sm font-medium py-3">Add Prescription</button>
            <button className="w-full btn-secondary text-sm font-medium py-3">Schedule Follow-up</button>
            <button className="w-full btn-outline text-sm font-medium py-3 text-destructive border-destructive">
              Delete Patient
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs font-medium text-muted-foreground mb-2">Last Visit</p>
            <p className="text-sm text-foreground">{new Date(patient.lastVisit).toLocaleDateString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Images on file: {patient.images.length}</p>
          </div>
        </div>
      </div>

      {/* Camera Modal Placeholder */}
      {showCameraModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card p-6 max-w-md w-full border border-border shadow-xl">
            <h3 className="text-xl font-bold text-foreground mb-4">Capture Image</h3>
            <div className="bg-muted h-64 mb-4 flex items-center justify-center">
              <p className="text-muted-foreground text-center">
                Camera capture would activate here with device permissions
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowCameraModal(false)} className="flex-1 btn-outline">
                Cancel
              </button>
              <button onClick={() => setShowCameraModal(false)} className="flex-1 btn-primary">
                Capture
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
