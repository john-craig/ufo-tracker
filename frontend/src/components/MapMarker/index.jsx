import React from "react";
import { Marker } from "react-simple-maps";

const MapMarker = (props) => {
  const location = props.location;
  const zoom = props.zoom;
  const position = props.position;

  const markerDimension = 100 / zoom;
  const markerOffset = (markerDimension / 2) * -1;

  const HIGHEST_ZOOM = 9;

  const longitude = location["location_coordinates"]["longitude"];
  const latitude = location["location_coordinates"]["latitude"];

  const inView =
    latitude > props.viewCoordinates[0][0] &&
    latitude < props.viewCoordinates[0][1] &&
    longitude > props.viewCoordinates[1][0] &&
    longitude < props.viewCoordinates[1][1];
  const inZoom = zoom > HIGHEST_ZOOM - location["weight"] * HIGHEST_ZOOM;

  return inZoom && inView ? (
    <Marker key={location["sighting_city"]} coordinates={[longitude, latitude]}>
      <svg
        width={markerDimension}
        height={markerDimension}
        x={markerOffset}
        y={markerOffset}
        viewBox="-100 -20 200 20"
        onClick={props.handleMarkerClick}
      >
        <UfoIcon />
        {/* <g
                  fill="none"
                  stroke="#FF5533"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="translate(-12, -24)"
                >
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                </g> */}
        <text
          textAnchor="middle"
          y={15}
          style={{
            fontFamily: "system-ui",
            //fontSize: "15px",
            fill: "#000000",
          }}
        >
          {location["sighting_city"]}
        </text>
        <rect
          id={location["sighting_city"]}
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
  );
};

export default MapMarker;

const UfoIcon = () => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="-100"
      y="-20"
      viewBox="0 0 321 321"
      style={{ enableBackground: "new 0 0 321 321" }}
    >
      <g>
        <path
          style={{ fill: "#FFDA79" }}
          d="M160.5,35.671c-41.387,0-74.937,33.55-74.937,74.937h149.874
          C235.437,69.222,201.886,35.671,160.5,35.671z"
        />
        <polygon
          style={{ fill: "#C7E9F4" }}
          points="313.5,161.345 7.5,161.345 85.563,110.608 235.437,110.608 	"
        />
        <path
          style={{ fill: "#51B3DA" }}
          d="M282.275,202.762H38.725c-17.245,0-31.225-13.98-31.225-31.225v-10.192h306v10.192
          C313.5,188.782,299.52,202.762,282.275,202.762z"
        />
        <circle
          style={{ fill: "#C7E9F4" }}
          cx="82.769"
          cy="266.854"
          r="18.465"
        />
        <circle
          style={{ fill: "#C7E9F4" }}
          cx="238.231"
          cy="266.854"
          r="18.465"
        />
        <path
          style={{ fill: "#13829B" }}
          d="M317.612,155.076c-0.009-0.006-0.016-0.013-0.025-0.019l-74.755-48.587
          c-2.163-43.541-38.263-78.299-82.331-78.299c-44.068,0-80.169,34.757-82.332,78.298c-8.385,5.45-74.773,48.602-74.783,48.608
          C1.345,156.422,0,158.764,0,161.345v10.192c0,21.353,17.372,38.725,38.725,38.725h56.404l-10.404,30.702
          c-10.971-0.821-21.709,5.445-26.038,16.18c-5.366,13.311,1.061,28.423,14.372,33.791c13.311,5.366,28.425-1.06,33.791-14.371
          c4.485-11.12,0.72-23.313-8.122-30.185l12.239-36.117h99.066l12.239,36.117c-8.901,6.945-12.549,19.205-8.122,30.185v0.001
          c5.356,13.28,20.517,19.722,33.792,14.37c13.31-5.367,19.739-20.48,14.371-33.791c-4.406-10.928-15.243-17.018-26.04-16.189
          l-10.401-30.693h56.403c21.353,0,38.726-17.372,38.726-38.725v-10.192C321,158.914,319.78,156.502,317.612,155.076z
           M92.938,270.955L92.938,270.955c-2.261,5.608-8.663,8.329-14.27,6.068c-5.608-2.261-8.33-8.662-6.069-14.27
          c2.263-5.61,8.666-8.33,14.271-6.069C92.49,258.949,95.205,265.333,92.938,270.955z M248.4,262.754
          c2.266,5.618-0.446,12.003-6.068,14.269c-5.608,2.259-12.009-0.461-14.271-6.068c-2.267-5.618,0.447-12.005,6.069-14.27
          C239.733,254.421,246.13,257.119,248.4,262.754z M160.5,43.171c34.649,0,63.279,26.269,67.023,59.937H93.477
          C97.22,69.44,125.85,43.171,160.5,43.171z M87.786,118.108h145.427l54.985,35.737H32.802L87.786,118.108z M306,171.538
          c0,13.082-10.644,23.725-23.726,23.725c-3.285,0-222.818,0-243.549,0C25.643,195.262,15,184.62,15,171.538v-2.692h291V171.538z"
        />
      </g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
      <g></g>
    </svg>
  );
};
