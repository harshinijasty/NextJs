"use client";

import { useRef, useState } from "react";
import Map from "@/components/map";
import AutocompleteInput from "@/components/autocomplete";
import { MapProvider } from "@/components/mapcontext";
import ColorPicker, { ColorPickerHandle } from "@/components/colorpicker";

const Page = () => {
  const colorRef = useRef<ColorPickerHandle>(null);
  const [polygonColor, setPolygonColor] = useState("#00FF00");

  const handleSetColor = () => {
    const color = colorRef.current?.getColor();
    if (color) {
      setPolygonColor(color);
      console.log("Polygon color set to:", color);
    }
  };

  return (
    <MapProvider>
      <div className="p-4 space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <AutocompleteInput />
          <ColorPicker ref={colorRef} />
          <button
            onClick={handleSetColor}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Set Polygon Color
          </button>
        </div>

        <Map polygonFillColor={polygonColor} />
      </div>
    </MapProvider>
  );
};

export default Page;

  