import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Circle, Loader2 } from 'lucide-react'

const steps = [
  { name: "Asset Discovery", tools: ["Nmap", "Masscan", "Lansweeper", "Subdomain Enumeration", "TCP Scan", "Whois", "WhatWeb"] },
  { name: "Network Vulnerability Scanning", tools: ["Nessus", "OpenVAS", "QualysGuard"] },
  { name: "Web Application Scanning", tools: ["OWASP ZAP", "Burp Suite", "Acunetix", "Nuclei"] },
  { name: "Endpoint Scanning", tools: ["Rapid7 InsightVM", "Microsoft Defender for Endpoint"] },
  { name: "Configuration and Compliance Checks", tools: ["Lynis", "Chef InSpec"] },
  { name: "Container and Cloud Scanning", tools: ["Trivy", "AWS Inspector", "Aqua Security"] },
  { name: "SSL and DNS Analysis", tools: ["SSL Scan", "DNS Recon", "dig"] },
  { name: "Exploitation Validation", tools: ["Metasploit", "Core Impact"] },
  { name: "Reporting and Remediation", tools: ["Nessus Reporting", "Qualys Reporting", "Jira", "ServiceNow"] },
]

interface ScanningStepsProps {
  currentStep: number
}

export function ScanningSteps({ currentStep }: ScanningStepsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Scanning Steps</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {steps.map((step, index) => (
            <li key={index} className="flex items-start">
              {index < currentStep ? (
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
              ) : index === currentStep - 1 ? (
                <Loader2 className="mr-2 h-5 w-5 text-blue-500 animate-spin" />
              ) : (
                <Circle className="mr-2 h-5 w-5 text-gray-300" />
              )}
              <div>
                <h3 className="font-semibold">{step.name}</h3>
                <p className="text-sm text-gray-500">{step.tools.join(", ")}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

