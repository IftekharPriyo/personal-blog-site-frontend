"use client";

import { useState } from "react";
import { LoaderCircle, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface AdminSessionProps {
  name: string;
  email: string;
}

export function AdminSession({ name, email }: AdminSessionProps) {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function signOut() {
    setIsSigningOut(true);

    try {
      await fetch("/api/admin/session", { method: "DELETE" });
      router.refresh();
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <div className="mt-8 rounded-xl border border-border bg-card p-5 sm:p-6">
      <dl className="space-y-4 text-sm">
        <div>
          <dt className="text-muted-foreground">Administrator</dt>
          <dd className="mt-1 font-medium">{name}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Email</dt>
          <dd className="mt-1 font-medium">{email}</dd>
        </div>
      </dl>

      <Button
        className="mt-6"
        variant="outline"
        onClick={signOut}
        disabled={isSigningOut}
      >
        {isSigningOut ? (
          <LoaderCircle className="animate-spin" aria-hidden="true" />
        ) : (
          <LogOut aria-hidden="true" />
        )}
        {isSigningOut ? "Signing out…" : "Sign out"}
      </Button>
    </div>
  );
}
