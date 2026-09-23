import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const SESSION_COOKIE_NAME = "hasturk_admin_session";
const SESSION_TOKEN_PREFIX = "hasturk_sec_auth_token_";

async function isAuthorized() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);
  return !!(session?.value && session.value.startsWith(SESSION_TOKEN_PREFIX));
}

interface MediaFile {
  name: string;
  url: string;
  size: number;
  updatedAt: string;
  isCustomUpload: boolean;
}

export async function GET() {
  try {
    const auth = await isAuthorized();
    if (!auth) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    const mediaList: MediaFile[] = [];

    // Scan uploads directory
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);
      for (const f of files) {
        const full = path.join(uploadsDir, f);
        try {
          const stat = fs.statSync(full);
          if (stat.isFile()) {
            mediaList.push({
              name: f,
              url: `/uploads/${f}`,
              size: stat.size,
              updatedAt: stat.mtime.toISOString(),
              isCustomUpload: true,
            });
          }
        } catch {
          // ignore error
        }
      }
    }

    // Sort newest first
    mediaList.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    return NextResponse.json({ files: mediaList });
  } catch (error) {
    console.error("List media error:", error);
    return NextResponse.json({ error: "Medya listesi alınamadı" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const auth = await isAuthorized();
    if (!auth) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const fileName = searchParams.get("file");

    if (!fileName) {
      return NextResponse.json({ error: "Dosya adı belirtilmedi" }, { status: 400 });
    }

    // Security check: prevent directory traversal
    const safeName = path.basename(fileName);
    const filePath = path.join(process.cwd(), "public", "uploads", safeName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return NextResponse.json({ success: true, message: "Dosya silindi" });
    }

    return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 404 });
  } catch (error) {
    console.error("Delete media error:", error);
    return NextResponse.json({ error: "Dosya silinemedi" }, { status: 500 });
  }
}
