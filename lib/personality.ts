import type { MoneyPersonality } from "@/types/user";
import type { QuizAnswer, QuizResult } from "@/types/quiz";

export interface PersonalityProfile {
  key: MoneyPersonality;
  name: string;
  tagline: string;
  description: string;
  /** A strength and a watch-out, shown on the result screen. */
  strength: string;
  watchOut: string;
}

export const PERSONALITIES: Record<MoneyPersonality, PersonalityProfile> = {
  anxious_saver: {
    key: "anxious_saver",
    name: "The Anxious Saver",
    tagline: "Safety first, always.",
    description:
      "You keep a close eye on every dollar. Saving brings you peace, but money can also bring a low hum of worry — even when things are fine.",
    strength: "You rarely overspend and almost always have a cushion.",
    watchOut: "Letting fear stop you from enjoying what you've earned.",
  },
  free_spirit: {
    key: "free_spirit",
    name: "The Free Spirit",
    tagline: "Money is for living.",
    description:
      "You spend on what lights you up and trust things will work out. Experiences matter more to you than a perfectly balanced spreadsheet.",
    strength: "You're generous with yourself and rich in experiences.",
    watchOut: "The future you who wishes a little more had been set aside.",
  },
  intentional_planner: {
    key: "intentional_planner",
    name: "The Intentional Planner",
    tagline: "Every dollar has a job.",
    description:
      "You like a plan and you stick to it. Money is a tool you point at the things you care about, on purpose.",
    strength: "You make steady progress toward goals that matter.",
    watchOut: "Being so structured that there's no room for spontaneity.",
  },
  generous_connector: {
    key: "generous_connector",
    name: "The Generous Connector",
    tagline: "Money is how you care.",
    description:
      "Money is a way you show love — treating friends, giving gifts, supporting the people around you. Connection comes first.",
    strength: "You build deep relationships and a real sense of community.",
    watchOut: "Putting everyone else's needs ahead of your own.",
  },
};

const EMPTY_SCORES: Record<MoneyPersonality, number> = {
  anxious_saver: 0,
  free_spirit: 0,
  intentional_planner: 0,
  generous_connector: 0,
};

/** Tally the answers and return the winning personality (first answer breaks ties). */
export function scoreQuiz(answers: QuizAnswer[]): QuizResult {
  const scores: Record<MoneyPersonality, number> = { ...EMPTY_SCORES };

  for (const answer of answers) {
    scores[answer.selectedValue] += 1;
  }

  let personality: MoneyPersonality = answers[0]?.selectedValue ?? "anxious_saver";
  let best = -1;
  for (const answer of answers) {
    const value = answer.selectedValue;
    if (scores[value] > best) {
      best = scores[value];
      personality = value;
    }
  }

  return { personality, scores };
}
