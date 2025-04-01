"use client";
import { Autocomplete } from "@react-google-maps/api";
import { useRef } from "react";

interface AutocompleteProps {
  onPlaceSelected: (location: { lat: number; lng: number }) => void;
}

const AutocompleteInput = ({ onPlaceSelected }: AutocompleteProps) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry?.location) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        onPlaceSelected(location);
      }
    }
  };

  return (
    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
      <input
        type="text"
        placeholder="Search location..."
        className="w-full p-2 border rounded-md"
      />
    </Autocomplete>
  );
};

export default AutocompleteInput;

