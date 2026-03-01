import { NextResponse } from "next/server";
import { PROFILE } from "@/lib/profile";

export async function GET() {
    const vcard = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:${PROFILE.name}`,
        `N:Khedher;Mohamed;;;`,
        `ORG:Ox4Labs`,
        `TITLE:CEO & Founder`,
        `TEL;TYPE=CELL:${PROFILE.phoneE164}`,
        `TEL;TYPE=WORK:${PROFILE.phoneE164}`,
        `EMAIL;TYPE=WORK:${PROFILE.email}`,
        `URL:${PROFILE.website}`,
        `X-SOCIALPROFILE;type=linkedin:${PROFILE.linkedin}`,
        `X-SOCIALPROFILE;type=instagram:${PROFILE.instagram}`,
        `NOTE:AI-first innovation studio — execution over hype. Met at MWC Barcelona.`,
        `X-WHATSAPP:${PROFILE.phoneDigitsIntl}`,
        "END:VCARD",
    ].join("\r\n");

    return new NextResponse(vcard, {
        status: 200,
        headers: {
            "Content-Type": "text/vcard; charset=utf-8",
            "Content-Disposition": 'attachment; filename="mohamed-khedher.vcf"',
            "Cache-Control": "public, max-age=86400",
        },
    });
}
