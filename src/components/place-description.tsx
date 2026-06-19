"use client";

import { useEffect, useState } from "react";

type PlaceDescriptionProps = {
  placeId: number;
  initialDescription: string | null;
};

type Source = "database" | "google-places" | "wikipedia";

function formatSource(source: Source | null) {
  if (!source) {
    return null;
  }

  if (source === "google-places") {
    return "Google Places";
  }

  if (source === "wikipedia") {
    return "Wikipedia";
  }

  return "Database";
}

export default function PlaceDescription({
  placeId,
  initialDescription,
}: PlaceDescriptionProps) {
  const [description, setDescription] = useState(initialDescription);
  const [isLoading, setIsLoading] = useState(!initialDescription);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<Source | null>(
    initialDescription ? "database" : null,
  );

  useEffect(() => {
    if (initialDescription) {
      return;
    }

    let isActive = true;

    async function enrichDescription() {
      try {
        const response = await fetch(`/api/places/${placeId}/description`, {
          method: "POST",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("No description available");
        }

        const data = (await response.json()) as {
          description: string;
          source: Source;
        };

        if (!isActive) {
          return;
        }

        setDescription(data.description);
        setSource(data.source);
      } catch {
        if (!isActive) {
          return;
        }

        setError("Could not load a description automatically.");
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    enrichDescription();

    return () => {
      isActive = false;
    };
  }, [initialDescription, placeId]);

  return (
    <div className="space-y-3">
      <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-2xl">
        {description ??
          (isLoading
            ? "Fetching description..."
            : "No description available yet.")}
      </p>

      {source ? (
        <p className="font-label-sm text-[11px] uppercase tracking-wider text-outline">
          Source: {formatSource(source)}
        </p>
      ) : null}

      {error ? <p className="text-[12px] text-error">{error}</p> : null}
    </div>
  );
}
