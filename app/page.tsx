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

      <main className="relative z-10 min-h-screen w-full overflow-x-hidden pb-28 md:pb-8">
        {/* OfflineBanner */}
        <div className="pt-4">
          <OfflineBanner />
        </div>

        {/* Hero */}
        <HeroCard />

        {/* Social + Copy Links + Connect Box */}
        <div className="pt-2">
          <SocialLinks />
        </div>

        {/* Primary Actions (Save Contact button) */}
        <PrimaryActions />

        {/* Divider */}
        <div className="relative z-10 w-full max-w-md mx-auto px-4 my-5">
          <hr className="divider" />
        </div>

        {/* Lead Capture Form */}
        <LeadCaptureForm />

        {/* Footer */}
        <footer className="relative z-10 w-full max-w-md mx-auto px-4 pb-4 text-center">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © 2025 Ox4Labs — AI-first. Execution over hype.
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
