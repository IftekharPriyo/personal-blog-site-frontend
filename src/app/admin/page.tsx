import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { AdminSession } from "@/components/admin/admin-session";
import { Container } from "@/components/shared/container";
import { getAdminSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin",
  description: "Private administration area.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default async function AdminPage() {
  const admin = await getAdminSession();

  return (
    <Container className="flex min-h-[calc(100vh-13rem)] items-center justify-center py-12 sm:py-16">
      <section className="w-full max-w-md" aria-labelledby="admin-heading">
        <p className="text-sm font-medium uppercase text-primary">
          Private area
        </p>
        <h1 id="admin-heading" className="mt-4 text-4xl font-semibold">
          {admin ? "Admin access" : "Welcome back."}
        </h1>
        <p className="mt-4 leading-7 text-muted-foreground">
          {admin
            ? "Your administrator session is active."
            : "Sign in with your administrator account to continue."}
        </p>

        {admin ? (
          <AdminSession name={admin.name} email={admin.email} />
        ) : (
          <AdminLoginForm />
        )}
      </section>
    </Container>
  );
}
