import { cookies } from "next/headers";
import { getBackendUrl } from "@/lib/auth";

export async function POST(request: Request) {
  const token = (await cookies()).get("jwt")?.value;
  if (!token) {
    return Response.json({ message: "Authentication required" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ message: "Invalid upload data" }, { status: 400 });
  }

  try {
    const upstream = await fetch(`${getBackendUrl()}/api/uploads/cover-image`, {
      method: "POST",
      headers: {
        cookie: `jwt=${token}`,
      },
      body: formData,
      cache: "no-store",
    });

    return new Response(await upstream.text(), {
      status: upstream.status,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": upstream.headers.get("content-type") ?? "application/json",
      },
    });
  } catch {
    return Response.json(
      { message: "The upload service is unavailable. Please try again shortly." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
