import moment, { Moment } from 'moment';

import { getToday } from '../../../helpers/date-helper';
import { isNumber } from '../../../helpers/object-helper';
import { addSpacesOnCaps } from '../../../helpers/string-helper';

export const required = (overrideMessage?: string) => (value: string): string | null => {
  if (isNumber(value as any)) {
    if (value === undefined || value === null) {
      return overrideMessage || 'Field is required';
    }
    return null;
  }

  if (!value || !value.toString().trim().length) {
    return overrideMessage || 'Field is required';
  }
  return null;
};

export const requiredArray = (overrideMessage?: string) => (value: any): string | null => {
  if (!value || !value.length) {
    return overrideMessage || 'Field is required';
  }
  return null;
};

export const mustBeTrueRequired = (overrideMessage?: string) => (value: any): string | null => {
  if (value !== true) {
    return overrideMessage || 'Field must be true';
  }
  return null;
};

export const maxCharLength = (max: number, overrideMessage?: string) => {
  return (value: string | number): string | null => {
    if (!value || !max || max < 0) return null;
    if (value.toString().length > max) {
      return overrideMessage || `Must be no more than ${max} characters`;
    }
    return null;
  };
};

export const charLength = (length: number, overrideMessage?: string) => {
  return (value: string | number): string | null => {
    if (!value || !length || length < 0) return null;
    if (value.toString().length !== length) {
      return overrideMessage || `Must be ${length} characters`;
    }
    return null;
  };
};

export const minCharLength = (min: number, overrideMessage?: string) => {
  return (value: string | number): string | null => {
    if (!value || !min || min < 0) return null;
    if (value.toString().length < min) {
      return overrideMessage || `Must be more than ${min} characters`;
    }
    return null;
  };
};

export const email = (overrideMessage?: string) => (value: string): string | null => {
  if (!value) return null;

  if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(value).toLowerCase())) {
    return overrideMessage || 'Not a valid email';
  }
  return null;
};

export const number = (overrideMessage?: string) => (value: any): string | null => {
  if (value === null || value === undefined) return null;
  if (!isNumber(value)) {
    return overrideMessage || 'Not a valid Number';
  }
  return null;
};

export const numberGreaterThan = (number: number, overrideMessage?: string) => {
  return (value: any): string | null => {
    if (value === null || value === undefined || !isNumber(value)) return null;
    if (value <= number) return overrideMessage || `Must be greater than ${number}`;
    return null;
  };
};

export const numberGreaterThanOrEqual = (number: number, overrideMessage?: string) => {
  return (value: any): string | null => {
    if (value === null || value === undefined || !isNumber(value)) return null;
    if (value < number) return overrideMessage || `Must be greater than or equal to ${number}`;
    return null;
  };
};

export const numberLessThan = (number: number, overrideMessage?: string) => {
  return (value: any): string | null => {
    if (value === null || value === undefined || !isNumber(value)) return null;
    if (value >= number) return overrideMessage || `Must be less than ${number}`;
    return null;
  };
};

export const numberLessThanOrEqual = (number: number, overrideMessage?: string) => {
  return (value: any): string | null => {
    if (value === null || value === undefined || !isNumber(value)) return null;
    if (value > number) return overrideMessage || `Must be less than or equal to ${number}`;
    return null;
  };
};

export const matchField = (fieldName: string, overrideMessage?: string) => {
  return (value: any, values: any): string | null => {
    if (!values) return null;
    if (values[fieldName] !== value) {
      return overrideMessage || `Does not match ${fieldName}`;
    }
    return null;
  };
};

export const minAge = (minAge: number, overrideMessage?: string) => {
  return (value: string) => {
    if (!value) return null
    if (minAge < 0) return null
    const momentDate = moment(value, 'DD/MM/YYYY', true);
    if (!momentDate.isValid()) return null;

    const momentToCheck = moment().startOf('day').subtract(minAge, "years");
    if (momentDate.isAfter(momentToCheck)) {
      return overrideMessage || `Must be older than ${minAge}`;
    }
    return null;
  }
}

export const maxAge = (maxAge: number, overrideMessage?: string) => {
  return (value: string) => {
    if (!value) return null
    if (maxAge < 0) return null
    const momentDate = moment(value, 'DD/MM/YYYY', true);
    if (!momentDate.isValid()) return null;

    const momentToCheck = moment().startOf('day').subtract(maxAge, "years");

    if (momentDate.isBefore(momentToCheck)) {
      return overrideMessage || `Must be younger than ${maxAge}`;
    }
    return null;
  }
}

export const dateNotFuture = (format: string = 'DD/MM/YYYY', overrideMessage?: string) => (value: string) => {
  if (!value) return null;
  return momentDateNotFuture(moment(value, format, true), overrideMessage)
}

export const momentDateNotFuture = (value: Moment, overrideMessage?: string) => {
  if (!value) return null;
  if (!value.isValid()) return null;
  const date = value.toDate();
  date.setHours(0, 0, 0, 0)
  return date > getToday() ? overrideMessage || 'Cannot be in the future' : null;
}

