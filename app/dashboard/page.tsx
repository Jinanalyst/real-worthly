"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon, Card, WButton, Bar, WP, useCountUp } from "@/components/worthly/ui";
import {
  computeLevel,
  MOODS,
  DAILY_MISSIONS,
  SEED_EXPENSES,
  SEED_LEDGER,
  CAT_ICON,
  PROFILE,
  SPEND_WEEKS,
  type Mission,
} from "@/lib/dashboard-data";

/* ── Icon rail (collapsed) ── */
function IconRail() {
  const router = useRouter();
  const items = [
    { k: "dashboard", icon: "home", label: "Home", active: true },
    { k: "missions", icon: "target", label: "Missions" },
    { k: "log", icon: "receipt", label: "Log" },
    { k: "rewards", icon: "award", label: "Rewards" },
    { k: "profile", icon: "user", label: "Profile" },
  ];
  return (
    <aside
      style={{
        width: 76,
        flexShrink: 0,
        height: "100vh",
        position: "sticky",
        top: 0,
        background: "var(--emerald-ink)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        padding: "22px 0",
      }}
    >
      <div className="mb-[30px] flex h-10 items-center justify-center">
        <svg width={34} height={34} viewBox="0 0 40 40">
          <rect x="1.5" y="1.5" width="37" height="37" rx="11" fill="rgba(255,255,255,0.12)" />
          <rect x="11" y="20" width="4.4" height="9" rx="1.6" fill="#fff" />
          <rect x="17.8" y="15" width="4.4" height="14" rx="1.6" fill="#fff" />
          <rect x="24.6" y="10" width="4.4" height="19" rx="1.6" fill="#fff" />
          <path d="M9 26 Q19 31 31 13" fill="none" stroke="var(--gold)" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {items.map((it) => (
          <button
            key={it.k}
            title={it.label}
            className="relative flex w-full items-center justify-center"
            style={{
              padding: "11px 0",
              borderRadius: 12,
              color: it.active ? "#fff" : "rgba(255,255,255,0.55)",
              background: it.active ? "rgba(255,255,255,0.12)" : "transparent",
            }}
          >
            {it.active && (
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 3,
                  height: 22,
                  borderRadius: 99,
                  background: "var(--gold)",
                }}
              />
            )}
            <Icon name={it.icon} size={22} sw={it.active ? 2.3 : 1.9} />
          </button>
        ))}

        <button
          title="Log an expense"
          className="mt-3.5 flex items-center justify-center"
          style={{
            padding: "12px 0",
            borderRadius: 12,
            background: "linear-gradient(180deg,var(--gold) 0%,#B9962F 100%)",
            color: "#3A2E08",
            fontWeight: 700,
            boxShadow: "0 6px 16px rgba(201,168,76,0.32)",
            margin: "14px 12px 0",
          }}
        >
          <Icon name="plus" size={20} sw={2.6} />
        </button>
      </nav>

      <div className="mt-3 flex flex-col gap-0.5">
        <button
          onClick={() => router.push("/")}
          title="Exit to site"
          className="flex items-center justify-center"
          style={{ padding: "10px 0", borderRadius: 12, color: "rgba(255,255,255,0.5)" }}
        >
          <Icon name="chevL" size={19} />
        </button>
      </div>
    </aside>
  );
}

