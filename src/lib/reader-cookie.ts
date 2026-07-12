import "server-only";

import { type NextRequest, NextResponse } from "next/server";

const READER_COOKIE = "devlog_reader_id";
const ONE_YEAR = 60 * 60 * 24 * 365;
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isHttps(request: NextRequest) {
  const forwardedProtocol = request.headers
    .get("x-forwarded-proto")
    ?.split(",")[0]
    .trim();

  return forwardedProtocol === "https" || request.nextUrl.protocol === "https:";
}

export function getOrCreateReaderId(request: NextRequest) {
  const storedVisitorId = request.cookies.get(READER_COOKIE)?.value;
  return storedVisitorId && UUID_PATTERN.test(storedVisitorId)
    ? storedVisitorId
    : crypto.randomUUID();
}

export function withReaderCookie(
  response: NextResponse,
  request: NextRequest,
  visitorId: string,
) {
  response.cookies.set(READER_COOKIE, visitorId, {
    httpOnly: true,
    maxAge: ONE_YEAR,
    path: "/",
    sameSite: "lax",
    secure: isHttps(request),
  });

  return response;
}
