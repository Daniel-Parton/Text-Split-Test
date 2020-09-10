import React from 'react';
import { FormikProps } from 'formik';
import FormDateInput, { FormDateInputProps } from '../form-date-input';
import { safeGetValue, shouldShowError, safeGetError } from './formik-helper';

export interface FormikDateInputProps extends FormDateInputProps {
	formikProps: FormikProps<any>
}

const FormikDateInput: React.FC<FormDateInputProps> = ({ formikProps, name, onChange, onBlur, ...rest }) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (formikProps && formikProps.handleChange) formikProps.handleChange(event);
		if (onChange) onChange(event);
	};

	const handleBlur = (event: any) => {
		if (formikProps && formikProps.handleBlur) formikProps.handleBlur(event);
		if (onBlur) onBlur(event);
	};

	return (
		<FormDateInput
			{...rest}
			name={name}
			value={safeGetValue(formikProps, name, '')}
			onChange={handleChange}
			onBlur={handleBlur}
			showError={shouldShowError(formikProps, name)}
			error={safeGetError(formikProps, name)}
		/>
	);
};

export default FormikDateInput;
