'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ScanInputProps {
  onStartScan: (domain: string) => void
  isScanning: boolean
}

export function ScanInput({ onStartScan, isScanning }: ScanInputProps) {
  const [domain, setDomain] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (domain && !isScanning) {
      onStartScan(domain)
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Start a New Scan</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            type="text"
            placeholder="Enter domain (e.g., example.com)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="flex-grow"
            disabled={isScanning}
          />
          <Button type="submit" disabled={isScanning}>
            {isScanning ? 'Scanning...' : 'Start Scan'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

