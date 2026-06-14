"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function MainNav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30">
      <nav className="flex items-center justify-between px-margin-desktop max-w-container-max mx-auto w-full h-16">
        <Link
          href="/"
          className="font-display-lg text-headline-md text-primary tracking-tight cursor-pointer"
        >
          Waypoint
        </Link>
        <div className="hidden md:flex items-center gap-8 font-body-md text-body-md">
          <Link
            className={
              pathname === "/"
                ? "text-primary font-bold border-b-2 border-primary pb-1"
                : "text-on-surface-variant hover:text-primary transition-colors duration-300"
            }
            href="/"
          >
            Discover
          </Link>
          <Link
            className={
              pathname === "/trips"
                ? "text-primary font-bold border-b-2 border-primary pb-1"
                : "text-on-surface-variant hover:text-primary transition-colors duration-300"
            }
            href="/trips"
          >
            My Trips
          </Link>
          <Link
            className={
              pathname === "/editor"
                ? "text-primary font-bold border-b-2 border-primary pb-1"
                : "text-on-surface-variant hover:text-primary transition-colors duration-300"
            }
            href="/editor"
          >
            Plan
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            type="button"
          >
            notifications
          </button>
          <div className="h-8 w-8 rounded-full bg-surface-container overflow-hidden cursor-pointer active:scale-95 transition-transform border border-outline-variant">
            <img
              alt="User profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzD3GyhTTur4YwlGL3cA0ceQmMgl5eRgixKWOPRx240uaocHUuSNDjwjh2dgeBOoitfd0hlWdJv8Jrt2oKj2BdyKA-WUm8h1hz34uNJSXDAnJmm2oQVoo0658YvmieUqXx7aXBUS6i1DpP3NHArjZhQLt_XV3AZWuvZlwbkvGJ9C3Xva52q_2rPQGdkqAygIaDgHtmoNOTeRNncteZCmWQ8fUQe3L5fggWE1QHfnt2qQ-576Jy2BLxpa9WLLJ5GP4veuInpp9u1YY"
            />
          </div>
        </div>
      </nav>
    </header>
  );
}

