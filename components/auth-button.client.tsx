"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { LoadingButton } from "./ui/loading-button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AuthButtonClient({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await supabase.auth.signOut();
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return isLoggedIn ? (
    <LoadingButton 
      onClick={handleLogout} 
      size="sm"
      loading={isLoggingOut}
      loadingText="Logging out..."
    >
      Logout
    </LoadingButton>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
} 