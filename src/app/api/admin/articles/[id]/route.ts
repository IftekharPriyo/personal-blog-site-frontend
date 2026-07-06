import { cookies } from "next/headers";
import { getBackendUrl } from "@/lib/auth";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteContext) {
  const token = (await cookies()).get("jwt")?.value;
  if (!token) {
    return Response.json({ message: "Authentication required" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Invalid request data" }, { status: 400 });
  }

  const { id } = await params;

  try {
    const upstream = await fetch(
      `${getBackendUrl()}/api/articles/${encodeURIComponent(id)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          cookie: `jwt=${token}`,
        },
        body: JSON.stringify(body),
        cache: "no-store",
      },
    );

    return new Response(await upstream.text(), {
      status: upstream.status,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": upstream.headers.get("content-type") ?? "application/json",
      },
    });
  } catch {
    return Response.json(
      { message: "The article service is unavailable. Please try again shortly." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
