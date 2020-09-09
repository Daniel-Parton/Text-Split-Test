import React from "react";
import classNames from "classnames";
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import { ActionMeta } from "react-select";

import { BaseFormInput } from "./form-types";
import FormControlWrapper from "./form-control-wrapper";
import FormErrorMessage from "./form-error";
import { Label } from "reactstrap";
import { OptionModel } from "../../../types/shared-types";
import ReactSelectHelper from "./react-select-helper";

export interface FormTagInputProps<TFormValues = any> extends BaseFormInput<TFormValues> {
  label?: string
  disabled?: boolean
  placeholder?: string
  options?: OptionModel<any>[]
  value?: any
  onChange?: (value: any, action: ActionMeta<any>) => void
  onBlur?: (e: any) => void
  className?: string
  defaultValue?: any
}

function FormTagInput<TFormValues = any>(props: FormTagInputProps<TFormValues>) {

  const { onChange, name, value, label, className, error, showError, defaultValue, options, placeholder, disabled, ...rest } = props;

  const [ownValue, setOwnValue] = React.useState<any>(defaultValue);



  const classes = classNames({
    'form-multi-select': true,
    [className!]: className !== undefined
  });

  const handleChange = (value: any, action: ActionMeta<any>) => {
    setOwnValue(value);

    if (onChange) {
      onChange(value, action);
    }
  }

  const invalid = error && showError ? true : false;

  return (
    <FormControlWrapper name={name as string} className={classes} invalid={invalid}>
      {label && <Label for={name as string}>{label}</Label>}
      <CreatableSelect
        // menuPortalTarget={document.body}
        {...rest}
        inputId={name as string}
        classNamePrefix='form-multi-select'
        isDisabled={disabled}
        disabled={disabled}
        value={value || ownValue}
        getOptionValue={(v) => v.value}
        getOptionLabel={(v) => v.label}
        onChange={handleChange}
        components={ReactSelectHelper.getComponents(makeAnimated(), { hideDropdown: !options?.length })}
        noOptionsMessage={(o) => 'type to create new tag'}
        placeholder={placeholder || 'Start typing to create new tag...'}
        isMulti
        isClearable
      />
      <FormErrorMessage errorMessage={error} show={showError} />
    </FormControlWrapper>


  );
}

export default FormTagInput;