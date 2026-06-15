import "dotenv/config";
import fs from "fs";
import { prisma } from "../src/lib/prisma";

async function main() {
  const raw = fs.readFileSync(
    "./scripts/places-export-2026-06-15T04-19-57-502Z.json",
    "utf-8",
  );

  const json = JSON.parse(raw);

  const places = json.data.Place;

  // Find your user
  const user = await prisma.user.findFirst({
    where: {
      email: "zachcygan@gmail.com",
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const trip = await prisma.trip.create({
    data: {
      name: "Japan 2026",
      userId: user.id,
    },
  });

  for (const place of places) {
    await prisma.place.create({
      data: {
        name: place.name,
        address: place.address,
        latitude: place.latitude,
        longitude: place.longitude,
        notes: place.notes,
        category: place.category,
        wantToVisit: place.wantToVisit,
        tripId: trip.id,
      },
    });
  }

  console.log(`Imported ${places.length} places`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
