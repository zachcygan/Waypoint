import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const places = await prisma.place.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(places);
}
