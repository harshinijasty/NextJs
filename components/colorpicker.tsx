"use client";
import { useState, forwardRef, useImperativeHandle } from "react";

export type ColorPickerHandle = {
  getColor: () => string;
};

const ColorPicker = forwardRef<ColorPickerHandle>((_, ref) => {
  const [color, setColor] = useState("#00FF00");

  useImperativeHandle(ref, () => ({
    getColor: () => color,
  }));

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="color">Polygon Color:</label>
      <input
        id="color"
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-10 h-8 p-0 border cursor-pointer"
      />
    </div>
  );
});

export default ColorPicker;

