# Antigravity Build Prompt — Ox4Labs Digital Business Card PWA (MWC Edition)

## Role & Goal
You are a senior full-stack product engineer + UX designer. Build a **mobile-first Progressive Web App (PWA)** digital business card for **Mohamed Khedher (CEO & Founder of Ox4Labs)** optimized for **MWC lead capture**.

Primary goals (in order):
1) **1-tap “Save to Contacts”** via vCard (.vcf) download/open on iOS + Android
2) **High conversion lead capture**: save visitor contact details to **Google Sheets**
3) **Fast booking**: open Cal.com booking link
4) Visually: premium, modern, “AI Lab” aesthetic with great micro-interactions
5) PWA: installable, offline-friendly for the main page, fast load, reliable

## PWA Requirements (Hard)
- Must be **installable** (Add to Home Screen) on iOS + Android
- Provide:
  - `manifest.webmanifest`
  - Service Worker with runtime caching
  - App icons set (placeholders now; user will provide later)
- Offline behavior:
  - `/` should be available offline after first load
  - Show an offline banner if network is down
- Ensure PWA audit passes (basic): manifest valid, service worker registered, HTTPS assumed (Vercel)

## Tech Stack & Constraints
- **Next.js (App Router)** + **TypeScript** + **Tailwind CSS**
- Deploy-ready on Vercel
- Avoid heavy animation libs; prefer CSS + lightweight JS
- No tracking pixels by default; keep privacy-respectful
- Use `next-pwa` OR a custom service worker (choose simplest that works reliably with Next.js App Router)
- Provide clear environment variable setup

## Content (Hard Requirements)
### Personal info
- Full Name: **Mohamed Khedher**
- Title: **CEO & Founder, Ox4Labs**
- Phone: **+21625400017**
- WhatsApp: **same number**
- Email: **m@ox4labs.com**
- Website: **https://www.ox4labs.com/**
- LinkedIn: **https://www.linkedin.com/in/mohamedkhedher/**
- Instagram: **https://www.instagram.com/mohamed._.khedher/**
- Booking link: **https://cal.com/ox4labs/30min**
- Location label: **MWC Barcelona (this week)**

### Bio (use verbatim unless UI needs shortening)
Mohamed Khedher is the CEO & Founder of Ox4Labs, an AI-first innovation studio building real-world AI systems for enterprises, governments, and ambitious teams that want execution over hype. He focuses on practical LLM adoption (RAG, internal copilots, automation), AI product strategy, and deploying AI capabilities that actually ship, scale, and deliver outcomes. At MWC, Mohamed is meeting partners and clients to explore high-impact use cases, fast pilots, and long-term AI roadmaps.

## UX Requirements
### Above-the-fold (mobile)
- Full-screen hero with:
  - Name
  - Title
  - Location label (small pill)
  - Short bio snippet (2–3 lines with “Read more” expand)
- Primary CTA (very prominent):
  - **Save Contact** (vCard)
- Secondary CTAs (compact row):
  - **WhatsApp**
  - **Call**
  - **Email**
  - **Book 30 min**
- Sticky bottom bar on mobile with:
  - Save Contact (primary)
  - Book (secondary)

### Lead Capture (Google Sheet)
Section: “Send me your card”
- Form fields:
  - Full Name (required)
  - Company (optional)
  - Role/Title (optional)
  - Email (required; validate)
  - Phone (optional)
  - LinkedIn URL (optional)
  - Notes (optional, short)
- Submit button: “Share my contact”
- On submit:
  - Toast + inline success state
  - Persist to Google Sheet with timestamp + source “MWC”
  - Keep user on page
- Anti-spam:
  - Honeypot hidden field
  - Server-side validation
  - Rate limiting (simple)
- PWA offline behavior for form:
  - If offline: queue submission locally (IndexedDB or localStorage) and auto-retry when back online
  - Show “Saved locally — will sync when online” state
  - Sync queue on `online` event

### Social / Links
- Social icons row: LinkedIn, Instagram, Website
- Provide “Copy” buttons:
  - Copy phone
  - Copy email
  - Copy LinkedIn
- Add optional “Share” action using Web Share API if available:
  - Share link to the PWA URL
  - Fallback: copy link

### Design language
- Premium “AI lab” vibe:
  - Dark background, subtle gradient glow, glass cards
  - Micro-interactions: tap scale, soft glow on buttons
  - Clean typography (system / Inter)
- Keep it minimal + high-end

### Accessibility
- Contrast ratios
- ARIA labels for icons
- Keyboard navigable
- Forms have labels + errors

## vCard Requirements (.vcf)
Generate and serve vCard at `/mohamed-khedher.vcf`

