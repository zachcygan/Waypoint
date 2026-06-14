export function Footer() {
  return (
    <footer className="bg-surface border-t border-outline-variant/30 py-section-gap mt-section-gap">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop max-w-container-max mx-auto w-full gap-8">
        <div className="text-center md:text-left">
          <div className="font-headline-md text-headline-md text-secondary mb-2">
            Komorebi
          </div>
          <p className="font-body-md text-secondary-fixed-dim text-sm max-w-70">
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
