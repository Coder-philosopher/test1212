"use client"

import { useState, useEffect } from "react"
import PatientList from "./patient-list"
import PatientDetail from "./patient-detail"
import AddPatientModal from "./add-patient-modal"
import { dataSyncUtils } from "@/lib/data-sync"

interface DashboardLayoutProps {
  onLogout: () => void
}

interface Patient {
  id: string
  name: string
  age: number
  condition: string
  lastVisit: string
  images: string[]
  phone?: string
  email?: string
  notes?: Record<string, string>
  prescriptions?: Record<string, string>
}

export default function DashboardLayout({ onLogout }: DashboardLayoutProps) {
  const [activeTab, setActiveTab] = useState<"patients" | "detail">("patients")
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [patients, setPatients] = useState<Patient[]>([])
  const [showAddPatientModal, setShowAddPatientModal] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("derma_patients")
    if (stored) {
      setPatients(JSON.parse(stored))
    } else {
      const demoPatients: Patient[] = [
        {
          id: "1",
          name: "John Doe",
          age: 45,
          condition: "Psoriasis",
          lastVisit: "2025-11-05",
          images: ["/psoriasis-lesion-severe.jpg", "/psoriasis-improvement-treatment.jpg"],
          phone: "+1-555-0101",
          notes: {},
          prescriptions: {},
        },
        {
          id: "2",
          name: "Jane Smith",
          age: 32,
          condition: "Eczema",
          lastVisit: "2025-11-03",
          images: ["/eczema-inflamed-skin-rash.jpg", "/eczema-treatment-response.jpg"],
          phone: "+1-555-0102",
          notes: {},
          prescriptions: {},
        },
        {
          id: "3",
          name: "Mike Johnson",
          age: 58,
          condition: "Melanoma Follow-up",
          lastVisit: "2025-10-28",
          images: ["/melanoma-mole-assessment-medical.jpg", "/melanoma-followup-monitoring.jpg"],
          phone: "+1-555-0103",
          notes: {},
          prescriptions: {},
        },
      ]
      setPatients(demoPatients)
      localStorage.setItem("derma_patients", JSON.stringify(demoPatients))
    }

    dataSyncUtils.initializeData()

    const backupInterval = setInterval(
      () => {
        dataSyncUtils.createBackup()
      },
      5 * 60 * 1000,
    )

    return () => clearInterval(backupInterval)
  }, [])

  const handleAddPatient = (patientData: {
    name: string
    age: number
    condition: string
    phone?: string
    email?: string
  }) => {
    const newPatient: Patient = {
      id: Date.now().toString(),
      ...patientData,
      lastVisit: new Date().toISOString().split("T")[0],
      images: [],
      notes: {},
      prescriptions: {},
    }

    const updatedPatients = [...patients, newPatient]
    setPatients(updatedPatients)
    localStorage.setItem("derma_patients", JSON.stringify(updatedPatients))
  }

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient)
    setActiveTab("detail")
  }

  const handleLogout = () => {
    localStorage.removeItem("derma_pin_auth")
    onLogout()
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar Navigation */}
      <nav className="w-64 bg-card border-r border-border shadow-sm hidden md:flex flex-col">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold text-primary">DermAssist</h2>
          <p className="text-xs text-muted-foreground mt-1">Clinical Dermatology</p>
        </div>

        <div className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("patients")}
            className={`w-full text-left px-4 py-3 font-medium transition-all ${
              activeTab === "patients" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
            }`}
          >
            Patient Management
          </button>
          <button
            onClick={() => setShowAddPatientModal(true)}
            className="w-full text-left px-4 py-3 bg-accent text-accent-foreground font-medium hover:opacity-90 transition-all"
          >
            Add New Patient
          </button>
        </div>

        <div className="p-4 border-t border-border">
          <button onClick={handleLogout} className="w-full btn-outline text-sm justify-center flex">
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-card border-b border-border px-6 py-4 shadow-sm flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">
            {activeTab === "detail" ? selectedPatient?.name : "Patient Management"}
          </h1>
          <div className="hidden md:flex items-center gap-4">
            <div className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</div>
            <button onClick={() => setShowAddPatientModal(true)} className="hidden md:block btn-primary text-sm">
              Add Patient
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {activeTab === "patients" ? (
            <PatientList patients={patients} onSelectPatient={handleSelectPatient} />
          ) : (
            <PatientDetail
              patient={selectedPatient}
              onBack={() => setActiveTab("patients")}
              onPatientUpdate={() => {}}
            />
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3 flex gap-2">
        <button
          onClick={() => setActiveTab("patients")}
          className={`flex-1 py-2 font-medium text-sm transition-all ${
            activeTab === "patients" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
          }`}
        >
          Patients
        </button>
        <button onClick={() => setShowAddPatientModal(true)} className="flex-1 py-2 btn-accent text-sm font-medium">
          Add
        </button>
        <button onClick={handleLogout} className="flex-1 py-2 btn-outline text-sm">
          Logout
        </button>
      </div>

      {/* Add Patient Modal */}
      <AddPatientModal
        isOpen={showAddPatientModal}
        onClose={() => setShowAddPatientModal(false)}
        onAddPatient={handleAddPatient}
      />
    </div>
  )
}
