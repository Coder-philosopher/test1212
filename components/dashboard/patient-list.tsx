"use client"

import { useState } from "react"

interface Patient {
  id: string
  name: string
  age: number
  condition: string
  lastVisit: string
  images: string[]
}

interface PatientListProps {
  patients: Patient[]
  onSelectPatient: (patient: Patient) => void
}

export default function PatientList({ patients, onSelectPatient }: PatientListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.condition.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 pb-24 md:pb-6">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or condition..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid gap-4">
        {filteredPatients.map((patient) => (
          <button
            key={patient.id}
            onClick={() => onSelectPatient(patient)}
            /* Removed rounded-lg */
            className="text-left p-4 bg-card border border-border hover:shadow-lg hover:border-primary transition-all active:scale-95"
          >
            <div className="flex items-start gap-4">
              <img
                src={patient.images[0] || "/placeholder.svg?height=100&width=100&query=patient%20profile"}
                alt={patient.name}
                className="w-16 h-16 object-cover border border-border flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">{patient.name}</h3>
                <p className="text-sm text-muted-foreground">Age: {patient.age}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium">
                    {patient.condition}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="text-2xl text-primary">→</div>
            </div>
          </button>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No patients found</p>
        </div>
      )}
    </div>
  )
}
