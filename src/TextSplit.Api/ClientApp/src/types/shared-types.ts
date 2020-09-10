export interface OptionModel<T> {
  value: T
  label: string
  disabled?: boolean
}

export interface BaseFilterModel {
  skip?: number
  take?: number
  orderBy?: string
  orderByDirection?: string
}

export interface ResultSet<T> {
  results: T[]
  total: number
  resultTotal: number
}

export interface ResultWrapper<T> {
  data?: T
  success: boolean
  error?: string
  errorData?: Dictionary<string>
}

export interface Dictionary<T> {
  [key: string]: T
}

export interface ApiError {
  message: string
  unhandledException: boolean
}

export type FormFieldType = 'Hidden' | 'TextInput' | 'NumberInput' | 'PasswordInput' | 'TagInput' | 'Select' | 'Checkbox' | 'MultiSelect' | 'Captcha'