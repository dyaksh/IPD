'use client'

import { useState } from 'react'
import { DashboardHeader } from "@/components/dashboard-header"
import { ScanInput } from "@/components/scan-input"
import { ScanningSteps } from "@/components/scanning-steps"
import { ResultsDisplay } from "@/components/results-display"

export default function DashboardPage() {
  const [scanResults, setScanResults] = useState<any>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [targetDomain, setTargetDomain] = useState('')
  const [isScanning, setIsScanning] = useState(false)

  const startScan = async (domain: string) => {
    setTargetDomain(domain)
    setIsScanning(true)
    setScanResults(null)
    setCurrentStep(0)

    try {
      for (let step = 1; step <= 9; step++) {
        setCurrentStep(step)
        const response = await fetch('/api/scan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ domain, step }),
        })
        const stepResults = await response.json()
        setScanResults((prevResults: any) => ({ ...prevResults, ...stepResults }))
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate delay between steps
      }
    } catch (error) {
      console.error('Error during scan:', error)
    } finally {
      setIsScanning(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <DashboardHeader />
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <ScanInput onStartScan={startScan} isScanning={isScanning} />
          <ScanningSteps currentStep={currentStep} />
        </div>
        <ResultsDisplay results={scanResults} targetDomain={targetDomain} />
      </div>
    </div>
  )
}

