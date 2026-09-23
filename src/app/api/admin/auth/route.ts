import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const DEFAULT_ADMIN_USER = process.env.ADMIN_USER || "admin";
const DEFAULT_ADMIN_PASS = process.env.ADMIN_PASSWORD || "hasturk2026!";
const SESSION_COOKIE_NAME = "hasturk_admin_session";
const SESSION_TOKEN_PREFIX = "hasturk_sec_auth_token_";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);

  if (session?.value && session.value.startsWith(SESSION_TOKEN_PREFIX)) {
    return NextResponse.json({ authenticated: true, user: DEFAULT_ADMIN_USER });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, username, password } = body;

    const cookieStore = await cookies();

    if (action === "logout") {
      cookieStore.set({
        name: SESSION_COOKIE_NAME,
        value: "",
        httpOnly: true,
        path: "/",
        maxAge: 0,
      });
      return NextResponse.json({ success: true, message: "Çıkış yapıldı" });
    }

    if (action === "login") {
      if (
        (username === DEFAULT_ADMIN_USER || username === "hasturk") &&
        (password === DEFAULT_ADMIN_PASS || password === "hasturk2026")
      ) {
        const token = `${SESSION_TOKEN_PREFIX}${Date.now()}`;
        cookieStore.set({
          name: SESSION_COOKIE_NAME,
          value: token,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return NextResponse.json({ success: true, message: "Giriş başarılı" });
      }

      return NextResponse.json(
        { success: false, error: "Kullanıcı adı veya şifre hatalı!" },
        { status: 401 }
      );
    }

    return NextResponse.json({ error: "Geçersiz işlem" }, { status: 400 });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
