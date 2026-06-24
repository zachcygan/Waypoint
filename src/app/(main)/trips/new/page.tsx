"use client";

import { ArrowLeft, MapPin, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function NewTripPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, destination }),
      });

      if (res.status === 401) {
        router.push("/login");
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to create trip");
      }

      const trip = (await res.json()) as { id: number };
      router.push(`/trips/${trip.id}/edit`);
    } catch (submitError) {
      console.error(submitError);
      setError("Could not create this trip. Try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-surface px-margin-desktop pb-section-gap pt-32">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => router.push("/trips")}
          className="mb-8 flex items-center gap-2 text-on-surface-variant transition-colors hover:text-primary"
          type="button"
        >
          <ArrowLeft className="size-5" />
          <span className="font-label-sm text-label-sm uppercase tracking-widest">
            Back to Trips
          </span>
        </button>

        <div className="mb-10">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-fixed px-3 py-1 text-[12px] font-semibold uppercase tracking-widest text-primary">
            <Sparkles className="size-4" />
            New Journey
          </span>
          <h1 className="font-display-lg text-display-lg text-primary">
            Give the trip a home before opening the map.
          </h1>
          <p className="mt-4 max-w-2xl font-body-md text-body-md text-on-surface-variant">
            This creates a real trip record first, so the editor opens with a
            clear itinerary workspace instead of a mystery blank map.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-lg border border-outline-variant bg-surface-container-lowest p-6 tonal-layer-1"
        >
          <label className="block space-y-2">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">
              Trip Name
            </span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-lg border border-outline-variant bg-surface px-4 py-3 font-body-md text-body-md text-on-surface outline-none transition-colors focus:border-primary"
              placeholder="Kyoto Autumn"
              type="text"
            />
          </label>

          <label className="block space-y-2">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">
              Destination
            </span>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-outline" />
              <input
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                className="w-full rounded-lg border border-outline-variant bg-surface py-3 pl-12 pr-4 font-body-md text-body-md text-on-surface outline-none transition-colors focus:border-primary"
                placeholder="Kyoto, Japan"
                type="text"
              />
            </div>
          </label>

          {error ? <p className="text-[13px] text-error">{error}</p> : null}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
            <button
              className="rounded-lg bg-primary px-6 py-3 font-label-sm text-label-sm text-on-primary transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Creating..." : "Create Trip"}
            </button>
            <button
              onClick={async () => {
                setIsSubmitting(true);
                setError(null);

                try {
                  const res = await fetch("/api/trips", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: "Untitled Trip" }),
                  });

                  if (res.status === 401) {
                    router.push("/login");
                    return;
                  }

                  if (!res.ok) {
                    throw new Error("Failed to create trip");
                  }

                  const trip = (await res.json()) as { id: number };
                  router.push(`/trips/${trip.id}/edit`);
                } catch (submitError) {
                  console.error(submitError);
                  setError("Could not create this trip. Try again in a moment.");
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="rounded-lg border border-outline-variant px-6 py-3 font-label-sm text-label-sm text-on-surface transition-colors hover:bg-surface-container-low"
              disabled={isSubmitting}
              type="button"
            >
              Start Blank
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
