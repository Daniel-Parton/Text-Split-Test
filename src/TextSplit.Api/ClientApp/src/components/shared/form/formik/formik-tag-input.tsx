import React from "react";
import { FormikProps } from "formik";
import { safeGetError, safeGetTouched } from "./formik-helper";
import { isArray } from "../../../../helpers/object-helper";
import FormTagInput, { FormTagInputProps } from "../form-tag-input";
import { OptionModel } from "../../../../types/shared-types";

interface FormikTagInputProps<TFormValues = any> extends FormTagInputProps<TFormValues> {
  formikProps: FormikProps<TFormValues>
}

function FormikTagInput<TFormValues = any>(props: FormikTagInputProps<TFormValues>) {

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
    const value = (props.formikProps.values as any)[name] as any;
    if (!isArray(value)) return [];
    const defaultValue: any[] = [];
    (value as any[]).forEach(e => {
      const found = props.options && props.options.find(a => a.value === e);
      if (found) {
        defaultValue.push(found);
      } else {
        const newOption: OptionModel<any> = { label: e, value: e };
        defaultValue.push(newOption);
      }
    });
    return defaultValue;
  }

  return (
    <FormTagInput<TFormValues>
      name={name as any}
      onChange={handleChange}
      onBlur={(e: any) => handleBlur(e)}
      showError={safeGetTouched(formikProps, name)}
      error={safeGetError(formikProps, name)}
      defaultValue={safeGetDefaultValue()}
      {...rest}
    />
  )
};

export default FormikTagInput;