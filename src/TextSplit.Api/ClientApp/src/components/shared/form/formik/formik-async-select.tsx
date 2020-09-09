import React from "react";
import { FormikProps } from "formik";
import { safeGetError, safeGetTouched, safeGetValue } from "./formik-helper";
import { isArray } from "../../../../helpers/object-helper";
import FormAsyncSelect, { FormAsyncSelectProps } from "../form-async-select";

interface FormikAsyncSelectProps<T> extends FormAsyncSelectProps {
  formikProps: FormikProps<T>
}

const FormikAsyncSelect: React.FC<FormikAsyncSelectProps<any>> = (props) => {

  const { formikProps, name, onChange, onBlur, isMulti, ...rest } = props;

  const handleChange = (value: any[], meta: any) => {
    if (formikProps) {
      formikProps.setFieldTouched(props.name);

      if(isMulti) {
        formikProps.setFieldValue(props.name, !value ? undefined : value.map(e => e.value));
      } else {
        formikProps.setFieldValue(props.name, !value ? undefined : (value as any).value);
      }
    }

    if (onChange) onChange(value, meta);
  }

  const handleBlur = (e: any) => {
    if (formikProps) formikProps.setFieldTouched(props.name);
    if (onBlur) onBlur(e);
  }

  const safeGetMultiValue = () => {
    if (!formikProps.values) return [];
    const value = props.formikProps.values[name];
    if (!isArray(value)) return [];
    const defaultValue: any[] = [];
    return defaultValue;
  }

  return (
    <FormAsyncSelect
      isMulti={isMulti}
      name={name}
      onChange={handleChange}
      onBlur={(e: any) => handleBlur(e)}
      showError={safeGetTouched(formikProps, name)}
      error={safeGetError(formikProps, name)}
      defaultValue={isMulti ? safeGetMultiValue() : safeGetValue(formikProps, name)}
      {...rest}
    />
  )
};

export default FormikAsyncSelect;