export const momentDate = (value: Moment, overrideMessage?: string) => {
  if (!value) return null;
  return !value.isValid() ? overrideMessage || 'Must be a valid date' : null;
}

export const date = (format: string = 'DD/MM/YYYY', overrideMessage?: string) => (value: string) => {
  if (!value) return null;
  if (!moment(value, format, true).isValid()) {
    return overrideMessage || `Must be a valid date ${format}`
  }
  return null;
}

export function dateLessThanField<T>(fieldName: keyof T, format: string = 'DD/MM/YYYY', overrideMessage?: string) {
  return (value: any, values: any): string | null => {
    if (!values || !values[fieldName]) return null;
    const momentValue = moment(value, format, true);
    if (!momentValue.isValid()) return null;
    const momentCompareValue = moment(values[fieldName]);
    if (!momentCompareValue.isValid()) return null;
    if (momentValue.isSameOrAfter(momentCompareValue)) {
      return overrideMessage || `Date cannot be after ${addSpacesOnCaps(fieldName as string)}`;
    }
    return null;
  };
};

export function dateLessThanOrEqualField<T>(fieldName: keyof T, format: string = 'DD/MM/YYYY', overrideMessage?: string) {
  return (value: any, values: any): string | null => {
    if (!values || !values[fieldName]) return null;
    const momentValue = moment(value, format, true);
    if (!momentValue.isValid()) return null;
    const momentCompareValue = moment(values[fieldName]);
    if (!momentCompareValue.isValid()) return null;
    if (momentValue.isAfter(momentCompareValue)) {
      return overrideMessage || `Date cannot be after ${addSpacesOnCaps(fieldName as string)}`;
    }
    return null;
  };
};

export function dateGreaterThanOrEqualField<T>(fieldName: keyof T, format: string = 'DD/MM/YYYY', overrideMessage?: string) {
  return (value: any, values: any): string | null => {
    if (!values || !values[fieldName]) return null;
    const momentValue = moment(value, format, true);
    if (!momentValue.isValid()) return null;
    const momentCompareValue = moment(values[fieldName]);
    if (!momentCompareValue.isValid()) return null;
    if (momentValue.isBefore(momentCompareValue)) {
      return overrideMessage || `Date cannot be before ${addSpacesOnCaps(fieldName as string)}`;
    }
    return null;
  };
};

export function dateGreaterThanField<T>(fieldName: keyof T, format: string = 'DD/MM/YYYY', overrideMessage?: string) {
  return (value: any, values: any): string | null => {
    if (!values || !values[fieldName]) return null;
    const momentValue = moment(value, format, true);
    if (!momentValue.isValid()) return null;
    const momentCompareValue = moment(values[fieldName]);
    if (!momentCompareValue.isValid()) return null;
    if (momentValue.isSameOrBefore(momentCompareValue)) {
      return overrideMessage || `Date cannot be before ${addSpacesOnCaps(fieldName as string)}`;
    }
    return null;
  };
};


export const noFullStops = (value: any, overrideMessage?: string): string | null => {
  if (!value) return null;
  return reggex(/^(?!.*[.].*).*$/, overrideMessage || 'Please remove any periods (full stops)')(value);
};

export const noMultiSpecialChars = (value: any, overrideMessage?: string): string | null => {
  if (!value) return null;
  return reggex(/^(?!.*[ /\\\\-]{2,}.*).*$/, overrideMessage || 'Please do not enter multiple adjacent special characters')(value);
};

export const startsWithNumer = (value: any, overrideMessage?: string): string | null => {
  if (!value) return null;
  return reggex(/^[0-9].*$/, overrideMessage || 'Must start with a numeric value')(value);
};

export const alphaNumsSpacesHyphensSlashesOnly = (value: any, overrideMessage?: string): string | null => {
  if (!value) return null;
  return reggex(/^([A-Za-z0-9/\\\\ -])*$/, overrideMessage || 'Please only contain alphanumerics, spaces, hyphens and slashes')(value);
};

export const alphaSpacesHyphensApostrophesOnly = (value: any, overrideMessage?: string): string | null => {
  if (!value) return null;
  return reggex(/^([Nn]\/[Aa]|[A-Za-z '-]*)$|^$/, overrideMessage || 'Please only enter A-Z characters, spaces, hyphens, and apostrophes')(value);
};

export const begginningAlpha = (message: string) => (value: any): string | null => {
  if (!value) return null;
  return reggex(/(^[A-Za-z])|^$/, message)(value);
};

export const noDuplicateSpecialChars = (value: any, overrideMessage?: string): string | null => {
  if (!value) return null;
  return reggex(/^(?!.*[ '-]{2,}.*).*$/, overrideMessage || 'Please do not enter duplicate special characters')(value);
};

export const reggex = (expression: RegExp | string, message: string) => {
  return (value: any): string | null => {
    if (!value) return null;
    return RegExp(expression).test(value) ? null : message;
  };
};