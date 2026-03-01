"use client";

import { PROFILE } from "@/lib/profile";

const waMessage = encodeURIComponent(PROFILE.whatsappPrefill);

export default function StickyBottomBar() {
    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
            style={{
                background: "rgba(11, 15, 25, 0.85)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                paddingBottom: "env(safe-area-inset-bottom, 0px)",
            }}
        >
            <div className="flex gap-2.5 px-4 py-3">
                {/* Save Contact — primary */}
                <a
                    href="/api/vcf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download="mohamed-khedher.vcf"
                    className="btn-primary flex items-center justify-center gap-2 flex-1 py-3.5 text-sm font-semibold"
                    aria-label="Save Mohamed Khedher to your contacts"
                >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    Save Contact
                </a>

                {/* Book — secondary */}
                <a
                    href={PROFILE.booking}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center justify-center gap-1.5 px-4 py-3.5 text-sm font-semibold"
                    aria-label="Book a 30-minute meeting"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Book
                </a>
            </div>
        </div>
    );
}
