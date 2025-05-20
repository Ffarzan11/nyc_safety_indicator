"use client";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Shield } from "lucide-react";
import Footer from "./components/footer";
import AuthenticatedHeader from "./components/authenticated-header";
import { Suspense } from "react";
import TestimonialMarquee from "./components/testimonial-marquee";
import HeaderMapButton from "./components/header-map-button";
import SearchBar from "./components/SearchBar";
import SafetyLeaderboard from "./components/safety-leaderboard";

// Import the NewsHeadlines component at the top of the file
import NewsHeadlines from "./components/news-headlines";
import CurrentLocationSafety from "./components/current-location-safety";
import { useState, useEffect } from "react"; // Import useState and useEffect
import { useRouter } from "next/router"; // If needed, to redirect if user is authenticated

// Dummy UserDashboardPreview component to resolve the error
function UserDashboardPreview() {
  return <div>{/* Placeholder for User Dashboard Preview */}</div>;
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Replace with your JWT check logic
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

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

      {/* Content */}
      <div className="relative z-10">
        <Suspense fallback={null}>
          <AuthenticatedHeader />
        </Suspense>

        <main className="flex-1">
          <section className="container mx-auto px-4 py-12 text-center text-white">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Know Your Neighborhood's Safety
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-12">
              Explore safety information for any location. Make informed
              decisions about where to live, work, or visit.
            </p>

            <div className="max-w-3xl mx-auto mb-4 flex items-center">
              <div className="relative flex-grow">
                <SearchBar />
              </div>
              <div className="ml-2">
                <HeaderMapButton />
              </div>
            </div>

            <p className="text-gray-300 mb-12">
              Try searching for "Woodside" or "Alley Pond Park"
            </p>
            {/* And add the NewsHeadlines component after it: */}
            <div className="max-w-md mx-auto mb-12">
              <NewsHeadlines />
            </div>
            {/* Add the CurrentLocationSafety component after NewsHeadlines */}
            <div className="max-w-md mx-auto mb-12">
              <CurrentLocationSafety />
            </div>
            {/* The grid of locations should follow after this */}
            {/* Safety leaderboard: */}
            <div className="mt-8">
               <SafetyLeaderboard />
            </div>
            

            {/* Only show these sections to non-authenticated users */}
            {!isAuthenticated && (
              <>
                {/* Features Section with adjusted styling for dark background */}
                <section className="max-w-6xl mx-auto mt-24 px-4">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">
                      Explore Safety Information Your Way
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                      GeoSafe Hub provides valuable safety insights whether
                      you're a visitor or a registered user.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12 mb-16">
                    <div className="rounded-xl p-8 border border-white/20 bg-black/30 backdrop-blur-sm">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mr-4">
                          <MapPin className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-bold">
                          Without Signing In
                        </h3>
                      </div>

                      <ul className="space-y-4">
                        <li className="flex">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-green-500 mr-3 flex-shrink-0"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>
                            Search any location for basic safety scores
                          </span>
                        </li>
                        <li className="flex">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-green-500 mr-3 flex-shrink-0"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>
                            View safety ratings for popular neighborhoods
                          </span>
                        </li>

                        <li className="flex">
                          <svg
                            xmlns="http://www.w3.org/24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-green-500 mr-3 flex-shrink-0"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>Access the interactive safety map</span>
                        </li>
                        <li className="flex">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-green-500 mr-3 flex-shrink-0"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>
                            Compare safety scores between different areas
                          </span>
                        </li>
                      </ul>

                      <div className="mt-8">
                        <button className="px-6 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm">
                          Try Now - No Login Required
                        </button>
                      </div>
                    </div>

                    <div className="rounded-xl p-8 border border-white/20 bg-black/30 backdrop-blur-sm">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mr-4">
                          <Shield className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-bold">With an Account</h3>
                      </div>

                      <ul className="space-y-4">
                        <li className="flex">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-green-500 mr-3 flex-shrink-0"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <span>All features available to visitors</span>
                        </li>
                      </ul>

                      <div className="mt-8">
                        <Link
                          href="/register"
                          className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                        >
                          Create Free Account
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}

            {/* User Dashboard Section - Only visible when logged in */}
            <Suspense fallback={null}>
              <UserDashboardPreview />
            </Suspense>
          </section>
        </main>

        {/* Add the testimonial marquee before the footer */}
        {!isAuthenticated && <TestimonialMarquee />}

        <Footer />
      </div>
    </div>
  );
}
