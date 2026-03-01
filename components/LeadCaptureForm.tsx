"use client";

import { useState, useEffect, useRef } from "react";
import { useToast } from "./Toast";

interface LeadFormData {
    name: string;
    company: string;
    role: string;
    email: string;
    phone: string;
    linkedin: string;
    notes: string;
    honeypot: string;
}

interface QueuedLead {
    id: string;
    createdAt: string;
    data: Omit<LeadFormData, "honeypot">;
}

const QUEUE_KEY = "mwc_lead_queue";

function loadQueue(): QueuedLead[] {
    try {
        const raw = localStorage.getItem(QUEUE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveQueue(queue: QueuedLead[]) {
    try {
        localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
    } catch { }
}

async function submitLead(data: Omit<LeadFormData, "honeypot">): Promise<boolean> {
    const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.ok;
}

export default function LeadCaptureForm() {
    const toast = useToast();
    const [form, setForm] = useState<LeadFormData>({
        name: "",
        company: "",
        role: "",
        email: "",
        phone: "",
        linkedin: "",
        notes: "",
        honeypot: "",
    });
    const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const syncingRef = useRef(false);

    // Sync queue on load + on `online` event
    useEffect(() => {
        const syncQueue = async () => {
            if (syncingRef.current || !navigator.onLine) return;
            const queue = loadQueue();
            if (!queue.length) return;

            syncingRef.current = true;
            const remaining: QueuedLead[] = [];
            let syncedCount = 0;

            for (const item of queue) {
                try {
                    const ok = await submitLead(item.data);
                    if (ok) {
                        syncedCount++;
                    } else {
                        remaining.push(item);
                    }
                } catch {
                    remaining.push(item);
                }
            }

            saveQueue(remaining);
            syncingRef.current = false;

            if (syncedCount > 0) {
                toast(`Synced ${syncedCount} saved contact${syncedCount > 1 ? "s" : ""} ✓`, "success");
            }
        };

        syncQueue();
        window.addEventListener("online", syncQueue);
        return () => window.removeEventListener("online", syncQueue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const validate = () => {
        const errs: Partial<Record<keyof LeadFormData, string>> = {};
        if (!form.name.trim()) errs.name = "Name is required";
        if (!form.email.trim()) {
            errs.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            errs.email = "Enter a valid email address";
        }
        return errs;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof LeadFormData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Honeypot check (client-side)
        if (form.honeypot) return;

        const errs = validate();
        if (Object.keys(errs).length) {
            setErrors(errs);
            return;
        }

        setSubmitting(true);
        const { honeypot: _hp, ...leadData } = form;

        if (!navigator.onLine) {
            // Queue offline
            const queue = loadQueue();
            queue.push({
                id: Math.random().toString(36).slice(2),
                createdAt: new Date().toISOString(),
                data: leadData,
            });
            saveQueue(queue);
            toast("Saved locally — will sync when online ⚡", "offline");
            setSubmitted(true);
            setSubmitting(false);
            return;
        }

        try {
            const ok = await submitLead(leadData);
            if (ok) {
                toast("Contact shared! We'll be in touch 🎉", "success");
                setSubmitted(true);
            } else {
                toast("Something went wrong. Please try again.", "error");
            }
        } catch {
            // Network error — queue it
            const queue = loadQueue();
            queue.push({
                id: Math.random().toString(36).slice(2),
                createdAt: new Date().toISOString(),
                data: leadData,
            });
            saveQueue(queue);
            toast("Saved locally — will sync when online ⚡", "offline");
            setSubmitted(true);
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="relative z-10 w-full max-w-md mx-auto px-4 mb-6">
                <div className="glass-card p-6 text-center animate-fade-in">
                    <div
                        className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: "var(--success)" }}>
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                        Thanks for connecting!
                    </h3>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        Mohamed will follow up soon. See you around MWC!
                    </p>
                    <button
                        onClick={() => { setSubmitted(false); setForm({ name: "", company: "", role: "", email: "", phone: "", linkedin: "", notes: "", honeypot: "" }); }}
                        className="mt-4 text-xs font-medium"
                        style={{ color: "var(--accent-light)" }}
                    >
                        Share another contact
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative z-10 w-full max-w-md mx-auto px-4 mb-6">
            <div className="glass-card p-5">
                <h2 className="section-heading mb-1">Send me your card</h2>
                <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
                    Drop your details and let&apos;s stay connected after MWC.
                </p>

                <form onSubmit={handleSubmit} noValidate>
                    {/* Honeypot — hidden from humans */}
                    <input
                        type="text"
                        name="honeypot"
                        value={form.honeypot}
                        onChange={handleChange}
                        autoComplete="off"
                        tabIndex={-1}
                        aria-hidden="true"
                        style={{ display: "none" }}
                    />

                    <div className="flex flex-col gap-3">
                        {/* Name */}
                        <div>
                            <label className="form-label" htmlFor="lead-name">
                                Full Name <span aria-hidden="true" style={{ color: "var(--error)" }}>*</span>
                            </label>
                            <input
                                id="lead-name"
                                className="form-input"
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Jane Smith"
                                autoComplete="name"
                                required
                                aria-required="true"
                                aria-describedby={errors.name ? "lead-name-err" : undefined}
                            />
                            {errors.name && <p id="lead-name-err" className="form-error" role="alert">{errors.name}</p>}
                        </div>

                        {/* Company + Role row */}
                        <div className="grid grid-cols-2 gap-2.5">
                            <div>
                                <label className="form-label" htmlFor="lead-company">Company</label>
                                <input
                                    id="lead-company"
                                    className="form-input"
                                    type="text"
                                    name="company"
                                    value={form.company}
                                    onChange={handleChange}
                                    placeholder="Acme Corp"
                                    autoComplete="organization"
                                />
                            </div>
                            <div>
                                <label className="form-label" htmlFor="lead-role">Role / Title</label>
                                <input
                                    id="lead-role"
                                    className="form-input"
                                    type="text"
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}
                                    placeholder="CTO"
                                    autoComplete="organization-title"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="form-label" htmlFor="lead-email">
                                Email <span aria-hidden="true" style={{ color: "var(--error)" }}>*</span>
                            </label>
                            <input
                                id="lead-email"
                                className="form-input"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="jane@company.com"
                                autoComplete="email"
                                required
                                aria-required="true"
                                aria-describedby={errors.email ? "lead-email-err" : undefined}
                            />
                            {errors.email && <p id="lead-email-err" className="form-error" role="alert">{errors.email}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="form-label" htmlFor="lead-phone">Phone</label>
                            <input
                                id="lead-phone"
                                className="form-input"
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="+1 555 000 1234"
                                autoComplete="tel"
                            />
                        </div>

                        {/* LinkedIn */}
                        <div>
                            <label className="form-label" htmlFor="lead-linkedin">LinkedIn URL</label>
                            <input
                                id="lead-linkedin"
                                className="form-input"
                                type="url"
                                name="linkedin"
                                value={form.linkedin}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/in/you"
                                autoComplete="url"
                            />
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="form-label" htmlFor="lead-notes">Notes</label>
                            <textarea
                                id="lead-notes"
                                className="form-input resize-none"
                                name="notes"
                                value={form.notes}
                                onChange={handleChange}
                                placeholder="What did we discuss? Any context..."
                                rows={2}
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={submitting}
                            className="btn-primary w-full py-3.5 text-sm mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
                            aria-label="Submit your contact information"
                        >
                            {submitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                                    </svg>
                                    Sharing…
                                </span>
                            ) : "Share my contact"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
