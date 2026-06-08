import type { MoneyPersonality } from "./user";

export interface QuizOption {
  id: string;
  label: string;
  /** Each option leans toward one money personality. */
  value: MoneyPersonality;
}

export interface QuizQuestion {
  id: number;
  /** Short eyebrow shown above the question (e.g. "Question 1 of 4"). */
  eyebrow: string;
  text: string;
  options: QuizOption[];
}

export interface QuizAnswer {
  questionId: number;
  selectedValue: MoneyPersonality;
}

export interface QuizResult {
  personality: MoneyPersonality;
  scores: Record<MoneyPersonality, number>;
}
