// Worthly — dashboard seed data (persona: The Anxious Saver), from the design bundle.

export interface Level {
  lvl: number;
  name: string;
  wp: number;
}

export const LEVELS: Level[] = [
  { lvl: 1, name: "Seeker", wp: 0 },
  { lvl: 2, name: "Aware", wp: 500 },
  { lvl: 3, name: "Intentional", wp: 1500 },
  { lvl: 4, name: "Disciplined", wp: 3500 },
  { lvl: 5, name: "Sovereign", wp: 7000 },
  { lvl: 6, name: "Worth Master", wp: 12000 },
];

export function computeLevel(wp: number) {
  let cur = LEVELS[0];
  for (const l of LEVELS) if (wp >= l.wp) cur = l;
  const next = LEVELS[cur.lvl] ?? null; // next index = cur.lvl (1-based)
  const span = next ? next.wp - cur.wp : 1;
  const into = wp - cur.wp;
  const pct = next ? Math.min(100, Math.round((into / span) * 100)) : 100;
  const toNext = next ? next.wp - wp : 0;
  return { cur, next, pct, toNext };
}

export interface Mood {
  key: string;
  emoji: string;
  label: string;
}

export const MOODS: Mood[] = [
  { key: "stressed", emoji: "😰", label: "Stressed" },
  { key: "neutral", emoji: "😐", label: "Neutral" },
  { key: "okay", emoji: "🙂", label: "Okay" },
  { key: "good", emoji: "😊", label: "Good" },
  { key: "motivated", emoji: "💪", label: "Motivated" },
];

export interface Mission {
  id: string;
  title: string;
  desc: string;
  wp: number;
  icon: string;
}

export const DAILY_MISSIONS: Mission[] = [
  { id: "m_mood", title: "Money Mood Check-in", desc: "Name how money feels today.", wp: 5, icon: "heart" },
  { id: "m_log", title: "Log today’s spending", desc: "Even a coffee counts.", wp: 30, icon: "receipt" },
  { id: "m_joy", title: "Find a purchase that brought you joy", desc: "Permission to enjoy what you earned.", wp: 40, icon: "sparkle" },
  { id: "m_sub", title: "Review one subscription", desc: "Keep it or cut it — your call.", wp: 30, icon: "repeat" },
];

export interface Expense {
  id: string;
  amt: number;
  cat: string;
  emo: string;
  note: string;
  day: string;
}

export const SEED_EXPENSES: Expense[] = [
  { id: "e1", amt: 6.5, cat: "Food", emo: "joy", note: "Oat latte before the deadline", day: "Today, 9:12 AM" },
  { id: "e2", amt: 42.0, cat: "Shopping", emo: "regret", note: "Third candle this month…", day: "Today, 8:40 AM" },
  { id: "e3", amt: 12.99, cat: "Subscriptions", emo: "neutral", note: "Cloud storage", day: "Yesterday" },
  { id: "e4", amt: 88.0, cat: "Shopping", emo: "impulse", note: "Sale email got me", day: "Yesterday" },
  { id: "e5", amt: 3.2, cat: "Transport", emo: "neutral", note: "Bus fare", day: "Mon" },
  { id: "e6", amt: 24.0, cat: "Food", emo: "joy", note: "Dinner with Sam", day: "Mon" },
  { id: "e7", amt: 150.0, cat: "Savings", emo: "neutral", note: "Auto-transfer to vault", day: "Sun" },
  { id: "e8", amt: 31.0, cat: "Shopping", emo: "shouldnt", note: "Didn’t need this one", day: "Sat" },
  { id: "e9", amt: 9.0, cat: "Entertainment", emo: "joy", note: "Indie film rental", day: "Sat" },
  { id: "e10", amt: 5.75, cat: "Food", emo: "neutral", note: "Groceries top-up", day: "Fri" },
];

export const CAT_ICON: Record<string, string> = {
  Food: "food",
  Transport: "transport",
  Subscriptions: "repeat",
  Shopping: "bag",
  Entertainment: "ticket",
  Savings: "piggy",
  Other: "dots",
};

export interface LedgerEntry {
  id: string;
  emoji: string;
  label: string;
  amt: string;
  when: string;
}

export const SEED_LEDGER: LedgerEntry[] = [
  { id: "g1", emoji: "💚", label: "Logged daily spending", amt: "+30 WP", when: "Today" },
  { id: "g2", emoji: "🙂", label: "Money Mood check-in", amt: "+5 WP", when: "Today" },
  { id: "g3", emoji: "🧠", label: "Unlocked badge · Mindful Buyer", amt: "", when: "Mon" },
  { id: "g4", emoji: "📋", label: "Created monthly goal", amt: "+100 WP", when: "Mon" },
  { id: "g5", emoji: "🔥", label: "Completed Week 1 streak", amt: "+50 WP", when: "Sun" },
];

export const PROFILE = {
  name: "Maya",
  persona: "The Anxious Saver",
  wp: 2450,
  streak: 7,
  goal: { label: "Save $300 this month", pct: 62, daysLeft: 12 },
};

// Weekly spend series for the trends chart (last point is this week's total).
export const SPEND_WEEKS = [
  { w: "Apr 7", v: 372 },
  { w: "Apr 14", v: 418 },
  { w: "Apr 21", v: 286 },
  { w: "Apr 28", v: 503 },
  { w: "May 5", v: 341 },
  { w: "May 12", v: 268 },
  { w: "May 19", v: 397 },
  {
    w: "This wk",
    v: Math.round(SEED_EXPENSES.reduce((s, e) => s + e.amt, 0)),
  },
];
