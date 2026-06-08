import { createClient } from "@/lib/supabase/client";

export type AuthResult = { ok: true } | { ok: false; message: string };

/** True when Supabase credentials are present in the environment. */
function isSupabaseConfigured() {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

interface SignUpInput {
  name: string;
  email: string;
  password: string;
}

export async function signUpWithPassword({
  name,
  email,
  password,
}: SignUpInput): Promise<AuthResult> {
  // No backend wired yet → let the onboarding flow proceed (demo mode).
  if (!isSupabaseConfigured()) return { ok: true };

  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) return { ok: false, message: error.message };
    return { ok: true };
  } catch {
    return { ok: false, message: "Something went wrong. Please try again." };
  }
}

interface SignInInput {
  email: string;
  password: string;
}

export async function signInWithPassword({
  email,
  password,
}: SignInInput): Promise<AuthResult> {
  // No backend wired yet → let the user into the dashboard (demo mode).
  if (!isSupabaseConfigured()) return { ok: true };

  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return { ok: false, message: error.message };
    return { ok: true };
  } catch {
    return { ok: false, message: "Something went wrong. Please try again." };
  }
}
