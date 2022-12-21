import React from "react";
import sighting_data from "../../assets/data/ufo_sightings";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import { filterCollisions, mapDisplayThreshholds } from "./utils";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const DisplayMap = () => {
  const [position, setPosition] = React.useState([0, 0]);
  const [zoom, setZoom] = React.useState(1);

  let hotSpots = sighting_data["sightings"].reduce((prev, cur) => {
    let locId = cur["city"];

    if (locId == "") {
      return prev;
    }

    if (locId in prev) {
      prev[locId]["count"] += 1;
      prev[locId]["sightings"].push(cur);
    } else {
      // Filter out anything without a good
      // latitude and longitude
      if ("latitude" in cur && "longitude" in cur) {
        prev[locId] = {
          city: cur["city"],
          count: 1,
          sightings: [cur],
          coordinates: [cur["longitude"], cur["latitude"]],
        };
      }
    }

    return prev;
  }, {});
  // for (var locId in hotSpots) {
  //   if (hotSpots[locId]["count"] < 2) {
  //     delete hotSpots[locId];
  //   }
  // }
  //hotSpots = filterCollisions(hotSpots, 5.0);
  hotSpots = mapDisplayThreshholds(hotSpots);
  hotSpots = Object.keys(hotSpots).map((locId) => {
    let location = hotSpots[locId];
    location["locId"] = locId;
    return location;
  });

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

  const markerDimension = 100 / zoom;
  const markerOffset = (markerDimension / 2) * -1;

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
          {hotSpots.map((spot) =>
            zoom > spot["threshhold"] ? (
              <Marker key={spot["city"]} coordinates={spot["coordinates"]}>
                <svg
                  width={markerDimension}
                  height={markerDimension}
                  x={markerOffset}
                  y={markerOffset}
                  viewBox="-100 -20 200 20"
                  onClick={handleMarkerClick}
                >
                  <g
                    fill="none"
                    stroke="#FF5533"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="translate(-12, -24)"
                  >
                    <circle cx="12" cy="10" r="3" />
                    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                  </g>
                  <text
                    textAnchor="middle"
                    y={15}
                    style={{
                      fontFamily: "system-ui",
                      //fontSize: "15px",
                      fill: "#000000",
                    }}
                  >
                    {spot["city"]}
                  </text>
                  <rect
                    id={spot["city"]}
                    x="-50"
                    y="-25"
                    width="100"
                    height="50"
                    fill="#FFFFFF00"
                  />
                </svg>
              </Marker>
            ) : (
              <></>
            )
          )}
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default DisplayMap;
