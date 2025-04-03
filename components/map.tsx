"use client";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useState } from "react";
import AutocompleteInput from "./autocomplete";

const containerStyle = {
  width: "100%",
  height: "350px",
};

const defaultCenter = { lat: 32.7767, lng: -96.7970 };

const Map = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error("Google Maps API key is missing!");
    return <p>Error: Google Maps API key is missing!</p>;
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"], // Required for Autocomplete
  });

  const [mapCenter, setMapCenter] = useState(defaultCenter);

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMapCenter(location);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  if (loadError) return <p>Error loading map: {loadError.message}</p>;
  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        {/* <AutocompleteInput onPlaceSelected={setMapCenter} /> */}
        <button
          className="p-2 bg-blue-500 text-white rounded-md"
          onClick={handleCurrentLocation}
        >
          📍 My Location
        </button>
      </div>
      <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={12}>
        <Marker position={mapCenter} />
      </GoogleMap>
    </div>
  );
};

export default Map;



