"use client"

import { useState } from "react"

interface AddPatientModalProps {
  isOpen: boolean
  onClose: () => void
  onAddPatient: (patient: {
    name: string
    age: number
    condition: string
    phone?: string
    email?: string
  }) => void
}

export default function AddPatientModal({ isOpen, onClose, onAddPatient }: AddPatientModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    age: 30,
    condition: "",
    phone: "",
    email: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (formData.age < 1 || formData.age > 150) newErrors.age = "Age must be between 1 and 150"
    if (!formData.condition.trim()) newErrors.condition = "Condition is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onAddPatient(formData)
      setFormData({ name: "", age: 30, condition: "", phone: "", email: "" })
      setErrors({})
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card p-8 max-w-md w-full border border-border shadow-xl">
        <h2 className="text-2xl font-bold text-foreground mb-6">Add New Patient</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter patient name"
              className="w-full px-4 py-2 bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: Number.parseInt(e.target.value) })}
                min="1"
                max="150"
                className="w-full px-4 py-2 bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.age && <p className="text-xs text-destructive mt-1">{errors.age}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Optional"
                className="w-full px-4 py-2 bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Primary Condition</label>
            <select
              value={formData.condition}
              onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
              className="w-full px-4 py-2 bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select a condition</option>
              <option value="Psoriasis">Psoriasis</option>
              <option value="Eczema">Eczema</option>
              <option value="Acne">Acne</option>
              <option value="Melanoma">Melanoma</option>
              <option value="Urticaria">Urticaria</option>
              <option value="Dermatitis">Dermatitis</option>
              <option value="Rosacea">Rosacea</option>
              <option value="Other">Other</option>
            </select>
            {errors.condition && <p className="text-xs text-destructive mt-1">{errors.condition}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Optional"
              className="w-full px-4 py-2 bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button onClick={onClose} className="flex-1 btn-outline">
            Cancel
          </button>
          <button onClick={handleSubmit} className="flex-1 btn-primary">
            Add Patient
          </button>
        </div>
      </div>
    </div>
  )
}
