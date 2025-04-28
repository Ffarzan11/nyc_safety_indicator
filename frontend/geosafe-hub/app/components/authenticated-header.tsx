"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { User, LogOut, Menu, X, MenuSquare } from "lucide-react"
import { useAuth } from "../context/auth-context"
import MapPopup from "./map-popup"
import RightSidebar from "./right-sidebar"
// Import the HeaderMapButton component
// Remove this line:
// import HeaderMapButton from './header-map-button'

export default function AuthenticatedHeader() {
  const { user, logout, isAuthenticated } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [mapPopupOpen, setMapPopupOpen] = useState(false)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false)

  // If not authenticated, show the regular header
  if (!isAuthenticated) {
    return (
      <>
        <header className="container mx-auto px-4 py-4 flex items-center justify-between bg-blue-900/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview-2-Uo72XXQC0ngSlfSM7Bl3ipiWWztm26.png"
              alt="GeoSafe Hub Logo"
              width={40}
              height={40}
              className="rounded-xl"
            />
            <h1 className="text-3xl font-bold text-white">GeoSafe Hub</h1>
          </div>

          <nav className="hidden md:flex items-center justify-center">
            <div className="flex space-x-6">
              <Link href="/features" className="px-3 py-2 rounded-md text-white hover:bg-white/10 transition-colors">
                Features
              </Link>
              <Link
                href="/safety-report"
                className="px-3 py-2 rounded-md text-white hover:bg-white/10 transition-colors"
              >
                Safety Report
              </Link>
              <Link href="/about" className="px-3 py-2 rounded-md text-white hover:bg-white/10 transition-colors">
                About
              </Link>
            </div>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setRightSidebarOpen(true)}
              className="p-2 rounded-md text-white hover:bg-white/10 transition-colors"
              aria-label="Open menu"
            >
              <MenuSquare className="h-6 w-6" />
            </button>
            {/* In the non-authenticated header section, remove: */}
            {/* <HeaderMapButton /> */}
            <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="text-white h-6 w-6" />
            </button>
          </div>
        </header>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden">
            <div className="fixed top-0 right-0 w-full max-w-xs h-full bg-white shadow-lg p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview-2-Uo72XXQC0ngSlfSM7Bl3ipiWWztm26.png"
                    alt="GeoSafe Hub Logo"
                    width={30}
                    height={30}
                    className="rounded-xl"
                  />
                  <h2 className="text-xl font-bold">GeoSafe Hub</h2>
                </div>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>

              <nav className="space-y-1">
                <Link
                  href="/features"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="/safety-report"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Safety Report
                </Link>
                <Link
                  href="/about"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/emergency-contacts"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 text-red-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Emergency Contacts
                </Link>
                <Link
                  href="/safety-report"
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Safety Report
                </Link>
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-200 space-y-2">
                <Link
                  href="/signin"
                  className="block w-full px-3 py-2 text-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="block w-full px-3 py-2 text-center rounded-md bg-blue-500 text-white hover:bg-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Right Sidebar */}
        <RightSidebar isOpen={rightSidebarOpen} onClose={() => setRightSidebarOpen(false)} />

        {/* Map Popup */}
        {mapPopupOpen && <MapPopup onClose={() => setMapPopupOpen(false)} />}
      </>
    )
  }

  // Authenticated header
  return (
    <>
      <header className="container mx-auto px-4 py-4 flex items-center justify-between bg-blue-900/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview-2-Uo72XXQC0ngSlfSM7Bl3ipiWWztm26.png"
            alt="GeoSafe Hub Logo"
            width={40}
            height={40}
            className="rounded-xl"
          />
          <h1 className="text-3xl font-bold text-white">GeoSafe Hub</h1>
        </div>

        <nav className="hidden md:flex items-center justify-center">
          <div className="flex space-x-6">
            <Link href="/dashboard" className="px-3 py-2 rounded-md text-white hover:bg-white/10 transition-colors">
              Dashboard
            </Link>
            <Link href="/safety-report" className="px-3 py-2 rounded-md text-white hover:bg-white/10 transition-colors">
              Safety Report
            </Link>
            <Link href="/about" className="px-3 py-2 rounded-md text-white hover:bg-white/10 transition-colors">
              About
            </Link>
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setRightSidebarOpen(true)}
            className="p-2 rounded-md text-white hover:bg-white/10 transition-colors"
            aria-label="Open menu"
          >
            <MenuSquare className="h-6 w-6" />
          </button>
          {/* Removed bell notification icon */}

          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 text-white hover:text-blue-300 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <span className="hidden sm:inline">{user?.name}</span>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <Link
                  href="/dashboard/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Profile & Settings
                </Link>
                <button
                  onClick={() => {
                    logout()
                    setUserMenuOpen(false)
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="text-white h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden">
          <div className="fixed top-0 right-0 w-full max-w-xs h-full bg-white shadow-lg p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview-2-Uo72XXQC0ngSlfSM7Bl3ipiWWztm26.png"
                  alt="GeoSafe Hub Logo"
                  width={30}
                  height={30}
                  className="rounded-xl"
                />
                <h2 className="text-xl font-bold">GeoSafe Hub</h2>
              </div>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
            </div>

            <nav className="space-y-1">
              <Link
                href="/dashboard"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/safety-report"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Safety Report
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/emergency-contacts"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 text-red-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Emergency Contacts
              </Link>
              <Link
                href="/dashboard/profile"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile & Settings
              </Link>
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  logout()
                  setMobileMenuOpen(false)
                }}
                className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <LogOut className="h-5 w-5 mr-2 text-gray-500" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Right Sidebar */}
      <RightSidebar isOpen={rightSidebarOpen} onClose={() => setRightSidebarOpen(false)} />

      {/* Map Popup */}
      {mapPopupOpen && <MapPopup onClose={() => setMapPopupOpen(false)} />}
    </>
  )
}
