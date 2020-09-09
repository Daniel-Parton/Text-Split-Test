import { get } from 'lodash';
import { FormikProps } from 'formik';

export const safeGetError = (formProps: FormikProps<any>, name: any) => {
  if (!formProps || !formProps.values || !name) return '';
  return get(formProps.errors, name, '') as string;
};

export const shouldShowError = (formProps: FormikProps<any>, name: any) => {
  return hasBeenTouched(formProps, name) && hasError(formProps, name);
};

export const hasError = (formProps: FormikProps<any>, name: any) => {
  return safeGetError(formProps, name) ? true : false;
};

export const safeGetTouched = (formProps: FormikProps<any>, name: any) => {
  if (!formProps || !formProps.values || !name) return false;
  return get(formProps.touched, name) ? true : false;
};

export const hasBeenTouched = (formProps: FormikProps<any>, name: any) => {
  return safeGetTouched(formProps, name) ? true : false;
};

export const safeGetValue = (formProps: FormikProps<any>, name: any, defaultValue?: any) => {
  const compiledDefaultValue = !defaultValue ? undefined : defaultValue;
  if (!formProps || !formProps.values || !name) return compiledDefaultValue;
  const value = get(formProps.values, name);
  return value === undefined || value === null ? defaultValue : value;
};