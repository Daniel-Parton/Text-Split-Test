import Axios from 'axios';

import getSettings from '../../settings';
import { MatchRequest, MatchResponse } from './api-models';

const settings = getSettings();

export const relativeUrls = {
  getMatch: `/`,
};

const root = `${settings.baseApiUrl}/match`;

export const getMatch = (request: MatchRequest) => {
  return Axios.get<MatchResponse>(`${root}${relativeUrls.getMatch}`, { params: request });
};