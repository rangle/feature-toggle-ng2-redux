export interface featureToggleConfig {
  isEnabled: boolean;           // is this feature enabled?
  isExperimental: boolean;      // is it Experimental or Release toggle?
  responsible: string;          // who is responsible for this toggle?
  group?: string;               // other reponsible people?
  description?: string;
  shouldExpireAt?: Date;
  howToCleanUp?: string;
}