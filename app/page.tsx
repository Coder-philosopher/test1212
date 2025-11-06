"use client"

import { useState, useEffect } from "react"
import LoginScreen from "@/components/auth/login-screen"
import DashboardLayout from "@/components/dashboard/dashboard-layout"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored PIN on mount
    const storedPin = localStorage.getItem("derma_pin_auth")
    if (storedPin === "authenticated") {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {!isAuthenticated ? (
        <LoginScreen onAuthenticated={() => setIsAuthenticated(true)} />
      ) : (
        <DashboardLayout onLogout={() => setIsAuthenticated(false)} />
      )}
    </>
  )
}
