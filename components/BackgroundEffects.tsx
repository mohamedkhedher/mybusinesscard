"use client";

export default function BackgroundEffects() {
    return (
        <div
            aria-hidden="true"
            className="fixed inset-0 overflow-hidden pointer-events-none z-0"
        >
            {/* Top-left purple orb */}
            <div
                className="orb-1 absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-25"
                style={{
                    background:
                        "radial-gradient(circle, rgba(99,102,241,0.6) 0%, rgba(99,102,241,0) 70%)",
                }}
            />
            {/* Top-right subtle orb */}
            <div
                className="orb-2 absolute -top-20 right-0 w-80 h-80 rounded-full opacity-15"
                style={{
                    background:
                        "radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(139,92,246,0) 70%)",
                }}
            />
            {/* Bottom ambient */}
            <div
                className="orb-3 absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 rounded-full opacity-10"
                style={{
                    background:
                        "radial-gradient(ellipse, rgba(99,102,241,0.5) 0%, rgba(99,102,241,0) 70%)",
                }}
            />
            {/* Fine grid lines overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
                    backgroundSize: "60px 60px",
                }}
            />
        </div>
    );
}
