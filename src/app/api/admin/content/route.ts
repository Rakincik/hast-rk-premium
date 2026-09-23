import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getContent, saveContent } from "@/lib/contentStore";
import { SiteContent } from "@/lib/types/content";

const SESSION_COOKIE_NAME = "hasturk_admin_session";
const SESSION_TOKEN_PREFIX = "hasturk_sec_auth_token_";

async function isAuthorized() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);
  return !!(session?.value && session.value.startsWith(SESSION_TOKEN_PREFIX));
}

export async function GET() {
  const auth = await isAuthorized();
  if (!auth) {
    return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
  }

  const content = await getContent();
  return NextResponse.json(content);
}

export async function POST(req: NextRequest) {
  try {
    const auth = await isAuthorized();
    if (!auth) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    const body = await req.json();
    const { section, data, fullContent } = body;

    if (fullContent) {
      const saved = await saveContent(fullContent as SiteContent);
      return NextResponse.json({ success: true, message: "Tüm içerik güncellendi", content: saved });
    }

    if (section && data !== undefined) {
      const current = await getContent();
      const updated = {
        ...current,
        [section]: data,
      };
      const saved = await saveContent(updated);
      return NextResponse.json({
        success: true,
        message: `${section} başarıyla güncellendi`,
        content: saved,
      });
    }

    return NextResponse.json({ error: "Eksik parametre" }, { status: 400 });
  } catch (error) {
    console.error("Admin content update error:", error);
    return NextResponse.json({ error: "İçerik kaydedilemedi" }, { status: 500 });
  }
}
