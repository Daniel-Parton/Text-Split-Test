import React from "react";
import { FormikProps } from "formik";
import FormCheckBox, { FormCheckBoxProps } from "../form-check-box";
import { safeGetValue, shouldShowError, safeGetError } from "./formik-helper";

export interface FormikCheckBoxProps extends FormCheckBoxProps {
  formikProps: FormikProps<any>
}

const FormikCheckBox: React.FC<FormikCheckBoxProps> = ({ formikProps, name, onChange, onBlur, ...rest }) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formikProps.setFieldValue(name as any, event.currentTarget.checked);
    if (onChange) onChange(event);
  };

  const handleBlur = (event: any) => {
    formikProps.handleBlur(event);
    if (onBlur) onBlur(event);
  };

  return (
    <FormCheckBox
      {...rest}
      name={name}
      checked={safeGetValue(formikProps, name) === true}
      onChange={handleChange}
      onBlur={handleBlur}
      showError={shouldShowError(formikProps, name)}
      error={safeGetError(formikProps, name)}
    />
  );
}

export default FormikCheckBox;