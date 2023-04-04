interface IError {
  errorCode: string;
  errorMessages: string[];
}

export const INVALID_TOKEN: IError = {
  errorCode: "invalid-token",
  errorMessages: ["The token is not specified or is invalid"],
};

export const USER_EXISTS: IError = {
  errorCode: "user-exists",
  errorMessages: ["A user with this login already exists"],
};

export const USER_NOT_FOUND: IError = {
  errorCode: "user-not-found",
  errorMessages: ["A user with this login doesn't exist"],
};

export const DATABASE_ERROR: IError = {
  errorCode: "database-error",
  errorMessages: ["Database couldn't perform the request"],
};

export const BAD_REQUEST = (messages: string[]): IError => ({
  errorCode: "bad-request",
  errorMessages: messages,
});

export const WRONG_LOGIN_PASSWORD: IError = {
  errorCode: "wrong-login-password",
  errorMessages: ["Incorrect login or password"],
};

export const SERVER_ERROR: IError = {
  errorCode: "server-error",
  errorMessages: ["Can't process the request, or during the processing some error happened"],
};