Must include:
- FN: Mohamed Khedher
- N: Khedher;Mohamed;;;
- ORG: Ox4Labs
- TITLE: CEO & Founder
- TEL;TYPE=CELL:+21625400017
- TEL;TYPE=WHATSAPP:+21625400017 (best-effort; if unsupported, keep as NOTE or URL)
- EMAIL;TYPE=WORK:m@ox4labs.com
- URL:https://www.ox4labs.com/
- Social links:
  - LinkedIn
  - Instagram
- NOTE: “AI-first innovation studio — execution over hype.”
- Correct headers: `Content-Type: text/vcard; charset=utf-8`

### Save Contact behavior
- Save Contact button links to `/mohamed-khedher.vcf`
- Provide iOS-friendly behavior:
  - Open in a new tab if direct download is blocked
  - Add helper text: “1 tap → saved in your phone contacts”
- PWA note:
  - If the PWA is installed, some file downloads can behave differently; ensure the link still opens and triggers vCard import (use `target="_blank"` where appropriate on iOS)

## WhatsApp Deep Link
WhatsApp button should use:
- `https://wa.me/21625400017` with a prefilled message:
  “Hi Mohamed, met you at MWC — would love to connect.”

Use `encodeURIComponent` for message.

## Booking Link
Book button opens:
- `https://cal.com/ox4labs/30min`

## Google Sheets Integration (Server)
Implement server-side submission to Google Sheets using:

**Google Sheets API with a Service Account**
- Provide instructions:
  - Create Google Cloud project
  - Enable Google Sheets API
  - Create Service Account + JSON key
  - Share the target sheet with service account email
- Env vars:
  - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
  - `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` (handle `\n`)
  - `GOOGLE_SHEET_ID`
  - `GOOGLE_SHEET_TAB_NAME` (default “Leads”)

### Sheet columns (create header row if empty)
TimestampISO
Source (MWC)
VisitorName
Company
Role
Email
Phone
LinkedIn
Notes
UserAgent
Referrer

## PWA Files (Must Create)
### 1) Manifest
- `public/manifest.webmanifest`
Include:
- name: “Mohamed Khedher — Ox4Labs”
- short_name: “Mohamed”
- start_url: “/”
- display: “standalone”
- background_color: “#0B0F19”
- theme_color: “#0B0F19”
- icons: placeholder paths:
  - `/icons/icon-192.png`
  - `/icons/icon-512.png`
  - `/icons/maskable-512.png` (maskable)

### 2) Icons
Create placeholder icons (solid background + “OX4” text) until user provides real images.
Place in `public/icons/`.

### 3) Service Worker
Implement caching:
- Precache core assets and `/`
- Runtime cache:
  - images: Cache First
  - fonts: Cache First
  - HTML: Network First (fallback cache)
- Offline fallback:
  - Show small offline toast + degrade gracefully
- If using `next-pwa`, configure:
  - `runtimeCaching`
  - `register: true`
  - `skipWaiting: true`

### 4) Metadata
In Next.js `app/layout.tsx`:
- Set theme color
- Apple mobile web app capable tags
- Add `apple-touch-icon`
- Set `viewport` correct
- Provide Open Graph tags for sharing (title, description)

## Routes & Structure
- `/` — Landing page (PWA home)
- `/api/lead` — POST endpoint to store lead in Google Sheet
- `/mohamed-khedher.vcf` — vCard endpoint
- OPTIONAL `/offline` — offline fallback page (if desired)

## Offline Lead Queue (Must)
When offline, submissions should not fail:
- Store pending lead objects locally with `id`, `createdAt`, and form data
- On network restore:
  - Attempt to POST each queued lead to `/api/lead`
  - Remove from queue on success
  - Show “Synced ✓” toast
- If repeated failures, keep queued and try again later

Implementation suggestions:
- Simple localStorage queue is acceptable for MVP
- Better: IndexedDB via small helper (but keep lightweight)

## Components to Build
- `HeroCard`
- `PrimaryActions`
- `StickyBottomBar`
- `BioExpandable`
- `SocialLinks`
- `LeadCaptureForm` (with offline queue + sync)
- `Toast/Notification`
- `OfflineBanner`
- `BackgroundEffects` (lightweight)

## Central Config Object
```ts
const PROFILE = {
  name: "Mohamed Khedher",
  title: "CEO & Founder, Ox4Labs",
  phoneE164: "+21625400017",
  phoneDigitsIntl: "21625400017",
  email: "m@ox4labs.com",
  website: "https://www.ox4labs.com/",
  linkedin: "https://www.linkedin.com/in/mohamedkhedher/",
  instagram: "https://www.instagram.com/mohamed._.khedher/",
  booking: "https://cal.com/ox4labs/30min",
  locationLabel: "MWC Barcelona (this week)",
  whatsappPrefill: "Hi Mohamed, met you at MWC — would love to connect.",
};