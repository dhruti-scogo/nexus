import { createClient } from "@/lib/supabase/server";
import { AuthButtonClient } from "./auth-button.client";

export async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // We are only passing the email to the client component.
  // This is a plain string and is safe to pass.
  return <AuthButtonClient userEmail={user?.email ?? null} />;
}
