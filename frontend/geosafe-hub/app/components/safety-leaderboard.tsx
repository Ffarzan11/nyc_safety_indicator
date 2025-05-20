"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowDown,
  ArrowUp,
  Medal,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import AxiosInstanceAny from "@/components/AxiosInstanceAny"

type NeighborhoodSafety = {
  name: string
  score: number
}

export default function SafetyLeaderboard() {
  const [neighborhoods, setNeighborhoods] = useState<NeighborhoodSafety[]>([])
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [expanded, setExpanded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AxiosInstanceAny.get("/safety/all-neighborhoods-scores/")
        const data = res.data

        const formatted: NeighborhoodSafety[] = Object.entries(data).map(([name, score]) => ({
          name,
          score: Number(score),
        }))

        setNeighborhoods(formatted)
      } catch (error) {
        console.error("Failed to fetch safety data:", error)
      }
    }

    fetchData()
  }, [])

  const sortedNeighborhoods = [...neighborhoods].sort((a, b) =>
    sortOrder === "desc" ? b.score - a.score : a.score - b.score,
  )

  const displayedNeighborhoods = expanded ? sortedNeighborhoods : sortedNeighborhoods.slice(0, 5)

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc")
  }

  const handleSelectNeighborhood = (location: string) => {
    router.push(`/safety-report?location=${encodeURIComponent(location)}`)
    window.location.reload()
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-blue-500"
    if (score >= 60) return "bg-blue-400"
    if (score >= 40) return "bg-blue-300"
    return "bg-blue-200"
  }

  return (
    <div className="w-full max-w-3xl mx-auto backdrop-blur-md bg-black/40 rounded-lg border border-gray-800 shadow-xl overflow-hidden">
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-400" />
            <div>
              <h2 className="text-2xl font-semibold text-white">NYC Neighborhood Safety Index</h2>
              <p className="text-gray-400">Ranking neighborhoods by safety score</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSortOrder}
            className="flex items-center gap-1 bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            {sortOrder === "desc" ? (
              <>
                Highest First <ArrowDown className="h-4 w-4" />
              </>
            ) : (
              <>
                Lowest First <ArrowUp className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {displayedNeighborhoods.map((neighborhood, index) => (
          <div
            key={neighborhood.name}
            onClick={() => handleSelectNeighborhood(neighborhood.name)}
            className="grid grid-cols-[auto_1fr_auto] gap-4 items-center cursor-pointer hover:bg-gray-900 rounded-md p-2 transition-all"
          >
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full font-medium text-sm",
                index < 3 ? "bg-gray-800" : "bg-gray-800/50",
              )}
            >
              {index === 0 && sortOrder === "desc" ? (
                <Medal className="h-5 w-5 text-yellow-500" />
              ) : index === 1 && sortOrder === "desc" ? (
                <Medal className="h-5 w-5 text-gray-400" />
              ) : index === 2 && sortOrder === "desc" ? (
                <Medal className="h-5 w-5 text-amber-700" />
              ) : (
                <span className="text-gray-300">{index + 1}</span>
              )}
            </div>
            <div className="space-y-1.5">
              <div className="font-medium text-white">{neighborhood.name}</div>
              <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full", getScoreColor(neighborhood.score))}
                  style={{ width: `${neighborhood.score}%` }}
                />
              </div>
            </div>
            <div className="font-medium tabular-nums text-blue-400">{neighborhood.score.toFixed(1)}</div>
          </div>
        ))}

        <div className="flex justify-center pt-2">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="text-blue-400 hover:text-white transition-colors flex items-center gap-1 text-sm"
          >
            {expanded ? (
              <>
                Show Less <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Show All Neighborhoods <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
