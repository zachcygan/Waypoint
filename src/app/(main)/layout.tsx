import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="absolute inset-x-0 top-0 z-50">
        <Navbar />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
