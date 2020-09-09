import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import moment, { Moment } from 'moment';

import { ApiError } from '../types/shared-types';

const isValidResponse = (response: any) => response.status < 400;

export const getApiErrorMessage = (error: any) => {
  const axiosError = error as AxiosError<ApiError>;
  return axiosError?.response?.data?.message;
}

export const handleError = (error: AxiosError) => {
  if (error && error.response && error.response.status === 401) {
    //TODO Handle 401s??
  }
  //TODO Handle Errors??
};

export const configureAxios = () => {
  axios.defaults.timeout = 2 * 60 * 1000;

  axios.interceptors.request.use((request) => {
    return sanitiseMomentDates(request);
  });

  axios.interceptors.response.use((response) => {
    if (!isValidResponse(response)) {
      return Promise.reject(response);
    }

    return response;

  }, (error: AxiosError) => {
    return Promise.reject(error);
  });
};

//Ensure UTC is not sent for dates
//If a form needs to send UTC then dont rely on moment object and
//parse before it gets sent
const sanitiseMomentDates = (request: AxiosRequestConfig) => {
  return new Promise<AxiosRequestConfig>((resolve) => {
    if (!request.data) return resolve(request);
    const recursiveMomentSanitise = (data: any) => {
      Object.keys(data).forEach((k) => {
        if (data[k] !== null && typeof data[k] === 'object' && !moment.isMoment(data[k])) {
          recursiveMomentSanitise(data[k]);
          return;
        }

        if (moment.isMoment(data[k])) {
          data[k] = (data[k] as Moment).format('YYYY-MM-DDTHH:mm:ss');
        }
      });
    }

    recursiveMomentSanitise(request.data);
    return resolve(request);
  });
}