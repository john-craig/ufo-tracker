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
import { getViewCoordinates, MAP_VIEWPORT, usePrevious } from "./utils";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const DisplayMap = () => {
  const [viewCoordinates, setViewCoordinates] = React.useState(MAP_VIEWPORT);
  const [locations, setLocations] = React.useState([]);
  const [position, setPosition] = React.useState([0, 0]);
  const [zoom, setZoom] = React.useState(1);

  const prevZoom = usePrevious(zoom);

  React.useEffect(() => {
    getSightings().then((sightings) => {
      let locLocations = sightings;

      console.log(locLocations[0]);

      setLocations(locLocations);
    });
  }, []);

  const handleMove = (movement) => {
    const x = movement["x"];
    const y = movement["y"];
    const zoom = movement["zoom"];

    // Only do this if the zoom as changed by an
    // appreciable degree
    if (Math.abs(zoom - prevZoom) > 0.25) {
      setPosition([x, y]);
      setZoom(zoom);

      setViewCoordinates(getViewCoordinates(x, y, zoom));
    }
  };

  const handleMarkerClick = (e) => {
    console.log(e.target.id);
  };

  return (
    <>
      <ComposableMap projection="geoMercator">
        <ZoomableGroup
          center={[0, 0]}
          zoom={1}
          onMove={handleMove}
          translateExtent={[
            [-80, -160],
            [880, 780],
          ]}
        >
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
              viewCoordinates={viewCoordinates}
              handleMarkerClick={handleMarkerClick}
            />
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default DisplayMap;
