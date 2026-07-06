import { serialize } from "next-mdx-remote/serialize";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { getAdminSession } from "@/lib/auth";

export async function POST(request: Request) {
  if (!(await getAdminSession())) {
    return Response.json({ message: "Authentication required" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Invalid request data" }, { status: 400 });
  }

  const content =
    body && typeof body === "object" && "content" in body
      ? (body as { content?: unknown }).content
      : null;

  if (typeof content !== "string" || content.length > 900_000) {
    return Response.json({ message: "Valid MDX content is required" }, { status: 400 });
  }

  try {
    const source = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: { light: "github-light", dark: "github-dark-dimmed" },
              keepBackground: false,
            },
          ],
        ],
      },
    });

    return Response.json(source);
  } catch (error) {
    return Response.json(
      { message: error instanceof Error ? error.message : "Unable to compile MDX" },
      { status: 422 },
    );
  }
}
