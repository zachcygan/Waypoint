"use client";

import { SidebarNav } from "@/components/SidebarNav";
import TripMap from "@/components/trip-map";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  MoreHorizontal,
  Search,
  Share2,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type Place = {
  id: number;
  name: string;
  description: string | null;
};

type Trip = {
  id: number;
  name: string;
  destination: string | null;
  centerLatitude: number | null;
  centerLongitude: number | null;
  mapZoom: number | null;
  updatedAt: string;
  _count: {
    places: number;
  };
};

export default function TripEditorPage() {
  const router = useRouter();
  const params = useParams<{ tripId: string }>();
  const tripId = useMemo(() => Number.parseInt(params.tripId, 10), [params]);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);
  const [isLoadingTrip, setIsLoadingTrip] = useState(true);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(true);
  const [placesError, setPlacesError] = useState<string | null>(null);
  const enrichedPlaceIds = useRef(new Set<number>());

  useEffect(() => {
    if (Number.isNaN(tripId)) {
      router.push("/trips");
      return;
    }

    async function loadTrip() {
      try {
        const res = await fetch(`/api/trips/${tripId}`, { cache: "no-store" });

        if (res.status === 401) {
          router.push("/login");
          return;
        }

        if (res.status === 404) {
          router.push("/trips");
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to load trip");
        }

        const data = (await res.json()) as Trip;
        setTrip(data);
      } catch (error) {
        console.error(error);
        router.push("/trips");
      } finally {
        setIsLoadingTrip(false);
      }
    }

    loadTrip();
  }, [router, tripId]);

  useEffect(() => {
    if (Number.isNaN(tripId)) {
      return;
    }

    async function getPlaces() {
      try {
        const res = await fetch(`/api/places?tripId=${tripId}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to load places");
        }

        const data = (await res.json()) as Place[];
        setPlaces(data);
        setSelectedPlaceId(data[0]?.id ?? null);
      } catch (error) {
        console.error(error);
        setPlacesError("Could not load places");
      } finally {
        setIsLoadingPlaces(false);
      }
    }

    getPlaces();
  }, [tripId]);

  useEffect(() => {
    async function enrichMissingDescriptions() {
      const placesToEnrich = places.filter(
        (place) =>
          !place.description?.trim() && !enrichedPlaceIds.current.has(place.id),
      );

      if (placesToEnrich.length === 0) {
        return;
      }

      await Promise.all(
        placesToEnrich.map(async (place) => {
          enrichedPlaceIds.current.add(place.id);

          try {
            const res = await fetch(`/api/places/${place.id}/description`, {
              method: "POST",
              cache: "no-store",
            });

            if (!res.ok) {
              return;
            }

            const data = (await res.json()) as { description?: string };

            if (!data.description?.trim()) {
              return;
            }

            setPlaces((currentPlaces) =>
              currentPlaces.map((currentPlace) =>
                currentPlace.id === place.id
                  ? {
                      ...currentPlace,
                      description: data.description ?? null,
                    }
                  : currentPlace,
              ),
            );
          } catch (error) {
            console.error(error);
          }
        }),
      );
    }

    enrichMissingDescriptions();
  }, [places]);

  const selectedPlace =
    places.find((place) => place.id === selectedPlaceId) ?? places[0] ?? null;
  const initialViewState =
    trip?.centerLatitude !== null &&
    trip?.centerLatitude !== undefined &&
    trip?.centerLongitude !== null &&
    trip?.centerLongitude !== undefined
      ? {
          latitude: trip.centerLatitude,
          longitude: trip.centerLongitude,
          zoom: trip.mapZoom ?? 8,
        }
      : undefined;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface">
      <SidebarNav
        active="editor"
        tripId={Number.isNaN(tripId) ? undefined : tripId}
        tripName={trip?.name ?? "Trip Editor"}
      />
      <main className="flex h-full flex-1 flex-col overflow-hidden">
        <header className="z-20 flex h-20 shrink-0 items-center justify-between border-b border-outline-variant bg-surface-container-lowest px-5 md:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <button
              onClick={() => router.push("/trips")}
              className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant transition-colors hover:bg-surface-container-low"
              type="button"
            >
              <ArrowLeft className="size-5" />
            </button>
            <div className="min-w-0">
              <h1 className="truncate font-headline-md text-headline-md text-on-surface">
                {isLoadingTrip ? "Loading trip..." : trip?.name}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-[12px] text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <MapPin className="size-3.5" />
                  {trip?.destination ?? `${places.length} ${places.length === 1 ? "stop" : "stops"}`}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarDays className="size-3.5" />
                  Unscheduled
                </span>
                <span className="flex items-center gap-1">
                  <Clock3 className="size-3.5" />
                  Saved
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="hidden items-center gap-2 rounded-lg border border-outline-variant px-4 py-2 font-label-sm text-label-sm text-on-surface transition-colors hover:bg-surface-container-low sm:flex"
              type="button"
            >
              <Share2 className="size-4" />
              Share
            </button>
            <button
              className="flex size-10 items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant transition-colors hover:bg-surface-container-low"
              type="button"
            >
              <MoreHorizontal className="size-5" />
            </button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 pb-28 md:pb-0">
          <aside className="z-10 hidden h-full w-88 shrink-0 flex-col border-r border-outline-variant bg-surface md:flex">
            <div className="space-y-4 border-b border-outline-variant/30 p-5">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-outline transition-colors group-focus-within:text-primary" />
                <input
                  className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest py-3 pl-10 pr-4 font-body-md text-body-md text-on-surface outline-none transition-colors focus:border-primary"
                  placeholder="Search or add a place"
                  type="text"
                />
              </div>
              <div className="flex items-center justify-between">
                <h2 className="font-headline-md text-[18px] text-on-surface">
                  Itinerary
                </h2>
                <span className="rounded bg-primary-fixed px-2 py-1 font-label-sm text-label-sm text-primary">
                  Unscheduled
                </span>
              </div>
            </div>

            <div className="custom-scrollbar flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                <label className="px-2 font-label-sm text-label-sm uppercase tracking-widest text-outline">
                  Stops
                </label>

                {isLoadingPlaces ? (
                  <div className="p-4 text-[12px] text-on-surface-variant">
                    Loading your places...
                  </div>
                ) : null}

                {!isLoadingPlaces && placesError ? (
                  <div className="p-4 text-[12px] text-error">
                    {placesError}
                  </div>
                ) : null}

                {!isLoadingPlaces && !placesError && places.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-outline-variant p-4 text-[12px] text-on-surface-variant">
                    No saved places yet. Search for a place to begin shaping
                    this trip.
                  </div>
                ) : null}

                {!isLoadingPlaces && !placesError
                  ? places.map((place, index) => (
                      <button
                        key={place.id}
                        onClick={() => setSelectedPlaceId(place.id)}
                        onDoubleClick={() => router.push(`/place/${place.id}`)}
                        className={`flex w-full cursor-pointer gap-4 rounded-lg border p-4 text-left transition-all ${
                          selectedPlace?.id === place.id
                            ? "border-primary-fixed bg-primary-fixed/35"
                            : "border-transparent bg-surface-container-lowest hover:border-primary-fixed"
                        }`}
                        type="button"
                      >
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary-fixed text-secondary">
                          <span className="font-label-sm text-label-sm">
                            {index + 1}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate font-label-sm text-label-sm text-on-surface">
                            {place.name}
                          </h3>
                          <p className="mt-1 line-clamp-2 text-[12px] text-on-surface-variant">
                            {place.description ?? "No description yet"}
                          </p>
                        </div>
                      </button>
                    ))
                  : null}
              </div>
            </div>
          </aside>

          <section className="relative h-full flex-1 overflow-hidden bg-surface-container">
            <TripMap
              initialViewState={initialViewState}
              tripId={Number.isNaN(tripId) ? undefined : tripId}
            />
          </section>

          <aside className="z-10 hidden h-full w-80 shrink-0 border-l border-outline-variant bg-surface-container-lowest p-5 lg:block">
            <div className="space-y-5">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">
                  Selected Place
                </span>
                <h2 className="mt-2 font-headline-md text-headline-md text-on-surface">
                  {selectedPlace?.name ?? "No place selected"}
                </h2>
                <p className="mt-2 text-[13px] leading-6 text-on-surface-variant">
                  {selectedPlace?.description ??
                    "Select a stop from the itinerary to review notes, details, and planning actions."}
                </p>
              </div>

              {selectedPlace ? (
                <div className="space-y-3">
                  <button
                    onClick={() => router.push(`/place/${selectedPlace.id}`)}
                    className="w-full rounded-lg bg-primary px-4 py-3 font-label-sm text-label-sm text-on-primary transition-opacity hover:opacity-90"
                    type="button"
                  >
                    Open Place Details
                  </button>
                  <button
                    className="w-full rounded-lg border border-outline-variant px-4 py-3 font-label-sm text-label-sm text-on-surface transition-colors hover:bg-surface-container-low"
                    type="button"
                  >
                    Move to Day 1
                  </button>
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
