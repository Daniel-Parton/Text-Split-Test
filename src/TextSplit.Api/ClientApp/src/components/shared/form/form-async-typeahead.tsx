import React from "react";
import classNames from "classnames";
import makeAnimated from 'react-select/animated';

import FormAsyncSelect, { FormAsyncSelectProps } from "./form-async-select";
import ReactSelectHelper from './react-select-helper';

export interface FormAsyncTypeaheadProps extends FormAsyncSelectProps {
}

const FormAsyncTypeahead: React.FC<FormAsyncTypeaheadProps> = (props) => {

  const { components, className, ...rest } = props;

  const classes = classNames({
    'form-async-typeahead': true,
    [className!]: className !== undefined
  });

  return (
    <FormAsyncSelect
      components={ReactSelectHelper.getComponents(makeAnimated(), { hideDropdown: true })}
      className={classes}
      {...rest}
    />
  );
}

export default FormAsyncTypeahead;