"use client";

import { useState } from "react";
import { PROFILE } from "@/lib/profile";

export default function BioExpandable() {
    const [expanded, setExpanded] = useState(false);

    return (
        <div>
            <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
            >
                {expanded ? PROFILE.bio : PROFILE.bioShort}
            </p>
            <button
                onClick={() => setExpanded(!expanded)}
                className="mt-2 text-xs font-semibold tracking-wide transition-colors duration-150"
                style={{ color: "var(--accent-light)" }}
                aria-expanded={expanded}
            >
                {expanded ? "Show less ↑" : "Read more →"}
            </button>
        </div>
    );
}
