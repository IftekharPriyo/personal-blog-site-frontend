import { proxyAdminImageUpload } from "@/lib/admin-image-upload";

export async function POST(request: Request) {
  return proxyAdminImageUpload(request, "/api/uploads/article-image");
}
