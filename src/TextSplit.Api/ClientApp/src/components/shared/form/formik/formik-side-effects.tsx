import React from 'react';
import { orderBy } from 'lodash';
import { connect, FormikContextType } from 'formik';
import * as DomHelper from '../../../../helpers/dom-helper';

interface BaseFormikContextProps {
	formik: FormikContextType<any>;
}

interface FormikSideEffectsProps {
	formId?: string;
	onChange?: (values: any) => void;
	parentsubmitTriggerCount?: number;
	focusInputOnSubmitFail?: boolean;
	focusFirstInputOnInit?: boolean;
	logOnChange?: boolean
}

interface ErrorFinderDto {
	top: number;
	element: HTMLElement;
}

const FormikSideEffects: React.FC<FormikSideEffectsProps & BaseFormikContextProps> = (props) => {
	const { formId, formik, onChange, parentsubmitTriggerCount, focusInputOnSubmitFail, logOnChange } = props;

	const getFormElements = (keyedFormStructure: any) => {
		return Object.keys(keyedFormStructure)
			.filter((name) => (formId ? DomHelper.findByNameInForm(formId, name) : DomHelper.findByName(name)))
			.map((name) => {
				const element = formId ? DomHelper.findByNameInForm(formId, name) : DomHelper.findByName(name);
				const dto: ErrorFinderDto = { top: element!.getBoundingClientRect().top, element: element! };
				return dto;
			});
	};

	//Should be focussing on first input but will need a way to know what
	//field is the first one and how to focus on it
	React.useEffect(() => {
		setTimeout(() => {
			if (formik.values) {
				const elements = getFormElements(formik.values);
				if (elements && elements.length) {
					const topMost = orderBy(elements, (e) => e.top, 'asc')[0];
					topMost.element.focus();
				}
			}
		}, 300);
	}, []);

	React.useEffect(
		() => {
			if (onChange) onChange(formik.values);
			if (logOnChange) console.log(formik.values); //eslint-disable-line no-console
		},
		[formik.values, onChange]
	);

	//This will allow the parent to trigger submit.
	//When parentsubmitTriggerCount is change it will trigger a submit to the form
	React.useEffect(
		() => {
			if (parentsubmitTriggerCount && parentsubmitTriggerCount > 0) formik.submitForm();
		},
		[parentsubmitTriggerCount]
	);

	//Focus on first input error after submit fail
	React.useEffect(
		() => {
			if (focusInputOnSubmitFail && formik.submitCount > 0 && !formik.isSubmitting && !formik.isValid) {
				if (process.env.NODE_ENV === 'development') {
					console.log('Form Values: ', formik.values); //eslint-disable-line no-console
					console.log('Form Errors: ', formik.errors); //eslint-disable-line no-console
					console.log('Form Touched: ', formik.touched); //eslint-disable-line no-console
				}

				const errorElements = getFormElements(formik.errors);
				if (errorElements && errorElements.length) {
					const topMost = orderBy(errorElements, (e) => e.top, 'asc')[0];

					//If the element is already selected it needs to be wrapped in a timeout
					if (document.activeElement === topMost.element) {
						setTimeout(() => topMost.element.focus(), 100);
					} else {
						topMost.element.focus();
					}
				}
			}
		},
		[formik.submitCount, formik.isSubmitting, formik.isValid]
	);

	return null;
};

export default connect(FormikSideEffects as any) as React.FC<FormikSideEffectsProps>;
