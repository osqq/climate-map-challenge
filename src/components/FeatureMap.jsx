import React, { useEffect, useState } from 'react';
import { Map, Marker, TileLayer, Popup } from "react-leaflet";
import styled from "styled-components";
import L from "leaflet";

const MapContainer = styled(Map)`
    width: 100vw;
    height: 100vh;
    position:absolute;
    top:0px;
`;


// Ugly hack to fix Leaflet icons with leaflet loaders
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const FeatureMap = ({ currentLocation, observationLocations, setSelectedLocation }) => {
  
  return (
    <>
      <MapContainer center={currentLocation} zoom={13}>
        <TileLayer
          url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy;'
          maxZoom={19}
        />
        <Marker position={currentLocation}>
          <Popup>
            Koti
          </Popup>
        </Marker>
        {observationLocations.map(loc => 
          <Marker position={[loc.position.lon, loc.position.lat]} key={loc.info.id} onClick={() => setSelectedLocation(loc.info.id)}>
            <Popup>
              {loc.info.name}
            </Popup>
          </Marker>)}
    </MapContainer>
    </>
  );

}

export default FeatureMap;