/* ── Top bar ── */
function TopBar() {
  const [date, setDate] = useState("");
  const [greet, setGreet] = useState("Good morning");
  useEffect(() => {
    const now = new Date();
    setDate(now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }));
    const hr = now.getHours();
    setGreet(hr < 12 ? "Good morning" : hr < 18 ? "Good afternoon" : "Good evening");
  }, []);

  return (
    <header className="mb-[26px] flex items-start justify-between gap-6">
      <div className="shrink-0">
        <div style={{ fontSize: 13.5, color: "var(--muted)", fontWeight: 600 }}>
          {greet}, {PROFILE.name}
        </div>
        <h1 className="font-display" style={{ fontSize: 30, margin: "2px 0 0", lineHeight: 1.1 }}>
          Your dashboard
        </h1>
        <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{date}</div>
      </div>
      <div className="flex items-center gap-3.5">
        <span
          className="inline-flex items-center gap-[7px]"
          style={{ background: "var(--gold-soft)", padding: "9px 14px", borderRadius: 999 }}
        >
          <Icon name="flame" size={17} color="var(--gold)" sw={2} />
          <span style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: 14, color: "#9A7B1E" }}>
            {PROFILE.streak}
          </span>
          <span style={{ fontSize: 12.5, color: "#9A7B1E", fontWeight: 600 }}>day streak</span>
        </span>
        <button
          className="relative flex items-center justify-center"
          style={{ width: 44, height: 44, borderRadius: "50%", background: "#fff", boxShadow: "var(--sh-sm)", border: "1px solid var(--line-2)", color: "var(--ink)" }}
        >
          <Icon name="bell" size={20} />
          <span style={{ position: "absolute", top: 10, right: 12, width: 8, height: 8, borderRadius: "50%", background: "var(--coral)", border: "1.5px solid #fff" }} />
        </button>
        <div className="flex items-center gap-2.5 pl-1">
          <div
            className="flex items-center justify-center font-display"
            style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(140deg,var(--teal),var(--emerald-deep))", color: "#fff", fontWeight: 700, fontSize: 17 }}
          >
            {PROFILE.name[0]}
          </div>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700 }}>{PROFILE.name}</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>{PROFILE.persona}</div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── Circular level ring ── */
function LevelRing({ pct, lvl, size = 116, stroke = 9 }: { pct: number; lvl: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const [off, setOff] = useState(c);
  useEffect(() => {
    const t = setTimeout(() => setOff(c * (1 - pct / 100)), 150);
    return () => clearTimeout(t);
  }, [pct, c]);
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#w-ring-g)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={off}
          style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(.2,.8,.2,1)" }}
        />
        <defs>
          <linearGradient id="w-ring-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E0C97A" />
            <stop offset="100%" stopColor="var(--gold)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div style={{ fontSize: 10.5, letterSpacing: 1, opacity: 0.75, fontWeight: 700 }}>LEVEL</div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 34, fontWeight: 700, lineHeight: 1, color: "#fff" }}>{lvl}</div>
      </div>
    </div>
  );
}

