export const isKeyInEnum = <T extends string>(
  key: string,
  enumObject: Record<string, T>
): key is T => Object.values(enumObject).includes(key as T);
