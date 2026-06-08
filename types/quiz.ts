import type { MoneyPersonality } from "./user";

export interface QuizOption {
  id: string;
  label: string;
  value: MoneyPersonality;
}

export interface QuizQuestion {
  id: number;
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
