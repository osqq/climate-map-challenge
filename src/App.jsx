import React, { useEffect, useState } from 'react';
import Metolib from '@fmidev/metolib';
import './App.css';
import Sidebar from './components/Sidebar';
import FeatureMap from './components/FeatureMap';
import CustomSpinner from './spinner/CustomSpinner'

const App = () => {
  const [observationLocations, setObservationLocations] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState(null);

  const [currentLocation, setCurrentLocation] = useState([65,26]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(function(position) {
      const currLocation = [position.coords.latitude, position.coords.longitude];
      setCurrentLocation(currLocation);
    });

    const connection = new Metolib.WfsConnection();
    if (connection.connect('http://opendata.fmi.fi/wfs', 'fmi::observations::weather::cities::multipointcoverage')) {
      connection.getData({
        begin: Date.now() - 60e3 * 60 * 24 * 6,
        end: Date.now(),
        requestParameter: "t,snowdepth,r_1h",
        timestep: 60 * 60 * 1000,
        bbox: "20.6455928891, 59.846373196, 31.5160921567, 70.1641930203",
        callback: (data, errors) => {
          if (errors.length > 0) {
            errors.forEach(err => {
              console.error('FMI API error: ' + err.errorText);
            });
            return;
          }

          setObservationLocations(data.locations.map(loc => {
              const [lon, lat] = loc.info.position.map(parseFloat);
              return {...loc, position: {lat, lon}}
            })
          );

          setLoading(false);
          connection.disconnect();
        }
      });
    }
  }, []);
  
  return (
    <div className="App">
      {loading ? (<CustomSpinner/>) : null}
      <Sidebar selectedLocationId={selectedLocation} observationLocations={observationLocations} />
      <FeatureMap currentLocation={currentLocation} observationLocations={observationLocations} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
    </div>
  );

}

export default App;