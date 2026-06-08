interface LogoMarkProps {
  size?: number;
  /** Rounded-tile fill. Use "transparent" for bars only. */
  background?: string;
  /** Bar color. */
  mark?: string;
  light?: boolean;
  className?: string;
}

/** The Worthly bar-chart + gold-curve mark (viewBox 40×40), drawn inline. */
export function LogoMark({
  size = 30,
  background = "var(--teal-soft)",
  mark = "var(--emerald-deep)",
  light = false,
  className,
}: LogoMarkProps) {
  const tile = light ? "rgba(255,255,255,0.14)" : background;
  const bars = light ? "#ffffff" : mark;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-label="Worthly"
      className={className}
      style={{ flexShrink: 0 }}
    >
      <rect x="1.5" y="1.5" width="37" height="37" rx="11" fill={tile} />
      <rect x="11" y="20" width="4.4" height="9" rx="1.6" fill={bars} />
      <rect x="17.8" y="15" width="4.4" height="14" rx="1.6" fill={bars} />
      <rect x="24.6" y="10" width="4.4" height="19" rx="1.6" fill={bars} />
      <path
        d="M9 26 Q19 31 31 13"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface WordmarkProps {
  size?: number;
  light?: boolean;
  mark?: string;
  text?: string;
}

/** Logo mark + "Worthly" wordmark in DM Serif Display. */
export function Wordmark({ size = 30, light = false, mark, text }: WordmarkProps) {
  const color = light ? "#fff" : text ?? "var(--ink)";
  return (
    <div className="inline-flex items-center" style={{ gap: size * 0.34 }}>
      <LogoMark size={size} light={light} mark={mark} />
      <span
        className="font-display leading-none"
        style={{ fontSize: size * 0.78, color, letterSpacing: -0.3 }}
      >
        Worthly
      </span>
    </div>
  );
}
