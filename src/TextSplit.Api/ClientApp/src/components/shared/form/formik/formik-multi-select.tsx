import React from "react";
import { FormikProps } from "formik";
import { safeGetError, safeGetTouched } from "./formik-helper";
import FormMultiSelect, { FormMultiSelectProps } from "../form-multi-select";
import { isArray } from "../../../../helpers/object-helper";

interface FormikMultiSelectProps<TFormValues = any> extends FormMultiSelectProps<TFormValues> {
  formikProps: FormikProps<TFormValues>
}

function FormikMultiSelect<TFormValues = any>(props: FormikMultiSelectProps<TFormValues>) {

  const { formikProps, name, onChange, onBlur, ...rest } = props;

  const handleChange = (value: any[], meta: any) => {
    if (formikProps) {
      formikProps.setFieldTouched(props.name as string);
      formikProps.setFieldValue(props.name as string, !value ? undefined : value.map(e => e.value));
    }

    if (onChange) onChange(value, meta);
  }

  const handleBlur = (e: any) => {
    if (formikProps) formikProps.setFieldTouched(props.name as string);
    if (onBlur) onBlur(e);
  }

  const safeGetDefaultValue = () => {
    if (!props.formikProps.values) return [];
    const value = (props.formikProps.values as any)[name];
    if (!isArray(value)) return [];
    const defaultValue: any[] = [];
    (value as any[]).forEach(e => {
      const found = props.options.find(a => a.value === e);
      if (found) defaultValue.push(found);
    });
    return defaultValue;
  }

  return (
    <FormMultiSelect
      name={name}
      onChange={handleChange}
      onBlur={(e: any) => handleBlur(e)}
      showError={safeGetTouched(formikProps, name)}
      error={safeGetError(formikProps, name)}
      value={safeGetDefaultValue()}
      {...rest}
    />
  )
};

export default FormikMultiSelect;