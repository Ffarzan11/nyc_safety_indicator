"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Shield, MapPin, ChevronDown } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useParams } from "next/navigation";
import Footer from "..//components/footer";
import ReviewList from "..//components/review-list";
import CrimeChartSection from "..//components/CrimeStats";
import SearchBar from "..//components/SearchBar";
import AxiosInstanceAny from "@/components/AxiosInstanceAny";
import Axios from "axios";
const reverseGeocode = async (latitude: number, longitude: number) => {
  try {
    const response = await Axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    return (
      response.data.address.neighbourhood ||
      response.data.address.suburb ||
      response.data.address.city
    );
  } catch (error) {
    console.error("Reverse geocoding failed:", error);
    return null;
  }
};

// Function to determine current neighborhood
const getCurrentNeighborhood = (
  callback: (neighborhood: string | null) => void
) => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const neighborhood = await reverseGeocode(
          pos.coords.latitude,
          pos.coords.longitude
        );
        callback(neighborhood);
      },
      () => callback(null) // Fallback if geolocation fails
    );
  } else {
    callback(null);
  }
};

function SafetyReportContent() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location");

  const { neighborhood } = useParams(); //dynamic segment

  // NYC locations data
  const nycLocations = {
    boroughs: ["Bronx", "Brooklyn", "Manhattan", "Queens", "Staten Island"],
    neighborhoods: {
      Bronx: [
        "Allerton",
        "Bedford Park",
        "Belmont",
        "Bronx Park",
        "Castle Hill-Unionport",
        "Claremont Park",
        "Claremont Village-Claremont East",
        "Concourse-Concourse Village",
        "Co-op City",
        "Crotona Park",
        "Crotona Park East",
        "Eastchester-Edenwald-Baychester",
        "Ferry Point Park-St. Raymond Cemetery",
        "Fordham Heights",
        "Highbridge",
        "Hunts Point",
        "Hutchinson Metro Center",
        "Kingsbridge Heights-Van Cortlandt Village",
        "Kingsbridge-Marble Hill",
        "Longwood",
        "Melrose",
        "Morrisania",
        "Morris Park",
        "Mott Haven-Port Morris",
        "Mount Eden-Claremont West",
        "Mount Hope",
        "Norwood",
        "Parkchester",
        "Pelham Bay-Country Club-City Island",
        "Pelham Bay Park",
        "Pelham Gardens",
        "Pelham Parkway-Van Nest",
        "Rikers Island",
        "Riverdale-Spuyten Duyvil",
        "Soundview-Bruckner-Bronx River",
        "Soundview-Clason Point",
        "Soundview Park",
        "Throgs Neck-Schuylerville",
        "Tremont",
        "University Heights North-Fordham",
        "University Heights South-Morris Heights",
        "Van Cortlandt Park",
        "Wakefield-Woodlawn",
        "Westchester Square",
        "West Farms",
        "Williamsbridge-Olinville",
        "Woodlawn Cemetery",
        "Yankee Stadium-Macombs Dam Park",
      ],
      Brooklyn: [
        "Barren Island-Floyd Bennett Field",
        "Bath Beach",
        "Bay Ridge",
        "Bedford-Stuyvesant East",
        "Bedford-Stuyvesant West",
        "Bensonhurst",
        "Borough Park",
        "Brighton Beach",
        "Brooklyn Heights",
        "Brooklyn Navy Yard",
        "Brownsville",
        "Bushwick East",
        "Bushwick West",
        "Canarsie",
        "Canarsie Park & Pier",
        "Carroll Gardens-Cobble Hill-Gowanus-Red Hook",
        "Clinton Hill",
        "Coney Island-Sea Gate",
        "Crown Heights North",
        "Crown Heights South",
        "Cypress Hills",
        "Downtown Brooklyn-DUMBO-Boerum Hill",
        "Dyker Beach Park",
        "Dyker Heights",
        "East Flatbush-Erasmus",
        "East Flatbush-Farragut",
        "East Flatbush-Remsen Village",
        "East Flatbush-Rugby",
        "East New York-City Line",
        "East New York-New Lots",
        "East New York North",
        "East Williamsburg",
        "Flatbush",
        "Flatbush West-Ditmas Park-Parkville",
        "Flatlands",
        "Fort Greene",
        "Fort Hamilton",
        "Gravesend East-Homecrest",
        "Gravesend South",
        "Gravesend West",
        "Greenpoint",
        "Green-Wood Cemetery",
        "Highland Park-Cypress Hills Cemeteries South",
        "Holy Cross Cemetery",
        "Kensington",
        "Lincoln Terrace Park",
        "Madison",
        "Mapleton-Midwood West",
        "Marine Park-Mill Basin-Bergen Beach",
        "Marine Park-Plumb Island",
        "McGuire Fields",
        "Midwood",
        "Ocean Hill",
        "Park Slope",
        "Prospect Heights",
        "Prospect Lefferts Gardens-Wingate",
        "Prospect Park",
        "Sheepshead Bay-Manhattan Beach-Gerritsen Beach",
        "South Williamsburg",
        "Spring Creek-Starrett City",
        "Sunset Park Central",
        "Sunset Park East-Borough Park West",
        "Sunset Park West",
        "The Evergreens Cemetery",
        "Williamsburg",
        "Windsor Terrace-South Slope",
      ],
      Manhattan: [
        "Central Park",
        "Chelsea-Hudson Yards",
        "Chinatown-Two Bridges",
        "East Harlem North",
        "East Harlem South",
        "East Midtown-Turtle Bay",
        "East Village",
        "F",
        "Financial District-Battery Park City",
        "Gramercy",
        "Greenwich Village",
        "Hamilton Heights-Sugar Hill",
        "Harlem North",
        "Harlem South",
        "Hell's Kitchen",
        "Highbridge Park",
        "Inwood",
        "Inwood Hill Park",
        "Lower East Side",
        "Manhattanville-West Harlem",
        "Midtown South-Flatiron-Union Square",
        "Midtown-Times Square",
        "Morningside Heights",
        "Murray Hill-Kips Bay",
        "Randall's Island",
        "SoHo-Little Italy-Hudson Square",
        "Stuyvesant Town-Peter Cooper Village",
        "The Battery-Governors Island-Ellis Island-Liberty Island",
        "Tribeca-Civic Center",
        "United Nations",
        "Upper East Side-Carnegie Hill",
        "Upper East Side-Lenox Hill-Roosevelt Island",
        "Upper East Side-Yorkville",
        "Upper West Side Central",
        "Upper West Side-Lincoln Square",
        "Upper West Side-Manhattan Valley",
        "Washington Heights North",
        "Washington Heights South",
        "West Village",
      ],
      Queens: [
        "Alley Pond Park",
        "Astoria Central",
        "Astoria East-Woodside North",
        "Astoria North-Ditmars-Steinway",
        "Astoria Park",
        "Auburndale",
        "Baisley Park",
        "Bayside",
        "Bay Terrace-Clearview",
        "Bellerose",
        "Breezy Point-Belle Harbor-Rockaway Park-Broad Channel",
        "Calvary & Mount Zion Cemeteries",
        "Cambria Heights",
        "College Point",
        "Corona",
        "Cunningham Park",
        "Douglaston-Little Neck",
        "East Elmhurst",
        "East Flushing",
        "Elmhurst",
        "Far Rockaway-Bayswater",
        "Flushing Meadows-Corona Park",
        "Flushing-Willets Point",
        "Forest Hills",
        "Forest Park",
        "Fresh Meadows-Utopia",
        "Glendale",
        "Glen Oaks-Floral Park-New Hyde Park",
        "Highland Park-Cypress Hills Cemeteries North",
        "Hollis",
        "Howard Beach-Lindenwood",
        "Jackson Heights",
        "Jacob Riis Park-Fort Tilden-Breezy Point Tip",
        "Jamaica",
        "Jamaica Bay East",
        "Jamaica Estates-Holliswood",
        "Jamaica Hills-Briarwood",
        "John F. Kennedy International Airport",
        "Kew Gardens",
        "Kew Gardens Hills",
        "Kissena Park",
        "LaGuardia Airport",
        "Laurelton",
        "Long Island City-Hunters Point",
        "Maspeth",
        "Middle Village",
        "Middle Village Cemetery",
        "Mount Olivet & All Faiths Cemeteries",
        "Murray Hill-Broadway Flushing",
        "North Corona",
        "Oakland Gardens-Hollis Hills",
        "Old Astoria-Hallets Point",
        "Ozone Park",
        "Ozone Park North",
        "Pomonok-Electchester-Hillcrest",
        "Queensboro Hill",
        "Queensbridge-Ravenswood-Dutch Kills",
        "Queens Village",
        "Rego Park",
        "Richmond Hill",
        "Ridgewood",
        "Rockaway Beach-Arverne-Edgemere",
        "Rockaway Community Park",
        "Rosedale",
        "South Jamaica",
        "South Ozone Park",
        "South Richmond Hill",
        "Springfield Gardens North-Rochdale Village",
        "Springfield Gardens South-Brookville",
        "St. Albans",
        "St. John Cemetery",
        "St. Michael's Cemetery",
        "Sunnyside",
        "Sunnyside Yards North",
        "Sunnyside Yards South",
        "Whitestone-Beechhurst",
        "Woodhaven",
        "Woodside",
      ],
      "Staten Island": [
        "Annadale-Huguenot-Prince's Bay-Woodrow",
        "Arden Heights-Rossville",
        "Fort Wadsworth",
        "Freshkills Park North",
        "Freshkills Park South",
        "Grasmere-Arrochar-South Beach-Dongan Hills",
        "Great Kills-Eltingville",
        "Great Kills Park",
        "Mariner's Harbor-Arlington-Graniteville",
        "Miller Field",
        "New Dorp-Midland Beach",
        "New Springville-Willowbrook-Bulls Head-Travis",
        "Oakwood-Richmondtown",
        "Port Richmond",
        "Rosebank-Shore Acres-Park Hill",
        "Snug Harbor",
        "St. George-New Brighton",
        "Todt Hill-Emerson Hill-Lighthouse Hill-Manor Heights",
        "Tompkinsville-Stapleton-Clifton-Fox Hills",
        "Tottenville-Charleston",
        "Westerleigh-Castleton Corners",
        "West New Brighton-Silver Lake-Grymes Hill",
      ],
    },
  };

  type LocationType =
    | (typeof nycLocations.boroughs)[number]
    | keyof typeof nycLocations.neighborhoods;

  const [selectedLocation, setSelectedLocation] = useState<LocationType>(
    location ? (location as LocationType) : "Brownsville"
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // For search in dropdown
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]); // For dropdown search
  const [safetyScore, setSafetyScore] = useState(70);
  const [showSeriousCrimes, setShowSeriousCrimes] = useState(false);
  const [selectedCrime, setSelectedCrime] = useState("Theft");
  const [currentNeighborhood, setCurrentNeighborhood] = useState<string | null>(
    null
  );

  // Flatten array for dropdown
  const allLocations = [...Object.values(nycLocations.neighborhoods).flat()];

  // Determine boroname from ntaname
  const getBoronameFromNtaname = (ntaname: string): string | null => {
    for (const [borough, neighborhoods] of Object.entries(
      nycLocations.neighborhoods
    )) {
      if (neighborhoods.includes(ntaname)) {
        return borough;
      }
    }
    return null;
  };

  // Fetch safety score
  const fetchSafetyScore = async (location: string) => {
    if (!location) {
      console.error("No location provided for fetching safety score.");
      return;
    }

    let params = {};

    if (nycLocations.boroughs.includes(location)) {
      params = { boroname: location };
    } else if (allLocations.includes(location)) {
      params = { ntaname: location };
    } else {
      console.error("Invalid location provided:", location);
      return;
    }

    try {
      const response = await AxiosInstanceAny.get("/safety/safety-score/", {
        params,
      });
      setSafetyScore(response.data.safety_score || 70);
    } catch (error: any) {
      console.error(
        "Failed to fetch safety score:",
        error.response?.data || error.message
      );
      setSafetyScore(70);
    }
  };

  // Handle location selection
  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location as LocationType);
    setDropdownOpen(false);
    setSearchQuery(""); // Clear the search query
    fetchSafetyScore(location); // Fetch the safety score for the selected location
  };
  useEffect(() => {
    if (location) {
      setCurrentNeighborhood(location); // Update the state when the query changes
      // Trigger any additional logic, such as fetching data for the new location
      fetchSafetyScore(location);
    }
  }, [location]); // Re-run this effect whenever the location query changes

  // Filter locations based on search query
  useEffect(() => {
    const results = allLocations.filter((location) =>
      location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLocations(results);
  }, [searchQuery]);

  // Fetch safety score for the default location on initial render
  useEffect(() => {
    fetchSafetyScore(selectedLocation);
  }, []); // Empty dependency array ensures this runs only once on mount

  const boroname = nycLocations.boroughs.includes(selectedLocation)
    ? selectedLocation
    : getBoronameFromNtaname(selectedLocation);

  const lastUpdated = "Today at 09:45";

  const router = useRouter();

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
        <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" />
      </div>

      {/* Header */}
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

        <Link
          href="/"
          className="px-4 py-2 border border-white/30 rounded-full text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2 inline" />
          Back to Home
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-xl mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {selectedLocation} Safety Report
                </h1>
                <div className="relative mt-2 w-full">
                  <SearchBar />
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex items-center">
                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">
                      {safetyScore}
                    </div>
                    <div className="text-xs text-blue-100">Safety Score</div>
                  </div>
                </div>
                <div className="ml-4">
                  <div
                    className={`text-sm font-medium ${
                      safetyScore > 70
                        ? "text-green-400"
                        : safetyScore > 40
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {safetyScore > 70
                      ? "Low Risk"
                      : safetyScore > 40
                      ? "Moderate Risk"
                      : "High Risk"}
                  </div>
                  <div className="text-xs text-blue-100 mt-1">
                    Last updated: {lastUpdated}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative pt-1 mb-6">
              <div className="overflow-hidden h-2 rounded bg-gray-700">
                <div
                  style={{ width: `${safetyScore}%` }}
                  className="bg-blue-500 h-full"
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-blue-100">
                <span>0 - High Risk</span>
                <span>50 - Moderate</span>
                <span>100 - Low Risk</span>
              </div>
            </div>

            <div className="mb-8">
              <CrimeChartSection
                ntaname={selectedLocation}
                showSeriousCrimes={showSeriousCrimes}
                setShowSeriousCrimes={setShowSeriousCrimes}
                selectedCrime={selectedCrime}
                setSelectedCrime={setSelectedCrime}
              />
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                <Shield className="inline-block h-5 w-5 mr-2" />
                Community Reviews
              </h2>
              <ReviewList
                ntaname={selectedLocation}
                boroname={boroname || ""}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SafetyReportPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SafetyReportContent />
    </Suspense>
  );
}
