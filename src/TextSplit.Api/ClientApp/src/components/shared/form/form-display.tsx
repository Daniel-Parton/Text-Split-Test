import React from "react";
import classNames from "classnames";
import { Label } from "reactstrap";
import { v4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormControlWrapper from "./form-control-wrapper";
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface FormDisplayProps {
  iconLeft?: IconProp
  label?: string
  text?: string
  className?: string
  inline?: boolean
}

const FormDisplay: React.FC<FormDisplayProps> = (props) => {
  const { iconLeft, className, label, text, children, inline, ...rest } = props;

  const classes = classNames({
    'form-display': true,
    'form-display-inline': inline,
    [className!]: className !== undefined,
  });

  return (
    <FormControlWrapper name={text ?? v4()} className={classes} {...rest}>
      {label && <Label>{label}</Label>}
      {iconLeft && <FontAwesomeIcon className='mr-2' icon={iconLeft} />}
      {text && <div>{text}</div>}
      {children}
    </FormControlWrapper>
  );
}

export default FormDisplay;