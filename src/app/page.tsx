"use client";

import { Footer } from "@/components/Footer";
import { MainNav } from "@/components/MainNav";
import { useRouter } from "next/navigation";
import Map from "@/components/map";
import { useEffect } from "react";
import { Sparkles, Layers, GlobeX } from "lucide-react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-background">
      <MainNav />
      <main>
        <section className="relative min-h-230.25 flex items-center pt-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              alt="Kyoto Temple"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgK0LKonNVAtbUkyo-Qds4GmExr3NGeLGG_xsMe0d5Yu7AwYRumgCSCfGRKUM_X9ksZBXd8xxmTW1TZarX5T-rXgqGn_sEi54vb4qfl6TQyuvFGynQEbmJJVCenvpVFwsN4JODfK-XSpmhOLmzZfbuQvZS5aVCN9NKY4PwiuvCHzSb1MNSFId83ay8RozqZMFzgFwDHsbp6DCrXZtF_KYcFkwdkumkAg-a46FqFER2IopIeSNLi-kNsjCq1x-oPyT91roo43L7hoo"
            />
            <div className="absolute inset-0 bg-linear-to-r from-background via-background/40 to-transparent" />
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

        <section className="py-section-gap px-margin-desktop max-w-container-max mx-auto overflow-hidden">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div className="reveal-on-scroll">
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-4 block">
                The Interface
              </span>
              <h2 className="font-headline-lg text-headline-lg mb-6">
                A canvas for your curiosity.
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8">
                Our proprietary Map Editor moves beyond static lists. Drag,
                drop, and connect waypoints on a high-fidelity cartographic
                interface that visualizes the flow of your journey as clearly as
                the destinations themselves.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-body-md">
                  <Sparkles className="" />
                  <span>Intelligent route optimization</span>
                </li>
                <li className="flex items-center gap-3 text-body-md">
                  <Layers className="" />
                  <span>Multi-layered interest maps</span>
                </li>
                <li className="flex items-center gap-3 text-body-md">
                  <GlobeX className="" />
                  <span>Seamless offline sync for remote exploring</span>
                </li>
              </ul>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl reveal-on-scroll delay-200">
              <div className="aspect-4/3 bg-surface-container-low">
                <img
                  alt="Map Interface"
                  className="w-full h-full object-cover opacity-90"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1lDs4zx_UhvnC4rw-ralVOx8-XOnXRyJp8PQHANyJo58FHm_A5hjAanpdelquAJ29YgxX6xfeWVSIkIKdWbMngUMuZbSD4V4slF-B8uRWUNed8LTa4xrLRMq-LkJfU81w-A7Y7PzDuoBZAFYjMn1hk04kL2I-lTiXoHmBEdNP3cEKXlVLgYYA9YWuRB-U7R6ge3tQo-5JEd3ObUUB4xMUxbqLyqC5TtRM6zJiaFOgMSxD8vkSOZv37YrKliuybbVVHDQNPlZltq8"
                />
                <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                  <div className="glass-panel p-4 rounded-lg border border-white/20 shadow-xl max-w-50">
                    <p className="text-[10px] uppercase tracking-wider font-bold mb-2">
                      Waypoint 01
                    </p>
                    <p className="text-xs font-bold">Meiji Jingu Shrine</p>
                    <p className="text-[10px] text-on-surface-variant">
                      Arrival: 09:00 AM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-section-gap bg-surface-container-low/50">
          <div className="px-margin-desktop max-w-container-max mx-auto">
            <div className="text-center mb-16 reveal-on-scroll">
              <h2 className="font-headline-lg text-headline-lg mb-4">
                Crafted for the conscious traveler.
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">
                Focus on the experiences that matter. We handle the logistical
                complexity so you can stay in the moment.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              <div className="md:col-span-2 relative h-100 rounded-xl overflow-hidden group reveal-on-scroll">
                <img
                  alt="Japanese Garden"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0vqy2yl-1T8Q0JbLafEsvweY7lp-PbtuwnDb7eCR3foTjQVh-lzZFlxGKRiTpaCExbFYP6xX8N0lOY5APCzuM_z-tSpo_BHQ0ioGSavH7Q9Mwv0zbvEXgooRC8U985SgfwZBSxaUDlcMlr-1Df3-MZltidS5M3HnV3vZ1XHw0-7nsuMuH5HwDTb14y9b7gTRUfYwkrCLi4K_dy4j1y5aKNkaZuBLACrPnAgR-AvSYhHgeXViaqznZ0N9wFM9-Eq2sP2pk4BlFv7E"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="font-headline-md text-headline-md mb-2">
                    Kyoto Autumn Collection
                  </h3>
                  <p className="font-body-md opacity-90">
                    Curated routes through the ancient capital&apos;s most
                    secluded temples.
                  </p>
                </div>
              </div>
              <div className="relative h-100 rounded-xl overflow-hidden group reveal-on-scroll delay-100">
                <img
                  alt="Tokyo Night"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR_BqUre6yiQ1KvIPThWzD9USR3vKveqS61LjPfrRUj7HYk11oQAbzbNqGP4vVQF7OcJ_hoCypiISd3NTGt5IMDmzlXWC6ZQh3qS53szgQU06kL72GElj8CR0GzNtT5dKpI_mryMd3miJ_b_k1h9uuWZ0sQdI2YOtORhRrVxaWZm4Igt8BC_L4dSiu8s4yckQLhzkb3b0zNQKHHDocen-MGCd3f3PgQfIWHSOAJqG8OrycmwQkbnzbzj2JL_8XMufJK6dwquOYPFQ"
                />
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="font-headline-md text-headline-md mb-2">
                    Neon Wanderlust
                  </h3>
                  <p className="font-body-md opacity-90">
                    Tokyo&apos;s hidden night haunts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-section-gap px-margin-desktop max-w-container-max mx-auto text-center reveal-on-scroll">
          <div className="max-w-2xl mx-auto py-16 bg-white border border-outline-variant rounded-2xl shadow-sm">
            <h2 className="font-display-lg text-headline-lg mb-4">
              Start your journey.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-10 px-8">
              Join a community of travelers who value depth over speed. Your
              next meaningful adventure begins with a single waypoint.
            </p>
            <div className="flex flex-col items-center gap-4">
              <button
                className="w-64 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/10"
                type="button"
              >
                Create Account
              </button>
              <button
                className="text-primary font-body-md hover:underline cursor-pointer"
                type="button"
              >
                Already have an account? Sign In
              </button>
            </div>
          </div>
        </section>
        <Map />
      </main>
      <Footer />
    </div>
  );
}
