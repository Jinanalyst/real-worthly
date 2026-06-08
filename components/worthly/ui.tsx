"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/* ── Icons (Lucide-style line glyphs, ported from the design bundle) ── */
const ICONS: Record<string, ReactNode> = {
  home: (
    <>
      <path d="M3 10.6 12 3l9 7.6" />
      <path d="M5.2 9.4V20.5h13.6V9.4" />
      <path d="M9.5 20.5v-6h5v6" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  receipt: (
    <>
      <path d="M5 3.5v17l2-1 2 1 2-1 2 1 2-1 2 1v-17l-2 1-2-1-2 1-2-1-2 1-2-1Z" />
      <path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="M9 14.2 7.5 22l4.5-2.6L16.5 22 15 14.2" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M5.5 20.5a6.5 6.5 0 0 1 13 0" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  chevR: <path d="m9 5 7 7-7 7" />,
  chevL: <path d="m15 5-7 7 7 7" />,
  check: <path d="M4.5 12.5 9.5 17.5 20 6.5" />,
  bell: (
    <>
      <path d="M6 9.5a6 6 0 0 1 12 0c0 4.5 1.8 5.5 1.8 5.5H4.2S6 14 6 9.5Z" />
      <path d="M10.2 19.5a2 2 0 0 0 3.6 0" />
    </>
  ),
  repeat: (
    <>
      <path d="m17 2.5 3.5 3.5-3.5 3.5" />
      <path d="M3.5 11.5v-1a3.5 3.5 0 0 1 3.5-3.5h13.5" />
      <path d="m7 21.5-3.5-3.5 3.5-3.5" />
      <path d="M20.5 12.5v1a3.5 3.5 0 0 1-3.5 3.5H3.5" />
    </>
  ),
  trend: (
    <>
      <path d="m3 16 5.5-5.5 3.5 3.5 8-8" />
      <path d="M16 6h4v4" />
    </>
  ),
  leaf: (
    <>
      <path d="M11 20.5A7 7 0 0 1 4 13.5C4 8 8.5 4 20 4c0 11.5-7 16.5-9 16.5Z" />
      <path d="M4 20.5 13 11" />
    </>
  ),
  arrowR: <path d="M4.5 12h15M13 5.5l6.5 6.5L13 18.5" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
  heart: (
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
  ),
  flame: (
    <path d="M12 2.5c.9 3.2 3.6 4.4 3.6 8.2a4.1 4.1 0 1 1-8.2 0c0-1.5.8-2.7 1.5-3.4.1 1 .9 1.8 1.7 1.8-.4-2.6.9-4.9 1.4-6.6Z" />
  ),
  sparkle: (
    <>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
      <path d="M19 4v3M20.5 5.5h-3" opacity="0.6" />
    </>
  ),
  coins: (
    <>
      <circle cx="9" cy="9" r="6" />
      <path d="M15.5 4a6 6 0 0 1 0 16M7 9.5a2 2 0 0 1 4 0c0 1-2 1.2-2 2.5" />
    </>
  ),
  chart: (
    <>
      <path d="M3.5 20.5h17" />
      <path d="M6.5 20.5v-6M12 20.5V7.5M17.5 20.5v-9" />
    </>
  ),
  food: (
    <>
      <path d="M6 3v7M9 3v7M7.5 10v11M7.5 10a1.5 1.5 0 0 0 1.5-1.5V3M7.5 10a1.5 1.5 0 0 1-1.5-1.5V3" />
      <path d="M17 3c-1.6.8-2.5 3-2.5 5.5S15.5 13 17 13v8" />
    </>
  ),
  transport: (
    <>
      <path d="M5 13.5 6.3 8.7A2 2 0 0 1 8.2 7.2h7.6a2 2 0 0 1 1.9 1.5L19 13.5M4.5 13.5h15v4.5h-15Z" />
      <circle cx="8" cy="18" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="16" cy="18" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  bag: (
    <>
      <path d="M6 8.5h12l-1 12H7Z" />
      <path d="M9 8.5V6.5a3 3 0 0 1 6 0v2" />
    </>
  ),
  ticket: (
    <>
      <path d="M3 8.5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4Z" />
      <path d="M14 6.5v11" strokeDasharray="2 2.5" />
    </>
  ),
  piggy: (
    <>
      <path d="M3 12.5a6 5 0 0 1 6-5h4.5a6 5 0 0 1 5.5 5c1 .2 1.5 1 1.5 2v1.5h-1.7a6 6 0 0 1-1.8 1.6V20h-2.5v-1.2a8 8 0 0 1-3 0V20H9v-1.4a6 5 0 0 1-3-3.1H4.2A1.6 1.6 0 0 1 3 14Z" />
      <path d="M9 7.6 8 5M16 11h.01" />
    </>
  ),
  dots: (
    <>
      <circle cx="5" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
};

interface IconProps {
  name: string;
  size?: number;
  sw?: number;
  color?: string;
  style?: CSSProperties;
}

export function Icon({ name, size = 22, sw = 1.9, color = "currentColor", style }: IconProps) {
  const inner = ICONS[name] ?? ICONS.dots;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      aria-hidden="true"
    >
      {inner}
    </svg>
  );
}

/* ── Button ── */
type ButtonVariant = "primary" | "secondary" | "gold" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface WButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
  iconRight?: string;
  style?: CSSProperties;
}

const SIZES: Record<
  ButtonSize,
  { padding: string; fontSize: number; borderRadius: number; gap: number }
> = {
  sm: { padding: "9px 14px", fontSize: 14, borderRadius: 10, gap: 6 },
  md: { padding: "13px 20px", fontSize: 15.5, borderRadius: 13, gap: 8 },
  lg: { padding: "16px 24px", fontSize: 17, borderRadius: 15, gap: 9 },
};

const VARIANTS: Record<ButtonVariant, CSSProperties> = {
  primary: {
    background: "linear-gradient(180deg,var(--emerald) 0%,var(--emerald-deep) 100%)",
    color: "#fff",
    boxShadow: "0 1px 0 rgba(255,255,255,0.18) inset, 0 6px 16px rgba(13,110,90,0.28)",
  },
  gold: {
    background: "linear-gradient(180deg,#D8B85C 0%,var(--gold) 100%)",
    color: "#3A2E08",
    boxShadow: "0 1px 0 rgba(255,255,255,0.4) inset, 0 6px 16px rgba(201,168,76,0.32)",
  },
  secondary: {
    background: "#fff",
    color: "var(--emerald-deep)",
    boxShadow: "inset 0 0 0 1.5px rgba(15,122,99,0.22)",
  },
  ghost: { background: "transparent", color: "var(--emerald-deep)" },
};

export function WButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  full,
  iconRight,
  style,
}: WButtonProps) {
  const s = SIZES[size];
  return (
    <button
      onClick={onClick}
      className="w-btn"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: s.gap,
        padding: s.padding,
        fontSize: s.fontSize,
        fontWeight: 600,
        borderRadius: s.borderRadius,
        letterSpacing: -0.1,
        whiteSpace: "nowrap",
        width: full ? "100%" : undefined,
        ...VARIANTS[variant],
        ...style,
      }}
    >
      {children}
      {iconRight && <Icon name={iconRight} size={s.fontSize + 3} sw={2.1} />}
    </button>
  );
}

