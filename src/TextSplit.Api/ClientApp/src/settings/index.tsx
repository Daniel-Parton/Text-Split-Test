import { get } from 'js-cookie';

export interface AppSettingsProps {
  appUrl: string
  baseApiUrl: string
  localCypressTestEnabled: boolean
}

export const cypressTestCookieName = 'Cypress-Test';

const getAppSettings = () => {
  let appSettings: AppSettingsProps = {
    localCypressTestEnabled: get(cypressTestCookieName) ? true : false,
    ...{} as any
  };

  if (process.env.NODE_ENV === 'development') {
    const devAppUrl = appSettings.localCypressTestEnabled ? 'https://localhost:3000' : 'https://localhost:5001';
    appSettings.appUrl = devAppUrl;
    appSettings.baseApiUrl = `${devAppUrl}/api`;
  } else {
    appSettings.appUrl = 'https://text-split.azurewebsites.net/';
    appSettings.baseApiUrl = 'https://text-split.azurewebsites.net/api';
  }
  return appSettings;
}


export default getAppSettings;