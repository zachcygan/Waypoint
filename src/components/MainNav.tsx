"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainNav() {
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
