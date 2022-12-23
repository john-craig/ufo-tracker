import React from "react";
import { getSightings } from "../../services/functions";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import MapMarker from "../MapMarker";
import { filterCollisions, mapDisplayThreshholds } from "./utils";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const DisplayMap = () => {
  const [locations, setLocations] = React.useState([]);
  const [position, setPosition] = React.useState([0, 0]);
  const [zoom, setZoom] = React.useState(1);

  React.useEffect(() => {
    getSightings().then((sightings) => {
      let locLocations = sightings;

      console.log(locLocations[0]);
      console.log(HIGHEST_ZOOM - locLocations[0]["weight"] * HIGHEST_ZOOM);

      setLocations(locLocations);
    });
  }, []);

  const handleMove = (movement) => {
    const x = movement["x"];
    const y = movement["y"];
    const zoom = movement["zoom"];

    setPosition([x, y]);
    setZoom(zoom);
  };

  const handleMarkerClick = (e) => {
    console.log(e.target.id);
  };

  const HIGHEST_ZOOM = 9;

  return (
    <>
      <ComposableMap projection="geoMercator">
        <ZoomableGroup center={[0, 0]} zoom={1} onMove={handleMove}>
          <Geographies geography={geoUrl}>
            {({ geographies, outline }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#456b28"
                  //onClick={(e)=>{console.log("Clicked")}}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
          {locations.map((loc) => (
            <MapMarker
              location={loc}
              zoom={zoom}
              handleMarkerClick={handleMarkerClick}
            />
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default DisplayMap;
