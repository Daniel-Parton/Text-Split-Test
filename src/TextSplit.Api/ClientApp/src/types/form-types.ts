import { OptionModel } from "./shared-types";

export interface Form {
  heading: string;
  rows: FormRow[];
}

export interface FormRow {
  columns: FormColumn[];
}

export interface FormColumn {
  extraSmallSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  smallSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  mediumSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  largeSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  extraLargeSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  field: FormField;
}

export type FormFieldType =
  | "TextInput"
  | "NumberInput"
  | "PasswordInput"
  | "Checkbox"
  | "Select"
  | "MultiSelect"
  | "Captcha"
  | "TagInput"
  | "Display"
  | "Button"
  | "Html"
  | "Image"
  | "Javascript";

export interface BaseFormField {
  name: string
  label?: string
  type: FormFieldType
}

export interface FormField extends BaseFormField {
  description?: string;
  placeholder?: string;
  value?: string;
  imageData?: string;
  width?: number;
  height?: number;
  disabled?: boolean;
  options?: OptionModel<string>[];
  validations?: FormValidation[];
  subElements?: FormField[];
  htmlAttr?: any;
}

export type FormValidationType = "Required" | "MaxCharLength" | "MinCharLength";

export interface FormValidation {
  type: FormValidationType;
  overriddedErrorMessage?: string;
  numberParam1?: number;
}
