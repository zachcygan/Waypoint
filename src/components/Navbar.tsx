"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  return (
    <div className="w-full px-2 py-2">
      <NavbarItems />
    </div>
  );
}

const NavbarItems = () => {
  const navItems = [
    { name: "Editor", link: "/editor" },
    { name: "Place", link: "/place" },
    { name: "Trips", link: "/trips" },
    { name: "Map", link: "/map" },
  ];

  return (
    <div className="w-full">
      <DesktopNav navItems={navItems} />
      <MobileNav navItems={navItems} />
    </div>
  );
};

const DesktopNav = ({ navItems }: any) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      try {
        const res = await fetch("/api/auth/session", { cache: "no-store" });
        const session = res.ok ? await res.json() : null;
        if (isMounted) {
          setIsAuthenticated(Boolean(session?.user));
        }
      } catch {
        if (isMounted) {
          setIsAuthenticated(false);
        }
      }
    };

    void loadSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      void signOut({ callbackUrl: "/" });
      return;
    }

    void signIn("google", { callbackUrl: "/" });
  };

  const authLabel = isAuthenticated ? "Log Out" : "Log In";

  return (
    <motion.div
      onMouseLeave={() => {
        setHovered(null);
      }}
      className={cn(
        "relative z-60 mx-auto hidden w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center self-start rounded-full bg-white px-4 py-2 lg:grid dark:bg-neutral-950",
      )}
    >
      <div className="justify-self-start">
        <Logo />
      </div>
      <div className="flex flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:space-x-2">
        {navItems.map((navItem: any, idx: number) => (
          <Link
            onMouseEnter={() => setHovered(idx)}
            className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300"
            key={`link=${idx}`}
            href={navItem.link}
          >
            {hovered === idx && (
              <motion.div
                layoutId="hovered"
                className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
              />
            )}
            <span className="relative z-20">{navItem.name}</span>
          </Link>
        ))}
      </div>
      <div className="justify-self-end">
        <button
          onClick={handleAuthClick}
          className="w-25 text-nowrap rounded-full bg-black px-8 py-2 text-center text-sm font-bold text-white shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.4)_inset] hover:cursor-pointer md:inline-flex md:items-center md:justify-center dark:bg-white dark:text-black"
          type="button"
        >
          {authLabel}
        </button>
      </div>
    </motion.div>
  );
};

const MobileNav = ({ navItems }: any) => {
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      try {
        const res = await fetch("/api/auth/session", { cache: "no-store" });
        const session = res.ok ? await res.json() : null;
        if (isMounted) {
          setIsAuthenticated(Boolean(session?.user));
        }
      } catch {
        if (isMounted) {
          setIsAuthenticated(false);
        }
      }
    };

    void loadSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      void signOut({ callbackUrl: "/" });
      return;
    }

    void signIn("google", { callbackUrl: "/" });
  };

  const authLabel = isAuthenticated ? "Log Out" : "Log In";

  return (
    <>
      <motion.div
        animate={{ borderRadius: open ? "4px" : "2rem" }}
        key={String(open)}
        className="relative mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-white px-4 py-2 lg:hidden dark:bg-neutral-950"
      >
        <div className="flex w-full flex-row items-center justify-between">
          <Logo />
          {open ? (
            <IconX
              className="text-black dark:text-white"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <IconMenu2
              className="text-black dark:text-white"
              onClick={() => setOpen(!open)}
            />
          )}
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-x-0 top-16 z-20 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 dark:bg-neutral-950"
            >
              {navItems.map((navItem: any, idx: number) => (
                <Link
                  key={`link=${idx}`}
                  href={navItem.link}
                  className="relative text-neutral-600 dark:text-neutral-300"
                >
                  <motion.span className="block">{navItem.name} </motion.span>
                </Link>
              ))}
              <button
                onClick={handleAuthClick}
                className="inline-flex w-full items-center justify-center rounded-lg bg-black px-8 py-2 text-center font-medium text-white shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.4)_inset] dark:bg-white dark:text-black"
                type="button"
              >
                {authLabel}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <img src="/assets/logo.png" alt="logo" width={30} height={30} />
      <span className="font-medium text-black dark:text-white">Waypoint</span>
    </Link>
  );
};
