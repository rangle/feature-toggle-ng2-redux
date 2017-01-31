// doesn't work when running tests
// let featureToggleConfig = require('./../../../feature-toggle.yml');
import { featureToggleConfigs } from '../toggle.config';

export function createToggleRouter(configs = {}) {

  return {
    getInitialState() {
      const initialState = {};
      Object.keys(configs).forEach((key) => {
        const config = configs[key]();

        initialState[key] = {
          isEnabled: config.isEnabled,
          isExperimental: config.isExperimental
        };
      });

      console.log('initialState', initialState)
      return initialState;
    },
    setFeatureState(featureState) {
      const config = configs[featureState.id]();
      console.log('B4',config);
      config.isEnabled = featureState.isEnabled;
      console.log(config,'After');
    },
    getFeatureState(featureName) {
      return configs[featureName]();
    }
  };
}

export const toggleRouter = createToggleRouter(featureToggleConfigs);
