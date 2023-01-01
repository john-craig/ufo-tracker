import React from "react";
import { Typography, Box, Modal } from "@material-ui/core";
import SightingShape from "../SightingShape";

const LocationModal = (props) => {
  const location = props.selectedLocation;
  const isOpen = location != undefined;

  let sightings = [];
  let locationName = "";
  let locationCountry = "";
  let numSightings = "";

  if (isOpen) {
    sightings = location["sightings_list"];

    locationName = sightings[0]["city"] + ", " + sightings[0]["state"];
    locationCountry = sightings[0]["country"];
    numSightings = location["sightings_count"];
  }

  const style = {
    position: "absolute",
    top: "3vh",
    left: "3vh",
    bgcolor: "#AAAAAA",
    width: "30%",
    height: "80%",
    borderRadius: "10px",
  };

  const locationNameStyle = {
    margin: "5px",
    marginBottom: "0px",
    "font-size": "25px",
  };

  const locationCountryStyle = {
    margin: "2px",
    marginTop: "0px",
    marginRight: "0px",
    textAlign: "right",
  };

  const numSightingStyle = {
    "font-size": "20px",
    margin: "10px",
  };

  return (
    <Modal
      open={isOpen}
      hideBackdrop={true}
      //disableEnforceFocus
    >
      <Box sx={style}>
        <div
          style={{
            margin: "15px",
            display: "inline-block",
          }}
        >
          <Typography style={locationNameStyle}>{locationName}</Typography>
          <Typography align="right" style={locationCountryStyle}>
            {locationCountry}
          </Typography>
        </div>
        <Typography style={numSightingStyle}>
          {"Sightings: " + numSightings}
        </Typography>
        <SightingList sightings={sightings} />
      </Box>
    </Modal>
  );
};

const SightingList = (props) => {
  const sightings = props.sightings;

  return <SightingEntry sighting={sightings[0]} />;
};

const SightingEntry = (props) => {
  const sighting = props.sighting;

  const sightingTime = sighting["time"];
  const sightingDuration = sighting["duration"];
  const sightingSummary = sighting["summary"];
  const sightingShape = sighting["shape"];

  return (
    <div style={{ marginLeft: "10px" }}>
      <SightingShape />
      {"Shape: " + sightingShape}
    </div>
  );
};

export default LocationModal;
