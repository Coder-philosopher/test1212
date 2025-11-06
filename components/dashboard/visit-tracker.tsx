"use client"

import { useState, useEffect } from "react"

interface Visit {
  id: string
  date: string
  condition: string
  severity: number
  notes: string
}

interface VisitTrackerProps {
  patientId: string
}

export default function VisitTracker({ patientId }: VisitTrackerProps) {
  const [visits, setVisits] = useState<Visit[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(`derma_visits_${patientId}`)
    if (stored) {
      setVisits(JSON.parse(stored))
    }
  }, [patientId])

  const addVisit = () => {
    const newVisit: Visit = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      condition: "",
      severity: 5,
      notes: "",
    }
    const updated = [newVisit, ...visits]
    setVisits(updated)
    localStorage.setItem(`derma_visits_${patientId}`, JSON.stringify(updated))
  }

  return (
    <div className="bg-card border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-foreground">Visit History</h3>
        <button onClick={addVisit} className="btn-secondary text-sm">
          Add Visit
        </button>
      </div>

      {visits.length === 0 ? (
        <p className="text-sm text-muted-foreground">No visits recorded yet</p>
      ) : (
        <div className="space-y-3">
          {visits.map((visit) => (
            /* Removed rounded-lg */
            <div key={visit.id} className="border border-border p-4 hover:shadow-md transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{new Date(visit.date).toLocaleDateString()}</p>
                  <p className="text-sm text-muted-foreground">Severity: {visit.severity}/10</p>
                </div>
                <div className="text-right">
                  <div className="w-12 h-12 bg-muted flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">{visit.severity}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
