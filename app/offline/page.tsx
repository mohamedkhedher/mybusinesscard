import Link from "next/link";

export default function OfflinePage() {
    return (
        <main
            className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
            style={{ background: "var(--bg-primary)" }}
        >
            {/* Glow orb */}
            <div
                className="mb-8 w-24 h-24 rounded-full flex items-center justify-center"
                style={{
                    background: "rgba(99,102,241,0.1)",
                    border: "1px solid rgba(99,102,241,0.25)",
                    boxShadow: "0 0 48px rgba(99,102,241,0.2)",
                }}
            >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: "#818CF8" }}>
                    <line x1="1" y1="1" x2="23" y2="23" />
                    <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
                    <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
                    <path d="M10.71 5.05A16 16 0 0 1 22.56 9" />
                    <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
                    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                    <circle cx="12" cy="20" r="1" />
                </svg>
            </div>

            <h1
                className="text-2xl font-bold mb-2"
                style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
            >
                You&apos;re offline
            </h1>
            <p className="text-sm mb-6 max-w-xs" style={{ color: "var(--text-secondary)" }}>
                No worries — the card is cached. Check your connection and try again.
            </p>

            <Link
                href="/"
                className="btn-primary px-6 py-3 text-sm font-semibold"
                style={{ borderRadius: 12 }}
            >
                Try again
            </Link>

            <p className="mt-8 text-xs" style={{ color: "var(--text-muted)" }}>
                Mohamed Khedher · Ox4Labs · m@ox4labs.com
            </p>
        </main>
    );
}
