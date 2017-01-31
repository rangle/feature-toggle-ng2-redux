/**
 * Function to get ReduxBeacon EventDefinitionsMap for input field actions
 * @param {string} fieldName - the name of the input field
 * @param {string} formName - the name of the form
 * @return {EventDefinitionsMap} - ReduxBeacon EventDefinitionsMap
 */
function getEventsMapForInput(fieldName: string, formName: string): any {
  return {
    [`${fieldName}_START`]: {
      eventFields: action => ({
        hitType: 'pageview',
        page: `/${formName}_${fieldName}_start`,
        title: `Start Editing in ${formName} ${fieldName}`,
        location: `/${formName}_${fieldName}_start`
      })
    },
    [`${fieldName}_FINISH`]: [
      {
        eventFields: action => ({
          hitType: 'pageview',
          page: `/${formName}_${fieldName}_finish`,
          title: `Finish Editing in ${formName} ${fieldName}`,
          location: `/${formName}_${fieldName}_finish`
        })
      },
      {
        eventFields: action => ({
          hitType: 'timing',
          timingCategory: `${formName} Form`,
          timingVar: `Time on Task`,
          timingValue: action.payload.time,
          timingLabel: `${formName} ${fieldName}`
        })
      }
    ]
  };
}

const fieldNames = ['username', 'password'];

/**
 * This variable contains an event map for the login form actions
 */
export const LoginFormEventsMap = fieldNames.reduce(
  (previousEventMap: any, fieldName: string) =>
    Object.assign(previousEventMap,
      getEventsMapForInput(fieldName, 'Login'))
, {});
