"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { OnboardingShell } from "@/components/worthly/onboarding-shell";
import { LogoMark } from "@/components/worthly/logo";
import { QUIZ_QUESTIONS } from "@/lib/quiz-data";
import { useQuizStore } from "@/store/quiz-store";

type Phase = "intro" | "questions";

export default function QuizPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("intro");

  const { step, answers, totalQuestions, answer, next, back, finish, reset } =
    useQuizStore();

  const question = QUIZ_QUESTIONS[step];
  const currentAnswer = answers.find((a) => a.questionId === question?.id);
  const progress =
    phase === "intro" ? 0 : Math.round(((step + 1) / totalQuestions) * 100);

  function handleBegin() {
    reset();
    setPhase("questions");
  }

  function handleContinue() {
    if (!currentAnswer) return;
    if (step === totalQuestions - 1) {
      finish();
      router.push("/result");
    } else {
      next();
    }
  }

  function handleBack() {
    if (step === 0) {
      setPhase("intro");
    } else {
      back();
    }
  }

  return (
    <OnboardingShell activeStep={1}>
      {/* Top bar: back chevron + progress */}
      <div className="flex items-center gap-4 px-6 pt-6 sm:px-12">
        <button
          onClick={handleBack}
          aria-label="Go back"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg transition-colors hover:bg-black/5"
          style={{ border: "1px solid var(--line)", color: "var(--ink)" }}
        >
          ‹
        </button>
        <div
          className="h-1.5 flex-1 overflow-hidden rounded-full"
          style={{ background: "var(--line)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: "var(--green-700)" }}
          />
        </div>
        <span
          className="w-10 text-right text-sm font-medium tabular-nums"
          style={{ color: "var(--ink-soft)" }}
        >
          {progress}%
        </span>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-12">
        <AnimatePresence mode="wait">
          {phase === "intro" ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="flex max-w-md flex-col items-center text-center"
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
                First, let&apos;s find your Money Personality.
              </h1>
              <p
                className="mt-4 text-base leading-relaxed"
                style={{ color: "var(--ink-soft)" }}
              >
                Four quick questions. No wrong answers — just you, being honest.
                It takes about a minute.
              </p>
              <button
                onClick={handleBegin}
                className="mt-9 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-7 py-4 text-base font-semibold text-white transition-transform active:scale-[0.98]"
                style={{ background: "var(--green-700)" }}
              >
                Begin →
              </button>
              <button
                onClick={() => router.push("/dashboard")}
                className="mt-5 text-sm transition-colors hover:opacity-70"
                style={{ color: "var(--ink-muted)" }}
              >
                Skip — I just want to look around
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={`q-${question.id}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-xl"
            >
              <span
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: "var(--green-700)" }}
              >
                {question.eyebrow}
              </span>
              <h1
                className="font-display mt-3 text-3xl font-semibold leading-tight sm:text-4xl"
                style={{ color: "var(--ink)" }}
              >
                {question.text}
              </h1>

              <div className="mt-8 space-y-3">
                {question.options.map((option) => {
                  // Highlight strictly by unique option id — never by value —
                  // so exactly one option can ever appear selected.
                  const isSelected = currentAnswer?.optionId === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() =>
                        answer(question.id, option.id, option.value)
                      }
                      className="flex w-full items-center gap-4 rounded-2xl bg-white px-5 py-4 text-left transition-all"
                      style={{
                        border: isSelected
                          ? "2px solid var(--green-700)"
                          : "2px solid var(--line)",
                        boxShadow: isSelected
                          ? "0 4px 20px rgba(13,110,90,0.12)"
                          : "none",
                      }}
                    >
                      <span
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors"
                        style={{
                          border: isSelected
                            ? "6px solid var(--green-700)"
                            : "2px solid var(--ink-muted)",
                        }}
                      />
                      <span
                        className="text-base font-medium"
                        style={{ color: "var(--ink)" }}
                      >
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleContinue}
                disabled={!currentAnswer}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-7 py-4 text-base font-semibold text-white transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                style={{ background: "var(--green-700)" }}
              >
                {step === totalQuestions - 1 ? "See my result →" : "Continue →"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </OnboardingShell>
  );
}
