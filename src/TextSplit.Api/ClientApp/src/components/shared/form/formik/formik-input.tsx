import React from 'react';
import { FormikProps } from 'formik';
import FormInput, { FormInputProps } from '../form-input';
import { safeGetValue, shouldShowError, safeGetError } from './formik-helper';

export interface FormikInputProps<TFormValues = any> extends FormInputProps<TFormValues> {
	formikProps: FormikProps<TFormValues>
}

function FormikInput<TFormValues = any>(props: FormikInputProps<TFormValues>) {
	const { formikProps, name, onChange, onBlur, ...rest } = props;
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (formikProps && formikProps.handleChange) formikProps.handleChange(event);
		if (onChange) onChange(event);
	};

	const handleBlur = (event: any) => {
		if (formikProps && formikProps.handleBlur) formikProps.handleBlur(event);
		if (onBlur) onBlur(event);
	};

	return (
		<FormInput<TFormValues>
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

export default FormikInput;
