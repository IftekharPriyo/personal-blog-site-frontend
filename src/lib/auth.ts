import "server-only";
import { cookies } from "next/headers";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN";
}

export function getBackendUrl() {
  return (process.env.BACKEND_API_URL ?? "http://localhost:5000").replace(
    /\/$/,
    "",
  );
}

function isAdminUser(value: unknown): value is AdminUser {
  if (!value || typeof value !== "object") return false;

  const user = value as Record<string, unknown>;
  return (
    typeof user.id === "string" &&
    typeof user.name === "string" &&
    typeof user.email === "string" &&
    user.role === "ADMIN"
  );
}

export async function getAdminSession(): Promise<AdminUser | null> {
  const token = (await cookies()).get("jwt")?.value;
  if (!token) return null;

  try {
    const response = await fetch(`${getBackendUrl()}/api/auth/protected`, {
      headers: { cookie: `jwt=${token}` },
      cache: "no-store",
    });

    if (!response.ok) return null;

    const data: unknown = await response.json();
    if (!data || typeof data !== "object" || !("user" in data)) return null;

    return isAdminUser(data.user) ? data.user : null;
  } catch {
    return null;
  }
}
