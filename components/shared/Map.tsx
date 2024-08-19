// components/Map.js

import React from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const Map = (lat: string, lng: string) => {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 0, // Set the default center latitude
    lng: 0, // Set the default center longitude
  };
  //const googleMapKey = process.env.GOOGLEAPIKEY;
  return (
    <LoadScript googleMapsApiKey="AIzaSyBti8wo3gFt3cUXfe2peKbbJgzkSPnZtRk">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
      >
        <Circle
          center={center}
          radius={1000} // 1km radius in meters
          options={{
            strokeColor: "#000000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#000000",
            fillOpacity: 0.35,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
