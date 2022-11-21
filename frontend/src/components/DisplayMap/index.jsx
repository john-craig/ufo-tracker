import React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const DisplayMapInner = () => {
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  return <div ref={ref} />;
};

const DisplayMap = () => {
  // const render = (status: Status) => {
  //     return <h1>{status}</h1>;
  // };

  return (
    <Wrapper apiKey={GOOGLE_API_KEY}>
      <DisplayMapInner />
    </Wrapper>
  );
};

export default DisplayMap;
