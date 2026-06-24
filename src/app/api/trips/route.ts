import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

type MapboxFeature = {
  center?: [number, number];
  place_type?: string[];
};

type TripMapCenter = {
  destination: string;
  centerLatitude: number;
  centerLongitude: number;
  mapZoom: number;
};

function getZoomForPlaceType(placeType: string | undefined) {
  switch (placeType) {
    case "poi":
    case "address":
    case "place":
    case "locality":
      return 11;
    case "district":
    case "region":
      return 7;
    case "country":
      return 4.5;
    default:
      return 8;
  }
}

async function geocodeDestination(
  destination: string,
): Promise<TripMapCenter | null> {
  const mapboxToken =
    process.env.MAPBOX_TOKEN ?? process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!mapboxToken || !destination.trim()) {
    return null;
  }

  const params = new URLSearchParams({
    access_token: mapboxToken,
    autocomplete: "false",
    limit: "1",
    types: "place,locality,district,region,country,address,poi",
  });

  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      destination,
    )}.json?${params.toString()}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as {
    features?: MapboxFeature[];
  };
  const feature = payload.features?.[0];
  const center = feature?.center;

  if (!center) {
    return null;
  }

  return {
    destination,
    centerLongitude: center[0],
    centerLatitude: center[1],
    mapZoom: getZoomForPlaceType(feature?.place_type?.[0]),
  };
}

export async function GET() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const trips = await prisma.trip.findMany({
    where: {
      user: {
        email: userEmail,
      },
    },
    include: {
      _count: {
        select: {
          places: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return NextResponse.json(trips);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = (await request.json()) as {
    name?: string;
    destination?: string;
  };

  const name = payload.name?.trim();
  const destination = payload.destination?.trim();
  const mapCenter = destination ? await geocodeDestination(destination) : null;

  const tripName =
    name || (destination ? `${destination} Trip` : "Untitled Trip");

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const trip = await prisma.trip.create({
    data: {
      name: tripName,
      destination: mapCenter?.destination ?? destination,
      centerLatitude: mapCenter?.centerLatitude,
      centerLongitude: mapCenter?.centerLongitude,
      mapZoom: mapCenter?.mapZoom,
      userId: user.id,
    },
  });

  return NextResponse.json(trip, { status: 201 });
}
