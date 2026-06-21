import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/admin/dashboard-shell";
import { getAdminSession } from "@/lib/auth";

export default async function ProtectedAdminLayout({
  children,
}: LayoutProps<"/admin">) {
  const admin = await getAdminSession();

  if (!admin) redirect("/admin");

  return <DashboardShell admin={admin}>{children}</DashboardShell>;
}
