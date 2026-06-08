import type { CSSProperties, ReactNode } from "react";

/* ── Icons (Lucide-style line glyphs, ported from the design bundle) ── */
const ICONS: Record<string, ReactNode> = {
  leaf: (
    <>
      <path d="M11 20.5A7 7 0 0 1 4 13.5C4 8 8.5 4 20 4c0 11.5-7 16.5-9 16.5Z" />
      <path d="M4 20.5 13 11" />
    </>
  ),
  arrowR: (
    <>
      <path d="M4.5 12h15M13 5.5l6.5 6.5L13 18.5" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
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
};

interface IconProps {
  name: keyof typeof ICONS | string;
  size?: number;
  sw?: number;
  color?: string;
  style?: CSSProperties;
}

export function Icon({ name, size = 22, sw = 1.9, color = "currentColor", style }: IconProps) {
  const inner = ICONS[name] ?? ICONS.info;
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
      className="font-sans"
      style={{
        margin: 0,
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
