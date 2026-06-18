"use client";

import { Footer } from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function PlacePage() {
  const router = useRouter();

  return (
    <div className="bg-background min-h-screen">
      <main className="pt-32 pb-section-gap max-w-container-max mx-auto px-margin-desktop">
        <div className="flex items-center justify-between mb-8">
          <button
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors group"
            onClick={() => router.push("/trips")}
            type="button"
          >
            <span className="material-symbols-outlined text-body-lg group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest">
              Back to Map
            </span>
          </button>
        </div>
        <div className="grid grid-cols-12 gap-gutter mb-16">
          <div className="col-span-12 lg:col-span-8 space-y-12">
            <section>
              <h1 className="font-display-lg text-display-lg text-on-surface mb-4">
                Kinkaku-ji Temple
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-2xl">
                A Zen Buddhist temple in northern Kyoto whose top two floors are
                completely covered in gold leaf. Known formally as Rokuon-ji, it
                is one of the most iconic sights in Japan.
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
                      1 Kinkakujicho, Kyoto, Japan
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-primary mt-1">
                    schedule
                  </span>
                  <div>
                    <span className="font-label-sm text-label-sm text-outline uppercase">
                      Opening Hours
                    </span>
                    <p className="font-body-md text-body-md text-on-surface">
                      9:00 - 17:00
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => router.push("/editor")}
                  className="w-full bg-primary text-on-primary py-4 rounded-lg font-medium hover:bg-surface-tint transition-colors active:scale-95"
                  type="button"
                >
                  Get Directions
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
