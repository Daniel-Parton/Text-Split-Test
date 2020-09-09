import React from "react";
import MaskedInput from 'react-text-mask';
import classNames from "classnames";
import { Input as BootstrapInput, InputProps, Label } from "reactstrap";
import FormErrorMessage from "./form-error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormControlWrapper from "./form-control-wrapper";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { BaseFormInput } from "./form-types";
import FormInputSkeleton from "../loading-skeleton/form-input-skeleton";

export interface FormDateInputProps extends InputProps, BaseFormInput {
  iconLeft?: IconProp
  iconRight?: IconProp
  inputClassName?: string
  name: string
  afterInputContent?: any
  showLoadingSkeleton?: boolean
}

const FormDateInput: React.FC<FormDateInputProps> = (props) => {
  const { formProps, name, iconLeft, iconRight, className, inputClassName,
    label, error, showError, afterInputContent, showLoadingSkeleton, ...rest } = props;

  const classes = classNames({
    'form--date-input': true,
    'form-input': true,
    'input-with-icon': iconLeft !== undefined || iconRight !== undefined,
    'input-with-icon-left': iconLeft !== undefined,
    'input-with-icon-right': iconRight !== undefined,
    [className!]: className !== undefined,
  });

  const invalid = error && showError ? true : false;

  if (showLoadingSkeleton) {
    return <FormInputSkeleton className={classes} hasLabel={label ? true : false} />;
  }

  return (
    <FormControlWrapper name={name} className={classes} invalid={invalid}>
      {label && <Label for={name}>{label}</Label>}
      <div className='d-flex'>
        <MaskedInput
          mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          name={name}
          {...rest}
          placeholder='DD/MM/YYYY'
          render={(ref, props) => (
            <BootstrapInput
              innerRef={ref}
              {...props}
            />
          )}
        />
        {afterInputContent && <div className='form-input-post-content'>{afterInputContent}</div>}

      </div>
      {iconLeft && <FontAwesomeIcon className='input-icon-left' icon={iconLeft} />}
      {iconRight && <FontAwesomeIcon className='input-icon-right' icon={iconRight} />}

      <FormErrorMessage errorMessage={error} show={showError} />
    </FormControlWrapper>
  );
}

export default FormDateInput;