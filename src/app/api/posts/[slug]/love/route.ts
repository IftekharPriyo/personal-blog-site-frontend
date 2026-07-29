import { type NextRequest, NextResponse } from "next/server";
import { getBackendUrl } from "@/lib/auth";
import { getOrCreateReaderId, withReaderCookie } from "@/lib/reader-cookie";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

async function proxyLoveRequest(
  request: NextRequest,
  context: RouteContext,
  method: "GET" | "PUT" | "DELETE",
) {
  const visitorId = getOrCreateReaderId(request);
  const { slug } = await context.params;
  const endpoint = `${getBackendUrl()}/api/posts/${encodeURIComponent(slug)}/love`;
  const url =
    method === "GET"
      ? `${endpoint}?${new URLSearchParams({ visitorId })}`
      : endpoint;

  try {
    const upstream = await fetch(url, {
      method,
      headers: method === "GET" ? undefined : { "Content-Type": "application/json" },
      body: method === "GET" ? undefined : JSON.stringify({ visitorId }),
      cache: "no-store",
    });

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
        { message: "The love service is unavailable." },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      ),
      request,
      visitorId,
    );
  }
}

export function GET(request: NextRequest, context: RouteContext) {
  return proxyLoveRequest(request, context, "GET");
}

export function PUT(request: NextRequest, context: RouteContext) {
  return proxyLoveRequest(request, context, "PUT");
}

export function DELETE(request: NextRequest, context: RouteContext) {
  return proxyLoveRequest(request, context, "DELETE");
}