/* ── WP hero (wide) ── */
function WPHeroWide({ wp }: { wp: number }) {
  const lv = computeLevel(wp);
  const wpNow = useCountUp(wp);
  return (
    <div
      className="w-noise flex items-center gap-7"
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 24,
        padding: 30,
        background: "linear-gradient(135deg,var(--emerald) 0%,var(--emerald-deep) 55%,var(--emerald-900) 100%)",
        color: "#fff",
        boxShadow: "0 16px 40px rgba(13,110,90,0.28)",
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, opacity: 0.82, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
          Total Worth Points
        </div>
        <div className="flex items-baseline gap-3.5" style={{ marginTop: 4 }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: 56, fontWeight: 700, letterSpacing: -2, lineHeight: 1 }}>
            {wpNow.toLocaleString()}
          </span>
          <span
            className="inline-flex items-center gap-1.5"
            style={{ background: "rgba(255,255,255,0.16)", padding: "7px 13px", borderRadius: 999 }}
          >
            <Icon name="flame" size={16} color="#E0C97A" sw={2} />
            <span style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: 14 }}>{PROFILE.streak}</span>
            <span style={{ fontSize: 12, opacity: 0.85 }}>day streak</span>
          </span>
        </div>
        <div style={{ marginTop: 22, maxWidth: 460 }}>
          <div className="flex justify-between" style={{ fontSize: 13, marginBottom: 8 }}>
            <span style={{ fontWeight: 600 }}>
              Lv {lv.cur.lvl} · {lv.cur.name}
            </span>
            <span style={{ opacity: 0.82 }}>
              {lv.next ? `${lv.toNext.toLocaleString()} WP to ${lv.next.name}` : "Max level"}
            </span>
          </div>
          <div style={{ height: 9, background: "rgba(255,255,255,0.2)", borderRadius: 99, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${lv.pct}%`,
                background: "linear-gradient(90deg,#E0C97A,var(--gold))",
                borderRadius: 99,
                transition: "width 1.1s cubic-bezier(.2,.8,.2,1)",
                boxShadow: "0 0 12px rgba(201,168,76,0.6)",
              }}
            />
          </div>
        </div>
      </div>
      <LevelRing pct={lv.pct} lvl={lv.cur.lvl} />
    </div>
  );
}

/* ── Stat card ── */
function StatCard({ icon, label, value, tone, sub }: { icon: string; label: string; value: string | number; tone?: string; sub?: string }) {
  return (
    <Card pad={18} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div
        className="flex items-center justify-center"
        style={{ width: 38, height: 38, borderRadius: 11, background: "var(--bg-gray)", color: tone || "var(--emerald-deep)" }}
      >
        <Icon name={icon} size={19} sw={2.1} />
      </div>
      <div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 26, fontWeight: 700, color: "var(--ink)", letterSpacing: -0.8, lineHeight: 1 }}>
          {value}
        </div>
        <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 5 }}>{label}</div>
      </div>
      {sub && <div style={{ fontSize: 11.5, color: tone || "var(--muted)", fontWeight: 600 }}>{sub}</div>}
    </Card>
  );
}

/* ── Mission row ── */
function MissionRow({ m, done, onComplete }: { m: Mission; done: boolean; onComplete: () => void }) {
  return (
    <div className="flex items-center gap-3.5" style={{ padding: "14px 0", borderBottom: "1px solid var(--line-2)" }}>
      <div
        className="flex shrink-0 items-center justify-center"
        style={{ width: 42, height: 42, borderRadius: 12, background: done ? "var(--emerald)" : "var(--teal-soft)", color: done ? "#fff" : "var(--emerald-deep)", transition: "all .3s" }}
      >
        {done ? <Icon name="check" size={22} sw={2.6} /> : <Icon name={m.icon} size={21} />}
      </div>
      <div className="min-w-0 flex-1">
        <div style={{ fontWeight: 600, fontSize: 14.5, color: done ? "var(--muted)" : "var(--ink)", textDecoration: done ? "line-through" : "none" }}>
          {m.title}
        </div>
        <div style={{ fontSize: 12.5, color: "var(--muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {m.desc}
        </div>
      </div>
      {done ? (
        <WP amount={m.wp} />
      ) : (
        <button
          onClick={onComplete}
          className="w-btn shrink-0"
          style={{ padding: "8px 14px", borderRadius: 999, fontSize: 13, fontWeight: 700, background: "var(--emerald-deep)", color: "#fff", boxShadow: "0 3px 8px rgba(13,110,90,0.25)" }}
        >
          +{m.wp}
        </button>
      )}
    </div>
  );
}

/* ── Missions panel ── */
function MissionsPanel({ done, onComplete }: { done: Record<string, boolean>; onComplete: (m: Mission) => void }) {
  const count = DAILY_MISSIONS.filter((m) => done[m.id]).length;
  return (
    <Card pad={22}>
      <div className="mb-0.5 flex items-center justify-between">
        <div className="flex items-baseline gap-2.5">
          <h2 className="font-display" style={{ fontSize: 20, margin: 0 }}>
            Today’s missions
          </h2>
          <span style={{ fontFamily: "var(--mono)", fontSize: 13, fontWeight: 600, color: "var(--muted)" }}>{count}/4 done</span>
        </div>
        <button style={{ fontSize: 13.5, fontWeight: 600, color: "var(--emerald)" }}>See all</button>
      </div>
      {DAILY_MISSIONS.map((m) => (
        <MissionRow key={m.id} m={m} done={!!done[m.id]} onComplete={() => onComplete(m)} />
      ))}
    </Card>
  );
}

/* ── Mood check-in ── */
function MoodCheckin({ mood, onPick }: { mood: string | null; onPick: (k: string) => void }) {
  if (mood) {
    const m = MOODS.find((x) => x.key === mood)!;
    return (
      <Card pad={15} style={{ display: "flex", alignItems: "center", gap: 13, background: "var(--teal-soft)", border: "1px solid rgba(26,158,132,0.2)" }}>
        <span style={{ fontSize: 30 }}>{m.emoji}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14.5, color: "var(--emerald-ink)" }}>
            Logged — feeling {m.label.toLowerCase()} today
          </div>
          <div style={{ fontSize: 12.5, color: "var(--emerald-deep)" }}>Comes back tomorrow. +5 WP earned.</div>
        </div>
        <Icon name="check" size={20} color="var(--emerald)" sw={2.6} />
      </Card>
    );
  }
  return (
    <Card pad={16}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display" style={{ fontSize: 18, margin: 0 }}>
          How’s money feeling today?
        </h3>
        <WP amount={5} />
      </div>
      <div className="flex justify-between gap-1.5">
        {MOODS.map((m) => (
          <button
            key={m.key}
            onClick={() => onPick(m.key)}
            className="flex flex-1 flex-col items-center gap-1.5"
            style={{ padding: "11px 2px", borderRadius: 14, background: "var(--bg-gray)", transition: "transform .15s, background .15s" }}
          >
            <span style={{ fontSize: 26 }}>{m.emoji}</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: "var(--muted)" }}>{m.label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
}

/* ── Monthly goal panel ── */
function MonthlyGoalPanel() {
  const goal = PROFILE.goal;
  const msg = goal.pct >= 70 ? "Almost there — don’t let go now." : goal.pct >= 30 ? "Real momentum. Keep your streak alive." : "Every small log counts.";
  return (
    <Card pad={22}>
      <div className="mb-3.5 flex items-center gap-3">
        <div className="flex items-center justify-center" style={{ width: 40, height: 40, borderRadius: 12, background: "var(--teal-soft)" }}>
          <Icon name="target" size={21} color="var(--emerald-deep)" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>{goal.label}</div>
          <div style={{ fontSize: 13, color: "var(--muted)" }}>{goal.daysLeft} days left this month</div>
        </div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 24, fontWeight: 700, color: "var(--emerald-deep)" }}>{goal.pct}%</div>
      </div>
      <Bar pct={goal.pct} color="linear-gradient(90deg,var(--teal),var(--emerald-deep))" h={10} />
      <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 12 }}>{msg}</div>
    </Card>
  );
}

/* ── Spending trends chart ── */
function smoothPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x} ${p2.y}`;
  }
  return d;
}

