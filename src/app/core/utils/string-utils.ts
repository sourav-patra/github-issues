import * as camelCase from "camelcase-keys-recursive";

/**
 * Convert a camelCase string to snake_case string
 * @param str sring provided
 */
export function stringCamelToSnake(str: string = ""): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

/**
 * Convert an object with camelCase keys to snake_case_keys
 * @param object object provided
 */
export function camelToSnakeCase(object: any): any {
  const resultObj: any = {};
  Object.keys(object).forEach((key: string): void => {
    // recursive if it contains another layer of objects
    if (typeof object[key] === "object" && !Array.isArray(object[key])) {
      resultObj[this.stringCamelToSnake(key)] = this.camelToSnakeCase(
        object[key]
      );
    } else if (typeof object === "string") {
      resultObj[this.stringCamelToSnake(key)] = object[key];
    } else {
      resultObj[key] = object[key];
    }
  });
  return resultObj;
}

/**
 * Convert an object with snake_case_keys to camelCase keys
 * @param object object provided
 */
export function snakeToCamelCase(object: any): any {
  return camelCase(object, { deep: true });
}
