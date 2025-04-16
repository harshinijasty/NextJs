"use client";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  DrawingManager,
} from "@react-google-maps/api";
import { useState } from "react";
import { useMap } from "./mapcontext";

// ✅ Declare props interface
interface MapProps {
  polygonFillColor: string;
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

// ✅ Use props in function signature
const Map = ({ polygonFillColor }: MapProps) => {
  const { mapCenter } = useMap();
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: ["places", "drawing"],
  });

  const handlePolygonComplete = (polygon: google.maps.Polygon) => {
    const path = polygon.getPath();
    const coordinates: google.maps.LatLngLiteral[] = [];

    for (let i = 0; i < path.getLength(); i++) {
      const point = path.getAt(i);
      coordinates.push({ lat: point.lat(), lng: point.lng() });
    }

    console.log("Polygon coordinates:", coordinates);
  };

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={mapCenter}
      zoom={10}
      onLoad={(map) => setMap(map)}
      onUnmount={() => setMap(null)}
    >
      <Marker position={mapCenter} />

      <DrawingManager
        onPolygonComplete={handlePolygonComplete}
        options={{
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [google.maps.drawing.OverlayType.POLYGON],
          },
          polygonOptions: {
            fillColor: polygonFillColor,
            fillOpacity: 0.5,
            strokeColor: "#000",
            strokeWeight: 2,
            editable: true,
            zIndex: 1,
          },
        }}
      />
    </GoogleMap>
  );
};

export default Map;






