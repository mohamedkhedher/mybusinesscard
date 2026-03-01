"use client";

import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info" | "offline";

export interface ToastMessage {
    id: string;
    message: string;
    type: ToastType;
}

export type ToastFn = (message: string, type?: ToastType) => void;

let globalToast: ToastFn = () => { };

export function useToast() {
    return globalToast;
}

export default function Toast() {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    useEffect(() => {
        globalToast = (message: string, type: ToastType = "info") => {
            const id = Math.random().toString(36).slice(2);
            setToasts((prev) => [...prev, { id, message, type }]);
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, 3500);
        };
    }, []);

    const colorMap: Record<ToastType, { bg: string; border: string; icon: string }> = {
        success: { bg: "rgba(16,185,129,0.15)", border: "rgba(16,185,129,0.3)", icon: "✓" },
        error: { bg: "rgba(239,68,68,0.15)", border: "rgba(239,68,68,0.3)", icon: "✕" },
        info: { bg: "rgba(99,102,241,0.15)", border: "rgba(99,102,241,0.3)", icon: "ℹ" },
        offline: { bg: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.3)", icon: "⚡" },
    };

    if (!toasts.length) return null;

    return (
        <div
            className="fixed bottom-28 left-0 right-0 z-[100] flex flex-col items-center gap-2 px-4 pointer-events-none"
            aria-live="polite"
            aria-label="Notifications"
        >
            {toasts.map((t) => {
                const colors = colorMap[t.type];
                return (
                    <div
                        key={t.id}
                        className="animate-slide-up flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium max-w-sm w-full"
                        style={{
                            background: colors.bg,
                            border: `1px solid ${colors.border}`,
                            backdropFilter: "blur(16px)",
                            color: "var(--text-primary)",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                        }}
                        role="alert"
                    >
                        <span className="text-base">{colors.icon}</span>
                        <span>{t.message}</span>
                    </div>
                );
            })}
        </div>
    );
}
