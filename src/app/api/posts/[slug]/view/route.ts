import { type NextRequest, NextResponse } from "next/server";
import { getBackendUrl } from "@/lib/auth";
import { getOrCreateReaderId, withReaderCookie } from "@/lib/reader-cookie";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  const visitorId = getOrCreateReaderId(request);
  const { slug } = await params;

  try {
    const upstream = await fetch(
      `${getBackendUrl()}/api/posts/${encodeURIComponent(slug)}/view`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId }),
        cache: "no-store",
      },
    );

    const response = new NextResponse(await upstream.text(), {
      status: upstream.status,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": upstream.headers.get("content-type") ?? "application/json",
      },
    });

    return withReaderCookie(response, request, visitorId);
  } catch {
    return withReaderCookie(
      NextResponse.json(
        { message: "The view service is unavailable." },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      ),
      request,
      visitorId,
    );
  }
}
