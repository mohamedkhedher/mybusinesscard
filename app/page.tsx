import BackgroundEffects from "@/components/BackgroundEffects";
import HeroCard from "@/components/HeroCard";
import PrimaryActions from "@/components/PrimaryActions";
import SocialLinks from "@/components/SocialLinks";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import StickyBottomBar from "@/components/StickyBottomBar";
import Toast from "@/components/Toast";
import OfflineBanner from "@/components/OfflineBanner";
import ServiceWorkerRegistrar from "@/components/ServiceWorkerRegistrar";

export default function Home() {
  return (
    <>
      <ServiceWorkerRegistrar />
      <BackgroundEffects />

      <main className="relative z-10 min-h-screen w-full overflow-x-hidden pb-28 md:pb-8 pt-4 flex flex-col gap-6">
        {/* OfflineBanner */}
        <OfflineBanner />

        {/* Hero */}
        <HeroCard />

        {/* Social + Copy Links + Connect Box */}
        <SocialLinks />

        {/* Primary Actions (Save Contact button) */}
        <PrimaryActions />

        {/* Divider */}
        <div className="relative z-10 w-full max-w-md mx-auto px-4">
          <hr className="divider" />
        </div>

        {/* Lead Capture Form */}
        <LeadCaptureForm />

        {/* Footer */}
        <footer className="relative z-10 w-full max-w-md mx-auto px-4 pb-4 text-center">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © 2025{" "}
            <a
              href="https://www.ox4labs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors underline underline-offset-2"
              style={{ color: "var(--text-primary)" }}
            >
              Ox4Labs
            </a>
            {" "}— AI-first. Execution over hype.
          </p>
        </footer>
      </main>

      {/* Sticky bottom bar (mobile only) */}
      <StickyBottomBar />

      {/* Global toast */}
      <Toast />
    </>
  );
}
