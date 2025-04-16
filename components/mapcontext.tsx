"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface MapContextType {
  mapCenter: { lat: number; lng: number };
  setMapCenter: (center: { lat: number; lng: number }) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 32.7767,  // Default location (Dallas, Texas)
    lng: -96.7970,
  });

  return (
    <MapContext.Provider value={{ mapCenter, setMapCenter }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
};
