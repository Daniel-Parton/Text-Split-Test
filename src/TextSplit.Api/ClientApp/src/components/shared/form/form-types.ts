export interface BaseFormInput<TFormValues = any> {
  id?: string
  name: keyof TFormValues
  label?: string
  error?: string
  touched?: boolean
  showError?: boolean
}