
import * as DateHelper from './date-helper';
import * as ObjectHelper from './object-helper';
import * as NumberHelper from './number-helper';
import * as StringHelper from './string-helper';

export type DateTimeDisplayType = 'dateTime' | 'date' | 'time';

export const date = (value: any, type: DateTimeDisplayType = 'date') => {
  switch (type) {
    case 'dateTime':
      return DateHelper.formatDateTime(value);
    case 'time':
      return DateHelper.formatTime(value);
    default:
      return DateHelper.formatDate(value);
  }
};

export const number = (value: any, maxDecimals: number = 2) => {
  if (!ObjectHelper.isNumber(value)) return value;
  return NumberHelper.roundTo(value as number, maxDecimals);
};

export const fileSize = (file: File) => {
  let size = file.size;
  const types = ['Bytes', 'KB', 'MB', 'GB'];
  let index = 0;

  while (size > 900) {
    size /= 1024;
    index++;
  }

  return `${Math.round(size * 100 / 100)} ${types[index]}`;
};

export const money = (value: any) => {
  if (!ObjectHelper.isNumber(value)) return value;
  return StringHelper.toCurrency(value as number);
};

export const seconds = (seconds?: number, fallback: string = '-') => {
  if (!seconds) return fallback;
  var date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8);
}
