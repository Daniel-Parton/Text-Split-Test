import React from "react";
import classNames from "classnames";
import { ActionMeta, SelectComponentsConfig, InputActionMeta } from 'react-select';
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';

import { BaseFormInput } from "./form-types";
import FormControlWrapper from "./form-control-wrapper";
import FormErrorMessage from "./form-error";
import { Label } from "reactstrap";
import { getOptionValue, getOptionLabel } from "react-select/src/builtins";
import ReactSelectHelper from "./react-select-helper";

export interface FormAsyncSelectProps extends BaseFormInput {
  components?: SelectComponentsConfig<any>
  hideBaseClassName?: boolean
  className?: string
  name: string
  label?: string
  placeholder?: string
  value?: any
  inputValue?: string
  onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void
  onChange?: (value: any, action: ActionMeta<any>) => void
  onBlur?: (e: any) => void
  defaultValue?: any
  searchPromise: (inputValue: string, callback?: (options: any[]) => void) => Promise<any>
  getOptionValue?: getOptionValue<any>
  getOptionLabel?: getOptionLabel<any>
  isClearable?: boolean
  disabled?: boolean
  isMulti?: boolean
}

let requestTimer: any = null;

const FormAsyncSelect: React.FC<FormAsyncSelectProps> = (props) => {

  const { onChange, name, label, className, error, showError, defaultValue, searchPromise,
    hideBaseClassName, placeholder, components, getOptionValue, getOptionLabel, disabled, ...rest } = props;

  const classes = classNames({
    'form-async-select': hideBaseClassName,
    [className!]: className !== undefined
  });

  const handleChange = (value: any, action: ActionMeta<any>) => {
    if (onChange) {
      onChange(value, action);
    }
  }

  const handleLoadOptions = (inputValue: string) => {
    if (requestTimer) clearTimeout(requestTimer);
    return new Promise((resolve) => {
      requestTimer = setTimeout(() => searchPromise(inputValue).then(r => resolve(r)), 500);
    });
  };

  const invalid = error && showError ? true : false;

  return (
    <FormControlWrapper name={name} className={classes} invalid={invalid}>
      {label && <Label for={name}>{label}</Label>}
      <AsyncSelect
        // menuPortalTarget={document.body}
        inputId={name}
        loadOptions={handleLoadOptions}
        classNamePrefix={'form-multi-select'}
        isDisabled={disabled}
        textFieldProps={{
          name: name,
        }}
        cacheOptions
        getOptionValue={!getOptionValue ? (v: any) => v.value : getOptionValue}
        getOptionLabel={!getOptionLabel ? (v: any) => v.label : getOptionLabel}
        onChange={handleChange}
        components={components || ReactSelectHelper.getComponents(makeAnimated())}
        placeholder={placeholder || 'Start typing to search...'}
        {...rest}
      />
      <FormErrorMessage errorMessage={error} show={showError} />
    </FormControlWrapper>


  );
}

export default FormAsyncSelect;