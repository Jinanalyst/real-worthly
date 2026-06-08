export type MoneyPersonality =
  | "anxious_saver"
  | "free_spirit"
  | "intentional_planner"
  | "generous_connector";

export interface UserProfile {
  id: string;
  email: string;
  displayName: string | null;
  moneyPersonality: MoneyPersonality | null;
  onboardingCompleted: boolean;
  createdAt: string;
}
