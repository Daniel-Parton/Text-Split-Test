import { isArray } from "./object-helper";

export const containsString = (stringVal: string, stringToCheck: string) => {
  return !stringVal || !stringToCheck ? false : stringVal.toLowerCase().indexOf(stringToCheck) !== -1;
};

export const containsStringArray = (stringVal: string, stringArrayToCheck: string[]) => {
  return !stringVal || !stringArrayToCheck || !stringArrayToCheck.length ? false :
    stringArrayToCheck.some(e => stringVal.toLowerCase().indexOf(e) !== -1);
};

export const replaceCapitalsWithDashes = (text: string) => {
  return !text ? text : text.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export const capitaliseWords = (text: string) => {
  return !text ? text : text.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
}

export const addSpacesOnCaps = (text: string, capitaliseFirstWord: boolean = true) => {
  if (!text) return text;
  let compiled = text.replace(/([A-Z])/g, ' $1').trim();
  if (capitaliseFirstWord) compiled = capitaliseWords(compiled);
  return compiled;
}

export const replaceSpacesWithDashes = (text: string) => {
  return !text ? text : text.replace(/\s/g, '-');
}

export const removeSpaces = (text: string) => {
  return !text ? text : text.replace(/\s/g, '');
}

export const safeJsonStringToArray = (json?: string) => {
  if (!json) return undefined;
  try {
    const array = JSON.parse(json);
    return isArray(array) ? array : undefined;
  } catch (e) {
    return undefined;
  }
}

export const toCurrency = (num: number) => {
  const compiledNum = !num || isNaN(num) ? 0 : num;
  return '$' + compiledNum.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}