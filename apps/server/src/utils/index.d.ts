export type validationResponse = [
  /** `true` if valid; `false` if not valid */
  isValid: boolean,
  /** List of error messages */
  errors: string[]
];
