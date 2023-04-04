export const appendStr = (str: string, whatToAppend: string) =>
  whatToAppend !== undefined ? `${whatToAppend} ${str}` : str;
