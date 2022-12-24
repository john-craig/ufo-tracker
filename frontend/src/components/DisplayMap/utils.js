import React from "react";

/*
    For performance reasons, we would ideally do all calculations for all of the locations
    up-front and assign them some kind of a "threshhold". If the zoom level becomes greater
    than this threshhold they becomes visible, otherwise they are not visible.

    The density of other locations in the area would be the initial rational for this threshhold.
    If zoomed way out, we only want one location within an area to be visible; whereas as the zoom
    increases, more and more locations can become visible, since they won't appear as tightly-clustered
    on the map.

    When deciding between which locations within a given area should be assigned priority, and thus
    have a lower threshhold than others, two things should be accounted for:
     - the number of sightings in that location
     - the public familiarity of that location (i.e., is it a major city that people would recognize?)
    
    Beyond these criterion a choice would need to be made about which locations would allow for the greatest
    visibility. That is, if there are three cities in a region, all other things being equal, we should try
    to eliminate only one and allow the other two to be visible, rather than eliminating two and allowing
    just one to be visible.
*/

export function mapDisplayThreshholds(locations) {
  const maxVisibility = 9;
  const minVisibility = 1;

  const highestSightings = getHighestSightings(locations);

  for (let i in locations) {
    let loc = locations[i];

    // This gives the location a basic threshhold based
    // on how many sightings it has
    loc["threshhold"] =
      maxVisibility -
      Math.floor((loc["count"] / highestSightings) * maxVisibility);
    locations[i] = loc;
  }

  // Conver to an array
  return locations;
}

// Returns the highest number of sightings for a given
// location
function getHighestSightings(locations) {
  return locations.reduce((highest, cur) => {
    return cur["count"] > highest ? cur["count"] : highest;
  }, 0);
}

//Used to determine if the given city is a large, notable location
export function isMajorCity(city, state) {}

export function isCapitalCity(city, state) {}

// Takes a list of locations and filters out any locations
// which are colliding. Takes the first location by default.
// The O(n) of this is absolutely disgusting.
export function filterCollisions(locations, granularity) {
  let filteredLocations = {};

  for (var locAId in locations) {
    let locA = locations[locAId];
    let hasCollision = false;
    let collisions = {};

    // Determine if this location has any collisions
    // with the given level of granularity
    for (var locBId in locations) {
      let locB = locations[locBId];
      if (isCollision(locA, locB, granularity)) {
        collisions[locBId] = locB;
        hasCollision = true;
      }
    }

    if (hasCollision) {
      let hasPrecedence = true;

      //Check to see if any of the collisions were already
      //added to the filtered list previously
      for (var colId in collisions) {
        if (colId in filteredLocations) {
          hasPrecedence = false;
        }
      }

      // If this is the first location to start
      // colliding with others it has precedence.
      // In the future we'll have a better heuristic for
      // determining precedence.
      if (hasPrecedence) {
        filteredLocations[locAId] = locA;
      }
    } else {
      filteredLocations[locAId] = locA;
    }
  }

  // Conver to an array
  return Object.keys(filteredLocations).map((locId) => {
    let location = filteredLocations[locId];
    location["locId"] = locId;
    return location;
  });
}

// Determines if the coordinates of two locations collide within a certain
// degree of gradularity
export function isCollision(locationA, locationB, granularity) {
  const differenceX = Math.abs(
    Math.abs(locationA["coordinates"][0]) -
      Math.abs(locationB["coordinates"][0])
  );
  const differenceY = Math.abs(
    Math.abs(locationA["coordinates"][1]) -
      Math.abs(locationB["coordinates"][1])
  );

  if (differenceX < granularity && differenceY < granularity) {
    return true;
  } else {
    return false;
  }
}

export function getViewCoordinates(x, y, zoom) {
  // At zoom = 1
  // const TOP_LEFT = [80,160]
  // const BOTTOM_RIGHT = [-80,-180]
  // const CENTER = [0, 0]

  //const adjustedCenter = [x / zoom, y / zoom]
  const adjustedCenter = [x, y];
  const baseDimensions = MAP_VIEWPORT;
  const adjustedDimensions = [
    baseDimensions[0] * zoom,
    baseDimensions[1] * zoom,
  ];

  const adjustedViewPort = [
    [
      adjustedCenter[0] - adjustedDimensions[0] / 2,
      adjustedCenter[0] + adjustedDimensions[0] / 2,
    ],
    [
      adjustedCenter[1] - adjustedDimensions[1] / 2,
      adjustedCenter[1] + adjustedDimensions[1] / 2,
    ],
  ];

  return adjustedViewPort;
}

export const MAP_VIEWPORT = [360, 360];

export function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = React.useRef();
  // Store current value in ref
  React.useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
