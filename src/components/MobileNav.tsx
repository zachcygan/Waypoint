import Link from "next/link";

type MobileActive = "editor" | "trips" | "place";

export function MobileNav({ active }: { active: MobileActive }) {
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
