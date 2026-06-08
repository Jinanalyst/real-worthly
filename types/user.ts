export type MoneyPersonality =
  | "guardian"
  | "achiever"
  | "explorer"
  | "connector";

export interface UserProfile {
  id: string;
  email: string;
  displayName: string | null;
  moneyPersonality: MoneyPersonality | null;
  onboardingCompleted: boolean;
  createdAt: string;
}