function SidebarNav({ active }: { active: "editor" | "trips" | "place" }) {
  const linkStyle = (key: "editor" | "trips" | "place") =>
    `flex items-center px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer font-label-sm text-label-sm ${
      active === key
        ? "bg-primary-container text-on-primary-container font-bold"
        : "text-on-surface-variant hover:bg-surface-variant"
    }`;

  return (
    <aside className="hidden md:flex flex-col p-base space-y-4 h-full w-64 border-r border-outline-variant bg-surface-container-low sticky top-0">
      <div className="px-4 py-6">
        <h1 className="font-headline-md text-headline-md text-primary">
          Trip Planner
        </h1>
        <p className="font-label-sm text-label-sm text-on-surface-variant opacity-70">
          Kyoto Autumn 2024
        </p>
      </div>
      <nav className="flex-1 space-y-2 px-2">
        <Link href="/editor" className={linkStyle("editor")}>
          <span className="material-symbols-outlined mr-3">map</span> Map Editor
        </Link>
        <Link href="/trips" className={linkStyle("trips")}>
          <span className="material-symbols-outlined mr-3">dashboard</span>{" "}
          Dashboard
        </Link>
        <Link href="/place" className={linkStyle("place")}>
          <span className="material-symbols-outlined mr-3">location_on</span>{" "}
          Waypoints
        </Link>
        <button
          className="flex w-full items-center px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all duration-200 cursor-pointer font-label-sm text-label-sm"
          type="button"
        >
          <span className="material-symbols-outlined mr-3">settings</span>{" "}
          Settings
        </button>
      </nav>
      <div className="px-4 py-6 border-t border-outline-variant">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden">
            <img
              alt="Alex Rivera"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSLE-JrXd93tTzcFo9DXyptPbGXlERM9f1qQq-uqdxOFcP-4jkB1_DF4B9Y7asRsSrEn4TL1L-VbrhbNH4NEMhr5SWfafeex6m4diRkUWfxwSSrzOzzKHXHq88Fssc_YlRwXBzDuIuyH8l1V-HChYqTcJwowZBonAUP3moiN1nwnpXUnw6pXujZU-rBbs0dkMEW9aZgNcPCzdm1zy1nAVDBKkrjkyoB3yrs3EnIHArrDJ1VN3HDseBhTTgTUpRRQvyi3C_XliKdtc"
            />
          </div>
          <div>
            <p className="font-label-sm text-label-sm text-on-surface font-bold">
              Alex Rivera
            </p>
            <p className="text-[11px] text-on-surface-variant">Pro Planner</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function MobileNav({ active }: { active: "editor" | "trips" | "place" }) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-outline-variant px-6 py-3 flex justify-around items-center z-50">
      <Link
        className={`flex flex-col items-center ${active === "trips" ? "text-primary" : "text-on-surface-variant opacity-60"}`}
        href="/trips"
      >
        <span className="material-symbols-outlined">dashboard</span>
        <span className="text-[10px] font-bold mt-1">Trips</span>
      </Link>
      <Link
        className={`flex flex-col items-center ${active === "editor" ? "text-primary" : "text-on-surface-variant opacity-60"}`}
        href="/editor"
      >
        <span className="material-symbols-outlined">map</span>
        <span className="text-[10px] mt-1">Editor</span>
      </Link>
      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center -mt-8 shadow-lg">
        <span className="material-symbols-outlined text-on-primary">add</span>
      </div>
      <Link
        className={`flex flex-col items-center ${active === "place" ? "text-primary" : "text-on-surface-variant opacity-60"}`}
        href="/place"
      >
        <span className="material-symbols-outlined">location_on</span>
        <span className="text-[10px] mt-1">Saves</span>
      </Link>
      <button
        className="flex flex-col items-center text-on-surface-variant opacity-60"
        type="button"
      >
        <span className="material-symbols-outlined">settings</span>
        <span className="text-[10px] mt-1">Settings</span>
      </button>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-surface border-t border-outline-variant/30 py-section-gap mt-section-gap">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop max-w-container-max mx-auto w-full gap-8">
        <div className="text-center md:text-left">
          <div className="font-headline-md text-headline-md text-secondary mb-2">
            Komorebi
          </div>
          <p className="font-body-md text-secondary-fixed-dim text-sm max-w-[280px]">
            Curating the beauty of the world&apos;s journeys through intentional
            design and cartographic art.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-6">
          <div className="flex gap-8 font-body-md text-body-md text-secondary-fixed-dim">
            <button
              className="hover:text-primary transition-colors"
              type="button"
            >
              Privacy Policy
            </button>
            <button
              className="hover:text-primary transition-colors"
              type="button"
            >
              Terms of Service
            </button>
            <button
              className="hover:text-primary transition-colors"
              type="button"
            >
              Help Center
            </button>
          </div>
          <p className="font-body-md text-secondary-fixed-dim opacity-60 text-xs">
            © 2026 Komorebi Travel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function LandingPage() {
  const router = useRouter();

  return (
    <div className="bg-background">
      <MainNav />
      <main>
        <section className="relative min-h-[921px] flex items-center pt-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              alt="Kyoto Temple"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgK0LKonNVAtbUkyo-Qds4GmExr3NGeLGG_xsMe0d5Yu7AwYRumgCSCfGRKUM_X9ksZBXd8xxmTW1TZarX5T-rXgqGn_sEi54vb4qfl6TQyuvFGynQEbmJJVCenvpVFwsN4JODfK-XSpmhOLmzZfbuQvZS5aVCN9NKY4PwiuvCHzSb1MNSFId83ay8RozqZMFzgFwDHsbp6DCrXZtF_KYcFkwdkumkAg-a46FqFER2IopIeSNLi-kNsjCq1x-oPyT91roo43L7hoo"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
          </div>
          <div className="relative z-10 px-margin-desktop max-w-container-max mx-auto w-full">
            <div className="max-w-2xl">
              <h1 className="font-display-lg text-display-lg mb-6 animate-fade-in">
                Travel, intentionally.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 leading-relaxed">
                Experience the art of mindful journey planning. Komorebi helps
                you curate poetic itineraries through a minimalist, map-first
                interface designed for the sophisticated traveler.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => router.push("/trips")}
                  className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/10"
                  type="button"
                >
                  Get Started
                </button>
                <button
                  className="px-8 py-4 border border-outline-variant text-on-surface font-semibold rounded-lg hover:bg-surface-variant transition-all active:scale-95"
                  type="button"
                >
                  Watch the Film
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export function DashboardPage() {
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
        <Footer />
      </main>
      <MobileNav active="trips" />
    </div>
  );
}

export function PlaceDetailPage() {
  const router = useRouter();

  return (
    <div className="bg-background min-h-screen">
      <MainNav />
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
      <Footer />
      <MobileNav active="place" />
    </div>
  );
}

export function EditorPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SidebarNav active="editor" />
      <main className="flex flex-1 relative h-full pb-28 md:pb-0">
        <div className="w-80 h-full flex flex-col bg-surface border-r border-outline-variant z-10 shrink-0">
          <div className="p-6 space-y-4 border-b border-outline-variant/30">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-3 bg-surface-container-low border-b border-outline-variant focus:border-primary focus:ring-0 transition-all font-body-md text-on-surface"
                placeholder="Add New Place"
                type="text"
              />
            </div>
            <div className="flex items-center justify-between">
              <h2 className="font-headline-md text-[18px] text-on-surface">
                Planned Stops
              </h2>
              <span className="font-label-sm text-label-sm text-primary px-2 py-1 bg-primary-fixed rounded">
                8 Items
              </span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
            <div className="space-y-2 pt-4">
              <label className="font-label-sm text-label-sm text-outline uppercase tracking-widest px-2">
                Sights
              </label>
              <div
                onClick={() => router.push("/place")}
                className="group p-4 bg-surface-container-lowest rounded-xl border border-transparent hover:border-primary-fixed transition-all cursor-pointer flex gap-4"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined">
                    camera_enhance
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-label-sm text-label-sm text-on-surface">
                    Kinkaku-ji
                  </h3>
                  <p className="text-[12px] text-on-surface-variant">
                    The Golden Pavilion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 h-full bg-surface-container relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCqYIch6HHrNCR9IOXy8YHmLZuBAxG163SGF3qvRAKWciuBpZIt_55qCzZ1zGvPzK99VFeGNaxZ--LIZBujrn8tw4yFB6ijaeqIn9Kdx_L3w0S8JLnGSoqCZnlS56aMlxif5lkuCZstDgcvKNf_B0b122O9cE9Y-QQsI-u3UsJxtYDq5H3TW0VSlPFQ-T3AmBfyZ5ThhtQ18EqWdEg-JTP4gQCjzSkbroK21l9mO1Ccrb7Vvu-e0ixTBIl6YI7-pX-tH-V7p2_uiNE')",
            }}
          />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[15%] left-[45%] pointer-events-auto">
              <button
                onClick={() => router.push("/place")}
                className="relative group cursor-pointer flex flex-col items-center"
                type="button"
              >
                <div className="map-glass px-3 py-1.5 rounded-full shadow-lg border border-white/50 flex items-center gap-2 mb-1 transform translate-y-0 group-hover:-translate-y-1 transition-transform">
                  <span className="font-label-sm text-[11px]">Kinkaku-ji</span>
                </div>
                <div className="w-4 h-4 bg-primary border-2 border-white rounded-full shadow-md animate-pulse" />
              </button>
            </div>
          </div>
        </div>
      </main>
      <MobileNav active="editor" />
    </div>
  );
}
