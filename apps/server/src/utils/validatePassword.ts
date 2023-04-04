import { appendStr } from "./appendStr";
import type { validationResponse } from ".";

export function validatePassword(
  /** Password needed to be validated */
  password: any,
  /** String appended to the beginning of all error messages */
  strAppendedToError?: string
): validationResponse {
  if (password === undefined) return [false, [appendStr("must be specified", strAppendedToError)]];
  if (typeof password !== "string") return [false, [appendStr("must be a string", strAppendedToError)]];

  let isValid = true;
  const errors = [];

  const rules: [RegExp, string][] = [
    [/(?=.*?[A-Z])/, "must contain at least one upper case English letter `A-Z`"],
    [/(?=.*?[a-z])/, "must contain at least one lower case English letter `a-z`"],
    [/(?=.*?[0-9])/, "must contain at least one number `0-9`"],
    [/(?=.*?[#?!@$%^&*\-])/, "must contain at least one special character `#?!@$%^&*-`"],
    [/^[a-zA-Z0-9#?!@$%^&*\-]*$/, "must contain only allowed characters `a-zA-Z0-9#?!@$%^&*-`"],
    [/(?=^.{8,128}$)/, "must be 8-128 characters long"],
  ];

  rules.forEach((rule) => {
    const [regex, errorMessage] = rule;
    if (!password.match(regex)) {
      errors.push(appendStr(errorMessage, strAppendedToError));
      isValid = false;
    }
  });

  return [isValid, errors];
}
