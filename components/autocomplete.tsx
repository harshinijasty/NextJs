"use client";

import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { useRef } from "react";
import { useMap } from "./mapcontext";

const AutocompleteInput = () => {
  const { setMapCenter } = useMap();
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Ensure Google Maps API is loaded before rendering the component
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places", "drawing"], // Required for Autocomplete to work
  });

  if (!isLoaded) return <p>Loading Autocomplete...</p>; // Prevent render before API is ready

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry?.location) {
        setMapCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not fetch location. Please enable GPS.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Autocomplete Input */}
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Search location..."
          className="w-full p-2 border rounded-md"
        />
      </Autocomplete>

      {/* 🌍 Button to get current location */}
      <button
        onClick={getCurrentLocation}
        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Current Location
      </button>
    </div>
  );
};

export default AutocompleteInput;



