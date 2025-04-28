"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Home, User, LogOut, Menu, X, Star } from "lucide-react"
import { usePathname } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: Home },
    { name: "Saved Locations", href: "/dashboard/saved-locations", icon: Star },
    { name: "Profile & Settings", href: "/dashboard/profile", icon: User },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <div className="fixed inset-0 bg-gray-900/80 z-40" style={{ display: sidebarOpen ? "block" : "none" }} />

        <div
          className={`fixed inset-y-0 left-0 z-50 w-72 bg-white transition-transform duration-300 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview-2-Uo72XXQC0ngSlfSM7Bl3ipiWWztm26.png"
                alt="GeoSafe Hub Logo"
                width={40}
                height={40}
                className="rounded-xl"
              />
              <span className="text-xl font-bold">GeoSafe Hub</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col h-[calc(100%-4rem)] p-4 overflow-y-auto">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    pathname === item.href ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${pathname === item.href ? "text-blue-600" : "text-gray-400"}`} />
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="mt-auto pt-4 border-t border-gray-200">
              <Link
                href="/"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
              >
                <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                Sign Out
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex items-center h-16 px-4 border-b border-gray-200">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview-2-Uo72XXQC0ngSlfSM7Bl3ipiWWztm26.png"
                alt="GeoSafe Hub Logo"
                width={40}
                height={40}
                className="rounded-xl"
              />
              <span className="text-xl font-bold">GeoSafe Hub</span>
            </Link>
          </div>
          <nav className="flex flex-col flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    pathname === item.href ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${pathname === item.href ? "text-blue-600" : "text-gray-400"}`} />
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="mt-auto pt-4 border-t border-gray-200">
              <Link
                href="/"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
              >
                <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                Sign Out
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 sm:px-6 lg:px-8">
          <button
            type="button"
            className="lg:hidden -ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-4 ml-auto">
            <button className="relative p-1 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-600">
              <span className="sr-only">View notifications</span>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            <div className="flex items-center">
              <div className="relative flex-shrink-0">
                <button className="flex text-sm bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <span className="sr-only">Open user menu</span>
                  <User className="h-8 w-8 p-1 rounded-full" />
                </button>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">John Doe</p>
                <p className="text-xs text-gray-500">john.doe@example.com</p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
