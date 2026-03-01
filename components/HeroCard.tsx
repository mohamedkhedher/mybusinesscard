"use client";

import Image from "next/image";
import { PROFILE } from "@/lib/profile";
import BioExpandable from "./BioExpandable";


export default function HeroCard() {
    return (
        <div className="relative z-10 w-full max-w-md mx-auto px-4 pt-10 pb-4">
            {/* Avatar / Logo area */}
            <div className="flex flex-col items-center text-center mb-6">
                {/* Avatar circle with real photo */}
                <div
                    className="relative mb-4"
                    style={{ width: 96, height: 96 }}
                >
                    <div
                        className="absolute inset-0 rounded-full opacity-60 blur-md"
                        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.7), transparent 70%)" }}
                    />
                    <div
                        className="relative w-full h-full rounded-full overflow-hidden"
                        style={{
                            border: "2px solid rgba(99,102,241,0.4)",
                            boxShadow: "0 0 0 4px rgba(99,102,241,0.08), 0 8px 32px rgba(0,0,0,0.4)",
                        }}
                    >
                        <Image
                            src="/images/mohamed.png"
                            alt="Mohamed Khedher"
                            width={96}
                            height={96}
                            className="object-cover w-full h-full"
                            priority
                        />
                    </div>
                </div>

                {/* Location pill */}
                <div className="location-pill mb-3" aria-label="Current location">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <circle cx="5" cy="5" r="4" fill="currentColor" opacity="0.5" />
                        <circle cx="5" cy="5" r="2" fill="currentColor" />
                    </svg>
                    {PROFILE.locationLabel}
                </div>

                {/* Name */}
                <h1
                    className="text-3xl font-bold tracking-tight mb-1"
                    style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
                >
                    {PROFILE.name}
                </h1>

                {/* Title */}
                <p
                    className="text-base font-medium mb-4"
                    style={{ color: "var(--text-secondary)" }}
                >
                    {PROFILE.title}
                </p>

                {/* Bio */}
                <div
                    className="glass-card px-4 py-4 text-left w-full"
                    style={{ maxWidth: 400 }}
                >
                    <BioExpandable />
                </div>
            </div>
        </div>
    );
}
