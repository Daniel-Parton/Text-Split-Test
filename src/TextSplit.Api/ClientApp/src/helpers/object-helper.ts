import { get, set, every } from "lodash";
import { OptionModel } from "../types/shared-types";
import { addSpacesOnCaps } from "./string-helper";

export const isInteger = (obj: any) => Number.isInteger(obj);

export const isNumber = (obj: any) => typeof obj === 'number';

export const isArray = (obj: any) => obj instanceof Array;

export const isString = (obj: any) => Object.prototype.toString.call(obj) === "[object String]";

export const isObject = (obj: any) => typeof obj === "object" && (obj !== null);

export const isBoolean = (obj: any) => typeof obj === "boolean";

export const isRegex = (obj: any) => !(obj) && obj.constructor === RegExp;

export function isEmpty(obj: any): boolean {

  //falsy for numbers having value of  0
  if (isNumber(obj) && (obj === null || obj === undefined)) return true;

  // null and undefined are "empty"
  if (!isNumber(obj) && !obj) return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.

  var isObject = typeof obj === "object";

  //We now have a primitive type that is not empty
  if (!isObject && !isArray(obj)) {
    return false;
  }

  //Array just needs to have a length to be not empty
  if (isArray(obj) && !obj.length) return true;

  //We have an object so check its props
  return every(Object.keys(obj), (k) => isEmpty(obj[k])) as boolean;
};

export function nameOf<T, TNested = {}>(name: keyof T, nestedName?: keyof TNested) {
  const names: string[] = [name as string];
  if (nestedName) names.push(nestedName as string);
  return names.join('.');
};

export const toOptionModels = (items: string[], addSpacesForLabelOnCaps?: boolean) => {
  return !items || !items.length ? [] as OptionModel<string>[] : items.map(i => {
    const item: OptionModel<string> = { value: i, label: addSpacesForLabelOnCaps ? addSpacesOnCaps(i) : i };
    return item;
  });
}

export function toOptionModelsWithPredicate<TData = any, TOptionValue = any>(items: TData[], predicate: (item: TData) => OptionModel<TOptionValue>) {
  return !items || !items.length ? [] as OptionModel<TOptionValue>[] : items.map(predicate);
}

export const ensurePathExists = (obj: any, key: string) => {
  if (get(obj, key, null) === null) {
    set(obj, key, undefined);
  }
}