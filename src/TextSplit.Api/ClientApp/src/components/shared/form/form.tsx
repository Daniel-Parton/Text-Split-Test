import React from "react";
import classNames from "classnames";

export type FormVariant = 'inside-card';
export interface FormProps extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  variant?: FormVariant,
}

const Form: React.FC<FormProps> = ({ variant, className, children, ...rest }) => {

  const classes = classNames({
    'form': true,
    [className!]: className !== undefined,
    [`form-${variant}`]: variant !== undefined
  });

  return (
    <form className={classes} {...rest}>
      {children}
    </form>
  );
}

export default Form;