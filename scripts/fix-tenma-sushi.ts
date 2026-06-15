import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  await prisma.place.updateMany({
    where: {
      name: "Tenma Sushi",
    },
    data: {
      longitude: 135.51202927878224,
    },
  });

  console.log("Fixed Tenma Sushi longitude");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
