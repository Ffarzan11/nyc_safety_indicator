"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Shield,
  AlertTriangle,
  Info,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import AxiosInstanceAny from "@/components/AxiosInstanceAny";
import AxiosInstance from "@/components/AxiosInstance";

type LocationData = {
  latitude: number;
  longitude: number;
  address: string | null;
  neighborhood: string | null;
};

type SafetyScoreData = {
  score: number;
  area_name: string;
  risk_level: string;
};

type PermissionStatus =
  | "not_asked"
  | "granted"
  | "denied"
  | "unavailable"
  | "insecure_context";

export default function CurrentLocationSafety() {
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionStatus>("not_asked");
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [safetyScoreData, setSafetyScoreData] =
    useState<SafetyScoreData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return null;
      const response = await AxiosInstance.post("/token/refresh/", {
        refresh: refreshToken,
      });
      localStorage.setItem("authToken", response.data.access);
      setToken(response.data.access);
      return response.data.access;
    } catch (err) {
      console.error("Token refresh failed:", err);
      return null;
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.isSecureContext === false) {
      setPermissionStatus("insecure_context");
      setError(
        "Geolocation requires a secure connection (HTTPS). Using demo mode."
      );
      loadDemoLocation();
      return;
    }

    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPermissionStatus("granted");
          const newLocationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: null,
            neighborhood: null,
          };

          setLocationData(newLocationData);
          fetchAddressAndNeighborhood(
            position.coords.latitude,
            position.coords.longitude
          );
          fetchSafetyScoreFromAPI(
            position.coords.latitude,
            position.coords.longitude,
            null
          );
          setIsLoading(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setPermissionStatus("not_asked");
          setIsLoading(false);
        }
      );
    }
  }, []);

  const requestLocationPermission = () => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setPermissionStatus("unavailable");
      setError(
        "Geolocation is not supported by your browser. Using demo mode."
      );
      setIsLoading(false);
      setTimeout(() => loadDemoLocation(), 500);
      return;
    }

    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPermissionStatus("granted");
          const newLocationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: null,
            neighborhood: null,
          };

          setLocationData(newLocationData);
          fetchAddressAndNeighborhood(
            position.coords.latitude,
            position.coords.longitude
          );
          fetchSafetyScoreFromAPI(
            position.coords.latitude,
            position.coords.longitude,
            null
          );
          setIsLoading(false);
        },
        (geoError) => {
          console.error("Geolocation error:", geoError.code, geoError.message);
          setPermissionStatus("denied");
          setIsLoading(false);
          setTimeout(() => loadDemoLocation(), 500);
        }
      );
    } catch (error) {
      console.error("Error requesting geolocation:", error);
      setPermissionStatus("unavailable");
      setError("Unable to access location services. Using demo mode instead.");
      setIsLoading(false);
      setTimeout(() => loadDemoLocation(), 500);
    }
  };

  // Replace your existing fetchAddressAndNeighborhood function with this:
  const fetchAddressAndNeighborhood = async (
    latitude: number,
    longitude: number
  ) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      const response = await fetch(url, {
        headers: { "User-Agent": "SafetyApp/1.0" },
      });

      if (!response.ok) {
        throw new Error(`Geocoding API error: ${response.status}`);
      }

      const data = await response.json();
      const addressObj = data.address || {};

      // Fix: Use multiple possible fields for neighborhood with proper fallbacks
      const neighborhood =
        addressObj.neighbourhood ||
        addressObj.suburb ||
        addressObj.district ||
        addressObj.quarter ||
        addressObj.hamlet ||
        "Unknown Area";

      const city =
        addressObj.city || addressObj.town || addressObj.village || "";
      const state = addressObj.state || "";
      const formattedAddress = [neighborhood, city, state]
        .filter(Boolean)
        .join(", ");

      const updatedLocationData = {
        ...(locationData || { latitude, longitude }),
        address: formattedAddress,
        neighborhood: neighborhood,
      };

      setLocationData(updatedLocationData);

      // Now pass the neighborhood we found to the safety score API
      fetchSafetyScoreFromAPI(latitude, longitude, neighborhood);

      // Log the address data for debugging
      console.log("Address data found:", {
        neighborhood,
        addressObj,
        formattedAddress,
      });
    } catch (error) {
      console.error("Error fetching address and neighborhood:", error);
      setError(
        "Unable to determine your exact location. Showing approximate safety data."
      );
      fetchSafetyScoreFromAPI(latitude, longitude);
    }
  };
  const fetchSafetyScoreFromAPI = async (
    latitude: number,
    longitude: number,
    neighborhood: string | null = null
  ) => {
    try {
      const response = await AxiosInstanceAny.get(`/safety/safety-score/`, {
        params: {
          latitude: latitude,
          longitude: longitude,
        },
      });

      setSafetyScoreData({
        score: response.data.safety_score,
        ...response.data,
      });

      if (response.data.safety_score < 30) {
        let authToken = token || (await refreshAccessToken());
        if (!authToken) return;

        await AxiosInstance.post(
          "/emergency/sendAlert/",
          { location: neighborhood },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
      }
    } catch (error) {
      console.error("Error fetching safety score from API:", error);
    }
  };

  const loadDemoLocation = () => {
    const demoLocationData = {
      latitude: 40.7128,
      longitude: -74.006,
      address: "Manhattan, New York, NY",
      neighborhood: "Manhattan",
    };

    setLocationData(demoLocationData);
    fetchSafetyScoreFromAPI(40.7128, -74.006);
    setPermissionStatus("granted");
    setError("Showing demo data for Manhattan, New York.");
  };

  const viewSafetyReport = () => {
    if (locationData?.neighborhood) {
      router.push(
        `/safety-report?location=${encodeURIComponent(
          locationData.neighborhood
        )}`
      );
    }
  };

  const getSafetyLevel = (score: number) => {
    if (score >= 70) return { text: "Low Risk", color: "text-green-400" };
    if (score >= 40) return { text: "Moderate Risk", color: "text-yellow-400" };
    return { text: "High Risk", color: "text-red-400" };
  };

  return (
    <div className="max-w-3xl mx-auto mb-12">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-1 tracking-wide">
            Your Location Safety Score
          </h3>
          <span className="text-sm text-gray-300 italic mt-[-4px]">
            Covering a 0.4-mile radius
          </span>
        </div>

        {permissionStatus === "not_asked" && (
          <div className="text-center py-4">
            <AlertTriangle className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
            <p className="text-white mb-4">
              Would you like to see safety information for your current
              location?
            </p>
            <button
              onClick={requestLocationPermission}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Getting Location..." : "Share My Location"}
            </button>
            <p className="text-xs text-blue-200 mt-2">
              We only use your location to provide safety information and never
              store it.
            </p>
          </div>
        )}

        {(permissionStatus === "denied" ||
          permissionStatus === "unavailable" ||
          permissionStatus === "insecure_context") &&
          !locationData && (
            <div className="bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-4 text-white mb-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p>{error || "Location services are not available."}</p>
                  <div className="mt-3">
                    <button
                      onClick={() => loadDemoLocation()}
                      className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      View Demo Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        {permissionStatus === "granted" && locationData && (
          <div>
            {error && (
              <div className="bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-3 mb-4 text-white text-sm">
                <div className="flex items-start">
                  <Info className="h-4 w-4 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className="bg-blue-500/20 backdrop-blur-sm rounded-full p-3">
                <MapPin className="h-6 w-6 text-blue-400" />
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      {locationData.neighborhood || "Current Location"}
                    </h4>
                    <p className="text-blue-200 text-sm">
                      {locationData.address ||
                        `${locationData.latitude.toFixed(
                          4
                        )}, ${locationData.longitude.toFixed(4)}`}
                    </p>
                  </div>

                  {safetyScoreData !== null && (
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">
                          {safetyScoreData?.score}
                        </div>
                        <div className="text-xs text-blue-200">
                          Safety Score
                        </div>
                      </div>

                      <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Shield className="h-6 w-6 text-blue-400" />
                      </div>
                    </div>
                  )}
                </div>

                {safetyScoreData !== null && (
                  <div className="mt-4">
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-700">
                        <div
                          style={{ width: `${safetyScoreData?.score}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                        ></div>
                      </div>
                      <div className="mt-1 flex justify-between text-xs text-blue-200">
                        <span>0 - High Risk</span>
                        <span>50 - Moderate</span>
                        <span>100 - Low Risk</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center">
                      <div
                        className={`text-sm font-medium ${
                          getSafetyLevel(safetyScoreData?.score || 0).color
                        }`}
                      >
                        {safetyScoreData?.risk_level ||
                          getSafetyLevel(safetyScoreData?.score || 0).text}
                      </div>
                      <div className="ml-auto">
                        <button
                          onClick={viewSafetyReport}
                          className="flex items-center text-blue-300 hover:text-blue-100 transition-colors"
                        >
                          View Detailed Report
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
