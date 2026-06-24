import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

type DescriptionResult = {
  description: string;
  source: "google-places" | "wikipedia";
};

type GooglePlace = {
  displayName?: { text?: string };
  formattedAddress?: string;
  editorialSummary?: { text?: string };
  primaryTypeDisplayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
};

async function searchGooglePlaces(
  textQuery: string,
  latitude: number | null,
  longitude: number | null,
): Promise<GooglePlace | null> {
  const googleApiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!googleApiKey) {
    return null;
  }

  const body: {
    textQuery: string;
    maxResultCount: number;
    languageCode: string;
    locationBias?: {
      circle: {
        center: {
          latitude: number;
          longitude: number;
        };
        radius: number;
      };
    };
  } = {
    textQuery,
    maxResultCount: 1,
    languageCode: "en",
  };

  if (latitude !== null && longitude !== null) {
    body.locationBias = {
      circle: {
        center: {
          latitude,
          longitude,
        },
        radius: 5000,
      },
    };
  }

  const response = await fetch(
    "https://places.googleapis.com/v1/places:searchText",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": googleApiKey,
        "X-Goog-FieldMask":
          "places.displayName,places.formattedAddress,places.editorialSummary,places.primaryTypeDisplayName,places.rating,places.userRatingCount",
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as {
    places?: GooglePlace[];
  };

  return payload.places?.[0] ?? null;
}

function buildGoogleDescription(place: GooglePlace): string | null {
  const editorialSummary = place.editorialSummary?.text?.trim();

  if (editorialSummary) {
    return editorialSummary;
  }

  const name = place.displayName?.text?.trim();
  const address = place.formattedAddress?.trim();
  const type = place.primaryTypeDisplayName?.text?.trim();
  const rating = place.rating;
  const userRatingCount = place.userRatingCount;

  if (!name) {
    return null;
  }

  const base = type
    ? `${name} is a ${type.toLowerCase()} in ${address ?? "this area"}.`
    : `${name} is located in ${address ?? "this area"}.`;

  if (typeof rating === "number" && typeof userRatingCount === "number") {
    return `${base} It is rated ${rating.toFixed(1)}/5 based on ${userRatingCount.toLocaleString()} Google reviews.`;
  }

  return base;
}

async function getGooglePlacesDescription(
  placeName: string,
  placeAddress: string,
  latitude: number | null,
  longitude: number | null,
): Promise<DescriptionResult | null> {
  const attempts = [`${placeName}, ${placeAddress}`, placeName];

  for (const query of attempts) {
    const match = await searchGooglePlaces(query, latitude, longitude);

    if (!match) {
      continue;
    }

    const description = buildGoogleDescription(match);

    if (!description) {
      continue;
    }

    return {
      description,
      source: "google-places",
    };
  }

  return null;
}

async function getWikipediaDescription(
  placeName: string,
  placeAddress: string,
): Promise<DescriptionResult | null> {
  const searchResponse = await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(`${placeName} ${placeAddress}`)}&utf8=1&format=json&srlimit=1`,
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  if (!searchResponse.ok) {
    return null;
  }

  const searchPayload = (await searchResponse.json()) as {
    query?: {
      search?: Array<{ title?: string }>;
    };
  };

  const title = searchPayload.query?.search?.[0]?.title?.trim();

  if (!title) {
    return null;
  }

  const response = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as {
    extract?: string;
    type?: string;
  };

  const description = payload.extract?.trim();

  if (!description || payload.type === "disambiguation") {
    return null;
  }

  return {
    description,
    source: "wikipedia",
  };
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const placeId = Number.parseInt(id, 10);

  if (Number.isNaN(placeId)) {
    return NextResponse.json({ error: "Invalid place id" }, { status: 400 });
  }

  const place = await prisma.place.findFirst({
    where: {
      id: placeId,
      trip: {
        user: {
          email: userEmail,
        },
      },
    },
    select: {
      id: true,
      name: true,
      address: true,
      latitude: true,
      longitude: true,
      description: true,
    },
  });

  if (!place) {
    return NextResponse.json({ error: "Place not found" }, { status: 404 });
  }

  if (place.description?.trim()) {
    return NextResponse.json({
      description: place.description,
      source: "database",
      cached: true,
    });
  }

  const descriptionResult =
    (await getGooglePlacesDescription(
      place.name,
      place.address,
      place.latitude,
      place.longitude,
    )) ?? (await getWikipediaDescription(place.name, place.address));

  if (!descriptionResult) {
    return NextResponse.json(
      { error: "No description found from external providers" },
      { status: 404 },
    );
  }

  const updatedPlace = await prisma.place.update({
    where: { id: place.id },
    data: { description: descriptionResult.description },
    select: {
      description: true,
    },
  });

  return NextResponse.json({
    description: updatedPlace.description,
    source: descriptionResult.source,
    cached: false,
  });
}
