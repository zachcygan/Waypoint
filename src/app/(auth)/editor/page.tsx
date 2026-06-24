"use client";
import TripMap from "@/components/trip-map";
import { SidebarNav } from "@/components/SidebarNav";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

type Place = {
  id: number;
  name: string;
  description: string | null;
};

export default function EditorRoutePage() {
  const router = useRouter();
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(true);
  const [placesError, setPlacesError] = useState<string | null>(null);
  const enrichedPlaceIds = useRef(new Set<number>());

  useEffect(() => {
    async function getPlaces() {
      try {
        const res = await fetch("/api/places", { cache: "no-store" });

        if (!res.ok) {
          throw new Error("Failed to load places");
        }

        const data: Place[] = await res.json();
        setPlaces(data);
      } catch (error) {
        console.error(error);
        setPlacesError("Could not load places");
      } finally {
        setIsLoadingPlaces(false);
      }
    }

    getPlaces();
  }, []);

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

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SidebarNav active="editor" />
      <main className="flex flex-1 relative h-full pb-28 md:pb-0">
        <div className="w-80 h-full flex flex-col bg-surface border-r border-outline-variant z-10 shrink-0">
          <div className="p-6 space-y-4 border-b border-outline-variant/30">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                <Search className="size-5" />
              </span>
              <input
                className="w-full pl-10 pr-4 py-3 bg-surface-container-low border-b border-outline-variant focus:border-primary focus:ring-0 transition-all font-body-md text-on-surface"
                placeholder="Add New Place"
                type="text"
              />
            </div>
            <div className="flex items-center justify-between">
              <h2 className="font-headline-md text-[18px] text-on-surface">
                Planned Stops
              </h2>
              <span className="font-label-sm text-label-sm text-primary px-2 py-1 bg-primary-fixed rounded">
                {places.length} {places.length === 1 ? "Item" : "Items"}
              </span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
            <div className="space-y-2 pt-4">
              <label className="font-label-sm text-label-sm text-outline uppercase tracking-widest px-2">
                Sights
              </label>

              {isLoadingPlaces ? (
                <div className="p-4 text-[12px] text-on-surface-variant">
                  Loading your places...
                </div>
              ) : null}

              {!isLoadingPlaces && placesError ? (
                <div className="p-4 text-[12px] text-error">{placesError}</div>
              ) : null}

              {!isLoadingPlaces && !placesError && places.length === 0 ? (
                <div className="p-4 text-[12px] text-on-surface-variant">
                  No saved places yet.
                </div>
              ) : null}

              {!isLoadingPlaces && !placesError
                ? places.map((place) => (
                    <button
                      key={place.id}
                      onClick={() => router.push(`/place/${place.id}`)}
                      className="w-full text-left group p-4 bg-surface-container-lowest rounded-xl border border-transparent hover:border-primary-fixed transition-all cursor-pointer flex gap-4"
                      type="button"
                    >
                      <div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
                        <span className="material-symbols-outlined">
                          camera_enhance
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-label-sm text-label-sm text-on-surface">
                          {place.name}
                        </h3>
                        <p className="text-[12px] text-on-surface-variant line-clamp-2">
                          {place.description ?? "No description"}
                        </p>
                      </div>
                    </button>
                  ))
                : null}
            </div>
          </div>
        </div>
        <div className="flex-1 h-full bg-surface-container relative overflow-hidden">
          <TripMap />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[15%] left-[45%] pointer-events-auto">
              <button
                onClick={() => router.push("/place")}
                className="relative group cursor-pointer flex flex-col items-center"
                type="button"
              >
                <div className="map-glass px-3 py-1.5 rounded-full shadow-lg border border-white/50 flex items-center gap-2 mb-1 transform translate-y-0 group-hover:-translate-y-1 transition-transform">
                  <span className="font-label-sm text-[11px]">Kinkaku-ji</span>
                </div>
                <div className="w-4 h-4 bg-primary border-2 border-white rounded-full shadow-md animate-pulse" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
