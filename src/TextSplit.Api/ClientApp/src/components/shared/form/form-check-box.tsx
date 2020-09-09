import React from "react";
import classNames from "classnames";
import FormControlWrapper from './form-control-wrapper';
import { BaseFormInput } from "./form-types";
import FormErrorMessage from "./form-error";

export interface FormCheckBoxProps extends BaseFormInput {
  className?: string
  checked?: boolean
  checkBoxClassName?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
  noMargin?: boolean
  innerLabel?: string
}
const FormCheckBox: React.FC<FormCheckBoxProps> = (props) => {

  const { name, label, error, showError, checkBoxClassName, className, noMargin, innerLabel, ...rest } = props;

  const invalid = error && showError ? true : false;

  const classes = classNames({
    'check-radio-no-margin': noMargin,
    'has-stacked-label': label,
    'no-stacked-label': !label,
    [className!]: className !== undefined
  });

  return (
    <FormControlWrapper name={name as any} className={classes} invalid={invalid}>
      <div className="check-radio-control control-checkbox">
        {label && <label className='stacked-label' htmlFor={name as any}>{label}</label>}
        <div className='d-flex position-relative'>
          <input id={name as any} className={checkBoxClassName} name={name as any} type="checkbox" {...rest} />
          {innerLabel && <label className='inner-label' htmlFor={name as any}>{innerLabel}</label>}
          <div className="control_indicator"></div>
        </div>
      </div>
      <FormErrorMessage errorMessage={error} show={showError} />
    </FormControlWrapper>
  )
}

export default FormCheckBox;