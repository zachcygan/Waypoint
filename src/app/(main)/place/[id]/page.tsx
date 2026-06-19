import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

function formatCategoryLabel(category: string) {
  return category
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());
}

export default async function PlaceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const placeId = Number.parseInt(id, 10);

  if (Number.isNaN(placeId)) {
    notFound();
  }

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  if (!userEmail) {
    redirect("/login");
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
    include: {
      trip: true,
    },
  });

  if (!place) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      <main className="pt-32 pb-section-gap max-w-container-max mx-auto px-margin-desktop">
        <div className="flex items-center justify-between mb-8">
          <Link
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors group"
            href="/editor"
          >
            <span className="material-symbols-outlined text-body-lg group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest">
              Back to Editor
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-12 gap-gutter mb-16">
          <div className="col-span-12 lg:col-span-8 space-y-12">
            <section>
              <h1 className="font-display-lg text-display-lg text-on-surface mb-4">
                {place.name}
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-2xl">
                {place.description ?? "No description available yet."}
              </p>
            </section>
          </div>

          <aside className="col-span-12 lg:col-span-4 space-y-8">
            <div className="bg-surface-container-lowest rounded-xl p-8 tonal-layer-1 border border-surface-variant space-y-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-primary mt-1">
                    location_on
                  </span>
                  <div>
                    <span className="font-label-sm text-label-sm text-outline uppercase">
                      Address
                    </span>
                    <p className="font-body-md text-body-md text-on-surface">
                      {place.address}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-primary mt-1">
                    category
                  </span>
                  <div>
                    <span className="font-label-sm text-label-sm text-outline uppercase">
                      Category
                    </span>
                    <p className="font-body-md text-body-md text-on-surface">
                      {formatCategoryLabel(place.category)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-primary mt-1">
                    route
                  </span>
                  <div>
                    <span className="font-label-sm text-label-sm text-outline uppercase">
                      Trip
                    </span>
                    <p className="font-body-md text-body-md text-on-surface">
                      {place.trip.name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  className="block w-full bg-primary text-on-primary text-center py-4 rounded-lg font-medium hover:bg-surface-tint transition-colors active:scale-95"
                  href="/editor"
                >
                  Back to Map
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
