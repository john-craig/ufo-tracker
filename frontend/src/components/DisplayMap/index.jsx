import React from "react";
//import { Wrapper, Status } from "@googlemaps/react-wrapper";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const DisplayMap = () => {
  const handleMove = (movement) => {
    const x = movement["x"];
    const y = movement["y"];
    const zoom = movement["zoom"];
  };

  return (
    <ComposableMap projection="geoMercator">
      <ZoomableGroup center={[0, 0]} zoom={1} onMove={handleMove}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default DisplayMap;
