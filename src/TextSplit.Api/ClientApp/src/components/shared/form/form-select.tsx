import React from "react";
import classNames from "classnames";
import { Input, Label, CSSModule } from "reactstrap";
import FormControlWrapper from "./form-control-wrapper";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { OptionModel } from "../../../types/shared-types";
import { BaseFormInput } from "./form-types";
import FormErrorMessage from "./form-error";

export interface FormSelectProps<TFormValues> extends BaseFormInput<TFormValues> {
  iconLeft?: IconProp
  selectClassName?: string
  includeEmptyOption?: boolean
  options: OptionModel<any>[]

  bsSize?: 'lg' | 'sm';
  state?: string;
  valid?: boolean;
  invalid?: boolean;
  tag?: string | React.ReactType;
  innerRef?: React.Ref<HTMLInputElement>;
  plaintext?: boolean;
  addon?: boolean;
  className?: string;
  cssModule?: CSSModule;

  disabled?: boolean
  placeholder?: string
  type?: string
  value?: any
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

function FormSelect<TFormValues = any>(props: FormSelectProps<TFormValues>) {

  const { className, error, showError, touched, selectClassName, iconLeft, includeEmptyOption, name, options, label, ...rest } = props;

  const selectClasses = classNames({
    [selectClassName!]: selectClassName !== undefined,
    'icon-left': iconLeft !== undefined
  });

  const invalid = error && showError ? true : false;

  return (
    <FormControlWrapper name={name as string} className={className} invalid={invalid}>
      {label && <Label for={name as string}>{label}</Label>}
      <Input
        className={selectClasses}
        name={name as string}
        type={'select' as any}
        {...rest}
      >
        {includeEmptyOption && <option value="" />}
        {options && options.map(o => (
          <option key={`${o.label}-${o.value}`} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </Input>
      <FormErrorMessage errorMessage={error} show={showError} />
    </FormControlWrapper>
  )
};

export default FormSelect;