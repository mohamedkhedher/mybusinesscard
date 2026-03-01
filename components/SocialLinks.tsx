"use client";

import Image from "next/image";
import { PROFILE } from "@/lib/profile";

const waMessage = encodeURIComponent(PROFILE.whatsappPrefill);

export default function SocialLinks() {
    return (
        <div className="relative z-10 w-full max-w-md mx-auto px-4 flex flex-col gap-4">
            {/* Connect icons card */}
            <div className="glass-card p-4">
                <h2 className="section-heading mb-3">Let&apos;s Connect</h2>

                {/* Row 1: WhatsApp, Call, Email, Book */}
                <div className="grid grid-cols-4 gap-2.5 mb-2.5">
                    {/* WhatsApp */}
                    <a
                        href={`https://wa.me/${PROFILE.phoneDigitsIntl}?text=${waMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-icon flex-col gap-1.5 py-3 px-1"
                        aria-label="Chat on WhatsApp"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#25D366" />
                        </svg>
                        <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>WhatsApp</span>
                    </a>

                    {/* Call */}
                    <a
                        href={`tel:${PROFILE.phoneE164}`}
                        className="btn-icon flex-col gap-1.5 py-3 px-1"
                        aria-label={`Call ${PROFILE.name}`}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: "var(--accent-light)" }}>
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                        </svg>
                        <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Call</span>
                    </a>

                    {/* Email */}
                    <a
                        href={`mailto:${PROFILE.email}`}
                        className="btn-icon flex-col gap-1.5 py-3 px-1"
                        aria-label={`Email ${PROFILE.name}`}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: "var(--accent-light)" }}>
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                        <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Email</span>
                    </a>

                    {/* Book */}
                    <a
                        href={PROFILE.booking}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-icon flex-col gap-1.5 py-3 px-1"
                        aria-label="Book a 30-minute meeting"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: "var(--accent-light)" }}>
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Book 30m</span>
                    </a>
                </div>

                {/* Row 2: LinkedIn, Instagram, Website, X */}
                <div className="grid grid-cols-4 gap-2.5">
                    {/* LinkedIn */}
                    <a
                        href={PROFILE.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-icon flex-col gap-1.5 py-3"
                        aria-label="LinkedIn profile"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: "#0A66C2" }}>
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>LinkedIn</span>
                    </a>

                    {/* Instagram */}
                    <a
                        href={PROFILE.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-icon flex-col gap-1.5 py-3"
                        aria-label="Instagram profile"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <defs>
                                <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#f09433" />
                                    <stop offset="25%" stopColor="#e6683c" />
                                    <stop offset="50%" stopColor="#dc2743" />
                                    <stop offset="75%" stopColor="#cc2366" />
                                    <stop offset="100%" stopColor="#bc1888" />
                                </linearGradient>
                            </defs>
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#ig-grad)" strokeWidth="2" />
                            <circle cx="12" cy="12" r="4" stroke="url(#ig-grad)" strokeWidth="2" />
                            <circle cx="17.5" cy="6.5" r="1.5" fill="url(#ig-grad)" />
                        </svg>
                        <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Instagram</span>
                    </a>

                    {/* Website */}
                    <a
                        href={PROFILE.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-icon flex-col gap-1.5 py-3"
                        aria-label="Ox4Labs website"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: "var(--accent-light)" }}>
                            <circle cx="12" cy="12" r="10" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                        <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Website</span>
                    </a>

                    {/* X (formerly Twitter) */}
                    <a
                        href="https://x.com/heymoeishere"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-icon flex-col gap-1.5 py-3"
                        aria-label="X profile"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ color: "var(--text-primary)" }}>
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>X</span>
                    </a>
                </div>
            </div>

            {/* Ox4Labs card — clickable, opens website */}
            <a
                href={PROFILE.website}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card glass-card-hover p-4 flex items-center gap-4 group"
                aria-label="Visit Ox4Labs website"
                style={{ textDecoration: "none" }}
            >
                {/* Logo */}
                <div
                    className="flex-shrink-0 rounded-xl overflow-hidden flex items-center justify-center"
                    style={{
                        width: 52,
                        height: 52,
                        background: "#0d1220",
                        border: "1px solid rgba(255,255,255,0.1)",
                    }}
                >
                    <Image
                        src="/images/ox4labs-logo.jpg"
                        alt="Ox4Labs logo"
                        width={52}
                        height={52}
                        className="object-cover"
                    />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>Ox4Labs</p>
                    <p className="text-xs mt-0.5 truncate" style={{ color: "var(--text-secondary)" }}>
                        AI-first innovation studio — execution over hype.
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--accent-light)" }}>ox4labs.com ↗</p>
                </div>

                {/* Arrow */}
                <svg
                    width="18" height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                    style={{ color: "var(--text-muted)" }}
                >
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </a>
        </div>
    );
}
