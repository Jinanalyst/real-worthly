"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { OnboardingShell } from "@/components/worthly/onboarding-shell";
import { LogoMark } from "@/components/worthly/logo";
import { AuthField } from "@/components/worthly/auth-field";
import { signUpWithPassword } from "@/lib/auth-actions";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setError(null);
    setBusy(true);

    const result = await signUpWithPassword({ name, email, password });
    if (!result.ok) {
      setError(result.message);
      setBusy(false);
      return;
    }

    // New account → straight into the personality quiz.
    router.push("/quiz");
  }

  return (
    <OnboardingShell activeStep={1}>
      <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{ background: "var(--cream)" }}
          >
            <LogoMark size={36} background="transparent" />
          </div>
          <h1
            className="font-display mt-8 text-4xl font-semibold leading-tight"
            style={{ color: "var(--ink)" }}
          >
            Create your account
          </h1>
          <p
            className="mt-3 text-base leading-relaxed"
            style={{ color: "var(--ink-soft)" }}
          >
            Start building better money habits. It takes less than a minute —
            then we&apos;ll find your Money Personality.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <AuthField
              label="Name"
              type="text"
              autoComplete="name"
              placeholder="What should we call you?"
              value={name}
              onChange={setName}
              required
            />
            <AuthField
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={setEmail}
              required
            />
            <AuthField
              label="Password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={password}
              onChange={setPassword}
              minLength={8}
              required
            />

            {error && (
              <p
                className="text-sm font-medium"
                style={{ color: "var(--coral)" }}
                role="alert"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-7 py-4 text-base font-semibold text-white transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              style={{ background: "var(--green-700)" }}
            >
              {busy ? "Creating your account…" : "Create account →"}
            </button>
          </form>

          <p className="mt-6 text-sm" style={{ color: "var(--ink-soft)" }}>
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold transition-colors hover:opacity-70"
              style={{ color: "var(--green-700)" }}
            >
              Log in
            </Link>
          </p>
        </motion.div>
      </div>
    </OnboardingShell>
  );
}