function SpendAreaChart({ data, height = 230 }: { data: { w: string; v: number }[]; height?: number }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 80);
    return () => clearTimeout(t);
  }, []);
  const W = 760;
  const H = height;
  const padX = 30;
  const padT = 22;
  const padB = 34;
  const max = Math.max(...data.map((d) => d.v)) * 1.15;
  const x = (i: number) => padX + (i * (W - padX * 2)) / (data.length - 1);
  const y = (v: number) => padT + (1 - v / max) * (H - padT - padB);
  const pts = data.map((d, i) => ({ x: x(i), y: y(d.v), ...d }));
  const line = smoothPath(pts);
  const area = `${line} L ${pts[pts.length - 1].x} ${H - padB} L ${pts[0].x} ${H - padB} Z`;
  const last = pts[pts.length - 1];
  const grid = [0.25, 0.5, 0.75, 1].map((f) => padT + f * (H - padT - padB));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display: "block" }}>
      <defs>
        <linearGradient id="w-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--teal)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {grid.map((gy, i) => (
        <line key={i} x1={padX} y1={gy} x2={W - padX} y2={gy} stroke="var(--line-2)" strokeWidth="1" />
      ))}
      <path d={area} fill="url(#w-area)" style={{ opacity: shown ? 1 : 0, transition: "opacity .8s ease" }} />
      <path
        d={line}
        fill="none"
        stroke="var(--emerald)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeDasharray="1400"
        strokeDashoffset={shown ? 0 : 1400}
        style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(.3,.8,.3,1)" }}
        vectorEffect="non-scaling-stroke"
      />
      {pts.map((p, i) => (
        <g key={i} style={{ opacity: shown ? 1 : 0, transition: `opacity .4s ease ${0.5 + i * 0.05}s` }}>
          {i === pts.length - 1 ? (
            <>
              <circle cx={p.x} cy={p.y} r="9" fill="var(--gold)" opacity="0.18" />
              <circle cx={p.x} cy={p.y} r="4.5" fill="var(--gold)" stroke="#fff" strokeWidth="2" />
            </>
          ) : (
            <circle cx={p.x} cy={p.y} r="3" fill="#fff" stroke="var(--emerald)" strokeWidth="2" />
          )}
        </g>
      ))}
      <g style={{ opacity: shown ? 1 : 0, transition: "opacity .4s ease 1s" }}>
        <rect x={last.x - 34} y={last.y - 34} width="68" height="22" rx="7" fill="var(--ink)" />
        <text x={last.x} y={last.y - 19} textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#fff" fontFamily="var(--mono)">
          ${last.v}
        </text>
      </g>
      {data.map((d, i) => (
        <text key={i} x={x(i)} y={H - 12} textAnchor="middle" fontSize="11" fill="var(--muted)" fontFamily="var(--sans)" fontWeight={i === data.length - 1 ? 700 : 500}>
          {d.w}
        </text>
      ))}
    </svg>
  );
}

