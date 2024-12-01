import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Vulnerability Scanner Dashboard</h1>
      <Button>Start New Scan</Button>
    </div>
  )
}

