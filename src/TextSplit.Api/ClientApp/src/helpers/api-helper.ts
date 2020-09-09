import ToastHelper from "./toast-helper";
import { AxiosResponse } from "axios";
import { getApiErrorMessage } from "../api";

export interface ApiHelperOptions {
  defaultOnErrorAction?: () => void
  defaultErrorToast?: (errorResponse: any) => string | undefined
}

export interface ApiHelperMakeCallOptions {
  overridedErrorMessage?: string
  overridedErrorMessageFunc?: (error: any) => string
  noToastOnError?: boolean
  skipDefaultOnErrorAction?: boolean
}

class ApiHelper {
  private toastHelper: ToastHelper
  private defaultOnErrorAction?: () => void
  private defaultErrorToast?: (errorResponse: any) => string | undefined

  constructor(toastHelper: ToastHelper, props?: ApiHelperOptions) {
    this.toastHelper = toastHelper;
    if (props) {
      this.defaultOnErrorAction = props.defaultOnErrorAction;
      this.defaultErrorToast = props.defaultErrorToast;
    }

    if (!this.defaultErrorToast) this.defaultErrorToast = getApiErrorMessage;
  }

  setDefaultOnErrorAction = (defaultOnErrorAction?: () => void) => {
    this.defaultOnErrorAction = defaultOnErrorAction;
  }

  private resolveErrorToastMessage = (errorResponse: any, options?: ApiHelperMakeCallOptions) => {
    let error: string = ''
    if (options && options.overridedErrorMessage) {
      error = options.overridedErrorMessage
    } else if (options && options.overridedErrorMessageFunc) {
      error = options.overridedErrorMessageFunc(errorResponse);
    }

    if (!error && this.defaultErrorToast) {
      try {
        const tempError = this.defaultErrorToast(errorResponse);
        if (tempError) error = tempError;
      } catch {
        //Ignore if fails
      }
    }

    if (!error) error = 'An error occcured';

    return error;
  }

  makeCall<T = any>(axiosRequest: () => Promise<AxiosResponse<T>>, options?: ApiHelperMakeCallOptions) {
    const self = this;
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
      return axiosRequest()
        .then(r => { resolve(r); })
        .catch((errorResponse) => {
          if (!options || !options.noToastOnError) {
            // eslint-disable-next-line
            self.toastHelper.error(self.resolveErrorToastMessage(errorResponse, options));
          }

          // eslint-disable-next-line
          if (self.defaultOnErrorAction && (!options?.skipDefaultOnErrorAction)) {
            self.defaultOnErrorAction();
          }

          return reject(errorResponse);
        });
    });
  }
}

export default ApiHelper;