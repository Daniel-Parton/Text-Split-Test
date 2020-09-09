import React from 'react';
import classNames from 'classnames';
import { FormGroup, FormGroupProps } from 'reactstrap';

interface FormControlWrapperProps extends FormGroupProps {
  invalid?: boolean
  name: string
}
const FormControlWrapper: React.SFC<FormControlWrapperProps> = (props) => {
  const { className, invalid, children, name, ...rest } = props;
  const classes = classNames({
    'form-control-wrapper': true,
    'invalid': invalid,
    [className!]: className !== undefined
  });

  return (
    <FormGroup data-test={`form-control-${name}`} className={classes} {...rest as any} >
      {children}
    </FormGroup>
  );
};

export default FormControlWrapper;
