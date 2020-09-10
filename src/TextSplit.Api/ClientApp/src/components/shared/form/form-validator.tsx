import { get, set } from 'lodash'
import { ensurePathExists } from '../../../helpers/object-helper';

export type ValidatorType<TFormValues = any, TComponentProps = any, TState = any> = (value: any, values: TFormValues, props: TComponentProps, state?: TState) => string | null

export interface FormValidatorField<TFormValues = any, TComponentProps = any, TState = any> {
  name: keyof TFormValues
  validators?: ValidatorType<TFormValues, TComponentProps>[]
}

export interface FormValidatorOptions<TFormValues = any, TComponentProps = any, TState = any> {
  fields: FormValidatorField<TFormValues, TComponentProps>[]
  onlyShowOneErrorPerField?: boolean
}


export default class FormValidator<TFormValues = any, TComponentProps = any, TState = any> {
  fields: FormValidatorField<TFormValues, TComponentProps>[] = []
  onlyShowOneErrorPerField?: boolean

  constructor(options: FormValidatorOptions<TFormValues, TComponentProps>) {


    this.fields = [];
    this.onlyShowOneErrorPerField = false;

    if (options) {
      if (options.fields && options.fields.length) this.fields = options.fields;
      this.onlyShowOneErrorPerField = options.onlyShowOneErrorPerField;
    }
  }

  getFieldNameArray = () => {
    const fieldNames: string[] = [];
    if (!this.fields) return fieldNames;
    this.fields.forEach(f => {
      fieldNames.push(f.name as any);
    });
    return fieldNames;
  }

  validate = (values: any, props: TComponentProps, state?: TState) => {
    const self = this;
    const errors: any = {};
    if (!self.fields || !self.fields.length) return errors;
    if (!values) values = {};
    self.fields.forEach((field) => {
      if (field.validators) {
        const tempErrors: any[] = [];
        const value = get(values, field.name);
        field.validators.forEach((validator) => {
          const tempError = validator(value, values, props, state);
          if (tempError) tempErrors.push(tempError);
        });
        if (tempErrors.length) {
          //Ensure property Path exists
          const errorValue = self.onlyShowOneErrorPerField ? tempErrors[0] : tempErrors.join(", ");
          set(errors, field.name, errorValue);
        }
      }
    })
    return errors;
  }

  isValid = (values: any, props: TComponentProps) => {
    const errors: any = {};
    if (!this.fields || !this.fields.length) return errors;
    if (!values) values = {};
    const invalid = this.fields.some((field) => {
      if (!field.validators || !field.validators.length) return false;
      const value = get(values, field.name);
      return field.validators.some((validator) => {
        const tempError = validator(value, values, props);
        return tempError ? true : false;
      });
    });

    return !invalid;
  }

  getInitial(initialValues?: Partial<TFormValues>) {
    const self = this;
    const initial = !initialValues ? {} : { ...initialValues };
    if (self.fields && self.fields.length) {
      self.fields.forEach((field) => ensurePathExists(initial, field.name as any));
    }

    return initial as TFormValues;
  }
}