"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { OnboardingShell } from "@/components/worthly/onboarding-shell";
import { LogoMark } from "@/components/worthly/logo";
import { PERSONALITIES } from "@/lib/personality";
import { useQuizStore } from "@/store/quiz-store";

export default function ResultPage() {
  const router = useRouter();
  const result = useQuizStore((s) => s.result);

  // The store is in-memory; if someone lands here without finishing, send them back.
  useEffect(() => {
    if (!result) router.replace("/quiz");
  }, [result, router]);

  if (!result) return null;

  const profile = PERSONALITIES[result.personality];

  return (
    <OnboardingShell activeStep={2}>
      <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-xl"
        >
          <div className="flex flex-col items-center text-center">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{ background: "var(--cream)" }}
            >
              <LogoMark size={36} background="transparent" />
            </div>
            <span
              className="mt-6 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--green-700)" }}
            >
              Your Money Personality
            </span>
            <h1
              className="font-display mt-3 text-4xl font-semibold leading-tight sm:text-5xl"
              style={{ color: "var(--ink)" }}
            >
              {profile.name}
            </h1>
            <p
              className="mt-2 text-lg italic"
              style={{ color: "var(--ink-soft)" }}
            >
              {profile.tagline}
            </p>
            <p
              className="mt-5 max-w-md text-base leading-relaxed"
              style={{ color: "var(--ink-soft)" }}
            >
              {profile.description}
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div
              className="rounded-2xl bg-white p-5"
              style={{ border: "1px solid var(--line)" }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--green-700)" }}
              >
                Your strength
              </p>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--ink)" }}
              >
                {profile.strength}
              </p>
            </div>
            <div
              className="rounded-2xl bg-white p-5"
              style={{ border: "1px solid var(--line)" }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--accent-gold)" }}
              >
                Watch out for
              </p>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--ink)" }}
              >
                {profile.watchOut}
              </p>
            </div>
          </div>

          <button
            onClick={() => router.push("/dashboard")}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-7 py-4 text-base font-semibold text-white transition-transform active:scale-[0.98]"
            style={{ background: "var(--green-700)" }}
          >
            Go to my dashboard →
          </button>
          <button
            onClick={() => router.push("/quiz")}
            className="mt-4 w-full text-center text-sm transition-colors hover:opacity-70"
            style={{ color: "var(--ink-muted)" }}
          >
            Retake the quiz
          </button>
        </motion.div>
      </div>
    </OnboardingShell>
  );
}
