import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Waypoint | Travel with Intent",
  description:
    "A map-first travel planning app for mindful, intentional itineraries.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
