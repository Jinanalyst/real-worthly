import Link from "next/link";

function WorthlyMark() {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 1200 1200"
      role="img"
      aria-label="Worthly logo"
      style={{ borderRadius: 20 }}
    >
      <rect width="1200" height="1200" fill="var(--primary)" />
      <g transform="translate(600 600)">
        <rect x="-150" y="-10" width="60" height="130" rx="22" fill="#ffffff" />
        <rect x="-58" y="-80" width="60" height="200" rx="22" fill="#ffffff" />
        <rect x="34" y="-150" width="60" height="270" rx="22" fill="#ffffff" />
        <path
          d="M-190 80 Q-10 200 190 -150"
          fill="none"
          stroke="var(--accent-gold)"
          strokeWidth="34"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export default function Home() {
  return (
    <main
      style={{ background: "var(--bg)", color: "var(--text-primary)" }}
      className="flex min-h-screen flex-col items-center justify-center px-6 py-20"
    >
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <WorthlyMark />

        <h1 className="mt-8 text-4xl font-bold tracking-tight">Worthly</h1>

        <p
          style={{ color: "var(--text-secondary)" }}
          className="mt-3 text-lg leading-relaxed"
        >
          Discover your money personality and build habits that actually stick.
        </p>

        <div className="mt-10 flex w-full flex-col gap-3">
          <Link href="/quiz" className="w-btn w-full">
            Take the quiz
          </Link>
          <Link
            href="/login"
            className="w-btn w-full"
            style={{
              background: "var(--surface-2)",
              color: "var(--text-primary)",
            }}
          >
            Log in
          </Link>
        </div>

        <p style={{ color: "var(--text-muted)" }} className="mt-8 text-sm">
          New here?{" "}
          <Link
            href="/signup"
            style={{ color: "var(--accent-gold)" }}
            className="font-medium hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
