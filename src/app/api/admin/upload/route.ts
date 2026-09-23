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

const ALLOWED_EXTENSIONS = [
  ".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif", ".avif",
  ".mp4", ".webm", ".mov"
];

export async function POST(req: NextRequest) {
  try {
    const auth = await isAuthorized();
    if (!auth) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    const formData = await req.formData();
    
    // Support both single "file" and multiple "files" or multiple "file"
    const fileEntries = [
      ...formData.getAll("files"),
      ...formData.getAll("file"),
    ].filter((item): item is File => item instanceof File && item.size > 0);

    if (fileEntries.length === 0) {
      return NextResponse.json({ error: "Dosya bulunamadı veya dosya boyutu 0" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const results = [];

    for (const file of fileEntries) {
      const originalName = file.name;
      const ext = path.extname(originalName).toLowerCase();

      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        continue;
      }

      // Clean & safe filename
      const baseName = path
        .basename(originalName, ext)
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, "-")
        .substring(0, 45);

      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e5)}`;
      const finalFileName = `${baseName}-${uniqueSuffix}${ext}`;
      const filePath = path.join(uploadDir, finalFileName);
      const buffer = Buffer.from(await file.arrayBuffer());

      fs.writeFileSync(filePath, buffer);

      const publicUrl = `/uploads/${finalFileName}`;
      results.push({
        url: publicUrl,
        fileName: finalFileName,
        originalName,
        size: file.size,
        mimeType: file.type,
      });
    }

    if (results.length === 0) {
      return NextResponse.json(
        { error: `Geçersiz dosya formatı! İzin verilenler: ${ALLOWED_EXTENSIONS.join(", ")}` },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      files: results,
      url: results[0].url,
      fileName: results[0].fileName,
      size: results[0].size,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Dosya yüklenemedi" }, { status: 500 });
  }
}
