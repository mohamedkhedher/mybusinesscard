"use client";

import Image from "next/image";
import { PROFILE } from "@/lib/profile";

export default function SocialLinks() {
    return (
        <div className="relative z-10 w-full max-w-md mx-auto px-4 mb-6 flex flex-col gap-3">
            {/* Connect icons card */}
            <div className="glass-card p-4">
                <h2 className="section-heading mb-3">Connect</h2>

                <div className="flex gap-2.5">
                    {/* LinkedIn */}
                    <a
                        href={PROFILE.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-icon flex-col gap-1.5 py-3 flex-1"
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
                        className="btn-icon flex-col gap-1.5 py-3 flex-1"
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
                        className="btn-icon flex-col gap-1.5 py-3 flex-1"
                        aria-label="Ox4Labs website"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: "var(--accent-light)" }}>
                            <circle cx="12" cy="12" r="10" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                        <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Website</span>
                    </a>

                    {/* Email */}
                    <a
                        href={`mailto:${PROFILE.email}`}
                        className="btn-icon flex-col gap-1.5 py-3 flex-1"
                        aria-label={`Email ${PROFILE.name}`}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: "var(--accent-light)" }}>
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                        <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Email</span>
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
