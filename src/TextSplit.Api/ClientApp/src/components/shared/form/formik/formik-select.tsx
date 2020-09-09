import React from "react";
import { FormikProps } from "formik";
import FormSelect, { FormSelectProps } from "../form-select";
import { safeGetValue, shouldShowError, safeGetError } from "./formik-helper";

export interface FormikSelectProps<TFormValues = any> extends FormSelectProps<TFormValues> {
  formikProps: FormikProps<TFormValues>
}

function FormikSelect<TFormValues = any>(props: FormikSelectProps<TFormValues>) {

  const { formikProps, name, onChange, onBlur, ...rest } = props;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (formikProps && formikProps.handleChange) formikProps.handleChange(event);
    if (onChange) onChange(event);
  };

  const handleBlur = (event: any) => {
    if (formikProps && formikProps.handleBlur) formikProps.handleBlur(event);
    if (onBlur) onBlur(event);
  };

  return (
    <FormSelect<TFormValues>
      {...rest}
      name={name}
      value={safeGetValue(formikProps, name)}
      onChange={handleChange}
      onBlur={handleBlur}
      showError={shouldShowError(formikProps, name)}
      error={safeGetError(formikProps, name)}
    />
  );
}

export default FormikSelect;