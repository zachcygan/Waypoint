import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
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
            Experience the art of mindful journey planning. Komorebi helps you
            curate poetic itineraries through a minimalist, map-first interface
            designed for the sophisticated traveler.
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
  );
}
