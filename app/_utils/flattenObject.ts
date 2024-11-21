/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */

type NestedRecord = Record<string, any>;

const convertKey = (key: string): string => {
  return key
    .split(".")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
    .replace(/([A-Z])/g, " $1")
    .trim();
};

export const flattenObject = (
  obj: NestedRecord,
  parentKey = ""
): Record<string, any> => {
  const flatObject: Record<string, any> = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (key === "id" || key === "_id") return;

    const newKey = parentKey
      ? `${parentKey} ${convertKey(key)}`
      : convertKey(key);
    if (
      typeof value === "object" &&
      value !== null &&
      !(value instanceof Date)
    ) {
      Object.assign(flatObject, flattenObject(value, newKey));
    } else {
      flatObject[newKey] =
        key === "createdAt" || key === "updatedAt" ? new Date(value) : value;
    }
  });

  return flatObject;
};
