import type { QuizQuestion } from "@/types/quiz";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    eyebrow: "Question 1 of 4",
    text: "An unexpected $500 lands in your account. What's your first instinct?",
    options: [
      {
        id: "1a",
        label: "Straight into savings — that's a relief.",
        value: "anxious_saver",
      },
      {
        id: "1b",
        label: "Finally book the thing I've been wanting.",
        value: "free_spirit",
      },
      {
        id: "1c",
        label: "Put it toward a goal I'm already working on.",
        value: "intentional_planner",
      },
      {
        id: "1d",
        label: "Treat the people I love to something nice.",
        value: "generous_connector",
      },
    ],
  },
  {
    id: 2,
    eyebrow: "Question 2 of 4",
    text: "When you check your bank balance, you usually feel…",
    options: [
      {
        id: "2a",
        label: "A flicker of worry, even when it's fine.",
        value: "anxious_saver",
      },
      {
        id: "2b",
        label: "Honestly? I try not to look too often.",
        value: "free_spirit",
      },
      {
        id: "2c",
        label: "Calm — I know exactly where it stands.",
        value: "intentional_planner",
      },
      {
        id: "2d",
        label: "Aware of who I want to help next.",
        value: "generous_connector",
      },
    ],
  },
  {
    id: 3,
    eyebrow: "Question 3 of 4",
    text: "Your ideal weekend spend looks like…",
    options: [
      {
        id: "3a",
        label: "Free or close to it — I'd rather not dip in.",
        value: "anxious_saver",
      },
      {
        id: "3b",
        label: "Whatever the moment calls for.",
        value: "free_spirit",
      },
      {
        id: "3c",
        label: "Planned ahead and within budget.",
        value: "intentional_planner",
      },
      {
        id: "3d",
        label: "Dinner with friends, my treat.",
        value: "generous_connector",
      },
    ],
  },
  {
    id: 4,
    eyebrow: "Question 4 of 4",
    text: "Money would feel better to you if…",
    options: [
      {
        id: "4a",
        label: "I could stop worrying about running out.",
        value: "anxious_saver",
      },
      {
        id: "4b",
        label: "I felt free to enjoy it without guilt.",
        value: "free_spirit",
      },
      {
        id: "4c",
        label: "Every dollar moved me toward a goal.",
        value: "intentional_planner",
      },
      {
        id: "4d",
        label: "I could be more generous with others.",
        value: "generous_connector",
      },
    ],
  },
];
