import moment, { Moment } from "moment";

export const dateFormat = 'DD/MM/YYYY';
export const dateTimeFormat = 'DD/MM/YYYY hh:mm A';
export const timeFormat = 'hh:mm A';

export const getAgeFromMoment = (moment: Moment) => {
  const defaultDate = new Date(1970, 0, 1);
  const todayMs = new Date().valueOf();
  const dobMs = new Date(moment.toDate()).valueOf();
  return new Date(todayMs - dobMs).getFullYear() - defaultDate.getFullYear();
}

export const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today
}

export const isValidMoment = (value: string) => {
  return value && moment(value).isValid();
}

export const tryParseToMoment = (value: string) => {
  return isValidMoment(value) ? moment(value) : value;
}

export const formatDate = (value: string) => {
  if (!isValidMoment(value)) return value;
  return moment(value).format(dateFormat);
}

export const formatDateTime = (value: string) => {
  if (!isValidMoment(value)) return value;
  return moment(value).format(dateTimeFormat);
}

export const formatTime = (value: string) => {
  if (!isValidMoment(value)) return value;
  return moment(value).format(timeFormat);
} 