const convertKey = (key: string): string => {
  return key
    .split(".")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
    .replace(/([A-Z])/g, " $1")
    .trim();
};

export const flattenObject = (obj: Record<string, any>, parentKey = ""): Record<string, any> => {
  let flatObject: Record<string, any> = {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (key === "id" || key === "_id") continue;

      let newKey = parentKey ? `${parentKey} ${convertKey(key)}` : convertKey(key);
      if (typeof obj[key] === "object" && obj[key] !== null) {
        Object.assign(flatObject, flattenObject(obj[key], newKey));
      } else {
        if (key === "createdAt" || key === "updatedAt") {
          flatObject[newKey] = new Date(obj[key]);
        } else {
          flatObject[newKey] = obj[key];
        }
      }
    }
  }

  return flatObject;
};
