"use client";

import { SidebarNav } from "@/components/SidebarNav";
import { Calendar, Map, MapPin, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Trip = {
  id: number;
  name: string;
  updatedAt: string;
  _count: {
    places: number;
  };
};

function formatUpdatedAt(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default function TripsPage() {
  const router = useRouter();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTrips() {
      try {
        const res = await fetch("/api/trips", { cache: "no-store" });

        if (res.status === 401) {
          router.push("/login");
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to load trips");
        }

        const data = (await res.json()) as Trip[];
        setTrips(data);
      } catch (loadError) {
        console.error(loadError);
        setError("Could not load your trips.");
      } finally {
        setIsLoading(false);
      }
    }

    loadTrips();
  }, [router]);

  return (
    <div className="flex min-h-screen bg-surface">
      <SidebarNav active="trips" tripName="Trips Dashboard" />
      <main className="flex-1 min-h-screen overflow-y-auto pb-28 md:pb-0">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-margin-desktop py-8 max-w-container-max mx-auto w-full">
          <div>
            <h2 className="font-display-lg text-display-lg text-primary tracking-tight">
              My Trips
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-xl">
              Pick up an existing itinerary or create a new trip before opening
              the map workspace.
            </p>
          </div>
          <button
            onClick={() => router.push("/trips/new")}
            className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-sm text-label-sm hover:opacity-90 transition-opacity active:scale-95 flex items-center gap-2"
            type="button"
          >
            <Plus className="size-5" />
            New Trip
          </button>
        </header>

        <section className="px-margin-desktop pb-section-gap max-w-container-max mx-auto">
          {isLoading ? (
            <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-8 text-on-surface-variant">
              Loading your trips...
            </div>
          ) : null}

          {!isLoading && error ? (
            <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-8 text-error">
              {error}
            </div>
          ) : null}

          {!isLoading && !error && trips.length === 0 ? (
            <div className="grid min-h-[420px] place-items-center rounded-lg border-2 border-dashed border-outline-variant bg-surface-container-lowest p-8 text-center">
              <div className="max-w-md space-y-5">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary-fixed text-primary">
                  <Map className="size-7" />
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    Start with a trip, then open the map.
                  </h3>
                  <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
                    Give the journey a name first so every stop, note, and map
                    pin has a place to belong.
                  </p>
                </div>
                <button
                  onClick={() => router.push("/trips/new")}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-label-sm text-label-sm text-on-primary"
                  type="button"
                >
                  <Plus className="size-5" />
                  Create First Trip
                </button>
              </div>
            </div>
          ) : null}

          {!isLoading && !error && trips.length > 0 ? (
            <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 xl:grid-cols-3">
              {trips.map((trip) => (
                <button
                  key={trip.id}
                  onClick={() => router.push(`/trips/${trip.id}/edit`)}
                  className="group min-h-60 rounded-lg border border-outline-variant bg-surface-container-lowest p-6 text-left tonal-elevation transition-all hover:-translate-y-0.5 hover:border-primary-fixed hover:shadow-lg"
                  type="button"
                >
                  <div className="flex h-full flex-col justify-between gap-10">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex size-12 items-center justify-center rounded-lg bg-primary-fixed text-primary">
                          <MapPin className="size-6" />
                        </div>
                        <span className="rounded bg-surface-container-low px-2 py-1 text-[12px] text-on-surface-variant">
                          {trip._count.places}{" "}
                          {trip._count.places === 1 ? "stop" : "stops"}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-headline-md text-headline-md text-on-surface">
                          {trip.name}
                        </h3>
                        <p className="mt-2 flex items-center gap-2 text-[13px] text-on-surface-variant">
                          <Calendar className="size-4" />
                          Updated {formatUpdatedAt(trip.updatedAt)}
                        </p>
                      </div>
                    </div>
                    <span className="font-label-sm text-label-sm text-primary">
                      Continue Planning
                    </span>
                  </div>
                </button>
              ))}

              <button
                onClick={() => router.push("/trips/new")}
                className="grid min-h-60 place-items-center rounded-lg border-2 border-dashed border-outline-variant p-6 text-center transition-colors hover:bg-surface-container-low"
                type="button"
              >
                <div className="space-y-3">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary-fixed text-primary">
                    <Plus className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface">
                      New Trip
                    </h3>
                    <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
                      Name the journey before opening the editor.
                    </p>
                  </div>
                </div>
              </button>
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}
