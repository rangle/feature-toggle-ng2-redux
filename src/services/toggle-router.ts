// doesn't work when running tests
// let featureToggleConfig = require('./../../../feature-toggle.yml');
import { featureToggleConfigs } from '../toggle-config';

export function createToggleRouter(configs = {}) {

  return {
    getInitialState() {
      const initialState = {};
      Object.keys(configs).forEach((key) => {
        const config = configs[key]();
        initialState[key] = config.isEnabled;
      });

      return initialState;
    },
    setFeatureState(featureState) {
      const config = configs[featureState.id]();
      config.isEnabled = featureState.isEnabled;
    },
    getFeatureState(featureName) {
      return configs[featureName]();
    }
  };
}

export const toggleRouter = createToggleRouter(featureToggleConfigs);
