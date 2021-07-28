import React, { useState, useEffect } from "react";

import * as parkData from "./data/skateboard-parks.json";


export const useMapFacade = () => {
    const [selectedPark, setSelectedPark] = useState(null);

    useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

    return {
        selectedPark,
        setSelectedPark,
    }
}