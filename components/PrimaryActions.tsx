"use client";

interface PrimaryActionsProps {
    compact?: boolean;
}

export default function PrimaryActions({ compact = false }: PrimaryActionsProps) {
    return (
        <div className={`relative z-10 w-full max-w-md mx-auto px-4 w-full ${compact ? "" : "mb-2"}`}>
            {/* Primary CTA */}
            {!compact && (
                <a
                    href="/api/vcf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center justify-center gap-2.5 w-full py-4 text-base"
                    aria-label="Save Mohamed Khedher to your contacts"
                    download="mohamed-khedher.vcf"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    Save Contact
                </a>
            )}
        </div>
    );
}
