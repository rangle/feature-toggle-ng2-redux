import { featureToggleConfig } from './toggle-config';

export const featureToggleConfigs = {
  'feature1': ():featureToggleConfig => ({
    isEnabled: false,
    isExperimental: true,
    responsible: 'Johanna Lee',
    description:
      `This feature toggle is experimental
      it is used with 'hide-feature' attribute flag to practice a proof of A/B testing concept`,
    shouldExpireAt: new Date('2020-08-10'), // other possible name is deadline
    // the engineer/team responsible to monitor and remove the toggle. Usually,
    // this responsibility is given to the one which have chosen to add it.
    howToCleanUp: `
      remove the attribute directives, *featureid='feature1' and hide-feature, in the counter component template(src/component/counter.component.ts)
    `,
  }),
  'feature2': ():featureToggleConfig => ({
    isEnabled: true,
    isExperimental: false,
    responsible: 'Johanna Lee',
    description:
      `This is a release toggle that hides and shows the feature component based on the toggle condition`,
    shouldExpireAt: new Date('2020-08-10'),  // other possible name is deadline
    // the engineer/team responsible to monitor and remove the toggle. Usually,
    // this responsibility is given to the one which have chosen to add it.
    howToCleanUp: `
      remove the attribute directives, *featureid='feature2', in the counter component template(src/component/counter.component.ts)
    `,
  }),
};
