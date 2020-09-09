import React from "react";
import ApiHelper, { ApiHelperOptions } from "../../helpers/api-helper";
import ToastHelper from "../../helpers/toast-helper";
import { useToasts } from "react-toast-notifications";

export interface WithApiHelperProps {
  apiHelper: ApiHelper;
  toastHelper: ToastHelper;
}

function WithApiHelper<P extends WithApiHelperProps>(Component: React.ComponentType<P>, options?: ApiHelperOptions) {
  return function WithUserComponent(props: Pick<P, Exclude<keyof P, keyof WithApiHelperProps>>) {

    const toastHelper = new ToastHelper(useToasts());
    const apiHelper = new ApiHelper(toastHelper, options);

    return <Component apiHelper={apiHelper} toastHelper={toastHelper} {...props as P} />;
  }
}

export default WithApiHelper;