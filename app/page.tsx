import Link from "next/link";
import { LogoMark, Wordmark } from "@/components/worthly/logo";

const STEPS = [
  { n: "1", title: "Four questions", body: "No wrong answers." },
  { n: "2", title: "Your personality", body: "Meet your money self." },
  { n: "3", title: "Your first goal", body: "Small and real." },
  { n: "4", title: "Your profile", body: "Make it yours." },
];

export default function LandingPage() {
  return (
    <main style={{ background: "var(--cream)" }} className="min-h-screen">
      {/* Top nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2.5">
          <LogoMark size={30} />
          <span
            className="font-display text-xl font-semibold tracking-tight"
            style={{ color: "var(--ink)" }}
          >
            Worthly
          </span>
        </div>
        <Link
          href="/login"
          className="text-sm font-medium transition-colors hover:opacity-70"
          style={{ color: "var(--ink-soft)" }}
        >
          Log in
        </Link>
      </header>

      {/* Hero */}
      <section
        className="relative mx-auto mt-4 max-w-6xl overflow-hidden px-8 py-16 sm:px-14 sm:py-20"
        style={{
          background:
            "linear-gradient(135deg, var(--green-900) 0%, var(--green-700) 100%)",
          borderRadius: 28,
        }}
      >
        <div className="max-w-2xl">
          <span
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--accent-gold)" }}
          >
            Get started
          </span>
          <h1
            className="font-display mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-6xl"
          >
            A money app that starts with how you feel.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
            Discover your money personality in about a minute, then build small
            habits that actually stick. No spreadsheets, no judgement.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-4 text-base font-semibold transition-transform active:scale-[0.98]"
              style={{ background: "var(--accent-gold)", color: "var(--green-900)" }}
            >
              Find your Money Personality →
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-2xl border border-white/25 px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              I already have an account
            </Link>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-6xl px-8 py-16 sm:px-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="rounded-3xl bg-white p-6"
              style={{ border: "1px solid var(--line)" }}
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-white"
                style={{ background: "var(--green-700)" }}
              >
                {step.n}
              </div>
              <h3
                className="mt-4 text-base font-semibold"
                style={{ color: "var(--ink)" }}
              >
                {step.title}
              </h3>
              <p className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy reassurance */}
      <section className="mx-auto max-w-6xl px-8 pb-20 sm:px-14">
        <div
          className="flex flex-col items-center gap-4 rounded-3xl px-8 py-12 text-center"
          style={{ background: "var(--cream-2)", border: "1px solid var(--line)" }}
        >
          <Wordmark color="var(--ink)" size={26} />
          <p
            className="max-w-md text-sm leading-relaxed"
            style={{ color: "var(--ink-soft)" }}
          >
            Your answers stay on this device. No bank connection, no tracking —
            just you.
          </p>
          <Link
            href="/quiz"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white transition-transform active:scale-[0.98]"
            style={{ background: "var(--green-700)" }}
          >
            Take the quiz
          </Link>
        </div>
      </section>

      <footer
        className="border-t py-8 text-center text-xs"
        style={{ borderColor: "var(--line)", color: "var(--ink-muted)" }}
      >
        © {2026} Worthly. Made for how you actually feel about money.
      </footer>
    </main>
  );
}
