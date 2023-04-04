import { BAD_REQUEST } from "./errorResponses";

export function basicRequestBodyValidation(req, res, next) {
  if (typeof req.body !== "object" || Array.isArray(req.body) || req.body === null)
    return res.status(400).json(BAD_REQUEST(["Request body must be an object"]));
  next();
}
