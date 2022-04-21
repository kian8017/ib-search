import { h, createContext, FunctionalComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import { API_URL } from "../../style/consts";

interface Location {
  abbr: string;
  name: string;
}

const LocationContext = createContext([] as Location[]);

const LocationProvider: FunctionalComponent = (props) => {
  const [locations, setLocations] = useState([] as Location[]);

  useEffect(() => {
    fetch(`${API_URL}/locations`)
      .then((r) => r.json())
      .then((r) => {
        setLocations(r);
      });
  }, []);

  return (
    <LocationContext.Provider value={locations}>
      {props.children}
    </LocationContext.Provider>
  );
};

export { Location, LocationContext, LocationProvider };
