import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ScanResult {
  [key: string]: any
}

interface ResultsDisplayProps {
  results: ScanResult | null
  targetDomain: string
}

function formatFindings(findings: any): JSX.Element {
  if (typeof findings === 'object' && findings !== null) {
    return (
      <ul className="list-disc list-inside">
        {Object.entries(findings).map(([key, value]) => (
          <li key={key}>
            <span className="font-semibold">{key}:</span> {formatFindings(value)}
          </li>
        ))}
      </ul>
    )
  }
  return <span>{findings}</span>
}

function getSeverityColor(severity: string): string {
  switch (severity.toLowerCase()) {
    case 'critical':
    case 'high':
      return 'text-red-500'
    case 'medium':
      return 'text-yellow-500'
    default:
      return ''
  }
}

function getSeverityBadge(severity: string): JSX.Element {
  const color = getSeverityColor(severity)
  return <Badge className={`${color} ml-2`}>{severity}</Badge>
}

export function ResultsDisplay({ results, targetDomain }: ResultsDisplayProps) {
  const [severityFilter, setSeverityFilter] = useState<string | null>(null)

  const summary = useMemo(() => {
    if (!results) return null

    let totalVulnerabilities = 0
    let criticalVulnerabilities = 0
    let highVulnerabilities = 0
    let mediumVulnerabilities = 0
    let lowVulnerabilities = 0

    Object.values(results).forEach((stepResults: any) => {
      Object.values(stepResults).forEach((toolResults: any) => {
        totalVulnerabilities += toolResults.criticalVulnerabilities || 0
        totalVulnerabilities += toolResults.highVulnerabilities || 0
        totalVulnerabilities += toolResults.mediumVulnerabilities || 0
        totalVulnerabilities += toolResults.lowVulnerabilities || 0

        criticalVulnerabilities += toolResults.criticalVulnerabilities || 0
        highVulnerabilities += toolResults.highVulnerabilities || 0
        mediumVulnerabilities += toolResults.mediumVulnerabilities || 0
        lowVulnerabilities += toolResults.lowVulnerabilities || 0
      })
    })

    return {
      totalVulnerabilities,
      criticalVulnerabilities,
      highVulnerabilities,
      mediumVulnerabilities,
      lowVulnerabilities,
    }
  }, [results])

  const filteredResults = useMemo(() => {
    if (!results || !severityFilter) return results

    const filtered: ScanResult = {}
    Object.entries(results).forEach(([stepName, stepResults]) => {
      const filteredStepResults: any = {}
      Object.entries(stepResults).forEach(([toolName, toolResults]) => {
        const filteredToolResults: any = {}
        Object.entries(toolResults).forEach(([key, value]) => {
          if (key.toLowerCase().includes(severityFilter.toLowerCase())) {
            filteredToolResults[key] = value
          }
        })
        if (Object.keys(filteredToolResults).length > 0) {
          filteredStepResults[toolName] = filteredToolResults
        }
      })
      if (Object.keys(filteredStepResults).length > 0) {
        filtered[stepName] = filteredStepResults
      }
    })
    return filtered
  }, [results, severityFilter])

  if (!results) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Scan Results</CardTitle>
        </CardHeader>
        <CardContent>
          {targetDomain ? (
            <p>Scanning {targetDomain}... Please wait for the results.</p>
          ) : (
            <p>Enter a domain and start a scan to see results.</p>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan Results for {targetDomain}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {summary && (
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Summary</h3>
            <p>Total Vulnerabilities: {summary.totalVulnerabilities}</p>
            <p>Critical: {summary.criticalVulnerabilities}{getSeverityBadge('Critical')}</p>
            <p>High: {summary.highVulnerabilities}{getSeverityBadge('High')}</p>
            <p>Medium: {summary.mediumVulnerabilities}{getSeverityBadge('Medium')}</p>
            <p>Low: {summary.lowVulnerabilities}{getSeverityBadge('Low')}</p>
          </div>
        )}
        <div className="mb-4">
          <Select onValueChange={(value) => setSeverityFilter(value === 'all' ? null : value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {Object.entries(filteredResults).map(([stepName, stepResults]) => (
          <Accordion key={stepName} type="single" collapsible className="w-full">
            <AccordionItem value={stepName}>
              <AccordionTrigger>{stepName}</AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tool</TableHead>
                      <TableHead>Findings</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(stepResults).map(([tool, findings]) => (
                      <TableRow key={tool}>
                        <TableCell className="font-medium">{tool}</TableCell>
                        <TableCell>
                          <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value={tool}>
                              <AccordionTrigger>View Details</AccordionTrigger>
                              <AccordionContent>
                                {formatFindings(findings)}
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </CardContent>
    </Card>
  )
}

