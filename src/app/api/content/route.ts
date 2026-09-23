import { NextResponse } from "next/server";
import { getContent } from "@/lib/contentStore";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const content = await getContent();
    return NextResponse.json(content, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("API GET /api/content error:", error);
    return NextResponse.json({ error: "Failed to load content" }, { status: 500 });
  }
}
