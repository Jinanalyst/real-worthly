import Link from "next/link";
import { LogoMark } from "@/components/worthly/logo";

const TRACKER = [
  { title: "Four questions", body: "No wrong answers" },
  { title: "Your personality", body: "Meet your money self" },
  { title: "Your first goal", body: "Small and real" },
  { title: "Your profile", body: "Make it yours" },
];

interface OnboardingShellProps {
  /** 1-based index of the active tracker stage. */
  activeStep?: number;
  children: React.ReactNode;
}

/** Split layout: dark-green info rail on the left, working area on the right. */
export function OnboardingShell({
  activeStep = 1,
  children,
}: OnboardingShellProps) {
  return (
    <div className="flex min-h-screen" style={{ background: "var(--cream-2)" }}>
      {/* Left rail */}
      <aside
        className="hidden w-[400px] shrink-0 flex-col justify-between px-10 py-9 lg:flex"
        style={{
          background:
            "linear-gradient(160deg, var(--green-900) 0%, var(--green-700) 100%)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <LogoMark size={28} />
            <span className="font-display text-xl font-semibold text-white">
              Worthly
            </span>
          </div>
          <Link
            href="/"
            className="text-sm text-white/60 transition-colors hover:text-white"
          >
            ‹ Exit to site
          </Link>
        </div>

        <div>
          <span
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--accent-gold)" }}
          >
            Get started
          </span>
          <h2 className="font-display mt-4 text-3xl font-semibold leading-tight text-white">
            A money app that starts with how you feel.
          </h2>

          <ol className="mt-10 space-y-5">
            {TRACKER.map((item, i) => {
              const stage = i + 1;
              const isActive = stage === activeStep;
              const isDone = stage < activeStep;
              return (
                <li key={item.title} className="flex items-center gap-4">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors"
                    style={{
                      background:
                        isActive || isDone ? "var(--accent-gold)" : "transparent",
                      color:
                        isActive || isDone ? "var(--green-900)" : "#ffffff",
                      border:
                        isActive || isDone
                          ? "none"
                          : "1px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    {isDone ? "✓" : stage}
                  </span>
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.85)" }}
                    >
                      {item.title}
                    </p>
                    <p className="text-xs text-white/50">{item.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <p className="text-xs leading-relaxed text-white/40">
          Your answers stay on this device. No bank connection, no tracking —
          just you.
        </p>
      </aside>

      {/* Right working area */}
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
