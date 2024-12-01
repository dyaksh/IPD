import { NextResponse } from 'next/server'

const mockScanResults = {
  "Asset Discovery": {
    "Nmap": { "openPorts": [80, 443, 22], "osDetection": "Linux 4.15" },
    "Masscan": { "openPorts": [80, 443, 22, 3306] },
    "Lansweeper": { "assets": ["Web Server", "Database Server"] },
    "Subdomain Enumeration": { "subdomains": ["api.example.com", "blog.example.com", "mail.example.com"] },
    "TCP Scan": { "openPorts": [21, 22, 80, 443, 3306] },
    "Whois": { "registrar": "Example Registrar", "creationDate": "2010-01-01", "expirationDate": "2025-01-01" },
    "WhatWeb": { "webServer": "nginx/1.18.0", "programmingLanguage": "PHP/7.4.3" }
  },
  "Network Vulnerability Scanning": {
    "Nessus": { "criticalVulnerabilities": 2, "highVulnerabilities": 5, "mediumVulnerabilities": 10, "lowVulnerabilities": 15 },
    "OpenVAS": { "criticalVulnerabilities": 1, "highVulnerabilities": 3, "mediumVulnerabilities": 8, "lowVulnerabilities": 12 },
    "QualysGuard": { "criticalVulnerabilities": 2, "highVulnerabilities": 4, "mediumVulnerabilities": 9, "lowVulnerabilities": 14 }
  },
  "Web Application Scanning": {
    "OWASP ZAP": { "highRisks": 1, "mediumRisks": 3, "lowRisks": 5 },
    "Burp Suite": { "highRisks": 2, "mediumRisks": 4, "lowRisks": 6 },
    "Acunetix": { "highRisks": 1, "mediumRisks": 2, "lowRisks": 4 },
    "Nuclei": { "criticalVulnerabilities": 1, "highVulnerabilities": 2, "mediumVulnerabilities": 3, "lowVulnerabilities": 5 }
  },
  "Endpoint Scanning": {
    "Rapid7 InsightVM": { "criticalVulnerabilities": 3, "highVulnerabilities": 7, "mediumVulnerabilities": 12, "lowVulnerabilities": 18 },
    "Microsoft Defender for Endpoint": { "alerts": 5, "threats": 2 }
  },
  "Configuration and Compliance Checks": {
    "Lynis": { "warnings": 10, "suggestions": 15 },
    "Chef InSpec": { "failedControls": 5, "passedControls": 95 }
  },
  "Container and Cloud Scanning": {
    "Trivy": { "criticalVulnerabilities": 2, "highVulnerabilities": 5, "mediumVulnerabilities": 8, "lowVulnerabilities": 12 },
    "AWS Inspector": { "findings": 8 },
    "Aqua Security": { "securityIssues": 12 }
  },
  "SSL and DNS Analysis": {
    "SSL Scan": { "grade": "B", "vulnerabilities": ["TLS 1.0 Supported", "Weak Cipher Suites"] },
    "DNS Recon": { "aRecords": ["93.184.216.34"], "mxRecords": ["mail.example.com"] },
    "dig": { "nsRecords": ["ns1.example.com", "ns2.example.com"] }
  },
  "Exploitation Validation": {
    "Metasploit": { "exploitableVulnerabilities": 1 },
    "Core Impact": { "successfulExploits": 2 }
  },
  "Reporting and Remediation": {
    "Nessus Reporting": { "totalIssues": 25, "criticalIssues": 3, "highIssues": 7, "mediumIssues": 10, "lowIssues": 5 },
    "Qualys Reporting": { "totalIssues": 30, "criticalIssues": 4, "highIssues": 8, "mediumIssues": 12, "lowIssues": 6 },
    "Jira": { "ticketsCreated": 15 },
    "ServiceNow": { "incidentsLogged": 10 }
  }
}

export async function POST(request: Request) {
  const { domain, step } = await request.json()

  // Simulate a delay to mimic the scanning process
  await new Promise(resolve => setTimeout(resolve, 2000))

  const stepName = Object.keys(mockScanResults)[step - 1]
  const stepResults = { [stepName]: mockScanResults[stepName as keyof typeof mockScanResults] }

  return NextResponse.json(stepResults)
}

