"use client";

import Map, { Marker } from "react-map-gl/mapbox";

import "mapbox-gl/dist/mapbox-gl.css";

export default function TripMap() {
  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        longitude: 139.6917,
        latitude: 35.6895,
        zoom: 10,
      }}
      mapStyle="mapbox://styles/mapbox/standard"
      style={{
        width: "100%",
        height: "600px",
      }}
    >
      <Marker longitude={139.6917} latitude={35.6895}>
        <div className="text-3xl">📍</div>
      </Marker>
    </Map>
  );
}
