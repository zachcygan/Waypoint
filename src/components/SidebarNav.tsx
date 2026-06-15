import Link from "next/link";
import { Map, LayoutDashboard, MapPin, Settings } from "lucide-react";

type SidebarActive = "editor" | "trips" | "place";

export function SidebarNav({ active }: { active: SidebarActive }) {
  const linkStyle = (key: SidebarActive) =>
    `flex items-center px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer font-label-sm text-label-sm ${
      active === key
        ? "bg-primary-container text-on-primary-container font-bold"
        : "text-on-surface-variant hover:bg-surface-variant"
    }`;

  return (
    <aside className="hidden md:flex flex-col p-base space-y-4 h-screen w-64 border-r border-outline-variant bg-surface-container-low sticky top-0">
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
          <Map className="mr-3" /> Map Editor
        </Link>
        <Link href="/trips" className={linkStyle("trips")}>
          <LayoutDashboard className="mr-3" /> Dashboard
        </Link>
        <Link href="/place" className={linkStyle("place")}>
          <MapPin className="mr-3" /> Waypoints
        </Link>
        <button
          className="flex w-full items-center px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-all duration-200 cursor-pointer font-label-sm text-label-sm"
          type="button"
        >
          <Settings className="mr-3" /> Settings
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
