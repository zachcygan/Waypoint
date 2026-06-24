import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) {
    return NextResponse.json([], { status: 200 });
  }

  const { searchParams } = new URL(request.url);
  const tripIdParam = searchParams.get("tripId");
  const tripId = tripIdParam ? Number.parseInt(tripIdParam, 10) : null;

  if (tripIdParam && Number.isNaN(tripId)) {
    return NextResponse.json({ error: "Invalid trip id" }, { status: 400 });
  }

  const places = await prisma.place.findMany({
    where: {
      trip: {
        ...(tripId ? { id: tripId } : {}),
        user: {
          email: userEmail,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(places);
}
