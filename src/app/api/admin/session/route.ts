import { cookies } from "next/headers";
import { getBackendUrl } from "@/lib/auth";

export async function POST(request: Request) {
  let credentials: unknown;

  try {
    credentials = await request.json();
  } catch {
    return Response.json({ message: "Invalid request data" }, { status: 400 });
  }

  try {
    const upstream = await fetch(`${getBackendUrl()}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      cache: "no-store",
    });
    const body = await upstream.text();
    const headers = new Headers({
      "Cache-Control": "no-store",
      "Content-Type": upstream.headers.get("content-type") ?? "application/json",
    });
    const sessionCookie = upstream.headers.get("set-cookie");

    if (sessionCookie) headers.set("Set-Cookie", sessionCookie);

    return new Response(body, { status: upstream.status, headers });
  } catch {
    return Response.json(
      { message: "The admin service is unavailable. Please try again shortly." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("jwt");

  return Response.json(
    { message: "Logged out successfully" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
