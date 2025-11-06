"use client"

import { useState } from "react"

interface LoginScreenProps {
  onAuthenticated: () => void
}

export default function LoginScreen({ onAuthenticated }: LoginScreenProps) {
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")
  const CORRECT_PIN = "1234"

  const handlePinClick = (digit: string) => {
    if (pin.length < 4) {
      setPin(pin + digit)
      setError("")
    }
  }

  const handleDelete = () => {
    setPin(pin.slice(0, -1))
    setError("")
  }

  const handleSubmit = () => {
    if (pin === CORRECT_PIN) {
      localStorage.setItem("derma_pin_auth", "authenticated")
      onAuthenticated()
    } else {
      setError("Incorrect PIN")
      setPin("")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="bg-card shadow-lg p-8 border border-border">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary mx-auto mb-4 flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">DA</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">DermAssist</h1>
            <p className="text-muted-foreground text-sm">Clinical Portal</p>
          </div>

          {/* PIN Display */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-3">Enter 4-Digit PIN</label>
            <div className="flex gap-3 justify-center mb-4">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  /* Removed rounded-lg */
                  className="w-16 h-16 border-2 border-border bg-input flex items-center justify-center text-2xl font-bold text-foreground"
                >
                  {pin[i] ? "●" : ""}
                </div>
              ))}
            </div>
            {error && <p className="text-destructive text-sm text-center font-medium">{error}</p>}
          </div>

          {/* PIN Pad */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handlePinClick(num.toString())}
                className="btn-outline h-16 text-xl font-semibold text-foreground active:bg-primary active:text-primary-foreground"
              >
                {num}
              </button>
            ))}
            <button onClick={() => handlePinClick("0")} className="col-span-3 btn-outline h-12 text-lg">
              0
            </button>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button onClick={handleDelete} className="btn-outline">
              Delete
            </button>
            <button onClick={handleSubmit} disabled={pin.length !== 4} className="btn-primary disabled:opacity-50">
              Enter
            </button>
          </div>

          {/* Security Notice */}
          <p className="text-xs text-muted-foreground text-center mt-6 p-3 bg-muted">
            Demo PIN: 1234 | Offline only | No data transmission
          </p>
        </div>
      </div>
    </div>
  )
}
