"use client"

import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  MapPin,
  BarChart2,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  FileText,
  AlertCircle,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Footer from "../components/footer"

export default function SafetyReportPage() {
  const searchParams = useSearchParams()
  // Get location from URL parameters
  const locationParam = searchParams.get("location")

  // State for selected location
  const [selectedLocation, setSelectedLocation] = useState(locationParam || "Manhattan")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // Add this useEffect to scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Add this function to determine if the location is valid
  const isValidLocation = (location: string) => {
    return (
      nycLocations.boroughs.includes(location) ||
      Object.values(nycLocations.neighborhoods).some((neighborhoods) => neighborhoods.includes(location))
    )
  }

  // Update the useEffect that handles the location parameter
  useEffect(() => {
    if (locationParam) {
      // Check if the location from URL is valid
      if (isValidLocation(locationParam)) {
        setSelectedLocation(locationParam)
      } else {
        // If not valid, default to Manhattan
        setSelectedLocation("Manhattan")
      }
    }
  }, [locationParam])

  // NYC locations data
  const nycLocations = {
    boroughs: ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"],
    neighborhoods: {
      Manhattan: ["Upper East Side", "Harlem", "Chelsea", "Greenwich Village", "Midtown"],
      Brooklyn: ["Williamsburg", "DUMBO", "Bay Ridge", "Park Slope", "Bedford-Stuyvesant"],
      Queens: ["Astoria", "Long Island City", "Flushing", "Jamaica", "Forest Hills"],
      Bronx: ["Riverdale", "Fordham", "Pelham Bay", "Mott Haven", "Concourse"],
      "Staten Island": ["St. George", "Tottenville", "Great Kills", "New Dorp", "West Brighton"],
    },
  }

  // Flatten all locations for the dropdown
  const allLocations = [...nycLocations.boroughs, ...Object.values(nycLocations.neighborhoods).flat()]

  // Mock data for the safety report - would be dynamic based on selected location
  const safetyScores = {
    Manhattan: 73,
    Brooklyn: 68,
    Queens: 71,
    Bronx: 62,
    "Staten Island": 78,
    "Upper East Side": 82,
    Harlem: 65,
    "Bay Ridge": 76,
    // Add more locations as needed
  }

  // Mock data for crime statistics
  const lowProfileCrimes = [
    { type: "Petty Theft", count: 127, trend: "down", percent: 12 },
    { type: "Vandalism", count: 89, trend: "down", percent: 15 },
    { type: "Public Intoxication", count: 62, trend: "up", percent: 8 },
    { type: "Trespassing", count: 43, trend: "down", percent: 5 },
  ]

  const seriousCrimes = [
    { type: "Assault", count: 38, trend: "down", percent: 10 },
    { type: "Burglary", count: 24, trend: "up", percent: 5 },
    { type: "Vehicle Theft", count: 19, trend: "down", percent: 15 },
    { type: "Robbery", count: 12, trend: "down", percent: 20 },
  ]

  // Crime breakdown for pie chart
  const crimeBreakdown = [
    { type: "Petty Theft", percentage: 32 },
    { type: "Vandalism", percentage: 22 },
    { type: "Assault", percentage: 15 },
    { type: "Burglary", percentage: 12 },
    { type: "Vehicle Theft", percentage: 10 },
    { type: "Other", percentage: 9 },
  ]

  // Top 3 crimes comparison data
  const topCrimesComparison = [
    {
      type: "Petty Theft",
      locationRate: 127,
      nycAverage: 145,
      difference: -12, // percentage difference
    },
    {
      type: "Vandalism",
      locationRate: 89,
      nycAverage: 78,
      difference: 14, // percentage difference
    },
    {
      type: "Assault",
      locationRate: 38,
      nycAverage: 42,
      difference: -10, // percentage difference
    },
  ]

  const safetyScore = safetyScores[selectedLocation] || 70 // Default score if not found
  const lastUpdated = "Today at 9:45 AM"

  const safetyTips = [
    "Stay aware of your surroundings, especially at night",
    "Keep valuables out of sight when walking in public",
    "Use well-lit and populated streets when possible",
    "Report suspicious activity to local authorities",
  ]

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/579793-aerial_view-vertical-New_York_City.jpg-gdpMVsd9XvCHK8jhCjtQCtScS50yT8.jpeg"
          alt="NYC Satellite View"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" />
      </div>

      <header className="container mx-auto px-4 py-4 flex items-center justify-between relative z-10 bg-blue-900/50 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview-2-Uo72XXQC0ngSlfSM7Bl3ipiWWztm26.png"
            alt="GeoSafe Hub Logo"
            width={40}
            height={40}
            className="rounded-xl"
          />
          <h1 className="text-3xl font-bold text-white">GeoSafe Hub</h1>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="px-4 py-2 border border-white/30 rounded-full text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2 inline" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-1 relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-xl mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white">Safety Report</h1>

                {/* Location Selector */}
                <div className="relative mt-2">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-2 text-white hover:bg-white/20 transition-colors"
                  >
                    <MapPin className="h-5 w-5" />
                    <span>{selectedLocation}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute z-10 mt-1 w-64 max-h-96 overflow-y-auto bg-black/40 backdrop-blur-md border border-white/30 rounded-lg shadow-lg">
                      <div className="p-2">
                        <input
                          type="text"
                          placeholder="Search locations..."
                          className="w-full px-3 py-2 bg-black/30 border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="p-2">
                        <div className="text-white text-xs font-semibold uppercase px-2 py-1 bg-blue-900/50">
                          Boroughs
                        </div>
                        {nycLocations.boroughs.map((borough) => (
                          <button
                            key={borough}
                            onClick={() => {
                              setSelectedLocation(borough)
                              setDropdownOpen(false)
                            }}
                            className={`w-full text-left px-3 py-2 rounded-md ${selectedLocation === borough ? "bg-blue-500 text-white font-medium" : "text-white hover:bg-white/20"}`}
                          >
                            {borough}
                          </button>
                        ))}
                      </div>

                      {Object.entries(nycLocations.neighborhoods).map(([borough, neighborhoods]) => (
                        <div key={borough} className="p-2 border-t border-white/20">
                          <div className="text-white text-xs font-semibold uppercase px-2 py-1 bg-blue-900/50">
                            {borough} Neighborhoods
                          </div>
                          {neighborhoods.map((neighborhood) => (
                            <button
                              key={neighborhood}
                              onClick={() => {
                                setSelectedLocation(neighborhood)
                                setDropdownOpen(false)
                              }}
                              className={`w-full text-left px-3 py-2 rounded-md ${selectedLocation === neighborhood ? "bg-blue-500/50 text-white" : "text-white/90 hover:bg-white/10"}`}
                            >
                              {neighborhood}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex items-center">
                <div className="w-20 h-20 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">{safetyScore}</div>
                    <div className="text-xs text-blue-100">Safety Score</div>
                  </div>
                </div>
                <div className="ml-4">
                  <div
                    className={`text-sm font-medium ${safetyScore > 70 ? "text-green-400" : safetyScore > 40 ? "text-yellow-400" : "text-red-400"}`}
                  >
                    {safetyScore > 70 ? "Low Risk" : safetyScore > 40 ? "Moderate Risk" : "High Risk"}
                  </div>
                  <div className="text-xs text-blue-100 mt-1">Last updated: {lastUpdated}</div>
                </div>
              </div>
            </div>

            <div className="relative pt-1 mb-6">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-700">
                <div
                  style={{ width: `${safetyScore}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                ></div>
              </div>
              <div className="mt-2 flex justify-between text-xs text-blue-100">
                <span>0 - High Risk</span>
                <span>50 - Moderate</span>
                <span>100 - Low Risk</span>
              </div>
            </div>

            {/* Crime Statistics Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Low Profile Crimes Table */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Low Profile Crimes in {selectedLocation}
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="px-4 py-2 text-left text-sm font-medium text-blue-200">Type</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-blue-200">Count</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-blue-200">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lowProfileCrimes.map((crime, index) => (
                        <tr key={index} className="border-b border-white/10">
                          <td className="px-4 py-3 text-white">{crime.type}</td>
                          <td className="px-4 py-3 text-white">{crime.count}</td>
                          <td className="px-4 py-3">
                            <div
                              className={`flex items-center ${crime.trend === "down" ? "text-green-400" : "text-red-400"}`}
                            >
                              {crime.trend === "down" ? (
                                <TrendingDown className="h-4 w-4 mr-1" />
                              ) : (
                                <TrendingUp className="h-4 w-4 mr-1" />
                              )}
                              <span>{crime.percent}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Serious Crimes Table */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Serious Crimes in {selectedLocation}
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="px-4 py-2 text-left text-sm font-medium text-blue-200">Type</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-blue-200">Count</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-blue-200">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {seriousCrimes.map((crime, index) => (
                        <tr key={index} className="border-b border-white/10">
                          <td className="px-4 py-3 text-white">{crime.type}</td>
                          <td className="px-4 py-3 text-white">{crime.count}</td>
                          <td className="px-4 py-3">
                            <div
                              className={`flex items-center ${crime.trend === "down" ? "text-green-400" : "text-red-400"}`}
                            >
                              {crime.trend === "down" ? (
                                <TrendingDown className="h-4 w-4 mr-1" />
                              ) : (
                                <TrendingUp className="h-4 w-4 mr-1" />
                              )}
                              <span>{crime.percent}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Crime Breakdown Pie Chart */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <BarChart2 className="h-5 w-5 mr-2" />
                Crime Breakdown for {selectedLocation}
              </h2>

              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                {/* Pie Chart Visualization */}
                <div className="relative w-64 h-64">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* We'll create a simple pie chart with colored segments */}
                    {crimeBreakdown.map((segment, index) => {
                      // Calculate the segment positions
                      const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#6B7280"]
                      const startAngle = crimeBreakdown.slice(0, index).reduce((sum, s) => sum + s.percentage, 0) * 3.6 // 3.6 = 360/100
                      const endAngle = startAngle + segment.percentage * 3.6

                      // Convert angles to radians and calculate coordinates
                      const startRad = ((startAngle - 90) * Math.PI) / 180
                      const endRad = ((endAngle - 90) * Math.PI) / 180

                      const x1 = 50 + 40 * Math.cos(startRad)
                      const y1 = 50 + 40 * Math.sin(startRad)
                      const x2 = 50 + 40 * Math.cos(endRad)
                      const y2 = 50 + 40 * Math.sin(endRad)

                      // Create the arc path
                      const largeArcFlag = segment.percentage > 50 ? 1 : 0
                      const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`

                      return (
                        <path
                          key={index}
                          d={pathData}
                          fill={colors[index % colors.length]}
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth="0.5"
                        />
                      )
                    })}
                  </svg>
                </div>

                {/* Legend */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {crimeBreakdown.map((segment, index) => {
                    const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#6B7280"]
                    return (
                      <div key={index} className="flex items-center">
                        <div
                          className="w-4 h-4 mr-2 rounded-sm"
                          style={{ backgroundColor: colors[index % colors.length] }}
                        ></div>
                        <span className="text-white">
                          {segment.type}: {segment.percentage}%
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* NYC vs Location Comparison */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <BarChart2 className="h-5 w-5 mr-2" />
                {selectedLocation} vs NYC Average: Top 3 Crimes
              </h2>

              <div className="space-y-6">
                {topCrimesComparison.map((crime, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{crime.type}</span>
                      <span className={`text-sm ${crime.difference < 0 ? "text-green-400" : "text-red-400"}`}>
                        {crime.difference < 0 ? "↓" : "↑"} {Math.abs(crime.difference)}% vs NYC Average
                      </span>
                    </div>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs text-blue-200">
                            {selectedLocation}: {crime.locationRate}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-blue-200">NYC Average: {crime.nycAverage}</span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-700">
                        <div
                          style={{
                            width: `${(crime.locationRate / Math.max(crime.locationRate, crime.nycAverage)) * 100}%`,
                          }}
                          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${crime.difference < 0 ? "bg-green-500" : "bg-red-500"}`}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/"
              className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors inline-block"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
