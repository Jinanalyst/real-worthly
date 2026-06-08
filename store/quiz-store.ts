import { create } from "zustand";
import type { MoneyPersonality } from "@/types/user";
import type { QuizAnswer, QuizResult } from "@/types/quiz";
import { QUIZ_QUESTIONS } from "@/lib/quiz-data";
import { scoreQuiz } from "@/lib/personality";

interface QuizState {
  /** Current question index (0-based). */
  step: number;
  answers: QuizAnswer[];
  result: QuizResult | null;
  totalQuestions: number;
  answer: (questionId: number, value: MoneyPersonality) => void;
  next: () => void;
  back: () => void;
  finish: () => QuizResult;
  reset: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  step: 0,
  answers: [],
  result: null,
  totalQuestions: QUIZ_QUESTIONS.length,

  answer: (questionId, value) =>
    set((state) => {
      const answers = state.answers.filter((a) => a.questionId !== questionId);
      return { answers: [...answers, { questionId, selectedValue: value }] };
    }),

  next: () =>
    set((state) => ({
      step: Math.min(state.step + 1, state.totalQuestions - 1),
    })),

  back: () => set((state) => ({ step: Math.max(state.step - 1, 0) })),

  finish: () => {
    const result = scoreQuiz(get().answers);
    set({ result });
    return result;
  },

  reset: () => set({ step: 0, answers: [], result: null }),
}));
