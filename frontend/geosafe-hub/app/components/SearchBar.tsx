"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { MapPin } from "lucide-react";

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
  | keyof typeof nycLocations.neighborhoods
  | (typeof nycLocations.boroughs)[number];

interface SearchBarProps {
  onNeighborhoodSelect?: (neighborhood: string) => void; //callback for map page
}

const allNeighborhoods = Object.values(nycLocations.neighborhoods).flat();
const allLocations = [...nycLocations.boroughs, ...allNeighborhoods];

const SearchBar: React.FC<SearchBarProps> = ({ onNeighborhoodSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (searchTerm) {
      const filtered = allLocations.filter((location) =>
        location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSelect = (location: string) => {
    setSearchTerm("");
    setSuggestions([]);

    // Redirect using query parameters and force a page refresh
    if (pathname.startsWith("/safety-report")) {
      router.push(`/safety-report?location=${encodeURIComponent(location)}`);
      window.location.reload(); // Force a full page reload
    } else if (pathname === "/map") {
      if (onNeighborhoodSelect) {
        onNeighborhoodSelect(location);
      }
      // Trigger map navigation or sidebar update
    } else if (pathname === "/") {
      router.push(`/safety-report?location=${encodeURIComponent(location)}`);
      window.location.reload(); // Force a full page reload
    }
  };

  return (
    <div className="relative">
      <div className="flex">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MapPin className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search for a neighborhood..."
            className="w-full py-2 pl-10 pr-4 bg-white/10 backdrop-blur-md rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-300 border border-white/30"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => {
            if (searchTerm) {
              handleSelect(searchTerm);
            }
          }}
          className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          disabled={!searchTerm}
        >
          Search
        </button>
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-black/90 backdrop-blur-md border border-white/30 rounded-md shadow-lg max-h-48 overflow-y-auto">
          {suggestions
            .sort((a, b) => a.localeCompare(b))
            .map((suggestion) => (
              <li
                key={suggestion}
                className="px-4 py-2 text-white hover:bg-white/10 cursor-pointer"
                onClick={() => handleSelect(suggestion)}
              >
                {suggestion}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