/* ── Card ── */
interface CardProps {
  children: ReactNode;
  pad?: number;
  hover?: boolean;
  style?: CSSProperties;
}

export function Card({ children, pad = 18, hover, style }: CardProps) {
  return (
    <div
      className={hover ? "w-card-h" : undefined}
      style={{
        background: "var(--card)",
        borderRadius: 18,
        padding: pad,
        boxShadow: "var(--sh-sm)",
        border: "1px solid var(--line-2)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── Chip ── */
type ChipTone = "neutral" | "emerald" | "gold" | "coral";

const CHIP_TONES: Record<ChipTone, { bg: string; fg: string }> = {
  neutral: { bg: "var(--bg-gray)", fg: "var(--muted)" },
  emerald: { bg: "var(--teal-soft)", fg: "var(--emerald-deep)" },
  gold: { bg: "var(--gold-soft)", fg: "#9A7B1E" },
  coral: { bg: "var(--coral-soft)", fg: "var(--coral)" },
};

export function Chip({
  children,
  tone = "neutral",
  icon,
  style,
}: {
  children: ReactNode;
  tone?: ChipTone;
  icon?: string;
  style?: CSSProperties;
}) {
  const t = CHIP_TONES[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 12.5,
        fontWeight: 600,
        background: t.bg,
        color: t.fg,
        letterSpacing: -0.1,
        ...style,
      }}
    >
      {icon && <Icon name={icon} size={13} sw={2.2} />}
      {children}
    </span>
  );
}

/* ── Section label ── */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h3
      style={{
        margin: "0 0 11px",
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: 0.6,
        textTransform: "uppercase",
        color: "var(--muted)",
      }}
    >
      {children}
    </h3>
  );
}

/* ── Progress bar (animates to pct on mount) ── */
export function Bar({
  pct,
  color = "var(--emerald)",
  track = "var(--bg-gray)",
  h = 9,
}: {
  pct: number;
  color?: string;
  track?: string;
  h?: number;
}) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(pct), 120);
    return () => clearTimeout(t);
  }, [pct]);
  return (
    <div style={{ height: h, borderRadius: 999, background: track, overflow: "hidden" }}>
      <div
        style={{
          height: "100%",
          width: `${w}%`,
          borderRadius: 999,
          background: color,
          transition: "width 1s cubic-bezier(.2,.8,.2,1)",
        }}
      />
    </div>
  );
}

/* ── Worth Points badge ── */
export function WP({
  amount,
  tone = "emerald",
  size = 13,
}: {
  amount: number;
  tone?: "emerald" | "gold";
  size?: number;
}) {
  const color = tone === "gold" ? "#9A7B1E" : "var(--emerald-deep)";
  const bg = tone === "gold" ? "var(--gold-soft)" : "var(--teal-soft)";
  return (
    <span
      style={{
        fontFamily: "var(--mono)",
        fontSize: size,
        fontWeight: 600,
        color,
        background: bg,
        padding: "3px 8px",
        borderRadius: 8,
        letterSpacing: -0.3,
        whiteSpace: "nowrap",
      }}
    >
      +{amount} WP
    </span>
  );
}

/* ── Count-up number ── */
export function useCountUp(target: number, dur = 900) {
  const [val, setVal] = useState(target);
  const prev = useRef(target);
  useEffect(() => {
    const from = prev.current;
    const to = target;
    prev.current = target;
    if (from === to) return;
    let raf = 0;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(from + (to - from) * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, dur]);
  return val;
}
