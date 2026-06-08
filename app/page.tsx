"use client";

import { useRouter } from "next/navigation";
import { LogoMark, Wordmark } from "@/components/worthly/logo";
import { Icon, WButton, Card, Chip, SectionLabel } from "@/components/worthly/ui";

const MOODS = [
  { key: "stressed", emoji: "😰" },
  { key: "neutral", emoji: "😐" },
  { key: "okay", emoji: "🙂" },
  { key: "good", emoji: "😊" },
  { key: "motivated", emoji: "💪" },
];

const FEATURES = [
  { icon: "target", t: "Daily Financial Missions", d: "Small, doable actions that build real discipline — three a day, no overwhelm." },
  { icon: "heart", t: "Spending Emotion Tracking", d: "Tag every purchase with how it felt. Patterns surface before they cost you." },
  { icon: "flame", t: "Habit Streaks & Badges", d: "Show up daily. Watch the streak grow. Earn badges that mean something." },
  { icon: "sparkle", t: "Worth Points System", d: "Points that reflect your habits — never your net worth, never real money." },
  { icon: "coins", t: "Testnet Rewards", d: "Experimental, educational digital rewards. Zero monetary value, by design." },
  { icon: "chart", t: "Spending Snapshots", d: "A calm, honest picture of where your money — and your mood — actually went." },
];

const STEPS = [
  { n: "01", t: "Discover your Money Personality", d: "A 4-question check-in, not a survey." },
  { n: "02", t: "Complete daily missions", d: "Three gentle actions, every day." },
  { n: "03", t: "Log spending + how it felt", d: "The number and the emotion behind it." },
  { n: "04", t: "Earn Worth Points", d: "Progress you can actually see." },
  { n: "05", t: "Claim testnet badges & WORTH", d: "Experimental rewards for showing up." },
];

const HOOKS = [
  { e: "😰", t: "The anxiety before checking your balance" },
  { e: "😬", t: "The guilt after an impulse buy" },
  { e: "😤", t: "The frustration of “where did my money go?”" },
];

const TESTIMONIALS = [
  { name: "Rena K.", persona: "The Anxious Saver", quote: "I finally spent $14 on flowers without spiralling. Worthly told me it was okay — and gave me points for it." },
  { name: "Dmitri P.", persona: "The Avoider", quote: "The 10-second check-in is the only money thing I’ve ever done daily. 41 days now." },
  { name: "Sol M.", persona: "The Guilt Spender", quote: "Naming the regret out loud actually made me buy less. Didn’t expect that." },
];

const FOOTER_COLS: [string, string[]][] = [
  ["Product", ["Missions", "Rewards", "Testnet", "Pricing"]],
  ["Company", ["About", "Careers", "Blog"]],
  ["Legal", ["Privacy", "Terms", "Disclosures"]],
];

