"use client"

import { useState, useEffect } from "react"
import PDFReportGenerator from "./pdf-report-generator"

interface NotesPanelProps {
  patientId: string
  patientName?: string
  patientAge?: number
  condition?: string
}

export default function NotesPanel({
  patientId,
  patientName = "Patient",
  patientAge = 0,
  condition = "General",
}: NotesPanelProps) {
  const [notes, setNotes] = useState("")
  const [prescription, setPrescription] = useState("")
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle")
  const [prescriptionStatus, setPrescriptionStatus] = useState<"idle" | "saved" | "error">("idle")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load notes and prescriptions from localStorage
    const saved = localStorage.getItem(`derma_notes_${patientId}`)
    const savedPrescription = localStorage.getItem(`derma_prescription_${patientId}`)

    if (saved) setNotes(saved)
    if (savedPrescription) setPrescription(savedPrescription)
    setIsLoading(false)
  }, [patientId])

  const handleSaveNotes = async () => {
    try {
      localStorage.setItem(`derma_notes_${patientId}`, notes)
      setSaveStatus("saved")
      setTimeout(() => setSaveStatus("idle"), 2000)
    } catch (error) {
      setSaveStatus("error")
      setTimeout(() => setSaveStatus("idle"), 2000)
    }
  }

  const handleSavePrescription = async () => {
    try {
      localStorage.setItem(`derma_prescription_${patientId}`, prescription)
      setPrescriptionStatus("saved")
      setTimeout(() => setPrescriptionStatus("idle"), 2000)
    } catch (error) {
      setPrescriptionStatus("error")
      setTimeout(() => setPrescriptionStatus("idle"), 2000)
    }
  }

  if (isLoading) {
    return <div className="text-center py-4 text-muted-foreground">Loading notes...</div>
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Clinical Notes */}
      <div className="bg-card border border-border p-6 shadow-sm">
        <h3 className="font-bold text-lg text-foreground mb-4">Clinical Notes</h3>
        <textarea
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value)
            setSaveStatus("idle")
          }}
          placeholder="Record clinical observations, assessment, and treatment plan..."
          className="w-full h-56 p-4 bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
        <button
          onClick={handleSaveNotes}
          className={`w-full mt-4 font-medium px-4 py-3 transition-all ${
            saveStatus === "saved"
              ? "bg-accent text-accent-foreground"
              : saveStatus === "error"
                ? "bg-destructive text-destructive-foreground"
                : "btn-primary"
          }`}
        >
          {saveStatus === "saved" ? "Saved Successfully" : saveStatus === "error" ? "Save Failed" : "Save Notes"}
        </button>
        {notes && <p className="text-xs text-muted-foreground mt-2">{notes.length} characters</p>}
      </div>

      {/* Prescription */}
      <div className="bg-card border border-border p-6 shadow-sm">
        <h3 className="font-bold text-lg text-foreground mb-4">Prescription</h3>
        <textarea
          value={prescription}
          onChange={(e) => {
            setPrescription(e.target.value)
            setPrescriptionStatus("idle")
          }}
          placeholder="Medication name, dosage, frequency, duration, and special instructions..."
          className="w-full h-56 p-4 bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
        <button
          onClick={handleSavePrescription}
          className={`w-full mt-4 font-medium px-4 py-3 transition-all ${
            prescriptionStatus === "saved"
              ? "bg-accent text-accent-foreground"
              : prescriptionStatus === "error"
                ? "bg-destructive text-destructive-foreground"
                : "btn-primary"
          }`}
        >
          {prescriptionStatus === "saved"
            ? "Saved Successfully"
            : prescriptionStatus === "error"
              ? "Save Failed"
              : "Save Prescription"}
        </button>
        {prescription && (
          <div className="mt-3 p-3 bg-muted">
            <p className="text-xs text-muted-foreground font-medium">Prescription Details:</p>
            <p className="text-xs text-foreground mt-1 whitespace-pre-wrap">{prescription}</p>
          </div>
        )}
      </div>

      {/* PDF Report Generator */}
      <div className="md:col-span-2">
        <PDFReportGenerator
          patientId={patientId}
          patientName={patientName}
          patientAge={patientAge}
          condition={condition}
          notes={notes}
          prescription={prescription}
        />
      </div>
    </div>
  )
}
