export const isBrowser = () => typeof window !== "undefined";

export const deepClone = (obj: object) => JSON.parse(JSON.stringify(obj));
