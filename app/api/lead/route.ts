import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;       // max requests
const RATE_WINDOW = 60_000; // per 60 seconds

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
        return false;
    }

    if (entry.count >= RATE_LIMIT) return true;
    entry.count++;
    return false;
}

export async function POST(req: NextRequest) {
    // Rate limiting
    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        req.headers.get("x-real-ip") ||
        "unknown";

    if (isRateLimited(ip)) {
        return NextResponse.json(
            { error: "Too many requests" },
            { status: 429 }
        );
    }

    let body: Record<string, string>;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    // Honeypot
    if (body.honeypot) {
        return NextResponse.json({ ok: true }); // Silently ignore
    }

    // Server-side validation
    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    if (!name || !email) {
        return NextResponse.json(
            { error: "Name and email are required" },
            { status: 422 }
        );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: "Invalid email" }, { status: 422 });
    }

    // Collect metadata
    const now = new Date().toISOString();
    const userAgent = req.headers.get("user-agent") ?? "";
    const referrer = req.headers.get("referer") ?? "";

    // Build row
    const row = [
        now,                                   // TimestampISO
        "MWC",                                 // Source
        name,                                  // VisitorName
        (body.company ?? "").trim(),           // Company
        (body.role ?? "").trim(),              // Role
        email,                                 // Email
        (body.phone ?? "").trim(),             // Phone
        (body.linkedin ?? "").trim(),          // LinkedIn
        (body.notes ?? "").trim(),             // Notes
        userAgent,                             // UserAgent
        referrer,                              // Referrer
    ];

    // Google Sheets
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ?? "").replace(/\\n/g, "\n");
    const sheetId = process.env.GOOGLE_SHEET_ID;
    const tabName = process.env.GOOGLE_SHEET_TAB_NAME ?? "Leads";

    if (!serviceAccountEmail || !privateKey || !sheetId) {
        console.warn("[lead] Google Sheets env vars not configured — logging to console only");
        console.log("[lead]", JSON.stringify(row));
        return NextResponse.json({ ok: true });
    }

    try {
        const auth = new google.auth.JWT({
            email: serviceAccountEmail,
            key: privateKey,
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        // Ensure header row exists
        const headerRes = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: `${tabName}!A1:K1`,
        });

        const headerRow = headerRes.data.values?.[0];
        if (!headerRow || headerRow.length === 0) {
            await sheets.spreadsheets.values.update({
                spreadsheetId: sheetId,
                range: `${tabName}!A1`,
                valueInputOption: "RAW",
                requestBody: {
                    values: [[
                        "TimestampISO", "Source", "VisitorName", "Company", "Role",
                        "Email", "Phone", "LinkedIn", "Notes", "UserAgent", "Referrer",
                    ]],
                },
            });
        }

        // Append lead row
        await sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: `${tabName}!A1`,
            valueInputOption: "USER_ENTERED",
            insertDataOption: "INSERT_ROWS",
            requestBody: { values: [row] },
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("[lead] Google Sheets error:", err);
        return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }
}
