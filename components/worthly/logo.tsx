interface LogoMarkProps {
  size?: number;
  /** Rounded-tile background color. Use "transparent" to show bars only. */
  background?: string;
  className?: string;
}

/** The Worthly bar-chart + gold-curve mark, drawn inline (no asset files). */
export function LogoMark({
  size = 36,
  background = "var(--green-700)",
  className,
}: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1200 1200"
      role="img"
      aria-label="Worthly logo"
      className={className}
      style={{ borderRadius: size * 0.28 }}
    >
      <rect width="1200" height="1200" fill={background} />
      <g transform="translate(600 600)">
        <rect x="-150" y="-10" width="60" height="130" rx="22" fill="#ffffff" />
        <rect x="-58" y="-80" width="60" height="200" rx="22" fill="#ffffff" />
        <rect x="34" y="-150" width="60" height="270" rx="22" fill="#ffffff" />
        <path
          d="M-190 80 Q-10 200 190 -150"
          fill="none"
          stroke="#C9A84C"
          strokeWidth="34"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

interface WordmarkProps {
  color?: string;
  size?: number;
}

/** Logo mark + "Worthly" wordmark, as seen in the top-left of the designs. */
export function Wordmark({ color = "#ffffff", size = 28 }: WordmarkProps) {
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark size={size} />
      <span
        className="font-display font-semibold tracking-tight"
        style={{ color, fontSize: size * 0.78 }}
      >
        Worthly
      </span>
    </div>
  );
}
