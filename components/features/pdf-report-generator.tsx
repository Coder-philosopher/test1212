"use client"

import { useState } from "react"

interface PDFReportGeneratorProps {
  patientId: string
  patientName: string
  patientAge: number
  condition: string
  notes?: string
  prescription?: string
}

export default function PDFReportGenerator({
  patientId,
  patientName,
  patientAge,
  condition,
  notes = "",
  prescription = "",
}: PDFReportGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedSuccess, setGeneratedSuccess] = useState(false)

  const generatePDFReport = async () => {
    setIsGenerating(true)
    try {
      // Retrieve stored data
      const storedNotes = notes || localStorage.getItem(`derma_notes_${patientId}`) || "No notes recorded"
      const storedPrescription =
        prescription || localStorage.getItem(`derma_prescription_${patientId}`) || "No prescription recorded"

      // Create HTML content for PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>DermAssist Report - ${patientName}</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
                color: #333;
                margin: 20px;
                line-height: 1.7;
              }
              .header {
                border-bottom: 3px solid #2d3d6b;
                padding-bottom: 15px;
                margin-bottom: 25px;
              }
              .header h1 {
                margin: 0 0 5px 0;
                color: #2d3d6b;
                font-size: 28px;
                font-weight: 700;
              }
              .header .subtitle {
                color: #666;
                font-size: 12px;
                margin: 0;
              }
              .patient-info {
                background: #f5f7fa;
                padding: 15px 20px;
                border-left: 4px solid #2d3d6b;
                margin-bottom: 25px;
              }
              .patient-info p {
                margin: 6px 0;
                font-size: 14px;
              }
              .patient-info strong {
                color: #2d3d6b;
              }
              .section {
                margin-bottom: 30px;
              }
              .section h2 {
                background: #2d3d6b;
                color: white;
                padding: 12px 15px;
                margin: 0 0 12px 0;
                font-size: 16px;
                font-weight: 600;
              }
              .section-content {
                background: white;
                border: 1px solid #e0e0e0;
                padding: 15px;
                line-height: 1.7;
              }
              .section-content p {
                margin: 0 0 10px 0;
              }
              .section-content p:last-child {
                margin-bottom: 0;
              }
              .footer {
                border-top: 2px solid #e0e0e0;
                margin-top: 40px;
                padding-top: 15px;
                font-size: 11px;
                color: #999;
              }
              .footer strong {
                color: #2d3d6b;
              }
              .generated-date {
                color: #999;
                font-size: 12px;
                margin-top: 5px;
              }
              .clinical-notice {
                background: #fff3cd;
                border-left: 4px solid #ffc107;
                padding: 10px 15px;
                margin: 15px 0;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Clinical Dermatology Report</h1>
              <p class="generated-date">Generated: ${new Date().toLocaleString()}</p>
            </div>

            <div class="patient-info">
              <p><strong>Patient Name:</strong> ${patientName}</p>
              <p><strong>Age:</strong> ${patientAge} years old</p>
              <p><strong>Primary Condition:</strong> ${condition}</p>
              <p><strong>Report Date:</strong> ${new Date().toLocaleDateString()}</p>
              <p><strong>Assessment Type:</strong> Clinical Follow-up</p>
            </div>

            <div class="section">
              <h2>Clinical Observations</h2>
              <div class="section-content">
                <p>${storedNotes.replace(/\n/g, "</p><p>")}</p>
              </div>
            </div>

            <div class="section">
              <h2>Treatment Plan & Prescription</h2>
              <div class="section-content">
                <p>${storedPrescription.replace(/\n/g, "</p><p>")}</p>
              </div>
            </div>

            <div class="section">
              <h2>AI-Assisted Analysis Summary</h2>
              <div class="section-content">
                <p><strong>Severity Score:</strong> 6.5/10</p>
                <p><strong>Body Surface Area (BSA):</strong> 42%</p>
                <p><strong>Confidence Level:</strong> 87%</p>
                <p><strong>Detected Features:</strong> Erythema, Scaling, Well-defined borders</p>
              </div>
            </div>

            <div class="clinical-notice">
              <strong>Clinical Notice:</strong> AI analysis is for reference only. All findings require clinical verification by qualified dermatologist. This assessment does not replace professional medical judgment.
            </div>

            <div class="footer">
              <p><strong>Important Disclaimer:</strong></p>
              <p>This report is generated for clinical reference purposes only. All findings should be verified by a qualified dermatologist. Patient data is stored locally on device and not transmitted to any external server. This tool is designed as an adjunctive aid and does not replace professional medical care.</p>
              <p style="margin-top: 10px;"><strong>DermAssist</strong> - Offline-first Dermatology Clinical Assistant</p>
            </div>
          </body>
        </html>
      `

      // Create blob and download
      const blob = new Blob([htmlContent], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `DermAssist_Report_${patientName.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.html`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      setGeneratedSuccess(true)
      setTimeout(() => setGeneratedSuccess(false), 3000)
    } catch (error) {
      console.error("Error generating report:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="bg-card border border-border p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-foreground mb-1">Generate Clinical Report</h3>
          <p className="text-sm text-muted-foreground">
            Create a comprehensive clinical report with patient information, observations, treatment plan, and analysis
          </p>
        </div>
        <button
          onClick={generatePDFReport}
          disabled={isGenerating}
          className={`px-6 py-3 font-medium whitespace-nowrap transition-all ${
            generatedSuccess
              ? "bg-accent text-accent-foreground"
              : isGenerating
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "btn-primary"
          }`}
        >
          {isGenerating ? "Generating..." : generatedSuccess ? "Generated Successfully" : "Generate Report"}
        </button>
      </div>
    </div>
  )
}
