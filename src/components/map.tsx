"use client";

import { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl/mapbox";

import "mapbox-gl/dist/mapbox-gl.css";

type Place = {
  id: number;
  name: string;
  latitude: number | null;
  longitude: number | null;
};

export default function TripMap() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getPlaces() {
      try {
        const res = await fetch("/api/places");
        if (!res.ok) throw new Error("Failed to load places");
        const data = await res.json();
        setPlaces(data);
      } catch (err) {
        setError("Could not load places");
        console.error(err);
      }
    }

    getPlaces();
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden rounded-xl">
      {error && (
        <div className="absolute left-4 top-4 z-10 rounded bg-white p-2 text-sm">
          {error}
        </div>
      )}

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
          height: "100%",
        }}
      >
        {places.map((place) => {
          if (place.latitude === null || place.longitude === null) return null;

          return (
            <Marker
              key={place.id}
              longitude={place.longitude}
              latitude={place.latitude}
              anchor="bottom"
            >
              <div className="cursor-pointer text-3xl">📍</div>
            </Marker>
          );
        })}
      </Map>
    </div>
  );
}
