import React from "react";
import sighting_data from "../../assets/data/ufo_sightings";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const DisplayMap = () => {
  const [position, setPosition] = React.useState([0, 0]);
  const [zoom, setZoom] = React.useState(1);

  let hotSpots = sighting_data["sightings"].reduce((prev, cur) => {
    let city = cur["city"];

    if (city == "") {
      return prev;
    }

    if (city in prev) {
      prev[city]["count"] += 1;
      prev[city]["sightings"].push(cur);
    } else {
      // Filter out anything without a good
      // latitude and longitude
      if ("latitude" in cur && "longitude" in cur) {
        prev[city] = {
          count: 1,
          sightings: [cur],
          coordinates: [cur["longitude"], cur["latitude"]],
        };
      }
    }

    return prev;
  }, {});
  for (var city in hotSpots) {
    if (hotSpots[city]["count"] < 2) {
      delete hotSpots[city];
    }
  }

  const handleMove = (movement) => {
    const x = movement["x"];
    const y = movement["y"];
    const zoom = movement["zoom"];

    setPosition([x, y]);
    setZoom(zoom);
  };

  const markerDimension = 50 / zoom;
  const markerOffset = (markerDimension / 2) * -1;

  return (
    <>
      <ComposableMap projection="geoMercator">
        <ZoomableGroup center={[0, 0]} zoom={1} onMove={handleMove}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
          {Object.keys(hotSpots).map((city) => (
            <Marker key={city} coordinates={hotSpots[city]["coordinates"]}>
              <svg
                width={markerDimension}
                height={markerDimension}
                x={markerOffset}
                y={markerOffset}
                viewBox="-50 -20 100 20"
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
                    fill: "#5D5A6D",
                  }}
                >
                  {city}
                </text>
              </svg>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default DisplayMap;
