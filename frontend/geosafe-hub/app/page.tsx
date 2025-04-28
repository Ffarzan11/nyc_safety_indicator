"use client"

import Link from "next/link"
import { MapPin, Shield, AlertTriangle, TrendingUp, Bell, ArrowRight, Search, Phone } from "lucide-react"

export default function Dashboard() {
  // Mock data for the dashboard
  const safetyScore = 78
  const savedLocations = [
    { id: 1, name: "Home", address: "123 Main St, Brooklyn, NY 11201", score: 82 },
    { id: 2, name: "Work", address: "456 Park Ave, Manhattan, NY 10022", score: 75 },
    { id: 3, name: "Gym", address: "789 Fitness Blvd, Queens, NY 11106", score: 68 },
  ]

  const recentAlerts = [
    { id: 1, type: "Crime", location: "Near Work", time: "2 hours ago", message: "Reported theft in the area" },
    { id: 2, type: "Traffic", location: "Route to Work", time: "5 hours ago", message: "Major accident on I-95" },
    { id: 3, type: "Weather", location: "Brooklyn", time: "1 day ago", message: "Flash flood warning" },
  ]

  const safetyTips = [
    {
      id: 1,
      title: "Stay aware of your surroundings",
      description: "Always be mindful of what's happening around you, especially in unfamiliar areas.",
    },
    {
      id: 2,
      title: "Keep emergency contacts updated",
      description: "Make sure your emergency contacts are current and easily accessible.",
    },
    {
      id: 3,
      title: "Plan your route ahead of time",
      description: "Research and plan your travel routes, especially when visiting new locations.",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="mt-3 sm:mt-0 relative rounded-md shadow-sm max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            placeholder="Search locations..."
          />
        </div>
      </div>

      {/* Safety Score Card */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Your Overall Safety Score</h2>
              <p className="mt-1 text-sm text-gray-500">Based on your saved locations and preferences</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center">
                <Shield className="h-12 w-12 text-blue-500" />
                <div className="ml-4">
                  <div className="text-4xl font-bold text-gray-900">{safetyScore}</div>
                  <div className="text-sm text-gray-500">out of 100</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${safetyScore}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                ></div>
              </div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>0 - Unsafe</span>
              <span>50 - Moderate</span>
              <span>100 - Very Safe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Saved Locations</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">3</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link href="/dashboard/saved-locations" className="font-medium text-blue-600 hover:text-blue-500">
                View all<span className="sr-only"> saved locations</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Alerts</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">2</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link href="/dashboard/alerts" className="font-medium text-blue-600 hover:text-blue-500">
                View all<span className="sr-only"> alerts</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Safety Trend</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">+5%</div>
                    <span className="ml-2 text-sm font-medium text-green-600">Improving</span>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link href="/dashboard/reports" className="font-medium text-blue-600 hover:text-blue-500">
                View reports<span className="sr-only"> on safety trends</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Notification Settings</dt>
                  <dd className="flex items-baseline">
                    <div className="text-lg font-semibold text-gray-900">Customized</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link href="/dashboard/settings" className="font-medium text-blue-600 hover:text-blue-500">
                Update settings<span className="sr-only"> for notifications</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Emergency Contacts</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">2</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link href="/emergency-contacts-management" className="font-medium text-blue-600 hover:text-blue-500">
                Manage contacts<span className="sr-only"> for emergency situations</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Locations and Recent Alerts */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Saved Locations */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Saved Locations</h3>
              <Link href="/dashboard/saved-locations" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                View all
              </Link>
            </div>
          </div>
          <ul className="divide-y divide-gray-200">
            {savedLocations.map((location) => (
              <li key={location.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <MapPin className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{location.name}</p>
                      <p className="text-sm text-gray-500">{location.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center bg-blue-100 px-2.5 py-0.5 rounded-full">
                      <Shield className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-sm font-medium text-blue-800">{location.score}</span>
                    </div>
                    <Link
                      href={`/dashboard/saved-locations/${location.id}`}
                      className="ml-4 text-gray-400 hover:text-gray-500"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="px-4 py-4 border-t border-gray-200 sm:px-6">
            <button className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Add New Location
            </button>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Alerts</h3>
              <Link href="/dashboard/alerts" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                View all
              </Link>
            </div>
          </div>
          <ul className="divide-y divide-gray-200">
            {recentAlerts.map((alert) => (
              <li key={alert.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {alert.type} Alert - {alert.location}
                      </p>
                      <p className="text-sm text-gray-500">{alert.message}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500">{alert.time}</span>
                    <Link href={`/dashboard/alerts/${alert.id}`} className="ml-4 text-gray-400 hover:text-gray-500">
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="px-4 py-4 border-t border-gray-200 sm:px-6">
            <Link
              href="/dashboard/alerts/settings"
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Manage Alert Settings
            </Link>
          </div>
        </div>
      </div>

      {/* Safety Tips */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Safety Tips</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {safetyTips.map((tip) => (
              <div key={tip.id} className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition-colors">
                <h4 className="text-lg font-medium text-gray-900 mb-2">{tip.title}</h4>
                <p className="text-sm text-gray-500">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
