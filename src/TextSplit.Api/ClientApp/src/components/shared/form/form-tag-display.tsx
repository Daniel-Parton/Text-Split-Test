import React from "react";
import classNames from "classnames";
import { Label } from "reactstrap";
import { v4 } from "uuid";

import FormControlWrapper from "./form-control-wrapper";
import ChipList from '../chips/chip-list'
import { ChipProps } from "../chips/chip";

export interface FormTagDisplayProps {
  label?: string
  tags: ChipProps[]
  className?: string
  smallOverride?: boolean
}

const FormTagDisplay: React.FC<FormTagDisplayProps> = (props) => {
  const { className, label, tags, children, smallOverride, ...rest } = props;

  const classes = classNames({
    'form-tag-display': true,
    [className!]: className !== undefined,
  });

  return (
    <FormControlWrapper name={v4()} className={classes} {...rest}>
      {label && <Label>{label}</Label>}
      <ChipList chips={tags} smallOverride={smallOverride} />
      {children}
    </FormControlWrapper>
  );
}

export default FormTagDisplay;