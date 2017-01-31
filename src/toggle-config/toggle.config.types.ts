export interface FeatureToggleConfig {
  isEnabled: boolean;           // is this feature enabled?
  responsible: string;          // who is responsible for this toggle
  group?: string;               // other reponsible people
  description?: string;
  shouldExpireAt?: Date;
  howToCleanUp?: string;
}
