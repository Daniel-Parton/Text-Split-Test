import { FormikProps } from "formik";
import { AxiosError } from 'axios';

import { OptionModel, ApiError } from "../../../../types/shared-types";
import { ButtonProps } from '../../buttons/button';
import { ChipProps } from '../../chips/chip';
import { FormVariant } from "../form";

export type AutoFormInputType =
  | 'TextInput'
  | 'NumberInput'
  | 'DateInput'
  | 'PasswordInput'
  | 'Checkbox'
  | 'Select'
  | 'MultiSelect'
  | 'Captcha'
  | 'TagInput'
  | 'Display'
  | 'Button'
  | 'Html'
  | 'Image'
  | 'Script'
  | 'AdPeoplePicker'
  | 'TagDisplay';

export type AutoFormValidator = (value: any, values: any) => string | null;

export interface AutoFormOptions {
  validators?: AutoFormValidator[]
  defaultValue?: () => any
  options?: OptionModel<any>[]
  tagOptions?: ChipProps[]
  imageData?: string
  htmlAttr?: any
  displayFromName?: boolean
  placeholder?: string
  exludeEmptyFirstOptionOnSelect?: boolean
}

export interface AutoFormPropertyDefinition<TData = any> extends BaseAutoFormPropertyDefinition<TData> {
  display?: string;
  type: AutoFormInputType;
  options?: AutoFormOptions;
}

export interface BaseAutoFormPropertyDefinition<TData = any> {
  name: keyof TData
}

export interface AutoFormRow<TData = any> {
  columns: AutoFormColumn<TData>[]
}

export interface AutoFormColumn<TData = any> {
  extraSmallSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  smallSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  mediumSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  largeSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  extraLargeSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  field: AutoFormPropertyDefinition<TData>
}

export interface AutoFormProps<TData = any, TSuccessResponse = any> {
  variant?: FormVariant
  className?: string
  formId?: string
  debug?: boolean
  submittingMessage?: string
  inititalising?: boolean
  header?: string
  headerCentre?: boolean
  topContent?: any
  submitButtonText?: string
  hiddenFields?: BaseAutoFormPropertyDefinition<TData>[]
  rows: AutoFormRow<TData>[]
  onSubmitSuccess: (response: TSuccessResponse) => void
  onSubmitError?: (error: AxiosError<ApiError>) => void
  toastOnError?: boolean
  onSubmitPromise: (formValues: TData) => Promise<TSuccessResponse>
  hideBack?: boolean
  additionalButtonsFunc?: (formikProps: FormikProps<TData>) => ButtonProps[]
  onBack?: () => void
  initialValues?: Partial<TData>
  onChange?: (values: TData) => void
}