/* ── Spending panel ── */
function SpendingPanel() {
  const catTotals: Record<string, number> = {};
  SEED_EXPENSES.forEach((e) => {
    catTotals[e.cat] = (catTotals[e.cat] || 0) + e.amt;
  });
  const cats = Object.entries(catTotals).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxCat = cats.length ? cats[0][1] : 1;
  const total = SEED_EXPENSES.reduce((s, e) => s + e.amt, 0);
  const prev = SPEND_WEEKS[SPEND_WEEKS.length - 2].v;
  const cur = SPEND_WEEKS[SPEND_WEEKS.length - 1].v;
  const delta = prev ? Math.round(((cur - prev) / prev) * 100) : 0;
  const down = delta <= 0;

  return (
    <Card pad={26}>
      <div className="mb-1.5 flex items-start justify-between">
        <div>
          <h3 className="font-display" style={{ fontSize: 22, margin: 0 }}>
            Spending trends
          </h3>
          <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 3 }}>Weekly total over the last 8 weeks</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 26, fontWeight: 700, color: "var(--ink)", letterSpacing: -0.5 }}>
            ${total.toFixed(0)}
          </div>
          <div
            className="inline-flex items-center gap-1"
            style={{ fontSize: 12.5, fontWeight: 600, color: down ? "var(--emerald)" : "var(--coral)", background: down ? "var(--teal-soft)" : "var(--coral-soft)", padding: "3px 8px", borderRadius: 999, marginTop: 4 }}
          >
            <Icon name="trend" size={13} sw={2.4} style={{ transform: down ? "scaleY(-1)" : "none" }} />
            {down ? "" : "+"}
            {delta}% vs last week
          </div>
        </div>
      </div>

      <SpendAreaChart data={SPEND_WEEKS} />

      <div style={{ height: 1, background: "var(--line-2)", margin: "18px 0 20px" }} />

      <div className="mb-4 flex items-center justify-between">
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: "var(--muted)" }}>
          By category · this month
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "14px 32px" }}>
        {cats.map(([c, amt]) => (
          <div key={c} className="flex items-center gap-3">
            <div className="flex shrink-0 items-center justify-center" style={{ width: 34, height: 34, borderRadius: 10, background: "var(--bg-gray)", color: "var(--emerald-deep)" }}>
              <Icon name={CAT_ICON[c] || "dots"} size={17} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex justify-between" style={{ fontSize: 13.5, marginBottom: 5 }}>
                <span style={{ fontWeight: 600 }}>{c}</span>
                <span style={{ fontFamily: "var(--mono)", color: "var(--muted)" }}>${amt.toFixed(0)}</span>
              </div>
              <Bar pct={(amt / maxCat) * 100} color={c === "Shopping" ? "var(--gold)" : "var(--teal)"} h={6} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ── Emotional insight panel ── */
function EmotionalInsightPanel() {
  const flagged = SEED_EXPENSES.filter((e) => ["regret", "impulse", "shouldnt"].includes(e.emo));
  const byCat: Record<string, number> = {};
  flagged.forEach((e) => {
    byCat[e.cat] = (byCat[e.cat] || 0) + 1;
  });
  const worst = Object.entries(byCat).sort((a, b) => b[1] - a[1])[0];
  if (!worst) return null;
  return (
    <div style={{ borderRadius: 18, padding: 24, background: "linear-gradient(135deg,#FBF5E6,#F6EFD9)", border: "1px solid rgba(201,168,76,0.3)" }}>
      <div className="mb-2.5 flex items-center gap-2">
        <Icon name="sparkle" size={18} color="var(--gold)" />
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase", color: "#9A7B1E" }}>Emotional insight</span>
      </div>
      <p style={{ fontSize: 16, lineHeight: 1.5, margin: "0 0 16px", color: "var(--ink)", maxWidth: 520 }}>
        You’ve flagged <strong>{flagged.length} purchases</strong> as regret or impulse this week — most of them in{" "}
        <strong>{worst[0]}</strong>.
      </p>
      <WButton variant="gold" size="sm" iconRight="arrowR">
        Start a No-Impulse Week · +120 WP
      </WButton>
    </div>
  );
}

/* ── Recent activity ── */
function RecentActivityPanel() {
  return (
    <Card pad={8}>
      <div className="flex items-center justify-between" style={{ padding: "12px 14px 8px" }}>
        <h3 className="font-display" style={{ fontSize: 18, margin: 0 }}>
          Recent activity
        </h3>
      </div>
      {SEED_LEDGER.slice(0, 6).map((g) => (
        <div key={g.id} className="flex items-center gap-3" style={{ padding: "11px 14px", borderTop: "1px solid var(--line-2)" }}>
          <span style={{ fontSize: 19, width: 26, textAlign: "center" }}>{g.emoji}</span>
          <div style={{ flex: 1, fontSize: 13.5, fontWeight: 500 }}>{g.label}</div>
          {g.amt && <span style={{ fontFamily: "var(--mono)", fontSize: 12.5, fontWeight: 600, color: "var(--emerald-deep)", whiteSpace: "nowrap" }}>{g.amt}</span>}
          <span style={{ fontSize: 11.5, color: "var(--muted)", width: 52, textAlign: "right" }}>{g.when}</span>
        </div>
      ))}
    </Card>
  );
}

export default function DashboardPage() {
  const [mood, setMood] = useState<string | null>(null);
  const [done, setDone] = useState<Record<string, boolean>>({});

  const bonus = DAILY_MISSIONS.filter((m) => done[m.id]).reduce((s, m) => s + m.wp, 0);
  const wp = PROFILE.wp + bonus + (mood ? 5 : 0);
  const doneCount = DAILY_MISSIONS.filter((m) => done[m.id]).length;

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-gray)" }}>
      <IconRail />
      <main className="min-w-0 flex-1" style={{ height: "100vh", overflowY: "auto" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(20px,3vw,30px) clamp(20px,3.5vw,38px) 56px" }}>
          <TopBar />

          <div className="grid grid-cols-1 items-start gap-[22px] lg:grid-cols-[minmax(0,1.65fr)_minmax(300px,1fr)]">
            {/* main feed */}
            <div className="flex flex-col gap-[22px]">
              <WPHeroWide wp={wp} />
              <MissionsPanel done={done} onComplete={(m) => setDone((d) => ({ ...d, [m.id]: true }))} />
              <SpendingPanel />
              <EmotionalInsightPanel />
            </div>

            {/* right sidebar */}
            <div className="flex flex-col gap-[22px]">
              <div className="grid grid-cols-2 gap-3.5">
                <StatCard icon="flame" label="Day streak" value={PROFILE.streak} tone="var(--coral)" sub="Best: 12" />
                <StatCard icon="target" label="Monthly goal" value={`${PROFILE.goal.pct}%`} tone="var(--emerald)" sub={`${PROFILE.goal.daysLeft}d left`} />
                <StatCard icon="check" label="Missions today" value={`${doneCount}/4`} tone="#9A7B1E" />
                <StatCard icon="receipt" label="Logged this mo." value={SEED_EXPENSES.length} />
              </div>
              <MoodCheckin mood={mood} onPick={setMood} />
              <MonthlyGoalPanel />
              <RecentActivityPanel />
            </div>
          </div>

          <div className="flex gap-2" style={{ padding: "26px 4px 0", color: "var(--muted)", fontSize: 12, lineHeight: 1.5, maxWidth: 720 }}>
            <Icon name="info" size={15} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>Worth Points reflect your money habits — not your net worth. They have no monetary value.</span>
          </div>
        </div>
      </main>
    </div>
  );
}
