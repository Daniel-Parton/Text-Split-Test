import React from 'react';
import classNames from 'classnames';

interface FormErrorMessageProps {
  className?: string
  errorMessage?: string
  show?: boolean
}

const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ errorMessage, show, className, ...rest }) => {

  const classes = classNames({
    'form-error-message': true,
    'd-none': !errorMessage || !show,
    [className!]: className !== undefined
  });

  return <span {...rest} className={classes}>{errorMessage}</span>;
};

export default FormErrorMessage;