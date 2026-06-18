"use client";
import { SidebarNav } from "@/components/SidebarNav";
import { useRouter } from "next/navigation";

export default function TripsPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-surface">
      <SidebarNav active="trips" />
      <main className="flex-1 min-h-screen overflow-y-auto pb-28 md:pb-0">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-margin-desktop py-8 max-w-container-max mx-auto w-full">
          <div>
            <h2 className="font-display-lg text-display-lg text-primary tracking-tight">
              My Trips
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-xl">
              Curate your journeys with intentionality. Organize your waypoints
              and memories within a quiet, minimalist workspace.
            </p>
          </div>
          <button
            onClick={() => router.push("/editor")}
            className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-sm text-label-sm hover:opacity-90 transition-opacity active:scale-95 flex items-center gap-2"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Create New Map
          </button>
        </header>
        <section className="px-margin-desktop pb-section-gap max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div
              onClick={() => router.push("/place")}
              className="md:col-span-8 bg-surface-container-lowest rounded-xl overflow-hidden card-hover transition-all duration-300 tonal-elevation group cursor-pointer"
            >
              <div className="relative h-96 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMJBy-6Cp5loLop524XDIHLD505VVUzYvvb8daxyGQtHPO1ggqla6YudRRlsrqJxquHtCe8XhkkqxKRVE5log2PlmJ6a0yGJwcGyB7xigfKrkg5w11weY1wutmdUmLNiEzZR7I42UbTHMYC74W4gLEYVBxjCNUx5vDLpHbpP-CbwcZJU3ASTlQXMCucG_T_tKLlTiqCy2vHm_pbLtwUXIxq-qPx9voWh8eGQjgSEmz8gOQOPHf7dPuat99lyvWOC_MCBCtNjQDiC4"
                  alt="Kyoto Autumn"
                />
                <div className="absolute bottom-6 left-6 glass-overlay p-6 rounded-lg max-w-md">
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-2 block">
                    Featured Journey
                  </span>
                  <h3 className="font-headline-lg text-headline-lg text-on-surface">
                    Kyoto Autumn 2024
                  </h3>
                </div>
              </div>
            </div>
            <div
              onClick={() => router.push("/editor")}
              className="md:col-span-4 border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center p-12 hover:bg-surface-container-low transition-colors group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary text-3xl">
                  add
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">
                Create New Map
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant text-center mt-2">
                Start a new journey from scratch.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
