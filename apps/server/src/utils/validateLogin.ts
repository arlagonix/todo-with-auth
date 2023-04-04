import { appendStr } from "./appendStr";
import type { validationResponse } from ".";

export function validateLogin(
  /** Login needed to be validated */
  login: any,
  /** String appended to the beginning of all error messages */
  strAppendedToError?: string
): validationResponse {
  if (login === undefined) return [false, [appendStr("must be specified", strAppendedToError)]];
  if (typeof login !== "string") return [false, [appendStr("must be a string", strAppendedToError)]];

  const errors = [];

  const rules: [RegExp, string][] = [
    [/^[a-zA-z0-9\-_]*$/, "must contain only allowed characters `a-zA-z0-9_-`"],
    [/(?=^[a-zA-z]+)/, "must start with an English letter `a-zA-Z`"],
    [/(?=[a-zA-z0-9]+$)/, "must end with an English letter or number `a-zA-z0-9`"],
    // Regex below is based on https://stackoverflow.com/a/406408/19449790
    [/^((?![\-_]{2}).)*$/, "must not have consequitive special characters `_-`"],
    [/(?=^.{3,20}$)/, `must be 3-20 characters long, currently it's ${login.length} characters long`],
  ];

  rules.forEach((rule) => {
    const [regex, errorMessage] = rule;
    if (!login.match(regex)) {
      errors.push(appendStr(errorMessage, strAppendedToError));
    }
  });

  return [errors.length === 0, errors];
}
