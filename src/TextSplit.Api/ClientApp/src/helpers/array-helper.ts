//Returns new array
//https://medium.com/dailyjs/how-to-remove-array-duplicates-in-es6-5daa8789641c
export function removeDuplicates<T>(array: T[]) {
  if (!array || !array.length) return [] as T[];
  const unique = new Set(array);
  return [...unique as any] as T[];
};

export function removeDuplicatesMultiple<T>(array1: T[], array2: T[]) {
  let joined = !array1 ? [] : [...array1];
  if (array2 && array2.length) joined = joined.concat([...array2]);
  return removeDuplicates<T>(joined);
};