function PreviewPhone() {
  return (
    <div
      style={{
        width: 320,
        borderRadius: 38,
        padding: 12,
        background: "linear-gradient(160deg,#15473C,#0A332B)",
        boxShadow: "0 40px 90px rgba(9,59,49,0.32), 0 8px 24px rgba(9,59,49,0.18)",
      }}
    >
      <div
        className="w-noise"
        style={{
          position: "relative",
          borderRadius: 28,
          background: "var(--bg)",
          overflow: "hidden",
          padding: "20px 16px 22px",
        }}
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div style={{ fontSize: 12.5, color: "var(--muted)", fontWeight: 600 }}>
              Good morning,
            </div>
            <div className="font-display" style={{ fontSize: 22, color: "var(--ink)", lineHeight: 1.2, marginTop: 2 }}>
              Maya
            </div>
          </div>
          <div
            className="flex items-center gap-1.5"
            style={{ background: "var(--gold-soft)", padding: "6px 11px", borderRadius: 999 }}
          >
            <Icon name="flame" size={15} color="var(--gold)" sw={2} />
            <span style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: 13, color: "#9A7B1E" }}>7</span>
          </div>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg,var(--emerald),var(--emerald-deep))",
            borderRadius: 18,
            padding: 16,
            color: "#fff",
            marginBottom: 12,
          }}
        >
          <div style={{ fontSize: 12, opacity: 0.85, fontWeight: 600 }}>Total Worth Points</div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 30, fontWeight: 700, letterSpacing: -1, margin: "2px 0 10px" }}>
            2,450
          </div>
          <div style={{ height: 6, background: "rgba(255,255,255,0.22)", borderRadius: 99 }}>
            <div style={{ width: "47%", height: "100%", background: "var(--gold)", borderRadius: 99 }} />
          </div>
          <div style={{ fontSize: 11, opacity: 0.8, marginTop: 7 }}>Level 3 · Intentional → Disciplined</div>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: 14,
            boxShadow: "var(--sh-sm)",
            border: "1px solid var(--line-2)",
          }}
        >
          <div className="font-display" style={{ fontSize: 15, marginBottom: 10, color: "var(--ink)" }}>
            How’s money feeling today?
          </div>
          <div className="flex justify-between">
            {MOODS.map((m, i) => (
              <div
                key={m.key}
                style={{
                  width: 42,
                  height: 46,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 21,
                  background: i === 3 ? "var(--teal-soft)" : "var(--bg-gray)",
                  outline: i === 3 ? "2px solid var(--teal)" : "none",
                }}
              >
                {m.emoji}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const onStart = () => router.push("/signup");
  const onLogin = () => router.push("/login");

  return (
    <div style={{ background: "var(--bg)", minHeight: "100%", color: "var(--ink)" }}>
      {/* Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          background: "rgba(248,250,249,0.82)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid var(--line-2)",
        }}
      >
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-7 py-4">
          <Wordmark size={30} />
          <div className="hidden items-center gap-[30px] md:flex">
            {["How it works", "Missions", "Rewards", "Testnet"].map((l) => (
              <a
                key={l}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-navlink"
                style={{ fontSize: 14.5, fontWeight: 500, color: "var(--muted)", textDecoration: "none" }}
              >
                {l}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={onLogin}
              style={{ fontSize: 14.5, fontWeight: 600, color: "var(--emerald-deep)", whiteSpace: "nowrap" }}
            >
              Log in
            </button>
            <WButton size="sm" onClick={onStart} iconRight="arrowR">
              Start Building
            </WButton>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="w-noise" style={{ position: "relative", overflow: "hidden" }}>
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-12 px-7 pb-[72px] pt-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="w-anim-up">
            <Chip tone="emerald" icon="leaf" style={{ marginBottom: 20 }}>
              Build your money habits
            </Chip>
            <h1 className="font-display" style={{ fontSize: "clamp(40px,5vw,62px)", lineHeight: 1.04, letterSpacing: -1, margin: "0 0 18px" }}>
              Build your money habits.
              <br />
              <span style={{ color: "var(--emerald-deep)" }}>Earn your Worth.</span>
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.55, color: "var(--muted)", maxWidth: 480, margin: "0 0 28px" }}>
              Worthly helps you understand your spending emotions, complete
              financial missions, and earn points for building better money
              habits.
            </p>
            <div className="mb-[22px] flex flex-wrap gap-3">
              <WButton size="lg" onClick={onStart} iconRight="arrowR">
                Start Building
              </WButton>
              <WButton size="lg" variant="secondary" onClick={onStart}>
                View Testnet Rewards
              </WButton>
            </div>
            <div className="mb-[22px] flex items-center gap-2" style={{ fontSize: 13, color: "var(--muted)" }}>
              <Icon name="info" size={15} color="var(--gold)" />
              Testnet rewards have no monetary value. This is an educational
              habit app.
            </div>
            <div className="flex flex-wrap gap-[26px] pt-[18px]" style={{ borderTop: "1px solid var(--line)" }}>
              {[
                ["2,400+", "early builders"],
                ["18,000+", "missions completed"],
                ["100%", "free to start"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 22, fontWeight: 700, color: "var(--emerald-deep)" }}>
                    {n}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--muted)" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center w-anim-up">
            <PreviewPhone />
          </div>
        </div>
      </header>

      {/* Emotional hook */}
      <section className="w-noise" style={{ background: "var(--emerald-ink)", color: "#fff", position: "relative", overflow: "hidden" }}>
        <div className="mx-auto max-w-[1000px] px-7 py-20 text-center">
          <h2 className="font-display" style={{ fontSize: "clamp(30px,3.6vw,44px)", lineHeight: 1.12, margin: "0 0 14px" }}>
            Money is emotional.
            <br />
            Most apps ignore that.
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.72)", maxWidth: 560, margin: "0 auto 48px" }}>
            Worthly doesn’t just track numbers. It helps you understand the
            emotions behind them.
          </p>
          <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-3">
            {HOOKS.map((h) => (
              <div
                key={h.t}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 18,
                  padding: "32px 22px",
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 14 }}>{h.e}</div>
                <div style={{ fontSize: 17, lineHeight: 1.4, color: "rgba(255,255,255,0.92)" }}>{h.t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-[1180px] px-7 py-20">
        <div className="mb-11 text-center">
          <SectionLabel>What’s inside</SectionLabel>
          <h2 className="font-display" style={{ fontSize: "clamp(28px,3.4vw,40px)", margin: "6px 0 0" }}>
            Everything you need to build the habit
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <Card key={f.t} pad={24} hover>
              <div
                className="mb-4 flex items-center justify-center"
                style={{ width: 46, height: 46, borderRadius: 13, background: "var(--teal-soft)" }}
              >
                <Icon name={f.icon} size={23} color="var(--emerald-deep)" />
              </div>
              <h3 className="font-display" style={{ fontSize: 20, margin: "0 0 8px" }}>
                {f.t}
              </h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.5, color: "var(--muted)", margin: 0 }}>{f.d}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ background: "var(--bg-gray)" }}>
        <div className="mx-auto max-w-[1180px] px-7 py-20">
          <div className="mb-11 text-center">
            <SectionLabel>How it works</SectionLabel>
            <h2 className="font-display" style={{ fontSize: "clamp(28px,3.4vw,40px)", margin: "6px 0 0" }}>
              Five steps to your Worth
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((s) => (
              <div key={s.n} style={{ background: "#fff", borderRadius: 16, padding: 22, border: "1px solid var(--line-2)" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: 13, fontWeight: 700, color: "var(--gold)", marginBottom: 28 }}>
                  {s.n}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 16, margin: "0 0 6px", lineHeight: 1.25 }}>{s.t}</h3>
                <p style={{ fontSize: 13.5, color: "var(--muted)", margin: 0, lineHeight: 1.45 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto max-w-[1180px] px-7 py-20">
        <div className="mb-3.5 text-center">
          <h2 className="font-display" style={{ fontSize: "clamp(26px,3vw,36px)", margin: 0 }}>
            Built for habit builders — not traders
          </h2>
          <p style={{ fontSize: 16, color: "var(--muted)", marginTop: 10 }}>
            No charts to obsess over. No hype. Just a calmer relationship with
            money.
          </p>
        </div>
        <div className="mt-9 grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} pad={24}>
              <div className="mb-3.5 flex gap-[3px]">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Icon key={i} name="sparkle" size={15} color="var(--gold)" sw={1.5} />
                ))}
              </div>
              <p className="font-display" style={{ fontSize: 18, lineHeight: 1.45, margin: "0 0 18px", color: "var(--ink)" }}>
                “{t.quote}”
              </p>
              <div className="flex items-center gap-[11px]">
                <div
                  className="flex items-center justify-center"
                  style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--emerald-deep)", color: "#fff", fontWeight: 700, fontSize: 15 }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                  <div style={{ fontSize: 12.5, color: "var(--muted)" }}>{t.persona}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mb-3 max-w-[1180px] px-7">
        <div
          className="w-noise"
          style={{
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(135deg,var(--emerald),var(--emerald-deep))",
            borderRadius: 28,
            padding: "64px 40px",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <h2 className="font-display" style={{ fontSize: "clamp(30px,3.6vw,46px)", margin: "0 0 14px" }}>
            Your self-worth isn’t defined by your spending.
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", maxWidth: 520, margin: "0 auto 28px" }}>
            But your habits shape your Worth. Start with one small mission today.
          </p>
          <div className="flex justify-center">
            <WButton size="lg" variant="gold" onClick={onStart} iconRight="arrowR">
              Start Building — it’s free
            </WButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-[1180px] px-7 pb-[60px] pt-12">
        <div className="flex flex-wrap justify-between gap-6 pb-7" style={{ borderBottom: "1px solid var(--line)" }}>
          <div style={{ maxWidth: 280 }}>
            <Wordmark size={28} />
            <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 12, lineHeight: 1.5 }}>
              Build your money habits. Earn your Worth.
            </p>
          </div>
          <div className="flex flex-wrap gap-14">
            {FOOTER_COLS.map(([h, items]) => (
              <div key={h}>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, color: "var(--muted)", marginBottom: 12 }}>
                  {h}
                </div>
                {items.map((i) => (
                  <div key={i} style={{ fontSize: 14, color: "var(--ink)", marginBottom: 9, cursor: "pointer" }}>
                    {i}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <p style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 22, lineHeight: 1.6, maxWidth: 720 }}>
          Worthly is a habit and education app. Worth Points and testnet WORTH
          have no monetary value and cannot be exchanged for real currency or
          assets. This is not financial advice.
        </p>
      </footer>
    </div>
  );
}
