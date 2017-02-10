export interface IFeatureToggleConfig {
  setting: any;                 // feature state
  responsible?: string;          // who is responsible for this toggle
  group?: string;               // other reponsible people
  description?: string;
  shouldExpireAt?: Date;
  howToCleanUp?: string;
}

export interface IFeatureToggleConfigSet {
  [propName:string]:IFeatureToggleConfig //https://www.typescriptlang.org/docs/handbook/interfaces.html
}
